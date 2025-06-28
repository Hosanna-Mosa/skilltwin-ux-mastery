
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Experts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Experts Management</h1>
        <p className="text-gray-600 mt-2">Manage expert profiles and task assignments</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Expert management features will be available in the next version</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This page will include expert profiles, skill management, and task assignment functionality.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Experts;
