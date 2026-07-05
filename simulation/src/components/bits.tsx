import type { LetterStatus } from '../types';

export function LetterChip({ status, dischargeToday }: { status: LetterStatus; dischargeToday?: boolean }) {
  const label: Record<LetterStatus, string> = {
    none: dischargeToday ? 'none (!)' : 'none',
    planned: 'planned today',
    draft: 'DRAFT',
    ready: 'READY',
  };
  return <span className={'lstat ' + status}>{label[status]}</span>;
}
