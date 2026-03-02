import React from 'react';
import * as RechartsPrimitive from 'recharts';
import {
  chartContainerStyle,
  tooltipContentStyle,
  tooltipLabelStyle,
  tooltipItemsStyle,
  tooltipItemRowStyle,
  tooltipItemRowCenteredStyle,
  tooltipIndicatorDotStyle,
  tooltipIndicatorLineStyle,
  tooltipIndicatorDashedStyle,
  tooltipItemContentStyle,
  tooltipItemContentEndStyle,
  tooltipItemContentCenterStyle,
  tooltipItemLabelStyle,
  tooltipItemNameStyle,
  tooltipItemValueStyle,
  legendContentStyle,
  legendContentTopStyle,
  legendContentBottomStyle,
  legendItemStyle,
  legendItemDotStyle,
} from './Chart.css';

const cx = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

/* ─── Types ────────────────────────────────────────────────────────────── */

/**
 * Chart configuration — maps data keys to labels, icons, and colors.
 * Colors can be static or theme-aware.
 */
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  );
};

/* ─── Context ──────────────────────────────────────────────────────────── */

type ChartContextProps = { config: ChartConfig };

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error('useChart must be used within a <ChartContainer />');
  return context;
}

/* ─── ChartContainer ───────────────────────────────────────────────────── */

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cx(chartContainerStyle, className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer debounce={2000}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'ChartContainer';

/* ─── ChartStyle ───────────────────────────────────────────────────────── */

const THEMES = { light: '', dark: '.dark' } as const;

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.theme || cfg.color,
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join('\n')}
}
`,
          )
          .join(''),
      }}
    />
  );
};

/* ─── ChartTooltip ─────────────────────────────────────────────────────── */

const ChartTooltip = RechartsPrimitive.Tooltip;

/* ─── ChartTooltipContent ──────────────────────────────────────────────── */

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<'div'> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: 'line' | 'dot' | 'dashed';
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null;

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || 'value'}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === 'string'
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return <div className={tooltipLabelStyle}>{labelFormatter(value, payload)}</div>;
      }

      if (!value) return null;
      return <div className={tooltipLabelStyle}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, config, labelKey]);

    if (!active || !payload?.length) return null;

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div ref={ref} className={cx(tooltipContentStyle, className)}>
        {!nestLabel ? tooltipLabel : null}
        <div className={tooltipItemsStyle}>
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cx(
                  tooltipItemRowStyle,
                  indicator === 'dot' && tooltipItemRowCenteredStyle,
                )}
              >
                {formatter && item.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cx(
                            indicator === 'dot' && tooltipIndicatorDotStyle,
                            indicator === 'line' && tooltipIndicatorLineStyle,
                            indicator === 'dashed' && tooltipIndicatorDashedStyle,
                          )}
                          style={{
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor,
                            backgroundColor: indicator !== 'dashed' ? indicatorColor : undefined,
                            borderColor: indicator === 'dashed' ? indicatorColor : undefined,
                          } as React.CSSProperties}
                        />
                      )
                    )}
                    <div
                      className={cx(
                        tooltipItemContentStyle,
                        nestLabel ? tooltipItemContentEndStyle : tooltipItemContentCenterStyle,
                      )}
                    >
                      <div className={tooltipItemLabelStyle}>
                        {nestLabel ? tooltipLabel : null}
                        <span className={tooltipItemNameStyle}>
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value !== undefined && (
                        <span className={tooltipItemValueStyle}>
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = 'ChartTooltipContent';

/* ─── ChartLegend ──────────────────────────────────────────────────────── */

const ChartLegend = RechartsPrimitive.Legend;

/* ─── ChartLegendContent ───────────────────────────────────────────────── */

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> &
    Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cx(
        legendContentStyle,
        verticalAlign === 'top' ? legendContentTopStyle : legendContentBottomStyle,
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div key={item.value} className={legendItemStyle}>
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className={legendItemDotStyle}
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegendContent';

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== 'object' || payload === null) return undefined;

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
};
