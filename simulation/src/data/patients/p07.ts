import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P07 — Lower-limb cellulitis, IV->PO switch done, DISCHARGE TODAY.
// Letter status: draft (started, incomplete). Key workflow-5 patient.

const p07: Patient = {
  id: 'p07',
  caseNo: '2607354',
  lastName: 'Palmer',
  firstName: 'Denise',
  sex: 'F',
  dob: '30.05.1977',
  age: 49,
  room: 'IM3-05',
  bed: '1',
  team: 'A',
  attending: 'Ostrowski M., Dr.',
  resident: 'Carter J., Dr.',
  mine: true,
  admitted: '28.06.2026 19:22',
  reason: 'L leg cellulitis — IV abx, switched to PO, discharge planned today',
  admissionDx: 'Cellulitis left lower leg (non-purulent), portal: interdigital tinea',
  problems: [
    'Cellulitis L lower leg — improving, demarcation regressing, on PO flucloxacillin since 01.07.',
    'Tinea pedis interdigital L — portal of entry, treated',
    'Obesity (BMI 36)',
    'Depression — on sertraline (continued)',
    'Chronic venous insufficiency — compression advice',
  ],
  allergiesBanner: 'NKDA',
  allergies: [
    { substance: 'No known drug allergies', reaction: '—', noted: 'ED triage 28.06.' },
  ],
  flags: ['Discharge planned 03.07.', 'Leg elevation + demarcation line marked'],
  acuity: 1,
  dischargeToday: true,
  letterStatus: 'draft',
  letterText: `DISCHARGE LETTER (DRAFT — not finalised)

Dear colleague,

Re: Denise Palmer, *30.05.1977, case 2607354
Admission: 28.06.2026 — Discharge: 03.07.2026

Diagnosis:
1. Cellulitis left lower leg (non-purulent)
2. Tinea pedis interdigital left — portal of entry
3. Obesity, chronic venous insufficiency
4. Depression (stable, medication continued)

Course:
Mrs Palmer presented 28.06. with a 3-day history of a painful, spreading erythema of the left lower leg with fever 38.6 °C. [TODO summarise course — see progress notes: IV flucloxacillin 28.06.–01.07., afebrile from 30.06., CRP falling, switched to oral 01.07., mobilising]

Discharge medication:
[TODO — reconcile: what continued / started / stopped vs admission — see med list]

Follow-up:
[TODO — GP review, duration of abx (total 10 d planned?? confirm with attending), terbinafine course, compression stockings once settled, weight mgmt referral offered?]

Kind regards,
Dr. J. Carter, Resident, Internal Medicine Team A`,
  handoverBy: 'Carter J., Dr.',
  nextOfKin: 'Partner: J. Okafor-Palmer, tel. 0157-555 0873 — transport home at discharge',
  admissionMeds: [
    { generic: 'Sertraline', brand: 'Zoloft', dose: '100 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Combined oral contraceptive', brand: 'Yasmin', dose: '', route: 'PO', schedule: '1-0-0', note: 'pt to discuss VTE risk w/ gynae — flagged, not actioned' },
    { generic: 'Ibuprofen', dose: '400 mg', route: 'PO', schedule: 'PRN headache', note: 'OTC' },
  ],
  meds: [
    {
      id: medId(), generic: 'Flucloxacillin', dose: '2 g', route: 'IV', schedule: 'q6h', prn: false,
      indication: 'cellulitis', status: 'stopped', started: '28.06.', stopped: '01.07.', source: 'inpatient',
      history: [
        { date: '28.06.', text: 'started IV 2 g q6h', by: 'ED (Osei)' },
        { date: '01.07.', text: 'switched to PO after 72 h afebrile + regression', by: 'Carter' },
      ],
    },
    {
      id: medId(), generic: 'Flucloxacillin', dose: '1 g', route: 'PO', schedule: '1-1-1-1', prn: false,
      indication: 'cellulitis — complete 10 d total', status: 'active', started: '01.07.', source: 'inpatient',
      history: [{ date: '01.07.', text: 'PO switch, to complete total 10 d (until 07.07. incl.)', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Terbinafine', brand: 'Lamisil', dose: '1 %', route: 'TOP', schedule: '1-0-1 interdigital L foot x 2 wks', prn: false,
      indication: 'tinea pedis (portal)', status: 'active', started: '29.06.', source: 'inpatient',
      history: [{ date: '29.06.', text: 'started', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Sertraline', brand: 'Zoloft', dose: '100 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'depression', status: 'active', started: '28.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Ethinylestradiol/drospirenone', brand: 'Yasmin', dose: '', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'contraception', status: 'active', started: '28.06.', source: 'home',
      history: [{ date: '30.06.', text: 'pharmacy flag: VTE risk w/ immobility+obesity — pt declined change, advised gynae r/v', by: 'Pharmacy (Chen)' }],
    },
    {
      id: medId(), generic: 'Ibuprofen', dose: '400 mg', route: 'PO', schedule: 'PRN', prn: true,
      indication: 'home PRN', status: 'stopped', started: '28.06.', stopped: '28.06.', source: 'home',
      history: [{ date: '28.06.', text: 'held — prefer paracetamol during infection (NSAID debate), restart at home if needed', by: 'Carter' }],
    },
    {
      id: medId(), generic: 'Paracetamol', dose: '1 g', route: 'PO', schedule: 'q6h PRN pain/fever', prn: true,
      indication: 'analgesia', status: 'active', started: '28.06.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Enoxaparin', brand: 'Clexane', dose: '40 mg', route: 'SC', schedule: '0-0-1', prn: false,
      indication: 'thromboprophylaxis (immobility, obesity, COC)', status: 'active', started: '28.06.', source: 'inpatient',
      history: [{ date: '03.07.', text: 'stop at discharge (mobilising)', by: 'Carter' }],
    },
  ],
  vitals: [
    { t: '28.06. 20:00', bp: '132/84', hr: 102, rr: 18, temp: 38.6, spo2: 97, o2: 'RA', pain: 6 },
    { t: '29.06. 06:00', bp: '128/80', hr: 94, rr: 16, temp: 38.1, spo2: 97, o2: 'RA', pain: 5 },
    { t: '29.06. 18:00', bp: '126/78', hr: 90, rr: 16, temp: 37.8, spo2: 98, o2: 'RA', pain: 4 },
    { t: '30.06. 06:00', bp: '124/78', hr: 84, rr: 14, temp: 37.2, spo2: 98, o2: 'RA', pain: 3 },
    { t: '30.06. 18:00', bp: '122/76', hr: 80, rr: 14, temp: 36.9, spo2: 98, o2: 'RA', pain: 2 },
    { t: '01.07. 06:00', bp: '120/76', hr: 78, rr: 14, temp: 36.7, spo2: 98, o2: 'RA', pain: 2 },
    { t: '02.07. 06:10', bp: '118/74', hr: 76, rr: 14, temp: 36.6, spo2: 98, o2: 'RA', pain: 1 },
    { t: '03.07. 06:15', bp: '120/76', hr: 74, rr: 14, temp: 36.5, spo2: 98, o2: 'RA', pain: 1 },
  ],
  labColumns: ['28.06. 20:15', '30.06. 06:20', '02.07. 06:15'],
  labs: [
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['14.6*H', '11.2*H', '8.9']),
      lt('Neutrophils', 'G/l', '1.8–7.0', ['12.4*H', '9.1*H', '6.2']),
      lt('Haemoglobin', 'g/dl', '12.0–15.5', ['13.4', '13.1', '13.2']),
      lt('Platelets', 'G/l', '150–400', ['312', '298', '286']),
    ]),
    panel('Clinical chemistry', [
      lt('CRP', 'mg/l', '<5', ['148*H', '62*H', '18*H']),
      lt('Sodium', 'mmol/l', '136–145', ['137', '138', '139']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['4.0', '4.1', '4.2']),
      lt('Creatinine', 'µmol/l', '44–80', ['68', '64', '66']),
      lt('Glucose (random)', 'mmol/l', '3.9–7.8', ['6.4', '5.8', '']),
      lt('HbA1c', '%', '<6.0', ['5.6', '', '']),
    ]),
    panel('Microbiology', [
      lt('Blood cultures x2', '', '', ['no growth (final)', '', '']),
      lt('Skin swab (interdigital)', '', '', ['', 'Candida/dermatophyte NOT isolated; mixed flora', '']),
    ]),
  ],
  agenda: [
    { date: '29.06.', item: 'Duplex US L leg (r/o DVT)', location: 'Angio lab', status: 'done', detail: 'no DVT' },
    { date: '03.07.', time: 'AM', item: 'Discharge planned — letter, meds to take home, GP fax', status: 'planned' },
    { date: '03.07.', item: 'Nurse: mark demarcation photo for GP letter', status: 'planned' },
  ],
  notes: [
    note('28.06.2026 20:40', 'Osei K., Dr.', 'ED physician', 'admission',
      'ED clerking',
      `49 F, 3 d painful red swelling L shin, spreading despite "leg cream". Fever + chills today. No trauma recalled. Interdigital maceration L foot noted.
Obs: T 38.6, HR 102, rest unremarkable. Well perfused.
Erythema medial L shin ~12x8 cm, hot, tender, no fluctuance, no crepitus. Demarcation marked. Wells low — but duplex requested given swelling (ward to arrange).
Bloods: WBC 14.6, CRP 148. Cultures x2 drawn.
Flucloxacillin 2 g IV given 20:10. Referred medicine.`),
    note('29.06.2026 09:50', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Post-take ward round',
      `S: Pain 5/10, felt feverish overnight.
O/E: erythema unchanged vs marked line, no progression. No fluctuance. Interdigital tinea L 3rd/4th space — likely portal.
Imp: non-purulent cellulitis, moderate. DDx DVT — duplex today.
Plan: cont. fluclox IV q6h. Elevation, paracetamol. Terbinafine topical for tinea. Duplex today. Daily demarcation check. If afebrile 48–72 h + regression → PO switch, aim total 10 d. HbA1c sent (r/o undiagnosed DM) — 5.6, fine.`),
    note('29.06.2026 14:30', 'Radiology', 'Angio lab', 'event',
      'Duplex ultrasound L leg — report',
      `Indication: unilateral leg swelling, r/o DVT.
Findings: common femoral, femoral, popliteal and calf veins compressible, normal flow/augmentation. Subcutaneous oedema medial calf consistent with cellulitis. No DVT.`),
    note('30.06.2026 09:35', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 2',
      `Afebrile since 18:00 yesterday (37.2 this AM, trending down). Erythema regressing ~2 cm inside line. Pain 3/10.
WBC 11.2 ↓, CRP 62 ↓.
Plan: cont. IV today, if still afebrile tomorrow AM → PO switch (fluclox 1 g QDS), then d/c planning Thu/Fri. Compression stockings once acute phase settled — advice given. Pharmacy raised COC/VTE point (see their note) — discussed, pt declined change, gynae r/v advised, document in letter.`),
    note('30.06.2026 13:15', 'Chen L.', 'Clinical pharmacy', 'pharmacy',
      'Medication review',
      `COC (Yasmin) + obesity + acute infection/immobility = elevated VTE risk. Raised w/ team; prophylactic enoxaparin already charted ✓. Recommend documenting gynae review advice in discharge letter. Ibuprofen (home PRN) held during admission — no strong evidence NSAIDs worsen cellulitis but team preference; pt may resume after abx course if needed. Fluclox PO switch dosing confirmed 1 g QDS (wt >100 kg? — 104 kg, upper dosing appropriate). Take-home meds to order: fluclox until 07.07. incl., terbinafine cream 2 wks.`),
    note('01.07.2026 09:20', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 3 — PO switch',
      `Afebrile >48 h. Erythema clearly regressing, now faint. Mobilising freely.
→ Switched flucloxacillin IV → PO 1 g QDS (day 4 of total 10 planned, PO until 07.07. incl.).
Plan: observe 48 h on PO (attending: can be shortened if remains well), d/c likely Fri 03.07. Started discharge letter draft. GP letter to include: tinea treatment, compression advice, gynae/COC discussion, weight mgmt offer (pt interested in dietician OPD referral — form pending).`),
    note('02.07.2026 09:10', 'Carter J., Dr.', 'Resident IM (Team A)', 'progress',
      'Ward round — day 4',
      `Well on PO abx, afebrile, CRP 18. Erythema nearly resolved, faint discolouration only.
Plan: DISCHARGE TOMORROW (03.07.) if unchanged. To do: finalise letter (draft in system), meds-to-take-home order, stop enoxaparin on d/c, dietician OPD referral form, GP fax. Attending informed & agrees.`),
    note('02.07.2026 21:00', 'Okonkwo B.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Independent. Leg elevated most of day, skin intact, marked line now well outside faint erythema. Pt happy re discharge tomorrow, transport by partner. Take-home meds not yet on ward — pharmacy order pending (day team).`),
  ],
};

export default p07;
