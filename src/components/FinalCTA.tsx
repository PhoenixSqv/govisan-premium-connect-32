import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone, Calendar, Users, Award } from 'lucide-react';
const FinalCTA = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="section--wm wm--contact py-20 bg-gradient-to-br from-govisan-navy via-govisan-navy/95 to-govisan-navy/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Hotel's Technology?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the leaders in luxury hospitality innovation. Let GOVISAN Solutions elevate your property to new heights of technological excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <Button size="lg" onClick={() => handleNavClick('#contact')} className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold px-8 py-4 text-lg group transform hover:scale-105 transition-all duration-300 shadow-xl">
              Request Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            
            <Button variant="outline" size="lg" onClick={() => window.open('tel:+34911234567', '_self')} className="border-2 border-white text-white hover:bg-white hover:text-govisan-navy font-semibold px-8 py-4 text-lg group transform hover:scale-105 transition-all duration-300">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +34 911 234 567
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
            <div className="text-white/90">
              <div className="flex items-center justify-center mb-3">
                <Calendar className="h-8 w-8 text-govisan-gold mr-3" />
                <div className="text-3xl font-bold text-white">25+</div>
              </div>
              <p className="text-white/70 text-sm">Years of Excellence</p>
            </div>
            <div className="text-white/90">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-govisan-gold mr-3" />
                <div className="text-3xl font-bold text-white">60K+</div>
              </div>
              <p className="text-white/70 text-sm">Guestrooms Connected</p>
            </div>
            <div className="text-white/90">
              <div className="flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-govisan-gold mr-3" />
                <div className="text-3xl font-bold text-white">99.9%</div>
              </div>
              <p className="text-white/70 text-sm">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-govisan-gold/20 to-transparent"></div>
      </div>
    </section>;
};
export default FinalCTA;