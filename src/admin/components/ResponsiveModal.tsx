import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Save, Loader2, X, AlertCircle } from 'lucide-react';
import { DirectSaver } from '@/lib/cms/directSaver';

interface ResponsiveModalProps {
  title: string;
  content: any;
  filePath: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({ 
  title, 
  content, 
  filePath, 
  onClose,
  onSuccess 
}) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    try {
      let result;
      
      // Route to appropriate saver based on file path
      if (filePath.includes('hero.json')) {
        result = await DirectSaver.saveHomeContent(content);
      } else if (filePath.includes('about')) {
        result = await DirectSaver.saveAboutContent(content);
      } else if (filePath.includes('contact')) {
        result = await DirectSaver.saveContactContent(content);
      } else if (filePath.includes('solutions')) {
        result = await DirectSaver.saveSolutionsContent(content);
      } else if (filePath.includes('cases')) {
        result = await DirectSaver.saveCasesContent(content);
      } else {
        result = await DirectSaver.saveFile(filePath, content);
      }

      if (result.success) {
        setSaved(true);
        onSuccess?.();
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(`Error inesperado: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-4">
      <Card className="w-full max-w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        <CardHeader className="flex-shrink-0 pb-3">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Save className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">{title}</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Guardado directo en el servidor web
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant="secondary" className="text-xs hidden sm:flex">
                Local Save
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
                disabled={saving}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-xs font-medium text-muted-foreground mb-1">Archivo:</div>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded break-all">
              {filePath}
            </code>
          </div>

          {/* Success State */}
          {saved && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Check className="h-5 w-5" />
                <span className="font-medium">¡Guardado exitosamente!</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                Los cambios están activos inmediatamente en el sitio web.
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Error al guardar</span>
              </div>
              <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                {error}
              </p>
            </div>
          )}

          {/* Content Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Vista previa del contenido:</label>
            <div className="relative">
              <textarea
                readOnly
                value={JSON.stringify(content, null, 2)}
                className="w-full h-48 sm:h-64 p-3 border rounded-lg font-mono text-xs resize-none bg-muted/30"
              />
            </div>
          </div>
        </CardContent>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-4 border-t bg-background/80 backdrop-blur-sm">
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={onClose} 
              disabled={saving}
              className="min-w-[80px]"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={saving || saved}
              className="min-w-[120px]"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : saved ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Guardado
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};