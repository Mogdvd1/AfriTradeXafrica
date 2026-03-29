import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('admin@afritradex.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@afritradex.com' && password === 'password123') {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Use the sample credentials provided.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center section-padding">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-10 border-gold/20"
      >
        <div className="text-center mb-10">
          <img 
            src="https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=100" 
            alt="AfriTradeX Logo" 
            className="w-16 h-16 mx-auto mb-6 object-contain"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-soft-grey text-sm">Login to your AfriTradeX Dashboard</p>
        </div>

        <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-8">
          <p className="text-xs text-gold font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <AlertCircle size={14} /> Sample Credentials
          </p>
          <p className="text-sm text-soft-grey">Email: <span className="text-white">admin@afritradex.com</span></p>
          <p className="text-sm text-soft-grey">Password: <span className="text-white">password123</span></p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-soft-grey uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-jet-black border border-white/10 rounded-lg p-4 pl-12 focus:border-gold outline-none transition-colors" 
                placeholder="admin@afritradex.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-soft-grey uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-jet-black border border-white/10 rounded-lg p-4 pl-12 focus:border-gold outline-none transition-colors" 
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full py-4 text-lg group">
            Login to Dashboard
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-soft-grey">
          Don't have an account? <a href="/onboarding" className="text-gold hover:underline">Get Started</a>
        </p>
      </motion.div>
    </div>
  );
}
