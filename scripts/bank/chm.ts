import { fmt, mcq, numOpts, others, pick, Q, repeat, ri, sample } from "./lib";

const S = "CHM";
const A: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65 };
const MASSES = "(H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, Al = 27, S = 32, Cl = 35.5, K = 39, Ca = 40, Fe = 56, Cu = 64, Zn = 65)";

// [display formula, name, composition]
const COMPOUNDS: [string, string, Record<string, number>][] = [
  ["H₂O", "water", { H: 2, O: 1 }], ["CO₂", "carbon(IV) oxide", { C: 1, O: 2 }], ["NaCl", "sodium chloride", { Na: 1, Cl: 1 }],
  ["NaOH", "sodium hydroxide", { Na: 1, O: 1, H: 1 }], ["HCl", "hydrogen chloride", { H: 1, Cl: 1 }], ["H₂SO₄", "tetraoxosulphate(VI) acid", { H: 2, S: 1, O: 4 }],
  ["CaCO₃", "calcium trioxocarbonate(IV)", { Ca: 1, C: 1, O: 3 }], ["NH₃", "ammonia", { N: 1, H: 3 }], ["CH₄", "methane", { C: 1, H: 4 }],
  ["C₂H₆", "ethane", { C: 2, H: 6 }], ["C₂H₅OH", "ethanol", { C: 2, H: 6, O: 1 }], ["C₆H₁₂O₆", "glucose", { C: 6, H: 12, O: 6 }],
  ["MgO", "magnesium oxide", { Mg: 1, O: 1 }], ["CuO", "copper(II) oxide", { Cu: 1, O: 1 }], ["KOH", "potassium hydroxide", { K: 1, O: 1, H: 1 }],
  ["HNO₃", "trioxonitrate(V) acid", { H: 1, N: 1, O: 3 }], ["Na₂CO₃", "sodium trioxocarbonate(IV)", { Na: 2, C: 1, O: 3 }], ["CaO", "calcium oxide", { Ca: 1, O: 1 }],
  ["Al₂O₃", "aluminium oxide", { Al: 2, O: 3 }], ["Fe₂O₃", "iron(III) oxide", { Fe: 2, O: 3 }], ["CuSO₄", "copper(II) tetraoxosulphate(VI)", { Cu: 1, S: 1, O: 4 }],
  ["ZnO", "zinc oxide", { Zn: 1, O: 1 }], ["SO₂", "sulphur(IV) oxide", { S: 1, O: 2 }], ["NO₂", "nitrogen(IV) oxide", { N: 1, O: 2 }],
  ["MgCl₂", "magnesium chloride", { Mg: 1, Cl: 2 }], ["CaCl₂", "calcium chloride", { Ca: 1, Cl: 2 }], ["KCl", "potassium chloride", { K: 1, Cl: 1 }],
  ["NaHCO₃", "sodium hydrogentrioxocarbonate(IV)", { Na: 1, H: 1, C: 1, O: 3 }], ["Ca(OH)₂", "calcium hydroxide", { Ca: 1, O: 2, H: 2 }], ["O₂", "oxygen gas", { O: 2 }],
  ["N₂", "nitrogen gas", { N: 2 }], ["Cl₂", "chlorine gas", { Cl: 2 }],
];
const mm = (c: Record<string, number>) => Object.entries(c).reduce((s, [e, k]) => s + A[e] * k, 0);

