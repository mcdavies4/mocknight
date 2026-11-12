import { fmt, mcq, numOpts, others, pick, Q, repeat, ri } from "./lib";

const S = "PHY";

export function physics(): Q[] {
  const qs: Q[] = [];
  const n = (v: number, p: number[], u: string) => numOpts(v, p, u);

  // Kinematics
  qs.push(
    ...repeat(14, () => {
      const u = pick([0, 0, 2, 4, 5, 10]), a = ri(1, 6), t = ri(2, 10);
      const v = u + a * t;
      const start = u === 0 ? "from rest" : `from ${u} m/s`;
      return mcq(S, "Motion", `A car accelerates uniformly ${start} to ${v} m/s in ${t} s. Find its acceleration.`, fmt(a, "m/s²"),
        n(a, [v / t + (u ? 1 : 2), v * t, (v + u) / t, t / v], "m/s²"), `a = (v − u)/t = (${v} − ${u})/${t} = ${a} m/s².`, 1);
    }),
    ...repeat(12, () => {
      const u = ri(0, 10), a = ri(1, 5), t = ri(2, 8);
      const v = u + a * t;
      return mcq(S, "Motion", `A body with initial velocity ${u} m/s accelerates at ${a} m/s² for ${t} s. Find its final velocity.`, fmt(v, "m/s"),
        n(v, [u * a * t, a * t, u + a + t, v + a], "m/s"), `v = u + at = ${u} + ${a} × ${t} = ${v} m/s.`, 1);
    }),
    ...repeat(12, () => {
      const u = pick([0, 2, 4, 5]), a = pick([2, 4, 6]), t = ri(2, 6);
      const s = u * t + 0.5 * a * t * t;
      return mcq(S, "Motion", `A body starts with velocity ${u} m/s and accelerates uniformly at ${a} m/s² for ${t} s. Find the distance covered.`, fmt(s, "m"),
        n(s, [u * t + a * t * t, u * t + a * t, 0.5 * a * t, s * 2], "m"), `s = ut + ½at² = ${u}×${t} + ½×${a}×${t}² = ${fmt(s)} m.`, 2);
    }),
  );

  // Force, weight
  qs.push(
    ...repeat(14, () => {
      const m = ri(2, 50), a = ri(2, 12);
      return mcq(S, "Newton's laws", `Find the force needed to give a ${m} kg mass an acceleration of ${a} m/s².`, fmt(m * a, "N"),
        n(m * a, [m / a, m + a, m * a * 10, m * a / 2], "N"), `F = ma = ${m} × ${a} = ${m * a} N.`, 1);
    }),
    ...repeat(10, () => {
      const m = ri(2, 120);
      return mcq(S, "Newton's laws", `Find the weight of a ${m} kg body. (g = 10 m/s²)`, fmt(m * 10, "N"),
        n(m * 10, [m, m / 10, m * 9.8, m * 100], "N"), `W = mg = ${m} × 10 = ${m * 10} N.`, 1);
    }),
    ...repeat(10, () => {
      const m = ri(2, 80), v = ri(2, 30);
      return mcq(S, "Momentum", `Find the momentum of a ${m} kg body moving at ${v} m/s.`, fmt(m * v, "kg m/s"),
        n(m * v, [m + v, (m * v * v) / 2, m * v * 2, m / v], "kg m/s"), `p = mv = ${m} × ${v} = ${m * v} kg m/s.`, 1);
    }),
  );

  // Energy, work, power
  qs.push(
    ...repeat(14, () => {
      const m = ri(1, 20) * 2, v = ri(2, 15);
      const ke = 0.5 * m * v * v;
      return mcq(S, "Energy", `Find the kinetic energy of a ${m} kg body moving at ${v} m/s.`, fmt(ke, "J"),
        n(ke, [m * v * v, m * v, 0.5 * m * v, ke / 2], "J"), `KE = ½mv² = ½ × ${m} × ${v}² = ${fmt(ke)} J.`, 1);
    }),
    ...repeat(14, () => {
      const m = ri(2, 60), h = ri(2, 40);
      const pe = m * 10 * h;
      return mcq(S, "Energy", `Find the potential energy of a ${m} kg object raised ${h} m above the ground. (g = 10 m/s²)`, fmt(pe, "J"),
        n(pe, [m * h, m * 10 + h, pe / 2, pe * 10], "J"), `PE = mgh = ${m} × 10 × ${h} = ${pe} J.`, 1);
    }),
    ...repeat(10, () => {
      const f = ri(5, 80), d = ri(2, 25);
      return mcq(S, "Energy", `A force of ${f} N moves a load through ${d} m in the direction of the force. Find the work done.`, fmt(f * d, "J"),
        n(f * d, [f + d, f / d, f * d * 2, (f * d) / 10], "J"), `W = F × d = ${f} × ${d} = ${f * d} J.`, 1);
    }),
    ...repeat(12, () => {
      const P = ri(2, 50) * 5, mins = pick([1, 2, 3, 4, 5]);
      const W = P * mins * 60;
      return mcq(S, "Power", `A machine does ${W.toLocaleString("en-US")} J of work in ${mins} minute${mins > 1 ? "s" : ""}. Find its power.`, fmt(P, "W"),
        n(P, [W / mins, P * 60, W / 60, P * 2], "W"), `P = W/t = ${W} ÷ ${mins * 60} s = ${P} W. Convert minutes to seconds first.`, 2);
    }),
    ...repeat(8, () => {
      const inp = ri(4, 20) * 100, eff = pick([40, 50, 60, 75, 80, 90]);
      const out = (inp * eff) / 100;
      return mcq(S, "Machines", `A machine uses ${inp} J of energy and does ${out} J of useful work. Find its efficiency.`, `${eff}%`,
        [`${100 - eff}%`, `${Math.round((inp / out) * 100)}%`, `${eff + 10}%`, `${eff / 2}%`], `Efficiency = output/input × 100% = ${out}/${inp} × 100% = ${eff}%.`, 1);
    }),
    ...repeat(8, () => {
      const f = ri(5, 60), d = ri(2, 15) / 10;
      return mcq(S, "Moments", `A force of ${f} N acts at a perpendicular distance of ${d} m from a pivot. Find its moment.`, fmt(f * d, "N m"),
        n(f * d, [f / d, f + d, f * d * 10, f * d * 2], "N m"), `Moment = F × d = ${f} × ${d} = ${fmt(f * d)} N m.`, 1);
    }),
    ...repeat(10, () => {
      const k = ri(2, 20) * 10, e = ri(1, 10) / 100;
      const F = k * e;
      return mcq(S, "Elasticity", `A spring of force constant ${k} N/m is stretched by ${e * 100} cm. Find the force applied. (Assume Hooke's law)`, fmt(F, "N"),
        n(F, [k * e * 100, k / e, F * 2, k + e], "N"), `F = ke = ${k} × ${e} m = ${fmt(F)} N. Convert cm to m.`, 2);
    }),
  );

  // Density and pressure
  qs.push(
    ...repeat(12, () => {
      const rho = pick([500, 800, 1000, 2500, 2700, 7800, 8900, 11300]), V = pick([0.002, 0.005, 0.01, 0.02, 0.5]);
      const m = rho * V;
      return mcq(S, "Density", `A block of volume ${V} m³ has a mass of ${fmt(m)} kg. Find its density.`, fmt(rho, "kg/m³"),
        n(rho, [m * V, V / m, rho / 10, rho * 10], "kg/m³"), `ρ = m/V = ${fmt(m)} ÷ ${V} = ${rho} kg/m³.`, 1);
    }),
    ...repeat(10, () => {
      const F = ri(2, 50) * 10, A = pick([0.1, 0.2, 0.25, 0.5, 2, 4, 5]);
      return mcq(S, "Pressure", `A force of ${F} N acts on an area of ${A} m². Find the pressure.`, fmt(F / A, "Pa"),
        n(F / A, [F * A, A / F, F / A / 10, F], "Pa"), `P = F/A = ${F} ÷ ${A} = ${fmt(F / A)} Pa.`, 1);
    }),
    ...repeat(8, () => {
      const h = ri(2, 30);
      const p = h * 1000 * 10;
      return mcq(S, "Pressure", `Find the pressure due to water at a depth of ${h} m. (Density of water = 1000 kg/m³, g = 10 m/s²)`, fmt(p, "Pa"),
        n(p, [h * 1000, h * 10, p * 10, p / 2], "Pa"), `P = hρg = ${h} × 1000 × 10 = ${p.toLocaleString("en-US")} Pa.`, 2);
    }),
  );

  // Electricity
  qs.push(
    ...repeat(8, () => {
      const I = ri(1, 10), R = ri(2, 24);
      return mcq(S, "Current electricity", `A current of ${I} A flows through a ${R} Ω resistor. Find the p.d. across it.`, fmt(I * R, "V"),
        n(I * R, [R / I, I + R, I * R * 2, (I * R) / 2], "V"), `V = IR = ${I} × ${R} = ${I * R} V.`, 1);
    }),
    ...repeat(8, () => {
      const I = ri(1, 8), R = ri(2, 30), V = I * R;
      return mcq(S, "Current electricity", `A p.d. of ${V} V is applied across a ${R} Ω resistor. Find the current.`, fmt(I, "A"),
        n(I, [V * R, R / V, I + 1, V], "A"), `I = V/R = ${V} ÷ ${R} = ${I} A.`, 1);
    }),
    ...repeat(6, () => {
      const I = ri(2, 6), R = ri(2, 20), V = I * R;
      return mcq(S, "Current electricity", `A current of ${I} A flows when ${V} V is applied across a conductor. Find its resistance.`, fmt(R, "Ω"),
        n(R, [V * I, I / V, R + I, V], "Ω"), `R = V/I = ${V} ÷ ${I} = ${R} Ω.`, 1);
    }),
    ...repeat(10, () => {
      const rs = [ri(2, 20), ri(2, 20), ri(1, 15)];
      const sum = rs.reduce((a, b) => a + b);
      return mcq(S, "Current electricity", `Resistors of ${rs.join(" Ω, ")} Ω are connected in series. Find the total resistance.`, fmt(sum, "Ω"),
        n(sum, [sum - rs[2], Math.round((1 / rs.reduce((a, b) => a + 1 / b, 0)) * 10) / 10, sum * 2, rs[0] * rs[1]], "Ω"), `In series, R = ${rs.join(" + ")} = ${sum} Ω.`, 1);
    }),
    ...[[2, 2, 1], [3, 6, 2], [4, 4, 2], [6, 12, 4], [4, 12, 3], [10, 15, 6], [20, 30, 12], [8, 8, 4], [10, 10, 5], [5, 20, 4], [9, 18, 6], [12, 24, 8], [6, 3, 2], [30, 60, 20]].map(([a, b, r]) =>
      mcq(S, "Current electricity", `Two resistors of ${a} Ω and ${b} Ω are connected in parallel. Find the effective resistance.`, fmt(r, "Ω"),
        n(r, [a + b, (a + b) / 2, a * b, Math.abs(a - b)], "Ω"), `1/R = 1/${a} + 1/${b} ⇒ R = (${a} × ${b})/(${a} + ${b}) = ${r} Ω.`, 2),
    ),
    ...repeat(12, () => {
      const V = pick([6, 12, 24, 110, 220, 240]), I = ri(1, 10);
      return mcq(S, "Electrical power", `An appliance draws ${I} A from a ${V} V supply. Find its power.`, fmt(V * I, "W"),
        n(V * I, [V / I, V + I, V * I * I, (V * I) / 2], "W"), `P = VI = ${V} × ${I} = ${V * I} W.`, 1);
    }),
    ...repeat(10, () => {
      const P = pick([100, 200, 500, 1000, 1500, 2000, 2500]), h = ri(2, 10), price = pick([20, 25, 50, 68, 100]);
      const kwh = (P * h) / 1000, cost = kwh * price;
      return mcq(S, "Electrical power", `A ${P} W pressing iron is used for ${h} hours. If electricity costs ₦${price} per kWh, find the cost.`, `₦${fmt(cost)}`,
        numOpts(cost, [P * h * price, kwh, cost * 10, cost / h]).map((x) => `₦${x}`), `Energy = ${P} × ${h} / 1000 = ${fmt(kwh)} kWh. Cost = ${fmt(kwh)} × ₦${price} = ₦${fmt(cost)}.`, 2);
    }),
  );

  // Waves
  qs.push(
    ...repeat(14, () => {
      const f = pick([20, 50, 100, 200, 250, 400, 500, 1000]), l = pick([0.5, 1, 1.5, 2, 3, 4, 0.2]);
      return mcq(S, "Waves", `A wave has a frequency of ${f} Hz and a wavelength of ${l} m. Find its speed.`, fmt(f * l, "m/s"),
        n(f * l, [f / l, l / f, f + l, f * l * 2], "m/s"), `v = fλ = ${f} × ${l} = ${fmt(f * l)} m/s.`, 1);
    }),
    ...repeat(8, () => {
      const v = pick([330, 340, 1500, 3e8]), f = pick([10, 20, 50, 100, 200, 500]);
      const l = v / f;
      const vs = v === 3e8 ? "3 × 10⁸" : String(v);
      if (v === 3e8) return null;
      return mcq(S, "Waves", `Sound travels at ${vs} m/s in a medium. Find the wavelength of a ${f} Hz note in it.`, fmt(l, "m"),
        n(l, [v * f, f / v, l * 2, l / 2], "m"), `λ = v/f = ${vs} ÷ ${f} = ${fmt(l)} m.`, 2);
    }),
    ...repeat(6, () => {
      const f = pick([2, 4, 5, 10, 20, 25, 50]);
      return mcq(S, "Waves", `Find the period of a wave of frequency ${f} Hz.`, fmt(1 / f, "s"), n(1 / f, [f, 2 / f, 1 / (2 * f), f / 10], "s"), `T = 1/f = 1/${f} = ${fmt(1 / f)} s.`, 1);
    }),
  );

  // Heat
  qs.push(
    ...repeat(10, () => {
      const m = pick([0.5, 1, 2, 3, 5]), dT = ri(2, 8) * 5;
      const Q = m * 4200 * dT;
      return mcq(S, "Heat", `How much heat is needed to raise the temperature of ${m} kg of water by ${dT} °C? (c = 4200 J/kg K)`, fmt(Q, "J"),
        n(Q, [4200 * dT, m * 4200, Q / 10, Q * 2], "J"), `Q = mcΔθ = ${m} × 4200 × ${dT} = ${Q.toLocaleString("en-US")} J.`, 2);
    }),
    ...repeat(8, () => {
      const c = ri(-40, 150);
      return mcq(S, "Heat", `Convert ${c} °C to kelvin.`, fmt(c + 273, "K"), n(c + 273, [c - 273, 273 - c, c + 100, c + 373], "K"), `T(K) = θ(°C) + 273 = ${c} + 273 = ${c + 273} K.`, 1);
    }),
  );

  // Optics, radioactivity
  qs.push(
    ...repeat(8, () => {
      const u = ri(2, 10) * 5, m = pick([2, 3, 4, 0.5]);
      const v = u * m;
      return mcq(S, "Optics", `An object is ${u} cm from a lens and its image is ${fmt(v)} cm from the lens. Find the magnification.`, fmt(m),
        numOpts(m, [1 / m, u + v, m + 1, v - u]), `m = v/u = ${fmt(v)}/${u} = ${fmt(m)}.`, 2);
    }),
    ...repeat(10, () => {
      const M = pick([16, 32, 64, 80, 128, 160, 200, 240]), T = pick([2, 3, 5, 8, 10, 12, 24]), k = ri(1, 4);
      const rem = M / 2 ** k;
      return mcq(S, "Radioactivity", `A radioactive sample of mass ${M} g has a half-life of ${T} days. What mass remains after ${T * k} days?`, fmt(rem, "g"),
        n(rem, [M / (2 * k), M - rem, M / 2 ** (k + 1), M / k], "g"), `${T * k} days = ${k} half-lives. Remaining = ${M} × (½)^${k} = ${fmt(rem)} g.`, 2);
    }),
  );

  // SI units
  const units: [string, string][] = [
    ["force", "newton (N)"], ["work", "joule (J)"], ["power", "watt (W)"], ["pressure", "pascal (Pa)"], ["electric charge", "coulomb (C)"],
    ["electric current", "ampere (A)"], ["potential difference", "volt (V)"], ["resistance", "ohm (Ω)"], ["frequency", "hertz (Hz)"], ["mass", "kilogram (kg)"],
    ["thermodynamic temperature", "kelvin (K)"], ["amount of substance", "mole (mol)"], ["luminous intensity", "candela (cd)"], ["magnetic flux", "weber (Wb)"],
    ["magnetic flux density", "tesla (T)"], ["capacitance", "farad (F)"], ["inductance", "henry (H)"], ["momentum", "kilogram metre per second (kg m/s)"],
    ["acceleration", "metre per second squared (m/s²)"], ["density", "kilogram per cubic metre (kg/m³)"], ["specific heat capacity", "joule per kilogram kelvin (J/kg K)"],
    ["impulse", "newton second (N s)"],
  ];
  qs.push(
    ...units.map((u) =>
      mcq(S, "Units", `What is the SI unit of ${u[0]}?`, u[1], others(units, u, (x) => x[1]), `The SI unit of ${u[0]} is the ${u[1]}.`, 1),
    ),
  );

  // Scalars and vectors
  const vectors = ["velocity", "acceleration", "force", "displacement", "momentum", "weight", "electric field strength", "impulse"];
  const scalars = ["speed", "mass", "energy", "distance", "time", "temperature", "work", "power", "density", "volume"];
  const VS = ["a vector — it has magnitude and direction", "a scalar — it has magnitude only", "a vector — it has magnitude only", "a scalar — it has magnitude and direction"];
  qs.push(
    ...[...vectors.map((v) => [v, true] as const), ...scalars.map((s) => [s, false] as const)].map(([qty, isVec]) =>
      mcq(S, "Scalars and vectors", `${cap(qty)} is best described as`, isVec ? VS[0] : VS[1], VS.filter((_, i) => i !== (isVec ? 0 : 1)),
        isVec ? `${cap(qty)} has both size and direction, so it is a vector.` : `${cap(qty)} has size only, no direction, so it is a scalar.`, 1),
    ),
  );

  return qs;
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
