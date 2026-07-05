import { useStore } from '../state/store';
import { SIM_TODAY_SHORT } from '../types';
import type { PatientTab } from './PatientView';
import { LetterChip } from './bits';

export default function HandoverView({
  index,
  setIndex,
  onOpen,
}: {
  index: number;
  setIndex: (i: number) => void;
  onOpen: (id: string, tab?: PatientTab) => void;
}) {
  const { state } = useStore();
  const list = state.patients;
  const i = Math.min(Math.max(index, 0), list.length - 1);
  const p = list[i];
  const todayItems = p.agenda.filter((a) => a.date === SIM_TODAY_SHORT);
  const upcoming = p.agenda.filter((a) => a.date > SIM_TODAY_SHORT);

  return (
    <>
      <div className="view-title">Morning handover — all IM3 patients <span className="hint">team goes patient by patient; presenter gives reason for admission + today's plan</span></div>
      <div className="handover-nav">
        <button className="btn" disabled={i === 0} onClick={() => setIndex(i - 1)}>◀ Previous</button>
        <span className="pos">Patient {i + 1} of {list.length}</span>
        <button className="btn primary" disabled={i === list.length - 1} onClick={() => setIndex(i + 1)}>Next ▶</button>
        <span className="muted">presented by: <b>{p.handoverBy}</b></span>
        <span style={{ marginLeft: 'auto' }}>
          <button className="btn" onClick={() => onOpen(p.id)}>Open full chart</button>
        </span>
      </div>
      <div className="handover-layout">
        <div className="handover-list">
          {list.map((q, qi) => (
            <div key={q.id} className={'hl-item' + (qi === i ? ' active' : '')} onClick={() => setIndex(qi)}>
              <div><b>{q.lastName}, {q.firstName}</b> {q.mine ? <span className="mine-star">★</span> : ''}</div>
              <div className="hl-bed">{q.room}/{q.bed.split(' ')[0]} · {q.age} {q.sex} · Team {q.team}{q.dischargeToday ? ' · D/C TODAY' : ''}</div>
            </div>
          ))}
        </div>
        <div className="handover-detail">
          <div className="panel">
            <div className="phead">{p.lastName}, {p.firstName} ({p.sex}, {p.age}) — {p.room}/{p.bed} — case {p.caseNo}</div>
            <div className="pbody">
              <table className="grid" style={{ background: 'transparent' }}>
                <tbody>
                  <tr><td style={{ width: 160 }}><b>Admitted</b></td><td className="wrap">{p.admitted} — day {dayOfStay(p.admitted)} · Team {p.team} ({p.attending} / {p.resident})</td></tr>
                  <tr><td><b>Reason for admission</b></td><td className="wrap">{p.reason}</td></tr>
                  <tr><td><b>Working diagnosis</b></td><td className="wrap">{p.admissionDx}</td></tr>
                  <tr><td><b>Flags</b></td><td className="wrap">{p.flags.length ? p.flags.join(' · ') : '—'}</td></tr>
                  <tr><td><b>Allergies (banner)</b></td><td className="wrap red">{p.allergiesBanner}</td></tr>
                  <tr><td><b>Discharge letter</b></td><td><LetterChip status={p.letterStatus} dischargeToday={p.dischargeToday} />{p.dischargeToday ? <b>  — discharge planned TODAY</b> : ''}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel tight">
            <div className="phead">Today's agenda ({SIM_TODAY_SHORT}2026)</div>
            <div className="pbody">
              {todayItems.length === 0 && <div style={{ padding: 6 }} className="muted">No procedures / tasks scheduled today.</div>}
              {todayItems.length > 0 && (
                <table className="grid">
                  <thead><tr><th>Time</th><th>Item</th><th>Location</th><th>Status</th><th>Detail</th></tr></thead>
                  <tbody>
                    {todayItems.map((a, ai) => (
                      <tr key={ai}>
                        <td>{a.time || '—'}</td>
                        <td className="wrap"><b>{a.item}</b></td>
                        <td>{a.location || ''}</td>
                        <td className={a.status === 'done' ? 'done-dim' : ''}>{a.status}</td>
                        <td className="wrap small">{a.detail || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="panel">
            <div className="phead">Problem list (for context)</div>
            <div className="pbody">
              {p.problems.map((pr, pi) => <div key={pi}>• {pr}</div>)}
            </div>
          </div>

          {upcoming.length > 0 && (
            <div className="panel">
              <div className="phead">Coming days</div>
              <div className="pbody small">
                {upcoming.map((a, ai) => <div key={ai}>{a.date} {a.time || ''} — {a.item} ({a.status})</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function dayOfStay(admitted: string): number {
  // admitted like "27.06.2026 14:32"; sim today = 03.07.2026
  const [d, m] = admitted.split('.').map((x) => parseInt(x, 10));
  const admDay = m === 6 ? d : d + 30; // June/July only in seed
  const todayDay = 3 + 30;
  return todayDay - admDay + 1;
}
