import type { ReactNode } from 'react';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  full?: boolean;
}

export default function Sheet({ open, onClose, title, children, full }: SheetProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`relative w-full max-w-lg bg-white rounded-t-3xl shadow-2xl animate-slide-up flex flex-col ${
          full ? 'h-[92vh]' : 'max-h-[88vh]'
        }`}
      >
        <div className="flex items-center justify-center pt-2.5 pb-1 shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>
        {title && (
          <div className="flex items-center justify-between px-5 pb-3 shrink-0 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-lg">
              ×
            </button>
          </div>
        )}
        <div className="overflow-y-auto grow safe-bottom">{children}</div>
      </div>
    </div>
  );
}
