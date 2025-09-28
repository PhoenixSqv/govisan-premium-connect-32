import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Upload, Eye, Settings, Sparkles } from 'lucide-react';

interface SpecializationItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface SpecializationContent {
  badge: string;
  title: string;
  description: string;
  specializations: SpecializationItem[];
}

const SpecializationPage = () => {
  const [content, setContent] = useState<SpecializationContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load content on component mount
  useEffect(() => {
    fetch('/content/specialization/main.json')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading specialization content:', error);
        toast.error('Failed to load specialization content');
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    try {
      // In a real CMS, this would save to a backend API
      // For now, we'll simulate the save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Specialization content saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save specialization content');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSpecialization = (index: number, field: string, value: string | string[]) => {
    if (!content) return;

    const updatedSpecializations = [...content.specializations];
    updatedSpecializations[index] = {
      ...updatedSpecializations[index],
      [field]: value
    };

    setContent({
      ...content,
      specializations: updatedSpecializations
    });
  };

  const updateService = (specializationIndex: number, serviceIndex: number, value: string) => {
    if (!content) return;

    const updatedSpecializations = [...content.specializations];
    const updatedFeatures = [...updatedSpecializations[specializationIndex].features];
    updatedFeatures[serviceIndex] = value;
    
    updatedSpecializations[specializationIndex] = {
      ...updatedSpecializations[specializationIndex],
      features: updatedFeatures
    };

    setContent({
      ...content,
      specializations: updatedSpecializations
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-govisan-navy">Loading specialization content...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center text-red-600">
        Failed to load specialization content
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-govisan-navy flex items-center">
            <Settings className="h-6 w-6 mr-2 text-govisan-gold" />
            Our Specialization
          </h1>
          <p className="text-muted-foreground">
            Manage your specialization sections and content
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </a>
          </Button>
          
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-govisan-gold hover:bg-govisan-gold/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Section Header Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-govisan-gold" />
            Section Header
          </CardTitle>
          <CardDescription>
            Configure the main header for the specialization section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="badge">Badge Text</Label>
            <Input
              id="badge"
              value={content.badge}
              onChange={(e) => setContent({ ...content, badge: e.target.value })}
              placeholder="Industry Expertise"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section-title">Section Title</Label>
            <Input
              id="section-title"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              placeholder="Our Specialization"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section-description">Section Description</Label>
            <Textarea
              id="section-description"
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              placeholder="Main description for the specialization section"
              rows={3}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">
              {content.description.length}/200 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Specialization Items */}
      <div className="space-y-6">
        {content.specializations.map((specialization, index) => (
          <Card key={specialization.title} className="specialization-item">
            <CardHeader>
              <CardTitle className="text-lg text-govisan-navy">
                {specialization.title}
              </CardTitle>
              <CardDescription>
                Edit the content and services for this specialization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={specialization.title}
                    onChange={(e) => updateSpecialization(index, 'title', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`icon-${index}`}>Icon Name</Label>
                  <Input
                    id={`icon-${index}`}
                    value={specialization.icon}
                    onChange={(e) => updateSpecialization(index, 'icon', e.target.value)}
                    placeholder="Building2, Home, Network, etc."
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={specialization.description}
                  onChange={(e) => updateSpecialization(index, 'description', e.target.value)}
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">
                  {specialization.description.length}/200 characters
                </p>
              </div>
              
              <div className="space-y-3">
                <Label>Services List (5 services required)</Label>
                <div className="services-list space-y-2">
                  {specialization.features.map((feature, serviceIndex) => (
                    <Input
                      key={serviceIndex}
                      value={feature}
                      onChange={(e) => updateService(index, serviceIndex, e.target.value)}
                      placeholder={`Service ${serviceIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Background Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Upload new image or enter URL"
                    disabled
                  />
                  <Button variant="outline" size="sm" disabled>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Image upload functionality will be implemented in future updates
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpecializationPage;