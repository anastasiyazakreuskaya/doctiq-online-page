import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P03 — CAP with early sepsis, higher acuity. "My patient".
// LANDMINE: penicillin allergy documented in allergy list & nursing form,
// while piperacillin/tazobactam sits active on the med list. Banner says "see list".

const p03: Patient = {
  id: 'p03',
  caseNo: '2607498',
  lastName: 'Delgado',
  firstName: 'Rosa',
  sex: 'F',
  dob: '03.09.1967',
  age: 58,
  room: 'IM3-02',
  bed: '1',
  team: 'A',
  attending: 'Ostrowski M., Dr.',
  resident: 'Carter J., Dr.',
  mine: true,
  admitted: '01.07.2026 03:47',
  reason: 'CAP right lower lobe, early sepsis — IV antibiotics, close obs',
  admissionDx: 'Community-acquired pneumonia RLL, sepsis (qSOFA 2 on arrival)',
  problems: [
    'CAP right lower lobe — IV antibiotics d3, blood cultures pending',
    'Sepsis on admission — lactate cleared, off pressor-watch',
    'Type 2 diabetes — sliding scale while acutely unwell',
    'AKI stage 1 on admission — resolved with fluids',
    'Smoker 30 py — cessation advice given',
  ],
  allergiesBanner: 'See allergy list',
  allergies: [
    { substance: 'Penicillin', reaction: 'rash + facial swelling as teenager (per patient, no records)', noted: 'nursing admission form 01.07.' },
    { substance: 'Ibuprofen', reaction: 'dyspepsia', noted: 'ED triage 01.07.' },
  ],
  flags: ['Obs q4h', 'Sepsis pathway (de-escalated 02.07.)'],
  acuity: 3,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Carter J., Dr.',
  nextOfKin: 'Husband: M. Delgado, tel. 0176-555 0918 — wants call if deterioration (documented 01.07.)',
  admissionMeds: [
    { generic: 'Metformin', dose: '1000 mg', route: 'PO', schedule: '1-0-1' },
    { generic: 'Sitagliptin', brand: 'Januvia', dose: '100 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Atorvastatin', dose: '20 mg', route: 'PO', schedule: '0-0-1' },
    { generic: 'Salbutamol', brand: 'Ventolin', dose: '100 µg', route: 'INH', schedule: 'PRN', note: '"for colds", no formal asthma dx' },
  ],
  meds: [
    {
      id: medId(), generic: 'Piperacillin/Tazobactam', brand: 'Tazobac', dose: '4.5 g', route: 'IV', schedule: 'q8h (06/14/22)', prn: false,
      indication: 'CAP/sepsis empirical', status: 'active', started: '01.07.', source: 'inpatient',
      history: [{ date: '01.07.', text: 'started empirically in ED (sepsis bundle)', by: 'ED (Novak)' }],
    },
    {
      id: medId(), generic: 'Clarithromycin', dose: '500 mg', route: 'PO', schedule: '1-0-1', prn: false,
      indication: 'atypical cover', status: 'active', started: '01.07.', source: 'inpatient',
      history: [{ date: '01.07.', text: 'started — atypical cover, review with legionella Ag', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Sodium chloride 0.9 %', dose: '1000 ml', route: 'IV', schedule: 'over 8 h', prn: false,
      indication: 'sepsis fluids', status: 'stopped', started: '01.07.', stopped: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'stopped — euvolaemic, drinking', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Metformin', dose: '1000 mg', route: 'PO', schedule: '1-0-1', prn: false,
      indication: 'T2DM', status: 'stopped', started: '01.07.', stopped: '01.07.', source: 'home',
      history: [{ date: '01.07.', text: 'held — AKI + sepsis, restart when creat back to baseline', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Insulin aspart', brand: 'NovoRapid', dose: 'per sliding scale', route: 'SC', schedule: 'AC meals + 22:00 per BG', prn: false,
      indication: 'BG control while metformin held', status: 'active', started: '01.07.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Sitagliptin', brand: 'Januvia', dose: '100 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'T2DM', status: 'active', started: '01.07.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Atorvastatin', dose: '20 mg', route: 'PO', schedule: '0-0-1', prn: false,
      indication: 'lipids', status: 'active', started: '01.07.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Enoxaparin', brand: 'Clexane', dose: '40 mg', route: 'SC', schedule: '0-0-1', prn: false,
      indication: 'thromboprophylaxis', status: 'active', started: '01.07.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Paracetamol', dose: '1 g', route: 'IV/PO', schedule: 'q6h PRN fever/pain', prn: true,
      indication: 'fever', status: 'active', started: '01.07.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Salbutamol', brand: 'Ventolin', dose: '2.5 mg', route: 'NEB', schedule: 'q6h PRN wheeze', prn: true,
      indication: 'wheeze', status: 'active', started: '01.07.', source: 'inpatient', history: [],
    },
  ],
  vitals: [
    { t: '01.07. 04:10', bp: '96/54', hr: 118, rr: 28, temp: 39.2, spo2: 88, o2: '4 L NC', note: 'qSOFA 2, sepsis pathway' },
    { t: '01.07. 06:00', bp: '104/60', hr: 108, rr: 26, temp: 38.9, spo2: 92, o2: '4 L NC', note: 'post 1 L fluids' },
    { t: '01.07. 10:00', bp: '108/62', hr: 102, rr: 24, temp: 38.4, spo2: 93, o2: '3 L NC' },
    { t: '01.07. 14:00', bp: '112/66', hr: 98, rr: 22, temp: 38.1, spo2: 93, o2: '3 L NC' },
    { t: '01.07. 18:00', bp: '110/64', hr: 96, rr: 22, temp: 38.6, spo2: 92, o2: '3 L NC' },
    { t: '01.07. 22:00', bp: '114/68', hr: 92, rr: 20, temp: 37.9, spo2: 93, o2: '2 L NC' },
    { t: '02.07. 06:00', bp: '116/70', hr: 90, rr: 20, temp: 37.6, spo2: 94, o2: '2 L NC' },
    { t: '02.07. 12:00', bp: '118/72', hr: 88, rr: 18, temp: 37.8, spo2: 94, o2: '2 L NC' },
    { t: '02.07. 18:00', bp: '120/72', hr: 84, rr: 18, temp: 37.4, spo2: 95, o2: '2 L NC' },
    { t: '02.07. 22:00', bp: '118/70', hr: 82, rr: 18, temp: 37.2, spo2: 95, o2: '1 L NC' },
    { t: '03.07. 06:10', bp: '122/74', hr: 80, rr: 16, temp: 37.1, spo2: 95, o2: '1 L NC' },
  ],
  labColumns: ['01.07. 04:30', '01.07. 16:00', '02.07. 06:20', '03.07. 06:10'],
  labs: [
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['17.8*H', '16.2*H', '13.4*H', '11.2*H']),
      lt('Neutrophils', 'G/l', '1.8–7.0', ['15.9*H', '', '11.8*H', '9.4*H']),
      lt('Haemoglobin', 'g/dl', '12.0–15.5', ['13.9', '12.8', '12.6', '12.7']),
      lt('Platelets', 'G/l', '150–400', ['198', '', '176', '204']),
    ]),
    panel('Clinical chemistry', [
      lt('Sodium', 'mmol/l', '136–145', ['133*L', '135*L', '136', '137']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['4.4', '4.1', '4.0', '4.2']),
      lt('Urea', 'mmol/l', '2.8–8.1', ['11.8*H', '10.2*H', '8.4*H', '6.9']),
      lt('Creatinine', 'µmol/l', '44–80', ['128*H', '112*H', '94*H', '82*H']),
      lt('eGFR (CKD-EPI)', 'ml/min', '>60', ['42*L', '49*L', '61', '72']),
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['14.2*H', '11.8*H', '9.6*H', '8.8*H']),
      lt('CRP', 'mg/l', '<5', ['284*HH', '', '196*H', '124*H']),
      lt('Procalcitonin', 'µg/l', '<0.5', ['4.8*H', '', '1.9*H', 'PEND']),
      lt('Lactate', 'mmol/l', '0.5–2.2', ['3.4*H', '1.8', '1.1', '']),
      lt('Bilirubin total', 'µmol/l', '<21', ['18', '', '14', '']),
      lt('ALT', 'U/l', '<35', ['44*H', '', '38*H', '']),
      lt('HbA1c', '%', '<6.0', ['', '8.4*H', '', '']),
    ]),
    panel('Blood gas (venous)', [
      lt('pH', '', '7.32–7.42', ['7.31*L', '7.36', '', '']),
      lt('HCO3', 'mmol/l', '22–29', ['19*L', '22', '', '']),
    ]),
    panel('Microbiology', [
      lt('Blood cultures x2', '', '', ['PEND', '', 'PEND', 'PEND']),
      lt('Sputum culture', '', '', ['', 'PEND', 'PEND', 'PEND']),
      lt('Legionella urinary Ag', '', 'neg', ['', 'neg', '', '']),
      lt('Pneumococcal urinary Ag', '', 'neg', ['', 'POS*H', '', '']),
    ]),
  ],
  agenda: [
    { date: '01.07.', item: 'CXR', location: 'Radiology', status: 'done', detail: 'RLL consolidation, no effusion' },
    { date: '02.07.', item: 'Repeat lactate + PCT', status: 'done' },
    { date: '03.07.', time: '11:00', item: 'CXR control', location: 'Radiology', status: 'requested' },
    { date: '03.07.', item: 'Chase blood cultures / sputum (micro lab)', status: 'planned' },
    { date: '03.07.', item: 'Review abx — pneumococcal Ag POS, consider de-escalation', status: 'planned' },
  ],
  notes: [
    note('01.07.2026 04:32', 'Novak P., Dr.', 'ED physician', 'admission',
      'ED clerking',
      `58 F, 3 d productive cough, rigors, worsening SOB. Today confused per husband, "not herself".
Obs on arrival: T 39.2, BP 96/54, HR 118, RR 28, SpO2 88 % RA → qSOFA 2 (RR, mentation). Sepsis pathway activated 04:05.
Bloods + cultures x2 drawn, lactate 3.4. 1 L crystalloid stat. CXR: RLL consolidation.
Given piperacillin/tazobactam 4.5 g IV 04:20 (sepsis bundle) + clarithromycin.
PMH: T2DM (metformin, sitagliptin), smoker 30 py. Allergies: states penicillin rash as teenager?? — pt drowsy, to be verified with family. NKDA per old ED record 2019.
Referred medicine, accepted Dr. Varga (nights).`),
    note('01.07.2026 05:50', 'Yilmaz D.', 'Nursing (night shift)', 'nursing',
      'Nursing admission form',
      `Received from ED 05:20. Drowsy but rousable, orientated to person only. On 4 L O2.
ALLERGY: husband confirms penicillin — had rash and facial swelling as teenager, carried a card years ago. Red band applied, documented in allergy tab.
Braden 16. IV x2 patent. Urine output monitoring started. Husband contact 0176-xxx, wants call if deterioration.`),
    note('01.07.2026 09:35', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Post-take ward round (with Dr. Ostrowski)',
      `S: More awake, orientated x2. Cough++, R-sided pleuritic twinge.
O/E: T 38.4, HR 102, BP 108/62, RR 24, SpO2 93 % on 3 L. Bronchial breathing R base, crackles. Abd soft. GCS 15.
Labs: WBC 17.8, CRP 284, PCT 4.8, lactate cleared 3.4→1.8. Creat 128 (no known baseline — GP record requested) → AKI 1, fluids.
CXR: dense RLL consolidation. CURB-65 = 3 (RR, urea, confusion).

Imp: severe CAP RLL + sepsis, responding to initial mx.

Plan:
- Cont. pip/tazo + clarithromycin. Legionella/pneumococcal urinary Ag sent.
- 2nd litre fluids slowly, then reassess.
- Hold metformin (AKI), sliding scale insulin, BG QID.
- Obs q4h min. Escalate if lactate re-rises / RR>26 / BP<100.
- HbA1c added.

NB allergy discrepancy: nursing form says penicillin rash+swelling (husband), old ED record says NKDA. Pt has now had 2 doses pip/tazo without reaction. D/w Dr. Ostrowski: continue for now given severity + no reaction, verify history properly when pt fully orientated, consider allergy de-labelling referral vs switch. — REVIEW DAILY.`),
    note('01.07.2026 22:30', 'Varga T., Dr.', 'Night resident (cross-cover)', 'night',
      'Night review (planned)',
      `Reviewed as handover request. Obs improving trend, T 37.9 post paracetamol. Lactate not repeated o/n (day team to do). Drinking, u/o adequate ~45 ml/h. No escalation needed. FYI spiked to 38.6 at 18:00, cultures NOT re-drawn (already 2 sets pending).`),
    note('02.07.2026 09:20', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 2',
      `S: Feels better. Cough productive, rusty sputum (sample finally sent this AM).
O/E: T 37.6, HR 90, RR 20, SpO2 94 % on 2 L. Still bronchial R base.
Labs: WBC 13.4 ↓, CRP 196 ↓, PCT 1.9 ↓, creat 94 (resolving), lactate 1.1.
Micro: pneumococcal urinary Ag POSITIVE, legionella neg. Cultures pending.

Imp: severe pneumococcal CAP, clearly responding.

Plan:
- Pneumococcus + penicillin allergy question: if cultures confirm sensitive strain, ideal = narrow to penicillin/amox — BLOCKED by allergy label. Options: cont. pip/tazo (already tolerating!?), or switch ceftriaxone, or moxifloxacin PO. For now cont. current, decision tomorrow w/ micro result. Stop clarithromycin? — legionella neg, but atypical cover conventionally 5 d... continue for now.
- Stop maintenance fluids. Encourage PO.
- Metformin still held until creat <90 confirmed.
- Sliding scale cont., BGs 8–14, acceptable while septic. HbA1c 8.4 — diabetes review before d/c, ?intensify home regimen.
- Smoking cessation discussed, pt receptive, nicotine patch offered.`),
    note('02.07.2026 15:40', 'Ostrowski M., Dr.', 'Attending IM (Team A)', 'attending',
      'Attending addendum',
      `Seen. Improving severe CAP. Re allergy label vs pip/tazo: not elegant, but she has now tolerated 5 doses; do NOT introduce new beta-lactam without allergy work-up; if de-escalating, moxifloxacin PO is the pragmatic route once afebrile 24 h. Aim step-down tomorrow if trend holds. De-escalate off sepsis pathway — agreed.`),
    note('02.07.2026 21:05', 'Yilmaz D.', 'Nursing (night shift)', 'nursing',
      'Shift note',
      `Comfortable evening. O2 weaned to 1 L, sats 95 %. Afebrile since 18:00 (37.4 → 37.2). Eating light diet. BG 22:00: 9.8, no correction per scale. Husband visited, updated by Dr. Carter by phone earlier. Sleeping.`),
  ],
};

export default p03;
