import { motion } from 'motion/react';
import { ShieldAlert, Leaf, BookOpen, FileCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function CapacityBuilding() {
  const programs = [
    {
      title: 'Safety & HSE / SHEQ',
      icon: <ShieldAlert />,
      items: ['Safer mining practices', 'Site inspections & SOPs', 'Incident reporting']
    },
    {
      title: 'Ethical Sourcing',
      icon: <Leaf />,
      items: ['Environmental standards', 'Labour rights & community protection', 'Traceability practices']
    },
    {
      title: 'Commercial & Technical',
      icon: <TrendingUpIcon />,
      items: ['Grading & pricing literacy', 'Sampling & testing procedures', 'How to negotiate with buyers']
    },
    {
      title: 'Documentation & Compliance',
      icon: <FileCheck />,
      items: ['Mining records', 'Licensing basics', 'Transport documentation', 'Tax and export awareness']
    },
    {
      title: 'Security & Market Risk',
      icon: <Lock />,
      items: ['Theft prevention', 'Secure movement of minerals', 'Digital identity protection']
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-charcoal py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-8"
          >
            Building <span className="text-gold">Safer, Smarter</span> Operations
          </motion.h1>
          <p className="text-soft-grey text-xl max-w-3xl leading-relaxed">
            Gondmacho Minerals delivers practical, field based training built around the real challenges miners face.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Training Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((p, i) => (
              <div key={i} className="glass-card p-10 flex flex-col">
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-8">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6">{p.title}</h3>
                <ul className="space-y-4 flex-grow">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-soft-grey">
                      <CheckCircle2 size={18} className="text-gold shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">How We Deliver</h2>
              <p className="text-soft-grey text-lg mb-12">
                Our training is hands-on and tailored to the specific needs of each cooperative or mining site.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['On site workshops', 'Cooperative level trainings', 'Field demonstrations', 'AfriTradeX-integrated records'].map((opt, i) => (
                  <div key={i} className="bg-jet-black p-6 rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="w-2 h-2 bg-gold rounded-full" />
                    <span className="font-bold">{opt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000" 
                alt="Training session" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gold text-jet-black text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-8">Empower your cooperative today.</h2>
          <button className="bg-jet-black text-white font-bold py-4 px-12 rounded-xl hover:scale-105 transition-all">
            Request Training for Your Cooperative
          </button>
        </div>
      </section>
    </div>
  );
}

function TrendingUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
  );
}
