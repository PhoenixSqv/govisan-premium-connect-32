import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Image, 
  Users, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Activity,
  ExternalLink
} from 'lucide-react';
import { cmsApi } from '@/lib/cms/api';

interface DashboardStats {
  totalContent: number;
  draftContent: number;
  mediaFiles: number;
  brokenLinks: number;
  lastUpdated: string;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContent: 0,
    draftContent: 0,
    mediaFiles: 0,
    brokenLinks: 0,
    lastUpdated: new Date().toISOString()
  });
  
  const [recentActivity] = useState([
    { type: 'content', action: 'Updated', item: 'Home Page', time: '2 hours ago' },
    { type: 'media', action: 'Uploaded', item: 'hero-image.jpg', time: '5 hours ago' },
    { type: 'content', action: 'Created', item: 'New Solution: AI Analytics', time: '1 day ago' },
    { type: 'audit', action: 'Link Audit', item: 'Completed successfully', time: '2 days ago' }
  ]);

  useEffect(() => {
    // Load dashboard stats
    const loadStats = async () => {
      try {
        // Mock data for now - replace with actual API calls
        setStats({
          totalContent: 24,
          draftContent: 3,
          mediaFiles: 156,
          brokenLinks: 0,
          lastUpdated: new Date().toISOString()
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Total Content',
      value: stats.totalContent,
      description: 'Published pages and posts',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Draft Content',
      value: stats.draftContent,
      description: 'Unpublished drafts',
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      title: 'Media Files',
      value: stats.mediaFiles,
      description: 'Images and documents',
      icon: Image,
      color: 'text-green-600'
    },
    {
      title: 'Broken Links',
      value: stats.brokenLinks,
      description: 'Links requiring attention',
      icon: AlertTriangle,
      color: stats.brokenLinks > 0 ? 'text-red-600' : 'text-green-600'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'content': return FileText;
      case 'media': return Image;
      case 'audit': return Activity;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'content': return 'bg-blue-100 text-blue-800';
      case 'media': return 'bg-green-100 text-green-800';
      case 'audit': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-govisan-navy">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your content management system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/admin/content/home">
                <FileText className="mr-2 h-4 w-4" />
                Edit Home Page
              </a>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/admin/content/insights/new">
                <FileText className="mr-2 h-4 w-4" />
                New Blog Post
              </a>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/admin/media">
                <Image className="mr-2 h-4 w-4" />
                Upload Media
              </a>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/admin/links">
                <Activity className="mr-2 h-4 w-4" />
                Run Link Audit
              </a>
            </Button>

            <Button className="w-full justify-start" variant="outline" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Preview Live Site
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest changes to your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action} {activity.item}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current system health and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="mr-1 h-3 w-3" />
                CMS Online
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <TrendingUp className="mr-1 h-3 w-3" />
                Performance Good
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Users className="mr-1 h-3 w-3" />
                1 User Online
              </Badge>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: {new Date(stats.lastUpdated).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;