import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Upload, 
  Download, 
  Settings, 
  Palette, 
  Globe, 
  Shield,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  const [settings, setSettings] = useState({
    // General settings
    siteName: 'GOVISAN Solutions',
    siteDescription: 'Technology solutions for luxury hospitality',
    contactEmail: 'info@govisan.com',
    contactPhone: '+34 91 123 45 67',
    address: 'Barcelona, Spain',
    
    // Design settings
    primaryColor: '#0A1A2F',
    secondaryColor: '#D4AF37',
    logoUrl: '/src/assets/logo.svg',
    faviconUrl: '/favicon.ico',
    
    // Social media
    linkedinUrl: 'https://linkedin.com/company/govisan',
    twitterUrl: 'https://twitter.com/govisan',
    facebookUrl: 'https://facebook.com/govisan',
    
    // Analytics
    googleAnalyticsId: '',
    hotjarId: '',
    
    // SEO
    defaultMetaTitle: 'GOVISAN Solutions - Technology for Luxury Hotels',
    defaultMetaDescription: 'Leading provider of technology solutions for luxury hospitality. Transform your hotel operations with our cutting-edge systems.',
    
    // Watermarks
    watermarks: {
      home: '/src/assets/watermarks/home.svg',
      solutions: '/src/assets/watermarks/solutions.svg',
      cases: '/src/assets/watermarks/cases.svg',
      about: '/src/assets/watermarks/about.svg',
      insights: '/src/assets/watermarks/insights.svg',
      contact: '/src/assets/watermarks/contact.svg'
    }
  });

  const handleInputChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleWatermarkChange = (section: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      watermarks: {
        ...prev.watermarks,
        [section]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would save to your API
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'govisan-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          toast({
            title: "Settings imported",
            description: "Settings have been imported successfully.",
          });
        } catch (error) {
          toast({
            title: "Import failed",
            description: "Invalid settings file format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-govisan-navy">Settings</h1>
          <p className="text-muted-foreground">
            Manage your website configuration and preferences
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <div>
            <Input
              type="file"
              accept=".json"
              onChange={importSettings}
              className="hidden"
              id="import-settings"
            />
            <Button variant="outline" onClick={() => document.getElementById('import-settings')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
          
          <Button onClick={handleSave} className="bg-govisan-gold hover:bg-govisan-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="watermarks">Watermarks</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic information about your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input
                    id="contact-phone"
                    value={settings.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={settings.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  value={settings.twitterUrl}
                  onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  value={settings.facebookUrl}
                  onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Brand Colors
              </CardTitle>
              <CardDescription>
                Customize your brand colors and visual identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color (Navy)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      placeholder="#0A1A2F"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color (Gold)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      placeholder="#D4AF37"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input
                    id="logo-url"
                    value={settings.logoUrl}
                    onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon-url">Favicon URL</Label>
                  <Input
                    id="favicon-url"
                    value={settings.faviconUrl}
                    onChange={(e) => handleInputChange('faviconUrl', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Defaults</CardTitle>
              <CardDescription>
                Default meta tags and SEO settings for all pages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-title">Default Meta Title</Label>
                <Input
                  id="default-title"
                  value={settings.defaultMetaTitle}
                  onChange={(e) => handleInputChange('defaultMetaTitle', e.target.value)}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {settings.defaultMetaTitle.length}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-description">Default Meta Description</Label>
                <Textarea
                  id="default-description"
                  value={settings.defaultMetaDescription}
                  onChange={(e) => handleInputChange('defaultMetaDescription', e.target.value)}
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {settings.defaultMetaDescription.length}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Tracking</CardTitle>
              <CardDescription>
                Connect your analytics and tracking services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-analytics">Google Analytics ID</Label>
                <Input
                  id="google-analytics"
                  placeholder="G-XXXXXXXXXX"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotjar">Hotjar ID</Label>
                <Input
                  id="hotjar"
                  placeholder="1234567"
                  value={settings.hotjarId}
                  onChange={(e) => handleInputChange('hotjarId', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watermarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Watermarks</CardTitle>
              <CardDescription>
                Configure background watermarks for each section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.watermarks).map(([section, url]) => (
                <div key={section} className="space-y-2">
                  <Label htmlFor={`watermark-${section}`}>
                    {section.charAt(0).toUpperCase() + section.slice(1)} Section
                  </Label>
                  <Input
                    id={`watermark-${section}`}
                    value={url}
                    onChange={(e) => handleWatermarkChange(section, e.target.value)}
                    placeholder={`/src/assets/watermarks/${section}.svg`}
                  />
                </div>
              ))}
              
              <Alert>
                <AlertDescription>
                  Watermarks are subtle background graphics that appear behind content. 
                  Use SVG format for best quality and performance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;