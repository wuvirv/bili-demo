import Axios from 'axios'

const http = Axios.create({
  baseURL: 'http://112.74.99.5:3000/web/api/'
})

http.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  return config
})

export default http
