import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P04 — DKA, transitioned off insulin infusion (Team B).

const p04: Patient = {
  id: 'p04',
  caseNo: '2607455',
  lastName: 'Brooks',
  firstName: 'Tyler',
  sex: 'M',
  dob: '02.12.2001',
  age: 24,
  room: 'IM3-02',
  bed: '2',
  team: 'B',
  attending: 'Lindqvist H., Dr.',
  resident: 'Patel S., Dr.',
  mine: false,
  admitted: '30.06.2026 02:15',
  reason: 'DKA (new T1DM debut?) — off infusion since 02.07., diabetes education ongoing',
  admissionDx: 'Diabetic ketoacidosis, first presentation — new type 1 diabetes',
  problems: [
    'DKA resolved — transitioned to basal-bolus 02.07.',
    'New diagnosis type 1 diabetes — antibodies pending, education started',
    'Hypokalaemia during treatment — resolved',
    'Psychosocial: student, lives in shared flat, initially "overwhelmed" — diabetes nurse + psych liaison offered',
  ],
  allergiesBanner: 'NKDA',
  allergies: [],
  flags: ['BG profile 7-point', 'Diabetes team following'],
  acuity: 2,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Patel S., Dr.',
  nextOfKin: 'Mother: C. Brooks, tel. 0170-555 0651 (informed 30.06. with pt consent) · flatmate visits',
  admissionMeds: [],
  meds: [
    {
      id: medId(), generic: 'Insulin human (infusion)', brand: 'Actrapid', dose: '0.1 IU/kg/h adj.', route: 'IV', schedule: 'DKA protocol', prn: false,
      indication: 'DKA', status: 'stopped', started: '30.06.', stopped: '02.07.', source: 'inpatient',
      history: [
        { date: '30.06.', text: 'started per protocol w/ balanced crystalloid + K', by: 'Night team (Varga)' },
        { date: '02.07.', text: 'stopped 08:30, 1 h after first SC basal dose, gap ok', by: 'Diabetes team (Wagner)' },
      ],
    },
    {
      id: medId(), generic: 'Insulin glargine', brand: 'Lantus', dose: '22 IU', route: 'SC', schedule: '0-0-0-1 (22:00)', prn: false,
      indication: 'basal', status: 'active', started: '02.07.', source: 'inpatient',
      history: [{ date: '02.07.', text: 'started 0.25 IU/kg basal', by: 'Wagner' }],
    },
    {
      id: medId(), generic: 'Insulin aspart', brand: 'NovoRapid', dose: '6–8 IU', route: 'SC', schedule: 'AC meals per carbs + correction', prn: false,
      indication: 'bolus', status: 'active', started: '02.07.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Potassium chloride', dose: '40 mmol/l in fluids', route: 'IV', schedule: 'per protocol', prn: false,
      indication: 'K replacement during DKA', status: 'stopped', started: '30.06.', stopped: '01.07.', source: 'inpatient', history: [],
    },
  ],
  vitals: [
    { t: '30.06. 02:30', bp: '104/62', hr: 122, rr: 28, temp: 37.1, spo2: 99, o2: 'RA', note: 'Kussmaul breathing, drowsy' },
    { t: '30.06. 08:00', bp: '112/68', hr: 104, rr: 22, spo2: 99, o2: 'RA' },
    { t: '30.06. 20:00', bp: '116/70', hr: 92, rr: 18, temp: 36.9, spo2: 99, o2: 'RA' },
    { t: '01.07. 06:00', bp: '118/72', hr: 84, rr: 16, temp: 36.8, spo2: 99, o2: 'RA' },
    { t: '02.07. 06:00', bp: '120/74', hr: 76, rr: 14, temp: 36.7, spo2: 99, o2: 'RA' },
    { t: '03.07. 06:00', bp: '118/72', hr: 72, rr: 14, temp: 36.6, spo2: 99, o2: 'RA' },
  ],
  labColumns: ['30.06. 02:30', '30.06. 08:00', '30.06. 20:00', '01.07. 06:15', '02.07. 06:10', '03.07. 06:05'],
  labs: [
    panel('Blood gas / DKA panel', [
      lt('pH', '', '7.35–7.45', ['7.12*LL', '7.24*L', '7.34*L', '7.39', '7.41', '']),
      lt('HCO3', 'mmol/l', '22–26', ['9*LL', '13*L', '18*L', '22', '24', '']),
      lt('Beta-hydroxybutyrate', 'mmol/l', '<0.6', ['6.8*HH', '4.2*H', '1.8*H', '0.5', '0.3', '']),
      lt('Anion gap', 'mmol/l', '8–16', ['26*H', '20*H', '15', '12', '', '']),
    ]),
    panel('Clinical chemistry', [
      lt('Glucose', 'mmol/l', '3.9–7.8', ['32.4*HH', '18.6*H', '11.2*H', '9.4*H', '8.1*H', '7.6']),
      lt('Sodium', 'mmol/l', '136–145', ['131*L', '134*L', '137', '139', '140', '139']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['5.4*H', '3.9', '3.3*L', '3.7', '4.0', '4.1']),
      lt('Creatinine', 'µmol/l', '59–104', ['118*H', '96', '82', '74', '71', '']),
      lt('HbA1c', '%', '<6.0', ['12.1*HH', '', '', '', '', '']),
    ]),
    panel('Immunology', [
      lt('Anti-GAD / IA-2 antibodies', '', '', ['', '', 'PEND', 'PEND', 'PEND', 'PEND']),
      lt('C-peptide', 'nmol/l', '0.37–1.47', ['', '0.12*L', '', '', '', '']),
    ]),
  ],
  agenda: [
    { date: '02.07.', item: 'Diabetes team — SC transition + education session 1', status: 'done' },
    { date: '03.07.', time: '14:00', item: 'Diabetes education session 2 (carb counting, hypo mgmt)', location: 'ward, DSN Wagner', status: 'planned' },
    { date: '04.07.', item: 'Education session 3 + sick-day rules; d/c early next week', status: 'planned' },
  ],
  notes: [
    note('30.06.2026 03:40', 'Varga T., Dr.', 'Night resident (cross-cover)', 'admission',
      'Admission — DKA',
      `24 M student, 2 wks polyuria/polydipsia, 5 kg wt loss, 2 d vomiting + abdo pain. No known diabetes.
On arrival: drowsy GCS 14, Kussmaul, dry++. BG 32.4, ketones 6.8, pH 7.12 → severe DKA.
DKA protocol started 02:40: balanced crystalloid, insulin 0.1 IU/kg/h, K per level (initial 5.4, watch fall). Hourly BG/ketones, 2-hourly gas + K initially.
Precipitant: none obvious (no infection signs) — likely T1DM debut. C-peptide + antibodies sent.
HDU-threshold discussed: currently ward-manageable w/ 1:1 obs first hours, escalate if pH <7.0 / K <3.0 / GCS drops.`),
    note('30.06.2026 09:30', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Post-take round',
      `Much brighter. pH 7.24, ketones 4.2, BG 18.6 — protocol on track, glucose added to fluids at BG <14.
K 3.9 → replacement continues. Abdo pain resolved (DKA-related).
HbA1c 12.1 — weeks of hyperglycaemia, consistent w/ debut. Diabetes team referred.`),
    note('01.07.2026 10:10', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round',
      `DKA biochemically resolving (ketones 0.5, HCO3 22). Eating this AM. K dipped 3.3 o/n → corrected.
Plan: transition to SC basal-bolus tomorrow AM w/ diabetes team supervision, stop infusion 1 h after basal. Education programme to start. Psych liaison offered (initially tearful, "overwhelmed") — pt will think about it.`),
    note('02.07.2026 11:30', 'Wagner K.', 'Diabetes nurse specialist', 'consult',
      'Diabetes team — transition + education',
      `SC transition done: glargine 22 IU (0.25/kg) 08:00 (exceptionally AM dose for transition, move to 22:00 from tonight), aspart w/ meals per carb estimate + correction factor 1:3.
Infusion off 08:30. BGs today 8–11, no hypos.
Education session 1 done: injection technique ✓, BG meter ✓, hypo recognition basics. Session 2 Fri (carb counting), session 3 Sat (sick-day rules, ketone testing). Needs: GP letter, diabetes OPD within 2 wks, ophthalmology baseline, driving/DVLA-equivalent advice given. Flash glucose monitor discussed — prescription at OPD.`),
    note('02.07.2026 21:40', 'Yilmaz D.', 'Nursing (night shift)', 'nursing',
      'Shift note',
      `First glargine 22:00 dose given (self-injected under supervision — good technique). BG 22:00: 9.6. Mood better, flatmate visited. No concerns o/n.`),
  ],
};

export default p04;
