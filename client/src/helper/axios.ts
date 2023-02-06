import { LC_TOKEN_NAME } from '../contexts/constants'
import { getStorage } from './localStorage'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL as string,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(async (config: any) => {
    const accessToken = getStorage(LC_TOKEN_NAME)
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
})

axiosInstance.interceptors.response.use(
    async (response) => {
        if (response && response.data) return response.data
        return response
    },
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data)
        } else {
            return Promise.reject(error.response)
        }
    }
)
export default axiosInstance
