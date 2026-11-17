// Second batch for the thinnest US/India banks: CNA, Indian Polity, Environment and Child Development & Pedagogy.
import { mcq, Q } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

const CNA: F[] = [
  ["Infection control", "When putting on PPE, which is usually put on last?", "Gloves", ["Gown", "Mask", "Goggles"], "Gloves go on last so they cover the gown cuffs."],
  ["Infection control", "Hand sanitiser does NOT work well against", "C. difficile spores", ["most bacteria on clean hands", "common cold viruses", "flu viruses"], "Wash with soap and water for C. diff."],
  ["Infection control", "Soiled linen should be", "held away from your uniform and placed in the laundry hamper", ["shaken out to remove debris", "put on the floor", "carried against your chest"], "Shaking spreads microorganisms."],
  ["Infection control", "A resident on airborne precautions (for example, tuberculosis) needs staff to wear", "a fitted N95 respirator", ["gloves only", "a surgical cap only", "no mask"], "They are cared for in a negative-pressure room."],
  ["Resident rights", "The 1987 federal law that set standards for nursing homes and nurse aide training is", "OBRA", ["HIPAA", "OSHA", "ADA"], "OBRA requires training and a competency exam."],
  ["Resident rights", "Taking a resident's money without permission is", "misappropriation of property (theft)", ["neglect", "a medication error", "allowed if small"], "It must be reported."],
  ["Resident rights", "Failing to give a resident needed care, such as leaving them wet for hours, is", "neglect", ["dignity", "an incident report", "range of motion"], "Neglect is a form of abuse."],
  ["Resident rights", "Keeping a resident in their room against their will is", "involuntary seclusion", ["privacy", "a care plan", "isolation precautions"], "It is a form of abuse."],
  ["Safety", "Before moving a resident, you should first", "check the care plan and explain what you will do", ["lift them quickly", "call the family", "remove the call light"], "Use correct body mechanics and get help if needed."],
  ["Safety", "Good body mechanics include", "bending your knees and keeping the load close to your body", ["bending at the waist", "twisting while lifting", "lifting with straight legs"], "Keep a wide base of support."],
  ["Safety", "If a resident starts to fall while walking, you should", "ease them gently to the floor while protecting their head", ["try to hold them upright", "let go and get help", "pull them by the arm"], "Then call for the nurse and don't move them until checked."],
  ["Safety", "A resident has a seizure. You should", "protect their head, move objects away and not put anything in their mouth", ["hold them down", "put a spoon in their mouth", "give them water"], "Note how long it lasts and call the nurse."],
  ["Nutrition", "A resident with dysphagia has difficulty", "swallowing", ["speaking", "seeing", "walking"], "They may need thickened liquids and must sit upright to eat."],
  ["Nutrition", "When feeding a resident, they should be positioned", "sitting upright at 90 degrees if possible", ["lying flat", "on their stomach", "on their left side"], "This reduces the risk of choking and aspiration."],
  ["Nutrition", "NPO means the resident should have", "nothing by mouth", ["normal portions only", "no pillows", "no visitors"], "It is often ordered before surgery or tests."],
  ["Vital signs", "Blood pressure is written as", "systolic over diastolic", ["diastolic over systolic", "pulse over breaths", "temperature over pulse"], "For example 120/80 mmHg."],
  ["Vital signs", "Where is the radial pulse taken?", "On the thumb side of the inner wrist", ["At the neck", "Behind the knee", "On the top of the foot"], "It is the most common site for routine checks."],
  ["Personal care", "When shaving a resident with a safety razor, shave", "in the direction the hair grows", ["against the hair growth", "in circles", "without water"], "Residents on blood thinners usually need an electric razor."],
  ["Personal care", "Before giving a bath, check that the water temperature is", "safe, around 105 °F (40.5 °C), and test it", ["as hot as possible", "cold", "untested"], "Elderly skin burns easily."],
  ["Personal care", "Range of motion exercises help", "keep joints moving and prevent contractures", ["lower blood sugar", "stop infections", "replace meals"], "Never force a joint past the point of pain."],
  ["Communication", "If a resident is angry, you should", "stay calm, listen and not argue", ["argue back", "leave them alone for the shift", "threaten to report them"], "Report the behaviour to the nurse."],
  ["Role", "If you are asked to do a task you were not trained for, you should", "tell the nurse you have not been trained to do it", ["do it anyway", "ask another resident", "guess"], "Work only within your scope of practice."],
  ["End of life", "Hearing is often", "the last sense to be lost when a person is dying", ["lost first", "unaffected by anything", "not important"], "Keep speaking calmly and kindly to the resident."],
];

