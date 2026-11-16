// UK car driving theory (DRV): original questions on the Highway Code, organised by the 14 DVSA topic areas.
// Written from the Highway Code's rules (not copied from the DVSA's licensed question bank).
// Stopping distances and speed limits are generated from the Highway Code tables.
import { mcq, pick, Q, repeat } from "./lib";

type F = [string, string, string, string[], string];
const T = (list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq("DRV", t, b, c, x, e, d));

const ALERTNESS: F[] = [
  ["Alertness", "You feel tired on a motorway journey. What should you do?", "Leave at the next exit or services and take a proper rest", ["Open the window and carry on", "Turn the radio up", "Stop on the hard shoulder for a sleep"], "Opening a window only helps for a very short time."],
  ["Alertness", "How often does the Highway Code recommend taking a break on a long journey?", "At least 15 minutes every two hours", ["Every five hours", "Only when you feel tired", "Once a day"], "Plan rest stops before you set off."],
  ["Alertness", "Before pulling out from a parked position, you should", "check mirrors and look over your shoulder into the blind spot", ["rely on your mirrors only", "sound the horn", "pull out quickly to save time"], "The blind spot is not covered by your mirrors."],
  ["Alertness", "Before you move off, when should you use your mirrors?", "Before signalling and before moving off", ["Only after you have moved off", "Only when reversing", "Never in town"], "Mirrors – signal – manoeuvre."],
  ["Alertness", "Your passenger wants to chat while you approach a busy junction. You should", "concentrate on the road and ask them to wait", ["turn to face them", "slow to walking pace in the junction", "keep talking and steer with one hand"], "Distractions increase the risk of a collision."],
  ["Alertness", "Using a satnav while driving, you should", "set it before your journey and only glance at it when safe", ["programme it while moving", "hold it in your hand", "watch it instead of the road"], "If you need to change the route, stop somewhere safe."],
  ["Alertness", "Which can cause dazzle from oncoming headlights to last longer?", "A dirty windscreen", ["A clean windscreen", "Wearing glasses for driving", "Driving slowly"], "Keep the windscreen clean inside and out."],
  ["Alertness", "Approaching a bend, a car is overtaking a cyclist towards you. You should", "slow down and be ready to stop", ["flash your headlights", "speed up to get past quickly", "sound your horn continuously"], "Expect the unexpected on bends."],
];

const ATTITUDE: F[] = [
  ["Attitude", "A driver behind you is following too closely. What should you do?", "Increase the gap in front of you so you can brake more gently", ["Brake sharply to warn them", "Speed up", "Wave them past while braking"], "A bigger gap ahead gives you and them more time."],
  ["Attitude", "At a pedestrian crossing, a pedestrian is slow to cross. You should", "be patient and wait", ["rev your engine", "sound your horn", "edge forward"], "Elderly and disabled people may need more time."],
  ["Attitude", "When should you flash your headlights at other road users?", "Only to let them know you are there", ["To give way", "To show annoyance", "To tell them to go"], "Never assume a flash means it is safe to go."],
  ["Attitude", "A long, slow-moving vehicle is ahead on a narrow road. You should", "stay well back and wait for a safe place to overtake", ["overtake on the next bend", "drive very close so you can see past", "flash your lights to make it pull over"], "Being patient is part of safe driving."],
  ["Attitude", "Another driver makes a mistake that affects you. You should", "stay calm and not react aggressively", ["chase them", "sound your horn repeatedly", "flash your lights and gesture"], "Road rage puts everyone at risk."],
  ["Attitude", "Which is an example of 'tailgating'?", "Following another vehicle too closely", ["Overtaking on the right", "Parking at the kerb", "Driving with the window down"], "Tailgating is dangerous and intimidating."],
  ["Attitude", "A horse rider is ahead on a country road. How should you pass?", "Wide and slow — at no more than 10 mph and at least 2 metres away", ["Quickly to get past", "Close, sounding your horn", "At 30 mph with a 1 metre gap"], "Horses can be startled easily."],
  ["Attitude", "You are in a queue of traffic and a vehicle wants to join from a side road. You should", "let it in if it is safe and the traffic is slow", ["block it", "sound your horn", "flash your lights to show annoyance"], "Courtesy helps traffic flow safely."],
];

