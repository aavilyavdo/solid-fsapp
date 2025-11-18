import { getDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sql = getDb()
    const body = await request.json()
    const { isActive } = body

    const result = await sql(
      `UPDATE alerts 
       SET is_active = $1, resolved_at = CASE WHEN $1 = FALSE THEN NOW() ELSE resolved_at END
       WHERE id = $2
       RETURNING *`,
      [isActive, parseInt(params.id)]
    )

    if (!result.length) {
      return NextResponse.json(
        { error: 'Alert not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating alert:', error)
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sql = getDb()
    const result = await sql(
      `DELETE FROM alerts WHERE id = $1 RETURNING *`,
      [parseInt(params.id)]
    )

    if (!result.length) {
      return NextResponse.json(
        { error: 'Alert not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting alert:', error)
    return NextResponse.json(
      { error: 'Failed to delete alert' },
      { status: 500 }
    )
  }
}
