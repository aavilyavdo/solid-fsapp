'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const componentData = [
  { name: 'Operational', value: 14, fill: 'hsl(var(--chart-1))' },
  { name: 'Maintenance', value: 2, fill: 'hsl(var(--chart-2))' },
  { name: 'Under Inspection', value: 1, fill: 'hsl(var(--chart-3))' },
]

export function ComponentBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bridge Status Distribution</CardTitle>
        <CardDescription>Overall status of all bridges</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={componentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {componentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
