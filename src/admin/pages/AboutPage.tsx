import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { DirectSaver } from '@/lib/cms/directSaver';

interface AboutValue {
  icon: string;
  title: string;
  description: string;
}

interface AboutContent {
  badge: string;
  title: string;
  description: string;
  quote: string;
  values: AboutValue[];
}

const AboutPage = () => {
  const [content, setContent] = useState<AboutContent>({
    badge: '',
    title: '',
    description: '',
    quote: '',
    values: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/content/about/main.json');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      toast.error('Failed to load about content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const result = await DirectSaver.saveFile('/content/about/main.json', content);
      if (result.success) {
        toast.success('About content saved successfully!');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save about content');
    } finally {
      setSaving(false);
    }
  };

  const addValue = () => {
    setContent(prev => ({
      ...prev,
      values: [...prev.values, { icon: '', title: '', description: '' }]
    }));
  };

  const updateValue = (index: number, field: keyof AboutValue, value: string) => {
    setContent(prev => ({
      ...prev,
      values: prev.values.map((val, i) => 
        i === index ? { ...val, [field]: value } : val
      )
    }));
  };

  const deleteValue = (index: number) => {
    setContent(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">About Section</h1>
          <Button onClick={saveContent} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Main Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Badge Text</label>
              <Input
                value={content.badge}
                onChange={(e) => setContent(prev => ({ ...prev, badge: e.target.value }))}
                placeholder="25+ Years Creating Technological Experiences"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Title</label>
              <Textarea
                value={content.title}
                onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="About Govisan"
                rows={2}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={content.description}
                onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Main description"
                rows={4}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Quote</label>
              <Textarea
                value={content.quote}
                onChange={(e) => setContent(prev => ({ ...prev, quote: e.target.value }))}
                placeholder="Highlighted quote"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Company Values</h2>
            <Button onClick={addValue} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Value
            </Button>
          </div>

          {content.values.map((value, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Value {index + 1}</CardTitle>
                  <Button
                    onClick={() => deleteValue(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Icon Name</label>
                  <Input
                    value={value.icon}
                    onChange={(e) => updateValue(index, 'icon', e.target.value)}
                    placeholder="Sparkles, Trophy, Heart, etc."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use Lucide React icon names like: Sparkles, Trophy, Heart, Shield, etc.
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={value.title}
                    onChange={(e) => updateValue(index, 'title', e.target.value)}
                    placeholder="Value title"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={value.description}
                    onChange={(e) => updateValue(index, 'description', e.target.value)}
                    placeholder="Value description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutPage;