interface StepperProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export default function Stepper({ value, onChange, min = 0, max = 99, label }: StepperProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <div className="flex items-center gap-3 bg-gray-50 rounded-full px-1 py-1 border border-gray-200">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full bg-white shadow-sm text-emerald-700 font-bold text-lg flex items-center justify-center disabled:opacity-30"
        >
          −
        </button>
        <span className="w-6 text-center font-bold text-gray-800 tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full bg-white shadow-sm text-emerald-700 font-bold text-lg flex items-center justify-center disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}
