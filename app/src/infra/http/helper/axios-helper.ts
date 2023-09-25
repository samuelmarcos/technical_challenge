import axios, { AxiosInstance } from 'axios'

export const AxiosHelper = {
  getInstance(): AxiosInstance {
    return axios.create()
  }
}