const SAFETY_VEHICLE: F[] = [
  ["Safety and your vehicle", "The minimum legal tread depth for car tyres is", "1.6 mm across the central three-quarters, all the way round", ["1 mm across the whole tyre", "2 mm in the centre only", "3 mm on the outer edges"], "Many experts recommend replacing tyres well before this."],
  ["Safety and your vehicle", "When should you check tyre pressures?", "When the tyres are cold", ["After a long motorway trip", "When the tyres are hot", "Only at your MOT"], "Pressures read higher when tyres are warm."],
  ["Safety and your vehicle", "A head restraint should be adjusted so that", "the rigid part is at least as high as your eyes or the top of your ears and close to your head", ["it is as low as possible", "it touches your shoulders", "it is removed for comfort"], "It reduces whiplash injuries."],
  ["Safety and your vehicle", "Anti-lock brakes (ABS) mainly help you", "keep steering control while braking hard", ["stop in a much shorter distance on every surface", "drive faster on ice", "avoid ever skidding"], "Stopping distances still increase on wet or icy roads."],
  ["Safety and your vehicle", "A catalytic converter is fitted to reduce", "harmful exhaust gases", ["fuel consumption", "noise", "tyre wear"], "It cleans exhaust emissions."],
  ["Safety and your vehicle", "Which driving style saves fuel?", "Accelerating gently and planning ahead to avoid harsh braking", ["Revving the engine in each gear", "Braking late and hard", "Carrying a roof box all the time"], "Smooth driving is eco-driving."],
  ["Safety and your vehicle", "How can you reduce fuel consumption on a long journey?", "Remove an unused roof rack or box", ["Drive with the windows open at high speed", "Under-inflate the tyres", "Keep the air conditioning on full"], "Extra drag and weight use more fuel."],
  ["Safety and your vehicle", "When checking the engine oil level, the car should be", "on level ground with the engine off", ["on a slope", "running", "just after a long drive at speed"], "Wait for the oil to settle."],
  ["Safety and your vehicle", "When must a car first have an MOT in Great Britain?", "When it is three years old", ["When it is one year old", "When it is five years old", "Every year from new"], "Then it needs one every year. In Northern Ireland it is four years."],
  ["Safety and your vehicle", "Coasting (driving with the clutch down or in neutral) is dangerous because", "it reduces your control of the vehicle", ["it uses more fuel", "it damages the tyres", "it switches off the lights"], "You lose engine braking and steering response."],
  ["Safety and your vehicle", "Who is legally responsible for making sure a child under 14 wears a seat belt or suitable restraint?", "The driver", ["The child", "The child's parent if they are not in the car", "The front-seat passenger"], "Passengers aged 14 and over are responsible for themselves."],
  ["Safety and your vehicle", "Children must use a suitable child seat until they are", "12 years old or 135 cm tall, whichever comes first", ["5 years old", "8 years old only", "150 cm tall"], "The seat must suit the child's weight or height."],
  ["Safety and your vehicle", "A rear-facing baby seat must never be used in a front seat that has", "an active frontal airbag", ["a seat belt", "a head restraint", "air conditioning"], "The airbag could seriously injure the baby."],
  ["Safety and your vehicle", "A warning light shows on the dashboard while driving. You should", "check what it means in the vehicle handbook and act on it", ["ignore it until the next service", "cover it up", "speed up to get home"], "Red lights usually mean stop as soon as it is safe."],
];

const SAFETY_MARGINS: F[] = [
  ["Safety margins", "In good, dry conditions, the gap you should leave behind the vehicle in front is at least", "a two-second gap", ["a one-second gap", "one car length", "a five-second gap"], "Pick a fixed point and count 'Only a fool breaks the two-second rule'."],
  ["Safety margins", "On wet roads, your gap from the vehicle in front should be at least", "doubled", ["halved", "unchanged", "ten times bigger"], "Stopping distances at least double in the wet."],
  ["Safety margins", "On icy roads, braking distances can be up to", "ten times longer than normal", ["twice as long", "the same", "half as long"], "Drive slowly and gently."],
  ["Safety margins", "Your car begins to aquaplane on a flooded road. What should you do?", "Ease off the accelerator and let the car slow down", ["Brake hard", "Steer sharply", "Accelerate through it"], "Aquaplaning means the tyres have lost contact with the road."],
  ["Safety margins", "The back of your car skids to the right. What should you do?", "Steer to the right", ["Steer to the left", "Brake hard", "Accelerate hard"], "Steer gently into the skid."],
  ["Safety margins", "When driving in snow, you should", "use the highest gear possible and accelerate and brake gently", ["use first gear at high revs", "brake hard to test the grip", "follow closely to use the car's tracks"], "Gentle inputs keep the tyres gripping."],
  ["Safety margins", "After driving through a flood, you should", "test your brakes gently", ["drive fast to dry the engine", "switch off the engine", "pump the brakes hard"], "Wet brakes may not work properly."],
  ["Safety margins", "In strong winds, which road users are most likely to be affected?", "Cyclists, motorcyclists, high-sided vehicles and caravans", ["Large saloon cars only", "Pedestrians on pavements only", "Trains"], "Give them more room."],
  ["Safety margins", "Driving downhill on a long steep hill, you should", "select a lower gear to use engine braking", ["coast in neutral", "ride the brakes all the way", "switch off the engine"], "Overusing brakes makes them fade."],
  ["Safety margins", "What is the typical stopping distance at 30 mph in good conditions?", "23 metres (about six car lengths)", ["12 metres", "36 metres", "53 metres"], "Thinking distance 9 m plus braking distance 14 m."],
];

