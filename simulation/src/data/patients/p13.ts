import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P13 — Pulmonary embolism on therapeutic anticoagulation. Team B.
// Discharge letter status: READY (written early — discharge planned Monday).

const p13: Patient = {
  id: 'p13',
  caseNo: '2607338',
  lastName: 'Okafor',
  firstName: 'Samuel',
  sex: 'M',
  dob: '14.09.1973',
  age: 52,
  room: 'IM3-09',
  bed: '2',
  team: 'B',
  attending: 'Lindqvist H., Dr.',
  resident: 'Patel S., Dr.',
  mine: false,
  admitted: '27.06.2026 08:50',
  reason: 'Intermediate-low risk PE — on apixaban, mobilising, d/c planned Monday (letter ready)',
  admissionDx: 'Acute bilateral segmental pulmonary embolism, intermediate-low risk (sPESI 1, RV borderline)',
  problems: [
    'Bilateral segmental PE — provoked? (long-haul flight 23.06.) — apixaban, planned 3 mo then review',
    'Borderline RV strain on CTPA, troponin negative — monitored, resolved clinically',
    'R calf DVT on duplex',
    'Obesity BMI 33',
    'OSA suspected (STOP-Bang 5) — sleep study OPD referral made',
  ],
  allergiesBanner: 'NKDA',
  allergies: [],
  flags: ['Mobilising freely'],
  acuity: 1,
  dischargeToday: false,
  letterStatus: 'ready',
  letterText: `DISCHARGE LETTER (READY FOR SIGN-OFF — d/c planned Mon 06.07.)

Dear colleague,

Re: Samuel Okafor, *14.09.1973, case 2607338
Admission: 27.06.2026 — Discharge: 06.07.2026 (planned)

Diagnoses:
1. Acute bilateral segmental pulmonary embolism, intermediate-low risk (sPESI 1, borderline RV dilatation, troponin negative), provoked — long-haul flight 23.06.
2. Deep vein thrombosis right calf
3. Obesity (BMI 33); suspected obstructive sleep apnoea (STOP-Bang 5/8)

Course:
Mr Okafor presented with pleuritic chest pain and exertional dyspnoea three days after a long-haul flight. CTPA confirmed bilateral segmental PE; duplex showed a right calf DVT. He was risk-stratified as intermediate-low (sPESI 1 for HR>110 on arrival only; troponin negative; borderline RV on imaging) and monitored for 48 h without deterioration. Apixaban was started at treatment dose. He mobilised early and has been asymptomatic at rest since 30.06.

Discharge medication:
- Apixaban 10 mg 1-0-1 until 04.07. incl. (7-day loading), then 5 mg 1-0-1 — planned duration 3 months, then review (provoked event → likely stop; thrombophilia work-up NOT indicated per guideline)
- (No other regular medication; patient took none at home)

Recommendations:
- Anticoagulation review at 3 months (GP or thrombosis clinic) — decision re stopping
- Sleep study referral sent (suspected OSA) — patient will be contacted
- Weight management discussed; patient motivated, dietician OPD leaflet given
- Avoid long-haul flights for 2 weeks; compression stocking fitted for R leg (thigh-length, 6 wks for post-thrombotic prophylaxis)
- Red-flag advice given (new dyspnoea/syncope/haemoptysis → immediate re-presentation)

Kind regards,
Dr. S. Patel, Resident, Internal Medicine Team B
(countersign: Dr. H. Lindqvist)`,
  handoverBy: 'Patel S., Dr.',
  admissionMeds: [],
  meds: [
    {
      id: medId(), generic: 'Apixaban', brand: 'Eliquis', dose: '10 mg', route: 'PO', schedule: '1-0-1 (loading until 04.07.)', prn: false,
      indication: 'PE/DVT treatment', status: 'active', started: '27.06.', source: 'inpatient',
      history: [
        { date: '27.06.', text: 'started 10 mg BD x7 d', by: 'Patel' },
        { date: '04.07.', text: '(planned) step down to 5 mg BD', by: '—' },
      ],
    },
    {
      id: medId(), generic: 'Paracetamol', dose: '1 g', route: 'PO', schedule: 'q8h PRN pleuritic pain', prn: true,
      indication: 'analgesia', status: 'active', started: '27.06.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Metamizole', brand: 'Novalgin', dose: '500 mg', route: 'PO', schedule: 'q8h PRN (2nd line)', prn: true,
      indication: 'analgesia', status: 'stopped', started: '27.06.', stopped: '01.07.', source: 'inpatient',
      history: [{ date: '01.07.', text: 'stopped — pain settled', by: 'Patel' }],
    },
  ],
  vitals: [
    { t: '27.06. 09:10', bp: '132/84', hr: 112, rr: 22, temp: 37.0, spo2: 93, o2: 'RA', pain: 5 },
    { t: '27.06. 21:00', bp: '128/80', hr: 98, rr: 18, spo2: 94, o2: 'RA', pain: 4 },
    { t: '28.06. 06:00', bp: '126/78', hr: 92, rr: 16, temp: 36.8, spo2: 95, o2: 'RA', pain: 3 },
    { t: '29.06. 06:00', bp: '124/78', hr: 84, rr: 16, temp: 36.7, spo2: 95, o2: 'RA', pain: 2 },
    { t: '30.06. 06:00', bp: '122/76', hr: 78, rr: 14, temp: 36.6, spo2: 96, o2: 'RA', pain: 1 },
    { t: '01.07. 06:00', bp: '124/76', hr: 76, rr: 14, spo2: 96, o2: 'RA', pain: 0 },
    { t: '02.07. 06:00', bp: '122/74', hr: 74, rr: 14, temp: 36.6, spo2: 96, o2: 'RA' },
    { t: '03.07. 06:00', bp: '120/74', hr: 72, rr: 14, spo2: 97, o2: 'RA' },
  ],
  labColumns: ['27.06. 09:20', '28.06. 06:15', '30.06. 06:10'],
  labs: [
    panel('Cardiac / PE work-up', [
      lt('Troponin T hs', 'ng/l', '<14', ['11', '9', '']),
      lt('NT-proBNP', 'ng/l', '<300', ['420*H', '310*H', '']),
      lt('D-dimer', 'mg/l FEU', '<0.5', ['4.8*H', '', '']),
    ]),
    panel('Haematology', [
      lt('WBC', 'G/l', '4.0–10.0', ['10.8*H', '9.4', '8.2']),
      lt('Haemoglobin', 'g/dl', '13.5–17.2', ['15.2', '14.9', '14.8']),
      lt('Platelets', 'G/l', '150–400', ['242', '251', '248']),
    ]),
    panel('Clinical chemistry', [
      lt('Creatinine', 'µmol/l', '59–104', ['92', '90', '88']),
      lt('eGFR (CKD-EPI)', 'ml/min', '>60', ['82', '84', '86']),
      lt('ALT', 'U/l', '<45', ['38', '', '36']),
      lt('CRP', 'mg/l', '<5', ['28*H', '22*H', '9*H']),
    ]),
  ],
  agenda: [
    { date: '27.06.', item: 'CTPA', location: 'Radiology CT', status: 'done', detail: 'bilat. segmental PE, RV/LV ratio 0.9–1.0 borderline' },
    { date: '27.06.', item: 'Duplex legs', location: 'Angio lab', status: 'done', detail: 'R calf DVT (peroneal)' },
    { date: '28.06.', item: 'TTE', status: 'done', detail: 'RV not dilated, normal fn, RVSP 32' },
    { date: '06.07.', item: 'Discharge planned — letter READY, needs attending countersignature', status: 'planned' },
  ],
  notes: [
    note('27.06.2026 10:30', 'Patel S., Dr.', 'Resident IM (Team B)', 'admission',
      'Admission — PE',
      `52 M, pleuritic R chest pain + exertional dyspnoea since yesterday. Flight from Singapore 23.06. (13 h). No haemoptysis, no syncope. No prior VTE, no cancer hx, no FHx.
Obs: HR 112, SpO2 93 % RA, BP stable. Wells 6 → CTPA: bilateral segmental PE, borderline RV. Duplex: R peroneal DVT.
sPESI 1 (HR). Trop neg. → intermediate-low: ward monitoring 48 h, apixaban 10 BD started, early mobilisation.
Escalation criteria documented (hypotension/syncope → consider lysis pathway, ICU informed as routine).`),
    note('28.06.2026 09:55', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round',
      `Comfortable, HR settling 92. TTE today: RV normal fn — reassuring.
Pain controlled. Mobilising ward level.
STOP-Bang 5 (snoring, tired, observed apnoeas per wife, BMI, M) → sleep study OPD referral. Weight discussed.`),
    note('30.06.2026 10:15', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round',
      `Asymptomatic at rest, stairs w/o desaturation (sats 95–96 %).
Plan: fit for discharge medically — pragmatic plan d/c Monday 06.07. (pt requests weekend in: partner abroad until Sun, lives alone, anxious re "clot moving" — accepted, also allows apixaban education + stocking fitting).
Letter drafted today and completed — READY for countersignature. Step-down date 04.07. flagged on chart.`),
    note('02.07.2026 11:45', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round (brief)',
      `Stable, no complaints. Nothing to change. Letter ready. Awaiting Mon d/c. Compression stocking fitted yesterday, education session w/ pharmacist done (adherence, missed-dose rules, interactions incl. OTC NSAIDs — avoid).`),
  ],
};

export default p13;
