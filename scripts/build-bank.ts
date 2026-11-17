/**
 * Build the question bank into data/bank/*.json.
 *   npm run build-bank
 * Then import:
 *   npm run import-questions -- data/bank/all.json --reviewed --source=bank-v1
 */
import { mkdirSync, writeFileSync } from "node:fs";
import type { Q } from "./bank/lib";
import { reseed } from "./bank/lib";
import { maths } from "./bank/mth";
import { physics } from "./bank/phy";
import { chemistry } from "./bank/chm";
import { economics } from "./bank/eco";
import { english } from "./bank/eng";
import { biology } from "./bank/bio";
import { government } from "./bank/gov";
import { lifeInTheUK } from "./bank/luk";
import { fireSafety } from "./bank/fire";
import { nmcClinical, nmcNumeracy } from "./bank/nmc";
import { projectManagement } from "./bank/pm";
import { aptitude } from "./bank/apt";
import { quant } from "./bank/qnt";
import { generalAwarenessIndia } from "./bank/gai";
import { history, geography } from "./bank/eth";
import { technology } from "./bank/tech";
import { digitalSat } from "./bank/sat";
import { careers } from "./bank/career";
import { nclex } from "./bank/nclex";
import { plab } from "./bank/plab";
import { expansion } from "./bank/expansion";
import { expansion2 } from "./bank/expansion2";
import { expansion3 } from "./bank/expansion3";
import { expansion4 } from "./bank/expansion4";
import { ndt } from "./bank/ndt";
import { oilgas2 } from "./bank/oilgas2";
import { oilgas3 } from "./bank/oilgas3";
const og3 = oilgas3;
import { oilgas4 } from "./bank/oilgas4";
import { africa } from "./bank/africa";
import { africa2 } from "./bank/africa2";
import { ukjobs } from "./bank/ukjobs";
import { ukjobs2 } from "./bank/ukjobs2";
import { drv } from "./bank/drv";
import { drv2 } from "./bank/drv2";
import { techpm } from "./bank/techpm";
import { dataBanks } from "./bank/data";
import { dataBanks2 } from "./bank/data2";
import { usin } from "./bank/usin";
import { usin2 } from "./bank/usin2";
import { wave3 } from "./bank/wave3";
import { wave3b } from "./bank/wave3b";
import { mideast } from "./bank/mideast";
import { usdrive } from "./bank/usdrive";
import { usjobs } from "./bank/usjobs";
import { usgrow } from "./bank/usgrow";
import { usdrive2 } from "./bank/usdrive2";
import { mideast2 } from "./bank/mideast2";
import { usjobs2 } from "./bank/usjobs2";
const exp2 = expansion2;
const exp = expansion;
const car = careers;
const sat = digitalSat;
const tech = technology;
const pm = projectManagement;

