// Fire Marshal / Fire Warden — original questions aligned to UK fire safety law and common practice
// (Regulatory Reform (Fire Safety) Order 2005, BS 5839 / BS 5266 testing guidance, BS EN 3 extinguishers).
import { mcq, others, Q } from "./lib";

const S = "FIR";
const M1 = "Fire safety law";
const M2 = "Fire science";
const M3 = "Prevention";
const M4 = "Alarms & lighting";
const M5 = "Doors, routes & signs";
const M6 = "Extinguishers";
const M7 = "Evacuation";
const M8 = "Drills & records";

// extinguisher type, band colour, suitable for
const EXT: [string, string, string][] = [
  ["Water", "red", "Class A fires (paper, wood, textiles)"],
  ["Foam", "cream", "Class A and Class B fires (solids and flammable liquids)"],
  ["Carbon dioxide (CO2)", "black", "electrical equipment fires and Class B flammable liquids"],
  ["Dry powder", "blue", "Class A, B and C fires, including flammable gases"],
  ["Wet chemical", "yellow", "Class F fires (cooking oils and fats)"],
];

// fire class, materials
const CLASSES: [string, string][] = [
  ["Class A", "solid materials such as paper, wood and textiles"],
  ["Class B", "flammable liquids such as petrol, paint and solvents"],
  ["Class C", "flammable gases such as propane and butane"],
  ["Class D", "burning metals such as magnesium and aluminium swarf"],
  ["Class F", "cooking oils and fats, for example in a deep-fat fryer"],
];

// sign colour/shape, meaning
const SIGNS: [string, string][] = [
  ["a green rectangular or square sign", "a safe condition, such as a fire exit or escape route"],
  ["a red rectangular or square sign", "the location of fire-fighting equipment"],
  ["a blue circular sign", "a mandatory action, such as 'Fire door keep shut'"],
  ["a yellow triangular sign", "a warning of a hazard"],
  ["a red circle with a diagonal line", "a prohibited action, such as 'Do not use lift'"],
];

