'use client'

import { useState } from 'react'
import { AdminHeader } from '@/components/admin-header'
import { BridgesManagement } from '@/components/admin/bridges-management'
import { ComponentsManagement } from '@/components/admin/components-management'
import { AlertsManagement } from '@/components/admin/alerts-management'
import { SystemSettings } from '@/components/admin/system-settings'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'bridges' | 'components' | 'alerts' | 'settings'>('bridges')

  return (
    <main className="min-h-screen bg-background">
      <AdminHeader />
      <div className="border-b border-border">
        <div className="flex gap-1 p-6">
          <button
            onClick={() => setActiveTab('bridges')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'bridges'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Управление мостами
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'components'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Компоненты
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'alerts'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Оповещения
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Настройки
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'bridges' && <BridgesManagement />}
        {activeTab === 'components' && <ComponentsManagement />}
        {activeTab === 'alerts' && <AlertsManagement />}
        {activeTab === 'settings' && <SystemSettings />}
      </div>
    </main>
  )
}
