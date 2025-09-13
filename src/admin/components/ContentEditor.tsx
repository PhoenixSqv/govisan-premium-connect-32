import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Eye, 
  Calendar, 
  Image as ImageIcon, 
  Bold, 
  Italic, 
  Link, 
  List,
  Heading1,
  Heading2,
  Quote
} from 'lucide-react';
import { marked } from 'marked';

interface ContentEditorProps {
  type: string;
  initialData?: any;
  onSave: (data: any) => void;
  onPreview?: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
  type, 
  initialData, 
  onSave, 
  onPreview 
}) => {
  const [formData, setFormData] = useState(initialData || {});
  const [activeTab, setActiveTab] = useState('content');
  const [isMarkdown, setIsMarkdown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (status: 'draft' | 'published' | 'scheduled') => {
    const saveData = {
      ...formData,
      status,
      updatedAt: new Date().toISOString(),
      type
    };
    onSave(saveData);
  };

  const insertMarkdown = (before: string, after: string = '') => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    const newText = `${before}${selectedText}${after}`;
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    
    const updatedValue = `${beforeText}${newText}${afterText}`;
    handleInputChange('content', updatedValue);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const toolbarButtons = [
    { icon: Heading1, action: () => insertMarkdown('# '), label: 'Heading 1' },
    { icon: Heading2, action: () => insertMarkdown('## '), label: 'Heading 2' },
    { icon: Bold, action: () => insertMarkdown('**', '**'), label: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('_', '_'), label: 'Italic' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), label: 'Link' },
    { icon: List, action: () => insertMarkdown('- '), label: 'List' },
    { icon: Quote, action: () => insertMarkdown('> '), label: 'Quote' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-govisan-navy capitalize">
            {formData.title || `New ${type}`}
          </h1>
          <p className="text-muted-foreground">
            {formData.status && (
              <Badge variant={formData.status === 'published' ? 'default' : 'secondary'}>
                {formData.status}
              </Badge>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {onPreview && (
            <Button variant="outline" onClick={onPreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          )}
          
          <Button variant="outline" onClick={() => handleSave('draft')}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          
          <Button onClick={() => handleSave('published')} className="bg-govisan-gold hover:bg-govisan-gold/90">
            Publish
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>
                Edit the main content for this {type}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder={`Enter ${type} title...`}
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              {type === 'insights' && (
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description or excerpt..."
                    value={formData.excerpt || ''}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Content</Label>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="markdown-mode" className="text-sm">Markdown</Label>
                    <Switch
                      id="markdown-mode"
                      checked={isMarkdown}
                      onCheckedChange={setIsMarkdown}
                    />
                  </div>
                </div>

                {isMarkdown && (
                  <div className="flex items-center space-x-1 p-2 bg-gray-50 rounded-md border">
                    {toolbarButtons.map((button) => {
                      const Icon = button.icon;
                      return (
                        <Button
                          key={button.label}
                          variant="ghost"
                          size="sm"
                          onClick={button.action}
                          title={button.label}
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      );
                    })}
                  </div>
                )}

                <Textarea
                  ref={textareaRef}
                  id="content"
                  placeholder={`Enter ${type} content...`}
                  value={formData.content || ''}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={15}
                  className="font-mono"
                />

                {isMarkdown && formData.content && (
                  <div className="mt-4">
                    <Label>Preview</Label>
                    <div 
                      className="mt-2 p-4 border rounded-md prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: marked(formData.content) 
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-image">Featured Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="featured-image"
                    placeholder="/uploads/image.jpg"
                    value={formData.featuredImage || ''}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                  />
                  <Button variant="outline" size="sm">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize this content for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  placeholder="SEO optimized title (max 60 chars)"
                  value={formData.seo?.title || ''}
                  onChange={(e) => handleInputChange('seo', { ...formData.seo, title: e.target.value })}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {(formData.seo?.title || '').length}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  placeholder="SEO optimized description (max 160 chars)"
                  value={formData.seo?.description || ''}
                  onChange={(e) => handleInputChange('seo', { ...formData.seo, description: e.target.value })}
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {(formData.seo?.description || '').length}/160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">/{type}/</span>
                  <Input
                    id="slug"
                    placeholder="url-friendly-slug"
                    value={formData.slug || ''}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Index Status</Label>
                  <Select
                    value={formData.seo?.index || 'index'}
                    onValueChange={(value) => handleInputChange('seo', { ...formData.seo, index: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="index">Index</SelectItem>
                      <SelectItem value="noindex">No Index</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Follow Status</Label>
                  <Select
                    value={formData.seo?.follow || 'follow'}
                    onValueChange={(value) => handleInputChange('seo', { ...formData.seo, follow: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="follow">Follow</SelectItem>
                      <SelectItem value="nofollow">No Follow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
              <CardDescription>
                Control when and how this content is published
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status || 'draft'}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === 'scheduled' && (
                <div className="space-y-2">
                  <Label htmlFor="publish-date">Publish Date</Label>
                  <Input
                    id="publish-date"
                    type="datetime-local"
                    value={formData.publishDate || ''}
                    onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  placeholder="Content author"
                  value={formData.author || ''}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                />
              </div>

              {type === 'insights' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category || ''}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="innovation">Innovation</SelectItem>
                        <SelectItem value="case-study">Case Study</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="tag1, tag2, tag3"
                      value={formData.tags || ''}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate tags with commas
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentEditor;