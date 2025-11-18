export async function POST(request: Request) {
  try {
    const body = await request.json()
    // In a real app, you'd save these to a database
    // For now, we're just returning success
    return Response.json({
      success: true,
      settings: body,
    })
  } catch (error) {
    console.error('[v0] Error saving settings:', error)
    return Response.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
