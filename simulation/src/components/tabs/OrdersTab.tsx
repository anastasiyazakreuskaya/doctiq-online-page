import type { Patient } from '../../types';
import { SIM_TODAY_SHORT } from '../../types';

export default function OrdersTab({ p }: { p: Patient }) {
  const items = [...p.agenda].sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));
  return (
    <div className="panel tight">
      <div className="phead">Orders / planned procedures — full stay</div>
      <div className="pbody">
        <table className="grid">
          <thead><tr><th>Date</th><th>Time</th><th>Item</th><th>Location</th><th>Status</th><th>Detail / result pointer</th></tr></thead>
          <tbody>
            {items.map((a, i) => (
              <tr key={i} className={a.date === SIM_TODAY_SHORT ? 'today-row' : ''}>
                <td><b>{a.date}</b>{a.date === SIM_TODAY_SHORT ? ' (today)' : ''}</td>
                <td>{a.time || ''}</td>
                <td className="wrap"><b>{a.item}</b></td>
                <td>{a.location || ''}</td>
                <td className={a.status === 'done' ? 'done-dim' : ''}>{a.status}</td>
                <td className="wrap small">{a.detail || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
