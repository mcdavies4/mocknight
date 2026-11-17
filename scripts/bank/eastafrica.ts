// East African driving theory banks.
// RSG: road signs and safe driving (side-neutral, metric) — shared by Kenya, Uganda, Tanzania and Rwanda.
// EAL: keep-left rules (Kenya, Uganda, Tanzania). KDR: Kenya-specific rules (Traffic Act, NTSA).
// RDR: keep-right rules and Rwanda-specific rules.
// Only long-standing rules; figures generated where it's arithmetic.
import { mcq, numOpts, Q } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

const RSG: F[] = [
  ["Road signs", "A red triangle sign is a", "warning sign", ["mandatory sign", "information sign", "direction sign"], "It warns of a hazard ahead."],
  ["Road signs", "A red circle sign usually", "prohibits something", ["warns of a hazard", "gives directions", "shows a service"], "For example, no entry, no overtaking or a speed limit."],
  ["Road signs", "A blue circle sign", "tells you what you must do", ["warns of danger", "shows a prohibition", "shows a tourist site"], "For example, turn left only, or keep to this side."],
  ["Road signs", "An eight-sided (octagonal) red sign means", "stop", ["give way", "no entry", "parking"], "Stop completely at the line."],
  ["Road signs", "An upside-down triangle with a red border means", "give way", ["stop", "warning", "end of road"], "Slow down and give way to traffic on the main road."],
  ["Road signs", "A red circle with a white horizontal bar means", "no entry", ["one-way street", "parking", "hospital"], "Vehicles must not enter."],
  ["Road signs", "A red circle containing a number such as 50 means", "maximum speed 50 km/h", ["minimum speed 50 km/h", "50 metres to a junction", "route 50"], "Blue circles with a number show a minimum speed."],
  ["Road signs", "A triangle sign showing children means", "school or children crossing ahead", ["playground for drivers", "no children allowed", "hospital"], "Slow down and be ready to stop."],
  ["Road signs", "A triangle with a train or a gate warns of", "a level crossing ahead", ["a station car park", "a toll gate", "a bus stop"], "Slow down and look both ways."],
  ["Road signs", "A sign showing two cars side by side inside a red circle means", "no overtaking", ["two-way traffic", "car park", "dual carriageway ahead"], "Don't overtake until the restriction ends."],
  ["Road markings", "A continuous (unbroken) centre line means", "do not cross or straddle it", ["you may overtake", "parking allowed", "bus lane"], "Broken lines may be crossed when safe."],
  ["Road markings", "Zebra crossing stripes mark a place where", "drivers must give way to pedestrians on the crossing", ["pedestrians must wait for all cars", "vehicles may park", "buses stop"], "Never overtake near a zebra crossing."],
  ["Traffic lights", "An amber (yellow) traffic light on its own means", "stop, unless you are so close that stopping would be unsafe", ["speed up to get through", "go", "turn only"], "Red follows amber."],
  ["Traffic lights", "A green traffic light means", "you may go if the way is clear", ["you must go at once", "stop", "give way to everyone"], "Watch for pedestrians still crossing."],
  ["Traffic lights", "When a traffic police officer is directing traffic, you should", "follow the officer's signals, even if they conflict with the lights", ["follow the lights only", "ignore both", "hoot and continue"], "The officer's signal takes priority."],
  ["Safe driving", "The two-second rule is used to keep", "a safe gap behind the vehicle in front", ["the right speed on bends", "your engine cool", "your mirrors adjusted"], "Double it in rain."],
  ["Safe driving", "In wet weather your stopping distance", "increases, so you should slow down and leave a bigger gap", ["gets shorter", "stays the same", "doesn't matter with good tyres"], "It can be twice as long as in dry conditions."],
  ["Safe driving", "When dazzled by oncoming headlights at night, you should", "slow down or stop and look towards the edge of the road", ["flash your full beam back", "close your eyes briefly", "speed up"], "Wait until your eyes adjust."],
  ["Safe driving", "You should dip your headlights", "when meeting oncoming traffic or following another vehicle", ["only in towns", "never at night", "only when parked"], "Full beam dazzles other drivers."],
  ["Safe driving", "Before moving off from the roadside, you should", "check mirrors, look over your shoulder and signal if needed", ["only sound the horn", "move off quickly", "rely on other drivers to stop"], "Check your blind spot."],
  ["Safe driving", "Using a handheld phone while driving is", "dangerous and an offence", ["safe at low speed", "allowed in traffic jams", "allowed for short calls"], "Pull over safely to make a call."],
  ["Safe driving", "Alcohol affects driving by", "slowing reactions and impairing judgement", ["sharpening concentration", "improving night vision", "having no effect in small amounts"], "The safest choice is not to drink and drive."],
  ["Safe driving", "If you feel tired on a long journey, you should", "stop in a safe place and rest", ["open the window and keep going", "drive faster to arrive sooner", "turn the radio up"], "Plan a break every two hours."],
  ["Safe driving", "Seat belts", "must be worn by the driver and passengers where fitted", ["are only for long journeys", "are only for the driver", "are optional in towns"], "They reduce injury in a crash."],
  ["Safe driving", "Before overtaking, you should make sure", "the road ahead is clear and you can return safely", ["you are on a bend", "a vehicle is coming towards you", "you are near a junction"], "Never overtake on a bend, a hill crest or near a crossing."],
  ["Hazards", "When approaching animals on the road, you should", "slow down, give them plenty of room and avoid hooting loudly", ["speed past", "hoot continuously", "drive between them"], "Animals can move unpredictably."],
  ["Hazards", "Near a school when children are around, you should", "slow down and be ready to stop", ["hoot to warn them", "speed up to pass quickly", "overtake buses"], "Children may run into the road."],
  ["Hazards", "When a vehicle behind you flashes its headlights to overtake, you should", "stay in your lane, hold a steady speed and let them pass", ["speed up", "brake hard", "block the road"], "Never speed up when being overtaken."],
  ["Vehicle", "Worn tyres", "reduce grip and increase stopping distances", ["improve braking", "save fuel safely", "have no effect"], "Check tread and pressure regularly."],
  ["Vehicle", "Before a journey you should check", "tyres, lights, brakes, fuel, oil and water", ["only the radio", "only the fuel", "nothing if the car started"], "A quick check prevents breakdowns."],
  ["Emergencies", "At a crash scene, the first thing to do is", "make the area safe: warn traffic and switch off engines", ["move injured people at once", "leave immediately", "take photos first"], "Then call emergency services and help the injured."],
  ["Emergencies", "If your vehicle breaks down on the road, you should", "move it off the road if possible, switch on hazard lights and place warning triangles", ["leave it in the lane with no warning", "stand behind it in the road", "keep driving on a flat tyre"], "Warning triangles warn approaching drivers."],
];

