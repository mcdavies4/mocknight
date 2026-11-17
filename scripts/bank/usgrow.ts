// Growth batch for the thinnest US banks: state driving rules (CAD, TXD, FLD, NYD, GAD),
// medical coding (MCD), EPA 608 (EPA), ServSafe (SSM) and phlebotomy (PHB).
// Stable, handbook-level rules only.
import { mcq, Q } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

const CAD: F[] = [
  ["California rules", "In California, you must turn on your headlights when", "your windshield wipers are on continuously because of weather", ["only after midnight", "only on freeways", "never during the day"], "Also from 30 minutes after sunset to 30 minutes before sunrise."],
  ["California rules", "For the first 12 months, a California provisional license holder under 18 may not drive", "between 11 p.m. and 5 a.m. without a licensed adult (with some exceptions)", ["on weekends", "on freeways at any time", "after 6 p.m."], "They also can't carry passengers under 20 unless accompanied."],
  ["California rules", "In California, you must report a collision to the DMV within 10 days if", "anyone was injured or killed, or property damage was over $1,000", ["it happened at night", "you were not at fault", "only if police attended"], "Use form SR-1."],
  ["California rules", "In California, a diamond symbol painted on a lane marks", "a high-occupancy vehicle (HOV/carpool) lane", ["a bike lane", "a bus stop", "a school zone"], "Signs show the minimum number of occupants and hours."],
  ["California rules", "When parallel parking in California, your wheels must be within", "18 inches of the curb", ["3 feet of the curb", "6 inches of the center line", "36 inches of the curb"], "Set the parking brake."],
  ["California rules", "In California, smoking in a vehicle when a minor is present is", "illegal", ["legal with windows open", "legal on freeways", "legal if the minor consents"], "This applies whether the vehicle is moving or stopped."],
];
const TXD: F[] = [
  ["Texas rules", "In Texas, texting while driving is", "banned statewide", ["allowed at red lights", "allowed for adults", "allowed on rural roads"], "Drivers under 18 may not use any wireless device while driving."],
  ["Texas rules", "In Texas, children younger than 8 must ride in a child safety seat unless they are", "taller than 4 feet 9 inches", ["over 40 pounds", "in the back seat", "on a short trip"], "Use a seat that fits the child's size."],
  ["Texas rules", "In Texas, having an open container of alcohol in the passenger area of a vehicle on a public road is", "an offense", ["legal for passengers", "legal if the driver is sober", "legal on weekends"], "It applies even if the vehicle is stopped on the roadway."],
  ["Texas rules", "Texas drivers under 18 with a provisional license may not", "use a wireless communication device while driving, except in an emergency", ["drive on highways", "drive alone in daylight", "drive with a parent"], "This includes hands-free use."],
];
const FLD: F[] = [
  ["Florida rules", "Florida's Wireless Communications While Driving Law prohibits", "texting while driving, and any handheld phone use in school and work zones", ["listening to the radio", "using GPS mounted on the dashboard", "hands-free calls everywhere"], "Hands-free use is allowed outside those zones."],
  ["Florida rules", "During the first 3 months, a Florida learner license holder may drive", "only during daylight hours", ["until midnight", "at any time alone", "only on highways"], "After 3 months they may drive until 10 p.m., always with a licensed driver aged 21 or over."],
  ["Florida rules", "In Florida, seat belts must be worn by", "the driver, front-seat passengers and all passengers under 18", ["only the driver", "only children under 5", "nobody on short trips"], "The driver is responsible for passengers under 18."],
  ["Florida rules", "Florida is a 'no-fault' state, which means drivers must carry", "personal injury protection (PIP) and property damage liability insurance", ["no insurance", "only collision insurance", "only uninsured motorist cover"], "PIP pays your own medical costs regardless of fault."],
];
const NYD: F[] = [
  ["New York rules", "A New York learner permit holder must be supervised by a licensed driver aged", "21 or older", ["16 or older", "18 or older", "25 or older"], "The supervising driver sits in the front passenger seat."],
  ["New York rules", "Before the road test, New York applicants must complete", "a 5-hour pre-licensing course (or an approved driver education course)", ["a 40-hour class", "a first aid course", "nothing"], "It covers highway safety and driver attitudes."],
  ["New York rules", "Drivers under 18 in New York must certify at least how many hours of supervised practice before the road test?", "50 hours, including 15 after sunset", ["10 hours", "20 hours", "100 hours"], "Practice with a supervising driver aged 21 or older."],
  ["New York rules", "In New York, you must turn on your headlights when", "your windshield wipers are on because of bad weather", ["only on highways", "only after midnight", "never in daylight"], "Also from 30 minutes after sunset to 30 minutes before sunrise."],
  ["New York rules", "Under New York's Leandra's Law, driving while intoxicated with a child aged 15 or younger in the vehicle is", "a felony", ["a traffic ticket", "legal with a booster seat", "a warning only"], "It also requires an ignition interlock device for convicted drivers."],
];
const GAD: F[] = [
  ["Georgia rules", "Under Georgia's Joshua's Law, 16-year-olds applying for a Class D license must complete", "an approved 30-hour driver education course and 40 hours of supervised driving", ["no driver education", "a 5-hour course only", "a defensive driving course after the license"], "Six of the 40 hours must be at night."],
  ["Georgia rules", "Georgia Class D (intermediate) license holders may not drive between", "midnight and 6 a.m.", ["8 p.m. and 6 a.m.", "10 p.m. and 4 a.m.", "noon and 2 p.m."], "There are also limits on passengers."],
  ["Georgia rules", "Georgia's Super Speeder law adds an extra state fee for driving", "85 mph or faster on any road, or 75 mph or faster on a two-lane road", ["any speed over the limit", "under the minimum speed", "only in school zones"], "This is on top of the local fine."],
  ["Georgia rules", "In Georgia, you must use your headlights when", "your windshield wipers are needed because of rain, fog or other conditions", ["only after midnight", "only on interstates", "never in daylight"], "Also from 30 minutes after sunset to 30 minutes before sunrise."],
];

