import { neon } from '@neondatabase/serverless'

let cachedSql: ReturnType<typeof neon> | null = null

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  
  if (!cachedSql) {
    cachedSql = neon(process.env.DATABASE_URL)
  }
  
  return cachedSql
}
