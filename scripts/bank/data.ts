// Data Analyst path: SQL (SQQ), Excel (XLQ), Power BI PL-300 (PBI), Tableau (TBL), Statistics (STQ).
// SQL, Excel and statistics questions are generated from small random datasets and computed exactly.
import { fmt, mcq, numOpts, pick, Q, repeat, ri, shuffle } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;
const REGIONS = ["North", "South", "East", "West"], PRODUCTS = ["Tea", "Rice", "Soap", "Oil"], NAMES = ["Ada", "Ben", "Cara", "Dayo", "Eve", "Femi", "Grace", "Hana"];

// ============================================================================ SQL
type Row = { id: number; region: string; product: string; qty: number; price: number };
const table = (rows: Row[]) => "Table sales:\nid | region | product | qty | price\n" + rows.map((x) => `${x.id} | ${x.region} | ${x.product} | ${x.qty} | ${x.price}`).join("\n");
const makeRows = (): Row[] => Array.from({ length: 7 }, (_, i) => ({ id: i + 1, region: pick(REGIONS.slice(0, 3)), product: pick(PRODUCTS.slice(0, 3)), qty: ri(1, 12), price: pick([5, 8, 10, 12, 15, 20]) }));
function sqlGen(): Q[] {
  return repeat(40, () => {
    const rows = makeRows(), t = table(rows), reg = pick(REGIONS.slice(0, 3)), prod = pick(PRODUCTS.slice(0, 3));
    const kind = pick(["count", "sum", "avg", "max", "groups", "distinct", "between", "orderby"]);
    if (kind === "count") { const a = rows.filter((x) => x.region === reg).length; return mcq("SQQ", "Filtering", `${t}\n\nWhat does this return?\nSELECT COUNT(*) FROM sales WHERE region = '${reg}';`, String(a), numOpts(a, [rows.length, a + 1, Math.max(0, a - 1)]), `${a} rows have region = '${reg}'.`, 1); }
    if (kind === "sum") { const a = rows.filter((x) => x.product === prod).reduce((s, x) => s + x.qty, 0); if (!a) return null; return mcq("SQQ", "Aggregation", `${t}\n\nWhat does this return?\nSELECT SUM(qty) FROM sales WHERE product = '${prod}';`, String(a), numOpts(a, [rows.reduce((s, x) => s + x.qty, 0), rows.filter((x) => x.product === prod).length, a + 2]), `Add qty for rows where product = '${prod}': ${a}.`, 2); }
    if (kind === "avg") { const xs = rows.filter((x) => x.region === reg); if (!xs.length) return null; const a = r(xs.reduce((s, x) => s + x.price, 0) / xs.length, 2); return mcq("SQQ", "Aggregation", `${t}\n\nWhat does this return?\nSELECT AVG(price) FROM sales WHERE region = '${reg}';`, fmt(a), numOpts(a, [r(rows.reduce((s, x) => s + x.price, 0) / rows.length, 2), xs.reduce((s, x) => s + x.price, 0), xs.length]), `Average price of the ${xs.length} '${reg}' rows = ${fmt(a)}.`, 2); }
    if (kind === "max") { const a = Math.max(...rows.map((x) => x.qty * x.price)); return mcq("SQQ", "Aggregation", `${t}\n\nWhat does this return?\nSELECT MAX(qty * price) FROM sales;`, String(a), numOpts(a, [Math.max(...rows.map((x) => x.qty)), Math.max(...rows.map((x) => x.price)), rows.reduce((s, x) => s + x.qty * x.price, 0)]), `The largest qty × price in any row is ${a}.`, 2); }
    if (kind === "groups") {
      const n = pick([10, 15, 20]), present = REGIONS.slice(0, 3).filter((g) => rows.some((x) => x.region === g));
      const totals = present.map((g) => rows.filter((x) => x.region === g).reduce((s, x) => s + x.qty, 0));
      const a = totals.filter((v) => v > n).length;
      return mcq("SQQ", "Grouping", `${t}\n\nHow many rows does this return?\nSELECT region, SUM(qty) FROM sales GROUP BY region HAVING SUM(qty) > ${n};`, String(a), numOpts(a, [present.length, rows.filter((x) => x.qty > n).length, a + 1].filter((v) => v !== a)), `Totals by region: ${present.map((g, i) => `${g} ${totals[i]}`).join(", ")}. ${a} ${a === 1 ? "exceeds" : "exceed"} ${n}.`, 3);
    }
    if (kind === "distinct") { const a = new Set(rows.map((x) => x.product)).size; return mcq("SQQ", "Aggregation", `${t}\n\nWhat does this return?\nSELECT COUNT(DISTINCT product) FROM sales;`, String(a), numOpts(a, [rows.length, a + 1, Math.max(1, a - 1)]), `The distinct products are ${[...new Set(rows.map((x) => x.product))].join(", ")}.`, 1); }
    if (kind === "between") { const lo = pick([5, 8]), hi = pick([12, 15]); const a = rows.filter((x) => x.price >= lo && x.price <= hi).length; return mcq("SQQ", "Filtering", `${t}\n\nWhat does this return?\nSELECT COUNT(*) FROM sales WHERE price BETWEEN ${lo} AND ${hi};`, String(a), numOpts(a, [rows.filter((x) => x.price > lo && x.price < hi).length === a ? a + 1 : rows.filter((x) => x.price > lo && x.price < hi).length, rows.length, Math.max(0, a - 2)]), `BETWEEN includes both ends, so ${a} rows match.`, 2); }
    const sorted = [...rows].sort((a, b) => b.price - a.price || a.id - b.id); if (sorted[0].price === sorted[1].price) return null;
    return mcq("SQQ", "Sorting", `${t}\n\nWhich id does this return?\nSELECT id FROM sales ORDER BY price DESC LIMIT 1;`, String(sorted[0].id), shuffle(rows.filter((x) => x.id !== sorted[0].id)).slice(0, 3).map((x) => String(x.id)), `The highest price is ${sorted[0].price}, in row ${sorted[0].id}.`, 1);
  });
}
function joinGen(): Q[] {
  return repeat(10, () => {
    const cust = shuffle(NAMES).slice(0, 5).map((n, i) => ({ id: i + 1, name: n }));
    const orders = Array.from({ length: ri(4, 7) }, (_, i) => ({ oid: 100 + i, cid: ri(1, 6) })); // cid 6 has no customer
    const inner = orders.filter((o) => cust.some((c) => c.id === o.cid)).length;
    const left = cust.reduce((s, c) => s + Math.max(1, orders.filter((o) => o.cid === c.id).length), 0);
    const kind = pick(["INNER", "LEFT"]), a = kind === "INNER" ? inner : left;
    const body = `customers:\nid | name\n${cust.map((c) => `${c.id} | ${c.name}`).join("\n")}\n\norders:\norder_id | customer_id\n${orders.map((o) => `${o.oid} | ${o.cid}`).join("\n")}\n\nHow many rows does this return?\nSELECT * FROM customers c ${kind} JOIN orders o ON o.customer_id = c.id;`;
    return mcq("SQQ", "Joins", body, String(a), numOpts(a, [kind === "INNER" ? left : inner, orders.length, cust.length].filter((v) => v !== a)),
      kind === "INNER" ? `INNER JOIN keeps only orders whose customer exists: ${inner} rows.` : `LEFT JOIN keeps every customer; customers with no orders appear once with NULLs: ${left} rows.`, 3);
  });
}
const SQQ: F[] = [
  ["Concepts", "In what order does SQL logically process these clauses?", "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY", ["SELECT → FROM → WHERE → ORDER BY", "WHERE → FROM → SELECT → GROUP BY", "ORDER BY → SELECT → FROM → WHERE"], "That is why you can't use a SELECT alias in WHERE."],
  ["Concepts", "What is the difference between WHERE and HAVING?", "WHERE filters rows before grouping; HAVING filters groups after aggregation", ["They are identical", "HAVING filters rows before grouping", "WHERE can only be used with joins"], "Use HAVING with aggregate conditions like SUM(qty) > 10."],
  ["Concepts", "How do you correctly find rows where email has no value?", "WHERE email IS NULL", ["WHERE email = NULL", "WHERE email == ''", "WHERE NULL(email)"], "Comparisons with = never match NULL."],
  ["Concepts", "COUNT(column) differs from COUNT(*) because COUNT(column)", "ignores NULL values in that column", ["counts NULLs twice", "always returns 1", "only works on numbers"], "COUNT(*) counts every row."],
  ["Concepts", "UNION differs from UNION ALL because UNION", "removes duplicate rows", ["keeps duplicates", "joins columns side by side", "sorts nothing"], "UNION ALL is faster because it skips de-duplication."],
  ["Concepts", "A LEFT JOIN returns", "all rows from the left table, with matching right-table rows or NULLs", ["only matching rows", "all rows from the right table only", "no NULLs ever"], "An INNER JOIN returns only matches."],
  ["Concepts", "Which window function numbers rows within each group without gaps?", "ROW_NUMBER() OVER (PARTITION BY …)", ["COUNT(*)", "GROUP BY", "DISTINCT"], "RANK() can leave gaps after ties."],
  ["Concepts", "A primary key must be", "unique and not NULL", ["text only", "repeated across rows", "optional"], "It identifies each row."],
  ["Concepts", "A CTE is defined with", "WITH name AS (SELECT …)", ["CREATE VIEW only", "DECLARE TABLE", "TEMP JOIN"], "Common table expressions make queries easier to read."],
];

