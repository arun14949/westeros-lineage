import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY environment variable');
  console.error('Usage: GEMINI_API_KEY=your-key npx tsx scripts/generate-images.ts');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const OUTPUT_DIR = path.resolve(__dirname, '../public/images');

interface CharacterPrompt {
  id: string;
  name: string;
  prompt: string;
}

// Character descriptions for image generation
const characterPrompts: CharacterPrompt[] = [
  // STARK
  { id: 'rickard-stark', name: 'Rickard Stark', prompt: 'elderly stern nobleman with grey hair and beard, wearing dark grey fur-lined cloak, northern lord, solemn expression, ice-blue eyes' },
  { id: 'brandon-stark-elder', name: 'Brandon Stark (Elder)', prompt: 'young handsome man with dark brown hair, fierce expression, wearing leather armor with wolf motif, wild and bold appearance' },
  { id: 'eddard-stark', name: 'Eddard Stark', prompt: 'middle-aged man with brown hair and short beard, honorable solemn expression, wearing dark grey leather armor with direwolf sigil, northern lord' },
  { id: 'catelyn-stark', name: 'Catelyn Stark', prompt: 'noble auburn-haired woman in her 40s, blue eyes, wearing blue and grey dress, dignified and determined expression, mother figure' },
  { id: 'lyanna-stark', name: 'Lyanna Stark', prompt: 'beautiful young woman with dark brown hair and grey eyes, wild beauty, wearing grey riding clothes, spirited expression' },
  { id: 'benjen-stark', name: 'Benjen Stark', prompt: 'young man with dark hair wearing black Night Watch cloak and armor, rugged handsome face, ranger expression' },
  { id: 'robb-stark', name: 'Robb Stark', prompt: 'young auburn-haired man with blue eyes, wearing chainmail and grey wolf-fur cloak, kingly bearing, young warrior king' },
  { id: 'sansa-stark', name: 'Sansa Stark', prompt: 'beautiful young woman with long auburn hair, blue eyes, elegant grey and black dress, regal and composed expression' },
  { id: 'arya-stark', name: 'Arya Stark', prompt: 'young tomboy girl with dark brown hair in practical style, grey eyes, wearing dark leather and tunic, fierce determined expression, holding a thin sword' },
  { id: 'bran-stark', name: 'Bran Stark', prompt: 'young boy with auburn hair, mysterious ancient eyes, sitting in a wheelchair-like throne, wearing dark furs, mystical expression' },
  { id: 'rickon-stark', name: 'Rickon Stark', prompt: 'small wild-looking boy with curly auburn hair, wearing tattered Stark grey clothes, young and untamed appearance' },
  { id: 'jon-snow', name: 'Jon Snow', prompt: 'young man with curly dark hair and dark eyes, wearing black Night Watch fur cloak, brooding noble expression, longclaw sword' },

  // TARGARYEN
  { id: 'aerys-targaryen', name: 'Aerys Targaryen', prompt: 'gaunt elderly man with long silver-white hair and purple eyes, crown askew, wild mad expression, ornate red and black robes, unkempt appearance' },
  { id: 'rhaella-targaryen', name: 'Rhaella Targaryen', prompt: 'elegant silver-haired woman with violet eyes, wearing flowing red and black gown, sad graceful expression, queen' },
  { id: 'rhaegar-targaryen', name: 'Rhaegar Targaryen', prompt: 'strikingly handsome man with silver hair and indigo eyes, wearing ornate black armor with ruby dragon, melancholy noble expression' },
  { id: 'viserys-targaryen', name: 'Viserys Targaryen', prompt: 'thin young man with silver-blonde hair and lilac eyes, wearing worn but regal clothing, arrogant desperate expression' },
  { id: 'daenerys-targaryen', name: 'Daenerys Targaryen', prompt: 'beautiful young woman with silver-white hair and violet eyes, wearing dramatic black and red dragon-scale dress, regal powerful expression' },

  // LANNISTER
  { id: 'tywin-lannister', name: 'Tywin Lannister', prompt: 'imposing bald man with golden sideburns, piercing green eyes, wearing crimson and gold armor, cold calculating expression, the most powerful man' },
  { id: 'joanna-lannister', name: 'Joanna Lannister', prompt: 'beautiful golden-haired woman with green eyes, wearing elegant crimson and gold gown, warm graceful expression' },
  { id: 'cersei-lannister', name: 'Cersei Lannister', prompt: 'beautiful woman with golden hair and green eyes, wearing royal crimson gown with lion motifs, proud cruel expression, golden crown' },
  { id: 'jaime-lannister', name: 'Jaime Lannister', prompt: 'handsome golden-haired man with green eyes, wearing white armor with gold trim, charming confident expression' },
  { id: 'tyrion-lannister', name: 'Tyrion Lannister', prompt: 'short man with mismatched eyes and blonde hair, wearing fine crimson doublet, clever witty expression, wine goblet nearby' },
  { id: 'joffrey-baratheon', name: 'Joffrey Baratheon', prompt: 'young blonde boy with green eyes wearing golden crown and red royal robes, cruel petulant expression, golden lion and stag motifs' },
  { id: 'myrcella-baratheon', name: 'Myrcella Baratheon', prompt: 'young pretty girl with golden curls and green eyes, wearing Dornish-influenced dress, sweet gentle expression' },
  { id: 'tommen-baratheon', name: 'Tommen Baratheon', prompt: 'young chubby-cheeked boy with golden hair, wearing royal robes and crown, innocent kind expression, gentle child king' },

  // BARATHEON
  { id: 'robert-baratheon', name: 'Robert Baratheon', prompt: 'large powerful man gone to fat, dark hair with greying beard, wearing crown and gold-trimmed black doublet, warrior king past his prime' },
  { id: 'stannis-baratheon', name: 'Stannis Baratheon', prompt: 'stern gaunt man with short dark hair and beard, wearing dark armor with flaming heart sigil, rigid determined expression' },
  { id: 'renly-baratheon', name: 'Renly Baratheon', prompt: 'handsome young man with dark hair and blue eyes, wearing green and gold armor with stag antlers, charming charismatic smile' },
  { id: 'gendry-baratheon', name: 'Gendry Baratheon', prompt: 'muscular young man with black hair and blue eyes, wearing blacksmith apron over simple clothes, strong determined expression, hammer nearby' },

  // GREYJOY
  { id: 'balon-greyjoy', name: 'Balon Greyjoy', prompt: 'weathered lean man with grey hair and hard face, wearing dark iron crown and saltwater-stained armor, bitter proud expression, kraken motifs' },
  { id: 'theon-greyjoy', name: 'Theon Greyjoy', prompt: 'young man with dark hair looking haunted and broken, gaunt face, wearing tattered dark clothing, conflicted expression' },
  { id: 'yara-greyjoy', name: 'Yara Greyjoy', prompt: 'strong-featured woman with dark hair, wearing ironborn leather armor and axe, fierce commanding expression, sea warrior' },
  { id: 'euron-greyjoy', name: 'Euron Greyjoy', prompt: 'wild-looking man with dark hair and blue eye, wearing dark leather pirate captain outfit, mad cunning grin, eyepatch' },

  // TYRELL
  { id: 'mace-tyrell', name: 'Mace Tyrell', prompt: 'portly middle-aged man with brown beard, wearing green and gold noble attire with rose motifs, pompous bumbling expression' },
  { id: 'olenna-tyrell', name: 'Olenna Tyrell', prompt: 'sharp elderly woman with white hair, wearing dark green gown and wimple, cunning knowing expression, queen of thorns' },
  { id: 'margaery-tyrell', name: 'Margaery Tyrell', prompt: 'beautiful young woman with brown curly hair, wearing elegant green and gold gown with rose motifs, charming politically savvy smile' },
  { id: 'loras-tyrell', name: 'Loras Tyrell', prompt: 'handsome young knight with curly brown hair, wearing ornate flower-engraved armor, gallant proud expression, knight of flowers' },

  // MARTELL
  { id: 'doran-martell', name: 'Doran Martell', prompt: 'dignified older man with olive skin and dark eyes, sitting in wheeled chair, wearing orange and red robes, patient calculating expression' },
  { id: 'oberyn-martell', name: 'Oberyn Martell', prompt: 'handsome olive-skinned man with dark hair and mustache, wearing light leather Dornish armor with sun motifs, passionate dangerous smile, spear' },
  { id: 'trystane-martell', name: 'Trystane Martell', prompt: 'young handsome olive-skinned boy with dark hair, wearing Dornish orange and red silks, gentle romantic expression' },

  // ARRYN
  { id: 'jon-arryn', name: 'Jon Arryn', prompt: 'elderly distinguished man with white hair and beard, wearing blue and white noble attire with falcon motifs, wise stern expression, hand of the king pin' },
  { id: 'lysa-arryn', name: 'Lysa Arryn', prompt: 'thin nervous woman with auburn hair gone stringy, wearing blue Vale dress, anxious obsessive expression, unstable appearance' },
  { id: 'robin-arryn', name: 'Robin Arryn', prompt: 'sickly pale young boy with dark hair, wearing blue Vale clothing, weak petulant expression, spoiled and frail' },

  // TULLY
  { id: 'hoster-tully', name: 'Hoster Tully', prompt: 'elderly bedridden nobleman with grey hair and blue eyes, wearing blue and red river lord robes, tired but noble expression' },
  { id: 'edmure-tully', name: 'Edmure Tully', prompt: 'young man with auburn hair and blue eyes, wearing blue and red Tully armor with fish motifs, earnest slightly bumbling expression' },
];

