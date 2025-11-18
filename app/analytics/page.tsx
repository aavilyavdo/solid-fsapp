import { BridgeStatusChart } from '@/components/charts/bridge-status-chart'
import { ComponentHealthChart } from '@/components/charts/component-health-chart'
import { AlertSeverityChart } from '@/components/charts/alert-severity-chart'
import { TrendAnalysis } from '@/components/charts/trend-analysis'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Analytics - Bridge Health Monitor',
  description: 'Comprehensive analytics and data visualization',
}

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-sm text-muted-foreground">Monitor trends and analyze bridge health metrics</p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Main Pie Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <BridgeStatusChart />
          <ComponentHealthChart />
          <AlertSeverityChart />
        </div>

        {/* Trend Analysis */}
        <div className="grid gap-6 lg:grid-cols-2">
          <TrendAnalysis />
        </div>
      </div>
    </main>
  )
}
