import { DashboardHeader } from '@/components/dashboard-header'
import { BridgeOverview } from '@/components/bridge-overview'
import { AlertsSummary } from '@/components/alerts-summary'
import { HealthMetrics } from '@/components/health-metrics'
import { ComponentBreakdown } from '@/components/component-breakdown'

export const metadata = {
  title: 'Bridge Health Monitor - Dashboard',
  description: 'Real-time monitoring of drawbridge construction health and structural integrity',
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="space-y-6 p-6">
        {/* Top row: Bridge Overview and Alerts Summary */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BridgeOverview />
          </div>
          <AlertsSummary />
        </div>

        {/* Middle row: Health Metrics and Component Status */}
        <div className="grid gap-6 lg:grid-cols-2">
          <HealthMetrics />
          <ComponentBreakdown />
        </div>
      </div>
    </main>
  )
}
