# Network Middleware Implementation

This implementation adds internet connection checking middleware to both the frontend and admin panel applications. The middleware automatically checks connectivity before each API call and displays appropriate toast notifications to users.

## Features

- **Automatic Connection Checking**: Checks internet connectivity before every API call
- **Real-time Status Monitoring**: Monitors online/offline events
- **Background Monitoring**: Continuously checks connectivity every 30 seconds without showing messages
- **One-time Connection Messages**: Shows connection status only once per session when initially connected
- **Toast Notifications**: Displays user-friendly messages for connection status changes
- **Fallback Handling**: Graceful error handling when network is unavailable
- **React Hooks**: Easy integration with React components

## Implementation Details

### 1. Network Middleware (`utils/networkMiddleware.js` / `utils/networkMiddleware.ts`)

The core middleware that:
- Checks `navigator.onLine` status
- Tests actual connectivity with multiple reliable endpoints
- Displays toast notifications for connection status changes (once per session)
- Wraps API calls with connection checking
- Runs background monitoring every 30 seconds

### 2. API Service Integration

Both frontend and admin panel API services have been updated to use the middleware:

```javascript
// Before each API call, the middleware checks:
// 1. If device reports as online
// 2. If actual connectivity test passes
// 3. Displays appropriate messages
```

### 3. React Hook (`hooks/useNetworkStatus.js` / `hooks/useNetworkStatus.ts`)

A React hook that provides:
- Real-time connection status
- Manual connectivity testing
- Connection status monitoring
- Background monitoring status
- Connection message flag management

## Usage Examples

### Using the Network Status Hook

```jsx
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const MyComponent = () => {
  const { isOnline, checkConnectivity } = useNetworkStatus();

  return (
    <div>
      <p>Connection Status: {isOnline ? 'Online' : 'Offline'}</p>
      <button onClick={checkConnectivity}>Test Connection</button>
    </div>
  );
};
```

### Using the Network Status Indicator

```jsx
import NetworkStatusIndicator from '../components/NetworkStatusIndicator';

const Header = () => {
  return (
    <header>
      <h1>My App</h1>
      <NetworkStatusIndicator />
    </header>
  );
};
```

### Home Page Integration

The home page (`frontend/src/pages/Home.jsx`) now includes:

1. **Connection Status Banner**: Shows at the top of the page with:
   - Loading spinner while checking connection
   - Green banner when connected
   - Red banner when offline with retry button

2. **Connection Status in Stats**: Added a fourth stat showing internet status with icon

3. **Automatic Connection Check**: Runs on page load with toast notifications

```jsx
// The home page automatically checks connection on load
useEffect(() => {
  const checkInitialConnection = async () => {
    const isConnected = await checkConnectivity();
    if (isConnected) {
      toast({
        title: "Connection Status",
        description: "You're connected to the internet!",
        duration: 3000,
      });
    } else {
      toast({
        title: "Connection Error",
        description: "Please check your internet connection.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  setTimeout(checkInitialConnection, 1000);
}, []);
```

### Manual API Call with Connection Check

```javascript
import networkMiddleware from '../utils/networkMiddleware';

// Wrap any async function with connection checking
const makeApiCall = async () => {
  return networkMiddleware.withConnectionCheck(async () => {
    const response = await fetch('/api/data');
    return response.json();
  }, {
    showOfflineMessage: true,
    showOnlineMessage: false
  });
};
```

## Toast Messages

The middleware displays the following toast messages:

- **Connection Lost**: "No internet connection detected!"
- **Connection Restored**: "Internet connection restored!"
- **API Call Failed**: "No internet connection. Please check your network."
- **Server Unreachable**: "Unable to reach the server. Please check your connection."
- **Network Error**: "Network error occurred. Please try again."

## Configuration Options

The `withConnectionCheck` method accepts options:

```javascript
{
  showOfflineMessage: true,    // Show message when offline
  showOnlineMessage: false,    // Show message when online
  retryOnReconnect: true       // Retry on reconnection (future feature)
}
```

## Browser Compatibility

- Uses `navigator.onLine` for basic connectivity detection
- Uses `fetch` API for actual connectivity testing
- Works in all modern browsers
- Graceful fallback to console logging if toast system unavailable

## Integration Points

### Frontend (`frontend/`)
- `src/utils/networkMiddleware.js` - Core middleware
- `src/hooks/useNetworkStatus.js` - React hook
- `src/components/NetworkStatusIndicator.jsx` - Status indicator component
- `src/components/NetworkTestComponent.jsx` - Test component for debugging
- `src/services/api.js` - Updated API service
- `src/pages/Home.jsx` - Updated with connection checking on page load

### Admin Panel (`Admin Panel/`)
- `src/utils/networkMiddleware.ts` - TypeScript version of middleware
- `src/hooks/useNetworkStatus.ts` - TypeScript React hook
- `src/services/api.ts` - Updated API service
- `src/pages/Index.tsx` - Updated with connection checking on page load

## Testing

To test the network middleware:

1. **Disconnect from internet** - Should show offline message
2. **Reconnect to internet** - Should show online message
3. **Make API calls while offline** - Should show error messages
4. **Make API calls while online** - Should work normally

## Future Enhancements

- Retry mechanism on reconnection
- Configurable timeout settings
- Custom connectivity test endpoints
- Offline queue for failed requests
- Connection quality monitoring 