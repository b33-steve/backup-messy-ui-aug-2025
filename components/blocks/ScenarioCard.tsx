interface ScenarioCardProps {
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  color: string;
  onClick?: () => void;
}

export function ScenarioCard({ category, title, description, priority, color, onClick }: ScenarioCardProps) {
  const priorityColors = {
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-green-500'
  };
  
  return (
    <div 
      className={`
        p-4 rounded-xl aspect-square
        bg-white/5 backdrop-blur-md 
        border ${priorityColors[priority]}
        hover:scale-105 hover:bg-white/10 
        transition-all cursor-pointer
        flex flex-col justify-between
      `}
      onClick={onClick}
      style={{
        aspectRatio: '1',
        minHeight: '180px',
        maxHeight: '180px'
      }}
    >
      <div>
        <div className={`text-sm font-semibold uppercase tracking-wider mb-2 ${color}`}>
          {category}
        </div>
        <h3 className="text-white font-medium mb-2">{title}</h3>
      </div>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
}