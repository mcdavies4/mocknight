// Ethiopia Grade 12 social science stream: History (HIS) and Geography (GEO).
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];

const HIST: F[] = [
  // Ancient & medieval Ethiopia
  ["Ancient Ethiopia", "Which ancient kingdom had its capital at Aksum?", "The Aksumite Kingdom", ["The Zagwe Kingdom", "The Kingdom of Kush", "The Adal Sultanate"], "Aksum was a major trading power linking Africa, Arabia and the Mediterranean."],
  ["Ancient Ethiopia", "Which Aksumite king adopted Christianity in the 4th century AD?", "Ezana", ["Kaleb", "Lalibela", "Zara Yaqob"], "Christianity became the state religion under King Ezana."],
  ["Ancient Ethiopia", "Aksum is famous for its tall carved stone monuments called", "stelae (obelisks)", ["pyramids", "ziggurats", "rock-hewn churches"], "The stelae marked royal tombs."],
  ["Ancient Ethiopia", "The Aksumites developed a written script called", "Ge'ez", ["Hieroglyphics", "Cuneiform", "Tifinagh"], "Ge'ez is still the liturgical language of the Ethiopian Orthodox Church."],
  ["Ancient Ethiopia", "Which Red Sea port was important to the trade of Aksum?", "Adulis", ["Mombasa", "Zeila", "Massawa only from 1900"], "Adulis connected Aksum to Red Sea and Indian Ocean trade."],
  ["Medieval Ethiopia", "The rock-hewn churches of Lalibela were built under which dynasty?", "The Zagwe dynasty", ["The Solomonic dynasty", "The Aksumite dynasty", "The Gondarine dynasty"], "They are named after King Lalibela."],
  ["Medieval Ethiopia", "In 1270 the 'Solomonic' dynasty was restored by", "Yekuno Amlak", ["Lalibela", "Ezana", "Tewodros II"], "He replaced the Zagwe dynasty."],
  ["Medieval Ethiopia", "Which leader of the Adal Sultanate invaded the Christian highlands in the 16th century?", "Ahmad ibn Ibrahim al-Ghazi (Ahmad Gragn)", ["Menelik I", "Yohannes IV", "Ras Alula"], "He won the Battle of Shimbra Kure in 1529."],
  ["Medieval Ethiopia", "Ahmad Gragn was killed in 1543 at the Battle of", "Wayna Daga", ["Adwa", "Shimbra Kure", "Metemma"], "Emperor Gelawdewos was helped by Portuguese soldiers."],
  ["Medieval Ethiopia", "Which European country sent soldiers to help Ethiopia against Adal in the 1540s?", "Portugal", ["Britain", "Italy", "France"], "The force was led by Cristóvão da Gama."],
  ["Medieval Ethiopia", "Which emperor made Gondar the capital in the 1630s?", "Fasilides", ["Tewodros II", "Menelik II", "Zara Yaqob"], "Gondar's royal castles (Fasil Ghebbi) are a UNESCO site."],
  ["Medieval Ethiopia", "The period of weak emperors and rival regional lords from 1769 to 1855 is called", "Zemene Mesafint (the Era of the Princes)", ["the Derg era", "the Aksumite period", "the Italian occupation"], "It ended when Tewodros II was crowned."],
  // Modern Ethiopia
  ["Modern Ethiopia", "Who was crowned emperor in 1855 and began reunifying Ethiopia?", "Tewodros II", ["Yohannes IV", "Menelik II", "Haile Selassie"], "He tried to centralise power and modernise the army."],
  ["Modern Ethiopia", "Tewodros II died in 1868 at", "Magdala (Meqdela)", ["Adwa", "Metemma", "Gondar"], "He took his own life as a British expedition stormed his fortress."],
  ["Modern Ethiopia", "Emperor Yohannes IV was killed in 1889 at the Battle of Metemma fighting the", "Mahdists of Sudan", ["Italians", "Egyptians", "British"], "He had earlier defeated Egypt at Gundet (1875) and Gura (1876)."],
  ["Modern Ethiopia", "Ethiopia defeated Egyptian invaders in 1875–76 under", "Yohannes IV", ["Tewodros II", "Menelik II", "Lij Iyasu"], "The battles of Gundet and Gura."],
  ["Modern Ethiopia", "Which treaty did Menelik II sign with Italy in 1889 that led to war?", "The Treaty of Wuchale", ["The Treaty of Addis Ababa", "The Treaty of Versailles", "The Algiers Agreement"], "The Italian text of Article 17 claimed Ethiopia as a protectorate."],
  ["Modern Ethiopia", "Which article of the Treaty of Wuchale was disputed?", "Article 17", ["Article 1", "Article 10", "Article 21"], "The Amharic and Italian versions said different things."],
  ["Modern Ethiopia", "In which year did Ethiopia defeat Italy at the Battle of Adwa?", "1896", ["1889", "1935", "1941"], "Fought on 1 March 1896."],
  ["Modern Ethiopia", "Which emperor led Ethiopia to victory at Adwa?", "Menelik II", ["Tewodros II", "Yohannes IV", "Haile Selassie"], "With Empress Taytu Betul and leaders such as Ras Alula and Ras Makonnen."],
  ["Modern Ethiopia", "Which empress played a major role at Adwa and in founding Addis Ababa?", "Taytu Betul", ["Zewditu", "Menen Asfaw", "Mentewab"], "She was Menelik II's wife."],
  ["Modern Ethiopia", "After Adwa, Italy recognised Ethiopia's independence in the", "Treaty of Addis Ababa (1896)", ["Treaty of Wuchale", "Treaty of Versailles", "Algiers Agreement"], "It annulled the Treaty of Wuchale."],
  ["Modern Ethiopia", "Addis Ababa was founded in the 1880s by", "Menelik II and Taytu Betul", ["Haile Selassie", "Tewodros II", "Fasilides"], "Its name means 'new flower'."],
  ["Modern Ethiopia", "The Ethio-Djibouti railway reached Addis Ababa in", "1917", ["1896", "1935", "1960"], "It linked the capital to the sea at Djibouti."],
  ["Modern Ethiopia", "Ethiopia joined the League of Nations in", "1923", ["1919", "1935", "1945"], "It was one of very few African members."],
  ["Modern Ethiopia", "Ras Tafari Makonnen was crowned Emperor Haile Selassie I in", "1930", ["1916", "1941", "1955"], "He ruled until 1974."],
  ["Modern Ethiopia", "Ethiopia's first written constitution was issued in", "1931", ["1896", "1955", "1995"], "A revised constitution followed in 1955."],
  ["Modern Ethiopia", "Fascist Italy under Mussolini invaded Ethiopia in", "1935", ["1896", "1923", "1941"], "Italy occupied the country from 1936 to 1941."],
  ["Modern Ethiopia", "The Italian occupation of Ethiopia ended in", "1941", ["1936", "1945", "1952"], "Ethiopian patriots and British forces drove Italy out; Haile Selassie returned."],
  ["Modern Ethiopia", "In 1936 Haile Selassie appealed for help against Italy at the", "League of Nations in Geneva", ["United Nations in New York", "OAU in Addis Ababa", "British Parliament"], "The League failed to act effectively."],
  ["Modern Ethiopia", "Eritrea was federated with Ethiopia in 1952 and annexed in", "1962", ["1941", "1974", "1991"], "This fuelled a 30-year armed struggle."],
  ["Modern Ethiopia", "The Organisation of African Unity (OAU) was founded in Addis Ababa in", "1963", ["1957", "1960", "2002"], "It was replaced by the African Union in 2002."],
  ["Modern Ethiopia", "The African Union replaced the OAU in", "2002", ["1963", "1991", "1999"], "Its headquarters are in Addis Ababa."],
  ["Modern Ethiopia", "Haile Selassie was overthrown in 1974 by a military committee known as the", "Derg", ["EPRDF", "TPLF", "Mahdists"], "The Derg was led by Mengistu Haile Mariam."],
  ["Modern Ethiopia", "Who led the Derg regime?", "Mengistu Haile Mariam", ["Meles Zenawi", "Lij Iyasu", "Ras Mekonnen"], "He ruled until 1991."],
  ["Modern Ethiopia", "The Derg's 1975 land reform is remembered by the slogan", "'Land to the tiller'", ["'Africa for Africans'", "'Ethiopia first'", "'Land and freedom'"], "Rural land was nationalised."],
  ["Modern Ethiopia", "The Ogaden War of 1977–78 was fought between Ethiopia and", "Somalia", ["Sudan", "Eritrea", "Kenya"], "Ethiopia, supported by the USSR and Cuba, regained the Ogaden."],
  ["Modern Ethiopia", "The Derg government fell in 1991 to the", "EPRDF", ["OAU", "Mahdists", "Italian army"], "The Ethiopian People's Revolutionary Democratic Front."],
  ["Modern Ethiopia", "Eritrea became formally independent after a referendum in", "1993", ["1962", "1991", "2000"], "Ethiopia became landlocked."],
  ["Modern Ethiopia", "The current Constitution of the Federal Democratic Republic of Ethiopia was adopted in", "1995", ["1931", "1955", "1987"], "It created a federal system of regional states."],
  ["Modern Ethiopia", "The Ethiopia–Eritrea border war was fought from", "1998 to 2000", ["1977 to 1978", "1961 to 1991", "1935 to 1941"], "It ended with the Algiers Agreement (2000)."],
  ["Modern Ethiopia", "Which Ethiopian Prime Minister won the Nobel Peace Prize in 2019?", "Abiy Ahmed", ["Meles Zenawi", "Hailemariam Desalegn", "Mengistu Haile Mariam"], "For his initiative to end the border conflict with Eritrea."],
  ["Modern Ethiopia", "Ethiopia and Liberia are often described as the African countries that were", "never colonised (Ethiopia was only briefly occupied 1936–41)", ["the first to join the EU", "British protectorates", "French colonies"], "Adwa preserved Ethiopian independence."],
  // World & Africa
  ["World history", "The Berlin Conference that divided Africa among European powers took place in", "1884–85", ["1896", "1914", "1945"], "It formalised the 'Scramble for Africa'."],
  ["World history", "Which was the first sub-Saharan African colony to gain independence (1957)?", "Ghana", ["Nigeria", "Kenya", "Sudan"], "Led by Kwame Nkrumah."],
  ["World history", "Who led Ghana to independence and championed Pan-Africanism?", "Kwame Nkrumah", ["Jomo Kenyatta", "Nelson Mandela", "Julius Nyerere"], "Ghana became independent in 1957."],
  ["World history", "World War I lasted from", "1914 to 1918", ["1939 to 1945", "1905 to 1910", "1917 to 1923"], "It was triggered by the assassination of Archduke Franz Ferdinand."],
  ["World history", "The immediate trigger of World War I was the assassination of", "Archduke Franz Ferdinand", ["Tsar Nicholas II", "Abraham Lincoln", "Otto von Bismarck"], "In Sarajevo, June 1914."],
  ["World history", "The treaty that ended World War I with Germany was the", "Treaty of Versailles (1919)", ["Treaty of Wuchale", "Treaty of Paris (1783)", "Treaty of Westphalia"], "It imposed heavy reparations on Germany."],
  ["World history", "World War II lasted from", "1939 to 1945", ["1914 to 1918", "1935 to 1941", "1941 to 1949"], "It began with Germany's invasion of Poland."],
  ["World history", "The United Nations was founded in", "1945", ["1919", "1939", "1963"], "It replaced the League of Nations."],
  ["World history", "The French Revolution began in", "1789", ["1776", "1815", "1848"], "It promoted liberty, equality and fraternity."],
  ["World history", "The Industrial Revolution began in", "Britain", ["France", "Ethiopia", "the USA"], "In the late 18th century."],
  ["World history", "The American Declaration of Independence was signed in", "1776", ["1789", "1865", "1607"], "The 13 colonies broke from Britain."],
  ["World history", "The Russian Revolution that brought the Bolsheviks to power took place in", "1917", ["1905", "1789", "1945"], "Led by Lenin."],
  ["World history", "Apartheid ended in South Africa with democratic elections in", "1994", ["1960", "1980", "2000"], "Nelson Mandela became president."],
  ["World history", "Ancient Mesopotamia developed between which two rivers?", "Tigris and Euphrates", ["Nile and Congo", "Indus and Ganges", "Blue Nile and White Nile"], "In present-day Iraq."],
  ["World history", "The fascist leader of Italy who ordered the invasion of Ethiopia was", "Benito Mussolini", ["Adolf Hitler", "Francisco Franco", "Victor Emmanuel II"], "Italy invaded in October 1935."],
  ["World history", "The period of tension between the USA and the USSR after 1945 is called the", "Cold War", ["Hundred Years' War", "Great Depression", "Scramble for Africa"], "It ended around 1991."],
  ["World history", "The Renaissance began in", "Italy", ["England", "Egypt", "Russia"], "In the 14th–15th centuries."],
  ["World history", "Christopher Columbus reached the Americas in", "1492", ["1415", "1520", "1607"], "Sailing for Spain."],
];

