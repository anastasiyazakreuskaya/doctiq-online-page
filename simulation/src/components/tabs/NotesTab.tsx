import { useState } from 'react';
import type { Patient, NoteKind } from '../../types';
import { useStore } from '../../state/store';
import type { PatientTab } from '../PatientView';

const KIND_FILTERS: { key: NoteKind | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'progress', label: 'Physician' },
  { key: 'nursing', label: 'Nursing' },
  { key: 'consult', label: 'Consults' },
  { key: 'physio', label: 'Physio' },
  { key: 'night', label: 'Night team' },
  { key: 'pharmacy', label: 'Pharmacy' },
];

// Read-only chronological-ish feed. New entries are written in "Visit & orders"
// (like the legacy Visite & Anordnungen screen).

export default function NotesTab({ p, setTab }: { p: Patient; setTab: (t: PatientTab) => void }) {
  useStore(); // keeps feed reactive to newly filed notes
  const [filter, setFilter] = useState<NoteKind | 'all'>('all');

  // Chart order: seed order reversed (mostly-chronological newest first — but not strictly;
  // late entries sit where they were filed, like in the real system).
  const feed = [...p.notes].reverse().filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'progress') return n.kind === 'progress' || n.kind === 'admission' || n.kind === 'attending';
    return n.kind === filter;
  });

  return (
    <>
      <div className="filterbar">
        <button className="btn primary" onClick={() => setTab('visit')}>✎ New entry (Visit &amp; orders)</button>
        <span className="lbl">Filter by author group:</span>
        {KIND_FILTERS.map((f) => (
          <label key={f.key} className="cb">
            <input type="radio" name="nf" checked={filter === f.key} onChange={() => setFilter(f.key)} />
            {f.label}
          </label>
        ))}
        <span className="count-note">{feed.length} entries shown (of {p.notes.length}) · mixed authors · not strictly chronological</span>
      </div>

      <div className="notes-feed">
        {feed.map((n) => (
          <div key={n.id} className={'note-card note-kind-' + n.kind}>
            <div className="note-head">
              <span className="nts">{n.ts}</span>
              <span className="nauthor">{n.author}</span>
              <span className="nrole">{n.role}</span>
              <span className="nkind">{kindLabel(n.kind)}</span>
            </div>
            {n.lateEntry && <div className="note-late">⚠ LATE ENTRY — documents events of {n.lateEntry}</div>}
            <div className="note-title">{n.title}</div>
            <div className="note-text">{n.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function kindLabel(k: NoteKind): string {
  const map: Record<NoteKind, string> = {
    admission: 'ADMISSION',
    progress: 'PHYSICIAN',
    attending: 'ATTENDING',
    night: 'NIGHT TEAM',
    nursing: 'NURSING',
    physio: 'PHYSIO',
    consult: 'CONSULT',
    event: 'REPORT',
    pharmacy: 'PHARMACY',
    social: 'SOCIAL WORK',
  };
  return map[k];
}
