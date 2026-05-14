interface ECGSoftProps {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
  opacity?: number;
  beats?: number;
}

export default function ECGSoft({ width = 600, height = 80, color = '#5FBA9A', stroke = 1.5, opacity = 1, beats = 2 }: ECGSoftProps) {
  const beatSeg = (cx: number, h: number) =>
    `L${cx - 12},${h / 2} L${cx - 8},${h / 2 - 4} L${cx - 4},${h / 2 + 3} L${cx},${h / 2 - 22} L${cx + 4},${h / 2 + 18} L${cx + 8},${h / 2 - 6} L${cx + 12},${h / 2}`;
  const positions = beats === 1 ? [width / 2] : Array.from({ length: beats }, (_, i) => (width / (beats + 1)) * (i + 1));
  let d = `M0,${height / 2}`;
  positions.forEach(cx => { d += ` ${beatSeg(cx, height)}`; });
  d += ` L${width},${height / 2}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', opacity }}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
