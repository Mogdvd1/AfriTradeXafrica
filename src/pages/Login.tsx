import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, ArrowRight, AlertCircle, Shield, Loader2 } from 'lucide-react';
import Logo from '../components/Logo';
import { auth, googleProvider, microsoftProvider, signInWithPopup } from '../firebase';
import { useFirebase } from '../contexts/FirebaseContext';

export default function Login() {
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginType, setLoginType] = useState<'google' | 'microsoft' | null>(null);
  const { user } = useFirebase();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setLoginType('google');
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.code === 'auth/unauthorized-domain') {
        setError('Unauthorized Domain: Please add "afritradexafrica.com" to your Firebase Authorized Domains list in the Firebase Console.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
      setIsLoggingIn(false);
      setLoginType(null);
    }
  };

  const handleMicrosoftLogin = async () => {
    setIsLoggingIn(true);
    setLoginType('microsoft');
    setError('');
    try {
      await signInWithPopup(auth, microsoftProvider);
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.code === 'auth/unauthorized-domain') {
        setError('Unauthorized Domain: Please add "afritradexafrica.com" to your Firebase Authorized Domains list in the Firebase Console.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setError('Microsoft Login is not enabled. Please enable "Microsoft" in the Firebase Console under Authentication > Sign-in method.');
      } else {
        setError('Failed to sign in with Microsoft. Please try again.');
      }
      setIsLoggingIn(false);
      setLoginType(null);
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
          <div className="flex justify-center mb-6">
            <Logo className="w-16 h-16" iconSize={32} showText={false} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-soft-grey text-sm">Login to your AfriTradeX Dashboard</p>
        </div>

        <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 mb-10 text-center">
          <Shield className="text-gold mx-auto mb-4" size={32} />
          <h3 className="text-lg font-bold mb-2">Secure Authentication</h3>
          <p className="text-sm text-soft-grey mb-6">
            We use secure enterprise authentication to protect your mineral trade data and identity.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoggingIn && loginType === 'google' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <LogIn size={20} />
              )}
              Sign in with Google
            </button>

            <button 
              onClick={handleMicrosoftLogin}
              disabled={isLoggingIn}
              className="w-full py-4 bg-white text-black hover:bg-white/90 rounded-lg font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
            >
              {isLoggingIn && loginType === 'microsoft' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <svg viewBox="0 0 23 23" className="w-5 h-5">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
              )}
              Sign in with Microsoft
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-8 flex items-start gap-3 text-red-500">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/10 flex-grow"></div>
            <span className="text-xs text-soft-grey uppercase tracking-widest">Help</span>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>
          
          <p className="text-center text-sm text-soft-grey">
            Don't have an account? <Link to="/onboarding" className="text-gold hover:underline">Get Started</Link>
          </p>
          <p className="text-center text-xs text-soft-grey leading-relaxed">
            By signing in, you agree to our <Link to="/terms" className="text-gold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
