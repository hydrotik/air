import React, { useState } from 'react';
import {
  Label, RadioGroup, RadioGroupItem, Input, Switch, Button, Separator,
} from '@hydrotik/design-system';
import { Minus, Plus } from 'lucide-react';

/** Appearance settings card — matches shadcn appearance-settings.tsx */
export function AppearanceSettings() {
  const [gpuCount, setGpuCount] = useState(8);
  const [env, setEnv] = useState('kubernetes');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Compute Environment */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>Compute Environment</div>
        <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>
          Select the compute environment for your cluster.
        </div>
      </div>

      <RadioGroup value={env} onValueChange={setEnv}>
        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px',
          borderRadius: '8px', border: `1px solid ${env === 'kubernetes' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
          cursor: 'pointer',
        }}>
          <RadioGroupItem value="kubernetes" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Kubernetes</div>
            <div style={{ fontSize: '12px', opacity: 0.5 }}>
              Run GPU workloads on a K8s configured cluster. This is the default.
            </div>
          </div>
        </label>
        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px',
          borderRadius: '8px', border: `1px solid ${env === 'vm' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
          cursor: 'pointer', opacity: 0.6,
        }}>
          <RadioGroupItem value="vm" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Virtual Machine</div>
            <div style={{ fontSize: '12px', opacity: 0.5 }}>
              Access a VM configured cluster to run workloads. (Coming soon)
            </div>
          </div>
        </label>
      </RadioGroup>

      <Separator />

      {/* Number of GPUs with +/- buttons */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>Number of GPUs</div>
        <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>You can add more later.</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => setGpuCount(c => Math.max(1, c - 1))}
          disabled={gpuCount <= 1}
          style={{ borderRadius: '6px 0 0 6px', borderRight: 'none' }}
          aria-label="Decrease"
        >
          <Minus size={14} />
        </Button>
        <Input
          type="number"
          value={gpuCount}
          onChange={e => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v) && v >= 1 && v <= 99) setGpuCount(v);
          }}
          style={{ width: '64px', textAlign: 'center', borderRadius: '0' }}
        />
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => setGpuCount(c => Math.min(99, c + 1))}
          disabled={gpuCount >= 99}
          style={{ borderRadius: '0 6px 6px 0', borderLeft: 'none' }}
          aria-label="Increase"
        >
          <Plus size={14} />
        </Button>
      </div>

      <Separator />

      {/* Wallpaper Tinting toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>Wallpaper Tinting</div>
          <div style={{ fontSize: '12px', opacity: 0.5 }}>Allow the wallpaper to be tinted.</div>
        </div>
        <Switch defaultChecked />
      </div>
    </div>
  );
}