const HAZARD: F[] = [
  ["Hazard awareness", "A ball bounces into the road ahead. What should you do?", "Slow down and be ready to stop for a child", ["Swerve around it", "Speed up past it", "Sound your horn and continue"], "A child may run out after it."],
  ["Hazard awareness", "You are passing a bus that has stopped at a bus stop. You should", "watch for pedestrians stepping out from in front of it", ["speed up to pass quickly", "sound your horn", "flash your lights"], "People often cross in front of buses."],
  ["Hazard awareness", "An ice-cream van is parked ahead. Why should you take extra care?", "Children may run into the road", ["The van may reverse quickly", "The road may be icy", "It may be selling fuel"], "Children may be excited and not look."],
  ["Hazard awareness", "Some prescription medicines can affect your driving. What should you do?", "Check the leaflet or ask your doctor or pharmacist before driving", ["Drive if you feel fine", "Drink coffee to counter the effects", "Drive only at night"], "Driving while impaired by drugs is an offence."],
  ["Hazard awareness", "Why should you be careful when passing parked cars?", "A door may open or a pedestrian may step out", ["Parked cars always pull out", "They block your mirrors", "The road is always narrower"], "Leave room for doors opening."],
  ["Hazard awareness", "A road marking says 'SLOW' ahead. You should", "reduce speed because there is a hazard", ["stop completely", "speed up", "change lanes immediately"], "Look for the hazard and be ready."],
  ["Hazard awareness", "You see a vehicle with flashing amber beacons on a dual carriageway. It is probably", "a slow-moving vehicle", ["an ambulance on a call", "a police car", "a fire engine"], "For example a gritter or maintenance vehicle."],
  ["Hazard awareness", "Which of these may make it harder for you to see hazards at night?", "Dazzle from oncoming headlights", ["Street lights", "Cat's eyes", "Reflective road signs"], "Slow down or stop if you are dazzled."],
  ["Hazard awareness", "Approaching a junction where your view is restricted, you should", "slow down and creep forward until you can see clearly", ["accelerate across it", "sound your horn and go", "rely on others to stop"], "Look, assess and decide."],
  ["Hazard awareness", "After drinking alcohol the night before, you should", "be aware you may still be over the limit the next morning", ["drive normally after a cold shower", "drink coffee and drive", "only drive short distances"], "Alcohol takes time to leave your body."],
];

const VULNERABLE: F[] = [
  ["Vulnerable road users", "When overtaking a cyclist at speeds up to 30 mph, the Highway Code advises leaving at least", "1.5 metres", ["0.5 metres", "1 metre", "3 metres"], "Leave more room at higher speeds."],
  ["Vulnerable road users", "The Highway Code's 'hierarchy of road users' means that", "those who can cause the greatest harm have the greatest responsibility to reduce danger", ["cars always have priority", "cyclists must give way to everyone", "pedestrians must always wait"], "Drivers have more responsibility than cyclists and pedestrians."],
  ["Vulnerable road users", "You are turning into a side road and pedestrians are waiting to cross it. You should", "give way to them", ["sound your horn and turn", "turn quickly before they step out", "wave them back"], "Rule H2 of the Highway Code."],
  ["Vulnerable road users", "A pedestrian has a white cane with a red band. This means they are", "deaf and blind", ["elderly", "a learner", "a road worker"], "A plain white cane means visually impaired."],
  ["Vulnerable road users", "When passing pedestrians walking in the road (for example where there is no pavement), the Highway Code advises", "allowing at least 2 metres and passing at low speed", ["sounding your horn", "passing as fast as possible", "leaving 50 cm"], "Rule 206."],
  ["Vulnerable road users", "The 'Dutch reach' is", "opening the car door with the hand furthest from it so you look back for cyclists", ["a way of turning right", "a parking technique", "a seat adjustment"], "It helps prevent 'dooring' cyclists."],
  ["Vulnerable road users", "Why should you look carefully for motorcyclists at junctions?", "They are small and easy to miss", ["They always travel slowly", "They must give way to you", "They use the pavement"], "'Think bike' before pulling out."],
  ["Vulnerable road users", "You see older pedestrians about to cross the road. You should", "be patient — they may be slower and misjudge your speed", ["sound your horn", "speed up to pass first", "flash your lights"], "Give them time."],
  ["Vulnerable road users", "A cyclist ahead is approaching a roundabout in the left lane but intends to go right. You should", "give them plenty of room — they may stay in the left lane", ["overtake them on the roundabout", "sound your horn", "follow very closely"], "Cyclists may keep left for safety."],
  ["Vulnerable road users", "Near a school with 'school keep clear' zigzag markings, you must not", "stop or park on the markings", ["drive at 20 mph", "use your mirrors", "slow down"], "Children need to see and be seen."],
];