// ============================================================================ Excel
function excelGen(): Q[] {
  return repeat(36, () => {
    const names = shuffle(NAMES).slice(0, 5), regs = names.map(() => pick(REGIONS.slice(0, 3))), vals = names.map(() => ri(3, 30));
    const grid = `A: Name · B: Region · C: Sales\n${names.map((n, i) => `Row ${i + 2}: ${n} · ${regs[i]} · ${vals[i]}`).join("\n")}`;
    const kind = pick(["sumif", "countif", "averageif", "xlookup", "if", "max", "left", "round", "countifs"]);
    const reg = pick(REGIONS.slice(0, 3)), th = pick([10, 15, 20]);
    if (kind === "sumif") { const a = vals.filter((_, i) => regs[i] === reg).reduce((s, v) => s + v, 0); return mcq("XLQ", "Functions", `${grid}\n\nWhat does =SUMIF(B2:B6,"${reg}",C2:C6) return?`, String(a), numOpts(a, [vals.reduce((s, v) => s + v, 0), regs.filter((x) => x === reg).length, a + 3]), `Add C where B is "${reg}": ${a}.`, 2); }
    if (kind === "countif") { const a = vals.filter((v) => v > th).length; return mcq("XLQ", "Functions", `${grid}\n\nWhat does =COUNTIF(C2:C6,">${th}") return?`, String(a), numOpts(a, [vals.filter((v) => v >= th).length === a ? a + 1 : vals.filter((v) => v >= th).length, 5, Math.max(0, a - 1)]), `${a} values are greater than ${th}.`, 1); }
    if (kind === "countifs") { const a = vals.filter((v, i) => v > th && regs[i] === reg).length; return mcq("XLQ", "Functions", `${grid}\n\nWhat does =COUNTIFS(B2:B6,"${reg}",C2:C6,">${th}") return?`, String(a), numOpts(a, [regs.filter((x) => x === reg).length, vals.filter((v) => v > th).length, a + 1].filter((v) => v !== a)), `Rows that are "${reg}" AND over ${th}: ${a}.`, 2); }
    if (kind === "averageif") { const xs = vals.filter((_, i) => regs[i] === reg); if (!xs.length) return null; const a = r(xs.reduce((s, v) => s + v, 0) / xs.length, 2); return mcq("XLQ", "Functions", `${grid}\n\nWhat does =AVERAGEIF(B2:B6,"${reg}",C2:C6) return?`, fmt(a), numOpts(a, [r(vals.reduce((s, v) => s + v, 0) / 5, 2), xs.reduce((s, v) => s + v, 0), xs.length]), `Average of C where B is "${reg}" = ${fmt(a)}.`, 2); }
    if (kind === "xlookup") { const i = ri(0, 4); return mcq("XLQ", "Lookups", `${grid}\n\nWhat does =XLOOKUP("${names[i]}",A2:A6,C2:C6) return?`, String(vals[i]), [...new Set(vals.filter((_, j) => j !== i))].filter((v) => v !== vals[i]).slice(0, 3).map(String), `XLOOKUP finds "${names[i]}" in A and returns the matching value in C: ${vals[i]}.`, 1); }
    if (kind === "if") { const i = ri(0, 4), a = vals[i] >= th ? "High" : "Low"; return mcq("XLQ", "Logic", `${grid}\n\nRow ${i + 2} contains =IF(C${i + 2}>=${th},"High","Low"). What does it show?`, a, [a === "High" ? "Low" : "High", "TRUE", "#VALUE!"], `C${i + 2} is ${vals[i]}, which is ${vals[i] >= th ? "at least" : "below"} ${th}.`, 1); }
    if (kind === "max") { const a = Math.max(...vals); return mcq("XLQ", "Functions", `${grid}\n\nWhat does =MAX(C2:C6) return?`, String(a), numOpts(a, [Math.min(...vals), vals.reduce((s, v) => s + v, 0), vals[0]]), `The largest value in C2:C6 is ${a}.`, 1); }
    if (kind === "left") { const n = pick(names), k = pick([2, 3]); const a = n.slice(0, k); return mcq("XLQ", "Text", `What does =LEFT("${n}",${k}) return?`, a, [n.slice(-k), n.slice(1, 1 + k), n].filter((x) => x !== a), `LEFT takes the first ${k} characters.`, 1); }
    const x = r(ri(1000, 9999) / 100, 2), d = pick([0, 1]); const a = r(x, d);
    return mcq("XLQ", "Functions", `What does =ROUND(${x},${d}) return?`, fmt(a), [fmt(Math.floor(x * 10 ** d) / 10 ** d) === fmt(a) ? fmt(r(a + 1 / 10 ** d, d)) : fmt(Math.floor(x * 10 ** d) / 10 ** d), fmt(x), fmt(Math.round(x))].filter((v) => v !== fmt(a)), `Rounding ${x} to ${d} decimal place${d === 1 ? "" : "s"} gives ${fmt(a)}.`, 1);
  });
}
const XLQ: F[] = [
  ["References", "Which reference stays fixed when a formula is copied anywhere?", "$A$1", ["A1", "A$1", "$A1"], "Dollar signs lock the column and row."],
  ["Lookups", "One advantage of XLOOKUP over VLOOKUP is that XLOOKUP", "can return values from columns to the left of the lookup column", ["only works on numbers", "requires sorted data", "can't do exact matches"], "It also defaults to an exact match."],
  ["Lookups", "In VLOOKUP, the last argument FALSE means", "exact match", ["approximate match", "case-sensitive match", "return blank"], "TRUE (approximate) needs sorted data."],
  ["Errors", "Which function returns a chosen value when a formula errors?", "IFERROR", ["ISBLANK", "IFS", "ERRORTYPE"], "For example =IFERROR(VLOOKUP(…),\"Not found\")."],
  ["Errors", "The #DIV/0! error means", "a formula divided by zero or an empty cell", ["text was found", "a name is unknown", "a reference was deleted"], "#REF! means an invalid reference; #NAME? means an unknown function or name."],
  ["Analysis", "Which tool summarises large data by dragging fields into rows, columns and values?", "PivotTable", ["Flash Fill", "Data validation", "Goal Seek"], "PivotCharts visualise them."],
  ["Analysis", "Which feature restricts what users can enter in a cell, such as a dropdown list?", "Data validation", ["Conditional formatting", "Freeze panes", "Text to columns"], "It helps keep data clean."],
  ["Analysis", "Which tool imports, cleans and reshapes data with repeatable steps?", "Power Query", ["Goal Seek", "Sparklines", "Scenario Manager"], "Each step is recorded and can be refreshed."],
  ["Analysis", "COUNTA differs from COUNT because COUNTA", "counts all non-empty cells, including text", ["counts only numbers", "counts blank cells", "adds up values"], "COUNTBLANK counts empty cells."],
  ["Exam", "Microsoft's Excel Associate certification exam is", "MO-200", ["PL-300", "AZ-900", "DP-900"], "MO-201 is Excel Expert."],
];

