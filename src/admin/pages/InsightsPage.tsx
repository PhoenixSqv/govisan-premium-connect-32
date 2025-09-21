import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Save, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { DirectSaver } from '@/lib/cms/directSaver';

interface InsightPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string;
  image: string;
  published: boolean;
}

const InsightsPage = () => {
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [editingPost, setEditingPost] = useState<InsightPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      // Mock data for now
      const mockPosts: InsightPost[] = [
        {
          id: '1',
          title: 'The Future of Hotel Connectivity: WiFi 6E Implementation',
          excerpt: 'Exploring how WiFi 6E technology is revolutionizing guest experiences in luxury hospitality.',
          content: '# The Future of Hotel Connectivity\n\nWiFi 6E technology represents a significant leap forward...',
          author: 'GOVISAN Team',
          date: '2024-01-15',
          tags: 'technology, wifi, hospitality',
          image: '/src/assets/hero-background.jpg',
          published: true
        },
        {
          id: '2',
          title: 'Smart Room Integration: Beyond Traditional Automation',
          excerpt: 'How intelligent room systems are creating personalized experiences for hotel guests.',
          content: '# Smart Room Integration\n\nModern hotel guests expect more than just comfort...',
          author: 'GOVISAN Team',
          date: '2024-01-10',
          tags: 'smart-rooms, IoT, automation',
          image: '/src/assets/hero-background.jpg',
          published: true
        }
      ];
      setPosts(mockPosts);
    } catch (error) {
      toast.error('Failed to load insights');
    } finally {
      setLoading(false);
    }
  };

  const createNewPost = () => {
    const newPost: InsightPost = {
      id: Date.now().toString(),
      title: '',
      excerpt: '',
      content: '',
      author: 'GOVISAN Team',
      date: new Date().toISOString().split('T')[0],
      tags: '',
      image: '',
      published: false
    };
    setEditingPost(newPost);
  };

  const editPost = (post: InsightPost) => {
    setEditingPost({ ...post });
  };

  const savePost = async () => {
    if (!editingPost) return;
    
    setSaving(true);
    try {
      let updatedPosts;
      const existingIndex = posts.findIndex(p => p.id === editingPost.id);
      if (existingIndex >= 0) {
        updatedPosts = posts.map(p => p.id === editingPost.id ? editingPost : p);
      } else {
        updatedPosts = [...posts, editingPost];
      }
      
      setPosts(updatedPosts);
      
      // Save to files immediately
      await DirectSaver.saveFile('/content/insights/main.json', {
        title: "Latest Insights & Industry News",
        description: "Stay updated with the latest trends and insights in hospitality technology",
        posts: updatedPosts
      });
      
      setEditingPost(null);
      toast.success('Post saved successfully');
    } catch (error) {
      toast.error('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const updatedPosts = posts.filter(p => p.id !== id);
      setPosts(updatedPosts);
      
      // Save to files immediately
      await DirectSaver.saveFile('/content/insights/main.json', {
        title: "Latest Insights & Industry News",
        description: "Stay updated with the latest trends and insights in hospitality technology",
        posts: updatedPosts
      });
      
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post. Please try again.');
    }
  };

  const togglePublished = async (id: string) => {
    try {
      const updatedPosts = posts.map(p => 
        p.id === id ? { ...p, published: !p.published } : p
      );
      setPosts(updatedPosts);
      
      // Save to files immediately
      await DirectSaver.saveFile('/content/insights/main.json', {
        title: "Latest Insights & Industry News",
        description: "Stay updated with the latest trends and insights in hospitality technology",
        posts: updatedPosts
      });
      
      const post = updatedPosts.find(p => p.id === id);
      toast.success(`Post ${post?.published ? 'published' : 'unpublished'} successfully`);
    } catch (error) {
      toast.error('Failed to update post status. Please try again.');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (editingPost) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {editingPost.title ? `Edit: ${editingPost.title}` : 'New Post'}
          </h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => setEditingPost(null)} 
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={savePost} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Post'}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editingPost.title}
                onChange={(e) => setEditingPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                placeholder="Post title"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Excerpt</label>
              <Textarea
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost(prev => prev ? { ...prev, excerpt: e.target.value } : null)}
                placeholder="Brief description of the post"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Author</label>
                <Input
                  value={editingPost.author}
                  onChange={(e) => setEditingPost(prev => prev ? { ...prev, author: e.target.value } : null)}
                  placeholder="Author name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={editingPost.date}
                  onChange={(e) => setEditingPost(prev => prev ? { ...prev, date: e.target.value } : null)}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Tags</label>
              <Input
                value={editingPost.tags}
                onChange={(e) => setEditingPost(prev => prev ? { ...prev, tags: e.target.value } : null)}
                placeholder="technology, wifi, hospitality (comma separated)"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Featured Image URL</label>
              <Input
                value={editingPost.image}
                onChange={(e) => setEditingPost(prev => prev ? { ...prev, image: e.target.value } : null)}
                placeholder="/src/assets/image.jpg"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Content (Markdown supported)</label>
              <Textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                placeholder="Write your post content here... You can use Markdown formatting."
                rows={15}
                className="font-mono"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editingPost.published}
                onChange={(e) => setEditingPost(prev => prev ? { ...prev, published: e.target.checked } : null)}
                className="rounded"
              />
              <label className="text-sm font-medium">Published</label>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Insights & Blog</h1>
        <Button onClick={createNewPost}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{post.title || 'Untitled Post'}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-2">{post.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <span>by {post.author}</span>
                    {post.tags && <span>Tags: {post.tags}</span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    onClick={() => togglePublished(post.id)}
                    variant="outline"
                    size="sm"
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button
                    onClick={() => editPost(post)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => deletePost(post.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {posts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No posts yet. Create your first insight!</p>
            <Button onClick={createNewPost}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Post
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InsightsPage;