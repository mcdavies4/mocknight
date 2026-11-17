// United States and India starter banks:
//   GSS — GED Social Studies (US civics, history, economics)   GSC — General science (GED Science / ASVAB GS)
//   TSC — ATI TEAS science (anatomy & physiology, biology, chemistry)   CNA — Certified nursing assistant
//   AMC — ASVAB Mechanical Comprehension   AEI — ASVAB Electronics Information
//   IPL — Indian Polity   IEC — Indian Economy   ENV — Environment & Ecology   CDP — Child Development & Pedagogy (CTET)
// Established facts only; calculations are generated so answers are exact.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;

// ============================================================================ GSS
const GSS: F[] = [
  ["Founding documents", "The Declaration of Independence was adopted in", "1776", ["1787", "1791", "1812"], "It was adopted on 4 July 1776; Thomas Jefferson was its main author."],
  ["Founding documents", "Who was the main author of the Declaration of Independence?", "Thomas Jefferson", ["George Washington", "Benjamin Franklin", "John Adams"], "Franklin and Adams helped edit it."],
  ["Founding documents", "The first ten amendments to the US Constitution are called", "the Bill of Rights", ["the Articles of Confederation", "the Federalist Papers", "the Preamble"], "They were ratified in 1791."],
  ["Founding documents", "The First Amendment protects", "freedom of speech, religion, the press, assembly and petition", ["the right to bear arms", "the right to a jury trial only", "the right to vote at 18"], "The Second Amendment covers the right to bear arms."],
  ["Founding documents", "The government that came before the Constitution was set up by the", "Articles of Confederation", ["Bill of Rights", "Mayflower Compact", "Emancipation Proclamation"], "Its weak central government led to the Constitutional Convention of 1787."],
  ["Founding documents", "The idea that government gets its power from the people is called", "popular sovereignty", ["judicial review", "federalism", "manifest destiny"], "The Constitution opens with 'We the People'."],
  ["Government", "Dividing power between the federal government and the states is called", "federalism", ["checks and balances", "separation of powers", "popular sovereignty"], "Some powers are shared; others belong to one level."],
  ["Government", "The president can veto a bill, and Congress can override the veto. This is an example of", "checks and balances", ["federalism", "judicial review", "due process"], "Each branch can limit the others."],
  ["Government", "Which branch of government makes federal laws?", "Congress (the legislative branch)", ["The president", "The Supreme Court", "The cabinet"], "Congress is the Senate plus the House of Representatives."],
  ["Government", "How many voting members does the House of Representatives have?", "435", ["100", "50", "538"], "Seats are shared out by state population."],
  ["Government", "How many US senators are there?", "100", ["435", "50", "538"], "Each state has two senators."],
  ["Government", "A US senator is elected for", "6 years", ["2 years", "4 years", "8 years"], "Representatives serve 2 years and the president 4."],
  ["Government", "Members of the House of Representatives are elected for", "2 years", ["4 years", "6 years", "life"], "The whole House is elected every two years."],
  ["Government", "How many justices sit on the Supreme Court?", "9", ["7", "11", "12"], "The number is set by Congress and has been nine since 1869."],
  ["Government", "The power of courts to strike down laws that break the Constitution is", "judicial review", ["executive order", "impeachment", "filibuster"], "It was established in Marbury v. Madison (1803)."],
  ["Government", "Who becomes president if the president can no longer serve?", "The vice president", ["The Speaker of the House", "The Chief Justice", "The Secretary of State"], "The Speaker is next after the vice president."],
  ["Government", "The president is chosen by", "the Electoral College", ["the Senate", "the Supreme Court", "a direct national vote only"], "A candidate needs 270 of the 538 electoral votes."],
  ["Government", "The House of Representatives' power to bring charges against a federal official is called", "impeachment", ["ratification", "veto", "filibuster"], "The Senate then holds the trial."],
  ["Amendments", "Which amendment abolished slavery?", "The 13th Amendment", ["The 14th Amendment", "The 15th Amendment", "The 19th Amendment"], "It was ratified in 1865."],
  ["Amendments", "Which amendment gave women the right to vote?", "The 19th Amendment", ["The 15th Amendment", "The 26th Amendment", "The 13th Amendment"], "It was ratified in 1920."],
  ["Amendments", "The 14th Amendment guarantees citizens", "equal protection of the laws", ["the right to bear arms", "freedom of religion", "the vote at 18"], "It was ratified in 1868."],
  ["Amendments", "The 26th Amendment lowered the voting age to", "18", ["16", "21", "25"], "It was ratified in 1971."],
  ["History", "The US Civil War was fought from", "1861 to 1865", ["1776 to 1783", "1812 to 1815", "1914 to 1918"], "The Union defeated the Confederacy."],
  ["History", "The Emancipation Proclamation was issued by", "Abraham Lincoln", ["George Washington", "Thomas Jefferson", "Ulysses S. Grant"], "It was issued in 1863."],
  ["History", "The Louisiana Purchase of 1803 bought land from", "France", ["Spain", "Britain", "Mexico"], "It roughly doubled the size of the United States."],
  ["History", "The Great Depression began with the stock market crash of", "1929", ["1919", "1941", "1945"], "It lasted through the 1930s."],
  ["History", "The New Deal programmes of the 1930s were led by", "Franklin D. Roosevelt", ["Herbert Hoover", "Woodrow Wilson", "Harry Truman"], "They aimed at relief, recovery and reform."],
  ["History", "The US entered World War II after the attack on", "Pearl Harbor", ["Fort Sumter", "the Lusitania", "Normandy"], "Japan attacked Pearl Harbor on 7 December 1941."],
  ["History", "Brown v. Board of Education (1954) ruled that", "racial segregation in public schools was unconstitutional", ["women could vote", "slavery was illegal", "the president could be impeached"], "It overturned 'separate but equal' in public education."],
  ["History", "The Civil Rights Act of 1964 banned", "discrimination based on race, colour, religion, sex or national origin", ["slavery", "child labour", "voting under 21"], "It was signed by Lyndon B. Johnson."],
  ["History", "The Cold War was mainly a rivalry between the United States and", "the Soviet Union", ["Germany", "Japan", "Britain"], "It lasted from about 1947 to 1991."],
  ["Economics", "When the price of a good rises and everything else stays the same, the quantity demanded usually", "falls", ["rises", "stays the same", "doubles"], "This is the law of demand."],
  ["Economics", "The value of the next best alternative you give up is the", "opportunity cost", ["sunk cost", "profit", "interest"], "Every choice has an opportunity cost."],
  ["Economics", "A general rise in prices over time is", "inflation", ["deflation", "recession", "a surplus"], "It reduces what money can buy."],
  ["Economics", "The central bank of the United States is the", "Federal Reserve", ["Treasury", "Internal Revenue Service", "Securities and Exchange Commission"], "It sets monetary policy, including interest rates."],
  ["Economics", "When supply is greater than demand at the current price, there is a", "surplus", ["shortage", "monopoly", "tariff"], "Prices tend to fall until the market clears."],
  ["Economics", "A tax on imported goods is a", "tariff", ["subsidy", "dividend", "quota"], "A quota limits the quantity imported instead."],
  ["Economics", "The total value of goods and services produced in a country in a year is", "gross domestic product (GDP)", ["the national debt", "the trade balance", "the inflation rate"], "Two quarters of falling GDP is a common definition of recession."],
  ["Geography", "Lines of latitude measure distance", "north or south of the equator", ["east or west of the Prime Meridian", "above sea level", "between time zones only"], "Longitude measures east or west."],
  ["Geography", "The longest river system in the United States is the", "Missouri–Mississippi", ["Colorado", "Hudson", "Rio Grande"], "It drains much of the central US."],
];
function gssData(): Q[] {
  return repeat(16, () => {
    const a = ri(20, 90) * 10, pct = pick([10, 20, 25, 40, 50]), up = pick([true, false]);
    const b = up ? a * (1 + pct / 100) : a * (1 - pct / 100);
    const what = pick(["voter turnout (thousands)", "unemployment claims", "exports ($ millions)", "housing permits"]);
    return mcq("GSS", "Reading data", `A chart shows ${what} went from ${fmt(a)} in one year to ${fmt(b)} the next. What was the percentage change?`, `${up ? "+" : "−"}${pct}%`, [`${up ? "−" : "+"}${pct}%`, `${up ? "+" : "−"}${pct * 2}%`, `${up ? "+" : "−"}${Math.round(Math.abs(b - a))}%`, `${up ? "+" : "−"}${pct / 2}%`], `Change = ${fmt(Math.abs(b - a))} ÷ ${fmt(a)} = ${pct}%, ${up ? "an increase" : "a decrease"}.`, 2);
  });
}

