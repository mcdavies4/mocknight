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
  ["Signs", "A five-sided (pentagon) sign warns of", "a school zone or crossing", ["a no-passing zone ahead", "a hospital nearby", "a railroad crossing"], "Watch for children."],
  ["Signs", "A round yellow sign with an X and two R's warns of", "a railroad crossing ahead", ["a road closure ahead", "a rest area ahead", "a roundabout ahead"], "Slow down, look and listen."],
  ["Signs", "A pennant-shaped yellow sign on the left side of the road means", "no passing zone", ["merge ahead", "two-way traffic", "end of road"], "It marks the start of a no-passing zone."],
  ["Signs", "Orange signs are used in", "work zones", ["school zones", "hospital zones", "parks"], "Fines are often higher in work zones."],
  ["Signals", "A flashing red traffic light means", "stop, then go when it is safe", ["slow down and proceed", "the light is broken; ignore it", "yield only to pedestrians"], "Treat it like a stop sign."],
  ["Signals", "A flashing yellow light means", "proceed with caution", ["stop completely", "speed up to clear it", "turn right only"], "Watch for hazards."],
  ["Signals", "A steady yellow light means", "red is next; stop if safe", ["go only if turning", "the road is closed", "speed up to beat red"], "Don't enter the intersection if you can stop safely."],
  ["Pavement markings", "A solid yellow line on your side of the center line means", "you may not pass", ["you may pass if safe", "the lane is for buses", "parking is allowed"], "Broken yellow means passing is allowed when safe."],
  ["Pavement markings", "Two solid yellow lines in the center of the road mean", "no passing either way", ["a bike lane between", "passing allowed both ways", "a center turning lane"], "You may cross them only to turn left into a driveway where allowed."],
  ["Right-of-way", "At a four-way stop, if two vehicles arrive at the same time, the right-of-way goes to", "the vehicle on the right", ["the vehicle on the left", "the larger vehicle", "the vehicle going straight always"], "The first to stop goes first otherwise."],
  ["Right-of-way", "When turning left, you must yield to", "oncoming traffic and pedestrians", ["vehicles behind you", "nobody, if you've signalled", "cars parked at the curb"], "Wait in the intersection only if safe and legal."],
  ["Right-of-way", "When an emergency vehicle with lights and siren approaches, you should", "pull to the right and stop", ["speed up to clear the way", "keep driving normally", "stop in the middle of the road"], "Stay stopped until it passes."],
  ["Right-of-way", "Pedestrians who are blind may be identified by", "a white cane or guide dog", ["a bright yellow vest", "a small red flag", "a blue parking badge"], "Always yield to them."],
  ["School buses", "When a school bus has its red lights flashing and stop arm out on a two-lane road, you must", "stop, in either direction", ["honk and carry on", "pass it on the left", "slow down and pass"], "Stay stopped until the lights stop flashing."],
  ["Safe driving", "The legal blood alcohol concentration (BAC) limit for adult drivers (21+) in every US state except Utah is", "0.08%", ["0.10%", "0.05%", "0.02%"], "Utah uses 0.05%; drivers under 21 face much lower limits."],
  ["Safe driving", "Implied consent means that by driving you have agreed to", "alcohol and drug testing", ["pay all road tolls", "give up your license", "any search of your car"], "Refusing usually leads to license suspension."],
  ["Safe driving", "The only thing that sobers up a drinker is", "time", ["coffee", "a cold shower", "fresh air"], "The body removes alcohol at a fixed rate."],
  ["Safe driving", "A good minimum following distance in normal conditions is", "at least 3 seconds", ["1 second", "one car length at any speed", "10 feet"], "Increase it in bad weather or at night."],
  ["Safe driving", "If your vehicle starts to skid, you should", "ease off and steer where you want to go", ["accelerate to regain grip", "turn the wheel sharply the other way", "slam on the brakes at once"], "Avoid overcorrecting."],
  ["Safe driving", "Hydroplaning is most likely", "at speed on wet roads", ["only at night", "at low speed on dry roads", "only on ice"], "Slow down in rain and keep tires in good condition."],
  ["Safe driving", "When driving in fog, you should use", "low-beam headlights", ["high-beam headlights", "parking lights only", "no lights"], "High beams reflect off fog."],
  ["Safe driving", "You must dim your high beams when an oncoming vehicle is within", "500 feet", ["50 feet", "2,000 feet", "1 mile"], "Also dim them within 300 feet when following a vehicle."],
  ["Safe driving", "Blind spots are best checked by", "looking over your shoulder", ["honking your horn", "using only the rear-view mirror", "slowing right down"], "Mirrors don't show everything."],
  ["Parking", "When parking downhill next to a curb, turn your front wheels", "toward the curb", ["away from the curb", "straight ahead", "either way"], "Uphill with a curb: turn them away from the curb."],
  ["Parking", "You should not park within how many feet of a fire hydrant in most states?", "15 feet", ["5 feet", "50 feet", "100 feet"], "Check your state handbook for exact distances."],
  ["Sharing the road", "Large trucks have large blind spots called", "no-zones", ["safe zones", "cushions", "buffers"], "If you can't see the truck's mirrors, the driver can't see you."],
  ["Sharing the road", "When passing a bicyclist, you should", "give plenty of space", ["follow them closely", "speed past them", "honk and pass closely"], "Many states require at least 3 feet."],
  ["Sharing the road", "A 'Move Over' law requires drivers to", "move over or slow for stopped emergency vehicles", ["stop for every large truck parked on the road", "drive in the left lane at all times on highways", "switch on high beams near any police vehicle"], "All states have a version of this law."],
  ["Emergencies", "If your brakes fail, first try", "pumping the brake pedal", ["turning off the engine", "shifting to neutral at high speed", "jumping out"], "Then use the parking brake gently and shift to a lower gear."],
  ["Emergencies", "If a tire blows out, you should", "grip the wheel and slow gradually", ["accelerate to stay stable", "brake hard immediately", "steer sharply to the shoulder"], "Pull off the road when you have slowed."],
];
function usdCalc(): Q[] {
  return repeat(8, () => {
    const mph = pick([30, 45, 55, 65]), secs = 3, ft = Math.round(mph * 1.467 * secs);
    return mcq("USD", "Safe driving", `At ${mph} mph you travel about ${fmt(Math.round(mph * 1.467))} feet per second. How far do you travel during a 3-second following gap?`, `About ${ft} feet`, numOpts(ft, [mph * 3, Math.round(mph * 1.467), ft * 2], "feet").map((x) => `About ${x}`), `${fmt(Math.round(mph * 1.467))} ft/s × 3 s ≈ ${ft} feet.`, 2);
  });
}

