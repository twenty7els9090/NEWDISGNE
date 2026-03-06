'use client'

import { Gift, Cake } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface BirthdayUser {
  id: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  birthday: string
  hasWishlist?: boolean
}

interface BirthdayRemindersProps {
  users: BirthdayUser[]
  onUserClick?: (userId: string) => void
}

export function BirthdayReminders({ users, onUserClick }: BirthdayRemindersProps) {
  if (users.length === 0) return null

  const sortedUsers = [...users].sort((a, b) => {
    const today = new Date()
    const aDate = new Date(a.birthday)
    const bDate = new Date(b.birthday)

    aDate.setFullYear(today.getFullYear())
    bDate.setFullYear(today.getFullYear())

    if (aDate < today) aDate.setFullYear(today.getFullYear() + 1)
    if (bDate < today) bDate.setFullYear(today.getFullYear() + 1)

    return aDate.getTime() - bDate.getTime()
  })

  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-[hsl(var(--muted-foreground))] mb-2 px-4">
        Upcoming birthdays
      </h3>
      <div className="overflow-x-auto horizontal-scroll -mx-4 px-4">
        <div className="flex gap-3 pb-2">
          {sortedUsers.map((user) => (
            <BirthdayCard key={user.id} user={user} onClick={() => onUserClick?.(user.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface BirthdayCardProps {
  user: BirthdayUser
  onClick?: () => void
}

function BirthdayCard({ user, onClick }: BirthdayCardProps) {
  const birthday = new Date(user.birthday)
  const today = new Date()

  const nextBirthday = new Date(birthday)
  nextBirthday.setFullYear(today.getFullYear())
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1)
  }

  const daysUntil = Math.ceil(
    (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  const isToday = daysUntil === 0
  const isTomorrow = daysUntil === 1
  const formattedDate = format(birthday, 'd MMM', { locale: ru })

  return (
    <button
      onClick={onClick}
      className={cn(
        'glass-panel flex-shrink-0 flex flex-col items-center gap-2.5 p-3 rounded-2xl',
        'transition-all duration-200 hover:scale-[1.03] min-w-[88px]'
      )}
    >
      <div className="relative">
        <Avatar className="w-12 h-12 border border-white/70 shadow-sm">
          <AvatarImage src={user.avatar_url || undefined} />
          <AvatarFallback className="bg-burgundy text-white text-sm">
            {user.first_name?.[0]?.toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>

        {isToday && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full glass-chip-active flex items-center justify-center">
            <Cake className="w-3 h-3 text-white" />
          </div>
        )}

        {user.hasWishlist && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full glass-chip flex items-center justify-center">
            <Gift className="w-3 h-3 text-burgundy" />
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs font-semibold text-[hsl(var(--foreground))] truncate max-w-[72px]">
          {user.first_name}
        </p>
        <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
          {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : formattedDate}
        </p>
      </div>
    </button>
  )
}
