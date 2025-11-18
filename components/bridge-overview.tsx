'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const bridges = [
  {
    id: 1,
    name: 'Tower Bridge Prime',
    location: 'Downtown District',
    status: 'operational',
    statusColor: 'bg-green-500/10 text-green-600',
    components: 7,
    alerts: 0,
    healthScore: 92,
  },
  {
    id: 2,
    name: 'Riverside Draw',
    location: 'Commerce Zone',
    status: 'maintenance',
    statusColor: 'bg-yellow-500/10 text-yellow-600',
    components: 5,
    alerts: 1,
    healthScore: 78,
  },
  {
    id: 3,
    name: 'Harbor Gate',
    location: 'Port Area',
    status: 'under_inspection',
    statusColor: 'bg-blue-500/10 text-blue-600',
    components: 3,
    alerts: 0,
    healthScore: 85,
  },
  {
    id: 4,
    name: 'Central Crossing',
    location: 'City Center',
    status: 'operational',
    statusColor: 'bg-green-500/10 text-green-600',
    components: 4,
    alerts: 2,
    healthScore: 88,
  },
]

export function BridgeOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bridge Status Overview</CardTitle>
        <CardDescription>Monitor all drawbridges in the construction project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bridges.map((bridge) => (
            <div key={bridge.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{bridge.name}</h3>
                  <Badge className={bridge.statusColor}>
                    {bridge.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{bridge.location}</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{bridge.healthScore}%</p>
                  <p className="text-xs text-muted-foreground">Health Score</p>
                </div>
                <div className="flex gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{bridge.components}</p>
                    <p className="text-xs text-muted-foreground">Components</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{bridge.alerts}</p>
                    <p className="text-xs text-muted-foreground">Active Alerts</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
