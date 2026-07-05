import type { LabResult, LabTest, LabPanel, ProgressNote, NoteKind } from '../types';

// Compact lab seeding: "134*L" -> {v:'134', f:'L'}; "PEND" -> pending; '' or null -> not done
export function lt(name: string, unit: string, ref: string, res: (string | null)[]): LabTest {
  return {
    name,
    unit,
    ref,
    res: res.map((r): LabResult | null => {
      if (r === null || r === '') return null;
      if (r === 'PEND') return { pend: true };
      const ix = r.indexOf('*');
      if (ix >= 0) return { v: r.slice(0, ix), f: r.slice(ix + 1) };
      return { v: r };
    }),
  };
}

export function panel(name: string, tests: LabTest[]): LabPanel {
  return { panel: name, tests };
}

let noteSeq = 0;
export function note(
  ts: string,
  author: string,
  role: string,
  kind: NoteKind,
  title: string,
  text: string,
  lateEntry?: string,
): ProgressNote {
  noteSeq += 1;
  return { id: 'n' + noteSeq, ts, author, role, kind, title, text: text.trim(), lateEntry };
}

let medSeq = 0;
export function medId(): string {
  medSeq += 1;
  return 'm' + medSeq;
}