const FACTS: [string, string, string[], string, string][] = [
  // M1 law
  ["Which law covers workplace fire safety in England and Wales?", "The Regulatory Reform (Fire Safety) Order 2005", ["The Health and Safety at Work Act 1974 only", "The Fire Precautions Act 1971", "The Building Safety Act 2022 only"], "The Fire Safety Order applies to almost all non-domestic premises in England and Wales.", M1],
  ["Which law covers fire safety in non-domestic premises in Scotland?", "The Fire (Scotland) Act 2005", ["The Regulatory Reform (Fire Safety) Order 2005", "The Fire Safety Regulations (Northern Ireland) 2010", "The Fire Precautions Act 1971"], "Scotland has its own fire safety legislation.", M1],
  ["Under the Fire Safety Order, who is mainly responsible for fire safety in a workplace?", "The Responsible Person, usually the employer or person in control of the premises", ["The local fire brigade", "Every employee equally", "The building's insurer"], "The Responsible Person must assess risks and put fire safety measures in place.", M1],
  ["What must the Responsible Person carry out to identify fire hazards and people at risk?", "A fire risk assessment", ["A building survey", "A health check", "A fire certificate application"], "The fire risk assessment is the foundation of workplace fire safety.", M1],
  ["When must the significant findings of a fire risk assessment be recorded?", "When there are five or more employees, or a licence or alterations notice applies", ["Only when there are more than 50 employees", "Never — they can be kept verbally", "Only after a fire has happened"], "This is a requirement of the Fire Safety Order.", M1],
  ["Who enforces fire safety law in most workplaces?", "The local Fire and Rescue Authority", ["The police", "The local council's planning department", "The Health and Safety Executive only"], "Fire and Rescue Authorities inspect premises and can issue notices.", M1],
  ["What duty do employees have under fire safety law?", "To take reasonable care and co-operate with the employer on fire safety", ["None — fire safety is only the employer's job", "To carry out the fire risk assessment", "To service fire extinguishers"], "Employees must also report serious dangers they notice.", M1],
  ["What is the main role of a fire marshal?", "To help prevent fires and lead the safe evacuation of their area", ["To fight any fire, whatever its size", "To investigate the cause of fires", "To replace the fire and rescue service"], "Fire marshals must never put themselves at risk.", M1],
  ["Should a fire marshal put themselves at risk to fight a large fire?", "No — their priority is getting people out safely", ["Yes, if they have an extinguisher", "Yes, if the building is valuable", "Only if the fire brigade is late"], "Life safety always comes first.", M1],
  ["The Fire Safety Act 2021 clarified that the Fire Safety Order applies to which parts of multi-occupied residential buildings?", "The structure, external walls and flat entrance doors", ["Only the gardens", "Only the car parks", "Only individual flat kitchens"], "This followed lessons from the Grenfell Tower fire.", M1],
  ["How often should a fire risk assessment be reviewed?", "Regularly, and whenever there are significant changes", ["Only once, when the building opens", "Every ten years", "Only after a fire"], "Changes to layout, use, people or processes can introduce new risks.", M1],
  ["Which of these could be a consequence of serious breaches of fire safety law?", "Unlimited fines and possible imprisonment", ["A warning only, never a fine", "A small fixed penalty only", "Loss of the building's postcode"], "Fire safety offences are taken very seriously.", M1],
  // M2 science
  ["What are the three sides of the fire triangle?", "Heat, fuel and oxygen", ["Heat, smoke and fuel", "Oxygen, water and fuel", "Flame, smoke and heat"], "Remove any one side and the fire goes out.", M2],
  ["Removing the heat from a fire to put it out is called", "cooling", ["smothering", "starving", "isolating"], "Water extinguishers work mainly by cooling.", M2],
  ["Removing the oxygen from a fire to put it out is called", "smothering", ["cooling", "starving", "ventilating"], "Fire blankets, foam and CO2 work by smothering.", M2],
  ["Removing the fuel from a fire to put it out is called", "starving", ["smothering", "cooling", "insulating"], "For example, turning off the gas supply.", M2],
  ["Heat travelling through a solid material such as a steel beam is called", "conduction", ["convection", "radiation", "direct burning"], "Heat can spread fire through walls and pipes this way.", M2],
  ["Hot smoke and gases rising and spreading across a ceiling is called", "convection", ["conduction", "radiation", "direct burning"], "Convection spreads fire up stairwells and lift shafts.", M2],
  ["Heat travelling in waves that can ignite materials across a room is called", "radiation", ["conduction", "convection", "direct burning"], "Radiated heat can ignite items without direct contact.", M2],
  ["What causes most deaths in fires?", "Smoke and toxic gases", ["Burns from flames", "Falling debris", "Explosions"], "Smoke contains toxic gases such as carbon monoxide.", M2],
  ["Which toxic gas in smoke is a major cause of death in fires?", "Carbon monoxide", ["Oxygen", "Nitrogen", "Helium"], "Carbon monoxide stops the blood carrying oxygen.", M2],
  ["Why should you never open a door to 'check' a fire you suspect is behind it?", "Fresh air can feed the fire and smoke and flames can rush out", ["It wastes time filling in forms", "It sets off the sprinklers", "It is always locked"], "Feel the door with the back of your hand; if warm, don't open it.", M2],
  ["What does the fourth side of the 'fire tetrahedron' represent?", "The chemical chain reaction", ["Smoke", "Water", "Ash"], "Some extinguishing agents, such as dry powder, interrupt the chain reaction.", M2],
  // M3 prevention
  ["Which of these is a common cause of fires in workplaces?", "Faulty or misused electrical equipment", ["Closed fire doors", "Clear escape routes", "Regular alarm tests"], "Report damaged cables and plugs straight away.", M3],
  ["What is 'daisy-chaining'?", "Plugging extension leads into other extension leads", ["Linking fire alarms together", "A type of evacuation drill", "Connecting sprinkler heads"], "It can overload circuits and cause fires.", M3],
  ["What is a permit-to-work system used for in fire safety?", "Controlling hot work such as welding, cutting and grinding", ["Allowing staff to smoke indoors", "Letting visitors use lifts in a fire", "Booking fire drills"], "A fire watch should continue during and after hot work.", M3],
  ["Why should a fire watch continue after hot work has finished?", "Smouldering materials can ignite some time later", ["To clean up the work area", "To check the worker's timesheet", "It is not necessary"], "Fires can start well after the work stops.", M3],
  ["Which is good housekeeping for fire safety?", "Keeping waste to a minimum and away from ignition sources", ["Storing boxes in escape corridors", "Wedging fire doors open for airflow", "Piling rubbish beside the building"], "Combustible waste is fuel for a fire.", M3],
  ["Deliberate fire-setting is known as", "arson", ["combustion", "convection", "ignition"], "Arson is a major cause of fires in commercial premises. Secure waste bins away from buildings.", M3],
  ["Where should external waste bins be kept to reduce the risk of arson?", "Secured and away from the building", ["Against the building wall under windows", "Inside escape routes", "Next to the fire exit doors"], "Bins near buildings are a common target for arsonists.", M3],
  ["What should you do if you notice a damaged electrical cable at work?", "Stop using it and report it", ["Wrap it in tape and carry on", "Ignore it if it still works", "Move it under a carpet"], "Damaged cables can overheat and start fires.", M3],
  ["Where should smoking be allowed at work?", "Only in designated areas with proper bins", ["Anywhere outdoors near the building", "In store rooms", "Near fire exits"], "Discarded smoking materials are a common cause of fire.", M3],
  // M4 alarms
  ["What should you do first if you discover a fire?", "Raise the alarm by operating the nearest fire alarm call point", ["Try to put it out before telling anyone", "Collect your belongings", "Phone a colleague to check"], "Raise the alarm first so everyone can get out.", M4],
  ["What is a manual call point?", "A device, often 'break glass', used to raise the fire alarm", ["An emergency telephone", "A sprinkler head", "A smoke detector"], "Call points are usually located by exits and on escape routes.", M4],
  ["How often should a workplace fire alarm normally be tested?", "Weekly", ["Monthly", "Every six months", "Yearly"], "Use a different call point each week on a rotation.", M4],
  ["When testing the fire alarm weekly, which call point should be used?", "A different call point each time, on a rotation", ["Always the same call point", "Any call point by the main entrance only", "No call point — just press the panel"], "This checks every call point over time.", M4],
  ["Emergency lighting should be given a short functional ('flick') test how often?", "Monthly", ["Weekly", "Every five years", "Only after a power cut"], "A full-duration test is done once a year.", M4],
  ["How often should emergency lighting have a full-duration test?", "Once a year", ["Every week", "Every month", "Every ten years"], "The full-duration test is usually 3 hours.", M4],
  ["What is the usual duration of an annual emergency lighting test?", "3 hours", ["10 minutes", "30 minutes", "24 hours"], "Most emergency lighting is designed to last 3 hours.", M4],
  ["Where are fire alarm tests, drills and training recorded?", "In the fire log book", ["In the accident book only", "On a staff noticeboard only", "They do not need recording"], "Records show the Responsible Person is meeting their duties.", M4],
  ["What does a heat detector respond to?", "A high temperature or a rapid rise in temperature", ["Smoke particles", "Movement", "Noise"], "Heat detectors are used in kitchens where smoke detectors would give false alarms.", M4],
  ["Why are heat detectors often used in kitchens instead of smoke detectors?", "To avoid false alarms from cooking fumes", ["They are cheaper to paint", "Smoke detectors don't work indoors", "Kitchens never have fires"], "Cooking fumes can trigger smoke detectors.", M4],
  // M5 doors, routes, signs
  ["What does 'FD30' on a fire door mean?", "The door is designed to resist fire for 30 minutes", ["The door must be checked every 30 days", "The door is 30 mm thick", "Only 30 people can use it"], "FD60 doors resist fire for 60 minutes.", M5],
  ["Should fire doors be wedged open?", "No, never", ["Yes, in hot weather", "Yes, if it's busy", "Only on weekdays"], "A wedged fire door can't stop fire and smoke spreading.", M5],
  ["What are intumescent strips on a fire door?", "Seals that expand when heated to close gaps", ["Strips that glow in the dark", "Handles that stay cool", "Locks that open automatically"], "They help stop fire and smoke passing around the door.", M5],
  ["When is it acceptable for a fire door to be held open?", "When fitted with an approved hold-open device that releases when the alarm sounds", ["When propped with a fire extinguisher", "When a sign says 'keep open'", "Never under any circumstances"], "Automatic release devices close the door when the alarm activates.", M5],
  ["What should final exit doors be like?", "Easy to open from the inside without a key", ["Locked at all times", "Only openable with a code", "Blocked when not in use"], "People must be able to escape quickly.", M5],
  ["Why must escape routes be kept clear?", "So people can get out quickly and safely in an emergency", ["To make cleaning easier only", "Because the law bans furniture", "To save energy"], "Obstructions slow evacuation and can add fuel.", M5],
  ["What does the green 'running man' sign show?", "A fire exit or escape route", ["Where to find a fire extinguisher", "A no-running area", "The assembly point only"], "Green signs show safe conditions.", M5],
  // M6 extinguishers
  ["In the UK, what colour is the body of a modern fire extinguisher?", "Red, with a coloured band showing the type", ["The full colour of its type", "Silver", "Green"], "The band colour identifies the extinguishing agent.", M6],
  ["Which extinguisher should NEVER be used on a fire involving live electrical equipment?", "Water", ["Carbon dioxide (CO2)", "Dry powder", "None — all are safe"], "Water conducts electricity and could cause electrocution.", M6],
  ["Which extinguisher must never be used on a burning chip pan or deep-fat fryer?", "Water", ["Wet chemical", "A fire blanket", "None"], "Water causes burning oil to erupt violently.", M6],
  ["Why is dry powder not recommended for use in small enclosed spaces indoors?", "It reduces visibility and can be inhaled", ["It is not effective on any fires", "It is explosive", "It freezes the air"], "Dry powder creates a dense cloud.", M6],
  ["What is the safest way to deal with a flammable gas (Class C) fire?", "Isolate the gas supply if it is safe to do so", ["Spray it with water", "Cover it with a wet towel", "Open all windows and wait"], "Extinguishing gas without stopping the supply can create an explosion risk.", M6],
  ["What does PASS stand for when using an extinguisher?", "Pull, Aim, Squeeze, Sweep", ["Push, Activate, Spray, Stop", "Point, Alert, Spray, Save", "Pull, Activate, Shout, Sweep"], "Aim at the base of the fire, not the flames.", M6],
  ["Where should you aim a fire extinguisher?", "At the base of the fire", ["At the top of the flames", "At the smoke", "At the ceiling"], "The base is where the fuel is burning.", M6],
  ["Before tackling a small fire with an extinguisher, what must you have?", "Raised the alarm, training, and a clear escape route behind you", ["Permission from your manager in writing", "Two extinguishers of every type", "Protective boots only"], "If in doubt, get out.", M6],
  ["What should you do if a fire is not going out after using an extinguisher?", "Leave, close the door behind you, and evacuate", ["Fetch another extinguisher and keep trying", "Open the windows", "Throw water on it"], "Never let a fire get between you and your exit.", M6],
  ["How should a fire blanket be used on a small pan fire?", "Turn off the heat if safe, place the blanket over the pan and leave it in place", ["Throw it at the pan from a distance", "Lift it off after a few seconds to check", "Soak it in water first"], "Leave it to cool for at least 30 minutes.", M6],
  ["A fire blanket can also be used on", "a person whose clothing is on fire", ["a gas leak", "a burning car engine", "an electrical substation"], "Wrap the person and lay them on the ground (stop, drop and roll).", M6],
  ["Electrical fires are", "not a class of their own but need extinguishers safe for electrical risks", ["Class E fires in the UK standard", "Class F fires", "Class A fires"], "CO2 is commonly used on electrical equipment.", M6],
  ["How often should fire extinguishers be serviced by a competent person?", "Once a year", ["Every week", "Every ten years", "Only after use"], "Staff should also check them visually between services.", M6],
  // M7 evacuation
  ["When the fire alarm sounds, what should you do with your belongings?", "Leave them and evacuate immediately", ["Collect them before leaving", "Ask a colleague to fetch them", "Wait for permission"], "Seconds count in a fire.", M7],
  ["Should you use a lift during a fire evacuation?", "No, unless it is a designated evacuation lift", ["Yes, it is the fastest way", "Yes, if you are on the top floor", "Only if it is empty"], "Ordinary lifts can fail or take you into smoke.", M7],
  ["During a sweep of your area, why should you close doors behind you?", "To slow the spread of fire and smoke", ["To lock out intruders", "To save heating", "To show the room is empty"], "Closed doors hold back smoke and fire.", M7],
  ["Which areas should a fire marshal check during a sweep?", "Toilets, meeting rooms, kitchens and storerooms in their area", ["Only the main office", "The whole building, every floor", "Only rooms with windows"], "Check places where people may not hear or notice the alarm.", M7],
  ["What number should be called to report a fire in the UK?", "999 (or 112)", ["101", "111", "911"], "Make sure the fire service has been called, even if the alarm is linked.", M7],
  ["At the assembly point, who should a fire marshal report to?", "The fire co-ordinator or person in charge", ["The first firefighter they see only", "Nobody — they can go home", "The building's receptionist only"], "Confirm whether your area is clear and report anyone missing.", M7],
  ["When can people re-enter a building after a fire alarm?", "Only when the Fire and Rescue Service or person in charge says it is safe", ["As soon as the alarm stops", "After 10 minutes", "When it starts to rain"], "The alarm stopping doesn't mean the danger has gone.", M7],
  ["What is a PEEP?", "A Personal Emergency Evacuation Plan for someone who needs help to evacuate", ["A type of fire alarm", "A fire extinguisher inspection", "A register of visitors"], "PEEPs are needed for people with mobility, sensory or other needs.", M7],
  ["What is a refuge area?", "A protected space where people who need help can wait safely for assisted evacuation", ["A smoking area", "A storage room for extinguishers", "The car park"], "Refuges are usually in protected stairways with a communication system.", M7],
  ["In a 'simultaneous' evacuation strategy", "everyone leaves the building at the same time", ["people stay in their flats", "floors leave one after another", "people move sideways to another compartment"], "This is the most common strategy in workplaces.", M7],
  ["In a 'phased' evacuation strategy", "floors or zones evacuate in a planned order", ["everyone leaves at once", "no one leaves", "only managers leave"], "Often used in tall buildings.", M7],
  ["'Horizontal progressive' evacuation, moving people to another fire compartment on the same floor, is common in", "hospitals and care homes", ["shops", "offices", "warehouses"], "Moving patients down stairs is slow and risky.", M7],
  ["A 'stay put' strategy is usually used in", "purpose-built blocks of flats designed with fire-resisting compartments", ["offices", "schools", "shopping centres"], "Each flat is designed to contain a fire for a period of time.", M7],
  ["How can a fire marshal account for visitors and contractors during an evacuation?", "By using the signing-in records", ["By guessing", "By phoning each visitor", "Visitors don't need accounting for"], "Bring the visitor book or check the electronic log at the assembly point.", M7],
  ["If you see smoke in a corridor during an evacuation, what should you do?", "Use an alternative escape route", ["Run through it quickly", "Wait in the corridor", "Open windows and continue"], "Smoke can overcome people very quickly.", M7],
  // M8 drills
  ["How often should a workplace fire drill be carried out at minimum?", "At least once a year", ["Every five years", "Only when new staff join", "Only after a real fire"], "Higher-risk premises or high staff turnover may need more frequent drills.", M8],
  ["Why should the results of a fire drill be recorded?", "To show compliance and identify problems to fix", ["To decide staff bonuses", "Because the alarm company requires it", "It is not necessary"], "Record timings and any problems found.", M8],
  ["Which of these should be reviewed after a fire drill?", "How long the evacuation took and any obstacles found", ["The colour of the fire doors", "Staff lunch breaks", "The building's postcode"], "Use lessons learned to update the plan.", M8],
  ["Which change should trigger a review of the fire risk assessment?", "Building work or a change in layout", ["A new tea supplier", "A staff birthday", "A change of logo"], "Significant changes can create new fire risks.", M8],
  ["What should staff do if they find a fire extinguisher missing or discharged?", "Report it so it can be replaced", ["Ignore it", "Hide it", "Refill it with water"], "Every extinguisher must be ready for use.", M8],
  ["How long is a Mock Night Fire Marshal certificate valid for?", "12 months", ["1 month", "5 years", "For life"], "Refresher training keeps your knowledge current.", M8],
];

