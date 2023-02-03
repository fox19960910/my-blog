import { LC_TOKEN_NAME } from './../contexts/containts'
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
    console.log('accessToken', accessToken)

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
        return Promise.reject(error)
    }
)
export default axiosInstance
