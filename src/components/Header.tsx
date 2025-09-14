import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    { name: 'Contact', href: '#contact' },
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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md",
      isScrolled ? "shadow-lg" : ""
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-govisan-navy">
              GOVISAN Solutions
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-govisan-navy hover:text-govisan-gold transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={() => handleNavClick('#contact')}
              className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-medium px-6"
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
              className="text-govisan-navy"
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
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
                  className="w-full bg-govisan-gold hover:bg-govisan-gold/90 text-white font-medium"
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