// ============================================================================ Power BI PL-300
const PBI: F[] = [
  ["Modelling", "Power BI models work best with which schema?", "Star schema (fact tables linked to dimension tables)", ["One huge flat table only", "Snowflake with no relationships", "Random tables"], "It is simpler and faster."],
  ["Modelling", "A fact table usually contains", "numeric measurements of events, such as sales amounts", ["descriptive attributes like product names only", "only dates", "report visuals"], "Dimension tables describe the facts."],
  ["Modelling", "The most common relationship cardinality between a dimension and a fact table is", "one-to-many", ["many-to-many", "one-to-one", "none"], "The dimension is on the 'one' side."],
  ["Modelling", "A date table should be marked as a date table to", "enable time intelligence functions reliably", ["hide it", "make it bigger", "turn off relationships"], "It needs a continuous column of unique dates."],
  ["DAX", "What is the difference between a measure and a calculated column?", "A measure is calculated at query time in the filter context; a calculated column is stored row by row", ["They are identical", "Measures are stored in the table", "Calculated columns respond to slicers instantly without storage"], "Prefer measures for aggregations."],
  ["DAX", "Which DAX function changes the filter context of a calculation?", "CALCULATE", ["SUMX only", "RELATED", "FORMAT"], "For example CALCULATE(SUM(Sales[Amount]), Region[Name] = \"North\")."],
  ["DAX", "Which DAX function returns a value from the 'one' side of a relationship into the 'many' side?", "RELATED", ["RELATEDTABLE", "LOOKUPVALUE only", "ALL"], "RELATEDTABLE goes the other way."],
  ["DAX", "SUMX differs from SUM because SUMX", "evaluates an expression row by row and then adds the results", ["only adds a single column", "ignores filters", "returns text"], "It is an iterator."],
  ["DAX", "ALL() in DAX is used to", "remove filters from a table or column", ["add filters", "sort data", "create relationships"], "Useful for percentage-of-total calculations."],
  ["Power Query", "Power Query transformations are written in which language?", "M", ["DAX", "Python only", "SQL only"], "The Advanced Editor shows the M code."],
  ["Power Query", "Turning many monthly columns into rows of month and value is", "unpivoting", ["pivoting", "merging", "appending"], "Unpivot creates a tidy, long table."],
  ["Power Query", "Combining two tables with the same columns, one under the other, is", "append", ["merge", "join on keys only", "pivot"], "Merge joins tables side by side on a key."],
  ["Storage", "Import mode differs from DirectQuery because Import", "loads a copy of the data into the model for fast queries", ["queries the source live every time", "can't be refreshed", "has no size limits"], "DirectQuery sends queries to the source live."],
  ["Service", "To refresh data from an on-premises SQL Server in the Power BI service, you need", "an on-premises data gateway", ["a VPN on every PC", "Power Query in Excel", "nothing extra"], "The gateway connects the cloud service to local data."],
  ["Security", "Row-level security (RLS) is used to", "restrict which rows of data each user can see", ["hide whole reports", "encrypt the file", "speed up refresh"], "Roles use DAX filter expressions."],
  ["Service", "A Power BI app is used to", "distribute a packaged set of reports and dashboards to many users", ["edit DAX", "build data models", "run Python"], "Apps are published from workspaces."],
  ["Visuals", "Which visual best shows a trend over time?", "Line chart", ["Pie chart", "Card", "Table"], "Use bar or column charts for comparing categories."],
  ["Exam", "The PL-300 exam leads to which certification?", "Microsoft Certified: Power BI Data Analyst Associate", ["Azure Administrator", "Excel Expert", "Data Engineer Associate"], "The passing score is 700."],
];

