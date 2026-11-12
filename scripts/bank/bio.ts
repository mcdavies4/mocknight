import { mcq, others, Q, shuffle } from "./lib";

const S = "BIO";
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

const ORGANELLES: [string, string][] = [
  ["mitochondrion", "release of energy by aerobic respiration"], ["chloroplast", "photosynthesis"], ["ribosome", "protein synthesis"],
  ["nucleus", "controlling the activities of the cell"], ["cell membrane", "controlling what enters and leaves the cell"], ["cell wall", "giving the plant cell shape and support"],
  ["vacuole", "storing cell sap and keeping the cell turgid"], ["Golgi body", "packaging and secreting substances"], ["lysosome", "digesting worn-out parts with enzymes"],
  ["centriole", "forming spindle fibres during animal cell division"], ["endoplasmic reticulum", "transporting materials within the cell"], ["contractile vacuole", "removing excess water in Amoeba"],
];

const VITAMINS: [string, string][] = [
  ["vitamin A", "night blindness"], ["vitamin B1 (thiamine)", "beriberi"], ["vitamin B3 (niacin)", "pellagra"], ["vitamin C", "scurvy"],
  ["vitamin D", "rickets"], ["vitamin K", "poor blood clotting"], ["vitamin B12", "pernicious anaemia"], ["iron", "anaemia"], ["iodine", "goitre"],
  ["protein", "kwashiorkor"],
];

const HORMONES: [string, string, string][] = [
  ["insulin", "pancreas", "lowers blood glucose level"], ["glucagon", "pancreas", "raises blood glucose level"], ["adrenaline", "adrenal gland", "prepares the body for 'fight or flight'"],
  ["thyroxine", "thyroid gland", "controls the rate of metabolism"], ["antidiuretic hormone (ADH)", "pituitary gland", "increases water reabsorption in the kidney"],
  ["growth hormone", "pituitary gland", "promotes growth of the body"], ["oestrogen", "ovary", "develops female secondary sexual characteristics"],
  ["testosterone", "testis", "develops male secondary sexual characteristics"], ["progesterone", "ovary (corpus luteum)", "maintains the lining of the uterus during pregnancy"],
  ["follicle-stimulating hormone (FSH)", "pituitary gland", "stimulates the development of follicles in the ovary"],
];

// disease, cause type, organism, vector?
const DISEASES: [string, string, string, string | null][] = [
  ["malaria", "protozoan", "Plasmodium", "female Anopheles mosquito"], ["cholera", "bacterium", "Vibrio cholerae", null], ["tuberculosis", "bacterium", "Mycobacterium tuberculosis", null],
  ["typhoid fever", "bacterium", "Salmonella typhi", null], ["gonorrhoea", "bacterium", "Neisseria gonorrhoeae", null], ["syphilis", "bacterium", "Treponema pallidum", null],
  ["AIDS", "virus", "HIV", null], ["measles", "virus", "measles virus", null], ["poliomyelitis", "virus", "poliovirus", null], ["yellow fever", "virus", "yellow fever virus", "Aedes mosquito"],
  ["ringworm", "fungus", "Trichophyton", null], ["sleeping sickness", "protozoan", "Trypanosoma", "tsetse fly"],
  ["river blindness", "nematode (roundworm)", "Onchocerca volvulus", "blackfly (Simulium)"], ["elephantiasis", "nematode (roundworm)", "Wuchereria bancrofti", "Culex mosquito"],
  ["amoebic dysentery", "protozoan", "Entamoeba histolytica", null], ["Lassa fever", "virus", "Lassa virus", null], ["tetanus", "bacterium", "Clostridium tetani", null],
];

const ANIMALS: [string, string][] = [
  ["frog", "Amphibia"], ["toad", "Amphibia"], ["lizard", "Reptilia"], ["snake", "Reptilia"], ["crocodile", "Reptilia"], ["tortoise", "Reptilia"],
  ["bat", "Mammalia"], ["whale", "Mammalia"], ["dolphin", "Mammalia"], ["rabbit", "Mammalia"], ["shark", "Pisces (fish)"], ["tilapia", "Pisces (fish)"],
  ["catfish", "Pisces (fish)"], ["penguin", "Aves (birds)"], ["ostrich", "Aves (birds)"], ["eagle", "Aves (birds)"], ["housefly", "Insecta"], ["grasshopper", "Insecta"],
  ["butterfly", "Insecta"], ["cockroach", "Insecta"], ["spider", "Arachnida"], ["scorpion", "Arachnida"], ["tick", "Arachnida"], ["crab", "Crustacea"], ["prawn", "Crustacea"],
];
const CLASSES = [...new Set(ANIMALS.map((a) => a[1]))];

