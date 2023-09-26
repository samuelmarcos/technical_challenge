import axios, { AxiosInstance } from 'axios'
import { LoadConfig } from '@/configuration/load-environment'

const config = LoadConfig.getInstance().getInveronments()

export const AxiosHelper = {
  getInstance(): AxiosInstance {
    return axios.create({
      headers: {
        'X-Api-Key': config.API_KEY,
        'contentType': 'application/json'
      }
    })
  }
}