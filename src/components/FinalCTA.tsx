import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone } from 'lucide-react';

const FinalCTA = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section--wm wm--contact py-20 gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Hotel's Technology?
          </h2>
          
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            GOVISAN Solutions - Your technology partner for hotels that aspire to perfection. Join the leaders in luxury hospitality innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold px-10 py-5 text-lg"
              onClick={() => handleNavClick('#contact')}
            >
              Request Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-govisan-navy font-semibold px-10 py-5 text-lg"
              onClick={() => handleNavClick('#contact')}
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Our Experts
            </Button>
          </div>
          
          <div className="mt-12 text-white/60 text-sm">
            Trusted by 500+ hotels worldwide • Available 24/7 global support
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;