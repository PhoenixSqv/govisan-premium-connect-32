import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Carlos Rodríguez',
      position: 'CTO',
      company: 'Grupo Inmobiliario Madrid',
      location: 'Madrid, España',
      rating: 5,
      text: 'GOVISAN transformó completamente nuestra infraestructura de red. La migración a fibra óptica se completó sin interrupciones y ahora tenemos una conectividad 10 veces más rápida.',
      project: 'Migración a Fibra Óptica',
      savings: '60% reducción en costos'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'IT Director',
      company: 'TechCorp Bangalore',
      location: 'Bangalore, India',
      rating: 5,
      text: 'La implementación del sistema VoIP por GOVISAN superó nuestras expectativas. Ahora tenemos comunicaciones unificadas entre nuestras oficinas de India y España.',
      project: 'Sistema VoIP Empresarial',
      savings: '45% reducción en telefonía'
    },
    {
      id: 3,
      name: 'Miguel Fernández',
      position: 'Gerente de Operaciones',
      company: 'Logistics Pro',
      location: 'Barcelona, España',
      rating: 5,
      text: 'El diseño de la red inalámbrica para nuestro almacén fue perfecto. Cobertura total, gestión centralizada y seguridad empresarial. Excelente servicio.',
      project: 'Red Inalámbrica Corporativa',
      savings: '99.9% uptime garantizado'
    },
    {
      id: 4,
      name: 'Rajesh Kumar',
      position: 'Network Manager',
      company: 'Manufacturing Solutions',
      location: 'Mumbai, India',
      rating: 5,
      text: 'GOVISAN diseñó una infraestructura de red híbrida que conecta perfectamente nuestras 5 plantas industriales. Soporte técnico excepcional.',
      project: 'Red Industrial Híbrida',
      savings: 'Escalabilidad total'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-primary">
            Testimonios de Clientes
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Empresas de España e India confían en GOVISAN para sus proyectos de telecomunicaciones más críticos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              {/* Quote Icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-2 rounded-full shrink-0">
                  <Quote className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {/* Testimonial Text */}
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>

              {/* Client Info */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position} • {testimonial.company}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      📍 {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {testimonial.project}
                    </Badge>
                    <p className="text-xs text-green-600 font-medium">
                      {testimonial.savings}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              ¿Listo para Transformar tu Infraestructura?
            </h3>
            <p className="text-muted-foreground mb-6">
              Únete a las empresas que ya confían en GOVISAN para sus proyectos de telecomunicaciones
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Solicitar Consulta Gratuita
              </button>
              <button className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Ver Más Casos de Éxito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;