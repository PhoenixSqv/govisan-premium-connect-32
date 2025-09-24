import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone } from 'lucide-react';
const FinalCTA = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="section--wm wm--contact py-20 gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Hotel's Technology?
          </h2>
          
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            GOVISAN Solutions - Your technology partner for hotels that aspire to perfection. Join the leaders in luxury hospitality innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            
            
            
          </div>
          
          
        </div>
      </div>
    </section>;
};
export default FinalCTA;