import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "menu");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Falta OPENAI_API_KEY. Rode: node --env-file=.env.local scripts/gen-images.mjs");
  process.exit(1);
}

const baseDish =
  "Professional restaurant food photography, top-down 45 degree close-up, served in a large white ceramic plate with a thin gold rim, dark warm out-of-focus background, dramatic side window lighting, glossy vibrant sauce, fresh basil garnish, shallow depth of field, hyper-detailed restaurant menu quality, shot on 50mm lens, square composition";

const baseDrink =
  "Professional product photography, ice-cold beverage with condensation droplets, studio lighting with soft shadow, blurred warm italian restaurant kitchen background with bokeh, slight low angle, hyper-realistic, square composition";

const targets = [
  {
    file: "tajarin.jpg",
    prompt: `${baseDish}. The dish: tajarin (thin egg pasta nest) coated in slow-cooked beef ragu, chunks of braised beef around the nest, one cherry tomato beside, microgreens on top.`,
  },
  {
    file: "fettuccine.jpg",
    prompt: `${baseDish}. The dish: fettuccine pasta nest in bright red fresh tomato sauce with whole basil leaves, dusted with grated parmesan, glossy tomato pieces visible.`,
  },
  {
    file: "agnolotti.jpg",
    prompt: `${baseDish}. The dish: small handmade agnolotti al plin pasta pillows arranged in a row, glistening with brown butter sauce and crispy fried sage leaves, light sprinkle of grated parmesan.`,
  },
  {
    file: "lasagna.jpg",
    prompt: `${baseDish}. The dish: single rectangular slice of italian lasagna with visible layers of pasta, ragu and besciamella, golden gratinated bubbling cheese top, small basil leaf garnish, pool of ragu sauce on the side.`,
  },
  {
    file: "coca-cola.jpg",
    prompt: `${baseDrink}. The product: a classic red Coca-Cola aluminum can, viewed from slight low angle.`,
  },
  {
    file: "coca-zero.jpg",
    prompt: `${baseDrink}. The product: a black Coca-Cola Zero aluminum can, viewed from slight low angle.`,
  },
  {
    file: "agua-sem-gas.jpg",
    prompt: `${baseDrink}. The product: an elegant still mineral water glass bottle with a green label, water droplets on the glass.`,
  },
  {
    file: "agua-com-gas.jpg",
    prompt: `${baseDrink}. The product: an elegant sparkling mineral water glass bottle with a blue label, water droplets on the glass.`,
  },
];

async function generate({ file, prompt }) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      quality: "high",
      n: 1,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${file}: ${res.status} ${text}`);
  }

  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error(`${file}: resposta sem imagem`);
  await writeFile(join(outDir, file), Buffer.from(b64, "base64"));
  console.log(`✓ ${file}`);
}

for (const t of targets) {
  try {
    process.stdout.write(`gerando ${t.file}... `);
    await generate(t);
  } catch (err) {
    console.error(`\n✗ ${err.message}`);
  }
}

console.log("Pronto.");
