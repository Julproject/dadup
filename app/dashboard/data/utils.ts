import { SD } from './semaines';

export function getSA(offset=0):number|null {
  try {
    const dpa = localStorage.getItem('dadup_dpa');
    if(!dpa) return null;
    const dpaDate = new Date(dpa);
    const now = new Date();
    const diff = Math.ceil((dpaDate.getTime()-now.getTime())/(1000*60*60*24));
    const sa = Math.round(40 - diff/7) + offset;
    return Math.max(3, Math.min(42, sa));
  } catch { return null; }
}
