// Starter banks for the expansion tracks. Facts are long-standing and stable; calculations are computed.
// The question factory (lib/grow.ts) grows each bank to its target after launch.
import { verbalExtra } from "./vrb-extra";
import { fmt, mcq, numOpts, others, pick, Q, repeat, ri, sample } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

// ---------------------------------------------------------------------------
// US citizenship civics (USC)
// ---------------------------------------------------------------------------
const USC: F[] = [
  ["Principles of American government", "What is the supreme law of the land?", "The Constitution", ["The Declaration of Independence", "The Bill of Rights only", "The Articles of Confederation"], "The Constitution sets up the government and protects basic rights."],
  ["Principles of American government", "What are the first ten amendments to the Constitution called?", "The Bill of Rights", ["The Federalist Papers", "The Preamble", "The Articles"], "They were ratified in 1791."],
  ["Principles of American government", "The idea of self-government is in the first three words of the Constitution. What are these words?", "We the People", ["In God We Trust", "Life, Liberty, Happiness", "One Nation Under"], "The government gets its power from the people."],
  ["Principles of American government", "What is an amendment?", "A change or addition to the Constitution", ["A law passed by a state", "A presidential order", "A court ruling"], "There are 27 amendments."],
  ["Principles of American government", "How many amendments does the Constitution have?", "27", ["10", "21", "50"], "The first ten are the Bill of Rights."],
  ["Principles of American government", "What did the Declaration of Independence do?", "Announced independence from Great Britain", ["Created the Constitution", "Ended slavery", "Gave women the vote"], "It was adopted on July 4, 1776."],
  ["Principles of American government", "What is freedom of religion?", "You can practice any religion, or not practice a religion", ["You must join a church", "Only Christianity is allowed", "Religion is banned in public"], "Protected by the First Amendment."],
  ["Principles of American government", "What is the economic system in the United States?", "Capitalist (market) economy", ["Communist economy", "Feudal economy", "Command economy"], "Also called a market economy."],
  ["Principles of American government", "What is the 'rule of law'?", "Everyone must follow the law, including leaders and government", ["The President makes all laws", "Only citizens must obey laws", "Courts can ignore the Constitution"], "No one is above the law."],
  ["System of government", "What are the three branches of government?", "Legislative, executive and judicial", ["Federal, state and local", "House, Senate and President", "Army, Navy and Air Force"], "Separation of powers."],
  ["System of government", "What stops one branch of government from becoming too powerful?", "Checks and balances (separation of powers)", ["The President's veto alone", "The Bill of Rights", "Elections every year"], "Each branch can limit the others."],
  ["System of government", "Who is in charge of the executive branch?", "The President", ["The Speaker of the House", "The Chief Justice", "The Senate Majority Leader"], "The President heads the executive branch."],
  ["System of government", "Who makes federal laws?", "Congress (Senate and House of Representatives)", ["The President", "The Supreme Court", "State governors"], "Congress is the legislative branch."],
  ["System of government", "How many U.S. Senators are there?", "100", ["50", "435", "538"], "Two from each of the 50 states."],
  ["System of government", "We elect a U.S. Senator for how many years?", "6", ["2", "4", "8"], "Senate terms are six years."],
  ["System of government", "How many voting members are in the House of Representatives?", "435", ["100", "50", "538"], "Seats are divided by state population."],
  ["System of government", "We elect a U.S. Representative for how many years?", "2", ["4", "6", "8"], "House elections are every two years."],
  ["System of government", "We elect a President for how many years?", "4", ["2", "6", "8"], "A President can serve at most two elected terms."],
  ["System of government", "In what month do we vote for President?", "November", ["January", "July", "March"], "Election Day is in November."],
  ["System of government", "If the President can no longer serve, who becomes President?", "The Vice President", ["The Speaker of the House", "The Chief Justice", "The Secretary of State"], "Next in line after the VP is the Speaker of the House."],
  ["System of government", "Who is the Commander in Chief of the military?", "The President", ["The Secretary of Defense", "The Vice President", "The Chairman of the Joint Chiefs"], "Civilian control of the military."],
  ["System of government", "Who signs bills to become laws?", "The President", ["The Chief Justice", "The Speaker", "The Senate"], "The President can also veto bills."],
  ["System of government", "Who vetoes bills?", "The President", ["The Supreme Court", "The Vice President", "Governors"], "Congress can override a veto with a two-thirds vote in both houses."],
  ["System of government", "What is the highest court in the United States?", "The Supreme Court", ["The Federal Court of Appeals", "The District Court", "The Court of Claims"], "It is the head of the judicial branch."],
  ["System of government", "How many justices are on the Supreme Court?", "9", ["7", "11", "12"], "Set by law, not by the Constitution."],
  ["System of government", "Under the Constitution, some powers belong to the states. Which is one?", "Providing schooling and education", ["Printing money", "Declaring war", "Making treaties"], "Also police, driver's licenses and zoning."],
  ["System of government", "Under the Constitution, some powers belong to the federal government. Which is one?", "To print money", ["To give a driver's license", "To provide schooling", "To approve zoning"], "Also declaring war and making treaties."],
  ["System of government", "What are the two major political parties in the United States?", "Democratic and Republican", ["Liberal and Conservative", "Labour and Conservative", "Federalist and Whig"], "These have been the main parties since the 1850s."],
  ["Rights and responsibilities", "Name one right only for United States citizens.", "Vote in a federal election", ["Freedom of speech", "Freedom of religion", "Right to a fair trial"], "Running for federal office is another."],
  ["Rights and responsibilities", "How old do citizens have to be to vote for President?", "18 and older", ["16 and older", "21 and older", "25 and older"], "Set by the 26th Amendment."],
  ["Rights and responsibilities", "When is the last day you can send in federal income tax forms?", "April 15", ["January 1", "July 4", "December 31"], "Usually April 15."],
  ["Rights and responsibilities", "Which is one responsibility only for United States citizens?", "Serve on a jury", ["Pay taxes", "Obey the law", "Go to school"], "Voting in federal elections is another."],
  ["Rights and responsibilities", "What do we show loyalty to when we say the Pledge of Allegiance?", "The United States and the flag", ["The President", "The state governor", "The military"], "The Pledge is to the flag and the republic."],
  ["Rights and responsibilities", "At what age must all men register for the Selective Service?", "Between 18 and 26", ["Between 16 and 18", "Over 30", "Between 21 and 40"], "Registration is required by law."],
  ["Colonial period and independence", "Who wrote the Declaration of Independence?", "Thomas Jefferson", ["George Washington", "Benjamin Franklin", "Abraham Lincoln"], "Adopted July 4, 1776."],
  ["Colonial period and independence", "When was the Declaration of Independence adopted?", "July 4, 1776", ["September 17, 1787", "December 7, 1941", "July 4, 1791"], "Independence Day."],
  ["Colonial period and independence", "There were 13 original states. Which is one of them?", "Virginia", ["Texas", "California", "Florida"], "Others include New York, Pennsylvania and Massachusetts."],
  ["Colonial period and independence", "When was the Constitution written?", "1787", ["1776", "1791", "1812"], "At the Constitutional Convention in Philadelphia."],
  ["Colonial period and independence", "Who is the 'Father of Our Country'?", "George Washington", ["Thomas Jefferson", "John Adams", "Abraham Lincoln"], "He was also the first President."],
  ["Colonial period and independence", "Who was the first President?", "George Washington", ["John Adams", "Thomas Jefferson", "James Madison"], "He served from 1789 to 1797."],
  ["Colonial period and independence", "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.", "James Madison", ["George Washington", "Thomas Paine", "Abraham Lincoln"], "Also Alexander Hamilton and John Jay."],
  ["Colonial period and independence", "What is Benjamin Franklin famous for?", "U.S. diplomat and oldest member of the Constitutional Convention", ["First President", "Writing the Bill of Rights alone", "Leading the Civil War"], "Also first Postmaster General and author of Poor Richard's Almanac."],
  ["1800s", "What territory did the United States buy from France in 1803?", "The Louisiana Territory", ["Alaska", "Florida", "Texas"], "The Louisiana Purchase."],
  ["1800s", "Name the U.S. war between the North and the South.", "The Civil War", ["The War of 1812", "The Revolutionary War", "The Spanish-American War"], "1861–1865."],
  ["1800s", "What did the Emancipation Proclamation do?", "Freed the slaves in most Southern states", ["Ended the Civil War", "Gave women the vote", "Created the Constitution"], "Issued by Lincoln in 1863."],
  ["1800s", "What was one important thing Abraham Lincoln did?", "Preserved the Union during the Civil War", ["Wrote the Declaration of Independence", "Bought Alaska", "Was the first President"], "He also freed the slaves (Emancipation Proclamation)."],
  ["1800s", "What did Susan B. Anthony do?", "Fought for women's rights", ["Wrote the Constitution", "Led the Union army", "Founded the Red Cross"], "She also fought for civil rights."],
  ["Recent American history", "Who was President during World War I?", "Woodrow Wilson", ["Franklin Roosevelt", "Theodore Roosevelt", "Abraham Lincoln"], "The U.S. entered the war in 1917."],
  ["Recent American history", "Who was President during the Great Depression and World War II?", "Franklin Roosevelt", ["Harry Truman", "Herbert Hoover", "Dwight Eisenhower"], "He was elected four times."],
  ["Recent American history", "Before he was President, Eisenhower was a general. What war was he in?", "World War II", ["World War I", "The Korean War", "The Civil War"], "He was Supreme Allied Commander in Europe."],
  ["Recent American history", "What did Martin Luther King, Jr. do?", "Fought for civil rights", ["Was a President", "Wrote the Constitution", "Founded the NAACP alone"], "He worked for equality for all Americans."],
  ["Recent American history", "What major event happened on September 11, 2001, in the United States?", "Terrorists attacked the United States", ["The Iraq War ended", "Hurricane Katrina", "The stock market crash"], "Nearly 3,000 people were killed."],
  ["Geography & symbols", "What is the capital of the United States?", "Washington, D.C.", ["New York City", "Philadelphia", "Boston"], "It is not part of any state."],
  ["Geography & symbols", "Where is the Statue of Liberty?", "New York Harbor (Liberty Island)", ["Washington, D.C.", "Boston Harbor", "San Francisco Bay"], "A gift from France."],
  ["Geography & symbols", "Why does the flag have 13 stripes?", "Because there were 13 original colonies", ["For the 13 amendments", "For 13 Presidents", "For 13 wars"], "The 50 stars represent the 50 states."],
  ["Geography & symbols", "What is the name of the national anthem?", "The Star-Spangled Banner", ["America the Beautiful", "God Bless America", "My Country, 'Tis of Thee"], "Written by Francis Scott Key."],
  ["Geography & symbols", "Name one of the two longest rivers in the United States.", "Mississippi River", ["Hudson River", "Colorado River", "Rio Grande"], "The Missouri River is the other."],
  ["Geography & symbols", "Which ocean is on the West Coast of the United States?", "Pacific Ocean", ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], "The Atlantic is on the East Coast."],
  ["Geography & symbols", "When do we celebrate Independence Day?", "July 4", ["January 1", "November 11", "September 17"], "Marks the Declaration of Independence."],
];