// ============================================================================ GSC
const GSC: F[] = [
  ["Life science", "Photosynthesis takes place in the", "chloroplasts", ["mitochondria", "nucleus", "ribosomes"], "Chlorophyll in chloroplasts captures light energy."],
  ["Life science", "Cellular respiration releases energy in the", "mitochondria", ["chloroplasts", "cell wall", "vacuole"], "Mitochondria are called the powerhouse of the cell."],
  ["Life science", "Plants take in which gas for photosynthesis?", "Carbon dioxide", ["Oxygen", "Nitrogen", "Hydrogen"], "They release oxygen as a by-product."],
  ["Life science", "The genetic material in cells is", "DNA", ["ATP", "glucose", "cellulose"], "Genes are sections of DNA."],
  ["Life science", "Cell division that makes two identical body cells is", "mitosis", ["meiosis", "fertilisation", "osmosis"], "Meiosis makes sex cells with half the chromosomes."],
  ["Life science", "Organisms that make their own food are", "producers", ["consumers", "decomposers", "predators"], "Plants and algae are producers."],
  ["Life science", "Bacteria and fungi that break down dead matter are", "decomposers", ["producers", "herbivores", "parasites"], "They recycle nutrients into the soil."],
  ["Life science", "The body keeping a stable internal environment is called", "homeostasis", ["metabolism", "evolution", "adaptation"], "Body temperature regulation is an example."],
  ["Life science", "Natural selection means organisms with helpful traits", "are more likely to survive and reproduce", ["choose to change their genes", "never die", "stop evolving"], "This is Darwin's theory of evolution."],
  ["Life science", "A dominant allele is", "expressed when at least one copy is present", ["only expressed with two copies", "never expressed", "found only in males"], "Recessive traits need two copies."],
  ["Physical science", "Newton's first law says an object keeps its motion unless", "a net force acts on it", ["it is heavy", "it is in space", "it is moving fast"], "This is the law of inertia."],
  ["Physical science", "Newton's second law is", "F = ma", ["E = mc²", "V = IR", "P = mv only"], "Force equals mass times acceleration."],
  ["Physical science", "For every action there is an equal and opposite reaction. This is Newton's", "third law", ["first law", "second law", "law of gravity"], "Rocket engines rely on it."],
  ["Physical science", "Energy stored because of an object's height is", "gravitational potential energy", ["kinetic energy", "thermal energy", "sound energy"], "It turns into kinetic energy as the object falls."],
  ["Physical science", "Energy cannot be created or destroyed, only changed in form. This is the", "law of conservation of energy", ["law of inertia", "law of demand", "law of gravity"], "Total energy in a closed system stays the same."],
  ["Physical science", "The change from liquid to gas is", "evaporation", ["condensation", "freezing", "melting"], "Condensation is gas to liquid."],
  ["Physical science", "Heat transfer through direct contact is", "conduction", ["convection", "radiation", "insulation"], "Convection moves heat through fluids; radiation through waves."],
  ["Physical science", "On the pH scale, a solution with pH 2 is", "strongly acidic", ["neutral", "strongly basic", "weakly basic"], "pH 7 is neutral; below 7 is acidic."],
  ["Physical science", "A substance made of only one type of atom is", "an element", ["a compound", "a mixture", "a solution"], "Compounds contain two or more elements chemically joined."],
  ["Earth and space", "The theory that Earth's crust is made of moving plates is", "plate tectonics", ["the big bang", "continental gravity", "erosion theory"], "Plate movement causes earthquakes and volcanoes."],
  ["Earth and space", "The layer of Earth we live on is the", "crust", ["mantle", "outer core", "inner core"], "It is the thinnest layer."],
  ["Earth and space", "Earth's seasons are caused by", "the tilt of Earth's axis", ["Earth's distance from the Sun", "the Moon's phases", "ocean currents"], "The tilt changes how directly sunlight hits each hemisphere."],
  ["Earth and space", "One full spin of Earth on its axis takes about", "24 hours", ["365 days", "28 days", "12 hours"], "One orbit of the Sun takes about 365 days."],
  ["Earth and space", "Which gas makes up most of Earth's atmosphere?", "Nitrogen", ["Oxygen", "Carbon dioxide", "Argon"], "About 78% nitrogen and 21% oxygen."],
  ["Earth and space", "The main greenhouse gas released by burning fossil fuels is", "carbon dioxide", ["oxygen", "nitrogen", "helium"], "It traps heat in the atmosphere."],
  ["Scientific method", "In an experiment, the variable the scientist changes on purpose is the", "independent variable", ["dependent variable", "control variable", "constant"], "The dependent variable is what is measured."],
  ["Scientific method", "The group in an experiment that does not get the treatment is the", "control group", ["experimental group", "sample", "hypothesis"], "It gives a baseline for comparison."],
  ["Scientific method", "A testable prediction is a", "hypothesis", ["theory", "law", "conclusion"], "A theory is a well-tested explanation."],
];
function gscCalc(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(8, () => {
    const m = ri(2, 20), v = ri(1, 5) * 2, d = r(m / v, 2);
    return mcq("GSC", "Calculations", `An object has a mass of ${m} g and a volume of ${v} cm³. What is its density?`, `${fmt(d)} g/cm³`, numOpts(d, [r(v / m, 2), m * v, m + v], "g/cm³"), `Density = mass ÷ volume = ${m} ÷ ${v} = ${fmt(d)} g/cm³.`, 1);
  }));
  out.push(...repeat(8, () => {
    const d = ri(3, 30) * 10, t = pick([2, 4, 5, 10]), s = r(d / t, 2);
    return mcq("GSC", "Calculations", `A car travels ${d} miles in ${t} hours. What is its average speed?`, `${fmt(s)} mph`, numOpts(s, [d * t, r(t / d, 3), d - t], "mph"), `Speed = distance ÷ time = ${d} ÷ ${t} = ${fmt(s)} mph.`, 1);
  }));
  out.push(...repeat(8, () => {
    const m = ri(2, 12), a = ri(2, 9), f = m * a;
    return mcq("GSC", "Calculations", `What net force is needed to accelerate a ${m} kg object at ${a} m/s²?`, `${f} N`, numOpts(f, [m + a, r(m / a, 2), f * 2], "N"), `F = ma = ${m} × ${a} = ${f} N.`, 2);
  }));
  out.push(...repeat(6, () => {
    const pair = pick([["Tt", "Tt", "25%"], ["Tt", "tt", "50%"], ["TT", "tt", "0%"], ["Tt", "TT", "0%"]] as const);
    return mcq("GSC", "Genetics", `Tall (T) is dominant over short (t). Two plants, ${pair[0]} × ${pair[1]}, are crossed. What percentage of offspring are expected to be short?`, pair[2], ["25%", "50%", "75%", "0%", "100%"].filter((x) => x !== pair[2]), `Draw a Punnett square: short plants need tt. For ${pair[0]} × ${pair[1]} that is ${pair[2]} of the offspring.`, 2);
  }));
  return out;
}

