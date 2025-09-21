import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Save, Eye, Plus, Edit, Trash2, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { DirectSaver } from '@/lib/cms/directSaver';

interface Solution {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  slug: string;
  order: number;
  enabled: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

const SolutionsPage = () => {
  const [solutions, setSolutions] = useState<Solution[]>([
    {
      id: '1',
      title: 'Digital Transformation',
      shortDescription: 'Modernize government operations with cutting-edge digital solutions',
      fullDescription: 'Our digital transformation services help government agencies transition from legacy systems to modern, efficient digital platforms that enhance citizen services and operational efficiency.',
      features: ['Legacy System Modernization', 'Cloud Migration', 'Process Automation', 'Digital Citizen Services'],
      icon: 'monitor',
      image: '/assets/solutions/digital-transformation.jpg',
      ctaText: 'Learn More',
      ctaLink: '/solutions/digital-transformation',
      slug: 'digital-transformation',
      order: 1,
      enabled: true,
      seo: {
        title: 'Digital Transformation for Government - GOVISAN',
        description: 'Modernize your government operations with our comprehensive digital transformation solutions.',
        keywords: 'digital transformation, government modernization, legacy systems'
      }
    },
    {
      id: '2',
      title: 'Data Analytics & Intelligence',
      shortDescription: 'Transform data into actionable insights for better decision-making',
      fullDescription: 'Leverage advanced analytics and business intelligence tools to gain deeper insights into operations, citizen needs, and performance metrics.',
      features: ['Real-time Dashboards', 'Predictive Analytics', 'Data Visualization', 'Performance Monitoring'],
      icon: 'bar-chart',
      image: '/assets/solutions/data-analytics.jpg',
      ctaText: 'Explore Analytics',
      ctaLink: '/solutions/data-analytics',
      slug: 'data-analytics',
      order: 2,
      enabled: true,
      seo: {
        title: 'Government Data Analytics Solutions - GOVISAN',
        description: 'Transform government data into actionable insights with our advanced analytics platform.',
        keywords: 'data analytics, business intelligence, government insights'
      }
    }
  ]);

  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveSolution = async () => {
    if (!editingSolution) return;

    try {
      let updatedSolutions;
      if (editingSolution.id === 'new') {
        // Add new solution
        const newSolution = {
          ...editingSolution,
          id: Date.now().toString(),
          order: solutions.length + 1
        };
        updatedSolutions = [...solutions, newSolution];
        setSolutions(updatedSolutions);
        toast.success('Solution added successfully');
      } else {
        // Update existing solution
        updatedSolutions = solutions.map(s => 
          s.id === editingSolution.id ? editingSolution : s
        );
        setSolutions(updatedSolutions);
        toast.success('Solution updated successfully');
      }

      // Save to files immediately
      await DirectSaver.saveSolutionsContent({
        title: "Technology Solutions for Luxury Hospitality",
        description: "Transform your hotel operations with our comprehensive technology solutions",
        solutions: updatedSolutions
      });

      setIsDialogOpen(false);
      setEditingSolution(null);
    } catch (error) {
      toast.error('Failed to save solution. Please try again.');
    }
  };

  const deleteSolution = async (id: string) => {
    try {
      const updatedSolutions = solutions.filter(s => s.id !== id);
      setSolutions(updatedSolutions);
      
      // Save to files immediately
      await DirectSaver.saveSolutionsContent({
        title: "Technology Solutions for Luxury Hospitality",
        description: "Transform your hotel operations with our comprehensive technology solutions",
        solutions: updatedSolutions
      });
      
      toast.success('Solution deleted successfully');
    } catch (error) {
      toast.error('Failed to delete solution. Please try again.');
    }
  };

  const createNewSolution = () => {
    const newSolution: Solution = {
      id: 'new',
      title: '',
      shortDescription: '',
      fullDescription: '',
      features: [''],
      icon: 'settings',
      image: '',
      ctaText: 'Learn More',
      ctaLink: '',
      slug: '',
      order: solutions.length + 1,
      enabled: true,
      seo: {
        title: '',
        description: '',
        keywords: ''
      }
    };
    setEditingSolution(newSolution);
    setIsDialogOpen(true);
  };

  const editSolution = (solution: Solution) => {
    setEditingSolution({ ...solution });
    setIsDialogOpen(true);
  };

  const addFeature = () => {
    if (!editingSolution) return;
    setEditingSolution({
      ...editingSolution,
      features: [...editingSolution.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingSolution) return;
    const newFeatures = [...editingSolution.features];
    newFeatures[index] = value;
    setEditingSolution({
      ...editingSolution,
      features: newFeatures
    });
  };

  const removeFeature = (index: number) => {
    if (!editingSolution) return;
    setEditingSolution({
      ...editingSolution,
      features: editingSolution.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Solutions</h1>
          <p className="text-muted-foreground">Manage your solution offerings and content</p>
        </div>
        <Button onClick={createNewSolution}>
          <Plus className="h-4 w-4 mr-2" />
          Add Solution
        </Button>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((solution) => (
          <Card key={solution.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{solution.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {solution.shortDescription}
                  </CardDescription>
                </div>
                <Badge variant={solution.enabled ? 'default' : 'secondary'}>
                  {solution.enabled ? 'Active' : 'Draft'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  {solution.image ? (
                    <img src={solution.image} alt={solution.title} className="w-full h-full object-cover rounded-md" />
                  ) : (
                    <Settings className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {solution.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {solution.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{solution.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">
                    /{solution.slug}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={() => editSolution(solution)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteSolution(solution.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Solution Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSolution?.id === 'new' ? 'Add New Solution' : 'Edit Solution'}
            </DialogTitle>
            <DialogDescription>
              Configure the solution details, features, and SEO settings.
            </DialogDescription>
          </DialogHeader>

          {editingSolution && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingSolution.title}
                    onChange={(e) => setEditingSolution({
                      ...editingSolution,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={editingSolution.slug}
                    onChange={(e) => setEditingSolution({
                      ...editingSolution,
                      slug: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short-desc">Short Description</Label>
                <Input
                  id="short-desc"
                  value={editingSolution.shortDescription}
                  onChange={(e) => setEditingSolution({
                    ...editingSolution,
                    shortDescription: e.target.value
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-desc">Full Description</Label>
                <Textarea
                  id="full-desc"
                  rows={4}
                  value={editingSolution.fullDescription}
                  onChange={(e) => setEditingSolution({
                    ...editingSolution,
                    fullDescription: e.target.value
                  })}
                />
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Features</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {editingSolution.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Feature description"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media & CTA */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Hero Image</Label>
                  <Input
                    id="image"
                    value={editingSolution.image}
                    onChange={(e) => setEditingSolution({
                      ...editingSolution,
                      image: e.target.value
                    })}
                    placeholder="/assets/solutions/example.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    value={editingSolution.icon}
                    onChange={(e) => setEditingSolution({
                      ...editingSolution,
                      icon: e.target.value
                    })}
                    placeholder="monitor, bar-chart, settings"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cta-text">CTA Text</Label>
                  <Input
                    id="cta-text"
                    value={editingSolution.ctaText}
                    onChange={(e) => setEditingSolution({
                      ...editingSolution,
                      ctaText: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-link">CTA Link</Label>
                  <Input
                    id="cta-link"
                    value={editingSolution.ctaLink}
                    onChange={(e) => setEditingSolution({
                      ...editingSolution,
                      ctaLink: e.target.value
                    })}
                  />
                </div>
              </div>

              {/* SEO */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">SEO Settings</h4>
                <div className="space-y-2">
                  <Label htmlFor="seo-title">Meta Title</Label>
                  <Input
                    id="seo-title"
                    value={editingSolution.seo.title}
                    onChange={(e) => setEditingSolution({
                      ...editingSolution,
                      seo: { ...editingSolution.seo, title: e.target.value }
                    })}
                    maxLength={60}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo-desc">Meta Description</Label>
                  <Textarea
                    id="seo-desc"
                    rows={2}
                    value={editingSolution.seo.description}
                    onChange={(e) => setEditingSolution({
                      ...editingSolution,
                      seo: { ...editingSolution.seo, description: e.target.value }
                    })}
                    maxLength={160}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo-keywords">Keywords</Label>
                  <Input
                    id="seo-keywords"
                    value={editingSolution.seo.keywords}
                    onChange={(e) => setEditingSolution({
                      ...editingSolution,
                      seo: { ...editingSolution.seo, keywords: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSolution}>
              <Save className="h-4 w-4 mr-2" />
              Save Solution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SolutionsPage;