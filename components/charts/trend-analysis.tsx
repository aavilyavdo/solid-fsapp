'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'

const trendData = [
  { time: '12:00 AM', temperature: 35.2, stress: 44.8, humidity: 65.5 },
  { time: '2:00 AM', temperature: 34.9, stress: 44.2, humidity: 66.1 },
  { time: '4:00 AM', temperature: 35.8, stress: 45.5, humidity: 64.2 },
  { time: '6:00 AM', temperature: 36.5, stress: 46.2, humidity: 63.8 },
  { time: '8:00 AM', temperature: 38.2, stress: 52.1, humidity: 61.5 },
  { time: '10:00 AM', temperature: 40.1, stress: 58.5, humidity: 59.2 },
  { time: '12:00 PM', temperature: 42.5, stress: 62.3, humidity: 57.8 },
  { time: '2:00 PM', temperature: 41.8, stress: 60.1, humidity: 58.5 },
  { time: '4:00 PM', temperature: 39.5, stress: 55.4, humidity: 60.2 },
  { time: '6:00 PM', temperature: 37.2, stress: 48.3, humidity: 62.1 },
]

export function TrendAnalysis() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Component Health Trends</CardTitle>
        <CardDescription>24-hour trend analysis of temperature, stress, and humidity</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="temperature" 
              stroke="hsl(var(--chart-1))" 
              fillOpacity={1} 
              fill="url(#colorTemperature)" 
              name="Temperature (°C)"
            />
            <Area 
              type="monotone" 
              dataKey="stress" 
              stroke="hsl(var(--chart-2))" 
              fillOpacity={1} 
              fill="url(#colorStress)" 
              name="Stress Level (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
