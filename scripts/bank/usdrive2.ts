// Second growth batch for US driving: more general rules (USD) and state handbook rules
// for California, Texas, Florida, New York and Georgia. Stable handbook rules only.
import { mcq, Q } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

const USD: F[] = [
  ["Signs", "A white rectangular sign with black lettering is usually a", "regulatory sign", ["recreation sign", "guide sign", "warning sign"], "Regulatory signs tell you what you must or must not do."],
  ["Signs", "Green signs show", "directions and distances", ["school crossings", "work zones ahead", "warnings of hazards"], "Blue signs show motorist services; brown signs show recreation and cultural sites."],
  ["Signs", "A blue sign usually shows", "motorist services", ["a speed limit", "a hazard ahead", "a school zone"], "Brown signs point to parks and recreation."],
  ["Signs", "A red circle with a diagonal slash on a sign means", "the action is not allowed", ["a detour is ahead", "the action is required", "the road ends ahead"], "For example, a slashed U-turn arrow means no U-turns."],
  ["Signs", "A white X-shaped crossbuck sign marks", "a railroad crossing", ["a four-way stop", "a pedestrian crossing", "a hospital entrance"], "Treat it like a yield sign."],
  ["Pavement markings", "A center lane marked with a solid and a broken yellow line on each side is", "a center turn lane", ["a bike-only lane", "a passing lane", "a bus-only lane"], "Use it only to begin or finish a left turn."],
  ["Pavement markings", "White lane lines separate", "lanes going the same way", ["bike lanes only", "traffic going opposite ways", "parking spaces only"], "Yellow lines separate traffic going in opposite directions."],
  ["Signals", "A green arrow signal means", "turn that way; oncoming traffic is stopped", ["you must yield to oncoming traffic", "the lane is closed to traffic", "stop and wait for a green light"], "It is a protected turn."],
  ["Signals", "A red X over a lane means", "do not drive in that lane", ["the lane is for turning", "the lane is about to open", "speed up"], "A yellow X means the lane is about to close; leave it safely."],
  ["Signals", "If a traffic light is completely out, you should", "treat it as an all-way stop", ["drive through without stopping", "yield only to large trucks", "turn around and go back"], "Proceed when it is safe and your turn."],
  ["Right-of-way", "When entering a roundabout, you should", "yield to traffic already in it", ["expect traffic inside to yield", "drive around it clockwise", "stop inside the circle"], "In the US, traffic in a roundabout moves counterclockwise."],
  ["Right-of-way", "At an uncontrolled intersection, you should yield to", "vehicles already in it", ["vehicles behind you", "nobody at all", "only large trucks"], "If you arrive at the same time, yield to the vehicle on your right."],
  ["Right-of-way", "In a work zone, a flagger's instructions", "must be obeyed, even over signals", ["apply only to trucks", "are only advice", "can be ignored if no one's working"], "Slow down and expect sudden stops."],
  ["Signals", "The hand signal for a left turn is", "left arm straight out", ["right arm out of the window", "left arm pointing down", "left arm bent upward"], "Arm bent up means right turn; arm down means slow or stop."],
  ["Freeways", "When entering a freeway, you should", "speed up on the ramp to match traffic", ["drive on the shoulder until there's a gap", "stop at the end of the ramp", "enter slowly to be safe"], "Merge into a safe gap."],
  ["Freeways", "If you miss your freeway exit, you should", "go on to the next exit", ["back up on the shoulder", "make a U-turn across the median", "stop and wait"], "Never reverse on a freeway."],
  ["Railroads", "If your vehicle stalls on railroad tracks with a train coming, you should", "get out and move away toward the train", ["keep trying to restart the engine", "run along the tracks away from the train", "stay in the car with your seat belt on"], "Moving toward the train at an angle avoids flying debris."],
  ["Railroads", "You should never", "stop on railroad tracks", ["slow down at a crossing", "look both ways at a crossing", "cross after a train has passed and the way is clear"], "Make sure there is room to clear the tracks before you cross."],
  ["Safe driving", "If your vehicle has anti-lock brakes (ABS), in an emergency stop you should", "press firmly and hold", ["pump the brake rapidly", "use the parking brake", "release the brake and steer"], "You may feel pulsing; keep pressing."],
  ["Safe driving", "If another driver is tailgating you, you should", "leave more space ahead and let them pass", ["speed up to get well away from them", "stop suddenly in the road to teach them", "tap your brakes hard to warn them off"], "Change lanes if you safely can."],
  ["Safe driving", "'Overdriving your headlights' means", "driving too fast to stop within your lights", ["driving at night with no headlights on at all", "keeping your headlights on during the day", "using your high beams in thick fog"], "Slow down at night."],
  ["Safe driving", "You should avoid driving through moving water because", "6 inches can sweep a car away", ["it improves your braking", "it is always illegal", "it cleans the tires"], "About a foot of moving water can float many vehicles."],
  ["Safe driving", "When dealing with an aggressive driver, you should", "avoid eye contact and let them go", ["follow them to get their plate", "gesture back at them", "challenge them at the next stop"], "Report dangerous driving when safe to do so."],
  ["Safe driving", "If you feel drowsy while driving, the best thing to do is", "pull over somewhere safe and rest", ["open the window and keep going", "turn up the radio", "drive faster to get home sooner"], "Fatigue slows reactions like alcohol does."],
  ["Safe driving", "Some over-the-counter medicines, such as cold remedies,", "can make you drowsy", ["improve reaction time", "never affect driving", "cancel out alcohol"], "Read the label for warnings."],
  ["Passing", "After passing a vehicle, you should return to your lane when", "you can see it in your mirror", ["your front bumper passes theirs", "you've gone one more mile", "immediately after passing"], "Signal before returning."],
  ["Sharing the road", "Motorcycles are entitled to", "a full lane", ["half a lane", "no lane", "the shoulder"], "Never share a lane with a motorcycle."],
  ["Sharing the road", "Shared-lane markings (a bicycle with two chevrons) show that", "bikes and cars share the lane", ["bicycles are banned here", "the lane is a turning lane", "the lane is for buses only"], "Give bicyclists room."],
  ["Parking", "When parking uphill on a road with no curb, turn your front wheels", "toward the edge of the road", ["toward the center of the road", "straight ahead", "either way"], "If the car rolls, it rolls away from traffic."],
  ["Emergencies", "If your car breaks down on the highway, you should", "pull off and turn on hazard lights", ["walk across the freeway for help", "stop in the lane and wait inside", "leave all the lights switched off"], "Stay out of traffic lanes."],
];

