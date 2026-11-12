import { mcq, others, pick, Q, rand, shuffle } from "./lib";

const S = "ENG";

// word → closest meaning (common JAMB/WAEC lexis)
const SYN: [string, string][] = [
  ["abate", "lessen"], ["affluent", "wealthy"], ["ambiguous", "having more than one meaning"], ["amiable", "friendly"], ["audacious", "daring"],
  ["benevolent", "kind and generous"], ["cogent", "convincing"], ["complacent", "self-satisfied"], ["conspicuous", "easily noticed"], ["copious", "plentiful"],
  ["credible", "believable"], ["diligent", "hard-working"], ["docile", "easily controlled"], ["eloquent", "fluent and persuasive"], ["ephemeral", "short-lived"],
  ["erroneous", "wrong"], ["exorbitant", "excessively high"], ["frugal", "thrifty"], ["gregarious", "sociable"], ["imminent", "about to happen"],
  ["impeccable", "flawless"], ["indolent", "lazy"], ["inevitable", "unavoidable"], ["jubilant", "joyful"], ["lucid", "clear"], ["meticulous", "very careful"],
  ["mitigate", "reduce the severity of"], ["nonchalant", "unconcerned"], ["obsolete", "out of date"], ["obstinate", "stubborn"], ["ostentatious", "showy"],
  ["placid", "calm"], ["pragmatic", "practical"], ["prudent", "wise and careful"], ["reticent", "reserved"], ["scrutinise", "examine closely"],
  ["sporadic", "occasional"], ["tedious", "boring"], ["tenacious", "persistent"], ["trivial", "unimportant"], ["ubiquitous", "found everywhere"],
  ["vindicate", "clear of blame"], ["volatile", "unstable"], ["zealous", "enthusiastic"], ["adamant", "unyielding"], ["apathy", "lack of interest"],
  ["lament", "mourn"], ["pacify", "calm down"], ["rebuke", "scold"], ["reluctant", "unwilling"], ["vigilant", "watchful"], ["feeble", "weak"],
  ["lethargic", "sluggish"], ["opulent", "luxurious"], ["fallacy", "mistaken belief"], ["novice", "beginner"], ["wane", "decrease gradually"],
  ["augment", "increase"], ["candid", "frank"], ["cordial", "warm and friendly"], ["dubious", "doubtful"], ["fortitude", "courage in pain"],
  ["hilarious", "very funny"], ["innate", "inborn"], ["integrity", "honesty"], ["lucrative", "profitable"], ["mundane", "ordinary"], ["notorious", "famous for something bad"],
  ["perilous", "dangerous"], ["proficient", "skilled"], ["replenish", "refill"], ["resilient", "able to recover quickly"], ["scanty", "insufficient"],
  ["solace", "comfort"], ["spontaneous", "unplanned"], ["succinct", "brief and clear"], ["tranquil", "peaceful"], ["vivid", "bright and clear"],
  ["hackneyed", "overused"], ["ominous", "threatening"],
];

const SENT: Record<string, string> = {
  abate: "We waited for the storm to ABATE before setting out.", affluent: "The family lives in an AFFLUENT part of Lekki.",
  diligent: "Ngozi is a DILIGENT student who never misses a lesson.", frugal: "Being FRUGAL, he saved most of his allowance.",
  imminent: "Dark clouds showed that rain was IMMINENT.", obstinate: "The OBSTINATE child refused to eat his food.",
  tedious: "Copying the notes by hand was a TEDIOUS task.", lucrative: "Poultry farming has become a LUCRATIVE business.",
  vigilant: "Residents were told to be VIGILANT at night.", candid: "The coach gave a CANDID assessment of the team's performance.",
  feeble: "The old man's voice had grown FEEBLE.", tranquil: "The village was TRANQUIL after the festival ended.",
};

