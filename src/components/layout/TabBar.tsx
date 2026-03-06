'use client'

import { ListTodo, Calendar, Gift, User } from 'lucide-react'
import { useUIStore, type TabId } from '@/store'
import { cn } from '@/lib/utils'

interface TabItem {
  id: TabId
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const tabs: TabItem[] = [
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'wishlist', label: 'Wishlist', icon: Gift },
  { id: 'profile', label: 'Profile', icon: User },
]

export function TabBar() {
  const { activeTab, setActiveTab } = useUIStore()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pointer-events-none">
      <nav
        className={cn(
          'max-w-[360px] mx-auto pointer-events-auto',
          'glass-panel-strong rounded-[30px] px-2 py-2',
          'flex items-center justify-around'
        )}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative flex items-center justify-center rounded-2xl p-2.5',
                'transition-all duration-250 ease-out',
                isActive
                  ? 'glass-chip-active scale-105 text-white'
                  : 'glass-chip hover:brightness-105 text-[hsl(var(--muted-foreground))]'
              )}
              aria-label={tab.label}
              title={tab.label}
            >
              <Icon className={cn('w-5 h-5', isActive && 'stroke-[2.3]')} />
            </button>
          )
        })}
      </nav>
    </div>
  )
}
