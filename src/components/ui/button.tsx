import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/35 aria-invalid:ring-destructive/25",
  {
    variants: {
      variant: {
        default:
          'text-white bg-gradient-to-r from-[#6f73ff] to-[#48d9d3] shadow-[0_10px_22px_rgba(78,92,158,0.28)] hover:brightness-105 active:scale-[0.98]',
        destructive:
          'bg-destructive text-white shadow-[0_10px_22px_rgba(178,42,74,0.3)] hover:brightness-105 active:scale-[0.98]',
        outline:
          'glass-chip text-[hsl(var(--foreground))] hover:brightness-105 active:scale-[0.98]',
        secondary:
          'border border-white/75 bg-white/70 text-[hsl(var(--foreground))] shadow-[0_6px_14px_rgba(76,86,136,0.12)] hover:bg-white/80 active:scale-[0.98]',
        ghost:
          'text-[hsl(var(--foreground))] hover:bg-white/45 active:scale-[0.98]',
        link: 'text-burgundy underline-offset-4 hover:underline',
        burgundy:
          'text-white bg-gradient-to-r from-[#6f73ff] to-[#48d9d3] shadow-[0_10px_22px_rgba(78,92,158,0.28)] hover:brightness-105 active:scale-[0.98]',
      },
      size: {
        default: 'h-10 px-5 py-2 has-[>svg]:px-4',
        sm: 'h-9 px-4 text-xs has-[>svg]:px-3',
        lg: 'h-11 px-6 text-base has-[>svg]:px-5',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
