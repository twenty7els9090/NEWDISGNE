import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'placeholder:text-[hsl(var(--muted-foreground))] flex field-sizing-content min-h-20 w-full rounded-2xl border border-white/70 bg-white/45 px-3.5 py-2.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.66),0_8px_16px_rgba(71,84,141,0.11)] backdrop-blur-md transition-[border-color,box-shadow,background-color] outline-none disabled:cursor-not-allowed disabled:opacity-55',
        'focus-visible:border-white focus-visible:bg-white/62 focus-visible:ring-[3px] focus-visible:ring-ring/25',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
