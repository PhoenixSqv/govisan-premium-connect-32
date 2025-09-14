import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface CaseStory {
  id: number;
  title: string;
  location: string;
  guests: string;
  rating: string;
  image: string;
  description: string;
  achievements: string[];
}

interface CasesContent {
  badge: string;
  title: string;
  description: string;
  stories: CaseStory[];
}

const CasesPage = () => {
  const [content, setContent] = useState<CasesContent>({
    badge: '',
    title: '',
    description: '',
    stories: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/content/cases/main.json');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      toast.error('Failed to load cases content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      // In a real implementation, this would call an API endpoint
      console.log('Saving cases content:', content);
      toast.success('Cases content saved successfully');
    } catch (error) {
      toast.error('Failed to save cases content');
    } finally {
      setSaving(false);
    }
  };

  const addStory = () => {
    const newStory: CaseStory = {
      id: Date.now(),
      title: '',
      location: '',
      guests: '',
      rating: '',
      image: '',
      description: '',
      achievements: ['']
    };
    setContent(prev => ({
      ...prev,
      stories: [...prev.stories, newStory]
    }));
  };

  const updateStory = (index: number, field: keyof CaseStory, value: any) => {
    setContent(prev => ({
      ...prev,
      stories: prev.stories.map((story, i) => 
        i === index ? { ...story, [field]: value } : story
      )
    }));
  };

  const deleteStory = (index: number) => {
    setContent(prev => ({
      ...prev,
      stories: prev.stories.filter((_, i) => i !== index)
    }));
  };

  const addAchievement = (storyIndex: number) => {
    setContent(prev => ({
      ...prev,
      stories: prev.stories.map((story, i) => 
        i === storyIndex 
          ? { ...story, achievements: [...story.achievements, ''] }
          : story
      )
    }));
  };

  const updateAchievement = (storyIndex: number, achievementIndex: number, value: string) => {
    setContent(prev => ({
      ...prev,
      stories: prev.stories.map((story, i) => 
        i === storyIndex 
          ? { 
              ...story, 
              achievements: story.achievements.map((achievement, j) => 
                j === achievementIndex ? value : achievement
              )
            }
          : story
      )
    }));
  };

  const removeAchievement = (storyIndex: number, achievementIndex: number) => {
    setContent(prev => ({
      ...prev,
      stories: prev.stories.map((story, i) => 
        i === storyIndex 
          ? { 
              ...story, 
              achievements: story.achievements.filter((_, j) => j !== achievementIndex)
            }
          : story
      )
    }));
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <Button onClick={saveContent} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Header Content */}
      <Card>
        <CardHeader>
          <CardTitle>Section Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Badge Text</label>
            <Input
              value={content.badge}
              onChange={(e) => setContent(prev => ({ ...prev, badge: e.target.value }))}
              placeholder="Case Studies"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={content.title}
              onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Section title"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={content.description}
              onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Section description"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Case Stories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Case Stories</h2>
          <Button onClick={addStory} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Story
          </Button>
        </div>

        {content.stories.map((story, index) => (
          <Card key={story.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Story {index + 1}</CardTitle>
                <Button
                  onClick={() => deleteStory(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={story.title}
                    onChange={(e) => updateStory(index, 'title', e.target.value)}
                    placeholder="Case study title"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={story.location}
                    onChange={(e) => updateStory(index, 'location', e.target.value)}
                    placeholder="Location"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Guests</label>
                  <Input
                    value={story.guests}
                    onChange={(e) => updateStory(index, 'guests', e.target.value)}
                    placeholder="Number of guests"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Rating</label>
                  <Input
                    value={story.rating}
                    onChange={(e) => updateStory(index, 'rating', e.target.value)}
                    placeholder="4.9"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={story.image}
                  onChange={(e) => updateStory(index, 'image', e.target.value)}
                  placeholder="/src/assets/image.jpg"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={story.description}
                  onChange={(e) => updateStory(index, 'description', e.target.value)}
                  placeholder="Story description"
                  rows={3}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Achievements</label>
                  <Button
                    onClick={() => addAchievement(index)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {story.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex gap-2">
                      <Input
                        value={achievement}
                        onChange={(e) => updateAchievement(index, achievementIndex, e.target.value)}
                        placeholder="Achievement description"
                      />
                      <Button
                        onClick={() => removeAchievement(index, achievementIndex)}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CasesPage;