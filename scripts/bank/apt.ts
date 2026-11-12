// Aptitude & reasoning (APT) — shared by Ethiopia's Scholastic Aptitude paper and India's SSC "General Intelligence & Reasoning".
// Almost everything is generated, so every answer is computed.
import { fmt, mcq, numOpts, pick, Q, repeat, ri, sample, shuffle } from "./lib";

const S = "APT";
const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const L = (i: number) => AZ[((i % 26) + 26) % 26];
const pos = (c: string) => AZ.indexOf(c);
const ord = (n: number) => { const t = n % 100; const sfx = t >= 11 && t <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] ?? "th"; return `${n}${sfx}`; };
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WORDS = ["CAT", "DOG", "SUN", "PEN", "BOOK", "MILK", "LAMP", "FISH", "GOLD", "ROAD", "TREE", "RAIN", "SALT", "KING", "BIRD", "DESK", "FARM", "HAND", "STAR", "WIND", "COLD", "SHIP", "LION", "MOON"];
const DICT = ["Abandon", "Abroad", "Absent", "Accept", "Banana", "Bandit", "Basket", "Battle", "Candle", "Canvas", "Carbon", "Castle", "Danger", "Dazzle", "Debate", "Decent", "Garden", "Garlic", "Gather", "Gentle", "Market", "Marvel", "Master", "Matter", "Pencil", "People", "Pepper", "Permit", "Silver", "Simple", "Single", "Sister"];

function series(): Q[] {
  const kinds: (() => { seq: number[]; next: number; rule: string } | null)[] = [
    () => { const a = ri(2, 30), d = ri(2, 15); const s = [0, 1, 2, 3, 4].map((i) => a + i * d); return { seq: s, next: a + 5 * d, rule: `add ${d} each time` }; },
    () => { const a = ri(1, 5), r = pick([2, 3]); const s = [0, 1, 2, 3, 4].map((i) => a * r ** i); return { seq: s, next: a * r ** 5, rule: `multiply by ${r} each time` }; },
    () => { const o = ri(1, 6); const s = [0, 1, 2, 3, 4].map((i) => (i + o) ** 2); return { seq: s, next: (5 + o) ** 2, rule: "consecutive square numbers" }; },
    () => { const o = ri(1, 4); const s = [0, 1, 2, 3, 4].map((i) => (i + o) ** 3); return { seq: s, next: (5 + o) ** 3, rule: "consecutive cube numbers" }; },
    () => { const a = ri(1, 20), k = ri(1, 3); const s = [a]; for (let i = 1; i < 5; i++) s.push(s[i - 1] + k * i); return { seq: s, next: s[4] + k * 5, rule: `the differences increase by ${k} (+${k}, +${2 * k}, +${3 * k}…)` }; },
    () => { const o = ri(1, 6); const s = [0, 1, 2, 3, 4].map((i) => (i + o) * (i + o + 1)); return { seq: s, next: (5 + o) * (6 + o), rule: "n × (n + 1) for consecutive n" }; },
    () => { const a = ri(1, 5), b = ri(2, 6); const s = [a, b]; for (let i = 2; i < 6; i++) s.push(s[i - 1] + s[i - 2]); return { seq: s.slice(0, 5), next: s[5], rule: "each term is the sum of the two before it" }; },
    () => { const a = ri(2, 6), m = 2, c = pick([1, -1, 2]); const s = [a]; for (let i = 1; i < 5; i++) s.push(s[i - 1] * m + c); return { seq: s, next: s[4] * m + c, rule: `× 2 then ${c > 0 ? "+" : "−"} ${Math.abs(c)}` }; },
    () => { const a = ri(1, 10), p = ri(2, 6), q = ri(1, 4); const s = [a]; for (let i = 1; i < 5; i++) s.push(s[i - 1] + (i % 2 ? p : -q)); return { seq: s, next: s[4] + p, rule: `alternately +${p} and −${q}` }; },
  ];
  return repeat(45, () => {
    const r = pick(kinds)();
    if (!r) return null;
    const d1 = r.seq[4] - r.seq[3];
    return mcq(S, "Number series", `What comes next? ${r.seq.join(", ")}, ?`, fmt(r.next), numOpts(r.next, [r.seq[4] + d1, r.next + 1, r.next - 2, r.next * 2]), `Rule: ${r.rule}. Next term = ${r.next}.`, 2);
  });
}

