import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P10 — Pyelonephritis, IV antibiotics, DISCHARGE TODAY. Letter status: planned (none written).
// LANDMINE: micro suggests co-trimoxazole as the PO step-down option in the culture report,
// but the allergy list carries "co-trimoxazole — generalised rash". The 02.07. plan says
// "switch to PO per sensitivities" without naming the drug. Writing the letter forces the check.

const p10: Patient = {
  id: 'p10',
  caseNo: '2607412',
  lastName: 'Rahman',
  firstName: 'Aisha',
  sex: 'F',
  dob: '17.06.1992',
  age: 34,
  room: 'IM3-07',
  bed: '1',
  team: 'A',
  attending: 'Ostrowski M., Dr.',
  resident: 'Carter J., Dr.',
  mine: true,
  admitted: '29.06.2026 22:05',
  reason: 'Acute pyelonephritis R — IV abx, afebrile 48 h, discharge today with PO switch',
  admissionDx: 'Acute uncomplicated pyelonephritis right side',
  problems: [
    'Pyelonephritis R — E. coli in urine + blood cultures, defervesced, PO switch for discharge',
    'E. coli bacteraemia (1/2 bottles) — treated as complicated UTI, total 10–14 d abx',
    'Recurrent UTIs (3 in last 12 mo per pt) — GP work-up advised',
    'Mild iron deficiency (ferritin 18) — incidental, PO iron started',
  ],
  allergiesBanner: 'Co-trimoxazole — rash',
  allergies: [
    { substance: 'Co-trimoxazole (trimethoprim/sulfamethoxazole)', reaction: 'generalised itchy rash 2023, settled with antihistamines', noted: 'pt report, ED triage 29.06.; consistent w/ GP record' },
  ],
  flags: ['Discharge planned 03.07.'],
  acuity: 1,
  dischargeToday: true,
  letterStatus: 'planned',
  letterText: '',
  handoverBy: 'Carter J., Dr.',
  admissionMeds: [
    { generic: 'Combined oral contraceptive', brand: 'Microgynon', dose: '', route: 'PO', schedule: '1-0-0' },
    { generic: 'Cetirizine', dose: '10 mg', route: 'PO', schedule: 'PRN hayfever', note: 'OTC' },
  ],
  meds: [
    {
      id: medId(), generic: 'Ceftriaxone', dose: '2 g', route: 'IV', schedule: '1-0-0 (08:00)', prn: false,
      indication: 'pyelonephritis / E. coli bacteraemia', status: 'active', started: '29.06.', source: 'inpatient',
      history: [
        { date: '29.06.', text: 'started empirically', by: 'ED (Osei)' },
        { date: '01.07.', text: 'culture-confirmed sensitive, continue, plan PO switch at d/c', by: 'Carter' },
      ],
    },
    {
      id: medId(), generic: 'Ethinylestradiol/levonorgestrel', brand: 'Microgynon', dose: '', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'contraception', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Ferrous sulfate', dose: '100 mg', route: 'PO', schedule: '1-0-0 (alternate days from d/c)', prn: false,
      indication: 'iron deficiency (ferritin 18)', status: 'active', started: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'started, GP to recheck ferritin in 3 mo', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Paracetamol', dose: '1 g', route: 'PO', schedule: 'q6h PRN fever/pain', prn: true,
      indication: 'fever/loin pain', status: 'active', started: '29.06.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Metoclopramide', dose: '10 mg', route: 'IV', schedule: 'q8h PRN nausea', prn: true,
      indication: 'nausea (adm only)', status: 'stopped', started: '29.06.', stopped: '01.07.', source: 'inpatient',
      history: [{ date: '01.07.', text: 'stopped — no nausea since 30.06.', by: 'Carter' }],
    },
  ],
  vitals: [
    { t: '29.06. 22:30', bp: '108/66', hr: 112, rr: 20, temp: 39.4, spo2: 98, o2: 'RA', pain: 6, note: 'rigors on arrival' },
    { t: '30.06. 06:00', bp: '112/70', hr: 98, rr: 18, temp: 38.4, spo2: 98, o2: 'RA', pain: 4 },
    { t: '30.06. 18:00', bp: '116/72', hr: 88, rr: 16, temp: 37.9, spo2: 99, o2: 'RA', pain: 3 },
    { t: '01.07. 06:00', bp: '114/72', hr: 80, rr: 14, temp: 37.2, spo2: 99, o2: 'RA', pain: 2 },
    { t: '01.07. 18:00', bp: '112/70', hr: 76, rr: 14, temp: 36.8, spo2: 99, o2: 'RA', pain: 1 },
    { t: '02.07. 06:00', bp: '110/70', hr: 72, rr: 14, temp: 36.6, spo2: 99, o2: 'RA', pain: 1 },
    { t: '03.07. 06:00', bp: '112/72', hr: 70, rr: 14, temp: 36.5, spo2: 99, o2: 'RA', pain: 0 },
  ],
  labColumns: ['29.06. 22:20', '01.07. 06:15', '03.07. 06:10'],
  labs: [
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['16.9*H', '10.8*H', '7.6']),
      lt('Neutrophils', 'G/l', '1.8–7.0', ['14.8*H', '8.9*H', '5.1']),
      lt('Haemoglobin', 'g/dl', '12.0–15.5', ['11.2*L', '10.9*L', '11.1*L']),
      lt('MCV', 'fl', '80–99', ['76*L', '76*L', '']),
      lt('Platelets', 'G/l', '150–400', ['302', '344', '']),
      lt('Ferritin', 'µg/l', '15–150', ['', '18*L', '']),
    ]),
    panel('Clinical chemistry', [
      lt('CRP', 'mg/l', '<5', ['212*HH', '88*H', '24*H']),
      lt('Sodium', 'mmol/l', '136–145', ['135*L', '138', '139']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['3.7', '3.9', '4.0']),
      lt('Creatinine', 'µmol/l', '44–80', ['92*H', '71', '66']),
      lt('Beta-hCG (serum)', '', 'neg', ['neg', '', '']),
    ]),
    panel('Microbiology', [
      lt('Urine culture', '', '', ['PEND', 'E. coli >10^5 — see sensitivity report (notes)', '']),
      lt('Blood cultures x2', '', '', ['PEND', 'E. coli 1/2 bottles — same sensitivity', 'final: no further growth']),
    ]),
  ],
  agenda: [
    { date: '30.06.', item: 'Renal ultrasound', location: 'Radiology US', status: 'done', detail: 'no abscess, no obstruction, mild R pelvic fullness' },
    { date: '03.07.', time: '08:00', item: 'Last ceftriaxone dose IV', status: 'planned' },
    { date: '03.07.', time: 'AM', item: 'Discharge — write letter (NONE started), PO abx script, GP f/u', status: 'planned' },
  ],
  notes: [
    note('29.06.2026 23:10', 'Osei K., Dr.', 'ED physician', 'admission',
      'ED clerking',
      `34 F, 2 d dysuria + frequency, today fever 39.5 w/ rigors, R loin pain, vomited x2.
Obs: T 39.4, HR 112, BP 108/66. R renal angle tender.
Urine dip: leuc+++, nitrite+, blood+. hCG neg. Cultures (urine + blood x2) sent.
Ceftriaxone 2 g IV given 22:50. Anti-emetic, fluids 1 L.
Hx: recurrent UTIs (3 in 12 mo, GP treated). ALLERGY: co-trimoxazole → generalised rash 2023.
Referred medicine.`),
    note('30.06.2026 09:45', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Post-take ward round',
      `S: Feels rough, loin pain 4/10, no vomiting since adm.
O/E: T 38.4 falling, haemodynamically fine. R RAT persists.
Labs: WBC 16.9, CRP 212, creat 92 (mildly up, prerenal — recheck).
Imp: acute pyelonephritis R. US today to r/o obstruction/abscess (fever 39+ & recurrent hx).
Plan: cont. ceftriaxone 2 g OD. Encourage PO fluids. Paracetamol regular today. Await cultures. If defervesces + cultures sensitive → PO switch for d/c, total 10 d (bacteraemia? pending).`),
    note('01.07.2026 08:15', 'Micro lab', 'Microbiology', 'event',
      'Culture report — urine + blood (interim)',
      `URINE (29.06.): E. coli >10^5 CFU/ml.
BLOOD (29.06.): E. coli 1 of 2 bottles (aerobic), same morphotype.
Sensitivities (both isolates identical):
  Amoxicillin ........... R
  Amox/clavulanate ...... S
  Cefuroxime ............ S
  Ceftriaxone ........... S
  Ciprofloxacin ......... R
  Co-trimoxazole ........ S
  Nitrofurantoin ........ S (urine only — NOT adequate for pyelonephritis/bacteraemia)
  Gentamicin ............ S
Comment: for oral step-down in pyelonephritis consider co-trimoxazole or amox/clavulanate per local guideline; ciprofloxacin resistant.`),
    note('01.07.2026 09:55', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 2',
      `Afebrile since ~midnight. Pain 2/10. Eating/drinking.
CRP 88 ↓, WBC 10.8 ↓, creat normalised 71.
Cultures: E. coli urine + 1/2 blood bottles — sensitive to ceftriaxone ✓ (see micro report).
US yesterday: no obstruction/abscess.
Plan: cont. IV ceftriaxone while inpatient; d/c Thu/Fri if stays afebrile ≥48 h, then PO switch per sensitivities to complete 10–14 d total (bacteraemic → prefer 14? d/w attending: 10 d adequate for uncomplicated E. coli bacteraemia from urinary source per recent evidence — decide at d/c).
Ferritin 18 w/ microcytic Hb 10.9 — iron deficiency, start PO iron, GP letter: recheck + menorrhagia hx r/v.
Recurrent UTIs — advise GP work-up (post-void residual, lifestyle, ?prophylaxis discussion).`),
    note('02.07.2026 09:00', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 3',
      `Well. Afebrile >48 h. CRP tomorrow. Plan: DISCHARGE FRIDAY 03.07. after AM ceftriaxone dose. PO switch per sensitivities (script + letter to be done tomorrow — NB total course day count: IV 29.06.–03.07. = 5 d, PO to complete 10 d = until 08.07. incl.).
Attending agrees. Letter not yet started.`),
    note('02.07.2026 19:30', 'Fofana M.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Self-caring. Apyrexial. IV site rotated (day 3, slight redness old site L hand — resolved). Keen to go home tomorrow, has small children at home, partner collecting ~11:00. Reminded team re script + letter tomorrow morning.`),
  ],
};

export default p10;
