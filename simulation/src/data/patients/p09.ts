import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P09 — TIA/stroke workup on telemetry, MRI TODAY (procedure-today patient). Team B.

const p09: Patient = {
  id: 'p09',
  caseNo: '2607512',
  lastName: 'Sorensen',
  firstName: 'Ingrid',
  sex: 'F',
  dob: '28.02.1957',
  age: 69,
  room: 'IM3-06',
  bed: '2',
  team: 'B',
  attending: 'Lindqvist H., Dr.',
  resident: 'Patel S., Dr.',
  mine: false,
  admitted: '02.07.2026 13:20',
  reason: 'TIA (L arm weakness + dysarthria, resolved) — workup: MRI + carotid US today, telemetry',
  admissionDx: 'Transient ischaemic attack, ABCD2 = 5 (high risk)',
  problems: [
    'TIA yesterday 11:40, symptoms fully resolved within ~45 min — MRI brain + carotid duplex TODAY',
    'Telemetry — paroxysmal AF? nothing captured so far',
    'HTN, hyperlipidaemia — secondary prevention intensified',
    'DAPT loading given (aspirin + clopidogrel) per high-risk TIA pathway',
  ],
  allergiesBanner: 'Contrast media — see list!',
  allergies: [
    { substance: 'Iodinated contrast (CT)', reaction: 'urticaria 2021 (documented, premedication protocol exists)', noted: 'radiology record 2021, confirmed ED 02.07.' },
  ],
  flags: ['Telemetry', 'MRI 11:15 + carotid US 13:30 today'],
  acuity: 2,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Varga T., Dr. (night team)',
  admissionMeds: [
    { generic: 'Ramipril', dose: '5 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Simvastatin', dose: '20 mg', route: 'PO', schedule: '0-0-1' },
    { generic: 'Estradiol patch', dose: '', route: 'TD', schedule: '2x/wk', note: 'HRT — review indication given vascular event' },
  ],
  meds: [
    {
      id: medId(), generic: 'Aspirin', dose: '300 mg load → 100 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'TIA secondary prevention', status: 'active', started: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: '300 mg load ED, then 100 OD', by: 'ED (Osei)' }],
    },
    {
      id: medId(), generic: 'Clopidogrel', brand: 'Plavix', dose: '300 mg load → 75 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'DAPT 21 d (high-risk TIA), then mono', status: 'active', started: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'load + maintenance started', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Atorvastatin', dose: '80 mg', route: 'PO', schedule: '0-0-1', prn: false,
      indication: 'high-intensity statin (replaces simvastatin)', status: 'active', started: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'simvastatin 20 switched to atorvastatin 80', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Simvastatin', dose: '20 mg', route: 'PO', schedule: '0-0-1', prn: false,
      indication: 'lipids', status: 'stopped', started: '02.07.', stopped: '02.07.', source: 'home',
      history: [{ date: '02.07.', text: 'stopped — replaced by high-intensity statin', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Ramipril', dose: '5 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN', status: 'active', started: '02.07.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Estradiol patch', dose: '', route: 'TD', schedule: '2x/wk', prn: false,
      indication: 'HRT — HELD pending stroke workup, d/w gynae', status: 'stopped', started: '02.07.', stopped: '02.07.', source: 'home',
      history: [{ date: '02.07.', text: 'held — vascular event, review necessity', by: 'Patel' }],
    },
  ],
  vitals: [
    { t: '02.07. 13:40', bp: '162/94', hr: 78, rr: 16, temp: 36.7, spo2: 97, o2: 'RA', note: 'NIHSS 0 on arrival' },
    { t: '02.07. 18:00', bp: '156/90', hr: 74, rr: 14, spo2: 97, o2: 'RA' },
    { t: '02.07. 22:00', bp: '150/88', hr: 72, rr: 14, spo2: 98, o2: 'RA' },
    { t: '03.07. 06:00', bp: '148/86', hr: 70, rr: 14, temp: 36.6, spo2: 98, o2: 'RA', note: 'telemetry: SR throughout' },
  ],
  labColumns: ['02.07. 13:50', '03.07. 06:15'],
  labs: [
    panel('Clinical chemistry', [
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['6.9', '5.8']),
      lt('HbA1c', '%', '<6.0', ['6.2*H', '']),
      lt('Cholesterol total', 'mmol/l', '<5.0', ['6.4*H', '']),
      lt('LDL', 'mmol/l', '<3.0 (<1.8 high risk)', ['4.1*H', '']),
      lt('Triglycerides', 'mmol/l', '<1.7', ['1.9*H', '']),
      lt('Creatinine', 'µmol/l', '44–80', ['72', '70']),
      lt('Sodium', 'mmol/l', '136–145', ['140', '139']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['4.0', '4.1']),
      lt('CRP', 'mg/l', '<5', ['2', '']),
    ]),
    panel('Haematology / coagulation', [
      lt('Haemoglobin', 'g/dl', '12.0–15.5', ['13.8', '']),
      lt('Platelets', 'G/l', '150–400', ['264', '']),
      lt('INR', '', '0.9–1.15', ['1.0', '']),
    ]),
  ],
  agenda: [
    { date: '02.07.', time: '14:10', item: 'CT head plain (ED)', location: 'Radiology CT', status: 'done', detail: 'no bleed, no established infarct, no early signs' },
    { date: '02.07.', item: 'ECG + telemetry start', status: 'done' },
    { date: '03.07.', time: '11:15', item: 'MRI brain (DWI)', location: 'Radiology MRI 1', status: 'planned', detail: 'Q: DWI lesion? — safety checklist done, no contrast needed (NB iodinated contrast allergy is CT-relevant, not MRI)' },
    { date: '03.07.', time: '13:30', item: 'Carotid duplex', location: 'Angio lab', status: 'planned' },
    { date: '03.07.', item: 'TTE request (?source) — after carotids', status: 'requested' },
  ],
  notes: [
    note('02.07.2026 14:30', 'Osei K., Dr.', 'ED physician', 'admission',
      'ED clerking — TIA',
      `69 F. Today 11:40 while shopping: sudden L arm heaviness + slurred speech, witnessed by friend. Fully resolved by ~12:25 (friend's account). No headache, no seizure features.
NIHSS 0 on arrival. BP 162/94.
CT head plain: no bleed, no acute changes. (NB contrast allergy documented 2021 — plain only, fine for protocol.)
ABCD2: age 1, BP 1, unilateral weakness 2, duration 45 min 1, DM 0 = 5 → high risk, admit, DAPT pathway: ASA 300 + clopidogrel 300 loaded 14:15.
Referred medicine (stroke unit full — telemetry bed on IM3 w/ stroke team review).`),
    note('02.07.2026 17:50', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Admission review',
      `Seen w/ Dr. Lindqvist. Asymptomatic, NIHSS 0. Neuro exam normal.
Plan (per stroke team phone advice, Dr. Brandt):
- MRI brain DWI + carotid duplex tomorrow (booked 11:15 / 13:30)
- Telemetry ≥48 h (?PAF), TTE request after
- DAPT 21 d then clopidogrel mono; atorvastatin 80 (simva stopped); BP: don't treat acutely unless >180, review home regimen at d/c
- HRT patch held — d/w pt, understands; gynae OPD to review
- HbA1c 6.2 — prediabetes, lifestyle advice + GP f/u
- Fasting lipids in AM (random LDL 4.1)
Stroke team will review remotely after imaging — if DWI positive = minor stroke, may take over care.`),
    note('02.07.2026 22:20', 'Yilmaz D.', 'Nursing (night shift)', 'nursing',
      'Shift note',
      `No neuro changes (hourly neuro obs x4 then 4-hourly — all normal). Telemetry SR. Anxious about "having a stroke in the night" — reassured, call bell in reach. MRI safety questionnaire completed w/ pt (no implants). Fasting from 06:00 NOT required for MRI — normal breakfast ok (pt was told otherwise by someone? clarified w/ radiology).`),
  ],
};

export default p09;
