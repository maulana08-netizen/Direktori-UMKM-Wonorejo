import React from 'react';
import UMKMCard from './UMKMCard';
import { SearchX, HelpCircle } from 'lucide-react';

export default function UMKMGrid({ items }) {
  if (items.length === 0) {
    return (
      <div className="w-full max-w-lg mx-auto py-16 px-4 text-center select-none flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mb-4 animate-bounce">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="font-heading text-lg font-bold text-gray-800 mb-1">
          Tidak Ada UMKM Ditemukan
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Tidak ditemukan pelaku usaha yang cocok dengan filter atau kata pencarian Anda. Coba bersihkan pencarian atau ubah kategori.
        </p>
      </div>
    );
  }

  return (
    <div id="umkm-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-12 select-none">
      {/* Grid count summary */}
      <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
        <p className="font-medium">
          Menampilkan <span className="text-amber-700 font-bold">{items.length}</span> pelaku usaha
        </p>
        
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {items.map((item) => (
          <div key={item.id} className="h-full">
            <UMKMCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
