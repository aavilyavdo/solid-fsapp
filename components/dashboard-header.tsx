'use client'

import { Bell, Settings, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Bridge Health Monitor</h1>
          <p className="text-sm text-muted-foreground">Real-time monitoring of drawbridge construction projects</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <div className="relative w-48">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search bridges..." 
                className="pl-8"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
