'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';

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

  const handleCategorySelect = async (categoryId: string) => {
    await soundManager.playClickSound();
    localStorage.setItem('selectedCategory', categoryId);
    router.push('/quiz');
  };

  return (
    <div className=" cyber-bg flex items-center justify-center p-4">
     

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className=" rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 relative">
            <h1 className="text-3xl font-bold text-white text-center w-full">Pick your Battlefield</h1>
            <div className="text-red-500 font-bold text-2xl flex items-center absolute right-0">
              <Image src="/airtel-logo.png" alt="Airtel Logo" width={120} height={48} className="w-auto h-12 object-contain" />
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
