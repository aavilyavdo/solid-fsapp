'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useState } from 'react'

interface Alert {
  id: number
  component: string
  bridge: string
  message: string
  severity: 'critical' | 'warning' | 'info'
  timestamp: string
  isActive: boolean
}

const alerts: Alert[] = [
  {
    id: 1,
    component: 'Motor Assembly A',
    bridge: 'Tower Bridge Prime',
    message: 'Motor stress level critically high - stop operations immediately',
    severity: 'critical',
    timestamp: '5 minutes ago',
    isActive: true,
  },
  {
    id: 2,
    component: 'Main Cable Left',
    bridge: 'Riverside Draw',
    message: 'Cable showing signs of corrosion - immediate attention required',
    severity: 'critical',
    timestamp: '12 minutes ago',
    isActive: true,
  },
  {
    id: 3,
    component: 'Deck Section North',
    bridge: 'Tower Bridge Prime',
    message: 'Deck section showing wear patterns - schedule maintenance',
    severity: 'warning',
    timestamp: '28 minutes ago',
    isActive: true,
  },
  {
    id: 4,
    component: 'Hinges',
    bridge: 'Riverside Draw',
    message: 'Hinge temperature elevated - monitor closely',
    severity: 'warning',
    timestamp: '45 minutes ago',
    isActive: true,
  },
  {
    id: 5,
    component: 'Counterweight System',
    bridge: 'Riverside Draw',
    message: 'Counterweight alignment off by 2mm',
    severity: 'warning',
    timestamp: '1 hour ago',
    isActive: true,
  },
  {
    id: 6,
    component: 'Support Frame Main',
    bridge: 'Tower Bridge Prime',
    message: 'Routine inspection completed successfully',
    severity: 'info',
    timestamp: '2 hours ago',
    isActive: false,
  },
  {
    id: 7,
    component: 'Motor Unit',
    bridge: 'Harbor Gate',
    message: 'Scheduled maintenance window opened',
    severity: 'info',
    timestamp: '3 hours ago',
    isActive: false,
  },
  {
    id: 8,
    component: 'Cable Assembly',
    bridge: 'Harbor Gate',
    message: 'Monthly health check performed',
    severity: 'info',
    timestamp: '4 hours ago',
    isActive: false,
  },
]

const severityConfig = {
  critical: { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-500/10', badgeColor: 'bg-red-500/10 text-red-600' },
  warning: { icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-500/10', badgeColor: 'bg-yellow-500/10 text-yellow-600' },
  info: { icon: Info, color: 'text-blue-600', bgColor: 'bg-blue-500/10', badgeColor: 'bg-blue-500/10 text-blue-600' },
}

export function AlertsList() {
  const [alerts_, setAlerts] = useState(alerts)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const handleResolve = (id: number) => {
    setAlerts(alerts_.map(alert => alert.id === id ? { ...alert, isActive: false } : alert))
  }

  const groupedAlerts = {
    active: alerts_.filter(a => a.isActive),
    resolved: alerts_.filter(a => !a.isActive),
  }

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      {groupedAlerts.active.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts ({groupedAlerts.active.length})</CardTitle>
            <CardDescription>Alerts requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {groupedAlerts.active.map((alert) => {
              const config = severityConfig[alert.severity]
              const Icon = config.icon
              return (
                <div key={alert.id} className={`rounded-lg border border-border p-4 ${config.bgColor}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className={`h-5 w-5 ${config.color} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{alert.component}</h4>
                          <Badge className={config.badgeColor}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{alert.bridge}</p>
                        <p className="text-sm text-foreground mb-2">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleResolve(alert.id)}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Resolved Alerts */}
      {groupedAlerts.resolved.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resolved Alerts ({groupedAlerts.resolved.length})</CardTitle>
            <CardDescription>Alerts that have been addressed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {groupedAlerts.resolved.map((alert) => {
              const config = severityConfig[alert.severity]
              const Icon = config.icon
              return (
                <div 
                  key={alert.id} 
                  className="rounded-lg border border-border p-4 bg-muted/30 opacity-75"
                  onClick={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className={`h-5 w-5 ${config.color} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{alert.component}</h4>
                          <Badge variant="outline" className="text-xs">
                            RESOLVED
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.bridge}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
