import React, { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent,
  Label, RadioGroup, RadioGroupItem, Input, Switch,
} from '@hydrotik/design-system';

export function SettingsCard() {
  const [env, setEnv] = useState('kubernetes');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Compute env */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label style={{ fontWeight: 600, margin: 0 }}>Compute Environment</Label>
            <span style={{ fontSize: '12px', opacity: 0.5 }}>Select the compute environment for your cluster.</span>
            <RadioGroup value={env} onValueChange={setEnv}>
              {/* Card-style radio options */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${env === 'kubernetes' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer',
                }}
              >
                <RadioGroupItem value="kubernetes" id="env-k8s" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>Kubernetes</div>
                  <div style={{ fontSize: '12px', opacity: 0.5 }}>Run GPU workloads on a K8s configured cluster. This is the default.</div>
                </div>
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${env === 'vm' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer',
                  opacity: 0.6,
                }}
              >
                <RadioGroupItem value="vm" id="env-vm" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>Virtual Machine</div>
                  <div style={{ fontSize: '12px', opacity: 0.5 }}>Access a VM configured cluster to run workloads. (Coming soon)</div>
                </div>
              </label>
            </RadioGroup>
          </div>

          {/* Number of GPUs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Label style={{ fontWeight: 600, margin: 0 }}>Number of GPUs</Label>
            <span style={{ fontSize: '12px', opacity: 0.5 }}>You can add more later.</span>
            <Input type="number" defaultValue={1} min={1} max={16} style={{ maxWidth: '120px' }} />
          </div>

          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Wallpaper Tinting</div>
              <div style={{ fontSize: '12px', opacity: 0.5 }}>Allow the wallpaper to be tinted.</div>
            </div>
            <Switch id="wallpaper" defaultChecked />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
