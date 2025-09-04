import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'ES';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Header
  'header.home': { EN: 'Home', ES: 'Inicio' },
  'header.about': { EN: 'About Govisan', ES: 'Acerca de Govisan' },
  'header.solutions': { EN: 'Solutions', ES: 'Soluciones' },
  'header.success': { EN: 'Success Stories', ES: 'Casos de Éxito' },
  'header.insights': { EN: 'Insights', ES: 'Insights' },
  'header.contact': { EN: 'Contact', ES: 'Contacto' },
  'header.request_proposal': { EN: 'Request Proposal', ES: 'Solicitar Propuesta' },

  // Hero Section
  'hero.title': { EN: 'Connecting Hospitality Worldwide', ES: 'Conectando la Hospitalidad Mundialmente' },
  'hero.subtitle': { EN: '25+ Years of Excellence in Telecommunications for Luxury Hotels', ES: '25+ Años de Excelencia en Telecomunicaciones para Hoteles de Lujo' },
  'hero.cta_discover': { EN: 'Discover Our Solutions', ES: 'Descubre Nuestras Soluciones' },
  'hero.cta_demo': { EN: 'Watch Demo', ES: 'Ver Demo' },
  'hero.years_excellence': { EN: 'Years of Excellence', ES: 'Años de Excelencia' },
  'hero.hotels_connected': { EN: 'Hotels Connected', ES: 'Hoteles Conectados' },
  'hero.countries_served': { EN: 'Countries Served', ES: 'Países Atendidos' },

  // Trusted Brands
  'brands.title': { EN: 'Trusted by Leading Hospitality Brands Worldwide', ES: 'Confianza de las Principales Marcas Hoteleras Mundiales' },

  // About Section
  'about.badge': { EN: '25+ Years of Excellence', ES: '25+ Años de Excelencia' },
  'about.title': { EN: 'About Govisan', ES: 'Acerca de Govisan' },
  'about.description': { EN: 'As a leading provider of telecommunications solutions for luxury hotels, Govisan has been connecting hospitality worldwide for over 25 years. Our commitment to excellence and innovation has made us the trusted partner for the world\'s most prestigious hotel chains.', ES: 'Como proveedor líder de soluciones de telecomunicaciones para hoteles de lujo, Govisan ha estado conectando la hospitalidad mundial durante más de 25 años. Nuestro compromiso con la excelencia y la innovación nos ha convertido en el socio de confianza para las cadenas hoteleras más prestigiosas del mundo.' },
  'about.quote': { EN: 'Part of VCN Ingeniería Group, we are expanding our presence across Asia-Pacific, bringing world-class telecommunications expertise to the region\'s most exclusive hospitality destinations.', ES: 'Como parte del Grupo VCN Ingeniería, estamos expandiendo nuestra presencia en Asia-Pacífico, llevando experiencia en telecomunicaciones de clase mundial a los destinos de hospitalidad más exclusivos de la región.' },
  'about.learn_more': { EN: 'Learn More About Us', ES: 'Conoce Más Sobre Nosotros' },
  'about.global_presence': { EN: 'Global Presence', ES: 'Presencia Global' },
  'about.global_desc': { EN: 'Operating across 50+ countries with local expertise and international standards of excellence.', ES: 'Operando en más de 50 países con experiencia local y estándares internacionales de excelencia.' },
  'about.expert_team': { EN: 'Expert Team', ES: 'Equipo Experto' },
  'about.expert_desc': { EN: 'Over 200 certified engineers and hospitality technology specialists dedicated to your success.', ES: 'Más de 200 ingenieros certificados y especialistas en tecnología hotelera dedicados a tu éxito.' },
  'about.industry_recognition': { EN: 'Industry Recognition', ES: 'Reconocimiento de la Industria' },
  'about.industry_desc': { EN: 'Multiple awards for innovation in hospitality technology and customer service excellence.', ES: 'Múltiples premios por innovación en tecnología hotelera y excelencia en servicio al cliente.' },

  // Solutions Section
  'solutions.badge': { EN: 'Our Solutions', ES: 'Nuestras Soluciones' },
  'solutions.title': { EN: 'Solutions for Hospitality', ES: 'Soluciones para Hospitalidad' },
  'solutions.description': { EN: 'Comprehensive telecommunications solutions tailored for the unique needs of luxury hotels and resorts worldwide.', ES: 'Soluciones integrales de telecomunicaciones adaptadas a las necesidades únicas de hoteles y resorts de lujo en todo el mundo.' },
  'solutions.see_all': { EN: 'See All Solutions', ES: 'Ver Todas las Soluciones' },

  // Solution Cards
  'solution.smart_connectivity': { EN: 'Smart Connectivity for Hotels', ES: 'Conectividad Inteligente para Hoteles' },
  'solution.smart_connectivity_desc': { EN: 'High-speed wireless networks designed specifically for luxury hospitality environments.', ES: 'Redes inalámbricas de alta velocidad diseñadas específicamente para entornos de hospitalidad de lujo.' },
  'solution.iot_guest': { EN: 'IoT & Guest Experience', ES: 'IoT y Experiencia del Huésped' },
  'solution.iot_guest_desc': { EN: 'Connected room automation and smart guest services for the ultimate luxury experience.', ES: 'Automatización de habitaciones conectadas y servicios inteligentes para huéspedes para la experiencia de lujo definitiva.' },
  'solution.secure_networks': { EN: 'Secure High-Capacity Networks', ES: 'Redes Seguras de Alta Capacidad' },
  'solution.secure_networks_desc': { EN: 'Military-grade security infrastructure protecting guest data and hotel operations.', ES: 'Infraestructura de seguridad de grado militar que protege los datos de huéspedes y las operaciones del hotel.' },
  'solution.systems_integration': { EN: 'Systems Integration', ES: 'Integración de Sistemas' },
  'solution.systems_integration_desc': { EN: 'Seamless integration of telecommunications with existing hotel management systems.', ES: 'Integración perfecta de telecomunicaciones con sistemas de gestión hotelera existentes.' },

  // Features
  'feature.enterprise_wifi': { EN: 'Enterprise-grade WiFi 6E', ES: 'WiFi 6E de nivel empresarial' },
  'feature.guest_isolation': { EN: 'Guest network isolation', ES: 'Aislamiento de red de huéspedes' },
  'feature.bandwidth_mgmt': { EN: 'Bandwidth management', ES: 'Gestión de ancho de banda' },
  'feature.smart_controls': { EN: 'Smart room controls', ES: 'Controles inteligentes de habitación' },
  'feature.mobile_integration': { EN: 'Mobile app integration', ES: 'Integración de aplicaciones móviles' },
  'feature.personalized_services': { EN: 'Personalized services', ES: 'Servicios personalizados' },
  'feature.advanced_encryption': { EN: 'Advanced encryption', ES: 'Cifrado avanzado' },
  'feature.monitoring': { EN: '24/7 monitoring', ES: 'Monitoreo 24/7' },
  'feature.compliance': { EN: 'Compliance standards', ES: 'Estándares de cumplimiento' },
  'feature.pms_integration': { EN: 'PMS integration', ES: 'Integración PMS' },
  'feature.unified_comms': { EN: 'Unified communications', ES: 'Comunicaciones unificadas' },
  'feature.legacy_support': { EN: 'Legacy system support', ES: 'Soporte de sistemas heredados' },

  // Success Stories
  'success.badge': { EN: 'Success Stories', ES: 'Casos de Éxito' },
  'success.title': { EN: 'Proven Excellence Across the Globe', ES: 'Excelencia Comprobada en Todo el Mundo' },
  'success.description': { EN: 'Discover how we\'ve transformed connectivity for luxury hotels and resorts worldwide, delivering exceptional guest experiences through innovative telecommunications solutions.', ES: 'Descubre cómo hemos transformado la conectividad para hoteles y resorts de lujo en todo el mundo, ofreciendo experiencias excepcionales para huéspedes a través de soluciones innovadoras de telecomunicaciones.' },
  'success.maldives': { EN: 'Maldives Resort – 5,000 Guests Connected Seamlessly', ES: 'Resort Maldivas – 5,000 Huéspedes Conectados Perfectamente' },
  'success.read_case': { EN: 'Read Case Study', ES: 'Leer Caso de Estudio' },

  // Insights
  'insights.badge': { EN: 'Latest Insights', ES: 'Últimos Insights' },
  'insights.title': { EN: 'Industry Knowledge & Innovation', ES: 'Conocimiento e Innovación de la Industria' },
  'insights.description': { EN: 'Stay ahead with our expert insights on hospitality technology trends, best practices, and innovative solutions shaping the future of luxury hotels.', ES: 'Mantente a la vanguardia con nuestros insights expertos sobre tendencias de tecnología hotelera, mejores prácticas y soluciones innovadoras que dan forma al futuro de los hoteles de lujo.' },
  'insights.explore': { EN: 'Explore Insights', ES: 'Explorar Insights' },

  // Global Map
  'global.badge': { EN: 'Global Reach', ES: 'Alcance Global' },
  'global.title': { EN: 'A Global Vision. Local Expertise.', ES: 'Una Visión Global. Experiencia Local.' },
  'global.description': { EN: 'From Europe to Asia-Pacific, we deliver world-class telecommunications solutions with deep understanding of local markets and hospitality standards.', ES: 'Desde Europa hasta Asia-Pacífico, ofrecemos soluciones de telecomunicaciones de clase mundial con un profundo entendimiento de los mercados locales y estándares de hospitalidad.' },

  // Final CTA
  'cta.title': { EN: 'Ready to Upgrade Your Hotel\'s Connectivity?', ES: '¿Listo para Actualizar la Conectividad de tu Hotel?' },
  'cta.subtitle': { EN: 'Join 500+ luxury hotels worldwide that trust Govisan for their telecommunications infrastructure.', ES: 'Únete a más de 500 hoteles de lujo en todo el mundo que confían en Govisan para su infraestructura de telecomunicaciones.' },
  'cta.request': { EN: 'Request Proposal', ES: 'Solicitar Propuesta' },
  'cta.contact': { EN: 'Contact Us', ES: 'Contactanos' },

  // Footer
  'footer.part_of': { EN: 'Part of VCN Ingeniería Group', ES: 'Parte del Grupo VCN Ingeniería' },
  'footer.quick_links': { EN: 'Quick Links', ES: 'Enlaces Rápidos' },
  'footer.solutions_text': { EN: 'Solutions', ES: 'Soluciones' },
  'footer.about_text': { EN: 'About Us', ES: 'Acerca de Nosotros' },
  'footer.contact_text': { EN: 'Contact', ES: 'Contacto' },
  'footer.follow_us': { EN: 'Follow Us', ES: 'Síguenos' },
  'footer.global_offices': { EN: 'Global Offices', ES: 'Oficinas Globales' },
  'footer.headquarters': { EN: 'Headquarters', ES: 'Sede Central' },
  'footer.spain': { EN: 'Madrid, Spain', ES: 'Madrid, España' },
  'footer.asia_pacific': { EN: 'Asia-Pacific', ES: 'Asia-Pacífico' },
  'footer.singapore': { EN: 'Singapore', ES: 'Singapur' },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('EN');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};