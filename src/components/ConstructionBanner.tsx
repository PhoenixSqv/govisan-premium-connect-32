import React, { useState, useEffect } from 'react';
import { Construction, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConstructionBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-yellow-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <Construction className="w-8 h-8 animate-pulse" />
            Website Under Construction
            <Construction className="w-8 h-8 animate-pulse" />
          </DialogTitle>
          <DialogDescription className="text-gray-900 text-lg pt-4 space-y-4">
            <p className="font-semibold">
              We're working on something new!
            </p>
            <p>
              For more information and to see our latest projects, please visit:
            </p>
            <a 
              href="https://www.vcningenieria.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-xl font-bold text-blue-900 hover:text-blue-700 underline transition-colors"
            >
              www.vcningenieria.com
            </a>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConstructionBanner;
