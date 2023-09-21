import { EnvTypes } from './EnvTypes'
import { config } from 'dotenv'
import { resolve } from 'path'

export class LoadConfig {
  static instance: LoadConfig

  private constructor() {}

  static getInstance(): LoadConfig {
    if(!LoadConfig.instance) {
      LoadConfig.instance = new LoadConfig()
    }
    return LoadConfig.instance
  }

  getInveronments():EnvTypes {
    const env: NodeJS.ProcessEnv = process.env

    const nodeEnv = env.NODE_ENV || 'local'

    const path = resolve(__dirname, '..', '..', `.env.${nodeEnv}`)

    config({ path: path })

    const configuration: EnvTypes = {
      ENV: env.ENV,
      REGION:env.REGION,
      TABLE_NAME:env.TABLE_NAME,
      SECRET: env.SECRET
    }

    return configuration
  }
}