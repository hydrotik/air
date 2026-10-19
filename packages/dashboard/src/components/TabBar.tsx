import React from 'react';
import { compactTabBar, compactTab, compactTabActive } from '../compact.css';

interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const TabBar: React.FC<Props> = ({ tabs, activeTab, onTabChange }) => (
  <div className={compactTabBar}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={`${compactTab} ${tab.id === activeTab ? compactTabActive : ''}`}
        onClick={() => onTabChange(tab.id)}
        aria-selected={tab.id === activeTab}
        role="tab"
      >
        {tab.label}
      </button>
    ))}
  </div>
);
