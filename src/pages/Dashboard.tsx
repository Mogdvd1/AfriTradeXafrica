import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  AlertTriangle,
  Shield,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import TwoFactorModal from '../components/TwoFactorModal';

const stats = [
  { name: 'Total Trade Volume', value: '$1.2M', change: '+12.5%', icon: TrendingUp, color: 'text-gold' },
  { name: 'Verified Miners', value: '450', change: '+8.2%', icon: Users, color: 'text-blue-400' },
  { name: 'Active Escrows', value: '24', change: '-2.4%', icon: ShieldCheck, color: 'text-green-400' },
  { name: 'Compliance Score', value: '98%', change: '+1.5%', icon: CheckCircle2, color: 'text-gold' },
];

const chartData = [
  { month: 'Oct', volume: 450000 },
  { month: 'Nov', volume: 520000 },
  { month: 'Dec', volume: 480000 },
  { month: 'Jan', volume: 610000 },
  { month: 'Feb', volume: 750000 },
  { month: 'Mar', volume: 1200000 },
];

const recentTrades = [
  { 
    id: 'TRD-001', 
    miner: 'Copper Belt Coop', 
    buyer: 'Global Metals Inc.', 
    amount: '$45,000', 
    status: 'Completed', 
    date: '2026-03-28',
    mineral: 'Copper',
    quantity: '15 Tons',
    grade: '99.9% Cu',
    price: '$3,000/Ton',
    docs: ['Assay Certificate', 'Export Permit', 'Bill of Lading']
  },
  { 
    id: 'TRD-002', 
    miner: 'Ndola Artisans', 
    buyer: 'Swiss Refineries', 
    amount: '$12,500', 
    status: 'In Escrow', 
    date: '2026-03-27',
    mineral: 'Cobalt',
    quantity: '2 Tons',
    grade: '15% Co',
    price: '$6,250/Ton',
    docs: ['Origin Certificate', 'Testing Report']
  },
  { 
    id: 'TRD-003', 
    miner: 'Kabwe Mining Group', 
    buyer: 'Tech Alloys Ltd.', 
    amount: '$8,200', 
    status: 'Pending Testing', 
    date: '2026-03-26',
    mineral: 'Zinc',
    quantity: '10 Tons',
    grade: '45% Zn',
    price: '$820/Ton',
    docs: ['Manifest']
  },
  { 
    id: 'TRD-004', 
    miner: 'Solwezi Miners', 
    buyer: 'China Strategic', 
    amount: '$120,000', 
    status: 'Completed', 
    date: '2026-03-25',
    mineral: 'Copper',
    quantity: '40 Tons',
    grade: '98.5% Cu',
    price: '$3,000/Ton',
    docs: ['Assay Certificate', 'Export Permit', 'Logistics Plan']
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [is2FAOpen, setIs2FAOpen] = useState(false);
  const [isNewTradeModalOpen, setIsNewTradeModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<typeof recentTrades[0] | null>(null);
  const [currentView, setCurrentView] = useState('overview');

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSensitiveAction = (actionName: string) => {
    setPendingAction(actionName);
    setIs2FAOpen(true);
  };

  const on2FAVerify = () => {
    setIs2FAOpen(false);
    if (pendingAction === 'New Trade Entry') {
      setIsNewTradeModalOpen(true);
    } else if (pendingAction === 'Download Trade Audit Trail') {
      // Simulate download
      alert(`Downloading Audit Trail for ${selectedTrade?.id}...`);
    } else {
      alert(`Success: ${pendingAction} authorized via 2FA.`);
    }
    setPendingAction(null);
  };

  const filteredTrades = [...recentTrades, ...recentTrades].filter(trade => 
    trade.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trade.miner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trade.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trade.mineral.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Platform Overview</h1>
                <p className="text-soft-grey mt-1">Welcome back, here's what's happening today.</p>
              </div>
              <button 
                onClick={() => handleSensitiveAction('New Trade Entry')}
                className="btn-primary py-2 px-6 text-sm flex items-center gap-2"
              >
                <Plus size={16} />
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

            {/* Trade Volume Chart */}
            <div className="glass-card p-8 border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Trade Volume Trend</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gold" />
                    <span className="text-xs text-soft-grey">Monthly Volume (USD)</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#8E9299" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#8E9299" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#151619', 
                        border: '1px solid #ffffff10',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      itemStyle={{ color: '#D4AF37' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Volume']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="#D4AF37" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorVolume)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Trades */}
              <div className="lg:col-span-2 glass-card p-8 border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-white">Recent Trade Settlements</h2>
                  <button 
                    onClick={() => setCurrentView('trades')}
                    className="text-gold text-sm font-bold hover:underline"
                  >
                    View All
                  </button>
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
                        <tr key={trade.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                          <td className="py-4 font-mono">
                            <button 
                              onClick={() => setSelectedTrade(trade)}
                              className="text-gold hover:underline font-bold"
                            >
                              {trade.id}
                            </button>
                          </td>
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
                <button 
                  onClick={() => setCurrentView('compliance')}
                  className="btn-secondary w-full mt-8 py-3 text-sm"
                >
                  View Compliance Center
                </button>
              </div>
            </div>
          </div>
        );
      case 'trades':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Trade History</h1>
                <p className="text-soft-grey mt-1">Manage and track all mineral trade settlements.</p>
              </div>
              <button 
                onClick={() => handleSensitiveAction('New Trade Entry')}
                className="btn-primary py-2 px-6 text-sm flex items-center gap-2"
              >
                <Plus size={16} />
                New Trade Entry
              </button>
            </div>
            
            <div className="flex items-center gap-4 bg-jet-black border border-white/10 rounded-xl px-4 py-3 w-full max-w-md">
              <Search size={18} className="text-soft-grey" />
              <input 
                type="text" 
                placeholder="Filter by ID, miner, buyer, or mineral..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white w-full"
              />
            </div>

            <div className="glass-card p-8 border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-soft-grey uppercase tracking-widest border-b border-white/5">
                      <th className="pb-4 font-bold">Trade ID</th>
                      <th className="pb-4 font-bold">Miner/Coop</th>
                      <th className="pb-4 font-bold">Buyer</th>
                      <th className="pb-4 font-bold">Mineral</th>
                      <th className="pb-4 font-bold">Amount</th>
                      <th className="pb-4 font-bold">Status</th>
                      <th className="pb-4 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredTrades.length > 0 ? (
                      filteredTrades.map((trade, idx) => (
                        <tr key={`${trade.id}-${idx}`} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                          <td className="py-4 font-mono">
                            <button 
                              onClick={() => setSelectedTrade(trade)}
                              className="text-gold hover:underline font-bold"
                            >
                              {trade.id}
                            </button>
                          </td>
                          <td className="py-4 text-white font-medium">{trade.miner}</td>
                          <td className="py-4 text-white font-medium">{trade.buyer}</td>
                          <td className="py-4 text-white">{trade.mineral}</td>
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-soft-grey">
                          No trades found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'asm':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Verified ASM Cooperatives</h1>
              <p className="text-soft-grey mt-1">Directory of artisanal and small-scale mining groups on the platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Copper Belt Coop', location: 'Kitwe', members: 120, status: 'Verified' },
                { name: 'Ndola Artisans', location: 'Ndola', members: 45, status: 'Verified' },
                { name: 'Kabwe Mining Group', location: 'Kabwe', members: 85, status: 'Pending Audit' },
                { name: 'Solwezi Miners', location: 'Solwezi', members: 210, status: 'Verified' },
                { name: 'Mansa Manganese', location: 'Mansa', members: 30, status: 'Verified' },
              ].map((coop, idx) => (
                <div key={idx} className="glass-card p-6 border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                      <Users size={24} />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${
                      coop.status === 'Verified' ? 'bg-green-400/10 text-green-400' : 'bg-gold/10 text-gold'
                    }`}>
                      {coop.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{coop.name}</h3>
                  <p className="text-sm text-soft-grey mt-1">{coop.location}, Zambia</p>
                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs text-soft-grey">{coop.members} Active Members</span>
                    <button className="text-gold text-xs font-bold hover:underline">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
              <p className="text-soft-grey mt-1">Download trade summaries, ESG reports, and compliance audits.</p>
            </div>
            <div className="glass-card p-8 border-white/5">
              <div className="space-y-4">
                {[
                  { title: 'Q1 2026 Trade Volume Summary', date: '2026-03-25', type: 'PDF', size: '2.4 MB' },
                  { title: 'ESG Impact Report - Copper Belt', date: '2026-03-20', type: 'PDF', size: '4.1 MB' },
                  { title: 'Monthly Compliance Audit Trail', date: '2026-03-01', type: 'XLSX', size: '1.2 MB' },
                  { title: 'Mineral Traceability Log - Cobalt', date: '2026-02-28', type: 'PDF', size: '3.5 MB' },
                ].map((report, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-gold/30 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-lg text-soft-grey group-hover:text-gold transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{report.title}</h4>
                        <p className="text-xs text-soft-grey mt-1">Generated on {report.date} • {report.type} • {report.size}</p>
                      </div>
                    </div>
                    <button className="btn-secondary py-2 px-4 text-xs">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
              <p className="text-soft-grey mt-1">Manage your account preferences and security settings.</p>
            </div>
            <div className="max-w-2xl space-y-6">
              <div className="glass-card p-8 border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Full Name</label>
                      <input type="text" defaultValue="Admin User" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-gold/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Email Address</label>
                      <input type="email" defaultValue="admin@afritradex.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-gold/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Role</label>
                    <input type="text" defaultValue="Platform Manager" disabled className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-soft-grey text-sm cursor-not-allowed" />
                  </div>
                  <button className="btn-primary py-2 px-6 text-sm mt-4">Save Changes</button>
                </div>
              </div>

              <div className="glass-card p-8 border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">Security</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold text-sm">Two-Factor Authentication</h4>
                      <p className="text-xs text-soft-grey mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <div className="w-12 h-6 bg-gold rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-jet-black rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <div>
                      <h4 className="text-white font-bold text-sm">Change Password</h4>
                      <p className="text-xs text-soft-grey mt-1">Update your password regularly for better security.</p>
                    </div>
                    <button className="btn-secondary py-2 px-4 text-xs">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'compliance':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Compliance Center</h1>
              <p className="text-soft-grey mt-1">Regulatory monitoring and ESG verification dashboard.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">Active Alerts</h2>
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
                </div>
              </div>
              <div className="glass-card p-8 border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">ESG Performance</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-soft-grey">Ethical Sourcing</span>
                    <span className="text-sm font-bold text-green-400">98%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full w-[98%]" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-soft-grey">Safety Compliance</span>
                    <span className="text-sm font-bold text-gold">85%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-gold h-full w-[85%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-soft-grey mb-6">
              <Shield size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{currentView.charAt(0).toUpperCase() + currentView.slice(1)} Section</h2>
            <p className="text-soft-grey max-w-md">This section is currently under development. Please check back soon for updates.</p>
            <button 
              onClick={() => setCurrentView('overview')}
              className="btn-secondary mt-8 py-2 px-6"
            >
              Back to Overview
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-jet-black border-r border-white/5 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Logo className="w-8 h-8" iconSize={20} />
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={currentView === 'overview'} 
            onClick={() => setCurrentView('overview')}
          />
          <SidebarLink 
            icon={TrendingUp} 
            label="Trades" 
            active={currentView === 'trades'} 
            onClick={() => setCurrentView('trades')}
          />
          <SidebarLink 
            icon={Users} 
            label="Verified ASM" 
            active={currentView === 'asm'} 
            onClick={() => setCurrentView('asm')}
          />
          <SidebarLink 
            icon={ShieldCheck} 
            label="Compliance" 
            active={currentView === 'compliance'} 
            onClick={() => setCurrentView('compliance')}
          />
          <SidebarLink 
            icon={FileText} 
            label="Reports" 
            active={currentView === 'reports'} 
            onClick={() => setCurrentView('reports')}
          />
          <SidebarLink 
            icon={Settings} 
            label="Settings" 
            active={currentView === 'settings'} 
            onClick={() => setCurrentView('settings')}
          />
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
      <main className="flex-1 flex flex-col relative">
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
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative text-soft-grey hover:text-white transition-colors"
              >
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-jet-black text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>
              
              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 bg-jet-black border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white">Notifications</h3>
                        <button className="text-[10px] text-gold font-bold uppercase tracking-widest hover:underline">Mark all as read</button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {[
                          { title: 'New Trade Settlement', desc: 'TRD-001 has been completed successfully.', time: '2 mins ago' },
                          { title: 'Compliance Alert', desc: 'Copper Belt Coop KYC expires in 3 days.', time: '1 hour ago' },
                          { title: 'System Update', desc: 'New reporting features are now available.', time: '5 hours ago' },
                        ].map((n, i) => (
                          <div key={i} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                            <h4 className="text-sm font-bold text-white">{n.title}</h4>
                            <p className="text-xs text-soft-grey mt-1">{n.desc}</p>
                            <span className="text-[10px] text-soft-grey/60 mt-2 block">{n.time}</span>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          setCurrentView('compliance');
                          setIsNotificationsOpen(false);
                        }}
                        className="w-full p-3 text-xs text-gold font-bold hover:bg-white/5 transition-colors"
                      >
                        View All Alerts
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex items-center gap-3 pl-6 border-l border-white/10">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white leading-none group-hover:text-gold transition-colors">Admin User</p>
                  <p className="text-xs text-soft-grey mt-1">Platform Manager</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold group-hover:border-gold transition-colors">
                  AU
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-4 w-48 bg-jet-black border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden"
                    >
                      <div className="p-2">
                        <button 
                          onClick={() => {
                            setCurrentView('settings');
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center gap-3 w-full p-3 text-sm text-soft-grey hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Settings size={18} />
                          <span>Settings</span>
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full p-3 text-sm text-soft-grey hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto">
          {renderView()}
        </div>

        {/* Trade Details Panel */}
        <AnimatePresence>
          {selectedTrade && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTrade(null)}
                className="absolute inset-0 bg-jet-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-md bg-jet-black border-l border-white/10 h-full shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Trade Details</h2>
                    <p className="text-gold font-mono text-sm">{selectedTrade.id}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedTrade(null)}
                    className="p-2 hover:bg-white/5 rounded-lg text-soft-grey transition-colors"
                  >
                    <Plus className="rotate-45" size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Status Banner */}
                  <div className={`p-4 rounded-xl flex items-center justify-between ${
                    selectedTrade.status === 'Completed' ? 'bg-green-400/10 border border-green-400/20' : 
                    selectedTrade.status === 'In Escrow' ? 'bg-gold/10 border border-gold/20' : 'bg-blue-400/10 border border-blue-400/20'
                  }`}>
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={20} className={
                        selectedTrade.status === 'Completed' ? 'text-green-400' : 
                        selectedTrade.status === 'In Escrow' ? 'text-gold' : 'text-blue-400'
                      } />
                      <span className="text-sm font-bold text-white">Settlement Status</span>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${
                      selectedTrade.status === 'Completed' ? 'text-green-400' : 
                      selectedTrade.status === 'In Escrow' ? 'text-gold' : 'text-blue-400'
                    }`}>
                      {selectedTrade.status}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <DetailItem label="Miner" value={selectedTrade.miner} />
                    <DetailItem label="Buyer" value={selectedTrade.buyer} />
                    <DetailItem label="Mineral" value={selectedTrade.mineral} />
                    <DetailItem label="Quantity" value={selectedTrade.quantity} />
                    <DetailItem label="Grade" value={selectedTrade.grade} />
                    <DetailItem label="Price" value={selectedTrade.price} />
                    <DetailItem label="Total Amount" value={selectedTrade.amount} className="col-span-2" />
                    <DetailItem label="Settlement Date" value={selectedTrade.date} className="col-span-2" />
                  </div>

                  {/* Documents */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Associated Documents</h3>
                    <div className="space-y-2">
                      {selectedTrade.docs.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-gold/30 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-soft-grey group-hover:text-gold transition-colors" />
                            <span className="text-sm text-white">{doc}</span>
                          </div>
                          <ArrowUpRight size={16} className="text-soft-grey opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-white/10 bg-white/5">
                  <button 
                    onClick={() => handleSensitiveAction('Download Trade Audit Trail')}
                    className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <FileText size={18} />
                    Download Audit Trail
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <TwoFactorModal 
        isOpen={is2FAOpen}
        onClose={() => setIs2FAOpen(false)}
        onVerify={on2FAVerify}
        title="Security Verification Required"
        description={`Please enter your 2FA code to authorize: ${pendingAction}`}
      />

      {/* New Trade Modal */}
      <AnimatePresence>
        {isNewTradeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewTradeModalOpen(false)}
              className="absolute inset-0 bg-jet-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-jet-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">New Trade Entry</h2>
                <button 
                  onClick={() => setIsNewTradeModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-soft-grey transition-colors"
                >
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Miner/Cooperative</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-gold/50">
                      <option className="bg-jet-black">Select Miner</option>
                      <option className="bg-jet-black">Copper Belt Coop</option>
                      <option className="bg-jet-black">Ndola Artisans</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Buyer</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-gold/50">
                      <option className="bg-jet-black">Select Buyer</option>
                      <option className="bg-jet-black">Global Metals Inc.</option>
                      <option className="bg-jet-black">Swiss Refineries</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Mineral Type</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-gold/50">
                      <option className="bg-jet-black">Select Mineral</option>
                      <option className="bg-jet-black">Copper</option>
                      <option className="bg-jet-black">Cobalt</option>
                      <option className="bg-jet-black">Zinc</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Quantity (Tons)</label>
                    <input type="number" placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-gold/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Upload Assay Certificate</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
                    <FileText size={32} className="text-soft-grey mx-auto mb-4" />
                    <p className="text-sm text-white font-bold">Click to upload or drag and drop</p>
                    <p className="text-xs text-soft-grey mt-1">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setIsNewTradeModalOpen(false)}
                    className="btn-secondary flex-1 py-3"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      alert('Trade entry submitted for verification.');
                      setIsNewTradeModalOpen(false);
                    }}
                    className="btn-primary flex-1 py-3"
                  >
                    Submit Trade
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
        active ? 'bg-gold text-jet-black' : 'text-soft-grey hover:bg-white/5 hover:text-white'
      }`}
    >
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

function DetailItem({ label, value, className = "" }: { label: string, value: string, className?: string }) {
  return (
    <div className={className}>
      <p className="text-[10px] text-soft-grey uppercase tracking-widest font-bold mb-1">{label}</p>
      <p className="text-sm text-white font-medium">{value}</p>
    </div>
  );
}
