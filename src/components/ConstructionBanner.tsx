import React from 'react';
import { Construction } from 'lucide-react';

const ConstructionBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary via-secondary to-primary py-4 px-4 relative overflow-hidden z-50">
      <div className="container mx-auto flex items-center justify-center gap-3 text-center flex-wrap">
        <Construction className="w-5 h-5 text-primary-foreground animate-pulse" />
        <div className="text-primary-foreground">
          <span className="font-bold text-lg">Website Under Construction</span>
          <span className="mx-2">—</span>
          <span className="text-sm">
            We're working on something new! For more information and to see our latest projects, please visit{' '}
            <a 
              href="https://www.vcningenieria.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-accent transition-colors font-semibold"
            >
              www.vcningenieria.com
            </a>
          </span>
        </div>
        <Construction className="w-5 h-5 text-primary-foreground animate-pulse" />
      </div>
    </div>
  );
};

export default ConstructionBanner;
