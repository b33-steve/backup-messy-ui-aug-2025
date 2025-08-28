interface MetricRowProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricRow({ label, value, change, trend }: MetricRowProps) {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-white/60';
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
      <span className="text-white/60">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-white font-semibold">{value}</span>
        {change && (
          <span className={`text-sm ${trendColor}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}