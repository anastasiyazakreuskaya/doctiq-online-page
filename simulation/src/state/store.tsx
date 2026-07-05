import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { Patient, ProgressNote, VitalsEntry, LetterStatus, AgendaItem } from '../types';
import { seedPatients } from '../data/seed';

interface State {
  patients: Patient[];
}

type Action =
  | { type: 'ADD_NOTE'; patientId: string; note: ProgressNote }
  | { type: 'ADD_VITALS'; patientId: string; entry: VitalsEntry }
  | { type: 'ADD_ORDER'; patientId: string; order: AgendaItem }
  | { type: 'SAVE_LETTER'; patientId: string; text: string; status: LetterStatus };

function reducer(state: State, action: Action): State {
  const patch = (id: string, fn: (p: Patient) => Patient): State => ({
    patients: state.patients.map((p) => (p.id === id ? fn(p) : p)),
  });
  switch (action.type) {
    case 'ADD_NOTE':
      return patch(action.patientId, (p) => ({ ...p, notes: [...p.notes, action.note] }));
    case 'ADD_VITALS':
      return patch(action.patientId, (p) => ({ ...p, vitals: [...p.vitals, action.entry] }));
    case 'ADD_ORDER':
      return patch(action.patientId, (p) => ({ ...p, agenda: [...p.agenda, action.order] }));
    case 'SAVE_LETTER':
      return patch(action.patientId, (p) => ({ ...p, letterText: action.text, letterStatus: action.status }));
    default:
      return state;
  }
}

const StoreCtx = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { patients: seedPatients });
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore outside provider');
  return ctx;
}
