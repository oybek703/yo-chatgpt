import { config } from 'dotenv'
import { join } from 'path'

export function getEnvConfig() {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const appRoot = join(__dirname, '../', '../')
  const enfFilePath = join(appRoot, isDevelopment ? '.development.env' : '.env')
  config({ path: enfFilePath })
}