const CAD: F[] = [
  ["California rules", "In California, you must tell the DMV about a change of address within", "10 days", ["30 days", "60 days", "1 year"], "You can do it online."],
  ["California rules", "California teens under 18 must hold a learner permit for at least", "6 months", ["2 years", "no minimum time", "1 month"], "They also need 50 hours of practice, 10 of them at night."],
  ["California rules", "In California, a white curb means", "passenger or mail stops only", ["no stopping at any time", "disabled parking only", "commercial loading only"], "Green means limited-time parking; yellow means loading."],
  ["California rules", "In California, a green curb means", "parking for a limited time", ["no stopping", "disabled parking only", "passenger loading only"], "The time limit is posted or painted on the curb."],
  ["California rules", "Unless posted otherwise, the speed limit within 100 feet of a railroad crossing where you can't see 400 feet in both directions is", "15 mph", ["5 mph", "25 mph", "35 mph"], "The same 15 mph applies at blind intersections."],
  ["California rules", "Near a California school with children present, the speed limit is usually", "25 mph", ["15 mph everywhere", "35 mph", "45 mph"], "Some local zones may be as low as 15 or 20 mph when posted."],
  ["California rules", "In California, the speed limit when towing a vehicle or trailer is", "55 mph", ["45 mph", "65 mph", "70 mph"], "Towing vehicles also use the right-hand lane or a posted truck lane."],
  ["California rules", "Unless posted otherwise, the maximum speed on most California highways is", "65 mph", ["55 mph", "75 mph", "80 mph"], "Some highways are posted at 70 mph."],
  ["California rules", "In California, you may not drive in a center left-turn lane for more than", "200 feet", ["50 feet", "500 feet", "1 mile"], "Use it only to start or finish a left turn."],
  ["California rules", "In California, before turning right you may enter a bike lane no more than", "200 feet before the turn", ["10 feet before the turn", "500 feet before the turn", "never"], "Yield to bicyclists first."],
  ["California rules", "California law requires you to pass a bicyclist with at least", "3 feet of space", ["1 foot", "6 inches", "10 feet"], "If you can't, slow down and wait."],
  ["California rules", "In California, a left turn on red is allowed only", "from one one-way street onto another", ["at night when roads are clear", "at any intersection after stopping", "never, under any circumstances"], "Yield to pedestrians and traffic."],
  ["California rules", "At a California railroad crossing with a train coming, you must stop", "15 to 50 feet from the rail", ["right on the tracks", "at least 100 feet away", "within 5 feet of the rail"], "Wait until the crossing is clear."],
  ["California rules", "In California, a child 6 or younger may not be left alone in a vehicle", "if unsafe, unless someone 12+ is there", ["at any time, even with an adult", "only after dark on weeknights", "only during the hot summer months"], "Heat can kill quickly."],
  ["California rules", "California drivers may not wear", "earplugs in both ears", ["dark tinted sunglasses", "a lap and shoulder belt", "prescription hearing aids"], "Hearing aids are allowed."],
  ["California rules", "In California, children under 2 must ride", "rear-facing (unless 40 lb/40 in)", ["in a forward-facing booster seat", "in the front passenger seat", "in an adult seat belt only"], "They must ride in the back seat if possible."],
  ["California rules", "In California, an open container of alcohol must be kept", "in the trunk", ["under the driver's seat", "in the glove box", "in the cup holder"], "This applies to any container that has been opened, even if it has been closed again."],
  ["California rules", "In California, motorcyclists riding between lanes (lane splitting) is", "legal; don't block them", ["allowed only for police", "allowed only on city streets", "illegal everywhere"], "Check your mirrors before changing lanes."],
];

