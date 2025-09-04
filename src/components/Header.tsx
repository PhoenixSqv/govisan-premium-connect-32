import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About Govisan', href: '#about' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Success Stories', href: '#success' },
    { name: 'Insights', href: '#insights' },
    { name: 'Contact', href: '#contact' },
  ];

  const languages = ['EN', 'ES', 'CN'];

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
                <span className="text-sm font-medium">{currentLang}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 py-2 bg-white border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCurrentLang(lang)}
                    className={cn(
                      "block px-4 py-2 text-sm hover:bg-secondary transition-colors w-full text-left",
                      currentLang === lang ? "text-govisan-navy font-medium" : "text-muted-foreground"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="premium" size="lg">
              Request Proposal
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
                  onClick={() => setIsMenuOpen(false)}
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
                        onClick={() => setCurrentLang(lang)}
                        className={cn(
                          "px-2 py-1 text-xs rounded transition-colors",
                          currentLang === lang
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
                  <Button variant="premium" size="lg" className="w-full">
                    Request Proposal
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