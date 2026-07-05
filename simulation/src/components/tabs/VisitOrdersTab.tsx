import { useState } from 'react';
import type { Patient } from '../../types';
import { SIM_TODAY, SIM_TODAY_SHORT, CURRENT_USER, CURRENT_USER_ROLE } from '../../types';
import { useStore } from '../../state/store';
import { note as makeNote } from '../../data/helpers';
import type { PatientTab } from '../PatientView';

// English replica of the legacy "Visite & Anordnungen" screen:
// left = order entry (category buttons, yellow order box, recipient, target date,
// previous orders table), right = visit documentation (CA/OA pickers, visit-type
// radios, documentation box, previous visit documentations table).

const CATEGORIES = ['Diagnostics', 'Lab – Lab', 'Medication – Medication', 'Care – Care experts', 'Therapies'];
const RECIPIENTS = ['Nursing', 'Physician', 'Lab', 'Radiology', 'Physiotherapy'];
const ORDERERS = ['No orderer recorded', 'Ostrowski M., Dr. (CA)', 'Lindqvist H., Dr. (OA)', 'Carter J., Dr.', 'Patel S., Dr.'];

export default function VisitOrdersTab({ p, setTab }: { p: Patient; setTab: (t: PatientTab) => void }) {
  const { dispatch } = useStore();
  const nowTime = () => new Date().toTimeString().slice(0, 5);

  // --- order entry state ---
  const [ordTime, setOrdTime] = useState(nowTime());
  const [orderedBy, setOrderedBy] = useState(ORDERERS[0]);
  const [verbal, setVerbal] = useState(false);
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [ordText, setOrdText] = useState('');
  const [recipient, setRecipient] = useState(RECIPIENTS[0]);
  const [targetTime, setTargetTime] = useState(nowTime());
  const [ordMsg, setOrdMsg] = useState('');

  // --- visit documentation state ---
  const [caoa, setCaoa] = useState('');
  const [wardDoc, setWardDoc] = useState(CURRENT_USER);
  const [visitType, setVisitType] = useState<'chief' | 'senior' | 'visit'>('visit');
  const [visitText, setVisitText] = useState('');
  const [visMsg, setVisMsg] = useState('');

  const confirmOrder = () => {
    if (!ordText.trim()) return;
    dispatch({
      type: 'ADD_ORDER',
      patientId: p.id,
      order: {
        date: SIM_TODAY_SHORT,
        time: targetTime,
        item: ordText.trim(),
        detail:
          cat + ' → ' + recipient +
          (verbal ? ' · verbal order' : '') +
          (orderedBy !== ORDERERS[0] ? ' · ordered by ' + orderedBy : '') +
          ' · entered ' + SIM_TODAY_SHORT + ' ' + ordTime + ' (Carter)',
        status: 'requested',
      },
    });
    setOrdText('');
    setOrdMsg('Order confirmed and filed ✓');
    setTimeout(() => setOrdMsg(''), 3000);
  };

  const signVisit = () => {
    if (!visitText.trim()) return;
    const label = visitType === 'chief' ? 'Chief physician visit' : visitType === 'senior' ? 'Senior physician visit' : 'Visit';
    const title = label + (caoa && visitType !== 'visit' ? ' (with ' + caoa + ')' : '');
    dispatch({
      type: 'ADD_NOTE',
      patientId: p.id,
      note: makeNote(
        SIM_TODAY + ' ' + nowTime(),
        wardDoc || CURRENT_USER,
        CURRENT_USER_ROLE,
        visitType === 'visit' ? 'progress' : 'attending',
        title,
        visitText,
      ),
    });
    setVisitText('');
    setVisMsg('Visit documentation filed ✓');
    setTimeout(() => setVisMsg(''), 3000);
  };

  const prevOrders = [...p.agenda].sort((a, b) => (b.date + (b.time || '')).localeCompare(a.date + (a.time || '')));
  const prevVisits = [...p.notes].reverse().filter((n) =>
    n.kind === 'progress' || n.kind === 'attending' || n.kind === 'admission' || n.kind === 'night');

  return (
    <div className="visit-layout">
      {/* ============ LEFT: orders ============ */}
      <div className="visit-left">
        <div className="visit-titlerow">
          <b>Visit &amp; orders</b>
          <span className="lnk" style={{ marginLeft: 'auto' }} onClick={() => setTab('notes')}>
            Back to: Progress documentation
          </span>
        </div>

        <div className="visit-row">
          <span className="vlbl">Timepoint</span>
          <input type="text" value={SIM_TODAY} readOnly style={{ width: 74 }} />
          <input type="text" value={ordTime} onChange={(e) => setOrdTime(e.target.value)} style={{ width: 44 }} />
          <button className="btn" onClick={() => setOrdTime(nowTime())}>Now</button>
        </div>
        <div className="visit-row">
          <span className="vlbl">Ordered by</span>
          <select value={orderedBy} onChange={(e) => setOrderedBy(e.target.value)}>
            {ORDERERS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <button className="btn">Other orderer...</button>
        </div>
        <div className="visit-row">
          <span className="vlbl"></span>
          <label className="cb">
            <input type="checkbox" checked={verbal} onChange={(e) => setVerbal(e.target.checked)} />
            Verbal order
          </label>
        </div>

        <div className="catbtns">
          {CATEGORIES.map((c) => (
            <button key={c} className={'catbtn' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>
              {c}{c === 'Diagnostics' || c === 'Therapies' ? ' ▾' : ''}
            </button>
          ))}
        </div>

        <div className="order-entry">
          <div className="visit-row" style={{ alignItems: 'flex-start' }}>
            <span className="vlbl">Order</span>
            <textarea className="yellow" rows={5} style={{ flex: 1 }}
              placeholder={'e.g. "small blood count tomorrow AM", "ECG today", "physio: gait training"'}
              value={ordText} onChange={(e) => setOrdText(e.target.value)} />
          </div>
          <div className="visit-row">
            <span className="vlbl">Recipient</span>
            <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
              {RECIPIENTS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="visit-row">
            <span className="vlbl">Target date</span>
            <input type="text" value={SIM_TODAY} readOnly style={{ width: 74 }} />
            <input type="text" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} style={{ width: 44 }} />
            <button className="btn" onClick={() => setTargetTime(nowTime())}>Now</button>
          </div>
          <div className="visit-row" style={{ justifyContent: 'flex-end' }}>
            {ordMsg && <span className="green">{ordMsg}</span>}
            <button className="btn primary" disabled={!ordText.trim()} onClick={confirmOrder}>
              Confirm and next order
            </button>
          </div>
        </div>

        <div className="visit-prev">
          <div className="visit-prevhead">
            <b>Previous orders</b>
            <span className="lnk" style={{ marginLeft: 'auto' }} onClick={() => setTab('orders')}>
              Open all orders and actions
            </span>
          </div>
          <div className="visit-prevtable">
            <table className="grid">
              <thead>
                <tr><th></th><th>Order + addition</th><th>Target date</th><th>Recipient</th><th>Status</th></tr>
              </thead>
              <tbody>
                {prevOrders.map((a, i) => (
                  <tr key={i}>
                    <td>{a.status === 'done' ? '✔' : a.status === 'cancelled' ? '✖' : '○'}</td>
                    <td className="wrap"><b>{a.item}</b>{a.detail ? <span className="small muted"> — {a.detail}</span> : ''}</td>
                    <td>{a.date} {a.time || ''}</td>
                    <td>{a.location || '—'}</td>
                    <td className={a.status === 'done' ? 'done-dim' : ''}>{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============ RIGHT: visit documentation ============ */}
      <div className="visit-right">
        <div className="visit-titlerow"><b>Visit documentation</b></div>

        <div className="visit-row">
          <span className="vlbl">CA, OA</span>
          <select value={caoa} onChange={(e) => setCaoa(e.target.value)}>
            <option value=""></option>
            <option>Ostrowski M., Dr. (CA)</option>
            <option>Lindqvist H., Dr. (OA)</option>
          </select>
        </div>
        <div className="visit-row">
          <span className="vlbl">Ward physicians</span>
          <select value={wardDoc} onChange={(e) => setWardDoc(e.target.value)}>
            <option>Carter J., Dr.</option>
            <option>Patel S., Dr.</option>
            <option>Varga T., Dr.</option>
          </select>
        </div>

        <div className="visitbox">
          <div className="visitbox-head">VISIT</div>
          <div className="visitbox-radios">
            <label className="cb">
              <input type="radio" name="vt" checked={visitType === 'chief'} onChange={() => setVisitType('chief')} />
              Chief physician visit
            </label>
            <label className="cb">
              <input type="radio" name="vt" checked={visitType === 'senior'} onChange={() => setVisitType('senior')} />
              Senior physician visit
            </label>
            <label className="cb">
              <input type="radio" name="vt" checked={visitType === 'visit'} onChange={() => setVisitType('visit')} />
              Visit
            </label>
          </div>
          <div className="visitbox-inner">
            <div className="visitbox-innerhead">Visit documentation</div>
            <textarea rows={12} value={visitText} onChange={(e) => setVisitText(e.target.value)}
              placeholder={'Today\'s observation / round entry.\nSynthesise from labs, medication chart, prior notes and agenda — no auto-summary exists.'} />
          </div>
          <div className="visit-row" style={{ justifyContent: 'flex-end', margin: '6px 8px' }}>
            {visMsg && <span className="green">{visMsg}</span>}
            <button className="btn primary" disabled={!visitText.trim()} onClick={signVisit}>
              Sign &amp; file
            </button>
          </div>
        </div>

        <div className="visit-prev">
          <div className="visit-prevhead">
            <b>Previous visit documentations</b>
            <span className="lnk" style={{ marginLeft: 'auto' }} onClick={() => setTab('notes')}>
              Open progress documentation
            </span>
          </div>
          <div className="visit-prevtable">
            <table className="grid">
              <thead><tr><th>Timepoint</th><th>Progress documentation</th></tr></thead>
              <tbody>
                {prevVisits.map((n, i) => (
                  <tr key={n.id} className={'clickable' + (i === 0 ? ' sel' : '')} onClick={() => setTab('notes')}>
                    <td>{n.ts}</td>
                    <td className="wrap">
                      <b>{n.title}:</b> {n.text.split('\n')[0].slice(0, 90)}{n.text.length > 90 ? '…' : ''}
                      <span className="small muted"> [{n.author}]</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
