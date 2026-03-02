import React from 'react';
import { Loader2, Wrench } from 'lucide-react';
import {
  indicatorContainer,
  indicatorSpinner,
  indicatorLabel,
  indicatorDot,
  toolBadge,
} from './ToolCallIndicator.css';

export interface ToolCallIndicatorProps {
  /** Name of the tool being called (optional) */
  toolName?: string;
  /** Custom label (overrides default tool-based labels) */
  label?: string;
  /** Custom icon (default: spinning loader) */
  icon?: React.ReactNode;
  /** Show tool name badge (default: true when toolName provided) */
  showBadge?: boolean;
  /** Additional className */
  className?: string;
}

/** Known tool name → friendly label mapping */
const TOOL_LABELS: Record<string, string> = {
  getInformation: 'Getting information',
  addResource: 'Saving to knowledge base',
  search: 'Searching',
  calculate: 'Calculating',
  generateImage: 'Generating image',
  rag_search: 'Searching knowledge base',
  rag_sync: 'Syncing knowledge base',
};

/**
 * Visual indicator for LLM tool calls in progress.
 * Shows a spinner with the tool name while the model is executing a tool.
 */
export const ToolCallIndicator = React.forwardRef<HTMLDivElement, ToolCallIndicatorProps>(
  ({ toolName, label, icon, showBadge = true, className }, ref) => {
    const displayLabel = label || (toolName && TOOL_LABELS[toolName]) || 'Thinking';

    return (
      <div ref={ref} className={[indicatorContainer, className].filter(Boolean).join(' ')}>
        <div className={indicatorSpinner}>
          {icon || <Loader2 size={16} />}
        </div>
        <span className={indicatorLabel}>
          {displayLabel}
          <span className={indicatorDot}>...</span>
        </span>
        {showBadge && toolName && (
          <span className={toolBadge}>
            <Wrench size={10} />
            {toolName}
          </span>
        )}
      </div>
    );
  },
);
ToolCallIndicator.displayName = 'ToolCallIndicator';
