import React from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Badge } from './ui/badge';
import { Wifi, WifiOff } from 'lucide-react';

const NetworkStatusIndicator = () => {
  const { isOnline, connectionStatus } = useNetworkStatus();

  if (isOnline) {
    return (
      <div className="flex items-center gap-2">
        <Wifi className="h-4 w-4 text-green-500" />
        <Badge variant="outline" className="text-green-600 border-green-600">
          Online
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <WifiOff className="h-4 w-4 text-red-500" />
      <Badge variant="outline" className="text-red-600 border-red-600">
        Offline
      </Badge>
    </div>
  );
};

export default NetworkStatusIndicator; 