const MONO = ["maize", "rice", "millet", "sorghum", "oil palm", "onion", "sugar cane", "coconut palm"];
const DICOT = ["bean", "cowpea", "groundnut", "hibiscus", "mango", "orange", "cassava", "pawpaw"];

const ENZYMES: [string, string, string, string][] = [
  // enzyme, substrate, product, where
  ["salivary amylase (ptyalin)", "starch", "maltose", "mouth"], ["pepsin", "proteins", "peptides (polypeptides)", "stomach"], ["rennin", "milk protein (caseinogen)", "curdled milk (casein)", "stomach"],
  ["trypsin", "proteins", "peptides", "duodenum (from pancreas)"], ["lipase", "fats and oils", "fatty acids and glycerol", "duodenum (from pancreas)"],
  ["maltase", "maltose", "glucose", "ileum"], ["sucrase", "sucrose", "glucose and fructose", "ileum"], ["lactase", "lactose", "glucose and galactose", "ileum"],
];

const FOODTESTS: [string, string, string][] = [
  ["starch", "iodine solution", "blue-black colour"], ["reducing sugar", "Benedict's (or Fehling's) solution, heated", "brick-red precipitate"],
  ["protein", "Biuret test (sodium hydroxide + copper(II) tetraoxosulphate(VI))", "purple (violet) colour"], ["fats and oils", "Sudan III", "red-stained layer"],
];

const ECO_TERMS: [string, string][] = [
  ["a producer", "an organism that makes its own food by photosynthesis"], ["a decomposer", "an organism that breaks down dead matter and returns nutrients to the soil"],
  ["a habitat", "the place where an organism lives"], ["a niche", "the role an organism plays in its habitat"], ["a population", "all the organisms of one species in an area"],
  ["a community", "all the populations of different species living in an area"], ["an ecosystem", "a community of organisms interacting with their non-living environment"],
  ["a food web", "interconnected food chains in an ecosystem"], ["mutualism", "an association in which both organisms benefit"],
  ["parasitism", "an association in which one organism benefits and the other is harmed"], ["commensalism", "an association in which one benefits and the other is unaffected"],
  ["predation", "one organism killing and eating another"], ["a saprophyte", "an organism that feeds on dead organic matter"],
  ["ecological succession", "the gradual change in species composition of a community over time"], ["biotic factors", "the living components of an environment"],
  ["abiotic factors", "the non-living components of an environment"], ["a quadrat", "a frame used to estimate the population of plants in an area"],
  ["a Tullgren funnel", "an apparatus for extracting small organisms from soil or leaf litter"], ["a pooter", "a device for collecting small insects"],
  ["a Secchi disc", "an instrument for measuring the turbidity of water"], ["an anemometer", "an instrument for measuring wind speed"],
  ["a hygrometer", "an instrument for measuring relative humidity"], ["a rain gauge", "an instrument for measuring rainfall"], ["a wind vane", "an instrument for showing wind direction"],
];

