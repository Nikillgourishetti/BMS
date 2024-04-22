const router = require ("express").Router()
const authMiddleware = require("../middleware/authMiddleware")
const Show = require("../models/showModel")

router.post("/add-show", authMiddleware, async(req, res) => {
    try {
        const newShow = new Show(req.body)
        await newShow.save()
        
        res.status(200).send({
            success: true,
            message: "Show added"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Some issue while adding!"
        })
    }
})

router.post("/update-show", authMiddleware, async(req, res) => {
    try {
        await Show.findByIdAndUpdate(req.body.showId, req.body)

        res.send({
            success: true,
            message: "Show updated"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Something Went Wrong!"
        })
    }
})

router.post("/delete-show", authMiddleware,async(req, res) => {
    try {
        await Show.findByIdAndDelete(req.body.showId)

        res.send({
            success: true,
            message: "Show deleted"
        })        
    } catch (error) {
        res.send({
            success: false,
            message: "Something Went Wrong!"
        })
    }
})

router.get("/get-all-shows-by-theatre-id/:theatreId", authMiddleware, async(req, res) => {
    try {
        const shows = await Show.find({ theatre: req.params.theatreId }).populate("movie").populate("theatre")

        res.status(200).send({
            success: true,
            message: "Shows fetched",
            shows
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something Went Wrong!"
        })
    }
})

router.get("/get-show-by-id/:showId", authMiddleware,  async(req, res) => {
    try {
        const show = await Show.findById(req.params.showId).populate("movie").populate("theatre")

        res.status(200).send({
            success: true,
            message: "Show fetched",
            show
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something Went Wrong!"
        })
    }
})
module.exports = router