const OTHER_VEHICLES: F[] = [
  ["Other types of vehicle", "A long vehicle is signalling left but has moved out to the right before a junction. You should", "stay back — it needs room to turn left", ["overtake on the left", "sound your horn", "pass on the right quickly"], "Long vehicles swing wide to turn."],
  ["Other types of vehicle", "Why should you take extra care near trams?", "They cannot steer to avoid you", ["They are always slow", "They give way to cars", "They have no brakes"], "Trams run on fixed rails."],
  ["Other types of vehicle", "In a built-up area, a bus signals to pull out from a bus stop. You should", "give way to it if it is safe to do so", ["speed up to pass it", "sound your horn", "flash your lights"], "Rule 223 of the Highway Code."],
  ["Other types of vehicle", "When following a large lorry, why should you keep well back?", "To see past it and so the driver can see you in their mirrors", ["To save fuel only", "Because lorries are always slow", "Because it is illegal to follow lorries"], "If you can't see its mirrors, the driver can't see you."],
  ["Other types of vehicle", "A vehicle with a flashing green beacon is likely to be", "a doctor on an emergency call", ["a police car", "a breakdown truck", "a bin lorry"], "Give way if you can do so safely."],
  ["Other types of vehicle", "Powered vehicles used by disabled people that are restricted to 8 mph on the road are", "Class 3 invalid carriages (mobility scooters)", ["Class 1 vehicles", "learner vehicles", "trams"], "They may use dual carriageways but must show an amber light."],
  ["Other types of vehicle", "Overtaking a large vehicle in wet weather, you should be aware that", "spray may reduce your view", ["it will always pull over", "it has no blind spots", "it travels faster in the wet"], "Use wipers and keep a safe gap."],
];

const HANDLING: F[] = [
  ["Vehicle handling", "When should you use fog lights?", "When visibility is seriously reduced, generally to less than 100 metres", ["Whenever it is dark", "In light rain", "To dazzle following drivers"], "Switch them off when visibility improves."],
  ["Vehicle handling", "You must use headlights at night when", "driving on a road without street lights", ["parking in a garage", "stopping at traffic lights only", "driving in a 20 mph zone with street lights only"], "Use dipped headlights in built-up areas with street lights."],
  ["Vehicle handling", "Traffic-calming measures such as speed humps are used to", "slow traffic down", ["speed traffic up", "mark parking bays", "show bus routes"], "Keep to a low speed over them."],
  ["Vehicle handling", "You should not overtake when approaching", "a bend, a junction or the brow of a hill", ["a long straight road", "a dual carriageway", "a motorway"], "You cannot see what is coming."],
  ["Vehicle handling", "Your car stalls on a level crossing. What should you do first?", "Get everyone out and clear of the crossing", ["Try to restart the engine repeatedly", "Push the car across alone", "Wait in the car for help"], "Then use the railway phone to tell the signal operator."],
  ["Vehicle handling", "At a level crossing, the amber light comes on followed by twin flashing red lights. You must", "stop", ["speed up to cross", "carry on if no train is visible", "zigzag around the barriers"], "Keep waiting if the lights keep flashing after a train passes."],
  ["Vehicle handling", "When driving in fog, you should", "use dipped headlights and slow down", ["use full beam", "follow the tail lights in front closely", "drive with sidelights only"], "Full beam reflects off fog."],
  ["Vehicle handling", "When reversing, you should", "look all around and mainly through the rear window", ["rely only on your mirrors", "reverse further than necessary", "reverse into a main road"], "Pedestrians and children are hard to see."],
];