const FACTS: [string, string, string[], string][] = [
  ["The functional unit of the kidney is the", "nephron", ["neuron", "alveolus", "villus"], "Each kidney has about a million nephrons that filter blood."],
  ["Gaseous exchange in the lungs takes place in the", "alveoli", ["bronchi", "trachea", "larynx"], "Alveoli have thin, moist walls and a rich blood supply."],
  ["Digested food is absorbed mainly through the", "villi of the ileum", ["walls of the stomach", "colon", "oesophagus"], "Villi greatly increase the surface area for absorption."],
  ["Bile is produced by the", "liver", ["gall bladder", "pancreas", "duodenum"], "Bile is made in the liver and stored in the gall bladder."],
  ["Bile is stored in the", "gall bladder", ["liver", "pancreas", "stomach"], "The gall bladder stores bile until it is needed in the duodenum."],
  ["The largest gland in the human body is the", "liver", ["pancreas", "thyroid", "pituitary"], "The liver is the largest internal organ and gland."],
  ["The human heart has", "four chambers", ["two chambers", "three chambers", "five chambers"], "Two atria and two ventricles."],
  ["The pigment that carries oxygen in red blood cells is", "haemoglobin", ["chlorophyll", "melanin", "keratin"], "Haemoglobin combines with oxygen to form oxyhaemoglobin."],
  ["The blood cells that fight infection are the", "white blood cells", ["red blood cells", "platelets", "plasma cells only"], "White blood cells engulf germs and make antibodies."],
  ["Blood clotting is mainly helped by", "platelets", ["red blood cells", "white blood cells", "plasma proteins only"], "Platelets start the clotting process."],
  ["The universal blood donor is blood group", "O", ["A", "B", "AB"], "Group O has no A or B antigens on its red cells."],
  ["The universal blood recipient is blood group", "AB", ["O", "A", "B"], "Group AB has no anti-A or anti-B antibodies in its plasma."],
  ["The part of the brain that controls balance and coordination is the", "cerebellum", ["cerebrum", "medulla oblongata", "hypothalamus"], "The cerebellum coordinates movement and balance."],
  ["The part of the brain responsible for thinking and memory is the", "cerebrum", ["cerebellum", "medulla oblongata", "pons"], "The cerebrum handles intelligence, memory and voluntary actions."],
  ["Breathing and heartbeat are controlled by the", "medulla oblongata", ["cerebrum", "cerebellum", "spinal cord only"], "The medulla controls involuntary actions."],
  ["The light-sensitive layer of the eye is the", "retina", ["cornea", "iris", "lens"], "The retina contains rods and cones."],
  ["The size of the pupil is controlled by the", "iris", ["retina", "cornea", "ciliary body only"], "Muscles in the iris widen or narrow the pupil."],
  ["The part of the ear concerned with hearing is the", "cochlea", ["semicircular canals", "ear drum only", "Eustachian tube"], "The cochlea converts vibrations into nerve impulses."],
  ["Balance in the ear is maintained by the", "semicircular canals", ["cochlea", "ossicles", "pinna"], "Fluid movement in the semicircular canals detects head movement."],
  ["Water is transported in plants by the", "xylem", ["phloem", "cambium", "cortex"], "Xylem carries water and mineral salts up from the roots."],
  ["Manufactured food is transported in plants by the", "phloem", ["xylem", "epidermis", "pith"], "Phloem carries sugars (translocation)."],
  ["Gaseous exchange in leaves takes place through the", "stomata", ["cuticle", "veins", "palisade cells"], "Stomata are pores controlled by guard cells."],
  ["The loss of water vapour from the leaves of a plant is called", "transpiration", ["guttation", "respiration", "osmosis"], "Transpiration mostly happens through stomata."],
  ["The products of photosynthesis are", "glucose and oxygen", ["carbon(IV) oxide and water", "glucose and carbon(IV) oxide", "oxygen and water"], "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ in light with chlorophyll."],
  ["Anaerobic respiration in yeast produces", "ethanol and carbon(IV) oxide", ["lactic acid", "oxygen and water", "glucose"], "This is fermentation."],
  ["Anaerobic respiration in human muscles produces", "lactic acid", ["ethanol", "carbon(IV) oxide and ethanol", "oxygen"], "Lactic acid build-up causes muscle fatigue."],
  ["The movement of water molecules from a dilute to a concentrated solution through a selectively permeable membrane is", "osmosis", ["diffusion", "active transport", "plasmolysis"], "Osmosis is a special case of diffusion of water."],
  ["The movement of molecules from a region of high concentration to low concentration is", "diffusion", ["osmosis", "active transport", "transpiration"], "Diffusion needs no energy."],
  ["The transfer of pollen from the anther to the stigma is", "pollination", ["fertilisation", "germination", "dispersal"], "Pollination comes before fertilisation."],
  ["The father of genetics is", "Gregor Mendel", ["Charles Darwin", "Jean Lamarck", "Robert Hooke"], "Mendel worked out the laws of inheritance using pea plants."],
  ["The theory of evolution by natural selection was proposed by", "Charles Darwin", ["Jean Lamarck", "Gregor Mendel", "Louis Pasteur"], "Darwin published 'On the Origin of Species' in 1859."],
  ["The theory of 'use and disuse' in evolution is associated with", "Jean Lamarck", ["Charles Darwin", "Gregor Mendel", "Alexander Fleming"], "Lamarck proposed inheritance of acquired characteristics."],
  ["The number of chromosomes in a normal human body cell is", "46", ["23", "44", "48"], "23 pairs: 22 pairs of autosomes and 1 pair of sex chromosomes."],
  ["Cell division that halves the chromosome number is", "meiosis", ["mitosis", "binary fission", "budding"], "Meiosis produces haploid gametes."],
  ["Cell division that produces two identical daughter cells is", "mitosis", ["meiosis", "fertilisation", "conjugation"], "Mitosis is used for growth and repair."],
  ["In humans, the sex chromosomes of a male are", "XY", ["XX", "YY", "XO"], "Females are XX; the father determines the sex of the child."],
  ["The double-helix structure of DNA was described by", "Watson and Crick", ["Mendel and Darwin", "Hooke and Brown", "Pasteur and Koch"], "Watson and Crick, 1953."],
  ["The cell was first described by", "Robert Hooke", ["Robert Brown", "Gregor Mendel", "Anton van Leeuwenhoek"], "Hooke observed cork cells in 1665."],
  ["Seeds of which plant group are enclosed in a fruit?", "Angiosperms", ["Gymnosperms", "Ferns", "Mosses"], "Angiosperms are flowering plants; their seeds develop inside an ovary."],
  ["The male reproductive part of a flower is the", "stamen", ["carpel", "sepal", "petal"], "The stamen = anther + filament."],
  ["The female reproductive part of a flower is the", "carpel (pistil)", ["stamen", "sepal", "receptacle"], "The carpel = stigma + style + ovary."],
  ["The organism that causes the bread mould is", "Rhizopus", ["Amoeba", "Spirogyra", "Euglena"], "Rhizopus is a common fungus on stale bread."],
  ["Which organism shows both plant and animal characteristics?", "Euglena", ["Amoeba", "Paramecium", "Hydra"], "Euglena has chloroplasts but also moves with a flagellum."],
  ["The organ of locomotion in Paramecium is the", "cilia", ["flagellum", "pseudopodia", "tentacles"], "Paramecium moves by beating its cilia."],
  ["Amoeba moves by means of", "pseudopodia", ["cilia", "flagellum", "setae"], "Amoeba pushes out 'false feet'."],
  ["The breathing organs of fish are", "gills", ["lungs", "tracheae", "skin only"], "Gills extract dissolved oxygen from water."],
  ["Insects breathe through", "spiracles and tracheae", ["gills", "lungs", "skin only"], "Air enters through spiracles into the tracheal system."],
  ["Nitrogen-fixing bacteria are found in the root nodules of", "leguminous plants", ["grasses", "cacti", "mosses"], "Rhizobium lives in nodules of beans, groundnut etc."],
  ["The process by which green plants make food is", "photosynthesis", ["respiration", "transpiration", "digestion"], "Plants use light energy to make glucose."],
  ["The part of the alimentary canal where most digestion is completed is the", "small intestine", ["stomach", "large intestine", "oesophagus"], "Enzymes from the pancreas and intestinal wall complete digestion in the small intestine."],
  ["Water is mainly reabsorbed from undigested food in the", "colon (large intestine)", ["stomach", "duodenum", "oesophagus"], "The colon reabsorbs water, forming faeces."],
  ["The wave-like muscular contractions that move food along the gut are called", "peristalsis", ["egestion", "ingestion", "assimilation"], "Circular and longitudinal muscles contract alternately."],
  ["The blood vessel that carries blood from the heart to the lungs is the", "pulmonary artery", ["pulmonary vein", "aorta", "vena cava"], "It carries deoxygenated blood — the only artery to do so."],
  ["The largest artery in the body is the", "aorta", ["pulmonary artery", "vena cava", "carotid artery"], "The aorta carries oxygenated blood from the left ventricle."],
  ["Blood returns to the heart from the body through the", "vena cava", ["aorta", "pulmonary vein", "pulmonary artery"], "The venae cavae empty into the right atrium."],
  ["The fluid part of the blood is called", "plasma", ["serum only", "lymph", "haemoglobin"], "Plasma carries dissolved food, hormones, CO₂ and urea."],
  ["Urea is formed in the", "liver", ["kidney", "bladder", "pancreas"], "Excess amino acids are deaminated in the liver to form urea."],
  ["The main nitrogenous waste excreted by mammals is", "urea", ["ammonia", "uric acid", "carbon(IV) oxide"], "Mammals excrete urea in urine."],
  ["The process by which a seed begins to grow is", "germination", ["pollination", "fertilisation", "dormancy"], "Germination needs water, oxygen and a suitable temperature."],
  ["A plant hormone that promotes cell elongation is", "auxin", ["insulin", "ethylene only", "thyroxine"], "Auxins cause phototropism and geotropism."],
  ["The growth response of a plant towards light is", "phototropism", ["geotropism", "hydrotropism", "thigmotropism"], "Shoots are positively phototropic."],
  ["A condition in which the body is unable to control blood glucose because of lack of insulin is", "diabetes mellitus", ["goitre", "anaemia", "rickets"], "Insulin lowers blood glucose."],
];