export function fireSafety(): Q[] {
  const qs: Q[] = [];
  const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

  qs.push(
    ...EXT.map((e) => mcq(S, M6, `What colour is the band on a ${e[0].replace(/^./, (c) => c.toLowerCase())} extinguisher?`, cap(e[1]), others(EXT, e, (x) => cap(x[1])), `${e[0]} = ${e[1]} band. It is suitable for ${e[2]}.`, 1)),
    ...EXT.map((e) => mcq(S, M6, `A ${e[0].replace(/^./, (c) => c.toLowerCase())} extinguisher is mainly suitable for`, e[2], others(EXT, e, (x) => x[2]), `${e[0]} (${e[1]} band): ${e[2]}.`, 1)),
    ...EXT.map((e) => mcq(S, M6, `An extinguisher with a ${e[1]} band contains`, e[0], others(EXT, e, (x) => x[0]), `${cap(e[1])} band = ${e[0]}.`, 1)),
    ...CLASSES.map((c) => mcq(S, M6, `${c[0]} fires involve`, c[1], others(CLASSES, c, (x) => x[1]), `${c[0]}: ${c[1]}.`, 1)),
    ...CLASSES.map((c) => mcq(S, M6, `A fire involving ${c[1]} is classed as`, c[0], others(CLASSES, c, (x) => x[0]), `${cap(c[1])} → ${c[0]}.`, 1)),
    ...SIGNS.map((s) => mcq(S, M5, `What does ${s[0]} indicate?`, s[1], others(SIGNS, s, (x) => x[1]), `${cap(s[0])}: ${s[1]}.`, 1)),
    ...SIGNS.map((s) => mcq(S, M5, `Which type of sign shows ${s[1]}?`, cap(s[0]), others(SIGNS, s, (x) => cap(x[0])), `${cap(s[0])}: ${s[1]}.`, 1)),
  );

  // Which extinguisher for this situation?
  const ANY = "Any extinguisher — they all work the same";
  const SCEN: [string, string, string[]][] = [
    ["a small fire in a waste-paper bin", "Water", ["Carbon dioxide (CO2)", ANY, "Dry powder in a small room"]],
    ["a fire in a deep-fat fryer", "Wet chemical", ["Water", "Foam", "Carbon dioxide (CO2)"]],
    ["a fire in a computer that may still be plugged in", "Carbon dioxide (CO2)", ["Water", "Foam", "Wet chemical"]],
    ["a small petrol spill fire in a workshop", "Foam", ["Water", "Wet chemical", ANY]],
    ["burning curtains in an office", "Water", ["Carbon dioxide (CO2)", ANY, "Dry powder in a small room"]],
    ["a fire in an electrical distribution board", "Carbon dioxide (CO2)", ["Water", "Foam", "Wet chemical"]],
    ["burning cooking oil in a restaurant kitchen", "Wet chemical", ["Water", "Carbon dioxide (CO2)", "Foam"]],
    ["a small fire involving paint thinners", "Foam", ["Water", "Wet chemical", ANY]],
  ];
  qs.push(...SCEN.map(([sit, right, wrong]) => mcq(S, M6, `Which extinguisher is most suitable for ${sit}?`, right, wrong, `For ${sit}, use ${right}.`, 2)));

  qs.push(...FACTS.map(([b, c, d, e, t]) => mcq(S, t, b, c, d, e, 1)));

  // True / false
  const TF: [string, boolean, string, string][] = [
    ["Fire doors may be wedged open if it is a hot day.", false, "Fire doors must never be wedged open.", M5],
    ["You should raise the alarm before trying to tackle a fire.", true, "Raise the alarm first so everyone can escape.", M6],
    ["Water extinguishers are safe on electrical fires.", false, "Water conducts electricity.", M6],
    ["Most fire deaths are caused by smoke rather than flames.", true, "Smoke contains toxic gases.", M2],
    ["Lifts should normally be used to evacuate quickly during a fire.", false, "Only designated evacuation lifts should be used.", M7],
    ["The fire alarm should be tested weekly.", true, "Use a different call point each time.", M4],
    ["Employees have no legal duties regarding fire safety.", false, "They must take reasonable care and co-operate.", M1],
    ["A fire marshal should check toilets and meeting rooms during an evacuation if it is safe.", true, "People may not have heard the alarm.", M7],
    ["Once the alarm stops, everyone can go back inside.", false, "Wait until the fire service or person in charge says it is safe.", M7],
    ["A wet chemical extinguisher is designed for cooking oil fires.", true, "Wet chemical (yellow band) is for Class F fires.", M6],
    ["Emergency lighting only needs testing when it fails.", false, "Monthly flick tests and an annual full-duration test.", M4],
    ["Fire drills should be recorded in the fire log book.", true, "Records show compliance and lessons learned.", M8],
    ["Daisy-chaining extension leads is a safe way to add more sockets.", false, "It can overload circuits and cause fires.", M3],
    ["The fire triangle is made up of heat, fuel and oxygen.", true, "Remove one side to put the fire out.", M2],
    ["A CO2 extinguisher has a black band.", true, "CO2 = black band.", M6],
    ["Dry powder extinguishers are ideal for use in small enclosed offices.", false, "Powder reduces visibility and can be inhaled.", M6],
  ];
  qs.push(...TF.map(([stmt, t, e, topic]) => mcq(S, topic, `TRUE or FALSE? "${stmt}"`, t ? "True" : "False", [t ? "False" : "True"], e, 1, 2)));

  return qs;
}
