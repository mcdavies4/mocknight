// Second batch: Power BI PL-300 (PBI) and Tableau (TBL) — more concepts plus computed DAX / LOD questions.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;
const REG = ["North", "South", "East"], CAT = ["Food", "Home", "Toys"];
type Row = { region: string; cat: string; amount: number; units: number };
const mk = (): Row[] => Array.from({ length: 6 }, () => ({ region: pick(REG), cat: pick(CAT), amount: pick([100, 150, 200, 250, 300, 400, 500]), units: ri(1, 9) }));
const show = (name: string, rows: Row[], a = "Region", b = "Category") => `${name}:\n${a} | ${b} | Amount | Units\n` + rows.map((x) => `${x.region} | ${x.cat} | ${x.amount} | ${x.units}`).join("\n");

const PBI: F[] = [
  ["DAX", "Which DAX function divides safely and returns BLANK (or an alternate result) when the denominator is zero?", "DIVIDE", ["QUOTIENT", "MOD", "SWITCH"], "DIVIDE(numerator, denominator, alternate) avoids errors."],
  ["DAX", "Which function lets a measure ignore filters on one column but keep all other filters?", "ALL(Table[Column]) inside CALCULATE (or REMOVEFILTERS)", ["FILTER(ALL(Table))", "VALUES", "SELECTEDVALUE"], "Useful for share-of-total calculations."],
  ["DAX", "Which function returns the value of a column when exactly one value is selected?", "SELECTEDVALUE", ["VALUES", "DISTINCT", "EARLIER"], "It returns BLANK (or an alternate) when there are several."],
  ["DAX", "Which time intelligence function calculates a year-to-date total?", "TOTALYTD (or DATESYTD inside CALCULATE)", ["SAMEPERIODLASTYEAR only", "DATEADD only", "PARALLELPERIOD only"], "It needs a proper date table."],
  ["DAX", "Which function shifts dates to compare with the same period last year?", "SAMEPERIODLASTYEAR", ["TOTALYTD", "CALENDARAUTO", "EOMONTH"], "Often used for year-on-year growth."],
  ["DAX", "Variables in DAX are declared with", "VAR … RETURN", ["LET … IN", "DIM … AS", "SET … ="], "Variables make measures faster and easier to read."],
  ["DAX", "What is 'context transition'?", "When CALCULATE turns the current row context into a filter context", ["Changing the report theme", "Moving a visual to another page", "Refreshing a dataset"], "It happens when a measure is used inside an iterator or calculated column."],
  ["Modelling", "Cross-filter direction 'Both' on a relationship means", "filters flow in both directions between the tables", ["the relationship is inactive", "the tables are merged", "only one table can be filtered"], "Use it carefully; it can cause ambiguity."],
  ["Modelling", "An inactive relationship can be used in a measure with", "USERELATIONSHIP inside CALCULATE", ["RELATED", "LOOKUPVALUE", "TREATAS only"], "Common for multiple date columns (order date, ship date)."],
  ["Modelling", "A role-playing dimension is", "one dimension table used for several relationships, such as Date for order date and ship date", ["a table of security roles", "a hidden table", "a calculated column"], "Only one of the relationships can be active."],
  ["Modelling", "Why should you avoid many high-cardinality calculated columns?", "They increase model size and memory use", ["They can't be used in visuals", "They break DAX", "They disable refresh"], "Prefer measures or Power Query columns where possible."],
  ["Power Query", "In Power Query, 'Merge queries' is used to", "join two tables on matching key columns", ["stack tables vertically", "remove duplicates", "change data types"], "Join kinds include left outer, inner and full outer."],
  ["Power Query", "Query folding means", "Power Query steps are translated into the data source's own query language", ["queries are deleted", "visuals are folded away", "data is compressed"], "Folding improves refresh performance."],
  ["Power Query", "Which Power Query feature creates a profile of column values, errors and empties?", "Column quality and column distribution (data profiling)", ["Bookmarks", "Drillthrough", "Quick measures"], "Found on the View tab."],
  ["Visuals", "Drillthrough lets users", "right-click a data point to open a detail page filtered to it", ["export to Excel only", "edit the data model", "change the theme"], "Set drillthrough fields on the target page."],
  ["Visuals", "Bookmarks are used to", "save a report state, such as filters and visible visuals", ["store data", "create relationships", "schedule refresh"], "Often used with buttons for navigation."],
  ["Visuals", "Which visual shows how a value changes from a start to an end value through positive and negative steps?", "Waterfall chart", ["Pie chart", "Gauge", "Card"], "Good for profit bridges."],
  ["Service", "Scheduled refresh in the Power BI service is configured on the", "semantic model (dataset)", ["report page", "dashboard tile", "visual"], "Pro licences allow up to 8 refreshes a day."],
  ["Service", "Which workspace role can publish content but not manage access?", "Contributor", ["Admin", "Viewer", "Member only"], "Admins manage access; Members can share; Viewers can only view."],
  ["Service", "A dashboard in the Power BI service is", "a single canvas of pinned tiles from one or more reports", ["the same as a multi-page report", "a data model", "a Power Query step"], "Dashboards are only in the service, not Desktop."],
  ["Performance", "Which tool records how long each visual's DAX query takes?", "Performance analyzer", ["Q&A", "Quick insights", "Sync slicers"], "Use it to find slow visuals."],
  ["Security", "Static RLS differs from dynamic RLS because dynamic RLS", "filters data using the signed-in user, such as USERPRINCIPALNAME()", ["uses fixed values for every role", "hides whole pages", "encrypts the dataset"], "One dynamic role can serve many users."],
];