// ---------------------------------------------------------------------------
// Canada citizenship (CAN) — Discover Canada
// ---------------------------------------------------------------------------
const CAN: F[] = [
  ["Government", "Canada is a constitutional monarchy, a parliamentary democracy and a", "federal state", ["republic", "unitary state with no provinces", "direct democracy"], "Three key facts about Canada's system of government."],
  ["Government", "Who is Canada's Head of State?", "The Sovereign (the King of Canada)", ["The Prime Minister", "The Governor General", "The Chief Justice"], "The Governor General represents the Sovereign in Canada."],
  ["Government", "Who represents the Sovereign in Canada?", "The Governor General", ["The Prime Minister", "The Premier of Ontario", "The Speaker of the Senate"], "Lieutenant Governors represent the Sovereign in the provinces."],
  ["Government", "Who is the head of the federal government?", "The Prime Minister", ["The Governor General", "The King", "The Chief Justice"], "The PM selects Cabinet ministers."],
  ["Government", "What are the three parts of Parliament?", "The Sovereign, the Senate and the House of Commons", ["The PM, the Cabinet and the courts", "The provinces, territories and cities", "The House, the Senate and the Supreme Court"], "Bills must pass both Houses and receive Royal Assent."],
  ["Government", "Members of the House of Commons are called", "Members of Parliament (MPs)", ["Senators", "Premiers", "Lieutenant Governors"], "They are elected in federal elections."],
  ["Government", "How are senators chosen?", "Appointed by the Governor General on the advice of the Prime Minister", ["Elected by citizens", "Chosen by provinces", "Inherited"], "They serve until age 75."],
  ["Government", "What is the head of a provincial government called?", "Premier", ["Prime Minister", "Governor", "Mayor"], "Territories also have premiers."],
  ["Government", "How many provinces and territories does Canada have?", "10 provinces and 3 territories", ["13 provinces", "12 provinces and 1 territory", "9 provinces and 4 territories"], "Territories: Yukon, Northwest Territories and Nunavut."],
  ["Government", "What is the minimum voting age in federal elections?", "18", ["16", "19", "21"], "Voters must be Canadian citizens."],
  ["Government", "Elections are held using which system?", "First past the post — the candidate with the most votes wins", ["Proportional representation", "Ranked choice nationally", "The Senate chooses the winner"], "Each riding elects one MP."],
  ["Rights & responsibilities", "In what year was the Canadian Charter of Rights and Freedoms entrenched in the Constitution?", "1982", ["1867", "1931", "1960"], "Part of the Constitution Act, 1982."],
  ["Rights & responsibilities", "Which of these is a responsibility of citizenship?", "Serving on a jury when called", ["Owning a home", "Joining a political party", "Learning both official languages fluently"], "Others include voting, obeying the law and helping others."],
  ["Rights & responsibilities", "What are Canada's two official languages?", "English and French", ["English and Inuktitut", "French and Spanish", "English and Cree"], "Protected by the Official Languages Act."],
  ["Rights & responsibilities", "Which right is protected by the Charter?", "Mobility rights — to live and work anywhere in Canada", ["The right to free housing", "The right to carry weapons", "The right to vote at 16"], "Also freedom of expression, religion and peaceful assembly."],
  ["History", "In what year did Canada become a country (Confederation)?", "1867", ["1763", "1812", "1982"], "July 1, 1867 — now Canada Day."],
  ["History", "Which four provinces joined Confederation first?", "Ontario, Quebec, Nova Scotia and New Brunswick", ["Ontario, Quebec, Manitoba and BC", "Quebec, Nova Scotia, PEI and Newfoundland", "Ontario, Alberta, Saskatchewan and Manitoba"], "The Fathers of Confederation created the Dominion of Canada."],
  ["History", "Who was Canada's first Prime Minister?", "Sir John A. Macdonald", ["Sir Wilfrid Laurier", "Sir George-Étienne Cartier", "Lester B. Pearson"], "He served from 1867."],
  ["History", "Who was the first French-Canadian Prime Minister since Confederation?", "Sir Wilfrid Laurier", ["Pierre Trudeau", "Louis St. Laurent", "Jean Chrétien"], "His portrait is on the $5 bill."],
  ["History", "What were the Aboriginal peoples of Canada called collectively in the Constitution?", "Indian (First Nations), Inuit and Métis", ["Iroquois, Huron and Cree", "Algonquin and Haida", "Settlers and Natives"], "Three distinct groups."],
  ["History", "What is the Battle of Vimy Ridge (1917) remembered for?", "A defining Canadian victory in the First World War", ["Ending the War of 1812", "The start of Confederation", "A Second World War naval battle"], "Over 10,000 Canadians were killed or wounded."],
  ["History", "What did the Canadian Pacific Railway, completed in 1885, do?", "Linked Canada from coast to coast", ["Connected Canada to the USA only", "Ran only in Quebec", "Carried oil from Alberta"], "It helped unite the country."],
  ["History", "When is Remembrance Day?", "November 11", ["July 1", "May 24", "June 21"], "Canadians wear the poppy to honour those who served."],
  ["Geography", "What is the capital of Canada?", "Ottawa", ["Toronto", "Montreal", "Vancouver"], "Located in Ontario."],
  ["Geography", "What is the capital of Quebec?", "Quebec City", ["Montreal", "Ottawa", "Sherbrooke"], "Montreal is the largest city in Quebec."],
  ["Geography", "What is the capital of British Columbia?", "Victoria", ["Vancouver", "Kelowna", "Surrey"], "On Vancouver Island."],
  ["Geography", "What is the capital of Alberta?", "Edmonton", ["Calgary", "Red Deer", "Banff"], "Calgary is Alberta's largest city."],
  ["Geography", "What is the capital of Nova Scotia?", "Halifax", ["Sydney", "Truro", "Moncton"], "A major Atlantic port."],
  ["Geography", "What is the capital of Nunavut?", "Iqaluit", ["Yellowknife", "Whitehorse", "Rankin Inlet"], "Nunavut was created in 1999."],
  ["Geography", "Which ocean borders Canada to the north?", "The Arctic Ocean", ["The Pacific Ocean", "The Atlantic Ocean", "The Indian Ocean"], "Canada's motto refers to 'from sea to sea'."],
  ["Geography", "Which is Canada's most populous province?", "Ontario", ["Quebec", "British Columbia", "Alberta"], "More than a third of Canadians live in Ontario."],
  ["Symbols", "What is on the Canadian flag?", "A red maple leaf", ["A beaver", "A crown", "A moose"], "Adopted in 1965."],
  ["Symbols", "What is the national anthem of Canada?", "O Canada", ["God Save the King", "The Maple Leaf Forever", "True North"], "Proclaimed the national anthem in 1980."],
  ["Symbols", "What is Canada's motto?", "From sea to sea (A mari usque ad mare)", ["Peace, order and good government", "Strong and free", "Unity in diversity"], "'Peace, order and good government' is from the Constitution."],
];