function letters(): Q[] {
  const qs: Q[] = [];
  qs.push(...repeat(20, () => {
    const a = ri(0, 10), k = ri(2, 4);
    const s = [0, 1, 2, 3].map((i) => L(a + i * k));
    const ans = L(a + 4 * k);
    return mcq(S, "Letter series", `Find the next letter: ${s.join(", ")}, ?`, ans, [L(a + 4 * k + 1), L(a + 4 * k - 1), L(a + 3 * k + 1), L(a + 5 * k)], `Each letter moves ${k} places forward: ${s.join(" → ")} → ${ans}.`, 1);
  }));
  qs.push(...repeat(15, () => {
    const a = ri(0, 14), k = ri(1, 3);
    const pair = (i: number) => L(a + i * k) + L(25 - a - i * k);
    const s = [0, 1, 2].map(pair);
    const ans = pair(3);
    if (new Set([...s, ans]).size < 4) return null;
    return mcq(S, "Letter series", `Find the next pair: ${s.join(", ")}, ?`, ans, [L(a + 3 * k) + L(25 - a - 3 * k + 1), L(a + 3 * k + 1) + L(25 - a - 3 * k), L(a + 4 * k) + L(25 - a - 4 * k), L(25 - a - 3 * k) + L(a + 3 * k)], `The first letters go forward by ${k}; the second letters are their opposites (A↔Z, B↔Y…).`, 2);
  }));
  qs.push(...repeat(15, () => {
    const n = ri(3, 18), k = ri(2, 7), dir = pick(["right", "left"] as const);
    const idx = dir === "right" ? n - 1 + k : n - 1 - k;
    if (idx < 0 || idx > 25) return null;
    return mcq(S, "Alphabet", `In the English alphabet, which letter is ${ord(k)} to the ${dir} of the ${ord(n)} letter from the left?`, L(idx), [L(idx + 1), L(idx - 1), L(dir === "right" ? n - 1 - k : n - 1 + k), L(n - 1)], `The ${ord(n)} letter is ${L(n - 1)}; ${k} places to the ${dir} is ${L(idx)}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const a = ri(0, 18), b = a + ri(3, 7);
    return mcq(S, "Alphabet", `How many letters are there between ${L(a)} and ${L(b)} in the English alphabet?`, String(b - a - 1), [String(b - a), String(b - a + 1), String(b - a - 2)], `${L(a)} is letter ${a + 1} and ${L(b)} is letter ${b + 1}, so ${b - a - 1} letters lie between them.`, 1);
  }));
  return qs;
}

function coding(): Q[] {
  const enc = (w: string, k: number) => w.split("").map((c) => L(pos(c) + k)).join("");
  const rev = (w: string) => w.split("").reverse().join("");
  const qs: Q[] = [];
  qs.push(...repeat(20, () => {
    const [a, b] = sample(WORDS, 2);
    if (a.length !== b.length && Math.random() < 0.5) return null;
    const k = pick([1, 2, 3, -1, -2]);
    const ans = enc(b, k);
    return mcq(S, "Coding–decoding", `If ${a} is written as ${enc(a, k)} in a code, how is ${b} written in that code?`, ans, [enc(b, k + 1), enc(b, -k), rev(ans), enc(b, k === 1 ? 2 : 1)],
      `Each letter is shifted ${Math.abs(k)} place${Math.abs(k) > 1 ? "s" : ""} ${k > 0 ? "forward" : "back"}: ${b} → ${ans}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const [a, b] = sample(WORDS, 2);
    const k = pick([1, 2]);
    const ans = rev(enc(b, k));
    return mcq(S, "Coding–decoding", `In a code, ${a} is written as ${rev(enc(a, k))}. How is ${b} written?`, ans, [enc(b, k), rev(enc(b, k + 1)), rev(b), enc(rev(b), -k)], `Shift each letter ${k} forward, then write the word backwards: ${b} → ${enc(b, k)} → ${ans}.`, 3);
  }));
  qs.push(...repeat(12, () => {
    const w = pick(WORDS);
    const v = w.split("").reduce((s, c) => s + pos(c) + 1, 0);
    return mcq(S, "Coding–decoding", `If A = 1, B = 2, C = 3 … Z = 26, what is the value of ${w}?`, String(v), numOpts(v, [v + 1, v - 2, v + w.length]), `${w.split("").map((c) => `${c}=${pos(c) + 1}`).join(", ")} → total ${v}.`, 1);
  }));
  return qs;
}

function analogyOdd(): Q[] {
  const qs: Q[] = [];
  const rules: [string, (n: number) => number][] = [["square", (n) => n * n], ["cube", (n) => n ** 3], ["double plus one", (n) => 2 * n + 1], ["square minus one", (n) => n * n - 1], ["n × (n + 1)", (n) => n * (n + 1)], ["triple", (n) => 3 * n]];
  qs.push(...repeat(20, () => {
    const [name, f] = pick(rules);
    const a = ri(2, 9), b = ri(2, 12);
    if (a === b) return null;
    return mcq(S, "Analogy", `${a} : ${f(a)} :: ${b} : ?`, fmt(f(b)), numOpts(f(b), [f(b) + 1, f(b) - 1, f(b + 1), f(a) + b]), `Rule: ${name}. ${b} → ${f(b)}.`, 2);
  }));
  const prime = (n: number) => n > 1 && [...Array(Math.floor(Math.sqrt(n)) - 1)].every((_, i) => n % (i + 2) !== 0);
  const PRIMES = [...Array(100).keys()].filter(prime);
  qs.push(...repeat(10, () => {
    const p = sample(PRIMES.filter((x) => x > 10), 3);
    const odd = pick([21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91]);
    return mcq(S, "Odd one out", `Find the odd one out: ${shuffle([...p, odd]).join(", ")}`, String(odd), p.map(String), `${p.join(", ")} are prime; ${odd} is not.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const sq = sample([16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196], 3);
    const odd = pick([18, 26, 45, 50, 72, 90, 110, 125, 150]);
    return mcq(S, "Odd one out", `Find the odd one out: ${shuffle([...sq, odd]).join(", ")}`, String(odd), sq.map(String), `${sq.join(", ")} are perfect squares; ${odd} is not.`, 1);
  }));
  qs.push(...repeat(10, () => {
    const m = pick([6, 7, 8, 9, 11, 13]);
    const ms = sample([2, 3, 4, 5, 6, 7, 8, 9], 3).map((x) => x * m);
    const odd = m * ri(3, 8) + ri(1, m - 1);
    return mcq(S, "Odd one out", `Find the odd one out: ${shuffle([...ms, odd]).join(", ")}`, String(odd), ms.map(String), `${ms.join(", ")} are multiples of ${m}; ${odd} is not.`, 2);
  }));
  const GROUPS: [string[], string, string][] = [
    [["Lion", "Tiger", "Leopard"], "Cow", "the others are wild cats"],
    [["Mars", "Venus", "Jupiter"], "Moon", "the others are planets"],
    [["Rose", "Lily", "Jasmine"], "Mango", "the others are flowers"],
    [["Nile", "Amazon", "Ganga"], "Sahara", "the others are rivers"],
    [["Copper", "Iron", "Silver"], "Wood", "the others are metals"],
    [["Kilogram", "Gram", "Tonne"], "Litre", "the others measure mass"],
    [["Square", "Rectangle", "Rhombus"], "Triangle", "the others have four sides"],
    [["Eye", "Ear", "Nose"], "Lung", "the others are sense organs on the face"],
    [["Violin", "Guitar", "Harp"], "Drum", "the others are string instruments"],
    [["Oxygen", "Nitrogen", "Hydrogen"], "Water", "the others are elements"],
    [["Kidney", "Liver", "Heart"], "Femur", "the others are organs; a femur is a bone"],
    [["Eagle", "Hawk", "Falcon"], "Bat", "the others are birds of prey; a bat is a mammal"],
  ];
  qs.push(...GROUPS.map(([g, odd, why]) => mcq(S, "Odd one out", `Which word does not belong with the others? ${shuffle([...g, odd]).join(", ")}`, odd, g, `${cap(why)}.`, 1)));
  const PAIRS: [string, string, string, string, string[]][] = [
    ["Doctor", "Hospital", "Teacher", "School", ["Book", "Student", "Office"]],
    ["Bird", "Nest", "Bee", "Hive", ["Honey", "Flower", "Den"]],
    ["Hand", "Glove", "Foot", "Sock", ["Toe", "Leg", "Hat"]],
    ["Pen", "Write", "Knife", "Cut", ["Sharp", "Fork", "Kitchen"]],
    ["Water", "Thirst", "Food", "Hunger", ["Eat", "Plate", "Cook"]],
    ["Cow", "Calf", "Dog", "Puppy", ["Kitten", "Cub", "Kid"]],
    ["Hot", "Cold", "Tall", "Short", ["Big", "High", "Long"]],
    ["Eye", "See", "Ear", "Hear", ["Sound", "Listen to music", "Smell"]],
    ["Week", "Day", "Year", "Month", ["Hour", "Decade", "Century"]],
    ["Painter", "Brush", "Writer", "Pen", ["Book", "Paper", "Story"]],
  ];
  qs.push(...PAIRS.map(([a, b, c, d, w]) => mcq(S, "Analogy", `${a} : ${b} :: ${c} : ?`, d, w, `A ${a.toLowerCase()} relates to ${b.toLowerCase()} as a ${c.toLowerCase()} relates to ${d.toLowerCase()}.`, 1)));
  return qs;
}
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

function directions(): Q[] {
  const DIRS = ["North", "East", "South", "West"];
  const qs: Q[] = [];
  const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25]];
  qs.push(...repeat(14, () => {
    const [a, b, c] = pick(TRIPLES);
    const start = ri(0, 3), turn = pick(["right", "left"] as const);
    const d1 = DIRS[start], d2 = DIRS[(start + (turn === "right" ? 1 : 3)) % 4];
    return mcq(S, "Direction sense", `A man walks ${a} km ${d1.toLowerCase()}, then turns ${turn} and walks ${b} km. How far is he from his starting point?`, `${c} km`, [`${a + b} km`, `${b - a} km`, `${c + 1} km`, `${a * b} km`],
      `The two legs are at right angles, so distance = √(${a}² + ${b}²) = √${a * a + b * b} = ${c} km.`, 2);
  }));
  qs.push(...repeat(14, () => {
    const start = ri(0, 3);
    const turns = [...Array(ri(2, 4))].map(() => pick(["right", "left", "about"] as const));
    let d = start;
    for (const t of turns) d = (d + (t === "right" ? 1 : t === "left" ? 3 : 2)) % 4;
    const words = turns.map((t) => (t === "about" ? "turns about (180°)" : `turns ${t}`)).join(", then ");
    return mcq(S, "Direction sense", `Ade is facing ${DIRS[start].toLowerCase()}. He ${words}. Which direction is he facing now?`, DIRS[d], DIRS.filter((_, i) => i !== d), `Right = 90° clockwise, left = 90° anticlockwise, about = 180°. He ends up facing ${DIRS[d]}.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
    if (a === c) return null;
    const north = a - c;
    return mcq(S, "Direction sense", `Sara walks ${a} km north, ${b} km east, then ${c} km south. How far east of her start is she, and how far ${north > 0 ? "north" : "south"}?`,
      `${b} km east, ${Math.abs(north)} km ${north > 0 ? "north" : "south"}`,
      [`${b} km east, ${a + c} km ${north > 0 ? "north" : "south"}`, `${a} km east, ${Math.abs(north)} km ${north > 0 ? "north" : "south"}`, `${b} km east, ${Math.abs(north)} km ${north > 0 ? "south" : "north"}`],
      `East–west: ${b} km east. North–south: ${a} − ${c} = ${north} → ${Math.abs(north)} km ${north > 0 ? "north" : "south"}.`, 2);
  }));
  return qs;
}

function calendarClock(): Q[] {
  const qs: Q[] = [];
  qs.push(...repeat(16, () => {
    const y = ri(1995, 2030), m = ri(0, 11), d = ri(1, 28);
    const dow = new Date(Date.UTC(y, m, d)).getUTCDay();
    const later = ri(10, 200);
    const dow2 = (dow + later) % 7;
    return mcq(S, "Calendar", `If today is a ${DAYS[dow]}, what day of the week will it be ${later} days from today?`, DAYS[dow2], DAYS.filter((_, i) => i !== dow2), `${later} = ${Math.floor(later / 7)} weeks + ${later % 7} days, so move ${later % 7} days on from ${DAYS[dow]}: ${DAYS[dow2]}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const y = pick([2023, 2025, 2026, 2027, 2028, 2032]);
    const leap = y % 4 === 0;
    const start = new Date(Date.UTC(y, 0, 1)).getUTCDay();
    const m = ri(1, 11);
    const dow = new Date(Date.UTC(y, m, 1)).getUTCDay();
    const days = Math.round((Date.UTC(y, m, 1) - Date.UTC(y, 0, 1)) / 86400000);
    return mcq(S, "Calendar", `1 January ${y} is a ${DAYS[start]}. What day of the week is 1 ${MONTHS[m]} ${y}?`, DAYS[dow], DAYS.filter((_, i) => i !== dow),
      `There are ${days} days from 1 January to 1 ${MONTHS[m]} (${leap ? "leap year" : "not a leap year"}). ${days} mod 7 = ${days % 7}, so count ${days % 7} days on from ${DAYS[start]}.`, 3);
  }));
  qs.push(...repeat(14, () => {
    const h = ri(1, 12), m = pick([0, 10, 15, 20, 30, 40, 45, 50]);
    let a = Math.abs(30 * (h % 12) - 5.5 * m);
    if (a > 180) a = 360 - a;
    return mcq(S, "Clocks", `What is the smaller angle between the hour and minute hands of a clock at ${h}:${String(m).padStart(2, "0")}?`, `${fmt(a)}°`, numOpts(a, [Math.abs(30 * (h % 12) - 6 * m) % 360, 360 - a, a + 30, a + 5], "°").map((x) => x.replace(" °", "°")),
      `Angle = |30H − 5.5M| = |30×${h % 12} − 5.5×${m}| = ${fmt(Math.abs(30 * (h % 12) - 5.5 * m))}°${Math.abs(30 * (h % 12) - 5.5 * m) > 180 ? `; the smaller angle is 360° minus that = ${fmt(a)}°` : ""}.`, 3);
  }));
  return qs;
}

function ranking(): Q[] {
  const qs: Q[] = [];
  qs.push(...repeat(12, () => {
    const n = ri(20, 60), k = ri(3, n - 3);
    return mcq(S, "Ranking & order", `In a row of ${n} students, Tola is ${ord(k)} from the left. What is her position from the right?`, String(n - k + 1), numOpts(n - k + 1, [n - k, n - k + 2, k]), `Position from right = total − position from left + 1 = ${n} − ${k} + 1 = ${n - k + 1}.`, 1);
  }));
  qs.push(...repeat(12, () => {
    const a = ri(5, 25), b = ri(5, 25);
    return mcq(S, "Ranking & order", `Musa is ${ord(a)} from the top and ${ord(b)} from the bottom in his class ranking. How many students are in the class?`, String(a + b - 1), numOpts(a + b - 1, [a + b, a + b + 1, a + b - 2]), `Total = ${a} + ${b} − 1 = ${a + b - 1} (Musa is counted twice).`, 2);
  }));
  qs.push(...repeat(12, () => {
    const ws = sample(DICT, 4);
    const sorted = [...ws].sort();
    const k = ri(0, 3);
    const ord = ["first", "second", "third", "fourth"][k];
    return mcq(S, "Dictionary order", `Which word comes ${ord} in dictionary (alphabetical) order? ${ws.join(", ")}`, sorted[k], sorted.filter((_, i) => i !== k), `In order: ${sorted.join(", ")}.`, 1);
  }));
  qs.push(...repeat(12, () => {
    const n = ri(40, 120), a = ri(15, 60), b = ri(10, 50), both = ri(3, Math.min(a, b) - 2);
    const neither = n - (a + b - both);
    if (neither < 0) return null;
    return mcq(S, "Venn diagrams", `In a group of ${n} students, ${a} play football, ${b} play basketball and ${both} play both. How many play neither?`, String(neither), numOpts(neither, [n - a - b, n - a - b + 2 * both, neither + both]), `Play at least one = ${a} + ${b} − ${both} = ${a + b - both}. Neither = ${n} − ${a + b - both} = ${neither}.`, 2);
  }));
  return qs;
}

const SYLL: [string, string, string[], string][] = [
  ["Statements: All doctors are graduates. All graduates are literate. Conclusion: All doctors are literate.", "The conclusion follows", ["The conclusion does not follow", "It follows only if some graduates are doctors", "It cannot be decided"], "All A are B and all B are C, so all A are C."],
  ["Statements: All cats are animals. Some animals are black. Conclusion: Some cats are black.", "The conclusion does not follow", ["The conclusion follows", "It follows because all cats are animals", "It is definitely false"], "The black animals need not include any cats."],
  ["Statements: No fish is a bird. All sparrows are birds. Conclusion: No sparrow is a fish.", "The conclusion follows", ["The conclusion does not follow", "Some sparrows are fish", "It cannot be decided"], "Sparrows are inside 'birds', and no bird is a fish."],
  ["Statements: Some pens are blue. All blue things are bright. Conclusion: Some pens are bright.", "The conclusion follows", ["The conclusion does not follow", "All pens are bright", "No pen is bright"], "The blue pens must be bright."],
  ["Statements: All roses are flowers. Some flowers fade quickly. Conclusion: All roses fade quickly.", "The conclusion does not follow", ["The conclusion follows", "Some roses fade quickly — definitely", "No rose fades"], "We only know some flowers fade; they may not be roses."],
  ["Statements: All teachers are readers. No reader is lazy. Conclusion: No teacher is lazy.", "The conclusion follows", ["The conclusion does not follow", "Some teachers are lazy", "It cannot be decided"], "Teachers are readers, and no reader is lazy."],
  ["Statements: Some boys are tall. Some tall people are athletes. Conclusion: Some boys are athletes.", "The conclusion does not follow", ["The conclusion follows", "All boys are athletes", "No boy is an athlete"], "Two 'some' statements never give a definite conclusion."],
  ["Statements: All squares are rectangles. All rectangles are quadrilaterals. Conclusion: Some quadrilaterals are squares.", "The conclusion follows", ["The conclusion does not follow", "No quadrilateral is a square", "All quadrilaterals are squares"], "Squares are inside quadrilaterals, so some quadrilaterals are squares."],
  ["Statements: No metal is a liquid at room temperature except mercury. Iron is a metal. Conclusion: Iron is solid at room temperature.", "The conclusion follows", ["The conclusion does not follow", "Iron is a liquid", "It cannot be decided"], "Iron is a metal other than mercury."],
  ["Statements: All books have pages. This object has pages. Conclusion: This object is a book.", "The conclusion does not follow", ["The conclusion follows", "It is a book only on Mondays", "Nothing with pages is a book"], "Other things (e.g. a magazine) have pages too."],
];
const RELATIONS: [string, string, string[], string][] = [
  ["Pointing to a man, Amina says, 'He is the son of my father's only son.' How is the man related to Amina?", "Brother or nephew — he is her brother if she is the only son's sister… (she is female, so the only son is her brother; the man is her nephew)", ["Father", "Uncle", "Cousin"], "Amina is female, so her father's only son is her brother. His son is Amina's nephew."],
  ["A is the brother of B. B is the sister of C. C is the father of D. How is A related to D?", "Uncle", ["Father", "Brother", "Grandfather"], "A is a sibling of D's father, so A is D's uncle."],
  ["P is the mother of Q. Q is the sister of R. R is the son of S. How is S related to P?", "Husband", ["Brother", "Son", "Father"], "P and S are both parents of R (and Q), so S is P's husband."],
  ["X's mother is the only daughter of Y's grandmother. How is Y related to X if Y is male and X's mother is not Y's mother?", "Cousin", ["Brother", "Uncle", "Nephew"], "X's mother is Y's aunt, so X and Y are cousins."],
  ["Kemi's father's sister is Bola. How is Bola related to Kemi?", "Aunt", ["Mother", "Cousin", "Grandmother"], "A father's sister is an aunt."],
  ["My mother's brother's son is my", "Cousin", ["Brother", "Nephew", "Uncle"], "Your uncle's son is your cousin."],
  ["A woman says of a girl, 'Her mother is the only daughter of my mother.' How is the woman related to the girl?", "Mother", ["Aunt", "Sister", "Grandmother"], "The only daughter of the woman's mother is the woman herself."],
  ["Tunde's father is the only son of Musa's father. How is Musa related to Tunde?", "Grandfather or father — Musa is Tunde's father if Musa is that only son; here 'only son of Musa's father' is Musa, so Musa is Tunde's father", ["Uncle", "Brother", "Cousin"], "The only son of Musa's father is Musa himself, so Musa is Tunde's father."],
];

export function aptitude(): Q[] {
  return [
    ...series(), ...letters(), ...coding(), ...analogyOdd(), ...directions(), ...calendarClock(), ...ranking(),
    ...SYLL.map(([b, c, d, e]) => mcq(S, "Syllogisms", b, c, d, e, 2)),
    ...RELATIONS.filter((r) => r[1].length < 30).map(([b, c, d, e]) => mcq(S, "Blood relations", b, c, d, e, 2)),
    mcq(S, "Blood relations", "Pointing to a man, Amina says, 'He is the son of my father's only son.' How is the man related to Amina?", "Nephew", ["Brother", "Father", "Uncle"], "Amina is female, so her father's only son is her brother; his son is her nephew.", 3),
    mcq(S, "Blood relations", "Tunde's father is the only son of Musa's father. How is Musa related to Tunde?", "Father", ["Uncle", "Brother", "Grandfather"], "The only son of Musa's father is Musa himself, so Musa is Tunde's father.", 3),
  ];
}
