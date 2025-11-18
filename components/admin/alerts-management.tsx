'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Alert {
  id: number
  message: string
  severity: 'info' | 'warning' | 'critical'
  status: 'active' | 'resolved'
  created_at: string
}

export function AlertsManagement() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlerts()
  }, [])

  async function fetchAlerts() {
    try {
      const response = await fetch('/api/admin/alerts')
      if (response.ok) {
        const data = await response.json()
        setAlerts(data)
      }
    } catch (error) {
      console.error('[v0] Error fetching alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleResolveAlert(id: number) {
    try {
      const response = await fetch(`/api/admin/alerts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved' }),
      })

      if (response.ok) {
        fetchAlerts()
      }
    } catch (error) {
      console.error('[v0] Error resolving alert:', error)
    }
  }

  if (loading) return <div className="text-center text-muted-foreground">Загрузка...</div>

  const activeAlerts = alerts.filter((a) => a.status === 'active')
  const resolvedAlerts = alerts.filter((a) => a.status === 'resolved')

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-blue-600" />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-xl font-semibold">Активные оповещения ({activeAlerts.length})</h2>
        <div className="space-y-4">
          {activeAlerts.length === 0 ? (
            <div className="rounded-lg border border-border bg-muted/50 p-6 text-center text-muted-foreground">
              Нет активных оповещений
            </div>
          ) : (
            activeAlerts.map((alert) => (
              <Card key={alert.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Решено
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Решённые оповещения ({resolvedAlerts.length})</h2>
        <div className="space-y-4">
          {resolvedAlerts.length === 0 ? (
            <div className="rounded-lg border border-border bg-muted/50 p-6 text-center text-muted-foreground">
              Нет решённых оповещений
            </div>
          ) : (
            resolvedAlerts.map((alert) => (
              <Card key={alert.id} className="p-6 opacity-60">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(alert.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
