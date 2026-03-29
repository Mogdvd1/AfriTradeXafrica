import { motion } from 'motion/react';
import { Leaf, Users, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function ESG() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-charcoal py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8"
          >
            Our Commitment to <span className="text-gold">ESG</span>
          </motion.h1>
          <p className="text-soft-grey text-xl max-w-3xl mx-auto leading-relaxed">
            We embed environmental, social, and governance principles into every aspect of our work.
          </p>
        </div>
      </section>

      {/* ESG Pillars */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Environmental */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8">
                <Leaf size={32} />
              </div>
              <h2 className="text-4xl font-bold mb-8">Environmental Stewardship</h2>
              <ul className="space-y-6">
                {[
                  'Alignment with ZEMA standards',
                  'Waste & emissions awareness',
                  'Site level environmental monitoring'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-soft-grey text-lg">
                    <CheckCircle2 size={24} className="text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" alt="Environmental" className="w-full h-96 object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000" alt="Social" className="w-full h-96 object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8">
                <Users size={32} />
              </div>
              <h2 className="text-4xl font-bold mb-8">Social Inclusion</h2>
              <ul className="space-y-6">
                {[
                  'Training for miners',
                  'Safer working conditions',
                  'Community partnerships',
                  'Inclusion of unbanked diggers into formal trade'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-soft-grey text-lg">
                    <CheckCircle2 size={24} className="text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-4xl font-bold mb-8">Governance & Transparency</h2>
              <ul className="space-y-6">
                {[
                  'Digital receipts & immutable logs',
                  'Documented audit trails',
                  'Traceability aligned with global OECD guidance'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-soft-grey text-lg">
                    <CheckCircle2 size={24} className="text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000" alt="Governance" className="w-full h-96 object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