const IPL: F[] = [
  ["Preamble", "The Preamble describes India as a", "sovereign, socialist, secular, democratic republic", ["federal monarchy", "unitary empire", "confederation of states"], "These words set out the nature of the state."],
  ["Citizenship", "Citizenship is covered in which Part of the Constitution?", "Part II", ["Part I", "Part III", "Part V"], "Part I covers the Union and its territory."],
  ["Fundamental Rights", "Freedom of speech and expression is protected under", "Article 19", ["Article 21", "Article 25", "Article 14"], "Article 19 lists six freedoms with reasonable restrictions."],
  ["Fundamental Rights", "Freedom of religion is covered by", "Articles 25–28", ["Articles 14–18", "Articles 29–30", "Articles 36–51"], "Articles 29–30 cover cultural and educational rights."],
  ["Fundamental Rights", "Protection of the interests of minorities to run their own educational institutions is in", "Article 30", ["Article 25", "Article 17", "Article 45"], "It is part of cultural and educational rights."],
  ["Fundamental Rights", "A writ asking an authority to produce a detained person before the court is", "habeas corpus", ["mandamus", "certiorari", "quo warranto"], "Mandamus orders a public official to do their duty."],
  ["Fundamental Rights", "A writ asking 'by what authority' a person holds a public office is", "quo warranto", ["habeas corpus", "prohibition", "mandamus"], "It prevents illegal occupation of a public office."],
  ["Fundamental Rights", "The prohibition of child labour in factories and hazardous work for children under 14 is in", "Article 24", ["Article 21A", "Article 23", "Article 45"], "Article 23 prohibits human trafficking and forced labour."],
  ["Directive Principles", "Equal pay for equal work for men and women is a", "Directive Principle (Article 39)", ["Fundamental Right under Article 14 only", "Fundamental Duty", "schedule entry"], "Courts have linked it with Articles 14 and 16."],
  ["Directive Principles", "Organisation of village panchayats is a Directive Principle under", "Article 40", ["Article 44", "Article 48", "Article 51"], "The 73rd Amendment later gave panchayats constitutional status."],
  ["President", "The President of India is elected by", "an electoral college of elected MPs and elected MLAs", ["direct popular vote", "the Lok Sabha alone", "the Supreme Court"], "Nominated members do not vote."],
  ["President", "The President can be removed by", "impeachment for violation of the Constitution", ["a Lok Sabha resolution alone", "the Prime Minister", "the Chief Justice"], "Both Houses must pass the charge by a two-thirds majority."],
  ["Prime Minister", "The Council of Ministers is collectively responsible to the", "Lok Sabha", ["Rajya Sabha", "President", "Supreme Court"], "A no-confidence motion can only be moved in the Lok Sabha."],
  ["Parliament", "Parliament consists of the President, the Lok Sabha and the", "Rajya Sabha", ["Supreme Court", "Council of Ministers", "Election Commission"], "This is under Article 79."],
  ["Parliament", "A joint sitting of both Houses is presided over by the", "Speaker of the Lok Sabha", ["President", "Vice-President", "Prime Minister"], "Joint sittings resolve deadlocks on ordinary bills."],
  ["Parliament", "The Rajya Sabha is a permanent House, with one-third of its members retiring every", "2 years", ["5 years", "6 months", "4 years"], "Each member serves a six-year term."],
  ["Parliament", "Zero Hour in Parliament", "is an Indian innovation not mentioned in the rules of procedure", ["is set by Article 110", "is the budget debate", "happens only in joint sittings"], "It follows Question Hour."],
  ["Judiciary", "The Supreme Court's power to hear disputes between the Centre and states is its", "original jurisdiction", ["appellate jurisdiction", "advisory jurisdiction", "writ jurisdiction only"], "This is under Article 131."],
  ["Judiciary", "The President can seek the Supreme Court's opinion on a question of law under", "Article 143", ["Article 32", "Article 226", "Article 137"], "This is its advisory jurisdiction."],
  ["Judiciary", "High Courts issue writs under", "Article 226", ["Article 32", "Article 124", "Article 143"], "Their writ power is wider than the Supreme Court's under Article 32."],
  ["Bodies", "The Union Public Service Commission is provided for in", "Article 315", ["Article 324", "Article 280", "Article 148"], "State PSCs are covered by the same Part."],
  ["Bodies", "The National Commission for Scheduled Castes is a", "constitutional body (Article 338)", ["statutory body", "executive body", "private body"], "NITI Aayog, by contrast, is an executive body."],
  ["State government", "The Governor of a state is appointed by the", "President", ["Chief Minister", "state legislature", "Chief Justice"], "Governors hold office during the pleasure of the President."],
  ["Federalism", "New states can be created by Parliament under", "Article 3", ["Article 368", "Article 1", "Article 356"], "A simple majority is enough."],
];

