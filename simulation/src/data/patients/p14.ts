import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P14 — Symptomatic hyponatraemia, fluid restriction, serial Na. DISCHARGE TODAY.
// Letter: draft (fairly advanced). The Na trend is the buried-in-labs demo:
// serial sodium sits inside a long chemistry panel.

const p14: Patient = {
  id: 'p14',
  caseNo: '2607329',
  lastName: 'Fitzgerald',
  firstName: 'Dorothy',
  sex: 'F',
  dob: '02.04.1948',
  age: 78,
  room: 'IM3-10',
  bed: '2',
  team: 'A',
  attending: 'Ostrowski M., Dr.',
  resident: 'Carter J., Dr.',
  mine: true,
  admitted: '27.06.2026 09:55',
  reason: 'Symptomatic hyponatraemia (Na 118) — thiazide + SIADH picture, corrected, discharge today',
  admissionDx: 'Severe symptomatic hyponatraemia (Na 118 mmol/l), multifactorial: thiazide, low solute intake, ?SIADH component',
  problems: [
    'Hyponatraemia — corrected 118 → 134, thiazide stopped, fluid restriction weaned',
    'HTN — antihypertensive regimen changed (HCT stopped, amlodipine started)',
    'Osteoporosis — on denosumab (last dose 03/2026, next due 09/2026 — GP)',
    'Recurrent falls? — one fall pre-admission during confusion, PT assessed: baseline mobility recovered',
    'Polymyalgia rheumatica (2023) — off steroids since 01/2025',
  ],
  allergiesBanner: 'NKDA',
  allergies: [
    { substance: 'No known drug allergies', reaction: '—', noted: 'admission 27.06.' },
  ],
  flags: ['Discharge planned 03.07.', 'Na check this AM before discharge'],
  acuity: 1,
  dischargeToday: true,
  letterStatus: 'draft',
  letterText: `DISCHARGE LETTER (DRAFT)

Dear colleague,

Re: Dorothy Fitzgerald, *02.04.1948, case 2607329
Admission: 27.06.2026 — Discharge: 03.07.2026

Diagnoses:
1. Severe symptomatic hyponatraemia (Na 118 mmol/l on admission) — multifactorial: hydrochlorothiazide, low solute intake, possible mild SIADH component; corrected to 13x (final value pending today)
2. Arterial hypertension — regimen changed during stay
3. Osteoporosis on denosumab (next injection due 09/2026)
4. Fall at home during confusional episode pre-admission — physiotherapy assessed, baseline mobility recovered

Course:
Mrs Fitzgerald was brought in by her son on 27.06. with 4–5 days of increasing confusion, unsteadiness and one unwitnessed fall. Admission sodium 118 mmol/l with clinical euvolaemia to mild hypovolaemia. Hydrochlorothiazide was stopped, cautious correction with fluid restriction (initially 1 l/24 h) and monitoring of correction rate (max 7 mmol/l/24 h, no overcorrection). Work-up: TSH normal, cortisol adequate, urine studies compatible with thiazide effect plus a possible mild SIADH component; CT head (fall, confusion) without acute pathology. CXR normal, no malignancy signals on basic screen — we suggest completing age-appropriate cancer screening via GP if not current. Cognition cleared in parallel with sodium; AMTS 9/10 at discharge.

Discharge medication — CHANGES vs admission:
- Hydrochlorothiazide 25 mg STOPPED (caused/contributed to hyponatraemia — please avoid thiazides long-term)
- Amlodipine 5 mg 1-0-0 STARTED for BP (well tolerated)
- Candesartan 8 mg 1-0-0 unchanged
- Denosumab s.c. 6-monthly via GP unchanged (next 09/2026)
- Calcium/vit D 1000 mg/880 IU 1-0-0 unchanged
- [TODO check: was zopiclone from the ward stopped? do NOT continue at home]

Recommendations:
- Na + K check at GP in 5–7 days (target: stable ≥135), then 4-weekly x2
- Fluid intake: normal drinking, no forced fluids; avoid "flushing" advice
- BP check 2 wks after amlodipine start
- [TODO — falls prevention: PT recommended home ax? confirm from physio note]

Kind regards,
Dr. J. Carter, Resident, Internal Medicine Team A`,
  handoverBy: 'Carter J., Dr.',
  nextOfKin: 'Son: P. Fitzgerald, tel. 0152-555 0466 — collecting at discharge (~11:00 today)',
  admissionMeds: [
    { generic: 'Hydrochlorothiazide', dose: '25 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Candesartan', dose: '8 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Calcium/colecalciferol', dose: '1000 mg/880 IU', route: 'PO', schedule: '1-0-0' },
    { generic: 'Denosumab', brand: 'Prolia', dose: '60 mg', route: 'SC', schedule: 'q6 months (GP)', note: 'last 03/2026' },
    { generic: 'Herbal "water tablets"', dose: '?', route: 'PO', schedule: 'occasionally', note: 'health-food store, discouraged' },
  ],
  meds: [
    {
      id: medId(), generic: 'Hydrochlorothiazide', dose: '25 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN', status: 'stopped', started: '27.06.', stopped: '27.06.', source: 'home',
      history: [{ date: '27.06.', text: 'STOPPED — main hyponatraemia driver, do not restart', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Candesartan', dose: '8 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN', status: 'active', started: '27.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Amlodipine', dose: '5 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN (replacing HCT)', status: 'active', started: '30.06.', source: 'inpatient',
      history: [{ date: '30.06.', text: 'started — BP 150s after HCT stop', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Calcium/colecalciferol', dose: '1000 mg/880 IU', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'osteoporosis', status: 'active', started: '27.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Zopiclone', dose: '3.75 mg', route: 'PO', schedule: '0-0-0-1 PRN', prn: true,
      indication: 'sleep (inpatient only — NOT for discharge)', status: 'active', started: '29.06.', source: 'inpatient',
      history: [{ date: '29.06.', text: 'started PRN — review before discharge, do not continue at home (falls!)', by: 'Varga' }],
    },
    {
      id: medId(), generic: 'Sodium chloride 0.9 %', dose: '500 ml', route: 'IV', schedule: 'slow', prn: false,
      indication: 'initial cautious volume (hypovolaemic component)', status: 'stopped', started: '27.06.', stopped: '28.06.', source: 'inpatient',
      history: [{ date: '28.06.', text: 'stopped — Na rising appropriately, switch to restriction alone', by: 'Carter' }],
    },
  ],
  vitals: [
    { t: '27.06. 10:20', bp: '132/78', hr: 84, rr: 16, temp: 36.7, spo2: 97, o2: 'RA', note: 'AMTS 6/10, unsteady' },
    { t: '28.06. 06:00', bp: '138/80', hr: 78, rr: 14, temp: 36.6, spo2: 97, o2: 'RA' },
    { t: '29.06. 06:00', bp: '148/84', hr: 76, rr: 14, temp: 36.5, spo2: 97, o2: 'RA', note: 'AMTS 8/10' },
    { t: '30.06. 06:00', bp: '152/86', hr: 74, rr: 14, temp: 36.6, spo2: 98, o2: 'RA' },
    { t: '01.07. 06:00', bp: '146/82', hr: 72, rr: 14, temp: 36.5, spo2: 98, o2: 'RA' },
    { t: '02.07. 06:00', bp: '138/78', hr: 72, rr: 14, temp: 36.6, spo2: 98, o2: 'RA', note: 'AMTS 9/10' },
    { t: '03.07. 06:00', bp: '134/76', hr: 70, rr: 14, temp: 36.5, spo2: 98, o2: 'RA' },
  ],
  labColumns: ['27.06. 10:30', '27.06. 18:00', '28.06. 06:15', '28.06. 18:00', '29.06. 06:10', '30.06. 06:15', '01.07. 06:10', '02.07. 06:05', '03.07. 06:20'],
  labs: [
    panel('Clinical chemistry', [
      lt('Sodium', 'mmol/l', '136–145', ['118*LL', '121*L', '124*L', '126*L', '128*L', '130*L', '132*L', '134*L', 'PEND']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['3.2*L', '3.4*L', '3.6', '3.8', '3.9', '4.0', '4.1', '4.0', 'PEND']),
      lt('Chloride', 'mmol/l', '98–107', ['84*L', '86*L', '89*L', '92*L', '94*L', '96*L', '98', '99', '']),
      lt('Urea', 'mmol/l', '2.8–8.1', ['3.1', '', '3.6', '', '4.2', '4.6', '4.8', '5.0', '']),
      lt('Creatinine', 'µmol/l', '44–80', ['58', '', '61', '', '64', '66', '65', '67', '']),
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['5.4', '', '5.1', '', '5.6', '', '5.2', '', '']),
      lt('Serum osmolality', 'mosm/kg', '275–295', ['248*L', '', '256*L', '', '', '268*L', '', '', '']),
      lt('CRP', 'mg/l', '<5', ['4', '', '', '', '3', '', '', '', '']),
      lt('Magnesium', 'mmol/l', '0.66–1.07', ['0.62*L', '', '0.71', '', '', '0.79', '', '', '']),
    ]),
    panel('Urine studies', [
      lt('Urine osmolality', 'mosm/kg', '', ['412', '', '', '', '386', '', '', '', '']),
      lt('Urine sodium', 'mmol/l', '', ['64', '', '', '', '52', '', '', '', '']),
    ]),
    panel('Endocrinology', [
      lt('TSH', 'mU/l', '0.27–4.2', ['', '1.6', '', '', '', '', '', '', '']),
      lt('Cortisol (morning)', 'nmol/l', '>350 adeq.', ['', '', '486', '', '', '', '', '', '']),
    ]),
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['6.8', '', '6.4', '', '', '6.9', '', '7.1', '']),
      lt('Haemoglobin', 'g/dl', '12.0–15.5', ['13.1', '', '12.8', '', '', '12.9', '', '13.0', '']),
      lt('Platelets', 'G/l', '150–400', ['246', '', '238', '', '', '244', '', '251', '']),
    ]),
  ],
  agenda: [
    { date: '27.06.', item: 'CT head (fall + confusion)', location: 'Radiology CT', status: 'done', detail: 'no acute pathology, age-appropriate involution' },
    { date: '28.06.', item: 'CXR', status: 'done', detail: 'normal' },
    { date: '01.07.', item: 'Physiotherapy mobility assessment', status: 'done' },
    { date: '03.07.', time: '06:20', item: 'Na + K control (pre-discharge) — CHASE RESULT', status: 'in prep' },
    { date: '03.07.', time: '~11:00', item: 'Discharge home (son collecting) — finalise letter', status: 'planned' },
  ],
  notes: [
    note('27.06.2026 11:40', 'Carter J., Dr.', 'Resident IM (Team A)', 'admission',
      'Admission note — hyponatraemia',
      `78 F brought by son: 4–5 d increasing confusion, unsteady, fall yesterday (unwitnessed, no head strike per pt — CT anyway given age + confusion). Drinking "lots of water because of the heat", eating little ("tea and toast"). On HCT 25 for years.
O/E: confused (AMTS 6/10), euvolaemic to slightly dry, no focal neurology.
Na 118 (!), K 3.2, serum osm 248, urine osm 412, urine Na 64.
Imp: severe symptomatic hyponatraemia — thiazide + low solute + high water intake; urine studies muddy (thiazide interferes) — possible mild SIADH component, no obvious cause (screen: TSH, cortisol, CXR, review meds).
Plan:
- STOP HCT.
- No hypertonic saline (chronic, no seizures/coma) — cautious correction: fluid restriction 1 L, slow 0.9 % NaCl 500 ml given hypovolaemic element.
- STRICT correction limit <8 mmol/24 h — Na q6–8h first 48 h. If overcorrecting → d/w attending re glucose 5 %/desmopressin.
- CT head today, K + Mg replacement.
- Falls: PT referral, bed low.`),
    note('27.06.2026 19:10', 'Fofana M.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Confused ++ at times, pleasant, redirectable. Fluid restriction explained repeatedly, keeps asking for water — jug removed per team, cups charted. Son visited, gave collateral, very worried. Na 18:00: 121 (phoned to Dr. Varga — within limits).`),
    note('28.06.2026 09:35', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 1',
      `Na 118 → 121 → 124 (=+6 in ~20 h — at upper limit of target, OK but stop IV fluids now, restriction alone).
Less confused this AM. TSH 1.6 normal, cortisol 486 adequate. CT head: no acute pathology.
Plan: restriction 1 L cont., Na BD today then daily if stable. K/Mg replaced. CXR today (part of screen).`),
    note('29.06.2026 09:20', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 2',
      `Na 128 (+4/24 h ✓). AMTS 8/10 — clearing nicely w/ Na.
CXR normal. No SIADH cause found; likely thiazide-dominant picture. Restriction relaxed to 1.5 L.
BP creeping up post-HCT (148/84) — expected; plan replacement agent before d/c (NOT another thiazide).`),
    note('30.06.2026 09:25', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 3',
      `Na 130. Well. BP 152/86 → amlodipine 5 mg started (replaces HCT).
Restriction 1.5 L cont. Na daily. Discharge planning: aim Fri 03.07. if Na ≥133 and stable. Letter drafted (in system). Son can collect Fri.`),
    note('01.07.2026 14:20', 'Hartmann S.', 'Physiotherapy', 'physio',
      'Physio assessment',
      `Ax: TUG 14 s (borderline), gait steady w/o aid over 30 m, sit-to-stand independent. Back to reported baseline. No aid needed. Recommend: GP-arranged community falls-prevention programme (form given to son), footwear advice given. No home PT required from our side.`),
    note('02.07.2026 09:05', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 5',
      `Na 134. AMTS 9/10. Restriction lifted — normal drinking, advice given.
Plan: LAST Na check tomorrow AM; if ≥133 → home. Letter draft nearly done — finalise med changes + falls rec (see physio note). Zopiclone PRN to be stopped at d/c (not on letter yet — TODO). Attending signed off on plan.`),
    note('02.07.2026 20:45', 'Okonkwo B.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Bright, orientated. Packed her bag already. Zopiclone NOT given tonight (slept without). Son confirmed pick-up ~11:00 tomorrow. Await AM bloods.`),
  ],
};

export default p14;
