import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P01 — Elderly CHF exacerbation on IV diuretics. "My patient" (Team A).
// Clutter: brand/generic duplication (Lasix home vs furosemide IV), heavy copy-forward
// resident notes, discontinued meds visible, weight trend scattered between vitals and notes.

const cfBlockCHF = `PMH: HFpEF (echo 11/2025 EF 55%, gr II diast. dysfn), HTN, AF (paroxysmal, on apixaban), CKD 3a, OA both knees, hypothyroidism.
Soc: lives alone, ground floor flat, daughter nearby, mobilises w/ frame.
Adm meds reviewed, see med list.`;

const cfExamCHF = `O/E: alert, orientated. JVP elevated ~4cm. Chest: bibasal crackles. HS irreg irreg, no murmur appreciated. Abd soft. Peripheral oedema to mid-shin bilat.`;

const p01: Patient = {
  id: 'p01',
  caseNo: '2607311',
  lastName: 'Whitfield',
  firstName: 'Margaret',
  sex: 'F',
  dob: '14.02.1942',
  age: 84,
  room: 'IM3-01',
  bed: '1',
  team: 'A',
  attending: 'Ostrowski M., Dr.',
  resident: 'Carter J., Dr.',
  mine: true,
  admitted: '27.06.2026 14:32',
  reason: 'Decompensated heart failure — worsening dyspnoea + leg oedema',
  admissionDx: 'Acute decompensated heart failure (HFpEF), fluid overload',
  problems: [
    'Acute decompensated heart failure (HFpEF) — IV diuresis',
    'Paroxysmal atrial fibrillation — on apixaban, rate controlled',
    'CKD stage 3a — creatinine drifting with diuresis, monitor',
    'Hypothyroidism — on substitution',
    'Hypokalaemia (resolved) — on supplementation',
    'HTN',
    'OA knees — chronic',
  ],
  allergiesBanner: 'ACE inhibitor (cough)',
  allergies: [
    { substance: 'Ramipril (ACE inhibitors)', reaction: 'dry cough, stopped 2019', noted: 'GP referral letter 27.06.' },
    { substance: 'Plaster / adhesive tape', reaction: 'skin redness', noted: 'nursing admission form 27.06.' },
  ],
  flags: ['Falls risk (mod)', 'Daily weight', 'Fluid restriction 1.5 L'],
  acuity: 2,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Carter J., Dr.',
  nextOfKin: 'Daughter: S. Whitfield-Barnes, tel. 0171-555 0134 (contact person, visits daily)',
  admissionMeds: [
    { generic: 'Furosemide', brand: 'Lasix', dose: '40 mg', route: 'PO', schedule: '1-0-0', note: 'per GP fax; pt says she "sometimes takes two"' },
    { generic: 'Apixaban', brand: 'Eliquis', dose: '2.5 mg', route: 'PO', schedule: '1-0-1', note: 'dose-reduced (age/weight/creat)' },
    { generic: 'Bisoprolol', dose: '2.5 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Amlodipine', dose: '5 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Levothyroxine', brand: 'Euthyrox', dose: '75 µg', route: 'PO', schedule: '1-0-0 fasting' },
    { generic: 'Paracetamol', dose: '1 g', route: 'PO', schedule: 'PRN knee pain, max 3 g/d' },
    { generic: 'Chondroitin/glucosamine', dose: '?', route: 'PO', schedule: 'self-medicates', note: 'OTC, not verified' },
  ],
  meds: [
    {
      id: medId(), generic: 'Furosemide', dose: '40 mg', route: 'IV', schedule: '08:00 + 14:00', prn: false,
      indication: 'decongestion', status: 'active', started: '27.06.', source: 'inpatient',
      history: [
        { date: '27.06.', text: 'started 40 mg IV 1-0-0', by: 'Carter' },
        { date: '29.06.', text: 'increased to 40 mg IV BD (08/14h) — inadequate diuresis', by: 'Ostrowski' },
      ],
    },
    {
      id: medId(), generic: 'Furosemide', brand: 'Lasix', dose: '40 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'home med — suspended during IV phase', status: 'stopped', started: '27.06.', stopped: '27.06.', source: 'home',
      history: [{ date: '27.06.', text: 'held — switched to IV furosemide', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Apixaban', brand: 'Eliquis', dose: '2.5 mg', route: 'PO', schedule: '1-0-1', prn: false,
      indication: 'AF anticoagulation', status: 'active', started: '27.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Bisoprolol', dose: '2.5 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'rate control / HTN', status: 'active', started: '27.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Amlodipine', dose: '5 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN', status: 'stopped', started: '27.06.', stopped: '30.06.', source: 'home',
      history: [{ date: '30.06.', text: 'stopped — BP on lower side with decongestion, review before d/c', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Levothyroxine', brand: 'Euthyrox', dose: '75 µg', route: 'PO', schedule: '1-0-0 fasting', prn: false,
      indication: 'hypothyroidism', status: 'active', started: '27.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Potassium chloride', brand: 'Kalium retard', dose: '600 mg', route: 'PO', schedule: '1-0-1', prn: false,
      indication: 'hypokalaemia under diuresis', status: 'active', started: '29.06.', source: 'inpatient',
      history: [{ date: '29.06.', text: 'started, K 3.1', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Paracetamol', dose: '1 g', route: 'PO', schedule: 'q8h PRN pain', prn: true,
      indication: 'knee pain', status: 'active', started: '27.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Zopiclone', dose: '3.75 mg', route: 'PO', schedule: '0-0-0-1 PRN insomnia', prn: true,
      indication: 'sleep', status: 'active', started: '28.06.', source: 'inpatient',
      history: [{ date: '28.06.', text: 'started on pt request, single dose PRN', by: 'Night team (Varga)' }],
    },
    {
      id: medId(), generic: 'Enoxaparin', brand: 'Clexane', dose: '40 mg', route: 'SC', schedule: '0-0-1', prn: false,
      indication: 'thromboprophylaxis', status: 'stopped', started: '27.06.', stopped: '28.06.', source: 'inpatient',
      history: [{ date: '28.06.', text: 'stopped — already fully anticoagulated on apixaban (duplicate)', by: 'Pharmacy (Chen)' }],
    },
  ],
  vitals: [
    { t: '27.06. 15:10', bp: '158/88', hr: 92, rr: 22, temp: 36.8, spo2: 91, o2: '2 L NC', weight: 78.4 },
    { t: '27.06. 20:00', bp: '150/84', hr: 88, rr: 20, spo2: 93, o2: '2 L NC' },
    { t: '28.06. 06:00', bp: '146/82', hr: 84, rr: 18, temp: 36.6, spo2: 93, o2: '2 L NC', weight: 78.1 },
    { t: '28.06. 14:00', bp: '142/80', hr: 86, rr: 18, spo2: 94, o2: '2 L NC' },
    { t: '29.06. 06:05', bp: '138/78', hr: 80, rr: 18, temp: 36.5, spo2: 94, o2: '1 L NC', weight: 77.6 },
    { t: '29.06. 18:00', bp: '134/76', hr: 82, rr: 16, spo2: 95, o2: '1 L NC' },
    { t: '30.06. 06:10', bp: '128/74', hr: 76, rr: 16, temp: 36.4, spo2: 95, o2: 'RA', weight: 76.9 },
    { t: '01.07. 06:00', bp: '124/70', hr: 74, rr: 16, temp: 36.5, spo2: 96, o2: 'RA', weight: 76.2 },
    { t: '02.07. 06:15', bp: '122/72', hr: 72, rr: 14, temp: 36.6, spo2: 96, o2: 'RA', weight: 75.8 },
    { t: '03.07. 06:05', bp: '118/70', hr: 74, rr: 16, temp: 36.5, spo2: 96, o2: 'RA', weight: 75.5 },
  ],
  labColumns: ['27.06. 15:40', '28.06. 06:15', '29.06. 06:20', '30.06. 06:05', '01.07. 06:30', '02.07. 06:10', '03.07. 06:05'],
  labs: [
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['8.2', '7.9', '', '7.4', '', '7.1', '7.3']),
      lt('Haemoglobin', 'g/dl', '12.0–15.5', ['11.8*L', '12.1', '', '12.4', '', '12.6', '12.5']),
      lt('Haematocrit', '%', '36–46', ['35.9*L', '36.8', '', '37.9', '', '38.4', '38.2']),
      lt('Platelets', 'G/l', '150–400', ['242', '238', '', '251', '', '246', '249']),
      lt('MCV', 'fl', '80–99', ['88', '88', '', '89', '', '89', '89']),
    ]),
    panel('Clinical chemistry', [
      lt('Sodium', 'mmol/l', '136–145', ['138', '137', '136', '135*L', '136', '137', '138']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['3.8', '3.4*L', '3.1*L', '3.6', '3.9', '4.1', '4.0']),
      lt('Chloride', 'mmol/l', '98–107', ['101', '100', '99', '98', '99', '100', '101']),
      lt('Urea', 'mmol/l', '2.8–8.1', ['9.4*H', '10.1*H', '11.2*H', '12.0*H', '11.6*H', '11.1*H', '10.8*H']),
      lt('Creatinine', 'µmol/l', '44–80', ['112*H', '118*H', '128*H', '136*H', '131*H', '126*H', '124*H']),
      lt('eGFR (CKD-EPI)', 'ml/min', '>60', ['41*L', '38*L', '34*L', '32*L', '33*L', '35*L', '36*L']),
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['6.8', '', '5.9', '', '6.2', '', '5.8']),
      lt('Magnesium', 'mmol/l', '0.66–1.07', ['', '0.71', '', '', '0.78', '', '']),
      lt('CRP', 'mg/l', '<5', ['8*H', '', '6*H', '', '4', '', '']),
    ]),
    panel('Cardiac markers', [
      lt('NT-proBNP', 'ng/l', '<300', ['8640*HH', '', '', '5920*H', '', '', 'PEND']),
      lt('Troponin T hs', 'ng/l', '<14', ['28*H', '26*H', '', '', '', '', '']),
    ]),
    panel('Endocrinology', [
      lt('TSH', 'mU/l', '0.27–4.2', ['', '2.4', '', '', '', '', '']),
    ]),
    panel('Coagulation', [
      lt('INR', '', '0.9–1.15', ['1.1', '', '', '', '', '', '']),
      lt('aPTT', 's', '25–37', ['31', '', '', '', '', '', '']),
    ]),
  ],
  agenda: [
    { date: '28.06.', item: 'CXR (control)', location: 'Radiology', status: 'done' },
    { date: '29.06.', item: 'Dietician review — fluid/salt restriction education', status: 'done' },
    { date: '02.07.', item: 'TTE (repeat, decongested state)', location: 'Cardio echo lab', status: 'done', detail: 'EF 55 %, E/e′ 16, mod. LA dilat., mild MR — report in system' },
    { date: '03.07.', time: '08:00', item: 'Daily weight before breakfast', status: 'planned' },
    { date: '03.07.', item: 'Consider IV→PO diuretic switch (if weight stable)', status: 'planned' },
    { date: '04.07.', item: 'Physio — stairs assessment', status: 'requested' },
  ],
  notes: [
    note('27.06.2026 16:55', 'Carter J., Dr.', 'Resident IM (Team A)', 'admission',
      'Admission note — decompensated heart failure',
      `84 y/o F, self-presented w/ 10 d progressive exertional dyspnoea, orthopnoea (3 pillows), leg swelling. No CP, no palpitations noticed, no fever/cough. Ran out of "water tablet" for ~1 wk ("the chemist was shut").

${cfBlockCHF}

${cfExamCHF}
Wt 78.4 kg (dry wt per GP ~74.5 kg).

ECG: AF, rate ~90, no acute ischaemia. CXR: pulm. congestion, small bilat. effusions R>L, cardiomegaly.
Labs: NT-proBNP 8640, creat 112 (baseline ~105 per GP), Trop mildly elev. 28 — chronic elevation pattern, no dynamic.

Imp: Acute decompensation of HFpEF, likely precipitated by med non-adherence +/- dietary salt. AF rate acceptable.

Plan:
- Furosemide 40 mg IV OD, strict fluid balance, daily wt, 1.5 L restriction
- Continue apixaban, bisoprolol; hold nothing else for now
- Repeat U+E daily (diuresis + CKD3a)
- Echo requested (last 11/2025)
- SW referral? — manages at home w/ frame, daughter helps; discuss at d/c planning`),
    note('27.06.2026 21:14', 'Okonkwo B.', 'Nursing (late shift)', 'nursing',
      'Nursing admission + shift note',
      `Pt admitted to IM3-01 bed 1. Orientated x3. Amb w/ frame, unsteady — falls risk assessment: 55 pts (moderate). Bed low, call bell in reach.
Skin: intact, dry lower legs, pitting oedema both shins. Allergy: says plasters make skin red — documented.
Ate half of supper. Fluid restr. explained, pt "will try". Voiding freely post furosemide, commode at bedside o/n.
Obs stable, on 2 L O2. Settled at 21:00.`),
    note('28.06.2026 07:58', 'Varga T., Dr.', 'Night resident (cross-cover)', 'night',
      'Overnight events',
      `Called 02:30 — pt anxious, unable to sleep, asking for "her sleeping tablet from home" (not on med list, daughter later says zopiclone occasionally). Given zopiclone 3.75 mg PO once, charted PRN. No dyspnoea, obs unchanged. Slept after.`),
    note('28.06.2026 09:40', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 1',
      `S: Slept "eventually". Less breathless lying flat (2 pillows).
${cfExamCHF}
Wt 78.1 (-0.3). Balance -850 ml/24h.
Labs: K 3.4 — replace. Creat 118 (↑ from 112), expected w/ diuresis, watch.

A/P:
- ADHF, diuresing but slowly. Cont. furosemide 40 IV OD.
- K falling → start KCl retard 600 BD. Recheck K + Mg tomorrow.
- CXR today (control effusions).
- Echo pending.
Discussed w/ Dr. Ostrowski at board round.

${cfBlockCHF}`),
    note('28.06.2026 14:22', 'Chen L.', 'Clinical pharmacy', 'pharmacy',
      'Medication review',
      `Med rec vs GP fax done. NB: enoxaparin 40 mg prophylaxis charted on admission ALONGSIDE therapeutic apixaban — duplication of anticoagulation. D/w Dr. Carter, enoxaparin stopped.
Also note: home list has "Lasix 40 mg" AND ward chart has generic furosemide — same drug, ensure home entry stays suspended while on IV. Pt also self-medicates OTC glucosamine (not charted, no action).
Apixaban 2.5 BD dose-reduction criteria met (age>80, wt<60? — wt 78 kg, only 2/3 criteria: age, creat) → formally should be 5 mg BD? Left as GP dosing, flag for discharge review.`),
    note('29.06.2026 08:45', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 2',
      `S: Feels "a bit lighter". No orthopnoea o/n.
${cfExamCHF}
Wt 77.6 (-0.5). Balance -1100 ml.
K 3.1 despite PO supp → KCl continued, extra 20 mmol in 500 ml given today, recheck tomorrow. Creat 128 — trending up, tolerable, target decongestion first (d/w attending).

A/P:
- Diuresis inadequate for congestion severity → furosemide ↑ 40 mg IV BD (08/14h) per Dr. Ostrowski.
- Cont. daily U+E.
- CXR (28.06.): effusions slightly smaller, congestion improving.

${cfBlockCHF}`),
    note('29.06.2026 16:05', 'Ostrowski M., Dr.', 'Attending IM (Team A)', 'attending',
      'Attending addendum',
      `Seen & examined. Agree ADHF mx. Target wt ~74.5–75 kg. Watch creat, accept rise to ~150. Echo this week. D/c planning: needs GP letter re diuretic adherence, consider community HF nurse referral.`),
    note('30.06.2026 09:12', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 3',
      `S: Well. Walked to bathroom w/ frame without dyspnoea.
O/E: JVP lower, crackles only R base now. Oedema ankles only. Off O2, SpO2 95 % RA.
Wt 76.9 (-0.7). Balance -1300.
Na 135 (borderline), K 3.6 (better), creat 136 — peak? Continue plan, recheck.
BP trending down (128/74 today) → amlodipine STOPPED, review need at discharge.

A/P: cont. furosemide 40 IV BD, KCl, daily wt/U+E. Echo tomorrow or 02.07.

${cfBlockCHF}`),
    note('30.06.2026 15:30', 'Hartmann S.', 'Physiotherapy', 'physio',
      'Physio initial assessment',
      `Ax: transfers indep w/ frame, gait unsteady over 20 m, needs supervision. SpO2 stable amb. Recommend: cont. mobilisation, stairs ax before d/c (lives ground floor but 3 entrance steps). Will review 2x/wk.`),
    note('01.07.2026 08:52', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 4',
      `S: No complaints. Sleeping w/ 1 pillow.
O/E: JVP normal. Chest clear apart from few R basal creps. Trace ankle oedema.
Wt 76.2 (-0.7). K 3.9. Creat 131 — plateauing/improving.

A/P: continue current regimen. Echo booked 02.07. Anticipate IV→PO switch Fri if wt approaching target, then 48 h obs on PO? — d/w attending, may d/c early next wk w/ HF nurse f/u.

${cfBlockCHF}`),
    note('02.07.2026 09:05', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 5',
      `S: Well.
O/E: chest clear. No oedema. Wt 75.8.
Labs: K 4.1, creat 126 ↓.
Echo today — see report: EF 55 %, diast. dysfn gr II, mild MR, no significant change vs 11/2025.

A/P:
- Wt 1.3 kg above stated dry wt — one more day IV then switch to PO torasemide? (attending prefers torasemide over resuming home furosemide — better absorption) → decide tomorrow.
- Amlodipine remains stopped, BP 122/72.
- Started d/c planning: daughter to be called, HF nurse referral form started (in my drafts, NOT yet sent).

${cfBlockCHF}`),
    note('02.07.2026 19:40', 'Okonkwo B.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Quiet day. Amb w/ frame indep to day room. Fluid restr. maintained c. 1.4 L. Ate well. Daughter visited, asking about discharge date — informed team aware, planning early next week. No falls. Wt tomorrow AM as ordered.`),
  ],
};

export default p01;