// ============================================================================ Tableau
const TBL: F[] = [
  ["Fields", "In Tableau, blue fields are", "discrete", ["continuous", "calculated only", "hidden"], "Green fields are continuous."],
  ["Fields", "Dimensions in Tableau usually contain", "qualitative values like names, dates or categories", ["only numbers to aggregate", "only calculations", "colours"], "Measures contain quantitative values that are aggregated."],
  ["Calculations", "Which LOD expression computes a value at a specified level regardless of the view?", "FIXED", ["INCLUDE", "EXCLUDE", "WINDOW_SUM"], "INCLUDE and EXCLUDE adjust relative to the view's level."],
  ["Calculations", "Table calculations such as running total are computed", "on the data already in the view", ["in the data source", "before filters are applied", "only in extracts"], "Change 'Compute Using' to control direction."],
  ["Filters", "Which Tableau filter is applied first in the order of operations?", "Extract filters", ["Dimension filters", "Measure filters", "Table calculation filters"], "Then data source, context, dimension, measure and table calc filters."],
  ["Filters", "Context filters are used to", "create an independent filter that other filters depend on", ["change colours", "sort data", "publish workbooks"], "They also feed Top N and FIXED calculations."],
  ["Data", "A Tableau extract (.hyper) is", "a saved snapshot of data for fast performance", ["a live connection", "a dashboard", "a calculated field"], "Live connections query the source directly."],
  ["Data", "Relationships (the 'noodle') in Tableau's data model differ from joins because they", "keep tables separate and combine them at the right level for each view", ["always duplicate rows", "can only join two tables", "are only for extracts"], "Joins merge tables into one before analysis."],
  ["Data", "Data blending combines data", "from different sources at the aggregated level, using a primary and secondary source", ["only within one database", "row by row before aggregation", "by stacking tables"], "Linking fields connect the sources."],
  ["Visuals", "The Marks card controls", "colour, size, label, detail and tooltip for the marks in a view", ["data refresh", "user permissions", "the data source"], "It is central to building visuals."],
  ["Visuals", "Which chart type compares a measure against a target with bars?", "Bullet graph", ["Pie chart", "Tree map", "Scatter plot"], "Show Me suggests charts based on your fields."],
  ["Dashboards", "Dashboard actions let users", "filter or highlight other views by interacting with one view", ["write SQL", "change licences", "edit extracts"], "Filter, highlight, URL, parameter and set actions exist."],
  ["Exam", "The Tableau Desktop Specialist exam has", "45 questions in 60 minutes", ["100 questions in 3 hours", "10 questions in 10 minutes", "a hands-on project only"], "It is an entry-level certification."],
];

