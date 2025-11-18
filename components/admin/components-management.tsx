'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface Component {
  id: number
  name: string
  type: string
  bridge_id: number
  health_status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical'
}

export function ComponentsManagement() {
  const [components, setComponents] = useState<Component[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newComponent, setNewComponent] = useState({
    name: '',
    type: '',
    bridge_id: 1,
    health_status: 'good' as const,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComponents()
  }, [])

  async function fetchComponents() {
    try {
      const response = await fetch('/api/admin/components')
      if (response.ok) {
        const data = await response.json()
        setComponents(data)
      }
    } catch (error) {
      console.error('[v0] Error fetching components:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddComponent() {
    if (!newComponent.name || !newComponent.type) {
      alert('Пожалуйста, заполните все поля')
      return
    }

    try {
      const response = await fetch('/api/admin/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComponent),
      })

      if (response.ok) {
        setNewComponent({
          name: '',
          type: '',
          bridge_id: 1,
          health_status: 'good',
        })
        setIsAdding(false)
        fetchComponents()
      }
    } catch (error) {
      console.error('[v0] Error adding component:', error)
    }
  }

  async function handleDeleteComponent(id: number) {
    if (!confirm('Вы уверены?')) return

    try {
      const response = await fetch(`/api/admin/components/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchComponents()
      }
    } catch (error) {
      console.error('[v0] Error deleting component:', error)
    }
  }

  if (loading) return <div className="text-center text-muted-foreground">Загрузка...</div>

  const getHealthColor = (status: string) => {
    const colors: Record<string, string> = {
      excellent: 'text-green-600',
      good: 'text-green-500',
      fair: 'text-yellow-500',
      poor: 'text-orange-600',
      critical: 'text-red-600',
    }
    return colors[status] || 'text-gray-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Компоненты мостов</h2>
        <Button
          onClick={() => setIsAdding(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Добавить компонент
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Новый компонент</h3>
          <div className="space-y-4">
            <Input
              placeholder="Название компонента"
              value={newComponent.name}
              onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
            />
            <Input
              placeholder="Тип (кабель, мотор, дека и т.д.)"
              value={newComponent.type}
              onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value })}
            />
            <select
              value={newComponent.health_status}
              onChange={(e) => setNewComponent({ ...newComponent, health_status: e.target.value as any })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            >
              <option value="excellent">Отлично</option>
              <option value="good">Хорошо</option>
              <option value="fair">Среднее</option>
              <option value="poor">Плохо</option>
              <option value="critical">Критично</option>
            </select>
            <div className="flex gap-2">
              <Button onClick={handleAddComponent} className="gap-2">
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
        {components.map((component) => (
          <Card key={component.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{component.name}</h3>
                <p className="text-sm text-muted-foreground">Тип: {component.type}</p>
                <p className={`mt-2 text-sm font-medium ${getHealthColor(component.health_status)}`}>
                  Статус: {component.health_status}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteComponent(component.id)}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
