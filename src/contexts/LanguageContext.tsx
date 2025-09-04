import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'ES' | 'CN';

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
  'header.home': { EN: 'Home', ES: 'Inicio', CN: '首页' },
  'header.about': { EN: 'About Govisan', ES: 'Acerca de Govisan', CN: '关于我们' },
  'header.solutions': { EN: 'Solutions', ES: 'Soluciones', CN: '解决方案' },
  'header.success': { EN: 'Success Stories', ES: 'Casos de Éxito', CN: '成功案例' },
  'header.insights': { EN: 'Insights', ES: 'Insights', CN: '见解' },
  'header.contact': { EN: 'Contact', ES: 'Contacto', CN: '联系我们' },
  'header.request_proposal': { EN: 'Request Proposal', ES: 'Solicitar Propuesta', CN: '申请提案' },

  // Hero Section
  'hero.title': { EN: 'Connecting Hospitality Worldwide', ES: 'Conectando la Hospitalidad Mundialmente', CN: '连接全球酒店业' },
  'hero.subtitle': { EN: '25+ Years of Excellence in Telecommunications for Luxury Hotels', ES: '25+ Años de Excelencia en Telecomunicaciones para Hoteles de Lujo', CN: '25+年奢华酒店电信卓越服务' },
  'hero.cta_discover': { EN: 'Discover Our Solutions', ES: 'Descubre Nuestras Soluciones', CN: '探索我们的解决方案' },
  'hero.cta_demo': { EN: 'Watch Demo', ES: 'Ver Demo', CN: '观看演示' },
  'hero.years_excellence': { EN: 'Years of Excellence', ES: 'Años de Excelencia', CN: '年卓越服务' },
  'hero.hotels_connected': { EN: 'Hotels Connected', ES: 'Hoteles Conectados', CN: '酒店已连接' },
  'hero.countries_served': { EN: 'Countries Served', ES: 'Países Atendidos', CN: '服务国家' },

  // Trusted Brands
  'brands.title': { EN: 'Trusted by Leading Hospitality Brands Worldwide', ES: 'Confianza de las Principales Marcas Hoteleras Mundiales', CN: '受到全球领先酒店品牌信赖' },

  // About Section
  'about.badge': { EN: '25+ Years of Excellence', ES: '25+ Años de Excelencia', CN: '25+年卓越服务' },
  'about.title': { EN: 'About Govisan', ES: 'Acerca de Govisan', CN: '关于Govisan' },
  'about.description': { EN: 'As a leading provider of telecommunications solutions for luxury hotels, Govisan has been connecting hospitality worldwide for over 25 years. Our commitment to excellence and innovation has made us the trusted partner for the world\'s most prestigious hotel chains.', ES: 'Como proveedor líder de soluciones de telecomunicaciones para hoteles de lujo, Govisan ha estado conectando la hospitalidad mundial durante más de 25 años. Nuestro compromiso con la excelencia y la innovación nos ha convertido en el socio de confianza para las cadenas hoteleras más prestigiosas del mundo.', CN: '作为奢华酒店电信解决方案的领先提供商，Govisan 25年来一直在连接全球酒店业。我们对卓越和创新的承诺使我们成为世界最知名酒店集团的可信赖合作伙伴。' },
  'about.quote': { EN: 'Part of VCN Ingeniería Group, we are expanding our presence across Asia-Pacific, bringing world-class telecommunications expertise to the region\'s most exclusive hospitality destinations.', ES: 'Como parte del Grupo VCN Ingeniería, estamos expandiendo nuestra presencia en Asia-Pacífico, llevando experiencia en telecomunicaciones de clase mundial a los destinos de hospitalidad más exclusivos de la región.', CN: '作为VCN工程集团的一部分，我们正在扩大在亚太地区的业务，为该地区最独特的酒店目的地带来世界级的电信专业知识。' },
  'about.learn_more': { EN: 'Learn More About Us', ES: 'Conoce Más Sobre Nosotros', CN: '了解更多关于我们' },
  'about.global_presence': { EN: 'Global Presence', ES: 'Presencia Global', CN: '全球业务' },
  'about.global_desc': { EN: 'Operating across 50+ countries with local expertise and international standards of excellence.', ES: 'Operando en más de 50 países con experiencia local y estándares internacionales de excelencia.', CN: '在50多个国家运营，具备本地专业知识和国际卓越标准。' },
  'about.expert_team': { EN: 'Expert Team', ES: 'Equipo Experto', CN: '专家团队' },
  'about.expert_desc': { EN: 'Over 200 certified engineers and hospitality technology specialists dedicated to your success.', ES: 'Más de 200 ingenieros certificados y especialistas en tecnología hotelera dedicados a tu éxito.', CN: '超过200名认证工程师和酒店技术专家致力于您的成功。' },
  'about.industry_recognition': { EN: 'Industry Recognition', ES: 'Reconocimiento de la Industria', CN: '行业认可' },
  'about.industry_desc': { EN: 'Multiple awards for innovation in hospitality technology and customer service excellence.', ES: 'Múltiples premios por innovación en tecnología hotelera y excelencia en servicio al cliente.', CN: '多次获得酒店技术创新和客户服务卓越奖项。' },

  // Solutions Section
  'solutions.badge': { EN: 'Our Solutions', ES: 'Nuestras Soluciones', CN: '我们的解决方案' },
  'solutions.title': { EN: 'Solutions for Hospitality', ES: 'Soluciones para Hospitalidad', CN: '酒店业解决方案' },
  'solutions.description': { EN: 'Comprehensive telecommunications solutions tailored for the unique needs of luxury hotels and resorts worldwide.', ES: 'Soluciones integrales de telecomunicaciones adaptadas a las necesidades únicas de hoteles y resorts de lujo en todo el mundo.', CN: '为全球奢华酒店和度假村的独特需求量身定制的综合电信解决方案。' },
  'solutions.see_all': { EN: 'See All Solutions', ES: 'Ver Todas las Soluciones', CN: '查看所有解决方案' },

  // Solution Cards
  'solution.smart_connectivity': { EN: 'Smart Connectivity for Hotels', ES: 'Conectividad Inteligente para Hoteles', CN: '酒店智能连接' },
  'solution.smart_connectivity_desc': { EN: 'High-speed wireless networks designed specifically for luxury hospitality environments.', ES: 'Redes inalámbricas de alta velocidad diseñadas específicamente para entornos de hospitalidad de lujo.', CN: '专为奢华酒店环境设计的高速无线网络。' },
  'solution.iot_guest': { EN: 'IoT & Guest Experience', ES: 'IoT y Experiencia del Huésped', CN: 'IoT与客户体验' },
  'solution.iot_guest_desc': { EN: 'Connected room automation and smart guest services for the ultimate luxury experience.', ES: 'Automatización de habitaciones conectadas y servicios inteligentes para huéspedes para la experiencia de lujo definitiva.', CN: '联网客房自动化和智能客户服务，打造极致奢华体验。' },
  'solution.secure_networks': { EN: 'Secure High-Capacity Networks', ES: 'Redes Seguras de Alta Capacidad', CN: '安全高容量网络' },
  'solution.secure_networks_desc': { EN: 'Military-grade security infrastructure protecting guest data and hotel operations.', ES: 'Infraestructura de seguridad de grado militar que protege los datos de huéspedes y las operaciones del hotel.', CN: '军用级安全基础设施，保护客户数据和酒店运营。' },
  'solution.systems_integration': { EN: 'Systems Integration', ES: 'Integración de Sistemas', CN: '系统集成' },
  'solution.systems_integration_desc': { EN: 'Seamless integration of telecommunications with existing hotel management systems.', ES: 'Integración perfecta de telecomunicaciones con sistemas de gestión hotelera existentes.', CN: '电信与现有酒店管理系统的无缝集成。' },

  // Features
  'feature.enterprise_wifi': { EN: 'Enterprise-grade WiFi 6E', ES: 'WiFi 6E de nivel empresarial', CN: '企业级WiFi 6E' },
  'feature.guest_isolation': { EN: 'Guest network isolation', ES: 'Aislamiento de red de huéspedes', CN: '客户网络隔离' },
  'feature.bandwidth_mgmt': { EN: 'Bandwidth management', ES: 'Gestión de ancho de banda', CN: '带宽管理' },
  'feature.smart_controls': { EN: 'Smart room controls', ES: 'Controles inteligentes de habitación', CN: '智能客房控制' },
  'feature.mobile_integration': { EN: 'Mobile app integration', ES: 'Integración de aplicaciones móviles', CN: '移动应用集成' },
  'feature.personalized_services': { EN: 'Personalized services', ES: 'Servicios personalizados', CN: '个性化服务' },
  'feature.advanced_encryption': { EN: 'Advanced encryption', ES: 'Cifrado avanzado', CN: '高级加密' },
  'feature.monitoring': { EN: '24/7 monitoring', ES: 'Monitoreo 24/7', CN: '24/7监控' },
  'feature.compliance': { EN: 'Compliance standards', ES: 'Estándares de cumplimiento', CN: '合规标准' },
  'feature.pms_integration': { EN: 'PMS integration', ES: 'Integración PMS', CN: 'PMS集成' },
  'feature.unified_comms': { EN: 'Unified communications', ES: 'Comunicaciones unificadas', CN: '统一通信' },
  'feature.legacy_support': { EN: 'Legacy system support', ES: 'Soporte de sistemas heredados', CN: '传统系统支持' },

  // Success Stories
  'success.badge': { EN: 'Success Stories', ES: 'Casos de Éxito', CN: '成功案例' },
  'success.title': { EN: 'Proven Excellence Across the Globe', ES: 'Excelencia Comprobada en Todo el Mundo', CN: '全球卓越表现' },
  'success.description': { EN: 'Discover how we\'ve transformed connectivity for luxury hotels and resorts worldwide, delivering exceptional guest experiences through innovative telecommunications solutions.', ES: 'Descubre cómo hemos transformado la conectividad para hoteles y resorts de lujo en todo el mundo, ofreciendo experiencias excepcionales para huéspedes a través de soluciones innovadoras de telecomunicaciones.', CN: '了解我们如何通过创新的电信解决方案为全球奢华酒店和度假村转变连接方式，提供卓越的客户体验。' },
  'success.maldives': { EN: 'Maldives Resort – 5,000 Guests Connected Seamlessly', ES: 'Resort Maldivas – 5,000 Huéspedes Conectados Perfectamente', CN: '马尔代夫度假村 – 5,000位客人无缝连接' },
  'success.read_case': { EN: 'Read Case Study', ES: 'Leer Caso de Estudio', CN: '阅读案例研究' },

  // Insights
  'insights.badge': { EN: 'Latest Insights', ES: 'Últimos Insights', CN: '最新见解' },
  'insights.title': { EN: 'Industry Knowledge & Innovation', ES: 'Conocimiento e Innovación de la Industria', CN: '行业知识与创新' },
  'insights.description': { EN: 'Stay ahead with our expert insights on hospitality technology trends, best practices, and innovative solutions shaping the future of luxury hotels.', ES: 'Mantente a la vanguardia con nuestros insights expertos sobre tendencias de tecnología hotelera, mejores prácticas y soluciones innovadoras que dan forma al futuro de los hoteles de lujo.', CN: '通过我们在酒店技术趋势、最佳实践和塑造奢华酒店未来的创新解决方案方面的专家见解保持领先。' },
  'insights.explore': { EN: 'Explore Insights', ES: 'Explorar Insights', CN: '探索见解' },

  // Global Map
  'global.badge': { EN: 'Global Reach', ES: 'Alcance Global', CN: '全球覆盖' },
  'global.title': { EN: 'A Global Vision. Local Expertise.', ES: 'Una Visión Global. Experiencia Local.', CN: '全球视野。本地专业知识。' },
  'global.description': { EN: 'From Europe to Asia-Pacific, we deliver world-class telecommunications solutions with deep understanding of local markets and hospitality standards.', ES: 'Desde Europa hasta Asia-Pacífico, ofrecemos soluciones de telecomunicaciones de clase mundial con un profundo entendimiento de los mercados locales y estándares de hospitalidad.', CN: '从欧洲到亚太地区，我们凭借对当地市场和酒店标准的深入了解，提供世界级的电信解决方案。' },

  // Final CTA
  'cta.title': { EN: 'Ready to Upgrade Your Hotel\'s Connectivity?', ES: '¿Listo para Actualizar la Conectividad de tu Hotel?', CN: '准备升级您酒店的连接性了吗？' },
  'cta.subtitle': { EN: 'Join 500+ luxury hotels worldwide that trust Govisan for their telecommunications infrastructure.', ES: 'Únete a más de 500 hoteles de lujo en todo el mundo que confían en Govisan para su infraestructura de telecomunicaciones.', CN: '加入全球500多家信赖Govisan电信基础设施的奢华酒店。' },
  'cta.request': { EN: 'Request Proposal', ES: 'Solicitar Propuesta', CN: '申请提案' },
  'cta.contact': { EN: 'Contact Us', ES: 'Contactanos', CN: '联系我们' },

  // Footer
  'footer.part_of': { EN: 'Part of VCN Ingeniería Group', ES: 'Parte del Grupo VCN Ingeniería', CN: 'VCN工程集团成员' },
  'footer.quick_links': { EN: 'Quick Links', ES: 'Enlaces Rápidos', CN: '快速链接' },
  'footer.solutions_text': { EN: 'Solutions', ES: 'Soluciones', CN: '解决方案' },
  'footer.about_text': { EN: 'About Us', ES: 'Acerca de Nosotros', CN: '关于我们' },
  'footer.contact_text': { EN: 'Contact', ES: 'Contacto', CN: '联系' },
  'footer.follow_us': { EN: 'Follow Us', ES: 'Síguenos', CN: '关注我们' },
  'footer.global_offices': { EN: 'Global Offices', ES: 'Oficinas Globales', CN: '全球办事处' },
  'footer.headquarters': { EN: 'Headquarters', ES: 'Sede Central', CN: '总部' },
  'footer.spain': { EN: 'Madrid, Spain', ES: 'Madrid, España', CN: '西班牙马德里' },
  'footer.asia_pacific': { EN: 'Asia-Pacific', ES: 'Asia-Pacífico', CN: '亚太地区' },
  'footer.singapore': { EN: 'Singapore', ES: 'Singapur', CN: '新加坡' },
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