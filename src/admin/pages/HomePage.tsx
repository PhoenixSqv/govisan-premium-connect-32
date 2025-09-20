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
import { FileUpdateTool } from '@/admin/components/FileUpdateTool';

interface HeroButton {
  text: string;
  link: string;
  type: string;
}

interface HeroStat {
  number: string;
  label: string;
}

interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttons: HeroButton[];
  stats: HeroStat[];
}

const HomePage = () => {
  const [content, setContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    backgroundImage: '',
    buttons: [],
    stats: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showFileUpdate, setShowFileUpdate] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/content/home/hero.json');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      toast.error('Failed to load home content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      setShowFileUpdate(true);
      toast.success('Content ready for file update');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to prepare content');
    } finally {
      setSaving(false);
    }
  };

  const addButton = () => {
    setContent(prev => ({
      ...prev,
      buttons: [...prev.buttons, { text: '', link: '', type: 'primary' }]
    }));
  };

  const updateButton = (index: number, field: keyof HeroButton, value: string) => {
    setContent(prev => ({
      ...prev,
      buttons: prev.buttons.map((btn, i) => 
        i === index ? { ...btn, [field]: value } : btn
      )
    }));
  };

  const removeButton = (index: number) => {
    setContent(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  const addStat = () => {
    setContent(prev => ({
      ...prev,
      stats: [...prev.stats, { number: '', label: '' }]
    }));
  };

  const updateStat = (index: number, field: keyof HeroStat, value: string) => {
    setContent(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const removeStat = (index: number) => {
    setContent(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Home Page</h1>
            <p className="text-muted-foreground">Manage your homepage hero section</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Preparing...' : 'Update File'}
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
            <div className="space-y-2">
              <Label htmlFor="hero-title">Title</Label>
              <Textarea
                id="hero-title"
                value={content.title}
                onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Connecting Luxury Hospitality & Real Estate with the Future"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                rows={3}
                value={content.subtitle}
                onChange={(e) => setContent(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Advanced telecommunications engineering and technology solutions..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bg-image">Background Image</Label>
              <Input
                id="bg-image"
                value={content.backgroundImage}
                onChange={(e) => setContent(prev => ({ ...prev, backgroundImage: e.target.value }))}
                placeholder="/images/hero-background.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Call-to-Action Buttons</CardTitle>
                <CardDescription>Hero section buttons</CardDescription>
              </div>
              <Button onClick={addButton} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Button
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.buttons.map((button, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <Input
                      placeholder="Button text"
                      value={button.text}
                      onChange={(e) => updateButton(index, 'text', e.target.value)}
                    />
                    <Input
                      placeholder="Link URL"
                      value={button.link}
                      onChange={(e) => updateButton(index, 'link', e.target.value)}
                    />
                    <select
                      value={button.type}
                      onChange={(e) => updateButton(index, 'type', e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                    </select>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeButton(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Hero Statistics</CardTitle>
                <CardDescription>Key metrics displayed in hero section</CardDescription>
              </div>
              <Button onClick={addStat} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Stat
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Number (e.g., 25+)"
                      value={stat.number}
                      onChange={(e) => updateStat(index, 'number', e.target.value)}
                    />
                    <Input
                      placeholder="Label (e.g., Years of Excellence)"
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeStat(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {showFileUpdate && (
        <FileUpdateTool
          filePath="public/content/home/hero.json"
          content={content}
          onClose={() => setShowFileUpdate(false)}
        />
      )}
    </>
  );
};

export default HomePage;