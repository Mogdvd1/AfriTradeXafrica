import { motion } from 'motion/react';
import { Handshake, Building2, FlaskConical, Truck, Users, Landmark } from 'lucide-react';

export default function Partners() {
  const partnerTypes = [
    { name: 'Accredited Testing Labs', icon: <FlaskConical /> },
    { name: 'Logistics Providers', icon: <Truck /> },
    { name: 'Financial Institutions', icon: <Landmark /> },
    { name: 'Miner Cooperatives', icon: <Users /> },
    { name: 'Exporters & Off-takers', icon: <Building2 /> },
    { name: 'Regulatory Agencies', icon: <Handshake /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-jet-black py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8"
          >
            Collaboration That <br />
            <span className="text-gold">Strengthens the Sector</span>
          </motion.h1>
          <p className="text-soft-grey text-xl max-w-3xl mx-auto leading-relaxed">
            We work with stakeholders across the mineral value chain to deliver reliable, transparent, and responsible trade.
          </p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Ecosystem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerTypes.map((p, i) => (
              <div key={i} className="glass-card p-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-8">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold">{p.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner With Us */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Partner With Us</h2>
          <p className="text-soft-grey text-lg mb-12">
            Whether you're a buyer, lab, cooperative, or institution, we welcome collaboration to expand safe and compliant mineral trade.
          </p>
          <button className="btn-primary px-12 py-4 text-lg">Become a Partner</button>
        </div>
      </section>
    </div>
  );
}
