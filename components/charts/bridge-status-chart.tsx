'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Operational', value: 2, fill: 'hsl(var(--chart-1))' },
  { name: 'Maintenance', value: 1, fill: 'hsl(var(--chart-2))' },
  { name: 'Under Inspection', value: 1, fill: 'hsl(var(--chart-3))' },
]

export function BridgeStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bridge Status Distribution</CardTitle>
        <CardDescription>Current status of all drawbridges</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} bridges`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                {item.name}
              </span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
