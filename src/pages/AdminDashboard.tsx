import React, { useState, useEffect } from 'react';
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
  Plus,
  Loader2,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  FileText,
  Filter,
  MoreVertical,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useFirebase, UserRole } from '../contexts/FirebaseContext';
import { auth, signOut, db, handleFirestoreError, OperationType } from '../firebase';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  limit, 
  doc, 
  updateDoc, 
  addDoc, 
  serverTimestamp,
  getDocs
} from 'firebase/firestore';

// Mock data for initial charts if no real data exists yet
const chartData = [
  { month: 'Oct', volume: 450000 },
  { month: 'Nov', volume: 520000 },
  { month: 'Dec', volume: 480000 },
  { month: 'Jan', volume: 610000 },
  { month: 'Feb', volume: 750000 },
  { month: 'Mar', volume: 1200000 },
];

export default function AdminDashboard() {
  const { user, loading: authLoading, isAdmin } = useFirebase();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data States
  const [users, setUsers] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [trades, setTrades] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Modal States
  const [isNewTradeModalOpen, setIsNewTradeModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [newTradeData, setNewTradeData] = useState({
    minerId: '',
    buyerId: '',
    minerName: '',
    buyerName: '',
    mineral: 'Copper',
    amount: 0,
    quantity: '',
    grade: '',
    status: 'In Escrow'
  });

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/dashboard');
    }
  }, [user, authLoading, isAdmin, navigate]);

  // Real-time Data Fetching
  useEffect(() => {
    if (!user || !isAdmin) return;

    setLoadingData(true);

    // 1. Fetch Users
    const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(100));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'users'));

    // 2. Fetch Submissions
    const subsQuery = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'), limit(100));
    const unsubscribeSubs = onSnapshot(subsQuery, (snapshot) => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'submissions'));

    // 3. Fetch Trades
    const tradesQuery = query(collection(db, 'trades'), orderBy('createdAt', 'desc'), limit(100));
    const unsubscribeTrades = onSnapshot(tradesQuery, (snapshot) => {
      setTrades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingData(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'trades'));

    return () => {
      unsubscribeUsers();
      unsubscribeSubs();
      unsubscribeTrades();
    };
  }, [user, isAdmin]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateSubmissionStatus = async (id: string, status: 'verified' | 'rejected') => {
    try {
      const submission = submissions.find(s => s.id === id);
      if (!submission) throw new Error("Submission not found");

      await updateDoc(doc(db, 'submissions', id), { status });
      
      // If verified, update the user's role and kycStatus in the users collection
      if (status === 'verified') {
        await updateDoc(doc(db, 'users', submission.uid), { 
          role: submission.role,
          kycStatus: 'verified'
        });
      }

      setFeedback({ message: `Submission ${status} successfully.`, type: 'success' });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error) {
      setFeedback({ message: `Failed to ${status} submission.`, type: 'error' });
      setTimeout(() => setFeedback(null), 5000);
      handleFirestoreError(error, OperationType.UPDATE, `submissions/${id}`);
    }
  };

  const updateUserRole = async (id: string, role: UserRole) => {
    if (id === user?.uid) {
      setFeedback({ message: "You cannot change your own role.", type: 'error' });
      setTimeout(() => setFeedback(null), 3000);
      return;
    }
    try {
      await updateDoc(doc(db, 'users', id), { role });
      setFeedback({ message: `User role updated to ${role}.`, type: 'success' });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error) {
      setFeedback({ message: "Failed to update user role.", type: 'error' });
      setTimeout(() => setFeedback(null), 5000);
      handleFirestoreError(error, OperationType.UPDATE, `users/${id}`);
    }
  };

  const updateUserKycStatus = async (id: string, kycStatus: 'unverified' | 'pending' | 'verified' | 'flagged') => {
    try {
      await updateDoc(doc(db, 'users', id), { kycStatus });
      setFeedback({ message: `User KYC status updated to ${kycStatus}.`, type: 'success' });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error) {
      setFeedback({ message: "Failed to update KYC status.", type: 'error' });
      setTimeout(() => setFeedback(null), 5000);
      handleFirestoreError(error, OperationType.UPDATE, `users/${id}`);
    }
  };

  const handleCreateTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tradeId = `TRD-${Math.floor(1000 + Math.random() * 9000)}`;
      await addDoc(collection(db, 'trades'), {
        ...newTradeData,
        tradeId,
        createdAt: serverTimestamp()
      });
      setIsNewTradeModalOpen(false);
      setFeedback({ message: "Trade settlement recorded successfully.", type: 'success' });
      setTimeout(() => setFeedback(null), 3000);
      setNewTradeData({
        minerId: '',
        buyerId: '',
        minerName: '',
        buyerName: '',
        mineral: 'Copper',
        amount: 0,
        quantity: '',
        grade: '',
        status: 'In Escrow'
      });
    } catch (error) {
      setFeedback({ message: "Failed to record trade settlement.", type: 'error' });
      setTimeout(() => setFeedback(null), 5000);
      handleFirestoreError(error, OperationType.CREATE, 'trades');
    }
  };

  if (authLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jet-black">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const stats = [
    { name: 'Total Users', value: users.length, icon: Users, color: 'text-blue-400' },
    { name: 'Pending KYC', value: submissions.filter(s => s.status === 'pending').length, icon: ShieldCheck, color: 'text-gold' },
    { name: 'Active Trades', value: trades.filter(t => t.status !== 'Completed').length, icon: TrendingUp, color: 'text-green-400' },
    { name: 'Total Volume', value: `$${(trades.reduce((acc, t) => acc + (t.amount || 0), 0) / 1000000).toFixed(1)}M`, icon: TrendingUp, color: 'text-gold' },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Command Center</h1>
          <p className="text-soft-grey mt-1">Platform-wide metrics and management.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setCurrentView('submissions')}
            className="btn-secondary py-2.5 px-6 text-sm flex items-center gap-2"
          >
            <ShieldCheck size={16} />
            Review KYC
          </button>
          <button 
            onClick={() => setIsNewTradeModalOpen(true)}
            className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2"
          >
            <Plus size={16} />
            Record Trade
          </button>
        </div>
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
            </div>
            <h3 className="text-soft-grey text-sm font-medium">{stat.name}</h3>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-8 border-white/5">
          <h2 className="text-xl font-bold text-white mb-8">Platform Growth</h2>
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
                <XAxis dataKey="month" stroke="#8E9299" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#8E9299" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#D4AF37' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-8 border-white/5">
          <h2 className="text-xl font-bold text-white mb-8">Recent Activity</h2>
          <div className="space-y-6">
            {submissions.slice(0, 5).map((sub, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${sub.status === 'pending' ? 'bg-gold/10 text-gold' : 'bg-green-400/10 text-green-400'}`}>
                  {sub.status === 'pending' ? <Clock size={18} /> : <CheckCircle2 size={18} />}
                </div>
                <div>
                  <p className="text-sm text-white font-medium">
                    {sub.fullName} <span className="text-soft-grey font-normal">submitted KYC as</span> {sub.role}
                  </p>
                  <p className="text-xs text-soft-grey mt-1">
                    {sub.createdAt?.toDate?.()?.toLocaleString() || 'Just now'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setCurrentView('submissions')}
            className="w-full mt-8 py-3 text-sm font-bold text-gold hover:underline border-t border-white/5"
          >
            View All Submissions
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="text-soft-grey mt-1">Manage platform users and access levels.</p>
      </div>

      <div className="glass-card p-8 border-white/5 overflow-hidden">
        <div className="flex items-center gap-4 bg-jet-black border border-white/10 rounded-xl px-4 py-3 mb-8 max-w-md">
          <Search size={18} className="text-soft-grey" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-soft-grey uppercase tracking-widest border-b border-white/5">
                <th className="pb-4 font-bold">User</th>
                <th className="pb-4 font-bold">Email</th>
                <th className="pb-4 font-bold">Role</th>
                <th className="pb-4 font-bold">KYC Status</th>
                <th className="pb-4 font-bold">Joined</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.filter(u => u.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => (
                <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                        <UserIcon size={16} />
                      </div>
                      <span className="text-white font-medium">{u.displayName || 'Anonymous'}</span>
                    </div>
                  </td>
                  <td className="py-4 text-soft-grey">{u.email}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      u.role === 'admin' ? 'bg-gold/10 text-gold' : 
                      u.role === 'miner' ? 'bg-green-400/10 text-green-400' :
                      u.role === 'buyer' ? 'bg-blue-400/10 text-blue-400' :
                      'bg-soft-grey/10 text-soft-grey'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      u.kycStatus === 'verified' ? 'bg-green-400/10 text-green-400' : 
                      u.kycStatus === 'pending' ? 'bg-gold/10 text-gold' :
                      u.kycStatus === 'flagged' ? 'bg-red-400/10 text-red-400' :
                      'bg-soft-grey/10 text-soft-grey'
                    }`}>
                      {u.kycStatus || 'unverified'}
                    </span>
                  </td>
                  <td className="py-4 text-soft-grey">{u.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <select 
                        value={u.kycStatus || 'unverified'}
                        onChange={(e) => updateUserKycStatus(u.id, e.target.value as any)}
                        className="bg-jet-black border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-gold"
                      >
                        <option value="unverified">Unverified</option>
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="flagged">Flagged</option>
                      </select>
                      <select 
                        value={u.role}
                        onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                        disabled={u.id === user?.uid}
                        className="bg-jet-black border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-gold disabled:opacity-50"
                      >
                        <option value="client">Client</option>
                        <option value="miner">Miner</option>
                        <option value="buyer">Buyer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSubmissions = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Onboarding Queue</h1>
        <p className="text-soft-grey mt-1">Review and verify KYC/AML submissions.</p>
      </div>

      <div className="glass-card p-8 border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-soft-grey uppercase tracking-widest border-b border-white/5">
                <th className="pb-4 font-bold">Applicant</th>
                <th className="pb-4 font-bold">Role</th>
                <th className="pb-4 font-bold">KYC Doc</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <div>
                      <p className="text-white font-medium">{sub.fullName}</p>
                      <p className="text-xs text-soft-grey">{sub.email}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-soft-grey">{sub.role}</span>
                  </td>
                  <td className="py-4">
                    {sub.kycDocumentUrl ? (
                      <a href={sub.kycDocumentUrl} target="_blank" rel="noreferrer" className="text-gold hover:underline flex items-center gap-1">
                        <FileText size={14} /> View
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      sub.status === 'verified' ? 'bg-green-400/10 text-green-400' : 
                      sub.status === 'pending' ? 'bg-gold/10 text-gold' : 'bg-red-400/10 text-red-400'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-4 text-soft-grey">{sub.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedSubmission(sub)}
                        className="p-2 text-soft-grey hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FileText size={18} />
                      </button>
                      {sub.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateSubmissionStatus(sub.id, 'verified')}
                            className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                            title="Verify"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => updateSubmissionStatus(sub.id, 'rejected')}
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTrades = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Trade Settlements</h1>
          <p className="text-soft-grey mt-1">Monitor and record mineral trade transactions.</p>
        </div>
        <button 
          onClick={() => setIsNewTradeModalOpen(true)}
          className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2"
        >
          <Plus size={16} />
          Record New Trade
        </button>
      </div>

      <div className="glass-card p-8 border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-soft-grey uppercase tracking-widest border-b border-white/5">
                <th className="pb-4 font-bold">Trade ID</th>
                <th className="pb-4 font-bold">Miner</th>
                <th className="pb-4 font-bold">Buyer</th>
                <th className="pb-4 font-bold">Mineral</th>
                <th className="pb-4 font-bold">Amount</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {trades.map((t) => (
                <tr key={t.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-gold font-bold">{t.tradeId}</td>
                  <td className="py-4 text-white">{t.minerName || 'Unknown Miner'}</td>
                  <td className="py-4 text-white">{t.buyerName || 'Unknown Buyer'}</td>
                  <td className="py-4 text-soft-grey">{t.mineral} ({t.quantity || 'N/A'})</td>
                  <td className="py-4 text-white font-bold">${t.amount?.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      t.status === 'Completed' ? 'bg-green-400/10 text-green-400' : 
                      t.status === 'In Escrow' ? 'bg-gold/10 text-gold' : 'bg-blue-400/10 text-blue-400'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 text-soft-grey">{t.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</td>
                </tr>
              ))}
              {trades.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-soft-grey">No trade records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-charcoal-black flex relative overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-jet-black border-r border-white/5 flex flex-col z-50 transition-transform duration-300 transform lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Logo className="w-8 h-8" iconSize={20} showText={false} />
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-soft-grey hover:text-white">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarLink icon={LayoutDashboard} label="Admin Overview" active={currentView === 'overview'} onClick={() => setCurrentView('overview')} />
          <SidebarLink icon={Users} label="User Management" active={currentView === 'users'} onClick={() => setCurrentView('users')} />
          <SidebarLink icon={ShieldCheck} label="KYC Queue" active={currentView === 'submissions'} onClick={() => setCurrentView('submissions')} />
          <SidebarLink icon={TrendingUp} label="Trade Settlements" active={currentView === 'trades'} onClick={() => setCurrentView('trades')} />
          <div className="pt-4 mt-4 border-t border-white/5">
            <SidebarLink icon={ArrowLeft} label="Back to Platform" active={false} onClick={() => navigate('/dashboard')} />
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-3 text-soft-grey hover:text-red-400 transition-colors w-full p-3 rounded-lg hover:bg-white/5">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-jet-black/80 backdrop-blur-lg border-b border-white/5 px-4 md:px-8 h-20 flex items-center justify-between">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-soft-grey">
            <LayoutDashboard size={24} />
          </button>
          
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
              <input type="text" placeholder="Global search..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white outline-none focus:border-gold/50" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                <Shield size={16} />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">Admin Mode</p>
                <p className="text-[10px] text-soft-grey mt-1">{user.email}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* Feedback Toast */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`fixed top-24 right-8 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border ${
                  feedback.type === 'success' 
                    ? 'bg-green-400/10 border-green-400/20 text-green-400' 
                    : 'bg-red-400/10 border-red-400/20 text-red-400'
                }`}
              >
                {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                <span className="text-sm font-bold">{feedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'overview' && renderOverview()}
              {currentView === 'users' && renderUsers()}
              {currentView === 'submissions' && renderSubmissions()}
              {currentView === 'trades' && renderTrades()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Submission Details Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubmission(null)}
              className="absolute inset-0 bg-jet-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-charcoal border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">Application Details</h2>
                  <p className="text-soft-grey">Reviewing submission from {selectedSubmission.fullName}</p>
                </div>
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 text-soft-grey hover:text-white bg-white/5 rounded-full transition-colors"
                >
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-gold uppercase tracking-widest border-b border-white/5 pb-2">Personal Information</h3>
                  <div className="space-y-4">
                    <DetailItem label="Full Name" value={selectedSubmission.fullName} icon={UserIcon} />
                    <DetailItem label="Email" value={selectedSubmission.email} icon={Mail} />
                    <DetailItem label="Phone" value={selectedSubmission.phone} icon={Phone} />
                    <DetailItem label="ID Number" value={selectedSubmission.idNumber} icon={Shield} />
                  </div>
                </div>

                {/* Business Info */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-gold uppercase tracking-widest border-b border-white/5 pb-2">Business Information</h3>
                  <div className="space-y-4">
                    <DetailItem 
                      label={selectedSubmission.role === 'miner' ? "Cooperative Name" : "Company Name"} 
                      value={selectedSubmission.cooperativeName} 
                      icon={Users} 
                    />
                    <DetailItem 
                      label={selectedSubmission.role === 'miner' ? "Mining License" : "Trading License"} 
                      value={selectedSubmission.miningLicense} 
                      icon={ShieldCheck} 
                    />
                    <DetailItem label="Mineral Type" value={selectedSubmission.mineralType} icon={TrendingUp} />
                    <DetailItem label="Status" value={selectedSubmission.status} icon={Clock} />
                  </div>
                </div>

                {/* Location & Documents */}
                <div className="md:col-span-2 space-y-6">
                  <h3 className="text-xs font-bold text-gold uppercase tracking-widest border-b border-white/5 pb-2">Location & Documentation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-4 border-white/5 bg-jet-black/30">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={14} className="text-gold" />
                        <p className="text-xs text-soft-grey uppercase tracking-widest font-bold">Address / Site Location</p>
                      </div>
                      <p className="text-white text-sm leading-relaxed">{selectedSubmission.address}</p>
                    </div>
                    <div className="glass-card p-4 border-white/5 bg-jet-black/30 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-soft-grey uppercase tracking-widest font-bold mb-2">KYC Document</p>
                        <p className="text-white text-sm mb-4">Identity verification document provided by applicant.</p>
                      </div>
                      {selectedSubmission.kycDocumentUrl ? (
                        <a 
                          href={selectedSubmission.kycDocumentUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="btn-secondary py-2 text-xs flex items-center justify-center gap-2"
                        >
                          <FileText size={14} />
                          View Document
                        </a>
                      ) : (
                        <div className="text-red-400 text-xs font-bold">No document uploaded</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {selectedSubmission.status === 'pending' && (
                <div className="flex gap-4 mt-10 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => {
                      updateSubmissionStatus(selectedSubmission.id, 'rejected');
                      setSelectedSubmission(null);
                    }}
                    className="flex-1 py-4 rounded-xl border border-red-500/20 text-red-500 font-bold hover:bg-red-500/5 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle size={20} />
                    Reject Application
                  </button>
                  <button 
                    onClick={() => {
                      updateSubmissionStatus(selectedSubmission.id, 'verified');
                      setSelectedSubmission(null);
                    }}
                    className="flex-1 py-4 rounded-xl bg-green-500 text-jet-black font-bold hover:bg-green-400 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={20} />
                    Approve & Verify
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Trade Modal */}
      <AnimatePresence>
        {isNewTradeModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewTradeModalOpen(false)}
              className="absolute inset-0 bg-jet-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-charcoal border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Record New Settlement</h2>
              <p className="text-soft-grey mb-8">Enter the details of the mineral trade to be recorded on the platform.</p>
              
              <form onSubmit={handleCreateTrade} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Miner/Coop Name</label>
                    <input 
                      type="text" 
                      required
                      value={newTradeData.minerName}
                      onChange={(e) => setNewTradeData({...newTradeData, minerName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold"
                      placeholder="e.g. Copper Belt Coop"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Buyer Name</label>
                    <input 
                      type="text" 
                      required
                      value={newTradeData.buyerName}
                      onChange={(e) => setNewTradeData({...newTradeData, buyerName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold"
                      placeholder="e.g. Global Metals Inc."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Miner UID</label>
                    <input 
                      type="text" 
                      required
                      value={newTradeData.minerId}
                      onChange={(e) => setNewTradeData({...newTradeData, minerId: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold"
                      placeholder="User ID of the miner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Buyer UID</label>
                    <input 
                      type="text" 
                      required
                      value={newTradeData.buyerId}
                      onChange={(e) => setNewTradeData({...newTradeData, buyerId: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold"
                      placeholder="User ID of the buyer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Mineral Type</label>
                    <select 
                      value={newTradeData.mineral}
                      onChange={(e) => setNewTradeData({...newTradeData, mineral: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold appearance-none"
                    >
                      <option value="Copper">Copper</option>
                      <option value="Cobalt">Cobalt</option>
                      <option value="Gold">Gold</option>
                      <option value="Manganese">Manganese</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Amount (USD)</label>
                    <input 
                      type="number" 
                      required
                      value={newTradeData.amount}
                      onChange={(e) => setNewTradeData({...newTradeData, amount: Number(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Quantity/Grade</label>
                    <input 
                      type="text" 
                      value={newTradeData.quantity}
                      onChange={(e) => setNewTradeData({...newTradeData, quantity: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold"
                      placeholder="e.g. 15 Tons / 99.9% Cu"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-grey uppercase tracking-widest">Status</label>
                    <select 
                      value={newTradeData.status}
                      onChange={(e) => setNewTradeData({...newTradeData, status: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold appearance-none"
                    >
                      <option value="In Escrow">In Escrow</option>
                      <option value="Pending Testing">Pending Testing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsNewTradeModalOpen(false)} className="btn-secondary flex-1 py-4">Cancel</button>
                  <button type="submit" className="btn-primary flex-1 py-4">Record Trade</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active ? 'bg-gold text-jet-black font-bold shadow-lg shadow-gold/20' : 'text-soft-grey hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={20} className={active ? 'text-jet-black' : 'group-hover:text-gold transition-colors'} />
      <span className="text-sm">{label}</span>
    </button>
  );
}

function DetailItem({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-soft-grey shrink-0">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[10px] text-soft-grey uppercase tracking-widest font-bold">{label}</p>
        <p className="text-white text-sm font-medium">{value || 'N/A'}</p>
      </div>
    </div>
  );
}
