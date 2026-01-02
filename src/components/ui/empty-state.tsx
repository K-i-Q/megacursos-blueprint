import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Construction } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: 'default' | 'construction';
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-2xl mb-4',
          variant === 'construction'
            ? 'bg-warning/20 text-warning'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {icon || <Construction className="h-8 w-8" />}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
