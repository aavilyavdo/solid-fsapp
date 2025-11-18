import { getDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()
    const { searchParams } = new URL(request.url)
    const severity = searchParams.get('severity')
    const bridgeId = searchParams.get('bridgeId')
    const isActive = searchParams.get('isActive')

    let query = `
      SELECT 
        a.id,
        a.severity,
        a.alert_message,
        a.is_active,
        a.created_at,
        a.resolved_at,
        bc.name as component_name,
        bc.component_type,
        b.name as bridge_name
      FROM alerts a
      JOIN bridge_components bc ON a.component_id = bc.id
      JOIN bridges b ON bc.bridge_id = b.id
      WHERE 1=1
    `

    const params: (string | boolean)[] = []

    if (severity) {
      query += ` AND a.severity = $${params.length + 1}`
      params.push(severity)
    }

    if (bridgeId) {
      query += ` AND b.id = $${params.length + 1}`
      params.push(bridgeId)
    }

    if (isActive !== null) {
      query += ` AND a.is_active = $${params.length + 1}`
      params.push(isActive === 'true')
    }

    query += ` ORDER BY a.created_at DESC`

    const alerts = await sql(query, params)

    return NextResponse.json(alerts)
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const sql = getDb()
    const body = await request.json()
    const { componentId, severity, alertMessage } = body

    const result = await sql(
      `INSERT INTO alerts (component_id, severity, alert_message, is_active)
       VALUES ($1, $2, $3, TRUE)
       RETURNING *`,
      [componentId, severity, alertMessage]
    )

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating alert:', error)
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    )
  }
}