const MCD: F[] = [
  ["CPT", "CPT codes for procedures and services are", "5 characters long", ["3 characters long", "7 characters long", "always alphanumeric with a letter first"], "Category II and III codes end in F and T respectively."],
  ["CPT", "Office visits for a new patient are reported with codes", "99202–99205", ["99211–99215", "99221–99223", "99281–99285"], "99211–99215 are established patient office visits."],
  ["Claims", "Physicians and other professionals bill on the", "CMS-1500 (837P) claim", ["UB-04 (837I) claim", "W-2 form", "1099 form"], "Hospitals and facilities use the UB-04."],
  ["Claims", "A National Provider Identifier (NPI) is", "a 10-digit number identifying a health care provider", ["a patient's insurance number", "a diagnosis code", "a procedure code"], "It is required on HIPAA standard transactions."],
  ["ICD-10-CM", "Injury and poisoning codes are found in the range", "S00–T88", ["C00–D49", "Z00–Z99", "I00–I99"], "C00–D49 is neoplasms; I00–I99 is the circulatory system."],
  ["ICD-10-CM", "Essential (primary) hypertension is coded", "I10", ["E11.9", "J45.909", "Z00.00"], "E11 codes are type 2 diabetes."],
  ["ICD-10-CM", "A combination code is", "a single code that classifies two diagnoses, or a diagnosis with a complication", ["two codes always reported together", "a CPT and ICD code on one line", "a code with a modifier"], "Use it when the classification provides one."],
  ["ICD-10-CM", "The instruction 'code first' means", "the underlying condition should be sequenced before this code", ["this code must always be first-listed", "do not code the condition", "use a CPT code first"], "It appears with manifestation codes."],
  ["ICD-10-CM", "A sequela is", "a residual effect after the acute phase of an illness or injury has ended", ["a new injury", "a symptom code", "a screening exam"], "For injuries, it uses the 7th character 'S'."],
  ["Compliance", "Under HIPAA, the minimum necessary rule means", "use or disclose only the minimum information needed for the purpose", ["share the full record with anyone who asks", "never share any information", "only doctors may see records"], "It does not apply to disclosures for treatment."],
];

