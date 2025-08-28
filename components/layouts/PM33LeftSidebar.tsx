export function PM33LeftSidebar() {
  return (
    <div className="space-y-4">
      <div className="text-white/80 font-semibold text-sm uppercase tracking-wide mb-4">
        Strategic Tools
      </div>
      
      <div className="space-y-2">
        <SidebarItem icon="🎯" label="Strategic Chat" active />
        <SidebarItem icon="📊" label="Analytics" />
        <SidebarItem icon="🗃️" label="Data Intelligence" />
        <SidebarItem icon="🔗" label="Integrations" />
      </div>
      
      <div className="border-t border-white/10 pt-4">
        <div className="text-white/80 font-semibold text-sm uppercase tracking-wide mb-4">
          Company Context
        </div>
        <div className="space-y-2">
          <SidebarItem icon="🏢" label="Company Profile" />
          <SidebarItem icon="👥" label="Team & Resources" />
          <SidebarItem icon="💰" label="Budget Overview" />
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <button className={`
      w-full px-3 py-2 rounded-lg flex items-center gap-3 transition-all text-left
      ${active 
        ? 'bg-white/10 text-white' 
        : 'text-white/60 hover:text-white hover:bg-white/5'
      }
    `}>
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}