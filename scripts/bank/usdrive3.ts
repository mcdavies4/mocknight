// State handbook rules for five more DMV permit tests: Virginia (VAD), North Carolina (NCD),
// Ohio (OHD), Illinois (ILD) and Pennsylvania (PAD). General rules of the road come from USD.
import { mcq, Q } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

const VAD: F[] = [
  ["Virginia test", "Part one of the Virginia knowledge exam has 10 traffic sign questions. How many must you get right?", "all 10", ["8", "7", "5"], "You can't move on to part two until every sign question is correct."],
  ["Virginia test", "What score do you need on part two (general knowledge) of the Virginia exam?", "at least 80%", ["at least 50%", "at least 65%", "100%"], "Part two covers laws and safe driving."],
  ["Virginia test", "If you're under 18 and fail the Virginia knowledge exam, how long must you wait to retake it?", "15 days", ["1 day", "7 days", "30 days"], "Adults can usually retest sooner."],
  ["Virginia test", "After failing the Virginia knowledge exam three times, you must", "complete a driver ed course", ["wait one full year before retesting", "pay a $500 fine to the DMV", "take the road skills test first"], "Then bring the certificate to DMV to retest."],
  ["Virginia permits", "The minimum age for a Virginia learner's permit is", "15½", ["14", "16", "17"], "You'll also need a vision screening."],
  ["Virginia permits", "Drivers under 18 in Virginia must hold a learner's permit for at least", "9 months", ["1 month", "3 months", "2 years"], "Before applying for a provisional license."],
  ["Virginia permits", "Virginia teens must log how many hours of supervised driving?", "45, including 15 after sunset", ["10, all in daylight", "20, including 5 at night", "100, including 50 at night"], "The parent or guardian certifies the hours."],
  ["Virginia rules", "In Virginia, drivers under 21 may not drive with a BAC of", "0.02% or more", ["0.08% or more", "0.10% or more", "0.15% or more"], "Adults are over the limit at 0.08%."],
  ["Virginia rules", "Under Virginia law, holding a handheld phone while driving is", "illegal for all drivers", ["allowed at under 25 mph", "allowed on rural roads", "only illegal for buses"], "Hands-free use is allowed for adults."],
  ["Virginia rules", "In Virginia, you must turn your headlights on whenever", "your wipers are on for rain", ["you drive above 45 mph", "you pass a school", "you're on any highway"], "Also from sunset to sunrise and in poor visibility."],
  ["Virginia rules", "Unless signs say otherwise, the speed limit in Virginia business and residence districts is", "25 mph", ["15 mph", "35 mph", "45 mph"], "Watch for posted limits."],
  ["Virginia rules", "In Virginia, driving over 85 mph, or 20 mph or more over the limit, can be charged as", "reckless driving", ["a parking offence", "a warning only", "a minor infraction"], "It's a criminal offence."],
  ["Virginia rules", "Provisional drivers under 18 in Virginia may not drive between", "midnight and 4 a.m.", ["6 p.m. and 9 p.m.", "noon and 2 p.m.", "8 a.m. and 10 a.m."], "There are exceptions for work, school and emergencies."],
  ["Virginia rules", "In their first year, Virginia drivers under 18 may carry how many passengers under 21 (not family)?", "only one", ["none ever", "three", "any number"], "After a year, the limit rises to three until age 18."],
  ["Virginia rules", "Virginia's Move Over law requires you to change lanes or slow down for", "stopped vehicles with flashing lights", ["cars parked along the curb", "cyclists riding in the bike lanes", "city buses stopped at bus stops"], "Including police, emergency and highway vehicles."],
];