function daxGen(): Q[] {
  return repeat(20, () => {
    const rows = mk(), t = show("Sales", rows), reg = pick(REG), cat = pick(CAT);
    const kind = pick(["calc", "divide", "sumx", "count", "pct"]);
    if (kind === "calc") { const a = rows.filter((x) => x.region === reg).reduce((s, x) => s + x.amount, 0); return mcq("PBI", "DAX results", `${t}\n\nWhat does this measure return in a card with no other filters?\nCALCULATE(SUM(Sales[Amount]), Sales[Region] = "${reg}")`, fmt(a), numOpts(a, [rows.reduce((s, x) => s + x.amount, 0), rows.filter((x) => x.region === reg).length, a + 100]), `Sum of Amount where Region is ${reg}: ${a}.`, 2); }
    if (kind === "sumx") { const a = rows.reduce((s, x) => s + x.amount * x.units, 0); return mcq("PBI", "DAX results", `${t}\n\nWhat does this measure return?\nSUMX(Sales, Sales[Amount] * Sales[Units])`, fmt(a), numOpts(a, [rows.reduce((s, x) => s + x.amount, 0) * rows.reduce((s, x) => s + x.units, 0), rows.reduce((s, x) => s + x.amount, 0), rows.reduce((s, x) => s + x.units, 0)]), `SUMX multiplies row by row, then adds: ${a}.`, 3); }
    if (kind === "count") { const a = rows.filter((x) => x.cat === cat).length; return mcq("PBI", "DAX results", `${t}\n\nWhat does this measure return?\nCALCULATE(COUNTROWS(Sales), Sales[Category] = "${cat}")`, String(a), numOpts(a, [rows.length, rows.filter((x) => x.cat === cat).reduce((s, x) => s + x.units, 0), a + 1]), `${a} rows have Category ${cat}.`, 1); }
    if (kind === "divide") { const den = rows.filter((x) => x.region === reg).reduce((s, x) => s + x.units, 0), num = rows.filter((x) => x.region === reg).reduce((s, x) => s + x.amount, 0); if (!den) return null; const a = r(num / den, 2); return mcq("PBI", "DAX results", `${t}\n\nFiltered to Region = ${reg}, what does this measure return?\nDIVIDE(SUM(Sales[Amount]), SUM(Sales[Units]))`, fmt(a), numOpts(a, [r(den / num, 3), num, den]), `${num} ÷ ${den} = ${fmt(a)}.`, 2); }
    const part = rows.filter((x) => x.region === reg).reduce((s, x) => s + x.amount, 0), total = rows.reduce((s, x) => s + x.amount, 0); if (!part) return null;
    const a = r((part / total) * 100, 1);
    return mcq("PBI", "DAX results", `${t}\n\nIn a table visual, the row for Region = ${reg} shows this measure as a percentage. What value appears?\nDIVIDE(SUM(Sales[Amount]), CALCULATE(SUM(Sales[Amount]), ALL(Sales[Region])))`, fmt(a, "%"), numOpts(a, [100, r((part / (total - part)) * 100, 1), r(100 / 3, 1)], "%"), `ALL removes the region filter from the denominator: ${part} ÷ ${total} = ${fmt(a)}%.`, 3);
  });
}

