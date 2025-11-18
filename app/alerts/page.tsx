import { AlertsList } from '@/components/alerts-list'
import { AlertFilters } from '@/components/alert-filters'
import { AlertStats } from '@/components/alert-stats'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Alerts - Bridge Health Monitor',
  description: 'View and manage all bridge health alerts',
}

export default function AlertsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alert Management</h1>
            <p className="text-sm text-muted-foreground">Monitor and manage all system alerts</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <AlertStats />
        <AlertFilters />
        <AlertsList />
      </div>
    </main>
  )
}