const EPA: F[] = [
  ["Core", "Refrigerant blends with temperature glide (zeotropic blends such as R-407C) should be charged", "as a liquid", ["as a vapor", "as either, it makes no difference", "only by weight of vapor"], "Charging as vapor can change the blend composition (fractionation)."],
  ["Core", "Compared with R-22, R-410A operates at", "much higher pressures", ["lower pressures", "the same pressures", "below atmospheric pressure"], "Use gauges and hoses rated for R-410A."],
  ["Core", "ASHRAE Standard 34 safety group A1 means a refrigerant has", "lower toxicity and no flame propagation", ["high toxicity", "high flammability", "is banned"], "B is higher toxicity; 2 and 3 indicate flammability."],
  ["Core", "The stratospheric ozone layer protects Earth from", "harmful ultraviolet (UV-B) radiation", ["infrared heat", "radio waves", "visible light"], "Depletion increases skin cancer and cataracts."],
  ["Core", "A refrigerant cylinder should never be", "heated with an open flame", ["stored upright", "labelled", "weighed"], "Overheating can cause it to rupture."],
  ["Type I", "Small appliance recovery equipment manufactured after November 15, 1993 must recover what percentage when the compressor is working?", "90%", ["50%", "80%", "100%"], "80% when the compressor is not working, or achieve a 4-inch vacuum."],
  ["Type I", "System-dependent (passive) recovery on small appliances", "uses the appliance's own compressor or pressure to recover refrigerant", ["needs no equipment at all", "is banned", "is only for chillers"], "Self-contained (active) recovery has its own compressor."],
  ["Type I", "The person at the end of the disposal chain for a small appliance (for example a scrap recycler) must", "ensure the refrigerant has been recovered before disposal", ["vent the refrigerant", "ignore the refrigerant", "send it to a landfill with refrigerant inside"], "They can recover it themselves or get signed verification."],
  ["Type III", "Low-pressure chillers use a purge unit to", "remove air and moisture (non-condensables) that leak in", ["add refrigerant", "increase pressure", "remove oil"], "Excessive purging can indicate a leak."],
  ["Safety", "ASHRAE Standard 15 requires machinery rooms to have", "refrigerant sensors and alarms", ["open flames for heating", "no ventilation", "windows only"], "Some refrigerants can displace oxygen."],
];