const MOTORWAY: F[] = [
  ["Motorway rules", "A red X is shown above your lane on a motorway. You must", "not drive in that lane", ["slow to 50 mph", "move into that lane", "stop on the hard shoulder"], "Driving under a red X is an offence."],
  ["Motorway rules", "A speed limit shown in a red circle on a motorway gantry is", "mandatory", ["advisory", "only for lorries", "only for the hard shoulder"], "Variable limits in red circles must be obeyed."],
  ["Motorway rules", "On a motorway, the reflective studs between the hard shoulder and the left lane are", "red", ["white", "amber", "green"], "White studs mark lanes; amber marks the central reservation; green marks slip roads."],
  ["Motorway rules", "Green reflective studs on a motorway mark", "the edge of slip roads and lay-bys", ["the central reservation", "lane lines", "the hard shoulder edge"], "They show where you can leave or join."],
  ["Motorway rules", "Amber reflective studs on a motorway mark", "the edge of the central reservation", ["the hard shoulder", "slip roads", "lane dividers"], "They are on the right-hand edge of the carriageway."],
  ["Motorway rules", "Learner car drivers may drive on a motorway only", "with an approved driving instructor in a car with dual controls", ["with any adult passenger", "after dark", "never under any circumstances"], "The law changed in June 2018."],
  ["Motorway rules", "On a motorway with three or more lanes, which vehicles may NOT use the right-hand lane (except in some circumstances)?", "Vehicles towing trailers and goods vehicles over 7.5 tonnes", ["Cars", "Motorcycles", "Coaches with fewer than 8 seats"], "They must use the left two lanes."],
  ["Motorway rules", "Countdown markers before a motorway exit are placed at", "300, 200 and 100 yards", ["3, 2 and 1 miles", "30, 20 and 10 metres", "1000, 500 and 100 metres"], "Each bar represents 100 yards."],
  ["Motorway rules", "You miss your motorway exit. What should you do?", "Carry on to the next exit", ["Reverse on the hard shoulder", "Do a U-turn through the central reservation", "Stop and wait"], "Never reverse on a motorway."],
  ["Motorway rules", "Your car breaks down on a smart motorway with no hard shoulder. If possible you should", "get to an emergency area, the next exit or services", ["stop in lane 3", "stop as soon as anything feels wrong", "walk across the lanes to the central reservation"], "If stuck in a live lane, switch on hazard lights and call 999."],
  ["Motorway rules", "On a motorway, marker posts on the hard shoulder show", "the direction to the nearest emergency telephone", ["the speed limit", "the next exit name", "the distance to London"], "Posts are every 100 metres."],
  ["Motorway rules", "You should overtake on a motorway", "on the right, after checking mirrors and blind spots", ["on the left whenever there is space", "on the hard shoulder", "in any lane at any time"], "Only pass on the left if traffic in lanes is moving slowly in queues."],
  ["Motorway rules", "Joining a motorway from a slip road, you should", "give priority to traffic already on the motorway and match its speed", ["force your way in", "stop at the end of the slip road", "join in the right-hand lane"], "Use the slip road to build up speed."],
  ["Motorway rules", "When can you stop on the hard shoulder?", "Only in an emergency", ["To take a phone call", "To rest when tired", "To look at a map"], "Leave at the next exit if you need to rest."],
];

const RULES: F[] = [
  ["Rules of the road", "At a roundabout, you should normally give priority to traffic", "approaching from your right", ["approaching from your left", "behind you", "on the slip road"], "Unless signs or markings show otherwise."],
  ["Rules of the road", "When leaving a roundabout, signal left", "after you pass the exit before the one you want", ["as you enter the roundabout", "after you have left the roundabout", "never"], "This tells others where you are going."],
  ["Rules of the road", "You may enter a yellow box junction only if", "your exit road or lane is clear", ["the lights are green", "there are no pedestrians", "you are turning left"], "You may wait in it when turning right if blocked only by oncoming traffic."],
  ["Rules of the road", "You must not park within how many metres of a junction (unless in a marked bay)?", "10 metres", ["2 metres", "5 metres", "20 metres"], "Rule 243 of the Highway Code."],
  ["Rules of the road", "When parking at night on a road with a speed limit over 30 mph, you must", "use your parking lights", ["leave your headlights on full beam", "leave the engine running", "park facing oncoming traffic"], "Always park facing the direction of traffic at night."],
  ["Rules of the road", "In a built-up area, you must not use your horn between", "11.30 pm and 7 am, unless another road user poses a danger", ["9 pm and 9 am", "midnight and 6 am only on Sundays", "7 am and 11.30 pm"], "And never while stationary, except in danger."],
  ["Rules of the road", "The national speed limit sign is", "a white circle with a black diagonal stripe", ["a red circle with '60'", "a blue circle with a white arrow", "a red triangle"], "The limit depends on the road and vehicle type."],
  ["Rules of the road", "Double white lines where the line nearer to you is solid mean", "you must not cross or straddle them, except in specific situations", ["you may overtake if clear", "it is a bus lane", "you may park"], "Exceptions include passing a stationary vehicle or overtaking a cyclist or horse at 10 mph or less."],
  ["Rules of the road", "Zigzag lines at a pedestrian crossing mean you must not", "park or overtake the lead vehicle approaching the crossing", ["drive over them at all", "use your indicators", "stop for pedestrians"], "They keep the view of the crossing clear."],
  ["Rules of the road", "Double yellow lines along the edge of the road mean", "no waiting at any time", ["no waiting during the day only", "loading only", "bus stop"], "Check signs for seasonal restrictions."],
  ["Rules of the road", "You may use a bus lane", "only outside the times shown on the signs (or not at all if no times are shown)", ["at any time", "whenever it is empty", "if you are turning left in 200 m"], "Signs show when the lane is in operation."],
  ["Rules of the road", "Driving in Wales, what is the default speed limit on most restricted roads (with street lights)?", "20 mph", ["30 mph", "40 mph", "15 mph"], "This changed in September 2023."],
  ["Rules of the road", "At a zebra crossing, you must", "give way to pedestrians who are on the crossing", ["wave pedestrians across", "sound your horn to warn them", "overtake slow vehicles on the crossing"], "Look for people waiting and be ready to stop."],
  ["Rules of the road", "At a pelican crossing, a flashing amber light means", "give way to pedestrians on the crossing, then go if it is clear", ["stop and wait for green", "speed up", "the lights are broken"], "Puffin crossings do not have a flashing amber phase."],
  ["Rules of the road", "A toucan crossing can be used by", "pedestrians and cyclists", ["horse riders only", "buses only", "pedestrians only"], "Pegasus crossings are for horse riders."],
];

