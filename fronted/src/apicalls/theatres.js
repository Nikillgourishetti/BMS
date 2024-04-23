import { axiosInstance } from "./axiosinstance"
import { BASEURL } from "./bookings"

export const AddTheatre = async (payload) => {
    try {
        const response = await axiosInstance().post(`https://${BASEURL}/api/theatres/add-theatre`, payload)
         return response
    } catch (error) {
        return error
    }
}

export const UpdateTheatre = async (payload) => {
    try {
        const response = await axiosInstance().post(`https://${BASEURL}/api/theatres/update-theatre`, payload)
         return response
    } catch (error) {
        return error
    }
}

export const DeleteTheatre = async (payload) => {
    try {
        const response = await axiosInstance().post(`https://${BASEURL}/api/theatres/delete-theatre`, payload)
         return response
    } catch (error) {
        return error
    }
}

export const GetTheatresByUserId = async (payload) => {
    try {
        const response = await axiosInstance().get(`https://${BASEURL}/api/theatres/get-all-theatres-by-user-id`, payload)
         return response
    } catch (error) {
        return error
    }
}

export const GetAllTheatres = async () => {
    try {
        const response = await axiosInstance().get(`https://${BASEURL}/api/theatres/get-all-theatres`)
        return response
    } catch (error) {
        return error
    }
}

export const GetAllTheatresForMovie = async (payload) => {
    try {
        const response = await axiosInstance().post(`https://${BASEURL}/api/theatres/get-theatres-for-movie`, payload)
        return response
    } catch (error) {
        return error
    }
}