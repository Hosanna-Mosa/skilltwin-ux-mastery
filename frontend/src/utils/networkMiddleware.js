// Network middleware for checking internet connectivity
class NetworkMiddleware {
  constructor() {
    this.isOnline = navigator.onLine;
    this.hasShownConnectionMessage = false; // Track if we've shown connection message
    this.backgroundMonitoring = null; // Background monitoring interval
    this.setupEventListeners();
    this.startBackgroundMonitoring();
  }

  setupEventListeners() {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      // Only show message if we haven't shown it before
      if (!this.hasShownConnectionMessage) {
        this.showConnectionMessage('Internet connection restored!', 'success');
        this.hasShownConnectionMessage = true;
      }
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.hasShownConnectionMessage = false; // Reset flag when going offline
      // Only show offline message if we haven't shown it before
      if (!this.hasShownConnectionMessage) {
        this.showConnectionMessage('No internet connection detected!', 'error');
        this.hasShownConnectionMessage = true;
      }
    });
  }

  // Check if device is online
  checkConnection() {
    return navigator.onLine;
  }

  // Test actual connectivity by making a small request
  async testConnectivity() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      // Try multiple endpoints for better reliability
      const endpoints = [
        'https://httpbin.org/status/200',
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://api.github.com/zen'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'HEAD',
            signal: controller.signal,
            cache: 'no-cache',
            mode: 'cors'
          });

          if (response.ok) {
            clearTimeout(timeoutId);
            return true;
          }
        } catch (endpointError) {
          // Continue to next endpoint if this one fails
          continue;
        }
      }

      clearTimeout(timeoutId);
      return false;
    } catch (error) {
      return false;
    }
  }

  // Show connection status message
  showConnectionMessage(message, type = 'info') {
    // Import toast dynamically to avoid circular dependencies
    import('../hooks/use-toast').then(({ useToast }) => {
      const { toast } = useToast();
      toast({
        title: type === 'error' ? 'Connection Error' : 'Connection Status',
        description: message,
        variant: type === 'error' ? 'destructive' : type === 'success' ? 'default' : 'default',
        duration: type === 'error' ? 5000 : 3000,
      });
    }).catch(() => {
      // Fallback to console if toast is not available
      console.log(`[${type.toUpperCase()}] ${message}`);
    });
  }

  // Middleware function to wrap API calls
  async withConnectionCheck(apiCall, options = {}) {
    const { 
      showOfflineMessage = true, 
      showOnlineMessage = false,
      retryOnReconnect = true 
    } = options;

    // Check if device reports as online
    if (!this.checkConnection()) {
      if (showOfflineMessage) {
        this.showConnectionMessage('No internet connection. Please check your network.', 'error');
      }
      throw new Error('No internet connection');
    }
    // Only test connectivity for critical operations or when explicitly requested
    // This reduces false positives from connectivity tests
    if (options.requireConnectivityTest) {
      const isActuallyOnline = await this.testConnectivity();
      if (!isActuallyOnline) {
        if (showOfflineMessage) {
          this.showConnectionMessage('Unable to reach external services. Some features may be limited.', 'error');
        }
        throw new Error('Unable to reach external services');
      }
    }

    try {
      const result = await apiCall();

      // Show success message if requested
      if (showOnlineMessage) {
        this.showConnectionMessage('Connection successful!', 'success');
      }
      
      return result;
    } catch (error) {
      // Only show network error for actual fetch errors, not connectivity test failures
      if (error.name === 'TypeError' && error.message.includes('fetch') && !error.message.includes('testConnectivity')) {
        this.showConnectionMessage('Network error occurred. Please try again.', 'error');
      }
      throw error;
    }
  }

  // Get current connection status
  getConnectionStatus(){
    return {
      isOnline: this.isOnline,
      navigatorOnline: navigator.onLine
    };
  }
  // Reset connection message flag (useful for page refreshes)
  resetConnectionMessageFlag() {
    this.hasShownConnectionMessage = false;
  }

  // Check if connection message has been shown
  hasConnectionMessageBeenShown() {
    return this.hasShownConnectionMessage;
  }

  // Start background monitoring (continuous checking without showing messages)
   startBackgroundMonitoring() {
    // Check every 30 seconds in the background - completely silent
    this.backgroundMonitoring = setInterval(async () => {
      try {
        const isConnected = await this.testConnectivity();
        // Update internal state silently - no messages, no toasts
        this.isOnline = isConnected;
      } catch (error) {
        // Silently update state on background check failures
        this.isOnline = false;
      }
    }, 30000); // 30 seconds
  }

  // Stop background monitoring
  stopBackgroundMonitoring() {
    if (this.backgroundMonitoring) {
      clearInterval(this.backgroundMonitoring);
      this.backgroundMonitoring = null;
    }
  }

  // Get background monitoring status
  isBackgroundMonitoringActive() {
    return this.backgroundMonitoring !== null;
  }
}

// Create singleton instance
const networkMiddleware = new NetworkMiddleware();

export default networkMiddleware; 