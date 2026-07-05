import type { Patient } from '../../types';
import { SIM_TODAY, SIM_TODAY_SHORT } from '../../types';
import type { PatientTab } from '../PatientView';

// "Case overview" — English replica of the legacy Fallübersicht dashboard:
// three columns of small panels (goals/evaluation, wound & special documentation,
// care planning, scores | lab values, vital signs, progress documentation,
// findings, remarks | patient data, discharge, characteristics, DRG traffic
// light, DRG status, physicians, relatives).

export default function OverviewTab({ p, setTab }: { p: Patient; setTab: (t: PatientTab) => void }) {
  const lastVitals = [...p.vitals].reverse().slice(0, 5);
  const lastNotes = [...p.notes].reverse().slice(0, 3);
  const abnormals = latestAbnormals(p).slice(0, 8);
  const findings = p.agenda.filter((a) => a.status === 'done' && a.detail);
  const unread = Math.max(0, Math.ceil(findings.length / 2) - (p.mine ? 1 : 0));
  const los = lengthOfStay(p.admitted);
  const specialDoc = specialDocumentation(p);
  const scores = deriveScores(p);
  const consultants = uniqueConsultants(p);

  return (
    <div className="fall-cols">
      {/* ---------- left column ---------- */}
      <div className="fall-col">
        <div className="panel">
          <div className="phead"><span className="lnk">Goals and evaluation</span></div>
          <div className="pbody">
            <div className="goal">
              <span className="lnk small">🕐 1: {shortGoal(p)}</span>
              <div className="goal-row">
                <span className="small">{p.admitted.slice(0, 10)}</span>
                <div className="goalbar"><span className="mark" style={{ left: goalPct(los) }} /></div>
                <span className="small">{p.dischargeToday ? SIM_TODAY : 'open'}</span>
              </div>
            </div>
            <div className="goal">
              <span className="lnk small">🕐 2: Mobilisation / self-care at baseline level</span>
              <div className="goal-row">
                <span className="small">{p.admitted.slice(0, 10)}</span>
                <div className="goalbar"><span className="mark" style={{ left: goalPct(los - 1) }} /></div>
                <span className="small">open</span>
              </div>
            </div>
            <div className="small" style={{ textAlign: 'right' }}>
              <span className="lnk">1 outstanding evaluation</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk">Wound &amp; special documentation</span></div>
          <div className="pbody">
            {specialDoc.length === 0 && <span className="muted">No data available.</span>}
            {specialDoc.map((s, i) => (
              <div key={i}><span className="lnk">{s.label}</span> <span className="small muted">{s.since}</span></div>
            ))}
            {specialDoc.length > 0 && (
              <div className="small" style={{ textAlign: 'right', marginTop: 4 }}>
                <span className="lnk">1 overdue assessment</span>
              </div>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk">Care planning</span></div>
          <div className="pbody">
            <div><span className="lnk" onClick={() => setTab('notes')}>{p.problems.length + 2} active care problems</span></div>
            <div style={{ marginTop: 6 }}><span className="lnk" onClick={() => setTab('notes')}>{8 + p.notes.length} signed-off measures</span></div>
            <div><span className="lnk" onClick={() => setTab('orders')}>{p.agenda.filter((a) => a.date === SIM_TODAY_SHORT && a.status !== 'done').length} measures still open today</span></div>
          </div>
        </div>

        <div className="panel tight">
          <div className="phead"><span className="lnk">Assessments / scores</span></div>
          <div className="pbody">
            {scores.length === 0 && <div style={{ padding: 6 }} className="muted">No data available.</div>}
            {scores.length > 0 && (
              <table className="grid">
                <thead><tr><th>Date / time</th><th>Description</th><th>Score</th></tr></thead>
                <tbody>
                  {scores.map((s, i) => (
                    <tr key={i}><td>{s.date}</td><td><span className="lnk">{s.name}</span></td><td>{s.score}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ---------- middle column ---------- */}
      <div className="fall-col">
        <div className="panel tight">
          <div className="phead"><span className="lnk" onClick={() => setTab('labs')}>Laboratory values</span></div>
          <div className="pbody">
            {abnormals.length === 0 && <div style={{ padding: 6 }} className="muted">No data available.</div>}
            {abnormals.length > 0 && (
              <table className="grid">
                <thead><tr><th>Parameter</th><th>Latest</th><th></th><th>Ref.</th></tr></thead>
                <tbody>
                  {abnormals.map((a, i) => (
                    <tr key={i}>
                      <td>{a.name}</td>
                      <td className={'flag-' + a.flag}>{a.value} {a.unit}</td>
                      <td className={'flag-' + a.flag}>{a.flag === 'H' || a.flag === 'HH' ? '↑' : '↓'}</td>
                      <td className="small muted">{a.ref}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="small" style={{ padding: '2px 6px', textAlign: 'right' }}>
              <span className="lnk" onClick={() => setTab('labs')}>open cumulative findings</span>
            </div>
          </div>
        </div>

        <div className="panel tight">
          <div className="phead"><span className="lnk" onClick={() => setTab('vitals')}>Vital signs</span></div>
          <div className="pbody">
            <table className="grid">
              <thead><tr><th>Date/time</th><th>RR</th><th>P</th><th>T</th></tr></thead>
              <tbody>
                {lastVitals.map((v, i) => (
                  <tr key={i}>
                    <td>{v.t}</td><td>{v.bp || ''}</td><td>{v.hr ?? ''}</td>
                    <td className={v.temp != null && v.temp >= 38 ? 'flag-H' : ''}>{v.temp != null ? v.temp.toFixed(1) + ' °C' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk" onClick={() => setTab('notes')}>Progress documentation</span></div>
          <div className="pbody">
            {lastNotes.map((n) => (
              <div key={n.id} className="small" style={{ marginBottom: 3 }}>
                <b>{n.ts}</b> — <span className="lnk" onClick={() => setTab('notes')}>{n.title}</span>
                <span className="muted"> [{n.author}]</span>
              </div>
            ))}
            <div className="small muted">{p.notes.length} entries total — multiple authors/disciplines</div>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk" onClick={() => setTab('orders')}>Findings</span></div>
          <div className="pbody">
            {findings.length} findings, of which {unread} unread.
            <span className="small muted"> (reports live in Orders &amp; agenda / notes)</span>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk">Remarks</span></div>
          <div className="pbody">{p.reason}</div>
        </div>
      </div>

      {/* ---------- right column ---------- */}
      <div className="fall-col">
        <div className="panel">
          <div className="phead"><span className="lnk">Patient data</span></div>
          <div className="pbody">
            <table className="kv"><tbody>
              <tr><td>Name:</td><td><b>{p.lastName}, {p.firstName}</b></td></tr>
              <tr><td>Born:</td><td>{p.dob} ({p.age} y), {p.sex}</td></tr>
              <tr><td>Case no.:</td><td>{p.caseNo}</td></tr>
              <tr><td>Admission:</td><td>{p.admitted}</td></tr>
              <tr><td>Bed:</td><td>IM / IM3 / {p.room} / {p.bed}</td></tr>
              <tr><td>Insurance:</td><td className="muted">SIM-Kasse (synthetic)</td></tr>
            </tbody></table>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk" onClick={() => setTab('letter')}>Discharge</span></div>
          <div className="pbody">
            <table className="kv"><tbody>
              <tr><td>Discharge date:</td><td>{p.dischargeToday ? SIM_TODAY + ' (planned)' : ''}</td></tr>
              <tr><td>Disch. planned:</td><td>{p.dischargeToday ? <b>yes — today</b> : 'not set'}</td></tr>
              <tr><td>Discharge reason:</td><td></td></tr>
              <tr><td>Letter:</td><td><span className="lnk" onClick={() => setTab('letter')}>{p.letterStatus}</span></td></tr>
            </tbody></table>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk">Characteristics</span></div>
          <div className="pbody">
            <table className="kv"><tbody>
              {characteristics(p).map((c, i) => (
                <tr key={i}><td><b>{c.code}:</b></td><td>{c.text}</td></tr>
              ))}
            </tbody></table>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk">DRG traffic light</span></div>
          <div className="pbody">
            <div className="small" style={{ textAlign: 'right' }}>LOS: {los} day{los === 1 ? '' : 's'}</div>
            <div className={los >= 4 ? 'green' : 'red'} style={{ textAlign: 'center' }}>
              {los >= 4 ? 'Working DRG present' : 'No valid DRG'}
            </div>
            <div className="drgbar">
              <span className="seg y" /><span className="seg g" /><span className="seg b" /><span className="seg o" />
              <span className="mark" style={{ left: Math.min(96, (los / 14) * 100) + '%' }} />
            </div>
            <div className="small" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>LGV: 1.0</span><span>MLOS: 6.4</span><span>UGV: 14.0</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk">DRG status</span></div>
          <div className="pbody">
            <table className="kv"><tbody>
              <tr><td>Status:</td><td>{los >= 4 ? 'Working DRG present' : 'No valid DRG'} {los >= 10 ? '(invalid)' : ''}</td></tr>
              <tr><td>Plausibility check:</td><td>All OK</td></tr>
              <tr><td>Current LOS:</td><td>{los} day(s)   MLOS: 6.4  LGV: 1.0  UGV: 14.0</td></tr>
              <tr><td>Case linkage:</td><td></td></tr>
            </tbody></table>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk">Physicians</span></div>
          <div className="pbody">
            <table className="kv"><tbody>
              <tr><td>Attending:</td><td>{p.attending} (Team {p.team})</td></tr>
              <tr><td>Ward resident:</td><td>{p.resident}{p.mine ? ' ★' : ''}</td></tr>
              {consultants.map((c, i) => <tr key={i}><td>Consult:</td><td>{c}</td></tr>)}
            </tbody></table>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="lnk">Relatives</span></div>
          <div className="pbody">
            {p.nextOfKin ? p.nextOfKin : <span className="muted">No data available.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- derivations ----------

function lengthOfStay(admitted: string): number {
  const [d, m] = admitted.split('.').map((x) => parseInt(x, 10));
  const admDay = m === 6 ? d : d + 30;
  return 3 + 30 - admDay + 1;
}

function goalPct(los: number): string {
  return Math.min(92, Math.max(4, (los / (los + 2)) * 100)) + '%';
}

function shortGoal(p: Patient): string {
  const first = p.problems[0] || p.admissionDx;
  const cut = first.split('—')[0].trim();
  return 'Treat: ' + (cut.length > 48 ? cut.slice(0, 48) + '…' : cut);
}

function latestAbnormals(p: Patient) {
  const out: { name: string; value: string; unit: string; flag: string; ref: string }[] = [];
  for (const panel of p.labs) {
    for (const t of panel.tests) {
      for (let i = t.res.length - 1; i >= 0; i--) {
        const r = t.res[i];
        if (r && !r.pend && r.v) {
          if (r.f) out.push({ name: t.name, value: r.v, unit: t.unit, flag: r.f, ref: t.ref });
          break;
        }
      }
    }
  }
  return out;
}

function specialDocumentation(p: Patient) {
  const items: { label: string; since: string }[] = [];
  const f = p.flags.join(' ').toLowerCase();
  if (f.includes('catheter')) items.push({ label: 'DK – urinary catheter', since: 'since 28.06.' });
  if (f.includes('isolation')) items.push({ label: 'Isolation precautions (see flags)', since: '' });
  if (f.includes('demarcation')) items.push({ label: 'WD – wound documentation lower leg L (demarcation)', since: 'since 28.06.' });
  if (f.includes('npo')) items.push({ label: 'MS – NPO status pre-intervention', since: '' });
  if (f.includes('telemetry')) items.push({ label: 'Telemetry monitoring', since: '' });
  return items;
}

function deriveScores(p: Patient) {
  const rows: { date: string; name: string; score: string }[] = [];
  const all = p.notes.map((n) => n.text).join(' ');
  const falls = /falls risk assessment: (\d+)/i.exec(all);
  if (falls) rows.push({ date: p.admitted.slice(0, 6) + ' 20:00', name: 'Falls risk assessment', score: falls[1] + ' pts' });
  else if (p.flags.some((x) => /falls/i.test(x))) rows.push({ date: p.admitted.slice(0, 6), name: 'Falls risk assessment', score: 'high' });
  const braden = /Braden (\d+)/i.exec(all);
  if (braden) rows.push({ date: p.admitted.slice(0, 6), name: 'Braden scale (pressure sore risk)', score: braden[1] });
  if (/CAM/i.test(all)) rows.push({ date: '02.07.', name: 'CAM (delirium screening)', score: 'improving' });
  if (/MUST 2/.test(all)) rows.push({ date: '29.06.', name: 'MUST (malnutrition)', score: '2' });
  return rows;
}

function characteristics(p: Patient) {
  const list: { code: string; text: string }[] = [];
  const probs = p.problems.join(' ').toLowerCase();
  if (probs.includes('diabet') || probs.includes('t2dm') || probs.includes('t1dm') || probs.includes('dka')) list.push({ code: 'DIAB', text: 'Diabetes' });
  if (p.flags.some((f) => /isolation/i.test(f))) list.push({ code: 'ISOL', text: p.flags.find((f) => /isolation/i.test(f))! });
  if (p.flags.some((f) => /falls/i.test(f))) list.push({ code: 'FALL', text: 'Falls risk' });
  if (p.allergiesBanner && !/NKDA|No known/i.test(p.allergiesBanner)) list.push({ code: 'ALRG', text: p.allergiesBanner });
  if (p.meds.some((m) => m.status === 'active' && /apixaban|warfarin|phenprocoumon/i.test(m.generic))) list.push({ code: 'ACOAG', text: 'Therapeutic anticoagulation' });
  if (list.length === 0) list.push({ code: '—', text: 'No entries' });
  return list;
}

function uniqueConsultants(p: Patient) {
  const set = new Set<string>();
  for (const n of p.notes) if (n.kind === 'consult') set.add(n.author + ' (' + n.role + ')');
  return [...set];
}
