
const { axiosInstance } = require("./axiosinstance")

export const RegisterUser = async (payload) =>{
    try {
        const response= await axiosInstance().post("http://localhost:8080/api/users/register", payload)
        return response
    } catch (error) {
        return error
    }
}

export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance().post("http://localhost:8080/api/users/login", payload)
        return response
    } catch (error) {
        return error
    }
}

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance().get("http://localhost:8080/api/users/get-current-user")
        return response.data
    } catch (error) {
        return error
    }
}