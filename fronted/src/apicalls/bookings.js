import { axiosInstance } from "./axiosinstance"

export const BASEURL = "bms-c.onrender.com"

export const BookShowTickets = async(payload) => {
    try {
        const response = await axiosInstance().post(`https://${BASEURL}/api/bookings/book-show`, payload)
        return response
    } catch (error) {
        return error
    }
}

export const GetBookingsOfUser = async() => {
    try {
        const response = await axiosInstance().get(`https://${BASEURL}/api/bookings/get-bookings`)
        return response
    } catch (error) {
        return error
    }
}

export const MakePayment = async(payload) => {
    try {
        const response = await axiosInstance().post(`https://${BASEURL}/api/bookings/make-payment`, payload)
        return response
    } catch (error) {
        return error
    }
}