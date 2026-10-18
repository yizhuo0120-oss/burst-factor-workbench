/* 轻量跨页面 store：智能拆解「确认入库」后，雷达页即时出现新条目 */

import { RADAR_NOTES, RadarNote } from "./mock-data";

let extra: RadarNote[] = [];
const listeners = new Set<() => void>();

export function getRadarNotes(): RadarNote[] {
  return [...extra, ...RADAR_NOTES];
}

export function addRadarNote(note: RadarNote) {
  extra = [note, ...extra];
  listeners.forEach((fn) => fn());
}

export function subscribeRadar(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