const ENV: F[] = [
  ["Ecology", "The non-living parts of an ecosystem, such as water and sunlight, are", "abiotic factors", ["biotic factors", "producers", "consumers"], "Biotic factors are living things."],
  ["Ecology", "A relationship where both species benefit is", "mutualism", ["parasitism", "commensalism", "competition"], "Lichens (fungus and alga) are an example."],
  ["Ecology", "The gradual change in species in an area over time is", "ecological succession", ["eutrophication", "biomagnification", "adaptation"], "Primary succession starts on bare rock."],
  ["Ecology", "A transition zone between two ecosystems is an", "ecotone", ["ecocline", "niche", "habitat"], "Ecotones often have high biodiversity (the edge effect)."],
  ["Ecology", "A species whose removal has a big effect on its ecosystem is a", "keystone species", ["invasive species", "endemic species", "pioneer species"], "Tigers act as keystone and umbrella species."],
  ["Ecology", "Nitrogen-fixing bacteria in legume root nodules include", "Rhizobium", ["Lactobacillus", "E. coli", "Plasmodium"], "They convert atmospheric nitrogen into ammonia."],
  ["Conservation", "In-situ conservation means protecting species", "in their natural habitat", ["in zoos only", "in seed banks only", "in laboratories"], "National parks and sanctuaries are in-situ; zoos and seed banks are ex-situ."],
  ["Conservation", "Biosphere reserves in India are part of UNESCO's", "Man and the Biosphere (MAB) programme", ["World Heritage list only", "Ramsar list", "Red List"], "Nilgiri was India's first biosphere reserve."],
  ["Conservation", "The IUCN Red List classifies species by", "risk of extinction", ["body size", "economic value", "country of origin"], "Categories range from Least Concern to Extinct."],
  ["Conservation", "Project Elephant was launched in", "1992", ["1973", "2006", "1980"], "Project Tiger began in 1973."],
  ["Conservation", "Silent Valley National Park, saved from a hydroelectric project, is in", "Kerala", ["Karnataka", "Tamil Nadu", "Maharashtra"], "The campaign was a landmark in Indian environmentalism."],
  ["Pollution", "PM2.5 refers to particulate matter with a diameter of", "2.5 micrometres or less", ["2.5 millimetres", "25 micrometres", "2.5 nanometres or more"], "These fine particles enter deep into the lungs."],
  ["Pollution", "The main gas responsible for ozone layer depletion is released by", "chlorofluorocarbons (CFCs)", ["carbon dioxide", "methane", "nitrogen"], "Chlorine atoms break down ozone molecules."],
  ["Pollution", "Fly ash is a by-product of", "coal-fired power plants", ["solar panels", "wind turbines", "hydroelectric dams"], "It can be used to make bricks and cement."],
  ["Climate", "The UNFCCC annual meeting of parties is known as the", "COP (Conference of the Parties)", ["G20", "WTO ministerial", "BRICS summit"], "The Paris Agreement was adopted at COP21."],
  ["Climate", "Carbon sequestration means", "capturing and storing carbon dioxide", ["releasing carbon into the air", "burning coal efficiently", "making plastic"], "Forests and soils are natural carbon sinks."],
  ["Climate", "India's National Action Plan on Climate Change (2008) has how many national missions?", "8", ["5", "12", "3"], "They include the National Solar Mission."],
];

