import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t('header.home'), href: '#home' },
    { name: t('header.about'), href: '#about' },
    { name: t('header.solutions'), href: '#solutions' },
    { name: t('header.success'), href: '#success' },
    { name: t('header.insights'), href: '#insights' },
    { name: t('header.contact'), href: '#contact' },
  ];

  const languages = ['EN', 'ES'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-govisan-navy">
              GOVISAN
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-govisan-navy transition-premium font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-govisan-navy transition-premium">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{currentLanguage}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 py-2 bg-white border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={cn(
                      "block px-4 py-2 text-sm hover:bg-secondary transition-colors w-full text-left",
                      currentLanguage === lang ? "text-govisan-navy font-medium" : "text-muted-foreground"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              variant="premium" 
              size="lg"
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('header.request_proposal')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-govisan-navy transition-premium"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-govisan-navy hover:bg-secondary rounded-md transition-premium"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm text-muted-foreground">Language:</span>
                  <div className="flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang as any)}
                        className={cn(
                          "px-2 py-1 text-xs rounded transition-colors",
                          currentLanguage === lang
                            ? "bg-govisan-navy text-white"
                            : "bg-secondary text-muted-foreground hover:bg-accent"
                        )}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-3">
                  <Button 
                    variant="premium" 
                    size="lg" 
                    className="w-full"
                    onClick={() => {
                      const contactSection = document.querySelector('#contact');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t('header.request_proposal')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;