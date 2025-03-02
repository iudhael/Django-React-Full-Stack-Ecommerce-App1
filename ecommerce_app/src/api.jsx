import axios from 'axios'


const apiUrl = "/choreo-apis/ecommerceapp1/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
  })
  
export default api