// word, opposite
const ANT: [string, string][] = [
  ["generous", "stingy"], ["ancient", "modern"], ["brave", "cowardly"], ["humble", "arrogant"], ["scarce", "abundant"], ["permanent", "temporary"],
  ["optimistic", "pessimistic"], ["transparent", "opaque"], ["rigid", "flexible"], ["voluntary", "compulsory"], ["artificial", "natural"],
  ["deny", "admit"], ["expand", "contract"], ["accept", "reject"], ["superior", "inferior"], ["maximum", "minimum"], ["frequent", "rare"],
  ["guilty", "innocent"], ["ascend", "descend"], ["profit", "loss"], ["include", "exclude"], ["praise", "criticise"], ["victory", "defeat"],
  ["wisdom", "folly"], ["lenient", "strict"], ["candid", "evasive"], ["diligent", "lazy"], ["frugal", "extravagant"], ["verbose", "concise"],
  ["affluent", "impoverished"], ["hostile", "friendly"], ["obscure", "famous"], ["sharp", "blunt"], ["shallow", "deep"], ["vacant", "occupied"],
  ["spacious", "cramped"], ["ally", "enemy"], ["genuine", "fake"], ["advance", "retreat"], ["barren", "fertile"], ["conceal", "reveal"],
  ["exterior", "interior"], ["former", "latter"], ["hinder", "help"], ["majority", "minority"], ["prosperity", "poverty"], ["sorrow", "joy"],
  ["approve", "disapprove"], ["dwindle", "grow"], ["tame", "wild"],
];

// word, sentence with a blank
const SPELL: [string, string][] = [
  ["accommodation", "The hotel provides free ___ for guests."], ["embarrass", "Please don't ___ me in front of my friends."],
  ["occurrence", "Power cuts are a daily ___ in the area."], ["necessary", "It is ___ to read the instructions first."],
  ["separate", "Keep the raw meat ___ from the vegetables."], ["definitely", "I will ___ attend the meeting."],
  ["conscience", "His ___ would not let him tell a lie."], ["conscientious", "She is a ___ worker who checks everything twice."],
  ["privilege", "It is a ___ to serve the nation."], ["millennium", "The year 2000 marked the start of a new ___."],
  ["recommend", "Can you ___ a good textbook?"], ["committee", "The ___ will meet on Friday."],
  ["guarantee", "The phone comes with a one-year ___."], ["harass", "It is wrong to ___ other students."],
  ["independent", "Nigeria became ___ in 1960."], ["maintenance", "The generator needs regular ___."],
  ["mischievous", "The ___ boy hid his sister's shoes."], ["noticeable", "There has been a ___ improvement in his grades."],
  ["occasion", "We wore our best clothes for the ___."], ["parallel", "The two roads run ___ to each other."],
  ["perseverance", "Success in JAMB requires ___."], ["possession", "He was found in ___ of a stolen phone."],
  ["questionnaire", "Please fill in the ___ and return it."], ["receive", "Did you ___ my message?"],
  ["rhythm", "The drummer kept a steady ___."], ["threshold", "She stood at the ___ of the door."],
  ["tomorrow", "The exam starts ___ morning."], ["unnecessary", "Avoid ___ expenses this month."],
  ["vacuum", "Sound cannot travel through a ___."], ["acquaintance", "He is only an ___, not a close friend."],
  ["achievement", "Winning the quiz was a great ___."], ["address", "Write your home ___ on the form."],
  ["beginning", "Read the passage from the ___."], ["believe", "I ___ you are telling the truth."],
  ["bureaucracy", "The ___ slowed down the approval of the project."], ["calendar", "Mark the date on your ___."],
  ["colleague", "She went to lunch with a ___ from the office."], ["conscious", "The patient is now ___ and talking."],
  ["discipline", "The school is known for strict ___."], ["entrepreneur", "The young ___ started a fashion business."],
  ["exaggerate", "Don't ___ the size of the fish you caught."], ["government", "The ___ announced a new policy."],
  ["immediately", "Report to the principal's office ___."], ["knowledge", "Reading widens your ___."],
  ["pronunciation", "His ___ of the word was perfect."], ["restaurant", "We had dinner at a ___ in Wuse."],
  ["successful", "The launch was very ___."], ["transferred", "The money was ___ to his account."],
  ["weird", "We heard a ___ noise at midnight."], ["fluorescent", "The office has bright ___ lights."],
];

