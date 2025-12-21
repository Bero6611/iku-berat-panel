import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  // ✅ Read last numeric value from first series
  const series = data.series[0];
  const field = series?.fields.find((f) => f.type === 'number');
  const value = field?.values?.get(field.values.length - 1) ?? 0;

  // ✅ Color changes based on data (bonus)
  const circleColor = value > 80 ? 'red' : value > 50 ? 'orange' : 'green';

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
          background-color: ${options.backgroundColor};
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      >
        <g>
          {/* ✅ circle uses data-driven color */}
          <circle data-testid="simple-panel-circle" fill={circleColor} r={100} />

          {/* ✅ optional: show the value in the center (bonus) */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={Math.max(12, options.textSize)}
            fontWeight={700}
          >
            {String(value)}
          </text>
        </g>
      </svg>

      <div
        className={styles.textBox}
        style={{
          textAlign: options.centerText ? 'center' : 'left',
          fontSize: options.textSize,
        }}
      >
        {options.showSeriesCount && (
          <div data-testid="simple-panel-series-counter">Number of series: {data.series.length}</div>
        )}

        <div>Text option value: {options.text}</div>

        <div
          title="Grafana Panel Plugin – Developed by Berat Öztürk"
          style={{ marginTop: 8, fontWeight: 600, cursor: 'help' }}
        >
          Developed by Berat Öztürk
        </div>
      </div>
    </div>
  );
};
