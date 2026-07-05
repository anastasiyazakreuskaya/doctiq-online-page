import { useStore } from '../state/store';
import { SIM_TODAY_SHORT } from '../types';
import type { PatientTab } from './PatientView';

export default function AgendaView({ onOpen }: { onOpen: (id: string, tab?: PatientTab) => void }) {
  const { state } = useStore();

  const rows = state.patients
    .flatMap((p) => p.agenda.filter((a) => a.date === SIM_TODAY_SHORT).map((a) => ({ p, a })))
    .sort((x, y) => (x.a.time || '99:99').localeCompare(y.a.time || '99:99'));

  const later = state.patients
    .flatMap((p) => p.agenda.filter((a) => a.date > SIM_TODAY_SHORT).map((a) => ({ p, a })))
    .sort((x, y) => x.a.date.localeCompare(y.a.date));

  return (
    <>
      <div className="view-title">Ward day view — planned procedures &amp; tasks, Fri {SIM_TODAY_SHORT}2026</div>
      <div className="view-scroll">
        <div className="panel tight">
          <div className="phead">Today</div>
          <div className="pbody">
            <table className="grid">
              <thead>
                <tr><th>Time</th><th>Patient</th><th>Bed</th><th>Item</th><th>Location</th><th>Status</th><th>Detail</th></tr>
              </thead>
              <tbody>
                {rows.map(({ p, a }, i) => (
                  <tr key={i} className="clickable" onClick={() => onOpen(p.id, 'orders')}>
                    <td><b>{a.time || '—'}</b></td>
                    <td><b>{p.lastName}, {p.firstName}</b>{p.mine ? <span className="mine-star"> ★</span> : ''}</td>
                    <td>{p.room}/{p.bed.split(' ')[0]}</td>
                    <td className="wrap">{a.item}</td>
                    <td>{a.location || ''}</td>
                    <td className={a.status === 'done' ? 'done-dim' : ''}>{a.status}</td>
                    <td className="wrap small">{a.detail || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel tight">
          <div className="phead">Next days (planned / requested)</div>
          <div className="pbody">
            <table className="grid">
              <thead><tr><th>Date</th><th>Patient</th><th>Item</th><th>Status</th></tr></thead>
              <tbody>
                {later.map(({ p, a }, i) => (
                  <tr key={i} className="clickable" onClick={() => onOpen(p.id, 'orders')}>
                    <td>{a.date}</td>
                    <td>{p.lastName}, {p.firstName}</td>
                    <td className="wrap">{a.item}</td>
                    <td>{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
