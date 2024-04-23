import { BASEURL } from "./bookings"
const { axiosInstance } = require("./axiosinstance")

export const RegisterUser = async (payload) =>{
    try {
        const response= await axiosInstance().post(`https://${BASEURL}/api/users/register`, payload)
        return response
    } catch (error) {
        return error
    }
}

export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance().post(`https://${BASEURL}/api/users/login`, payload)
        return response
    } catch (error) {
        return error
    }
}

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance().get(`https://${BASEURL}/api/users/get-current-user`)
        return response.data
    } catch (error) {
        return error
    }
}