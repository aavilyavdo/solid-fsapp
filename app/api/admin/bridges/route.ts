import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const bridges = await sql('SELECT * FROM bridges ORDER BY id DESC')
    return Response.json(bridges)
  } catch (error) {
    console.error('[v0] Error fetching bridges:', error)
    return Response.json({ error: 'Failed to fetch bridges' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const sql = neon(process.env.DATABASE_URL!)

    const result = await sql(
      'INSERT INTO bridges (name, location, status, health_score) VALUES ($1, $2, $3, 95) RETURNING *',
      [body.name, body.location, body.status]
    )

    return Response.json(result[0])
  } catch (error) {
    console.error('[v0] Error creating bridge:', error)
    return Response.json({ error: 'Failed to create bridge' }, { status: 500 })
  }
}
