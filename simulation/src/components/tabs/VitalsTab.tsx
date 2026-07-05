import { useState } from 'react';
import type { Patient, VitalsEntry } from '../../types';
import { SIM_TODAY_SHORT } from '../../types';
import { useStore } from '../../state/store';

// Fever-chart style: small SVG curve (temp red, HR blue) above the value table,
// echoing the legacy "Fieberkurve".

export default function VitalsTab({ p }: { p: Patient }) {
  const { dispatch } = useStore();
  const [t, setT] = useState(SIM_TODAY_SHORT + ' ' + new Date().toTimeString().slice(0, 5));
  const [bp, setBp] = useState('');
  const [hr, setHr] = useState('');
  const [temp, setTemp] = useState('');
  const [spo2, setSpo2] = useState('');

  const entries = p.vitals;
  const w = Math.max(420, entries.length * 46);
  const h = 120;

  const tempPts = entries.map((v, i) => (v.temp != null ? [i, v.temp] : null)).filter(Boolean) as [number, number][];
  const hrPts = entries.map((v, i) => (v.hr != null ? [i, v.hr] : null)).filter(Boolean) as [number, number][];
  const x = (i: number) => 30 + (i * (w - 50)) / Math.max(1, entries.length - 1);
  const yT = (v: number) => h - ((v - 35.5) / (40.5 - 35.5)) * (h - 20) - 10;
  const yH = (v: number) => h - ((v - 40) / (160 - 40)) * (h - 20) - 10;
  const path = (pts: [number, number][], y: (v: number) => number) =>
    pts.map(([i, v], k) => (k === 0 ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');

  const chart = () => {
    if (!bp && !hr && !temp && !spo2) return;
    const entry: VitalsEntry = {
      t,
      bp: bp || undefined,
      hr: hr ? parseInt(hr, 10) : undefined,
      temp: temp ? parseFloat(temp) : undefined,
      spo2: spo2 ? parseInt(spo2, 10) : undefined,
      note: 'charted manually (Carter)',
    };
    dispatch({ type: 'ADD_VITALS', patientId: p.id, entry });
    setBp(''); setHr(''); setTemp(''); setSpo2('');
  };

  return (
    <>
      <div className="panel">
        <div className="phead">Fever chart</div>
        <div className="pbody" style={{ overflowX: 'auto' }}>
          <svg width={w} height={h + 14} style={{ background: '#fff', border: '1px solid #9a9ad0' }}>
            {[36, 37, 38, 39, 40].map((g) => (
              <g key={g}>
                <line x1={30} x2={w - 16} y1={yT(g)} y2={yT(g)} stroke="#e0e0f0" />
                <text x={2} y={yT(g) + 3} fontSize={9} fill="#c04040">{g}°</text>
              </g>
            ))}
            <path d={path(tempPts, yT)} fill="none" stroke="#c03030" strokeWidth={1.5} />
            {tempPts.map(([i, v], k) => <circle key={k} cx={x(i)} cy={yT(v)} r={2.5} fill="#c03030" />)}
            <path d={path(hrPts, yH)} fill="none" stroke="#2040c0" strokeWidth={1.5} />
            {hrPts.map(([i, v], k) => <rect key={k} x={x(i) - 2} y={yH(v) - 2} width={4} height={4} fill="#2040c0" />)}
            {entries.map((v, i) => (
              <text key={i} x={x(i)} y={h + 10} fontSize={8} fill="#333" textAnchor="middle">{v.t.slice(0, 6)}</text>
            ))}
          </svg>
          <div className="small"><span style={{ color: '#c03030' }}>● Temp</span>  <span style={{ color: '#2040c0' }}>■ Pulse</span></div>
        </div>
      </div>

      <div className="panel tight">
        <div className="phead">Value table</div>
        <div className="pbody">
          <table className="grid">
            <thead>
              <tr><th>Date/time</th><th>RR (BP)</th><th>Pulse</th><th>Resp.</th><th>Temp</th><th>SpO2</th><th>O2</th><th>Weight</th><th>Pain</th><th>Comment</th></tr>
            </thead>
            <tbody>
              {[...entries].reverse().map((v, i) => (
                <tr key={i}>
                  <td>{v.t}</td>
                  <td>{v.bp || ''}</td>
                  <td>{v.hr ?? ''}</td>
                  <td>{v.rr ?? ''}</td>
                  <td className={v.temp != null && v.temp >= 38 ? 'flag-H' : ''}>{v.temp != null ? v.temp.toFixed(1) : ''}</td>
                  <td className={v.spo2 != null && v.spo2 < 90 ? 'flag-L' : ''}>{v.spo2 != null ? v.spo2 + ' %' : ''}</td>
                  <td>{v.o2 || ''}</td>
                  <td>{v.weight != null ? v.weight.toFixed(1) + ' kg' : ''}</td>
                  <td>{v.pain ?? ''}</td>
                  <td className="wrap small">{v.note || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="editor-block">
        <b>Chart new values</b> <span className="muted small">(session only — resets on reload)</span>
        <div className="erow" style={{ marginTop: 4 }}>
          <span>Time</span><input type="text" value={t} onChange={(e) => setT(e.target.value)} style={{ width: 100 }} />
          <span>BP</span><input type="text" className="yellow" placeholder="120/80" value={bp} onChange={(e) => setBp(e.target.value)} style={{ width: 60 }} />
          <span>Pulse</span><input type="text" className="yellow" value={hr} onChange={(e) => setHr(e.target.value)} style={{ width: 40 }} />
          <span>Temp</span><input type="text" className="yellow" value={temp} onChange={(e) => setTemp(e.target.value)} style={{ width: 40 }} />
          <span>SpO2</span><input type="text" className="yellow" value={spo2} onChange={(e) => setSpo2(e.target.value)} style={{ width: 40 }} />
          <button className="btn primary" onClick={chart}>Chart values</button>
        </div>
      </div>
    </>
  );
}