function rsgCalc(): Q[] {
  return [36, 54, 72, 90, 108].map((kmh) => {
    const mps = kmh / 3.6, gap = mps * 2;
    return mcq("RSG", "Safe driving", `At ${kmh} km/h a car travels about ${mps} metres every second. How far does it travel during a 2-second gap?`, `${gap} m`, numOpts(gap, [mps, gap * 2, gap / 2 + 3, gap + 10], "m").filter((o) => o !== `${gap} m`), `${mps} m/s × 2 s = ${gap} m. That's why a 2-second gap grows with speed.`, 2);
  });
}

const EAL: F[] = [
  ["Keep-left rules", "In Kenya, Uganda and Tanzania, vehicles drive on the", "left side of the road", ["right side of the road", "centre of the road", "either side"], "Keep left unless overtaking."],
  ["Keep-left rules", "On a road where traffic keeps left, you normally overtake", "on the right", ["on the left", "on either side", "on the shoulder"], "Overtaking on the left is only allowed in special cases, such as when the vehicle ahead is turning right."],
  ["Keep-left rules", "At a roundabout where traffic keeps left, you should", "give way to traffic coming from your right and go round clockwise", ["give way to traffic from your left", "go round anticlockwise", "stop in the middle"], "Signal left before your exit."],
  ["Keep-left rules", "On a multi-lane road where traffic keeps left, slower vehicles should use", "the left-hand lane", ["the right-hand lane", "the middle lane always", "the shoulder"], "The right lane is for overtaking."],
  ["Keep-left rules", "When turning right at a junction, you should position your vehicle", "just left of the centre line", ["at the far left kerb", "on the wrong side of the road", "in the middle of the junction"], "Give way to oncoming traffic first."],
  ["Keep-left rules", "When turning left, you should keep", "close to the left-hand side of the road", ["to the right of the centre line", "in the right lane", "in the middle"], "Watch for cyclists and pedestrians on your left."],
  ["Keep-left rules", "Before turning right, you should check", "your mirrors and the right-hand blind spot, and signal", ["only the left mirror", "nothing if the road is quiet", "only the rear-view mirror"], "Motorcycles may be overtaking you."],
  ["Keep-left rules", "When an emergency vehicle with siren and flashing lights approaches, you should", "pull over to the left and let it pass", ["speed up", "stop in the middle of the road", "pull over to the right"], "Don't block junctions."],
  ["Keep-left rules", "When parking at night on a road where traffic keeps left, you should park", "on the left, facing the direction of traffic", ["on the right facing oncoming traffic", "in the middle of the road", "on a bend"], "Use parking lights if the road is unlit."],
  ["Keep-left rules", "When you are being overtaken, you should", "keep to the left and not speed up", ["move to the right", "accelerate", "brake suddenly"], "Help the other driver pass safely."],
  ["Keep-left rules", "A motorcyclist in a country where traffic keeps left should ride", "on the left side of the lane they are using, but not too close to the edge", ["on the right edge", "between lanes of oncoming traffic", "on the pavement"], "Stay visible to other road users."],
  ["Keep-left rules", "At a junction with no signs or markings, you should", "slow down, look both ways and give way to traffic already on the road", ["drive straight across without looking", "hoot and continue", "always expect others to give way"], "Unmarked junctions need extra care."],
];

const KDR: F[] = [
  ["Kenya rules", "Driving licences in Kenya are issued under the", "National Transport and Safety Authority (NTSA)", ["Kenya Revenue Authority only", "Ministry of Health", "Kenya Power"], "Applications are made online."],
  ["Kenya rules", "To learn to drive in Kenya, you must hold", "a provisional driving licence (PDL)", ["a full licence", "a passport only", "nothing"], "Learn with a qualified instructor or licensed driver."],
  ["Kenya rules", "A learner driver in Kenya must display", "'L' plates on the front and back of the vehicle", ["a red flag", "no plates", "a 'P' sticker only"], "Other road users then know to take extra care."],
  ["Kenya rules", "The minimum age for a Kenyan licence to drive a car (light vehicle) is", "18", ["16", "21", "25"], "Larger vehicle classes have higher minimum ages."],
  ["Kenya rules", "In the Kenyan driving test, the model town board is used to test", "knowledge of road rules, signs and junction procedures", ["engine repair", "first aid only", "vehicle registration"], "Candidates explain how they'd move through the model town."],
  ["Kenya rules", "Unless signs show otherwise, the speed limit in Kenyan built-up areas is", "50 km/h", ["30 km/h", "80 km/h", "110 km/h"], "Watch for lower limits near schools."],
  ["Kenya rules", "Public service vehicles (PSVs) and commercial vehicles in Kenya are generally limited to", "80 km/h and must be fitted with speed governors", ["120 km/h", "no limit", "30 km/h"], "Speed governors became compulsory under the Michuki rules."],
  ["Kenya rules", "The 2003–04 'Michuki rules' in Kenya made compulsory", "speed governors and seat belts in public service vehicles", ["free fuel", "tinted windows", "loud music in matatus"], "They were named after Transport Minister John Michuki."],
  ["Kenya rules", "In Kenya, seat belts must be worn by", "drivers and passengers, including PSV passengers where belts are fitted", ["drivers only", "front passengers only", "nobody in town"], "PSV crews must ensure passengers belt up."],
  ["Kenya rules", "Boda boda (motorcycle) riders and passengers in Kenya must", "wear helmets and reflective jackets", ["carry three passengers", "ride without lights", "ride on pavements"], "Riders may carry only one passenger."],
  ["Kenya rules", "The legal alcohol limit for drivers in Kenya is", "0.08 g of alcohol per 100 ml of blood", ["0.5 g per 100 ml", "any amount is allowed", "0.8 g per 100 ml"], "Exceeding it is a serious offence."],
  ["Kenya rules", "In Kenya, every motor vehicle used on a public road must have", "at least third-party insurance", ["no insurance", "only fire insurance", "only theft cover"], "It covers injury to other people."],
  ["Kenya rules", "Kenya's national emergency numbers include", "999 and 112", ["911 only", "100 only", "000"], "Call for police, fire or ambulance."],
  ["Kenya rules", "Matatus and other PSVs in Kenya must stop to pick up and drop passengers", "only at designated stages", ["anywhere on the road", "in the middle of junctions", "on zebra crossings"], "Stopping anywhere causes congestion and danger."],
  ["Kenya rules", "Near a hospital in Kenya, drivers should", "avoid using the horn", ["hoot to clear the way", "drive faster", "park on the entrance"], "Sound the horn only to warn of danger."],
  ["Kenya rules", "A Kenyan driver involved in a crash where someone is injured must", "stop, help and report it to the police", ["drive away", "only call a relative", "move the cars and leave"], "Leaving the scene is an offence."],
];

const RDR: F[] = [
  ["Keep-right rules", "In Rwanda, vehicles drive on the", "right side of the road", ["left side of the road", "centre of the road", "either side"], "Rwanda drives on the right, unlike its neighbours Uganda, Kenya and Tanzania."],
  ["Keep-right rules", "Where traffic keeps right, you normally overtake", "on the left", ["on the right", "on the shoulder", "on either side"], "Return to the right when it is safe."],
  ["Keep-right rules", "At an unmarked junction in Rwanda, you should give way to", "vehicles coming from your right", ["vehicles coming from your left", "nobody", "only buses"], "This is the 'priority to the right' rule."],
  ["Keep-right rules", "At a roundabout where traffic keeps right, traffic goes round", "anticlockwise", ["clockwise", "either way", "through the middle"], "Give way to vehicles already on the roundabout where signs show it."],
  ["Keep-right rules", "Slower vehicles on a multi-lane road where traffic keeps right should use", "the right-hand lane", ["the left-hand lane", "the shoulder", "any lane"], "The left lane is for overtaking."],
  ["Keep-right rules", "When turning left at a junction where traffic keeps right, you should", "position just right of the centre line and give way to oncoming traffic", ["turn from the far right kerb", "cut across the corner", "stop in the junction"], "Signal in good time."],
  ["Keep-right rules", "When an emergency vehicle with siren and flashing lights approaches in Rwanda, you should", "move to the right and let it pass", ["move to the left", "speed up", "stop in the middle of the road"], "Don't block junctions."],
  ["Keep-right rules", "When parking where traffic keeps right, you should park", "on the right, facing the direction of traffic", ["facing oncoming traffic on the left", "on a bend", "on a pedestrian crossing"], "Use lights at night if the road is unlit."],
  ["Keep-right rules", "When you are being overtaken where traffic keeps right, you should", "keep to the right and not speed up", ["move left", "accelerate", "brake suddenly"], "Help the other driver pass safely."],
  ["Rwanda rules", "In Rwanda, the driving theory test for a provisional licence is organised by", "the Rwanda National Police", ["the Rwanda Revenue Authority only", "the Ministry of Health", "private schools only"], "Pass it before taking the practical test."],
  ["Rwanda rules", "In Rwanda, motorcycle taxi riders and their passengers must", "wear helmets", ["ride without helmets in town", "carry two passengers", "ride on pavements"], "Riders carry only one passenger."],
  ["Rwanda rules", "In Rwanda, the police emergency number is", "112", ["999", "911", "000"], "113 is the traffic police; 912 is the ambulance service."],
  ["Rwanda rules", "In Rwanda, the number for an ambulance (SAMU) is", "912", ["112", "999", "100"], "Give the exact location."],
  ["Rwanda rules", "Speed governors fitted to Rwandan public transport and goods vehicles limit them to", "60 km/h", ["30 km/h", "100 km/h", "120 km/h"], "They were introduced to cut serious crashes."],
  ["Rwanda rules", "Rwanda's legal blood alcohol limit for drivers is", "0.8 grams per litre of blood", ["8 grams per litre", "no limit", "0.08 grams per litre"], "Driving over the limit leads to fines and licence suspension."],
  ["Rwanda rules", "A learner driver in Rwanda must", "drive only with a qualified instructor or licensed driver", ["drive alone on highways", "carry paying passengers", "drive without a provisional licence"], "Practise before the practical test."],
];

export function eastafrica(): Record<string, Q[]> {
  return { RSG: [...facts("RSG", RSG), ...rsgCalc()], EAL: facts("EAL", EAL), KDR: facts("KDR", KDR), RDR: facts("RDR", RDR) };
}
