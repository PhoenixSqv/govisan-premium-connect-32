import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const InsightsSection = () => {
  const { t } = useLanguage();
  const insights = [
    {
      id: 1,
      title: 'The Future of Hotel Connectivity: WiFi 7 and Beyond',
      excerpt: 'Exploring the next generation of wireless technology and its impact on luxury hospitality.',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Technology',
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'Sustainable Tech Solutions for Eco-Luxury Resorts',
      excerpt: 'How green technology is reshaping the telecommunications landscape in hospitality.',
      date: '2024-01-10',
      readTime: '4 min read',
      category: 'Sustainability',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Asia-Pacific Hospitality Market Trends 2024',
      excerpt: 'Market insights and growth opportunities in the expanding Asian luxury hotel sector.',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Market Analysis',
      image: '/api/placeholder/400/250'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="insights" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-govisan-gold/10 text-govisan-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t('insights.badge')}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {t('insights.title')}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('insights.description')}
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <article
              key={insight.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-gold transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden bg-secondary">
                <div className="absolute inset-0 gradient-hero opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-govisan-navy/20">
                    {insight.category[0]}
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center bg-govisan-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                    {insight.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="mr-4">{insight.readTime}</span>
                  <span>{formatDate(insight.date)}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-govisan-navy transition-colors leading-tight">
                  {insight.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {insight.excerpt}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-govisan-navy hover:text-govisan-gold group-hover:translate-x-1 transition-all"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* More Insights CTA */}
        <div className="text-center mt-12">
          <Button variant="premium" size="lg" className="text-lg px-8 py-4 h-auto">
            {t('insights.explore')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;