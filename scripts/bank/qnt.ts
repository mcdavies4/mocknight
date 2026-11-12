// Quantitative aptitude (QNT) — SSC CGL/CHSL, banking and railway style. All answers computed.
import { fmt, gcd, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

const S = "QNT";
const r = (x: number) => `₹${fmt(x)}`;
const rOpts = (c: number, p: number[]) => numOpts(c, p).map((v) => `₹${v}`);
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

export function quant(): Q[] {
  const qs: Q[] = [];

  // Percentages
  qs.push(...repeat(12, () => {
    const p = pick([5, 10, 12, 15, 20, 25, 30, 40, 45, 60, 75]), n = ri(2, 40) * 20;
    const a = (p * n) / 100;
    return mcq(S, "Percentages", `What is ${p}% of ${n}?`, fmt(a), numOpts(a, [a * 10, a / 2, n - a, a + p]), `${p}% of ${n} = ${p}/100 × ${n} = ${fmt(a)}.`, 1);
  }));
  const MORE: [number, number][] = [[25, 20], [50, 100 / 3], [100, 50], [20, 100 / 6], [60, 37.5], [10, 100 / 11]];
  qs.push(...MORE.map(([p, ans]) => mcq(S, "Percentages", `A's salary is ${p}% more than B's. By what percentage is B's salary less than A's?`, `${fmt(Math.round(ans * 100) / 100)}%`,
    [`${p}%`, `${fmt(Math.round((p / (100 - Math.min(p, 50))) * 10000) / 100)}%`, `${fmt(p / 2)}%`, `${fmt(Math.round((ans + 5) * 100) / 100)}%`], `Less by p/(100 + p) × 100 = ${p}/${100 + p} × 100 ≈ ${fmt(Math.round(ans * 100) / 100)}%.`, 3)));
  qs.push(...repeat(8, () => {
    const p = pick([10, 20, 25, 50]), q = pick([10, 20, 25]);
    const net = Math.round(((1 + p / 100) * (1 - q / 100) - 1) * 10000) / 100;
    if (net === 0) return null;
    return mcq(S, "Percentages", `The price of an item rises by ${p}% and then falls by ${q}%. What is the overall change?`, `${net > 0 ? "Increase" : "Decrease"} of ${fmt(Math.abs(net))}%`,
      [`${p - q >= 0 ? "Increase" : "Decrease"} of ${fmt(Math.abs(p - q))}%`, `${net > 0 ? "Decrease" : "Increase"} of ${fmt(Math.abs(net))}%`, "No change", `Increase of ${fmt(p + q)}%`], `Net = ${p} − ${q} − (${p}×${q})/100 = ${fmt(net)}%.`, 3);
  }));

  // Profit, loss, discount
  qs.push(...repeat(12, () => {
    const cp = ri(4, 40) * 25, pct = pick([5, 10, 12, 15, 20, 25, 30, 40]), loss = Math.random() < 0.3;
    const sp = cp * (1 + (loss ? -pct : pct) / 100);
    return mcq(S, "Profit & loss", `An article bought for ${r(cp)} is sold for ${r(sp)}. Find the ${loss ? "loss" : "profit"} percentage.`, `${pct}%`, [`${pct + 5}%`, `${Math.max(1, pct - 5)}%`, `${fmt(Math.round((Math.abs(sp - cp) / sp) * 10000) / 100)}%`, `${pct * 2}%`],
      `${loss ? "Loss" : "Profit"} = ${r(Math.abs(sp - cp))}; ÷ CP ${r(cp)} × 100 = ${pct}%.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const mp = ri(4, 50) * 100, d = pick([5, 10, 15, 20, 25, 30, 40]);
    const sp = mp * (1 - d / 100);
    return mcq(S, "Profit & loss", `The marked price of a phone is ${r(mp)}. A discount of ${d}% is given. Find the selling price.`, r(sp), rOpts(sp, [mp * d / 100, mp + mp * d / 100, sp - 100]), `SP = ${r(mp)} × (100 − ${d})/100 = ${r(sp)}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const a = pick([10, 20, 25, 30]), b = pick([10, 20, 25]);
    const eq = a + b - (a * b) / 100;
    return mcq(S, "Profit & loss", `Two successive discounts of ${a}% and ${b}% are equivalent to a single discount of`, `${fmt(eq)}%`, numOpts(eq, [a + b, a + b - 5, eq + 2]).map((v) => `${v}%`), `Single discount = ${a} + ${b} − (${a}×${b})/100 = ${fmt(eq)}%.`, 2);
  }));

  // Interest
  qs.push(...repeat(12, () => {
    const p = ri(2, 40) * 500, rt = pick([4, 5, 6, 8, 10, 12]), t = ri(2, 6);
    const si = (p * rt * t) / 100;
    return mcq(S, "Simple & compound interest", `Find the simple interest on ${r(p)} at ${rt}% per annum for ${t} years.`, r(si), rOpts(si, [si / t, p + si, (p * rt) / 100 * (t + 1)]), `SI = PRT/100 = ${p} × ${rt} × ${t} / 100 = ${r(si)}.`, 1);
  }));
  qs.push(...repeat(10, () => {
    const p = pick([1000, 2000, 4000, 5000, 8000, 10000, 20000]), rt = pick([5, 10, 20]);
    const ci = Math.round(p * ((1 + rt / 100) ** 2 - 1) * 100) / 100;
    return mcq(S, "Simple & compound interest", `Find the compound interest on ${r(p)} at ${rt}% per annum for 2 years, compounded annually.`, r(ci), rOpts(ci, [(p * rt * 2) / 100, p + ci, ci + (p * rt) / 100]),
      `Amount = ${p} × (1 + ${rt}/100)² = ${fmt(p + ci)}; CI = ${r(ci)}.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const p = pick([1000, 2500, 4000, 5000, 10000, 12000]), rt = pick([4, 5, 10, 20]);
    const d = (p * rt * rt) / 10000;
    return mcq(S, "Simple & compound interest", `The difference between compound and simple interest on ${r(p)} for 2 years at ${rt}% per annum is`, r(d), rOpts(d, [(p * rt) / 100, d * 2, d / 2]), `Difference = P(R/100)² = ${p} × (${rt}/100)² = ${r(d)}.`, 3);
  }));

  // Ratio, average, ages
  qs.push(...repeat(10, () => {
    const a = ri(1, 7), b = ri(1, 7);
    if (a === b || gcd(a, b) !== 1) return null;
    const total = (a + b) * ri(10, 200);
    const sa = (total * a) / (a + b);
    return mcq(S, "Ratio & proportion", `Divide ${r(total)} between A and B in the ratio ${a} : ${b}. What is A's share?`, r(sa), rOpts(sa, [total - sa, total / 2, total / a]), `A = ${a}/${a + b} × ${total} = ${r(sa)}.`, 1);
  }));
  qs.push(...repeat(10, () => {
    const n = ri(4, 7);
    const xs = [...Array(n)].map(() => ri(10, 90));
    const sum = xs.reduce((s, x) => s + x, 0);
    if (sum % n) return null;
    return mcq(S, "Averages", `Find the average of ${xs.join(", ")}.`, fmt(sum / n), numOpts(sum / n, [sum / (n - 1), sum / n + 2, sum / n - 3]), `Sum = ${sum}; ${sum} ÷ ${n} = ${fmt(sum / n)}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const n = ri(10, 40), avg = ri(20, 60), newX = avg + n + ri(1, 20) ;
    const newAvg = (n * avg + newX) / (n + 1);
    if (!Number.isInteger(newAvg * 10)) return null;
    return mcq(S, "Averages", `The average age of ${n} students is ${avg}. When the teacher's age is included, the average rises by 1. What is the teacher's age?`, String(avg + n + 1), numOpts(avg + n + 1, [avg + 1, avg + n, avg + n + 2]),
      `New total = ${n + 1} × ${avg + 1} = ${(n + 1) * (avg + 1)}; old total = ${n * avg}; teacher = ${avg + n + 1}.`, 3);
  }));
  qs.push(...repeat(8, () => {
    const son = ri(5, 20), k = pick([2, 3, 4]), sum = son * (k + 1);
    return mcq(S, "Ages", `The sum of the ages of a father and son is ${sum} years. The father is ${k} times as old as the son. How old is the son?`, `${son} years`, numOpts(son, [sum / k, son * k, son + 2]).map((v) => `${v} years`), `Son = x, father = ${k}x; ${k + 1}x = ${sum} → x = ${son}.`, 2);
  }));

  // Time & work, speed
  const WORK: [number, number][] = [[10, 15], [12, 24], [20, 30], [6, 12], [15, 30], [10, 40], [12, 36], [18, 36], [20, 60], [30, 60], [8, 24], [24, 40]];
  qs.push(...WORK.map(([a, b]) => { const t = (a * b) / (a + b); return mcq(S, "Time & work", `A can finish a job in ${a} days and B in ${b} days. Working together, how many days will they take?`, `${fmt(t)} days`, numOpts(t, [(a + b) / 2, a + b, b - a], "days"), `Together = ab/(a + b) = ${a * b}/${a + b} = ${fmt(t)} days.`, 2); }));
  qs.push(...repeat(10, () => {
    const v = pick([18, 36, 54, 72, 90, 108]);
    return mcq(S, "Speed, time & distance", `Convert ${v} km/h to metres per second.`, `${v * 5 / 18} m/s`, numOpts(v * 5 / 18, [v * 18 / 5, v / 3.6 + 5, v / 10], "m/s"), `Multiply by 5/18: ${v} × 5/18 = ${v * 5 / 18} m/s.`, 1);
  }));
  qs.push(...repeat(12, () => {
    const v = pick([36, 54, 72, 90, 108]), t = ri(6, 20);
    const len = (v * 5 / 18) * t;
    return mcq(S, "Speed, time & distance", `A train ${len} m long passes a pole in ${t} seconds. What is its speed in km/h?`, `${v} km/h`, numOpts(v, [len / t, v + 18, v - 18], "km/h"), `Speed = ${len}/${t} = ${len / t} m/s = ${len / t} × 18/5 = ${v} km/h.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const v = pick([36, 54, 72]), tl = ri(1, 4) * 100, pl = ri(1, 4) * 100;
    const t = (tl + pl) / (v * 5 / 18);
    if (!Number.isInteger(t)) return null;
    return mcq(S, "Speed, time & distance", `A ${tl} m train runs at ${v} km/h. How long does it take to cross a ${pl} m platform?`, `${t} s`, numOpts(t, [tl / (v * 5 / 18), pl / (v * 5 / 18), t + 5], "s"), `Distance = ${tl} + ${pl} = ${tl + pl} m; speed = ${v * 5 / 18} m/s; time = ${t} s.`, 2);
  }));
  const RT: [number, number][] = [[40, 60], [30, 60], [20, 30], [60, 90], [45, 90], [12, 24], [40, 120], [30, 70]];
  qs.push(...RT.map(([x, y]) => { const a = (2 * x * y) / (x + y); return mcq(S, "Speed, time & distance", `A car goes to a town at ${x} km/h and returns at ${y} km/h. What is the average speed for the whole journey?`, `${fmt(a)} km/h`, numOpts(a, [(x + y) / 2, a + 5, y - x], "km/h"), `Average speed = 2xy/(x + y) = ${2 * x * y}/${x + y} = ${fmt(a)} km/h.`, 3); }));

  // Number system
  qs.push(...repeat(12, () => {
    const g = ri(2, 15), a = g * ri(2, 9), b = g * ri(2, 9);
    if (a === b) return null;
    const h = gcd(a, b), l = lcm(a, b);
    return Math.random() < 0.5
      ? mcq(S, "Number system", `Find the HCF of ${a} and ${b}.`, String(h), numOpts(h, [l, h * 2, Math.min(a, b)]), `Largest number dividing both: ${h}.`, 1)
      : mcq(S, "Number system", `Find the LCM of ${a} and ${b}.`, String(l), numOpts(l, [a * b, h, l * 2]), `LCM = ${a} × ${b} ÷ HCF(${h}) = ${l}.`, 1);
  }));
  qs.push(...repeat(10, () => {
    const b = ri(2, 9), n = ri(10, 99);
    let u = 1;
    for (let i = 0; i < n; i++) u = (u * b) % 10;
    return mcq(S, "Number system", `What is the unit digit of ${b}^${n}?`, String(u), numOpts(u, [b, (u + 2) % 10, (u + 4) % 10, (b * n) % 10]), `Unit digits of powers of ${b} repeat in a cycle; ${b}^${n} ends in ${u}.`, 3);
  }));
  qs.push(...repeat(8, () => {
    const d = pick([7, 9, 11, 13]), n = ri(100, 999);
    return mcq(S, "Number system", `What is the remainder when ${n} is divided by ${d}?`, String(n % d), numOpts(n % d, [(n + 1) % d, d - (n % d), Math.floor(n / d) % d]), `${n} = ${d} × ${Math.floor(n / d)} + ${n % d}.`, 1);
  }));

  // Mensuration (π = 22/7)
  qs.push(...repeat(10, () => {
    const rad = 7 * ri(1, 5);
    const a = (22 / 7) * rad * rad;
    return mcq(S, "Mensuration", `Find the area of a circle of radius ${rad} cm (π = 22/7).`, `${fmt(a)} cm²`, numOpts(a, [2 * (22 / 7) * rad, a / 2, a * 2], "cm²"), `Area = πr² = 22/7 × ${rad}² = ${fmt(a)} cm².`, 1);
  }));
  qs.push(...repeat(8, () => {
    const rad = 7 * ri(1, 3), h = ri(2, 20);
    const v = (22 / 7) * rad * rad * h;
    return mcq(S, "Mensuration", `Find the volume of a cylinder with radius ${rad} cm and height ${h} cm (π = 22/7).`, `${fmt(v)} cm³`, numOpts(v, [2 * (22 / 7) * rad * h, v / 3, v * 2], "cm³"), `V = πr²h = 22/7 × ${rad}² × ${h} = ${fmt(v)} cm³.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const a = ri(2, 15);
    return mcq(S, "Mensuration", `The total surface area of a cube is ${6 * a * a} cm². Find its volume.`, `${a ** 3} cm³`, numOpts(a ** 3, [6 * a * a, a * a, a ** 3 + a], "cm³"), `6a² = ${6 * a * a} → a = ${a}; V = a³ = ${a ** 3} cm³.`, 2);
  }));

  // Algebra & trigonometry
  qs.push(...repeat(8, () => {
    const a = ri(3, 12);
    return mcq(S, "Algebra", `If x + 1/x = ${a}, find x² + 1/x².`, String(a * a - 2), numOpts(a * a - 2, [a * a, a * a + 2, 2 * a]), `(x + 1/x)² = x² + 2 + 1/x², so x² + 1/x² = ${a}² − 2 = ${a * a - 2}.`, 2);
  }));
  const TRIG: [string, string, string[]][] = [
    ["sin 30°", "1/2", ["√3/2", "1/√2", "1"]], ["cos 60°", "1/2", ["√3/2", "0", "1"]], ["tan 45°", "1", ["0", "√3", "1/√3"]],
    ["sin 90°", "1", ["0", "1/2", "√3/2"]], ["cos 0°", "1", ["0", "1/2", "−1"]], ["tan 60°", "√3", ["1/√3", "1", "√3/2"]],
    ["sin²θ + cos²θ", "1", ["0", "2", "tan θ"]], ["sec²θ − tan²θ", "1", ["0", "2", "sin²θ"]],
  ];
  qs.push(...TRIG.map(([e, a, d]) => mcq(S, "Trigonometry", `What is the value of ${e}?`, a, d, `${e} = ${a}.`, 1)));
  return qs;
}
