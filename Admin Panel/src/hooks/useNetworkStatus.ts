// Entire network status hook removed from usage; provide a minimal noop hook to avoid imports.
import * as React from 'react';

interface ConnectionStatus {
  isOnline: boolean;
  navigatorOnline: boolean;
}

export const useNetworkStatus = () => {
  // Provide stable values without any network checks
  const [isOnline] = React.useState<boolean>(true);
  const connectionStatus: ConnectionStatus = { isOnline: true, navigatorOnline: true };
  const checkConnectivity = async (): Promise<boolean> => true;
  const getConnectionStatus = (): ConnectionStatus => connectionStatus;
  const resetConnectionMessage = (): void => {};
  const isBackgroundMonitoringActive = (): boolean => false;
  return { isOnline, connectionStatus, checkConnectivity, getConnectionStatus, resetConnectionMessage, isBackgroundMonitoringActive };
};