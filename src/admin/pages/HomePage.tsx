import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Save, Eye, Plus, Trash2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  enabled: boolean;
}

interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
  order: number;
}

interface HomeContent {
  hero: HeroSection;
  partners: Partner[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  status: 'draft' | 'published';
  lastModified: string;
}

const HomePage = () => {
  const [content, setContent] = useState<HomeContent>({
    hero: {
      id: 'hero-1',
      title: 'Transforming Public Sector Efficiency',
      subtitle: 'Strategic Solutions for Government Innovation',
      description: 'GOVISAN partners with government agencies to deliver cutting-edge solutions that enhance operational efficiency, transparency, and citizen services.',
      ctaText: 'Explore Our Solutions',
      ctaLink: '/solutions',
      backgroundImage: '/assets/hero-background.jpg',
      enabled: true
    },
    partners: [
      { id: '1', name: 'Government Partner 1', logo: '/assets/partner-1.png', url: '#', order: 1 },
      { id: '2', name: 'Government Partner 2', logo: '/assets/partner-2.png', url: '#', order: 2 }
    ],
    seo: {
      title: 'GOVISAN - Strategic Government Solutions',
      description: 'Transform your government operations with GOVISAN\'s innovative solutions for enhanced efficiency and citizen services.',
      keywords: 'government solutions, public sector, efficiency, innovation'
    },
    status: 'published',
    lastModified: new Date().toISOString()
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (status: 'draft' | 'published') => {
    setIsLoading(true);
    try {
      const updatedContent = {
        ...content,
        status,
        lastModified: new Date().toISOString()
      };
      
      // Mock save to content/home/index.json
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContent(updatedContent);
      toast.success(`Home page ${status === 'draft' ? 'saved as draft' : 'published'} successfully`);
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  };

  const addPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: 'New Partner',
      logo: '',
      url: '#',
      order: content.partners.length + 1
    };
    setContent(prev => ({
      ...prev,
      partners: [...prev.partners, newPartner]
    }));
  };

  const removePartner = (id: string) => {
    setContent(prev => ({
      ...prev,
      partners: prev.partners.filter(p => p.id !== id)
    }));
  };

  const updatePartner = (id: string, field: keyof Partner, value: string | number) => {
    setContent(prev => ({
      ...prev,
      partners: prev.partners.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Home Page</h1>
          <p className="text-muted-foreground">Manage your homepage content and layout</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
            {content.status}
          </Badge>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Main banner content and call-to-action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={content.hero.enabled}
              onCheckedChange={(enabled) => 
                setContent(prev => ({ ...prev, hero: { ...prev.hero, enabled } }))
              }
            />
            <Label>Enable Hero Section</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={content.hero.title}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  hero: { ...prev.hero, title: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Input
                id="hero-subtitle"
                value={content.hero.subtitle}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  hero: { ...prev.hero, subtitle: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-description">Description</Label>
            <Textarea
              id="hero-description"
              rows={3}
              value={content.hero.description}
              onChange={(e) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, description: e.target.value }
              }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cta-text">CTA Text</Label>
              <Input
                id="cta-text"
                value={content.hero.ctaText}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  hero: { ...prev.hero, ctaText: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-link">CTA Link</Label>
              <Input
                id="cta-link"
                value={content.hero.ctaLink}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  hero: { ...prev.hero, ctaLink: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bg-image">Background Image</Label>
            <Input
              id="bg-image"
              value={content.hero.backgroundImage}
              onChange={(e) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, backgroundImage: e.target.value }
              }))}
              placeholder="/assets/hero-background.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Partners Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Trusted Partners</CardTitle>
              <CardDescription>Manage partner logos and links</CardDescription>
            </div>
            <Button onClick={addPartner} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {content.partners.map((partner) => (
              <div key={partner.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Partner name"
                    value={partner.name}
                    onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Logo URL"
                    value={partner.logo}
                    onChange={(e) => updatePartner(partner.id, 'logo', e.target.value)}
                  />
                  <Input
                    placeholder="Website URL"
                    value={partner.url}
                    onChange={(e) => updatePartner(partner.id, 'url', e.target.value)}
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removePartner(partner.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Search engine optimization for the home page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seo-title">Meta Title</Label>
            <Input
              id="seo-title"
              value={content.seo.title}
              onChange={(e) => setContent(prev => ({
                ...prev,
                seo: { ...prev.seo, title: e.target.value }
              }))}
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              {content.seo.title.length}/60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-description">Meta Description</Label>
            <Textarea
              id="seo-description"
              rows={2}
              value={content.seo.description}
              onChange={(e) => setContent(prev => ({
                ...prev,
                seo: { ...prev.seo, description: e.target.value }
              }))}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">
              {content.seo.description.length}/160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-keywords">Keywords</Label>
            <Input
              id="seo-keywords"
              value={content.seo.keywords}
              onChange={(e) => setContent(prev => ({
                ...prev,
                seo: { ...prev.seo, keywords: e.target.value }
              }))}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <p className="text-sm text-muted-foreground">
          Last modified: {new Date(content.lastModified).toLocaleString()}
        </p>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave('draft')}
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave('published')}
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;