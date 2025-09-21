import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Filter, ChevronLeft, ChevronRight, Star, Wifi, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedCounter from './AnimatedCounter';

interface CaseStudy {
  id: number;
  title: string;
  location: string;
  guests: string;
  rating: string;
  image: string;
  description: string;
  achievements: string[];
  year?: string;
  region?: string;
  type?: string;
  beforeImage?: string;
  afterImage?: string;
  coordinates?: [number, number];
}

interface CasesContent {
  badge: string;
  title: string;
  description: string;
  stories: CaseStudy[];
}

const InteractiveCaseStudies = () => {
  const [content, setContent] = useState<CasesContent | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filters, setFilters] = useState({
    region: 'all',
    type: 'all',
    year: 'all'
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    fetch('/public/content/cases/main.json')
      .then(res => res.json())
      .then(data => {
        // Enhance data with additional properties
        const enhancedStories = data.stories.map((story: CaseStudy, index: number) => ({
          ...story,
          year: ['2023', '2022', '2024'][index % 3],
          region: story.location.includes('Maldives') ? 'Asia' : story.location.includes('Switzerland') ? 'Europe' : 'Asia',
          type: story.title.includes('Resort') ? 'Resort' : story.title.includes('Hotel') ? 'Hotel' : 'Resort',
          beforeImage: '/src/assets/maldives-project.jpg',
          afterImage: '/src/assets/maldives-project.jpg',
          coordinates: [73.5361, 3.2028] as [number, number] // Default Maldives coordinates
        }));
        setContent({ ...data, stories: enhancedStories });
      })
      .catch(err => console.error('Failed to load cases content:', err));
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredStories = content?.stories.filter(story => {
    return (filters.region === 'all' || story.region === filters.region) &&
           (filters.type === 'all' || story.type === filters.type) &&
           (filters.year === 'all' || story.year === filters.year);
  }) || [];

  const regions = ['all', ...new Set(content?.stories.map(s => s.region))];
  const types = ['all', ...new Set(content?.stories.map(s => s.type))];
  const years = ['all', ...new Set(content?.stories.map(s => s.year))];

  if (!content) return <div>Loading...</div>;

  return (
    <section id="cases" className="section--wm wm--cases py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            {content.badge}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {content.title}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
          </div>
          
          <select
            value={filters.region}
            onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
            className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'all' ? 'All Regions' : region}
              </option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>

          <select
            value={filters.year}
            onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
            className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year === 'all' ? 'All Years' : year}
              </option>
            ))}
          </select>
        </div>

        {/* Cases Grid */}
        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${
            gridVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {filteredStories.map((story, index) => (
            <div
              key={story.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedCase(story)}
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className="bg-govisan-gold text-white">{story.region}</Badge>
                  <Badge variant="secondary">{story.year}</Badge>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-semibold">{story.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {story.location}
                </div>

                <h3 className="text-xl font-semibold text-govisan-navy mb-3 group-hover:text-govisan-gold transition-colors">
                  {story.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {story.description}
                </p>

                {/* Animated Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-govisan-gold">
                      <AnimatedCounter end={parseInt(story.guests.replace(/[^\d]/g, ''))} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground">Guests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-govisan-gold">
                      <AnimatedCounter end={99} suffix="%" />
                    </div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for detailed view */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCase(null)}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                {/* Image Gallery */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={selectedCase.image} 
                    alt={selectedCase.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-govisan-navy mb-2">{selectedCase.title}</h2>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedCase.location}
                        <Calendar className="h-4 w-4 ml-4 mr-1" />
                        {selectedCase.year}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center justify-end mb-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                        <span className="text-2xl font-bold">{selectedCase.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Guest Rating</div>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {selectedCase.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-govisan-navy mb-4">Key Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedCase.achievements.map((achievement, index) => (
                        <div key={index} className="bg-govisan-gold/10 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-govisan-gold mb-2">
                            {achievement.includes('%') && <AnimatedCounter end={parseFloat(achievement)} suffix="%" />}
                            {achievement.includes('uptime') && <AnimatedCounter end={99} suffix=".9%" />}
                            {!achievement.includes('%') && !achievement.includes('uptime') && achievement}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {achievement.includes('%') ? 'Performance' : 
                             achievement.includes('uptime') ? 'Reliability' : 
                             'Achievement'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      onClick={() => handleNavClick('#contact')}
                      className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold px-8 py-3"
                    >
                      Start Similar Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            onClick={() => handleNavClick('#contact')}
            size="lg"
            className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold px-8 py-4 group"
          >
            View All Success Stories
            <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCaseStudies;