// UK driving theory — second batch of original Highway Code questions.
import { mcq, Q } from "./lib";

type F = [string, string, string, string[], string];
const T = (list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq("DRV", t, b, c, x, e, d));

const Q2: F[] = [
  // Junctions & lanes
  ["Rules of the road", "When turning right at a crossroads where an oncoming vehicle is also turning right, the Highway Code's usual method is to", "pass offside to offside (keep the other vehicle on your right)", ["pass nearside to nearside without looking", "wait until the junction is completely empty every time", "turn in front of it as fast as possible"], "Road layout or markings may make nearside to nearside necessary; check for oncoming traffic."],
  ["Rules of the road", "On a two-lane dual carriageway, you should normally drive in", "the left-hand lane, using the right-hand lane for overtaking or turning right", ["the right-hand lane", "whichever lane is emptiest", "the middle of both lanes"], "Return to the left lane when it is safe."],
  ["Rules of the road", "At an unmarked crossroads, who has priority?", "No one", ["Traffic from the right", "The larger vehicle", "Traffic going straight on"], "Treat it with great care and be ready to give way."],
  ["Rules of the road", "At a 'stop' sign with a solid white line, you must", "stop at the line even if the road looks clear", ["slow down and go if clear", "give way only to lorries", "sound your horn and proceed"], "Then go when it is safe."],
  ["Rules of the road", "You are waiting to turn right from a main road into a side road. Where should you position your car?", "Just left of the centre of the road", ["Close to the left kerb", "In the oncoming lane", "On the pavement"], "This lets traffic pass on your left."],
  ["Rules of the road", "On a mini-roundabout, you should", "give way to traffic from the right and avoid driving over the central marking if possible", ["drive straight over the middle", "always stop", "give priority to traffic from the left"], "Large vehicles may have to drive over it."],
  ["Rules of the road", "Where is the safest place to overtake a cyclist?", "On a straight, clear road where you can leave at least 1.5 m", ["On a bend", "Near a junction", "On a narrow bridge"], "Wait behind if you can't pass safely."],
  ["Rules of the road", "A one-way street has two lanes. To turn right at the end, you should normally use", "the right-hand lane", ["the left-hand lane", "either lane", "the bus lane"], "Choose your lane early."],
  ["Rules of the road", "When may you overtake on the left?", "When the vehicle ahead is signalling to turn right and there is room", ["Whenever traffic is slow", "On a motorway whenever you want", "Never"], "Also in slow-moving queues where the left lane moves faster."],
  ["Rules of the road", "When should you use the right-hand lane of a three-lane motorway?", "Only for overtaking", ["For cruising at 70 mph", "When towing", "For leaving at the next exit"], "Return to the left when you have passed."],
  // Lights and signals
  ["Rules of the road", "You should use dipped headlights during the day when", "visibility is seriously reduced", ["it is sunny", "you are parked", "you are in a 20 mph zone"], "Make sure others can see you."],
  ["Rules of the road", "A police officer in a car behind you flashes headlights and points to the left. You should", "pull up on the left when it is safe", ["turn left at the next junction", "speed up", "ignore it"], "Stop safely as soon as you can."],
  ["Rules of the road", "An arm signal moved up and down from the driver's window means", "I intend to slow down or stop", ["I intend to turn right", "I intend to turn left", "you can overtake"], "Arm signals can back up indicators."],
  ["Rules of the road", "You should signal", "to let other road users know your intentions, in good time", ["only when another car is very close", "after you have turned", "never on roundabouts"], "Cancel the signal afterwards."],
  ["Rules of the road", "Emergency vehicles approach with blue lights. You should", "help them pass, without breaking the law or putting others at risk", ["mount the pavement immediately", "go through a red light", "brake sharply in the middle of a junction"], "Stay calm and look for a safe place to pull over."],
  // Parking
  ["Rules of the road", "Where must you NOT park?", "On the zigzag lines of a pedestrian crossing", ["In a marked parking bay", "In a lay-by", "In a car park"], "Other places include near the brow of a hill and opposite a junction."],
  ["Rules of the road", "When parking on a hill facing downhill with a kerb, you should", "turn the wheels towards the kerb and apply the parking brake", ["turn the wheels away from the kerb", "leave the car in neutral", "leave the engine running"], "If the brake fails, the kerb stops the car."],
  ["Rules of the road", "Before you get out of a parked car, you should", "check for cyclists and other traffic before opening the door", ["open the door quickly", "sound the horn", "use your mirrors only"], "The 'Dutch reach' helps."],
  ["Rules of the road", "At night, you must not park on a road facing", "against the direction of traffic", ["the same direction as traffic", "a lamp post", "a bus stop sign"], "Your rear reflectors must face oncoming traffic."],
  // Signs & markings
  ["Road and traffic signs", "A white line across the road at a junction with 'Give Way' markings (broken double white lines) means", "give way to traffic on the major road", ["stop always", "you have priority", "no entry"], "An inverted triangle may also be painted on the road."],
  ["Road and traffic signs", "A long white line with short gaps in the centre of the road is a", "hazard warning line", ["lane line", "no-overtaking line", "parking marking"], "Do not cross it unless you can see the road is clear well ahead."],
  ["Road and traffic signs", "A sign showing a red circle with a white horizontal bar means", "no entry for vehicular traffic", ["one-way street", "bus lane", "no parking"], "Do not enter from this direction."],
  ["Road and traffic signs", "A blue circle with a white arrow pointing left means", "turn left (ahead)", ["no left turn", "one-way traffic", "keep right"], "Blue circles give mandatory instructions."],
  ["Road and traffic signs", "A rectangular blue sign with a white arrow pointing up shows", "a one-way street", ["ahead only (mandatory)", "a motorway", "no entry"], "Blue rectangles give information."],
  ["Road and traffic signs", "Red and white chevron signs on a bend show", "a sharp deviation of the route", ["a speed camera", "a level crossing", "the end of a motorway"], "Slow down before the bend."],
  ["Road and traffic signs", "A sign with a red border triangle showing a children symbol warns of", "a school or area where children may be crossing", ["a playground for adults", "a hospital", "a zebra crossing only"], "Slow down and be ready to stop."],
  ["Road and traffic signs", "A triangular warning sign showing a gate before a railway symbol means", "a level crossing with a barrier or gate ahead", ["a level crossing without a barrier", "a tram stop", "a toll road"], "A steam-train symbol shows a crossing without a barrier."],
  ["Road and traffic signs", "Yellow lines painted across the road (rumble or 'yellow bar' markings) on the approach to a roundabout are there to", "make you aware of your speed", ["mark parking spaces", "show a bus lane", "mark a box junction"], "They encourage you to slow down."],
  ["Road and traffic signs", "Traffic lights showing red and amber together mean", "stop — do not go until green shows", ["go if the junction is clear", "give way to the right", "the lights are faulty"], "Green comes next."],
  ["Road and traffic signs", "Flashing red lights at a fire station, level crossing or swing bridge mean", "you must stop", ["slow down", "proceed with caution", "give way to the left"], "Wait until they stop flashing."],
  // Motorways
  ["Motorway rules", "Which of these must NOT use a motorway?", "Learner motorcyclists", ["Coaches", "Cars towing caravans", "Vans"], "Also pedestrians, cyclists, horse riders and slow vehicles."],
  ["Motorway rules", "Flashing amber lights on a motorway gantry warn of", "a hazard ahead — the speed limit shown may be lower", ["a service area", "a speed camera only", "the end of the motorway"], "Adjust your speed and look out for the hazard."],
  ["Motorway rules", "On a smart motorway, emergency areas are marked with", "orange signs and an orange surface", ["green signs", "a red X", "brown tourist signs"], "They have an SOS phone."],
  ["Motorway rules", "If you break down on a motorway hard shoulder, you should", "get out on the passenger side and wait behind the barrier if safe", ["stay in the driver's seat", "try to repair it in the lane", "walk along the carriageway"], "Leave animals in the car unless in an emergency."],
  ["Motorway rules", "Driving in heavy motorway traffic, you notice a ramp meter (traffic lights) on the slip road. They are there to", "control the flow of traffic joining the motorway", ["stop traffic for pedestrians", "mark a toll booth", "show a closed exit"], "Wait for green."],
  ["Motorway rules", "Why should you leave a large gap from the vehicle in front on a motorway?", "To have enough time to react and stop safely at high speed", ["To let others cut in", "To save fuel only", "Because the law requires 100 m"], "Use the two-second rule."],
  // Weather & night
  ["Vehicle handling", "When driving at night, you should", "use dipped headlights if dazzling other road users with full beam", ["always use full beam", "use only sidelights", "drive with lights off in towns"], "Dip your lights for oncoming and preceding traffic."],
  ["Vehicle handling", "If you are dazzled by oncoming headlights at night, you should", "slow down or stop", ["flash your lights back", "close your eyes briefly", "speed up"], "Never retaliate with full beam."],
  ["Vehicle handling", "On a wet road where aquaplaning is a risk, the safest thing to do beforehand is", "reduce speed", ["increase speed to get through water", "brake hard in the water", "steer sharply"], "Slower speeds reduce aquaplaning risk."],
  ["Vehicle handling", "In icy conditions, the steering feels very light. This probably means", "the tyres have lost grip on ice", ["your steering is broken", "your tyres are over-inflated", "the brakes are too strong"], "Ease off and avoid sudden movements."],
  ["Vehicle handling", "When driving through deep water, you should", "drive slowly in a low gear", ["drive fast to create a bow wave", "stop in the middle", "use cruise control"], "Test your brakes afterwards."],
  ["Vehicle handling", "When following another vehicle in fog, you should", "keep a safe distance and be able to stop within the distance you can see", ["follow its tail lights closely", "use full beam", "overtake at once"], "Slow down; fog can thicken quickly."],
  ["Vehicle handling", "Your windscreen mists up. You should", "use the demister and wait until it is clear before driving", ["wipe a small hole and drive", "drive with the window down only", "ignore it"], "You must be able to see clearly through all windows."],
  // Hazards & behaviour
  ["Hazard awareness", "You are driving past a line of parked cars and see a ball bounce between them. What hazard should you expect?", "A child running out", ["A car pulling out", "A cyclist overtaking", "A traffic light changing"], "Slow down and be ready to stop."],
  ["Hazard awareness", "Driving near a school at going-home time, you should", "slow down and watch for children and parked cars", ["speed up to get past", "sound your horn as you pass", "overtake buses"], "Children may be distracted."],
  ["Hazard awareness", "A car ahead is driving erratically and drifting across the lane. You should", "stay well back and report it to the police if necessary", ["overtake it closely", "flash your lights repeatedly", "follow very closely"], "The driver may be ill, tired or impaired."],
  ["Hazard awareness", "Approaching a narrow bridge with traffic lights, the lights are red. You should", "wait until they turn green", ["go if no traffic is coming", "sound your horn and go", "reverse"], "The bridge may only allow one-way traffic."],
  ["Hazard awareness", "Which is most likely to make you tired while driving?", "A long journey in a warm car at night", ["A short journey in the morning", "Regular breaks", "Fresh air from the vents"], "Plan breaks and stop if tired."],
  ["Hazard awareness", "Why should you avoid sudden braking on a downhill road?", "You could lose control and skid", ["It saves fuel", "It always improves grip", "It is illegal"], "Brake gently and early."],
  // Vulnerable
  ["Vulnerable road users", "When should you take extra care for motorcyclists?", "At junctions and when changing lanes", ["Only on motorways", "Only at night", "Never — they are always visible"], "Look twice for bikes."],
  ["Vulnerable road users", "A horse rider is in the left lane approaching a roundabout and signalling right. You should", "be prepared for them to stay in the left lane and keep well back", ["overtake on the right", "sound your horn", "pull alongside"], "Horse riders often keep left at roundabouts."],
  ["Vulnerable road users", "Before turning left across a cycle lane, you should", "check for cyclists on your left and give way to them", ["turn quickly", "use only your right mirror", "sound your horn"], "Do not cut across cyclists going straight ahead."],
  ["Vulnerable road users", "Why should you be cautious near an animal-drawn vehicle or a flock of sheep?", "Animals can behave unpredictably", ["They always move fast", "They have right of way only at night", "They are never on roads"], "Drive slowly and do not sound your horn."],
  ["Vulnerable road users", "You see a person with a guide dog at the kerb. You should", "be ready to stop — they may intend to cross", ["sound your horn to warn them", "speed up", "wave them across"], "Be patient and give them time."],
  // Vehicle
  ["Safety and your vehicle", "Driving with under-inflated tyres can", "increase fuel consumption and reduce grip", ["improve braking", "reduce tyre wear", "make steering lighter and safer"], "Check pressures regularly."],
  ["Safety and your vehicle", "Your vehicle pulls to one side when braking. This is likely to be", "a brake fault", ["normal", "caused by low fuel", "caused by a dirty windscreen"], "Have it checked as soon as possible."],
  ["Safety and your vehicle", "Which lights must work on your car?", "All required lights, including headlights, brake lights and indicators", ["Only headlights", "Only brake lights", "Only lights you use at night"], "Check them regularly."],
  ["Safety and your vehicle", "Why is it dangerous to leave items loose on a parcel shelf?", "They could fly forward and injure someone in a sudden stop", ["They block the radio", "They use more fuel", "They set off alarms"], "Secure loose items."],
  ["Safety and your vehicle", "Before a long journey, which checks should you make?", "Fuel, oil, water, tyres and lights", ["Only the radio", "Only the fuel", "None if the car is new"], "Remember the acronym POWDER: petrol, oil, water, damage, electrics, rubber."],
  ["Safety and your vehicle", "Who is responsible for making sure a vehicle is roadworthy?", "The driver", ["The garage that last serviced it", "The passengers", "The DVLA"], "Drivers can be prosecuted for unroadworthy vehicles."],
  // Documents / law
  ["Documents", "Which document shows who is the registered keeper of a vehicle?", "The V5C (vehicle log book)", ["The MOT certificate", "The insurance certificate", "The driving licence"], "Keep it up to date."],
  ["Documents", "How long must a learner driver hold a provisional licence before taking the practical test?", "There is no minimum time — they must first pass the theory test", ["2 years", "6 months", "1 year"], "The theory test pass is valid for 2 years."],
  ["Documents", "A theory test pass certificate is valid for", "2 years", ["6 months", "5 years", "life"], "You must pass the practical test within this time."],
  ["Documents", "Driving without insurance can lead to", "an unlimited fine, penalty points and the vehicle being seized", ["a warning letter only", "a £10 fine", "no penalty for first-time drivers"], "It is also unfair on other road users."],
  ["Documents", "Your car fails its MOT on a dangerous fault. You", "must not drive it until the fault is repaired", ["can drive it until your old MOT expires", "can drive it if you go slowly", "can drive it for 30 days"], "Dangerous faults make the vehicle illegal to drive."],
  // Incidents
  ["Incidents and emergencies", "At the scene of an incident, an injured person is not breathing. You should", "call 999 and start CPR", ["give them water", "move them into the road", "wait without acting"], "Use an AED if one is available."],
  ["Incidents and emergencies", "A casualty is bleeding heavily from a leg. You should", "apply firm pressure to the wound", ["give them a drink", "remove any embedded objects", "leave them alone"], "Raise the limb if no bones are broken."],
  ["Incidents and emergencies", "A casualty is in shock. You should", "keep them warm, reassure them and not give them anything to drink", ["give them a hot drink", "make them walk", "leave them alone"], "Call for help."],
  ["Incidents and emergencies", "Your car breaks down on a level crossing and a train is coming. You should", "get everyone out and away immediately", ["try to restart the car", "push it across", "stay inside with seat belts on"], "Move well clear of the crossing."],
  ["Incidents and emergencies", "If a tyre bursts while driving, you should", "hold the steering wheel firmly and let the car slow down gradually", ["brake hard immediately", "steer sharply", "accelerate"], "Stop in a safe place."],
];

export function drv2(): Q[] {
  return T(Q2);
}
