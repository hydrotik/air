import React from 'react';
import { Alert, AlertTitle } from '@hydrotik/design-system';
import { CheckCircle } from 'lucide-react';

export function AlertCard() {
  return (
    <Alert icon={<CheckCircle size={16} />}>
      <AlertTitle>Your profile has been verified.</AlertTitle>
    </Alert>
  );
}
