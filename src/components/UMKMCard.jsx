import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export default function UMKMCard({ item }) {
  // Helper for badge color based on category
  const getBadgeColor = (category) => {
    switch (category) {
      case "Makanan": return "bg-orange-50 text-orange-700 border-orange-100";
      case "Minuman": return "bg-sky-50 text-sky-700 border-sky-100";
      case "Jasa": return "bg-purple-50 text-purple-700 border-purple-100";
      case "Fashion": return "bg-pink-50 text-pink-700 border-pink-100";
      case "Pedagang": return "bg-amber-50 text-amber-700 border-amber-100";
      case "Peternakan": return "bg-teal-50 text-teal-700 border-teal-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="gravity-item bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full select-none">
      {/* Product Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 flex-shrink-0 group">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          loading="lazy"
        />
        {/* Category Floating Badge */}
        <span className={`absolute top-3 left-3 border text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${getBadgeColor(item.category)}`}>
          {item.category}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Sub-Category and Dusun */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {item.subCategory !== "Umum" ? item.subCategory : ""}
          </span>
          <div className="flex items-center text-xs text-gray-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-stone-700 mr-1 flex-shrink-0" />
            <span className="truncate">{item.dusun}</span>
          </div>
        </div>

        {/* UMKM Name */}
        <h3 className="font-heading text-base sm:text-lg font-bold text-gray-800 line-clamp-1 mb-2 hover:text-brand-green transition-colors">
          {item.name}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-5 leading-relaxed flex-grow">
          {item.description}
        </p>

        {/* Maps Button */}
        <a
          href={item.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full border border-gray-200 hover:border-amber-700 text-gray-700 hover:text-white hover:bg-amber-700 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm"
        >
          <span>Buka di Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
        </a>
      </div>
    </div>
  );
}