function misspell(w: string): string[] {
  const out = new Set<string>();
  // undouble a double letter
  for (let i = 0; i < w.length - 1; i++) if (w[i] === w[i + 1]) out.add(w.slice(0, i) + w.slice(i + 1));
  // double a single consonant
  for (let i = 1; i < w.length - 1; i++) if (!"aeiou".includes(w[i]) && w[i] !== w[i - 1] && w[i] !== w[i + 1]) out.add(w.slice(0, i) + w[i] + w.slice(i));
  // swap ie/ei
  if (w.includes("ie")) out.add(w.replace("ie", "ei"));
  if (w.includes("ei")) out.add(w.replace("ei", "ie"));
  // vowel swaps
  const swaps: [string, string][] = [["ance", "ence"], ["ence", "ance"], ["ate", "ite"], ["able", "ible"], ["ar", "er"], ["er", "ar"], ["ous", "uos"], ["ent", "ant"], ["a", "e"], ["e", "i"]];
  for (const [a, b] of swaps) if (w.includes(a)) out.add(w.replace(a, b));
  out.delete(w);
  return shuffle([...out]);
}

// adjective: comparative, superlative
const COMP: [string, string, string][] = [
  ["good", "better", "best"], ["bad", "worse", "worst"], ["little", "less", "least"], ["many", "more", "most"], ["tall", "taller", "tallest"],
  ["big", "bigger", "biggest"], ["happy", "happier", "happiest"], ["beautiful", "more beautiful", "most beautiful"], ["intelligent", "more intelligent", "most intelligent"],
  ["early", "earlier", "earliest"], ["thin", "thinner", "thinnest"], ["far", "farther", "farthest"],
];

const PLURAL: [string, string, string[]][] = [
  ["child", "children", ["childs", "childrens", "childes"]], ["ox", "oxen", ["oxes", "oxs", "oxens"]], ["analysis", "analyses", ["analysises", "analysis", "analysiss"]],
  ["criterion", "criteria", ["criterions", "criterias", "criterium"]], ["phenomenon", "phenomena", ["phenomenons", "phenomenas", "phenomenan"]],
  ["medium (of communication)", "media", ["mediums", "medias", "medium"]], ["crisis", "crises", ["crisises", "crisis", "crisess"]], ["thesis", "theses", ["thesises", "thesis", "thesisses"]],
  ["mouse", "mice", ["mouses", "mices", "mouse"]], ["goose", "geese", ["gooses", "geeses", "goose"]], ["sheep", "sheep", ["sheeps", "sheepes", "shoop"]],
  ["cactus", "cacti", ["cactuses'", "cactis", "cactae"]], ["fungus", "fungi", ["funguses'", "fungis", "fungae"]], ["radius", "radii", ["radiuses'", "radiis", "radia"]],
  ["stimulus", "stimuli", ["stimuluses", "stimulis", "stimula"]], ["axis", "axes", ["axises", "axis", "axiss"]], ["oasis", "oases", ["oasises", "oasis", "oasiss"]],
  ["passer-by", "passers-by", ["passer-bys", "passers-bys", "passerbys"]], ["mother-in-law", "mothers-in-law", ["mother-in-laws", "mothers-in-laws", "mother-ins-law"]],
  ["tooth", "teeth", ["tooths", "teeths", "toothes"]], ["foot", "feet", ["foots", "feets", "footes"]], ["woman", "women", ["womans", "womens", "womanes"]],
  ["deer", "deer", ["deers", "deeres", "dear"]], ["louse", "lice", ["louses", "lices", "lousies"]], ["bacterium", "bacteria", ["bacteriums", "bacterias", "bacteriae"]],
];