export function biology(): Q[] {
  const qs: Q[] = [];

  qs.push(
    ...ORGANELLES.map((o) => mcq(S, "Cell biology", `The main function of the ${o[0]} is`, o[1], others(ORGANELLES, o, (x) => x[1]), `${cap(o[0])}: ${o[1]}.`, 1)),
    ...ORGANELLES.map((o) => mcq(S, "Cell biology", `Which cell structure is responsible for ${o[1]}?`, cap(o[0]), others(ORGANELLES, o, (x) => cap(x[0])), `${cap(o[0])}: ${o[1]}.`, 1)),
  );

  qs.push(
    ...VITAMINS.map((v) => mcq(S, "Nutrition", `Deficiency of ${v[0]} in the diet causes`, v[1], others(VITAMINS, v, (x) => x[1]), `Lack of ${v[0]} → ${v[1]}.`, 1)),
    ...VITAMINS.map((v) => mcq(S, "Nutrition", `${cap(v[1])} is caused by a deficiency of`, v[0], others(VITAMINS, v, (x) => x[0]), `${cap(v[1])} results from lack of ${v[0]}.`, 1)),
  );

  const glands = [...new Set(HORMONES.map((h) => h[1]))];
  qs.push(
    ...HORMONES.map((h) => mcq(S, "Hormones", `${cap(h[0])} is secreted by the`, h[1], shuffle(glands.filter((g) => g !== h[1])).concat(["liver", "kidney"]), `${cap(h[0])} comes from the ${h[1]}.`, 1)),
    ...HORMONES.map((h) => mcq(S, "Hormones", `The function of ${h[0]} is that it`, h[2], others(HORMONES, h, (x) => x[2]), `${cap(h[0])} ${h[2]}.`, 2)),
  );

  const causes = ["bacterium", "virus", "protozoan", "fungus", "nematode (roundworm)"];
  qs.push(
    ...DISEASES.map((d) => mcq(S, "Diseases", `${cap(d[0])} is caused by a`, d[1], causes, `${cap(d[0])} is caused by ${d[2]}, a ${d[1]}.`, 1)),
    ...DISEASES.map((d) => mcq(S, "Diseases", `The causative organism of ${d[0]} is`, d[2], others(DISEASES, d, (x) => x[2]), `${cap(d[0])} is caused by ${d[2]}.`, 2)),
    ...DISEASES.filter((d) => d[3]).map((d) =>
      mcq(S, "Diseases", `The vector of ${d[0]} is the`, d[3]!, [...DISEASES.filter((x) => x[3] && x[3] !== d[3]).map((x) => x[3]!), "housefly", "rat"], `${cap(d[0])} is transmitted by the ${d[3]}.`, 1),
    ),
  );

  qs.push(
    ...ANIMALS.map((a) => mcq(S, "Classification", `${/^[aeiou]/.test(a[0]) ? "An" : "A"} ${a[0]} belongs to the class`, a[1], CLASSES, `The ${a[0]} is in ${a[1]}.`, 1)),
    ...MONO.map((p) => mcq(S, "Classification", `The ${p} plant is a`, "monocotyledon", ["dicotyledon", "gymnosperm", "pteridophyte"], `${cap(p)} has one seed leaf, parallel veins and fibrous roots.`, 1)),
    ...DICOT.map((p) => mcq(S, "Classification", `The ${p} plant is a`, "dicotyledon", ["monocotyledon", "gymnosperm", "bryophyte"], `${cap(p)} has two seed leaves and net (reticulate) veins.`, 1)),
  );

  qs.push(
    ...ENZYMES.map((e) => mcq(S, "Digestion", `The enzyme ${e[0]} acts on`, e[1], others(ENZYMES, e, (x) => x[1]), `${cap(e[0])} breaks down ${e[1]} into ${e[2]} in the ${e[3]}.`, 2)),
    ...ENZYMES.map((e) => mcq(S, "Digestion", `The product of the action of ${e[0]} on ${e[1]} is`, e[2], others(ENZYMES, e, (x) => x[2]), `${cap(e[0])}: ${e[1]} → ${e[2]}.`, 2)),
  );

  qs.push(
    ...FOODTESTS.map((f) => mcq(S, "Food tests", `Which reagent is used to test for ${f[0]}?`, f[1], others(FOODTESTS, f, (x) => x[1]), `${cap(f[0])}: ${f[1]} → ${f[2]}.`, 1)),
    ...FOODTESTS.map((f) => mcq(S, "Food tests", `A positive test for ${f[0]} gives`, f[2], others(FOODTESTS, f, (x) => x[2]), `${cap(f[0])}: ${f[1]} → ${f[2]}.`, 1)),
  );

  qs.push(
    ...ECO_TERMS.map((t) => mcq(S, "Ecology", `${cap(t[0])} is best described as`, t[1], others(ECO_TERMS, t, (x) => x[1]), `${cap(t[0])}: ${t[1]}.`, 1)),
    ...ECO_TERMS.map((t) => mcq(S, "Ecology", `What is the term for ${t[1]}?`, cap(t[0].replace(/^(an?|the) /, "")), others(ECO_TERMS, t, (x) => cap(x[0].replace(/^(an?|the) /, ""))), `${cap(t[0])}: ${t[1]}.`, 1)),
  );

  qs.push(...FACTS.map(([b, c, d, e]) => mcq(S, "General biology", b, c, d, e, 1)));

  // Genetics (monohybrid crosses)
  const TRAITS: [string, string, string, string][] = [
    ["T", "tall", "short", "pea plants"], ["B", "black coat", "white coat", "guinea pigs"], ["R", "round seeds", "wrinkled seeds", "pea plants"], ["P", "purple flowers", "white flowers", "pea plants"],
  ];
  const crosses: [string, string, number][] = [["Tt", "Tt", 3 / 4], ["Tt", "tt", 1 / 2], ["TT", "tt", 1], ["TT", "Tt", 1]];
  const fr = (x: number) => (x === 1 ? "all (100%)" : x === 0 ? "none (0%)" : x === 0.75 ? "3/4 (75%)" : x === 0.5 ? "1/2 (50%)" : "1/4 (25%)");
  for (const [L, dom, rec, org] of TRAITS) {
    const l = L.toLowerCase();
    for (const [a, b, pDom] of crosses) {
      const A = a.replace(/T/g, L).replace(/t/g, l), B = b.replace(/T/g, L).replace(/t/g, l);
      qs.push(
        mcq(S, "Genetics", `In ${org}, ${dom} (${L}) is dominant over ${rec} (${l}). In a cross ${A} × ${B}, what proportion of the offspring will show ${dom}?`, fr(pDom),
          ["all (100%)", "3/4 (75%)", "1/2 (50%)", "1/4 (25%)", "none (0%)"], `Draw the Punnett square for ${A} × ${B}: offspring with at least one ${L} show ${dom}, giving ${fr(pDom)}.`, 2),
        mcq(S, "Genetics", `In ${org}, ${dom} (${L}) is dominant over ${rec} (${l}). In a cross ${A} × ${B}, what proportion of the offspring will show ${rec}?`, fr(1 - pDom),
          ["all (100%)", "3/4 (75%)", "1/2 (50%)", "1/4 (25%)", "none (0%)"], `Only ${l}${l} offspring show ${rec}. For ${A} × ${B} that is ${fr(1 - pDom)}.`, 2),
      );
    }
  }

  return qs;
}
