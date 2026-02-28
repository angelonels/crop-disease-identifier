import Database from 'better-sqlite3';
import path from 'path';

// Store DB in user data folder inside production, but locally for dev
export const dbPath = path.join(process.cwd(), 'crophealth.db');
const db = new Database(dbPath, { verbose: console.log });

// Enable foreign keys
db.pragma('journal_mode = WAL');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS scan_history (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    crop TEXT NOT NULL,
    disease TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    severity INTEGER NOT NULL,
    symptoms TEXT NOT NULL,
    color TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS treatments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    disease_index INTEGER NOT NULL,
    name TEXT NOT NULL,
    severity INTEGER NOT NULL,
    symptoms TEXT NOT NULL,
    chemical_treatment TEXT NOT NULL,
    organic_treatment TEXT NOT NULL
  );
`);

// Seed treatments dictionary for ONNX indexes
const count = db.prepare('SELECT count(*) as count FROM treatments').get() as { count: number };
if (count.count === 0) {
  const insertDisease = db.prepare('INSERT INTO treatments (disease_index, name, severity, symptoms, chemical_treatment, organic_treatment) VALUES (?, ?, ?, ?, ?, ?)');

  // Helper to stringify arrays
  const s = (arr: string[]) => JSON.stringify(arr);

  // Apple (0-3)
  insertDisease.run(0, 'Apple Scab', 60, s(["Olive green or brown spots on leaves", "Velvety dark lesions on fruit"]), s(["Apply Captan or Mancozeb fungicides", "Use myclobutanil preventatively"]), s(["Rake and destroy fallen leaves", "Prune to improve air circulation"]));
  insertDisease.run(1, 'Black Rot', 75, s(["Purple rings on upper leaf surface", "Frogeye leaf spots", "Mummified fruit"]), s(["Captan or Thiophanate-methyl sprays", "Copper-based fungicides"]), s(["Remove and burn mummified fruit", "Prune out dead wood and cankers"]));
  insertDisease.run(2, 'Cedar Apple Rust', 50, s(["Bright orange or yellow spots on leaves", "Orange gelatinous galls on nearby junipers"]), s(["Myclobutanil or Propiconazole sprays in spring"]), s(["Remove nearby juniper hosts if possible", "Select resistant apple varieties"]));
  insertDisease.run(3, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Blueberry (4)
  insertDisease.run(4, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Cherry (5-6)
  insertDisease.run(5, 'Powdery Mildew', 40, s(["White, powdery fungal spots", "Curling or blistering of leaves"]), s(["Sulfur or myclobutanil-based sprays"]), s(["Ensure adequate spacing", "Apply neem oil or horticultural oil"]));
  insertDisease.run(6, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Corn (7-10)
  insertDisease.run(7, 'Cercospora/Gray Leaf Spot', 65, s(["Rectangular, tan to gray lesions on leaves"]), s(["Pyraclostrobin or Azoxystrobin fungicides"]), s(["Crop rotation with non-host crops", "Tillage to bury residue"]));
  insertDisease.run(8, 'Common Rust', 45, s(["Brick-red pustules on both leaf surfaces"]), s(["Fungicides if applied early (e.g., Propiconazole)"]), s(["Plant rust-resistant hybrids"]));
  insertDisease.run(9, 'Northern Leaf Blight', 70, s(["Cigar-shaped, tan to gray lesions"]), s(["Foliar fungicides during tasseling"]), s(["Crop rotation", "Use resistant hybrids"]));
  insertDisease.run(10, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Grape (11-14)
  insertDisease.run(11, 'Black Rot', 80, s(["Brown lesions with dark margins on leaves", "Shriveled, black, mummified berries"]), s(["Mancozeb or Myclobutanil prior to bloom"]), s(["Prune out infected canes", "Destroy mummies"]));
  insertDisease.run(12, 'Esca (Black Measles)', 90, s(["Tiger-stripe leaf discoloration", "Small dark spots on berries"]), s(["No effective chemical cure; trunk protection helps"]), s(["Remove and burn infected vines", "Practice sanitary pruning methods"]));
  insertDisease.run(13, 'Leaf Blight', 55, s(["Irregularly shaped reddish-brown spots"]), s(["Copper-based fungicides"]), s(["Good canopy management for airflow", "Remove infected debris"]));
  insertDisease.run(14, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Orange (15)
  insertDisease.run(15, 'Huanglongbing (Citrus Greening)', 95, s(["Asymmetrical yellow mottling of leaves", "Small, bitter, lopsided green fruit"]), s(["Insecticides to control Asian citrus psyllid vector"]), s(["Remove and destroy infected trees immediately", "Use disease-free nursery stock"]));

  // Peach (16-17)
  insertDisease.run(16, 'Bacterial Spot', 60, s(["Small, water-soaked, angular spots on leaves", "Shot-hole appearance as tissue falls out"]), s(["Copper-based bactericides or Oxytetracycline"]), s(["Plant resistant varieties", "Maintain tree vigor with proper nutrition"]));
  insertDisease.run(17, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Pepper (18-19)
  insertDisease.run(18, 'Bacterial Spot', 65, s(["Small, yellowish-green spots on leaves turning brown", "Defoliation in severe cases"]), s(["Copper-based sprays combined with Mancozeb"]), s(["Use certified disease-free seeds", "Avoid overhead watering", "Crop rotation"]));
  insertDisease.run(19, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Potato (20-22)
  insertDisease.run(20, 'Early Blight', 70, s(["Dark brown spots with concentric rings (target board appearance)"]), s(["Chlorothalonil or Mancozeb sprays"]), s(["Ensure adequate nitrogen", "Remove infected plant debris", "Crop rotation"]));
  insertDisease.run(21, 'Late Blight', 90, s(["Large, irregularly shaped, water-soaked spots", "White fungal growth on leaf undersides"]), s(["Mefenoxam or Chlorothalonil-based fungicides"]), s(["Destroy cull piles", "Use certified seed potatoes", "Avoid overhead irrigation"]));
  insertDisease.run(22, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Raspberry (23)
  insertDisease.run(23, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Soybean (24)
  insertDisease.run(24, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Squash (25)
  insertDisease.run(25, 'Powdery Mildew', 45, s(["White powdery spots on upper and lower leaf surfaces"]), s(["Chlorothalonil or Myclobutanil"]), s(["Apply horticultural oils or baking soda solutions", "Provide good air circulation"]));

  // Strawberry (26-27)
  insertDisease.run(26, 'Leaf Scorch', 50, s(["Irregular purple to solid brown blotches on leaves"]), s(["Captan or Thiophanate-methyl sprays"]), s(["Remove dead foliage post-harvest", "Ensure good plant spacing"]));
  insertDisease.run(27, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));

  // Tomato (28-37)
  insertDisease.run(28, 'Bacterial Spot', 65, s(["Small, dark, water-soaked spots on leaves", "Scab-like spots on fruit"]), s(["Copper fungicides mixed with Mancozeb"]), s(["Avoid overhead watering", "Use disease-free seeds or transplants"]));
  insertDisease.run(29, 'Early Blight', 70, s(["Dark lesions with concentric rings (bullseye pattern)", "Yellowing around lesions, starting on lower leaves"]), s(["Chlorothalonil or Mancozeb applications every 7-10 days"]), s(["Prune lowest leaves to improve airflow", "Space plants properly", "Use mulch to prevent soil splashing"]));
  insertDisease.run(30, 'Late Blight', 95, s(["Large, dark, water-soaked spreading spots", "White mold on leaf undersides in humid conditions", "Firm, dark brown rot on fruit"]), s(["Apply Chlorothalonil or copper-based fungicides urgently"]), s(["Destroy infected plants immediately", "Do not compost infected material", "Ensure excellent ventilation"]));
  insertDisease.run(31, 'Leaf Mold', 55, s(["Pale greenish-yellow spots on upper leaf surface", "Olive-green to brown velvety mold on lower surface"]), s(["Chlorothalonil or Mancozeb-based sprays"]), s(["Improve ventilation (especially in greenhouses)", "Avoid wetting foliage"]));
  insertDisease.run(32, 'Septoria Leaf Spot', 60, s(["Numerous small, circular spots with dark borders and gray centers", "Tiny black specks (pycnidia) in the center of spots"]), s(["Chlorothalonil or copper fungicides"]), s(["Remove and destroy heavily infected lower leaves", "Use mulch to reduce soil splashing"]));
  insertDisease.run(33, 'Spider Mites', 45, s(["Stippling or fine yellow speckling on leaves", "Fine webbing on undersides of leaves or between stems"]), s(["Miticides/Acaricides (e.g., Abamectin) if infestation is severe"]), s(["Introduce predatory mites", "Spray with insecticidal soap or neem oil", "Keep plants well-watered to reduce stress"]));
  insertDisease.run(34, 'Target Spot', 75, s(["Brown lesions with target-like rings on leaves", "Sunken dark spots on fruit"]), s(["Chlorothalonil or Mancozeb-based fungicides"]), s(["Improve air circulation", "Avoid excessive nitrogen fertilization", "Remove crop debris"]));
  insertDisease.run(35, 'Tomato Yellow Leaf Curl Virus', 85, s(["Upward curling of leaf margins", "Severe stunting of new growth", "Yellowing (chlorosis) between leaf veins"]), s(["No chemical cure for the virus. Use insecticides to control whitefly vectors (Imidacloprid)."]), s(["Remove and destroy infected plants immediately", "Use reflective mulches to deter whiteflies", "Plant resistant varieties"]));
  insertDisease.run(36, 'Tomato Mosaic Virus', 80, s(["Mottled light and dark green patterns on leaves", "Fern-like, narrowed leaves", "Stunted growth and poor fruit set"]), s(["No chemical controls available."]), s(["Wash hands and tools thoroughly with soap after handling plants", "Do not smoke near plants (tobacco can carry related viruses)", "Plant resistant varieties (VFN or VFNT)"]));
  insertDisease.run(37, 'Healthy', 0, s(["None"]), s(["None"]), s(["None"]));
}

export interface ScanRecord {
  id: string;
  date: string;
  time: string;
  crop: string;
  disease: string;
  scientific_name: string;
  severity: number;
  symptoms: string;
  color: string;
}

export const insertScanLine = db.prepare(`
  INSERT INTO scan_history (id, date, time, crop, disease, scientific_name, severity, symptoms, color)
  VALUES (@id, @date, @time, @crop, @disease, @scientific_name, @severity, @symptoms, @color)
`);

export const getAllHistory = db.prepare(`
  SELECT * FROM scan_history ORDER BY rowid DESC LIMIT 50
`);

export const getDiseaseByIndex = db.prepare(`
  SELECT * FROM treatments WHERE disease_index = ?
`);

export default db;