const CDP: F[] = [
  ["Development", "Growth refers to", "quantitative change, such as height and weight", ["only emotional change", "qualitative change only", "changes in intelligence only"], "Development includes qualitative changes too."],
  ["Development", "Early childhood is generally considered", "about 2 to 6 years", ["13 to 19 years", "birth to 2 weeks", "20 to 40 years"], "Adolescence is roughly 12 to 18 years."],
  ["Development", "Socialisation is the process by which children", "learn the norms and values of their society", ["grow taller", "inherit traits", "learn only maths"], "Family is the primary agent of socialisation."],
  ["Development", "Gender bias in the classroom is best reduced by", "giving all children equal opportunities and challenging stereotypes", ["seating boys and girls apart", "assigning chores by gender", "ignoring the issue"], "Use inclusive examples and materials."],
  ["Learning", "Learning that a teacher plans to make meaningful by linking to what children already know uses", "prior knowledge", ["rote memorisation", "punishment", "competition only"], "Ausubel stressed meaningful learning."],
  ["Learning", "Mistakes made by children are best seen as", "windows into their thinking", ["signs of low intelligence", "reasons for punishment", "things to ignore"], "Errors show how children are reasoning."],
  ["Learning", "Intrinsic motivation comes from", "interest and enjoyment of the task itself", ["prizes", "fear of punishment", "marks only"], "Extrinsic motivation comes from outside rewards."],
  ["Learning", "Bruner's discovery learning encourages children to", "find out principles for themselves", ["memorise definitions", "copy the teacher", "work silently alone"], "Bruner also described enactive, iconic and symbolic modes."],
  ["Learning", "The 'law of effect' was proposed by", "Thorndike", ["Pavlov", "Piaget", "Kohlberg"], "Responses followed by satisfaction are strengthened."],
  ["Kohlberg", "At Kohlberg's pre-conventional level, children's moral choices are driven by", "avoiding punishment and getting rewards", ["universal ethical principles", "social contracts", "law and order"], "Conventional morality focuses on approval and rules."],
  ["Intelligence", "IQ was traditionally calculated as", "mental age ÷ chronological age × 100", ["chronological age ÷ mental age × 100", "marks ÷ total × 100", "age × 100"], "This is the ratio IQ formula."],
  ["Intelligence", "Emotional intelligence was popularised by", "Daniel Goleman", ["Howard Gardner", "Alfred Binet", "Charles Spearman"], "Spearman proposed the 'g' factor of general intelligence."],
  ["Inclusive education", "A child who is gifted needs", "enrichment and challenging tasks", ["to be held back", "only repetitive drills", "to be ignored"], "Differentiated instruction helps every learner."],
  ["Inclusive education", "The Rights of Persons with Disabilities Act was passed in", "2016", ["1995", "2009", "2020"], "It replaced the Persons with Disabilities Act, 1995."],
  ["Assessment", "Assessment 'for' learning is mainly used to", "improve teaching and learning while it is happening", ["rank students at year end", "award certificates", "select for jobs"], "Assessment 'of' learning is summative."],
  ["Assessment", "A portfolio in assessment is", "a collection of a child's work over time", ["a single final test", "a seating plan", "a timetable"], "It shows progress across the year."],
  ["Pedagogy", "Montessori education emphasises", "self-directed activity using specially designed materials", ["strict rote learning", "large lectures", "competitive ranking"], "Maria Montessori developed the method."],
  ["Pedagogy", "Children learn best in a classroom where", "they can ask questions without fear", ["silence is always required", "only the teacher speaks", "mistakes are punished"], "A safe climate supports inquiry."],
];

export function usin2(): Record<string, Q[]> {
  return { CNA: facts("CNA", CNA), IPL: facts("IPL", IPL), ENV: facts("ENV", ENV), CDP: facts("CDP", CDP) };
}
