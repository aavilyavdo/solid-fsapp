'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/alerts', label: 'Alerts' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/admin', label: 'Admin', icon: Lock },
  ]

  return (
    <nav className="border-b border-border bg-card">
      <div className="flex items-center gap-6 px-6 py-3">
        <div className="text-lg font-bold text-foreground">Bridge Monitor</div>
        <div className="flex gap-1">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Button 
                  variant={pathname === link.href ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
