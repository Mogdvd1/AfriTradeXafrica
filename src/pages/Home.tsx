import { motion } from 'motion/react';
import { ChevronRight, Shield, TrendingUp, Users, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-jet-black via-jet-black/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=2000" 
            alt="Mining background" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6">
              Empowering Africa's ASM Sector
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Formalising Africa’s <br />
              <span className="text-gradient">Hidden Mineral Economy</span>
            </h1>
            <p className="text-xl text-soft-grey mb-10 leading-relaxed max-w-2xl">
              Digital settlement, ethical sourcing, and safer trade for artisanal and small scale miners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/onboarding" className="btn-primary group">
                Get Started with AfriTradeX
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/capacity" className="btn-secondary">
                Request Training for Your Cooperative
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Snapshot */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Driving Safer, Transparent, and Bankable Mineral Trade</h2>
            <p className="text-soft-grey text-lg leading-relaxed mb-8">
              Gondmacho Minerals is a Zambian mineral development and ASM focused support company. Our flagship platform, <strong>AfriTradeX</strong>, provides digital settlement, traceability, compliance, and secure buyer-seller interactions tailored to Africa’s artisanal and small scale mining ecosystem.
            </p>
            <Link to="/about" className="text-gold font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Learn more about our journey <ArrowRight size={20} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000" 
                alt="Mining site" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-6 max-w-xs hidden md:block">
              <p className="text-gold font-black text-4xl mb-1">150+</p>
              <p className="text-sm text-soft-grey">Miners supported through training and facilitation</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Solutions */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Our Core Solutions</h2>
            <p className="text-soft-grey">We provide end-to-end support for the ASM sector, from digital infrastructure to field-based capacity building.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AfriTradeX */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card p-8 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-8">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">AfriTradeX Platform</h3>
              <p className="text-soft-grey text-sm mb-8">The first platform designed for ASM mineral trade in Zambia, focusing on digital settlement and compliance.</p>
              <ul className="space-y-3 mb-10 flex-grow">
                {['KYC/AML verification', 'Escrow settlement', 'Verified testing & grade logs', 'ESG & chain of custody records'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-soft-grey">
                    <CheckCircle2 size={16} className="text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/platform" className="btn-secondary w-full py-2">Explore Platform</Link>
            </motion.div>

            {/* Capacity Building */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card p-8 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-8">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">ASM Capacity Building</h3>
              <p className="text-soft-grey text-sm mb-8">Practical training that improves safety, compliance, and market readiness for miners and cooperatives.</p>
              <ul className="space-y-3 mb-10 flex-grow">
                {['Safer mining practices', 'Ethical sourcing and SHEQ', 'Grading, pricing & documentation', 'Access to finance pathways'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-soft-grey">
                    <CheckCircle2 size={16} className="text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/capacity" className="btn-secondary w-full py-2">View Training</Link>
            </motion.div>

            {/* Market Access */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card p-8 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-8">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Market Access</h3>
              <p className="text-soft-grey text-sm mb-8">Connecting miners to verified domestic and international buyers through a structured system.</p>
              <ul className="space-y-3 mb-10 flex-grow">
                {['Testing coordination', 'Logistics & chain of custody', 'Verified buyer linkages', 'Support for FOT/FOB transactions'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-soft-grey">
                    <CheckCircle2 size={16} className="text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/sourcing" className="btn-secondary w-full py-2">Learn More</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Impact Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Miners Supported', value: '150+', icon: <Users /> },
              { label: 'Earnings Increase', value: 'Transparent', icon: <TrendingUp /> },
              { label: 'Cash Risk Trade', value: 'Zero', icon: <Shield /> },
              { label: 'Market Access', value: 'Global', icon: <Globe /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-jet-black border border-white/5"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
                  {stat.icon}
                </div>
                <p className="text-gold font-black text-4xl mb-2">{stat.value}</p>
                <p className="text-soft-grey text-sm uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Partners & Ecosystem</h2>
          <p className="text-soft-grey max-w-2xl mx-auto mb-16">
            Working with accredited laboratories, logistics providers, cooperatives, financial institutions, and regulators to create a trusted trade environment.
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* Placeholder logos */}
            <div className="text-2xl font-bold text-white">ZEMA</div>
            <div className="text-2xl font-bold text-white">Ministry of Mines</div>
            <div className="text-2xl font-bold text-white">Zambia Revenue</div>
            <div className="text-2xl font-bold text-white">Accredited Labs</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gold text-jet-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Join the movement toward safer, transparent, and inclusive mineral trade.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/onboarding" className="bg-jet-black text-white font-bold py-4 px-10 rounded-xl hover:bg-jet-black/90 transition-all">
              Sign Up for AfriTradeX
            </Link>
            <Link to="/partners" className="border-2 border-jet-black text-jet-black font-bold py-4 px-10 rounded-xl hover:bg-jet-black hover:text-white transition-all">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
