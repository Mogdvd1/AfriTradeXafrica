import { ShieldCheck } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  useImage?: boolean;
}

export default function Logo({ className = "w-10 h-10", iconSize = 24, showText = true, useImage = true }: LogoProps) {
  // This is a placeholder URL. In a real app, you would use your actual logo file path like '/logo.png'
  const logoUrl = "https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=200";

  return (
    <div className="flex items-center gap-3 group">
      <div className="relative">
        <div className="absolute -inset-1 bg-gold/20 rounded-full blur group-hover:bg-gold/40 transition-all" />
        {useImage ? (
          <div className={`${className} bg-white/5 rounded-xl flex items-center justify-center p-1 border border-white/10 shadow-[0_0_20px_rgba(244,196,48,0.2)]`}>
            <img 
              src={logoUrl} 
              alt="AfriTradeX Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(244,196,48,0.3)]"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className={`relative ${className} bg-gradient-to-br from-gold to-deep-gold rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(244,196,48,0.3)]`}>
            <ShieldCheck className="text-jet-black" size={iconSize} />
          </div>
        )}
      </div>
      {showText && (
        <span className="text-2xl font-black tracking-tighter text-white hidden sm:block">
          AfriTrade<span className="text-gold">X</span>
        </span>
      )}
    </div>
  );
}