const builders: [string, () => Q[]][] = [
  ["MTH", maths], ["PHY", physics], ["CHM", chemistry], ["ECO", economics], ["ENG", english], ["BIO", biology], ["GOV", government], ["LUK", lifeInTheUK], ["FIR", fireSafety], ["NMN", nmcNumeracy], ["NMC", nmcClinical], ["PRN", () => pm().PRN], ["SCR", () => pm().SCR], ["PMF", () => pm().PMF], ["APT", aptitude], ["QNT", quant], ["GAI", generalAwarenessIndia], ["HIS", history], ["GEO", geography], ["ITF", () => tech().ITF], ["CCN", () => tech().CCN], ["AWC", () => tech().AWC], ["AZF", () => tech().AZF], ["PCE", () => tech().PCE], ["SMT", () => sat().SMT], ["SRW", () => sat().SRW], ["SECQ", () => car().SECQ], ["DAQ", () => car().DAQ], ["AIQ", () => car().AIQ], ["CONQ", () => car().CONQ], ["BKQ", () => car().BKQ], ["NCX", nclex], ["PLB", plab], ["USC", () => exp().USC], ["CAN", () => exp().CAN], ["AUS", () => exp().AUS], ["GNX", () => exp().GNX], ["IEV", () => exp().IEV], ["VRB", () => exp().VRB], ["PMP", () => exp().PMP], ["ABT", () => exp().ABT], ["AMA", () => exp().AMA], ["AFA", () => exp().AFA], ["ITL", () => exp().ITL], ["SSG", () => exp().SSG], ["VRS", () => exp().VRS], ["ELM", () => exp().ELM], ["OEH", () => exp2().OEH], ["UDM", () => exp2().UDM], ["USJ", () => exp2().USJ], ["ISC", () => exp2().ISC], ["SST", () => exp2().SST], ["PHC", () => expansion3().PHC], ["NGS", () => expansion4().NGS], ["CVE", () => expansion4().CVE], ["PSR", () => expansion4().PSR], ["IMS", () => expansion4().IMS], ["OGS", () => [...expansion4().OGS, ...og3().OGS]], ["ONG", () => [...expansion4().ONG, ...og3().ONG]], ["NDG", () => [...ndt().NDG, ...og3().NDG]], ["NPT", () => [...ndt().NPT, ...og3().NPT, ...oilgas4().NPT]], ["NMT", () => [...ndt().NMT, ...og3().NMT, ...oilgas4().NMT]], ["NUT", () => [...ndt().NUT, ...og3().NUT]], ["NRT", () => [...ndt().NRT, ...og3().NRT]], ["WIN", () => [...oilgas2().WIN, ...og3().WIN]], ["INS", () => [...oilgas2().INS, ...og3().INS, ...oilgas4().INS]], ["COR", () => [...oilgas2().COR, ...og3().COR]], ["EXC", () => africa().EXC], ["EXM", () => [...africa().EXM, ...africa2().EXM]], ["EXE", () => [...africa().EXE, ...africa2().EXE]], ["EXA", () => africa().EXA], ["TZC", () => [...africa().TZC, ...africa2().TZC]], ["UGC", () => [...africa().UGC, ...africa2().UGC]], ["CMC", () => [...africa().CMC, ...africa2().CMC]], ["K53", () => africa2().K53], ["KEL", () => africa2().KEL], ["CML", () => ukjobs().CML], ["EFA", () => ukjobs().EFA], ["SRU", () => ukjobs().SRU], ["LGV", () => ukjobs().LGV], ["BSR", () => ukjobs2().BSR], ["EYT", () => ukjobs2().EYT], ["WHF", () => ukjobs2().WHF], ["HCA", () => ukjobs2().HCA], ["DRV", () => [...drv(), ...drv2()]], ["APM", () => techpm().APM], ["AGP", () => techpm().AGP], ["BAF", () => techpm().BAF], ["ICC", () => techpm().ICC], ["SAA", () => techpm().SAA], ["AIF", () => techpm().AIF], ["SFA", () => techpm().SFA], ["SQQ", () => dataBanks().SQQ], ["XLQ", () => dataBanks().XLQ], ["PBI", () => [...dataBanks().PBI, ...dataBanks2().PBI]], ["TBL", () => [...dataBanks().TBL, ...dataBanks2().TBL]], ["STQ", () => dataBanks().STQ], ["GSS", () => usin().GSS], ["GSC", () => usin().GSC], ["TSC", () => usin().TSC], ["CNA", () => [...usin().CNA, ...usin2().CNA]], ["AMC", () => usin().AMC], ["AEI", () => usin().AEI], ["IPL", () => [...usin().IPL, ...usin2().IPL]], ["IEC", () => usin().IEC], ["ENV", () => [...usin().ENV, ...usin2().ENV]], ["CDP", () => [...usin().CDP, ...usin2().CDP]], ["GCM", () => wave3().GCM], ["GEL", () => wave3().GEL], ["CSJ", () => [...wave3().CSJ, ...wave3b().CSJ]], ["AEN", () => [...wave3().AEN, ...wave3b().AEN]], ["CDL", () => [...wave3().CDL, ...wave3b().CDL]], ["OG1", () => [...wave3().OG1, ...wave3b().OG1]], ["APL", () => [...wave3().APL, ...wave3b().APL]], ["SYP", () => wave3().SYP], ["CCX", () => wave3().CCX], ["NGN", () => wave3().NGN], ["USM", () => [...wave3().USM, ...wave3b().USM]], ["GPH", () => [...wave3().GPH, ...wave3b().GPH]], ["UDR", () => mideast().UDR], ["TLP", () => mideast().TLP], ["LAB", () => [...mideast().LAB, ...mideast2().LAB]], ["PHT", () => [...mideast().PHT, ...mideast2().PHT]], ["DEN", () => [...mideast().DEN, ...mideast2().DEN]], ["PIC", () => [...mideast().PIC, ...mideast2().PIC]], ["SRA", () => [...mideast().SRA, ...mideast2().SRA]], ["USD", () => [...usdrive().USD, ...usdrive2().USD]], ["CAD", () => [...usdrive().CAD, ...usgrow().CAD, ...usdrive2().CAD]], ["TXD", () => [...usdrive().TXD, ...usgrow().TXD, ...usdrive2().TXD]], ["FLD", () => [...usdrive().FLD, ...usgrow().FLD, ...usdrive2().FLD]], ["NYD", () => [...usdrive().NYD, ...usgrow().NYD, ...usdrive2().NYD]], ["GAD", () => [...usdrive().GAD, ...usgrow().GAD, ...usdrive2().GAD]], ["PHB", () => [...usjobs().PHB, ...usgrow().PHB]], ["MAQ", () => [...usjobs().MAQ, ...usjobs2().MAQ]], ["PTB", () => [...usjobs().PTB, ...usjobs2().PTB]], ["MCD", () => [...usjobs().MCD, ...usgrow().MCD]], ["SIE", () => [...usjobs().SIE, ...usjobs2().SIE]], ["RES", () => [...usjobs().RES, ...usjobs2().RES]], ["LHI", () => [...usjobs().LHI, ...usjobs2().LHI]], ["SSM", () => [...usjobs().SSM, ...usgrow().SSM]], ["EPA", () => [...usjobs().EPA, ...usgrow().EPA]], ["ODP", () => [...oilgas2().ODP, ...og3().ODP]],
];

