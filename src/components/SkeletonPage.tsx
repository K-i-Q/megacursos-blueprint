import { ReactNode } from 'react';
import { Construction } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { EmptyState } from '@/components/ui/empty-state';
import { LucideIcon } from 'lucide-react';

interface SkeletonPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function SkeletonPage({ title, description, icon }: SkeletonPageProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title={title} description={description} icon={icon} />
      <div className="glass-card rounded-xl p-8">
        <EmptyState
          variant="construction"
          title="Em validação com o cliente"
          description="Esta funcionalidade está sendo desenvolvida e será liberada em breve."
        />
      </div>
    </div>
  );
}
