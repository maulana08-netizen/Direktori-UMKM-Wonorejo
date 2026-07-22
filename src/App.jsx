import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilters from './components/CategoryFilters';
import UMKMGrid from './components/UMKMGrid';
import Footer from './components/Footer';
import AntigravityManager from './components/AntigravityManager';
import { umkmData } from './data/umkmData';
import { Sparkles, Compass } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Semua Sub');
  const [isGravityActive, setIsGravityActive] = useState(false);

  // Filter items dynamically
  const filteredUMKM = useMemo(() => {
    return umkmData.filter((item) => {
      // 1. Filter by Category
      if (selectedCategory !== 'Semua' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Filter by Sub-Category
      if (
        selectedCategory !== 'Semua' &&
        selectedSubCategory !== 'Semua Sub' &&
        item.subCategory !== selectedSubCategory
      ) {
        return false;
      }

      // 3. Filter by Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesDusun = item.dusun.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesSubCategory = item.subCategory.toLowerCase().includes(query);

        return (
          matchesName ||
          matchesDesc ||
          matchesDusun ||
          matchesCategory ||
          matchesSubCategory
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedSubCategory]);

  const handleTriggerGravity = () => {
    setIsGravityActive(true);
  };

  const handleResetGravity = () => {
    setIsGravityActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased relative">
      {/* Navbar Component */}
      <Navbar 
        onTriggerGravity={handleTriggerGravity} 
        isGravityActive={isGravityActive}
        onResetGravity={handleResetGravity}
      />

      {/* Main Content Layout */}
      <main className="flex-grow pb-16">
        {/* Hero Section */}
        <Hero 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        {/* Dynamic Filters Section */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />

        {/* Interactive Grid Header */}
        <div className="gravity-item max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 select-none">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Compass className="w-5 h-5 text-brand-green" />
            <h2 className="font-heading text-xl font-extrabold text-gray-800">
              {selectedCategory === 'Semua' ? 'Semua Daftar UMKM' : `Kategori ${selectedCategory}`}
            </h2>
            {selectedSubCategory !== 'Semua Sub' && selectedCategory !== 'Semua' && (
              <span className="bg-emerald-50 text-brand-green text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">
                {selectedSubCategory}
              </span>
            )}
          </div>
        </div>

        {/* UMKM Cards Grid */}
        <UMKMGrid items={filteredUMKM} />
      </main>

      {/* Footer Component */}
      <Footer 
        onTriggerGravity={handleTriggerGravity}
        isGravityActive={isGravityActive}
      />

      {/* Matter.js Antigravity Physics Manager overlay */}
      <AntigravityManager 
        isActive={isGravityActive} 
        onClose={handleResetGravity} 
      />
    </div>
  );
}
