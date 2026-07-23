import React, { useState } from 'react';
import { Store, Info, Phone, Compass, RefreshCw } from 'lucide-react';

export default function Navbar({ onTriggerGravity, isGravityActive, onResetGravity }) {
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    if (isGravityActive) return;
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks >= 5) {
      onTriggerGravity();
      setLogoClicks(0);
    }
  };

  return (
    <nav className="gravity-item bg-white border-b border-gray-100 sticky top-0 z-40 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 cursor-pointer select-none group"
            title="Klik 5 kali untuk Easter Egg rahasia!"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-700 flex items-center justify-center text-white shadow-md shadow-stone-800 transition-transform duration-300 group-hover:scale-105">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                UMKM <span className="text-amber-700">Wonorejo</span>
              </span>
              <p className="text-[10px] text-gray-400 font-medium -mt-1">Direktori Interaktif Desa</p>
            </div>
            {logoClicks > 0 && !isGravityActive && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                {5 - logoClicks}x lagi
              </span>
            )}
          </div>


          {/* Gravity Control (if active) */}
          <div className="flex items-center space-x-3">
            {isGravityActive && (
              <button
                onClick={onResetGravity}
                className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-rose-200 transition-all transform hover:scale-105 active:scale-95 animate-bounce"
              >
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Reset Gravitasi</span>
              </button>
            )}
            <div className="md:hidden">
              {/* Simple Mobile Tag */}
              <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-1.5 py-1 rounded-full border border-amber-600">
                Wonorejo, Kab. Pasuruan
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
