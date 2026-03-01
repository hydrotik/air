import React from 'react';
import { kpiCard, kpiLabel, kpiValue, kpiSub } from '../dashboard.css';

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export const KpiCard: React.FC<Props> = ({ label, value, sub, color }) => (
  <div className={kpiCard}>
    <span className={kpiLabel}>{label}</span>
    <span className={kpiValue} style={color ? { color } : undefined}>
      {value}
    </span>
    {sub && <span className={kpiSub}>{sub}</span>}
  </div>
);
