import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useToast } from '../hooks/use-toast';
import networkMiddleware from '../utils/networkMiddleware';

const NetworkTestComponent = () => {
  const [testResults, setTestResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);
  const { isOnline, checkConnectivity, connectionStatus } = useNetworkStatus();
  const { toast } = useToast();

  const runNetworkTest = async () => {
    setIsTesting(true);
    const results = [];

    // Test 1: Basic connectivity
    try {
      const isConnected = await checkConnectivity();
      results.push({
        test: 'Basic Connectivity',
        status: isConnected ? 'success' : 'error',
        message: isConnected ? 'Internet connection is working' : 'No internet connection detected'
      });
    } catch (error) {
      results.push({
        test: 'Basic Connectivity',
        status: 'error',
        message: 'Failed to test connectivity'
      });
    }

    // Test 2: API connectivity
    try {
      await networkMiddleware.withConnectionCheck(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        return response.json();
      });
      results.push({
        test: 'API Connectivity',
        status: 'success',
        message: 'API calls are working properly'
      });
    } catch (error) {
      results.push({
        test: 'API Connectivity',
        status: 'error',
        message: 'API calls are failing'
      });
    }

    // Test 3: Network status
    const status = connectionStatus;
    results.push({
      test: 'Network Status',
      status: status.isOnline ? 'success' : 'warning',
      message: `Navigator online: ${status.navigatorOnline}, Middleware online: ${status.isOnline}`
    });

    setTestResults(results);
    setIsTesting(false);

    // Show summary toast
    const successCount = results.filter(r => r.status === 'success').length;
    const totalTests = results.length;
    
    toast({
      title: 'Network Test Complete',
      description: `${successCount}/${totalTests} tests passed`,
      variant: successCount === totalTests ? 'default' : 'destructive',
      duration: 3000,
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Pass</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Fail</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="h-5 w-5 text-green-600" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-600" />
          )}
          <span>Network Connection Test</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Current Status:</span>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
            <span className={isOnline ? 'text-green-600' : 'text-red-600'}>
              {isOnline ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Test Button */}
        <Button 
          onClick={runNetworkTest} 
          disabled={isTesting}
          className="w-full"
        >
          {isTesting ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Run Network Test
            </>
          )}
        </Button>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Test Results:</h4>
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(result.status)}
                  <span className="text-sm">{result.test}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">{result.message}</span>
                  {getStatusBadge(result.status)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Connection Details */}
        <div className="text-xs text-gray-600 space-y-1">
          <div>Navigator Online: {connectionStatus.navigatorOnline ? 'Yes' : 'No'}</div>
          <div>Middleware Online: {connectionStatus.isOnline ? 'Yes' : 'No'}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkTestComponent; 