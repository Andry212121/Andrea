import type { ReactNode } from 'react';

interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function EmptyState({ emoji, title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6">
      <div className="text-4xl mb-3">{emoji}</div>
      <div className="font-bold text-gray-800">{title}</div>
      {subtitle && <div className="text-sm text-gray-500 mt-1 max-w-xs">{subtitle}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