const SIGNS: F[] = [
  ["Road and traffic signs", "Road signs in circles generally", "give orders", ["give warnings", "give information", "show directions"], "Triangles warn; rectangles inform."],
  ["Road and traffic signs", "Most triangular road signs", "give warnings", ["give orders", "show tourist attractions", "show motorway exits"], "They have a red border."],
  ["Road and traffic signs", "Blue circular signs usually", "tell you what you must do", ["tell you what you must not do", "warn of hazards", "show tourist information"], "For example 'turn left' or 'keep left'."],
  ["Road and traffic signs", "Red circular signs usually", "tell you what you must not do", ["tell you what you must do", "give directions", "show distances"], "For example 'no entry' or speed limits."],
  ["Road and traffic signs", "What shape is a stop sign?", "Octagonal (eight-sided)", ["Triangular", "Circular", "Rectangular"], "Its unique shape can be recognised even if covered in snow."],
  ["Road and traffic signs", "A 'give way' sign is", "an upside-down triangle", ["a red octagon", "a blue circle", "a green rectangle"], "Give way to traffic on the major road."],
  ["Road and traffic signs", "Brown road signs show", "tourist attractions", ["motorway routes", "primary routes", "hazards"], "Green backgrounds show primary routes; blue shows motorways."],
  ["Road and traffic signs", "Direction signs with a blue background are used on", "motorways", ["primary routes", "local roads", "tourist routes"], "Primary routes use green backgrounds."],
  ["Road and traffic signs", "What is the sequence of UK traffic lights after red?", "Red and amber, then green", ["Amber, then green", "Green, then amber", "Flashing amber, then green"], "Red and amber together means stop; do not go until green."],
  ["Road and traffic signs", "A steady amber traffic light means", "stop, unless you have crossed the stop line or are so close that stopping might cause a collision", ["go if the way is clear", "speed up", "give way to the right"], "Red follows amber."],
  ["Road and traffic signs", "A green filter arrow at traffic lights means", "you may go in that direction, even if the main light is red", ["stop", "the lights are broken", "give way to oncoming traffic only"], "Only move into that lane if you intend to go that way."],
  ["Road and traffic signs", "A school crossing patrol shows a 'stop for children' sign. You must", "stop", ["slow down and drive past carefully", "sound your horn", "overtake the patrol"], "It is an offence not to stop."],
];

