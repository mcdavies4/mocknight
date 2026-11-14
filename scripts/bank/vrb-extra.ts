// More verbal reasoning (VRB) for GRE/GMAT, UCAT, the Philippine CSE and graduate aptitude tests.
// Passages use invented names, so answers depend only on the text, never on outside knowledge.
// Every True / False / Cannot say answer is fixed by how the passage is built.
import { mcq, others, pick, Q, repeat, ri } from "./lib";

const TFC = ["True", "False", "Cannot say"];
// Real tests keep True / False / Cannot say in a fixed order.
const tfc = (passage: string, st: string, ans: "True" | "False" | "Cannot say", why: string, topic = "True / False / Cannot say"): Q => {
  const q = mcq("VRB", topic, `${passage}\n\nStatement: ${st}`, ans, TFC.filter((x) => x !== ans), why, 2, 3);
  return { ...q, options: [...TFC], answer: TFC.indexOf(ans) };
};
const poss = (name: string) => (name.endsWith("s") ? `${name}'` : `${name}'s`);

const COMPANIES = ["Larkspur Foods", "Brightwell Textiles", "Okoro Logistics", "Fenwick Solar", "Amberline Pharmaceuticals", "Kestrel Software", "Marlow Ceramics", "Tidewater Paints", "Ashgrove Bakeries", "Novena Telecoms"];
const PRODUCTS = ["frozen meals", "school uniforms", "delivery vans", "solar panels", "generic medicines", "accounting software", "kitchen tiles", "house paint", "bread", "mobile data plans"];
const TOWNS = ["Harrowby", "Elmstead", "Kinross Vale", "Duncliffe", "Port Avery", "Westmere", "Calderbank", "Ravensholt", "Millbrook", "Stanwick"];
const REGIONS = ["the north-east", "two neighbouring countries", "the coastal provinces", "East Africa", "the Gulf", "southern Europe"];
const HABITS = ["walked for 30 minutes a day", "avoided screens after 9pm", "drank no coffee after midday", "kept a regular bedtime", "exercised in the morning"];
const MONTHS = ["January", "March", "April", "June", "September", "October"];
const CHARGES = [["garden waste collection", "£45 a year", "repairs to local roads"], ["parking in the town centre", "£2 an hour", "a new bus service"], ["bulky item collection", "£30 per visit", "recycling centres"], ["use of sports pitches", "£20 per booking", "maintaining parks"]];

function company(): Q[] {
  return repeat(90, () => {
    const i = ri(0, COMPANIES.length - 1), co = COMPANIES[i], prod = PRODUCTS[i];
    const [town, other] = [pick(TOWNS), pick(TOWNS)];
    if (town === other) return null;
    const year = ri(1975, 2012), y2 = ri(2018, 2024), staff = ri(12, 90) * 10, rise = ri(4, 28), branches = ri(2, 9), region = pick(REGIONS);
    const p = `${co}, founded in ${year} and based in ${town}, makes ${prod}. It employs ${staff} people. In ${y2} its revenue rose by ${rise}%, helped by ${branches} new branches. The company plans to expand into ${region} next year, although its chief executive has warned that rising costs could delay the move.`;
    const s: [string, "True" | "False" | "Cannot say", string][] = [
      [`${co} was founded before ${year + ri(1, 5)}.`, "True", `It was founded in ${year}.`],
      [`${co} opened more than ${branches - 1} new branches in ${y2}.`, "True", `It opened ${branches}.`],
      [`The planned expansion into ${region} may not happen on time.`, "True", "The chief executive warned that rising costs could delay it."],
      [`${co} is based in ${other}.`, "False", `The passage says it is based in ${town}.`],
      [`${poss(co)} revenue fell in ${y2}.`, "False", `Revenue rose by ${rise}%.`],
      [`${co} employs fewer than ${staff - 10} people.`, "False", `It employs ${staff}.`],
      [`${poss(co)} profits rose in ${y2}.`, "Cannot say", "Only revenue is mentioned; revenue is not profit."],
      [`${co} is the largest maker of ${prod} in the country.`, "Cannot say", "The passage says nothing about its market position."],
      [`The chief executive founded ${co}.`, "Cannot say", "We are not told who founded the company."],
      [`Most of ${poss(co)} staff work in ${town}.`, "Cannot say", "We know where it is based, not where its staff work."],
    ];
    const [st, ans, why] = pick(s);
    return tfc(p, st, ans, why);
  });
}