const CAD: F[] = [
  ["California rules", "In California, the knowledge test pass mark is", "80% or more", ["50%", "60%", "100%"], "Adults typically answer 36 questions and need 30 correct."],
  ["California rules", "California's hands-free law means drivers 18 and over may", "not hold a phone, even at a red light", ["text when stopped at a red light", "use a handheld phone below 25 mph", "hold the phone for short calls"], "Mount the phone and use one touch or voice only."],
  ["California rules", "Drivers under 18 in California may use a cell phone while driving", "not at all, even hands-free", ["only for navigation apps", "only through hands-free", "only at red lights"], "Minors cannot use wireless devices while driving."],
  ["California rules", "Unless posted otherwise, the speed limit in a California alley is", "15 mph", ["5 mph", "25 mph", "35 mph"], "Residential and school zones are usually 25 mph."],
  ["California rules", "Unless posted otherwise, the speed limit in a business or residential district in California is", "25 mph", ["15 mph", "35 mph", "45 mph"], "The basic speed law still applies: never drive faster than is safe."],
  ["California rules", "Unless posted otherwise, the maximum speed on a two-lane undivided highway in California is", "55 mph", ["45 mph", "65 mph", "70 mph"], "Vehicles towing trailers are also limited to 55 mph."],
  ["California rules", "California's 'basic speed law' says you must", "never drive faster than is safe", ["drive 10 mph under the limit", "slow down only at night", "always drive at the posted limit"], "Even below the posted limit you can be cited."],
  ["California rules", "In California, you must signal at least how far before turning?", "100 feet", ["10 feet", "50 feet", "500 feet"], "Signal before changing lanes too."],
  ["California rules", "A red-painted curb in California means", "no stopping, standing or parking", ["loading only", "passenger loading only", "parking for people with disabilities"], "Yellow is loading, white is passenger loading, green is limited time and blue is disabled parking."],
  ["California rules", "A blue-painted curb in California is for", "disabled parking with a placard", ["short-term parking only", "commercial loading only", "taxis and rideshare only"], "Fines for misuse are high."],
  ["California rules", "In California, drivers under 21 must not drive with a BAC of", "0.01% or more", ["0.08% or more", "0.05% or more", "0.10% or more"], "California has a zero tolerance law for under-21 drivers."],
  ["California rules", "In California, children must ride in a car seat or booster seat until they are", "8 years old or 4'9\" tall", ["12 years old only", "2 years old only", "5 years old only"], "Children under 8 must ride in the back seat."],
];
const TXD: F[] = [
  ["Texas rules", "The Texas knowledge test passing score is", "70%", ["50%", "80%", "100%"], "Practice tests usually use 30 questions, needing 21 correct."],
  ["Texas rules", "In Texas, you can apply for a Class C learner license at age", "15", ["14", "16", "18"], "You must complete the classroom part of driver education and pass a vision test."],
  ["Texas rules", "In Texas, a driver under 21 commits an offense if they drive with", "any detectable amount of alcohol", ["a BAC of 0.08% or more", "a BAC of 0.05% or more", "only if they cause a crash"], "Texas has a zero tolerance policy for minors."],
  ["Texas rules", "Texas law requires headlights to be on", "from 30 min after sunset to 30 min before sunrise", ["only when you're driving on highways and toll roads", "only when it's raining heavily or snowing", "only after midnight on weekdays and weekends"], "Also when visibility is poor."],
  ["Texas rules", "Unless posted otherwise, the speed limit in a Texas urban district is", "30 mph", ["20 mph", "45 mph", "55 mph"], "Speed limits are posted on most roads."],
  ["Texas rules", "Texas's Move Over/Slow Down law requires you to vacate the lane closest to a stopped emergency vehicle or", "slow to 20 mph below the limit", ["speed up to pass it quickly", "stop completely in your lane", "turn on your hazard lights only"], "It also covers tow trucks and TxDOT vehicles with lights on."],
  ["Texas rules", "On a Texas road where a school bus is stopped with red lights flashing, traffic in both directions must stop unless", "a median or barrier divides the road", ["no children are visible nearby", "you are running late for work", "it is after 5 p.m. on a weekday"], "Stay stopped until the bus moves or signals."],
];
const FLD: F[] = [
  ["Florida rules", "Florida's Class E knowledge exam has 50 questions. You need", "40 correct (80%)", ["30 correct", "25 correct", "45 correct"], "Questions cover road signs and road rules."],
  ["Florida rules", "Before getting a Florida learner license, new drivers must complete", "a TLSAE drug and alcohol course", ["a commercial (CDL) course", "nothing beyond the test", "a motorcycle safety course"], "Teens can get a learner license from age 15."],
  ["Florida rules", "In Florida, drivers under 21 face penalties if their BAC is", "0.02% or higher", ["0.08% or higher only", "0.10% or higher", "0.15% or higher"], "Florida has a zero tolerance law for under-21 drivers."],
  ["Florida rules", "In Florida, you must turn on your headlights when", "it rains, and from sunset to sunrise", ["never during the daytime hours", "only after midnight on weekends", "only on highways and toll roads"], "Also in smoke or fog."],
  ["Florida rules", "Florida's Move Over law requires you to move over a lane or", "slow to 20 mph below the limit", ["flash your high beams twice", "speed up to pass quickly", "stop in your lane"], "It covers emergency, sanitation, utility and service vehicles and disabled vehicles."],
  ["Florida rules", "In Florida, children aged 5 and under must ride in", "an approved child restraint", ["the front seat with a lap belt", "an adult's lap", "nothing, if in the back seat"], "Children aged 4 and 5 may use a booster seat."],
];
const NYD: F[] = [
  ["New York rules", "The New York permit test has 20 questions. To pass you need", "14 correct, including 2 of 4 signs", ["10 correct, in any section", "all 20 correct, no errors", "18 correct, including all signs"], "It covers road signs, rules of the road and alcohol and drug laws."],
  ["New York rules", "In New York City, unless otherwise posted, the speed limit is", "25 mph", ["30 mph", "35 mph", "40 mph"], "Outside the city the statewide default is 55 mph."],
  ["New York rules", "In New York City, a right turn on a red light is", "not allowed unless signed", ["always allowed after stopping", "allowed for taxis only", "allowed only at night"], "Elsewhere in New York, a right on red is usually allowed after a full stop unless a sign prohibits it."],
  ["New York rules", "New York's Zero Tolerance Law applies to drivers under 21 with a BAC of", "0.02% to 0.07%", ["0.08% or more only", "0.10% or more", "0.15% or more"], "It leads to license suspension."],
  ["New York rules", "In New York, when a school bus stops with red lights flashing, you must stop", "from either direction, even on divided roads", ["only if you're behind the bus, never in front", "only on two-lane roads without a median", "only if you can see children getting off"], "Stay at least 20 feet away."],
  ["New York rules", "In New York, you can apply for a learner permit at age", "16", ["14", "15", "18"], "You must pass a vision test and the written test."],
];
const GAD: F[] = [
  ["Georgia rules", "Georgia's knowledge exam has two parts of 20 questions each: road signs and road rules. To pass you need", "15 correct in each part", ["15 correct overall", "20 correct in each part", "30 correct in one part"], "If you fail one part, you only retake that part."],
  ["Georgia rules", "In Georgia, you can apply for a Class CP instructional permit at age", "15", ["14", "16", "18"], "You must pass the knowledge exam and a vision test."],
  ["Georgia rules", "Under Georgia's Hands-Free law, drivers may not", "hold or support a phone", ["use any GPS device", "listen to music", "use voice-to-text"], "Hands-free use is allowed."],
  ["Georgia rules", "In Georgia, drivers under 21 can be charged with DUI with a BAC of", "0.02% or more", ["0.08% or more only", "0.10% or more", "0.15% or more"], "Georgia has a zero tolerance law for under-21 drivers."],
  ["Georgia rules", "In Georgia, on a divided highway with a median, traffic going in the opposite direction from a stopped school bus", "does not have to stop", ["must always stop", "must stop and wait 5 minutes", "must honk"], "Traffic behind the bus must always stop."],
  ["Georgia rules", "Georgia's Move Over law requires drivers approaching a stopped emergency, tow or utility vehicle with flashing lights to", "move over, or slow below the limit", ["stop completely in their lane", "switch on their high beams", "speed up to pass it quickly"], "It protects people working at the roadside."],
];

export function usdrive(): Record<string, Q[]> {
  return {
    USD: [...facts("USD", USD), ...usdCalc()],
    CAD: facts("CAD", CAD), TXD: facts("TXD", TXD), FLD: facts("FLD", FLD), NYD: facts("NYD", NYD), GAD: facts("GAD", GAD),
  };
}
