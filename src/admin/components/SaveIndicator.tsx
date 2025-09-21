import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, Clock, Check } from 'lucide-react';

interface SaveIndicatorProps {
  hasUnsavedChanges: boolean;
  isAutoSaving: boolean;
  lastSaved: Date | null;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({
  hasUnsavedChanges,
  isAutoSaving,
  lastSaved
}) => {
  if (isAutoSaving) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Loader2 className="h-3 w-3 animate-spin" />
        Guardando...
      </Badge>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        Cambios sin guardar
      </Badge>
    );
  }

  if (lastSaved) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Check className="h-3 w-3" />
        Guardado {formatTime(lastSaved)}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="flex items-center gap-1">
      <Save className="h-3 w-3" />
      Listo para guardar
    </Badge>
  );
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  
  if (diffMinutes < 1) return 'ahora';
  if (diffMinutes < 60) return `hace ${diffMinutes}m`;
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `hace ${diffHours}h`;
  
  return date.toLocaleDateString();
};