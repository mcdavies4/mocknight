// US driving permit tests: USD (general rules shared by every state) plus state-specific banks
// CAD (California), TXD (Texas), FLD (Florida), NYD (New York), GAD (Georgia).
// Only rules stated in the state handbooks that are stable; calculations generated.
import { fmt, mcq, numOpts, pick, Q, repeat } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

const USD: F[] = [
  ["Signs", "An eight-sided red sign means", "stop", ["yield", "do not enter", "railroad crossing"], "Come to a complete stop at the stop line, crosswalk or intersection."],
  ["Signs", "A downward-pointing red and white triangle means", "yield", ["stop", "no passing", "school zone"], "Slow down and give the right-of-way."],
  ["Signs", "A yellow diamond-shaped sign is a", "warning sign", ["regulatory sign", "guide sign", "construction detour only"], "It warns of a hazard or change ahead."],
  ["Signs", "A five-sided (pentagon) sign warns of", "a school zone or school crossing", ["a railroad crossing", "a hospital", "a no-passing zone"], "Watch for children."],
  ["Signs", "A round yellow sign with an X and two R's warns of", "a railroad crossing ahead", ["a rest area", "a road closure", "a roundabout"], "Slow down, look and listen."],
  ["Signs", "A pennant-shaped yellow sign on the left side of the road means", "no passing zone", ["merge ahead", "two-way traffic", "end of road"], "It marks the start of a no-passing zone."],
  ["Signs", "Orange signs are used in", "work zones", ["school zones", "hospital zones", "parks"], "Fines are often higher in work zones."],
  ["Signals", "A flashing red traffic light means", "stop, then go when it is safe", ["slow down and proceed", "the light is broken; ignore it", "yield only to pedestrians"], "Treat it like a stop sign."],
  ["Signals", "A flashing yellow light means", "slow down and proceed with caution", ["stop completely", "speed up", "turn only"], "Watch for hazards."],
  ["Signals", "A steady yellow light means", "the light is about to turn red; stop if you can do so safely", ["speed up to beat the red", "go only if turning", "the road is closed"], "Don't enter the intersection if you can stop safely."],
  ["Pavement markings", "A solid yellow line on your side of the center line means", "you may not pass", ["you may pass if safe", "the lane is for buses", "parking is allowed"], "Broken yellow means passing is allowed when safe."],
  ["Pavement markings", "Two solid yellow lines in the center of the road mean", "no passing for traffic in either direction", ["passing allowed both ways", "a bike lane", "a turning lane"], "You may cross them only to turn left into a driveway where allowed."],
  ["Right-of-way", "At a four-way stop, if two vehicles arrive at the same time, the right-of-way goes to", "the vehicle on the right", ["the vehicle on the left", "the larger vehicle", "the vehicle going straight always"], "The first to stop goes first otherwise."],
  ["Right-of-way", "When turning left, you must yield to", "oncoming traffic and pedestrians", ["vehicles behind you", "parked cars", "nobody if your signal is on"], "Wait in the intersection only if safe and legal."],
  ["Right-of-way", "When an emergency vehicle with lights and siren approaches, you should", "pull to the right edge of the road and stop", ["speed up", "stop in the middle of the road", "keep driving normally"], "Stay stopped until it passes."],
  ["Right-of-way", "Pedestrians who are blind may be identified by", "a white cane or a guide dog", ["a red flag", "a yellow vest", "a blue badge"], "Always yield to them."],
  ["School buses", "When a school bus has its red lights flashing and stop arm out on a two-lane road, you must", "stop, whichever direction you are traveling", ["slow down and pass", "pass on the left", "honk and continue"], "Stay stopped until the lights stop flashing."],
  ["Safe driving", "The legal blood alcohol concentration (BAC) limit for adult drivers (21+) in every US state except Utah is", "0.08%", ["0.10%", "0.05%", "0.02%"], "Utah uses 0.05%; drivers under 21 face much lower limits."],
  ["Safe driving", "Implied consent means that by driving you have agreed to", "chemical testing for alcohol or drugs if lawfully asked", ["any search of your car", "pay all tolls", "give up your license"], "Refusing usually leads to license suspension."],
  ["Safe driving", "The only thing that sobers up a drinker is", "time", ["coffee", "a cold shower", "fresh air"], "The body removes alcohol at a fixed rate."],
  ["Safe driving", "A good minimum following distance in normal conditions is", "at least 3 seconds", ["1 second", "one car length at any speed", "10 feet"], "Increase it in bad weather or at night."],
  ["Safe driving", "If your vehicle starts to skid, you should", "ease off the gas and steer in the direction you want to go", ["slam on the brakes", "turn the wheel sharply the other way", "accelerate"], "Avoid overcorrecting."],
  ["Safe driving", "Hydroplaning is most likely", "at higher speeds on wet roads", ["at low speeds on dry roads", "only on ice", "only at night"], "Slow down in rain and keep tires in good condition."],
  ["Safe driving", "When driving in fog, you should use", "low-beam headlights", ["high-beam headlights", "parking lights only", "no lights"], "High beams reflect off fog."],
  ["Safe driving", "You must dim your high beams when an oncoming vehicle is within", "500 feet", ["50 feet", "2,000 feet", "1 mile"], "Also dim them within 300 feet when following a vehicle."],
  ["Safe driving", "Blind spots are best checked by", "turning your head to look over your shoulder", ["using only the rear-view mirror", "honking", "slowing down"], "Mirrors don't show everything."],
  ["Parking", "When parking downhill next to a curb, turn your front wheels", "toward the curb", ["away from the curb", "straight ahead", "either way"], "Uphill with a curb: turn them away from the curb."],
  ["Parking", "You should not park within how many feet of a fire hydrant in most states?", "15 feet", ["5 feet", "50 feet", "100 feet"], "Check your state handbook for exact distances."],
  ["Sharing the road", "Large trucks have large blind spots called", "no-zones", ["safe zones", "cushions", "buffers"], "If you can't see the truck's mirrors, the driver can't see you."],
  ["Sharing the road", "When passing a bicyclist, you should", "give them plenty of space and pass only when safe", ["honk and pass closely", "follow closely", "speed past"], "Many states require at least 3 feet."],
  ["Sharing the road", "A 'Move Over' law requires drivers to", "move over or slow down for stopped emergency and service vehicles with flashing lights", ["move to the left lane at all times", "stop for all trucks", "use high beams"], "All states have a version of this law."],
  ["Emergencies", "If your brakes fail, first try", "pumping the brake pedal", ["turning off the engine", "shifting to neutral at high speed", "jumping out"], "Then use the parking brake gently and shift to a lower gear."],
  ["Emergencies", "If a tire blows out, you should", "grip the wheel firmly and slow down gradually", ["brake hard immediately", "steer sharply to the shoulder", "accelerate"], "Pull off the road when you have slowed."],
];
function usdCalc(): Q[] {
  return repeat(8, () => {
    const mph = pick([30, 45, 55, 65]), secs = 3, ft = Math.round(mph * 1.467 * secs);
    return mcq("USD", "Safe driving", `At ${mph} mph you travel about ${fmt(Math.round(mph * 1.467))} feet per second. How far do you travel during a 3-second following gap?`, `About ${ft} feet`, numOpts(ft, [mph * 3, Math.round(mph * 1.467), ft * 2], "feet").map((x) => `About ${x}`), `${fmt(Math.round(mph * 1.467))} ft/s × 3 s ≈ ${ft} feet.`, 2);
  });
}