// ============================================================================ Statistics
function statsGen(): Q[] {
  return repeat(30, () => {
    const xs = Array.from({ length: pick([5, 6, 7]) }, () => ri(2, 40));
    const sorted = [...xs].sort((a, b) => a - b), n = xs.length, sum = xs.reduce((s, v) => s + v, 0);
    const kind = pick(["mean", "median", "range", "pct", "z", "weighted"]);
    if (kind === "mean") { const a = r(sum / n, 2); return mcq("STQ", "Descriptive statistics", `What is the mean of ${xs.join(", ")}?`, fmt(a), numOpts(a, [sorted[Math.floor(n / 2)], sum, r(sum / (n - 1), 2)]), `${sum} ÷ ${n} = ${fmt(a)}.`, 1); }
    if (kind === "median") { const a = n % 2 ? sorted[(n - 1) / 2] : r((sorted[n / 2 - 1] + sorted[n / 2]) / 2, 1); return mcq("STQ", "Descriptive statistics", `What is the median of ${xs.join(", ")}?`, fmt(a), numOpts(a, [r(sum / n, 1), xs[Math.floor(n / 2)], sorted[n - 1]]), `Sorted: ${sorted.join(", ")}. The median is ${fmt(a)}.`, 2); }
    if (kind === "range") { const a = sorted[n - 1] - sorted[0]; return mcq("STQ", "Descriptive statistics", `What is the range of ${xs.join(", ")}?`, String(a), numOpts(a, [sorted[n - 1], sum, sorted[n - 2] - sorted[1]]), `${sorted[n - 1]} − ${sorted[0]} = ${a}.`, 1); }
    if (kind === "pct") { const a0 = pick([200, 250, 400, 500, 800]), a1 = a0 + pick([-100, -50, 50, 100, 150, 200]); const a = r(((a1 - a0) / a0) * 100, 1); return mcq("STQ", "Percentages", `Monthly sales went from ${a0} to ${a1}. What is the percentage change?`, fmt(a, "%"), numOpts(a, [r(((a1 - a0) / a1) * 100, 1), a1 - a0, r((a1 / a0) * 100, 1)], "%", true), `(${a1} − ${a0}) ÷ ${a0} × 100 = ${fmt(a)}%.`, 2); }
    if (kind === "z") { const mu = pick([50, 60, 70]), sd = pick([5, 8, 10]), x = mu + pick([-2, -1, 1, 1.5, 2, 3]) * sd; const a = r((x - mu) / sd, 2); return mcq("STQ", "Distributions", `Scores have a mean of ${mu} and a standard deviation of ${sd}. What is the z-score of ${x}?`, fmt(a), numOpts(a, [x - mu, r((x - mu) / (sd * sd), 2), r(x / sd, 2)], "", true), `z = (${x} − ${mu}) ÷ ${sd} = ${fmt(a)}.`, 2); }
    const w = [pick([20, 30]), pick([30, 40])], s = [ri(50, 90), ri(50, 90)], w3 = 100 - w[0] - w[1], s3 = ri(50, 90);
    const a = r((w[0] * s[0] + w[1] * s[1] + w3 * s3) / 100, 1);
    return mcq("STQ", "Descriptive statistics", `A course grade weights coursework ${w[0]}% (score ${s[0]}), a test ${w[1]}% (score ${s[1]}) and the exam ${w3}% (score ${s3}). What is the weighted average?`, fmt(a), numOpts(a, [r((s[0] + s[1] + s3) / 3, 1), s3, r((s[0] + s[1]) / 2, 1)]), `(${w[0]}×${s[0]} + ${w[1]}×${s[1]} + ${w3}×${s3}) ÷ 100 = ${fmt(a)}.`, 2);
  });
}
const STQ: F[] = [
  ["Concepts", "In a right-skewed distribution (a long tail of high values), the mean is usually", "greater than the median", ["less than the median", "equal to the median", "zero"], "Outliers pull the mean towards the tail."],
  ["Concepts", "For skewed data like incomes, which average is usually more representative?", "Median", ["Mean", "Range", "Sum"], "The median is resistant to outliers."],
  ["Concepts", "In a normal distribution, about what percentage of values lie within one standard deviation of the mean?", "68%", ["50%", "95%", "99.7%"], "About 95% lie within two and 99.7% within three (the empirical rule)."],
  ["Concepts", "A strong correlation between two variables shows that", "they move together, but not that one causes the other", ["one definitely causes the other", "they are unrelated", "the data is wrong"], "Correlation is not causation."],
  ["Concepts", "A correlation coefficient of −0.9 indicates", "a strong negative relationship", ["no relationship", "a weak positive relationship", "a perfect positive relationship"], "Values near −1 or +1 are strong."],
  ["Concepts", "A p-value below 0.05 usually means", "the result is statistically significant at the 5% level", ["the hypothesis is proven true", "the data is invalid", "the effect is large"], "It does not measure the size of an effect."],
  ["Concepts", "Surveying only people who visit your website to learn about all customers risks", "sampling bias", ["overfitting", "a type II error", "perfect accuracy"], "Random sampling reduces bias."],
  ["Concepts", "An A/B test compares", "two versions to see which performs better on a chosen metric", ["two databases", "two employees", "two charts' colours only"], "Users are randomly assigned to each version."],
];

export function dataBanks(): Record<string, Q[]> {
  return {
    SQQ: [...facts("SQQ", SQQ), ...sqlGen(), ...joinGen()],
    XLQ: [...facts("XLQ", XLQ), ...excelGen()],
    PBI: facts("PBI", PBI),
    TBL: facts("TBL", TBL),
    STQ: [...facts("STQ", STQ), ...statsGen()],
  };
}
