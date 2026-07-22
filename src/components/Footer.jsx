import React from 'react';
import { Sparkles, Globe, Heart, ShieldAlert } from 'lucide-react';

export default function Footer({ onTriggerGravity, isGravityActive }) {
  return (
    <footer className="gravity-item bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto border-t border-gray-800 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
        
        {/* About Wonorejo */}
        <div id="about" className="space-y-3">
          <h3 className="font-heading text-white text-lg font-bold">Tentang Desa Wonorejo</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Wonorejo adalah salah satu kecamatan di Kabupaten Pasuruan. Wonorejo terletak di tengah kabupaten dan dilintasi jalur strategis penghubung Kota Pasuruan di timur laut dengan Purwosari dan Malang di barat daya. Pusat pemerintahan dan ekonomi kecamatan terletak di tepi jalur tersebut, tepatnya di Desa Wonorejo. Desa tersebut memiliki Pasar Wonorejo yang cukup ramai dan juga terdapat Alun-alun Wonorejo.
          </p>
        </div>

        {/* Directory Links */}
        <div className="space-y-3 flex flex-col items-center md:items-start">
          <h3 className="font-heading text-white text-lg font-bold">Dusun di Wonorejo</h3>
          <ul className="text-sm space-y-1.5 font-light">
            <li>• Dusun Kauman </li>
            <li>• Dusun Kidul Dalem </li>
            <li>• Dusun Madurejo </li>
            <li>• Dusun Mulyorejo </li>
            <li>• Dusun Sidomulyo </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div id="contact" className="space-y-3 flex flex-col items-center md:items-start">
          <h3 className="font-heading text-white text-lg font-bold">Hubungi Kami</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Balai Desa Wonorejo <br />
            Jl. Kab No. 75 Madurejo, Wonorejo, Kec. Wonorejo, Kabupaten Pasuruan <br />
            Jam buka: Senin - Jumat (07.00 - 15.00)
          </p>
          <div className="flex space-x-3 pt-2">
            <a href="https://wonorejo.pasuruankab.go.id" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 text-xs font-semibold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Website Resmi Kecamatan Wonorejo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-6"></div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p className="flex items-center gap-1 font-light">
          <span>&copy; 2026 Pemerintah Desa Wonorejo. Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>untuk kemajuan ekonomi desa.</span>
        </p>

        {/* Secret Easter Egg Link inside footer */}
        <div className="flex items-center gap-4">
          {!isGravityActive && (
            <button
              onClick={onTriggerGravity}
              className="text-gray-700 hover:text-emerald-500 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
              title="Aktifkan simulasi fisika"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rahasia Gravitasi</span>
            </button>
          )}
          <span className="text-[10px] text-gray-600">v1.2.0</span>
        </div>
      </div>
    </footer>
  );
}
