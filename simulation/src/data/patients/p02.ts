import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P02 — COPD exacerbation (Team B, not "mine").

const p02: Patient = {
  id: 'p02',
  caseNo: '2607422',
  lastName: 'Jenkins',
  firstName: 'Harold',
  sex: 'M',
  dob: '11.08.1954',
  age: 71,
  room: 'IM3-01',
  bed: '2',
  team: 'B',
  attending: 'Lindqvist H., Dr.',
  resident: 'Patel S., Dr.',
  mine: false,
  admitted: '29.06.2026 15:48',
  reason: 'AECOPD — nebs + steroids, weaning O2, aim discharge weekend',
  admissionDx: 'Acute exacerbation of COPD (GOLD III), non-infective vs viral trigger',
  problems: [
    'AECOPD — day 5, improving, prednisolone taper',
    'COPD GOLD III (FEV1 38 % 2025) — LTOT assessed 2024: not indicated',
    'Ex-smoker (stopped 2022, 55 py)',
    'Ischaemic heart disease — stents 2019',
    'Anxiety with dyspnoea episodes',
  ],
  allergiesBanner: 'NKDA',
  allergies: [],
  flags: ['O2 target 88–92 %'],
  acuity: 2,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Patel S., Dr.',
  admissionMeds: [
    { generic: 'Tiotropium', brand: 'Spiriva', dose: '18 µg', route: 'INH', schedule: '1-0-0' },
    { generic: 'Salmeterol/fluticasone', brand: 'Viani', dose: '50/500', route: 'INH', schedule: '1-0-1' },
    { generic: 'Salbutamol', brand: 'Ventolin', dose: '100 µg', route: 'INH', schedule: 'PRN' },
    { generic: 'Aspirin', dose: '100 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Atorvastatin', dose: '40 mg', route: 'PO', schedule: '0-0-1' },
    { generic: 'Bisoprolol', dose: '2.5 mg', route: 'PO', schedule: '1-0-0' },
  ],
  meds: [
    {
      id: medId(), generic: 'Salbutamol/ipratropium', dose: '2.5/0.5 mg', route: 'NEB', schedule: 'q6h + q2h PRN', prn: false,
      indication: 'AECOPD', status: 'active', started: '29.06.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'reduced from q4h to q6h', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Prednisolone', dose: '40 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'AECOPD — 5 d course, last day 03.07.', status: 'active', started: '29.06.', source: 'inpatient',
      history: [{ date: '29.06.', text: '40 mg x5 d, no taper needed', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Amoxicillin/clavulanate', brand: 'Augmentin', dose: '875/125 mg', route: 'PO', schedule: '1-0-1', prn: false,
      indication: 'started empirically, STOPPED — CRP low, no purulence', status: 'stopped', started: '29.06.', stopped: '30.06.', source: 'inpatient',
      history: [{ date: '30.06.', text: 'stopped after review — Anthonisen criteria not met', by: 'Lindqvist' }],
    },
    {
      id: medId(), generic: 'Tiotropium', brand: 'Spiriva', dose: '18 µg', route: 'INH', schedule: '1-0-0', prn: false,
      indication: 'COPD', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Salmeterol/fluticasone', brand: 'Viani', dose: '50/500', route: 'INH', schedule: '1-0-1', prn: false,
      indication: 'COPD', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Aspirin', dose: '100 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'IHD', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Atorvastatin', dose: '40 mg', route: 'PO', schedule: '0-0-1', prn: false,
      indication: 'IHD', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Bisoprolol', dose: '2.5 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'IHD (cardioselective — continued in COPD)', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Lorazepam', dose: '0.5 mg', route: 'PO', schedule: 'PRN severe dyspnoea-anxiety, max 2/d', prn: true,
      indication: 'anxiety spiral w/ dyspnoea', status: 'active', started: '30.06.', source: 'inpatient',
      history: [{ date: '30.06.', text: 'started after panic episode, used x2 total', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Enoxaparin', brand: 'Clexane', dose: '40 mg', route: 'SC', schedule: '0-0-1', prn: false,
      indication: 'prophylaxis', status: 'active', started: '29.06.', source: 'inpatient', history: [],
    },
  ],
  vitals: [
    { t: '29.06. 16:10', bp: '148/86', hr: 104, rr: 26, temp: 37.2, spo2: 84, o2: 'RA → 2 L NC', note: 'accessory muscles' },
    { t: '30.06. 06:00', bp: '142/82', hr: 96, rr: 22, temp: 36.9, spo2: 89, o2: '2 L NC' },
    { t: '01.07. 06:00', bp: '138/80', hr: 92, rr: 20, temp: 36.8, spo2: 90, o2: '1 L NC' },
    { t: '02.07. 06:00', bp: '136/78', hr: 88, rr: 18, temp: 36.7, spo2: 91, o2: '1 L NC' },
    { t: '03.07. 06:00', bp: '134/78', hr: 84, rr: 18, temp: 36.6, spo2: 90, o2: 'RA', note: 'first RA reading in target' },
  ],
  labColumns: ['29.06. 16:20', '30.06. 06:15', '02.07. 06:10'],
  labs: [
    panel('Blood gas (arterial)', [
      lt('pH', '', '7.35–7.45', ['7.33*L', '7.38', '']),
      lt('pCO2', 'mmHg', '35–45', ['54*H', '48*H', '']),
      lt('pO2', 'mmHg', '75–100', ['52*L', '61*L', '']),
      lt('HCO3', 'mmol/l', '22–26', ['28*H', '28*H', '']),
    ]),
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['11.8*H', '13.4*H', '10.9*H']),
      lt('Eosinophils', 'G/l', '0.02–0.5', ['0.06', '', '']),
      lt('Haemoglobin', 'g/dl', '13.5–17.2', ['16.8', '16.2', '15.9']),
    ]),
    panel('Clinical chemistry', [
      lt('CRP', 'mg/l', '<5', ['12*H', '9*H', '6*H']),
      lt('Sodium', 'mmol/l', '136–145', ['139', '140', '141']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['4.2', '3.9', '3.7']),
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['7.4', '9.8*H', '10.4*H']),
      lt('Creatinine', 'µmol/l', '59–104', ['84', '82', '80']),
    ]),
    panel('Microbiology / virology', [
      lt('Resp. viral panel (PCR)', '', '', ['', 'Rhinovirus POS', '']),
      lt('Sputum culture', '', '', ['', 'mixed resp. flora', '']),
    ]),
  ],
  agenda: [
    { date: '29.06.', item: 'CXR', status: 'done', detail: 'hyperinflation, no consolidation' },
    { date: '03.07.', item: 'Last prednisolone day — no taper', status: 'planned' },
    { date: '03.07.', item: 'Wean nebs → inhalers, check technique (nurse specialist)', status: 'planned' },
    { date: '04.07.', item: 'Possible discharge if stable on inhalers + RA', status: 'planned' },
  ],
  notes: [
    note('29.06.2026 17:05', 'Patel S., Dr.', 'Resident IM (Team B)', 'admission',
      'Admission — AECOPD',
      `71 M, 3 d worsening dyspnoea + wheeze, clear sputum, coryzal prodrome. No fever. No CP.
O/E: prolonged expiration, wheeze throughout, RR 26, SpO2 84 % RA → target 88–92 % on 2 L.
ABG: compensated resp. acidosis, pCO2 54 (chronic retainer, HCO3 28).
Rx: nebs q4h, pred 40 x5 d, Augmentin started empirically (r/v — sputum clear!). CXR no consolidation.
Escalation: NIV if pH <7.30 / worsening — discussed w/ pt, agreeable. Ceiling: NIV yes, invasive ventilation to be discussed w/ attending + family if it comes to it (pt: "no machines long-term").`),
    note('30.06.2026 10:20', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round — day 1',
      `Better. RR 22, sats 89 % on 2 L (in target). ABG improved.
CRP only 12, sputum clear, viral panel: rhinovirus → antibiotics STOPPED (Dr. Lindqvist).
Panic episode 09:15 w/ desaturation to 85 % — settled w/ reassurance + neb; lorazepam 0.5 PRN charted (max 2/d, watch CO2).
Cont. nebs q4h, pred d2/5. BG creeping on steroids — QID BGs, sliding scale threshold >12.`),
    note('01.07.2026 11:00', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round — day 2',
      `Steady progress. O2 1 L. Walked corridor w/ physio, sats dipped 86 % transiently, recovered.
Plan: cont., aim neb wean tomorrow. Pulm rehab referral (declined 2024 — try again, pt now interested). Flu/COVID/pneumococcal vaccination status — GP letter.`),
    note('02.07.2026 10:35', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round — day 3',
      `Nebs q6h, tolerating. Sats 91 % on 1 L, RA trial this evening. Pred d4/5.
Plan: inhaler technique review by resp. nurse specialist Fri, switch nebs→inhalers Fri, aim d/c Sat if RA sats ≥88 % sustained. BGs 9–11 on steroids — no insulin needed, resolves post-course, GP letter mention.`),
    note('02.07.2026 22:10', 'Yilmaz D.', 'Nursing (night shift)', 'nursing',
      'Shift note',
      `RA since 18:00, sats 88–90 % sleeping. One anxiety episode 20:30, settled w/o lorazepam (breathing exercises). Slept most of shift.`),
  ],
};

export default p02;
