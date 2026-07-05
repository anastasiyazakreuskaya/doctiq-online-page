import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P15 — Elderly post-fall with delirium on dementia background. Team B.
// Falls flags, 1:1 sitter, med list with anticholinergic clutter.
// Inconsistency: banner says NKDA, allergy list carries a tramadol entry added mid-stay.

const p15: Patient = {
  id: 'p15',
  caseNo: '2607401',
  lastName: 'Nussbaum',
  firstName: 'Albert',
  sex: 'M',
  dob: '30.01.1938',
  age: 88,
  room: 'IM3-10',
  bed: '1',
  team: 'B',
  attending: 'Lindqvist H., Dr.',
  resident: 'Patel S., Dr.',
  mine: false,
  admitted: '29.06.2026 18:37',
  reason: 'Fall at care home, hyperactive delirium on dementia — no fracture, delirium work-up/treatment',
  admissionDx: 'Fall (mechanical? in context of acute delirium), background moderate Alzheimer dementia',
  problems: [
    'Hyperactive delirium — improving; cause: UTI + dehydration + environment change',
    'Fall at care home 29.06. — CT head + pelvis/hip XR: no acute injury',
    'Moderate Alzheimer dementia (MMSE 17/30 in 2025) — baseline: orientated to person, pleasant',
    'UTI (E. faecalis) — on amoxicillin day 3/5',
    'Dehydration — resolved',
    'Polypharmacy — amitriptyline stopped (anticholinergic burden)',
    'Care home resident — return planned when delirium resolved',
  ],
  allergiesBanner: 'NKDA',
  allergies: [
    { substance: 'Tramadol', reaction: 'agitation/confusion (this admission, 30.06.) — avoid', noted: 'added by Dr. Patel 30.06. — NB banner not updated' },
  ],
  flags: ['FALLS RISK HIGH', '1:1 sitter (daytime)', 'Bed sensor mat', 'Delirium — reorientation protocol'],
  acuity: 2,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Varga T., Dr. (night team)',
  nextOfKin: 'Son: R. Nussbaum (health care proxy), tel. 0160-555 0242 · Care home: Rosengarten, station 2, tel. 555-3300',
  admissionMeds: [
    { generic: 'Donepezil', brand: 'Aricept', dose: '10 mg', route: 'PO', schedule: '0-0-1' },
    { generic: 'Amitriptyline', dose: '25 mg', route: 'PO', schedule: '0-0-1', note: '"for sleep", on list for years' },
    { generic: 'Ramipril', dose: '2.5 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Simvastatin', dose: '20 mg', route: 'PO', schedule: '0-0-1', note: 'indication in 88 y/o w/ dementia — questionable' },
    { generic: 'Macrogol', brand: 'Movicol', dose: '1 sachet', route: 'PO', schedule: '1-0-0' },
    { generic: 'Colecalciferol', dose: '1000 IU', route: 'PO', schedule: '1-0-0' },
  ],
  meds: [
    {
      id: medId(), generic: 'Amoxicillin', dose: '1 g', route: 'PO', schedule: '1-1-1 (d3/5)', prn: false,
      indication: 'UTI (E. faecalis sensitive)', status: 'active', started: '01.07.', source: 'inpatient',
      history: [{ date: '01.07.', text: 'started on culture result (was on no abx before — dip alone not treated per policy, culture grew)', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Donepezil', brand: 'Aricept', dose: '10 mg', route: 'PO', schedule: '0-0-1', prn: false,
      indication: 'dementia', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Amitriptyline', dose: '25 mg', route: 'PO', schedule: '0-0-1', prn: false,
      indication: '"sleep" — STOPPED (anticholinergic, delirium)', status: 'stopped', started: '29.06.', stopped: '30.06.', source: 'home',
      history: [{ date: '30.06.', text: 'stopped — anticholinergic burden in delirium; do NOT restart; care home letter to note', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Tramadol', dose: '50 mg', route: 'PO', schedule: 'given x1 30.06.', prn: true,
      indication: 'hip contusion pain — caused agitation, avoid', status: 'stopped', started: '30.06.', stopped: '30.06.', source: 'inpatient',
      history: [{ date: '30.06.', text: 'single dose → marked agitation; documented as adverse reaction', by: 'Night team (Varga)' }],
    },
    {
      id: medId(), generic: 'Paracetamol', dose: '1 g', route: 'PO', schedule: '1-1-1 fixed (pain control base)', prn: false,
      indication: 'contusion pain', status: 'active', started: '30.06.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Ramipril', dose: '2.5 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'HTN', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Simvastatin', dose: '20 mg', route: 'PO', schedule: '0-0-1', prn: false,
      indication: 'primary prevention — deprescribing candidate, d/w GP at discharge', status: 'active', started: '29.06.', source: 'home',
      history: [{ date: '02.07.', text: 'pharmacy: suggest stop (age, dementia, no ASCVD) — decision deferred to d/c letter', by: 'Chen' }],
    },
    {
      id: medId(), generic: 'Macrogol', brand: 'Movicol', dose: '1 sachet', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'constipation (also delirium factor)', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Colecalciferol', dose: '1000 IU', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'vit D', status: 'active', started: '29.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Risperidone', dose: '0.25 mg', route: 'PO', schedule: 'PRN severe agitation w/ risk, max BD — LAST RESORT', prn: true,
      indication: 'delirium (non-pharm first!)', status: 'active', started: '30.06.', source: 'inpatient',
      history: [{ date: '30.06.', text: 'charted after tramadol episode; used 30.06. + 01.07. evening, NOT since', by: 'Patel' }],
    },
  ],
  vitals: [
    { t: '29.06. 19:00', bp: '146/82', hr: 92, rr: 18, temp: 37.6, spo2: 95, o2: 'RA', note: 'agitated, CAM positive' },
    { t: '30.06. 06:00', bp: '138/78', hr: 84, rr: 16, temp: 37.4, spo2: 96, o2: 'RA' },
    { t: '30.06. 22:00', bp: '142/80', hr: 96, rr: 18, temp: 37.2, spo2: 95, o2: 'RA', note: 'agitation post-tramadol, risperidone given' },
    { t: '01.07. 06:00', bp: '134/76', hr: 78, rr: 16, temp: 37.1, spo2: 96, o2: 'RA' },
    { t: '02.07. 06:00', bp: '132/74', hr: 74, rr: 14, temp: 36.8, spo2: 96, o2: 'RA', note: 'calmer, CAM improving' },
    { t: '03.07. 06:00', bp: '130/74', hr: 72, rr: 14, temp: 36.7, spo2: 96, o2: 'RA', note: 'slept 6 h, no sitter needed o/n' },
  ],
  labColumns: ['29.06. 19:15', '30.06. 06:20', '02.07. 06:15'],
  labs: [
    panel('Clinical chemistry', [
      lt('Sodium', 'mmol/l', '136–145', ['147*H', '144', '141']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['4.4', '4.2', '4.1']),
      lt('Urea', 'mmol/l', '2.8–8.1', ['12.4*H', '9.8*H', '6.2']),
      lt('Creatinine', 'µmol/l', '59–104', ['124*H', '108*H', '92']),
      lt('CRP', 'mg/l', '<5', ['48*H', '52*H', '21*H']),
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['6.2', '5.8', '']),
      lt('TSH', 'mU/l', '0.27–4.2', ['', '2.1', '']),
      lt('Vitamin B12', 'pmol/l', '145–569', ['', '288', '']),
    ]),
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['12.8*H', '11.9*H', '8.6']),
      lt('Haemoglobin', 'g/dl', '13.5–17.2', ['13.8', '12.9', '12.6*L']),
      lt('Platelets', 'G/l', '150–400', ['214', '208', '221']),
    ]),
    panel('Urine', [
      lt('Urine dipstick', '', '', ['leuc++, nitrite neg', '', '']),
      lt('Urine culture', '', '', ['PEND', 'E. faecalis 10^5, amox S', '']),
    ]),
  ],
  agenda: [
    { date: '29.06.', item: 'CT head + XR pelvis/hip', location: 'Radiology', status: 'done', detail: 'no bleed, no fracture; chronic microangiopathy' },
    { date: '01.07.', item: 'Geriatrics liaison review', status: 'done' },
    { date: '03.07.', time: '14:30', item: 'Family + care home meeting (return planning, med changes)', location: 'ward meeting room', status: 'planned' },
    { date: '05.07.', item: 'Possible return to care home if delirium resolved', status: 'planned' },
  ],
  notes: [
    note('29.06.2026 20:10', 'Varga T., Dr.', 'Night resident (cross-cover)', 'admission',
      'Admission — fall + delirium',
      `88 M from Rosengarten care home. Found on floor by bed 17:30, no witnessed head strike. Since ~2 d "more confused than usual", poor intake, pulling at clothes (per transfer sheet — sparse).
Baseline (phoned care home): moderate Alzheimer, orientated to person, mobile w/ rollator, pleasant, feeds self.
Now: hyperactive delirium (CAM +), trying to climb out, picking. T 37.6.
CT head: no bleed. XR pelvis/hip: no #. L hip contusion, bruise.
Dip: leuc++ → culture sent (nitrite neg — not treating on dip alone, watch).
Bloods: Na 147, urea 12.4, creat 124 → dehydration. Slow IV fluids o/n.
Mx: delirium protocol (reorientation, lighting, glasses?? — hearing aid at home, ask family to bring), sitter arranged, avoid catheter, avoid sedation if possible.`),
    note('30.06.2026 10:25', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Post-take round',
      `Calmer daytime. Drinking w/ encouragement.
Meds reviewed: amitriptyline 25 (years, "for sleep") — STOPPED, anticholinergic + falls. Rest continued. Statin deprescribing → letter discussion.
Hip pain on movement → paracetamol fixed TDS. (Tramadol PRN charted by o/n team — would prefer avoid, see what pain does.)
Await urine culture. Fluids: switch to PO push.
Collateral: son to visit, bring hearing aid + glasses.`),
    note('01.07.2026 08:05', 'Varga T., Dr.', 'Night resident (cross-cover)', 'night',
      'Overnight events 30.06./01.07.',
      `20:30 tramadol 50 given for hip pain (evening nurse per PRN chart) → within 1 h marked agitation, climbing, pulling IV out. Non-pharm measures 45 min insufficient, risk of self-harm → risperidone 0.25 given 22:15, settled by 23:00.
ADVERSE REACTION documented: tramadol → agitation. Added to allergy/ADR list. Please remove tramadol from PRN chart (done by me 01:10) and someone update the banner (still says NKDA).`),
    note('01.07.2026 11:35', 'Brenner E., Dr.', 'Geriatrics liaison', 'consult',
      'Geriatric liaison review',
      `Thank you. Reviewed. Delirium multifactorial: UTI (culture now +ve E. faecalis — treat, amox 5 d), dehydration (resolving), environment, pain, anticholinergic burden (amitriptyline correctly stopped).
Recommendations:
1. Amoxicillin 1 g TDS 5 d per sensitivity ✓ (started this morning)
2. Continue non-pharm delirium bundle; risperidone strictly last resort, taper off use asap
3. Pain: fixed paracetamol adequate; AVOID tramadol (ADR) & NSAIDs
4. Mobilise TDS w/ PT — deconditioning risk
5. Bone health: fall in 88 y/o — vit D continues, consider DEXA/bisphosphonate discussion at care home GP level, document in letter
6. Return to familiar care home environment ASAP once safe — familiar surroundings are therapeutic. Family meeting good idea.
Will re-review Mon or on request.`),
    note('02.07.2026 09:40', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round',
      `Much better. CAM: improving, hypoactive periods only. Slept without risperidone last night. Knows he's "in hospital because of a tumble".
Amox d2, CRP falling. Creat back to ~baseline 92. Eating w/ setup.
PT walked him w/ rollator 2x — steady at his baseline.
Plan: family/care-home meeting Fri 14:30 (med changes: amitriptyline STOP, tramadol ADR, ?statin stop; falls measures; hearing aid arrived ✓). Aim return Sun/Mon if stable.`),
    note('02.07.2026 21:30', 'Okonkwo B.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Settled evening, watched TV in day room. Sitter stood down from 19:00 (re-assess daily). Bed sensor on. Ate well w/ encouragement. No agitation. Son phoned — confirmed attending meeting tomorrow 14:30.`),
  ],
};

export default p15;
