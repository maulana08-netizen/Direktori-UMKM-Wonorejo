import React from 'react';
import { categoriesData } from '../data/umkmData';
import { Sparkles } from 'lucide-react';

export default function CategoryFilters({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedSubCategory, 
  setSelectedSubCategory 
}) {
  // Find current active category details
  const activeCategoryDetail = categoriesData.find(cat => cat.name === selectedCategory);
  const subCategories = activeCategoryDetail?.subCategories || [];

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory("Semua Sub"); // Reset sub-category on main category change
  };

  // Helper for category-specific colors
  const getCategoryStyles = (name, isActive) => {
    if (isActive) {
      return "bg-[#145E41] text-white border-[#145E41] shadow-lg shadow-emerald-100 scale-105";
    }

    const baseClass = "bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-[#145E41]/50 hover:text-[#145E41] shadow-sm";
    
    // Add subtle pastel color borders on hover for premium feel
    switch (name) {
      case "Makanan": return `${baseClass} hover:border-orange-300 hover:bg-orange-50/30`;
      case "Minuman": return `${baseClass} hover:border-sky-300 hover:bg-sky-50/30`;
      case "Jasa": return `${baseClass} hover:border-purple-300 hover:bg-purple-50/30`;
      case "Fashion": return `${baseClass} hover:border-pink-300 hover:bg-pink-50/30`;
      case "Pedagang": return `${baseClass} hover:border-amber-300 hover:bg-amber-50/30`;
      case "Peternakan": return `${baseClass} hover:border-teal-300 hover:bg-teal-50/30`;
      default: return baseClass;
    }
  };

  return (
    <div className="gravity-item w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 select-none">
      {/* Category Header */}
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
        <h2 className="font-heading text-lg font-bold text-gray-800">Pilih Kategori Utama</h2>
      </div>

      {/* Main Categories Row */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6">
        {categoriesData.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`px-5 py-2.5 rounded-full border text-xs sm:text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 active:scale-95 ${getCategoryStyles(cat.name, isActive)}`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Sub-Categories (rendered conditionally if they exist for the active category) */}
      {subCategories.length > 0 && (
        <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-2xl p-4 sm:p-5 mb-4 animate-fade-in">
          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest mb-3">Sub Kategori</div>
          <div className="flex flex-wrap gap-2">
            {subCategories.map((sub) => {
              // Standardize sub selection (if "Semua Sub", map logic checks if selectedSubCategory is "Semua Sub" or matches)
              const isActive = selectedSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-white text-brand-green border-brand-green shadow-sm font-semibold"
                      : "bg-transparent text-emerald-700 border-transparent hover:bg-white/60 hover:text-brand-green"
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
