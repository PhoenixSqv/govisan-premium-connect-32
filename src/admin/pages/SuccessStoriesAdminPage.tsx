import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Trash2, Save, Eye } from 'lucide-react';

interface Client {
  id: string;
  clientName: string;
  logo?: string;
  projectTitle: string;
  location: string;
  description: string;
  gallery: string[];
  stats: Array<{ label: string; value: string }>;
  technologies: string[];
}

interface SuccessStoriesContent {
  title: string;
  subtitle: string;
  clients: Client[];
}

const SuccessStoriesAdminPage = () => {
  const [content, setContent] = useState<SuccessStoriesContent>({
    title: '',
    subtitle: '',
    clients: []
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/content/success-stories/main.json');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error loading success stories content:', error);
      toast.error('Error loading content');
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Success Stories content ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
    } catch (error) {
      toast.error('Error saving content');
    } finally {
      setIsLoading(false);
    }
  };

  const addClient = () => {
    const newClient: Client = {
      id: `client-${Date.now()}`,
      clientName: '',
      logo: '',
      projectTitle: '',
      location: '',
      description: '',
      gallery: [''],
      stats: [{ label: '', value: '' }],
      technologies: ['']
    };
    setContent(prev => ({
      ...prev,
      clients: [...prev.clients, newClient]
    }));
  };

  const removeClient = (clientId: string) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.filter(client => client.id !== clientId)
    }));
  };

  const updateClient = (clientId: string, field: keyof Client, value: any) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === clientId ? { ...client, [field]: value } : client
      )
    }));
  };

  const addGalleryImage = (clientId: string) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === clientId
          ? { ...client, gallery: [...client.gallery, ''] }
          : client
      )
    }));
  };

  const removeGalleryImage = (clientId: string, index: number) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === clientId
          ? { ...client, gallery: client.gallery.filter((_, i) => i !== index) }
          : client
      )
    }));
  };

  const addStat = (clientId: string) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === clientId
          ? { ...client, stats: [...client.stats, { label: '', value: '' }] }
          : client
      )
    }));
  };

  const removeStat = (clientId: string, index: number) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === clientId
          ? { ...client, stats: client.stats.filter((_, i) => i !== index) }
          : client
      )
    }));
  };

  const addTechnology = (clientId: string) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === clientId
          ? { ...client, technologies: [...client.technologies, ''] }
          : client
      )
    }));
  };

  const removeTechnology = (clientId: string, index: number) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === clientId
          ? { ...client, technologies: client.technologies.filter((_, i) => i !== index) }
          : client
      )
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Success Stories Management</h1>
          <p className="text-muted-foreground">Manage your client success stories and case studies</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.open('/success-stories', '_blank')}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Page Header Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Page Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="page-title">Page Title</Label>
            <Input
              id="page-title"
              value={content.title}
              onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Success Stories"
            />
          </div>
          <div>
            <Label htmlFor="page-subtitle">Page Subtitle</Label>
            <Textarea
              id="page-subtitle"
              value={content.subtitle}
              onChange={(e) => setContent(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Partnering with Iconic Global Hospitality Brands"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Client Success Stories</CardTitle>
            <Button onClick={addClient}>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.clients.map((client, clientIndex) => (
            <Card key={client.id} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Client {clientIndex + 1}</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeClient(client.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Client Name</Label>
                  <Input
                    value={client.clientName}
                    onChange={(e) => updateClient(client.id, 'clientName', e.target.value)}
                    placeholder="Mandarin Oriental"
                  />
                </div>
                <div>
                  <Label>Client ID (URL slug)</Label>
                  <Input
                    value={client.id}
                    onChange={(e) => updateClient(client.id, 'id', e.target.value)}
                    placeholder="mandarin-oriental"
                  />
                </div>
                <div>
                  <Label>Logo URL</Label>
                  <Input
                    value={client.logo || ''}
                    onChange={(e) => updateClient(client.id, 'logo', e.target.value)}
                    placeholder="/images/clients/mandarin-oriental.png"
                  />
                </div>
                <div>
                  <Label>Project Title</Label>
                  <Input
                    value={client.projectTitle}
                    onChange={(e) => updateClient(client.id, 'projectTitle', e.target.value)}
                    placeholder="Seamless Smart Integration"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={client.location}
                    onChange={(e) => updateClient(client.id, 'location', e.target.value)}
                    placeholder="Maldives"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label>Description</Label>
                <Textarea
                  value={client.description}
                  onChange={(e) => updateClient(client.id, 'description', e.target.value)}
                  placeholder="Project description..."
                  rows={3}
                />
              </div>

              {/* Gallery */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Label>Gallery Images</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addGalleryImage(client.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Image
                  </Button>
                </div>
                <div className="space-y-2">
                  {client.gallery.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={image}
                        onChange={(e) => {
                          const newGallery = [...client.gallery];
                          newGallery[index] = e.target.value;
                          updateClient(client.id, 'gallery', newGallery);
                        }}
                        placeholder={`/images/cases/${client.id}-${index + 1}.jpg`}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeGalleryImage(client.id, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Label>Project Stats</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addStat(client.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Stat
                  </Button>
                </div>
                <div className="space-y-2">
                  {client.stats.map((stat, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...client.stats];
                          newStats[index] = { ...newStats[index], label: e.target.value };
                          updateClient(client.id, 'stats', newStats);
                        }}
                        placeholder="Network Uptime"
                      />
                      <Input
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...client.stats];
                          newStats[index] = { ...newStats[index], value: e.target.value };
                          updateClient(client.id, 'stats', newStats);
                        }}
                        placeholder="99.9%"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeStat(client.id, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Technologies Used</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addTechnology(client.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Technology
                  </Button>
                </div>
                <div className="space-y-2">
                  {client.technologies.map((tech, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={tech}
                        onChange={(e) => {
                          const newTechnologies = [...client.technologies];
                          newTechnologies[index] = e.target.value;
                          updateClient(client.id, 'technologies', newTechnologies);
                        }}
                        placeholder="WiFi 6E"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeTechnology(client.id, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Save Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => handleSave('draft')}
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSave('published')}
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessStoriesAdminPage;