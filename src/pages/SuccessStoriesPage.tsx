import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Star, TrendingUp } from 'lucide-react';

interface Client {
  id: string;
  clientName: string;
  logo?: string;
  projectTitle: string;
  location: string;
  description: string;
  gallery: string[];
  stats: Array<{ label: string; value: string }>;
  technologies: string[];
}

interface SuccessStoriesContent {
  title: string;
  subtitle: string;
  clients: Client[];
}

const SuccessStoriesPage = () => {
  const [content, setContent] = useState<SuccessStoriesContent | null>(null);
  const location = useLocation();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/content/success-stories/main.json');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Error loading success stories content:', error);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    // Handle automatic scrolling to anchor
    if (location.hash && content) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash, content]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading success stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-24 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Client Stories */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {content.clients.map((client, index) => (
            <section
              key={client.id}
              id={client.id}
              className="scroll-mt-24 mb-20 last:mb-0"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Client Header */}
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 border-b">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      {client.logo && (
                        <div className="flex-shrink-0">
                          <img
                            src={client.logo}
                            alt={`${client.clientName} logo`}
                            className="h-16 w-auto object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                          {client.clientName}
                        </h2>
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          {client.projectTitle}
                        </h3>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{client.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Description and Gallery */}
                      <div>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {client.description}
                        </p>
                        
                        {/* Gallery */}
                        <div className="grid grid-cols-2 gap-4">
                          {client.gallery.slice(0, 4).map((image, idx) => (
                            <div
                              key={idx}
                              className="aspect-video bg-muted rounded-lg overflow-hidden"
                            >
                              <img
                                src={image}
                                alt={`${client.projectTitle} ${idx + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stats and Technologies */}
                      <div>
                        {/* Stats */}
                        <div className="mb-8">
                          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                            Key Results
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {client.stats.map((stat, idx) => (
                              <div
                                key={idx}
                                className="text-center p-4 bg-muted/50 rounded-lg"
                              >
                                <div className="text-2xl font-bold text-primary mb-1">
                                  {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-4">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {client.technologies.map((tech, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-sm"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;