const NCD: F[] = [
  ["North Carolina test", "The North Carolina knowledge test has 25 questions. How many must you get right?", "20", ["15", "18", "25"], "That's 80%."],
  ["North Carolina test", "Besides the knowledge test, NC permit applicants also pass", "a traffic signs test", ["a parallel parking test", "a first aid exam", "an engine check"], "Plus a vision test."],
  ["North Carolina permits", "The minimum age for a North Carolina Level 1 limited learner permit is", "15", ["14", "16", "17"], "You must have completed driver education."],
  ["North Carolina permits", "How long must you hold a Level 1 permit in North Carolina?", "12 months", ["1 month", "3 months", "2 years"], "Then you can apply for a Level 2 limited provisional license."],
  ["North Carolina permits", "North Carolina driver education includes 30 hours of classroom instruction and", "6 hours behind the wheel", ["no driving at all", "50 hours behind the wheel", "1 hour on a simulator"], "From an approved provider."],
  ["North Carolina permits", "In the first six months, a Level 1 permit holder may drive only between", "5 a.m. and 9 p.m.", ["9 p.m. and 5 a.m.", "noon and 6 p.m.", "any time alone"], "Always with a supervising driver."],
  ["North Carolina permits", "A Level 1 supervising driver must have been licensed for at least", "5 years", ["6 months", "1 year", "20 years"], "Usually a parent or guardian."],
  ["North Carolina rules", "In North Carolina, drivers under 21 may drive with a BAC of", "no alcohol at all", ["up to 0.02%", "up to 0.05%", "up to 0.08%"], "Adults are over the limit at 0.08%."],
  ["North Carolina rules", "North Carolina drivers under 18 may use a mobile phone while driving", "only to call for help in an emergency", ["whenever the traffic is light", "hands-free at any time they like", "only while stopped at red lights"], "Texting while driving is illegal for everyone."],
  ["North Carolina rules", "In North Carolina, headlights must be on when", "your wipers are on for rain", ["you drive above 50 mph", "you park on a steep hill", "you drive on the weekend"], "Also from sunset to sunrise."],
  ["North Carolina rules", "Unless posted, the speed limit inside North Carolina city limits is", "35 mph", ["20 mph", "45 mph", "55 mph"], "Outside city limits it's usually 55 mph."],
  ["North Carolina rules", "Unless posted, the speed limit outside NC city limits is", "55 mph", ["35 mph", "45 mph", "65 mph"], "Interstates may be posted higher."],
  ["North Carolina rules", "On a two-lane NC road, when a school bus stops with its stop arm out, traffic must", "stop in both directions", ["stop only behind it", "slow to 25 mph", "pass on the left"], "Rules differ on divided highways with four or more lanes."],
  ["North Carolina rules", "North Carolina's Move Over law covers stopped", "emergency and tow vehicles with lights on", ["delivery vans parked on the street", "cyclists riding on the shoulder", "vehicles parked in driveways"], "Move over a lane or slow down."],
];

const OHD: F[] = [
  ["Ohio test", "How many questions are on the Ohio knowledge test?", "40", ["20", "25", "50"], "All multiple choice, on traffic laws and signs."],
  ["Ohio test", "What score do you need to pass the Ohio knowledge test?", "75%", ["60%", "85%", "100%"], "That's 30 of 40 correct."],
  ["Ohio test", "If you fail the Ohio knowledge test, you can retake it after", "24 hours", ["1 hour", "30 days", "6 months"], "There's no fixed limit on attempts."],
  ["Ohio permits", "Ohio's learner's permit is called the", "TIPIC", ["CDL", "GDL-X", "PRP"], "Temporary Instruction Permit Identification Card."],
  ["Ohio permits", "The minimum age for an Ohio TIPIC is", "15½", ["14", "16", "17"], "You need to pass the knowledge test and a vision screening."],
  ["Ohio permits", "Ohio drivers under 18 must hold their TIPIC for at least", "6 months", ["1 month", "3 months", "1 year"], "Before taking the driving test."],
  ["Ohio permits", "Ohio teens must log how many hours of supervised driving?", "50, including 10 at night", ["10, all in daylight", "25, including 2 at night", "100, including 40 at night"], "Signed off by a parent or guardian."],
  ["Ohio permits", "Ohio driver education for teens includes 24 hours of classroom and", "8 hours behind the wheel", ["no driving", "40 hours behind the wheel", "2 hours on a simulator"], "From a licensed driver training school."],
  ["Ohio rules", "In Ohio, drivers under 21 may not drive with a BAC of", "0.02% or more", ["0.08% or more", "0.10% or more", "0.17% or more"], "Adults are over the limit at 0.08%."],
  ["Ohio rules", "Under Ohio's distracted driving law, holding or using a phone while driving is", "illegal for all drivers", ["allowed under 35 mph", "allowed on rural roads", "only illegal at night"], "Hands-free use is allowed for adults."],
  ["Ohio rules", "Unless posted, the speed limit in an Ohio school zone during restricted hours is", "20 mph", ["15 mph", "30 mph", "35 mph"], "When children are present or the signs are flashing."],
  ["Ohio rules", "In Ohio, headlights must be used whenever", "your wipers are in use", ["you're on a freeway", "it's above 80°F", "you have passengers"], "Also from sunset to sunrise."],
  ["Ohio rules", "Ohio probationary drivers under 17 may not drive alone between", "midnight and 6 a.m.", ["6 a.m. and noon", "3 p.m. and 6 p.m.", "8 p.m. and 10 p.m."], "Unless with a parent or guardian, or for work or school."],
  ["Ohio rules", "Ohio's Move Over law requires you to change lanes or slow down for", "stopped vehicles with flashing lights", ["any car parked on the shoulder", "vehicles in school zones only", "slow-moving farm tractors only"], "Including police, emergency, road crew and tow vehicles."],
];

