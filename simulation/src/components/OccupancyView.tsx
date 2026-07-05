import { useStore } from '../state/store';
import type { Patient } from '../types';
import type { PatientTab } from './PatientView';

// Graphical ward overview: rooms IM3-01..IM3-10, two beds each.
// Shows just name + m/f per bed; click opens the detailed patient chart.

const ROOMS = ['IM3-01', 'IM3-02', 'IM3-03', 'IM3-04', 'IM3-05', 'IM3-06', 'IM3-07', 'IM3-08', 'IM3-09', 'IM3-10'];

export default function OccupancyView({ onOpen }: { onOpen: (id: string, tab?: PatientTab) => void }) {
  const { state } = useStore();

  const bedOf = (room: string, bedNo: string) =>
    state.patients.find((p) => p.room === room && p.bed.split(' ')[0] === bedNo);

  return (
    <>
      <div className="view-title">
        Occupancy — ward IM3 <span className="hint">click a bed to open the patient chart</span>
      </div>
      <div className="view-scroll">
        <div className="bedmap">
          {ROOMS.map((room) => {
            const b1 = bedOf(room, '1');
            const b2 = bedOf(room, '2');
            const single = !!b1?.bed.includes('single');
            const count = (b1 ? 1 : 0) + (b2 ? 1 : 0);
            return (
              <div className="room" key={room}>
                <div className="room-head">
                  Room {room} ({count}){single ? ' — single (isolation)' : ''}
                </div>
                <BedSlot bedNo="1" p={b1} onOpen={onOpen} />
                {!single && <BedSlot bedNo="2" p={b2} onOpen={onOpen} />}
              </div>
            );
          })}
        </div>
        <div className="panel">
          <div className="phead">Legend</div>
          <div className="pbody small">
            <span className="mine-star">★</span> my patient (Dr. Carter) · yellow bed = discharge planned today ·
            red frame = isolation precautions · <span className="muted">free = unoccupied bed</span>
          </div>
        </div>
      </div>
    </>
  );
}

function BedSlot({ bedNo, p, onOpen }: { bedNo: string; p?: Patient; onOpen: (id: string) => void }) {
  if (!p) {
    return (
      <div className="bed-slot free">
        <span className="bedno">Bed {bedNo}</span>
        <span className="bedicon">🛏</span>
        <span>free</span>
      </div>
    );
  }
  const iso = p.flags.some((f) => /isolation/i.test(f));
  return (
    <div
      className={'bed-slot occupied' + (p.dischargeToday ? ' dc-today' : '') + (iso ? ' iso' : '')}
      onClick={() => onOpen(p.id)}
      title="Open patient chart"
    >
      <span className="bedno">Bed {bedNo}</span>
      <span className="bedicon">🛏</span>
      <span className="bedname">
        <b>{p.lastName}, {p.firstName}</b> ({p.sex.toLowerCase()})
        {p.mine ? <span className="mine-star"> ★</span> : null}
      </span>
    </div>
  );
}
