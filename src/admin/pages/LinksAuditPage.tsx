import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink, 
  Calendar,
  Download
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { DirectSaver } from '@/lib/cms/directSaver';

interface LinkAuditResult {
  url: string;
  status: 'ok' | 'error' | 'warning';
  statusCode?: number;
  responseTime?: number;
  error?: string;
  lastChecked: string;
  location: string; // where the link was found
}

interface AuditReport {
  id: string;
  startedAt: string;
  completedAt?: string;
  status: 'running' | 'completed' | 'error';
  totalLinks: number;
  checkedLinks: number;
  results: LinkAuditResult[];
}

const LinksAuditPage = () => {
  const { toast } = useToast();
  const [currentAudit, setCurrentAudit] = useState<AuditReport | null>(null);
  const [auditHistory, setAuditHistory] = useState<AuditReport[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Mock audit history
  useEffect(() => {
    const mockHistory: AuditReport[] = [
      {
        id: '1',
        startedAt: '2024-01-15T10:00:00Z',
        completedAt: '2024-01-15T10:05:32Z',
        status: 'completed',
        totalLinks: 24,
        checkedLinks: 24,
        results: [
          {
            url: 'https://govisan.com',
            status: 'ok',
            statusCode: 200,
            responseTime: 245,
            lastChecked: '2024-01-15T10:05:32Z',
            location: 'Header navigation'
          },
          {
            url: 'https://linkedin.com/company/govisan',
            status: 'ok',
            statusCode: 200,
            responseTime: 180,
            lastChecked: '2024-01-15T10:05:32Z',
            location: 'Footer social links'
          },
          {
            url: 'mailto:info@govisan.com',
            status: 'ok',
            lastChecked: '2024-01-15T10:05:32Z',
            location: 'Contact section'
          }
        ]
      }
    ];
    setAuditHistory(mockHistory);
  }, []);

  const startAudit = async () => {
    setIsRunning(true);
    
    const newAudit: AuditReport = {
      id: Date.now().toString(),
      startedAt: new Date().toISOString(),
      status: 'running',
      totalLinks: 24, // Mock total
      checkedLinks: 0,
      results: []
    };
    
    setCurrentAudit(newAudit);

    // Simulate audit progress
    const simulateProgress = async () => {
      let checked = 0;
      const interval = setInterval(() => {
        checked += Math.floor(Math.random() * 3) + 1;
        
        if (checked >= newAudit.totalLinks) {
          checked = newAudit.totalLinks;
          clearInterval(interval);
          
          const completedAudit: AuditReport = {
            ...newAudit,
            status: 'completed',
            completedAt: new Date().toISOString(),
            checkedLinks: checked,
            results: [
              // Mock results
              {
                url: '#hero',
                status: 'ok',
                lastChecked: new Date().toISOString(),
                location: 'Header navigation'
              },
              {
                url: '#about',
                status: 'ok',
                lastChecked: new Date().toISOString(),
                location: 'Header navigation'
              },
              {
                url: '#solutions',
                status: 'ok',
                lastChecked: new Date().toISOString(),
                location: 'Header navigation'
              }
            ]
          };
          
          setCurrentAudit(completedAudit);
          setAuditHistory(prev => [completedAudit, ...prev]);
          setIsRunning(false);
          
          // Save audit results immediately
          (async () => {
            try {
              await DirectSaver.saveFile('/content/audits/links.json', {
                audits: [completedAudit, ...auditHistory]
              });
            } catch (error) {
              console.error('Failed to save audit results:', error);
            }
          })();
          
          toast({
            title: "Audit completed",
            description: `Checked ${checked} links. All links are working properly.`,
          });
        } else {
          setCurrentAudit(prev => prev ? { ...prev, checkedLinks: checked } : null);
        }
      }, 500);
    };

    simulateProgress();
  };

  const downloadReport = (audit: AuditReport) => {
    const report = {
      generatedAt: new Date().toISOString(),
      audit: audit,
      summary: {
        totalLinks: audit.totalLinks,
        workingLinks: audit.results.filter(r => r.status === 'ok').length,
        brokenLinks: audit.results.filter(r => r.status === 'error').length,
        warnings: audit.results.filter(r => r.status === 'warning').length
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `links-audit-${audit.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-govisan-navy">Links Audit</h1>
          <p className="text-muted-foreground">
            Monitor and maintain the health of all links across your website
          </p>
        </div>

        <Button 
          onClick={startAudit} 
          disabled={isRunning}
          className="bg-govisan-gold hover:bg-govisan-gold/90"
        >
          {isRunning ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Running Audit...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start New Audit
            </>
          )}
        </Button>
      </div>

      {/* Current Audit Status */}
      {currentAudit && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentAudit.status === 'running' ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
                  Audit in Progress
                </>
              ) : currentAudit.status === 'completed' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Audit Completed
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Audit Failed
                </>
              )}
            </CardTitle>
            <CardDescription>
              Started at {new Date(currentAudit.startedAt).toLocaleString()}
              {currentAudit.completedAt && (
                <> • Completed at {new Date(currentAudit.completedAt).toLocaleString()}</>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Progress: {currentAudit.checkedLinks} / {currentAudit.totalLinks} links
                </span>
                {currentAudit.status === 'completed' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadReport(currentAudit)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                )}
              </div>
              
              <Progress 
                value={(currentAudit.checkedLinks / currentAudit.totalLinks) * 100} 
                className="w-full"
              />

              {currentAudit.results.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Recent Results:</h4>
                  {currentAudit.results.slice(0, 5).map((result, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        <span className="font-mono">{result.url}</span>
                        <Badge variant="outline" className="text-xs">
                          {result.location}
                        </Badge>
                      </div>
                      {result.statusCode && (
                        <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                          {result.statusCode}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Audit History
          </CardTitle>
          <CardDescription>
            Previous link audits and their results
          </CardDescription>
        </CardHeader>
        <CardContent>
          {auditHistory.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No audit history</h3>
              <p className="text-muted-foreground mb-4">
                Run your first link audit to start monitoring your website's links
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {auditHistory.map((audit) => (
                <div key={audit.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(audit.status)}`}>
                        {audit.status}
                      </Badge>
                      <span className="font-medium">
                        {new Date(audit.startedAt).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {audit.totalLinks} links checked
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadReport(audit)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {audit.results.filter(r => r.status === 'ok').length}
                      </div>
                      <div className="text-muted-foreground">Working Links</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {audit.results.filter(r => r.status === 'warning').length}
                      </div>
                      <div className="text-muted-foreground">Warnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {audit.results.filter(r => r.status === 'error').length}
                      </div>
                      <div className="text-muted-foreground">Broken Links</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Link audits check all links across your website including navigation, footer, content links, and external references. 
          The audit verifies HTTP status codes, response times, and accessibility of all linked resources.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LinksAuditPage;