const ILD: F[] = [
  ["Illinois test", "How many questions are on the Illinois written driver's test?", "35", ["20", "25", "50"], "15 are about road signs and 20 about traffic laws."],
  ["Illinois test", "How many of the 35 Illinois questions must you get right?", "28", ["21", "25", "35"], "That's 80%."],
  ["Illinois permits", "The minimum age for an Illinois instruction permit is", "15", ["14", "16", "17"], "You must be enrolled in an approved driver education course."],
  ["Illinois permits", "Illinois drivers under 18 must hold their permit for at least", "9 months", ["1 month", "3 months", "2 years"], "Before applying for a license."],
  ["Illinois permits", "Illinois teens must log how many hours of supervised driving?", "50, including 10 at night", ["10, all in daylight", "25, including 2 at night", "100, including 40 at night"], "Certified by a parent or guardian."],
  ["Illinois permits", "An Illinois permit holder must drive with a licensed adult who is at least", "21", ["16", "18", "30"], "Seated in the front passenger seat."],
  ["Illinois rules", "Illinois's zero tolerance law means a driver under 21 may drive with", "no alcohol at all", ["a BAC below 0.08%", "a BAC below 0.05%", "one drink per hour"], "Adults are over the limit at 0.08%."],
  ["Illinois rules", "In Illinois, using a handheld phone while driving is", "illegal for all drivers", ["allowed under 30 mph", "allowed on interstates", "only illegal at night"], "Drivers under 19 can't use a phone at all, even hands-free."],
  ["Illinois rules", "Illinois's Move Over law, which protects stopped emergency vehicles, is known as", "Scott's Law", ["Megan's Law", "Amber's Law", "Lemon Law"], "Change lanes or slow down and proceed with caution."],
  ["Illinois rules", "Unless posted, the speed limit in an Illinois urban district is", "30 mph", ["20 mph", "45 mph", "55 mph"], "School zones are 20 mph when children are present."],
  ["Illinois rules", "On school days in Illinois, when children are present, the school zone speed limit is", "20 mph", ["10 mph", "30 mph", "35 mph"], "Usually 7 a.m. to 4 p.m."],
  ["Illinois rules", "Illegally passing a stopped school bus in Illinois can lead to", "a license suspension", ["a verbal warning only", "a parking ticket only", "no penalty at all"], "Plus a fine."],
  ["Illinois rules", "In Illinois, headlights must be on whenever", "your wipers are on for rain", ["you drive over 55 mph", "you carry a passenger", "it's after noon"], "Also from sunset to sunrise."],
];

const PAD: F[] = [
  ["Pennsylvania test", "How many questions are on the Pennsylvania knowledge test?", "18", ["10", "25", "40"], "Multiple choice, on signs, laws and safe driving."],
  ["Pennsylvania test", "How many of the 18 Pennsylvania questions must you get right?", "15", ["12", "14", "18"], "About 83%."],
  ["Pennsylvania test", "If you fail the Pennsylvania knowledge test, you can retake it", "the next business day", ["after waiting 30 days", "after waiting 6 months", "never again"], "The permit is issued once you pass."],
  ["Pennsylvania permits", "The minimum age for a Pennsylvania learner's permit is", "16", ["14", "15", "17"], "A physical exam form is also required."],
  ["Pennsylvania permits", "A Pennsylvania learner's permit is valid for", "one year", ["30 days", "six months", "five years"], "It can be extended."],
  ["Pennsylvania permits", "Pennsylvania teens must hold a learner's permit for at least", "6 months", ["1 month", "3 months", "2 years"], "Before taking the road test."],
  ["Pennsylvania permits", "Pennsylvania drivers under 18 must log", "65 hours (10 night, 5 bad weather)", ["20 hours (all of them in daylight)", "40 hours (5 at night, 5 in rain)", "100 hours (50 of them at night)"], "Signed off on a certification form."],
  ["Pennsylvania rules", "In Pennsylvania, drivers under 21 may not drive with a BAC of", "0.02% or more", ["0.08% or more", "0.10% or more", "0.16% or more"], "Adults are over the limit at 0.08%."],
  ["Pennsylvania rules", "Pennsylvania junior license holders may not drive between", "11 p.m. and 5 a.m.", ["6 p.m. and 9 p.m.", "noon and 2 p.m.", "7 a.m. and 9 a.m."], "Exceptions apply for work and some activities."],
  ["Pennsylvania rules", "Pennsylvania's 'Steer Clear' law requires you to move over or slow down for", "emergency response areas", ["stopped school buses only", "any parked cars", "cyclists on the road"], "Areas marked by flashing lights, flares or signs."],
  ["Pennsylvania rules", "When a school bus stops with red lights flashing in Pennsylvania, you must stop at least", "10 feet away", ["2 feet away", "50 feet away", "100 yards away"], "Unless you're on the other side of a divided highway."],
  ["Pennsylvania rules", "When the lights are flashing, the speed limit in a Pennsylvania school zone is", "15 mph", ["10 mph", "25 mph", "35 mph"], "Watch for flashing signals and posted times."],
  ["Pennsylvania rules", "In Pennsylvania, you must use your headlights when", "your wipers are on for rain", ["you drive over 50 mph", "you carry a passenger", "it's a public holiday"], "Also from sunset to sunrise."],
  ["Pennsylvania rules", "Pennsylvania law bans texting while driving and, since 2025, using", "a handheld phone", ["the car radio", "cruise control", "the heater"], "Under Paul Miller's Law."],
];

export function usdrive3(): Record<string, Q[]> {
  return { VAD: facts("VAD", VAD), NCD: facts("NCD", NCD), OHD: facts("OHD", OHD), ILD: facts("ILD", ILD), PAD: facts("PAD", PAD) };
}