mkdirSync("data/bank", { recursive: true });
const all: Q[] = [];
let failed = false;

for (const [code, build] of builders) {
  reseed(code.split("").reduce((s, c) => s * 31 + c.charCodeAt(0), 7));
  const raw = build();
  const seen = new Set<string>();
  const qs: Q[] = [];
  const problems: string[] = [];
  for (const q of raw) {
    if (seen.has(q.body)) continue;
    seen.add(q.body);
    const opts = q.options.map((o) => o.trim().toLowerCase());
    if (q.options.length < 2 || q.options.length > 5) problems.push(`options count: ${q.body}`);
    if (new Set(opts).size !== q.options.length) problems.push(`duplicate options: ${q.body}`);
    if (q.answer < 0 || q.answer >= q.options.length) problems.push(`bad answer: ${q.body}`);
    if (q.options.some((o) => !o || /\bNaN\b|undefined|Infinity/.test(o))) problems.push(`bad option text: ${q.body} → ${q.options.join(" | ")}`);
    if (/\bNaN\b|undefined|Infinity/.test(q.body + q.explanation)) problems.push(`bad text: ${q.body}`);
    qs.push(q);
  }
  if (problems.length) {
    failed = true;
    console.error(`${code} problems:\n  ` + problems.join("\n  "));
  }
  const topics = new Set(qs.map((q) => q.topic)).size;
  console.log(`${code}: ${qs.length} questions across ${topics} topics${qs.length < (["FIR", "NMN", "NMC", "PRN", "SCR", "PMF", "APT", "QNT", "GAI", "HIS", "GEO", "ITF", "CCN", "AWC", "AZF", "PCE", "SMT", "SRW", "SECQ", "DAQ", "AIQ", "CONQ", "BKQ", "NCX", "PLB", "USC", "CAN", "AUS", "GNX", "IEV", "VRB", "PMP", "ABT", "AMA", "AFA", "ITL", "SSG", "VRS", "ELM", "OEH", "UDM", "USJ", "ISC", "SST", "PHC", "NGS", "CVE", "PSR", "IMS", "OGS", "ONG", "NDG", "NPT", "NMT", "NUT", "NRT", "WIN", "INS", "COR", "ODP", "EXC", "EXM", "EXE", "EXA", "TZC", "UGC", "CMC", "K53", "KEL", "CML", "EFA", "SRU", "LGV", "BSR", "EYT", "WHF", "HCA", "DRV", "APM", "AGP", "BAF", "ICC", "SAA", "AIF", "SFA", "SQQ", "XLQ", "PBI", "TBL", "STQ", "GSS", "GSC", "TSC", "CNA", "AMC", "AEI", "IPL", "IEC", "ENV", "CDP", "GCM", "GEL", "CSJ", "AEN", "CDL", "OG1", "APL", "SYP", "CCX", "NGN", "USM", "GPH", "UDR", "TLP", "LAB", "PHT", "DEN", "PIC", "SRA", "USD", "CAD", "TXD", "FLD", "NYD", "GAD", "PHB", "MAQ", "PTB", "MCD", "SIE", "RES", "LHI", "SSM", "EPA"].includes(code) ? 100 : 300) ? "  ⚠ under target" : ""}`);
  writeFileSync(`data/bank/${code}.json`, JSON.stringify(qs, null, 1));
  all.push(...qs);
}
writeFileSync("data/bank/all.json", JSON.stringify(all, null, 1));
console.log(`Total: ${all.length}`);
if (failed) process.exit(1);
