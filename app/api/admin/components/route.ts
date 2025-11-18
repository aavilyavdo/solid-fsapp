import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const components = await sql(`
      SELECT bc.id, bc.name, bc.type, bc.bridge_id, ch.health_status
      FROM bridge_components bc
      LEFT JOIN component_health ch ON bc.id = ch.component_id
      ORDER BY bc.id DESC
    `)
    return Response.json(components)
  } catch (error) {
    console.error('[v0] Error fetching components:', error)
    return Response.json({ error: 'Failed to fetch components' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const sql = neon(process.env.DATABASE_URL!)

    const result = await sql(
      'INSERT INTO bridge_components (name, type, bridge_id) VALUES ($1, $2, $3) RETURNING *',
      [body.name, body.type, body.bridge_id]
    )

    const componentId = result[0].id
    await sql(
      'INSERT INTO component_health (component_id, health_status, last_checked) VALUES ($1, $2, NOW())',
      [componentId, body.health_status]
    )

    return Response.json(result[0])
  } catch (error) {
    console.error('[v0] Error creating component:', error)
    return Response.json({ error: 'Failed to create component' }, { status: 500 })
  }
}