const DOCUMENTS: F[] = [
  ["Documents", "Someone supervising a learner driver must be at least", "21 years old and have held a full licence for that type of vehicle for 3 years", ["17 years old with a provisional licence", "18 years old with any licence", "25 years old with a licence for 1 year"], "They must also be qualified to drive that type of vehicle."],
  ["Documents", "What is the minimum level of motor insurance required by law?", "Third party", ["Fully comprehensive", "Third party, fire and theft", "No insurance if the car is rarely used"], "It covers injury or damage to others."],
  ["Documents", "Who must you tell when you change your address?", "The DVLA", ["The local library", "Your MOT garage", "The police"], "Update your licence and vehicle log book (V5C)."],
  ["Documents", "New drivers who get 6 or more penalty points within 2 years of passing their test will", "have their licence revoked", ["get a warning letter", "have to pay a £100 fine only", "have to take a theory test online only"], "They must reapply for a provisional licence and pass both tests again."],
  ["Documents", "Using a hand-held phone while driving can result in", "6 penalty points and a £200 fine", ["3 points and a £60 fine", "a warning only", "no penalty if stopped at traffic lights"], "It is illegal even while stopped at lights or queuing."],
  ["Documents", "The UK car theory test multiple-choice part has 50 questions. What is the pass mark?", "43", ["35", "40", "45"], "You have 57 minutes."],
  ["Documents", "In the hazard perception part of the theory test, how many video clips are there?", "14", ["10", "20", "50"], "One clip has two developing hazards, so there are 15 to score; the pass mark is 44 out of 75."],
  ["Documents", "The legal drink-drive limit in England, Wales and Northern Ireland is", "80 mg of alcohol per 100 ml of blood", ["50 mg per 100 ml of blood", "20 mg per 100 ml of blood", "100 mg per 100 ml of blood"], "In Scotland it is 50 mg per 100 ml of blood."],
  ["Documents", "The legal drink-drive limit in Scotland is", "50 mg of alcohol per 100 ml of blood", ["80 mg per 100 ml of blood", "0 mg", "35 mg per 100 ml of blood"], "The breath limit in Scotland is 22 micrograms per 100 ml."],
  ["Documents", "A car must have a valid MOT certificate (if one is required) before you can", "tax it", ["insure it", "wash it", "sell it to a dealer"], "Tax, MOT and insurance are all legal requirements."],
  ["Documents", "With a car (category B) licence, you can generally tow a trailer up to a maximum authorised mass of", "3,500 kg", ["750 kg only", "7,500 kg", "unlimited weight"], "Since 2021, car licence holders automatically have B+E entitlement."],
];

const INCIDENTS: F[] = [
  ["Incidents and emergencies", "You are involved in a collision that damages another vehicle. You must", "stop and give your name, address and registration to anyone with reasonable grounds to ask", ["drive on if the damage is minor", "only tell your insurer", "leave a note and drive off"], "If you cannot exchange details, report it to the police as soon as possible and within 24 hours."],
  ["Incidents and emergencies", "If you break down on a normal road, a warning triangle should be placed at least", "45 metres behind your vehicle", ["5 metres behind", "10 metres in front", "on the roof"], "Do not use a warning triangle on a motorway."],
  ["Incidents and emergencies", "At the scene of a crash, you should", "switch off engines, warn other traffic and call emergency services", ["move injured people immediately", "give injured people a drink", "remove a motorcyclist's helmet straight away"], "Only move casualties if they are in further danger."],
  ["Incidents and emergencies", "An injured motorcyclist is lying unconscious. You should", "not remove their helmet unless it is essential", ["remove the helmet straight away", "give them a drink", "move them to the pavement"], "Removing it could cause spinal injury."],
  ["Incidents and emergencies", "When are hazard warning lights used while moving?", "Briefly on a motorway or unrestricted dual carriageway to warn of a hazard ahead", ["When parking illegally", "When driving in rain", "To thank another driver"], "Otherwise use them only when stationary and causing an obstruction."],
  ["Incidents and emergencies", "For CPR on an adult, the Highway Code advises chest compressions at a rate of", "100–120 per minute", ["30 per minute", "60 per minute", "200 per minute"], "Press down 5–6 cm in the centre of the chest."],
  ["Incidents and emergencies", "A casualty has a burn. You should", "cool it with clean, cool water for at least 10 minutes", ["burst any blisters", "apply butter", "remove clothing stuck to the burn"], "Do not remove anything stuck to the burn."],
  ["Incidents and emergencies", "If your vehicle catches fire, you should", "get everyone out and away, then call the fire service", ["open the bonnet to check", "keep driving to a garage", "stay in the car"], "Do not attempt to tackle a large fire."],
  ["Incidents and emergencies", "You break down in a tunnel. You should", "switch on hazard lights, get out and call for help from an emergency point", ["stay in the car with the engine running", "reverse out of the tunnel", "put a warning triangle in the next lane"], "Follow the tunnel's emergency signs."],
];

