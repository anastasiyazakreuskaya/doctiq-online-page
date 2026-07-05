import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P06 — Upper GI bleed, serial Hb, REPEAT OGD TODAY (procedure-today patient). Team B.

const p06: Patient = {
  id: 'p06',
  caseNo: '2607467',
  lastName: 'Moretti',
  firstName: 'Franco',
  sex: 'M',
  dob: '19.04.1963',
  age: 63,
  room: 'IM3-04',
  bed: '1',
  team: 'B',
  attending: 'Lindqvist H., Dr.',
  resident: 'Patel S., Dr.',
  mine: false,
  admitted: '30.06.2026 21:33',
  reason: 'UGI bleed (duodenal ulcer, Forrest IIa, clipped) — repeat OGD today 10:30, serial Hb',
  admissionDx: 'Upper GI haemorrhage — duodenal ulcer Forrest IIa, endoscopic therapy 01.07.',
  problems: [
    'Duodenal ulcer bleed — clipped + adrenaline 01.07., repeat OGD today (second-look, vessel visible)',
    'Anaemia — Hb nadir 7.1, transfused 2 U total, stable since',
    'H. pylori test pending (biopsy urease + histology)',
    'NSAID use (naproxen for back pain) — STOPPED, counselled',
    'Alcohol ~30 units/wk — brief intervention done, no withdrawal signs (CIWA low)',
    'NPO from midnight for OGD',
  ],
  allergiesBanner: 'NKDA',
  allergies: [],
  flags: ['NPO from 00:00 (OGD 10:30)', 'Serial Hb q12h', '2 U RBC x-matched, valid'],
  acuity: 3,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Patel S., Dr.',
  admissionMeds: [
    { generic: 'Naproxen', dose: '500 mg', route: 'PO', schedule: '1-0-1 (back pain, ~3 wks)', note: 'OTC — culprit' },
    { generic: 'Tamsulosin', dose: '0.4 mg', route: 'PO', schedule: '0-0-1' },
  ],
  meds: [
    {
      id: medId(), generic: 'Pantoprazole', dose: '8 mg/h', route: 'IV', schedule: 'continuous infusion', prn: false,
      indication: 'UGI bleed, post-endoscopic therapy', status: 'active', started: '30.06.', source: 'inpatient',
      history: [
        { date: '30.06.', text: '80 mg bolus then 8 mg/h', by: 'ED (Novak)' },
        { date: '03.07.', text: 'plan: switch to 40 mg IV BD after today\'s second-look if clean', by: 'Patel' },
      ],
    },
    {
      id: medId(), generic: 'Naproxen', dose: '500 mg', route: 'PO', schedule: '1-0-1', prn: false,
      indication: 'back pain — CULPRIT, do not restart', status: 'stopped', started: '30.06.', stopped: '30.06.', source: 'home',
      history: [{ date: '30.06.', text: 'STOPPED permanently — ulcer bleed', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Tamsulosin', dose: '0.4 mg', route: 'PO', schedule: '0-0-1', prn: false,
      indication: 'BPH', status: 'active', started: '30.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'RBC concentrate', dose: '1 unit', route: 'IV', schedule: 'per Hb <7 (or <8 if unstable)', prn: false,
      indication: 'transfusion — 2 U given total (01.07.)', status: 'stopped', started: '01.07.', stopped: '01.07.', source: 'inpatient',
      history: [{ date: '01.07.', text: '2 U over the day, post-Hb 8.4', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Paracetamol', dose: '1 g', route: 'IV', schedule: 'q8h PRN (back pain — NSAID replacement)', prn: true,
      indication: 'analgesia', status: 'active', started: '30.06.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Thiamine', dose: '100 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'alcohol hx', status: 'active', started: '01.07.', source: 'inpatient', history: [],
    },
  ],
  vitals: [
    { t: '30.06. 21:50', bp: '98/58', hr: 116, rr: 20, temp: 36.5, spo2: 97, o2: 'RA', note: 'melaena in ED, cool peripheries' },
    { t: '01.07. 02:00', bp: '104/62', hr: 104, rr: 18, spo2: 97, o2: 'RA' },
    { t: '01.07. 08:00', bp: '108/64', hr: 98, rr: 16, temp: 36.6, spo2: 97, o2: 'RA', note: 'pre-OGD' },
    { t: '01.07. 14:00', bp: '112/68', hr: 92, rr: 16, spo2: 97, o2: 'RA', note: 'post-OGD, post 1st unit' },
    { t: '02.07. 06:00', bp: '116/70', hr: 84, rr: 14, temp: 36.6, spo2: 98, o2: 'RA' },
    { t: '02.07. 18:00', bp: '118/72', hr: 80, rr: 14, spo2: 98, o2: 'RA' },
    { t: '03.07. 06:00', bp: '120/72', hr: 78, rr: 14, temp: 36.5, spo2: 98, o2: 'RA', note: 'NPO, OGD 10:30' },
  ],
  labColumns: ['30.06. 21:45', '01.07. 06:00', '01.07. 18:00', '02.07. 06:15', '02.07. 18:00', '03.07. 06:05'],
  labs: [
    panel('Haematology (serial Hb!)', [
      lt('Haemoglobin', 'g/dl', '13.5–17.2', ['8.9*L', '7.1*LL', '8.4*L', '8.6*L', '8.5*L', '8.7*L']),
      lt('Haematocrit', '%', '40–52', ['26.8*L', '21.4*L', '25.2*L', '25.9*L', '25.6*L', '26.1*L']),
      lt('WBC', 'G/l', '4.0–10.0', ['12.4*H', '11.8*H', '', '9.6', '', '8.8']),
      lt('Platelets', 'G/l', '150–400', ['188', '162', '', '171', '', '178']),
      lt('Reticulocytes', '‰', '5–15', ['', '', '', '', '', '28*H']),
    ]),
    panel('Coagulation', [
      lt('INR', '', '0.9–1.15', ['1.2*H', '1.1', '', '1.0', '', '']),
      lt('aPTT', 's', '25–37', ['33', '', '', '31', '', '']),
      lt('Fibrinogen', 'g/l', '1.8–3.5', ['2.8', '', '', '', '', '']),
    ]),
    panel('Clinical chemistry', [
      lt('Urea', 'mmol/l', '2.8–8.1', ['14.8*H', '12.2*H', '', '9.1*H', '', '7.4']),
      lt('Creatinine', 'µmol/l', '59–104', ['96', '88', '', '82', '', '80']),
      lt('Sodium', 'mmol/l', '136–145', ['138', '139', '', '140', '', '139']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['4.4', '4.1', '', '4.0', '', '3.9']),
      lt('GGT', 'U/l', '<60', ['142*H', '', '', '', '', '']),
      lt('Lactate', 'mmol/l', '0.5–2.2', ['2.6*H', '1.4', '', '', '', '']),
    ]),
  ],
  agenda: [
    { date: '01.07.', time: '09:15', item: 'OGD (index)', location: 'Endoscopy 1', status: 'done', detail: 'duodenal ulcer bulb, Forrest IIa (visible vessel) — 2 clips + adrenaline; biopsies for H.p.' },
    { date: '03.07.', time: '10:30', item: 'OGD second-look', location: 'Endoscopy 2', status: 'in prep', detail: 'NPO from 00:00; consent signed 02.07.; transport booked 10:00' },
    { date: '03.07.', item: 'Hb control post-OGD (18:00)', status: 'planned' },
  ],
  notes: [
    note('30.06.2026 22:40', 'Novak P., Dr.', 'ED physician', 'admission',
      'ED clerking — UGI bleed',
      `63 M, melaena x2 today, presyncope standing. Coffee-ground vomit x1 this evening. On naproxen 3 wks for lumbago. EtOH ~30 U/wk.
Obs: BP 98/58, HR 116 → Glasgow-Blatchford 12. 2 large-bore IVs, x-match 2 U, crystalloid 500 ml.
Hb 8.9 (bled down from unknown baseline), urea 14.8 (disprop. — GI blood meal), INR 1.2.
Pantoprazole 80 mg bolus + infusion. Gastro on call informed — OGD listed for AM (haemodynamically responding; if deteriorates → emergency scope o/n).
Admitted Team B, monitored bay.`),
    note('01.07.2026 10:40', 'Endoscopy', 'Gastroenterology (Dr. Fuchs)', 'event',
      'OGD report (index)',
      `Indication: UGI bleed. Sedation: propofol, tolerated.
Findings: stomach — small amount old blood, no active source. Duodenal bulb: 8 mm ulcer anterior wall, Forrest IIa (non-bleeding visible vessel).
Therapy: adrenaline 1:10 000 injected (8 ml) + 2 through-the-scope clips — good position, vessel flattened. Biopsies antrum/corpus for H. pylori (urease + histology).
Recommendation: PPI infusion 72 h, NPO 24 h then clear fluids, serial Hb, SECOND-LOOK OGD in 48–72 h given IIa + anaemia severity. If rebleed → immediate repeat scope, surgery/IR backup aware.`),
    note('01.07.2026 13:25', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Post-OGD review',
      `Hb this AM 7.1 → 1st RBC unit given post-procedure, 2nd this evening (target >8 given ongoing risk). Haemodynamics improving.
Cont. PPI infusion, NPO today, clears tomorrow. CIWA started (EtOH hx) — scores 2–4, no treatment needed, thiamine started.
Consent for second-look taken for Fri (surgeon + IR numbers on file if rebleed).`),
    note('02.07.2026 09:50', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round',
      `No melaena since 01.07. early hrs. Hb stable 8.6 → 8.5. Urea falling (9.1) — supports haemostasis.
Clear fluids tolerated. CIWA 0–2.
Plan: second-look OGD tomorrow 10:30 (booked, NPO from midnight). If clean: PPI → 40 mg IV BD then PO 40 BD 6 wks, diet up, d/c ~Sun/Mon w/ H.p. result chase + eradication if pos. Naproxen permanently stopped — documented; analgesia plan for lumbago: paracetamol + physio referral OPD.`),
    note('02.07.2026 21:15', 'Fofana M.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Comfortable. No melaena today (bowels opened 15:20 — brown, charted). NPO from midnight for OGD, sign on bed, pt informed x2. Consent form in notes. Valid x-match confirmed with lab (2 U held).`),
  ],
};

export default p06;
