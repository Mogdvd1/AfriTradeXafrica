import { motion } from 'motion/react';
import { BookOpen, Shield, FileText, Layout, Info, CheckCircle2 } from 'lucide-react';

export default function Resources() {
  const handleDownload = (title: string) => {
    alert(`Downloading: ${title}...`);
  };

  const resources = [
    { title: 'Grading and Pricing Basics', icon: <Layout /> },
    { title: 'Safety Checklists', icon: <Shield /> },
    { title: 'Mineral Movement Documentation', icon: <FileText /> },
    { title: 'ESG and Compliance Frameworks', icon: <CheckCircle2 /> },
    { title: 'AfriTradeX User Guides', icon: <BookOpen /> },
    { title: 'News & Insights', icon: <Info /> },
  ];

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
            Knowledge <span className="text-gold">Hub</span>
          </motion.h1>
          <p className="text-soft-grey text-xl max-w-3xl mx-auto leading-relaxed">
            Simple, practical guides and materials for miners, cooperatives, buyers, and new entrants.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((r, i) => (
              <div 
                key={i} 
                onClick={() => handleDownload(r.title)}
                className="glass-card p-10 hover:border-gold/40 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform">
                  {r.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{r.title}</h3>
                <p className="text-soft-grey text-sm mb-6">Practical materials and guides to help you navigate the mineral economy.</p>
                <span className="text-gold font-bold text-sm flex items-center gap-2">
                  Download Resource <BookOpen size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