export function chemistry(): Q[] {
  const qs: Q[] = [];

  // Molar mass
  qs.push(
    ...COMPOUNDS.map(([f, name, c]) => {
      const M = mm(c);
      const wrong = [M + 16, M - 1, Object.keys(c).reduce((s, e) => s + A[e], 0), M * 2, M + 12];
      return mcq(S, "Mole concept", `Calculate the relative molecular mass of ${f}. ${MASSES}`, fmt(M), numOpts(M, wrong),
        `${Object.entries(c).map(([e, k]) => `${e}: ${k} × ${A[e]}`).join(", ")} → total ${fmt(M)}.`, 1);
    }),
  );

  // Moles from mass
  qs.push(
    ...repeat(25, () => {
      const [f, , c] = pick(COMPOUNDS);
      const M = mm(c), n = pick([0.1, 0.2, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4]);
      const m = M * n;
      return mcq(S, "Mole concept", `How many moles are in ${fmt(m)} g of ${f}? ${MASSES}`, fmt(n),
        numOpts(n, [m * M, M / m, n * 2, n / 2, n + 1]), `Molar mass of ${f} = ${fmt(M)} g/mol. n = mass ÷ M = ${fmt(m)} ÷ ${fmt(M)} = ${fmt(n)} mol.`, 1);
    }),
  );

  // Mass from moles
  qs.push(
    ...repeat(15, () => {
      const [f, , c] = pick(COMPOUNDS);
      const M = mm(c), n = pick([0.1, 0.2, 0.5, 2, 3, 5]);
      return mcq(S, "Mole concept", `Find the mass of ${n} mol of ${f}. ${MASSES}`, fmt(M * n, "g"),
        numOpts(M * n, [M / n, M, M * n * 2, M + n], "g"), `mass = n × M = ${n} × ${fmt(M)} = ${fmt(M * n)} g.`, 1);
    }),
  );

  // Particles
  qs.push(
    ...[0.1, 0.2, 0.5, 1.5, 2, 2.5, 3, 4, 5, 0.25].map((n) => {
      const v = n * 6.02;
      const f = (x: number) => {
        let e = 23, m = x;
        while (m >= 10) { m /= 10; e++; }
        while (m < 1) { m *= 10; e--; }
        return `${Math.round(m * 1000) / 1000} × 10${String(e).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]).join("")}`;
      };
      return mcq(S, "Mole concept", `How many molecules are in ${n} mol of a gas? (Avogadro's constant = 6.02 × 10²³)`, f(v),
        [f(v * 10), f(v / 10), f(6.02 / n), f(v * 2)], `Number of particles = n × L = ${n} × 6.02 × 10²³ = ${f(v)}.`, 2);
    }),
  );

  // Concentration
  qs.push(
    ...repeat(15, () => {
      const n = pick([0.05, 0.1, 0.2, 0.25, 0.4, 0.5, 1]), V = pick([100, 200, 250, 500, 1000]);
      const c = n / (V / 1000);
      return mcq(S, "Solutions", `${n} mol of a solute is dissolved in water to make ${V} cm³ of solution. Find the concentration in mol/dm³.`, fmt(c, "mol/dm³"),
        numOpts(c, [n * V, n / V, c / 10, c * 10, n * (V / 1000)], "mol/dm³"), `c = n/V = ${n} ÷ ${V / 1000} dm³ = ${fmt(c)} mol/dm³. (1000 cm³ = 1 dm³)`, 2);
    }),
    ...repeat(10, () => {
      const [f, , c] = pick(COMPOUNDS.filter((x) => ["NaOH", "NaCl", "KOH", "HCl", "Na₂CO₃", "KCl", "CuSO₄", "HNO₃"].includes(x[0])));
      const M = mm(c), conc = pick([0.1, 0.2, 0.5, 1, 2]);
      return mcq(S, "Solutions", `What mass of ${f} is needed to make 1 dm³ of a ${conc} mol/dm³ solution? ${MASSES}`, fmt(M * conc, "g"),
        numOpts(M * conc, [M, M / conc, M * conc * 10, conc], "g"), `mass = c × V × M = ${conc} × 1 × ${fmt(M)} = ${fmt(M * conc)} g.`, 2);
    }),
  );

  // Gas volumes at s.t.p.
  qs.push(
    ...[0.1, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map((n) =>
      mcq(S, "Gas laws", `What volume does ${n} mol of a gas occupy at s.t.p.? (Molar volume = 22.4 dm³)`, fmt(n * 22.4, "dm³"),
        numOpts(n * 22.4, [22.4 / n, n * 24, n * 2.24, n + 22.4], "dm³"), `V = n × 22.4 = ${n} × 22.4 = ${fmt(n * 22.4)} dm³.`, 1),
    ),
  );

  // Boyle's & Charles's law
  qs.push(
    ...repeat(12, () => {
      const P1 = pick([100, 150, 200, 300, 400]), V1 = pick([20, 30, 40, 60, 120]), P2 = pick([50, 100, 200, 240, 300, 600]);
      if (P1 === P2) return null;
      const V2 = (P1 * V1) / P2;
      if (!Number.isInteger(V2 * 10)) return null;
      return mcq(S, "Gas laws", `A gas occupies ${V1} cm³ at ${P1} kPa. Find its volume at ${P2} kPa, temperature remaining constant.`, fmt(V2, "cm³"),
        numOpts(V2, [(P2 * V1) / P1, V1, V2 * 2, V1 + P2 - P1], "cm³"), `Boyle's law: P₁V₁ = P₂V₂ ⇒ V₂ = ${P1} × ${V1} ÷ ${P2} = ${fmt(V2)} cm³.`, 2);
    }),
    ...repeat(10, () => {
      const T1c = pick([27, 47, 77, 127, 7, -73]), V1 = pick([100, 200, 300, 400, 600]), T2c = pick([27, 127, 227, 327, 77, 177]);
      if (T1c === T2c) return null;
      const T1 = T1c + 273, T2 = T2c + 273;
      const V2 = (V1 * T2) / T1;
      if (!Number.isInteger(V2)) return null;
      return mcq(S, "Gas laws", `A gas has a volume of ${V1} cm³ at ${T1c} °C. Find its volume at ${T2c} °C at constant pressure.`, fmt(V2, "cm³"),
        numOpts(V2, [(V1 * T2c) / T1c, (V1 * T1) / T2, V1, V2 + 50], "cm³"), `Charles's law: V₁/T₁ = V₂/T₂ (in kelvin). V₂ = ${V1} × ${T2} ÷ ${T1} = ${V2} cm³.`, 3);
    }),
  );

  // Oxidation numbers
  const OX: [string, string, string][] = [
    ["S", "H₂SO₄", "+6"], ["N", "HNO₃", "+5"], ["Mn", "KMnO₄", "+7"], ["Cr", "K₂Cr₂O₇", "+6"], ["C", "CO₂", "+4"], ["S", "SO₂", "+4"], ["N", "NH₃", "−3"],
    ["Cl", "NaClO₃", "+5"], ["Cl", "HCl", "−1"], ["Fe", "Fe₂O₃", "+3"], ["Cu", "CuO", "+2"], ["Cu", "Cu₂O", "+1"], ["P", "H₃PO₄", "+5"], ["N", "NO₂", "+4"],
    ["S", "H₂S", "−2"], ["C", "CH₄", "−4"], ["Mn", "MnO₂", "+4"], ["O", "H₂O₂", "−1"], ["N", "N₂", "0"], ["Cl", "NaOCl", "+1"], ["S", "Na₂S₂O₃", "+2"],
    ["N", "NaNO₂", "+3"], ["C", "CO", "+2"], ["Fe", "FeSO₄", "+2"],
  ];
  const oxVals = ["−4", "−3", "−2", "−1", "0", "+1", "+2", "+3", "+4", "+5", "+6", "+7"];
  qs.push(
    ...OX.map(([el, f, v]) => {
      const i = oxVals.indexOf(v);
      return mcq(S, "Redox", `What is the oxidation number of ${el} in ${f}?`, v, [oxVals[i + 1], oxVals[i - 1], oxVals[i + 2], oxVals[i - 2], oxVals[i - 3], oxVals[i + 3]].filter(Boolean) as string[],
        `Sum of oxidation numbers in a neutral compound is 0 (H = +1, O = −2 except in peroxides). Solving gives ${el} = ${v}.`, 2);
    }),
  );

  // % composition
  qs.push(
    ...sample(COMPOUNDS.filter(([, , c]) => Object.keys(c).length >= 2), 18).map(([f, , c]) => {
      const M = mm(c);
      const el = pick(Object.keys(c).filter((e) => e !== "H"));
      const pct = Math.round(((A[el] * c[el]) / M) * 1000) / 10;
      return mcq(S, "Mole concept", `Find the percentage by mass of ${el} in ${f}. ${MASSES}`, `${pct}%`,
        [`${Math.round((A[el] / M) * 1000) / 10}%`, `${Math.round((100 - pct) * 10) / 10}%`, `${Math.round(pct * 1.2 * 10) / 10}%`, `${Math.round(pct * 0.8 * 10) / 10}%`],
        `% ${el} = (${c[el]} × ${A[el]}) / ${fmt(M)} × 100 = ${pct}%.`, 2);
    }),
  );

  // Elements 1–20
  const EL: [number, string, string, string, number, number][] = [
    // Z, symbol, name, configuration, group (0 for noble), period
    [1, "H", "hydrogen", "1", 1, 1], [2, "He", "helium", "2", 0, 1], [3, "Li", "lithium", "2,1", 1, 2], [4, "Be", "beryllium", "2,2", 2, 2],
    [5, "B", "boron", "2,3", 3, 2], [6, "C", "carbon", "2,4", 4, 2], [7, "N", "nitrogen", "2,5", 5, 2], [8, "O", "oxygen", "2,6", 6, 2],
    [9, "F", "fluorine", "2,7", 7, 2], [10, "Ne", "neon", "2,8", 0, 2], [11, "Na", "sodium", "2,8,1", 1, 3], [12, "Mg", "magnesium", "2,8,2", 2, 3],
    [13, "Al", "aluminium", "2,8,3", 3, 3], [14, "Si", "silicon", "2,8,4", 4, 3], [15, "P", "phosphorus", "2,8,5", 5, 3], [16, "S", "sulphur", "2,8,6", 6, 3],
    [17, "Cl", "chlorine", "2,8,7", 7, 3], [18, "Ar", "argon", "2,8,8", 0, 3], [19, "K", "potassium", "2,8,8,1", 1, 4], [20, "Ca", "calcium", "2,8,8,2", 2, 4],
  ];
  const grp = (g: number) => (g === 0 ? "Group 0 (18)" : `Group ${g}`);
  qs.push(
    ...EL.filter((e) => e[0] > 2).map((e) =>
      mcq(S, "Atomic structure", `What is the electron configuration of ${e[2]} (atomic number ${e[0]})?`, e[3], others(EL, e, (x) => x[3]), `${e[2][0].toUpperCase() + e[2].slice(1)} has ${e[0]} electrons arranged as ${e[3]}.`, 1),
    ),
    ...EL.map((e) =>
      mcq(S, "Periodic table", `What is the chemical symbol for ${e[2]}?`, e[1], others(EL, e, (x) => x[1]), `The symbol for ${e[2]} is ${e[1]}.`, 1),
    ),
    ...EL.filter((e) => e[0] > 2).map((e) =>
      mcq(S, "Periodic table", `An element has the electron configuration ${e[3]}. To which group and period does it belong?`, `${grp(e[4])}, Period ${e[5]}`,
        [`${grp((e[4] + 1) % 8)}, Period ${e[5]}`, `${grp(e[4])}, Period ${e[5] + 1}`, `Group ${e[5]}, Period ${e[4] || 8}`, `${grp((e[4] + 7) % 8)}, Period ${e[5]}`],
        `The number of shells gives the period (${e[5]}); electrons in the outermost shell give the group (${e[4] === 0 ? "full shell = Group 0" : e[4]}).`, 2),
    ),
  );

  // Neutrons
  const ISO: [string, number, number][] = [["²³Na", 11, 23], ["³⁵Cl", 17, 35], ["³⁷Cl", 17, 37], ["¹²C", 6, 12], ["¹⁴C", 6, 14], ["¹⁶O", 8, 16], ["²⁴Mg", 12, 24], ["²⁷Al", 13, 27], ["³⁹K", 19, 39], ["⁴⁰Ca", 20, 40], ["⁵⁶Fe", 26, 56], ["³²S", 16, 32], ["⁶⁴Cu", 29, 64], ["²³⁵U", 92, 235]];
  qs.push(
    ...ISO.map(([sym, Z, Am]) =>
      mcq(S, "Atomic structure", `How many neutrons are in an atom of ${sym}? (atomic number ${Z})`, fmt(Am - Z), numOpts(Am - Z, [Z, Am, Am + Z, Am - Z + 1]),
        `Neutrons = mass number − atomic number = ${Am} − ${Z} = ${Am - Z}.`, 1),
    ),
  );

  // Hydrocarbons
  const pre = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct"];
  const sub = (n: number) => String(n).split("").map((d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]).join("");
  const alk = (n: number) => `C${n > 1 ? sub(n) : ""}H${sub(2 * n + 2)}`;
  const alkene = (n: number) => `C${sub(n)}H${sub(2 * n)}`;
  qs.push(
    ...pre.map((p, i) => mcq(S, "Organic chemistry", `What is the molecular formula of ${p}ane?`, alk(i + 1), [alkene(i + 2), alk(i + 2), i > 0 ? alk(i) : "CH₂", `C${sub(i + 1)}H${sub(2 * i + 4)}`].filter((x) => x !== alk(i + 1)), `Alkanes have the general formula CₙH₂ₙ₊₂. For n = ${i + 1}: ${alk(i + 1)}.`, 1)),
    ...pre.slice(1, 6).map((p, j) => {
      const nC = j + 2;
      return mcq(S, "Organic chemistry", `What is the molecular formula of ${p}ene?`, alkene(nC), [alk(nC), alkene(nC + 1), `C${sub(nC)}H${sub(2 * nC - 2)}`, alk(nC - 1)], `Alkenes have the general formula CₙH₂ₙ. For n = ${nC}: ${alkene(nC)}.`, 1);
    }),
    ...pre.slice(0, 6).map((p, i) => mcq(S, "Organic chemistry", `Name the alkane with the formula ${alk(i + 1)}.`, `${p}ane`, pre.filter((x) => x !== p).slice(0, 5).map((x) => `${x}ane`).concat([`${p}ene`]), `${alk(i + 1)} has ${i + 1} carbon atom${i ? "s" : ""}: ${p}ane.`, 1)),
  );

  // Facts
  const facts: [string, string, string[], string][] = [
    ["Which gas gives a 'pop' sound with a lighted splint?", "Hydrogen", ["Oxygen", "Carbon(IV) oxide", "Nitrogen"], "Hydrogen burns with a squeaky pop."],
    ["Which gas relights a glowing splint?", "Oxygen", ["Hydrogen", "Nitrogen", "Carbon(IV) oxide"], "Oxygen supports combustion, so a glowing splint bursts into flame."],
    ["Which gas turns damp red litmus paper blue?", "Ammonia", ["Chlorine", "Hydrogen chloride", "Sulphur(IV) oxide"], "Ammonia is the common alkaline gas."],
    ["Which gas bleaches damp litmus paper?", "Chlorine", ["Ammonia", "Oxygen", "Hydrogen"], "Chlorine is a bleaching agent in the presence of moisture."],
    ["Ammonia and hydrogen chloride gas meet to form dense white fumes of", "ammonium chloride", ["ammonium nitrate", "sodium chloride", "chlorine"], "NH₃ + HCl → NH₄Cl (white fumes)."],
    ["Which gas turns orange acidified potassium heptaoxodichromate(VI) green?", "Sulphur(IV) oxide", ["Carbon(IV) oxide", "Oxygen", "Nitrogen"], "SO₂ is a reducing agent: it reduces Cr₂O₇²⁻ (orange) to Cr³⁺ (green)."],
    ["The industrial preparation of ammonia is called the", "Haber process", ["Contact process", "Solvay process", "Ostwald process"], "Haber process: N₂ + 3H₂ ⇌ 2NH₃ over an iron catalyst."],
    ["Tetraoxosulphate(VI) acid is manufactured by the", "Contact process", ["Haber process", "Solvay process", "Bayer process"], "Contact process: SO₂ is oxidised to SO₃ over vanadium(V) oxide."],
    ["The catalyst used in the Contact process is", "vanadium(V) oxide", ["finely divided iron", "platinum–rhodium gauze", "nickel"], "V₂O₅ catalyses 2SO₂ + O₂ ⇌ 2SO₃."],
    ["The catalyst used in the Haber process is", "finely divided iron", ["vanadium(V) oxide", "nickel", "manganese(IV) oxide"], "Iron speeds up N₂ + 3H₂ ⇌ 2NH₃."],
    ["Sodium trioxocarbonate(IV) is manufactured by the", "Solvay process", ["Haber process", "Contact process", "Ostwald process"], "The Solvay (ammonia-soda) process makes Na₂CO₃."],
    ["Atoms of the same element with different numbers of neutrons are called", "isotopes", ["isomers", "allotropes", "isobars"], "Isotopes have the same atomic number but different mass numbers."],
    ["Different forms of the same element in the same physical state are called", "allotropes", ["isotopes", "isomers", "polymers"], "Diamond and graphite are allotropes of carbon."],
    ["A substance that speeds up a chemical reaction without being used up is a", "catalyst", ["reactant", "inhibitor", "reducing agent"], "Catalysts lower the activation energy and are recovered unchanged."],
    ["During electrolysis, the electrode connected to the positive terminal is the", "anode", ["cathode", "electrolyte", "salt bridge"], "Anode = positive; oxidation happens there."],
    ["Oxidation is defined as", "loss of electrons", ["gain of electrons", "gain of hydrogen", "loss of oxygen"], "OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons)."],
    ["Temporary hardness of water is caused by dissolved", "calcium hydrogentrioxocarbonate(IV)", ["calcium tetraoxosulphate(VI)", "sodium chloride", "magnesium chloride"], "Ca(HCO₃)₂ decomposes on boiling, so this hardness is removed by boiling."],
    ["The functional group of alkanols is", "–OH", ["–COOH", "C=C", "–CHO"], "Alkanols (alcohols) contain the hydroxyl group –OH."],
    ["The functional group of alkanoic acids is", "–COOH", ["–OH", "C=C", "–NH₂"], "Alkanoic acids contain the carboxyl group –COOH."],
    ["Alkenes decolourise bromine water because they are", "unsaturated", ["saturated", "aromatic", "ionic"], "The C=C double bond undergoes addition with bromine."],
    ["The reaction between an acid and a base to form salt and water is called", "neutralisation", ["hydrolysis", "esterification", "saponification"], "Acid + base → salt + water."],
    ["The reaction of an alkanoic acid with an alkanol produces an", "ester", ["ether", "alkene", "aldehyde"], "Esterification: acid + alcohol ⇌ ester + water."],
    ["Soap is made by boiling fats or oils with", "sodium hydroxide", ["hydrochloric acid", "ethanol", "calcium oxide"], "This is saponification."],
    ["The most abundant gas in air is", "nitrogen", ["oxygen", "argon", "carbon(IV) oxide"], "Air is about 78% nitrogen and 21% oxygen."],
    ["Rusting of iron requires", "oxygen and water", ["oxygen only", "water only", "carbon(IV) oxide and water"], "Iron rusts only when both air (oxygen) and water are present."],
    ["Which of these is a noble gas?", "Argon", ["Nitrogen", "Chlorine", "Fluorine"], "Argon is in Group 0 with He, Ne, Kr, Xe and Rn."],
    ["Which of these is an alkali metal?", "Potassium", ["Calcium", "Magnesium", "Aluminium"], "Group 1 metals (Li, Na, K…) are the alkali metals."],
    ["The halogens are found in", "Group 7", ["Group 1", "Group 2", "Group 0"], "F, Cl, Br and I are in Group 7 (17)."],
    ["Brass is an alloy of", "copper and zinc", ["copper and tin", "iron and carbon", "lead and tin"], "Brass = Cu + Zn. Bronze = Cu + Sn. Steel = Fe + C."],
    ["Steel is an alloy of", "iron and carbon", ["copper and zinc", "copper and tin", "aluminium and magnesium"], "Steel is mainly iron with a small amount of carbon."],
    ["Bronze is an alloy of", "copper and tin", ["copper and zinc", "iron and carbon", "lead and tin"], "Bronze = copper + tin."],
    ["Fractional distillation of crude oil separates components by their", "boiling points", ["densities", "colours", "solubilities in water"], "Fractions with different boiling points condense at different heights."],
    ["Chromatography separates substances based on differences in their", "rates of movement through a medium", ["boiling points", "magnetic properties", "densities"], "Components travel at different rates on paper or a column."],
    ["The pH of a neutral solution at 25 °C is", "7", ["0", "1", "14"], "pH 7 is neutral; below is acidic, above is alkaline."],
    ["A solution with pH 1 is", "strongly acidic", ["weakly acidic", "neutral", "strongly alkaline"], "The lower the pH, the more acidic."],
    ["A solution with pH 13 is", "strongly alkaline", ["weakly alkaline", "neutral", "strongly acidic"], "The higher the pH above 7, the more alkaline."],
    ["A solution with pH 5 is", "weakly acidic", ["strongly acidic", "neutral", "weakly alkaline"], "pH 5 is below 7 but not far from it."],
    ["Methyl orange in an acid turns", "red", ["yellow", "blue", "pink"], "Methyl orange is red in acid and yellow in alkali."],
    ["Phenolphthalein in an alkali turns", "pink", ["colourless", "red", "yellow"], "Phenolphthalein is colourless in acid and pink in alkali."],
    ["The bond formed by sharing a pair of electrons is", "covalent", ["ionic", "metallic", "hydrogen"], "Covalent bonds involve shared electron pairs."],
  ];
  qs.push(...facts.map(([b, c, d, e]) => mcq(S, "General chemistry", b, c, d, e, 1)));

  return qs;
}
