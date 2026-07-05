import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P05 — AKI, fluid balance monitoring. "My patient". Nephrology consult TODAY
// (procedure-today patient). Clutter: nephrotoxics stopped at different times,
// fluid balance numbers disagree between nursing and resident notes.

const p05: Patient = {
  id: 'p05',
  caseNo: '2607365',
  lastName: 'Kowalski',
  firstName: 'Ernest',
  sex: 'M',
  dob: '21.11.1959',
  age: 66,
  room: 'IM3-03',
  bed: '2',
  team: 'A',
  attending: 'Ostrowski M., Dr.',
  resident: 'Carter J., Dr.',
  mine: true,
  admitted: '28.06.2026 11:05',
  reason: 'AKI (creat 412) on CKD — ?prerenal ?obstructive, nephro consult today',
  admissionDx: 'Acute kidney injury stage 3 on CKD 3b, multifactorial (dehydration, NSAID, RAS blockade)',
  problems: [
    'AKI stage 3 on CKD 3b — improving, nephrology review today re further mx / ?dialysis threshold',
    'Hyperkalaemia (peak 6.1) — resolved after treatment',
    'BPH — catheterised 28.06., residual 380 ml, TWOC pending',
    'Gout — flare last week, self-medicated with diclofenac (!)',
    'HTN — RAS blockade held',
    'T2DM diet-controlled',
  ],
  allergiesBanner: 'No known drug allergies',
  allergies: [],
  flags: ['Strict fluid balance', 'Urinary catheter (28.06.)', 'Daily K+'],
  acuity: 2,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Carter J., Dr.',
  admissionMeds: [
    { generic: 'Lisinopril', dose: '20 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Hydrochlorothiazide', dose: '25 mg', route: 'PO', schedule: '1-0-0', note: 'combo tab with lisinopril per pt' },
    { generic: 'Diclofenac', brand: 'Voltaren', dose: '75 mg', route: 'PO', schedule: '1-0-1 (self, ~6 d for gout)', note: 'OTC, not on GP list' },
    { generic: 'Allopurinol', dose: '300 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Tamsulosin', dose: '0.4 mg', route: 'PO', schedule: '0-0-1' },
    { generic: 'Omeprazole', dose: '20 mg', route: 'PO', schedule: '1-0-0', note: 'started himself with the diclofenac' },
  ],
  meds: [
    {
      id: medId(), generic: 'Lisinopril', dose: '20 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN', status: 'stopped', started: '28.06.', stopped: '28.06.', source: 'home',
      history: [{ date: '28.06.', text: 'held — AKI, hyperkalaemia', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Hydrochlorothiazide', dose: '25 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN', status: 'stopped', started: '28.06.', stopped: '28.06.', source: 'home',
      history: [{ date: '28.06.', text: 'held — AKI', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Diclofenac', brand: 'Voltaren', dose: '75 mg', route: 'PO', schedule: '—', prn: false,
      indication: 'gout flare (self-medicated)', status: 'stopped', started: '28.06.', stopped: '28.06.', source: 'home',
      history: [{ date: '28.06.', text: 'STOPPED — nephrotoxic, main precipitant', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Allopurinol', dose: '300 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'gout', status: 'stopped', started: '28.06.', stopped: '29.06.', source: 'home',
      history: [{ date: '29.06.', text: 'held in AKI, dose-adjust on restart (renal)', by: 'Nephro (Iqbal)' }],
    },
    {
      id: medId(), generic: 'Tamsulosin', dose: '0.4 mg', route: 'PO', schedule: '0-0-1', prn: false,
      indication: 'BPH', status: 'active', started: '28.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Omeprazole', dose: '20 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'gastroprotection', status: 'active', started: '28.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Sodium chloride 0.9 %', dose: '500 ml', route: 'IV', schedule: 'over 4 h, reassess', prn: false,
      indication: 'volume repletion', status: 'stopped', started: '28.06.', stopped: '01.07.', source: 'inpatient',
      history: [
        { date: '28.06.', text: '2 L over first 24 h', by: 'Carter' },
        { date: '01.07.', text: 'stopped — euvolaemic, u/o >1 ml/kg/h', by: 'Carter' },
      ],
    },
    {
      id: medId(), generic: 'Calcium gluconate 10 %', dose: '10 ml', route: 'IV', schedule: 'stat', prn: false,
      indication: 'hyperkalaemia (ECG changes? peaked T)', status: 'stopped', started: '28.06.', stopped: '28.06.', source: 'inpatient',
      history: [{ date: '28.06.', text: 'single dose ED', by: 'ED (Novak)' }],
    },
    {
      id: medId(), generic: 'Insulin/glucose', dose: '10 IU in G20 %', route: 'IV', schedule: 'stat, repeated x1', prn: false,
      indication: 'hyperkalaemia', status: 'stopped', started: '28.06.', stopped: '28.06.', source: 'inpatient',
      history: [],
    },
    {
      id: medId(), generic: 'Patiromer', brand: 'Veltassa', dose: '8.4 g', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'hyperkalaemia', status: 'stopped', started: '29.06.', stopped: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'stopped, K stable 4.6', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Colchicine', dose: '0.5 mg', route: 'PO', schedule: '1-0-0 (renal dosing)', prn: false,
      indication: 'gout flare cover', status: 'active', started: '29.06.', source: 'inpatient',
      history: [{ date: '29.06.', text: 'started per nephro, low dose', by: 'Iqbal' }],
    },
    {
      id: medId(), generic: 'Paracetamol', dose: '1 g', route: 'PO', schedule: 'q8h PRN', prn: true,
      indication: 'pain', status: 'active', started: '28.06.', source: 'inpatient', history: [],
    },
  ],
  vitals: [
    { t: '28.06. 11:30', bp: '104/62', hr: 96, rr: 18, temp: 36.9, spo2: 96, o2: 'RA', weight: 91.2, note: 'dry mucous membranes' },
    { t: '28.06. 18:00', bp: '112/68', hr: 88, rr: 16, spo2: 96, o2: 'RA' },
    { t: '29.06. 06:00', bp: '118/72', hr: 82, rr: 16, temp: 36.7, spo2: 97, o2: 'RA', weight: 92.4 },
    { t: '30.06. 06:10', bp: '124/76', hr: 78, rr: 16, temp: 36.6, spo2: 97, o2: 'RA', weight: 93.0 },
    { t: '01.07. 06:00', bp: '128/78', hr: 76, rr: 14, temp: 36.6, spo2: 97, o2: 'RA', weight: 92.6 },
    { t: '02.07. 06:05', bp: '132/80', hr: 74, rr: 14, temp: 36.5, spo2: 97, o2: 'RA', weight: 92.1 },
    { t: '03.07. 06:00', bp: '134/80', hr: 72, rr: 14, temp: 36.6, spo2: 97, o2: 'RA', weight: 91.8 },
  ],
  labColumns: ['28.06. 11:40', '28.06. 18:30', '29.06. 06:20', '30.06. 06:15', '01.07. 06:20', '02.07. 06:10', '03.07. 06:05'],
  labs: [
    panel('Clinical chemistry', [
      lt('Sodium', 'mmol/l', '136–145', ['134*L', '135*L', '136', '137', '138', '138', '139']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['6.1*HH', '5.4*H', '5.0', '4.8', '4.7', '4.6', '4.5']),
      lt('Urea', 'mmol/l', '2.8–8.1', ['28.4*HH', '27.1*H', '24.8*H', '21.2*H', '17.6*H', '14.2*H', '11.9*H']),
      lt('Creatinine', 'µmol/l', '59–104', ['412*HH', '398*H', '366*H', '312*H', '264*H', '221*H', '188*H']),
      lt('eGFR (CKD-EPI)', 'ml/min', '>60', ['13*LL', '14*L', '15*L', '19*L', '23*L', '28*L', '34*L']),
      lt('Bicarbonate', 'mmol/l', '22–29', ['17*L', '', '19*L', '21*L', '22', '23', '24']),
      lt('Phosphate', 'mmol/l', '0.87–1.45', ['1.92*H', '', '1.78*H', '1.61*H', '1.44', '', '']),
      lt('Calcium (corr.)', 'mmol/l', '2.2–2.55', ['2.18*L', '', '2.21', '2.26', '', '', '']),
      lt('Uric acid', 'µmol/l', '208–428', ['612*H', '', '', '548*H', '', '', '']),
      lt('CRP', 'mg/l', '<5', ['22*H', '', '18*H', '', '11*H', '', '']),
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['7.9*H', '', '6.4', '', '6.1', '', '']),
    ]),
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['11.4*H', '', '10.2*H', '9.1', '', '8.4', '']),
      lt('Haemoglobin', 'g/dl', '13.5–17.2', ['15.8', '', '13.9', '13.1*L', '', '12.8*L', '']),
      lt('Platelets', 'G/l', '150–400', ['228', '', '234', '241', '', '236', '']),
    ]),
    panel('Urine', [
      lt('Urine dipstick', '', '', ['prot+, blood+', '', '', 'prot+', '', '', '']),
      lt('Urine PCR', 'mg/mmol', '<15', ['', '', '48*H', '', '', '', 'PEND']),
      lt('Urine culture', '', '', ['PEND', '', 'no growth', '', '', '', '']),
    ]),
    panel('Immunology (AKI screen)', [
      lt('ANA / ANCA', '', 'neg', ['', '', 'PEND', '', 'neg', '', '']),
      lt('Complement C3/C4', '', 'normal', ['', '', '', '', 'normal', '', '']),
      lt('Serum free light chains', '', '', ['', '', 'PEND', '', '', 'PEND', 'PEND']),
    ]),
  ],
  agenda: [
    { date: '28.06.', item: 'Renal ultrasound', location: 'Radiology US', status: 'done', detail: 'kidneys 10.2/10.6 cm, no hydronephrosis after catheter, bladder residual 380 ml pre-cath' },
    { date: '29.06.', item: 'Nephrology consult (initial)', status: 'done' },
    { date: '03.07.', time: '10:30', item: 'Nephrology re-review — trajectory / ?outpatient dialysis planning threshold', location: 'ward (Dr. Iqbal)', status: 'planned' },
    { date: '03.07.', item: 'Chase serum free light chains', status: 'planned' },
    { date: '04.07.', item: 'TWOC (trial without catheter) if creat trend ok', status: 'planned' },
  ],
  notes: [
    note('28.06.2026 12:40', 'Carter J., Dr.', 'Resident IM (Team A)', 'admission',
      'Admission note — AKI',
      `66 M referred by GP with creat 412 on routine bloods (baseline ~140–150, CKD 3b). 1 wk hx gout flare R 1st MTP, self-medicating diclofenac 75 BD ~6 d. Reduced intake, "hardly drinking", some dizziness standing. Poor urinary stream chronically (known BPH), pt thinks "less urine than usual" x2 d.

O/E: dry, JVP flat, postural drop 18 mmHg. Suprapubic fullness. R 1st MTP mildly red, settling.
Bladder scan: 380 ml residual → catheterised, 600 ml drained over 1st hr.
ECG: peaked T inferolat., K 6.1 → treated in ED (Ca gluconate, insulin/glucose).

Imp: AKI 3 on CKD 3b — multifactorial: NSAID + ACEi/thiazide + dehydration + element of obstruction (BPH).

Plan:
- STOP diclofenac, hold lisinopril/HCT, hold allopurinol? (kept tonight, review)
- IV crystalloid 2 L/24 h, strict fluid balance, daily wt
- Catheter in situ, monitor u/o hourly first 24 h
- Renal US today
- Repeat K 18:00 + ECG monitoring meanwhile
- Nephro consult if not improving / K refractory
- Urine dip, PCR, myeloma screen given age + renal impairment (light chains sent)`),
    note('28.06.2026 21:50', 'Fofana M.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Catheter draining well, urine dark then clearing. Output 18:00–21:00: 240 ml. Intake as charted, IVF running. Balance since adm +1250 ml (nursing chart). Tolerating diet. Gout pain 3/10, paracetamol given 20:00. Settled.`),
    note('29.06.2026 10:15', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 1',
      `S: Feels better, less dizzy. Drinking.
O/E: JVP visible, no oedema. MTP settling.
Wt 92.4 (+1.2 — refilling). Balance +2100/24 h per my calc (nursing chart says +1250? — chart totals don't include ED fluids, noted).
Labs: creat 366 ↓, K 5.0 ✓, bicarb 19.
US: no hydronephrosis post-catheter. So obstruction contributory but not primary.

A/P:
- Cont. IVF slower (500 ml 4-hourly, reassess each bag)
- Patiromer started for K margin
- Allopurinol held (nephro to advise re-dosing), colchicine 0.5 OD for flare cover
- Nephro consult requested — accepted, will see today
- Daily U+E, K in evening too if >5.5 AM`),
    note('29.06.2026 15:20', 'Iqbal S., Dr.', 'Nephrology consult', 'consult',
      'Nephrology — initial consult',
      `Thank you for referral. Reviewed hx, meds, US, labs.
Assessment: AKI stage 3 (KDIGO) on CKD 3b. Aetiology as per team: haemodynamic (NSAID+ACEi+thiazide+volume depletion) + partial outflow. No red flags for GN; urine bland apart from mild proteinuria (PCR 48 — chase repeat off catheter). Myeloma screen appropriately sent.
Recommendations:
1. Cont. volume repletion to euvolaemia then neutral balance. Target u/o >0.5–1 ml/kg/h.
2. Avoid nephrotoxics. Do NOT restart RAS blockade before creat <200 and stable; even then re-check 1 wk after restart (GP letter please).
3. Allopurinol: hold in flare; restart 100 mg OD when creat <250, uptitrate per urate.
4. Dialysis NOT indicated presently (no refractory K/acidosis/uraemia). Threshold: K>6.5 refractory, pH<7.15, urea >40 w/ sx, anuria.
5. Will re-review Fri 03.07. Please have light chains + repeat PCR available.
Dr. S. Iqbal, Nephrology, bleep 4471`),
    note('30.06.2026 09:30', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 2',
      `S: Well. Gout pain nearly gone.
O/E: euvolaemic. Catheter draining clear urine.
Wt 93.0 (+0.6). u/o 1900 ml/24 h.
Creat 312 ↓, K 4.8, bicarb 21.
A/P: taper IVF (last litre today), encourage PO 2 L/d. Cont. patiromer, colchicine. Bloods daily. Nephro re-review Fri. TWOC once creat <200 (d/w urology? — no, ward TWOC fine, tamsulosin on board).`),
    note('01.07.2026 09:10', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 3',
      `Improving. Creat 264. K 4.7. IVF stopped, drinking well, u/o excellent.
Plan unchanged. ANA/ANCA neg, complement normal (as expected). Light chains still pending — chase.
Wt 92.6.`),
    note('02.07.2026 09:25', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 4',
      `Creat 221, K 4.6 → patiromer stopped. Urate down. Asymptomatic.
Plan: nephro re-review tomorrow — main Qs: when restart lisinopril (or switch?), allopurinol restart dose, f/u interval. TWOC Sat if creat <200 tomorrow. Anticipate d/c early next week w/ GP + nephro OPD f/u.
Hb noted 12.8 (was 15.8 on adm) — haemodilution vs true? recheck with next draw, no bleeding clinically.`),
    note('02.07.2026 20:15', 'Fofana M.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Independent with ADLs. Catheter care done, site clean. Balance -400 today (target neutral/negative, ok per Dr. Carter). Asking when catheter comes out — informed likely weekend. Nil else.`),
  ],
};

export default p05;
