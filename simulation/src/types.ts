// ---- Core domain types for the ward EHR simulation ----

export type LetterStatus = 'none' | 'planned' | 'draft' | 'ready';

export interface MedChange {
  date: string;   // "29.06."
  text: string;   // "dose increased 40 mg -> 80 mg IV"
  by: string;     // "Carter"
}

export interface Medication {
  id: string;
  brand?: string;         // trade name if prescribed by brand
  generic: string;
  dose: string;           // "40 mg"
  route: string;          // PO / IV / SC / NEB / TOP / INH
  schedule: string;       // "1-0-1", "08:00", "q6h PRN pain"
  prn: boolean;
  indication?: string;
  status: 'active' | 'stopped';
  started: string;        // "27.06."
  stopped?: string;
  source: 'home' | 'inpatient';
  history: MedChange[];
}

// What the patient reported taking at home on admission (med-rec source list)
export interface HomeMed {
  generic: string;
  brand?: string;
  dose: string;
  route: string;
  schedule: string;
  note?: string;          // "per GP fax", "patient unsure of dose"
}

export interface VitalsEntry {
  t: string;              // "03.07. 06:10"
  bp?: string;            // "128/74"
  hr?: number;
  rr?: number;
  temp?: number;
  spo2?: number;
  o2?: string;            // "RA", "2 L NC", "NIV"
  weight?: number;
  pain?: number;
  note?: string;
}

// Lab result cell: parsed from compact strings in seed helpers
export interface LabResult {
  v?: string;             // display value
  f?: string;             // flag: H / L / HH / LL / crit
  pend?: boolean;
}

export interface LabTest {
  name: string;
  unit: string;
  ref: string;
  res: (LabResult | null)[];   // aligned with patient.labColumns
}

export interface LabPanel {
  panel: string;
  tests: LabTest[];
}

export interface AgendaItem {
  date: string;           // "03.07."
  time?: string;          // "10:30"
  item: string;           // "OGD (repeat)"
  detail?: string;
  location?: string;      // "Endoscopy 2", "Radiology MRI 1"
  status: 'planned' | 'requested' | 'in prep' | 'awaiting transport' | 'done' | 'cancelled';
}

export type NoteKind =
  | 'admission' | 'progress' | 'attending' | 'night' | 'nursing'
  | 'physio' | 'consult' | 'event' | 'pharmacy' | 'social';

export interface ProgressNote {
  id: string;
  ts: string;             // displayed timestamp "02.07.2026 16:40"
  author: string;         // "Carter J., Dr."
  role: string;           // "Resident IM (Team A)"
  kind: NoteKind;
  title: string;
  text: string;
  lateEntry?: string;     // "late entry for 01.07." — renders a marker
}

export interface Allergy {
  substance: string;
  reaction: string;
  noted: string;          // where/when recorded — "nursing admission form 27.06."
}

export interface Patient {
  id: string;
  caseNo: string;         // case number, MEDICO-style
  lastName: string;
  firstName: string;
  sex: 'M' | 'F';
  dob: string;            // "12.03.1942"
  age: number;
  room: string;           // "IM3-04"
  bed: string;            // "1" | "2"
  team: 'A' | 'B';
  attending: string;
  resident: string;
  mine: boolean;          // belongs to the logged-in resident
  admitted: string;       // "27.06.2026 14:32"
  reason: string;         // one-liner for ward list / handover
  admissionDx: string;
  problems: string[];
  allergiesBanner: string;    // free-text in patient header (may disagree with list!)
  allergies: Allergy[];
  flags: string[];        // "Falls risk", "Contact isolation (ESBL)", "Telemetry", ...
  acuity: 1 | 2 | 3;      // 3 = high
  dischargeToday: boolean;
  letterStatus: LetterStatus;
  letterText: string;
  admissionMeds: HomeMed[];
  meds: Medication[];
  vitals: VitalsEntry[];
  labColumns: string[];   // "27.06. 06:10" ... chronological left -> right
  labs: LabPanel[];
  agenda: AgendaItem[];
  notes: ProgressNote[];  // seed order = chart order (mostly chronological, not strictly)
  handoverBy: string;     // team member presenting at handover
  nextOfKin?: string;     // relatives/contact, if recorded
}

export const SIM_TODAY = '03.07.2026';
export const SIM_TODAY_SHORT = '03.07.';
export const SIM_NOW = '03.07.2026 07:42';
export const CURRENT_USER = 'Carter J., Dr.';
export const CURRENT_USER_ROLE = 'Resident IM (Team A)';
export const CURRENT_LOGIN = 'IMW\\CARTER.J';
