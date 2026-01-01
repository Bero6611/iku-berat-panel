import React, { useState } from 'react';
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
      padding: 10px;
    `,
    buttonRow: css`
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;

      button {
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 11px;
        cursor: pointer;
        background: #3a3a3a;
        color: #ffffff;
      }

      button:hover {
        background: #555555;
      }
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({
  options,
  data,
  width,
  height,
  fieldConfig,
  id,
}) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  // 🎬 DEMO MODU: Butonlarla oynadığımız değer
  // null ise gerçek veriyi kullanıyoruz
  const [debugValue, setDebugValue] = useState<number | null>(null);

  if (data.series.length === 0 && debugValue === null) {
    return (
      <PanelDataErrorView
        fieldConfig={fieldConfig}
        panelId={id}
        data={data}
        needsStringField
      />
    );
  }

  // 🔢 Gerçek veriden son sayısal değeri çek (Random Walk vs.)
  let liveValue = 0;
  const series = data.series[0];
  const field = series?.fields.find((f) => f.type === 'number');

  if (field && field.values.length > 0) {
    liveValue = Number(field.values.get(field.values.length - 1));
  }

  // 🎛 Ekranda gösterilecek asıl değer:
  // Butonlardan birine bastıysan debugValue,
  // basmadıysan gerçek veri (liveValue)
  const value = debugValue !== null ? debugValue : liveValue;

  // 🎨 Threshold'lara göre renk
  const circleColor =
    value > 80 ? 'red' : value > 50 ? 'orange' : 'green';

  const radius = Math.min(width, height) / 4;

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
          <circle
            data-testid="simple-panel-circle"
            r={radius}
            style={{ fill: circleColor }}
          />
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontSize={24}
          >
            {value.toFixed(2)}
          </text>
        </g>
      </svg>

      <div
        className={styles.textBox}
        style={{
          width: '100%',
          textAlign: options.centerText ? 'center' : 'left',
          fontSize: options.textSize,
        }}
      >
        {options.showSeriesCount && (
          <div data-testid="simple-panel-series-counter">
            Number of series: {data.series.length}
          </div>
        )}

        <div>Text option value: {options.text}</div>

        <div
          title="Grafana Panel Plugin – Developed by Berat Öztürk"
          style={{ marginTop: 8, fontWeight: 600, cursor: 'help' }}
        >
          Developed by Berat Öztürk
        </div>

        {/* 🎬 Demo butonları */}
        <div className={styles.buttonRow}>
          <span style={{ fontSize: 11 }}>Demo thresholds:</span>
          <button onClick={() => setDebugValue(30)}>Low (30)</button>
          <button onClick={() => setDebugValue(60)}>Medium (60)</button>
          <button onClick={() => setDebugValue(90)}>High (90)</button>
          <button onClick={() => setDebugValue(null)}>Live data</button>
        </div>
      </div>
    </div>
  );
};
