import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Platform', href: '/platform' },
  { name: 'Capacity Building', href: '/capacity' },
  { name: 'Ethical Sourcing', href: '/sourcing' },
  { name: 'ESG & Safety', href: '/esg' },
  { name: 'Partners', href: '/partners' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
];

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-jet-black/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs lg:text-sm font-medium transition-colors hover:text-gold ${
                  location.pathname === link.href ? 'text-gold' : 'text-soft-grey'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login" className="text-sm font-bold text-gold hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/onboarding" className="btn-primary py-2 px-4 text-xs lg:text-sm">
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-charcoal border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-lg font-medium ${
                      location.pathname === link.href ? 'text-gold' : 'text-soft-grey'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/onboarding" className="btn-primary w-full mt-4">
                  Get Started
                </Link>
                <Link to="/login" className="btn-secondary w-full">
                  Login to Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-jet-black border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
          <div className="space-y-6 flex flex-col items-center sm:items-start">
            <Link to="/">
              <Logo className="w-8 h-8" iconSize={20} />
            </Link>
            <p className="text-soft-grey text-sm leading-relaxed max-w-xs">
              Formalising Africa’s hidden mineral economy through digital settlement, ethical sourcing, and safer trade for artisanal miners.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-soft-grey hover:text-gold transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-soft-grey hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-soft-grey hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-soft-grey hover:text-gold text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4">
              <li><Link to="/platform" className="text-soft-grey hover:text-gold text-sm transition-colors">Digital Settlement</Link></li>
              <li><Link to="/capacity" className="text-soft-grey hover:text-gold text-sm transition-colors">ASM Training</Link></li>
              <li><Link to="/sourcing" className="text-soft-grey hover:text-gold text-sm transition-colors">Ethical Sourcing</Link></li>
              <li><Link to="/esg" className="text-soft-grey hover:text-gold text-sm transition-colors">ESG Compliance</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-soft-grey justify-center sm:justify-start">
                <MapPin size={18} className="text-gold shrink-0" />
                <span>Limbe Road, Northmead, Lusaka, Zambia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-soft-grey justify-center sm:justify-start">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+260 974 174 268</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-soft-grey justify-center sm:justify-start">
                <Mail size={18} className="text-gold shrink-0" />
                <span className="break-all">gondmachomineralsz@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-soft-grey">
            © {new Date().getFullYear()} Gondmacho Minerals. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-soft-grey hover:text-gold">Privacy Policy</a>
            <a href="#" className="text-xs text-soft-grey hover:text-gold">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
