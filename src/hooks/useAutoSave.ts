import { useEffect, useRef, useState } from 'react';
import { DirectSaver } from '@/lib/cms/directSaver';

interface UseAutoSaveProps {
  data: any;
  filePath: string;
  enabled?: boolean;
  interval?: number; // milliseconds
}

export const useAutoSave = ({ 
  data, 
  filePath, 
  enabled = true, 
  interval = 30000 // 30 seconds
}: UseAutoSaveProps) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const previousDataRef = useRef<string>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Track changes
  useEffect(() => {
    const currentDataString = JSON.stringify(data);
    
    if (previousDataRef.current && previousDataRef.current !== currentDataString) {
      setHasUnsavedChanges(true);
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new auto-save timeout
      if (enabled) {
        timeoutRef.current = setTimeout(() => {
          handleAutoSave();
        }, interval);
      }
    }
    
    previousDataRef.current = currentDataString;
  }, [data, enabled, interval]);

  const handleAutoSave = async () => {
    if (!hasUnsavedChanges || isAutoSaving) return;
    
    setIsAutoSaving(true);
    
    try {
      let result;
      
      // Route to appropriate saver based on file path
      if (filePath.includes('hero.json')) {
        result = await DirectSaver.saveHomeContent(data);
      } else if (filePath.includes('about')) {
        result = await DirectSaver.saveAboutContent(data);
      } else if (filePath.includes('contact')) {
        result = await DirectSaver.saveContactContent(data);
      } else if (filePath.includes('solutions')) {
        result = await DirectSaver.saveSolutionsContent(data);
      } else if (filePath.includes('cases')) {
        result = await DirectSaver.saveCasesContent(data);
      } else {
        result = await DirectSaver.saveFile(filePath, data);
      }

      if (result.success) {
        setHasUnsavedChanges(false);
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsAutoSaving(false);
    }
  };

  const manualSave = async () => {
    return handleAutoSave();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    hasUnsavedChanges,
    isAutoSaving,
    lastSaved,
    manualSave
  };
};