const TXD: F[] = [
  ["Texas rules", "In Texas, the person supervising a learner license holder must be", "a licensed driver aged 21+ in front", ["any passenger in the vehicle", "a licensed driver aged 16+", "aged 18+ in the back seat"], "They must have at least one year of driving experience."],
  ["Texas rules", "Before a Texas road test, new drivers must complete", "the Impact Texas Drivers program", ["a commercial (CDL) course", "a basic first aid course", "a motorcycle safety course"], "Teens complete Impact Texas Teen Drivers (ITTD)."],
  ["Texas rules", "A Texas provisional license holder under 18 may not drive between", "midnight and 5 a.m.", ["noon and 3 p.m.", "8 p.m. and 6 a.m.", "6 p.m. and midnight"], "This applies during the first year."],
  ["Texas rules", "A Texas provisional license holder under 18 may carry", "one non-family passenger under 21", ["no passengers at all, ever", "any number of passengers", "up to five friends at a time"], "This applies during the first year."],
  ["Texas rules", "Texas requires seat belts for", "every person in the vehicle", ["only children under 8", "only front-seat passengers", "only the person driving"], "Drivers can be fined for unbelted children."],
  ["Texas rules", "Texas minimum liability insurance is", "30/60/25", ["5/10/5", "10/20/10", "no insurance needed"], "It's known as 30/60/25."],
  ["Texas rules", "Unless posted otherwise, the speed limit on a numbered Texas highway outside an urban district is", "70 mph", ["55 mph", "60 mph", "80 mph"], "Some highways are posted higher."],
  ["Texas rules", "Unless posted otherwise, the speed limit in a Texas alley is", "15 mph", ["5 mph", "25 mph", "30 mph"], "Urban districts default to 30 mph."],
  ["Texas rules", "In Texas, using a handheld phone in an active school zone is", "illegal", ["allowed for adults", "allowed when stopped in traffic", "allowed with one hand"], "Hands-free use is allowed for drivers 18 and over."],
  ["Texas rules", "Texas's 'Steer It, Clear It' law says that after a minor crash with no injuries you should", "move cars out of the main lanes", ["leave the cars exactly where they are", "drive home and report it later", "wait in the lane for the police"], "This prevents secondary crashes."],
  ["Texas rules", "In Texas, you must signal at least how far before turning?", "100 feet", ["10 feet", "50 feet", "500 feet"], "Signal before changing lanes too."],
  ["Texas rules", "In Texas, you may not park within how many feet of a railroad crossing?", "50 feet", ["5 feet", "15 feet", "100 feet"], "You also may not park within 15 feet of a fire hydrant."],
  ["Texas rules", "In Texas, you may not park within how many feet of a stop sign or traffic signal?", "30 feet", ["5 feet", "10 feet", "100 feet"], "And not within 20 feet of a crosswalk at an intersection."],
  ["Texas rules", "In Texas, motorcycle riders under 21 must", "wear a helmet", ["ride only at night", "carry a passenger", "have a CDL"], "Riders 21 and over may ride without one if they meet training or insurance conditions."],
  ["Texas rules", "In Texas, a right turn on a red light is allowed", "after a full stop, unless signed", ["without stopping first, if clear", "never, at any traffic light", "only late at night with no traffic"], "Yield to pedestrians and cross traffic."],
];

