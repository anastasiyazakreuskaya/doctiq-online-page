import type { Patient } from '../../types';
import { lt, panel, note, medId } from '../helpers';

// P11 — Decompensated cirrhosis with ascites. Team B. Contact isolation (ESBL).

const p11: Patient = {
  id: 'p11',
  caseNo: '2607288',
  lastName: 'Baranov',
  firstName: 'Viktor',
  sex: 'M',
  dob: '05.07.1966',
  age: 59,
  room: 'IM3-08',
  bed: '1 (single room — isolation)',
  team: 'B',
  attending: 'Lindqvist H., Dr.',
  resident: 'Patel S., Dr.',
  mine: false,
  admitted: '25.06.2026 12:10',
  reason: 'Decompensated cirrhosis (ethyltox.) — tense ascites, paracentesis done, diuretic titration',
  admissionDx: 'Decompensated liver cirrhosis Child B (ethyltoxic), tense ascites, SBP excluded',
  problems: [
    'Cirrhosis Child-Pugh B (9 pts) — ethyltoxic, abstinent 3 mo per pt',
    'Tense ascites — 7.2 L paracentesis 26.06. + albumin; re-accumulating slowly, diuretics uptitrated',
    'SBP excluded (PMN 90/µl on tap)',
    'ESBL E. coli in urine (screening) — CONTACT ISOLATION, asymptomatic, no treatment indicated',
    'Grade I hepatic encephalopathy episodes — lactulose titrated to 2–3 soft stools',
    'Oesophageal varices gr I (OGD 05/2026) — carvedilol',
    'Malnutrition — dietician involved, supplements',
    'Thrombocytopenia + coagulopathy (liver synthetic dysfunction)',
  ],
  allergiesBanner: 'NKDA',
  allergies: [],
  flags: ['CONTACT ISOLATION (ESBL)', 'Daily weight + girth', 'Fluid restriction none / Na restriction'],
  acuity: 2,
  dischargeToday: false,
  letterStatus: 'none',
  letterText: '',
  handoverBy: 'Patel S., Dr.',
  admissionMeds: [
    { generic: 'Spironolactone', dose: '100 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Carvedilol', dose: '6.25 mg', route: 'PO', schedule: '1-0-0' },
    { generic: 'Lactulose', dose: '20 ml', route: 'PO', schedule: '1-0-1', note: 'takes "when he remembers"' },
    { generic: 'Thiamine', dose: '100 mg', route: 'PO', schedule: '1-0-0' },
  ],
  meds: [
    {
      id: medId(), generic: 'Spironolactone', dose: '200 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'ascites', status: 'active', started: '25.06.', source: 'home',
      history: [{ date: '28.06.', text: 'uptitrated 100 → 200 mg (wt/girth re-accumulating, Na ok)', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Furosemide', dose: '40 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'ascites (combination)', status: 'active', started: '28.06.', source: 'inpatient',
      history: [{ date: '28.06.', text: 'added to spironolactone', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Carvedilol', dose: '6.25 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'variceal prophylaxis', status: 'active', started: '25.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Lactulose', dose: '30 ml', route: 'PO', schedule: '1-1-1 titrate to 2–3 soft stools', prn: false,
      indication: 'HE prophylaxis', status: 'active', started: '25.06.', source: 'home',
      history: [{ date: '27.06.', text: 'uptitrated after grade I HE episode evening 26.06.', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Rifaximin', brand: 'Xifaxan', dose: '550 mg', route: 'PO', schedule: '1-0-1', prn: false,
      indication: 'HE — added 27.06. after episode', status: 'active', started: '27.06.', source: 'inpatient',
      history: [{ date: '27.06.', text: 'started', by: 'Lindqvist' }],
    },
    {
      id: medId(), generic: 'Albumin 20 %', dose: '100 ml (8 g/l tapped)', route: 'IV', schedule: 'post-paracentesis', prn: false,
      indication: 'volume expansion post large-volume tap', status: 'stopped', started: '26.06.', stopped: '26.06.', source: 'inpatient',
      history: [{ date: '26.06.', text: '3 bottles given for 7.2 L', by: 'Patel' }],
    },
    {
      id: medId(), generic: 'Thiamine', dose: '100 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: 'nutrition/EtOH hx', status: 'active', started: '25.06.', source: 'home', history: [],
    },
    {
      id: medId(), generic: 'Nutritional supplement', brand: 'Fresubin', dose: '200 ml', route: 'PO', schedule: '1-1-1 between meals', prn: false,
      indication: 'malnutrition (dietician)', status: 'active', started: '27.06.', source: 'inpatient', history: [],
    },
    {
      id: medId(), generic: 'Pantoprazole', dose: '40 mg', route: 'PO', schedule: '1-0-0', prn: false,
      indication: '"gastritis" — indication unclear, on it since 2024, review (PPI in cirrhosis = SBP risk debate)', status: 'active', started: '25.06.', source: 'home',
      history: [{ date: '01.07.', text: 'pharmacy queried indication — decision pending', by: 'Chen' }],
    },
  ],
  vitals: [
    { t: '25.06. 13:00', bp: '108/64', hr: 88, rr: 18, temp: 36.9, spo2: 96, o2: 'RA', weight: 89.6, note: 'girth 112 cm' },
    { t: '26.06. 06:00', bp: '104/62', hr: 84, rr: 16, temp: 36.8, spo2: 96, o2: 'RA', weight: 89.8 },
    { t: '27.06. 06:00', bp: '102/60', hr: 82, rr: 16, temp: 36.7, spo2: 97, o2: 'RA', weight: 82.4, note: 'post-tap, girth 103 cm' },
    { t: '28.06. 06:00', bp: '106/62', hr: 80, rr: 14, temp: 36.6, spo2: 97, o2: 'RA', weight: 82.9 },
    { t: '29.06. 06:00', bp: '104/62', hr: 78, rr: 14, temp: 36.7, spo2: 97, o2: 'RA', weight: 83.2, note: 'girth 104 cm' },
    { t: '30.06. 06:00', bp: '102/60', hr: 76, rr: 14, temp: 36.6, spo2: 97, o2: 'RA', weight: 83.4 },
    { t: '01.07. 06:00', bp: '104/62', hr: 76, rr: 14, temp: 36.6, spo2: 97, o2: 'RA', weight: 83.1 },
    { t: '02.07. 06:00', bp: '106/64', hr: 74, rr: 14, temp: 36.5, spo2: 97, o2: 'RA', weight: 82.8, note: 'girth 103 cm' },
    { t: '03.07. 06:00', bp: '104/62', hr: 74, rr: 14, temp: 36.6, spo2: 97, o2: 'RA', weight: 82.6 },
  ],
  labColumns: ['25.06. 12:30', '26.06. 06:15', '28.06. 06:10', '30.06. 06:15', '02.07. 06:10'],
  labs: [
    panel('Clinical chemistry', [
      lt('Sodium', 'mmol/l', '136–145', ['131*L', '131*L', '132*L', '133*L', '134*L']),
      lt('Potassium', 'mmol/l', '3.5–5.1', ['4.6', '4.5', '4.8', '4.9', '4.7']),
      lt('Creatinine', 'µmol/l', '59–104', ['94', '98', '92', '96', '94']),
      lt('Urea', 'mmol/l', '2.8–8.1', ['6.8', '7.2', '7.6', '8.0', '7.8']),
      lt('Bilirubin total', 'µmol/l', '<21', ['58*H', '54*H', '49*H', '51*H', '47*H']),
      lt('ALT', 'U/l', '<45', ['52*H', '', '48*H', '', '44']),
      lt('AST', 'U/l', '<35', ['88*H', '', '81*H', '', '74*H']),
      lt('GGT', 'U/l', '<60', ['214*H', '', '198*H', '', '186*H']),
      lt('Albumin', 'g/l', '35–52', ['26*L', '24*L', '28*L', '27*L', '28*L']),
      lt('CRP', 'mg/l', '<5', ['14*H', '12*H', '9*H', '8*H', '7*H']),
      lt('Ammonia', 'µmol/l', '<50', ['', '', '68*H', '', '54*H']),
    ]),
    panel('Haematology / coagulation', [
      lt('WBC', 'G/l', '4.0–10.0', ['5.4', '5.1', '4.8', '5.2', '5.0']),
      lt('Haemoglobin', 'g/dl', '13.5–17.2', ['11.2*L', '10.8*L', '10.9*L', '11.0*L', '11.1*L']),
      lt('Platelets', 'G/l', '150–400', ['74*L', '71*L', '76*L', '78*L', '80*L']),
      lt('INR', '', '0.9–1.15', ['1.5*H', '1.5*H', '1.4*H', '1.4*H', '1.4*H']),
    ]),
    panel('Ascites (26.06. tap)', [
      lt('PMN count', '/µl', '<250', ['', '90', '', '', '']),
      lt('SAAG', 'g/dl', '', ['', '1.9 (portal HTN)', '', '', '']),
      lt('Ascites culture', '', '', ['', 'no growth (final)', '', '', '']),
    ]),
    panel('Microbiology (screening)', [
      lt('Urine screening culture', '', '', ['ESBL E. coli (colonisation)', '', '', '', '']),
      lt('MRSA screen (nose/throat)', '', 'neg', ['neg', '', '', '', '']),
    ]),
  ],
  agenda: [
    { date: '26.06.', item: 'Paracentesis (7.2 L) + albumin', status: 'done' },
    { date: '26.06.', item: 'Abdominal US + doppler', status: 'done', detail: 'cirrhotic liver, splenomegaly 15 cm, patent portal vein, no HCC lesion; AFP normal' },
    { date: '03.07.', item: 'Girth + weight — assess diuretic response, ?repeat tap next week if tense again', status: 'planned' },
    { date: '06.07.', item: 'Hepatology OPD planning / transplant eval discussion (attending + pt + partner)', status: 'planned' },
  ],
  notes: [
    note('25.06.2026 14:20', 'Patel S., Dr.', 'Resident IM (Team B)', 'admission',
      'Admission — decompensated cirrhosis',
      `59 M known ethyltoxic cirrhosis (dx 2023), abstinent since 04/2026 per pt + partner. 2 wks increasing abdominal distension, early satiety, exertional dyspnoea. No fever, no confusion currently, no melaena.
O/E: tense ascites, girth 112 cm. No asterixis today. Spider naevi, palmar erythema. No peripheral oedema (!).
Labs: bili 58, albumin 26, INR 1.5, plt 74 → Child B (9). Na 131 (chronic).
Plan: diagnostic + therapeutic paracentesis tomorrow (consent taken), SBP r/o, albumin cover. US + doppler + AFP (HCC screen was due). Continue home meds, Na-restricted diet, dietician. Screening swabs per protocol.`),
    note('26.06.2026 16:40', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Paracentesis note',
      `Therapeutic paracentesis under US guidance, LLQ, aseptic. 7.2 L straw-coloured fluid. Albumin 20 % 3x100 ml given (8 g/L rule).
Ascites: PMN 90 → NO SBP. SAAG 1.9 = portal hypertensive.
Pt much more comfortable. Obs stable throughout.
NB screening urine: ESBL E. coli reported by lab this afternoon → contact isolation per hospital policy (single room arranged). Asymptomatic — colonisation, NO antibiotics indicated. Hygiene informed.`),
    note('27.06.2026 09:40', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round',
      `Last evening episode of mild confusion + flap (grade I HE per night team) — resolved w/ lactulose extra dose. Precipitant: ?post-tap fluid shifts, no infection (SBP excluded), no bleed.
→ lactulose uptitrated TDS target 2–3 stools, rifaximin added. Ammonia 68 (interpret w/ caution).
Wt post-tap 82.4 (-7.4). Girth 103.
Plan: uptitrate diuretics once stable 24 h — done next day (spiro 200 + furosemide 40 added 28.06.). Watch Na/creat under diuretics.`),
    note('29.06.2026 11:20', 'Duarte R.', 'Dietician', 'consult',
      'Nutrition consult',
      `Malnutrition screening positive (MUST 2). Estimated intake <60 % needs. Sarcopenic appearance.
Plan: high-protein (1.2–1.5 g/kg/d — HE is NOT a reason to restrict protein), Na-restricted 5 g/d, late-evening carb snack, Fresubin TDS between meals. Will re-review weekly. Team: please avoid prolonged NPO periods around procedures.`),
    note('01.07.2026 10:05', 'Patel S., Dr.', 'Resident IM (Team B)', 'progress',
      'Ward round',
      `Stable. No further HE episodes (lactulose producing 2–3/d, pt grumbling about it). Wt 83.1, girth ~104 — slow re-accumulation but acceptable on new regimen.
Na 133, creat 96 stable under combination diuretics ✓.
Plan: continue, reassess Fri (girth/wt trend). If tense again → schedule repeat tap. Discussion re hepatology OPD + transplant evaluation criteria w/ attending Mon (MELD-Na ~16). Pantoprazole indication queried by pharmacy — r/v w/ attending (long-term PPI in cirrhosis).`),
    note('02.07.2026 20:50', 'Fofana M.', 'Nursing (late shift)', 'nursing',
      'Shift note',
      `Isolation precautions maintained, pt finds single room "lonely" — extra walks in room, partner visits w/ gown/gloves per protocol. Diet: ate ~70 % + 2 supplements. Stools x3 soft. No confusion. Girth tomorrow AM w/ weight.`),
  ],
};

export default p11;
