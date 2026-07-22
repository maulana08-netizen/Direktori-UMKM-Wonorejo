import React from 'react';
import { Search, MapPin } from 'lucide-react';

export default function Hero({ searchQuery, setSearchQuery }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="gravity-item relative overflow-hidden bg-brand-green rounded-3xl text-white px-6 py-12 sm:py-16 md:py-20 shadow-xl max-w-7xl mx-auto my-6 select-none">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-700 rounded-full opacity-20 blur-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-emerald-950 rounded-full opacity-35 blur-2xl pointer-events-none"></div>
      
      <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Location Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-emerald-900/50 backdrop-blur-sm border border-emerald-700/50 px-3 py-1 rounded-full text-xs font-semibold text-green-100 mb-6 tracking-wide">
          <MapPin className="w-3.5 h-3.5 text-emerald-300" />
          <span>Kecamatan Wonorejo, Kabupaten Pasuruan</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
          Direktori UMKM <br className="sm:hidden" />
          <span className="text-emerald-300">Desa Wonorejo</span>
        </h1>

        {/* Subtitle */}
        <p className="text-green-100 text-sm sm:text-base md:text-lg max-w-2xl font-light mb-8 sm:mb-10 leading-relaxed">
          Temukan produk unggulan, kuliner khas, kerajinan tangan, dan berbagai jasa terbaik dari pelaku usaha lokal di Desa Wonorejo. Dukung UMKM, majukan ekonomi desa!
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-2 rounded-2xl sm:rounded-full shadow-lg flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center flex-1 w-full px-3 gap-2 text-gray-400">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Cari nama UMKM, produk, dusun, atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-gray-800 focus:outline-none placeholder-gray-400 text-sm py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-brand-green hover:bg-[#0f4631] text-white font-bold px-8 py-3 rounded-xl sm:rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Cari</span>
          </button>
        </form>
      </div>
    </div>
  );
}
