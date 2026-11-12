import { fmt, mcq, numOpts, others, pick, Q, repeat, ri } from "./lib";

const S = "ECO";
const N = (x: number) => `₦${fmt(x)}`;

export function economics(): Q[] {
  const qs: Q[] = [];

  // Elasticity
  qs.push(
    ...repeat(15, () => {
      const dp = pick([5, 10, 20, 25, 40, 50]), e = pick([0.2, 0.4, 0.5, 0.8, 1, 1.5, 2, 2.5, 3]);
      const dq = dp * e;
      return mcq(S, "Elasticity", `When the price of a good rises by ${dp}%, quantity demanded falls by ${fmt(dq)}%. Find the price elasticity of demand (ignore the sign).`, fmt(e),
        numOpts(e, [dp / dq, dq + dp, dq - dp, e * 10]), `PED = % change in Qd ÷ % change in P = ${fmt(dq)} ÷ ${dp} = ${fmt(e)}.`, 1);
    }),
    ...[0, 0.3, 0.5, 0.8, 1, 1.6, 2, 3.5, 4].map((e) => {
      const correct = e === 0 ? "perfectly inelastic" : e < 1 ? "inelastic" : e === 1 ? "unitary elastic" : "elastic";
      return mcq(S, "Elasticity", `Demand for a good has a price elasticity of ${e}. Demand is`, correct, ["elastic", "inelastic", "unitary elastic", "perfectly inelastic", "perfectly elastic"],
        `PED = 0: perfectly inelastic; < 1: inelastic; = 1: unitary; > 1: elastic.`, 1);
    }),
  );

  // Revenue, cost, profit
  qs.push(
    ...repeat(10, () => {
      const p = ri(2, 40) * 50, q = ri(5, 60);
      return mcq(S, "Theory of the firm", `A firm sells ${q} units at ${N(p)} each. Find its total revenue.`, N(p * q),
        numOpts(p * q, [p + q, p / q, p * q * 2, p * (q - 1)]).map((x) => `₦${x}`), `TR = P × Q = ${p} × ${q} = ${N(p * q)}.`, 1);
    }),
    ...repeat(10, () => {
      const q = ri(5, 50), ac = ri(2, 30) * 20;
      const tc = q * ac;
      return mcq(S, "Theory of the firm", `The total cost of producing ${q} units is ${N(tc)}. Find the average cost.`, N(ac),
        numOpts(ac, [tc * q, tc - q, ac + 20, ac / 2]).map((x) => `₦${x}`), `AC = TC ÷ Q = ${tc} ÷ ${q} = ${N(ac)}.`, 1);
    }),
    ...repeat(10, () => {
      const q = ri(5, 40), tc1 = ri(50, 400) * 10, mc = ri(2, 40) * 10;
      return mcq(S, "Theory of the firm", `Total cost rises from ${N(tc1)} at ${q} units to ${N(tc1 + mc)} at ${q + 1} units. Find the marginal cost of the ${q + 1}th unit.`, N(mc),
        numOpts(mc, [(tc1 + mc) / (q + 1), tc1 + mc, tc1 / q, mc * 2]).map((x) => `₦${x}`), `MC = change in TC = ${tc1 + mc} − ${tc1} = ${N(mc)}.`, 2);
    }),
    ...repeat(10, () => {
      const tr = ri(20, 200) * 100, tc = tr - ri(-30, 60) * 100;
      const pr = tr - tc;
      if (pr === 0) return null;
      const correct = pr >= 0 ? `profit of ${N(pr)}` : `loss of ${N(-pr)}`;
      return mcq(S, "Theory of the firm", `A firm's total revenue is ${N(tr)} and its total cost is ${N(tc)}. The firm makes a`, correct,
        [pr >= 0 ? `loss of ${N(pr)}` : `profit of ${N(-pr)}`, `profit of ${N(tr + tc)}`, `profit of ${N(Math.abs(pr) * 2)}`, `loss of ${N(tc)}`, "normal profit only"],
        `Profit = TR − TC = ${tr} − ${tc} = ${pr}.`, 1);
    }),
    ...repeat(10, () => {
      const L = ri(2, 12), ap = ri(3, 25);
      const tp = L * ap;
      return mcq(S, "Production", `${L} workers produce a total of ${tp} units. Find the average product of labour.`, fmt(ap, "units"),
        numOpts(ap, [tp * L, tp - L, ap + 1, ap * 2], "units"), `AP = TP ÷ L = ${tp} ÷ ${L} = ${ap}.`, 1);
    }),
    ...repeat(8, () => {
      const L = ri(3, 10), tp1 = ri(20, 80), mp = ri(2, 15);
      return mcq(S, "Production", `Total product rises from ${tp1} to ${tp1 + mp} units when the number of workers increases from ${L} to ${L + 1}. Find the marginal product of the last worker.`, fmt(mp, "units"),
        numOpts(mp, [(tp1 + mp) / (L + 1), tp1 + mp, tp1 / L, mp + 1], "units"), `MP = change in TP ÷ change in L = ${mp} ÷ 1 = ${mp}.`, 2);
    }),
  );

  // Macro
  qs.push(
    ...repeat(10, () => {
      const base = ri(4, 20) * 50, pct = pick([10, 20, 25, 30, 40, 50, 60, 80]);
      const cur = base * (1 + pct / 100);
      const idx = 100 + pct;
      return mcq(S, "Price index", `A basket of goods cost ${N(base)} in the base year and ${N(cur)} in the current year. Find the price index for the current year.`, fmt(idx),
        numOpts(idx, [pct, (base / cur) * 100, idx + 10, cur - base]), `Price index = (current ÷ base) × 100 = (${cur} ÷ ${base}) × 100 = ${idx}.`, 2);
    }),
    ...repeat(8, () => {
      const i1 = ri(10, 30) * 10, pct = pick([5, 10, 15, 20, 25]);
      const i2 = i1 * (1 + pct / 100);
      if (!Number.isInteger(i2)) return null;
      return mcq(S, "Inflation", `The consumer price index rose from ${i1} to ${i2}. Find the rate of inflation.`, `${pct}%`,
        [`${i2 - i1}%`, `${Math.round(((i2 - i1) / i2) * 1000) / 10}%`, `${pct * 2}%`, `${100 + pct}%`], `Inflation = (${i2} − ${i1}) ÷ ${i1} × 100 = ${pct}%.`, 2);
    }),
    ...[0.5, 0.6, 0.75, 0.8, 0.9, 0.95, 0.2, 0.875].map((mpc) => {
      const k = 1 / (1 - mpc);
      return mcq(S, "National income", `If the marginal propensity to consume is ${mpc}, find the value of the multiplier.`, fmt(k),
        numOpts(k, [1 / mpc, mpc * 10, 1 - mpc, k + 1]), `k = 1/(1 − MPC) = 1/${fmt(1 - mpc)} = ${fmt(k)}.`, 2);
    }),
    ...[0.5, 0.25, 0.2, 0.1].map((mps) =>
      mcq(S, "National income", `If the marginal propensity to save is ${mps}, the multiplier is`, fmt(1 / mps), numOpts(1 / mps, [1 / (1 - mps), mps * 10, 1 - mps, 1 / mps + 1]),
        `k = 1/MPS = 1/${mps} = ${fmt(1 / mps)}.`, 2),
    ),
    ...repeat(8, () => {
      const pop = ri(2, 20), pci = ri(1, 10) * 50000;
      const gdp = pop * pci;
      return mcq(S, "National income", `A country has a national income of ₦${gdp} million and a population of ${pop} million. Find the income per head.`, N(pci),
        numOpts(pci, [gdp * pop, gdp / 10, pci * 2, pci / 2]).map((x) => `₦${x}`), `Per capita income = national income ÷ population = ₦${gdp}m ÷ ${pop}m = ${N(pci)}.`, 1);
    }),
    ...repeat(8, () => {
      const gnp = ri(100, 900) * 10, dep = ri(5, 80) * 10;
      return mcq(S, "National income", `If GNP is ₦${gnp} billion and depreciation is ₦${dep} billion, find NNP.`, `₦${gnp - dep} billion`,
        [`₦${gnp + dep} billion`, `₦${gnp} billion`, `₦${dep} billion`, `₦${gnp - 2 * dep} billion`], `NNP = GNP − depreciation = ${gnp} − ${dep} = ₦${gnp - dep} billion.`, 1);
    }),
    ...repeat(10, () => {
      const lf = ri(20, 90) * 100, rate = pick([4, 5, 8, 10, 12, 15, 20, 25]);
      const un = (lf * rate) / 100;
      return mcq(S, "Labour market", `A town has a labour force of ${lf.toLocaleString("en-US")} people, of whom ${fmt(un)} are unemployed. Find the unemployment rate.`, `${rate}%`,
        [`${Math.round((un / (lf - un)) * 1000) / 10}%`, `${100 - rate}%`, `${rate * 2}%`, `${rate / 2}%`], `Rate = unemployed ÷ labour force × 100 = ${fmt(un)} ÷ ${lf} × 100 = ${rate}%.`, 1);
    }),
    ...repeat(8, () => {
      const y = ri(5, 40) * 1000, apc = pick([0.6, 0.7, 0.75, 0.8, 0.9]);
      const c = y * apc;
      return mcq(S, "National income", `A household with an income of ${N(y)} spends ${N(c)} on consumption. Find its average propensity to consume.`, fmt(apc),
        numOpts(apc, [1 - apc, y / c, apc + 0.1, apc / 2]), `APC = C ÷ Y = ${c} ÷ ${y} = ${apc}.`, 2);
    }),
    ...repeat(10, () => {
      const x = ri(20, 120) * 10, m = ri(20, 120) * 10;
      if (x === m) return null;
      const b = x - m;
      const correct = b > 0 ? `a surplus of ₦${b} billion` : `a deficit of ₦${-b} billion`;
      return mcq(S, "International trade", `A country's visible exports are worth ₦${x} billion and its visible imports ₦${m} billion. Its balance of trade shows`, correct,
        [b > 0 ? `a deficit of ₦${b} billion` : `a surplus of ₦${-b} billion`, `a surplus of ₦${x + m} billion`, `a deficit of ₦${x + m} billion`, "equilibrium"],
        `Balance of trade = exports − imports = ${x} − ${m} = ${b}.`, 1);
    }),
    ...repeat(8, () => {
      const rate = pick([750, 900, 1200, 1450, 1500, 1600]), usd = ri(2, 50) * 10;
      return mcq(S, "International trade", `If the exchange rate is ₦${rate.toLocaleString("en-US")} to $1, how much is $${usd} in naira?`, `₦${(usd * rate).toLocaleString("en-US")}`,
        [`₦${(usd + rate).toLocaleString("en-US")}`, `₦${((usd * rate) / 10).toLocaleString("en-US")}`, `₦${(usd * rate * 2).toLocaleString("en-US")}`, `₦${Math.round((rate / usd) * 100) / 100}`],
        `${usd} × ₦${rate} = ₦${(usd * rate).toLocaleString("en-US")}.`, 1);
    }),
  );

  // Concepts
  const DEF: [string, string][] = [
    ["Scarcity", "limited resources relative to unlimited wants"], ["Opportunity cost", "the next best alternative forgone"],
    ["Scale of preference", "a list of wants arranged in order of importance"], ["Effective demand", "desire backed by the ability and willingness to pay"],
    ["Complementary goods", "goods that are used together, such as cars and petrol"], ["Substitute goods", "goods that can be used in place of each other, such as tea and coffee"],
    ["An inferior good", "a good whose demand falls as income rises"], ["A Giffen good", "an inferior good whose demand rises as its price rises"],
    ["Equilibrium price", "the price at which quantity demanded equals quantity supplied"], ["A price ceiling", "a maximum price fixed by government"],
    ["A price floor", "a minimum price fixed by government"], ["Consumer surplus", "the difference between what a consumer is willing to pay and what they actually pay"],
    ["Marginal utility", "the extra satisfaction from consuming one more unit"], ["Division of labour", "breaking production into separate tasks done by different workers"],
    ["Economies of scale", "falling average cost as the scale of production increases"], ["Fixed cost", "cost that does not change with the level of output"],
    ["Variable cost", "cost that changes with the level of output"], ["Monopoly", "a market with a single seller of a product with no close substitutes"],
    ["Oligopoly", "a market dominated by a few large sellers"], ["Perfect competition", "a market with many buyers and sellers of an identical product"],
    ["A cartel", "a group of firms that agree to fix prices or output"], ["Inflation", "a persistent rise in the general price level"],
    ["Deflation", "a persistent fall in the general price level"], ["Stagflation", "high inflation combined with high unemployment and slow growth"],
    ["Devaluation", "a deliberate reduction in the official value of a currency"], ["Gross Domestic Product", "the total value of goods and services produced within a country in a year"],
    ["Barter", "the direct exchange of goods for goods"], ["Double coincidence of wants", "the need for each party in a trade to want what the other has"],
    ["Liquidity", "the ease with which an asset can be turned into cash"], ["Open market operations", "the buying and selling of government securities by the central bank"],
    ["A direct tax", "a tax paid directly to government by the person on whom it is imposed"], ["An indirect tax", "a tax on goods and services, paid through prices"],
    ["A progressive tax", "a tax whose rate rises as income rises"], ["A regressive tax", "a tax that takes a larger share of income from the poor than the rich"],
    ["A proportional tax", "a tax that takes the same percentage from all incomes"], ["A budget deficit", "when government expenditure exceeds revenue"],
    ["Balance of payments", "a record of a country's transactions with the rest of the world"], ["Terms of trade", "the ratio of export prices to import prices"],
    ["A tariff", "a tax on imported goods"], ["A quota", "a limit on the quantity of a good that can be imported"],
    ["An embargo", "a complete ban on trade with a country or in a product"], ["Dumping", "selling goods abroad below their cost of production"],
    ["Comparative advantage", "producing a good at a lower opportunity cost than another country"], ["Optimum population", "the population size that gives the highest income per head"],
    ["Privatisation", "the transfer of government-owned enterprises to private owners"], ["A cooperative society", "a business owned and run by its members for their mutual benefit"],
    ["A sole proprietorship", "a business owned and controlled by one person"], ["A public corporation", "a business owned and controlled by government"],
    ["Specialisation", "concentrating on producing a limited range of goods or tasks"], ["Elasticity of supply", "the responsiveness of quantity supplied to a change in price"],
    ["Capital", "man-made resources used in further production"], ["The entrepreneur", "the factor that organises the other factors and bears the risk"],
    ["Frictional unemployment", "short-term unemployment of people moving between jobs"], ["Structural unemployment", "unemployment caused by long-term changes in the structure of industries"],
    ["Seasonal unemployment", "unemployment caused by seasonal changes in demand or weather"], ["Cyclical unemployment", "unemployment caused by a downturn in the trade cycle"],
    ["Demand-pull inflation", "inflation caused by too much money chasing too few goods"], ["Cost-push inflation", "inflation caused by rising costs of production"],
    ["Hyperinflation", "an extremely rapid and out-of-control rise in prices"], ["Utility", "the satisfaction derived from consuming a good or service"],
    ["Supply", "the quantity producers are willing and able to offer for sale at a given price"], ["Excise duty", "a tax on goods produced within the country"],
    ["An ad valorem tax", "a tax charged as a percentage of the value of a good"],
    ["Mixed economy", "an economy where both private and public sectors own and control resources"], ["Command economy", "an economy where the state makes the key decisions on production"],
  ];
  qs.push(
    ...DEF.map((d) => mcq(S, "Basic concepts", `${d[0]} can best be described as`, d[1], others(DEF, d, (x) => x[1]), `${d[0]}: ${d[1]}.`, 1)),
    ...DEF.map((d) => {
      const term = d[0].replace(/^(An?|The) /, "");
      return mcq(S, "Basic concepts", `What term describes ${d[1]}?`, cap(term), others(DEF, d, (x) => cap(x[0].replace(/^(An?|The) /, ""))), `This is the definition of ${term.toLowerCase()}.`, 1);
    }),
  );

  // Factor rewards
  const REW: [string, string][] = [["land", "rent"], ["labour", "wages"], ["capital", "interest"], ["entrepreneurship", "profit"]];
  qs.push(
    ...REW.map((r) => mcq(S, "Factors of production", `The reward for ${r[0]} as a factor of production is`, r[1], [...others(REW, r, (x) => x[1]), "dividend"], `Land → rent, labour → wages, capital → interest, entrepreneur → profit.`, 1)),
    ...REW.map((r) => mcq(S, "Factors of production", `${cap(r[1])} is the reward for which factor of production?`, cap(r[0]), [...others(REW, r, (x) => cap(x[0])), "Money"], `Land → rent, labour → wages, capital → interest, entrepreneur → profit.`, 1)),
  );

  // Institutions
  const INST: [string, string, string[]][] = [
    ["Which body issues the naira and controls money supply in Nigeria?", "Central Bank of Nigeria", ["Nigerian Exchange Group", "Federal Ministry of Finance", "Nigeria Deposit Insurance Corporation"]],
    ["The organisation of oil-exporting countries that Nigeria joined in 1971 is", "OPEC", ["ECOWAS", "OECD", "WTO"]],
    ["ECOWAS was established in", "1975", ["1960", "1963", "1999"]],
    ["The 'lender of last resort' to commercial banks is the", "central bank", ["stock exchange", "development bank", "insurance company"]],
    ["A market for long-term funds and securities is the", "capital market", ["money market", "commodity market", "foreign exchange market"]],
    ["A market for short-term funds is the", "money market", ["capital market", "stock market", "labour market"]],
    ["Shares in a public limited company are bought and sold on the", "stock exchange", ["money market", "central bank", "commodity board"]],
    ["The agency that protects bank depositors in Nigeria is the", "Nigeria Deposit Insurance Corporation", ["Central Bank of Nigeria", "Securities and Exchange Commission", "Corporate Affairs Commission"]],
    ["The Securities and Exchange Commission regulates the", "capital market", ["money market", "labour market", "commodity market"]],
    ["Businesses in Nigeria are registered with the", "Corporate Affairs Commission", ["Central Bank of Nigeria", "Federal Inland Revenue Service", "Nigerian Customs Service"]],
  ];
  qs.push(...INST.map(([b, c, d]) => mcq(S, "Institutions", b, c, d, `The correct answer is: ${c}.`, 1)));

  return qs;
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
