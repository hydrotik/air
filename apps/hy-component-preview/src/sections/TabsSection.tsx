import React from 'react';
import {
  Card,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hydrotik/design-system';

export function TabsSection() {
  return (
    <Tabs defaultValue="overview" style={{ maxWidth: '480px' }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardContent style={{ padding: '16px', fontSize: '14px', opacity: 0.8 }}>
            Overview content goes here.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardContent style={{ padding: '16px', fontSize: '14px', opacity: 0.8 }}>
            Analytics content goes here.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardContent style={{ padding: '16px', fontSize: '14px', opacity: 0.8 }}>
            Settings content goes here.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
