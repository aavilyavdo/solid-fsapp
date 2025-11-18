import { neon } from '@neondatabase/serverless'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const sql = neon(process.env.DATABASE_URL!)

    const result = await sql(
      'UPDATE alerts SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [body.status, params.id]
    )

    return Response.json(result[0])
  } catch (error) {
    console.error('[v0] Error updating alert:', error)
    return Response.json({ error: 'Failed to update alert' }, { status: 500 })
  }
}