const FLD: F[] = [
  ["Florida rules", "The minimum age for a Florida learner license is", "15", ["14", "16", "18"], "You must pass the vision and hearing tests and the knowledge exam."],
  ["Florida rules", "A Florida driver under 18 must hold a learner license for at least", "12 months", ["3 months", "1 month", "no minimum"], "They need 50 hours of practice, 10 of them at night."],
  ["Florida rules", "A 16-year-old with a Florida intermediate license may drive between 11 p.m. and 6 a.m. only", "with a driver 21+, or for work", ["with any passenger in the car", "on Saturdays and Sundays", "never, for any reason"], "At 17 the restricted hours are 1 a.m. to 5 a.m."],
  ["Florida rules", "Unless posted otherwise, the speed limit on Florida municipal, business and residential streets is", "30 mph", ["20 mph", "45 mph", "55 mph"], "Rural interstates can be posted up to 70 mph."],
  ["Florida rules", "Florida's minimum required personal injury protection (PIP) is", "$10,000", ["$1,000", "$50,000", "$100,000"], "Property damage liability of $10,000 is also required."],
  ["Florida rules", "In Florida, a crash must be reported to police if anyone is hurt or killed, or property damage is at least", "$500", ["$50", "$2,500", "$10,000"], "Exchange information with the other driver."],
  ["Florida rules", "In Florida, children aged 4 and 5 must ride in", "a child seat or booster", ["nothing special", "the front seat, unbelted", "an adult lap belt only"], "Children 3 and under need a separate carrier or integrated seat."],
  ["Florida rules", "On a Florida divided highway with a raised barrier or an unpaved median at least 5 feet wide, traffic going the opposite way from a stopped school bus", "does not have to stop", ["must stop", "must reverse", "must pass at speed"], "Traffic behind the bus must still stop."],
  ["Florida rules", "Florida law requires you to pass a bicyclist with at least", "3 feet of space", ["1 foot", "6 inches", "10 feet"], "Slow down when passing."],
  ["Florida rules", "In Florida, refusing a breath test for the first time leads to", "a 1-year suspension", ["a warning only", "a 1-week suspension", "no penalty at all"], "A second refusal is a misdemeanor and an 18-month suspension."],
  ["Florida rules", "Florida suspends a license for 30 days if a driver gets", "12 points in 12 months", ["50 points in a year", "3 points in 3 years", "1 point in a year"], "More points over longer periods bring longer suspensions."],
  ["Florida rules", "In Florida, you may not park within how many feet of a fire hydrant?", "15 feet", ["5 feet", "50 feet", "100 feet"], "Also not within 50 feet of a railroad crossing."],
  ["Florida rules", "In Florida, a funeral procession led by an escort vehicle", "has the right-of-way", ["must yield to all traffic", "can be passed on the right", "must stop at every light"], "Pull over or wait until it passes."],
  ["Florida rules", "After becoming a Florida resident, you must get a Florida driver license within", "30 days", ["7 days", "6 months", "1 year"], "This applies if you hold a valid license from another state."],
];

const NYD: F[] = [
  ["New York rules", "A New York junior license holder (under 18)", "may not drive in NYC's five boroughs", ["may drive anywhere at any time", "may drive only in New York City", "may drive only on highways"], "There are also limits on Long Island and elsewhere."],
  ["New York rules", "Unless posted otherwise, the statewide speed limit in New York is", "55 mph", ["45 mph", "65 mph", "70 mph"], "New York City defaults to 25 mph."],
  ["New York rules", "In New York, when stopping for a school bus with red lights flashing, stay at least", "20 feet away", ["5 feet away", "100 feet away", "1 foot away"], "Don't move until the lights stop flashing."],
  ["New York rules", "In New York, your license may be suspended if you get", "11+ points in 18 months", ["2 points in a year", "5 points in 5 years", "50 points in a year"], "Points are charged for moving violations."],
  ["New York rules", "In New York, you must file a report (MV-104) within 10 days if a crash caused injury, death, or property damage over", "$1,000", ["$100", "$5,000", "$10,000"], "Report to police right away if anyone is hurt."],
  ["New York rules", "New York requires everyone aged 16 or older to wear a seat belt", "in every seat", ["in the front only", "on highways only", "at night only"], "Younger passengers need child restraints or belts too."],
  ["New York rules", "In New York, children must ride in an appropriate child restraint system until their", "8th birthday", ["2nd birthday", "4th birthday", "12th birthday"], "Children under 4 need a child safety seat."],
  ["New York rules", "In New York, Driving While Ability Impaired (DWAI) by alcohol applies at a BAC of", "0.05–0.07%", ["0.20% only", "exactly 0.08%", "under 0.01%"], "0.08% or more is DWI."],
  ["New York rules", "In New York, Aggravated DWI applies at a BAC of", "0.18% or more", ["0.08% or more", "0.02% or more", "0.50% or more"], "Penalties are tougher than for DWI."],
  ["New York rules", "In New York, you may not park within how many feet of a fire hydrant?", "15 feet", ["5 feet", "50 feet", "100 feet"], "Also not within 20 feet of a crosswalk at an intersection."],
  ["New York rules", "In New York, you may not park within how many feet of a railroad crossing?", "50 feet", ["5 feet", "15 feet", "100 feet"], "And not within 30 feet of a stop sign or traffic signal."],
  ["New York rules", "Outside New York City, a right turn on red is", "allowed after a full stop", ["allowed only for trucks", "never allowed", "allowed without stopping"], "In New York City it's not allowed unless a sign permits it."],
  ["New York rules", "In New York, using a handheld phone or texting while driving", "is illegal and adds points", ["carries no penalty", "is allowed for adults", "is fine at red lights"], "Hands-free use is allowed for adults."],
  ["New York rules", "New York's Move Over law applies to vehicles stopped on the roadside with", "red, white, blue or amber lights", ["only their headlights on", "only police lights flashing", "no lights on at all"], "This includes tow trucks and hazard vehicles."],
];

