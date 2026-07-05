import { useState } from 'react';
import { useStore } from '../state/store';
import { SIM_TODAY_SHORT } from '../types';
import type { PatientTab } from './PatientView';
import { LetterChip } from './bits';

export default function WardList({
  onOpen,
  onHandover,
}: {
  onOpen: (id: string, tab?: PatientTab) => void;
  onHandover: () => void;
}) {
  const { state } = useStore();
  const [mineOnly, setMineOnly] = useState(false);
  const [dcOnly, setDcOnly] = useState(false);

  const rows = state.patients.filter((p) => (!mineOnly || p.mine) && (!dcOnly || p.dischargeToday));

  return (
    <>
      <div className="view-title">
        Treatment list — IM3 (detailed) <span className="hint">click a row to open the chart · bed overview under “Occupancy”</span>
      </div>
      <div className="filterbar">
        <label className="cb">
          <input type="checkbox" checked={mineOnly} onChange={(e) => setMineOnly(e.target.checked)} />
          <b>My patients only</b> (Dr. Carter, Team A)
        </label>
        <label className="cb">
          <input type="checkbox" checked={dcOnly} onChange={(e) => setDcOnly(e.target.checked)} />
          Discharge today
        </label>
        <button className="btn" onClick={onHandover}>▶ Start handover mode</button>
        <span className="count-note">{rows.length} of {state.patients.length} patients · updated {SIM_TODAY_SHORT}2026 07:42</span>
      </div>
      <div className="view-scroll">
        <table className="grid">
          <thead>
            <tr>
              <th>Bed</th>
              <th>Name</th>
              <th></th>
              <th>Born / age</th>
              <th>Team</th>
              <th>Adm.</th>
              <th>Reason for admission</th>
              <th title="Acuity">Ac.</th>
              <th>Flags / isolation</th>
              <th>Today</th>
              <th>D/c letter</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const today = p.agenda.filter((a) => a.date === SIM_TODAY_SHORT && a.status !== 'done' && a.status !== 'cancelled');
              return (
                <tr key={p.id} className={'clickable' + (p.dischargeToday ? ' today-row' : '')}
                  onDoubleClick={() => onOpen(p.id)} onClick={() => onOpen(p.id)}
                  title="Open patient chart">
                  <td>{p.room}/{p.bed.split(' ')[0]}</td>
                  <td><b>{p.lastName}, {p.firstName}</b> ({p.sex})</td>
                  <td>{p.mine ? <span className="mine-star" title="My patient">★</span> : ''}</td>
                  <td>{p.dob} ({p.age})</td>
                  <td>{p.team} / {p.attending.split(' ')[0]}</td>
                  <td>{p.admitted.slice(0, 6)}</td>
                  <td className="wrap">{p.reason}</td>
                  <td><span className={'acuity a' + p.acuity} title={'Acuity ' + p.acuity + '/3'} /></td>
                  <td className="wrap small">{p.flags.join(' · ') || <span className="muted">—</span>}</td>
                  <td className="wrap small">
                    {today.length
                      ? today.map((a, i) => <div key={i}>{a.time ? a.time + ' ' : ''}{a.item}</div>)
                      : <span className="muted">—</span>}
                  </td>
                  <td>
                    <LetterChip status={p.letterStatus} dischargeToday={p.dischargeToday} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