const GEO_FACTS: F[] = [
  ["Ethiopia", "What is the highest mountain in Ethiopia?", "Ras Dashen (Ras Dejen)", ["Mount Batu", "Mount Kilimanjaro", "Mount Guna"], "It is in the Simien Mountains."],
  ["Ethiopia", "Which depression in north-east Ethiopia is one of the lowest and hottest places on Earth?", "The Danakil Depression", ["The Ogaden", "The Rift Valley lakes", "The Bale plateau"], "Dallol in the Danakil is famous for its extreme heat."],
  ["Ethiopia", "Which is the largest lake in Ethiopia?", "Lake Tana", ["Lake Abaya", "Lake Ziway", "Lake Chamo"], "It is the source of the Blue Nile."],
  ["Ethiopia", "The Blue Nile (Abay) flows out of", "Lake Tana", ["Lake Abaya", "Lake Victoria", "Lake Turkana"], "It joins the White Nile at Khartoum."],
  ["Ethiopia", "The Grand Ethiopian Renaissance Dam (GERD) is on the", "Blue Nile (Abay)", ["Awash River", "Omo River", "Wabi Shebelle"], "It is in Benishangul-Gumuz near the Sudan border."],
  ["Ethiopia", "Which Ethiopian river ends inland in Lake Abbe without reaching the sea?", "The Awash", ["The Abay", "The Tekeze", "The Baro"], "The Awash basin is an inland drainage system."],
  ["Ethiopia", "The Omo River drains into", "Lake Turkana", ["Lake Tana", "the Red Sea", "the Indian Ocean"], "Lake Turkana is shared with Kenya."],
  ["Ethiopia", "The Wabi Shebelle River flows from the Bale highlands into", "Somalia", ["Sudan", "Kenya", "Djibouti"], "It is one of Ethiopia's longest rivers."],
  ["Ethiopia", "Which major geological feature divides the Ethiopian highlands into western and eastern parts?", "The Great Rift Valley", ["The Danakil Depression", "The Simien Mountains", "The Ogaden plateau"], "It contains a chain of lakes."],
  ["Ethiopia", "Ethiopia's main rainy season (June–September) is called", "Kiremt", ["Belg", "Bega", "Tsedey"], "Belg is the short rainy season; Bega is the dry season."],
  ["Ethiopia", "The short rainy season in Ethiopia (roughly February–May) is called", "Belg", ["Kiremt", "Bega", "Meher"], "Kiremt is the main rainy season."],
  ["Ethiopia", "The traditional climatic zone of very high, cold land in Ethiopia is", "Wurch", ["Kolla", "Weyna Dega", "Bereha"], "From warmest to coldest: Bereha, Kolla, Weyna Dega, Dega, Wurch."],
  ["Ethiopia", "The hot, dry desert zone in Ethiopia's traditional climatic classification is", "Bereha", ["Dega", "Wurch", "Weyna Dega"], "It covers areas like the Danakil."],
  ["Ethiopia", "The temperate middle-altitude zone, good for farming, is called", "Weyna Dega", ["Kolla", "Wurch", "Bereha"], "It lies between Kolla and Dega."],
  ["Ethiopia", "Which grain, native to Ethiopia, is used to make injera?", "Teff", ["Maize", "Sorghum", "Rice"], "Teff was domesticated in the Ethiopian highlands."],
  ["Ethiopia", "Coffee (Coffea arabica) is believed to have originated in which region of Ethiopia?", "Kaffa", ["Tigray", "Afar", "Gambela"], "Coffee is a major export."],
  ["Ethiopia", "Since Eritrea's independence, Ethiopia has been", "landlocked", ["an island nation", "bordered by the Mediterranean", "on the Indian Ocean coast"], "Most trade passes through Djibouti."],
  ["Ethiopia", "Which neighbouring country's port handles most of Ethiopia's foreign trade?", "Djibouti", ["Kenya", "Sudan", "Egypt"], "Linked by road and the Addis Ababa–Djibouti railway."],
  ["Ethiopia", "The Ethiopian wolf and the gelada are examples of animals that are", "endemic to Ethiopia", ["found only in deserts", "introduced from Asia", "extinct"], "Endemic means found nowhere else naturally."],
  ["Ethiopia", "The Simien Mountains National Park is a UNESCO World Heritage Site known for", "dramatic peaks and endemic wildlife like the walia ibex", ["coral reefs", "rainforest gorillas", "salt flats only"], "It is in the north of the country."],
  ["Ethiopia", "Ethiopia is Africa's second most populous country after", "Nigeria", ["Egypt", "South Africa", "DR Congo"], "Its population is over 100 million."],
  ["Ethiopia", "The Ethiopian calendar has", "13 months", ["12 months", "10 months", "14 months"], "Twelve months of 30 days plus Pagume of 5 or 6 days."],
  ["Physical geography", "Which layer of the Earth do we live on?", "The crust", ["The mantle", "The outer core", "The inner core"], "The crust is the thin outer layer."],
  ["Physical geography", "Rocks formed from cooled magma or lava are called", "igneous rocks", ["sedimentary rocks", "metamorphic rocks", "organic rocks"], "Basalt and granite are igneous."],
  ["Physical geography", "Rocks formed from layers of deposited material are called", "sedimentary rocks", ["igneous rocks", "metamorphic rocks", "volcanic rocks"], "Sandstone and limestone are sedimentary."],
  ["Physical geography", "Rocks changed by heat and pressure are called", "metamorphic rocks", ["igneous rocks", "sedimentary rocks", "fossil rocks"], "Marble forms from limestone."],
  ["Physical geography", "Lines of latitude measure distance", "north or south of the Equator", ["east or west of Greenwich", "above sea level", "between time zones only"], "The Equator is 0° latitude."],
  ["Physical geography", "The Prime Meridian (0° longitude) passes through", "Greenwich, London", ["Addis Ababa", "Cairo", "New York"], "Longitude is measured east or west from it."],
  ["Physical geography", "Air temperature generally ___ as altitude increases.", "decreases", ["increases", "stays the same", "doubles"], "About 6.5 °C per 1,000 m on average."],
  ["Physical geography", "Rainfall caused by air rising over mountains is called", "relief (orographic) rainfall", ["convectional rainfall", "frontal rainfall", "acid rain"], "The far side of the mountain is the rain shadow."],
  ["Physical geography", "The longest river in Africa is the", "Nile", ["Congo", "Niger", "Zambezi"], "Formed by the White Nile and the Blue Nile."],
  ["Physical geography", "The largest hot desert in the world is the", "Sahara", ["Kalahari", "Namib", "Gobi"], "It covers much of North Africa."],
  ["Physical geography", "Which instrument measures air pressure?", "A barometer", ["A thermometer", "A hygrometer", "An anemometer"], "An anemometer measures wind speed; a hygrometer humidity."],
  ["Physical geography", "Which instrument measures wind speed?", "An anemometer", ["A barometer", "A rain gauge", "A wind vane"], "A wind vane shows wind direction."],
  ["Human geography", "Population density is calculated as", "population ÷ land area", ["births ÷ deaths", "land area ÷ population", "population × growth rate"], "Usually given as people per km²."],
  ["Human geography", "The movement of people from rural areas to towns is called", "urbanisation (rural–urban migration)", ["emigration", "desertification", "deforestation"], "Cities like Addis Ababa grow this way."],
  ["Human geography", "The gradual change of fertile land into desert is called", "desertification", ["urbanisation", "irrigation", "afforestation"], "Overgrazing and deforestation contribute."],
  ["Human geography", "Planting trees on land that had no forest is called", "afforestation", ["deforestation", "reforestation", "desertification"], "Reforestation is replanting where forest was lost."],
];

