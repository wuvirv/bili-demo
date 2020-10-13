import Axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const http = Axios.create({
  baseURL: 'http://112.74.99.5:3000/web/api/'
})

http.interceptors.request.use(config => {
  NProgress.start()
  if (localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  return config
})

http.interceptors.response.use(config => {
  NProgress.done()
  return config
})

export default http