const IDIOMS: [string, string, string[]][] = [
  ["bury the hatchet", "make peace", ["start a fight", "hide a weapon", "dig a grave"]],
  ["let the cat out of the bag", "reveal a secret", ["cause trouble", "set an animal free", "buy something useless"]],
  ["a storm in a teacup", "a lot of fuss about something unimportant", ["a serious disaster", "bad weather", "a family quarrel"]],
  ["burn the midnight oil", "work or study late into the night", ["waste fuel", "start a fire", "sleep early"]],
  ["kill two birds with one stone", "achieve two things with one action", ["be very cruel", "hunt well", "make two mistakes"]],
  ["once in a blue moon", "very rarely", ["every month", "at night", "very often"]],
  ["hit the nail on the head", "describe something exactly right", ["hurt oneself", "build a house", "make a mistake"]],
  ["a white elephant", "a costly possession that is of little use", ["a rare animal", "a generous gift", "a great achievement"]],
  ["take the bull by the horns", "face a difficulty boldly", ["behave foolishly", "be cruel to animals", "run away from danger"]],
  ["face the music", "accept the consequences of one's actions", ["enjoy a concert", "become famous", "ignore criticism"]],
  ["under the weather", "slightly unwell", ["very happy", "outdoors", "in trouble with the law"]],
  ["a bed of roses", "an easy, comfortable situation", ["a garden", "a romantic gift", "a difficult task"]],
  ["blow one's own trumpet", "boast about oneself", ["play music loudly", "complain bitterly", "announce bad news"]],
  ["cry over spilt milk", "regret something that cannot be undone", ["waste food", "cry easily", "complain about prices"]],
  ["add fuel to the fire", "make a bad situation worse", ["cook food", "help to settle a quarrel", "save money"]],
  ["throw in the towel", "give up", ["start again", "clean up", "win easily"]],
  ["by the skin of one's teeth", "only just; narrowly", ["with great ease", "by force", "through dishonesty"]],
  ["a dark horse", "a person with hidden abilities", ["a dishonest person", "a black animal", "a stubborn person"]],
  ["beat about the bush", "avoid coming to the point", ["work hard on a farm", "search everywhere", "speak directly"]],
  ["the apple of one's eye", "a person one loves very much", ["a fruit seller", "an eye disease", "a jealous person"]],
  ["call it a day", "stop working for the day", ["give a name to something", "start early", "celebrate"]],
  ["in hot water", "in trouble", ["having a bath", "very angry", "feeling comfortable"]],
  ["a red-letter day", "a memorable and important day", ["a day of bad news", "a public holiday only", "a day of mourning"]],
  ["turn a deaf ear", "refuse to listen", ["become deaf", "listen carefully", "speak loudly"]],
  ["a wild goose chase", "a hopeless or pointless search", ["a hunting trip", "an exciting race", "a quick success"]],
  ["break the ice", "ease tension at the start of a meeting", ["destroy something", "cause a quarrel", "end a relationship"]],
  ["on cloud nine", "extremely happy", ["very confused", "in an aeroplane", "very proud"]],
  ["pull someone's leg", "tease or joke with someone", ["injure someone", "help someone up", "cheat someone"]],
  ["spill the beans", "reveal secret information", ["waste food", "make a mess", "tell lies"]],
  ["a piece of cake", "something very easy", ["a small reward", "a sweet thing", "a tricky problem"]],
];

