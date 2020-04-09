import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3251/v1'
})