// ============================================================================ TSC
const TSC: F[] = [
  ["Cardiovascular", "How many chambers does the human heart have?", "4", ["2", "3", "6"], "Two atria and two ventricles."],
  ["Cardiovascular", "Which chamber pumps oxygenated blood to the body?", "Left ventricle", ["Right ventricle", "Left atrium", "Right atrium"], "It has the thickest muscular wall."],
  ["Cardiovascular", "Deoxygenated blood returns to the heart through the vena cava into the", "right atrium", ["left atrium", "left ventricle", "aorta"], "It then passes to the right ventricle and on to the lungs."],
  ["Cardiovascular", "Blood vessels that carry blood away from the heart are", "arteries", ["veins", "capillaries", "venules"], "Veins carry blood back to the heart."],
  ["Cardiovascular", "The pulmonary artery carries", "deoxygenated blood to the lungs", ["oxygenated blood to the body", "oxygenated blood to the heart", "lymph"], "It is the only artery carrying deoxygenated blood (after birth)."],
  ["Cardiovascular", "Gas and nutrient exchange with tissues happens in the", "capillaries", ["arteries", "veins", "aorta"], "Capillary walls are one cell thick."],
  ["Blood", "Red blood cells carry oxygen using", "haemoglobin", ["insulin", "fibrin", "antibodies"], "Haemoglobin contains iron."],
  ["Blood", "Platelets mainly help with", "blood clotting", ["carrying oxygen", "fighting infection", "making hormones"], "White blood cells fight infection."],
  ["Respiratory", "Gas exchange in the lungs happens in the", "alveoli", ["bronchi", "trachea", "larynx"], "Oxygen diffuses into capillaries around the alveoli."],
  ["Respiratory", "The main muscle of breathing is the", "diaphragm", ["biceps", "intercostal fat", "pectoralis major"], "It contracts and flattens to draw air in."],
  ["Digestive", "Most nutrient absorption happens in the", "small intestine", ["stomach", "large intestine", "oesophagus"], "Villi increase its surface area."],
  ["Digestive", "Bile is made by the liver and stored in the", "gallbladder", ["pancreas", "spleen", "stomach"], "Bile emulsifies fats."],
  ["Digestive", "Salivary amylase begins the digestion of", "carbohydrates (starch)", ["proteins", "fats", "vitamins"], "Pepsin in the stomach starts protein digestion."],
  ["Digestive", "The large intestine mainly absorbs", "water", ["protein", "glucose", "bile"], "It forms and stores faeces."],
  ["Urinary", "The functional unit of the kidney is the", "nephron", ["neuron", "alveolus", "villus"], "Nephrons filter blood and form urine."],
  ["Urinary", "Urine passes from the kidneys to the bladder through the", "ureters", ["urethra", "renal artery", "nephrons"], "The urethra carries urine out of the body."],
  ["Endocrine", "Insulin is produced by the", "pancreas", ["liver", "thyroid", "adrenal glands"], "It lowers blood glucose."],
  ["Endocrine", "The gland often called the 'master gland' is the", "pituitary", ["thyroid", "adrenal", "pineal"], "It controls many other glands."],
  ["Endocrine", "The thyroid gland mainly regulates", "metabolism", ["blood clotting", "digestion of fat", "vision"], "Thyroid hormones set the metabolic rate."],
  ["Endocrine", "Adrenaline (epinephrine) is released by the", "adrenal glands", ["pituitary", "pancreas", "ovaries"], "It drives the fight-or-flight response."],
  ["Nervous", "The basic cell of the nervous system is the", "neuron", ["nephron", "osteocyte", "erythrocyte"], "Dendrites receive signals; the axon sends them."],
  ["Nervous", "The central nervous system is made up of", "the brain and spinal cord", ["the nerves in the limbs", "the heart and lungs", "the eyes and ears"], "The peripheral nervous system is everything else."],
  ["Nervous", "The part of the brain that coordinates balance and movement is the", "cerebellum", ["cerebrum", "medulla", "hypothalamus"], "The medulla controls breathing and heart rate."],
  ["Skeletal and muscular", "How many bones are in the adult human body?", "206", ["106", "300", "212"], "Babies are born with more, which fuse."],
  ["Skeletal and muscular", "The longest bone in the body is the", "femur", ["tibia", "humerus", "spine"], "It is the thigh bone."],
  ["Skeletal and muscular", "Muscles are attached to bones by", "tendons", ["ligaments", "cartilage", "nerves"], "Ligaments join bone to bone."],
  ["Skeletal and muscular", "Muscle found only in the heart is", "cardiac muscle", ["skeletal muscle", "smooth muscle", "voluntary muscle"], "It contracts without conscious control."],
  ["Integumentary", "The largest organ of the human body is the", "skin", ["liver", "lungs", "brain"], "It protects, regulates temperature and senses."],
  ["Immune", "Antibodies are produced by", "B lymphocytes (B cells)", ["red blood cells", "platelets", "neurons"], "They target specific antigens."],
  ["Reproductive", "Fertilisation in humans usually takes place in the", "fallopian tube", ["uterus", "ovary", "cervix"], "The embryo then implants in the uterus."],
  ["Anatomical terms", "In anatomical terms, 'distal' means", "farther from the point of attachment", ["closer to the midline", "toward the head", "toward the back"], "The hand is distal to the elbow."],
  ["Anatomical terms", "'Proximal' means", "closer to the point of attachment", ["toward the feet", "on the side", "toward the front"], "The knee is proximal to the ankle."],
  ["Anatomical terms", "'Anterior' means", "toward the front of the body", ["toward the back", "toward the head", "toward the side"], "Posterior means toward the back."],
  ["Anatomical terms", "'Medial' means", "toward the midline of the body", ["away from the midline", "toward the surface", "toward the feet"], "Lateral means away from the midline."],
  ["Anatomical terms", "The plane that divides the body into left and right parts is the", "sagittal plane", ["transverse plane", "frontal plane", "coronal plane"], "The frontal (coronal) plane divides front and back."],
  ["Anatomical terms", "The plane that divides the body into upper and lower parts is the", "transverse plane", ["sagittal plane", "frontal plane", "median plane"], "It is also called the horizontal plane."],
  ["Chemistry", "The particle in the nucleus with no charge is the", "neutron", ["proton", "electron", "ion"], "Protons are positive; electrons are negative."],
  ["Chemistry", "The atomic number of an element is its number of", "protons", ["neutrons", "electrons in the outer shell", "isotopes"], "Mass number = protons + neutrons."],
  ["Chemistry", "A bond formed when atoms share electrons is", "covalent", ["ionic", "metallic", "hydrogen"], "Ionic bonds form when electrons are transferred."],
  ["Chemistry", "A solution with pH 9 is", "basic (alkaline)", ["acidic", "neutral", "a salt"], "Above 7 is basic; below 7 is acidic."],
  ["Chemistry", "Which is a physical change?", "Ice melting", ["Wood burning", "Iron rusting", "Milk souring"], "No new substance forms in a physical change."],
  ["Scientific reasoning", "A conclusion is most reliable when an experiment is", "repeated with consistent results", ["done once", "done without a control", "changed between trials"], "Replication reduces chance effects."],
];
function tscCalc(): Q[] {
  const conv: [string, string, number][] = [["g", "mg", 1000], ["L", "mL", 1000], ["kg", "g", 1000], ["m", "cm", 100], ["cm", "mm", 10]];
  return repeat(14, () => {
    const [a, b, f] = pick(conv);
    const v = pick([0.25, 0.5, 1.5, 2, 2.5, 3.2, 4, 7.5]);
    const ans = r(v * f, 3);
    return mcq("TSC", "Measurement", `Convert ${fmt(v)} ${a} to ${b}.`, `${fmt(ans)} ${b}`, numOpts(ans, [r(v / f, 5), r(v * f / 10, 3), r(v * f * 10, 3)], b), `1 ${a} = ${f} ${b}, so ${fmt(v)} × ${f} = ${fmt(ans)} ${b}.`, 1);
  });
}