const LOADING: F[] = [
  ["Vehicle loading", "A caravan starts to snake (swerve from side to side). You should", "ease off the accelerator slowly", ["brake hard", "accelerate to straighten it", "steer sharply"], "Let the speed fall gradually."],
  ["Vehicle loading", "When carrying a heavy load, you may need to", "adjust your tyre pressures and headlight aim", ["drive faster to save time", "remove the seat belts", "turn off the lights"], "Check the vehicle handbook."],
  ["Vehicle loading", "Who is responsible for making sure a vehicle is not overloaded?", "The driver", ["The passengers", "The owner of the goods only", "The police"], "Overloading affects handling and braking."],
  ["Vehicle loading", "A roof rack load should be", "securely fastened and not too heavy", ["loose so it can move", "as high as possible", "left uncovered in rain"], "Roof loads make the car less stable."],
  ["Vehicle loading", "Pets in a car should be", "suitably restrained so they cannot distract you", ["loose on the back seat", "on the driver's lap", "in the boot of a saloon"], "A seat belt harness, carrier or dog guard is suitable."],
  ["Vehicle loading", "A car towing a caravan or trailer on a motorway has a speed limit of", "60 mph", ["50 mph", "70 mph", "40 mph"], "It is 50 mph on single carriageways."],
];

// ---- Generated from the Highway Code stopping-distance table ----------------------
const STOP: [number, number, number][] = [[20, 6, 6], [30, 9, 14], [40, 12, 24], [50, 15, 38], [60, 18, 55], [70, 21, 75]];
function stopping(): Q[] {
  const out: Q[] = [];
  for (const [mph, think, brake] of STOP) {
    const total = think + brake, others = STOP.filter((s) => s[0] !== mph);
    out.push(mcq("DRV", "Safety margins", `According to the Highway Code, what is the typical overall stopping distance at ${mph} mph in good conditions?`, `${total} metres`,
      others.slice(0, 5).map((s) => `${s[1] + s[2]} metres`).filter((x) => x !== `${total} metres`).slice(0, 3), `Thinking distance ${think} m + braking distance ${brake} m = ${total} m.`, 2));
    out.push(mcq("DRV", "Safety margins", `According to the Highway Code, what is the typical thinking distance at ${mph} mph?`, `${think} metres`,
      others.map((s) => `${s[1]} metres`).slice(0, 3), `At ${mph} mph the thinking distance is ${think} m.`, 2));
    out.push(mcq("DRV", "Safety margins", `According to the Highway Code, what is the typical braking distance at ${mph} mph on a dry road?`, `${brake} metres`,
      others.map((s) => `${s[2]} metres`).slice(0, 3), `At ${mph} mph the braking distance is ${brake} m.`, 2));
  }
  return out;
}
function speedLimits(): Q[] {
  const roads: [string, number, number][] = [["a built-up area with street lights (England)", 30, 30], ["a single carriageway", 60, 50], ["a dual carriageway", 70, 60], ["a motorway", 70, 60]];
  const out: Q[] = [];
  for (const [road, car, tow] of roads) {
    out.push(mcq("DRV", "Rules of the road", `Unless signs show otherwise, what is the speed limit for a car on ${road}?`, `${car} mph`, ["20 mph", "30 mph", "40 mph", "50 mph", "60 mph", "70 mph"].filter((x) => x !== `${car} mph`).slice(0, 3), `The limit for cars on ${road} is ${car} mph.`, 1));
    out.push(mcq("DRV", "Vehicle loading", `Unless signs show otherwise, what is the speed limit for a car towing a caravan or trailer on ${road}?`, `${tow} mph`, ["30 mph", "40 mph", "50 mph", "60 mph", "70 mph"].filter((x) => x !== `${tow} mph`).slice(0, 3), `Cars towing are limited to ${tow} mph on ${road}.`, 2));
  }
  return out;
}
function wetStopping(): Q[] {
  return repeat(6, () => {
    const [mph, think, brake] = pick(STOP), dry = think + brake, wet = dry * 2;
    return mcq("DRV", "Safety margins", `The typical stopping distance at ${mph} mph is ${dry} m in the dry. Roughly how far could it be on a wet road?`, `About ${wet} metres`,
      [`About ${Math.round(dry / 2)} metres`, `About ${dry} metres`, `About ${dry * 10} metres`], `Stopping distances at least double in the wet: ${dry} × 2 ≈ ${wet} m.`, 2);
  });
}

export function drv(): Q[] {
  return [
    ...T(ALERTNESS), ...T(ATTITUDE), ...T(SAFETY_VEHICLE), ...T(SAFETY_MARGINS), ...T(HAZARD), ...T(VULNERABLE), ...T(OTHER_VEHICLES),
    ...T(HANDLING), ...T(MOTORWAY), ...T(RULES), ...T(SIGNS), ...T(DOCUMENTS), ...T(INCIDENTS), ...T(LOADING),
    ...stopping(), ...speedLimits(), ...wetStopping(),
  ];
}
