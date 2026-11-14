// Digital SAT — original practice (not College Board items).
// SMT: Math, generated with computed answers. SRW: Reading & Writing, short original passages.
import { fmt, frac, gcd, mcq, numOpts, pick, Q, repeat, ri, sample } from "./lib";

// ---------------------------------------------------------------------------
// Math
// ---------------------------------------------------------------------------
const M = "SMT";
const ALG = "Algebra", ADV = "Advanced Math", PSD = "Problem-Solving and Data Analysis", GEO = "Geometry and Trigonometry";
const sgn = (n: number) => (n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`);
const lin = (a: number, b: number, v = "x") => `${a === 1 ? "" : a === -1 ? "−" : a}${v} ${sgn(b)}`;

function math(): Q[] {
  const qs: Q[] = [];
  // Linear equations
  qs.push(...repeat(14, () => {
    const a = ri(2, 9), x = ri(-9, 12), b = ri(-20, 20);
    if (b === 0) return null;
    const c = a * x + b;
    return mcq(M, ALG, `If ${lin(a, b)} = ${c}, what is the value of x?`, String(x), numOpts(x, [x + 1, -x, (c + b) / a, x - 2]), `${b > 0 ? `Subtract ${b} from` : `Add ${-b} to`} both sides: ${a}x = ${c - b}. Divide by ${a}: x = ${x}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const a = ri(2, 6), x = ri(1, 9), k = ri(2, 5);
    return mcq(M, ALG, `If ${a}x = ${a * x}, what is the value of ${k}x + 1?`, String(k * x + 1), numOpts(k * x + 1, [x, k * x, k * x + a, x + 1]), `x = ${x}, so ${k}x + 1 = ${k * x + 1}.`, 1);
  }));
  // Systems
  qs.push(...repeat(12, () => {
    const x = ri(-5, 8), y = ri(-5, 8), a = ri(1, 4), b = ri(1, 4), c = ri(1, 4), d = ri(-4, -1);
    if (a * d - b * c === 0) return null;
    const e1 = a * x + b * y, e2 = c * x + d * y;
    const ask = pick(["x", "y", "x + y"] as const);
    const ans = ask === "x" ? x : ask === "y" ? y : x + y;
    const co = (n: number) => (n === 1 ? "" : String(n));
    return mcq(M, ALG, `${co(a)}x + ${co(b)}y = ${e1}\n${co(c)}x − ${co(Math.abs(d))}y = ${e2}\n\nIf (x, y) is the solution to the system above, what is the value of ${ask}?`, String(ans),
      numOpts(ans, [ask === "x" ? y : x, ans + 1, ans - 2, -ans]), `Solving gives x = ${x} and y = ${y}, so ${ask} = ${ans}.`, 2);
  }));
  // Slope & lines
  qs.push(...repeat(12, () => {
    const x1 = ri(-6, 6), y1 = ri(-6, 6), dx = pick([1, 2, 3, 4, -2]), m = pick([-3, -2, -1, 1, 2, 3, 0.5, -0.5]);
    const dy = m * dx;
    if (!Number.isInteger(dy)) return null;
    return mcq(M, ALG, `A line passes through (${x1}, ${y1}) and (${x1 + dx}, ${y1 + dy}). What is the slope of the line?`, fmt(m), numOpts(m, [-m, 1 / m, dx / (dy || 1), m + 1]), `Slope = (change in y) ÷ (change in x) = ${dy} ÷ ${dx} = ${fmt(m)}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const m = pick([2, 3, -2, -3, 4, 0.5]);
    const perp = -1 / m;
    return mcq(M, ALG, `Line ℓ has slope ${fmt(m)}. What is the slope of a line perpendicular to ℓ?`, fmt(perp), numOpts(perp, [m, -m, 1 / m]), `Perpendicular slopes are negative reciprocals: −1 ÷ ${fmt(m)} = ${fmt(perp)}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const fee = ri(2, 12) * 5, rate = ri(2, 15), h = ri(2, 9);
    const total = fee + rate * h;
    return mcq(M, ALG, `A plumber charges a $${fee} call-out fee plus $${rate} per hour. The total for one job was $${total}. How many hours did the job take?`, String(h), numOpts(h, [total / rate, h + 1, (total - fee) / fee, h - 1]), `${fee} + ${rate}h = ${total} → ${rate}h = ${total - fee} → h = ${h}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const a = ri(2, 6), b = ri(1, 15), c = ri(20, 60);
    const lim = (c - b) / a;
    if (!Number.isInteger(lim)) return null;
    return mcq(M, ALG, `What is the greatest integer value of x that satisfies ${a}x + ${b} < ${c}?`, String(lim - 1), numOpts(lim - 1, [lim, lim + 1, lim - 2]), `${a}x < ${c - b} → x < ${lim}. The greatest integer below ${lim} is ${lim - 1}.`, 2);
  }));
  // Quadratics
  qs.push(...repeat(12, () => {
    const r1 = ri(-8, 8), r2 = ri(-8, 8);
    if (r1 === r2 || r1 === 0 || r2 === 0) return null;
    const b = -(r1 + r2), c = r1 * r2;
    const ask = pick(["sum", "pos"] as const);
    if (ask === "pos" && Math.max(r1, r2) <= 0) return null;
    const eq = `x² ${b === 0 ? "" : sgn(b) + "x "}${sgn(c)} = 0`;
    return ask === "sum"
      ? mcq(M, ADV, `What is the sum of the solutions to ${eq}?`, String(r1 + r2), numOpts(r1 + r2, [b, c, r1 - r2, -c]), `It factors as (x ${sgn(-r1)})(x ${sgn(-r2)}) = 0, so x = ${r1} or ${r2}. Sum = ${r1 + r2} (also −b/a).`, 2)
      : mcq(M, ADV, `What is the positive solution to ${eq}?`, String(Math.max(r1, r2)), numOpts(Math.max(r1, r2), [Math.min(r1, r2), -Math.max(r1, r2), c, -b]), `Factor: (x ${sgn(-r1)})(x ${sgn(-r2)}) = 0 → x = ${r1} or x = ${r2}.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const a = pick([1, 2, -1, 3]), h = ri(-6, 6), k = ri(-9, 9);
    return mcq(M, ADV, `The graph of y = ${a === 1 ? "" : a === -1 ? "−" : a}(x ${sgn(-h)})² ${sgn(k)} has its vertex at which point?`, `(${h}, ${k})`, [`(${-h}, ${k})`, `(${h}, ${-k})`, `(${-h}, ${-k})`, `(${k}, ${h})`], `In y = a(x − h)² + k the vertex is (h, k) = (${h}, ${k}).`, 2);
  }));
  qs.push(...repeat(8, () => {
    const b = ri(-8, 8), c = ri(-10, 12);
    const disc = b * b - 4 * c;
    const n = disc > 0 ? "Two" : disc === 0 ? "Exactly one" : "No";
    return mcq(M, ADV, `How many distinct real solutions does x² ${sgn(b)}x ${sgn(c)} = 0 have?`, `${n} real solution${n === "Exactly one" ? "" : "s"}`, ["Two real solutions", "Exactly one real solution", "No real solutions", "Infinitely many solutions"].filter((o) => !o.startsWith(n)), `Discriminant b² − 4ac = ${b * b} − (${4 * c}) = ${disc}${disc > 0 ? " > 0" : disc === 0 ? " = 0" : " < 0"}.`, 3);
  }));
  // Functions & exponents
  qs.push(...repeat(10, () => {
    const a = ri(1, 4), b = ri(-5, 5), x = ri(-3, 4);
    const v = a * x * x + b;
    return mcq(M, ADV, `If f(x) = ${a === 1 ? "" : a}x² ${sgn(b)}, what is the value of f(${x})?`, String(v), numOpts(v, [a * x + b, a * 2 * x + b, v + 2 * a, -v]), `f(${x}) = ${a}(${x})² ${sgn(b)} = ${a * x * x} ${sgn(b)} = ${v}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const a = ri(1, 4), b = ri(-3, 5), c = ri(1, 3), d = ri(-2, 3), x = ri(-2, 3);
    const g = c * x + d, fg = a * g + b;
    return mcq(M, ADV, `f(x) = ${lin(a, b)} and g(x) = ${lin(c, d)}. What is f(g(${x}))?`, String(fg), numOpts(fg, [c * (a * x + b) + d, a * x + b, g, fg + a]), `g(${x}) = ${g}; f(${g}) = ${a}(${g}) ${sgn(b)} = ${fg}.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const a = ri(2, 6), m = ri(2, 6), n = ri(2, 6);
    return mcq(M, ADV, `Which expression is equivalent to (x^${m})(x^${n}) for x > 0?`, `x^${m + n}`, [`x^${m * n}`, `x^${Math.abs(m - n) || m + n + 1}`, `${a}x^${m + n}`, `2x^${m + n}`], `When multiplying powers with the same base, add the exponents: ${m} + ${n} = ${m + n}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const p = ri(2, 10) * 100, r = pick([2, 3, 4, 5, 10]), t = pick([2, 3]);
    const v = Math.round(p * (1 + r / 100) ** t * 100) / 100;
    return mcq(M, PSD, `A population of ${p} grows by ${r}% each year. What is the population after ${t} years, to the nearest whole number?`, String(Math.round(v)), numOpts(Math.round(v), [p + p * (r / 100) * t, Math.round(p * (1 + r / 100)), Math.round(v) + 10]), `P = ${p}(1.${String(r).padStart(2, "0")})^${t} ≈ ${fmt(Math.round(v))}.`, 2);
  }));
  // Problem solving & data
  qs.push(...repeat(10, () => {
    const p = pick([10, 15, 20, 25, 30, 40]), price = ri(4, 30) * 10;
    const sale = price * (1 - p / 100);
    return mcq(M, PSD, `A jacket costs $${price}. It is discounted by ${p}%. What is the sale price?`, `$${fmt(sale)}`, numOpts(sale, [price * p / 100, price - p, price * (1 + p / 100)]).map((v) => `$${v}`), `Sale price = ${price} × (1 − ${p / 100}) = $${fmt(sale)}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const a = ri(20, 200), pct = pick([10, 20, 25, 50, 60, 75, 150]);
    const b = a * (1 + pct / 100);
    if (!Number.isInteger(b)) return null;
    return mcq(M, PSD, `A value increased from ${a} to ${b}. What was the percent increase?`, `${pct}%`, [`${Math.round((b - a) / b * 100)}%`, `${pct / 2}%`, `${pct + 10}%`, `${Math.round(b / a * 100)}%`], `Increase = ${b - a}; ÷ ${a} × 100 = ${pct}%.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const xs = [...Array(ri(5, 7))].map(() => ri(2, 30)).sort((a, b) => a - b);
    const ask = pick(["mean", "median", "range"] as const);
    const sum = xs.reduce((s, v) => s + v, 0);
    const median = xs.length % 2 ? xs[(xs.length - 1) / 2] : (xs[xs.length / 2 - 1] + xs[xs.length / 2]) / 2;
    const ans = ask === "mean" ? Math.round((sum / xs.length) * 100) / 100 : ask === "median" ? median : xs[xs.length - 1] - xs[0];
    if (ask === "mean" && !Number.isInteger(ans * 10)) return null;
    return mcq(M, PSD, `What is the ${ask} of the data set ${[...xs].reverse().sort((p, q) => ((p * 7) % 11) - ((q * 7) % 11)).join(", ")}?`, fmt(ans), numOpts(ans, [median, sum / xs.length, xs[xs.length - 1] - xs[0], ans + 1].filter((v) => v !== ans)), `Ordered: ${xs.join(", ")}. ${ask === "mean" ? `Mean = ${sum} ÷ ${xs.length} = ${fmt(ans)}` : ask === "median" ? `Median = ${fmt(median)}` : `Range = ${xs[xs.length - 1]} − ${xs[0]} = ${ans}`}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const a = ri(2, 9), b = ri(2, 9);
    if (gcd(a, b) !== 1) return null;
    const total = (a + b) * ri(3, 15);
    return mcq(M, PSD, `The ratio of red to blue marbles in a bag is ${a} : ${b}. There are ${total} marbles in total. How many are red?`, String((total * a) / (a + b)), numOpts((total * a) / (a + b), [(total * b) / (a + b), total / a, a * b]), `Red = ${a}/${a + b} × ${total} = ${(total * a) / (a + b)}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const g = ri(10, 40), b = ri(10, 40), gy = ri(3, g - 3);
    const tot = g + b;
    const p = frac(gy, tot);
    return mcq(M, PSD, `A survey of ${tot} students found ${g} prefer online classes and ${b} prefer in-person. Of those preferring online classes, ${gy} are in Grade 11. If a student is chosen at random from all ${tot}, what is the probability they prefer online classes AND are in Grade 11?`, p,
      [frac(gy, g), frac(g, tot), frac(gy, b), frac(gy + 1, tot)], `Favourable outcomes ${gy} ÷ all ${tot} students = ${p}.`, 2);
  }));
  // Geometry & trig
  qs.push(...repeat(8, () => {
    const r = ri(2, 12);
    return Math.random() < 0.5
      ? mcq(M, GEO, `A circle has radius ${r}. What is its area?`, `${r * r}π`, [`${2 * r}π`, `${r}π`, `${2 * r * r}π`, `${r * r * 2}`], `A = πr² = ${r * r}π.`, 1)
      : mcq(M, GEO, `A circle has diameter ${2 * r}. What is its circumference?`, `${2 * r}π`, [`${r}π`, `${r * r}π`, `${4 * r}π`, `${4 * r * r}π`], `C = πd = ${2 * r}π.`, 1);
  }));
  const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29]];
  qs.push(...repeat(8, () => {
    const [a, b, c] = pick(TRIPLES);
    return mcq(M, GEO, `A right triangle has legs of length ${a} and ${b}. What is the length of the hypotenuse?`, String(c), numOpts(c, [a + b, c + 1, Math.abs(b - a), c - 1]), `c = √(${a}² + ${b}²) = √${a * a + b * b} = ${c}.`, 1);
  }));
  qs.push(...repeat(10, () => {
    const [a, b, c] = pick(TRIPLES);
    const f = pick(["sin", "cos", "tan"] as const);
    const [n, d] = f === "sin" ? [a, c] : f === "cos" ? [b, c] : [a, b];
    return mcq(M, GEO, `In right triangle ABC, angle C is 90°. BC = ${a}, AC = ${b} and AB = ${c}. What is ${f} A?`, `${n}/${d}`, [`${a}/${c}`, `${b}/${c}`, `${a}/${b}`, `${b}/${a}`, `${c}/${a}`].filter((x) => x !== `${n}/${d}`), `For angle A: opposite = BC = ${a}, adjacent = AC = ${b}, hypotenuse = ${c}. ${f} = ${f === "sin" ? "opposite/hypotenuse" : f === "cos" ? "adjacent/hypotenuse" : "opposite/adjacent"} = ${n}/${d}.`, 2);
  }));
  qs.push(...repeat(6, () => {
    const x = pick([10, 20, 25, 30, 35, 40, 50, 55, 65, 70]);
    return mcq(M, GEO, `If sin(${x}°) = k, which of the following is also equal to k?`, `cos(${90 - x}°)`, [`cos(${x}°)`, `sin(${90 - x}°)`, `tan(${x}°)`, `cos(${180 - x}°)`], `sin θ = cos(90° − θ), so sin ${x}° = cos ${90 - x}°.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const h = ri(-6, 6), k = ri(-6, 6), r = ri(2, 9);
    return mcq(M, GEO, `The equation of a circle is (x ${sgn(-h)})² + (y ${sgn(-k)})² = ${r * r}. What are its centre and radius?`, `Centre (${h}, ${k}), radius ${r}`, [`Centre (${-h}, ${-k}), radius ${r}`, `Centre (${h}, ${k}), radius ${r * r}`, `Centre (${-h}, ${k}), radius ${r}`], `(x − h)² + (y − k)² = r² has centre (h, k) and radius √${r * r} = ${r}.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const a = ri(25, 80), b = ri(25, 80);
    if (a + b >= 170) return null;
    return mcq(M, GEO, `Two angles of a triangle measure ${a}° and ${b}°. What is the measure of the third angle?`, `${180 - a - b}°`, [`${360 - a - b}°`, `${a + b}°`, `${180 - a}°`, `${90 - Math.abs(a - b)}°`], `Angles in a triangle sum to 180°: 180 − ${a} − ${b} = ${180 - a - b}°.`, 1);
  }));
  qs.push(...repeat(6, () => {
    const r = ri(2, 6), h = ri(3, 12);
    return Math.random() < 0.5
      ? mcq(M, GEO, `What is the volume of a cylinder with radius ${r} and height ${h}?`, `${r * r * h}π`, [`${2 * r * h}π`, `${(r * r * h) / 3}π`.replace(/\.\d+/, ""), `${r * h}π`, `${2 * r * r * h}π`], `V = πr²h = π(${r * r})(${h}) = ${r * r * h}π.`, 2)
      : mcq(M, GEO, `A cone has radius ${r} and height ${h * 3}. What is its volume?`, `${r * r * h}π`, [`${3 * r * r * h}π`, `${r * r * h * 3 / 3 + r}π`, `${2 * r * h}π`], `V = ⅓πr²h = ⅓π(${r * r})(${h * 3}) = ${r * r * h}π.`, 2);
  }));
  qs.push(...repeat(6, () => {
    const s = ri(2, 6), k = pick([2, 3, 4]);
    return mcq(M, GEO, `Two similar triangles have corresponding sides in the ratio 1 : ${k}. The smaller triangle has area ${s * s}. What is the area of the larger triangle?`, String(s * s * k * k), numOpts(s * s * k * k, [s * s * k, s * s * k ** 3, s * s + k]), `Areas scale by the square of the ratio: ${s * s} × ${k}² = ${s * s * k * k}.`, 3);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
// Reading & Writing
// ---------------------------------------------------------------------------
const W = "SRW";
const SEC = "Standard English Conventions", EOI = "Expression of Ideas", CAS = "Craft and Structure", IAI = "Information and Ideas";
type F = [string, string, string[], string];

const AGREEMENT: F[] = [
  ["The collection of rare stamps, which includes several items from the 1800s, ______ on display at the city museum.", "is", ["are", "were", "have been"], "The subject is the singular 'collection', not 'stamps' or 'items'."],
  ["Each of the researchers ______ required to submit a summary of findings by Friday.", "is", ["are", "were", "have been"], "'Each' is singular."],
  ["The results of the long-term study ______ that regular sleep improves memory.", "suggest", ["suggests", "has suggested", "is suggesting"], "The subject is the plural 'results'."],
  ["Neither the coach nor the players ______ expecting the storm to delay the match.", "were", ["was", "is", "has been"], "With 'neither…nor', the verb agrees with the nearer subject, 'players'."],
  ["The team of engineers ______ finalising its design for the new bridge.", "is", ["are", "were", "have been"], "'Team' is a singular collective noun here, and 'its' confirms this."],
  ["Along the river ______ several old mills that once powered the town.", "stand", ["stands", "has stood", "is standing"], "In this inverted sentence the subject is the plural 'mills'."],
  ["The number of students applying to study engineering ______ risen sharply.", "has", ["have", "are", "were"], "'The number' is singular."],
  ["A number of volunteers ______ offered to help clean the beach.", "have", ["has", "is", "was"], "'A number of' means 'several' and takes a plural verb."],
  ["The data from both satellites, collected over a decade, ______ a clear warming trend.", "show", ["shows", "has shown", "is showing"], "Here 'data' is treated as plural, matching the formal style of the sentence."],
  ["Mathematics, along with chemistry and physics, ______ a required subject for this programme.", "is", ["are", "were", "have been"], "Phrases like 'along with' don't change the singular subject 'Mathematics'."],
  ["The flock of migrating geese ______ south every autumn.", "flies", ["fly", "are flying", "have flown"], "'Flock' is singular."],
  ["The instructions on the back of the box ______ easy to follow.", "are", ["is", "was", "has been"], "The subject is the plural 'instructions'."],
  ["Either the manager or her assistants ______ the reports each week.", "review", ["reviews", "has reviewed", "is reviewing"], "With 'either…or', the verb agrees with the nearer subject, 'assistants'."],
  ["Every one of the paintings in the gallery ______ been restored.", "has", ["have", "are", "were"], "'Every one' is singular."],
  ["The committee, after weeks of debate, ______ its final decision.", "has announced", ["have announced", "are announcing", "announce"], "'Committee' acting as one body is singular, matching 'its'."],
  ["Among the most famous works in the collection ______ a portrait painted in 1651.", "is", ["are", "were", "have been"], "In this inverted sentence the subject is the singular 'portrait'."],
];
const PUNCT: F[] = [
  ["The volcano had been dormant for centuries ______ scientists were surprised by the sudden eruption.", "centuries; therefore,", ["centuries, therefore", "centuries therefore,", "centuries, therefore,"], "Two independent clauses joined by 'therefore' need a semicolon before it and a comma after."],
  ["Marie Curie won two Nobel Prizes ______ one in physics and one in chemistry.", "Prizes:", ["Prizes;", "Prizes, and", "Prizes. One"], "A colon introduces an explanation or list that follows a complete clause."],
  ["The bakery opens at 6 a.m. ______ most customers arrive after 8 a.m.", "a.m., but", ["a.m. but,", "a.m., but,", "a.m. but"], "A comma goes before the coordinating conjunction joining two independent clauses."],
  ["Although the experiment failed twice ______ the team refused to give up.", "twice,", ["twice;", "twice:", "twice."], "Put a comma after an introductory dependent clause."],
  ["The novelist ______ latest book was translated into twelve languages, will speak at the festival.", "Amara Diallo, whose", ["Amara Diallo whose", "Amara Diallo; whose", "Amara Diallo who's"], "A non-essential clause is set off by commas; 'whose' shows possession."],
  ["The company announced that ______ new headquarters will open next spring.", "its", ["it's", "its'", "their"], "'Its' is possessive; 'it's' means 'it is'."],
  ["The students handed in ______ projects before the deadline.", "their", ["there", "they're", "it's"], "'Their' is the plural possessive."],
  ["Coral reefs cover less than 1% of the ocean floor ______ they support about a quarter of all marine species.", "floor, yet", ["floor yet", "floor; yet,", "floor, yet,"], "Use a comma before 'yet' when it joins two independent clauses."],
  ["The museum's newest exhibit features three ______ a dinosaur skeleton, a meteorite and an ancient map.", "items:", ["items;", "items,", "items, such as:"], "A colon after a complete clause introduces the list."],
  ["Lagos, ______ one of Africa's largest cities, is a major centre for music and film.", "Nigeria,", ["Nigeria", "Nigeria;", "Nigeria:"], "A city–country pair takes a comma after the country when the sentence continues."],
  ["The ______ findings were published in a leading journal.", "scientists'", ["scientist's's", "scientists", "scientists's"], "Plural possessive of 'scientists' adds only an apostrophe."],
  ["The chef tasted the ______ then added a pinch of salt.", "soup and", ["soup, and,", "soup; and", "soup: and"], "A compound verb (tasted … added) needs no comma."],
  ["The festival attracts thousands of ______ many travel from neighbouring countries to attend.", "visitors;", ["visitors,", "visitors", "visitors, and,"], "Two independent clauses can be joined with a semicolon."],
  ["Dr Okafor's research focuses on one ______ how plants respond to drought.", "question:", ["question;", "question, and", "question that is,"], "A colon introduces the explanation of 'one question'."],
  ["Kenya's runners, ______ have won many Olympic medals, often train at high altitude.", "who", ["whom", "which", "whose"], "'Who' is the subject of the clause and refers to people."],
  ["The city's two ______ the old harbour and the new marina, attract many tourists.", "ports,", ["ports:", "ports;", "ports"], "The appositive naming the ports is set off by a pair of commas."],
  ["After the storm ______ volunteers gathered to clear fallen trees from the roads.", "passed,", ["passed;", "passed:", "passed and"], "A comma follows the introductory clause."],
  ["The guide ______ was written by a local historian, explains the town's history in detail.", "book, which", ["book which", "book; which", "book. Which"], "A non-essential clause beginning with 'which' is set off by commas."],
  ["Several ______ including copper, cobalt and lithium, are needed to make modern batteries.", "metals,", ["metals:", "metals;", "metals"], "'Including…' is a non-essential phrase set off by commas."],
  ["The ______ new uniforms arrived just before the season began.", "team's", ["teams", "teams's", "team"], "Singular possessive: team's."],
];
const TENSE: F[] = [
  ["By the time the rescue team arrived, the hikers ______ for over six hours.", "had been waiting", ["are waiting", "will wait", "wait"], "The past perfect continuous shows an action continuing up to a past moment."],
  ["Next year, the city ______ a new rail line linking the airport to downtown.", "will open", ["opened", "has opened", "had opened"], "'Next year' calls for the future tense."],
  ["In 1969, astronauts ______ on the Moon for the first time.", "landed", ["land", "have landed", "will land"], "A completed event at a specific past time uses the simple past."],
  ["Since 2015, the charity ______ more than 200 schools.", "has built", ["builds", "built", "will build"], "'Since' + a time up to now takes the present perfect."],
  ["The artist, who grew up in Accra, ______ her first exhibition in 2010.", "held", ["holds", "has held", "will hold"], "A finished action in a stated past year uses the simple past."],
  ["Every morning, the farmer ______ the cows before sunrise.", "milks", ["milked", "will have milked", "had milked"], "A habitual present action uses the simple present."],
];
const TRANS: [string, string, string[], string][] = [
  ["Many people assume bats are blind. ______ most bats can see quite well, and some species see in colour.", "In fact,", ["Similarly,", "For example,", "As a result,"], "The second sentence corrects a misconception, so 'In fact' fits."],
  ["Solar panels have become much cheaper over the past decade. ______ more households are installing them.", "As a result,", ["However,", "In contrast,", "For instance,"], "The second sentence is a consequence of the first."],
  ["The first draft of the report was clear and well organised. ______ it contained several factual errors.", "However,", ["Therefore,", "Likewise,", "Moreover,"], "The second sentence contrasts with the praise in the first."],
  ["Octopuses can solve puzzles to reach food. ______ some have learned to unscrew jar lids.", "For example,", ["Nevertheless,", "In conclusion,", "Instead,"], "The second sentence gives a specific example of puzzle-solving."],
  ["The museum extended its opening hours. ______ it reduced ticket prices for students.", "Additionally,", ["Nonetheless,", "Consequently,", "In contrast,"], "The second sentence adds another, similar action."],
  ["Most desert plants store water in thick stems. ______ some rely instead on very deep roots.", "Alternatively,", ["Therefore,", "For example,", "Similarly,"], "The second sentence presents a different strategy."],
  ["The bridge was built to last 50 years. ______ it is still in use after more than a century.", "Remarkably,", ["Consequently,", "Similarly,", "Therefore,"], "The second sentence reports something surprising given the first."],
  ["The team tested the vaccine in mice. ______ they moved on to small human trials.", "Subsequently,", ["In contrast,", "For instance,", "Nevertheless,"], "The sentences describe steps in time order."],
  ["Bees pollinate many fruit crops. ______ a decline in bee populations could reduce harvests.", "Thus,", ["However,", "For example,", "Meanwhile,"], "The second sentence draws a logical conclusion."],
  ["The novel received poor reviews when it was first published. ______ it is now considered a classic.", "Today, however,", ["As a result,", "Similarly,", "In addition,"], "The second sentence contrasts past and present reception."],
  ["Chess requires careful planning several moves ahead. ______ go, a strategy game from East Asia, rewards long-term thinking.", "Likewise,", ["Conversely,", "Therefore,", "For instance,"], "Both sentences make the same kind of point about different games."],
  ["The city planned to build a new stadium. ______ residents voted to spend the money on schools.", "Instead,", ["Similarly,", "In addition,", "For example,"], "The second sentence describes what happened in place of the plan."],
  ["Some critics praised the film's bold visual style. ______ others felt the story was too slow.", "Meanwhile,", ["Therefore,", "For example,", "Thus,"], "The sentence introduces a different, contrasting view."],
  ["The recipe calls for fresh tomatoes. ______ canned tomatoes can be used if fresh ones are unavailable.", "That said,", ["Therefore,", "Similarly,", "As a result,"], "The second sentence qualifies the first."],
  ["The athlete trained for six hours a day for a year. ______ she won the national championship.", "Ultimately,", ["Conversely,", "For instance,", "In contrast,"], "The second sentence gives the final outcome."],
  ["Plastic waste harms marine life. ______ turtles often mistake plastic bags for jellyfish.", "For instance,", ["Nevertheless,", "In conclusion,", "Instead,"], "A specific example follows a general claim."],
  ["The company's profits fell last year. ______ it hired 200 new employees.", "Nevertheless,", ["Therefore,", "Similarly,", "For example,"], "Hiring despite falling profits is unexpected."],
  ["First, the clay is shaped on a wheel. ______ it is dried and fired in a kiln.", "Next,", ["However,", "For example,", "Similarly,"], "The sentences describe a sequence."],
  ["The study was small, involving only 30 participants. ______ its findings should be confirmed by larger studies.", "Therefore,", ["However,", "For example,", "Likewise,"], "A conclusion follows from the study's small size."],
  ["Many early cars were steam-powered. ______ most cars today run on petrol, diesel or electricity.", "By contrast,", ["Similarly,", "Consequently,", "For instance,"], "Past and present technologies are contrasted."],
];
const WORDS: F[] = [
  ["The scientist's explanation was so ______ that even students with no background in physics could follow it.", "lucid", ["obscure", "lengthy", "tentative"], "'Lucid' means clear and easy to understand."],
  ["Although the senator was usually talkative, she remained ______ when reporters asked about her plans.", "reticent", ["candid", "exuberant", "verbose"], "'Reticent' means unwilling to say much; the contrast with 'talkative' signals this."],
  ["The new policy was meant to be temporary, but it proved so popular that it became ______.", "permanent", ["fleeting", "optional", "obsolete"], "The contrast with 'temporary' points to 'permanent'."],
  ["The historian warned that the diary, written decades after the events, might not be an entirely ______ source.", "reliable", ["lengthy", "popular", "original"], "Writing long after events could make a source less reliable."],
  ["Rather than accepting the first answer, the detective was ______, questioning every witness twice.", "meticulous", ["careless", "indifferent", "impulsive"], "'Meticulous' means very careful and precise."],
  ["The plant is ______ to the region: it grows naturally there and nowhere else.", "endemic", ["foreign", "harmful", "adjacent"], "'Endemic' means native to and restricted to a place."],
  ["Supplies were so ______ during the drought that families were limited to a few litres of water a day.", "scarce", ["abundant", "costly", "varied"], "Limits on water suggest supplies were scarce."],
  ["The architect's design was ______: it combined traditional Hausa patterns with modern glass and steel.", "innovative", ["conventional", "derivative", "outdated"], "Combining old and new in a new way is innovative."],
  ["Early results were promising, but the researchers remained ______, noting that the sample size was small.", "cautious", ["certain", "dismissive", "careless"], "Noting a limitation shows caution."],
  ["The author's argument is ______ by strong evidence from three independent studies.", "supported", ["undermined", "ignored", "complicated"], "Strong evidence supports an argument."],
  ["The mayor's speech was ______, lasting only two minutes but covering every key point.", "concise", ["rambling", "vague", "repetitive"], "'Concise' means brief but complete."],
  ["Because the bridge was ______, engineers closed it until repairs could be made.", "unstable", ["decorative", "crowded", "renovated"], "Closing a bridge for repairs implies it was unsafe."],
  ["The two theories are ______: if one is true, the other must be false.", "incompatible", ["identical", "complementary", "interchangeable"], "Theories that can't both be true are incompatible."],
  ["In the poem, the storm is ______ for the speaker's inner turmoil.", "a metaphor", ["an excuse", "a reason", "an example"], "The storm stands for the speaker's feelings."],
  ["The documentary offers a ______ portrait of the musician, showing both her talents and her flaws.", "balanced", ["biased", "brief", "flattering"], "Showing strengths and flaws is balanced."],
  ["The old manuscript was so ______ that researchers handled it only with gloves.", "fragile", ["sturdy", "valuable", "illegible"], "Handling it carefully suggests it was easily damaged."],
  ["Her ______ to the project was clear: she worked evenings and weekends to finish it.", "commitment", ["indifference", "objection", "contribution"], "Working extra hours shows commitment."],
  ["The evidence was ______; it could be interpreted in several different ways.", "ambiguous", ["conclusive", "irrelevant", "fabricated"], "Evidence open to several readings is ambiguous."],
  ["Unlike his ______ brother, who spent freely, Tomas saved most of his earnings.", "extravagant", ["frugal", "generous", "cautious"], "The contrast with saving points to spending freely."],
  ["The report ______ the main causes of the flood, listing them in order of importance.", "identifies", ["obscures", "dismisses", "ignores"], "Listing causes identifies them."],
  ["Scientists were ______ by the results, which contradicted decades of earlier research.", "astonished", ["unmoved", "reassured", "bored"], "Unexpected results surprise people."],
  ["The negotiators reached a ______ that satisfied both sides.", "compromise", ["stalemate", "conflict", "dispute"], "An agreement satisfying both sides is a compromise."],
  ["The lecture was ______, drawing on examples from history, biology and music.", "wide-ranging", ["narrow", "superficial", "repetitive"], "Many fields of examples shows breadth."],
  ["The village's population has ______ steadily as young people move to the cities.", "dwindled", ["surged", "stabilised", "fluctuated"], "People leaving makes the population shrink."],
];
const PASSAGES: F[] = [
  [`Researchers studying sleep found that students who slept at least eight hours before an exam scored, on average, 10% higher than those who slept five hours or less. The researchers caution that students who sleep more may also differ in other ways, such as how much they studied.\n\nWhich choice best states the main idea of the text?`, "More sleep is linked to higher scores, though other factors may explain the link.", ["Sleeping more than eight hours guarantees a higher exam score.", "Studying is less important than sleep for exam success.", "Students who study more always sleep less."], "The text reports a link but warns it may not be causal."],
  [`The baobab tree can store thousands of litres of water in its thick trunk. During long dry seasons, when little rain falls, the tree draws on this store to survive. Its leafless branches in the dry season also reduce water loss.\n\nAccording to the text, how does the baobab survive dry seasons?`, "By storing water in its trunk and reducing water loss", ["By growing deep roots to reach groundwater", "By producing seeds that wait for rain", "By absorbing moisture from the air through its leaves"], "The text mentions trunk storage and leafless branches."],
  [`In 1957, Ghana became the first sub-Saharan African country to gain independence from colonial rule. Its first leader, Kwame Nkrumah, argued that independence for one nation was incomplete without the liberation of the whole continent.\n\nBased on the text, Nkrumah most likely believed that`, "African nations should support one another's independence.", ["Ghana should remain under colonial rule.", "Independence mattered only for Ghana.", "Economic growth was more important than independence."], "He saw Ghana's independence as linked to the continent's."],
  [`Some urban planners argue that adding more lanes to highways reduces traffic. Others point to a pattern called 'induced demand': as roads widen, more people choose to drive, and congestion soon returns.\n\nThe second sentence mainly serves to`, "present a view that challenges the claim in the first sentence", ["give an example that supports the first sentence", "define a term used in the first sentence", "summarise the history of highway building"], "'Induced demand' is offered as a counter-argument."],
  [`Text 1: Many economists believe a four-day work week will lower productivity, since employees will simply have less time to work.\nText 2: Trials in several companies found that output stayed the same or rose, because rested employees worked more efficiently.\n\nHow would the author of Text 2 most likely respond to Text 1?`, "By arguing that efficiency gains can offset fewer hours", ["By agreeing that productivity always falls", "By claiming that employees prefer longer weeks", "By saying that trials are not useful evidence"], "Text 2's evidence directly answers Text 1's concern."],
  [`A biologist hypothesised that a species of frog changes colour to match its surroundings. She placed frogs on light and dark backgrounds and recorded their colour after one hour.\n\nWhich finding would most directly support her hypothesis?`, "Frogs on dark backgrounds became darker, and frogs on light backgrounds became lighter.", ["All frogs became darker regardless of background.", "Frogs ate more on dark backgrounds.", "The frogs' colour did not change."], "This result matches colour changing to match surroundings."],
  [`The author describes the old market as 'a maze of colour and noise, where traders called out prices over the clatter of carts and the smell of spices hung in the air.'\n\nThe sentence mainly serves to`, "create a vivid sensory picture of the market", ["explain how prices were set", "argue that the market should be closed", "compare the market with a supermarket"], "It appeals to sight, sound and smell."],
  [`A recent survey of 2,000 adults found that 65% read at least one book in the past year, down from 74% a decade earlier. However, the share listening to audiobooks rose from 12% to 30%.\n\nWhich conclusion is best supported by the survey?`, "Reading printed books has declined while audiobook listening has grown.", ["People no longer enjoy stories.", "Audiobooks caused the decline in reading.", "Most adults listen to audiobooks."], "The figures show the two trends without proving cause."],
  [`Honeybees communicate the location of food through a 'waggle dance.' The angle of the dance relative to vertical shows the direction of the food compared with the sun, and the length of the waggle shows the distance.\n\nAccording to the text, what does the length of the waggle indicate?`, "How far away the food is", ["The direction of the sun", "How much food there is", "Which flowers to visit"], "The text links waggle length to distance."],
  [`The engineer's notes say: 'Prototype A was lighter but cracked under heavy loads. Prototype B was heavier but showed no damage after 10,000 test cycles.'\n\nWhich choice best uses the notes to explain why the team chose Prototype B?`, "Prototype B was chosen because, though heavier, it proved more durable in testing.", ["Prototype B was chosen because it was lighter.", "Prototype A was chosen because it never cracked.", "Both prototypes performed equally well."], "The notes show B's durability outweighed its extra weight."],
  [`The Ethiopian calendar has thirteen months: twelve months of thirty days each and a short thirteenth month of five or six days. As a result, its dates differ from the Gregorian calendar used in most countries.\n\nWhich choice best describes the function of the second sentence?`, "It states a consequence of the calendar's structure.", ["It contradicts the first sentence.", "It gives an example of a month.", "It explains the history of the calendar."], "'As a result' signals a consequence."],
  [`Mangrove forests protect coastlines by absorbing the energy of waves. After a major storm, villages behind healthy mangroves reported far less damage than villages where mangroves had been cleared.\n\nWhich choice best states the main idea of the text?`, "Mangroves help reduce storm damage to coastal communities.", ["Mangroves grow only near villages.", "Storms are becoming more frequent.", "Villagers should clear mangroves after storms."], "The example supports the protective role of mangroves."],
  [`In a study, one group of plants was played music for two hours a day, and another group was kept in silence. After a month, the two groups were the same height.\n\nWhich conclusion is best supported by the study?`, "The music had no measurable effect on plant height in this study.", ["Plants dislike music.", "Silence helps plants grow taller.", "Music makes plants grow faster."], "Equal heights show no effect on height."],
  [`The writer begins by describing a crowded bus at dawn, then introduces the driver, Mr Adeyemi, who has driven the same route for thirty years.\n\nWhich choice best describes the overall structure of the text?`, "It sets a scene and then focuses on a particular person.", ["It presents a problem and offers a solution.", "It compares two different cities.", "It argues for a change in transport policy."], "Scene first, then a character."],
  [`Text 1: Some historians argue that the printing press spread new ideas quickly across Europe.\nText 2: Others note that most people could not read in the 1500s, so printed books reached only a small, educated group at first.\n\nBased on the texts, the author of Text 2 would most likely say that Text 1`, "overstates how quickly ideas reached most people", ["is completely wrong about the printing press", "ignores the cost of paper", "agrees with Text 2 in every way"], "Text 2 qualifies how widely ideas spread."],
  [`A student claims that people who exercise regularly sleep better. To support this claim, she cites a survey in which 70% of regular exercisers reported good sleep, compared with 45% of people who rarely exercised.\n\nWhich choice best describes how the survey relates to the student's claim?`, "It shows an association that supports the claim.", ["It proves that exercise causes better sleep.", "It contradicts the claim.", "It is unrelated to the claim."], "A survey can show a link but not prove cause."],
];
const SYNTH: F[] = [
  [`While researching a topic, a student took these notes:\n• The Great Green Wall is an African-led project to restore land across the Sahel.\n• It aims to restore 100 million hectares of degraded land by 2030.\n• It spans countries from Senegal to Djibouti.\n\nThe student wants to emphasise the project's scale. Which choice best does this?`, "Stretching from Senegal to Djibouti, the Great Green Wall aims to restore 100 million hectares of land by 2030.", ["The Great Green Wall is an African-led project.", "Many projects aim to restore land.", "The Sahel is a region in Africa."], "It combines the distance and the area target."],
  [`A student took these notes:\n• Ada Lovelace worked with Charles Babbage on the Analytical Engine.\n• In 1843 she published notes describing an algorithm for the machine.\n• She is often called the first computer programmer.\n\nThe student wants to explain why Lovelace is called the first programmer. Which choice best does this?`, "Because she published an algorithm for Babbage's Analytical Engine in 1843, Lovelace is often called the first programmer.", ["Ada Lovelace worked with Charles Babbage.", "The Analytical Engine was a machine.", "Lovelace published notes in 1843."], "It links the algorithm to the title."],
  [`A student took these notes:\n• Lake Victoria is Africa's largest lake by area.\n• It is shared by Uganda, Kenya and Tanzania.\n• It is a source of the White Nile.\n\nThe student wants to introduce Lake Victoria to readers unfamiliar with it. Which choice best does this?`, "Lake Victoria, Africa's largest lake, is shared by Uganda, Kenya and Tanzania and feeds the White Nile.", ["The White Nile has several sources.", "Uganda borders Kenya.", "Lake Victoria is larger than some other lakes."], "It gives the key identifying facts."],
  [`A student took these notes:\n• Study A: students who took handwritten notes remembered more concepts.\n• Study B: students who typed notes wrote down more words.\n\nThe student wants to contrast the two studies' findings. Which choice best does this?`, "While typing let students record more words, handwriting helped them remember more concepts.", ["Both studies were about note-taking.", "Students take notes in different ways.", "Typing is faster than handwriting."], "'While' sets up the contrast between the findings."],
  [`A student took these notes:\n• Teff is a tiny grain native to Ethiopia.\n• It is used to make injera, a spongy flatbread.\n• Teff is naturally gluten-free.\n\nThe student wants to highlight a health-related feature of teff. Which choice best does this?`, "Teff, the grain used to make injera, is naturally gluten-free.", ["Teff is a tiny grain.", "Injera is a spongy flatbread.", "Teff is native to Ethiopia."], "Gluten-free is the health-related feature."],
  [`A student took these notes:\n• Wangari Maathai founded the Green Belt Movement in Kenya in 1977.\n• The movement planted over 50 million trees.\n• In 2004 she became the first African woman to win the Nobel Peace Prize.\n\nThe student wants to emphasise Maathai's achievement as a Nobel laureate. Which choice best does this?`, "In 2004, Wangari Maathai became the first African woman to win the Nobel Peace Prize.", ["The Green Belt Movement was founded in 1977.", "The movement planted many trees in Kenya.", "Wangari Maathai lived in Kenya."], "It focuses on the Nobel Prize."],
];

function readingWriting(): Q[] {
  return [
    ...AGREEMENT.map(([b, c, d, e]) => mcq(W, SEC, `${b}\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?`, c, d, e, 2)),
    ...PUNCT.map(([b, c, d, e]) => mcq(W, SEC, `${b}\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?`, c, d, e, 2)),
    ...TENSE.map(([b, c, d, e]) => mcq(W, SEC, `${b}\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?`, c, d, e, 1)),
    ...TRANS.map(([b, c, d, e]) => mcq(W, EOI, `${b}\n\nWhich choice completes the text with the most logical transition?`, c, d, e, 2)),
    ...WORDS.map(([b, c, d, e]) => mcq(W, CAS, `${b}\n\nWhich choice completes the text with the most logical and precise word or phrase?`, c, d, e, 2)),
    ...PASSAGES.map(([b, c, d, e]) => mcq(W, IAI, b, c, d, e, 2)),
    ...SYNTH.map(([b, c, d, e]) => mcq(W, EOI, b, c, d, e, 2)),
  ];
}

export function digitalSat(): Record<string, Q[]> {
  return { SMT: math(), SRW: readingWriting() };
}
