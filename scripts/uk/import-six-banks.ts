import "../load-env";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
type Row={subject:string;topic:string;body:string;options:string[];answer:number;explanation:string;difficulty:number;exams:string[]};
const file="data/uk/uk-six-banks.json";
const rows=JSON.parse(readFileSync(file,"utf8")) as Row[];
const expected:Record<string,string>={FSM1:"FSM",FSM2:"FSM",FSE1:"FSE",FSE2:"FSE",DRV:"DRIVE",CAR:"CARE"};
const codes=Object.keys(expected); const errors:string[]=[];
for(const code of codes){const n=rows.filter(r=>r.subject===code).length;if(n!==100)errors.push(`${code}: expected 100 questions, found ${n}`)}
const seen=new Set<string>();
for(const [i,r] of rows.entries()){
 if(!codes.includes(r.subject))errors.push(`Row ${i+1}: unknown subject ${r.subject}`);
 if(!r.body?.trim()||!r.topic?.trim()||!r.explanation?.trim())errors.push(`Row ${i+1}: missing text fields`);
 if(!Array.isArray(r.options)||r.options.length!==4||new Set(r.options).size!==4)errors.push(`Row ${i+1}: expected four distinct options`);
 if(!Number.isInteger(r.answer)||r.answer<0||r.answer>3)errors.push(`Row ${i+1}: invalid answer index`);
 if(JSON.stringify(r.exams)!==JSON.stringify([expected[r.subject]]))errors.push(`Row ${i+1}: incorrect exam mapping`);
 const k=`${r.subject}:${r.body.trim().toLowerCase()}`;if(seen.has(k))errors.push(`Row ${i+1}: duplicate question`);seen.add(k);
}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
const url=process.env.SUPABASE_URL?.trim(),key=process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if(!url||!key||/PLACEHOLDER|YOUR[-_ ]/i.test(url+key)){console.error("Missing production Supabase credentials in .env.local");process.exit(1)}
const sb=createClient(url,key,{auth:{persistSession:false}});
const {data:subjects,error:se}=await sb.from("subjects").select("code,exams").in("code",codes);if(se)throw se;
for(const c of codes){const s=subjects?.find(x=>x.code===c);if(!s)throw new Error(`Missing subject ${c}; apply migrations 0007 and 0008 first`);if(JSON.stringify(s.exams)!==JSON.stringify([expected[c]]))throw new Error(`Wrong exam mapping for ${c}`)}
let inserted=0,skipped=0;
for(const r of rows){const {data:old,error:oe}=await sb.from("questions").select("id").eq("subject_code",r.subject).eq("body",r.body).limit(1);if(oe)throw oe;if(old?.length){skipped++;continue}
 const {error}=await sb.from("questions").insert({subject_code:r.subject,topic:r.topic,body:r.body,options:r.options,answer_index:r.answer,explanation:r.explanation,difficulty:r.difficulty,exams:r.exams,reviewed:false,practice_published:true,source:"ai-authored-practice-v1"});if(error)throw new Error(`${r.subject} import failed: ${error.message}`);inserted++;
}
for(const c of codes){const {count,error}=await sb.from("questions").select("id",{count:"exact",head:true}).eq("subject_code",c).or("reviewed.eq.true,practice_published.eq.true");if(error)throw error;if((count??0)<100)throw new Error(`${c} verification failed: ${count??0} published questions`)}
console.log(`UK question import complete. Inserted ${inserted}; already present ${skipped}. All six banks have at least 100 published questions.`);
console.log("Questions are AI-authored practice material, not official or independently human-verified questions.");