const EVENTS: [string, number][] = [
  ["the Battle of Shimbra Kure", 1529], ["the death of Ahmad Gragn at Wayna Daga", 1543], ["the coronation of Tewodros II", 1855], ["the fall of Magdala", 1868],
  ["the Battle of Gundet", 1875], ["the Battle of Metemma", 1889], ["the signing of the Treaty of Wuchale", 1889], ["the Battle of Adwa", 1896],
  ["the railway reaching Addis Ababa from Djibouti", 1917], ["Ethiopia joining the League of Nations", 1923], ["the coronation of Haile Selassie", 1930],
  ["Ethiopia's first written constitution", 1931], ["the Italian invasion of Ethiopia", 1935], ["the liberation from Italian occupation", 1941],
  ["the federation of Eritrea with Ethiopia", 1952], ["the revised imperial constitution", 1955], ["the founding of the OAU in Addis Ababa", 1963],
  ["the overthrow of Haile Selassie by the Derg", 1974], ["the 'Land to the tiller' proclamation", 1975], ["the start of the Ogaden War", 1977],
  ["the fall of the Derg", 1991], ["Eritrea's formal independence", 1993], ["the adoption of the FDRE Constitution", 1995], ["the start of the Ethiopia–Eritrea border war", 1998],
  ["the Berlin Conference opening", 1884], ["Ghana's independence", 1957], ["the start of World War I", 1914], ["the start of World War II", 1939], ["the founding of the United Nations", 1945],
];

