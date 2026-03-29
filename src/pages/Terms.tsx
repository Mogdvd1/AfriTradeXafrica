import { motion } from 'motion/react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-[80vh] section-padding flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <Link to="/onboarding" className="text-soft-grey hover:text-gold flex items-center gap-2 mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Onboarding
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 md:p-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
              <Shield size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black">Terms & Conditions</h1>
          </div>

          <div className="space-y-8 text-soft-grey leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the AfriTradeX platform, you agree to be bound by these Terms and Conditions. 
                Our platform is designed to facilitate transparent and ethical mineral trade in compliance with 
                Zambian mining regulations and international standards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. KYC/AML Compliance</h2>
              <p>
                All users must undergo mandatory Know Your Customer (KYC) and Anti-Money Laundering (AML) verification. 
                You agree to provide accurate, current, and complete information as requested during the onboarding process. 
                Failure to do so may result in the suspension or termination of your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Ethical Sourcing & ESG</h2>
              <p>
                AfriTradeX is committed to ethical sourcing. Users agree to adhere to Environmental, Social, and 
                Governance (ESG) standards. Any mineral trade conducted through the platform must be free from 
                conflict, child labor, and environmental degradation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Data Privacy</h2>
              <p>
                Your data is protected under our Privacy Policy. We use industry-standard encryption to secure 
                your personal and business information. Data is only shared with relevant regulatory bodies 
                as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Platform Fees & Settlement</h2>
              <p>
                AfriTradeX facilitates secure digital settlement through an escrow system. Transaction fees 
                may apply and will be clearly communicated during the trade process.
              </p>
            </section>

            <div className="pt-8 border-t border-white/10">
              <p className="text-sm italic">
                Last Updated: March 29, 2026. This is a placeholder document for demonstration purposes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
