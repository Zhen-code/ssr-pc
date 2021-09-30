export default ({ $axios }) => {
  $axios.interceptors.request.use((config) => {
    return config
  }, (err) => {
    console.log(err)
  })
  $axios.interceptors.response.use((res) => {
    return res
  }, (err) => {
    console.log(err)
  })
}