const CAD: F[] = [
  ["California rules", "In California, the knowledge test pass mark is", "80% or more", ["50%", "60%", "100%"], "Adults typically answer 36 questions and need 30 correct."],
  ["California rules", "California's hands-free law means drivers 18 and over may", "not hold a phone while driving, even at a red light", ["text at red lights", "hold the phone for calls", "use the phone below 25 mph"], "Mount the phone and use one touch or voice only."],
  ["California rules", "Drivers under 18 in California may use a cell phone while driving", "not at all, even hands-free (except emergencies)", ["only hands-free", "only at red lights", "only for navigation"], "Minors cannot use wireless devices while driving."],
  ["California rules", "Unless posted otherwise, the speed limit in a California alley is", "15 mph", ["5 mph", "25 mph", "35 mph"], "Residential and school zones are usually 25 mph."],
  ["California rules", "Unless posted otherwise, the speed limit in a business or residential district in California is", "25 mph", ["15 mph", "35 mph", "45 mph"], "The basic speed law still applies: never drive faster than is safe."],
  ["California rules", "Unless posted otherwise, the maximum speed on a two-lane undivided highway in California is", "55 mph", ["45 mph", "65 mph", "70 mph"], "Vehicles towing trailers are also limited to 55 mph."],
  ["California rules", "California's 'basic speed law' says you must", "never drive faster than is safe for current conditions", ["always drive at the posted limit", "drive 10 mph under the limit", "only slow down at night"], "Even below the posted limit you can be cited."],
  ["California rules", "In California, you must signal at least how far before turning?", "100 feet", ["10 feet", "50 feet", "500 feet"], "Signal before changing lanes too."],
  ["California rules", "A red-painted curb in California means", "no stopping, standing or parking", ["loading only", "passenger loading only", "parking for people with disabilities"], "Yellow is loading, white is passenger loading, green is limited time and blue is disabled parking."],
  ["California rules", "A blue-painted curb in California is for", "parking for people with disabilities who display a placard or plate", ["loading", "short-term parking", "taxis"], "Fines for misuse are high."],
  ["California rules", "In California, drivers under 21 must not drive with a BAC of", "0.01% or more", ["0.08% or more", "0.05% or more", "0.10% or more"], "California has a zero tolerance law for under-21 drivers."],
  ["California rules", "In California, children must ride in a car seat or booster seat until they are", "8 years old or 4 feet 9 inches tall", ["2 years old", "12 years old only", "5 years old"], "Children under 8 must ride in the back seat."],
];
const TXD: F[] = [
  ["Texas rules", "The Texas knowledge test passing score is", "70%", ["50%", "80%", "100%"], "Practice tests usually use 30 questions, needing 21 correct."],
  ["Texas rules", "In Texas, you can apply for a Class C learner license at age", "15", ["14", "16", "18"], "You must complete the classroom part of driver education and pass a vision test."],
  ["Texas rules", "In Texas, a driver under 21 commits an offense if they drive with", "any detectable amount of alcohol", ["a BAC of 0.08% or more", "a BAC of 0.05% or more", "only if they cause a crash"], "Texas has a zero tolerance policy for minors."],
  ["Texas rules", "Texas law requires headlights to be on", "from 30 minutes after sunset to 30 minutes before sunrise", ["only after midnight", "only in rain", "only on highways"], "Also when visibility is poor."],
  ["Texas rules", "Unless posted otherwise, the speed limit in a Texas urban district is", "30 mph", ["20 mph", "45 mph", "55 mph"], "Speed limits are posted on most roads."],
  ["Texas rules", "Texas's Move Over/Slow Down law requires you to vacate the lane closest to a stopped emergency vehicle or", "slow to 20 mph below the posted limit", ["stop completely", "speed up to pass quickly", "turn on hazard lights only"], "It also covers tow trucks and TxDOT vehicles with lights on."],
  ["Texas rules", "On a Texas road where a school bus is stopped with red lights flashing, traffic in both directions must stop unless", "the road is divided by a median or barrier", ["it is after 5 p.m.", "you are in a hurry", "no children are visible"], "Stay stopped until the bus moves or signals."],
];
const FLD: F[] = [
  ["Florida rules", "Florida's Class E knowledge exam has 50 questions. You need", "40 correct (80%)", ["30 correct", "25 correct", "45 correct"], "Questions cover road signs and road rules."],
  ["Florida rules", "Before getting a Florida learner license, new drivers must complete", "a Traffic Law and Substance Abuse Education (TLSAE) course", ["a CDL course", "a motorcycle course", "nothing"], "Teens can get a learner license from age 15."],
  ["Florida rules", "In Florida, drivers under 21 face penalties if their BAC is", "0.02% or higher", ["0.08% or higher only", "0.10% or higher", "0.15% or higher"], "Florida has a zero tolerance law for under-21 drivers."],
  ["Florida rules", "In Florida, you must turn on your headlights when", "it rains and your windshield wipers are on, and from sunset to sunrise", ["only after midnight", "only on highways", "never during the day"], "Also in smoke or fog."],
  ["Florida rules", "Florida's Move Over law requires you to move over a lane or", "slow to 20 mph below the posted speed limit", ["stop in your lane", "speed up", "flash your high beams"], "It covers emergency, sanitation, utility and service vehicles and disabled vehicles."],
  ["Florida rules", "In Florida, children aged 5 and under must ride in", "a federally approved child restraint", ["the front seat with a lap belt", "no restraint if in the back", "an adult's lap"], "Children aged 4 and 5 may use a booster seat."],
];
const NYD: F[] = [
  ["New York rules", "The New York permit test has 20 questions. To pass you need", "14 correct, including at least 2 of the 4 road sign questions", ["10 correct", "18 correct", "all 20 correct"], "It covers road signs, rules of the road and alcohol and drug laws."],
  ["New York rules", "In New York City, unless otherwise posted, the speed limit is", "25 mph", ["30 mph", "35 mph", "40 mph"], "Outside the city the statewide default is 55 mph."],
  ["New York rules", "In New York City, a right turn on a red light is", "not allowed unless a sign permits it", ["always allowed after stopping", "allowed only at night", "allowed for taxis only"], "Elsewhere in New York, a right on red is usually allowed after a full stop unless a sign prohibits it."],
  ["New York rules", "New York's Zero Tolerance Law applies to drivers under 21 with a BAC of", "0.02% to 0.07%", ["0.08% or more only", "0.10% or more", "0.15% or more"], "It leads to license suspension."],
  ["New York rules", "In New York, when a school bus stops with red lights flashing, you must stop", "whether you are approaching from the front or the rear, even on a divided highway", ["only if behind the bus", "only on two-lane roads", "only if children are visible"], "Stay at least 20 feet away."],
  ["New York rules", "In New York, you can apply for a learner permit at age", "16", ["14", "15", "18"], "You must pass a vision test and the written test."],
];
const GAD: F[] = [
  ["Georgia rules", "Georgia's knowledge exam has two parts of 20 questions each: road signs and road rules. To pass you need", "at least 15 correct in each part", ["15 correct overall", "20 correct in each part", "30 correct in one part"], "If you fail one part, you only retake that part."],
  ["Georgia rules", "In Georgia, you can apply for a Class CP instructional permit at age", "15", ["14", "16", "18"], "You must pass the knowledge exam and a vision test."],
  ["Georgia rules", "Under Georgia's Hands-Free law, drivers may not", "hold or support a phone with any part of their body while driving", ["use any GPS", "listen to music", "use voice-to-text"], "Hands-free use is allowed."],
  ["Georgia rules", "In Georgia, drivers under 21 can be charged with DUI with a BAC of", "0.02% or more", ["0.08% or more only", "0.10% or more", "0.15% or more"], "Georgia has a zero tolerance law for under-21 drivers."],
  ["Georgia rules", "In Georgia, on a divided highway with a median, traffic going in the opposite direction from a stopped school bus", "does not have to stop", ["must always stop", "must stop and wait 5 minutes", "must honk"], "Traffic behind the bus must always stop."],
  ["Georgia rules", "Georgia's Move Over law requires drivers approaching a stopped emergency, tow or utility vehicle with flashing lights to", "move over a lane if safe, or slow down below the limit and be ready to stop", ["speed up", "stop in the lane", "use high beams"], "It protects people working at the roadside."],
];

export function usdrive(): Record<string, Q[]> {
  return {
    USD: [...facts("USD", USD), ...usdCalc()],
    CAD: facts("CAD", CAD), TXD: facts("TXD", TXD), FLD: facts("FLD", FLD), NYD: facts("NYD", NYD), GAD: facts("GAD", GAD),
  };
}
