'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Critical', value: 2, fill: 'hsl(var(--chart-5))' },
  { name: 'Warning', value: 3, fill: 'hsl(var(--chart-4))' },
  { name: 'Info', value: 5, fill: 'hsl(var(--chart-2))' },
  { name: 'Resolved', value: 8, fill: 'hsl(var(--chart-1))' },
]

export function AlertSeverityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Severity Distribution</CardTitle>
        <CardDescription>Classification of current and resolved alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} alerts`} />
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
