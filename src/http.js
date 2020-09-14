import Axios from 'axios'

const http = Axios.create({
  baseURL: 'http://112.74.99.5:3000/web/api/'
})

export default http
