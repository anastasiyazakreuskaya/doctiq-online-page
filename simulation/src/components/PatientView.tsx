import { useStore } from '../state/store';
import OverviewTab from './tabs/OverviewTab';
import VitalsTab from './tabs/VitalsTab';
import LabsTab from './tabs/LabsTab';
import MedsTab from './tabs/MedsTab';
import NotesTab from './tabs/NotesTab';
import VisitOrdersTab from './tabs/VisitOrdersTab';
import OrdersTab from './tabs/OrdersTab';
import LetterTab from './tabs/LetterTab';
import { LetterChip } from './bits';

export type PatientTab = 'overview' | 'vitals' | 'labs' | 'meds' | 'visit' | 'notes' | 'orders' | 'letter';

export default function PatientView({
  id,
  tab,
  setTab,
  onBack,
}: {
  id: string;
  tab: PatientTab;
  setTab: (t: PatientTab) => void;
  onBack: () => void;
}) {
  const { state } = useStore();
  const p = state.patients.find((x) => x.id === id);
  if (!p) return <div style={{ padding: 20 }}>Patient not found. <span className="lnk" onClick={onBack}>Back to census</span></div>;

  const pendingLabs = p.labs.flatMap((pl) => pl.tests).some((t) => t.res.some((r) => r?.pend));

  const tabs: { key: PatientTab; label: string; badge?: string }[] = [
    { key: 'overview', label: 'Case overview' },
    { key: 'vitals', label: 'Fever chart / vitals' },
    { key: 'labs', label: 'Laboratory', badge: pendingLabs ? '!' : undefined },
    { key: 'meds', label: 'Medication' },
    { key: 'visit', label: 'Visit & orders' },
    { key: 'notes', label: 'Progress documentation', badge: String(p.notes.length) },
    { key: 'orders', label: 'Orders & agenda' },
    { key: 'letter', label: 'Discharge letter', badge: p.letterStatus !== 'none' ? '•' : undefined },
  ];

  return (
    <>
      <div className="pbanner">
        <div className="avatar">👤</div>
        <div>
          <div className="pname">{p.lastName}, {p.firstName} ({p.sex})</div>
          <div className="pmeta">*{p.dob} ({p.age} y) · Case no.: <b>{p.caseNo}</b></div>
          <div className="pmeta">Allergies: <span className="allergy">{p.allergiesBanner}</span></div>
          <div className="flags">
            {p.flags.map((f, i) => (
              <span key={i} className={/isolation|falls|sitter/i.test(f) ? '' : 'neutral'}>{f}</span>
            ))}
          </div>
        </div>
        <dl>
          <dt>Admission:</dt><dd>{p.admitted}</dd>
          <dt>Bed:</dt><dd>IM / IM3 / {p.room} / {p.bed}</dd>
          <dt>Team:</dt><dd>{p.team} — {p.attending}</dd>
          <dt>Resident:</dt><dd>{p.resident}{p.mine ? ' ★' : ''}</dd>
        </dl>
        <dl>
          <dt>Diagnosis:</dt><dd style={{ maxWidth: 340, whiteSpace: 'normal' }}>{p.admissionDx}</dd>
          <dt>Discharge:</dt><dd>{p.dischargeToday ? 'planned TODAY' : 'not set'}</dd>
          <dt>D/c letter:</dt><dd><LetterChip status={p.letterStatus} dischargeToday={p.dischargeToday} /></dd>
        </dl>
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn" onClick={onBack}>◀ Census</button>
        </div>
      </div>
      <div className="tabstrip">
        {tabs.map((t) => (
          <div key={t.key} className={'tab' + (t.key === tab ? ' active' : '')} onClick={() => setTab(t.key)}>
            {t.label}{t.badge ? <span className="badge">{t.badge}</span> : null}
          </div>
        ))}
      </div>
      <div className="view-scroll">
        {tab === 'overview' && <OverviewTab p={p} setTab={setTab} />}
        {tab === 'vitals' && <VitalsTab p={p} />}
        {tab === 'labs' && <LabsTab p={p} />}
        {tab === 'meds' && <MedsTab p={p} />}
        {tab === 'visit' && <VisitOrdersTab p={p} setTab={setTab} />}
        {tab === 'notes' && <NotesTab p={p} setTab={setTab} />}
        {tab === 'orders' && <OrdersTab p={p} />}
        {tab === 'letter' && <LetterTab p={p} setTab={setTab} />}
      </div>
    </>
  );
}