// ---------------------------------------------------------------------------
// Australia citizenship (AUS)
// ---------------------------------------------------------------------------
const AUS: F[] = [
  ["Australia and its people", "What is the capital city of Australia?", "Canberra", ["Sydney", "Melbourne", "Brisbane"], "Located in the Australian Capital Territory."],
  ["Australia and its people", "Who were the first inhabitants of Australia?", "Aboriginal and Torres Strait Islander peoples", ["British settlers", "Dutch explorers", "Pacific Islanders"], "They have lived in Australia for tens of thousands of years."],
  ["Australia and its people", "What is Australia's national language?", "English", ["There is no common language", "Latin", "Indigenous languages only"], "English is the national language."],
  ["Australia and its people", "When did the First Fleet arrive from Great Britain?", "1788", ["1770", "1901", "1850"], "Australia Day (26 January) marks this anniversary."],
  ["Australia and its people", "What happened on 1 January 1901?", "The Australian colonies united to form the Commonwealth of Australia (Federation)", ["Australia became a republic", "Captain Cook arrived", "The gold rush began"], "Federation."],
  ["Australia and its people", "What are the colours of the Australian Aboriginal Flag?", "Black, red and yellow", ["Green and gold", "Blue, white and red", "Red, white and green"], "Recognised as an official flag of Australia."],
  ["Australia and its people", "What are Australia's national colours?", "Green and gold", ["Red and white", "Blue and white", "Black and yellow"], "Used in national sports uniforms."],
  ["Australia and its people", "What is Australia's floral emblem?", "Golden wattle", ["Waratah", "Rose", "Eucalyptus"], "National Wattle Day is 1 September."],
  ["Australia and its people", "Which of these is a state of Australia?", "Queensland", ["Northern Territory", "Australian Capital Territory", "Tasman Territory"], "The six states: NSW, Victoria, Queensland, WA, SA and Tasmania."],
  ["Australia and its people", "How many states does Australia have?", "Six", ["Five", "Seven", "Eight"], "Plus two major mainland territories."],
  ["Australia and its people", "What is the capital of Victoria?", "Melbourne", ["Geelong", "Ballarat", "Canberra"], "Victoria's capital."],
  ["Australia and its people", "What is the capital of Western Australia?", "Perth", ["Darwin", "Adelaide", "Broome"], "Darwin is the capital of the Northern Territory."],
  ["Australia and its people", "What is the capital of Tasmania?", "Hobart", ["Launceston", "Devonport", "Canberra"], "Tasmania is an island state."],
  ["Australia and its people", "What is ANZAC Day (25 April) about?", "Remembering Australians who served and died in war", ["Celebrating Federation", "Marking the First Fleet's arrival", "Honouring the King's birthday"], "It marks the Gallipoli landing in 1915."],
  ["Democratic beliefs, rights and liberties", "Which of these is a responsibility of Australian citizens aged 18 or over?", "Voting in federal and state or territory elections", ["Joining a political party", "Owning property", "Becoming a public servant"], "Voting is compulsory."],
  ["Democratic beliefs, rights and liberties", "Which of these is an example of freedom of speech?", "People can peacefully protest against government decisions", ["People can say anything, even if it incites violence", "Only politicians can criticise the government", "Newspapers must be approved by the government"], "Freedom of speech has limits under the law."],
  ["Democratic beliefs, rights and liberties", "What does 'equality of men and women' mean in Australia?", "Men and women have equal rights", ["Men make the important decisions", "Women cannot vote", "Only men can work in government"], "A core Australian value."],
  ["Democratic beliefs, rights and liberties", "What is a 'fair go'?", "Everyone has equal opportunity, and what someone achieves comes from their effort", ["Everyone gets the same income", "Only citizens deserve help", "Winning at all costs"], "A commonly held Australian value."],
  ["Democratic beliefs, rights and liberties", "Is it a requirement to vote in federal elections for Australian citizens aged 18 or over?", "Yes, voting is compulsory", ["No, voting is optional", "Only for people born in Australia", "Only in state elections"], "Enrolment and voting are compulsory."],
  ["Government and the law", "Who is Australia's Head of State?", "The King of Australia", ["The Prime Minister", "The Governor-General", "The Chief Justice"], "Represented in Australia by the Governor-General."],
  ["Government and the law", "What is the name of the legal document that sets out the rules for the government of Australia?", "The Australian Constitution", ["The Magna Carta", "The Statute of Westminster", "The Bill of Rights"], "Changing it requires a referendum."],
  ["Government and the law", "What is a referendum?", "A vote to change the Australian Constitution", ["An election for Prime Minister", "A court case", "A census of the population"], "A majority of voters nationally and in a majority of states must agree."],
  ["Government and the law", "What are the two houses of the federal Parliament?", "The House of Representatives and the Senate", ["The Senate and the Cabinet", "The High Court and the Senate", "The House of Lords and the House of Commons"], "Parliament makes federal laws."],
  ["Government and the law", "Who is the leader of the Australian Government?", "The Prime Minister", ["The Governor-General", "The King", "The Speaker"], "Usually the leader of the party with majority support in the House of Representatives."],
  ["Government and the law", "What is the name of the highest court in Australia?", "The High Court of Australia", ["The Supreme Court of Australia", "The Federal Circuit Court", "The Privy Council"], "It interprets the Constitution."],
  ["Government and the law", "Which arm of government has the power to interpret and apply laws?", "The judiciary", ["The executive", "The legislature", "The public service"], "Separation of powers."],
  ["Government and the law", "Which number should you call in an emergency in Australia?", "000", ["999", "911", "112 only"], "Triple zero for police, fire or ambulance."],
];