// ============================================================================ CNA
const CNA: F[] = [
  ["Infection control", "The single most important way to prevent the spread of infection is", "hand hygiene", ["wearing a gown", "opening windows", "giving antibiotics"], "Wash hands before and after every resident contact."],
  ["Infection control", "When washing hands with soap and water, scrub for at least", "20 seconds", ["5 seconds", "2 minutes", "1 second"], "Clean between fingers, under nails and the wrists."],
  ["Infection control", "Standard precautions treat", "all blood and body fluids as potentially infectious", ["only patients with known infections", "only blood", "only visitors"], "They apply to every resident."],
  ["Infection control", "When removing PPE, which item usually comes off first?", "Gloves", ["Mask", "Goggles", "Gown ties at the neck"], "Gloves are the most contaminated."],
  ["Infection control", "Used needles and sharps go into", "a puncture-resistant sharps container", ["the regular trash", "a laundry bag", "the sink"], "Never recap a used needle."],
  ["Resident rights", "A resident refuses a bath. You should", "respect the refusal and report it to the nurse", ["give the bath anyway", "ignore it and leave the room", "tell the family to make them"], "Residents have the right to refuse care."],
  ["Resident rights", "Before giving care, the nurse aide should", "knock, introduce themselves and explain the procedure", ["start immediately to save time", "only speak to the nurse", "ask the family's permission"], "This respects privacy and dignity."],
  ["Resident rights", "Sharing a resident's health information with a friend breaks", "confidentiality (HIPAA)", ["OBRA staffing rules", "the scope of the nurse", "nothing if the friend is kind"], "Only share information with the care team."],
  ["Resident rights", "If you suspect a resident is being abused, you must", "report it to the nurse or supervisor right away", ["confront the abuser", "wait until you are sure", "tell other residents"], "Nurse aides are mandated reporters."],
  ["Resident rights", "Restraints can only be used", "with a doctor's order, as a last resort", ["whenever a resident wanders", "as punishment", "to save staff time"], "Residents have the right to be free from unnecessary restraints."],
  ["Safety", "To prevent falls, the bed should be left", "in the lowest position with wheels locked", ["at the highest position", "with wheels unlocked", "with all side rails up always"], "Keep the call light within reach too."],
  ["Safety", "The call light should always be", "within the resident's reach", ["turned off", "on the nightstand across the room", "removed at night"], "It is the resident's way to ask for help."],
  ["Safety", "In a fire, the first step in RACE is", "Rescue anyone in immediate danger", ["Alarm", "Contain", "Extinguish"], "RACE: Rescue, Alarm, Contain, Extinguish/Evacuate."],
  ["Safety", "PASS for using a fire extinguisher stands for", "Pull, Aim, Squeeze, Sweep", ["Push, Aim, Spray, Stop", "Pull, Alarm, Spray, Sweep", "Point, Aim, Shoot, Stop"], "Aim at the base of the fire."],
  ["Safety", "A resident is choking and cannot speak or cough. You should", "call for help and give abdominal thrusts", ["give them water", "slap them on the face", "wait for it to pass"], "If they become unresponsive, start CPR and activate emergency response."],
  ["Mobility", "When helping a resident walk, use", "a gait (transfer) belt", ["the resident's arm only", "their clothing", "no support"], "Stand on the resident's weaker side."],
  ["Mobility", "When dressing a resident with weakness on one side, dress", "the weak side first", ["the strong side first", "both sides at once", "only the strong side"], "Undress the strong side first."],
  ["Mobility", "Turning a resident at least every 2 hours helps prevent", "pressure ulcers", ["dehydration", "infection of the eyes", "hearing loss"], "Check bony areas such as heels, hips and the sacrum."],
  ["Positioning", "Fowler's position is", "sitting with the head of the bed raised about 45–60 degrees", ["lying flat on the back", "lying on the stomach", "lying on the left side"], "It helps breathing and eating."],
  ["Positioning", "Lying flat on the back is the", "supine position", ["prone position", "Sims' position", "Fowler's position"], "Prone is lying on the stomach."],
  ["Positioning", "Sims' position is", "lying on the left side with the upper leg bent", ["sitting upright", "lying on the stomach", "lying flat on the back"], "It is used for enemas and rectal care."],
  ["Vital signs", "A normal adult resting pulse is", "60–100 beats per minute", ["30–50 beats per minute", "110–150 beats per minute", "12–20 beats per minute"], "12–20 is the normal breathing rate."],
  ["Vital signs", "A normal adult respiratory rate is", "12–20 breaths per minute", ["4–8 breaths per minute", "30–40 breaths per minute", "60–100 breaths per minute"], "Count for a full minute if irregular."],
  ["Vital signs", "A normal oral temperature is about", "98.6 °F (37 °C)", ["95 °F (35 °C)", "101 °F (38.3 °C)", "104 °F (40 °C)"], "Report a fever to the nurse."],
  ["Vital signs", "The most accurate site for a temperature reading is usually", "rectal", ["oral", "axillary", "the forehead with your hand"], "Axillary (armpit) is the least accurate."],
  ["Personal care", "A urinary drainage bag should be kept", "below the level of the bladder", ["above the bladder", "on the bed", "on the floor"], "This stops urine flowing back and causing infection."],
  ["Personal care", "When giving perineal care to a female resident, wipe", "from front to back", ["from back to front", "in circles", "in any direction"], "This prevents bacteria spreading to the urethra."],
  ["Personal care", "When giving mouth care to an unconscious resident, position them", "on their side with the head turned", ["flat on their back", "sitting fully upright", "prone"], "This prevents aspiration."],
  ["Nutrition", "Intake and output (I&O) records track", "fluids taken in and fluids lost", ["calories eaten only", "weight only", "visitors"], "Report big differences to the nurse."],
  ["Communication", "When talking to a resident with dementia, it helps to", "use short, simple sentences and stay calm", ["argue to correct them", "speak quickly", "ask many questions at once"], "Approach from the front and use their name."],
  ["Communication", "For a resident with a hearing loss, you should", "face them and speak clearly in a normal tone", ["shout", "talk from behind them", "cover your mouth"], "Reduce background noise."],
  ["Role", "Which task is outside a nurse aide's scope?", "Giving medications", ["Taking vital signs", "Helping with meals", "Making an occupied bed"], "Medication administration needs a licensed nurse (or a medication aide where allowed)."],
];
function cnaCalc(): Q[] {
  return repeat(14, () => {
    if (pick([true, false])) {
      const oz = pick([4, 6, 8, 10, 12, 16]), ml = oz * 30;
      return mcq("CNA", "Measurement", `A resident drinks ${oz} oz of juice. How many mL is that? (1 oz = 30 mL)`, `${ml} mL`, numOpts(ml, [oz * 10, oz * 100, oz * 3], "mL"), `${oz} × 30 = ${ml} mL.`, 1);
    }
    const cups = [ri(120, 240), ri(60, 240), ri(100, 360)].map((x) => Math.round(x / 10) * 10), total = cups.reduce((a, b) => a + b, 0);
    return mcq("CNA", "Measurement", `A resident drinks ${cups[0]} mL at breakfast, ${cups[1]} mL mid-morning and ${cups[2]} mL at lunch. What is the total intake?`, `${total} mL`, numOpts(total, [total - 100, total + 100, cups[0] + cups[2]], "mL"), `${cups.join(" + ")} = ${total} mL.`, 1);
  });
}

// ============================================================================ AMC
const AMC: F[] = [
  ["Levers", "A see-saw is an example of a", "first-class lever", ["second-class lever", "third-class lever", "pulley"], "In a first-class lever the fulcrum is between the effort and the load."],
  ["Levers", "A wheelbarrow is a", "second-class lever", ["first-class lever", "third-class lever", "wedge"], "The load is between the fulcrum (wheel) and the effort."],
  ["Levers", "Tweezers and a fishing rod are", "third-class levers", ["first-class levers", "second-class levers", "inclined planes"], "The effort is between the fulcrum and the load."],
  ["Levers", "Moving the fulcrum closer to the load makes the load", "easier to lift", ["harder to lift", "heavier", "lighter in mass"], "A longer effort arm gives more mechanical advantage."],
  ["Gears", "Two meshing gears turn", "in opposite directions", ["in the same direction", "at the same speed always", "without touching"], "Add an idler gear to make the output turn the same way."],
  ["Gears", "When a small gear drives a larger gear, the larger gear turns", "slower with more torque", ["faster with less torque", "at the same speed", "backwards only"], "Speed and torque trade off."],
  ["Pulleys", "A single fixed pulley", "changes the direction of the force but gives no mechanical advantage", ["halves the effort", "doubles the load", "removes friction"], "Mechanical advantage = 1."],
  ["Pulleys", "A single movable pulley gives a mechanical advantage of", "2", ["1", "4", "0.5"], "Two rope sections support the load."],
  ["Simple machines", "A ramp is an example of", "an inclined plane", ["a lever", "a pulley", "a gear"], "It lets you use less force over a longer distance."],
  ["Simple machines", "An axe blade is a", "wedge", ["lever", "pulley", "screw"], "A wedge is two inclined planes back to back."],
  ["Simple machines", "A screw is", "an inclined plane wrapped around a cylinder", ["a type of pulley", "a first-class lever", "a gear train"], "Finer threads give more mechanical advantage."],
  ["Forces", "Friction always acts", "against the direction of motion", ["in the direction of motion", "upward", "only in liquids"], "Lubricants reduce friction."],
  ["Forces", "Pressure equals", "force divided by area", ["force times area", "mass times speed", "area divided by force"], "A smaller area gives a higher pressure for the same force."],
  ["Fluids", "In a hydraulic system, pressure applied to a liquid is", "transmitted equally throughout the liquid", ["lost at the pistons", "only felt at the bottom", "doubled at each pipe"], "This is Pascal's principle."],
  ["Fluids", "Water flowing through a pipe that narrows will", "speed up", ["slow down", "stop", "reverse direction"], "The same volume has to pass through a smaller area."],
  ["Structures", "A triangle is used in bridges and roof trusses because it", "keeps its shape under load", ["is the lightest shape", "bends easily", "uses no materials"], "Triangles are rigid."],
];
function amcCalc(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(10, () => {
    const load = pick([60, 80, 100, 120, 150, 200]), la = pick([1, 2, 3]), ea = la * pick([2, 3, 4, 5]), e = r((load * la) / ea, 2);
    return mcq("AMC", "Levers", `A ${load} lb load sits ${la} ft from the fulcrum. How much effort is needed ${ea} ft from the fulcrum on the other side to balance it?`, `${fmt(e)} lb`, numOpts(e, [load * ea / la, load - ea, load / 2], "lb"), `Effort × effort arm = load × load arm: E × ${ea} = ${load} × ${la}, so E = ${fmt(e)} lb.`, 2);
  }));
  out.push(...repeat(8, () => {
    const a = pick([10, 12, 15, 20]), b = a * pick([2, 3, 4]), rpm = pick([60, 90, 120, 240]), out2 = (rpm * a) / b;
    return mcq("AMC", "Gears", `A ${a}-tooth gear turning at ${rpm} rpm drives a ${b}-tooth gear. How fast does the larger gear turn?`, `${fmt(out2)} rpm`, numOpts(out2, [(rpm * b) / a, rpm, rpm - b], "rpm"), `Speed ratio = ${a} ÷ ${b}, so ${rpm} × ${a} ÷ ${b} = ${fmt(out2)} rpm.`, 2);
  }));
  out.push(...repeat(8, () => {
    const strands = pick([2, 3, 4, 5]), load = pick([100, 120, 200, 240, 300]), e = r(load / strands, 2);
    return mcq("AMC", "Pulleys", `A pulley system has ${strands} rope sections supporting a ${load} lb load. Ignoring friction, how much effort is needed?`, `${fmt(e)} lb`, numOpts(e, [load * strands, load, load / 2 === e ? load / 4 : load / 2], "lb"), `Mechanical advantage = ${strands}, so effort = ${load} ÷ ${strands} = ${fmt(e)} lb.`, 2);
  }));
  out.push(...repeat(6, () => {
    const h = pick([2, 3, 4, 5]), l = h * pick([3, 4, 5]), w = pick([100, 150, 200, 300]), e = r((w * h) / l, 2);
    return mcq("AMC", "Inclined planes", `A ${w} lb box is pushed up a ramp ${l} ft long to a height of ${h} ft. Ignoring friction, what force is needed?`, `${fmt(e)} lb`, numOpts(e, [w * l / h, w, w / 2], "lb"), `Force × length = weight × height: F = ${w} × ${h} ÷ ${l} = ${fmt(e)} lb.`, 2);
  }));
  return out;
}

