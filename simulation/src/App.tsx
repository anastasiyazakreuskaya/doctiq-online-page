import { useState } from 'react';
import { CURRENT_LOGIN, SIM_NOW, SIM_TODAY_SHORT } from './types';
import OccupancyView from './components/OccupancyView';
import WardList from './components/WardList';
import HandoverView from './components/HandoverView';
import AgendaView from './components/AgendaView';
import PatientView, { PatientTab } from './components/PatientView';
import { useStore } from './state/store';

export type Route =
  | { view: 'occupancy' }
  | { view: 'census' }
  | { view: 'handover'; index: number }
  | { view: 'agenda' }
  | { view: 'or-schedule' }
  | { view: 'or-workflow' }
  | { view: 'patient'; id: string; tab: PatientTab };

export default function App() {
  const [route, setRoute] = useState<Route>({ view: 'occupancy' });
  const [lastPatient, setLastPatient] = useState<string | null>(null);
  const { state } = useStore();

  const openPatient = (id: string, tab: PatientTab = 'overview') => {
    setLastPatient(id);
    setRoute({ view: 'patient', id, tab });
  };

  // Sidebar mirroring the CGM MEDICO rail (Belegung, Behandlungslisten, Arbeitsliste,
  // Termine Leistungsstelle, Stationsakte, OP-Termine, OP-Ablauf) — in English.
  const railItems: { key: string; icon: string; label: string; active: boolean; go: () => void }[] = [
    { key: 'occupancy', icon: '🛏', label: 'Occupancy', active: route.view === 'occupancy', go: () => setRoute({ view: 'occupancy' }) },
    { key: 'census', icon: '📚', label: 'Treatment lists', active: route.view === 'census', go: () => setRoute({ view: 'census' }) },
    { key: 'worklist', icon: '🗂', label: 'Worklist (handover)', active: route.view === 'handover', go: () => setRoute({ view: 'handover', index: 0 }) },
    { key: 'appointments', icon: '📅', label: 'Appointments service unit', active: route.view === 'agenda', go: () => setRoute({ view: 'agenda' }) },
    {
      key: 'chart', icon: '🗄', label: 'Ward chart', active: route.view === 'patient',
      go: () => { if (lastPatient) openPatient(lastPatient); },
    },
    { key: 'or-schedule', icon: '📆', label: 'OR schedule', active: route.view === 'or-schedule', go: () => setRoute({ view: 'or-schedule' }) },
    { key: 'or-workflow', icon: '⏱', label: 'OR workflow', active: route.view === 'or-workflow', go: () => setRoute({ view: 'or-workflow' }) },
  ];

  return (
    <div className="app">
      <div className="titlebar">
        <span className="brand">MEDICUS</span>
        <span className="ctx">Clinical Workplace — Internal Medicine Ward 3 (IM3)</span>
        <span className="spacer" />
        <span className="clock">Fri {SIM_NOW}</span>
        <span className="user">👤 {CURRENT_LOGIN}</span>
      </div>
      <div className="toolbar">
        <button className="toolbtn" onClick={() => setRoute({ view: 'occupancy' })}>⬅ ➡ 🏠</button>
        <span className="sep" />
        <button className="toolbtn" onClick={() => setRoute({ view: 'occupancy' })}>🛏 Occupancy</button>
        <button className="toolbtn" onClick={() => setRoute({ view: 'handover', index: 0 })}>🗂 Handover</button>
        <button className="toolbtn" onClick={() => setRoute({ view: 'agenda' })}>📅 Agenda</button>
        <span className="sep" />
        <button className="toolbtn" title="Simulation — no printing">🖨 Print</button>
        <button className="toolbtn" title="Simulation — data resets on reload">⟳ Refresh</button>
      </div>
      <div className="body-row">
        <div className="rail">
          {railItems.map((r) => (
            <div key={r.key} className={'rail-item' + (r.active ? ' active' : '')} onClick={r.go}
              title={r.key === 'chart' && !lastPatient ? 'Open a patient from Occupancy first' : r.label}>
              <span className="ric">{r.icon}</span>
              {r.label}
            </div>
          ))}
          <div className="rail-footer">
            MEDICUS 22.10<br />SIMULATION<br />synthetic data only<br />resets on reload
          </div>
        </div>
        <div className="main">
          {route.view === 'occupancy' && <OccupancyView onOpen={openPatient} />}
          {route.view === 'census' && <WardList onOpen={openPatient} onHandover={() => setRoute({ view: 'handover', index: 0 })} />}
          {route.view === 'handover' && (
            <HandoverView
              index={route.index}
              setIndex={(i) => setRoute({ view: 'handover', index: i })}
              onOpen={openPatient}
            />
          )}
          {route.view === 'agenda' && <AgendaView onOpen={openPatient} />}
          {route.view === 'or-schedule' && <ORStub kind="schedule" onOpen={openPatient} />}
          {route.view === 'or-workflow' && <ORStub kind="workflow" onOpen={openPatient} />}
          {route.view === 'patient' && (
            <PatientView
              id={route.id}
              tab={route.tab}
              setTab={(t) => setRoute({ view: 'patient', id: route.id, tab: t })}
              onBack={() => setRoute({ view: 'occupancy' })}
            />
          )}
        </div>
      </div>
      <div className="statusbar">
        <span>{state.patients.length} inpatients IM3</span>
        <span>{state.patients.filter((p) => p.mine).length} assigned to {CURRENT_LOGIN}</span>
        <span>{state.patients.filter((p) => p.dischargeToday).length} discharges planned today</span>
        <span className="muted">Front-end simulation — no real patient data (PHI-free)</span>
      </div>
    </div>
  );
}

// OR views exist on the rail for authenticity; IM3 is a medical ward, so they
// surface the interventional appointments at service units instead of OR cases.
function ORStub({ kind, onOpen }: { kind: 'schedule' | 'workflow'; onOpen: (id: string, tab?: PatientTab) => void }) {
  const { state } = useStore();
  const procs = state.patients
    .flatMap((p) => p.agenda
      .filter((a) => a.date === SIM_TODAY_SHORT && a.location)
      .map((a) => ({ p, a })))
    .sort((x, y) => (x.a.time || '99').localeCompare(y.a.time || '99'));
  return (
    <>
      <div className="view-title">{kind === 'schedule' ? 'OR schedule' : 'OR workflow'} — {SIM_TODAY_SHORT}2026</div>
      <div className="view-scroll">
        <div className="panel">
          <div className="phead">No OR cases for IM3 today</div>
          <div className="pbody muted">Internal Medicine Ward 3 has no cases in the operating suite today.</div>
        </div>
        <div className="panel tight">
          <div className="phead">Interventional / diagnostic appointments at service units (today)</div>
          <div className="pbody">
            <table className="grid">
              <thead><tr><th>Time</th><th>Patient</th><th>Procedure</th><th>Service unit</th><th>Status</th></tr></thead>
              <tbody>
                {procs.map(({ p, a }, i) => (
                  <tr key={i} className="clickable" onClick={() => onOpen(p.id, 'orders')}>
                    <td>{a.time || '—'}</td>
                    <td><b>{p.lastName}, {p.firstName}</b></td>
                    <td className="wrap">{a.item}</td>
                    <td>{a.location}</td>
                    <td className={a.status === 'done' ? 'done-dim' : ''}>{a.status}</td>
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