// ---------------------------------------------------------------------------
// Gulf nursing licensing (GNX) — international practice, SI units
// ---------------------------------------------------------------------------
const GNX: F[] = [
  ["Fundamentals", "What is the normal adult fasting blood glucose range in SI units?", "3.9–5.5 mmol/L", ["7.0–11.0 mmol/L", "1.5–3.0 mmol/L", "70–100 mmol/L"], "70–100 mg/dL is the equivalent in conventional units."],
  ["Fundamentals", "What is the normal adult serum potassium?", "3.5–5.0 mmol/L", ["135–145 mmol/L", "2.0–3.0 mmol/L", "5.5–7.0 mmol/L"], "Both hypo- and hyperkalaemia can cause arrhythmias."],
  ["Fundamentals", "What is the normal adult resting respiratory rate?", "12–20 breaths per minute", ["5–10 breaths per minute", "25–35 breaths per minute", "40–60 breaths per minute"], "A raised rate is an early sign of deterioration."],
  ["Fundamentals", "Which is the most reliable site for measuring core temperature in critical care?", "Pulmonary artery (or oesophageal) probe", ["Axilla", "Forehead strip", "Oral after a hot drink"], "Tympanic and temporal readings are common but less accurate."],
  ["Fundamentals", "Which is the correct technique for hand hygiene with soap and water?", "Wet hands, apply soap, rub all surfaces for 40–60 seconds, rinse and dry", ["Rinse with water only for 5 seconds", "Use alcohol rub on visibly soiled hands", "Wipe with a dry towel"], "WHO technique; alcohol rub takes 20–30 seconds on non-soiled hands."],
  ["Fundamentals", "WHO's 'Five Moments for Hand Hygiene' include", "before touching a patient", ["only after leaving the ward", "only after removing gloves at the end of a shift", "before eating lunch"], "Before patient contact, before aseptic tasks, after body fluid exposure, after patient contact, after touching surroundings."],
  ["Safety", "Which patient identifiers should be checked before giving medication?", "At least two identifiers, such as full name and date of birth (or ID number)", ["Bed number only", "The patient's diagnosis", "The ward name"], "Bed numbers are never an identifier."],
  ["Safety", "The 'rights' of medication administration include", "right patient, drug, dose, route and time", ["right nurse, ward and shift", "right price and supplier", "right doctor only"], "Many hospitals add right documentation and right reason."],
  ["Safety", "A nurse discovers a medication error. What should be done FIRST?", "Assess and monitor the patient", ["Complete the incident report", "Inform the family", "Call the pharmacy"], "Then inform the physician and report per policy."],
  ["Safety", "Which isolation is required for a patient with suspected pulmonary tuberculosis?", "Airborne isolation in a negative-pressure room with N95 respirators", ["Contact isolation", "Droplet isolation only", "Standard precautions only"], "Measles and varicella also need airborne precautions."],
  ["Safety", "Which precautions are used for MRSA?", "Contact precautions", ["Airborne precautions", "Droplet precautions only", "Protective isolation"], "Gloves and gown, dedicated equipment."],
  ["Medical-surgical", "A post-operative patient has a sudden drop in blood pressure, tachycardia and cool clammy skin. The nurse suspects", "hypovolaemic (haemorrhagic) shock", ["normal post-operative recovery", "fluid overload", "hyperthermia"], "Check the wound and drains, give oxygen, escalate urgently."],
  ["Medical-surgical", "Which position is best for a patient with acute pulmonary oedema?", "Upright (high Fowler's) with legs dependent", ["Flat supine", "Trendelenburg", "Prone"], "Reduces venous return and eases breathing."],
  ["Medical-surgical", "What is the first sign of compartment syndrome?", "Pain out of proportion, worse on passive stretch", ["Pulselessness", "Paralysis", "Pallor only"], "Pulselessness is a late sign."],
  ["Medical-surgical", "A diabetic patient is sweating, shaky and confused with glucose 2.8 mmol/L but can swallow. What should the nurse give first?", "15–20 g of fast-acting glucose orally", ["Insulin", "A large meal only", "Nothing until the doctor arrives"], "Recheck glucose after 15 minutes."],
  ["Medical-surgical", "Which finding requires immediate action in a patient receiving a blood transfusion?", "Fever, chills and back pain in the first 15 minutes", ["A slight rise in temperature after 3 hours", "Feeling hungry", "Mild tiredness"], "Stop the transfusion, keep the line open with saline and inform the physician."],
  ["Medical-surgical", "Which ECG change is typical of hyperkalaemia?", "Peaked T waves", ["U waves", "ST depression only", "Prolonged PR in all cases"], "Hypokalaemia shows U waves and flat T waves."],
  ["Maternal & child", "What is the normal fetal heart rate?", "110–160 beats per minute", ["60–100 beats per minute", "170–200 beats per minute", "90–110 beats per minute"], "Sustained rates outside the range need review."],
  ["Maternal & child", "What should the nurse do first when finding a boggy uterus after delivery with heavy bleeding?", "Massage the fundus", ["Give oral iron", "Encourage walking", "Apply ice to the perineum only"], "Uterine atony is the commonest cause of postpartum haemorrhage."],
  ["Maternal & child", "The APGAR score is assessed at", "1 and 5 minutes after birth", ["24 hours after birth", "Only at 10 minutes", "Before birth"], "Appearance, pulse, grimace, activity, respiration."],
  ["Maternal & child", "Which immunisation is given at birth in most national schedules?", "BCG and hepatitis B (per country schedule)", ["MMR", "Varicella", "HPV"], "Follow the national immunisation schedule."],
  ["Mental health", "A patient says they plan to end their life tonight. What is the nurse's priority?", "Ensure the patient's safety and do not leave them alone", ["Promise to keep it secret", "Give them privacy", "Change the subject"], "Escalate to the team immediately."],
  ["Mental health", "Which is an example of therapeutic communication?", "'Tell me more about what is worrying you.'", ["'Don't worry, everything will be fine.'", "'Why did you do that?'", "'You shouldn't feel like that.'"], "Open-ended, non-judgemental questions."],
  ["Professional practice", "A patient refuses a procedure after it is explained. The patient is competent. What should the nurse do?", "Respect the decision, inform the physician and document it", ["Do the procedure anyway", "Ask the family to override", "Sedate the patient"], "Competent adults can refuse treatment."],
  ["Professional practice", "Which document confirms a nurse's credentials before taking a Gulf licensing exam?", "Primary source verification (for example through DataFlow)", ["A hospital ID card", "A bank statement", "A driving licence"], "Licensing authorities require verified education and experience."],
];
const gulfDoses = (): Q[] =>
  repeat(20, () => {
    const ordered = pick([250, 500, 125, 750, 1000]), have = pick([125, 250, 500]), per = pick([1, 5]);
    const ans = (ordered / have) * per;
    if (!Number.isInteger(ans * 10) || ans > 10) return null;
    const unit = per === 1 ? "tablet(s)" : "mL";
    return mcq("GNX", "Medication calculations", `Ordered: ${ordered} mg. Available: ${have} mg per ${per === 1 ? "tablet" : `${per} mL`}. How much should be given?`, `${fmt(ans)} ${unit}`, numOpts(ans, [ans * 2, ans / 2, ordered / have + 1], unit), `${ordered} ÷ ${have} × ${per} = ${fmt(ans)} ${unit}.`, 1);
  });

// ---------------------------------------------------------------------------
// IELTS vocabulary & grammar (IEV)
// ---------------------------------------------------------------------------
const IEV: F[] = [
  ["Grammar", "Choose the correct option: 'If I ______ more time, I would travel more.'", "had", ["have", "will have", "would have"], "Second conditional: if + past simple, would + infinitive."],
  ["Grammar", "Choose the correct option: 'By the time we arrived, the film ______.'", "had already started", ["already started", "has already started", "starts"], "Past perfect for an action completed before another past action."],
  ["Grammar", "Choose the correct option: 'She has lived in London ______ 2015.'", "since", ["for", "from", "during"], "Since + a point in time; for + a period."],
  ["Grammar", "Choose the correct option: 'Neither the manager nor the staff ______ aware of the change.'", "were", ["was", "is", "has been"], "With neither…nor, the verb agrees with the nearer subject."],
  ["Grammar", "Choose the correct option: 'The number of students ______ increased significantly.'", "has", ["have", "are", "were"], "'The number of' takes a singular verb."],
  ["Grammar", "Choose the correct option: 'This is the city ______ I was born.'", "where", ["which", "who", "whose"], "Use 'where' for places."],
  ["Grammar", "Choose the correct option: 'He suggested ______ the meeting until Friday.'", "postponing", ["to postpone", "postpone", "postponed"], "'Suggest' is followed by -ing (or 'that' + clause)."],
  ["Grammar", "Choose the correct option: 'The report ______ by the committee last week.'", "was approved", ["approved", "has approved", "is approving"], "Passive voice in the past."],
  ["Grammar", "Choose the correct option: 'Hardly ______ arrived when it started to rain.'", "had we", ["we had", "we have", "did we"], "Inversion after negative adverbials."],
  ["Grammar", "Choose the correct option: 'I'm used to ______ early.'", "getting up", ["get up", "got up", "have got up"], "'Be used to' + -ing means accustomed to."],
  ["Vocabulary", "Which word best completes the sentence? 'Unemployment rose ______ between 2010 and 2015.' (Writing Task 1)", "steadily", ["steady", "steadiness", "steadied"], "An adverb describes how the trend changed."],
  ["Vocabulary", "Which word means 'to make something less severe'?", "mitigate", ["exacerbate", "aggravate", "intensify"], "Exacerbate means make worse."],
  ["Vocabulary", "Which word means 'happening every year'?", "annual", ["biannual (twice a year)", "perennial only of plants", "decade"], "Biannual means twice a year; biennial every two years."],
  ["Vocabulary", "Choose the best word: 'The government should ______ more funding to public transport.'", "allocate", ["allow", "allude", "allot to"], "Allocate funding."],
  ["Vocabulary", "Which word is a formal synonym for 'show' in academic writing?", "illustrate", ["reckon", "sort out", "get across"], "Prefer formal vocabulary in Task 2."],
  ["Vocabulary", "Which linking word introduces a contrast?", "Nevertheless", ["Furthermore", "Consequently", "For instance"], "Furthermore adds; consequently shows result; for instance gives an example."],
  ["Vocabulary", "Which linking phrase introduces a result?", "As a result", ["On the other hand", "In addition", "Similarly"], "Used to show cause and effect."],
  ["Vocabulary", "Choose the correct collocation: 'to ______ a decision'", "make", ["do", "take up", "give"], "Make a decision (British English also accepts 'take a decision')."],
  ["Vocabulary", "Choose the correct collocation: 'to ______ research'", "carry out", ["make", "do up", "perform up"], "Carry out (or conduct / do) research."],
  ["Vocabulary", "Which word means 'able to be maintained over a long period'?", "sustainable", ["obsolete", "temporary", "volatile"], "Common in environment topics."],
  ["Vocabulary", "In Writing Task 1, which phrase describes a sharp fall?", "plummeted", ["levelled off", "fluctuated", "peaked"], "Levelled off = stayed stable; fluctuated = rose and fell."],
  ["Vocabulary", "Which word best fits: 'There is a ______ correlation between exercise and life expectancy.'", "positive", ["positively", "positivity", "positiveness"], "An adjective is needed before the noun."],
  ["Exam technique", "In IELTS Reading, a 'Not Given' answer means", "the text contains no information about the statement", ["the statement contradicts the text", "the statement agrees with the text", "the answer is uncertain to the writer"], "False means the text says the opposite."],
  ["Exam technique", "How many words should an IELTS Writing Task 2 essay contain at minimum?", "250", ["150", "200", "400"], "Task 1 needs at least 150 words."],
  ["Exam technique", "How long is the IELTS Listening test (excluding transfer time)?", "About 30 minutes", ["60 minutes", "15 minutes", "2 hours"], "Paper-based tests add 10 minutes to transfer answers."],
  ["Exam technique", "IELTS Writing is marked on Task Achievement/Response, Coherence and Cohesion, Lexical Resource and", "Grammatical Range and Accuracy", ["Handwriting", "Speed", "Word count only"], "Each criterion is 25% of the band."],
];