const GRAMMAR: [string, string, string[], string][] = [
  ["Neither the teacher nor the students ___ in the hall.", "were", ["was", "is", "has been"], "With neither…nor, the verb agrees with the nearer subject: 'students' → were."],
  ["Either the students or the teacher ___ responsible.", "is", ["are", "were", "have been"], "The nearer subject 'teacher' is singular → is."],
  ["Each of the boys ___ given a prize.", "was", ["were", "are", "have been"], "'Each' is singular → was."],
  ["Every one of the cars ___ been sold.", "has", ["have", "are", "were"], "'Every one' is singular → has."],
  ["The news ___ very encouraging.", "is", ["are", "were", "have been"], "'News' is an uncountable noun → singular verb."],
  ["Mathematics ___ my favourite subject.", "is", ["are", "were", "have been"], "Subjects ending in -ics (mathematics, physics) take a singular verb."],
  ["The scissors ___ on the table.", "are", ["is", "was", "has been"], "'Scissors' is a plural noun."],
  ["Bread and butter ___ my usual breakfast.", "is", ["are", "were", "have been"], "'Bread and butter' is treated as one item → singular."],
  ["One of my friends ___ coming to visit.", "is", ["are", "were", "have"], "The subject is 'one' → singular."],
  ["The number of students in the class ___ increased.", "has", ["have", "are", "were"], "'The number of' takes a singular verb."],
  ["A number of students ___ absent today.", "are", ["is", "was", "has been"], "'A number of' means 'many' → plural verb."],
  ["The man, together with his sons, ___ arrived.", "has", ["have", "are", "were"], "Phrases like 'together with' do not change the subject 'man' → has."],
  ["This is between you and ___.", "me", ["I", "myself", "mine"], "After a preposition (between) use the object pronoun: me."],
  ["It was ___ who broke the window.", "he", ["him", "his", "himself"], "In formal English, 'It was he' (subject complement)."],
  ["If I ___ you, I would accept the offer.", "were", ["was", "am", "had"], "The subjunctive 'were' is used for unreal conditions."],
  ["If he had studied, he ___ passed.", "would have", ["will have", "would", "had"], "Third conditional: if + past perfect, would have + past participle."],
  ["She has been living in Abuja ___ 2019.", "since", ["for", "from", "by"], "'Since' + a point in time."],
  ["He has lived here ___ six years.", "for", ["since", "from", "at"], "'For' + a period of time."],
  ["The thief was accused ___ stealing a phone.", "of", ["for", "with", "on"], "'Accused of' is the correct collocation."],
  ["She is good ___ mathematics.", "at", ["in", "on", "with"], "'Good at' a subject or skill."],
  ["He was absent ___ school yesterday.", "from", ["in", "at", "of"], "'Absent from' is correct."],
  ["The boy is fond ___ playing football.", "of", ["with", "in", "about"], "'Fond of' is the correct collocation."],
  ["They arrived ___ Lagos at night.", "in", ["at", "to", "on"], "Use 'arrive in' for cities and countries; 'arrive at' for smaller places."],
  ["I prefer rice ___ yam.", "to", ["than", "over", "from"], "'Prefer A to B' is the correct pattern."],
  ["She insisted ___ paying for the meal.", "on", ["in", "at", "for"], "'Insist on' + -ing."],
  ["The meeting was called ___ because of the rain.", "off", ["of", "out", "up"], "'Call off' means cancel."],
  ["Please look ___ the word in the dictionary.", "up", ["for", "at", "into"], "'Look up' means search for information."],
  ["By the time we arrived, the film ___.", "had started", ["started", "has started", "starts"], "Past perfect shows the earlier of two past actions."],
  ["He ___ to school every day.", "goes", ["go", "going", "gone"], "Simple present, third person singular → goes."],
  ["I ___ my homework before dinner yesterday.", "finished", ["finish", "have finished", "finishing"], "'Yesterday' calls for the simple past."],
  ["The letter ___ by the secretary yesterday.", "was typed", ["typed", "is typed", "has typed"], "Passive voice in the past: was + past participle."],
  ["Neither of the two answers ___ correct.", "is", ["are", "were", "have been"], "'Neither of' takes a singular verb in standard English."],
  ["He is one of the students who ___ always punctual.", "are", ["is", "was", "has been"], "'Who' refers to 'students' (plural) → are."],
  ["The jury ___ divided in their opinions.", "were", ["was", "is", "has"], "When members act as individuals, the collective noun takes a plural verb."],
  ["I would rather you ___ now.", "left", ["leave", "leaving", "will leave"], "'Would rather + subject' takes the past form for present meaning."],
  ["The furniture in the room ___ new.", "is", ["are", "were", "have been"], "'Furniture' is uncountable → singular."],
  ["Had I known, I ___ have come.", "would not", ["will not", "did not", "should not to"], "Inverted third conditional: Had I known… I would not have come."],
  ["Hardly had he entered the room ___ the lights went out.", "when", ["than", "then", "that"], "'Hardly … when' is the correct correlative."],
  ["No sooner had we sat down ___ the rain started.", "than", ["when", "then", "that"], "'No sooner … than' is the correct correlative."],
  ["He walked ___ the room and sat down.", "into", ["in", "inside of", "onto"], "'Into' shows movement from outside to inside."],
];

const TAGS: [string, string][] = [
  ["You are coming to the party", "aren't you"], ["She can swim", "can't she"], ["They have finished", "haven't they"], ["He doesn't like rice", "does he"],
  ["We should leave now", "shouldn't we"], ["It isn't raining", "is it"], ["Your brother plays football", "doesn't he"], ["Nobody called", "did they"],
  ["Let's go to the market", "shall we"], ["I am your friend", "aren't I"], ["She went home early", "didn't she"], ["You won't forget", "will you"],
  ["There is enough food", "isn't there"], ["He has never been to Kano", "has he"], ["Everyone was present", "weren't they"], ["Ada will come", "won't she"],
];

