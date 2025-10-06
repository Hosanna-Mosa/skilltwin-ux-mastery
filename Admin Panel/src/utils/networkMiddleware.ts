// Network middleware for checking internet connectivity
interface ConnectionOptions {
  showOfflineMessage?: boolean;
  showOnlineMessage?: boolean;
  retryOnReconnect?: boolean;
  requireConnectivityTest?: boolean;
}

interface ConnectionStatus {
  isOnline: boolean;
  navigatorOnline: boolean;
}

class NetworkMiddleware {
  // Shim: all network features disabled
  private isOnline: boolean = true;
  private hasShownConnectionMessage: boolean = false;
  private backgroundMonitoring: number | null = null;

  constructor() {}

  private setupEventListeners(): void {}

  // Check if device is online
  checkConnection(): boolean { return true; }

  // Test actual connectivity by making a small request
  async testConnectivity(): Promise<boolean> { return true; }

  // Show connection status message
  private showConnectionMessage(_: string, __: 'info' | 'success' | 'error' = 'info'): void {}

  // Middleware function to wrap API calls
  async withConnectionCheck<T>(
    apiCall: () => Promise<T>, 
    options: ConnectionOptions = {}
  ): Promise<T> {
    // Directly perform the API call without any network checks or toasts
    return apiCall();
  }

  // Get current connection status
  getConnectionStatus(): ConnectionStatus { return { isOnline: true, navigatorOnline: true }; }

  // Reset connection message flag (useful for page refreshes)
  resetConnectionMessageFlag(): void {}

  // Check if connection message has been shown
  hasConnectionMessageBeenShown(): boolean { return false; }

  // Start background monitoring (continuous checking without showing messages)
  private startBackgroundMonitoring(): void {}

  // Stop background monitoring
  stopBackgroundMonitoring(): void {}

  // Get background monitoring status
  isBackgroundMonitoringActive(): boolean { return false; }
}

// Create singleton instance
const networkMiddleware = new NetworkMiddleware();

export default networkMiddleware; 