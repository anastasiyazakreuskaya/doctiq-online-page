import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P08 — New atrial fibrillation, rate control + anticoagulation. "My patient".
// TTE today. Clutter: digoxin charted then stopped, overlapping rate agents.

const p08: Patient = {
  id: 'p08',
  caseNo: '2607501',
  lastName: 'Adeyemi',
  firstName: 'George',
  sex: 'M',
  dob: '08.01.1949',
  age: 77,
  room: 'IM3-05',
  bed: '2',
  team: 'A',
  attending: 'Ostrowski M., Dr.',
  resident: 'Carter J., Dr.',
  mine: true,
  admitted: '01.07.2026 17:12',
  reason: 'New AF with rapid ventricular response — rate control, anticoag started; TTE today',
  admissionDx: 'First-diagnosed atrial fibrillation with RVR (HR 148)',
  problems: [
    'New atrial fibrillation — rate controlled on bisoprolol, TTE today',
    'Anticoagulation started (apixaban 5 mg BD) — CHA2DS2-VASc 4',
    'HTN — long-standing',
    'Mild cognitive impairment? — wife reports forgetfulness, MOCA not done',
    'Glaucoma — drops continued',
  ],
  allergiesBanner: 'Sulfa? (unverified)',
  allergies: [
    { substance: 'Sulfamethoxazole (?)', reaction: '"stomach upset" decades ago — pt unsure, likely intolerance not allergy', noted: 'ED triage 01.07.' },
  ],
  flags: ['Telemetry', 'TTE today 09:30'],
  acuity: 2,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Carter J., Dr.',
  admissionMeds: [
    { generic: 'Amlodipine', dose: '10 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Candesartan', dose: '16 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Latanoprost', brand: 'Xalatan', dose: '1 drop', route: 'eye drops', schedule: '0-0-1 both eyes' },
    { generic: 'Multivitamin', dose: '', route: 'PO', schedule: '1-0-0', note: 'OTC' },
  ],
  meds: [
    {
      id: medId(), generic: 'Bisoprolol', dose: '5 mg', route: 'PO', schedule: '1-0-1', prn: false,
      indication: 'AF rate control', status: 'active', started: '01.07.', source: 'inpatient',
      history: [
        { date: '01.07.', text: 'started 2.5 mg BD', by: 'Carter' },
        { date: '02.07.', text: 'uptitrated to 5 mg BD, HR 110–120 rest', by: 'Carter' },
      ],
    },
    {
      id: medId(), generic: 'Digoxin', dose: '0.25 mg', route: 'IV', schedule: 'loading (stat + q6h x2)', prn: false,
      indication: 'rate control adjunct', status: 'stopped', started: '01.07.', stopped: '02.07.', source: 'inpatient',
      history: [
        { date: '01.07.', text: 'load started in ED for RVR 148', by: 'ED (Novak)' },
        { date: '02.07.', text: 'stopped after 2 doses — rate settling on BB, avoid in ?diastolic dysfn until echo', by: 'Ostrowski' },
      ],
    },
    {
      id: medId(), generic: 'Apixaban', brand: 'Eliquis', dose: '5 mg', route: 'PO', schedule: '1-0-1', prn: false,
      indication: 'AF — CHA2DS2-VASc 4, HAS-BLED 2', status: 'active', started: '01.07.', source: 'inpatient',
      history: [{ date: '01.07.', text: 'started full dose (no reduction criteria: 77 y, 82 kg, creat 88)', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Amlodipine', dose: '10 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN', status: 'active', started: '01.07.', source: 'home',
      history: [{ date: '02.07.', text: 'consider ↓ 5 mg if BP low w/ BB uptitration — not changed yet', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Candesartan', dose: '16 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN', status: 'active', started: '01.07.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Latanoprost', brand: 'Xalatan', dose: '1 drop', route: 'eye', schedule: '0-0-1', prn: false,
      indication: 'glaucoma', status: 'active', started: '01.07.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Enoxaparin', brand: 'Clexane', dose: '40 mg', route: 'SC', schedule: '0-0-1', prn: false,
      indication: 'prophylaxis', status: 'stopped', started: '01.07.', stopped: '01.07.', source: 'inpatient',
      history: [{ date: '01.07.', text: 'not needed — therapeutic apixaban started same evening', by: 'Carter' }],
    },
  ],
  vitals: [
    { t: '01.07. 17:30', bp: '138/88', hr: 148, rr: 20, temp: 36.8, spo2: 96, o2: 'RA', note: 'irregular, telemetry started' },
    { t: '01.07. 22:00', bp: '132/84', hr: 126, rr: 18, spo2: 96, o2: 'RA' },
    { t: '02.07. 06:00', bp: '128/80', hr: 118, rr: 16, temp: 36.7, spo2: 96, o2: 'RA' },
    { t: '02.07. 12:00', bp: '126/78', hr: 112, rr: 16, spo2: 97, o2: 'RA' },
    { t: '02.07. 18:00', bp: '122/76', hr: 98, rr: 16, temp: 36.6, spo2: 97, o2: 'RA' },
    { t: '03.07. 06:00', bp: '124/76', hr: 88, rr: 14, temp: 36.6, spo2: 97, o2: 'RA', note: 'still AF on telemetry' },
  ],
  labColumns: ['01.07. 17:45', '02.07. 06:20', '03.07. 06:10'],
  labs: [
    panel('Clinical chemistry', [
      lt('Sodium', 'mmol/l', '136–145', ['139', '140', '139']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['3.9', '4.2', '4.1']),
      lt('Creatinine', 'µmol/l', '59–104', ['88', '90', '87']),
      lt('eGFR (CKD-EPI)', 'ml/min', '>60', ['74', '72', '75']),
      lt('Magnesium', 'mmol/l', '0.66–1.07', ['0.74', '0.81', '']),
      lt('CRP', 'mg/l', '<5', ['3', '', '']),
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['6.1', '', '']),
    ]),
    panel('Cardiac / endocrine', [
      lt('Troponin T hs', 'ng/l', '<14', ['12', '11', '']),
      lt('NT-proBNP', 'ng/l', '<300', ['1240*H', '', '']),
      lt('TSH', 'mU/l', '0.27–4.2', ['1.8', '', '']),
      lt('Digoxin level', 'nmol/l', '0.6–1.2', ['', '1.0', '']),
    ]),
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['7.8', '7.2', '']),
      lt('Haemoglobin', 'g/dl', '13.5–17.2', ['14.6', '14.2', '']),
      lt('Platelets', 'G/l', '150–400', ['218', '224', '']),
      lt('INR', '', '0.9–1.15', ['1.0', '', '']),
    ]),
  ],
  agenda: [
    { date: '01.07.', item: 'ECG x2, telemetry started', status: 'done' },
    { date: '02.07.', item: 'ECG control', status: 'done', detail: 'AF, rate ~110, no ischaemia' },
    { date: '03.07.', time: '09:30', item: 'TTE (transthoracic echo)', location: 'Cardio echo lab', status: 'planned', detail: 'Q: LV fn, LA size, valves — informs rhythm- vs rate-control strategy' },
    { date: '03.07.', item: 'Cardiology opinion after TTE (?rhythm control / ?DCCV as OPD)', status: 'requested' },
  ],
  notes: [
    note('01.07.2026 18:20', 'Novak P., Dr.', 'ED physician', 'admission',
      'ED clerking',
      `77 M, palpitations + mild exertional dyspnoea since this morning. No CP, no syncope. Wife: "his heart was racing at breakfast".
ECG: AF, RVR 148, no acute ST changes. BP 138/88 — stable.
Hx: HTN. No prior AF documented (GP records to confirm). No alcohol excess. No recent illness.
Rx in ED: digoxin load started (0.25 IV), referred medicine for rate control + anticoag + echo. Trop 12 (neg).`),
    note('01.07.2026 21:45', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Admission review (evening)',
      `Seen on ward. Comfortable, HR 120–130 irregular, BP stable.
CHA2DS2-VASc: age 75+ (2), HTN (1), sex 0, = 3... plus vascular? no. Recount: age≥75=2, HTN=1, DM=0, stroke=0 → 3. NB wife mentions "mini-stroke" ~2019?? not in GP summary — if true, score 5 and matters little for decision (anticoag either way). Documented as unverified. [later note: GP confirmed no TIA — see 02.07.]
→ Apixaban 5 mg BD started tonight.
Rate: bisoprolol 2.5 BD started, digoxin load continues overnight (2 more doses), reassess AM.
TSH, Mg sent. Echo requested for 03.07. Telemetry.`),
    note('02.07.2026 09:40', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 1',
      `S: Well, palpitations less noticeable.
O/E: HR 118 rest, irreg irreg, BP 128/80. No failure signs. NT-proBNP 1240 — elevated, ?rate-related vs structural — echo will clarify.
GP record received: no prior AF, no TIA/stroke (wife's recollection likely the 2019 "dizzy spell", vestibular). CHA2DS2-VASc = 3. Anticoag indicated regardless — cont. apixaban.
Plan:
- Bisoprolol ↑ 5 mg BD. Digoxin STOPPED after 2 load doses (attending: avoid until echo clarifies function; level 1.0 anyway).
- TTE tomorrow 09:30 (confirmed).
- If rate <110 sustained + echo ok → d/c Fri/Sat, cardiology OPD re rhythm control (early DCCV within 48 h of onset not pursued — onset >24 h unclear, anticoag-first strategy chosen).
- Wife raises memory concerns — MOCA before discharge? or GP. Deferred to GP w/ letter mention.`),
    note('02.07.2026 16:10', 'Ostrowski M., Dr.', 'Attending IM (Team A)', 'attending',
      'Attending addendum',
      `Seen. New AF, rate-control + anticoagulation strategy appropriate. Echo tomorrow; if normal EF and rate controlled, discharge over weekend with cardiology f/u in 4–6 wks (Holter + strategy discussion). Do not uptitrate BB beyond 5 BD if BP <110 systolic.`),
    note('02.07.2026 20:30', 'Yilmaz D.', 'Nursing (night shift)', 'nursing',
      'Shift note',
      `Telemetry: AF throughout, rate 90–110 evening. No pauses. Pt comfortable, mobilising to bathroom. Wife phoned for update — general info given, detailed update deferred to doctors tomorrow. Sleeping.`),
  ],
};

export default p08;
