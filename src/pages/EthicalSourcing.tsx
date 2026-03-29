import { motion } from 'motion/react';
import { Globe, ShieldCheck, Truck, FlaskConical, BarChart, CheckCircle2 } from 'lucide-react';

export default function EthicalSourcing() {
  const facilitation = [
    { title: 'Verified Buyer Access', icon: <Globe /> },
    { title: 'Accredited Lab Testing', icon: <FlaskConical /> },
    { title: 'Chain of Custody Logistics', icon: <Truck /> },
    { title: 'Warehousing Coordination', icon: <ShieldCheck /> },
    { title: 'Secure FOT/FOB Transactions', icon: <BarChart /> },
    { title: 'Market Guidance', icon: <CheckCircle2 /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-jet-black py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8"
          >
            Connecting Miners to <br />
            <span className="text-gold">Verified Buyers</span>
          </motion.h1>
          <p className="text-soft-grey text-xl max-w-3xl mx-auto leading-relaxed">
            We organize the full trade process to ensure minerals move in a secure, fair, and compliant manner.
          </p>
        </div>
      </section>

      {/* Facilitation Grid */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">What We Facilitate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilitation.map((f, i) => (
              <div key={i} className="glass-card p-10 flex items-center gap-8">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold shrink-0">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold">{f.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Split */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Miners */}
          <div className="glass-card p-12 border-gold/20">
            <h3 className="text-3xl font-bold mb-8 text-gold">For Miners & Cooperatives</h3>
            <ul className="space-y-6">
              {[
                'Reduced disputes through verified testing',
                'Better price realization through transparency',
                'Verified documentation for future sales',
                'Safer trade environment with escrow'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-soft-grey text-lg">
                  <CheckCircle2 size={24} className="text-trust-green shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* For Buyers */}
          <div className="glass-card p-12 border-gold/20">
            <h3 className="text-3xl font-bold mb-8 text-gold">For Local & International Buyers</h3>
            <ul className="space-y-6">
              {[
                'Transparent supply chains',
                'ESG aligned sourcing',
                'Verified mineral grades',
                'Time stamped digital trade logs'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-soft-grey text-lg">
                  <CheckCircle2 size={24} className="text-trust-green shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gold text-jet-black text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-8">Ready to source ethically?</h2>
          <button className="bg-jet-black text-white font-bold py-4 px-12 rounded-xl hover:scale-105 transition-all">
            Register as a Buyer
          </button>
        </div>
      </section>
    </div>
  );
}
