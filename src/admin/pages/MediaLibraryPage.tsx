import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  Grid, 
  List, 
  Trash2, 
  Copy, 
  Eye,
  Download,
  Filter
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { DirectSaver } from '@/lib/cms/directSaver';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
  alt?: string;
  caption?: string;
}

const MediaLibraryPage = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Mock data - replace with actual API
  const [mediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hero-background.jpg',
      url: '/src/assets/hero-background.jpg',
      type: 'image/jpeg',
      size: 2048576,
      createdAt: '2024-01-15T10:30:00Z',
      alt: 'Hero background image',
      caption: 'Main hero section background'
    },
    {
      id: '2',
      name: 'maldives-project.jpg',
      url: '/src/assets/maldives-project.jpg',
      type: 'image/jpeg',
      size: 1536000,
      createdAt: '2024-01-14T15:45:00Z',
      alt: 'Maldives resort project',
      caption: 'Luxury resort in Maldives'
    },
    // Add more mock files as needed
  ]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, []);

  const handleFileUpload = async (files: File[]) => {
    // Validate and process files
    for (const file of files) {
      if (file.size > 15 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 15MB limit`,
          variant: "destructive",
        });
        continue;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Unsupported file type",
          description: `${file.name} type is not supported`,
          variant: "destructive",
        });
        continue;
      }

      try {
        // Save file information immediately
        const newFile: MediaFile = {
          id: Date.now().toString(),
          name: file.name,
          url: `/uploads/${file.name}`,
          type: file.type,
          size: file.size,
          createdAt: new Date().toISOString(),
          alt: file.name.replace(/\.[^/.]+$/, ""),
          caption: ""
        };

        // Save to media library
        await DirectSaver.saveMediaContent({
          files: [...mediaFiles, newFile]
        });

        toast({
          title: "Upload successful",
          description: `${file.name} has been uploaded and saved`,
        });
      } catch (error) {
        toast({
          title: "Upload failed",
          description: `Failed to save ${file.name}`,
          variant: "destructive",
        });
      }
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied to clipboard",
      description: "File URL copied successfully",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return '🖼️';
    }
    if (type === 'application/pdf') {
      return '📄';
    }
    return '📁';
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || 
      (typeFilter === 'images' && file.type.startsWith('image/')) ||
      (typeFilter === 'documents' && file.type === 'application/pdf');
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-govisan-navy">Media Library</h1>
          <p className="text-muted-foreground">
            Manage your images, documents and other media files
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-govisan-gold hover:bg-govisan-gold/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Media Files</DialogTitle>
                <DialogDescription>
                  Drag and drop files or click to select. Max size: 15MB per file.
                </DialogDescription>
              </DialogHeader>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? 'border-govisan-gold bg-govisan-gold/5' : 'border-gray-300'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here</p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse your computer
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileUpload(Array.from(e.target.files));
                    }
                  }}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Supported: JPG, PNG, WebP, SVG, PDF (max 15MB each)
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Files</SelectItem>
            <SelectItem value="images">Images</SelectItem>
            <SelectItem value="documents">Documents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* File Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' 
          : 'space-y-2'
      }>
        {filteredFiles.map((file) => (
          <Card key={file.id} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              {viewMode === 'grid' ? (
                <div className="space-y-3">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {file.type.startsWith('image/') ? (
                      <img 
                        src={file.url} 
                        alt={file.alt || file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(file.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      {file.type.startsWith('image/') ? (
                        <img 
                          src={file.url} 
                          alt={file.alt || file.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-lg">{getFileIcon(file.type)}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <Badge variant="outline" className="text-xs">
                          {file.type.split('/')[1]?.toUpperCase()}
                        </Badge>
                        <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(file.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-lg font-semibold mb-2">No files found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || typeFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Upload your first media file to get started'
            }
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-govisan-gold hover:bg-govisan-gold/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default MediaLibraryPage;