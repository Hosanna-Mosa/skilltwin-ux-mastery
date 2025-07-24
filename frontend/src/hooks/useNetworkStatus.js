import { useState, useEffect } from 'react';
import networkMiddleware from '../utils/networkMiddleware';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionStatus, setConnectionStatus] = useState({
    isOnline: navigator.onLine,
    navigatorOnline: navigator.onLine
  });

  useEffect(() => {
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
  const checkConnectivity = async () => {
    const status = await networkMiddleware.testConnectivity();
    setIsOnline(status);
    setConnectionStatus(prev => ({ ...prev, isOnline: status }));
    return status;
  };

  // Function to get detailed connection status
  const getConnectionStatus = () => {
    return networkMiddleware.getConnectionStatus();
  };

  // Function to reset connection message flag
  const resetConnectionMessage = () => {
    networkMiddleware.resetConnectionMessageFlag();
  };

  // Function to check if background monitoring is active
  const isBackgroundMonitoringActive = () => {
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