import { motion } from 'motion/react';
import { Shield, Target, Heart, Users, Zap, Leaf } from 'lucide-react';

export default function About() {
  const values = [
    { name: 'Professionalism', icon: <Zap /> },
    { name: 'Transparency & Integrity', icon: <Shield /> },
    { name: 'Safety & Stewardship', icon: <Leaf /> },
    { name: 'Community Empowerment', icon: <Users /> },
    { name: 'Ethical Sourcing', icon: <Heart /> },
    { name: 'Innovation & Adaptability', icon: <Zap /> },
  ];

  const team = [
    { role: 'Founder / Business Development', name: 'Leadership Team' },
    { role: 'CEO', name: 'Leadership Team' },
    { role: 'CTO', name: 'Leadership Team' },
    { role: 'Compliance & Research', name: 'Leadership Team' },
    { role: 'Finance & Operations', name: 'Leadership Team' },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-charcoal py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6"
          >
            Who We <span className="text-gold">Are</span>
          </motion.h1>
          <p className="text-soft-grey text-xl max-w-3xl mx-auto">
            Transforming the artisanal and small scale mining (ASM) sector through innovation and integrity.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Journey</h2>
            <div className="space-y-6 text-soft-grey leading-relaxed">
              <p>
                Gondmacho Minerals is a Zambian mineral development company established in 2020 to transform the artisanal and small scale mining (ASM) sector.
              </p>
              <p>
                Our journey began with sourcing and supplying minerals such as manganese, copper, iron ore, and chrome. But deep engagement with cooperatives revealed more pressing needs: safety gaps, predatory pricing, lack of compliance, and exclusion from formal markets.
              </p>
              <p>
                This understanding led to the creation of our flagship innovation—<strong>AfriTradeX</strong>, a digital settlement and compliance platform that enables safe, transparent, and bankable ASM trade.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=500" alt="Mining 1" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=500" alt="Mining 2" className="rounded-2xl w-full h-64 object-cover mt-8" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-12 border-gold/20">
            <Target className="text-gold mb-8" size={48} />
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-soft-grey text-lg">
              To build a safe, transparent, and inclusive mineral economy where miners, buyers, and institutions transact with trust and accountability.
            </p>
          </div>
          <div className="glass-card p-12 border-gold/20">
            <Shield className="text-gold mb-8" size={48} />
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-soft-grey text-lg">
              To equip miners with the knowledge, tools, and digital systems they need to participate profitably and confidently in the mineral economy.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="p-8 rounded-2xl bg-charcoal border border-white/5 flex items-center gap-6">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold">{value.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="glass-card p-8 text-center">
                <div className="w-24 h-24 bg-gold/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users size={40} className="text-gold" />
                </div>
                <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                <p className="text-gold text-sm uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
