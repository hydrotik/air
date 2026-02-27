import React from 'react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@hydrotik/design-system';
import { Terminal, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export function AlertSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '520px' }}>
      <Alert icon={<Terminal size={16} />}>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
      <Alert variant="destructive" icon={<AlertCircle size={16} />}>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
      <Alert icon={<Info size={16} />}>
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>This is an informational alert with an icon.</AlertDescription>
      </Alert>
    </div>
  );
}
