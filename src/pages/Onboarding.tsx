import { motion } from 'motion/react';
import { useState } from 'react';
import { Shield, Users, Globe, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type UserRole = 'miner' | 'buyer' | 'partner' | null;

export default function Onboarding() {
  const [role, setRole] = useState<UserRole>(null);

  const roles = [
    {
      id: 'miner',
      title: 'Artisanal Miner / Cooperative',
      icon: <Users size={32} />,
      desc: 'Get verified, access fair pricing, and settle trades safely through our digital escrow system.',
      benefits: ['Safe cash-free payments', 'Verified grade testing', 'Bankable trade records']
    },
    {
      id: 'buyer',
      title: 'Mineral Buyer / Exporter',
      icon: <Globe size={32} />,
      desc: 'Source ethically from verified miners with full chain-of-custody and ESG compliance.',
      benefits: ['Verified supply chain', 'Reduced trade disputes', 'ESG-ready documentation']
    },
    {
      id: 'partner',
      title: 'Institution / Partner',
      icon: <Shield size={32} />,
      desc: 'Collaborate with us to provide logistics, testing, or financial services to the ASM sector.',
      benefits: ['Structured production data', 'Traceability for compliance', 'Access to verified ASM network']
    }
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center section-padding">
      <div className="max-w-5xl w-full">
        {!role ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-6">Welcome to <span className="text-gold">AfriTradeX</span></h1>
            <p className="text-soft-grey text-xl mb-12 max-w-2xl mx-auto">
              Choose your path to start formalising your mineral trade and accessing Africa's hidden mineral economy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as UserRole)}
                  className="glass-card p-8 text-left hover:border-gold transition-all group flex flex-col h-full"
                >
                  <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                    {r.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{r.title}</h3>
                  <p className="text-soft-grey text-sm mb-8 flex-grow">{r.desc}</p>
                  <div className="flex items-center text-gold font-bold text-sm">
                    Select Role <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 md:p-16 relative"
          >
            <button 
              onClick={() => setRole(null)}
              className="absolute top-8 left-8 text-soft-grey hover:text-gold flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <div className="text-center mb-12 pt-8">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
                {roles.find(r => r.id === role)?.icon}
              </div>
              <h2 className="text-3xl font-bold mb-4">Onboarding as {roles.find(r => r.id === role)?.title}</h2>
              <p className="text-soft-grey">Complete the following steps to activate your AfriTradeX account.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">Key Benefits</h3>
                <ul className="space-y-4">
                  {roles.find(r => r.id === role)?.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-soft-grey">
                      <CheckCircle2 size={20} className="text-trust-green" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">Required Information</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-jet-black rounded-lg border border-white/5">
                    <p className="text-xs text-soft-grey uppercase tracking-widest mb-1">Step 1</p>
                    <p className="font-bold">Identity Verification (KYC)</p>
                  </div>
                  <div className="p-4 bg-jet-black rounded-lg border border-white/5">
                    <p className="text-xs text-soft-grey uppercase tracking-widest mb-1">Step 2</p>
                    <p className="font-bold">Business / License Details</p>
                  </div>
                  <div className="p-4 bg-jet-black rounded-lg border border-white/5 opacity-50">
                    <p className="text-xs text-soft-grey uppercase tracking-widest mb-1">Step 3</p>
                    <p className="font-bold">Platform Training & Demo</p>
                  </div>
                </div>
                <Link to="/contact" className="btn-primary w-full mt-6">
                  Start Verification Process
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