function study(): Q[] {
  return repeat(70, () => {
    const n = ri(8, 60) * 50, habit = pick(HABITS), mins = ri(8, 40), town = pick(TOWNS), other = pick(TOWNS);
    if (town === other) return null;
    const p = `A study of ${n.toLocaleString("en-GB")} adults in ${town} found that people who ${habit} slept, on average, ${mins} minutes longer than those who did not. The researchers stressed that the study showed an association rather than cause and effect, and that participants reported their own sleep times.`;
    const s: [string, "True" | "False" | "Cannot say", string][] = [
      [`The study involved more than ${(n - 50).toLocaleString("en-GB")} adults.`, "True", `It involved ${n.toLocaleString("en-GB")}.`],
      ["The sleep times in the study were self-reported.", "True", "Participants reported their own sleep times."],
      ["The researchers did not claim to have found a cause.", "True", "They said it showed an association, not cause and effect."],
      ["The study proved that the habit causes longer sleep.", "False", "The researchers said it did not show cause and effect."],
      [`On average, people with the habit slept less than those without it.`, "False", `They slept ${mins} minutes longer.`],
      [`The study took place in ${other}.`, "False", `It took place in ${town}.`],
      ["The study was funded by the government.", "Cannot say", "Funding is not mentioned."],
      ["Women in the study slept longer than men.", "Cannot say", "No results by sex are given."],
      ["People with the habit also had better concentration.", "Cannot say", "Only sleep was measured."],
      ["Most participants had the habit.", "Cannot say", "We are not told how many had the habit."],
    ];
    const [st, ans, why] = pick(s);
    return tfc(p, st, ans, why);
  });
}

function council(): Q[] {
  return repeat(60, () => {
    const town = pick(TOWNS), [thing, fee, use] = pick(CHARGES), month = pick(MONTHS), other = pick(MONTHS);
    let pct = ri(30, 75);
    if (pct === 50 || month === other) return null;
    const p = `${town} Council will introduce a charge of ${fee} for ${thing} from ${month}. The council says the money will pay for ${use}. Residents aged over 65 will not have to pay. In a public consultation, ${pct}% of people who responded supported the change.`;
    const s: [string, "True" | "False" | "Cannot say", string][] = [
      ["Residents over 65 will be exempt from the charge.", "True", "They will not have to pay."],
      [`Most people who responded to the consultation supported the change.`, pct > 50 ? "True" : "False", `${pct}% supported it.`],
      [`The charge will start in ${other}.`, "False", `It starts in ${month}.`],
      [`The council says the money will pay for ${use}.`, "True", "This is stated directly."],
      ["The charge will be reviewed after one year.", "Cannot say", "No review is mentioned."],
      [`Most residents of ${town} support the charge.`, "Cannot say", "Only consultation respondents were counted, not all residents."],
      [`${town} has more over-65s than the national average.`, "Cannot say", "The passage gives no population figures."],
      ["The consultation was open to people who do not live in the town.", "Cannot say", "We are not told who could respond."],
    ];
    const [st, ans, why] = pick(s);
    return tfc(p, st, ans, why);
  });
}

