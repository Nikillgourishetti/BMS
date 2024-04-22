const router = require("express").Router()
const authMiddleware = require ("../middleware/authMiddleware")
const Booking = require("../models/BookingModel")
const Show = require("../models/showModel")
const stripe = require("stripe")(process.env.STRIPE_KEY)

router.post("/book-show", authMiddleware, async(req, res) => {
    try {
        const newBooking = new Booking(req.body)
        await newBooking.save()
        
        const show = await Show.findById(req.body.show)
        await Show.findByIdAndUpdate(req.body.show,{
            bookedSeats:[...show.bookedSeats, ...req.body.seats]
        })
        res.status(200).send({
            success: true,
            message: "Booked successfully",
            data: newBooking
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Booking failed!"
        })
    }
})

router.get("/get-bookings", authMiddleware, async(req, res) => {
    try {
        const bookings = await Booking.find({ user: req.body.userId })
        .populate("show")
        .populate({
            path: "show",
            populate:{
                path: "movie",
                model: "movies"
            }
        }).populate("users")
        .populate({
           path: "show",
           populate: {
            path: "theatre",
            model: "theatres"
           }
        })

        res.send({
            success: true,
            message: "Bookings fetched",
            data: bookings
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Issue while Fetching Bookings!"
        })
    }
})

router.post("/make-payment", authMiddleware,  async(req, res) => {
    try {
        const { token, amount} = req.body

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'inr',
          })
    
        console.log(paymentIntent)
        res.send({
            success: true,
            message: "Payment successfull",
            secret: paymentIntent.client_secret
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
            
        })
    }
})

module.exports = router