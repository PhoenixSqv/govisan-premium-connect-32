import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, MapPin, Users, Star } from 'lucide-react';
import maldivesProject from '@/assets/maldives-project.jpg';

const SuccessStories = () => {
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewAllStories = () => {
    navigate('/success-stories');
  };

  const stories = [
    {
      id: 1,
      title: 'Mandarin Oriental – Seamless Smart Integration',
      location: 'Maldives',
      guests: '5,000',
      rating: '4.9',
      image: maldivesProject,
      description: 'Transforming a luxury resort in the Maldives with cutting-edge connectivity infrastructure for world-class guest experiences.',
      achievements: [
        '99.9% network uptime',
        'Zero guest connectivity complaints',
        '40% increase in guest satisfaction scores'
      ]
    },
    {
      id: 2,
      title: 'Six Senses Alpine Resort Network',
      location: 'Switzerland',
      guests: '3,200',
      rating: '4.8',
      image: maldivesProject,
      description: 'Complete telecommunications overhaul for a premium mountain resort chain with seamless connectivity.',
      achievements: [
        'WiFi 6E implementation',
        'Seamless inter-resort roaming',
        '25% faster connection speeds'
      ]
    },
    {
      id: 3,
      title: 'Fairmont Bangkok Smart Integration',
      location: 'Thailand',
      guests: '8,500',
      rating: '4.9',
      image: maldivesProject,
      description: 'Smart city integration for a flagship hospitality development with advanced IoT systems.',
      achievements: [
        'Full IoT room automation',
        'Mobile-first guest experience',
        '30% operational efficiency gain'
      ]
    }
  ];

  return (
    <section id="success" className="section--wm wm--cases py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            Case Studies
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Partnering with Iconic Global Hospitality Brands
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We have partnered with iconic global hospitality brands to deliver technological excellence. Each project is a new opportunity to redefine luxury hospitality through innovation.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-gold transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-govisan-navy/60 to-transparent"></div>
                
                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {story.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {story.guests}
                      </div>
                    </div>
                    <div className="flex items-center bg-govisan-gold/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 mr-1 text-govisan-gold" />
                      {story.rating}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-govisan-navy transition-colors">
                  {story.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {story.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {story.achievements.map((achievement) => (
                    <div key={achievement} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-govisan-gold rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => handleNavClick('#contact')}
                  className="group-hover:border-govisan-gold group-hover:text-govisan-gold transition-colors"
                >
                  Read Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* More Stories CTA */}
        <div className="text-center mt-12">
          <Button 
            onClick={handleViewAllStories}
            className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold px-8 py-4 text-lg group"
          >
            View All Success Stories
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;