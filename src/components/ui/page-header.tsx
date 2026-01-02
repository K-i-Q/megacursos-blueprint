import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LucideIcon, Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  action,
  children,
  className,
}: PageHeaderProps) {
  const ActionIcon = action?.icon || Plus;

  return (
    <div className={cn('mb-6 lg:mb-8', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Icon className="h-6 w-6" />
            </div>
          )}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
        {action && (
          <Button
            onClick={action.onClick}
            className="bg-gradient-primary hover:opacity-90 glow-primary gap-2"
          >
            <ActionIcon className="h-4 w-4" />
            {action.label}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
