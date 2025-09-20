import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { DirectFileSaver } from '../components/DirectFileSaver';
import { GitHubWriter } from '@/lib/cms/githubWriter';

interface CaseStat {
  number: string;
  label: string;
}

interface CaseStory {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: CaseStat[];
  technologies: string[];
  client: string;
}

interface CasesContent {
  title: string;
  description: string;
  cases: CaseStory[];
}

const CasesPage = () => {
  const [content, setContent] = useState<CasesContent>({
    title: '',
    description: '',
    cases: []
  });
  const [showFileUpdate, setShowFileUpdate] = useState(false);
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
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to load cases content:', error);
      toast.error('Failed to load cases content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      // Try direct save first
      await GitHubWriter.saveCasesContent(content);
      toast.success('Content saved successfully! Changes committed to GitHub.');
    } catch (error) {
      console.error('Direct save failed:', error);
      // Fallback to file update tool
      setShowFileUpdate(true);
      toast.error('Direct save failed. Please use the manual update tool.');
    } finally {
      setSaving(false);
    }
  };

  const updateContentFile = async (filePath: string, content: string) => {
    try {
      await GitHubWriter.writeFile(filePath, content);
      console.log('✅ Cases content updated successfully via GitHub');
      setShowFileUpdate(false);
    } catch (error) {
      console.error('❌ Failed to update cases content:', error);
      throw error;
    }
  };

  const addStory = () => {
    const newStory: CaseStory = {
      title: '',
      subtitle: '',
      description: '',
      image: '',
      stats: [{ number: '', label: '' }],
      technologies: [''],
      client: ''
    };
    setContent(prev => ({
      ...prev,
      cases: [...prev.cases, newStory]
    }));
  };

  const updateStory = (index: number, field: keyof CaseStory, value: any) => {
    setContent(prev => ({
      ...prev,
      cases: prev.cases.map((story, i) => 
        i === index ? { ...story, [field]: value } : story
      )
    }));
  };

  const deleteStory = (index: number) => {
    setContent(prev => ({
      ...prev,
      cases: prev.cases.filter((_, i) => i !== index)
    }));
  };

  const addStat = (storyIndex: number) => {
    setContent(prev => ({
      ...prev,
      cases: prev.cases.map((story, i) => 
        i === storyIndex 
          ? { ...story, stats: [...story.stats, { number: '', label: '' }] }
          : story
      )
    }));
  };

  const updateStat = (storyIndex: number, statIndex: number, field: keyof CaseStat, value: string) => {
    setContent(prev => ({
      ...prev,
      cases: prev.cases.map((story, i) => 
        i === storyIndex 
          ? { 
              ...story, 
              stats: story.stats.map((stat, j) => 
                j === statIndex ? { ...stat, [field]: value } : stat
              )
            }
          : story
      )
    }));
  };

  const removeStat = (storyIndex: number, statIndex: number) => {
    setContent(prev => ({
      ...prev,
      cases: prev.cases.map((story, i) => 
        i === storyIndex 
          ? { 
              ...story, 
              stats: story.stats.filter((_, j) => j !== statIndex)
            }
          : story
      )
    }));
  };

  const addTechnology = (storyIndex: number) => {
    setContent(prev => ({
      ...prev,
      cases: prev.cases.map((story, i) => 
        i === storyIndex 
          ? { ...story, technologies: [...story.technologies, ''] }
          : story
      )
    }));
  };

  const updateTechnology = (storyIndex: number, techIndex: number, value: string) => {
    setContent(prev => ({
      ...prev,
      cases: prev.cases.map((story, i) => 
        i === storyIndex 
          ? { 
              ...story, 
              technologies: story.technologies.map((tech, j) => 
                j === techIndex ? value : tech
              )
            }
          : story
      )
    }));
  };

  const removeTechnology = (storyIndex: number, techIndex: number) => {
    setContent(prev => ({
      ...prev,
      cases: prev.cases.map((story, i) => 
        i === storyIndex 
          ? { 
              ...story, 
              technologies: story.technologies.filter((_, j) => j !== techIndex)
            }
          : story
      )
    }));
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
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
            <label className="text-sm font-medium">Title</label>
            <Input
              value={content.title}
              onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Success Stories from World-Class Hotels"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={content.description}
              onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Discover how we've transformed luxury hospitality experiences..."
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

        {content.cases.map((story, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Case {index + 1}</CardTitle>
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
                    placeholder="Luxury Resort Maldives"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Subtitle</label>
                  <Input
                    value={story.subtitle}
                    onChange={(e) => updateStory(index, 'subtitle', e.target.value)}
                    placeholder="Complete Technology Infrastructure"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Client</label>
                <Input
                  value={story.client}
                  onChange={(e) => updateStory(index, 'client', e.target.value)}
                  placeholder="Confidential 5-Star Resort Chain"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={story.image}
                  onChange={(e) => updateStory(index, 'image', e.target.value)}
                  placeholder="/src/assets/maldives-project.jpg"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={story.description}
                  onChange={(e) => updateStory(index, 'description', e.target.value)}
                  placeholder="Full telecommunications and AV systems implementation..."
                  rows={3}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Statistics</label>
                  <Button
                    onClick={() => addStat(index)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Stat
                  </Button>
                </div>
                <div className="space-y-2">
                  {story.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex gap-2">
                      <Input
                        value={stat.number}
                        onChange={(e) => updateStat(index, statIndex, 'number', e.target.value)}
                        placeholder="150"
                        className="w-24"
                      />
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(index, statIndex, 'label', e.target.value)}
                        placeholder="Villas Connected"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeStat(index, statIndex)}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Technologies</label>
                  <Button
                    onClick={() => addTechnology(index)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Technology
                  </Button>
                </div>
                <div className="space-y-2">
                  {story.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-2">
                      <Input
                        value={tech}
                        onChange={(e) => updateTechnology(index, techIndex, e.target.value)}
                        placeholder="Fiber Optics"
                      />
                      <Button
                        onClick={() => removeTechnology(index, techIndex)}
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

      {showFileUpdate && (
        <DirectFileSaver
          filePath="public/content/cases/main.json"
          content={content}
          onClose={() => setShowFileUpdate(false)}
          onSave={updateContentFile}
        />
      )}
    </>
  );
};

export default CasesPage;