const STYLE_PREFIX = 'Medieval fantasy character portrait, oil painting style, warm parchment-toned background, dramatic lighting, head and shoulders composition, detailed realistic fantasy art. ';

async function generateImage(character: CharacterPrompt, retries = 2): Promise<string | null> {
  const fullPrompt = STYLE_PREFIX + character.prompt;
  const outputPath = path.join(OUTPUT_DIR, `${character.id}.png`);

  // Skip if already generated
  if (fs.existsSync(outputPath)) {
    console.log(`  [SKIP] ${character.name} - already exists`);
    return outputPath;
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) console.log(`  [RETRY ${attempt}] ${character.name}...`);
      else console.log(`  [GEN] ${character.name}...`);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{
          role: 'user',
          parts: [{ text: `Generate a portrait image: ${fullPrompt}` }],
        }],
        config: {
          responseModalities: ['image', 'text'] as any,
        },
      });

      const parts = response.candidates?.[0]?.content?.parts;
      if (!parts) {
        console.log(`  [FAIL] ${character.name} - no response parts`);
        return null;
      }

      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const buffer = Buffer.from(part.inlineData.data!, 'base64');
          fs.writeFileSync(outputPath, buffer);
          console.log(`  [OK] ${character.name} (${(buffer.length / 1024).toFixed(0)}KB)`);
          return outputPath;
        }
      }

      console.log(`  [FAIL] ${character.name} - no image in response`);
      return null;
    } catch (err: any) {
      const msg = err.message || String(err);
      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
        // Rate limited - wait and retry
        const waitTime = 15 + attempt * 15;
        console.log(`  [RATE] ${character.name} - waiting ${waitTime}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
        continue;
      }
      console.error(`  [ERR] ${character.name}: ${msg.slice(0, 120)}`);
      return null;
    }
  }

  console.log(`  [FAIL] ${character.name} - max retries exceeded`);
  return null;
}

async function updateDataFile(generatedPaths: Map<string, string>) {
  const dataPath = path.resolve(__dirname, '../src/data.ts');
  let content = fs.readFileSync(dataPath, 'utf-8');

  for (const [characterId] of generatedPaths) {
    const relativePath = `/images/${characterId}.png`;
    const regex = new RegExp(
      `(id: '${characterId}'[\\s\\S]*?image: ')[^']*(')`
    );
    content = content.replace(regex, `$1${relativePath}$2`);
  }

  fs.writeFileSync(dataPath, content);
  console.log(`\nUpdated ${generatedPaths.size} image paths in src/data.ts`);
}

async function main() {
  console.log(`Generating ${characterPrompts.length} character portraits...`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generatedPaths = new Map<string, string>();
  let success = 0;
  let failed = 0;

  for (const character of characterPrompts) {
    const result = await generateImage(character);
    if (result) {
      generatedPaths.set(character.id, result);
      success++;
    } else {
      failed++;
    }

    // Rate limit: wait 4s between requests for imagen
    await new Promise(resolve => setTimeout(resolve, 4000));
  }

  console.log(`\nResults: ${success} generated, ${failed} failed`);

  if (generatedPaths.size > 0) {
    await updateDataFile(generatedPaths);
  }
}

main().catch(console.error);
