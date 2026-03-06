import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-[3px] focus-visible:ring-ring/30 transition-[color,box-shadow,background-color] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-white/45 bg-gradient-to-r from-[#6f73ff] to-[#48d9d3] text-white shadow-[0_6px_14px_rgba(78,92,158,0.25)]',
        secondary:
          'border-white/70 bg-white/58 text-[hsl(var(--foreground))]',
        destructive:
          'border-transparent bg-destructive text-white',
        outline:
          'border-white/65 bg-white/35 text-[hsl(var(--foreground))]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
