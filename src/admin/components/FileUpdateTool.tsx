import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, FileText, Github } from 'lucide-react';

interface FileUpdateToolProps {
  filePath: string;
  content: any;
  onClose: () => void;
}

export const FileUpdateTool: React.FC<FileUpdateToolProps> = ({ 
  filePath, 
  content, 
  onClose 
}) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(content, null, 2);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
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
                File Update Required
              </CardTitle>
              <CardDescription>
                Copy the content below and use Lovable's tools to update the file
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              <Github className="h-3 w-3 mr-1" />
              Auto-commit to GitHub
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
              <label className="text-sm font-medium">JSON Content:</label>
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

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Copy the JSON content above</li>
              <li>Use Lovable's file editor to open: <code className="bg-blue-100 px-1 rounded">{filePath}</code></li>
              <li>Replace the entire file content with the copied JSON</li>
              <li>Save the file - this will automatically create a commit in GitHub</li>
              <li>GitHub Actions will deploy the changes to production</li>
            </ol>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={copyToClipboard}>
              {copied ? 'Copied!' : 'Copy & Close'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};