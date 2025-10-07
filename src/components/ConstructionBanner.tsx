import React from 'react';
import { Construction } from 'lucide-react';

const ConstructionBanner = () => {
  return (
    <div className="w-full bg-yellow-500 py-4 px-4 relative overflow-hidden">
      <div className="container mx-auto flex items-center justify-center gap-3 text-center flex-wrap">
        <Construction className="w-5 h-5 text-yellow-900 animate-pulse" />
        <div className="text-yellow-900">
          <span className="font-bold text-lg">Website Under Construction</span>
          <span className="mx-2">—</span>
          <span className="text-sm">
            We're working on something new! For more information and to see our latest projects, please visit{' '}
            <a 
              href="https://www.vcningenieria.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-yellow-700 transition-colors font-semibold"
            >
              www.vcningenieria.com
            </a>
          </span>
        </div>
        <Construction className="w-5 h-5 text-yellow-900 animate-pulse" />
      </div>
    </div>
  );
};

export default ConstructionBanner;