const GAD: F[] = [
  ["Georgia rules", "To get a Georgia Class D license, you must be at least 16 and have held a learner permit for", "12 months and 1 day", ["1 month and 1 day", "3 months and 1 day", "2 years and 1 day"], "You also need no major traffic violations."],
  ["Georgia rules", "During the first 6 months with a Georgia Class D license, you may carry", "only immediate family", ["no passengers at all", "up to three friends", "any passengers"], "In the next 6 months, one non-family passenger under 21 is allowed."],
  ["Georgia rules", "A Georgia driver can get a full Class C license at age", "18", ["16", "17", "21"], "They must have no major violations in the previous 12 months."],
  ["Georgia rules", "Georgia's Super Speeder fee is", "$200 plus the fine", ["$20 plus the fine", "nothing extra", "$1,000 plus the fine"], "It applies at 85 mph or more, or 75 mph or more on a two-lane road."],
  ["Georgia rules", "Georgia teens under 18 must complete", "the ADAP alcohol and drug course", ["a motorcycle safety course", "a commercial (CDL) course", "a basic first aid course"], "It's required for a license."],
  ["Georgia rules", "In Georgia, drivers with an instruction permit or Class D license", "may not use a phone at all", ["may text at red lights", "may hold a phone below 25 mph", "may use a phone hands-free"], "Adult drivers may use hands-free devices."],
  ["Georgia rules", "In Georgia, children under 8 must ride", "in a back-seat child seat", ["with no restraint at all", "in an adult lap belt only", "in the front passenger seat"], "Follow the seat's height and weight limits."],
  ["Georgia rules", "Unless posted otherwise, the speed limit in a Georgia urban or residential district is", "30 mph", ["20 mph", "45 mph", "55 mph"], "Unpaved roads default to 35 mph."],
  ["Georgia rules", "Georgia's 'slowpoke' law requires you to", "move out of the left lane for faster traffic", ["drive only in the left lane on highways", "use hazard lights when in the left lane", "drive below the limit in the left lane"], "The left lane is for passing."],
  ["Georgia rules", "In Georgia, a driver under 21 has their license suspended for", "4+ points in 12 months", ["1 point in 5 years", "any points at all", "30 points in 2 years"], "Adults face suspension at 15 points in 24 months."],
  ["Georgia rules", "In Georgia, a crash must be reported to police if anyone is hurt or killed, or property damage is", "$500 or more", ["$50 or more", "$5,000 or more", "$50,000 or more"], "Remain at the scene and exchange information."],
  ["Georgia rules", "In Georgia, you may not park within how many feet of a fire hydrant?", "15 feet", ["5 feet", "50 feet", "100 feet"], "Also not within 20 feet of a crosswalk."],
  ["Georgia rules", "In Georgia, you may not park within how many feet of a railroad crossing?", "50 feet", ["5 feet", "15 feet", "100 feet"], "And not within 30 feet of a stop sign or traffic signal."],
  ["Georgia rules", "The legal BAC limit for commercial drivers in Georgia is", "0.04%", ["0.08%", "0.10%", "0.15%"], "Adults in private cars: 0.08%; under 21: 0.02%."],
];

export function usdrive2(): Record<string, Q[]> {
  return { USD: facts("USD", USD), CAD: facts("CAD", CAD), TXD: facts("TXD", TXD), FLD: facts("FLD", FLD), NYD: facts("NYD", NYD), GAD: facts("GAD", GAD) };
}
