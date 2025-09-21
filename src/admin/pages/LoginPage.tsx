import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cmsApi } from '@/lib/cms/api';
import { isAuthenticated } from '@/lib/cms/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      return;
    }
  }, []);

  if (isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attempts >= 5) {
      setError('Too many failed attempts. Please wait before trying again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await cmsApi.login(email, password);
      localStorage.setItem('cms-token', response.token);
      window.location.href = '/admin';
    } catch (err) {
      setAttempts(prev => prev + 1);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-govisan-navy to-govisan-blue-accent">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-govisan-gold mb-2">
            GOVISAN
          </div>
          <p className="text-white/80">Content Management System</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-govisan-navy">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the CMS
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300"
                />
                <Label htmlFor="remember" className="text-sm">
                  Keep me signed in
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-govisan-gold hover:bg-govisan-gold/90 text-white"
                disabled={isLoading || attempts >= 5}
              >
                {isLoading ? (
                  <>
                    <Lock className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>

              {attempts > 0 && (
                <p className="text-sm text-center text-muted-foreground">
                  Attempts: {attempts}/5
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;