export function PM33RightSidebar() {
  return (
    <div className="space-y-4">
      <div className="text-white/80 font-semibold text-sm uppercase tracking-wide mb-4">
        Key Metrics
      </div>
      
      <div className="space-y-3">
        <MetricItem label="Signups" value="15" change="+5 this week" trend="up" />
        <MetricItem label="MRR" value="$2,400" change="+$300" trend="up" />
        <MetricItem label="Active Users" value="38" change="-2" trend="down" />
        <MetricItem label="Conversion" value="12.5%" change="+2.1%" trend="up" />
      </div>
      
      <div className="border-t border-white/10 pt-4">
        <div className="text-white/80 font-semibold text-sm uppercase tracking-wide mb-4">
          Competitive Landscape
        </div>
        <div className="space-y-2">
          <CompetitorItem name="Linear" status="monitoring" />
          <CompetitorItem name="Monday.com" status="active-threat" />
          <CompetitorItem name="Asana" status="opportunity" />
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-4">
        <div className="text-white/80 font-semibold text-sm uppercase tracking-wide mb-4">
          Recent Activity
        </div>
        <div className="space-y-2 text-xs">
          <ActivityItem text="New beta signup" time="2 minutes ago" type="success" />
          <ActivityItem text="Strategic analysis completed" time="15 minutes ago" type="info" />
          <ActivityItem text="Budget updated" time="1 hour ago" type="warning" />
        </div>
      </div>
    </div>
  );
}

function MetricItem({ label, value, change, trend }: { label: string; value: string; change: string; trend: 'up' | 'down' | 'neutral' }) {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-white/60';
  
  return (
    <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-white/60 text-sm">{label}</span>
        <span className="text-white font-semibold">{value}</span>
      </div>
      <div className={`text-xs ${trendColor} mt-1`}>
        {change}
      </div>
    </div>
  );
}

function CompetitorItem({ name, status }: { name: string; status: 'monitoring' | 'active-threat' | 'opportunity' }) {
  const statusColors = {
    'monitoring': 'bg-blue-500/20 text-blue-300',
    'active-threat': 'bg-red-500/20 text-red-300', 
    'opportunity': 'bg-green-500/20 text-green-300'
  };
  
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-all">
      <span className="text-white text-sm">{name}</span>
      <span className={`text-xs px-2 py-1 rounded ${statusColors[status]}`}>
        {status.replace('-', ' ')}
      </span>
    </div>
  );
}

function ActivityItem({ text, time, type }: { text: string; time: string; type: 'success' | 'info' | 'warning' }) {
  const typeColors = {
    success: 'bg-green-400',
    info: 'bg-blue-400',
    warning: 'bg-yellow-400'
  };
  
  return (
    <div className="flex items-start gap-2">
      <div className={`w-2 h-2 rounded-full mt-1 ${typeColors[type]}`}></div>
      <div>
        <div className="text-white text-sm">{text}</div>
        <div className="text-white/40 text-xs">{time}</div>
      </div>
    </div>
  );
}