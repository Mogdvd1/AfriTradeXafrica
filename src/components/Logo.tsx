import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
}

export default function Logo({ className = "w-10 h-10", iconSize = 24, showText = true }: LogoProps) {
  const [imageError, setImageError] = useState(false);
  const logoUrl = "/logo.png";

  return (
    <div className="flex items-center gap-3 group">
      <div className="relative">
        <div className="absolute -inset-1 bg-gold/20 rounded-full blur group-hover:bg-gold/40 transition-all" />
        <div className={`${className} rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${
          imageError 
            ? 'bg-gradient-to-br from-gold to-deep-gold shadow-[0_0_15px_rgba(244,196,48,0.3)]' 
            : 'bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(244,196,48,0.2)]'
        }`}>
          {!imageError ? (
            <img 
              src={logoUrl} 
              alt="AfriTradeX Logo" 
              className="w-full h-full object-contain p-1"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
            />
          ) : (
            <ShieldCheck className="text-jet-black" size={iconSize} />
          )}
        </div>
      </div>
      {showText && (
        <span className="text-2xl font-black tracking-tighter text-white">
          AfriTrade<span className="text-gold">X</span>
        </span>
      )}
    </div>
  );
}
