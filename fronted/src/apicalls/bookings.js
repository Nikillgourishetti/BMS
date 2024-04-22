import { axiosInstance } from "./axiosinstance"

export const BASEURL = ""

export const BookShowTickets = async(payload) => {
    try {
        const response = await axiosInstance().post("http://localhost:8080/api/bookings/book-show", payload)
        return response
    } catch (error) {
        return error
    }
}

export const GetBookingsOfUser = async() => {
    try {
        const response = await axiosInstance().get("http://localhost:8080/api/bookings/get-bookings")
        return response
    } catch (error) {
        return error
    }
}

export const MakePayment = async(payload) => {
    try {
        const response = await axiosInstance().post("http://localhost:8080/api/bookings/make-payment", payload)
        return response
    } catch (error) {
        return error
    }
}