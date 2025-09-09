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
  'hero.title': { EN: 'Connecting Luxury Hospitality with the Future', ES: 'Conectando la Hospitalidad de Lujo con el Futuro' },
  'hero.subtitle': { EN: 'Elegance. Innovation. Connectivity. In a world where luxury hospitality demands the very best, GOVISAN Solutions delivers engineering in telecommunications and technology that elevates every guest experience. From flawless connectivity to intelligent comfort, we design digital infrastructures that turn every stay into something unforgettable.', ES: 'Elegancia. Innovación. Conectividad. En un mundo donde la hospitalidad de lujo exige lo mejor, GOVISAN Solutions ofrece ingeniería en telecomunicaciones y tecnología que eleva cada experiencia de huésped. Desde conectividad impecable hasta comodidad inteligente, diseñamos infraestructuras digitales que convierten cada estadía en algo inolvidable.' },
  'hero.cta_discover': { EN: 'Discover Our Solutions', ES: 'Descubre Nuestras Soluciones' },
  'hero.cta_demo': { EN: 'Our Expertise', ES: 'Nuestra Experiencia' },
  'hero.years_excellence': { EN: 'Years of Excellence', ES: 'Años de Excelencia' },
  'hero.hotels_connected': { EN: 'Hotels Connected', ES: 'Hoteles Conectados' },
  'hero.countries_served': { EN: 'Countries Served', ES: 'Países Atendidos' },

  // Trusted Brands
  'brands.title': { EN: 'Trusted by iconic hospitality brands: Mandarin Oriental, Six Senses, Fairmont, Hilton, Marriott, Hard Rock Hotels', ES: 'Confianza de marcas hoteleras icónicas: Mandarin Oriental, Six Senses, Fairmont, Hilton, Marriott, Hard Rock Hotels' },

  // About Section
  'about.badge': { EN: '25+ Years Creating Technological Experiences', ES: '25+ Años Creando Experiencias Tecnológicas' },
  'about.title': { EN: 'Over 25 years creating technological experiences for world-class hospitality', ES: 'Más de 25 años creando experiencias tecnológicas para hospitalidad de clase mundial' },
  'about.description': { EN: 'At GOVISAN Solutions, we are more than engineers: we are strategic partners of luxury hotels. With an international track record of prestigious projects, we bring trust, innovation, and bespoke service to properties that seek true distinction.', ES: 'En GOVISAN Solutions, somos más que ingenieros: somos socios estratégicos de hoteles de lujo. Con un historial internacional de proyectos prestigiosos, aportamos confianza, innovación y servicio personalizado a propiedades que buscan una verdadera distinción.' },
  'about.quote': { EN: 'We design and execute integrated technology ecosystems that guarantee security, efficiency, and elegance in every detail.', ES: 'Diseñamos y ejecutamos ecosistemas tecnológicos integrados que garantizan seguridad, eficiencia y elegancia en cada detalle.' },
  'about.learn_more': { EN: 'Learn More About Us', ES: 'Conoce Más Sobre Nosotros' },
  'about.global_presence': { EN: 'Global Experience', ES: 'Experiencia Global' },
  'about.global_desc': { EN: 'Two decades supporting leading hospitality brands with international standards of excellence.', ES: 'Dos décadas apoyando a las principales marcas hoteleras con estándares internacionales de excelencia.' },
  'about.expert_team': { EN: 'Commitment to Excellence', ES: 'Compromiso con la Excelencia' },
  'about.expert_desc': { EN: 'Quality across every phase, from design to operation, ensuring perfection in every project.', ES: 'Calidad en cada fase, desde el diseño hasta la operación, asegurando perfección en cada proyecto.' },
  'about.industry_recognition': { EN: 'Customer-Centric', ES: 'Centrados en el Cliente' },
  'about.industry_desc': { EN: 'Exclusive solutions tailored to every space and every guest for truly personalized experiences.', ES: 'Soluciones exclusivas adaptadas a cada espacio y cada huésped para experiencias verdaderamente personalizadas.' },

  // Solutions Section
  'solutions.badge': { EN: 'Our Services', ES: 'Nuestros Servicios' },
  'solutions.title': { EN: 'Integrated Technology Ecosystems', ES: 'Ecosistemas Tecnológicos Integrados' },
  'solutions.description': { EN: 'At GOVISAN Solutions, we design and execute integrated technology ecosystems that guarantee security, efficiency, and elegance in every detail.', ES: 'En GOVISAN Solutions, diseñamos y ejecutamos ecosistemas tecnológicos integrados que garantizan seguridad, eficiencia y elegancia en cada detalle.' },
  'solutions.see_all': { EN: 'See All Services', ES: 'Ver Todos los Servicios' },

  // Solution Cards
  'solution.smart_connectivity': { EN: 'Strategic Consulting', ES: 'Consultoría Estratégica' },
  'solution.smart_connectivity_desc': { EN: 'Tailored telecom and IT solutions for luxury hospitality with expert guidance and strategic planning.', ES: 'Soluciones de telecomunicaciones e IT adaptadas para hospitalidad de lujo con orientación experta y planificación estratégica.' },
  'solution.iot_guest': { EN: 'Project Engineering', ES: 'Ingeniería de Proyectos' },
  'solution.iot_guest_desc': { EN: 'End-to-end management, from concept to commissioning, ensuring flawless execution of every project.', ES: 'Gestión integral, desde el concepto hasta la puesta en marcha, asegurando una ejecución impecable de cada proyecto.' },
  'solution.secure_networks': { EN: 'On-Site Supervision', ES: 'Supervisión en Sitio' },
  'solution.secure_networks_desc': { EN: 'Ensuring flawless quality during every installation with dedicated on-site technical supervision.', ES: 'Asegurando calidad impecable durante cada instalación con supervisión técnica dedicada en sitio.' },
  'solution.systems_integration': { EN: 'Smart Integration', ES: 'Integración Inteligente' },
  'solution.systems_integration_desc': { EN: 'Coordinating providers and systems for seamless results and unified technological solutions.', ES: 'Coordinando proveedores y sistemas para resultados perfectos y soluciones tecnológicas unificadas.' },

  // Features
  'feature.enterprise_wifi': { EN: 'Premium Connectivity', ES: 'Conectividad Premium' },
  'feature.guest_isolation': { EN: 'Secure, fast, and reliable WiFi', ES: 'WiFi seguro, rápido y confiable' },
  'feature.bandwidth_mgmt': { EN: 'Smart Rooms', ES: 'Habitaciones Inteligentes' },
  'feature.smart_controls': { EN: 'Intelligent rooms blending comfort', ES: 'Habitaciones inteligentes que combinan comodidad' },
  'feature.mobile_integration': { EN: 'Next-Gen Audiovisuals', ES: 'Audiovisuales de Nueva Generación' },
  'feature.personalized_services': { EN: 'Digital conference rooms & entertainment', ES: 'Salas de conferencias digitales y entretenimiento' },
  'feature.advanced_encryption': { EN: 'Advanced Security', ES: 'Seguridad Avanzada' },
  'feature.monitoring': { EN: 'CCTV, access control, protection systems', ES: 'CCTV, control de acceso, sistemas de protección' },
  'feature.compliance': { EN: 'Payments & POS', ES: 'Pagos y TPV' },
  'feature.pms_integration': { EN: 'Reliable, frictionless payment solutions', ES: 'Soluciones de pago confiables y sin fricción' },
  'feature.unified_comms': { EN: 'Telco Coordination', ES: 'Coordinación Telco' },
  'feature.legacy_support': { EN: 'Smooth integration with global providers', ES: 'Integración fluida con proveedores globales' },

  // Success Stories
  'success.badge': { EN: 'Case Studies', ES: 'Casos de Estudio' },
  'success.title': { EN: 'Partnering with Iconic Global Hospitality Brands', ES: 'Colaborando con Marcas Hoteleras Icónicas Globales' },
  'success.description': { EN: 'We have partnered with iconic global hospitality brands to deliver technological excellence. Each project is a new opportunity to redefine luxury hospitality through innovation.', ES: 'Hemos colaborado con marcas hoteleras icónicas globales para ofrecer excelencia tecnológica. Cada proyecto es una nueva oportunidad para redefinir la hospitalidad de lujo a través de la innovación.' },
  'success.maldives': { EN: 'Mandarin Oriental – Seamless Smart Integration', ES: 'Mandarin Oriental – Integración Inteligente Perfecta' },
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
  'global.countriesServed': { EN: 'Countries Served', ES: 'Países Atendidos' },
  'global.hotelsConnected': { EN: 'Hotels Connected', ES: 'Hoteles Conectados' },
  'global.globalSupport': { EN: 'Global Support', ES: 'Soporte Global' },
  'global.timeZones': { EN: 'Time Zones', ES: 'Zonas Horarias' },
  'global.projects': { EN: 'Projects', ES: 'Proyectos' },

  // Final CTA
  'cta.title': { EN: 'Ready to Transform Your Hotel\'s Technology?', ES: '¿Listo para Transformar la Tecnología de tu Hotel?' },
  'cta.subtitle': { EN: 'GOVISAN Solutions - Your technology partner for hotels that aspire to perfection. Join the leaders in luxury hospitality innovation.', ES: 'GOVISAN Solutions - Tu socio tecnológico para hoteles que aspiran a la perfección. Únete a los líderes en innovación de hospitalidad de lujo.' },
  'cta.request': { EN: 'Request Consultation', ES: 'Solicitar Consulta' },
  'cta.contact': { EN: 'Contact Our Experts', ES: 'Contactar Nuestros Expertos' },

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