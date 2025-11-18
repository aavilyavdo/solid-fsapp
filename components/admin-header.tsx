import { Lock } from 'lucide-react'

export function AdminHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Lock className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Административная панель</h1>
            <p className="text-sm text-muted-foreground">Управление системой мониторинга мостов</p>
          </div>
        </div>
      </div>
    </div>
  )
}