// ============================================================================ AEI
const AEI: F[] = [
  ["Units", "Electrical resistance is measured in", "ohms", ["volts", "amperes", "watts"], "The symbol is Ω."],
  ["Units", "Electric current is measured in", "amperes (amps)", ["volts", "ohms", "farads"], "Measured with an ammeter connected in series."],
  ["Units", "Electrical power is measured in", "watts", ["ohms", "amps", "henries"], "Power = voltage × current."],
  ["Units", "Capacitance is measured in", "farads", ["henries", "ohms", "teslas"], "Inductance is measured in henries."],
  ["Units", "The frequency of household AC power in the United States is", "60 Hz", ["50 Hz", "100 Hz", "120 Hz"], "Standard outlets supply about 120 V."],
  ["Components", "A device that stores electric charge is a", "capacitor", ["resistor", "diode", "fuse"], "It blocks DC and passes AC."],
  ["Components", "A diode allows current to flow", "in one direction only", ["in both directions equally", "only in AC circuits", "only when cold"], "It is used to rectify AC into DC."],
  ["Components", "A transistor is mainly used to", "amplify or switch signals", ["store charge", "measure resistance", "generate light only"], "Transistors are the basis of modern electronics."],
  ["Components", "A fuse protects a circuit by", "melting and breaking the circuit when current is too high", ["increasing the voltage", "storing extra current", "cooling the wires"], "A circuit breaker does the same job and can be reset."],
  ["Components", "A transformer is used to", "change AC voltage", ["convert AC to DC", "store charge", "measure current"], "It works only with AC."],
  ["Materials", "Which material is the best electrical conductor?", "Copper", ["Rubber", "Glass", "Dry wood"], "Silver is better still but costs more."],
  ["Materials", "Rubber and plastic are used to cover wires because they are", "insulators", ["conductors", "semiconductors", "magnets"], "Insulators resist the flow of current."],
  ["Materials", "Silicon is a", "semiconductor", ["conductor", "insulator", "magnet"], "Semiconductors are used to make diodes and transistors."],
  ["Circuits", "In a series circuit, if one bulb breaks", "all the bulbs go out", ["only that bulb goes out", "the others get brighter", "nothing changes"], "There is only one path for current."],
  ["Circuits", "In a parallel circuit, the voltage across each branch is", "the same", ["shared out between branches", "zero", "doubled"], "Current splits between the branches."],
  ["Circuits", "Adding more resistors in parallel makes the total resistance", "smaller", ["larger", "unchanged", "zero only if two are added"], "More paths let more current flow."],
  ["Safety", "In US household wiring, the green (or bare) wire is the", "ground", ["hot wire", "neutral wire", "signal wire"], "Black is usually hot and white is neutral."],
  ["Safety", "A GFCI outlet is designed to", "cut power when current leaks to ground", ["increase the voltage", "store power", "convert AC to DC"], "They are used near water in kitchens and bathrooms."],
  ["Magnetism", "A coil of wire carrying current creates", "a magnetic field", ["static electricity", "light", "sound"], "This is the basis of electromagnets and motors."],
  ["Magnetism", "A generator turns", "mechanical energy into electrical energy", ["electrical energy into motion", "light into heat", "AC into DC"], "A motor does the reverse."],
];
function aeiCalc(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(10, () => {
    const i = pick([0.5, 1, 2, 3, 4, 5]), R = pick([2, 4, 6, 10, 12, 20, 24]), v = r(i * R, 2);
    const kind = pick(["V", "I", "R"]);
    if (kind === "V") return mcq("AEI", "Ohm's law", `A current of ${fmt(i)} A flows through a ${R} Ω resistor. What is the voltage across it?`, `${fmt(v)} V`, numOpts(v, [r(R / i, 2), r(i / R, 3), R + i], "V"), `V = I × R = ${fmt(i)} × ${R} = ${fmt(v)} V.`, 2);
    if (kind === "I") return mcq("AEI", "Ohm's law", `A ${fmt(v)} V source is connected across a ${R} Ω resistor. What current flows?`, `${fmt(i)} A`, numOpts(i, [r(v * R, 2), r(R / v, 3), v], "A"), `I = V ÷ R = ${fmt(v)} ÷ ${R} = ${fmt(i)} A.`, 2);
    return mcq("AEI", "Ohm's law", `A ${fmt(v)} V supply drives ${fmt(i)} A through a resistor. What is its resistance?`, `${R} Ω`, numOpts(R, [r(v * i, 2), r(i / v, 3), v], "Ω"), `R = V ÷ I = ${fmt(v)} ÷ ${fmt(i)} = ${R} Ω.`, 2);
  }));
  out.push(...repeat(8, () => {
    const v = pick([12, 120, 240]), i = pick([0.5, 1, 2, 5, 10]), p = r(v * i, 2);
    return mcq("AEI", "Power", `A device draws ${fmt(i)} A from a ${v} V supply. How much power does it use?`, `${fmt(p)} W`, numOpts(p, [r(v / i, 2), v + i, r(i / v, 4)], "W"), `P = V × I = ${v} × ${fmt(i)} = ${fmt(p)} W.`, 2);
  }));
  out.push(...repeat(8, () => {
    const a = pick([2, 3, 4, 6, 10]), b = pick([2, 4, 6, 12, 15]);
    if (pick([true, false])) {
      const t = a + b;
      return mcq("AEI", "Series and parallel", `What is the total resistance of ${a} Ω and ${b} Ω in series?`, `${t} Ω`, numOpts(t, [r((a * b) / (a + b), 2), a * b, Math.abs(a - b)], "Ω"), `In series, add them: ${a} + ${b} = ${t} Ω.`, 2);
    }
    const t = r((a * b) / (a + b), 2);
    return mcq("AEI", "Series and parallel", `What is the total resistance of ${a} Ω and ${b} Ω in parallel?`, `${fmt(t)} Ω`, numOpts(t, [a + b, a * b, r((a + b) / 2, 2)], "Ω"), `In parallel: (${a} × ${b}) ÷ (${a} + ${b}) = ${fmt(t)} Ω.`, 3);
  }));
  return out;
}

