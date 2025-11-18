'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const healthData = [
  { component: 'Cables', excellent: 2, good: 3, fair: 1, poor: 0, critical: 0 },
  { component: 'Motors', excellent: 1, good: 2, fair: 0, poor: 1, critical: 0 },
  { component: 'Deck', excellent: 0, good: 2, fair: 1, poor: 0, critical: 0 },
  { component: 'Support', excellent: 2, good: 1, fair: 0, poor: 0, critical: 0 },
  { component: 'Other', excellent: 0, good: 1, fair: 0, poor: 0, critical: 1 },
]

export function HealthMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Component Health Breakdown</CardTitle>
        <CardDescription>Distribution of component health status</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={healthData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="component" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="excellent" stackId="a" fill="hsl(var(--chart-1))" />
            <Bar dataKey="good" stackId="a" fill="hsl(var(--chart-2))" />
            <Bar dataKey="fair" stackId="a" fill="hsl(var(--chart-3))" />
            <Bar dataKey="poor" stackId="a" fill="hsl(var(--chart-4))" />
            <Bar dataKey="critical" stackId="a" fill="hsl(var(--chart-5))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
