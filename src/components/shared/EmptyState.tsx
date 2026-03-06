'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4', className)}>
      <div className="glass-panel-strong w-16 h-16 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-burgundy/75" />
      </div>
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-1 text-center">{title}</h3>
      {description && (
        <p className="text-sm text-[hsl(var(--muted-foreground))] text-center max-w-[260px] mb-4">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}