// Vocabulary in context (GRE / CSE / UCAT-style): closest meaning and opposites.
const WORDS: [string, string, string][] = [
  ["ambiguous", "open to more than one interpretation", "clear"], ["benevolent", "kind and generous", "malicious"], ["candid", "frank and honest", "evasive"],
  ["diligent", "careful and hard-working", "careless"], ["ephemeral", "lasting a very short time", "permanent"], ["frugal", "careful with money", "extravagant"],
  ["gregarious", "fond of company", "solitary"], ["hostile", "unfriendly and aggressive", "friendly"], ["impartial", "treating all sides equally", "biased"],
  ["lucid", "clearly expressed", "confusing"], ["meticulous", "showing great attention to detail", "sloppy"], ["novice", "a beginner", "expert"],
  ["obsolete", "no longer in use", "current"], ["prudent", "acting with care for the future", "reckless"], ["reticent", "reluctant to share thoughts", "talkative"],
  ["scrutinise", "examine closely", "glance at"], ["tenacious", "holding firmly; persistent", "yielding"], ["undermine", "weaken gradually", "strengthen"],
  ["verbose", "using more words than needed", "concise"], ["wary", "cautious about possible danger", "trusting"], ["abundant", "existing in large quantities", "scarce"],
  ["adversary", "an opponent", "ally"], ["alleviate", "make less severe", "worsen"], ["arbitrary", "based on chance rather than reason", "reasoned"],
  ["conceal", "hide", "reveal"], ["concur", "agree", "dispute"], ["deteriorate", "become worse", "improve"], ["discreet", "careful not to attract attention", "indiscreet"],
  ["eloquent", "fluent and persuasive in speech", "inarticulate"], ["feasible", "possible to do", "impractical"], ["futile", "pointless; having no effect", "worthwhile"],
  ["hinder", "make difficult; obstruct", "assist"], ["inevitable", "certain to happen", "avoidable"], ["lenient", "more merciful than expected", "strict"],
  ["mitigate", "make less serious", "aggravate"], ["mundane", "dull and ordinary", "extraordinary"], ["negligible", "so small it can be ignored", "significant"],
  ["optimistic", "hopeful about the future", "pessimistic"], ["pragmatic", "dealing with things practically", "idealistic"], ["profound", "very great or deep", "superficial"],
  ["redundant", "no longer needed", "essential"], ["resilient", "able to recover quickly", "fragile"], ["scarce", "in short supply", "plentiful"],
  ["sceptical", "not easily convinced", "credulous"], ["substantial", "of considerable size", "minor"], ["superfluous", "more than is needed", "necessary"],
  ["tentative", "not certain or fixed", "definite"], ["transparent", "open; easy to see through", "opaque"], ["vindicate", "clear of blame", "incriminate"],
  ["volatile", "liable to change rapidly", "stable"], ["zealous", "showing great enthusiasm", "apathetic"], ["coherent", "logical and consistent", "disjointed"],
  ["complacent", "smugly satisfied; not alert to danger", "vigilant"], ["contentious", "likely to cause disagreement", "uncontroversial"], ["copious", "plentiful", "meagre"],
  ["didactic", "intended to teach", "entertaining"], ["empirical", "based on observation or experiment", "theoretical"], ["exacerbate", "make worse", "ease"],
  ["laconic", "using very few words", "wordy"], ["placate", "make less angry", "provoke"], ["prolific", "producing a lot", "unproductive"],
];
// Words close in meaning (or opposite) never appear as each other's wrong options.
const CLUSTERS = [
  ["abundant", "copious", "scarce", "prolific"], ["mitigate", "alleviate", "exacerbate", "placate"], ["verbose", "laconic", "reticent", "eloquent"],
  ["obsolete", "redundant", "superfluous"], ["hinder", "undermine"], ["candid", "transparent", "discreet", "conceal"], ["diligent", "meticulous"],
  ["prudent", "wary", "sceptical", "complacent"], ["ephemeral", "volatile", "tentative"], ["hostile", "adversary"], ["negligible", "substantial", "profound"],
  ["lucid", "coherent", "ambiguous"], ["tenacious", "resilient"], ["pragmatic", "empirical", "feasible"], ["futile", "inevitable"], ["mundane", "profound"],
];
const related = (a: string, b: string) => CLUSTERS.some((c) => c.includes(a) && c.includes(b));
function vocab(): Q[] {
  const out: Q[] = [];
  for (const w of WORDS) {
    const pool = WORDS.filter((x) => !related(x[0], w[0]));
    out.push(mcq("VRB", "Vocabulary", `Which is closest in meaning to “${w[0]}”?`, w[1], others(pool, w, (x) => x[1]), `“${w[0]}” means ${w[1]}.`, 2));
    out.push(mcq("VRB", "Vocabulary", `Which word is most nearly OPPOSITE in meaning to “${w[0]}”?`, w[2], others(pool, w, (x) => x[2]).filter((o) => !WORDS.some((x) => x[0] === o && related(x[0], w[0])) && o !== w[0]), `“${w[0]}” means ${w[1]}; the opposite is “${w[2]}”.`, 2));
  }
  return out;
}

export const verbalExtra = (): Q[] => [...company(), ...study(), ...council(), ...vocab()];
