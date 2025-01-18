import { cn } from '@/utils/utils'
import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
    return (
        <div className={cn('container mx-auto px-4', className)} {...props}>
            {children}
        </div>
    )
}
