import React from 'react';
import { Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const navigation = {
    company: [
      { name: 'About Govisan', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'News', href: '#news' },
    ],
    solutions: [
      { name: 'Smart Connectivity', href: '#solutions' },
      { name: 'IoT & Guest Experience', href: '#solutions' },
      { name: 'Security Solutions', href: '#solutions' },
      { name: 'Systems Integration', href: '#solutions' },
    ],
    resources: [
      { name: 'Case Studies', href: '#success' },
      { name: 'White Papers', href: '#insights' },
      { name: 'Documentation', href: '#docs' },
      { name: 'Support', href: '#support' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Compliance', href: '#compliance' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  const offices = [
    {
      region: 'Europe (HQ)',
      address: 'Madrid, Spain',
      phone: '+34 91 XXX XXXX',
      email: 'europe@govisan.com',
    },
    {
      region: 'Asia-Pacific',
      address: 'Singapore',
      phone: '+65 XXXX XXXX',
      email: 'apac@govisan.com',
    },
  ];

  return (
    <footer id="contact" className="bg-govisan-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="text-3xl font-bold text-govisan-gold mb-6">
                GOVISAN Solutions
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Connecting hospitality worldwide with 25+ years of excellence 
                in telecommunications for luxury hotels.
              </p>
              <div className="text-sm text-white/60 mb-4">
                Part of VCN Ingeniería Group
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-govisan-gold transition-colors group"
                  >
                    <social.icon className="h-5 w-5 text-white group-hover:text-govisan-navy" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-govisan-gold mb-4">Company</h3>
                  <ul className="space-y-3">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-govisan-gold mb-4">Solutions</h3>
                  <ul className="space-y-3">
                    {navigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-govisan-gold mb-4">Resources</h3>
                  <ul className="space-y-3">
                    {navigation.resources.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-govisan-gold mb-4">Legal</h3>
                  <ul className="space-y-3">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-govisan-gold mb-6">Global Offices</h3>
              <div className="space-y-6">
                {offices.map((office) => (
                  <div key={office.region} className="border-l-2 border-govisan-gold/30 pl-4">
                    <h4 className="font-semibold text-white mb-2">{office.region}</h4>
                    <div className="space-y-2 text-sm text-white/70">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-govisan-gold" />
                        {office.address}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-govisan-gold" />
                        {office.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-govisan-gold" />
                        {office.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-white/60 mb-4 md:mb-0">
              © 2024 Govisan. All rights reserved. Part of VCN Ingeniería Group.
            </div>
            <div className="text-sm text-white/60">
              Connecting Hospitality Worldwide
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;