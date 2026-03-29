import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  title?: string;
  description?: string;
}

export default function TwoFactorModal({ 
  isOpen, 
  onClose, 
  onVerify, 
  title = "Two-Factor Authentication", 
  description = "Please enter the 6-digit code sent to your registered device." 
}: TwoFactorModalProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate verification
    setTimeout(() => {
      if (fullCode === '123456') {
        setIsVerifying(false);
        setIsSuccess(true);
        setTimeout(() => {
          onVerify();
          reset();
        }, 1500);
      } else {
        setIsVerifying(false);
        setError('Invalid verification code. Try "123456" for this demo.');
      }
    }, 2000);
  };

  const reset = () => {
    setCode(['', '', '', '', '', '']);
    setIsVerifying(false);
    setIsSuccess(false);
    setError('');
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.getElementById('code-0')?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-jet-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass-card p-8 border-gold/20 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-soft-grey hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto mb-6">
                <Shield size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-soft-grey text-sm">{description}</p>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-trust-green/10 rounded-full flex items-center justify-center text-trust-green mx-auto mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <p className="text-trust-green font-bold">Verification Successful</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-between gap-2">
                  {code.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`code-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInput(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-12 h-14 bg-jet-black border border-white/10 rounded-lg text-center text-xl font-bold text-gold focus:border-gold outline-none transition-colors"
                      disabled={isVerifying}
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-red-500 text-xs flex items-center gap-2 justify-center">
                    <AlertCircle size={14} /> {error}
                  </p>
                )}

                <div className="bg-gold/5 border border-gold/10 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-gold uppercase tracking-widest font-bold">Demo Code</p>
                  <p className="text-sm text-white font-mono">1 2 3 4 5 6</p>
                </div>

                <button 
                  type="submit" 
                  disabled={isVerifying}
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <Shield size={20} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-soft-grey">
                  Didn't receive a code? <button type="button" className="text-gold hover:underline">Resend Code</button>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
