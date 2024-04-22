const router = require ("express").Router()
const User = require("../models/userModel")
const authMiddleware= require("../middleware/authMiddleware")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


router.post("/register", async (req, res) => {
    try {
        const requestBody = req.body
        const user = await User.findOne({ email: req.body.email })
        if(user){
            return res.send({
                success: false, message: "Email already taken!"
            })
        }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt) 
    req.body.password = hashedPassword
    
    const newUser =new User(req.body)
    await newUser.save()

    res.status(200).json({success: true, message: "User has created"})        
    } catch(e) {
        console.log(e)
        res.status(500).json({ success: false, message: "Internal server error"})
    }
    
})

router.post("/login",  async(req, res) => {
    console.log("login is called")
    const user = await User.findOne({ email: req.body.email }) 
    if(!user) {
        return res.send({
            success: false, message: "User does't exist"
        })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordValid){
        return res.send({
            success: false, message: "Invalid Password!"
        })

    }
    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
    res.status(200).json({success: true, message : "Logged in", data: token})
})

router.get("/get-current-user", authMiddleware, async(req, res) =>{
    try {
        const user = await User.findById(req.body.userId).select("-password")
        res.send({ success: true, 
            message: "User fetced", 
            data: user })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
module.exports = router