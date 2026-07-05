import type { Patient } from '../types';
import p01 from './patients/p01';
import p02 from './patients/p02';
import p03 from './patients/p03';
import p04 from './patients/p04';
import p05 from './patients/p05';
import p06 from './patients/p06';
import p07 from './patients/p07';
import p08 from './patients/p08';
import p09 from './patients/p09';
import p10 from './patients/p10';
import p11 from './patients/p11';
import p12 from './patients/p12';
import p13 from './patients/p13';
import p14 from './patients/p14';
import p15 from './patients/p15';

export const seedPatients: Patient[] = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15,
].sort((a, b) => (a.room + a.bed).localeCompare(b.room + b.bed));