// ---------------------------------------------------------------------------
// Verbal reasoning for graduate tests (VRB) — True / False / Cannot say
// ---------------------------------------------------------------------------
const VRB_PASSAGES: [string, [string, "True" | "False" | "Cannot say", string][]][] = [
  ["Remote work has grown rapidly since 2020. A survey of 2,000 firms found that 60% now offer at least one remote day per week, up from 20% before 2020. However, only 15% allow staff to work fully remotely, and most of these are technology companies.", [
    ["Most of the surveyed firms offer at least one remote day per week.", "True", "60% is a majority."],
    ["Fewer firms offered remote days before 2020 than now.", "True", "20% before vs 60% now."],
    ["Remote workers are more productive than office workers.", "Cannot say", "The passage says nothing about productivity."],
    ["Most firms allow staff to work fully remotely.", "False", "Only 15% do."],
  ]],
  ["The company's new warehouse will open in March and employ 300 people. Construction costs rose by 12% because of higher steel prices, but the project remains within its overall budget thanks to savings on land.", [
    ["The warehouse project has gone over its overall budget.", "False", "It remains within budget."],
    ["Steel prices contributed to higher construction costs.", "True", "Stated directly."],
    ["The warehouse will employ more than 250 people.", "True", "300 people."],
    ["The warehouse will open ahead of schedule.", "Cannot say", "No schedule comparison is given."],
  ]],
  ["Solar power accounted for 5% of the country's electricity last year. The government aims to reach 20% by 2035. Critics say the target cannot be met without major investment in battery storage, which is currently limited.", [
    ["The government's target is to quadruple the share of solar electricity.", "True", "5% to 20% is four times."],
    ["Battery storage is widely available in the country.", "False", "It is described as limited."],
    ["Solar power will reach 20% by 2035.", "Cannot say", "It is only a target."],
    ["Critics oppose the use of solar power.", "Cannot say", "They question whether the target can be met, not solar power itself."],
  ]],
  ["All employees must complete data protection training each year. Staff who miss the deadline lose access to customer records until they finish the course. Contractors are covered by a separate policy.", [
    ["An employee who misses the deadline can still access customer records.", "False", "They lose access."],
    ["Contractors must complete the same annual training as employees.", "Cannot say", "Their policy is separate and not described."],
    ["Data protection training is required every year for employees.", "True", "Stated directly."],
  ]],
  ["The city's bus network carried 40 million passengers last year, 5% fewer than the year before. Ticket prices were unchanged, but two major routes were closed for roadworks for six months.", [
    ["Bus passenger numbers fell last year.", "True", "5% fewer."],
    ["The fall in passengers was caused by the roadworks.", "Cannot say", "The passage does not state the cause."],
    ["Ticket prices rose last year.", "False", "They were unchanged."],
  ]],
];

// ---------------------------------------------------------------------------
// PMP (PMP)
// ---------------------------------------------------------------------------
const PMP: F[] = [
  ["People", "Two team members disagree strongly about a technical approach. What should the project manager do first?", "Meet with both to understand each view and find a collaborative solution", ["Choose the approach personally and move on", "Escalate to the sponsor immediately", "Ignore it until it affects the schedule"], "Collaborating/problem solving is usually best for lasting resolution."],
  ["People", "A new hybrid team is struggling to work together. Which action best supports team performance?", "Agree a team charter with ground rules and working agreements", ["Increase status reporting", "Replace team members", "Hold all meetings in person only"], "A team charter sets shared values and working norms."],
  ["People", "In an agile team, who is primarily responsible for removing impediments?", "The servant leader (e.g. Scrum Master / project manager)", ["The sponsor", "The customer", "Each stakeholder separately"], "Servant leadership supports the team."],
  ["People", "A team member is consistently missing deadlines. What should the project manager do first?", "Talk with the team member privately to understand the cause", ["Report them to HR", "Reassign all their work", "Raise it in the next team meeting"], "Address issues privately and seek root causes."],
  ["Process", "A stakeholder requests a significant change during execution. What should the project manager do first?", "Evaluate the impact of the change", ["Implement it to keep the stakeholder happy", "Reject it outright", "Ask the team to work overtime"], "Then submit it through integrated change control."],
  ["Process", "Which document formally authorises a project and the project manager?", "Project charter", ["Project management plan", "Scope statement", "Stakeholder register"], "Issued by the sponsor."],
  ["Process", "A risk has occurred. What should the project manager do?", "Implement the planned risk response and update the issue log", ["Start risk identification", "Ignore it if it is small", "Add it to the lessons learned only"], "Once a risk occurs it becomes an issue."],
  ["Process", "What is the main purpose of a retrospective?", "To inspect how the team works and agree improvements", ["To demo the product to stakeholders", "To estimate the backlog", "To approve the budget"], "Continuous improvement."],
  ["Process", "Which estimating technique uses the weighted average (O + 4M + P) / 6?", "Three-point (PERT/beta) estimating", ["Analogous estimating", "Parametric estimating", "Bottom-up estimating"], "It accounts for uncertainty."],
  ["Process", "A project has CPI 0.8 and SPI 1.1. What does this mean?", "Over budget and ahead of schedule", ["Under budget and behind schedule", "Over budget and behind schedule", "On budget and on schedule"], "CPI < 1 = over budget; SPI > 1 = ahead."],
  ["Process", "When should lessons learned be captured?", "Throughout the project", ["Only at closure", "Only after failures", "Only by the sponsor"], "Captured continuously and shared."],
  ["Business environment", "A new regulation will affect the project. What should the project manager do first?", "Assess the impact on the project", ["Ignore it until audited", "Cancel the project", "Ask the team to decide"], "Then update plans through change control."],
  ["Business environment", "What is the main purpose of a benefits management plan?", "To describe how and when the project's benefits will be delivered and measured", ["To list team members' bonuses", "To track daily tasks", "To record risks"], "Links the project to business value."],
  ["Business environment", "Which approach best suits a project with highly uncertain, changing requirements?", "An adaptive (agile) approach", ["A strictly predictive approach", "No planning at all", "A fixed-price contract with frozen scope"], "Frequent feedback handles change."],
];

