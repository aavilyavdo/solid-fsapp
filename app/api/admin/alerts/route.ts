import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const alerts = await sql('SELECT * FROM alerts ORDER BY created_at DESC')
    return Response.json(alerts)
  } catch (error) {
    console.error('[v0] Error fetching alerts:', error)
    return Response.json({ error: 'Failed to fetch alerts' }, { status: 500 })
  }
}
