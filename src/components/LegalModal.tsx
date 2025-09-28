import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'cookies' | 'compliance' | null;
}

const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const modalTitles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service', 
    cookies: 'Cookie Policy',
    compliance: 'Compliance Policy'
  };

  const fileMap = {
    privacy: '/content/legal/privacy-policy.md',
    terms: '/content/legal/terms-of-service.md',
    cookies: '/content/legal/cookie-policy.md',
    compliance: '/content/legal/compliance-policy.md'
  };

  useEffect(() => {
    if (isOpen && type) {
      setLoading(true);
      fetch(fileMap[type])
        .then(response => response.text())
        .then(text => {
          // Convert markdown to simple HTML for display
          const htmlContent = text
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-primary mb-4">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-primary mb-3 mt-6">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium text-primary mb-2 mt-4">$1</h3>')
            .replace(/^\*\*(.*)\*\*$/gim, '<strong class="font-semibold">$1</strong>')
            .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/^(.*)$/gim, '<p class="mb-4">$1</p>')
            .replace(/<p class="mb-4"><h/g, '<h')
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
            .replace(/<p class="mb-4"><li/g, '<li')
            .replace(/<\/li><\/p>/g, '</li>');
          
          setContent(htmlContent);
        })
        .catch(error => {
          console.error('Error loading legal content:', error);
          setContent('<p class="text-red-600">Error loading content. Please try again.</p>');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, type]);

  if (!type) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden p-0 bg-white">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-primary">
              {modalTitles[type]}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(80vh-100px)] p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div 
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalModal;