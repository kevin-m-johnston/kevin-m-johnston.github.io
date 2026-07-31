import type { TidePoint } from "../types/tides";
import { formatTime } from "../utils/format";

interface Props { points: TidePoint[]; timezone: string; }

export function TideChart({ points, timezone }: Props) {
  const sorted = [...points].sort((a, b) => Date.parse(a.time) - Date.parse(b.time)).slice(0, 72);
  if (sorted.length < 2) return <p className="empty">Not enough points to draw a tide curve.</p>;
  const width = 900, height = 300, padX = 50, padY = 30;
  const times = sorted.map((p) => Date.parse(p.time));
  const heights = sorted.map((p) => p.height);
  const minT = Math.min(...times), maxT = Math.max(...times);
  const minH = Math.min(...heights), maxH = Math.max(...heights);
  const x = (t: number) => padX + ((t - minT) / Math.max(1, maxT - minT)) * (width - padX * 2);
  const y = (h: number) => height - padY - ((h - minH) / Math.max(0.1, maxH - minH)) * (height - padY * 2);
  const path = sorted.map((p, i) => `${i === 0 ? "M" : "L"}${x(Date.parse(p.time)).toFixed(1)},${y(p.height).toFixed(1)}`).join(" ");
  const area = `${path} L${x(maxT)},${height - padY} L${x(minT)},${height - padY} Z`;
  const ticks = Array.from({ length: 7 }, (_, i) => minT + ((maxT - minT) * i) / 6);
  const heightTicks = Array.from({ length: 5 }, (_, i) => minH + ((maxH - minH) * i) / 4);

  return (
    <div className="chart-wrap">
      <svg className="tide-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Predicted tide height chart">
        {heightTicks.map((tick) => <g key={tick}><line x1={padX} x2={width-padX} y1={y(tick)} y2={y(tick)} className="grid-line"/><text x={padX-8} y={y(tick)+4} textAnchor="end">{tick.toFixed(1)}m</text></g>)}
        <path d={area} className="tide-area"/><path d={path} className="tide-line"/>
        {ticks.map((tick) => <text key={tick} x={x(tick)} y={height-6} textAnchor="middle">{formatTime(new Date(tick).toISOString(), timezone)}</text>)}
        <line x1={padX} x2={width-padX} y1={height-padY} y2={height-padY} className="axis"/>
      </svg>
    </div>
  );
}
