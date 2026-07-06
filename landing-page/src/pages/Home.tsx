import { useEffect, useRef, useState, type ReactNode } from "react";

/* =========================================================
   MEDICUS-STYLE EHR MOCK — brand-adapted (teal + gold)
   ========================================================= */

/* Small building blocks used across panels */
function Mine({ on = true }: { on?: boolean }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${on ? "bg-gold" : "bg-transparent"}`}
      aria-label={on ? "my patient" : undefined}
    />
  );
}
function Chip({ color }: { color: "gold" | "red" | "green" | "muted" }) {
  const bg =
    color === "gold" ? "bg-gold"
    : color === "red" ? "bg-warn"
    : color === "green" ? "bg-teal"
    : "bg-line";
  return <span className={`inline-block h-3.5 w-3.5 rounded-[2px] border border-ink/20 ${bg}`} />;
}
function Pill({ tone, children }: { tone: "gold" | "green" | "muted"; children: ReactNode }) {
  const cls =
    tone === "gold" ? "bg-gold-soft text-ink border-gold"
    : tone === "green" ? "bg-teal-soft text-teal-deep border-teal"
    : "bg-paper-dim text-muted-foreground border-line";
  return (
    <span className={`inline-flex items-center rounded-[3px] border px-1.5 py-0.5 font-mono-ehr text-[10.5px] uppercase tracking-wider ${cls}`}>
      {children}
    </span>
  );
}

/* =========================================================
   PANELS
   ========================================================= */

type Panel = {
  crumb: string;
  render: () => ReactNode;
};

/* ---------- 1. Occupancy ---------- */
function PanelOccupancy() {
  const rooms: Array<{
    name: string;
    count: number;
    isolation?: boolean;
    beds: Array<{ n: string; patient?: string; sex?: "f" | "m"; mine?: boolean; discharge?: boolean; free?: boolean }>;
  }> = [
    { name: "Room IM3-01", count: 2, beds: [
      { n: "Bed 1", patient: "Whitfield, Margaret", sex: "f", mine: true },
      { n: "Bed 2", patient: "Jenkins, Harold", sex: "m" },
    ]},
    { name: "Room IM3-02", count: 2, beds: [
      { n: "Bed 1", patient: "Delgado, Rosa", sex: "f", mine: true },
      { n: "Bed 2", patient: "Brooks, Tyler", sex: "m" },
    ]},
    { name: "Room IM3-03", count: 1, beds: [
      { n: "Bed 1", free: true },
      { n: "Bed 2", patient: "Kowalski, Ernest", sex: "m", mine: true },
    ]},
    { name: "Room IM3-04", count: 1, beds: [
      { n: "Bed 1", patient: "Moretti, Franco", sex: "m" },
      { n: "Bed 2", free: true },
    ]},
    { name: "Room IM3-05", count: 2, beds: [
      { n: "Bed 1", patient: "Palmer, Denise", sex: "f", mine: true, discharge: true },
      { n: "Bed 2", patient: "Adeyemi, George", sex: "m", mine: true },
    ]},
    { name: "Room IM3-06", count: 1, beds: [
      { n: "Bed 1", free: true },
      { n: "Bed 2", patient: "Sorensen, Ingrid", sex: "f" },
    ]},
    { name: "Room IM3-07", count: 1, beds: [
      { n: "Bed 1", patient: "Rahman, Aisha", sex: "f", mine: true, discharge: true },
      { n: "Bed 2", free: true },
    ]},
    { name: "Room IM3-08 — single (isolation)", count: 1, isolation: true, beds: [
      { n: "Bed 1", patient: "Baranov, Viktor", sex: "m" },
    ]},
  ];

  return (
    <div className="p-3">
      <div className="mb-3 flex items-baseline gap-3">
        <h3 className="ehr-section text-[15px]">Occupancy — ward IM3</h3>
        <span className="text-[12px] text-muted-foreground">click a bed to open the patient chart</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {rooms.map((r) => (
          <div key={r.name} className={`overflow-hidden rounded-[3px] border ${r.isolation ? "border-warn border-2" : "border-line"}`}>
            <div className="flex items-center justify-between border-b border-line bg-teal-soft/50 px-2 py-1">
              <span className="ehr-link text-[12.5px] font-semibold">{r.name}</span>
              <span className="text-[11px] text-muted-foreground">({r.count})</span>
            </div>
            {r.beds.map((b, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-2 py-1.5 text-[12.5px] ${
                  b.discharge ? "bg-row-discharge" : i % 2 === 0 ? "bg-row" : "bg-row-alt"
                }`}
              >
                <span className={`w-10 text-[11px] ${b.free ? "italic text-muted-foreground" : "text-muted-foreground"}`}>{b.n}</span>
                
                {b.free ? (
                  <span className="italic text-muted-foreground">free</span>
                ) : (
                  <>
                    <span className="font-semibold">{b.patient}</span>
                    <span className="text-muted-foreground">({b.sex})</span>
                    {b.mine && <Mine />}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-[3px] border border-line">
        <div className="border-b border-line bg-teal-soft/50 px-2 py-1">
          <span className="ehr-link text-[12.5px] font-semibold">Legend</span>
        </div>
        <div className="px-2 py-1.5 text-[11.5px] text-muted-foreground">
          <Mine /> my patient (Dr. Carter) · <span className="mx-1 inline-block h-2 w-3 rounded-sm bg-row-discharge align-middle" /> yellow bed = discharge planned today · <span className="mx-1 inline-block h-2 w-3 rounded-sm border-2 border-warn align-middle" /> red frame = isolation · <em>free</em> = unoccupied bed
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Treatment list ---------- */
function PanelTreatmentList() {
  const rows = [
    ["IM3-01/1", "Whitfield, Margaret (F)", true, "14.02.1942 (84)", "A / Ostrowski", "27.06.", "Decompensated heart failure — worsening dyspnoea + leg oedema", "gold", "Falls risk (mod) · Daily weight · Fluid restriction 1.5 L", "08:00 Daily weight before breakfast · Consider IV→PO diuretic switch", "none"],
    ["IM3-01/2", "Jenkins, Harold (M)", false, "11.08.1954 (71)", "B / Lindqvist", "29.06.", "AECOPD — nebs + steroids, weaning O₂, aim discharge weekend", "gold", "O₂ target 88–92 %", "Last prednisolone day — no taper · Wean nebs → inhalers", "none"],
    ["IM3-02/1", "Delgado, Rosa (F)", true, "03.09.1967 (58)", "A / Ostrowski", "01.07.", "CAP right lower lobe, early sepsis — IV antibiotics, close obs", "red", "Obs q4h · Sepsis pathway (de-escalated 02.07.)", "11:00 CXR control · Review abx — pneumococcal Ag POS", "none"],
    ["IM3-02/2", "Brooks, Tyler (M)", false, "02.12.2001 (24)", "B / Lindqvist", "30.06.", "DKA (new T1DM debut?) — off infusion since 02.07., diabetes education ongoing", "gold", "BG profile 7-point · Diabetes team following", "14:00 Diabetes education session 2 (carb counting)", "none"],
    ["IM3-03/2", "Kowalski, Ernest (M)", true, "21.11.1959 (66)", "A / Ostrowski", "28.06.", "AKI (creat 412) on CKD — ?prerenal ?obstructive, nephro consult today", "gold", "Strict fluid balance · Urinary catheter (28.06.) · Daily K+", "10:30 Nephrology re-review — trajectory / dialysis planning", "none"],
    ["IM3-04/1", "Moretti, Franco (M)", false, "19.04.1963 (63)", "B / Lindqvist", "30.06.", "UGI bleed (duodenal ulcer, Forrest IIa, clipped) — repeat OGD 10:30", "red", "NPO from 00:00 (OGD 10:30) · Serial Hb q12h · 2U RBC valid", "10:30 OGD second-look · Hb control post-OGD (18:00)", "none"],
    ["IM3-05/1", "Palmer, Denise (F)", true, "30.05.1977 (49)", "A / Ostrowski", "28.06.", "L leg cellulitis — IV abx, switched to PO, discharge planned today", "green", "Discharge planned 03.07. · Leg elevation + demarcation line marked", "AM Discharge planned — letter, meds to take home, GP fax", "draft"],
    ["IM3-05/2", "Adeyemi, George (M)", true, "08.01.1949 (77)", "A / Ostrowski", "01.07.", "New AF with rapid ventricular response — rate control, anticoag started; TTE today", "gold", "Telemetry · TTE today 09:30", "09:30 TTE (transthoracic echo) · Cardiology opinion after TTE", "none"],
    ["IM3-06/2", "Sorensen, Ingrid (F)", false, "28.02.1957 (69)", "B / Lindqvist", "02.07.", "TIA (L arm weakness + dysarthria, resolved) — workup: MRI + carotid US, telemetry", "gold", "Telemetry · MRI 11:15 + carotid US 13:30 today", "11:15 MRI brain (DWI) · 13:30 Carotid duplex", "none"],
    ["IM3-07/1", "Rahman, Aisha (F)", true, "17.06.1992 (34)", "A / Ostrowski", "29.06.", "Acute pyelonephritis R — IV abx, afebrile 48 h, discharge today with PO switch", "green", "Discharge planned 03.07.", "08:00 Last ceftriaxone dose IV · AM Discharge — write letter, PO abx script, GP f/u", "planned"],
  ];

  return (
    <div className="p-3">
      <div className="mb-2 flex items-baseline gap-3">
        <h3 className="ehr-section text-[15px]">Treatment list — IM3 (detailed)</h3>
        <span className="text-[12px] text-muted-foreground">click a row to open the chart · bed overview under "Occupancy"</span>
      </div>
      <div className="mb-2 flex items-center gap-4 text-[12px]">
        <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="accent-[color:var(--teal-deep)]" /> My patients only (Dr. Carter, Team A)</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" className="accent-[color:var(--teal-deep)]" /> Discharge today</label>
        <button className="rounded-[3px] border border-teal bg-teal-soft px-2 py-0.5 text-[11.5px] font-semibold text-teal-deep">Start handover mode</button>
        <span className="ml-auto text-[11px] text-muted-foreground">15 of 15 patients · updated 03.07.2026 07:42</span>
      </div>
      <div className="overflow-hidden rounded-[3px] border border-line">
        <table className="w-full border-collapse text-[11.5px]">
          <thead>
            <tr className="border-b border-line bg-teal-soft/60 text-left text-teal-deep">
              {["Bed","Name","","Born / age","Team","Adm.","Reason for admission","Ac.","Flags / isolation","Today","D/c letter"].map((h, i) => (
                <th key={i} className="whitespace-nowrap px-2 py-1.5 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const mine = r[2] as boolean;
              return (
                <tr key={i} className={`border-b border-line align-top ${i % 2 === 0 ? "bg-row" : "bg-row-alt"}`}>
                  <td className="px-2 py-1.5 font-mono-ehr">{r[0] as string}</td>
                  <td className="px-2 py-1.5 font-semibold">{r[1] as string}</td>
                  <td className="px-2 py-1.5">{mine && <Mine />}</td>
                  <td className="whitespace-nowrap px-2 py-1.5">{r[3] as string}</td>
                  <td className="whitespace-nowrap px-2 py-1.5">{r[4] as string}</td>
                  <td className="whitespace-nowrap px-2 py-1.5">{r[5] as string}</td>
                  <td className="px-2 py-1.5">{r[6] as string}</td>
                  <td className="px-2 py-1.5"><Chip color={r[7] as "gold" | "red" | "green"} /></td>
                  <td className="px-2 py-1.5">{r[8] as string}</td>
                  <td className="px-2 py-1.5">{r[9] as string}</td>
                  <td className="px-2 py-1.5">
                    {r[10] === "draft" ? <Pill tone="gold">Draft</Pill>
                    : r[10] === "planned" ? <Pill tone="gold">Planned today</Pill>
                    : <Pill tone="muted">none</Pill>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- 3. Ward day view ---------- */
function PanelWardDay() {
  const rows = [
    ["~11:00","Fitzgerald, Dorothy",true,"IM3-10/2","Discharge home (son collecting) — finalise letter","","planned",""],
    ["06:20","Fitzgerald, Dorothy",true,"IM3-10/2","Na + K control (pre-discharge) — CHASE RESULT","","in prep",""],
    ["08:00","Whitfield, Margaret",true,"IM3-01/1","Daily weight before breakfast","","planned",""],
    ["08:00","Rahman, Aisha",true,"IM3-07/1","Last ceftriaxone dose IV","","planned",""],
    ["09:30","Adeyemi, George",true,"IM3-05/2","TTE (transthoracic echo)","Cardio echo lab","planned","Q: LV fn, LA size, valves — informs rhythm- vs rate-control"],
    ["10:30","Kowalski, Ernest",true,"IM3-03/2","Nephrology re-review — trajectory / dialysis planning","ward (Dr. Iqbal)","planned",""],
    ["10:30","Moretti, Franco",false,"IM3-04/1","OGD second-look","Endoscopy 2","in prep","NPO from 00:00; consent signed 02.07.; transport 10:00"],
    ["11:00","Delgado, Rosa",true,"IM3-02/1","CXR control","Radiology","requested",""],
    ["11:15","Sorensen, Ingrid",false,"IM3-06/2","MRI brain (DWI)","Radiology MRI 1","planned","Safety checklist done, no contrast"],
    ["13:30","Sorensen, Ingrid",false,"IM3-06/2","Carotid duplex","Angio lab","planned",""],
    ["14:00","Brooks, Tyler",false,"IM3-02/2","Diabetes education session 2 (carb counting)","ward, DSN Wagner","planned",""],
    ["14:30","Nussbaum, Albert",false,"IM3-10/1","Family + care home meeting (return planning)","ward meeting room","planned",""],
  ];
  return (
    <div className="p-3">
      <div className="mb-2 flex items-baseline gap-3">
        <h3 className="ehr-section text-[15px]">Ward day view — planned procedures &amp; tasks, Fri 03.07.2026</h3>
      </div>
      <div className="mb-1 ehr-link text-[13px] font-semibold">Today</div>
      <div className="overflow-hidden rounded-[3px] border border-line">
        <table className="w-full border-collapse text-[11.5px]">
          <thead>
            <tr className="border-b border-line bg-teal-soft/60 text-left text-teal-deep">
              {["Time","Patient","","Bed","Item","Location","Status","Detail"].map((h,i)=>(
                <th key={i} className="whitespace-nowrap px-2 py-1.5 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} className={`border-b border-line align-top ${i%2===0?"bg-row":"bg-row-alt"}`}>
                <td className="whitespace-nowrap px-2 py-1.5 font-mono-ehr">{r[0] as string}</td>
                <td className="whitespace-nowrap px-2 py-1.5 font-semibold">{r[1] as string}</td>
                <td className="px-2 py-1.5">{(r[2] as boolean) && <Mine />}</td>
                <td className="whitespace-nowrap px-2 py-1.5 font-mono-ehr">{r[3] as string}</td>
                <td className="px-2 py-1.5">{r[4] as string}</td>
                <td className="whitespace-nowrap px-2 py-1.5 text-muted-foreground">{r[5] as string}</td>
                <td className="px-2 py-1.5">
                  {r[6]==="requested" ? <Pill tone="gold">requested</Pill>
                  : r[6]==="in prep" ? <Pill tone="gold">in prep</Pill>
                  : <Pill tone="green">planned</Pill>}
                </td>
                <td className="px-2 py-1.5 text-muted-foreground">{r[7] as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 ehr-link text-[13px] font-semibold">Next days (planned / requested)</div>
      <div className="mt-1 rounded-[3px] border border-line bg-row px-2 py-2 text-[11.5px] text-muted-foreground">
        04.07. — Whitfield, Margaret — Physio: stairs assessment · <Pill tone="gold">requested</Pill><span className="mx-2">·</span>
        04.07. — Jenkins, Harold — Possible discharge if stable on inhalers + RA · <Pill tone="green">planned</Pill>
      </div>
    </div>
  );
}

/* ---------- 4. Case overview (patient chart) ---------- */
function PanelCaseOverview() {
  const tabs = ["Case overview","Fever chart / vitals","Laboratory","Medication","Visit & orders","Progress documentation","Orders & agenda","Discharge letter"];
  return (
    <div className="p-3">
      {/* Patient header */}
      <div className="mb-2 grid grid-cols-[64px_1.4fr_1.4fr_1.6fr_auto] gap-3 rounded-[3px] border border-line bg-teal-soft/40 p-3 text-[12px]">
        <div className="grid h-14 w-14 place-items-center rounded-[3px] border border-line bg-teal-deep font-display text-lg font-semibold text-paper">HJ</div>
        <div>
          <div className="font-display text-xl leading-tight">Jenkins, Harold (M)</div>
          <div>*11.08.1954 (71 y) · Case no.: <span className="font-mono-ehr">2607422</span></div>
          <div>Allergies: <span className="font-semibold text-warn">NKDA</span></div>
          <div className="mt-1 inline-block rounded-[3px] border border-gold bg-gold-soft px-2 py-0.5 text-[11px] font-semibold">O₂ target 88–92 %</div>
        </div>
        <div className="space-y-0.5">
          <div><span className="text-muted-foreground">Admission:</span> <span className="font-mono-ehr">29.06.2026 15:48</span></div>
          <div><span className="text-muted-foreground">Bed:</span> IM / IM3 / IM3-01 / 2</div>
          <div><span className="text-muted-foreground">Team:</span> B — Lindqvist H., Dr.</div>
          <div><span className="text-muted-foreground">Resident:</span> Patel S., Dr.</div>
        </div>
        <div className="space-y-0.5">
          <div><span className="text-muted-foreground">Diagnosis:</span> Acute exacerbation of COPD (GOLD III), non-infective vs viral trigger</div>
          <div><span className="text-muted-foreground">Discharge:</span> not set</div>
          <div><span className="text-muted-foreground">D/c letter:</span> <Pill tone="muted">none</Pill></div>
        </div>
        <button className="self-start rounded-[3px] border border-teal bg-paper px-2 py-1 text-[11px] text-teal-deep hover:bg-teal-soft">Back to census</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-teal text-[12px]">
        {tabs.map((t, i) => (
          <div
            key={t}
            className={`-mb-px cursor-default rounded-t-[3px] border-x border-t px-3 py-1.5 ${
              i === 0
                ? "border-teal bg-paper font-semibold text-teal-deep"
                : "border-transparent text-muted-foreground hover:text-teal-deep"
            }`}
          >
            {t} {t === "Progress documentation" && <span className="ml-1 inline-block rounded-full bg-teal-deep px-1.5 text-[10px] font-semibold text-paper">5</span>}
          </div>
        ))}
      </div>

      {/* Content 3-col */}
      <div className="grid grid-cols-3 gap-3 border border-t-0 border-teal bg-paper p-3 text-[12px]">
        {/* left */}
        <div className="space-y-3">
          <Section title="Goals and evaluation">
            <div className="space-y-2">
              <div>
                <div className="ehr-link font-semibold">Goal 1 · Treat AECOPD</div>
                <div className="mt-1 h-2 w-full rounded-sm bg-gradient-to-r from-warn via-gold to-teal">
                  <div className="ml-[68%] h-full w-0.5 bg-ink" />
                </div>
                <div className="mt-1 flex justify-between text-[10.5px] text-muted-foreground"><span>29.06.2026</span><span>open</span></div>
              </div>
              <div>
                <div className="ehr-link font-semibold">Goal 2 · Mobilisation / self-care baseline</div>
                <div className="mt-1 h-2 w-full rounded-sm bg-gradient-to-r from-warn via-gold to-teal">
                  <div className="ml-[45%] h-full w-0.5 bg-ink" />
                </div>
                <div className="mt-1 flex justify-between text-[10.5px] text-muted-foreground"><span>29.06.2026</span><span>open</span></div>
              </div>
              <div className="ehr-link text-right text-[11.5px]">1 outstanding evaluation</div>
            </div>
          </Section>
          <Section title="Wound & special documentation"><div className="text-muted-foreground">No data available.</div></Section>
          <Section title="Care planning">
            <div className="space-y-0.5">
              <div className="ehr-link">7 active care problems</div>
              <div className="ehr-link">13 signed-off measures</div>
              <div className="ehr-link">2 measures still open today</div>
            </div>
          </Section>
          <Section title="Assessments / scores"><div className="text-muted-foreground">No data available.</div></Section>
        </div>

        {/* middle */}
        <div className="space-y-3">
          <Section title="Laboratory values">
            <table className="w-full border-collapse font-mono-ehr text-[11.5px]">
              <thead className="bg-teal-soft/60 text-teal-deep">
                <tr>{["Parameter","Latest","","Ref."].map((h)=>(<th key={h} className="border border-line px-1.5 py-1 text-left font-semibold">{h}</th>))}</tr>
              </thead>
              <tbody>
                {[
                  ["pCO₂","48 mmHg","↑","35–45"],
                  ["pO₂","61 mmHg","↓","75–100"],
                  ["HCO₃","28 mmol/l","↑","22–26"],
                  ["WBC","10.9 G/l","↑","4.0–10.0"],
                  ["CRP","6 mg/l","↑","<5"],
                  ["Glucose (random)","10.4 mmol/l","↑","3.9–7.8"],
                ].map((r,i)=>(
                  <tr key={i} className="odd:bg-row even:bg-row-alt">
                    <td className="border border-line px-1.5 py-1">{r[0]}</td>
                    <td className="border border-line px-1.5 py-1 font-semibold text-warn">{r[1]}</td>
                    <td className="border border-line px-1.5 py-1 text-warn">{r[2]}</td>
                    <td className="border border-line px-1.5 py-1 text-muted-foreground">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ehr-link mt-1 text-right text-[11.5px]">open cumulative findings</div>
          </Section>
          <Section title="Vital signs">
            <table className="w-full border-collapse font-mono-ehr text-[11.5px]">
              <thead className="bg-teal-soft/60 text-teal-deep">
                <tr>{["Date/time","RR","P","T"].map((h)=>(<th key={h} className="border border-line px-1.5 py-1 text-left font-semibold">{h}</th>))}</tr>
              </thead>
              <tbody>
                {[
                  ["03.07. 06:00","134/78","84","36.6 °C"],
                  ["02.07. 06:00","136/78","88","36.7 °C"],
                  ["01.07. 06:00","138/80","92","36.8 °C"],
                  ["30.06. 06:00","142/82","96","36.9 °C"],
                  ["29.06. 16:10","148/86","104","37.2 °C"],
                ].map((r,i)=>(
                  <tr key={i} className="odd:bg-row even:bg-row-alt">
                    {r.map((c,j)=>(<td key={j} className="border border-line px-1.5 py-1">{c}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
          <Section title="Progress documentation">
            <div className="space-y-0.5">
              <div><span className="font-mono-ehr">02.07.2026 22:10</span> — <span className="ehr-link">Shift note</span> <span className="text-muted-foreground">[Yilmaz D.]</span></div>
              <div><span className="font-mono-ehr">02.07.2026 10:35</span> — <span className="ehr-link">Ward round — day 3</span> <span className="text-muted-foreground">[Patel S., Dr.]</span></div>
              <div><span className="font-mono-ehr">01.07.2026 11:00</span> — <span className="ehr-link">Ward round — day 2</span> <span className="text-muted-foreground">[Patel S., Dr.]</span></div>
              <div className="text-[11px] text-muted-foreground">5 entries total — multiple authors/disciplines</div>
            </div>
          </Section>
        </div>

        {/* right */}
        <div className="space-y-3">
          <Section title="Patient data">
            <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-0.5">
              <span className="text-muted-foreground">Name:</span><span>Jenkins, Harold</span>
              <span className="text-muted-foreground">Born:</span><span>11.08.1954 (71 y), M</span>
              <span className="text-muted-foreground">Case no.:</span><span className="font-mono-ehr">2607422</span>
              <span className="text-muted-foreground">Admission:</span><span className="font-mono-ehr">29.06.2026 15:48</span>
              <span className="text-muted-foreground">Bed:</span><span>IM / IM3 / IM3-01 / 2</span>
              <span className="text-muted-foreground">Insurance:</span><span>SIM-Kasse (synthetic)</span>
            </div>
          </Section>
          <Section title="Discharge">
            <div className="grid grid-cols-[130px_1fr] gap-x-2 gap-y-0.5">
              <span className="text-muted-foreground">Discharge date:</span><span>—</span>
              <span className="text-muted-foreground">Disch. planned:</span><span>not set</span>
              <span className="text-muted-foreground">Reason:</span><span>—</span>
              <span className="text-muted-foreground">Letter:</span><span><Pill tone="muted">none</Pill></span>
            </div>
          </Section>
          <Section title="DRG traffic light">
            <div className="mb-1 text-[11px] text-teal-deep">Working DRG present<span className="float-right text-muted-foreground">LOS: 5 days</span></div>
            <div className="relative h-3 w-full rounded-sm bg-gradient-to-r from-gold via-teal to-warn">
              <div className="absolute left-[48%] top-0 h-full w-0.5 bg-ink" />
            </div>
            <div className="mt-1 flex justify-between text-[10.5px] text-muted-foreground"><span>LGV: 1.0</span><span>MLOS: 6.4</span><span>UGV: 14.0</span></div>
          </Section>
          <Section title="Physicians">
            <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-0.5">
              <span className="text-muted-foreground">Attending:</span><span>Lindqvist H., Dr. (Team B)</span>
              <span className="text-muted-foreground">Resident:</span><span>Patel S., Dr.</span>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="ehr-section mb-1 text-[12.5px]">{title}</div>
      <div className="rounded-[3px] border border-line bg-row p-2 text-[12px]">{children}</div>
    </div>
  );
}

/* ---------- 5. Medication (extra page) ---------- */
function PanelMedication() {
  const rows = [
    ["Salbutamol nebs","5 mg NEB q4h + PRN","respiratory","given 06:00","active"],
    ["Ipratropium nebs","500 µg NEB q6h","respiratory","given 06:00","active"],
    ["Prednisolone","40 mg PO daily × 5d","steroid","last dose today","tapering"],
    ["Amoxicillin","500 mg PO TDS","antibiotic","held — no infective trigger","hold"],
    ["Tiotropium","18 µg INH daily","LAMA","home med","active"],
    ["Salmeterol/Fluticasone","50/500 µg INH BID","LABA/ICS","home med","active"],
    ["Enoxaparin","40 mg SC daily","VTE ppx","given 22:00","active"],
    ["Pantoprazole","40 mg PO daily","GI ppx (steroid)","given 08:00","active"],
    ["Paracetamol","1 g PO q6h PRN","analgesia","—","PRN"],
  ];
  return (
    <div className="p-3">
      <h3 className="ehr-section mb-2 text-[15px]">Medication — Jenkins, Harold · active MAR</h3>
      <div className="overflow-hidden rounded-[3px] border border-line">
        <table className="w-full border-collapse text-[11.5px]">
          <thead>
            <tr className="border-b border-line bg-teal-soft/60 text-left text-teal-deep">
              {["Drug","Dose / route / frequency","Class","Latest activity","Status"].map((h)=>(<th key={h} className="px-2 py-1.5 font-semibold">{h}</th>))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} className={`border-b border-line align-top ${i%2===0?"bg-row":"bg-row-alt"}`}>
                <td className="px-2 py-1.5 font-semibold">{r[0]}</td>
                <td className="px-2 py-1.5 font-mono-ehr">{r[1]}</td>
                <td className="px-2 py-1.5 text-muted-foreground">{r[2]}</td>
                <td className="px-2 py-1.5">{r[3]}</td>
                <td className="px-2 py-1.5">
                  {r[4]==="hold" ? <Pill tone="gold">HOLD</Pill>
                  : r[4]==="tapering" ? <Pill tone="gold">tapering</Pill>
                  : r[4]==="PRN" ? <Pill tone="muted">PRN</Pill>
                  : <Pill tone="green">active</Pill>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- 6. Fever chart / vitals ---------- */
function PanelVitals() {
  const days = ["29.06","30.06","01.07","02.07","03.07"];
  const temp = [37.2, 36.9, 36.8, 36.7, 36.6];
  const hr = [104, 96, 92, 88, 84];
  return (
    <div className="p-3">
      <h3 className="ehr-section mb-2 text-[15px]">Fever chart / vitals — Jenkins, Harold</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 rounded-[3px] border border-line bg-row p-3">
          <div className="mb-2 flex justify-between text-[11.5px] text-teal-deep font-semibold">
            <span>Temperature (°C) — red · Heart rate (bpm) — teal</span>
            <span className="text-muted-foreground font-normal">last 5 days</span>
          </div>
          <div className="relative h-56 w-full">
            <svg viewBox="0 0 500 220" className="h-full w-full">
              {[0,1,2,3,4].map((i)=>(
                <line key={i} x1="40" x2="490" y1={30 + i*40} y2={30 + i*40} stroke="oklch(0.88 0.01 220)" strokeDasharray="2 3" />
              ))}
              {days.map((d,i)=>(
                <text key={d} x={40 + i*112} y="210" fontSize="10" fill="oklch(0.48 0.02 220)">{d}</text>
              ))}
              <polyline
                points={temp.map((v,i)=>`${40+i*112},${190-(v-36.4)*180}`).join(" ")}
                fill="none" stroke="oklch(0.58 0.22 25)" strokeWidth="2"
              />
              {temp.map((v,i)=>(<circle key={i} cx={40+i*112} cy={190-(v-36.4)*180} r="3" fill="oklch(0.58 0.22 25)" />))}
              <polyline
                points={hr.map((v,i)=>`${40+i*112},${190-(v-80)*4}`).join(" ")}
                fill="none" stroke="oklch(0.38 0.08 200)" strokeWidth="2"
              />
              {hr.map((v,i)=>(<circle key={i} cx={40+i*112} cy={190-(v-80)*4} r="3" fill="oklch(0.38 0.08 200)" />))}
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          <Section title="Latest set">
            <div className="grid grid-cols-2 gap-y-1 font-mono-ehr">
              <span>Temp</span><span className="font-semibold">36.6 °C</span>
              <span>HR</span><span className="font-semibold">84</span>
              <span>RR</span><span className="font-semibold">18</span>
              <span>BP</span><span className="font-semibold">134/78</span>
              <span>SpO₂</span><span className="font-semibold">92 % (RA)</span>
            </div>
          </Section>
          <Section title="Fluid balance 24h">
            <div className="grid grid-cols-2 gap-y-1 font-mono-ehr">
              <span>Input</span><span>1,820 ml</span>
              <span>Output</span><span>1,540 ml</span>
              <span>Balance</span><span className="font-semibold text-teal-deep">+280 ml</span>
            </div>
          </Section>
          <Section title="Notes">
            <div className="text-[11.5px] text-muted-foreground">Weaned to RA overnight. Discussed inhaler technique with nurse specialist 06:20.</div>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PANELS ARRAY
   ========================================================= */
const PANELS: Panel[] = [
  { crumb: "OCCUPANCY · WARD IM3", render: PanelOccupancy },
  { crumb: "TREATMENT LIST · IM3", render: PanelTreatmentList },
  { crumb: "WARD DAY VIEW · 03.07.2026", render: PanelWardDay },
  { crumb: "PATIENT CHART · CASE OVERVIEW", render: PanelCaseOverview },
  { crumb: "PATIENT CHART · MEDICATION", render: PanelMedication },
  { crumb: "PATIENT CHART · FEVER CHART / VITALS", render: PanelVitals },
];

/* =========================================================
   MEDICUS FRAME (chrome + sidebar) around every panel
   ========================================================= */
function MedicusFrame({ crumb, children, index, total }: { crumb: string; children: ReactNode; index: number; total: number }) {
  const nav = [
    { label: "Occupancy", i: 0 },
    { label: "Treatment lists", i: 1 },
    { label: "Worklist", i: 1 },
    { label: "Appointments", i: 2 },
    { label: "Ward chart", i: 3 },
    { label: "OR schedule", i: 3 },
    { label: "OR workflow", i: 3 },
  ];
  return (
    <div className="grid h-[86vh] w-full max-w-[1400px] grid-cols-[180px_1fr] grid-rows-[auto_auto_1fr_auto] overflow-hidden rounded-md border border-teal-deep bg-paper shadow-2xl">
      {/* Title bar */}
      <div className="col-span-2 flex items-center gap-4 bg-chrome px-4 py-2 text-paper">
        <span className="font-display text-lg font-semibold leading-none tracking-tight">
          Medicus<span className="text-gold">.</span>
        </span>
        <span className="text-[12px] opacity-80">Clinical Workplace — Internal Medicine Ward 3 (IM3)</span>
        <div className="ml-auto flex items-center gap-4 font-mono-ehr text-[11px] opacity-90">
          <span>Fri 03.07.2026 · 07:42</span>
          <span className="rounded-[3px] border border-paper/30 bg-chrome-2/30 px-2 py-0.5">IMW\CARTER.J</span>
        </div>
      </div>
      {/* Toolbar */}
      <div className="col-span-2 flex items-center gap-5 border-b border-line bg-chrome-2/25 px-4 py-1.5 text-[12px]">
        <span className="ehr-link">Occupancy</span>
        <span className="ehr-link">Handover</span>
        <span className="ehr-link">Agenda</span>
        <span className="ml-3 ehr-link">Print</span>
        <span className="ehr-link">Refresh</span>
        <span className="ml-auto font-mono-ehr text-[10.5px] uppercase tracking-widest text-muted-foreground">
          {crumb} · Page {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      {/* Sidebar */}
      <aside className="row-span-2 border-r border-line bg-side p-2">
        {nav.map((n) => {
          const active = n.i === index || (index >= 3 && n.label === "Ward chart");
          return (
            <button
              key={n.label}
              className={`mb-0.5 flex w-full items-center gap-2 rounded-[3px] border px-2.5 py-2 text-left text-[12px] leading-tight ${
                active ? "border-teal bg-paper text-teal-deep font-semibold" : "border-transparent text-ink/70 hover:bg-teal-soft/60"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-teal-deep" : "bg-line"}`} />
              <span>{n.label}</span>
            </button>
          );
        })}
        <div className="mt-3 rounded-[3px] border border-gold bg-gold-soft p-1.5 font-mono-ehr text-[10px] leading-tight text-ink">
          MEDICUS 22.10 · SIMULATION synthetic data only
        </div>
      </aside>
      {/* Content */}
      <main className="min-h-0 overflow-hidden bg-paper">
        <div className="h-full overflow-hidden">{children}</div>
      </main>
      {/* Status bar */}
      <div className="col-span-2 flex items-center justify-between border-t border-line bg-chrome-2/30 px-3 py-1 font-mono-ehr text-[10.5px] text-muted-foreground">
        <span>15 inpatients IM3 · 8 assigned to IMW\CARTER.J · 3 discharges planned today</span>
        <span>Front-end simulation — no real patient data (PHI-free)</span>
      </div>
    </div>
  );
}

/* =========================================================
   HERO — horizontal scroll of Medicus screens
   ========================================================= */
function EhrScrollHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = wrap.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const p = scrollable > 0 ? scrolled / scrollable : 0;
      setProgress(p);
      const maxX = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-maxX * p}px, 0, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activePanel = Math.min(PANELS.length - 1, Math.round(progress * (PANELS.length - 1)));

  return (
    <section
      ref={wrapRef}
      aria-label="The fragmented EHR"
      className="relative"
      style={{ height: `${PANELS.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-chrome text-paper">
        {/* Backdrop dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.09] grid-lines" />

        {/* Progress */}
        <div className="absolute inset-x-0 top-0 z-30 h-1 bg-paper/10">
          <div className="h-full bg-gold transition-[width] duration-75" style={{ width: `${progress * 100}%` }} />
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform"
          style={{ width: `${PANELS.length * 100}vw` }}
        >
          {PANELS.map((p, i) => (
            <div key={i} className="flex h-full w-screen shrink-0 items-center justify-center px-4 md:px-10">
              <MedicusFrame crumb={p.crumb} index={i} total={PANELS.length}>
                {p.render()}
              </MedicusFrame>
            </div>
          ))}
        </div>

        {/* Overlay quote */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-chrome via-chrome/85 to-transparent px-6 pb-14 pt-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-3 font-mono-ehr text-[11px] uppercase tracking-widest text-gold">
              The story, buried · page {String(activePanel + 1).padStart(2, "0")} of {String(PANELS.length).padStart(2, "0")}
            </div>
            <p className="font-display text-3xl leading-[1.1] text-paper md:text-5xl lg:text-6xl">
              The patient story is buried under a thousand tabs — scroll through the fragmented EHR modules clinicians navigate every day.
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rotate-90 font-mono-ehr text-[10px] uppercase tracking-[0.3em] text-paper/60">
          scroll ↓ to page →
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PAGE SECTIONS
   ========================================================= */

function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-teal-deep/20 bg-chrome/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#top" className="font-display text-2xl text-paper">
          doctiq<span className="text-gold">.</span>
        </a>
        <nav className="hidden gap-8 font-mono-ehr text-[11px] uppercase tracking-widest text-paper/80 md:flex">
          <a href="#problem" className="hover:text-gold">Problem</a>
          <a href="#product" className="hover:text-gold">Product</a>
          <a href="#how" className="hover:text-gold">How it works</a>
        </nav>
        <a href="#contact" className="rounded-[3px] border border-gold bg-gold px-4 py-1.5 font-mono-ehr text-[11px] uppercase tracking-widest text-ink hover:bg-gold-soft">
          Request access
        </a>
      </div>
    </header>
  );
}

function OneHourStatement() {
  return (
    <section id="problem" className="relative border-y border-line bg-paper-dim py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 font-mono-ehr text-[11px] uppercase tracking-widest text-teal-deep">
          The measurable cost
        </div>
        <h2 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-[104px]">
          Clinicians spend over <em className="text-teal-deep not-italic">one hour</em> every day searching for patient information.
        </h2>
        <p className="mt-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          An hour lost to friction, cognitive load, and tab-switching. Time that belongs to the patient.
        </p>
      </div>
    </section>
  );
}

function Metrics() {
  const items = [
    { k: "62", unit: "min / day", label: "spent by clinicians searching for patient information across systems." },
    { k: "72", unit: "%", label: "of patient data must be read twice before a clinician can act on it — because it is scattered and does not fit the workflow." },
    { k: "1 in 3", unit: "incidents", label: "serious patient safety incidents are linked to EHR usability failures." },
  ];
  return (
    <section className="border-b border-line bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:justify-between">
          <div>
            <div className="mb-3 font-mono-ehr text-[11px] uppercase tracking-widest text-teal-deep">Evidence</div>
            <h2 className="font-display text-4xl md:text-5xl">What the friction costs.</h2>
          </div>
          <div className="font-mono-ehr text-[11px] uppercase tracking-widest text-muted-foreground">
            Sources · JAMIA · Ann Fam Med · ECRI
          </div>
        </div>
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
          {items.map((m, i) => (
            <div key={i} className="flex flex-col justify-between gap-6 bg-paper p-8 md:p-10">
              <div className="flex items-baseline gap-2">
                <div className="font-display text-7xl leading-none md:text-8xl text-teal-deep">{m.k}</div>
                <div className="font-mono-ehr text-xs uppercase tracking-widest text-muted-foreground">{m.unit}</div>
              </div>
              <p className="text-[15px] leading-relaxed text-foreground/80">{m.label}</p>
              <div className="font-mono-ehr text-[10px] uppercase tracking-widest text-gold">
                METRIC · {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductIntro() {
  return (
    <section id="product" className="relative overflow-hidden bg-chrome py-28 text-paper md:py-40">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.08]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-4 font-mono-ehr text-[11px] uppercase tracking-widest text-gold">
          Introducing doctiq
        </div>
        <h2 className="max-w-5xl font-display text-5xl leading-[1.03] tracking-tight md:text-7xl lg:text-[88px]">
          Doctiq lets clinicians build the view they need into a single glance.
        </h2>
        <p className="mt-8 max-w-3xl text-lg text-paper/80 md:text-xl">
          A lightweight, FHIR-native layer on top of the EHR. Clinicians become the active designers of their own views — not the ones who constantly check and correct a machine.
        </p>

        {/* Mock doctiq grid */}
        <div className="mt-16 overflow-hidden rounded-lg border border-paper/15 bg-paper text-ink shadow-2xl">
          <div className="flex items-center justify-between border-b border-line bg-teal-soft/60 px-4 py-2 font-mono-ehr text-[11px] uppercase tracking-widest text-teal-deep">
            <span>doctiq · rounding view · Jenkins, Harold · IM3-01/2</span>
            <span className="text-teal-deep">● live · fhir sync 2s ago</span>
          </div>
          <div className="grid gap-px bg-line p-px md:grid-cols-6 md:grid-rows-3">
            <Cell span="md:col-span-2 md:row-span-2" title="Respiratory trajectory">
              <div className="flex h-full items-end gap-1.5">
                {[52,58,60,64,72,78,84,88,90,92,92].map((v,i)=>(
                  <div key={i} className="flex-1 rounded-t-sm bg-teal-deep" style={{ height: `${v * 0.7}%` }} />
                ))}
              </div>
              <div className="mt-3 flex justify-between font-mono-ehr text-[10px] text-muted-foreground">
                <span>SpO₂ · 29.06</span><span>92 % RA · 03.07</span>
              </div>
            </Cell>
            <Cell span="md:col-span-2" title="Active issues">
              <ul className="space-y-1.5 text-[13px]">
                <li className="flex justify-between"><span>AECOPD (GOLD III)</span><span className="text-muted-foreground">D5</span></li>
                <li className="flex justify-between"><span>Weaning O₂</span><span className="text-teal-deep">on RA</span></li>
                <li className="flex justify-between"><span>Steroid taper</span><span className="text-gold">last dose</span></li>
              </ul>
            </Cell>
            <Cell span="md:col-span-2" title="Meds due · 08:00">
              <ul className="space-y-1.5 font-mono-ehr text-[12px]">
                <li>Prednisolone 40 PO — <span className="text-gold">last dose</span></li>
                <li>Salbutamol NEB — <span className="text-teal-deep">given 06:00</span></li>
                <li>Pantoprazole 40 PO</li>
                <li>Tiotropium INH — home med</li>
              </ul>
            </Cell>
            <Cell span="md:col-span-2" title="Overnight events">
              <ul className="space-y-1.5 text-[13px]">
                <li>03:40 — SpO₂ 92 % on RA sustained</li>
                <li>04:12 — Shift note filed</li>
                <li>06:20 — Inhaler tech reviewed</li>
              </ul>
            </Cell>
            <Cell span="md:col-span-2" title="Today's plan">
              <ol className="list-decimal space-y-1 pl-4 text-[13px]">
                <li>Confirm RA overnight</li>
                <li>Stop nebs → inhalers</li>
                <li>Physio: stairs assessment</li>
                <li>Discharge planning w/ family</li>
              </ol>
            </Cell>
          </div>
        </div>

        <p className="mt-10 max-w-3xl font-display text-2xl font-medium tracking-tight text-paper/90 md:text-3xl">
          One glance. Every patient. The view <span className="text-gold">you</span> designed.
        </p>
      </div>
    </section>
  );
}

function Cell({ span, title, children }: { span: string; title: string; children: ReactNode }) {
  return (
    <div className={`flex min-h-[180px] flex-col gap-3 bg-paper p-5 ${span}`}>
      <div className="flex items-center justify-between">
        <div className="font-mono-ehr text-[10px] uppercase tracking-widest text-teal-deep">{title}</div>
        <div className="h-3 w-3 rounded-sm border border-line" />
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

function Features() {
  const feats = [
    { tag: "01 · Instant Sync", title: "No manual data entry.", body: "Doctiq pulls directly from FHIR-enabled EHRs in real time. What's true in the chart is true in your view — the same second." },
    { tag: "02 · Flexible Grids", title: "One view, every patient.", body: "Organize lab results, medications, and clinical notes in a single view that stays with you as you move from patient to patient." },
    { tag: "03 · Clinician Built", title: "Shaped like rounding.", body: "Designed for the specific cognitive workflow of rounding and acute care medicine — by clinicians, for clinicians." },
  ];
  return (
    <section id="how" className="border-t border-line bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <div className="mb-3 font-mono-ehr text-[11px] uppercase tracking-widest text-teal-deep">What you get</div>
          <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
            A thin, honest layer between you and the record.
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
          {feats.map((f, i) => (
            <article key={i} className="flex flex-col gap-6 bg-paper p-8 md:p-10">
              <div className="font-mono-ehr text-[11px] uppercase tracking-widest text-gold">{f.tag}</div>
              <h3 className="font-display text-3xl md:text-4xl text-teal-deep">{f.title}</h3>
              <p className="text-[15px] leading-relaxed text-foreground/75">{f.body}</p>
              <div className="mt-auto h-px w-full bg-line" />
              <div className="font-mono-ehr text-[10px] uppercase tracking-widest text-muted-foreground">
                shipping in every doctiq deployment
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="bg-chrome py-32 text-paper">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mb-4 font-mono-ehr text-[11px] uppercase tracking-widest text-gold">
          Give the hour back
        </div>
        <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
          Design the view your rounds actually need.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-paper/80">
          Doctiq is being piloted with rounding teams in acute care medicine. Request access to see it on your own data.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:hello@doctiq.health" className="rounded-[3px] bg-gold px-6 py-3 font-mono-ehr text-[12px] uppercase tracking-widest text-ink hover:bg-gold-soft">
            Request access
          </a>
          <a href="mailto:hello@doctiq.health" className="rounded-[3px] border border-paper/30 px-6 py-3 font-mono-ehr text-[12px] uppercase tracking-widest text-paper hover:border-gold hover:text-gold">
            Talk to a clinician
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-chrome py-10 text-paper/70">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 font-mono-ehr text-[11px] uppercase tracking-widest md:flex-row md:items-center">
        <div>doctiq<span className="text-gold">.</span> — clinician-built layer for the EHR</div>
        <div>© 2026 · Built by clinicians, for clinicians</div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <TopBar />
      <main>
        <EhrScrollHero />
        <OneHourStatement />
        <Metrics />
        <ProductIntro />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
