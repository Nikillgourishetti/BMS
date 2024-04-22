const router = require ('express').Router()
const authMiddleware = require('../middleware/authMiddleware')
const Movie = require("../models/movieModel")

router.post("/add-movie",  authMiddleware, async (req, res) =>{
    try {
        const newMovie = new Movie(req.body)  
        await newMovie.save()

        res.status(200).send({
            success: true,
            message: "Movie is added"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "error occured in adding movie!"})
    }
})

router.get("/list", authMiddleware, async (req, res) =>{
    try {
        const movies = await Movie.find() 

        res.status(200).send({
            success: true,
            message: "Movies fetched",
            movies
        })
    } catch (error) {
        res.status(500).send({
            success: false, message: "Something went wrong!"
        })
    }
})

router.get("/get-by-id/:movieId", authMiddleware, async (req, res) => {
    try {
       const movie = await Movie.findById(req.params.movieId)
       
       res.status(200).send({
        success: true,
        message: "Movie details fetched",
        movie
       })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong while fetching details!"
           })
    }
})

router.post("/update-movie", authMiddleware,  async (req, res) =>{
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body)

        res.send({
            success: true,
            message: "Movie updated"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Something Went Wrong!"
        })
    }
})

router.post("/delete-movie", authMiddleware,  async (req, res) =>{
    try {
        await Movie.findByIdAndDelete(req.body.movieId)

        res.send({
            success: true,
            message: "Movie Deleted!"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Something Went Wrong!"
        })
    }
})


module.exports = router