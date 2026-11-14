// Starter bank for wave 3: Philippine Civil Service Exam general information (PHC).
// Stable constitutional and historical facts only. NEET, JEE, GRE, AAT and NGREC reuse existing subjects.
import { mcq, Q } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

const PHC: F[] = [
  ["Constitution", "Which constitution is currently in force in the Philippines?", "The 1987 Constitution", ["The 1935 Constitution", "The 1973 Constitution", "The Malolos Constitution"], "It was ratified in a plebiscite in February 1987."],
  ["Constitution", "Which article of the 1987 Constitution contains the Bill of Rights?", "Article III", ["Article I", "Article VI", "Article XII"], "Article III lists the rights of every person."],
  ["Constitution", "How long is the term of the President of the Philippines?", "Six years, with no re-election", ["Four years, with one re-election", "Six years, with one re-election", "Five years, with no re-election"], "Article VII, Section 4."],
  ["Constitution", "How many senators are there in the Philippine Senate?", "24", ["12", "30", "48"], "Senators are elected at large by the whole country."],
  ["Constitution", "How long is the term of a senator?", "Six years", ["Three years", "Four years", "Five years"], "A senator may serve no more than two consecutive terms."],
  ["Constitution", "How long is the term of a member of the House of Representatives?", "Three years", ["Six years", "Four years", "Two years"], "Members may serve no more than three consecutive terms."],
  ["Constitution", "How many justices sit on the Supreme Court of the Philippines?", "15 (a Chief Justice and 14 Associate Justices)", ["9", "12", "21"], "Article VIII, Section 4."],
  ["Constitution", "What is the minimum voting age in the Philippines?", "18", ["16", "21", "25"], "Article V: citizens at least 18 years old."],
  ["Constitution", "Which body enforces and administers election laws?", "Commission on Elections (COMELEC)", ["Civil Service Commission", "Commission on Audit", "Office of the Ombudsman"], "COMELEC is one of the three constitutional commissions."],
  ["Constitution", "What are the three independent constitutional commissions?", "Civil Service Commission, Commission on Elections and Commission on Audit", ["Senate, House and Supreme Court", "Ombudsman, Sandiganbayan and COMELEC", "CHR, NEDA and COA"], "Article IX establishes all three."],
  ["Constitution", "Which body is the central personnel agency of the government?", "Civil Service Commission", ["Department of Labor and Employment", "Commission on Audit", "Department of Budget and Management"], "The CSC administers the Civil Service Exam."],
  ["Constitution", "Which office investigates and prosecutes erring public officials?", "Office of the Ombudsman", ["COMELEC", "Commission on Audit", "Department of Justice only"], "The Ombudsman acts as 'protector of the people'."],
  ["Constitution", "Which special court hears graft and corruption cases against public officials?", "Sandiganbayan", ["Court of Appeals", "Court of Tax Appeals", "Regional Trial Court"], "It has jurisdiction over high-ranking officials' graft cases."],
  ["Constitution", "What are the official languages of the Philippines under the 1987 Constitution?", "Filipino and English", ["Filipino and Spanish", "Tagalog only", "English and Spanish"], "Filipino is the national language."],
  ["Constitution", "Who becomes President if the office becomes permanently vacant?", "The Vice President", ["The Senate President", "The Speaker of the House", "The Chief Justice"], "Next in line are the Senate President, then the Speaker."],
  ["Ethics", "Republic Act No. 6713 is also known as the", "Code of Conduct and Ethical Standards for Public Officials and Employees", ["Anti-Graft and Corrupt Practices Act", "Civil Service Law", "Local Government Code"], "It was enacted in 1989."],
  ["Ethics", "Which is one of the norms of conduct under RA 6713?", "Political neutrality", ["Loyalty to one's party", "Seniority above merit", "Confidentiality of all records"], "Others include professionalism, justness and sincerity, and simple living."],
  ["Ethics", "Under RA 6713, public officials must file which statement under oath?", "Statement of Assets, Liabilities and Net Worth (SALN)", ["Income Tax Return only", "Daily Time Record", "Personal Data Sheet only"], "The SALN discloses assets, liabilities and business interests."],
  ["Ethics", "Republic Act No. 3019 is the", "Anti-Graft and Corrupt Practices Act", ["Code of Conduct for Public Officials", "Anti-Red Tape Act", "Data Privacy Act"], "It was enacted in 1960."],
  ["Ethics", "The Ease of Doing Business Act (RA 11032) amended which law?", "The Anti-Red Tape Act of 2007", ["The Local Government Code", "The Civil Service Law", "The Labor Code"], "It sets processing deadlines for government services."],
  ["History", "Where was Philippine independence from Spain declared on 12 June 1898?", "Kawit, Cavite", ["Malolos, Bulacan", "Manila", "Biak-na-Bato"], "Emilio Aguinaldo proclaimed it from his house in Kawit."],
  ["History", "Who is the national hero of the Philippines?", "José Rizal", ["Andrés Bonifacio", "Emilio Aguinaldo", "Apolinario Mabini"], "He was executed on 30 December 1896."],
  ["History", "Who founded the Katipunan in 1892?", "Andrés Bonifacio", ["José Rizal", "Emilio Jacinto", "Marcelo H. del Pilar"], "The Katipunan led the revolution against Spain."],
  ["History", "Which two novels by José Rizal criticised Spanish rule?", "Noli Me Tángere and El Filibusterismo", ["Florante at Laura and Ibong Adarna", "Mi Último Adiós and Noli Me Tángere only", "Kartilya ng Katipunan and La Solidaridad"], "Published in 1887 and 1891."],
  ["History", "Who killed Ferdinand Magellan at the Battle of Mactan in 1521?", "Lapu-Lapu's forces", ["Rajah Humabon's forces", "Sultan Kudarat", "Diego Silang"], "Lapu-Lapu is honoured as the first Filipino hero to resist colonisers."],
  ["History", "On what date did the United States recognise Philippine independence?", "4 July 1946", ["12 June 1898", "15 November 1935", "21 September 1972"], "Independence Day is now celebrated on 12 June."],
  ["History", "Who was the first President of the Philippine Commonwealth (1935)?", "Manuel L. Quezon", ["Emilio Aguinaldo", "Sergio Osmeña", "Manuel Roxas"], "The Commonwealth was a transition to full independence."],
  ["History", "The 1986 peaceful uprising that ended the Marcos regime is known as", "the EDSA People Power Revolution", ["the Cry of Pugad Lawin", "the Mendiola Massacre", "the First Quarter Storm"], "It took place along EDSA in February 1986."],
  ["Symbols", "What is the national anthem of the Philippines?", "Lupang Hinirang", ["Bayan Ko", "Pilipinas Kong Mahal", "Ako ay Pilipino"], "Music by Julian Felipe."],
  ["Symbols", "What is the national flower of the Philippines?", "Sampaguita", ["Waling-waling", "Gumamela", "Ilang-ilang"], "Jasminum sambac."],
  ["Symbols", "What is the national bird of the Philippines?", "Philippine eagle", ["Maya", "Kingfisher", "Hornbill"], "Pithecophaga jefferyi."],
  ["Symbols", "What is the national tree of the Philippines?", "Narra", ["Molave", "Acacia", "Mango"], "Pterocarpus indicus."],
  ["Geography", "What are the three main island groups of the Philippines?", "Luzon, Visayas and Mindanao", ["Luzon, Palawan and Mindanao", "Visayas, Samar and Leyte", "Luzon, Mindoro and Cebu"], "The country has more than 7,600 islands."],
  ["Geography", "What is the capital city of the Philippines?", "Manila", ["Quezon City", "Cebu City", "Davao City"], "Quezon City is the most populous city."],
  ["Geography", "What is the highest mountain in the Philippines?", "Mount Apo", ["Mount Pulag", "Mayon Volcano", "Mount Banahaw"], "Mount Apo is in Mindanao."],
  ["Environment", "Republic Act 9003 is the", "Ecological Solid Waste Management Act", ["Clean Air Act", "Clean Water Act", "Climate Change Act"], "It requires waste segregation at source."],
  ["Environment", "Republic Act 8749 is the", "Philippine Clean Air Act", ["Clean Water Act", "Ecological Solid Waste Management Act", "Wildlife Act"], "It was enacted in 1999."],
];

export function expansion3(): Record<string, Q[]> {
  return { PHC: facts("PHC", PHC, 1) };
}
