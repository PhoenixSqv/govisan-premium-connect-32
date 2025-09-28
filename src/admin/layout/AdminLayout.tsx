import React, { useEffect, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
  ExternalLink, 
  Search,
  User,
  LogOut,
  Home,
  Building2,
  FolderOpen,
  Trophy,
  Lightbulb,
  Mail,
  Link as LinkIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getCurrentUser, logout, isAuthenticated } from '@/lib/cms/auth';
import type { AuthToken } from '@/lib/cms/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState<AuthToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-govisan-navy">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: location.pathname === '/admin'
    },
    {
      name: 'Home',
      href: '/admin/home',
      icon: Home,
      current: location.pathname.includes('/admin/home')
    },
    {
      name: 'Specialization',
      href: '/admin/specialization',
      icon: Settings,
      current: location.pathname.includes('/admin/specialization')
    },
    {
      name: 'Solutions',
      href: '/admin/solutions',
      icon: Lightbulb,
      current: location.pathname.includes('/admin/solutions')
    },
    {
      name: 'Case Studies',
      href: '/admin/cases',
      icon: Trophy,
      current: location.pathname.includes('/admin/cases')
    },
    {
      name: 'Success Stories',
      href: '/admin/success-stories',
      icon: Trophy,
      current: location.pathname.includes('/admin/success-stories')
    },
    {
      name: 'About',
      href: '/admin/about',
      icon: Building2,
      current: location.pathname.includes('/admin/about')
    },
    {
      name: 'Insights',
      href: '/admin/insights',
      icon: FolderOpen,
      current: location.pathname.includes('/admin/insights')
    },
    {
      name: 'Contact',
      href: '/admin/contact',
      icon: Mail,
      current: location.pathname.includes('/admin/contact')
    },
    {
      name: 'Media Library',
      href: '/admin/media',
      icon: Image,
      current: location.pathname.includes('/admin/media')
    },
    {
      name: 'Links Audit',
      href: '/admin/links-audit',
      icon: LinkIcon,
      current: location.pathname.includes('/admin/links-audit')
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: location.pathname.includes('/admin/settings')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="text-xl font-bold text-govisan-navy">
              GOVISAN CMS
            </div>
          </div>
          
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.current
                        ? 'bg-govisan-gold/10 text-govisan-gold border-r-2 border-govisan-gold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      item.current ? 'text-govisan-gold' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
          <div className="flex justify-between h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-0">
            <div className="flex items-center">
              <div className="flex-shrink-0 lg:hidden">
                <div className="text-xl font-bold text-govisan-navy">
                  GOVISAN CMS
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 pl-3" />
                  <Input
                    className="pl-10"
                    placeholder="Search content..."
                    type="search"
                  />
                </div>
              </div>

              {/* Preview button */}
              <Button variant="outline" size="sm" asChild>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview Site
                </a>
              </Button>

              {/* User menu */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{user?.email}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;