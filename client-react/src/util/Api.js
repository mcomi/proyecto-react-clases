import axios from 'axios'

export const apiLogin = axios.create({
  baseURL: `http://localhost:8080`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiCRM = axios.create({
  baseURL: `http://localhost:3001`,
  headers: {
    'Content-Type': 'application/json',
  },
})
