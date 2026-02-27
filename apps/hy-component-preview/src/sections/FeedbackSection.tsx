import React, { useState } from 'react';
import {
  Button,
  Progress,
  Skeleton,
  Spinner,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from '@hydrotik/design-system';
import { Bell } from 'lucide-react';

export function FeedbackSection() {
  const [toastOpen, setToastOpen] = useState(false);
  const [progress, setProgress] = useState(52);

  return (
    <ToastProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px' }}>
        {/* Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ fontWeight: 500 }}>Upload progress</span>
            <span style={{ opacity: 0.6 }}>{progress}%</span>
          </div>
          <Progress value={progress} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
          </div>
        </div>

        {/* Spinner */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <span style={{ fontSize: '14px', opacity: 0.6 }}>Loading...</span>
        </div>

        {/* Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Skeleton style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Skeleton style={{ height: '14px', width: '60%' }} />
              <Skeleton style={{ height: '12px', width: '40%' }} />
            </div>
          </div>
          <Skeleton style={{ height: '100px', width: '100%', borderRadius: '8px' }} />
        </div>

        {/* Toast trigger */}
        <Button variant="outline" onClick={() => setToastOpen(true)}>
          <Bell size={16} /> Show Notification
        </Button>
      </div>

      <Toast open={toastOpen} onOpenChange={setToastOpen} variant="success" duration={3000}>
        <ToastTitle>Changes saved</ToastTitle>
        <ToastDescription>Your profile has been updated successfully.</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
