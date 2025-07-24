import * as React from 'react';
import networkMiddleware from '../utils/networkMiddleware';

interface ConnectionStatus {
  isOnline: boolean;
  navigatorOnline: boolean;
}

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = React.useState<boolean>(navigator.onLine);
  const [connectionStatus, setConnectionStatus] = React.useState<ConnectionStatus>({
    isOnline: navigator.onLine,
    navigatorOnline: navigator.onLine
  });

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setConnectionStatus(prev => ({ ...prev, isOnline: true, navigatorOnline: true }));
    };

    const handleOffline = () => {
      setIsOnline(false);
      setConnectionStatus(prev => ({ ...prev, isOnline: false, navigatorOnline: false }));
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Function to manually check connectivity
  const checkConnectivity = async (): Promise<boolean> => {
    const status = await networkMiddleware.testConnectivity();
    setIsOnline(status);
    setConnectionStatus(prev => ({ ...prev, isOnline: status }));
    return status;
  };

  // Function to get detailed connection status
  const getConnectionStatus = (): ConnectionStatus => {
    return networkMiddleware.getConnectionStatus();
  };

  // Function to reset connection message flag
  const resetConnectionMessage = (): void => {
    networkMiddleware.resetConnectionMessageFlag();
  };

  // Function to check if background monitoring is active
  const isBackgroundMonitoringActive = (): boolean => {
    return networkMiddleware.isBackgroundMonitoringActive();
  };

  return {
    isOnline,
    connectionStatus,
    checkConnectivity,
    getConnectionStatus,
    resetConnectionMessage,
    isBackgroundMonitoringActive
  };
}; 