import { neon } from '@neondatabase/serverless'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Delete related data first
    await sql('DELETE FROM health_readings WHERE bridge_id = $1', [params.id])
    await sql('DELETE FROM component_health WHERE component_id IN (SELECT id FROM bridge_components WHERE bridge_id = $1)', [params.id])
    await sql('DELETE FROM bridge_components WHERE bridge_id = $1', [params.id])
    await sql('DELETE FROM bridges WHERE id = $1', [params.id])

    return Response.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting bridge:', error)
    return Response.json({ error: 'Failed to delete bridge' }, { status: 500 })
  }
}
