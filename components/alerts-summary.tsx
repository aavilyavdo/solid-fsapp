'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, AlertTriangle, Info } from 'lucide-react'

const alerts = [
  { id: 1, type: 'critical', count: 2, label: 'Critical', icon: AlertCircle, color: 'text-red-600' },
  { id: 2, type: 'warning', count: 3, label: 'Warning', icon: AlertTriangle, color: 'text-yellow-600' },
  { id: 3, type: 'info', count: 5, label: 'Info', icon: Info, color: 'text-blue-600' },
]

export function AlertsSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Summary</CardTitle>
        <CardDescription>Current system alerts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {alerts.map((alert) => {
          const Icon = alert.icon
          return (
            <div key={alert.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${alert.color}`} />
                <span className="font-medium text-foreground">{alert.label}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{alert.count}</div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
