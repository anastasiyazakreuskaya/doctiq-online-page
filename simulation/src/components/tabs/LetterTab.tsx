import { useState } from 'react';
import type { Patient, HomeMed, Medication, LetterStatus } from '../../types';
import { useStore } from '../../state/store';
import type { PatientTab } from '../PatientView';
import { LetterChip } from '../bits';

// Discharge letter workspace: editor left, reconciliation + source pointers right.
// The reconciliation table shows WHAT changed vs admission; turning it into a
// coherent discharge plan (and catching landmines like allergy conflicts) is the
// clinician's work — deliberately not automated.

export default function LetterTab({ p, setTab }: { p: Patient; setTab: (t: PatientTab) => void }) {
  const { dispatch } = useStore();
  const [text, setText] = useState(p.letterText);
  const [status, setStatus] = useState<LetterStatus>(p.letterStatus === 'none' ? 'draft' : p.letterStatus);
  const [saved, setSaved] = useState(false);

  const save = () => {
    dispatch({ type: 'SAVE_LETTER', patientId: p.id, text, status });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const recon = reconcile(p.admissionMeds, p.meds);

  return (
    <div className="letter-layout">
      <div className="letter-left">
        <div className="filterbar">
          <b>Discharge letter</b>
          <LetterChip status={p.letterStatus} dischargeToday={p.dischargeToday} />
          <span className="lbl">Set status:</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as LetterStatus)}>
            <option value="planned">planned</option>
            <option value="draft">draft</option>
            <option value="ready">ready for sign-off</option>
          </select>
          <button className="btn primary" onClick={save}>Save letter</button>
          {saved && <span className="green">Saved ✓</span>}
        </div>
        <textarea
          className="yellow"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={emptyTemplate(p)}
        />
        <div className="letter-actions small muted">
          No auto-summary exists. Sources: <span className="lnk" onClick={() => setTab('notes')}>progress notes ({p.notes.length})</span> ·{' '}
          <span className="lnk" onClick={() => setTab('labs')}>laboratory</span> ·{' '}
          <span className="lnk" onClick={() => setTab('meds')}>medication chart</span> ·{' '}
          <span className="lnk" onClick={() => setTab('orders')}>orders/agenda</span> — and the reconciliation table on the right.
        </div>
      </div>
      <div className="letter-right">
        <div className="panel tight">
          <div className="phead">Medication reconciliation — current inpatient vs admission list</div>
          <div className="pbody">
            <table className="grid">
              <thead><tr><th>Substance</th><th>Admission (home)</th><th>Current (inpatient)</th><th>Δ</th></tr></thead>
              <tbody>
                {recon.map((r, i) => (
                  <tr key={i}>
                    <td className="wrap"><b>{r.name}</b></td>
                    <td className="wrap small">{r.home || <span className="muted">—</span>}</td>
                    <td className="wrap small">{r.current || <span className="muted">—</span>}</td>
                    <td className={'wrap recon-' + r.cls}>{r.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="small muted" style={{ padding: '4px 6px' }}>
              Machine comparison by name only — verify doses, PRN items and <b>allergies</b> yourself
              (<span className="lnk" onClick={() => setTab('overview')}>allergy list</span>). Inpatient-only items
              (heparins, sliding scales, hypnotics) usually do NOT go home.
            </div>
          </div>
        </div>
        <div className="panel tight">
          <div className="phead">Allergies / ADRs (list)</div>
          <div className="pbody" style={{ padding: 6 }}>
            {p.allergies.length === 0 && <span className="muted">No entries.</span>}
            {p.allergies.map((a, i) => (
              <div key={i}><b className={a.substance.startsWith('No known') ? '' : 'red'}>{a.substance}</b> — {a.reaction} <span className="muted small">[{a.noted}]</span></div>
            ))}
            <div className="small muted" style={{ marginTop: 4 }}>Banner shows: “{p.allergiesBanner}”</div>
          </div>
        </div>
        <div className="panel">
          <div className="phead">Problem list (copy basis for diagnoses)</div>
          <div className="pbody">
            {p.problems.map((pr, i) => <div key={i}>• {pr}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReconRow { name: string; home?: string; current?: string; delta: string; cls: 'new' | 'stop' | 'chg' | 'same'; }

function key(s: string): string {
  return s.toLowerCase().split(/[\s/(]/)[0];
}

function fmtHome(m: HomeMed): string {
  return [m.brand ? m.brand + ' /' : '', m.dose, m.route, m.schedule, m.note ? '(' + m.note + ')' : ''].filter(Boolean).join(' ');
}
function fmtCur(m: Medication): string {
  return [m.brand ? m.brand + ' /' : '', m.dose, m.route, m.schedule, m.prn ? 'PRN' : ''].filter(Boolean).join(' ');
}

function reconcile(home: HomeMed[], meds: Medication[]): ReconRow[] {
  const active = meds.filter((m) => m.status === 'active');
  const rows: ReconRow[] = [];
  const usedActive = new Set<string>();

  for (const h of home) {
    const match = active.find(
      (m) => key(m.generic) === key(h.generic) || (!!m.brand && !!h.brand && key(m.brand) === key(h.brand)),
    );
    if (match) {
      usedActive.add(match.id);
      const changed =
        match.dose !== h.dose || match.route !== h.route || match.schedule !== h.schedule;
      rows.push({
        name: h.generic,
        home: fmtHome(h),
        current: fmtCur(match),
        delta: changed ? 'CHANGED — check dose/route/schedule' : 'continued unchanged',
        cls: changed ? 'chg' : 'same',
      });
    } else {
      const stoppedTwin = meds.find(
        (m) => m.status === 'stopped' && (key(m.generic) === key(h.generic) || (!!m.brand && !!h.brand && key(m.brand) === key(h.brand))),
      );
      rows.push({
        name: h.generic,
        home: fmtHome(h),
        current: stoppedTwin ? 'stopped ' + (stoppedTwin.stopped || '') : undefined,
        delta: 'STOPPED / not continued — decide for discharge',
        cls: 'stop',
      });
    }
  }
  for (const m of active) {
    if (usedActive.has(m.id)) continue;
    rows.push({
      name: m.generic,
      current: fmtCur(m),
      delta: 'NEW during stay — continue after discharge?',
      cls: 'new',
    });
  }
  return rows;
}

function emptyTemplate(p: Patient): string {
  return `DISCHARGE LETTER (not started)

Dear colleague,

Re: ${p.firstName} ${p.lastName}, *${p.dob}, case ${p.caseNo}
Admission: ${p.admitted.slice(0, 10)} — Discharge: ___

Diagnoses:
1. ...

Course:
...

Discharge medication (incl. changes vs admission):
...

Follow-up / recommendations:
...

Kind regards,`;
}
