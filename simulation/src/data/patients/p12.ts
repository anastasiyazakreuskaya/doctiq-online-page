import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P12 — Acute pancreatitis, NPO -> refeeding, analgesia. "My patient".

const p12: Patient = {
  id: 'p12',
  caseNo: '2607478',
  lastName: 'Bennett',
  firstName: 'Chloe',
  sex: 'F',
  dob: '25.10.1984',
  age: 41,
  room: 'IM3-09',
  bed: '1',
  team: 'A',
  attending: 'Ostrowski M., Dr.',
  resident: 'Carter J., Dr.',
  mine: true,
  admitted: '30.06.2026 06:40',
  reason: 'Acute pancreatitis (biliary?) — analgesia, refeeding started, MRCP pending',
  admissionDx: 'Acute pancreatitis, ?biliary aetiology (GB sludge on US), mild per revised Atlanta',
  problems: [
    'Acute pancreatitis — lipase 2140 on adm, mild course, refeeding since 02.07.',
    'Gallbladder sludge + 4 mm stone on US — surgical referral re interval cholecystectomy',
    'MRCP requested (?CBD stone) — awaiting slot, prov. Mon 06.07.',
    'Analgesia weaning — off PCA since 02.07.',
    'Anxiety disorder — home escitalopram continued',
  ],
  allergiesBanner: 'Codeine (nausea)',
  allergies: [
    { substance: 'Codeine', reaction: 'severe nausea/vomiting', noted: 'pt report, ED 30.06.' },
  ],
  flags: ['Diet: light fat-reduced (since 02.07.)'],
  acuity: 2,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Carter J., Dr.',
  admissionMeds: [
    { generic: 'Escitalopram', brand: 'Cipralex', dose: '10 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Ibuprofen', dose: '400 mg', route: 'PO', schedule: 'PRN period pain', note: 'OTC' },
  ],
  meds: [
    {
      id: medId(), generic: 'Ringer lactate', dose: '1000 ml', route: 'IV', schedule: 'per protocol (goal-directed)', prn: false,
      indication: 'pancreatitis fluid resuscitation', status: 'stopped', started: '30.06.', stopped: '02.07.', source: 'inpatient',
      history: [
        { date: '30.06.', text: '3 L over first 24 h, u/o targeted', by: 'Carter' },
        { date: '02.07.', text: 'stopped — drinking well', by: 'Carter' },
      ],
    },
    {
      id: medId(), generic: 'Piritramide PCA', dose: 'bolus 1.5 mg / lockout 10 min', route: 'IV', schedule: 'PCA', prn: false,
      indication: 'severe pain', status: 'stopped', started: '30.06.', stopped: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'PCA stopped, low use last 24 h', by: 'Pain service (Roth)' }],
    },
    {
      id: medId(), generic: 'Metamizole', brand: 'Novalgin', dose: '1 g', route: 'PO', schedule: '1-1-1-1', prn: false,
      indication: 'analgesia', status: 'active', started: '01.07.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Oxycodone', dose: '5 mg', route: 'PO', schedule: 'q6h PRN breakthrough', prn: true,
      indication: 'breakthrough pain', status: 'active', started: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'started as PCA replacement, used x1 since', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Ondansetron', dose: '4 mg', route: 'IV', schedule: 'q8h PRN nausea', prn: true,
      indication: 'nausea', status: 'active', started: '30.06.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Escitalopram', brand: 'Cipralex', dose: '10 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'anxiety disorder', status: 'active', started: '30.06.', source: 'home',
      history: [{ date: '30.06.', text: 'given IV fluids/NPO first day — dose given with sips, ok', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Enoxaparin', brand: 'Clexane', dose: '40 mg', route: 'SC', schedule: '0-0-1', prn: false,
      indication: 'prophylaxis', status: 'active', started: '30.06.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Pantoprazole', dose: '40 mg', route: 'IV', schedule: '1-0-0', prn: false,
      indication: 'stress ulcer proph (habit — questionable indication, review)', status: 'stopped', started: '30.06.', stopped: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'stopped — no indication once eating', by: 'Pharmacy (Chen)' }],
    },
  ],
  vitals: [
    { t: '30.06. 07:00', bp: '112/70', hr: 108, rr: 20, temp: 37.9, spo2: 96, o2: 'RA', pain: 8 },
    { t: '30.06. 14:00', bp: '116/72', hr: 98, rr: 18, spo2: 97, o2: 'RA', pain: 5, note: 'PCA started' },
    { t: '01.07. 06:00', bp: '118/74', hr: 88, rr: 16, temp: 37.4, spo2: 97, o2: 'RA', pain: 4 },
    { t: '01.07. 18:00', bp: '120/74', hr: 82, rr: 16, spo2: 98, o2: 'RA', pain: 3 },
    { t: '02.07. 06:00', bp: '118/72', hr: 78, rr: 14, temp: 36.9, spo2: 98, o2: 'RA', pain: 3 },
    { t: '02.07. 18:00', bp: '116/72', hr: 76, rr: 14, spo2: 98, o2: 'RA', pain: 2 },
    { t: '03.07. 06:00', bp: '118/74', hr: 74, rr: 14, temp: 36.7, spo2: 98, o2: 'RA', pain: 2 },
  ],
  labColumns: ['30.06. 07:10', '30.06. 19:00', '01.07. 06:20', '02.07. 06:15', '03.07. 06:10'],
  labs: [
    panel('Clinical chemistry', [
      lt('Lipase', 'U/l', '13–60', ['2140*HH', '1680*H', '890*H', '312*H', 'PEND']),
      lt('CRP', 'mg/l', '<5', ['64*H', '', '148*H', '112*H', 'PEND']),
      lt('Sodium', 'mmol/l', '136–145', ['136', '137', '138', '139', '']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['3.6', '3.8', '4.0', '4.1', '']),
      lt('Calcium (corr.)', 'mmol/l', '2.2–2.55', ['2.31', '', '2.28', '2.30', '']),
      lt('Creatinine', 'µmol/l', '44–80', ['78', '72', '66', '64', '']),
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['8.2*H', '7.1', '6.4', '5.9', '']),
      lt('Bilirubin total', 'µmol/l', '<21', ['34*H', '', '28*H', '19', '']),
      lt('ALT', 'U/l', '<35', ['186*H', '', '124*H', '88*H', '']),
      lt('AST', 'U/l', '<35', ['142*H', '', '96*H', '61*H', '']),
      lt('GGT', 'U/l', '<40', ['310*H', '', '268*H', '224*H', '']),
      lt('ALP', 'U/l', '35–105', ['148*H', '', '132*H', '121*H', '']),
      lt('Triglycerides', 'mmol/l', '<1.7', ['1.4', '', '', '', '']),
    ]),
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['13.8*H', '12.6*H', '11.4*H', '9.8', '']),
      lt('Haemoglobin', 'g/dl', '12.0–15.5', ['14.8', '13.2', '12.9', '12.8', '']),
      lt('Haematocrit', '%', '36–46', ['44.6', '39.8', '38.6', '38.2', '']),
      lt('Platelets', 'G/l', '150–400', ['268', '', '254', '262', '']),
    ]),
  ],
  agenda: [
    { date: '30.06.', item: 'Abdominal ultrasound', location: 'Radiology US', status: 'done', detail: 'GB sludge + 4 mm stone, CBD 6 mm (upper normal), pancreas oedematous head, no necrosis' },
    { date: '02.07.', item: 'Pain service review — PCA stop', status: 'done' },
    { date: '03.07.', item: 'Advance diet if tolerated; chase lipase/CRP', status: 'planned' },
    { date: '03.07.', item: 'Surgical referral re interval cholecystectomy — send today', status: 'planned' },
    { date: '06.07.', time: 'prov.', item: 'MRCP', location: 'Radiology MRI', status: 'requested', detail: '?CBD stone — bili normalising, may downgrade to OPD if trend continues' },
  ],
  notes: [
    note('30.06.2026 08:10', 'Varga T., Dr.', 'Night resident (cross-cover)', 'admission',
      'Admission note (accepted overnight)',
      `41 F, severe epigastric pain radiating to back since ~23:00, vomiting x4. No alcohol (verified — "maybe a glass of wine monthly"). No prior episodes.
O/E: distressed, epigastric tenderness + guarding, no peritonism. T 37.9, HR 108.
Lipase 2140 (>3x ULN) → acute pancreatitis. LFTs cholestatic pattern, bili 34 → ?biliary.
Rx: NPO, Ringer lactate goal-directed, analgesia (piritramide boluses then PCA per pain service), antiemetic. US in AM. Glasgow/Ranson pending 48h markers.
NB: codeine allergy (nausea) — avoid.`),
    note('30.06.2026 12:45', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round (taking over from night team)',
      `Reviewed. Pain now 5/10 on PCA. HR settling w/ fluids.
US: GB sludge + small stone, CBD 6 mm, oedematous pancreatic head, no collections.
Imp: mild acute biliary pancreatitis (revised Atlanta — no organ failure, no local complications).
Plan: cont. fluids per protocol, PCA, strict NPO today, reassess refeeding tomorrow (early refeeding per guideline once pain ↓ + no nausea). Repeat CRP/lipase in AM. MRCP request submitted (?CBD stone; bili only mildly up — may resolve). Surgical referral for interval chole once settled.`),
    note('01.07.2026 09:30', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 1',
      `S: Pain improving (4/10), hungry(!).
O/E: soft, mild epigastric tenderness, BS present.
Labs: lipase 890 ↓ (expected fall, not prognostic), CRP 148 (48-h CRP <150 → mild), bili 28 ↓.
Plan: start sips + clear fluids today, light fat-reduced diet tomorrow if tolerated. Wean PCA. Escitalopram continues. MRCP slot chase — booking says earliest Mon 06.07. provisional; if LFTs normalise fully, consider cancelling / OPD MRCP instead. D/w attending tomorrow.`),
    note('02.07.2026 09:15', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 2',
      `Tolerated fluids, no nausea. Pain 3/10 → PCA stopped (pain service reviewed), PO metamizole + oxycodone PRN.
Bili 19 (normalised), ALT falling. CRP 112 ↓.
Diet advanced to light fat-reduced. Pantoprazole stopped (pharmacy: no indication).
Plan: if eating ok + labs trend on Fri → d/c over weekend possible, MRCP as OPD, surgical OPD for interval chole within 2–4 wks (guideline: ideally same-admission or early interval for biliary pancreatitis — surgeons to decide). Referral letter to surgery TO DO.`),
    note('02.07.2026 21:20', 'Okonkwo B.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Ate light supper, no pain increase, no nausea. Oxycodone x1 at 17:30 (pain 4 after walking). Mobilising independently. Anxious about "gallbladder surgery" — reassured, questions noted for doctors. Sleeping.`),
  ],
};

export default p12;