// ---------------------------------------------------------------------------
// ACCA / ICAN foundation papers: Business & Technology (ABT), Management Accounting (AMA), Financial Accounting (AFA)
// ---------------------------------------------------------------------------
const ABT: F[] = [
  ["Business organisation", "Which type of organisation is owned by shareholders whose liability is limited?", "A limited company", ["A sole trader", "A partnership (general)", "A charity trust only"], "Shareholders can lose only what they invested."],
  ["Business organisation", "In Mintzberg's model, which part of the organisation directly produces goods and services?", "The operating core", ["The strategic apex", "The technostructure", "The support staff"], "The strategic apex is senior management."],
  ["Business organisation", "A tall organisation structure typically has", "many levels of management and narrow spans of control", ["few levels and wide spans of control", "no managers", "only project teams"], "Flat structures have wide spans."],
  ["Corporate governance", "What is the main purpose of corporate governance?", "To direct and control companies in shareholders' and stakeholders' interests", ["To maximise directors' pay", "To prepare tax returns", "To set product prices"], "It covers accountability, transparency and fairness."],
  ["Corporate governance", "Which committee is usually responsible for overseeing external audit?", "The audit committee", ["The remuneration committee", "The nomination committee", "The sales committee"], "Made up of independent non-executive directors."],
  ["Environment", "PESTEL analysis examines", "political, economic, social, technological, environmental and legal factors", ["prices, earnings, sales, tax, equity and liquidity", "staff performance only", "competitors' strengths only"], "An external environment tool."],
  ["Environment", "In Porter's five forces, the threat of new entrants is reduced by", "high barriers to entry, such as economies of scale", ["low capital requirements", "many small suppliers", "weak brand loyalty"], "Barriers protect existing firms."],
  ["Leadership & teams", "In Tuckman's model, which stage involves conflict over roles and goals?", "Storming", ["Forming", "Norming", "Performing"], "Order: forming, storming, norming, performing, adjourning."],
  ["Leadership & teams", "According to Herzberg, which is a hygiene factor rather than a motivator?", "Salary", ["Recognition", "Achievement", "Responsibility"], "Hygiene factors prevent dissatisfaction."],
  ["Ethics", "Which is one of the fundamental principles in the ACCA Code of Ethics?", "Objectivity", ["Profitability", "Loyalty to the employer above all", "Secrecy"], "Others: integrity, professional competence and due care, confidentiality, professional behaviour."],
  ["Ethics", "An accountant is asked to approve a loan to a relative's company. This is a threat of", "self-interest / familiarity", ["self-review only", "advocacy only", "no threat"], "Safeguards or withdrawal are needed."],
  ["Internal control", "Separating the authorisation, recording and custody of assets is an example of", "segregation of duties", ["reconciliation", "budgeting", "benchmarking"], "It reduces fraud and error."],
];
function ama(): Q[] {
  const qs: Q[] = [];
  qs.push(...repeat(15, () => {
    const price = ri(10, 60), vc = ri(4, price - 3), fixed = ri(5, 60) * 1000;
    const cpu = price - vc;
    const be = Math.ceil(fixed / cpu);
    return mcq("AMA", "Cost-volume-profit", `A product sells for $${price} with variable cost $${vc} per unit. Fixed costs are $${fixed.toLocaleString("en-US")}. What is the breakeven point in units (rounded up)?`, be.toLocaleString("en-US"), numOpts(be, [Math.ceil(fixed / price), Math.ceil(fixed / vc), be + 100]).map((v) => Number(v.replace(/,/g, "")).toLocaleString("en-US")),
      `Contribution per unit = ${price} − ${vc} = $${cpu}. Breakeven = ${fixed.toLocaleString("en-US")} ÷ ${cpu} = ${be.toLocaleString("en-US")} units.`, 2);
  }));
  qs.push(...repeat(12, () => {
    const d = pick([1200, 2400, 3600, 4800, 6000, 9600, 12000]), co = pick([20, 25, 40, 50, 60, 75, 80]), ch = pick([2, 3, 4, 5, 6, 8]);
    const eoq = Math.sqrt((2 * co * d) / ch);
    if (!Number.isInteger(eoq)) return null;
    return mcq("AMA", "Inventory", `Annual demand is ${d.toLocaleString("en-US")} units, ordering cost $${co} per order and holding cost $${ch} per unit per year. What is the economic order quantity (EOQ)?`, `${eoq} units`, numOpts(eoq, [eoq * 2, Math.round(eoq / 2), Math.round(Math.sqrt((co * d) / ch))], "units"), `EOQ = √(2 × ${co} × ${d} ÷ ${ch}) = √${(2 * co * d) / ch} = ${eoq} units.`, 2);
  }));
  qs.push(...repeat(12, () => {
    const std = pick([4, 5, 6, 8, 10]), act = std + pick([-1, 1, 2, -2]) * 0.5, qty = ri(2, 20) * 100;
    const v = (std - act) * qty;
    if (v === 0) return null;
    return mcq("AMA", "Variances", `The standard price of material is $${std}/kg. ${qty.toLocaleString("en-US")} kg were bought at $${act}/kg. What is the material price variance?`, `$${Math.abs(v).toLocaleString("en-US")} ${v > 0 ? "favourable" : "adverse"}`,
      [`$${Math.abs(v).toLocaleString("en-US")} ${v > 0 ? "adverse" : "favourable"}`, `$${(Math.abs(v) * 2).toLocaleString("en-US")} ${v > 0 ? "favourable" : "adverse"}`, `$${(std * qty).toLocaleString("en-US")} adverse`], `(Standard price − actual price) × actual quantity = (${std} − ${act}) × ${qty} = ${v}. Paying ${v > 0 ? "less" : "more"} than standard is ${v > 0 ? "favourable" : "adverse"}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const units = ri(2, 20) * 1000, fixed = ri(10, 80) * 1000, vc = ri(2, 15);
    const total = fixed + units * vc;
    const unitCost = Math.round((total / units) * 100) / 100;
    return mcq("AMA", "Cost behaviour", `Fixed costs are $${fixed.toLocaleString("en-US")} and variable cost is $${vc} per unit. What is the total cost per unit at ${units.toLocaleString("en-US")} units?`, `$${fmt(unitCost)}`, numOpts(unitCost, [vc, fixed / units, unitCost * 2]).map((v) => `$${v}`), `Total cost = ${fixed} + ${units} × ${vc} = ${total.toLocaleString("en-US")}; ÷ ${units} = $${fmt(unitCost)}.`, 1);
  }));
  return qs;
}
function afa(): Q[] {
  const qs: Q[] = [];
  const AFA_FACTS: F[] = [
    ["Framework", "Which qualitative characteristic means information makes a difference to users' decisions?", "Relevance", ["Comparability", "Timeliness", "Understandability"], "Relevance and faithful representation are the fundamental characteristics."],
    ["Framework", "Which accounting concept assumes the business will continue to operate for the foreseeable future?", "Going concern", ["Accruals", "Prudence", "Materiality"], "If not, assets may be valued on a break-up basis."],
    ["Framework", "Under the accruals concept, transactions are recorded", "when they occur, not when cash is received or paid", ["only when cash moves", "at the year end only", "when the auditor approves"], "Matches income and expenses to the period."],
    ["Double entry", "A business pays a supplier $500 it owed. What is the double entry?", "Debit payables $500, credit cash $500", ["Debit cash, credit payables", "Debit purchases, credit cash", "Debit payables, credit purchases"], "The liability falls and cash falls."],
    ["Inventory", "Under IAS 2, inventory is valued at", "the lower of cost and net realisable value", ["selling price", "replacement cost", "the higher of cost and NRV"], "NRV = estimated selling price less costs to complete and sell."],
    ["Non-current assets", "Under IAS 16, which cost should NOT be capitalised as part of property, plant and equipment?", "Staff training to use the new machine", ["Delivery costs", "Installation costs", "Purchase price"], "Training is an expense."],
    ["Statements", "Which statement shows a company's assets, liabilities and equity at a point in time?", "Statement of financial position", ["Statement of profit or loss", "Statement of cash flows", "Statement of changes in equity"], "Formerly called the balance sheet."],
    ["Statements", "Under IAS 7, interest paid can be classified in", "operating or financing activities", ["investing activities only", "equity", "other comprehensive income only"], "The choice must be applied consistently."],
  ];
  qs.push(...facts("AFA", AFA_FACTS));
  qs.push(...repeat(12, () => {
    const cost = ri(10, 100) * 1000, rv = ri(0, 10) * 500, yrs = pick([4, 5, 8, 10]);
    const dep = (cost - rv) / yrs;
    if (!Number.isInteger(dep)) return null;
    return mcq("AFA", "Non-current assets", `A machine costs $${cost.toLocaleString("en-US")}, has a residual value of $${rv.toLocaleString("en-US")} and a useful life of ${yrs} years. What is the annual straight-line depreciation?`, `$${dep.toLocaleString("en-US")}`, numOpts(dep, [cost / yrs, (cost + rv) / yrs, dep * 2]).map((v) => `$${Number(v.replace(/,/g, "")).toLocaleString("en-US")}`), `(${cost} − ${rv}) ÷ ${yrs} = $${dep.toLocaleString("en-US")}.`, 1);
  }));
  qs.push(...repeat(12, () => {
    const annual = ri(6, 60) * 1200, months = pick([3, 4, 6, 8, 9]);
    const pre = (annual * (12 - months)) / 12;
    return mcq("AFA", "Accruals & prepayments", `Annual insurance of $${annual.toLocaleString("en-US")} is paid on 1 ${["April", "May", "July", "September", "October"][[3, 4, 6, 8, 9].indexOf(months)]}. The year end is 31 December, so ${months} months fall in this year. What is the prepayment at year end?`, `$${pre.toLocaleString("en-US")}`, numOpts(pre, [(annual * months) / 12, annual, pre / 2]).map((v) => `$${Number(v.replace(/,/g, "")).toLocaleString("en-US")}`), `${12 - months} months relate to next year: ${annual} × ${12 - months}/12 = $${pre.toLocaleString("en-US")}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const opening = ri(10, 80) * 1000, purchases = ri(50, 300) * 1000, closing = ri(10, 80) * 1000;
    const cos = opening + purchases - closing;
    return mcq("AFA", "Statements", `Opening inventory $${opening.toLocaleString("en-US")}, purchases $${purchases.toLocaleString("en-US")}, closing inventory $${closing.toLocaleString("en-US")}. What is the cost of sales?`, `$${cos.toLocaleString("en-US")}`, numOpts(cos, [opening + purchases + closing, purchases - closing, purchases]).map((v) => `$${Number(v.replace(/,/g, "")).toLocaleString("en-US")}`), `Cost of sales = opening + purchases − closing = $${cos.toLocaleString("en-US")}.`, 1);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
// ITIL 4 Foundation (ITL) and Lean Six Sigma Green Belt (SSG)
// ---------------------------------------------------------------------------
const ITL_PRINCIPLES = ["Focus on value", "Start where you are", "Progress iteratively with feedback", "Collaborate and promote visibility", "Think and work holistically", "Keep it simple and practical", "Optimize and automate"];
const ITL: F[] = [
  ["Key concepts", "In ITIL 4, what is 'value'?", "The perceived benefits, usefulness and importance of something", ["The price of a service", "The cost of IT", "The number of tickets closed"], "Value is co-created with consumers."],
  ["Key concepts", "What are the four dimensions of service management?", "Organizations and people; information and technology; partners and suppliers; value streams and processes", ["Plan, build, run, retire", "People, process, product, partner only", "Strategy, design, transition, operation"], "They must be balanced for effective services."],
  ["Key concepts", "What is the core of the ITIL service value system?", "The service value chain", ["The CMDB", "The service desk", "The change advisory board"], "Plus guiding principles, governance, practices and continual improvement."],
  ["Key concepts", "Which is NOT a service value chain activity?", "Monitor", ["Plan", "Engage", "Obtain/build"], "The six activities: plan, improve, engage, design & transition, obtain/build, deliver & support."],
  ["Practices", "What is the purpose of the incident management practice?", "To minimise the negative impact of incidents by restoring normal service as quickly as possible", ["To find the root cause of problems", "To approve changes", "To manage supplier contracts"], "Problem management finds root causes."],
  ["Practices", "What is a problem in ITIL 4?", "A cause, or potential cause, of one or more incidents", ["An unplanned interruption to a service", "A request for information", "A failed change"], "An incident is an unplanned interruption or reduction in quality."],
  ["Practices", "Which practice ensures that risks are properly assessed and changes are authorised?", "Change enablement", ["Service level management", "Incident management", "Service request management"], "Standard changes are pre-authorised."],
  ["Practices", "Which type of change is low-risk, pre-authorised and well understood?", "Standard change", ["Normal change", "Emergency change", "Major change"], "Normal changes need assessment and authorisation."],
  ["Practices", "What is the purpose of the service desk practice?", "To capture demand for incident resolution and service requests", ["To design new services", "To negotiate contracts", "To manage budgets"], "The single point of contact for users."],
  ["Practices", "Which practice sets clear business-based targets for service performance?", "Service level management", ["Relationship management", "Problem management", "Change enablement"], "SLAs should reflect the customer's experience."],
];
function itil(): Q[] {
  const qs = facts("ITL", ITL);
  const MEANING: Record<string, string> = {
    "Focus on value": "everything the organisation does should link back to value for itself, its customers and stakeholders",
    "Start where you are": "assess and reuse what already exists before building something new",
    "Progress iteratively with feedback": "organise work into smaller, manageable sections and use feedback at each step",
    "Collaborate and promote visibility": "work together across boundaries and make work and progress visible",
    "Think and work holistically": "consider the whole system and how its parts interact, not just one part",
    "Keep it simple and practical": "use the minimum number of steps needed and remove anything that adds no value",
    "Optimize and automate": "maximise the value of work, then automate where it makes sense",
  };
  qs.push(...ITL_PRINCIPLES.map((p) => mcq("ITL", "Guiding principles", `Which ITIL 4 guiding principle says that you should ${MEANING[p]}?`, p, ITL_PRINCIPLES.filter((x) => x !== p), `${p}: ${MEANING[p]}.`, 2)));
  qs.push(...ITL_PRINCIPLES.map((p, i) => mcq("ITL", "Guiding principles", `Which of these is one of the seven ITIL 4 guiding principles? (${i + 1})`, p, ["Fail fast and fix later", "Plan everything upfront", "Automate first, analyse later", "Avoid stakeholder involvement", "Follow the process exactly", "Maximise utilisation"].slice(i % 3, (i % 3) + 4), "The seven guiding principles: " + ITL_PRINCIPLES.join(", ") + ".", 1)));
  return qs;
}
const SSG: F[] = [
  ["DMAIC", "What are the five phases of DMAIC?", "Define, Measure, Analyse, Improve, Control", ["Design, Make, Assess, Implement, Close", "Define, Map, Act, Inspect, Correct", "Discover, Measure, Adjust, Improve, Communicate"], "The core Six Sigma improvement method."],
  ["DMAIC", "Which document is created in the Define phase to set out the problem, goal, scope and team?", "Project charter", ["Control plan", "FMEA", "Pareto chart"], "Approved by the sponsor/champion."],
  ["DMAIC", "In which phase is a control plan created to sustain the gains?", "Control", ["Define", "Measure", "Analyse"], "Includes monitoring and response plans."],
  ["Tools", "Which tool identifies the 'vital few' causes behind most problems?", "Pareto chart", ["Histogram", "Run chart", "Gantt chart"], "Based on the 80/20 principle."],
  ["Tools", "Which tool is used to brainstorm possible causes, grouped into categories?", "Fishbone (Ishikawa) diagram", ["Control chart", "Scatter plot", "SIPOC"], "Categories often include the 6Ms."],
  ["Tools", "What does SIPOC stand for?", "Suppliers, Inputs, Process, Outputs, Customers", ["Sigma, Input, Process, Output, Control", "Scope, Inputs, Plan, Outcomes, Costs", "Steps, Issues, Problems, Owners, Causes"], "A high-level process map used in Define."],
  ["Tools", "Which tool distinguishes common-cause from special-cause variation over time?", "Control chart", ["Pareto chart", "Pie chart", "Affinity diagram"], "Points outside the control limits suggest special causes."],
  ["Lean", "In Lean, which of these is one of the 8 wastes (DOWNTIME)?", "Over-processing", ["Customer feedback", "Standard work", "Value-added time"], "Defects, overproduction, waiting, non-utilised talent, transportation, inventory, motion, extra-processing."],
  ["Lean", "What does 5S stand for?", "Sort, Set in order, Shine, Standardise, Sustain", ["Safety, Speed, Service, Standards, Savings", "Scan, Sort, Store, Ship, Sell", "Start, Stop, Study, Solve, Sustain"], "A workplace organisation method."],
  ["Statistics", "Approximately what percentage of data lies within ±1 standard deviation of the mean in a normal distribution?", "68%", ["50%", "95%", "99.7%"], "±2σ ≈ 95%, ±3σ ≈ 99.7%."],
];
function sixSigma(): Q[] {
  const qs = facts("SSG", SSG);
  qs.push(...repeat(14, () => {
    const units = pick([200, 400, 500, 1000, 2000, 2500]), opp = pick([2, 4, 5, 8, 10]), defects = ri(2, 40);
    const dpmo = Math.round((defects / (units * opp)) * 1_000_000);
    return mcq("SSG", "Measure", `${units.toLocaleString("en-US")} units are inspected, each with ${opp} opportunities for a defect. ${defects} defects are found. What is the DPMO?`, dpmo.toLocaleString("en-US"), numOpts(dpmo, [Math.round((defects / units) * 1_000_000), dpmo * 2, Math.round(dpmo / 2)]).map((v) => Number(v.replace(/,/g, "")).toLocaleString("en-US")),
      `DPMO = defects ÷ (units × opportunities) × 1,000,000 = ${defects} ÷ ${(units * opp).toLocaleString("en-US")} × 1,000,000 = ${dpmo.toLocaleString("en-US")}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const a = pick([0.9, 0.95, 0.98, 0.99]), b = pick([0.9, 0.95, 0.97, 0.99]), c = pick([0.92, 0.96, 0.98]);
    const rty = Math.round(a * b * c * 1000) / 10;
    return mcq("SSG", "Measure", `A process has three steps with first-pass yields of ${a * 100}%, ${b * 100}% and ${c * 100}%. What is the rolled throughput yield?`, `${fmt(rty)}%`, numOpts(rty, [Math.round(((a + b + c) / 3) * 1000) / 10, Math.min(a, b, c) * 100, rty - 5]).map((v) => `${v}%`), `RTY = ${a} × ${b} × ${c} = ${fmt(rty / 100)} → ${fmt(rty)}%.`, 3);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
// UK 11+ verbal reasoning (VRS) and maths (ELM) — generated
// ---------------------------------------------------------------------------
const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SYN: [string, string][] = [["big", "large"], ["quick", "fast"], ["begin", "start"], ["shut", "close"], ["glad", "happy"], ["tiny", "small"], ["correct", "right"], ["shout", "yell"], ["brave", "bold"], ["end", "finish"], ["gift", "present"], ["silent", "quiet"], ["damp", "moist"], ["angry", "cross"], ["wealthy", "rich"]];
const ANT: [string, string][] = [["hot", "cold"], ["early", "late"], ["ancient", "modern"], ["generous", "mean"], ["victory", "defeat"], ["expand", "shrink"], ["arrive", "depart"], ["frequent", "rare"], ["accept", "refuse"], ["shallow", "deep"], ["noisy", "quiet"], ["timid", "bold"]];
function verbal11(): Q[] {
  const qs: Q[] = [];
  qs.push(...SYN.map((x) => mcq("VRS", "Synonyms", `Which word is closest in meaning to '${x[0]}'?`, x[1], others(SYN, x, (y) => y[1]), `'${x[0]}' and '${x[1]}' mean the same.`, 1)));
  qs.push(...ANT.map((x) => mcq("VRS", "Antonyms", `Which word is most opposite in meaning to '${x[0]}'?`, x[1], others(ANT, x, (y) => y[1]), `'${x[1]}' is the opposite of '${x[0]}'.`, 1)));
  qs.push(...repeat(15, () => {
    const a = ri(0, 18), k = ri(1, 3);
    const pair = (i: number) => AZ[(a + i * k) % 26] + AZ[(a + i * k + 1) % 26];
    const s = [0, 1, 2, 3].map(pair), ans = pair(4);
    return mcq("VRS", "Letter sequences", `Find the next pair in the series: ${s.join(", ")}, ?`, ans, [pair(5), AZ[(a + 4 * k + 1) % 26] + AZ[(a + 4 * k) % 26], pair(3), AZ[(a + 4 * k + 2) % 26] + AZ[(a + 4 * k + 3) % 26]], `Each pair moves ${k} letter${k > 1 ? "s" : ""} along the alphabet.`, 2);
  }));
  qs.push(...repeat(15, () => {
    const words = ["MILK", "BOAT", "LAMP", "FISH", "CART", "RING", "DESK", "WOLF", "GATE", "PINK"];
    const [w1, w2] = sample(words, 2);
    const k = pick([1, 2]);
    const enc = (w: string) => w.split("").map((c) => AZ[(AZ.indexOf(c) + k) % 26]).join("");
    return mcq("VRS", "Codes", `If ${w1} is written as ${enc(w1)}, how is ${w2} written in the same code?`, enc(w2), [w2.split("").map((c) => AZ[(AZ.indexOf(c) + k + 1) % 26]).join(""), w2.split("").reverse().join(""), w2.split("").map((c) => AZ[(AZ.indexOf(c) + 25) % 26]).join("")], `Each letter moves ${k} place${k > 1 ? "s" : ""} forward in the alphabet.`, 2);
  }));
  qs.push(...repeat(12, () => {
    const a = ri(2, 12), b = ri(2, 12);
    const ops: [string, (x: number) => number][] = [["× 2", (x) => x * 2], ["+ 5", (x) => x + 5], ["square", (x) => x * x], ["× 3 − 1", (x) => x * 3 - 1]];
    const [name, f] = pick(ops);
    return mcq("VRS", "Number relationships", `Find the missing number: ${a} (${f(a)}) and ${b} (?)`, String(f(b)), numOpts(f(b), [f(b) + 1, f(b) - 2, b * 2 + 1]), `The rule is ${name}: ${b} → ${f(b)}.`, 2);
  }));
  return qs;
}
function maths11(): Q[] {
  const qs: Q[] = [];
  qs.push(...repeat(15, () => {
    const a = ri(120, 980), b = ri(15, 99);
    return mcq("ELM", "Number", `What is ${a} × ${b}?`, (a * b).toLocaleString("en-GB"), numOpts(a * b, [a * b + 10, a * (b + 1), a * b - 100]).map((v) => Number(v.replace(/,/g, "")).toLocaleString("en-GB")), `${a} × ${b} = ${(a * b).toLocaleString("en-GB")}.`, 1);
  }));
  qs.push(...repeat(12, () => {
    const d = ri(3, 12), q = ri(12, 90);
    return mcq("ELM", "Number", `What is ${d * q} ÷ ${d}?`, String(q), numOpts(q, [q + 1, q - 1, q * 2]), `${d} × ${q} = ${d * q}.`, 1);
  }));
  qs.push(...repeat(12, () => {
    const den = pick([4, 5, 8, 10, 12]), num = ri(1, den - 1), whole = den * ri(2, 20);
    const ans = (whole * num) / den;
    return mcq("ELM", "Fractions", `What is ${num}/${den} of ${whole}?`, fmt(ans), numOpts(ans, [whole / den, whole - ans, ans + num]), `${whole} ÷ ${den} = ${whole / den}; × ${num} = ${fmt(ans)}.`, 1);
  }));
  qs.push(...repeat(12, () => {
    const l = ri(3, 15), w = ri(2, 12);
    return Math.random() < 0.5
      ? mcq("ELM", "Shape & measure", `A rectangle is ${l} cm long and ${w} cm wide. What is its area?`, `${l * w} cm²`, numOpts(l * w, [2 * (l + w), l + w, l * w + l], "cm²").map((x) => x.replace(" cm²", " cm²")), `Area = length × width = ${l * w} cm².`, 1)
      : mcq("ELM", "Shape & measure", `A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter?`, `${2 * (l + w)} cm`, numOpts(2 * (l + w), [l * w, l + w, 2 * l + w], "cm"), `Perimeter = 2 × (${l} + ${w}) = ${2 * (l + w)} cm.`, 1);
  }));
  qs.push(...repeat(10, () => {
    const start = ri(6, 11), sm = pick([0, 15, 30, 45]), dur = pick([35, 50, 75, 90, 105, 140]);
    const total = start * 60 + sm + dur;
    const t = `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
    return mcq("ELM", "Time", `A train leaves at ${start}:${String(sm).padStart(2, "0")} and the journey takes ${dur} minutes. When does it arrive?`, t, [`${Math.floor((total + 15) / 60)}:${String((total + 15) % 60).padStart(2, "0")}`, `${Math.floor((total - 10) / 60)}:${String((total - 10) % 60).padStart(2, "0")}`, `${start + 1}:${String(sm).padStart(2, "0")}`], `${dur} minutes = ${Math.floor(dur / 60)} h ${dur % 60} min after ${start}:${String(sm).padStart(2, "0")}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const p = pick([10, 20, 25, 50, 75]), n = ri(2, 20) * 20;
    return mcq("ELM", "Percentages", `What is ${p}% of ${n}?`, fmt((p * n) / 100), numOpts((p * n) / 100, [n / p, (p * n) / 10, n - (p * n) / 100]), `${p}% = ${p}/100; ${n} × ${p} ÷ 100 = ${fmt((p * n) / 100)}.`, 1);
  }));
  return qs;
}

function verbalReasoning(): Q[] {
  const qs: Q[] = [];
  for (const [passage, statements] of VRB_PASSAGES)
    for (const [st, ans, why] of statements)
      qs.push(mcq("VRB", "True / False / Cannot say", `${passage}\n\nStatement: ${st}`, ans, ["True", "False", "Cannot say"].filter((x) => x !== ans), why, 2, 3));
  return qs;
}

export function expansion(): Record<string, Q[]> {
  return {
    USC: facts("USC", USC, 1),
    CAN: facts("CAN", CAN, 1),
    AUS: facts("AUS", AUS, 1),
    GNX: [...facts("GNX", GNX), ...gulfDoses()],
    IEV: facts("IEV", IEV),
    VRB: [...verbalReasoning(), ...verbalExtra()],
    PMP: facts("PMP", PMP),
    ABT: facts("ABT", ABT),
    AMA: ama(),
    AFA: afa(),
    ITL: itil(),
    SSG: sixSigma(),
    VRS: verbal11(),
    ELM: maths11(),
  };
}
