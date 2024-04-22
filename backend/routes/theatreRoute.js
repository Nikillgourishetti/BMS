const router = require('express').Router()
const authMiddleware = require('../middleware/authMiddleware')
const Show = require('../models/showModel')
const Theatre = require("../models/theatreModel")


router.post("/add-theatre", authMiddleware, async (req, res) =>{
    try {
        const newTheatre = new Theatre(req.body)
        await newTheatre.save()

        res.send({
            success: true,
            message: "Theatre added successfully "
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Something went wrong!"
        })
    }
})

router.post("/update-theatre", authMiddleware,  async (req, res) => {
    try {
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body)

        res.send({
            success: true,
            message: "Theatre Updated"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Something went wrong!"
        })
    }
})

router.post("/delete-theatre", authMiddleware, async (req, res) =>{
    try {
        await Theatre.findByIdAndDelete(req.body.theatreId)

        res.send({
            success: true,
            message: "Theatre eleted"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Something went wrong!"
        })
    }
})

router.get("/get-all-theatres-by-user-id",  authMiddleware, async (req, res) =>{
    try {
         const theatres = await Theatre.find({ owner: req.body.userId })

        res.send({
            success: true,
            message: "Theatre fetched",
            theatres
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Issue while fetching!"
        })
    }
})

router.get("/get-all-theatres", authMiddleware, async (req, res) =>{
    try {
         const theatres = await Theatre.find().populate("owner", "-password")

        res.send({
            success: true,
            message: "Theatre fetched",
            theatres
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Issue while fetching!"
        })
    }
})

router.post("/get-theatres-for-movie", authMiddleware, async (req, res) => {
    try {
        const { movieId } = req.body
        const shows = await Show.find({ movie: movieId}).populate("theatre")

        const uniqueTheatres = []

        shows.forEach((show) =>{
            const theatre = uniqueTheatres.find((theatreCurrent) => theatreCurrent._id === show.theatre._id)

            if(!theatre){
                const showsForTheatre = shows.filter(
                    (showObj) => show.theatre._id === showObj.theatre._id
                )

                uniqueTheatres.push({
                    shows: showsForTheatre,
                    ...show.theatre._doc
                })
            }
        })

        res.send({
            success: true,
            message: "Theatre for movie fetched",
            data: uniqueTheatres
        })
    } catch (error) {
        res.send({
            success: false,
            messages: "Something went wrong",
        })

    }
})

module.exports = router