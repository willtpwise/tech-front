import axios from 'axios'

var api
if (process.env.NODE_ENV === 'production') {
  api = 'https://rocky-dusk-46408.herokuapp.com'
} else {
  api = 'http://localhost:3000'
}

export default axios.create({
  baseURL: api,
  timeout: 3000
})
