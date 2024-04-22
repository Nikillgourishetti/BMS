import { axiosInstance } from "./axiosinstance"

export const GetAllMovies = async (payload) =>{
    try {
        const response = await axiosInstance().get("http://localhost:8080/api/movies/list", payload)
        return response
    } catch (error) {
        return error
    }
}

export const GetMovieById = async (movieId) => {
    try {
        const response = await axiosInstance().get(`http://localhost:8080/api/movies/get-by-id/${movieId}`)
        return response
    } catch (error) {
        return error
    }
}

export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance().post("http://localhost:8080/api/movies/add-movie", payload)
        return response
    } catch (error) {
        return error
    }
}

export const UpdateMovie = async (payload) =>{
    try {
        const response = await axiosInstance().post("http://localhost:8080/api/movies/update-movie", payload)
        return response
    } catch (error) {
        return error
    }
}

export const DeleteMovie = async (payload) =>{
    try {
        const response = await axiosInstance().post("http://localhost:8080/api/movies/delete-movie", payload)
        return response
    } catch (error) {
        return error
    }
}