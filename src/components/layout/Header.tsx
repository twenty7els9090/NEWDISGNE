'use client'

import { Bell, ChevronDown, Users } from 'lucide-react'
import { useUserStore, useUIStore } from '@/store'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  onNotificationsClick?: () => void
  onSettingsClick?: () => void
}

export function Header({ onNotificationsClick, onSettingsClick }: HeaderProps) {
  const { user, families, currentFamilyId, setCurrentFamily } = useUserStore()
  const { activeTab } = useUIStore()

  const currentFamily = families.find((f) => f.id === currentFamilyId)

  const getTabTitle = () => {
    switch (activeTab) {
      case 'tasks':
        return 'Tasks'
      case 'events':
        return 'Events'
      case 'wishlist':
        return 'Wishlist'
      case 'profile':
        return 'Profile'
      default:
        return 'KINCIRCLE'
    }
  }

  return (
    <header className="sticky top-0 z-40 safe-area-top glass-panel-strong border-b border-white/45">
      <div className="max-w-[450px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {activeTab === 'tasks' && families.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="glass-chip inline-flex items-center gap-2 px-3 py-2 rounded-2xl max-w-[220px] transition-all hover:brightness-105">
                    <Users className="w-4 h-4 text-burgundy shrink-0" />
                    <span className="font-semibold text-[hsl(var(--foreground))] truncate">
                      {currentFamily?.name || 'Select family'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))] shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 rounded-2xl p-1 glass-panel-strong border-white/60"
                >
                  {families.map((family) => (
                    <DropdownMenuItem
                      key={family.id}
                      onClick={() => setCurrentFamily(family.id)}
                      className={cn(
                        'cursor-pointer rounded-xl',
                        family.id === currentFamilyId && 'bg-[rgba(122,123,255,0.16)]'
                      )}
                    >
                      <Users className="w-4 h-4 mr-2 text-burgundy" />
                      <span className="truncate">{family.name}</span>
                      {family.id === currentFamilyId && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {family.members?.length || 0}
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#585dce] via-[#7276ff] to-[#41d9d2] bg-clip-text text-transparent">
                {getTabTitle()}
              </h1>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNotificationsClick}
              className="glass-chip relative p-2.5 rounded-2xl transition-all hover:brightness-105"
            >
              <Bell className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full notification-badge" />
            </button>

            <button
              onClick={onSettingsClick}
              className="glass-chip flex items-center p-1 rounded-2xl transition-all hover:brightness-105"
            >
              <Avatar className="w-9 h-9 border border-white/70 avatar-ring">
                <AvatarImage src={user?.avatar_url || undefined} alt={user?.first_name || ''} />
                <AvatarFallback className="bg-burgundy text-white text-sm font-semibold">
                  {user?.first_name?.[0]?.toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
