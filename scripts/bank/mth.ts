import { fmt, frac, gcd, mcq, numOpts, pick, Q, repeat, ri, sample } from "./lib";

const S = "MTH";
const sup = (n: number) => String(n).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]).join("");

export function maths(): Q[] {
  const qs: Q[] = [];

  // Indices
  qs.push(
    ...repeat(14, () => {
      const a = pick([2, 3, 5]);
      const m = ri(2, 6), n = ri(2, 6), p = ri(2, m + n - 1);
      const e = m + n - p;
      if (a ** e > 3125) return null;
      return mcq(S, "Indices", `Simplify ${a}${sup(m)} × ${a}${sup(n)} ÷ ${a}${sup(p)}`, fmt(a ** e),
        numOpts(a ** e, [a ** (m * n - p), a ** (e + 1), a ** (e - 1), a * e]),
        `Add indices when multiplying, subtract when dividing: ${a}^(${m}+${n}−${p}) = ${a}^${e} = ${a ** e}.`, 1);
    }),
  );

  // Linear equations
  qs.push(
    ...repeat(15, () => {
      const a = ri(2, 9), x = ri(-6, 12), b = ri(-15, 20);
      if (b === 0) return null;
      const c = a * x + b;
      const bs = b > 0 ? `+ ${b}` : `− ${-b}`;
      return mcq(S, "Linear equations", `Solve for x: ${a}x ${bs} = ${c}`, fmt(x),
        numOpts(x, [(c + b) / a, c - b, x + 1, -x], "", true).filter((v) => !v.includes(".")).concat(["0", String(x + 2), String(x - 2)]),
        `${a}x = ${c} ${b > 0 ? "−" : "+"} ${Math.abs(b)} = ${c - b}, so x = ${c - b} ÷ ${a} = ${x}.`, 1);
    }),
  );

  // Simultaneous equations
  qs.push(
    ...repeat(12, () => {
      const x = ri(2, 15), y = ri(1, 12);
      if (x === y) return null;
      const s = x + y, d = x - y;
      const ds = d >= 0 ? `x − y = ${d}` : `y − x = ${-d}`;
      return mcq(S, "Simultaneous equations", `Solve: x + y = ${s} and ${ds}. Find x.`, fmt(x),
        numOpts(x, [y, s, Math.abs(d), x + 1], "", true),
        `Adding/subtracting the equations: 2x = ${s} + ${d} = ${2 * x}, so x = ${x} (and y = ${y}).`, 2);
    }),
  );

  // Quadratic roots
  qs.push(
    ...repeat(15, () => {
      const p = ri(-7, 9), q = ri(-7, 9);
      if (p === q || p === 0 || q === 0 || p === -q) return null;
      const b = -(p + q), c = p * q;
      const bs = b === 0 ? "" : b > 0 ? ` + ${b === 1 ? "" : b}x` : ` − ${b === -1 ? "" : -b}x`;
      const cs = c > 0 ? ` + ${c}` : ` − ${-c}`;
      const [lo, hi] = [Math.min(p, q), Math.max(p, q)];
      const ans = `x = ${lo} or x = ${hi}`;
      return mcq(S, "Quadratic equations", `Solve x²${bs}${cs} = 0`, ans,
        [`x = ${-hi} or x = ${-lo}`, `x = ${lo} or x = ${-hi}`, `x = ${-lo} or x = ${hi}`, `x = ${lo + 1} or x = ${hi + 1}`],
        `Factorise: (x ${p > 0 ? "−" : "+"} ${Math.abs(p)})(x ${q > 0 ? "−" : "+"} ${Math.abs(q)}) = 0, so x = ${p} or x = ${q}.`, 2);
    }),
  );

  // AP nth term
  qs.push(
    ...repeat(14, () => {
      const a = ri(-5, 12), d = ri(2, 7), n = ri(6, 20);
      const t = a + (n - 1) * d;
      return mcq(S, "Sequences", `Find the ${ord(n)} term of the arithmetic progression ${a}, ${a + d}, ${a + 2 * d}, …`, fmt(t),
        numOpts(t, [a + n * d, a + (n - 2) * d, n * d, a * n], "", true),
        `Tₙ = a + (n − 1)d = ${a} + ${n - 1} × ${d} = ${t}.`, 2);
    }),
  );

  // AP sum
  qs.push(
    ...repeat(12, () => {
      const a = ri(1, 9), d = ri(1, 5), n = ri(5, 15);
      const s = (n * (2 * a + (n - 1) * d)) / 2;
      return mcq(S, "Sequences", `Find the sum of the first ${n} terms of the AP ${a}, ${a + d}, ${a + 2 * d}, …`, fmt(s),
        numOpts(s, [n * (a + (n - 1) * d), (n * (2 * a + n * d)) / 2, a + (n - 1) * d, 2 * s]),
        `Sₙ = n/2 [2a + (n − 1)d] = ${n}/2 × [${2 * a} + ${(n - 1) * d}] = ${s}.`, 2);
    }),
  );

  // GP nth term
  qs.push(
    ...repeat(12, () => {
      const a = ri(1, 5), r = pick([2, 3]), n = ri(4, 7);
      const t = a * r ** (n - 1);
      return mcq(S, "Sequences", `Find the ${ord(n)} term of the geometric progression ${a}, ${a * r}, ${a * r * r}, …`, fmt(t),
        numOpts(t, [a * r ** n, a * r ** (n - 2), a * r * n, t + a]),
        `Tₙ = arⁿ⁻¹ = ${a} × ${r}^${n - 1} = ${t}.`, 2);
    }),
  );

  // Number bases
  qs.push(
    ...repeat(12, () => {
      const n = ri(5, 63);
      const b = n.toString(2);
      return mcq(S, "Number bases", `Convert ${b}₂ to base ten.`, fmt(n), numOpts(n, [n + 1, n - 1, parseInt(b.split("").reverse().join(""), 2), n + 2]),
        `Multiply each digit by its power of 2 and add: ${b
          .split("")
          .map((d, i) => `${d}×${2 ** (b.length - 1 - i)}`)
          .join(" + ")} = ${n}.`, 1);
    }),
    ...repeat(10, () => {
      const n = ri(9, 60);
      const b = n.toString(2);
      const near = [n + 1, n - 1, n + 2].map((v) => `${v.toString(2)}₂`);
      return mcq(S, "Number bases", `Express ${n} in base two.`, `${b}₂`, [...near, `${b.split("").reverse().join("")}₂`],
        `Divide repeatedly by 2 and read the remainders upwards: ${n} = ${b}₂.`, 1);
    }),
    ...repeat(10, () => {
      const n = ri(8, 120);
      const b5 = n.toString(5);
      return mcq(S, "Number bases", `Convert ${b5}₅ to base ten.`, fmt(n), numOpts(n, [parseInt(b5, 10), n + 5, n - 5, n + 1]),
        `Use powers of 5: ${b5
          .split("")
          .map((d, i) => `${d}×${5 ** (b5.length - 1 - i)}`)
          .join(" + ")} = ${n}.`, 2);
    }),
  );

  // Percentages
  qs.push(
    ...repeat(12, () => {
      const p = pick([5, 10, 12, 15, 20, 25, 30, 40, 45, 60, 75]), y = ri(2, 40) * 20;
      const v = (p * y) / 100;
      return mcq(S, "Percentages", `Find ${p}% of ₦${y.toLocaleString("en-US")}.`, `₦${fmt(v)}`,
        numOpts(v, [(p * y) / 10, y - v, p + y / 100, (y * 100) / p]).map((x) => `₦${x}`),
        `${p}% of ${y} = ${p}/100 × ${y} = ${fmt(v)}.`, 1);
    }),
    ...repeat(10, () => {
      const a = ri(2, 20) * 50, p = pick([10, 20, 25, 30, 40, 50, 60]);
      const b = a + (a * p) / 100;
      return mcq(S, "Percentages", `The price of a bag of rice rose from ₦${a.toLocaleString("en-US")} to ₦${b.toLocaleString("en-US")}. Find the percentage increase.`, `${p}%`,
        [`${Math.round(((b - a) / b) * 1000) / 10}%`, `${p / 2}%`, `${p + 10}%`, `${100 + p}%`],
        `Increase = ${b - a}. % increase = ${b - a}/${a} × 100 = ${p}%.`, 2);
    }),
  );

  // Simple interest
  qs.push(
    ...repeat(12, () => {
      const P = ri(2, 30) * 1000, R = pick([2, 3, 4, 5, 6, 8, 10, 12, 15]), T = ri(2, 6);
      const I = (P * R * T) / 100;
      return mcq(S, "Simple interest", `Find the simple interest on ₦${P.toLocaleString("en-US")} at ${R}% per annum for ${T} years.`, `₦${fmt(I)}`,
        numOpts(I, [P + I, (P * R) / 100, I / T * (T + 1), (P * R * T) / 10]).map((x) => `₦${x}`),
        `I = PRT/100 = ${P} × ${R} × ${T} / 100 = ₦${fmt(I)}.`, 1);
    }),
  );

  // Ratio sharing
  qs.push(
    ...repeat(12, () => {
      const a = ri(1, 6), b = ri(2, 9);
      if (a === b || gcd(a, b) !== 1) return null;
      const k = ri(2, 30) * 10, total = (a + b) * k;
      const big = Math.max(a, b) * k;
      return mcq(S, "Ratio", `₦${total.toLocaleString("en-US")} is shared between Ada and Bayo in the ratio ${a} : ${b}. How much does the one with the larger share get?`, `₦${fmt(big)}`,
        numOpts(big, [Math.min(a, b) * k, total / 2, (total * Math.max(a, b)) / Math.min(a, b) / 2, big + k]).map((x) => `₦${x}`),
        `Total parts = ${a + b}. One part = ${total}/${a + b} = ${k}. Larger share = ${Math.max(a, b)} × ${k} = ${big}.`, 1);
    }),
  );

  // Statistics
  qs.push(
    ...repeat(15, () => {
      const xs = Array.from({ length: 5 }, () => ri(2, 30));
      const sum = xs.reduce((s, x) => s + x, 0);
      if (sum % 5) return null;
      const m = sum / 5;
      return mcq(S, "Statistics", `Find the mean of ${xs.join(", ")}.`, fmt(m), numOpts(m, [sum, m + 2, m - 2, sorted(xs)[2]]),
        `Mean = sum ÷ number = ${sum} ÷ 5 = ${m}.`, 1);
    }),
    ...repeat(10, () => {
      const xs = Array.from({ length: 7 }, () => ri(1, 40));
      const s = sorted(xs);
      if (new Set(xs).size < 7) return null;
      const med = s[3];
      return mcq(S, "Statistics", `Find the median of ${xs.join(", ")}.`, fmt(med), [String(xs[3]), String(s[2]), String(s[4]), String(Math.round(xs.reduce((a, b) => a + b) / 7))],
        `Arrange in order: ${s.join(", ")}. The middle (4th) value is ${med}.`, 1);
    }),
    ...repeat(8, () => {
      const xs = Array.from({ length: 8 }, () => ri(1, 30));
      const s = sorted(xs);
      const range = s[7] - s[0];
      if (range < 5) return null;
      return mcq(S, "Statistics", `Find the range of ${xs.join(", ")}.`, fmt(range), numOpts(range, [s[7], s[0], s[7] + s[0], range + 1]),
        `Range = highest − lowest = ${s[7]} − ${s[0]} = ${range}.`, 1);
    }),
    ...repeat(8, () => {
      const mode = ri(2, 20);
      const rest = sample([...Array(25).keys()].map((x) => x + 1).filter((x) => x !== mode), 5);
      const xs = sample([mode, mode, mode, rest[0], rest[0], rest[1], rest[2], rest[3]], 8);
      return mcq(S, "Statistics", `Find the mode of ${xs.join(", ")}.`, fmt(mode), [String(rest[0]), String(rest[1]), String(rest[2])],
        `The mode is the value that occurs most often: ${mode} appears 3 times.`, 1);
    }),
  );

  // Probability
  qs.push(
    ...repeat(12, () => {
      const r = ri(2, 9), b = ri(2, 9), g = ri(1, 6);
      const t = r + b + g;
      const col = pick(["red", "blue", "green"] as const);
      const k = col === "red" ? r : col === "blue" ? b : g;
      return mcq(S, "Probability", `A bag contains ${r} red, ${b} blue and ${g} green balls. One ball is picked at random. Find the probability that it is ${col}.`, frac(k, t),
        [frac(k, t - k), frac(t - k, t), frac(1, 3), frac(k, t + 1), frac(k + 1, t)],
        `P(${col}) = number of ${col} ÷ total = ${k}/${t}${frac(k, t) !== `${k}/${t}` ? ` = ${frac(k, t)}` : ""}.`, 1);
    }),
    ...[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((k) => {
      const ways = 6 - Math.abs(7 - k);
      return mcq(S, "Probability", `Two fair dice are thrown. What is the probability that the sum of the scores is ${k}?`, frac(ways, 36),
        [frac(1, 6), frac(1, 12), frac(ways + 1, 36), frac(1, 11), frac(5, 36), frac(1, 36)],
        `There are 36 equally likely outcomes; ${ways} give a sum of ${k}. P = ${ways}/36${frac(ways, 36) !== `${ways}/36` ? ` = ${frac(ways, 36)}` : ""}.`, 2);
    }),
  );

  // Mensuration
  qs.push(
    ...repeat(8, () => {
      const r = pick([7, 14, 21, 3.5, 28]);
      const area = (22 / 7) * r * r;
      return mcq(S, "Mensuration", `Find the area of a circle of radius ${r} cm. (Take π = 22/7)`, fmt(area, "cm²"),
        numOpts(area, [(44 / 7) * r, (22 / 7) * r, area * 2, area / 2], "cm²"), `Area = πr² = 22/7 × ${r} × ${r} = ${fmt(area)} cm².`, 1);
    }),
    ...repeat(7, () => {
      const r = pick([7, 14, 21, 3.5, 35]);
      const c = (44 / 7) * r;
      return mcq(S, "Mensuration", `Find the circumference of a circle of radius ${r} cm. (Take π = 22/7)`, fmt(c, "cm"),
        numOpts(c, [(22 / 7) * r, (22 / 7) * r * r, c * 2, c + r], "cm"), `C = 2πr = 2 × 22/7 × ${r} = ${fmt(c)} cm.`, 1);
    }),
    ...repeat(8, () => {
      const b = ri(4, 20), h = ri(3, 18);
      const a = (b * h) / 2;
      return mcq(S, "Mensuration", `Find the area of a triangle with base ${b} cm and height ${h} cm.`, fmt(a, "cm²"),
        numOpts(a, [b * h, b + h, a + b], "cm²"), `Area = ½ × base × height = ½ × ${b} × ${h} = ${fmt(a)} cm².`, 1);
    }),
    ...repeat(8, () => {
      const l = ri(3, 15), w = ri(2, 10), h = ri(2, 10);
      const v = l * w * h;
      return mcq(S, "Mensuration", `Find the volume of a cuboid ${l} cm long, ${w} cm wide and ${h} cm high.`, fmt(v, "cm³"),
        numOpts(v, [2 * (l * w + w * h + l * h), l + w + h, l * w, v * 2], "cm³"), `V = l × b × h = ${l} × ${w} × ${h} = ${v} cm³.`, 1);
    }),
    ...repeat(8, () => {
      const r = pick([7, 14, 3.5]), h = ri(2, 12);
      const v = (22 / 7) * r * r * h;
      return mcq(S, "Mensuration", `Find the volume of a cylinder of radius ${r} cm and height ${h} cm. (Take π = 22/7)`, fmt(v, "cm³"),
        numOpts(v, [(22 / 7) * r * h, 2 * (22 / 7) * r * h, (v * 2) / 3, v / 3], "cm³"), `V = πr²h = 22/7 × ${r}² × ${h} = ${fmt(v)} cm³.`, 2);
    }),
  );

  // Polygons
  qs.push(
    ...[5, 6, 7, 8, 9, 10, 12, 15, 18, 20].map((n) =>
      mcq(S, "Polygons", `Find the sum of the interior angles of a polygon with ${n} sides.`, `${(n - 2) * 180}°`,
        [`${n * 180}°`, `${(n - 1) * 180}°`, `${(n - 3) * 180}°`, `${n * 90}°`],
        `Sum of interior angles = (n − 2) × 180° = ${n - 2} × 180° = ${(n - 2) * 180}°.`, 1),
    ),
    ...[5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 36].map((n) => {
      const ext = 360 / n;
      return mcq(S, "Polygons", `Each exterior angle of a regular polygon is ${fmt(ext)}°. How many sides does it have?`, fmt(n),
        numOpts(n, [n + 1, n - 1, n * 2, 180 / ext]), `Number of sides = 360° ÷ exterior angle = 360 ÷ ${fmt(ext)} = ${n}.`, 2);
    }),
    ...[5, 6, 8, 9, 10, 12, 18, 20].map((n) => {
      const int = 180 - 360 / n;
      return mcq(S, "Polygons", `Find each interior angle of a regular polygon with ${n} sides.`, `${fmt(int)}°`,
        [`${fmt(360 / n)}°`, `${(n - 2) * 180}°`, `${fmt(int + 10)}°`, `${fmt(int - 15)}°`],
        `Exterior angle = 360/${n} = ${fmt(360 / n)}°, so interior = 180° − ${fmt(360 / n)}° = ${fmt(int)}°.`, 2);
    }),
  );

  // Pythagoras
  qs.push(
    ...repeat(12, () => {
      const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
      const k = ri(1, 4);
      return mcq(S, "Pythagoras", `The two shorter sides of a right-angled triangle are ${a * k} cm and ${b * k} cm. Find the hypotenuse.`, fmt(c * k, "cm"),
        numOpts(c * k, [(a + b) * k, (b - a) * k, c * k + 1, Math.round(((a + b) * k) / 1.5)], "cm"),
        `c² = ${a * k}² + ${b * k}² = ${(a * k) ** 2 + (b * k) ** 2}, so c = ${c * k} cm.`, 1);
    }),
  );

  // Logarithms
  qs.push(
    ...repeat(14, () => {
      const base = pick([2, 3, 5, 10]), k = ri(2, base === 10 ? 5 : base === 2 ? 7 : 4);
      return mcq(S, "Logarithms", `Evaluate log${sub(base)} ${(base ** k).toLocaleString("en-US")}.`, fmt(k),
        numOpts(k, [base ** k / base, k + 1, k - 1, base * k]), `${base}^${k} = ${base ** k}, so log${sub(base)} ${base ** k} = ${k}.`, 1);
    }),
  );

  // Sets
  qs.push(
    ...repeat(12, () => {
      const both = ri(3, 15), a = both + ri(5, 25), b = both + ri(5, 25);
      const union = a + b - both;
      return mcq(S, "Sets", `In a class, ${a} students study Physics, ${b} study Chemistry and ${both} study both. How many study at least one of the two subjects?`, fmt(union),
        numOpts(union, [a + b, a + b - 2 * both, union + both, a + b + both]), `n(P ∪ C) = n(P) + n(C) − n(P ∩ C) = ${a} + ${b} − ${both} = ${union}.`, 2);
    }),
  );

  // Variation
  qs.push(
    ...repeat(10, () => {
      const k = ri(2, 9), x1 = ri(2, 8), x2 = ri(3, 12);
      if (x1 === x2) return null;
      return mcq(S, "Variation", `y varies directly as x. If y = ${k * x1} when x = ${x1}, find y when x = ${x2}.`, fmt(k * x2),
        numOpts(k * x2, [k * x1 + x2, (k * x1 * x1) / x2, k * x2 + k, x2 * x1]), `y = kx; k = ${k * x1}/${x1} = ${k}. When x = ${x2}, y = ${k} × ${x2} = ${k * x2}.`, 2);
    }),
    ...repeat(8, () => {
      const x1 = ri(2, 6), y1 = ri(2, 12), K = x1 * y1;
      const x2 = pick([2, 3, 4, 6, 8, 12].filter((v) => v !== x1 && K % v === 0));
      if (!x2) return null;
      return mcq(S, "Variation", `y varies inversely as x. If y = ${y1} when x = ${x1}, find y when x = ${x2}.`, fmt(K / x2),
        numOpts(K / x2, [(y1 * x2) / x1, K, K * x2, y1 + x2 - x1]), `y = k/x; k = ${y1} × ${x1} = ${K}. When x = ${x2}, y = ${K}/${x2} = ${fmt(K / x2)}.`, 2);
    }),
  );

  // Fractions
  qs.push(
    ...repeat(12, () => {
      const b = ri(2, 9), d = ri(2, 9), a = ri(1, b - 1), c = ri(1, d - 1);
      if (b === d) return null;
      const ans = frac(a * d + c * b, b * d);
      return mcq(S, "Fractions", `Simplify ${a}/${b} + ${c}/${d}`, ans, [frac(a + c, b + d), frac(a * c, b * d), frac(a * d + c * b, b + d), frac(a * d + c * b + 1, b * d)],
        `LCM method: (${a}×${d} + ${c}×${b})/(${b}×${d}) = ${a * d + c * b}/${b * d} = ${ans}.`, 1);
    }),
  );

  // Standard form
  qs.push(
    ...repeat(8, () => {
      const m = ri(11, 99) / 10, e = ri(3, 7);
      const n = Math.round(m * 10 ** e);
      return mcq(S, "Standard form", `Express ${n.toLocaleString("en-US")} in standard form.`, `${m} × 10${sup(e)}`,
        [`${m} × 10${sup(e - 1)}`, `${m} × 10${sup(e + 1)}`, `${Math.round(m * 10)} × 10${sup(e)}`, `${m / 10} × 10${sup(e)}`],
        `Move the decimal point ${e} places: ${n} = ${m} × 10^${e}.`, 1);
    }),
  );

  // Speed / distance / time
  qs.push(
    ...repeat(10, () => {
      const v = ri(4, 12) * 10, t = pick([0.5, 1.5, 2, 2.5, 3, 4]);
      const d = v * t;
      return mcq(S, "Speed, distance and time", `A bus travels ${d} km in ${t} hours. Find its average speed.`, fmt(v, "km/h"),
        numOpts(v, [d * t, d / (t + 1), v + 10, v - 10], "km/h"), `Speed = distance ÷ time = ${d} ÷ ${t} = ${v} km/h.`, 1);
    }),
  );

  // Expansion
  qs.push(
    ...repeat(8, () => {
      const a = ri(-6, 9), b = ri(-6, 9);
      if (!a || !b || a + b === 0) return null;
      const s = (n: number) => (n > 0 ? `+ ${n}` : `− ${-n}`);
      return mcq(S, "Algebra", `Expand (x ${s(a)})(x ${s(b)}). What is the coefficient of x?`, fmt(a + b),
        numOpts(a + b, [a * b, a - b, b - a, a + b + 1], "", true), `(x ${s(a)})(x ${s(b)}) = x² + (${a} + ${b})x + ${a * b}. Coefficient of x = ${a + b}.`, 1);
    }),
  );

  // Square roots
  qs.push(
    ...[144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625].map((n) => {
      const r = Math.sqrt(n);
      return mcq(S, "Square roots", `Find √${n}.`, fmt(r), numOpts(r, [r + 1, r - 1, n / 2, r + 2]), `${r} × ${r} = ${n}, so √${n} = ${r}.`, 1);
    }),
  );

  return qs;
}

function sorted(xs: number[]) {
  return [...xs].sort((a, b) => a - b);
}
function ord(n: number) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function sub(n: number) {
  return String(n).split("").map((d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]).join("");
}
