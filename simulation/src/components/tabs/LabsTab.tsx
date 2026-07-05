import type { Patient } from '../../types';

// Cumulative lab table, legacy style: tests as rows, sample datetimes as columns,
// flags H/L in colour, pending cells highlighted. The relevant trend hides in the noise.

export default function LabsTab({ p }: { p: Patient }) {
  return (
    <>
      <div className="view-title">
        Cumulative findings <span className="hint">columns = sample times · H/L flags per reference range · PEND = pending at lab</span>
      </div>
      <div className="labwrap" style={{ padding: '0 8px 8px' }}>
        <table className="grid labs">
          <thead>
            <tr>
              <th className="rowhead">Parameter</th>
              <th>Unit</th>
              <th>Reference</th>
              {p.labColumns.map((c, i) => <th key={i}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {p.labs.map((panel, pi) => (
              <Rows key={pi} title={panel.panel} tests={panel.tests} nCols={p.labColumns.length} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Rows({ title, tests, nCols }: { title: string; tests: Patient['labs'][0]['tests']; nCols: number }) {
  return (
    <>
      <tr className="paneltitle">
        <td className="rowhead" style={{ background: '#a9a9e0' }}>{title}</td>
        <td colSpan={nCols + 2}></td>
      </tr>
      {tests.map((t, ti) => (
        <tr key={ti}>
          <td className="rowhead">{t.name}</td>
          <td>{t.unit}</td>
          <td className="small muted">{t.ref}</td>
          {Array.from({ length: nCols }).map((_, ci) => {
            const r = t.res[ci];
            if (!r) return <td key={ci}></td>;
            if (r.pend) return <td key={ci} className="pend">PEND</td>;
            return (
              <td key={ci} className={r.f ? 'flag-' + r.f : ''}>
                {r.v}{r.f ? ' ' + (r.f === 'HH' ? '↑↑' : r.f === 'LL' ? '↓↓' : r.f === 'H' ? '↑' : '↓') : ''}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