const SSM: F[] = [
  ["TCS food", "Which is a TCS (time/temperature control for safety) food?", "cooked rice", ["dry pasta", "bread", "unopened canned soup"], "Others include dairy, eggs, meat, cut melons, cut tomatoes and cut leafy greens."],
  ["Time control", "Hot or cold TCS food held without temperature control under a written plan must be thrown out after", "4 hours", ["8 hours", "12 hours", "24 hours"], "Cold food can be held up to 6 hours if it starts at 41 °F or lower and stays at 70 °F or lower."],
  ["Cooling", "A safe way to cool a large pot of food quickly is to", "divide it into shallow pans no more than 2 inches deep", ["leave it on the counter overnight", "put the whole pot in the freezer", "cover it tightly while hot"], "Ice-water baths and ice paddles also help."],
  ["Thermometers", "A thermometer can be calibrated using the ice-point method, which should read", "32 °F (0 °C)", ["0 °F", "41 °F", "212 °F"], "Adjust the nut on a bimetallic stemmed thermometer if needed."],
  ["Hygiene", "Single-use gloves should be changed", "when torn or dirty, between tasks, and at least every 4 hours of continuous use", ["once a day", "only at the end of a shift", "never if washed"], "Wash hands before putting on gloves."],
  ["Hygiene", "Bare-hand contact with ready-to-eat food is", "not allowed; use gloves, utensils or deli tissue", ["fine if hands look clean", "allowed for chefs", "allowed for bread only"], "Ready-to-eat food won't be cooked again."],
  ["Pathogens", "Scombroid poisoning from fish such as tuna is caused by", "histamine, which cooking does not destroy", ["Salmonella", "Norovirus", "Listeria"], "Buy from approved suppliers and control temperatures."],
  ["Pathogens", "Bacillus cereus is most often linked with", "cooked rice held at the wrong temperature", ["raw oysters", "ground beef", "poultry"], "Cool and hold rice properly."],
  ["Pathogens", "Clostridium perfringens outbreaks are usually linked to", "food that was cooled or held improperly, such as large batches of meat or gravy", ["raw sprouts", "ice", "bottled water"], "Cool food quickly and hot-hold at 135 °F or higher."],
  ["Chemicals", "Cleaning chemicals should be stored", "away from and below food and food-contact surfaces", ["above food prep areas", "next to dry goods", "in unlabeled bottles"], "Keep Safety Data Sheets available."],
];

const PHB: F[] = [
  ["Equipment", "The higher the needle gauge number,", "the smaller the needle bore", ["the larger the needle bore", "the longer the needle", "the sharper the needle"], "21 gauge is standard; 23 gauge butterflies are used for small veins."],
  ["Technique", "The tourniquet is placed about", "3 to 4 inches above the puncture site", ["directly over the site", "on the wrist", "12 inches above the site"], "Remove it before withdrawing the needle."],
  ["Technique", "If a patient has an IV in one arm, you should", "draw from the other arm if possible", ["draw just above the IV", "draw from the IV line yourself", "refuse the draw"], "If you must use that arm, draw below the IV after it has been stopped for at least 2 minutes."],
  ["Technique", "Sites to avoid include", "scars, burns, swollen (edematous) areas and arms with an AV fistula", ["the median cubital vein", "the antecubital area", "the non-dominant arm"], "These can affect results or harm the patient."],
  ["Tubes", "A serum separator tube (SST) should be inverted about", "5 times", ["once", "20 times", "it should never be inverted"], "EDTA and heparin tubes need 8–10 inversions; citrate 3–4."],
  ["Capillary", "In capillary (skin puncture) collection, which is collected first?", "blood gases, then EDTA tubes", ["serum tubes first", "glucose first", "any order"], "The order differs from venipuncture because platelets clump quickly."],
  ["Special tests", "Blood cultures are usually collected", "as two sets from separate sites, with careful skin antisepsis", ["from an existing IV line", "into a lavender tube", "without cleaning the skin"], "This helps tell true infection from contamination."],
  ["Special tests", "A trough drug level is drawn", "just before the next dose is due", ["right after the dose", "at any time", "one week later"], "A peak level is drawn when the concentration is highest."],
  ["Complications", "Tiny red spots on the skin after applying a tourniquet are", "petechiae", ["a hematoma", "an allergy", "edema"], "They can indicate a clotting problem; the site may bleed longer."],
  ["Labelling", "A specimen label should include", "the patient's name and ID or date of birth, date, time and collector's initials", ["only the room number", "only the test name", "the doctor's phone number"], "Follow your facility's policy."],
];

export function usgrow(): Record<string, Q[]> {
  return {
    CAD: facts("CAD", CAD), TXD: facts("TXD", TXD), FLD: facts("FLD", FLD), NYD: facts("NYD", NYD), GAD: facts("GAD", GAD),
    MCD: facts("MCD", MCD), EPA: facts("EPA", EPA), SSM: facts("SSM", SSM), PHB: facts("PHB", PHB),
  };
}
