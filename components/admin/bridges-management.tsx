'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface Bridge {
  id: number
  name: string
  location: string
  status: 'operational' | 'maintenance' | 'under_inspection'
  health_score: number
}

export function BridgesManagement() {
  const [bridges, setBridges] = useState<Bridge[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newBridge, setNewBridge] = useState({
    name: '',
    location: '',
    status: 'operational' as const,
  })
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBridges()
  }, [])

  async function fetchBridges() {
    try {
      const response = await fetch('/api/admin/bridges')
      if (response.ok) {
        const data = await response.json()
        setBridges(data)
      }
    } catch (error) {
      console.error('[v0] Error fetching bridges:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddBridge() {
    if (!newBridge.name || !newBridge.location) {
      alert('Пожалуйста, заполните все поля')
      return
    }

    try {
      const response = await fetch('/api/admin/bridges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBridge),
      })

      if (response.ok) {
        setNewBridge({ name: '', location: '', status: 'operational' })
        setIsAdding(false)
        fetchBridges()
      }
    } catch (error) {
      console.error('[v0] Error adding bridge:', error)
    }
  }

  async function handleDeleteBridge(id: number) {
    if (!confirm('Вы уверены?')) return

    try {
      const response = await fetch(`/api/admin/bridges/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchBridges()
      }
    } catch (error) {
      console.error('[v0] Error deleting bridge:', error)
    }
  }

  if (loading) return <div className="text-center text-muted-foreground">Загрузка...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Все мосты</h2>
        <Button
          onClick={() => setIsAdding(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Добавить мост
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Новый мост</h3>
          <div className="space-y-4">
            <Input
              placeholder="Название моста"
              value={newBridge.name}
              onChange={(e) => setNewBridge({ ...newBridge, name: e.target.value })}
            />
            <Input
              placeholder="Местоположение"
              value={newBridge.location}
              onChange={(e) => setNewBridge({ ...newBridge, location: e.target.value })}
            />
            <select
              value={newBridge.status}
              onChange={(e) => setNewBridge({ ...newBridge, status: e.target.value as any })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            >
              <option value="operational">Рабочий</option>
              <option value="maintenance">Техническое обслуживание</option>
              <option value="under_inspection">Под проверкой</option>
            </select>
            <div className="flex gap-2">
              <Button onClick={handleAddBridge} className="gap-2">
                <Save className="h-4 w-4" />
                Сохранить
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAdding(false)}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Отмена
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {bridges.map((bridge) => (
          <Card key={bridge.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{bridge.name}</h3>
                <p className="text-sm text-muted-foreground">{bridge.location}</p>
                <div className="mt-2 flex gap-4 text-sm">
                  <span>
                    Статус:{' '}
                    <span
                      className={`font-medium ${
                        bridge.status === 'operational'
                          ? 'text-green-600'
                          : bridge.status === 'maintenance'
                            ? 'text-yellow-600'
                            : 'text-blue-600'
                      }`}
                    >
                      {bridge.status === 'operational'
                        ? 'Рабочий'
                        : bridge.status === 'maintenance'
                          ? 'Обслуживание'
                          : 'Под проверкой'}
                    </span>
                  </span>
                  <span>
                    Здоровье: <span className="font-medium">{bridge.health_score}%</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingId(bridge.id)}
                  className="gap-2"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteBridge(bridge.id)}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
