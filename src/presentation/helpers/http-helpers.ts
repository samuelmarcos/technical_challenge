import { HttpResponse } from "../protocols"


export const badRequest = (error: Error): HttpResponse => {
  return {
      statusCode: 400,
      body: error
  }
}

export const forbidden = (error: Error): HttpResponse => {
  return {
      statusCode: 403,
      body: error
  }
}