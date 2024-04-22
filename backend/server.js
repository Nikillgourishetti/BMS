const express = require('express')
require("dotenv").config()
var cors = require('cors')
const userRoute = require("./routes/userRoute")
const movieRoute = require("./routes/movieRoute")
const theaterRoute = require("./routes/theatreRoute")
const showRoute = require("./routes/showRoute")
const bookingRoute = require("./routes/bookingRoute")


const dbConfid = require("./config/dbconfig")

const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static("build"))
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/theatres", theaterRoute)
app.use("/api/shows", showRoute)
app.use("/api/bookings", bookingRoute)


app.listen(8080, () =>{
    console.log('server running')
})