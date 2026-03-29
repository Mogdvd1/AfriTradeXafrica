import { motion } from 'motion/react';
import { Shield, Lock, FileText, BarChart3, Users, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Platform() {
  const features = [
    {
      title: 'KYC/AML Onboarding',
      desc: 'Simple mobile-first identity verification for miners, cooperatives, buyers, exporters, and partners.',
      icon: <Users />
    },
    {
      title: 'Secure Escrow Settlement',
      desc: 'Funds remain locked until quality, quantity, and documentation are verified—eliminating cash handling risks.',
      icon: <Lock />
    },
    {
      title: 'Verified Testing & Grade Input',
      desc: 'Trade only proceeds once accredited labs provide clear, agreed-upon results.',
      icon: <Shield />
    },
    {
      title: 'Digital Receipts & Compliance',
      desc: 'Automatic generation of timestamps, grade logs, chain of custody, and ESG checklists.',
      icon: <FileText />
    },
    {
      title: 'Role Based Access',
      desc: 'Tailored dashboards for Banks, Regulators, Buyers, and Cooperatives.',
      icon: <BarChart3 />
    }
  ];

  const steps = [
    'Miner creates a verified AfriTradeX account',
    'Buyer posts interest / Miner uploads offer',
    'Sample is tested & verified',
    'Buyer deposits funds into escrow',
    'Delivery is confirmed',
    'Settlement is released',
    'Digital records are stored and exportable'
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-jet-black py-24 px-6 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12"
          >
            <Logo className="w-32 h-32 md:w-48 md:h-48" iconSize={64} showText={false} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black mb-8"
          >
            Reinventing <span className="text-gold">ASM Mineral Trade</span>
          </motion.h1>
          <p className="text-soft-grey text-xl max-w-3xl mx-auto leading-relaxed">
            AfriTradeX is a digital settlement, traceability, and compliance platform designed to make mineral trade safer, more transparent, and fully bankable.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">What AfriTradeX Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-10 hover:border-gold/40 transition-all group">
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-soft-grey leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-20 text-center">How It Works</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold/20 hidden md:block" />
            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-8 relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-gold text-jet-black font-black text-2xl flex items-center justify-center shrink-0 shadow-lg shadow-gold/20">
                    {i + 1}
                  </div>
                  <div className="glass-card p-6 flex-grow">
                    <p className="text-xl font-bold">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">AfriTradeX Benefits</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* For Miners */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gold border-b border-gold/20 pb-4">For Miners</h3>
              <ul className="space-y-4">
                {['Safer, cash free transactions', 'Fair and transparent pricing', 'Records that enable bank accounts & credit', 'Verified access to credible buyers'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-soft-grey">
                    <CheckCircle2 size={18} className="text-gold shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* For Buyers */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gold border-b border-gold/20 pb-4">For Buyers</h3>
              <ul className="space-y-4">
                {['Trusted supply chain', 'Verified grades & reduced disputes', 'Full compliance visibility', 'ESG ready documentation'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-soft-grey">
                    <CheckCircle2 size={18} className="text-gold shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* For Banks */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gold border-b border-gold/20 pb-4">For Banks & Regulators</h3>
              <ul className="space-y-4">
                {['Reliable, structured data', 'Traceability for compliance', 'Documented production history'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-soft-grey">
                    <CheckCircle2 size={18} className="text-gold shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-jet-black text-center">
        <div className="max-w-4xl mx-auto glass-card p-16 border-gold/30">
          <h2 className="text-4xl font-bold mb-8">Ready to transform your mineral trade?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/contact" 
              state={{ initialSubject: 'Platform Demo' }}
              className="btn-primary px-12 py-4 text-lg"
            >
              Book a Demo
            </Link>
            <Link to="/onboarding" className="btn-secondary px-12 py-4 text-lg">
              Join AfriTradeX
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
