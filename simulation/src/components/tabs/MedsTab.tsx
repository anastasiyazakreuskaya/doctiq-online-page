import { useState } from 'react';
import type { Patient } from '../../types';

// Medication chart: active AND discontinued visible, home vs inpatient source,
// PRN mixed in, brand/generic duplication left as-is, per-drug change history.

export default function MedsTab({ p }: { p: Patient }) {
  const [showStopped, setShowStopped] = useState(true);

  const meds = [...p.meds].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'active' ? -1 : 1;
    return 0;
  });
  const shown = meds.filter((m) => showStopped || m.status === 'active');

  return (
    <>
      <div className="filterbar">
        <label className="cb">
          <input type="checkbox" checked={showStopped} onChange={(e) => setShowStopped(e.target.checked)} />
          Show discontinued items
        </label>
        <span className="count-note">
          {p.meds.filter((m) => m.status === 'active').length} active · {p.meds.filter((m) => m.status === 'stopped').length} discontinued
        </span>
      </div>

      <div className="panel tight">
        <div className="phead">Medication chart (inpatient)</div>
        <div className="pbody">
          <table className="grid">
            <thead>
              <tr>
                <th>Trade name</th><th>Active substance</th><th>Dose</th><th>Route</th><th>Schedule</th>
                <th>PRN</th><th>Src</th><th>Start</th><th>Stop</th><th>Indication</th><th>Change history</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((m) => (
                <tr key={m.id} className={m.status === 'stopped' ? 'stopped' : ''}>
                  <td>{m.brand || <span className="muted">—</span>}</td>
                  <td><b>{m.generic}</b></td>
                  <td>{m.dose}</td>
                  <td>{m.route}</td>
                  <td>{m.schedule}</td>
                  <td>{m.prn ? 'PRN' : ''}</td>
                  <td title={m.source === 'home' ? 'continued from home list' : 'started in hospital'}>{m.source === 'home' ? 'H' : 'IP'}</td>
                  <td>{m.started}</td>
                  <td>{m.stopped || ''}</td>
                  <td className="wrap small nostrike">{m.indication || ''}</td>
                  <td className="wrap small nostrike">
                    {m.history.map((h, i) => <div key={i}>{h.date} {h.text} <span className="muted">({h.by})</span></div>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel tight">
        <div className="phead">Medication on admission (home list as recorded — source for reconciliation)</div>
        <div className="pbody">
          {p.admissionMeds.length === 0 && <div style={{ padding: 6 }} className="muted">No regular medication reported on admission.</div>}
          {p.admissionMeds.length > 0 && (
            <table className="grid">
              <thead><tr><th>Substance</th><th>Brand</th><th>Dose</th><th>Route</th><th>Schedule</th><th>Note</th></tr></thead>
              <tbody>
                {p.admissionMeds.map((m, i) => (
                  <tr key={i}>
                    <td><b>{m.generic}</b></td><td>{m.brand || ''}</td><td>{m.dose}</td><td>{m.route}</td><td>{m.schedule}</td>
                    <td className="wrap small">{m.note || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
