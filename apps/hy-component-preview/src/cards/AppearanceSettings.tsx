import React, { useState } from 'react';
import {
  Label, RadioGroup, RadioGroupItem, Input, Switch, Button, Separator,
} from '@hydrotik/design-system';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { vars } from '@hydrotik/tokens';

/** Appearance settings card — matches shadcn appearance-settings.tsx */
export function AppearanceSettings() {
  const [gpuCount, setGpuCount] = useState(8);
  const [env, setEnv] = useState('kubernetes');

  const radioCardStyle = (selected: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px',
    borderRadius: '8px',
    border: `1px solid ${selected ? vars.color.primary : vars.color.border}`,
    cursor: 'pointer',
    opacity: selected ? 1 : 0.6,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Compute Environment */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>Compute Environment</div>
        <div style={{ fontSize: '12px', color: vars.color.textMuted, marginTop: '2px' }}>
          Select the compute environment for your cluster.
        </div>
      </div>

      <RadioGroup value={env} onValueChange={setEnv}>
        <label style={radioCardStyle(env === 'kubernetes')}>
          <RadioGroupItem value="kubernetes" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Kubernetes</div>
            <div style={{ fontSize: '12px', color: vars.color.textMuted }}>
              Run GPU workloads on a K8s configured cluster. This is the default.
            </div>
          </div>
        </label>
        <label style={radioCardStyle(env === 'vm')}>
          <RadioGroupItem value="vm" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Virtual Machine</div>
            <div style={{ fontSize: '12px', color: vars.color.textMuted }}>
              Access a VM configured cluster to run workloads. (Coming soon)
            </div>
          </div>
        </label>
      </RadioGroup>

      <Separator />

      {/* Number of GPUs with +/- buttons */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>Number of GPUs</div>
        <div style={{ fontSize: '12px', color: vars.color.textMuted, marginTop: '2px' }}>You can add more later.</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => setGpuCount(c => Math.max(1, c - 1))}
          disabled={gpuCount <= 1}
          style={{ borderRadius: '6px 0 0 6px', borderRight: 'none' }}
          aria-label="Decrease"
        >
          <IconMinus size={14} />
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
          <IconPlus size={14} />
        </Button>
      </div>

      <Separator />

      {/* Wallpaper Tinting toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>Wallpaper Tinting</div>
          <div style={{ fontSize: '12px', color: vars.color.textMuted }}>Allow the wallpaper to be tinted.</div>
        </div>
        <Switch defaultChecked />
      </div>
    </div>
  );
}
