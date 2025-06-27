
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Sessions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Session Tracking</h1>
        <p className="text-gray-600 mt-2">Monitor training sessions and student progress</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Session tracking features will be available in the next version</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This page will include session logs, progress tracking, and status updates.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sessions;
