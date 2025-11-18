'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react'

const stats = [
  {
    title: 'Critical Alerts',
    value: 2,
    description: 'Require immediate action',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-500/10',
  },
  {
    title: 'Warnings',
    value: 3,
    description: 'Monitor closely',
    icon: AlertTriangle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500/10',
  },
  {
    title: 'Info Alerts',
    value: 5,
    description: 'System information',
    icon: Info,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Resolved',
    value: 8,
    description: 'Today',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-500/10',
  },
]

export function AlertStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
