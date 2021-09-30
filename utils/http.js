import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true
})

service.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  return config
}, (err) => {
  console.log(err)
})
service.interceptors.response.use((res) => {
  if (res.data.code === '0000') {
    return res.data
  }
  return res
}, (err) => {
  console.log(err)
})

export default service
