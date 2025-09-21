import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, LogOut } from 'lucide-react';
import { logout } from '@/lib/cms/auth';

interface SessionTimeoutWarningProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
  extendSession: () => void;
}

const SessionTimeoutWarning: React.FC<SessionTimeoutWarningProps> = ({
  timeLeft,
  formatTime,
  extendSession
}) => {
  const handleLogoutNow = () => {
    logout();
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <Alert className="border-yellow-500 bg-yellow-50">
        <Clock className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold mb-1">Session expiring soon!</p>
              <p className="text-sm">
                You will be logged out in <strong>{formatTime(timeLeft)}</strong>
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button 
              size="sm" 
              onClick={extendSession}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Stay Logged In
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleLogoutNow}
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white"
            >
              <LogOut className="h-3 w-3 mr-1" />
              Logout Now
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SessionTimeoutWarning;