export function history(): Q[] {
  const qs = HIST.map(([t, b, c, d, e]) => mcq("HIS", t, b, c, d, e, 2));
  for (const [ev, y] of EVENTS) {
    const near = EVENTS.filter((x) => x[1] !== y).sort((a, b) => Math.abs(a[1] - y) - Math.abs(b[1] - y));
    qs.push(mcq("HIS", "Chronology", `In which year did ${ev} take place?`, String(y), [...new Set(near.map((x) => String(x[1])))].slice(0, 3).concat(String(y + 10)), `${ev[0].toUpperCase() + ev.slice(1)}: ${y}.`, 2));
    qs.push(mcq("HIS", "Chronology", `Which of these events happened in ${y}?`, ev[0].toUpperCase() + ev.slice(1), near.slice(0, 5).map((x) => x[0][0].toUpperCase() + x[0].slice(1)), `${y}: ${ev}.`, 2));
  }
  return qs;
}

export function geography(): Q[] {
  const qs: Q[] = GEO_FACTS.map(([t, b, c, d, e]) => mcq("GEO", t, b, c, d, e, 2));
  // Map scale
  qs.push(...repeat(20, () => {
    const scale = pick([25000, 50000, 100000, 250000, 500000]), cm = ri(2, 12);
    const km = (cm * scale) / 100000;
    return mcq("GEO", "Map work", `On a map with scale 1 : ${scale.toLocaleString("en-US")}, two towns are ${cm} cm apart. What is the actual distance?`, `${fmt(km)} km`, numOpts(km, [km * 10, km / 10, (cm * scale) / 1000], "km"),
      `${cm} cm × ${scale.toLocaleString("en-US")} = ${(cm * scale).toLocaleString("en-US")} cm = ${fmt(km)} km (100,000 cm = 1 km).`, 2);
  }));
  qs.push(...repeat(10, () => {
    const scale = pick([50000, 100000, 200000, 250000]), km = pick([5, 10, 20, 25, 50]);
    const cm = (km * 100000) / scale;
    return mcq("GEO", "Map work", `On a map of scale 1 : ${scale.toLocaleString("en-US")}, how long is a line representing ${km} km?`, `${fmt(cm)} cm`, numOpts(cm, [cm * 10, cm / 10, cm * 2], "cm"), `${km} km = ${(km * 100000).toLocaleString("en-US")} cm; ÷ ${scale.toLocaleString("en-US")} = ${fmt(cm)} cm.`, 2);
  }));
  // Time and longitude
  qs.push(...repeat(16, () => {
    const lonA = pick([0, 15, 30, 45, 60, 75, 90]), lonB = pick([0, 15, 30, 45, 60, 75, 90, 105, 120]);
    if (lonA === lonB) return null;
    const h = ri(6, 14), diff = (lonB - lonA) / 15;
    const t = h + diff;
    if (t < 0 || t > 23) return null;
    const clock = (x: number) => `${String(x).padStart(2, "0")}:00`;
    return mcq("GEO", "Time & longitude", `When it is ${clock(h)} at a place on ${lonA}° E, what is the local time at a place on ${lonB}° E?`, clock(t), [clock(h - diff), clock(h + 2 * diff), clock(h), clock(t + 1)].filter((x) => !x.startsWith("-")),
      `Every 15° of longitude = 1 hour; places further east are ahead. Difference = ${Math.abs(lonB - lonA)}° = ${Math.abs(diff)} h ${diff > 0 ? "ahead" : "behind"}.`, 3);
  }));
  qs.push(...repeat(8, () => {
    const h = ri(1, 8);
    return mcq("GEO", "Time & longitude", `Two places have a local time difference of ${h} hour${h > 1 ? "s" : ""}. What is the difference in their longitude?`, `${15 * h}°`, [`${10 * h}°`, `${15 * h + 15}°`, `${h * 4}°`, `${30 * h}°`], `The Earth turns 360° in 24 h, i.e. 15° per hour: ${h} × 15 = ${15 * h}°.`, 2);
  }));
  // Population and temperature
  qs.push(...repeat(10, () => {
    const area = ri(2, 40) * 1000, dens = ri(20, 400);
    const pop = area * dens;
    return mcq("GEO", "Population", `A region of ${area.toLocaleString("en-US")} km² has ${pop.toLocaleString("en-US")} people. What is its population density?`, `${dens} people/km²`, numOpts(dens, [dens * 10, dens / 2, dens + 25]).map((v) => `${v} people/km²`), `Density = ${pop.toLocaleString("en-US")} ÷ ${area.toLocaleString("en-US")} = ${dens} people per km².`, 1);
  }));
  qs.push(...repeat(10, () => {
    const t0 = ri(18, 32), up = pick([1000, 1500, 2000, 2500, 3000]);
    const t = t0 - (6.5 * up) / 1000;
    return mcq("GEO", "Climate", `The temperature at the foot of a mountain is ${t0} °C. Using a lapse rate of 6.5 °C per 1,000 m, what is the temperature ${up.toLocaleString("en-US")} m higher?`, `${fmt(t)} °C`, numOpts(t, [t0 + (6.5 * up) / 1000, t0 - up / 1000, t - 6.5], "°C", true),
      `Drop = 6.5 × ${up / 1000} = ${fmt((6.5 * up) / 1000)} °C; ${t0} − ${fmt((6.5 * up) / 1000)} = ${fmt(t)} °C.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const temps = [...Array(4)].map(() => ri(10, 35));
    const range = Math.max(...temps) - Math.min(...temps);
    return mcq("GEO", "Climate", `Monthly temperatures (°C) at a station are ${temps.join(", ")}. What is the temperature range?`, `${range} °C`, numOpts(range, [Math.max(...temps), range + 2, Math.round(temps.reduce((a, b) => a + b) / 4)], "°C"), `Range = highest − lowest = ${Math.max(...temps)} − ${Math.min(...temps)} = ${range} °C.`, 1);
  }));
  return qs;
}
