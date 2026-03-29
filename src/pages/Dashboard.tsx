import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Bell, 
  Search, 
  Settings, 
  LogOut,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { name: 'Total Trade Volume', value: '$1.2M', change: '+12.5%', icon: TrendingUp, color: 'text-gold' },
  { name: 'Verified Miners', value: '450', change: '+8.2%', icon: Users, color: 'text-blue-400' },
  { name: 'Active Escrows', value: '24', change: '-2.4%', icon: ShieldCheck, color: 'text-green-400' },
  { name: 'Compliance Score', value: '98%', change: '+1.5%', icon: CheckCircle2, color: 'text-gold' },
];

const recentTrades = [
  { id: 'TRD-001', miner: 'Copper Belt Coop', buyer: 'Global Metals Inc.', amount: '$45,000', status: 'Completed', date: '2026-03-28' },
  { id: 'TRD-002', miner: 'Ndola Artisans', buyer: 'Swiss Refineries', amount: '$12,500', status: 'In Escrow', date: '2026-03-27' },
  { id: 'TRD-003', miner: 'Kabwe Mining Group', buyer: 'Tech Alloys Ltd.', amount: '$8,200', status: 'Pending Testing', date: '2026-03-26' },
  { id: 'TRD-004', miner: 'Solwezi Miners', buyer: 'China Strategic', amount: '$120,000', status: 'Completed', date: '2026-03-25' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-charcoal-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-jet-black border-r border-white/5 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=100" 
              alt="AfriTradeX Logo" 
              className="w-8 h-8 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold text-white tracking-tighter">
              AfriTrade<span className="text-gold">X</span>
            </span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink icon={LayoutDashboard} label="Dashboard" active />
          <SidebarLink icon={TrendingUp} label="Trades" />
          <SidebarLink icon={Users} label="Verified ASM" />
          <SidebarLink icon={ShieldCheck} label="Compliance" />
          <SidebarLink icon={FileText} label="Reports" />
          <SidebarLink icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-soft-grey hover:text-red-400 transition-colors w-full p-3 rounded-lg hover:bg-white/5"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-20 bg-jet-black border-b border-white/5 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-charcoal-black border border-white/10 rounded-full px-4 py-2 w-96">
            <Search size={18} className="text-soft-grey" />
            <input 
              type="text" 
              placeholder="Search trades, miners, or documents..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-soft-grey hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-jet-black text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">Admin User</p>
                <p className="text-xs text-soft-grey mt-1">Platform Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Platform Overview</h1>
              <p className="text-soft-grey mt-1">Welcome back, here's what's happening today.</p>
            </div>
            <button className="btn-primary py-2 px-6 text-sm">
              New Trade Entry
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 border-white/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-soft-grey text-sm font-medium">{stat.name}</h3>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Trades */}
            <div className="lg:col-span-2 glass-card p-8 border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Recent Trade Settlements</h2>
                <button className="text-gold text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-soft-grey uppercase tracking-widest border-b border-white/5">
                      <th className="pb-4 font-bold">Trade ID</th>
                      <th className="pb-4 font-bold">Miner/Coop</th>
                      <th className="pb-4 font-bold">Amount</th>
                      <th className="pb-4 font-bold">Status</th>
                      <th className="pb-4 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentTrades.map((trade) => (
                      <tr key={trade.id} className="border-b border-white/5 last:border-0">
                        <td className="py-4 font-mono text-gold">{trade.id}</td>
                        <td className="py-4 text-white font-medium">{trade.miner}</td>
                        <td className="py-4 text-white font-bold">{trade.amount}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            trade.status === 'Completed' ? 'bg-green-400/10 text-green-400' : 
                            trade.status === 'In Escrow' ? 'bg-gold/10 text-gold' : 'bg-blue-400/10 text-blue-400'
                          }`}>
                            {trade.status}
                          </span>
                        </td>
                        <td className="py-4 text-soft-grey">{trade.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compliance Alerts */}
            <div className="glass-card p-8 border-white/5">
              <h2 className="text-xl font-bold text-white mb-8">Compliance Alerts</h2>
              <div className="space-y-6">
                <AlertItem 
                  icon={AlertTriangle} 
                  color="text-gold" 
                  title="KYC Renewal Required" 
                  desc="Copper Belt Coop KYC expires in 3 days." 
                />
                <AlertItem 
                  icon={Clock} 
                  color="text-blue-400" 
                  title="Pending Verification" 
                  desc="New buyer 'Lumina Metals' awaiting document review." 
                />
                <AlertItem 
                  icon={CheckCircle2} 
                  color="text-green-400" 
                  title="Audit Completed" 
                  desc="Q1 ESG audit for Ndola Artisans verified." 
                />
              </div>
              <button className="btn-secondary w-full mt-8 py-3 text-sm">
                View Compliance Center
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
      active ? 'bg-gold text-jet-black' : 'text-soft-grey hover:bg-white/5 hover:text-white'
    }`}>
      <Icon size={20} />
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
  );
}

function AlertItem({ icon: Icon, color, title, desc }: { icon: any, color: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className={`mt-1 ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white leading-none">{title}</h4>
        <p className="text-xs text-soft-grey mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
