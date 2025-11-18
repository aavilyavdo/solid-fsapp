'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function SystemSettings() {
  const [settings, setSettings] = useState({
    checkInterval: 60,
    criticalThreshold: 20,
    warningThreshold: 50,
    maxAlerts: 1000,
  })

  const [saved, setSaved] = useState(false)

  async function handleSaveSettings() {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (error) {
      console.error('[v0] Error saving settings:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Параметры системы</h2>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium">
              Интервал проверки (секунды)
            </label>
            <Input
              type="number"
              value={settings.checkInterval}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  checkInterval: parseInt(e.target.value),
                })
              }
              className="mt-2"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Как часто система проверяет статус мостов
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Порог критического состояния (%)
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              value={settings.criticalThreshold}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  criticalThreshold: parseInt(e.target.value),
                })
              }
              className="mt-2"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Оценка здоровья ниже этого значения = критическое состояние
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Порог предупреждения (%)
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              value={settings.warningThreshold}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  warningThreshold: parseInt(e.target.value),
                })
              }
              className="mt-2"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Оценка здоровья ниже этого значения = предупреждение
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Максимальное количество оповещений в истории
            </label>
            <Input
              type="number"
              value={settings.maxAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxAlerts: parseInt(e.target.value),
                })
              }
              className="mt-2"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Старые оповещения будут удалены при превышении лимита
            </p>
          </div>

          <div className="pt-4">
            <Button onClick={handleSaveSettings} className="gap-2">
              <Save className="h-4 w-4" />
              Сохранить настройки
            </Button>
            {saved && (
              <p className="mt-2 text-sm text-green-600">Настройки сохранены успешно</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
