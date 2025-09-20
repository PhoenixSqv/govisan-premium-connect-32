import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, FileText, Github, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DirectFileSaverProps {
  filePath: string;
  content: any;
  onClose: () => void;
  onSave?: (filePath: string, content: string) => Promise<void>;
}

export const DirectFileSaver: React.FC<DirectFileSaverProps> = ({ 
  filePath, 
  content, 
  onClose,
  onSave 
}) => {
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(content, null, 2);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy content');
    }
  };

  const handleDirectSave = async () => {
    if (!onSave) {
      toast.error('Direct save not available');
      return;
    }

    setSaving(true);
    try {
      await onSave(filePath, jsonString);
      toast.success('Content saved successfully! GitHub commit created.');
      onClose();
    } catch (error) {
      console.error('Failed to save:', error);
      toast.error('Failed to save content: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Save Content to GitHub
              </CardTitle>
              <CardDescription>
                This will update the file and create a commit in your GitHub repository
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              <Github className="h-3 w-3 mr-1" />
              Auto-deploy to Production
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground mb-1">File Path:</div>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded">
              {filePath}
            </code>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Content Preview:</label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="text-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            
            <textarea
              readOnly
              value={jsonString}
              className="w-full h-64 p-3 border rounded-lg font-mono text-xs resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
              <Github className="h-4 w-4" />
              Automatic Deployment Process:
            </h4>
            <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
              <li>Content will be saved to: <code className="bg-green-100 px-1 rounded">{filePath}</code></li>
              <li>Automatic commit will be created in GitHub repository</li>
              <li>GitHub Actions will build and deploy to production</li>
              <li>Changes will be live at <code className="bg-green-100 px-1 rounded">https://www.govisan.com/</code></li>
            </ol>
          </div>

          {!onSave && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Manual Update Required</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Please copy the content above and update the file manually in the code editor.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            {onSave ? (
              <Button onClick={handleDirectSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Github className="h-4 w-4 mr-2" />
                    Save & Deploy
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={copyToClipboard}>
                {copied ? 'Copied!' : 'Copy Content'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};