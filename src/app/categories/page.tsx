'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const categories = [
  {
    id: 'it',
    name: 'IT/ITes',
    icon: '/it-category-icon.png',
    description: 'Information Technology & IT-enabled Services'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '/healthcare.png',
    description: 'Medical & Healthcare Services'
  },
  {
    id: 'bfsi',
    name: 'BFSI',
    icon: '/bfsi.png',
    description: 'Banking, Financial Services & Insurance'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: '/manufacturing.png',
    description: 'Industrial Manufacturing'
  },
  {
    id: 'government',
    name: 'Government',
    icon: '/government.png',
    description: 'Government & Public Sector'
  },
  {
    id: 'others',
    name: 'Others',
    icon: '/others.png',
    description: 'Other Industries'
  }
];

export default function Categories() {
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('playerName');
    if (!name) {
      router.push('/');
      return;
    }
  }, [router]);

  const handleCategorySelect = (categoryId: string) => {
    localStorage.setItem('selectedCategory', categoryId);
    router.push('/quiz');
  };

  return (
    <div className=" cyber-bg flex items-center justify-center p-4">
      {/* Background geometric frames */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute top-1/2 left-0 w-2 h-32 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30 transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-2 h-32 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30 transform -translate-y-1/2"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className=" rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Pick your Battlefield</h1>
            <div className="text-red-500 font-bold text-2xl flex items-center">
              <span className="text-3xl mr-1">a</span>
              <span>irtel</span>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="p-0 rounded-lg hover:cyber-glow transition-all duration-300 group"
              >
                <div className="text-center flex flex-row items-center">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center mr-4">
                    <Image 
                      src={category.icon} 
                      alt={category.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <h3 className="px-4 py-1.5 rounded-lg bg-[#2E3238] text-gray-200 font-bold text-lg shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                    {category.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Play Button 
          <div className="text-center mt-4">
            <button
              onClick={() => router.push('/quiz')}
              className="cyber-button px-12 py-4 rounded-lg text-white font-bold text-xl"
            >
              PLAY
            </button>
          </div>*/}
        </div>
      </div>
    </div>
  );
}
