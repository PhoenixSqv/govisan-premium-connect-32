import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import govisanLogo from '@/assets/govisan-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigation = [
    { name: 'Home', href: '#hero' },
    { name: 'About Govisan', href: '#about' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Specialization', href: '#specialization' },
    { name: 'Success Stories', href: '#success' },
    { name: 'Insights', href: '#insights' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28 py-2">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={govisanLogo} 
              alt="GOVISAN Solutions" 
              className={cn(
                "h-16 w-auto transition-all duration-300 object-contain",
                isScrolled ? "h-14 opacity-100" : "h-16 opacity-95 brightness-125 contrast-110"
              )}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "transition-colors duration-300 font-medium",
                  isScrolled 
                    ? "text-govisan-navy hover:text-govisan-gold" 
                    : "text-white hover:text-govisan-gold"
                )}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={() => handleNavClick('#contact')}
              className="bg-govisan-gold hover:bg-govisan-gold-light text-govisan-navy font-medium px-6 shadow-gold"
            >
              Request Proposal
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "transition-colors duration-300",
                isScrolled ? "text-govisan-navy" : "text-white"
              )}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-md border-t border-white/20">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-govisan-navy hover:text-govisan-gold transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
              <div className="px-3 py-2">
                <Button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full bg-govisan-gold hover:bg-govisan-gold-light text-govisan-navy font-medium shadow-gold"
                >
                  Request Proposal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;