const TBL: F[] = [
  ["Fields", "Dragging a continuous date to Columns creates", "a continuous timeline axis", ["separate headers for each year", "a filter only", "a parameter"], "A discrete date creates headers."],
  ["Fields", "A dimension placed on the Detail mark", "splits the marks without changing colour or size", ["filters out data", "creates a new sheet", "sorts the view"], "It increases the level of detail."],
  ["Calculations", "Which function returns the running total of SUM(Sales) along the table?", "RUNNING_SUM(SUM([Sales]))", ["TOTAL(SUM([Sales]))", "WINDOW_AVG", "{FIXED : SUM([Sales])}"], "It is a table calculation."],
  ["Calculations", "Which function ranks values in the view?", "RANK()", ["INDEX() only", "SIZE()", "ATTR()"], "RANK_DENSE and RANK_UNIQUE are variants."],
  ["Calculations", "{INCLUDE [Customer] : SUM([Sales])} computes", "a value at a finer level (including Customer), then aggregates it to the view", ["a value ignoring all dimensions", "a value excluding Customer", "a table calculation"], "EXCLUDE removes a dimension from the view's level."],
  ["Calculations", "A calculated field using IF [Profit] > 0 THEN \"Profit\" ELSE \"Loss\" END returns", "a string category for each row", ["a number", "a date", "a parameter"], "It can be used on Colour."],
  ["Calculations", "ZN([Sales]) returns", "0 when Sales is null, otherwise Sales", ["the zone of Sales", "null always", "the absolute value"], "Useful for filling gaps in calculations."],
  ["Parameters", "A parameter in Tableau is", "a user-controlled value that can drive calculations, filters or reference lines", ["a data source", "a fixed filter", "a dashboard size"], "Show the parameter control to let users change it."],
  ["Sets", "A set in Tableau is", "a custom group of members of a dimension defined by conditions or selection", ["a type of chart", "a data extract", "a colour palette"], "Sets show IN/OUT membership."],
  ["Groups", "Grouping combines", "several dimension members into a higher-level category", ["two data sources", "two sheets", "two parameters"], "For example grouping small countries into 'Other'."],
  ["Visuals", "Dual axis lets you", "show two measures with separate axes in one chart", ["join two tables", "publish twice", "filter twice"], "Synchronise axes when the scales match."],
  ["Visuals", "Reference lines are used to", "show averages, targets or constants on an axis", ["filter data", "connect data sources", "rename fields"], "Bands and distributions are similar options."],
  ["Visuals", "Which chart best shows the relationship between two measures for many items?", "Scatter plot", ["Pie chart", "Text table", "Bullet graph"], "Add a trend line to show correlation."],
  ["Dashboards", "A dashboard's 'Fixed' size is useful because", "the layout looks the same on every screen", ["it hides filters", "it refreshes faster", "it can't be published"], "Automatic size can rearrange or crop content."],
  ["Publishing", "Tableau Public workbooks are", "saved publicly and visible to anyone", ["private by default", "only on your computer", "encrypted extracts"], "Use Tableau Cloud or Server for private sharing."],
  ["Data", "When a data source has a field stored as text but containing numbers, you should", "change its data type to number", ["delete it", "use it as a parameter", "hide it"], "Correct types let Tableau aggregate properly."],
  ["Data", "A left join between Orders and Returns keeps", "all orders, with return details where they exist", ["only returned orders", "only returns", "no orders without returns"], "Unmatched returns columns are null."],
];

function lodGen(): Q[] {
  return repeat(14, () => {
    const rows = mk(), t = show("Data", rows);
    const kind = pick(["fixed", "total", "avg", "count"]);
    if (kind === "fixed") { const i = ri(0, rows.length - 1), reg = rows[i].region, a = rows.filter((x) => x.region === reg).reduce((s, x) => s + x.amount, 0); return mcq("TBL", "LOD results", `${t}\n\nFor a row where Region is ${reg}, what does {FIXED [Region] : SUM([Amount])} return?`, fmt(a), numOpts(a, [rows[i].amount, rows.reduce((s, x) => s + x.amount, 0), rows.filter((x) => x.region === reg).length]), `FIXED sums Amount for all ${reg} rows: ${a}.`, 3); }
    if (kind === "total") { const a = rows.reduce((s, x) => s + x.amount, 0); return mcq("TBL", "LOD results", `${t}\n\nWhat does {FIXED : SUM([Amount])} return?`, fmt(a), numOpts(a, [Math.max(...rows.map((x) => x.amount)), rows.length, a / 2]), `A FIXED expression with no dimension returns the grand total: ${a}.`, 2); }
    if (kind === "avg") { const cat = pick(CAT), xs = rows.filter((x) => x.cat === cat); if (!xs.length) return null; const a = r(xs.reduce((s, x) => s + x.amount, 0) / xs.length, 2); return mcq("TBL", "Aggregation", `${t}\n\nWith Category on Rows and AVG([Amount]) on Text, what value shows for ${cat}?`, fmt(a), numOpts(a, [xs.reduce((s, x) => s + x.amount, 0), r(rows.reduce((s, x) => s + x.amount, 0) / rows.length, 2), xs.length]), `Average of the ${xs.length} ${cat} rows = ${fmt(a)}.`, 2); }
    const a = new Set(rows.map((x) => x.region)).size;
    return mcq("TBL", "Aggregation", `${t}\n\nWhat does COUNTD([Region]) return?`, String(a), numOpts(a, [rows.length, a + 1, Math.max(1, a - 1)]), `COUNTD counts distinct values: ${[...new Set(rows.map((x) => x.region))].join(", ")}.`, 1);
  });
}

export function dataBanks2(): Record<string, Q[]> {
  return { PBI: [...facts("PBI", PBI), ...daxGen()], TBL: [...facts("TBL", TBL), ...lodGen()] };
}