// Near-synonyms: never offered as distractors for each other
const CLUSTERS = [
  ["placid", "tranquil", "pacify", "solace"], ["lucid", "vivid", "succinct"], ["indolent", "lethargic", "feeble"], ["obstinate", "adamant", "tenacious", "resilient"],
  ["cordial", "amiable", "gregarious", "benevolent"], ["affluent", "opulent", "lucrative"], ["credible", "cogent"], ["erroneous", "fallacy", "dubious"],
  ["jubilant", "hilarious"], ["perilous", "ominous", "volatile"], ["trivial", "mundane", "hackneyed"], ["augment", "replenish", "copious"],
  ["abate", "mitigate", "wane"], ["nonchalant", "apathy", "complacent"], ["candid", "integrity"], ["prudent", "pragmatic", "meticulous", "diligent", "frugal"],
  ["scanty", "feeble"], ["ephemeral", "sporadic"], ["conspicuous", "ostentatious", "notorious"], ["reticent", "reluctant"], ["innate", "spontaneous"],
];
const clusterOf = (w: string) => CLUSTERS.find((c) => c.includes(w)) ?? [w];

export function english(): Q[] {
  const qs: Q[] = [];

  qs.push(
    ...SYN.map((s) => {
      const sent = SENT[s[0]];
      const body = sent
        ? `Choose the option nearest in meaning to the word in capitals: ${sent}`
        : `Choose the option nearest in meaning to the word ${s[0].toUpperCase()}.`;
      const banned = new Set(clusterOf(s[0]));
      const pool = SYN.filter((x) => !banned.has(x[0])).map((x) => x[1]);
      return mcq(S, "Synonyms", body, s[1], shuffle(pool).slice(0, 6), `${cap(s[0])} means ${s[1]}.`, 2);
    }),
  );

  const opps = ANT.map((a) => a[1]);
  qs.push(
    ...ANT.map((a) =>
      mcq(S, "Antonyms", `Choose the option opposite in meaning to the word ${a[0].toUpperCase()}.`, a[1],
        shuffle(opps.filter((o) => o !== a[1])).slice(0, 6), `The opposite of ${a[0]} is ${a[1]}.`, 1),
    ),
    // reverse direction
    ...ANT.slice(0, 30).map((a) =>
      mcq(S, "Antonyms", `Which word is the opposite of ${a[1].toUpperCase()}?`, a[0],
        shuffle(ANT.map((x) => x[0]).filter((o) => o !== a[0])).slice(0, 6), `${cap(a[1])} and ${a[0]} are opposites.`, 1),
    ),
  );

  qs.push(
    ...SPELL.map(([w, sent]) => {
      const wrong = misspell(w);
      if (wrong.length < 3) return null;
      return mcq(S, "Spelling", `Choose the correctly spelt word to fill the gap: ${sent}`, w, wrong, `The correct spelling is "${w}".`, 2);
    }).filter((q): q is Q => q !== null),
  );

  qs.push(
    ...COMP.flatMap(([a, c, s]) => [
      mcq(S, "Comparison", `Of the two sisters, Amaka is the ___ (${a}).`, c, [s, `more ${c}`, `most ${a}`, a], `Use the comparative (${c}) when comparing two.`, 1),
      mcq(S, "Comparison", `Chidi is the ___ (${a}) student in the whole school.`, s, [c, `most ${s}`, `more ${a}`, a], `Use the superlative (${s}) when comparing three or more.`, 1),
    ]),
  );

  qs.push(
    ...PLURAL.map(([sg, pl, wrong]) => mcq(S, "Plurals", `What is the plural of "${sg}"?`, pl, wrong, `The plural of ${sg.replace(/ \(.*\)/, "")} is ${pl}.`, 1)),
  );

  qs.push(
    ...IDIOMS.map(([idiom, meaning, wrong]) =>
      mcq(S, "Idioms", `What does the expression "${idiom}" mean?`, meaning, wrong, `To "${idiom}" means to ${meaning.replace(/^(a|an|the) /, "")}.`.replace("means to a", "means a"), 2),
    ),
  );

  qs.push(...GRAMMAR.map(([b, c, d, e]) => mcq(S, "Grammar", b, c, d, e, 2)));

  qs.push(
    ...TAGS.map(([stmt, tag]) => {
      const pool = shuffle(TAGS.map((t) => t[1]).filter((t) => t !== tag));
      return mcq(S, "Question tags", `Choose the correct question tag: ${stmt}, ___?`, tag, pool, `A positive statement takes a negative tag and vice versa, using the same auxiliary: "${stmt}, ${tag}?"`, 2);
    }),
  );

  return qs;
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
void rand;
void others;