// ============================================================================ IPL
const IPL: F[] = [
  ["Making of the Constitution", "The Constitution of India came into force on", "26 January 1950", ["15 August 1947", "26 November 1949", "2 October 1950"], "It was adopted on 26 November 1949, now celebrated as Constitution Day."],
  ["Making of the Constitution", "Who chaired the Drafting Committee of the Constituent Assembly?", "B. R. Ambedkar", ["Rajendra Prasad", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel"], "Rajendra Prasad was President of the Constituent Assembly."],
  ["Making of the Constitution", "Who was the President of the Constituent Assembly?", "Rajendra Prasad", ["B. R. Ambedkar", "Jawaharlal Nehru", "Maulana Azad"], "He later became India's first President."],
  ["Preamble", "The words 'socialist' and 'secular' were added to the Preamble by the", "42nd Amendment (1976)", ["44th Amendment (1978)", "1st Amendment (1951)", "73rd Amendment (1992)"], "The 42nd Amendment also added 'integrity'."],
  ["Sources", "The idea of Directive Principles of State Policy was borrowed from the constitution of", "Ireland", ["the USA", "the UK", "Canada"], "Fundamental Rights draw on the US Bill of Rights."],
  ["Sources", "India's parliamentary system of government is based on the system of", "the United Kingdom", ["the USA", "Germany", "Australia"], "The UK also inspired the rule of law and single citizenship."],
  ["Sources", "The concurrent list idea was borrowed from", "Australia", ["Ireland", "Canada", "Japan"], "Canada inspired a federation with a strong centre."],
  ["Fundamental Rights", "Fundamental Rights are in which Part of the Constitution?", "Part III", ["Part IV", "Part IV-A", "Part V"], "Directive Principles are in Part IV."],
  ["Fundamental Rights", "Article 14 guarantees", "equality before the law", ["freedom of speech", "right to education", "abolition of untouchability"], "Articles 14–18 form the right to equality."],
  ["Fundamental Rights", "Untouchability is abolished by", "Article 17", ["Article 14", "Article 21", "Article 32"], "Its practice in any form is an offence."],
  ["Fundamental Rights", "Article 21 protects", "the right to life and personal liberty", ["the right to property", "freedom of religion", "the right to vote"], "Courts have read many rights into it, including privacy."],
  ["Fundamental Rights", "The right to free and compulsory education for children aged 6–14 is in", "Article 21A", ["Article 45", "Article 51A", "Article 14"], "It was added by the 86th Amendment (2002)."],
  ["Fundamental Rights", "B. R. Ambedkar called which article the 'heart and soul' of the Constitution?", "Article 32 (right to constitutional remedies)", ["Article 21", "Article 14", "Article 368"], "It lets citizens go directly to the Supreme Court."],
  ["Fundamental Rights", "The right to property was removed from the Fundamental Rights by the", "44th Amendment (1978)", ["42nd Amendment", "1st Amendment", "86th Amendment"], "It is now a legal right under Article 300A."],
  ["Fundamental Duties", "Fundamental Duties were added by the 42nd Amendment and are in", "Article 51A", ["Article 32", "Article 368", "Article 21A"], "They were recommended by the Swaran Singh Committee."],
  ["Directive Principles", "A Uniform Civil Code is mentioned in", "Article 44", ["Article 14", "Article 32", "Article 370"], "It is a Directive Principle, not enforceable by courts."],
  ["President", "The minimum age to become President of India is", "35 years", ["25 years", "30 years", "40 years"], "The minimum age for the Lok Sabha is 25 and for the Rajya Sabha 30."],
  ["President", "The President's power to grant pardons is in", "Article 72", ["Article 161", "Article 123", "Article 356"], "Governors have a similar power under Article 161."],
  ["President", "The President can issue ordinances when Parliament is not in session under", "Article 123", ["Article 213", "Article 352", "Article 110"], "Governors issue ordinances under Article 213."],
  ["Parliament", "The ex officio Chairman of the Rajya Sabha is the", "Vice-President", ["President", "Speaker", "Prime Minister"], "The Speaker presides over the Lok Sabha."],
  ["Parliament", "The President can nominate how many members to the Rajya Sabha?", "12", ["2", "10", "25"], "They have special knowledge of literature, science, art or social service."],
  ["Parliament", "A Money Bill is defined in", "Article 110", ["Article 112", "Article 368", "Article 280"], "It can only be introduced in the Lok Sabha."],
  ["Parliament", "The annual financial statement (the Budget) is covered by", "Article 112", ["Article 110", "Article 280", "Article 266"], "The Constitution does not use the word 'budget'."],
  ["Amendment", "The procedure for amending the Constitution is in", "Article 368", ["Article 352", "Article 32", "Article 1"], "Some amendments also need ratification by half the states."],
  ["Judiciary", "The 'basic structure' doctrine was laid down in", "Kesavananda Bharati v. State of Kerala (1973)", ["Maneka Gandhi v. Union of India", "Golaknath case", "Minerva Mills case"], "Parliament cannot amend the basic structure."],
  ["Judiciary", "The Supreme Court is established under", "Article 124", ["Article 214", "Article 32", "Article 148"], "High Courts are under Article 214."],
  ["Emergency", "A national emergency is proclaimed under", "Article 352", ["Article 356", "Article 360", "Article 365"], "Article 356 is President's rule; Article 360 is financial emergency."],
  ["Emergency", "President's rule in a state is imposed under", "Article 356", ["Article 352", "Article 360", "Article 370"], "It follows the failure of constitutional machinery in a state."],
  ["Bodies", "The Election Commission of India is set up under", "Article 324", ["Article 280", "Article 148", "Article 315"], "It conducts elections to Parliament, state legislatures, President and Vice-President."],
  ["Bodies", "The Comptroller and Auditor General (CAG) is under", "Article 148", ["Article 76", "Article 280", "Article 324"], "The CAG audits government accounts."],
  ["Bodies", "The Finance Commission is constituted under", "Article 280", ["Article 324", "Article 148", "Article 112"], "It recommends how taxes are shared between the Union and states."],
  ["Bodies", "The highest law officer of the Government of India is the", "Attorney General (Article 76)", ["Chief Justice", "Solicitor General", "Law Minister"], "The Advocate General is the state equivalent."],
  ["Federalism", "The division of powers into Union, State and Concurrent Lists is in the", "Seventh Schedule", ["Eighth Schedule", "Tenth Schedule", "Ninth Schedule"], "The Eighth Schedule lists the official languages."],
  ["Federalism", "How many languages are in the Eighth Schedule?", "22", ["14", "18", "24"], "The original Constitution listed 14."],
  ["Federalism", "The anti-defection law is in the", "Tenth Schedule", ["Eighth Schedule", "Seventh Schedule", "Twelfth Schedule"], "It was added by the 52nd Amendment (1985)."],
  ["Local government", "Panchayati Raj institutions got constitutional status through the", "73rd Amendment (1992)", ["74th Amendment", "42nd Amendment", "61st Amendment"], "The 74th Amendment covers urban local bodies."],
  ["Local government", "The 61st Amendment (1988) lowered the voting age from", "21 to 18", ["25 to 21", "20 to 18", "18 to 16"], "It took effect in 1989."],
  ["Economy and Constitution", "GST was introduced through the", "101st Amendment (2016)", ["73rd Amendment", "99th Amendment", "86th Amendment"], "GST came into effect on 1 July 2017."],
];

// ============================================================================ IEC
const IEC: F[] = [
  ["Banking", "The Reserve Bank of India was established in", "1935", ["1947", "1949", "1969"], "It was nationalised in 1949."],
  ["Banking", "The rate at which the RBI lends short-term money to commercial banks is the", "repo rate", ["reverse repo rate", "bank rate", "CRR"], "Raising the repo rate tends to reduce borrowing and inflation."],
  ["Banking", "The share of deposits banks must keep with the RBI as cash is the", "cash reserve ratio (CRR)", ["statutory liquidity ratio (SLR)", "repo rate", "capital adequacy ratio"], "SLR is held as liquid assets such as government securities."],
  ["Banking", "India's Monetary Policy Committee has how many members?", "6", ["5", "7", "9"], "Three from the RBI and three appointed by the government."],
  ["Banking", "The first major round of bank nationalisation took place in", "1969", ["1949", "1991", "1980"], "Fourteen major banks were nationalised."],
  ["Banking", "NABARD mainly finances", "agriculture and rural development", ["foreign trade", "the stock market", "defence"], "It was set up in 1982."],
  ["Planning", "NITI Aayog replaced the Planning Commission in", "2015", ["2010", "1991", "2017"], "The Prime Minister chairs NITI Aayog."],
  ["Planning", "India's First Five-Year Plan began in", "1951", ["1947", "1956", "1961"], "It focused on agriculture."],
  ["Reforms", "India's major economic reforms of liberalisation, privatisation and globalisation began in", "1991", ["1980", "2000", "1969"], "They followed a balance of payments crisis."],
  ["Taxation", "GST in India came into force on", "1 July 2017", ["1 April 2016", "1 January 2018", "15 August 2017"], "It replaced many indirect taxes."],
  ["Taxation", "Income tax is an example of a", "direct tax", ["indirect tax", "customs duty", "tariff"], "GST is an indirect tax."],
  ["Taxation", "A tax whose rate rises as income rises is", "progressive", ["regressive", "proportional", "flat"], "India's income tax slabs are progressive."],
  ["Budget", "Since 2017 the Union Budget has normally been presented on", "1 February", ["28 February", "1 April", "31 March"], "The financial year runs from 1 April to 31 March."],
  ["Budget", "Fiscal deficit means", "total expenditure minus total receipts other than borrowings", ["exports minus imports", "revenue receipts minus capital receipts", "money printed by the RBI"], "It shows how much the government needs to borrow."],
  ["Budget", "Revenue deficit means", "revenue expenditure is greater than revenue receipts", ["imports exceed exports", "capital spending exceeds tax", "inflation is above target"], "It shows borrowing used for day-to-day spending."],
  ["Inflation", "The RBI targets inflation measured by the", "Consumer Price Index (CPI)", ["Wholesale Price Index (WPI)", "GDP deflator", "Sensex"], "The flexible target is 4% with a band of ±2%."],
  ["Inflation", "Inflation caused by rising production costs is", "cost-push inflation", ["demand-pull inflation", "deflation", "stagflation"], "Demand-pull happens when demand exceeds supply."],
  ["National income", "GDP measures the value of final goods and services produced", "within a country's borders in a year", ["by a country's citizens worldwide", "by the government only", "for export only"], "GNP adds net income from abroad."],
  ["Markets", "The regulator of India's securities market is", "SEBI", ["RBI", "IRDAI", "NABARD"], "SEBI got statutory powers in 1992."],
  ["Markets", "The regulator of the insurance sector is", "IRDAI", ["SEBI", "PFRDA", "RBI"], "PFRDA regulates pensions."],
  ["Schemes", "Pradhan Mantri Jan Dhan Yojana (2014) aims at", "financial inclusion through bank accounts for all", ["building roads", "crop insurance only", "free housing"], "It is one of the world's largest financial inclusion schemes."],
  ["Schemes", "MGNREGA guarantees rural households", "100 days of wage employment a year", ["free electricity", "a pension at 60", "land ownership"], "It became law in 2005."],
  ["Sectors", "Agriculture belongs to the", "primary sector", ["secondary sector", "tertiary sector", "quaternary sector"], "Manufacturing is secondary; services are tertiary."],
  ["Trade", "When a country's imports exceed its exports, it has a", "trade deficit", ["trade surplus", "fiscal surplus", "budget surplus"], "It is part of the current account."],
];
function iecCalc(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(8, () => {
    const a = ri(150, 300) * 10, g = pick([4, 5, 6, 7, 8, 10]), b = r(a * (1 + g / 100), 1);
    return mcq("IEC", "Calculations", `GDP rises from ₹${fmt(a)} lakh crore to ₹${fmt(b)} lakh crore. What is the growth rate?`, `${g}%`, numOpts(g, [g + 1, g - 1, r(((b - a) / b) * 100, 1)], "%"), `Growth = (${fmt(b)} − ${fmt(a)}) ÷ ${fmt(a)} × 100 = ${g}%.`, 2);
  }));
  out.push(...repeat(8, () => {
    const n = pick([6, 7, 8, 9, 10]), inf = pick([3, 4, 5, 6]), real = n - inf;
    return mcq("IEC", "Calculations", `A fixed deposit pays ${n}% a year while inflation is ${inf}%. What is the approximate real interest rate?`, `${real}%`, numOpts(real, [n + inf, n, inf], "%"), `Real rate ≈ nominal − inflation = ${n} − ${inf} = ${real}%.`, 1);
  }));
  out.push(...repeat(6, () => {
    const exp = ri(40, 50) * 1000, rec = exp - ri(14, 18) * 1000;
    const fd = exp - rec;
    return mcq("IEC", "Calculations", `A government's total expenditure is ₹${fmt(exp)} crore and its total receipts other than borrowings are ₹${fmt(rec)} crore. What is the fiscal deficit?`, `₹${fmt(fd)} crore`, [exp + rec, rec, exp].map((x) => `₹${fmt(x)} crore`), `Fiscal deficit = expenditure − non-debt receipts = ₹${fmt(fd)} crore.`, 2);
  }));
  return out;
}

// ============================================================================ ENV
const ENV: F[] = [
  ["Conventions", "The Montreal Protocol (1987) aims to protect", "the ozone layer", ["wetlands", "migratory birds", "tigers"], "It phases out ozone-depleting substances such as CFCs."],
  ["Conventions", "The Ramsar Convention (1971) protects", "wetlands", ["the ozone layer", "deserts", "forests only"], "India has many Ramsar sites, including Chilika Lake."],
  ["Conventions", "The Kyoto Protocol (1997) set binding targets to reduce", "greenhouse gas emissions by developed countries", ["plastic waste", "poaching", "water use"], "It was adopted under the UNFCCC."],
  ["Conventions", "The Paris Agreement (2015) aims to limit global warming to", "well below 2 °C, pursuing 1.5 °C", ["exactly 3 °C", "0.5 °C", "5 °C"], "Countries submit Nationally Determined Contributions (NDCs)."],
  ["Conventions", "CITES regulates", "international trade in endangered species", ["climate finance", "ocean dumping", "nuclear waste"], "Species are listed in appendices by level of threat."],
  ["Conventions", "The Convention on Biological Diversity was opened for signature at the", "1992 Rio Earth Summit", ["1972 Stockholm Conference", "2015 Paris summit", "1987 Montreal meeting"], "The UNFCCC was also adopted in 1992."],
  ["Indian laws", "The Wildlife (Protection) Act was passed in", "1972", ["1986", "1980", "2002"], "It created schedules of protected species."],
  ["Indian laws", "The Environment (Protection) Act, 1986 was passed after the", "Bhopal gas tragedy", ["Chernobyl disaster", "Chipko movement", "Silent Valley protests"], "The Bhopal gas leak happened in 1984."],
  ["Indian laws", "The National Green Tribunal was set up in", "2010", ["1986", "1972", "2002"], "It hears environmental cases quickly."],
  ["Conservation", "Project Tiger was launched in", "1973", ["1983", "1992", "2005"], "Jim Corbett was among the first tiger reserves."],
  ["Conservation", "Kaziranga National Park is famous for the", "one-horned rhinoceros", ["Asiatic lion", "snow leopard", "Bengal florican only"], "It is in Assam."],
  ["Conservation", "The Asiatic lion is found in the wild only in", "Gir, Gujarat", ["Sundarbans, West Bengal", "Kaziranga, Assam", "Periyar, Kerala"], "Gir National Park protects it."],
  ["Conservation", "The Chipko movement of the 1970s began in present-day", "Uttarakhand", ["Kerala", "Rajasthan", "Odisha"], "Villagers hugged trees to stop them being felled."],
  ["Conservation", "The Great Indian Bustard is listed by the IUCN as", "Critically Endangered", ["Least Concern", "Extinct", "Vulnerable"], "It survives mainly in Rajasthan."],
  ["Conservation", "India's biodiversity hotspots include the Western Ghats and", "the Himalaya", ["the Thar Desert", "the Deccan Plateau", "the Indo-Gangetic plain"], "Indo-Burma and Sundaland (Nicobar Islands) are the others."],
  ["Ecology", "Organisms that make their own food in an ecosystem are", "producers", ["primary consumers", "decomposers", "carnivores"], "They form the first trophic level."],
  ["Ecology", "Species found naturally in only one region are called", "endemic", ["invasive", "exotic", "migratory"], "The Western Ghats have many endemic amphibians."],
  ["Ecology", "Excess nutrients in a lake causing algal blooms and low oxygen is", "eutrophication", ["biomagnification", "succession", "desertification"], "Fertiliser run-off is a common cause."],
  ["Ecology", "The increase in concentration of a toxin up a food chain is", "biomagnification", ["eutrophication", "bioremediation", "symbiosis"], "DDT and mercury biomagnify."],
  ["Ecology", "A high biochemical oxygen demand (BOD) in water indicates", "high organic pollution", ["very clean water", "high salinity", "low temperature"], "Microbes use up oxygen breaking down waste."],
  ["Climate", "The ozone layer is found mainly in the", "stratosphere", ["troposphere", "mesosphere", "thermosphere"], "It absorbs harmful UV radiation."],
  ["Climate", "Acid rain is mainly caused by", "sulphur dioxide and nitrogen oxides", ["carbon monoxide and ozone", "methane and helium", "CFCs only"], "They form sulphuric and nitric acids."],
  ["Climate", "Which is a greenhouse gas?", "Methane", ["Nitrogen", "Oxygen", "Argon"], "Carbon dioxide, methane and nitrous oxide are major greenhouse gases."],
  ["Climate", "El Niño is the unusual warming of the", "central and eastern Pacific Ocean", ["Indian Ocean only", "Arctic Ocean", "Mediterranean Sea"], "It is often linked to weaker Indian monsoons."],
];
function envCalc(): Q[] {
  return repeat(10, () => {
    const p = pick([10000, 20000, 50000, 100000]), lvl = pick([2, 3, 4]), e = p / 10 ** (lvl - 1);
    const names = ["", "producers", "primary consumers", "secondary consumers", "tertiary consumers"];
    return mcq("ENV", "Energy flow", `Producers in a food chain capture ${fmt(p)} kJ of energy. Using the 10% law, how much energy reaches the ${names[lvl]}?`, `${fmt(e)} kJ`, numOpts(e, [p / 10 ** lvl, p / 10 ** (lvl - 2), p * 0.9], "kJ"), `About 10% passes to each level: ${fmt(p)} × 0.1^${lvl - 1} = ${fmt(e)} kJ.`, 2);
  });
}

// ============================================================================ CDP
const CDP: F[] = [
  ["Piaget", "According to Piaget, the stage from birth to about 2 years is the", "sensorimotor stage", ["preoperational stage", "concrete operational stage", "formal operational stage"], "Children learn through senses and actions."],
  ["Piaget", "Object permanence develops in Piaget's", "sensorimotor stage", ["preoperational stage", "concrete operational stage", "formal operational stage"], "The child knows objects exist when out of sight."],
  ["Piaget", "Egocentrism is typical of the", "preoperational stage (about 2–7 years)", ["sensorimotor stage", "concrete operational stage", "formal operational stage"], "Children struggle to see another person's view."],
  ["Piaget", "Conservation is mastered during the", "concrete operational stage (about 7–11 years)", ["preoperational stage", "sensorimotor stage", "formal operational stage"], "The child knows quantity stays the same when shape changes."],
  ["Piaget", "Abstract and hypothetical reasoning appears in the", "formal operational stage", ["concrete operational stage", "preoperational stage", "sensorimotor stage"], "From about 11 years onwards."],
  ["Piaget", "Fitting new information into an existing schema is", "assimilation", ["accommodation", "equilibration", "scaffolding"], "Accommodation changes the schema itself."],
  ["Vygotsky", "The gap between what a child can do alone and with help is the", "zone of proximal development", ["schema", "readiness", "critical period"], "It is Vygotsky's key idea."],
  ["Vygotsky", "Temporary support from a teacher that is withdrawn as the child improves is", "scaffolding", ["reinforcement", "conditioning", "remediation"], "The term was introduced by Wood, Bruner and Ross, building on Vygotsky."],
  ["Vygotsky", "Vygotsky stressed that learning is shaped mainly by", "social interaction and culture", ["heredity alone", "punishment", "biological maturation alone"], "Language plays a central role."],
  ["Kohlberg", "Kohlberg's theory is about", "moral development", ["language development", "physical growth", "intelligence testing"], "It has pre-conventional, conventional and post-conventional levels."],
  ["Learning theories", "Pavlov's experiments with dogs demonstrated", "classical conditioning", ["operant conditioning", "insight learning", "social learning"], "A neutral stimulus became linked with food."],
  ["Learning theories", "Skinner is associated with", "operant conditioning", ["classical conditioning", "the zone of proximal development", "multiple intelligences"], "Behaviour is shaped by reinforcement."],
  ["Learning theories", "Thorndike's laws of learning include readiness, exercise and", "effect", ["insight", "imitation", "assimilation"], "Satisfying outcomes strengthen a response."],
  ["Learning theories", "Bandura's Bobo doll experiment showed learning through", "observation and imitation", ["trial and error", "punishment only", "insight"], "This is social learning theory."],
  ["Learning theories", "Köhler's experiments with chimpanzees demonstrated", "insight learning", ["classical conditioning", "rote learning", "operant conditioning"], "The solution appears suddenly after understanding the problem."],
  ["Intelligence", "The theory of multiple intelligences was proposed by", "Howard Gardner", ["Jean Piaget", "Lev Vygotsky", "B. F. Skinner"], "Examples include linguistic, logical-mathematical and interpersonal intelligence."],
  ["Language", "Chomsky proposed that children are born with a", "language acquisition device", ["blank slate for language", "fixed vocabulary", "single learning style"], "He argued language ability is innate."],
  ["Inclusive education", "Difficulty with reading is", "dyslexia", ["dyscalculia", "dysgraphia", "dyspraxia"], "Dyscalculia affects maths; dysgraphia affects writing."],
  ["Inclusive education", "Difficulty with writing is", "dysgraphia", ["dyslexia", "dyscalculia", "aphasia"], "It can affect handwriting and spelling."],
  ["Inclusive education", "Difficulty understanding numbers and maths is", "dyscalculia", ["dyslexia", "dysgraphia", "dysphasia"], "Teachers can use concrete materials to help."],
  ["Inclusive education", "Inclusive education means", "children with diverse needs learn together in the same classroom", ["separate schools for every disability", "only gifted children are taught", "exams decide who attends"], "Teachers adapt teaching so all can take part."],
  ["Assessment", "Assessment during learning to guide teaching is", "formative assessment", ["summative assessment", "norm-referenced testing", "placement only"], "Summative assessment comes at the end of a unit."],
  ["Assessment", "Continuous and Comprehensive Evaluation (CCE) assesses", "both scholastic and co-scholastic areas throughout the year", ["only final exams", "only attendance", "only sports"], "It aims to reduce exam stress."],
  ["Policy", "The Right of Children to Free and Compulsory Education Act was passed in", "2009", ["2002", "2005", "2020"], "It covers children aged 6 to 14."],
  ["Policy", "Under the RTE Act, private unaided schools must reserve what share of entry-level seats for disadvantaged children?", "25%", ["10%", "15%", "50%"], "The state reimburses the costs."],
  ["Policy", "The National Education Policy 2020 replaces 10+2 with a", "5+3+3+4 structure", ["6+3+3 structure", "8+4 structure", "4+4+4 structure"], "It starts with five foundational years."],
  ["Policy", "The National Curriculum Framework 2005 stressed", "connecting knowledge to life outside school", ["rote learning", "more homework", "fewer subjects"], "It moved away from learning by memorisation."],
  ["Pedagogy", "John Dewey is best known for the idea of", "learning by doing", ["learning by rote", "punishment-based discipline", "intelligence testing"], "He shaped progressive education."],
  ["Pedagogy", "Froebel is known as the founder of", "the kindergarten", ["the Montessori method", "programmed learning", "the Dalton plan"], "He saw play as central to learning."],
  ["Pedagogy", "A child-centred classroom", "builds on children's interests and active participation", ["relies on the teacher talking all the time", "uses only textbooks", "ranks children every week"], "Learners construct understanding actively."],
  ["Development", "Development follows the principle of proceeding from", "head to toe (cephalocaudal)", ["toe to head", "outside to inside only", "random order"], "It also proceeds from the centre outwards (proximodistal)."],
  ["Development", "Development is the result of", "interaction between heredity and environment", ["heredity only", "environment only", "schooling only"], "Both nature and nurture matter."],
];

// ============================================================================
export function usin(): Record<string, Q[]> {
  return {
    GSS: [...facts("GSS", GSS), ...gssData()],
    GSC: [...facts("GSC", GSC), ...gscCalc()],
    TSC: [...facts("TSC", TSC), ...tscCalc()],
    CNA: [...facts("CNA", CNA), ...cnaCalc()],
    AMC: [...facts("AMC", AMC), ...amcCalc()],
    AEI: [...facts("AEI", AEI), ...aeiCalc()],
    IPL: facts("IPL", IPL),
    IEC: [...facts("IEC", IEC), ...iecCalc()],
    ENV: [...facts("ENV", ENV), ...envCalc()],
    CDP: facts("CDP", CDP),
  };
}
