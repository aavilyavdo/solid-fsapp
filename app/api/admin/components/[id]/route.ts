import { neon } from '@neondatabase/serverless'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    await sql('DELETE FROM component_health WHERE component_id = $1', [params.id])
    await sql('DELETE FROM bridge_components WHERE id = $1', [params.id])

    return Response.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting component:', error)
    return Response.json({ error: 'Failed to delete component' }, { status: 500 })
  }
}
