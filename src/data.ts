// ─── Types ───────────────────────────────────────────────────────────────────

export interface Character {
  id: string;
  name: string;
  title: string;
  alias?: string;
  house: string;
  image: string;
  isDead: boolean;
  bio: string;
  spoilerBio?: string;
  quote?: string;
  raisedAs?: { house: string; title: string };
  trueLineage?: { house: string; title: string };
  tags: string[];
}

export interface TreeNode {
  characterId: string;
  spouse?: string;         // characterId of spouse
  children?: TreeNode[];
}

export interface House {
  id: string;
  name: string;
  motto: string;
  region: string;
  seat: string;
  status: string;
  color: string;
  icon: string;
  description: string;
  tree: TreeNode;
  memberIds: string[];
}

// ─── Characters ──────────────────────────────────────────────────────────────

export const characters: Record<string, Character> = {
  // ── HOUSE STARK ──────────────────────────────────────────────────────────
  'rickard-stark': {
    id: 'rickard-stark',
    name: 'Rickard Stark',
    title: 'Lord of Winterfell',
    house: 'stark',
    image: '/images/rickard-stark.png',
    isDead: true,
    bio: 'Lord Rickard Stark was the head of House Stark and Lord of Winterfell. An ambitious lord, he forged southron alliances through the betrothal of his children, seeking to bind the great houses together.',
    spoilerBio: 'Rickard was executed by the Mad King Aerys II Targaryen by being roasted alive in his own armor while his son Brandon strangled himself trying to save him. Their deaths ignited Robert\'s Rebellion.',
    quote: 'The North remembers.',
    tags: ['stark', 'lord', 'winterfell', 'deceased'],
  },
  'brandon-stark-elder': {
    id: 'brandon-stark-elder',
    name: 'Brandon Stark',
    title: 'Heir to Winterfell',
    alias: 'The Wild Wolf',
    house: 'stark',
    image: '/images/brandon-stark-elder.png',
    isDead: true,
    bio: 'Brandon Stark was the eldest son of Lord Rickard Stark and the original heir to Winterfell. Bold and hot-blooded, he was betrothed to Catelyn Tully of Riverrun.',
    spoilerBio: 'When Prince Rhaegar Targaryen allegedly abducted his sister Lyanna, Brandon rode to King\'s Landing and demanded Rhaegar come out and die. The Mad King had him arrested and later executed alongside his father, strangled by a device while trying to reach his father\'s sword.',
    tags: ['stark', 'heir', 'deceased'],
  },
  'eddard-stark': {
    id: 'eddard-stark',
    name: 'Eddard Stark',
    title: 'Lord of Winterfell, Warden of the North',
    alias: 'Ned',
    house: 'stark',
    image: '/images/eddard-stark.png',
    isDead: true,
    bio: 'Eddard "Ned" Stark was the Lord of Winterfell, Warden of the North, and Hand of the King to Robert Baratheon. Known across the realm for his unwavering honor, he governed the North with justice and quiet strength.',
    spoilerBio: 'Ned discovered that Queen Cersei\'s children were not fathered by Robert Baratheon but by her twin brother Jaime. When he tried to act on this truth, he was arrested for treason and publicly beheaded at the Great Sept of Baelor on the orders of King Joffrey.',
    quote: 'The man who passes the sentence should swing the sword.',
    tags: ['stark', 'lord', 'hand of the king', 'winterfell', 'deceased'],
  },
  'catelyn-stark': {
    id: 'catelyn-stark',
    name: 'Catelyn Stark',
    title: 'Lady of Winterfell',
    alias: 'Cat',
    house: 'stark',
    image: '/images/catelyn-stark.png',
    isDead: true,
    bio: 'Born Catelyn Tully, she became Lady of Winterfell through her marriage to Eddard Stark. A devoted mother and fierce protector of her family, she was originally betrothed to Ned\'s elder brother Brandon.',
    spoilerBio: 'Catelyn was murdered at the Red Wedding alongside her eldest son Robb, her throat slit by Black Walder Frey after watching Robb die. In the books, she is resurrected as Lady Stoneheart, a vengeful undead figure.',
    quote: 'On my honor as a Tully, on my honor as a Stark, let him go or I will cut your wife\'s throat.',
    tags: ['stark', 'tully', 'lady', 'winterfell', 'deceased'],
  },
  'lyanna-stark': {
    id: 'lyanna-stark',
    name: 'Lyanna Stark',
    title: 'Lady of Winterfell',
    alias: 'The Wolf Maid',
    house: 'stark',
    image: '/images/lyanna-stark.png',
    isDead: true,
    bio: 'Lyanna Stark was the only daughter of Lord Rickard Stark. Beautiful, willful, and fierce, she was betrothed to Robert Baratheon but her disappearance with Prince Rhaegar Targaryen sparked Robert\'s Rebellion.',
    spoilerBio: 'Lyanna was not kidnapped — she eloped with Rhaegar Targaryen and married him in secret. She died in the Tower of Joy after giving birth to their son Aegon, whom she entrusted to her brother Ned, making him promise to protect the child. That child was raised as Jon Snow.',
    quote: 'Promise me, Ned.',
    tags: ['stark', 'lady', 'deceased'],
  },
  'benjen-stark': {
    id: 'benjen-stark',
    name: 'Benjen Stark',
    title: 'First Ranger of the Night\'s Watch',
    house: 'stark',
    image: '/images/benjen-stark.png',
    isDead: true,
    bio: 'Benjen Stark was the youngest son of Rickard Stark. He took the black and joined the Night\'s Watch, rising to the rank of First Ranger.',
    spoilerBio: 'Benjen went missing beyond the Wall early in the series. He was later revealed to have been saved by the Children of the Forest after being attacked by White Walkers, existing in a half-alive state. He sacrificed himself to save Jon Snow from the army of the dead.',
    tags: ['stark', 'nights watch', 'deceased'],
  },
  'robb-stark': {
    id: 'robb-stark',
    name: 'Robb Stark',
    title: 'King in the North',
    alias: 'The Young Wolf',
    house: 'stark',
    image: '/images/robb-stark.png',
    isDead: true,
    bio: 'Robb Stark was the eldest son of Eddard and Catelyn Stark. After his father\'s execution, he was proclaimed King in the North by his bannermen and led a military campaign against the Lannisters.',
    spoilerBio: 'Robb won every battle but lost the war when he broke his marriage pact with House Frey. He was betrayed and murdered at the Red Wedding, along with his mother, his wife Talisa, and his direwolf Grey Wind. His body was desecrated by the Freys.',
    quote: 'I am the King in the North.',
    tags: ['stark', 'king', 'deceased'],
  },
  'sansa-stark': {
    id: 'sansa-stark',
    name: 'Sansa Stark',
    title: 'Queen in the North',
    alias: 'Little Bird',
    house: 'stark',
    image: '/images/sansa-stark.png',
    isDead: false,
    bio: 'Sansa Stark is the eldest daughter of Eddard and Catelyn Stark. Once a naive girl dreaming of life at court, years of cruelty transformed her into a shrewd political player.',
    spoilerBio: 'After enduring torment at the hands of Joffrey, being married to Tyrion Lannister, and suffering under Ramsay Bolton, Sansa emerged as a master of the political game. She was crowned Queen in the North after securing Northern independence from the Iron Throne.',
    quote: 'The North will remain an independent kingdom, as it was for thousands of years.',
    tags: ['stark', 'queen', 'winterfell', 'alive'],
  },
  'arya-stark': {
    id: 'arya-stark',
    name: 'Arya Stark',
    title: 'Princess of Winterfell',
    alias: 'No One',
    house: 'stark',
    image: '/images/arya-stark.png',
    isDead: false,
    bio: 'Arya Stark is the younger daughter of Eddard and Catelyn Stark. Rejecting the life of a lady, she trained as a warrior and later a faceless assassin.',
    spoilerBio: 'Arya trained with the Faceless Men in Braavos and became a deadly assassin. She avenged the Red Wedding by killing Walder Frey and his sons, and struck the killing blow against the Night King during the Battle of Winterfell. She then set sail west of Westeros to explore unknown lands.',
    quote: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
    tags: ['stark', 'assassin', 'faceless men', 'alive'],
  },
  'bran-stark': {
    id: 'bran-stark',
    name: 'Bran Stark',
    title: 'King of the Six Kingdoms',
    alias: 'The Three-Eyed Raven',
    house: 'stark',
    image: '/images/bran-stark.png',
    isDead: false,
    bio: 'Brandon Stark is the second son of Eddard and Catelyn Stark. A curious boy who loved to climb, his life was forever changed when he was pushed from a tower window.',
    spoilerBio: 'After being crippled by Jaime Lannister, Bran journeyed beyond the Wall where he became the Three-Eyed Raven, gaining the ability to see past and present events. He was ultimately chosen as King of the Six Kingdoms, ruling as Bran the Broken.',
    quote: 'I\'m not really. Not anymore. I remember what it felt like to be Brandon Stark, but I remember so much else now.',
    tags: ['stark', 'king', 'three-eyed raven', 'greenseer', 'alive'],
  },
  'rickon-stark': {
    id: 'rickon-stark',
    name: 'Rickon Stark',
    title: 'Prince of Winterfell',
    house: 'stark',
    image: '/images/rickon-stark.png',
    isDead: true,
    bio: 'Rickon Stark was the youngest child of Eddard and Catelyn Stark. A wild child bonded with the direwolf Shaggydog.',
    spoilerBio: 'Rickon was captured by Ramsay Bolton and used as bait during the Battle of the Bastards. He was killed by Ramsay\'s arrow while running across the battlefield toward Jon Snow.',
    tags: ['stark', 'prince', 'deceased'],
  },
  'jon-snow': {
    id: 'jon-snow',
    name: 'Jon Snow',
    title: 'King in the North',
    alias: 'The White Wolf',
    house: 'stark',
    image: '/images/jon-snow.png',
    isDead: false,
    bio: 'Born amidst the bloodshed of the Tower of Joy, his first cries were silenced by a promise. Ned Stark returned north not with a triumph, but with a swaddled infant and a heavy heart. To the world, he was presented as a bastard son, yet he was raised among trueborn siblings within the cold stone walls of Winterfell.',
    spoilerBio: 'Though the name Snow marked him an outsider, he joined the Night\'s Watch and rose to Lord Commander. Betrayed and murdered by his brothers, he was resurrected by the Red Priestess Melisandre. He united the North, defeated the Boltons, and was proclaimed King in the North. His true identity — Aegon Targaryen, son of Rhaegar and Lyanna — made him the rightful heir to the Iron Throne. After killing Daenerys to save the realm, he was exiled beyond the Wall.',
    quote: 'The shield that guards the realms of men.',
    raisedAs: { house: 'Stark', title: 'Bastard of Winterfell' },
    trueLineage: { house: 'Targaryen', title: 'Aegon VI Targaryen' },
    tags: ['stark', 'targaryen', 'king', 'nights watch', 'alive'],
  },

  // ── HOUSE TARGARYEN ──────────────────────────────────────────────────────
  'aerys-targaryen': {
    id: 'aerys-targaryen',
    name: 'Aerys II Targaryen',
    title: 'King of the Andals and the First Men',
    alias: 'The Mad King',
    house: 'targaryen',
    image: '/images/aerys-targaryen.png',
    isDead: true,
    bio: 'Aerys II Targaryen, known as the Mad King, was the last Targaryen to sit the Iron Throne before Robert\'s Rebellion. Once a charming young prince, his reign descended into paranoia and cruelty.',
    spoilerBio: 'Aerys became increasingly insane, burning perceived enemies alive with wildfire. When Robert\'s Rebellion closed in on King\'s Landing, he planned to burn the entire city rather than surrender. He was killed by his own Kingsguard, Jaime Lannister, earning Jaime the name "Kingslayer."',
    quote: 'Burn them all!',
    tags: ['targaryen', 'king', 'mad king', 'deceased'],
  },
  'rhaella-targaryen': {
    id: 'rhaella-targaryen',
    name: 'Rhaella Targaryen',
    title: 'Queen of the Seven Kingdoms',
    house: 'targaryen',
    image: '/images/rhaella-targaryen.png',
    isDead: true,
    bio: 'Queen Rhaella Targaryen was the sister-wife of King Aerys II. A gentle and long-suffering woman, she endured her husband\'s madness and cruelty with quiet dignity.',
    spoilerBio: 'Rhaella was sent to Dragonstone when King\'s Landing fell. She died giving birth to Daenerys during a great storm, which earned Daenerys the name "Stormborn."',
    tags: ['targaryen', 'queen', 'deceased'],
  },
  'rhaegar-targaryen': {
    id: 'rhaegar-targaryen',
    name: 'Rhaegar Targaryen',
    title: 'Crown Prince of Dragonstone',
    alias: 'The Last Dragon',
    house: 'targaryen',
    image: '/images/rhaegar-targaryen.png',
    isDead: true,
    bio: 'Prince Rhaegar Targaryen was the eldest son of King Aerys II and the heir to the Iron Throne. A gifted warrior and skilled musician, he was beloved by the common people and admired by lords.',
    spoilerBio: 'Rhaegar secretly married Lyanna Stark, producing a son — Aegon (Jon Snow). He was killed by Robert Baratheon at the Battle of the Trident, his rubies scattering across the river ford that would bear his name. His actions, born of prophecy and love, inadvertently caused the fall of House Targaryen.',
    quote: 'Rubies flew like drops of blood from the chest of a dying prince.',
    tags: ['targaryen', 'prince', 'warrior', 'deceased'],
  },
  'viserys-targaryen': {
    id: 'viserys-targaryen',
    name: 'Viserys Targaryen',
    title: 'King (self-styled)',
    alias: 'The Beggar King',
    house: 'targaryen',
    image: '/images/viserys-targaryen.png',
    isDead: true,
    bio: 'Viserys Targaryen was the second son of King Aerys II. Exiled across the Narrow Sea, he spent years wandering the Free Cities with his sister Daenerys, growing bitter and entitled.',
    spoilerBio: 'Viserys sold his sister to Khal Drogo in exchange for an army. Impatient and cruel, he threatened Daenerys and her unborn child. Drogo killed him by pouring molten gold over his head — a "golden crown" for a would-be king.',
    quote: 'I am the dragon. I want my crown!',
    tags: ['targaryen', 'prince', 'deceased'],
  },
  'daenerys-targaryen': {
    id: 'daenerys-targaryen',
    name: 'Daenerys Targaryen',
    title: 'Queen of the Andals and the First Men',
    alias: 'Mother of Dragons',
    house: 'targaryen',
    image: '/images/daenerys-targaryen.png',
    isDead: true,
    bio: 'Daenerys Targaryen, the Stormborn, Breaker of Chains and Mother of Dragons. Born on Dragonstone during a great storm, she rose from exile to become one of the most powerful rulers the world had ever known.',
    spoilerBio: 'Daenerys hatched three dragons from petrified eggs, conquered Slaver\'s Bay, and crossed the Narrow Sea with a vast army. After losing friends and allies, she burned King\'s Landing with dragonfire, killing thousands. She was killed by Jon Snow in the throne room, and her dragon Drogon melted the Iron Throne before carrying her body east.',
    quote: 'I am Daenerys Stormborn of House Targaryen, of the blood of Old Valyria. I am the dragon\'s daughter.',
    tags: ['targaryen', 'queen', 'mother of dragons', 'deceased'],
  },

  // ── HOUSE LANNISTER ──────────────────────────────────────────────────────
  'tywin-lannister': {
    id: 'tywin-lannister',
    name: 'Tywin Lannister',
    title: 'Lord of Casterly Rock, Warden of the West',
    alias: 'The Old Lion',
    house: 'lannister',
    image: '/images/tywin-lannister.png',
    isDead: true,
    bio: 'Lord Tywin Lannister was the head of House Lannister, Lord of Casterly Rock, and the most powerful man in Westeros. Cold, calculating, and ruthless, he restored his house to greatness through fear and gold.',
    spoilerBio: 'Tywin served as Hand of the King multiple times and orchestrated the Red Wedding. He was killed by his own son Tyrion with a crossbow while sitting on the privy, after Tyrion discovered Tywin had taken his lover Shae.',
    quote: 'A lion does not concern himself with the opinion of sheep.',
    tags: ['lannister', 'lord', 'hand of the king', 'deceased'],
  },
  'joanna-lannister': {
    id: 'joanna-lannister',
    name: 'Joanna Lannister',
    title: 'Lady of Casterly Rock',
    house: 'lannister',
    image: '/images/joanna-lannister.png',
    isDead: true,
    bio: 'Lady Joanna Lannister was the wife of Lord Tywin and the light of his life. She was the only person who could make Tywin smile. She died giving birth to their youngest son, Tyrion.',
    tags: ['lannister', 'lady', 'deceased'],
  },
  'cersei-lannister': {
    id: 'cersei-lannister',
    name: 'Cersei Lannister',
    title: 'Queen of the Seven Kingdoms',
    alias: 'The Lioness',
    house: 'lannister',
    image: '/images/cersei-lannister.png',
    isDead: true,
    bio: 'Cersei Lannister was the eldest child of Tywin Lannister and twin sister to Jaime. Beautiful, ambitious, and ruthless, she became Queen through her marriage to King Robert Baratheon.',
    spoilerBio: 'Cersei\'s incestuous relationship with Jaime produced three children she passed off as Robert\'s. After Tommen\'s death, she seized the Iron Throne by force, destroying the Great Sept of Baelor with wildfire. She was killed alongside Jaime when the Red Keep collapsed during Daenerys\'s attack on King\'s Landing.',
    quote: 'When you play the game of thrones, you win or you die.',
    tags: ['lannister', 'queen', 'deceased'],
  },
  'jaime-lannister': {
    id: 'jaime-lannister',
    name: 'Jaime Lannister',
    title: 'Lord Commander of the Kingsguard',
    alias: 'The Kingslayer',
    house: 'lannister',
    image: '/images/jaime-lannister.png',
    isDead: true,
    bio: 'Ser Jaime Lannister was the twin brother of Cersei and one of the greatest swordsmen in Westeros. He served in the Kingsguard and earned the name "Kingslayer" for killing the Mad King.',
    spoilerBio: 'Jaime\'s arc was one of the most complex in the series. He lost his sword hand, underwent a redemptive journey, and fought alongside the living against the dead at Winterfell. Ultimately, he returned to Cersei, and they died together in the cellars of the Red Keep.',
    quote: 'The things I do for love.',
    tags: ['lannister', 'kingsguard', 'kingslayer', 'deceased'],
  },
  'tyrion-lannister': {
    id: 'tyrion-lannister',
    name: 'Tyrion Lannister',
    title: 'Hand of the King',
    alias: 'The Imp',
    house: 'lannister',
    image: '/images/tyrion-lannister.png',
    isDead: false,
    bio: 'Tyrion Lannister is the youngest son of Tywin Lannister. Born a dwarf, he was despised by his father and sister but possessed one of the sharpest minds in Westeros.',
    spoilerBio: 'Tyrion killed his father Tywin after being condemned to death for a murder he didn\'t commit. He fled to Essos and became advisor to Daenerys Targaryen. After her fall, he convinced the lords of Westeros to choose Bran Stark as king and served as his Hand.',
    quote: 'I drink and I know things.',
    tags: ['lannister', 'hand of the king', 'alive'],
  },
  'joffrey-baratheon': {
    id: 'joffrey-baratheon',
    name: 'Joffrey Baratheon',
    title: 'King of the Andals and the First Men',
    house: 'lannister',
    image: '/images/joffrey-baratheon.png',
    isDead: true,
    bio: 'Joffrey Baratheon was the eldest son of Queen Cersei, officially the heir of King Robert Baratheon. Cruel and cowardly, he became one of the most despised kings in Westerosi history.',
    spoilerBio: 'Joffrey was actually the son of Cersei and Jaime Lannister. He ordered the execution of Ned Stark and tormented Sansa. He was poisoned at his own wedding feast — the Purple Wedding — orchestrated by Olenna Tyrell and Petyr Baelish.',
    tags: ['lannister', 'baratheon', 'king', 'deceased'],
  },
  'myrcella-baratheon': {
    id: 'myrcella-baratheon',
    name: 'Myrcella Baratheon',
    title: 'Princess',
    house: 'lannister',
    image: '/images/myrcella-baratheon.png',
    isDead: true,
    bio: 'Myrcella Baratheon was the only daughter of Cersei Lannister, officially a Baratheon princess. Sweet-natured and kind, she was sent to Dorne as part of a political alliance.',
    spoilerBio: 'Myrcella was poisoned by Ellaria Sand as revenge for Oberyn Martell\'s death, dying in Jaime\'s arms as they sailed from Dorne.',
    tags: ['lannister', 'baratheon', 'princess', 'deceased'],
  },
  'tommen-baratheon': {
    id: 'tommen-baratheon',
    name: 'Tommen Baratheon',
    title: 'King of the Andals and the First Men',
    house: 'lannister',
    image: '/images/tommen-baratheon.png',
    isDead: true,
    bio: 'Tommen Baratheon was the youngest son of Cersei, a gentle boy who became king after Joffrey\'s death. Unlike his brother, Tommen was kind and easily manipulated.',
    spoilerBio: 'Tommen committed suicide by walking out of a window after witnessing the destruction of the Great Sept of Baelor, which killed his wife Margaery and many others.',
    tags: ['lannister', 'baratheon', 'king', 'deceased'],
  },

  // ── HOUSE BARATHEON ──────────────────────────────────────────────────────
  'robert-baratheon': {
    id: 'robert-baratheon',
    name: 'Robert Baratheon',
    title: 'King of the Andals and the First Men',
    alias: 'The Usurper',
    house: 'baratheon',
    image: '/images/robert-baratheon.png',
    isDead: true,
    bio: 'Robert Baratheon was the first of his name to sit the Iron Throne. A mighty warrior in his youth, he led the rebellion that toppled the Targaryen dynasty after the disappearance of Lyanna Stark.',
    spoilerBio: 'Robert was a terrible king — drunk, indebted, and uninterested in ruling. He was killed by a boar during a hunt, his wine poisoned by his squire on Cersei\'s orders. He never knew that none of his supposed children were actually his.',
    quote: 'Gods, I was strong then.',
    tags: ['baratheon', 'king', 'deceased'],
  },
  'stannis-baratheon': {
    id: 'stannis-baratheon',
    name: 'Stannis Baratheon',
    title: 'Lord of Dragonstone',
    alias: 'The Mannis',
    house: 'baratheon',
    image: '/images/stannis-baratheon.png',
    isDead: true,
    bio: 'Stannis Baratheon was the middle brother of Robert and Lord of Dragonstone. A rigid military commander who believed the Iron Throne was his by right after Robert\'s death.',
    spoilerBio: 'Stannis sacrificed his daughter Shireen to the Lord of Light, which horrified his army. His forces were routed by the Boltons, and he was executed by Brienne of Tarth for his role in Renly\'s murder.',
    quote: 'The Iron Throne is mine, by right. All those who deny that are my foes.',
    tags: ['baratheon', 'lord', 'deceased'],
  },
  'renly-baratheon': {
    id: 'renly-baratheon',
    name: 'Renly Baratheon',
    title: 'Lord of Storm\'s End',
    house: 'baratheon',
    image: '/images/renly-baratheon.png',
    isDead: true,
    bio: 'Renly Baratheon was the youngest of the three Baratheon brothers and Lord of Storm\'s End. Charismatic and popular, he claimed the crown despite having no legal right.',
    spoilerBio: 'Renly was assassinated by a shadow creature birthed by the Red Priestess Melisandre using Stannis\'s life force. His death scattered the largest army in Westeros.',
    tags: ['baratheon', 'lord', 'deceased'],
  },
  'gendry-baratheon': {
    id: 'gendry-baratheon',
    name: 'Gendry Baratheon',
    title: 'Lord of Storm\'s End',
    house: 'baratheon',
    image: '/images/gendry-baratheon.png',
    isDead: false,
    bio: 'Gendry is the unacknowledged bastard son of King Robert Baratheon. A skilled blacksmith raised in Flea Bottom, he had no idea of his royal heritage.',
    spoilerBio: 'Gendry was legitimized by Daenerys Targaryen and granted Storm\'s End, becoming Lord Gendry Baratheon and reviving the house.',
    tags: ['baratheon', 'lord', 'bastard', 'alive'],
  },

  // ── HOUSE GREYJOY ────────────────────────────────────────────────────────
  'balon-greyjoy': {
    id: 'balon-greyjoy',
    name: 'Balon Greyjoy',
    title: 'Lord of the Iron Islands',
    alias: 'King of Salt and Rock',
    house: 'greyjoy',
    image: '/images/balon-greyjoy.png',
    isDead: true,
    bio: 'Balon Greyjoy was the Lord of the Iron Islands and head of House Greyjoy. A proud and stubborn man, he led a failed rebellion against the Iron Throne and later declared independence during the War of the Five Kings.',
    spoilerBio: 'Balon was murdered by his brother Euron, who pushed him off a bridge at Pyke during a storm to seize control of the Iron Islands.',
    quote: 'We do not sow.',
    tags: ['greyjoy', 'lord', 'iron islands', 'deceased'],
  },
  'theon-greyjoy': {
    id: 'theon-greyjoy',
    name: 'Theon Greyjoy',
    title: 'Prince of the Iron Islands',
    alias: 'Reek',
    house: 'greyjoy',
    image: '/images/theon-greyjoy.png',
    isDead: true,
    bio: 'Theon Greyjoy was the last living son of Balon Greyjoy, taken as a ward of Winterfell after the Greyjoy Rebellion. Torn between loyalty to the Starks and his Ironborn heritage.',
    spoilerBio: 'Theon betrayed the Starks by seizing Winterfell, was captured and tortured by Ramsay Bolton into "Reek," but ultimately found redemption. He died defending Bran Stark against the Night King in the Battle of Winterfell.',
    quote: 'My real father lost his head at King\'s Landing. I made a choice, and I chose wrong.',
    tags: ['greyjoy', 'prince', 'deceased'],
  },
  'yara-greyjoy': {
    id: 'yara-greyjoy',
    name: 'Yara Greyjoy',
    title: 'Queen of the Iron Islands',
    house: 'greyjoy',
    image: '/images/yara-greyjoy.png',
    isDead: false,
    bio: 'Yara Greyjoy is the daughter of Balon Greyjoy and a fierce Ironborn warrior. She is one of the best ship captains in the Iron Islands.',
    spoilerBio: 'Yara allied with Daenerys Targaryen and fought against her uncle Euron. After the war, she became the ruler of the Iron Islands.',
    tags: ['greyjoy', 'queen', 'iron islands', 'alive'],
  },
  'euron-greyjoy': {
    id: 'euron-greyjoy',
    name: 'Euron Greyjoy',
    title: 'King of the Iron Islands',
    alias: 'Crow\'s Eye',
    house: 'greyjoy',
    image: '/images/euron-greyjoy.png',
    isDead: true,
    bio: 'Euron Greyjoy was the younger brother of Balon and one of the most dangerous men in the known world. A pirate king who sailed to the edges of the world and back.',
    spoilerBio: 'Euron killed his brother Balon to seize the Salt Throne. He allied with Cersei and killed Rhaegal the dragon. He was mortally wounded by Jaime Lannister during the fall of King\'s Landing.',
    quote: 'I am the storm, brother. The first storm, and the last.',
    tags: ['greyjoy', 'king', 'pirate', 'deceased'],
  },

  // ── HOUSE TYRELL ─────────────────────────────────────────────────────────
  'mace-tyrell': {
    id: 'mace-tyrell',
    name: 'Mace Tyrell',
    title: 'Lord of Highgarden, Warden of the South',
    house: 'tyrell',
    image: '/images/mace-tyrell.png',
    isDead: true,
    bio: 'Mace Tyrell was the Lord of Highgarden and Warden of the South. A rotund, affable man, much of his house\'s political maneuvering was orchestrated by his mother Olenna.',
    spoilerBio: 'Mace was killed in the destruction of the Great Sept of Baelor, orchestrated by Cersei Lannister.',
    tags: ['tyrell', 'lord', 'highgarden', 'deceased'],
  },
  'olenna-tyrell': {
    id: 'olenna-tyrell',
    name: 'Olenna Tyrell',
    title: 'Lady of Highgarden',
    alias: 'The Queen of Thorns',
    house: 'tyrell',
    image: '/images/olenna-tyrell.png',
    isDead: true,
    bio: 'Lady Olenna Tyrell, the Queen of Thorns, was the matriarch of House Tyrell and one of the most cunning political minds in Westeros. Sharp-tongued and fearless, she was the true power behind Highgarden.',
    spoilerBio: 'Olenna orchestrated the poisoning of King Joffrey at the Purple Wedding. After Highgarden fell to the Lannisters, Jaime gave her poison. Her final act was confessing to Joffrey\'s murder: "Tell Cersei. I want her to know it was me."',
    quote: 'Tell Cersei. I want her to know it was me.',
    tags: ['tyrell', 'lady', 'deceased'],
  },
  'margaery-tyrell': {
    id: 'margaery-tyrell',
    name: 'Margaery Tyrell',
    title: 'Queen of the Seven Kingdoms',
    house: 'tyrell',
    image: '/images/margaery-tyrell.png',
    isDead: true,
    bio: 'Margaery Tyrell was the daughter of Mace Tyrell. Beautiful, ambitious, and politically savvy, she married two kings and was beloved by the common people.',
    spoilerBio: 'Margaery married Renly, Joffrey, and Tommen in succession. She sensed the danger of the wildfire trap at the Sept of Baelor but was unable to escape. She was killed in the explosion orchestrated by Cersei.',
    quote: 'I don\'t want to be A queen. I want to be THE queen.',
    tags: ['tyrell', 'queen', 'deceased'],
  },
  'loras-tyrell': {
    id: 'loras-tyrell',
    name: 'Loras Tyrell',
    title: 'Ser, Knight of Flowers',
    alias: 'The Knight of Flowers',
    house: 'tyrell',
    image: '/images/loras-tyrell.png',
    isDead: true,
    bio: 'Ser Loras Tyrell, the Knight of Flowers, was the youngest son of Mace Tyrell and one of the most skilled jousters in Westeros.',
    spoilerBio: 'Loras was imprisoned by the Faith Militant and killed in the destruction of the Great Sept of Baelor.',
    tags: ['tyrell', 'knight', 'deceased'],
  },

  // ── HOUSE MARTELL ────────────────────────────────────────────────────────
  'doran-martell': {
    id: 'doran-martell',
    name: 'Doran Martell',
    title: 'Prince of Dorne',
    house: 'martell',
    image: '/images/doran-martell.png',
    isDead: true,
    bio: 'Prince Doran Martell was the ruler of Dorne and the head of House Martell. A cautious and patient man confined to a wheelchair by gout, he was a careful strategist.',
    spoilerBio: 'Doran was murdered by Ellaria Sand and the Sand Snakes in a coup, who felt he was too passive in seeking vengeance for Oberyn.',
    tags: ['martell', 'prince', 'dorne', 'deceased'],
  },
  'oberyn-martell': {
    id: 'oberyn-martell',
    name: 'Oberyn Martell',
    title: 'Prince of Dorne',
    alias: 'The Red Viper',
    house: 'martell',
    image: '/images/oberyn-martell.png',
    isDead: true,
    bio: 'Prince Oberyn Martell, the Red Viper of Dorne, was the younger brother of Doran. A legendary warrior, lover, and scholar who studied at the Citadel and fought across Essos.',
    spoilerBio: 'Oberyn fought as Tyrion\'s champion in trial by combat against the Mountain, Gregor Clegane. Though he had the Mountain defeated, his insistence on extracting a confession cost him his life — Clegane crushed his skull.',
    quote: 'You raped her. You murdered her. You killed her children.',
    tags: ['martell', 'prince', 'warrior', 'deceased'],
  },
  'trystane-martell': {
    id: 'trystane-martell',
    name: 'Trystane Martell',
    title: 'Prince of Dorne',
    house: 'martell',
    image: '/images/trystane-martell.png',
    isDead: true,
    bio: 'Prince Trystane Martell was the son of Doran Martell and heir to Dorne. A gentle young man who was betrothed to Myrcella Baratheon.',
    spoilerBio: 'Trystane was murdered by the Sand Snakes as part of their coup against House Martell.',
    tags: ['martell', 'prince', 'deceased'],
  },

  // ── HOUSE ARRYN ──────────────────────────────────────────────────────────
  'jon-arryn': {
    id: 'jon-arryn',
    name: 'Jon Arryn',
    title: 'Lord of the Eyrie, Hand of the King',
    house: 'arryn',
    image: '/images/jon-arryn.png',
    isDead: true,
    bio: 'Jon Arryn was the Lord of the Eyrie, Warden of the East, and Hand of the King to Robert Baratheon. He fostered both Ned Stark and Robert Baratheon, and helped lead the rebellion.',
    spoilerBio: 'Jon Arryn was poisoned by his own wife Lysa at the instigation of Petyr Baelish. His death set the entire story in motion, as Robert asked Ned to become the new Hand.',
    quote: 'The seed is strong.',
    tags: ['arryn', 'lord', 'hand of the king', 'deceased'],
  },
  'lysa-arryn': {
    id: 'lysa-arryn',
    name: 'Lysa Arryn',
    title: 'Lady Regent of the Vale',
    house: 'arryn',
    image: '/images/lysa-arryn.png',
    isDead: true,
    bio: 'Lysa Arryn, born Lysa Tully, was the sister of Catelyn Stark and the wife of Jon Arryn. Unstable and obsessively protective of her sickly son Robin.',
    spoilerBio: 'Lysa poisoned her husband Jon Arryn on Littlefinger\'s orders and was later pushed through the Moon Door by Littlefinger himself.',
    tags: ['arryn', 'tully', 'lady', 'deceased'],
  },
  'robin-arryn': {
    id: 'robin-arryn',
    name: 'Robin Arryn',
    title: 'Lord of the Eyrie',
    house: 'arryn',
    image: '/images/robin-arryn.png',
    isDead: false,
    bio: 'Robin Arryn is the son of Jon and Lysa Arryn. A sickly and spoiled child who was Lord of the Eyrie from a young age.',
    spoilerBio: 'Robin was one of the lords who voted to make Bran Stark king.',
    tags: ['arryn', 'lord', 'alive'],
  },

  // ── HOUSE TULLY ──────────────────────────────────────────────────────────
  'hoster-tully': {
    id: 'hoster-tully',
    name: 'Hoster Tully',
    title: 'Lord of Riverrun',
    house: 'tully',
    image: '/images/hoster-tully.png',
    isDead: true,
    bio: 'Lord Hoster Tully was the Lord of Riverrun and head of House Tully. He allied with the rebels during Robert\'s Rebellion by marrying his daughters to Ned Stark and Jon Arryn.',
    tags: ['tully', 'lord', 'riverrun', 'deceased'],
  },
  'edmure-tully': {
    id: 'edmure-tully',
    name: 'Edmure Tully',
    title: 'Lord of Riverrun',
    house: 'tully',
    image: '/images/edmure-tully.png',
    isDead: false,
    bio: 'Edmure Tully is the son of Hoster Tully and Lord of Riverrun. Well-meaning but often bumbling, he played a key role in the War of the Five Kings.',
    spoilerBio: 'Edmure was captured at the Red Wedding and held prisoner for years. He was eventually freed and attended the council that chose Bran as king.',
    quote: 'Family, duty, honor.',
    tags: ['tully', 'lord', 'riverrun', 'alive'],
  },
};

// ─── Houses ──────────────────────────────────────────────────────────────────

export const houses: House[] = [
  {
    id: 'stark',
    name: 'House Stark',
    motto: 'Winter is Coming',
    region: 'The North',
    seat: 'Winterfell',
    status: 'Great House',
    color: 'stark',
    icon: 'ac_unit',
    description: 'An ancient lineage stretching back eight thousand years to the Age of Heroes, the Starks ruled as Kings in the North before bending the knee to Aegon the Conqueror. Honor, duty, and resilience define their legacy.',
    tree: {
      characterId: 'rickard-stark',
      children: [
        { characterId: 'brandon-stark-elder' },
        {
          characterId: 'eddard-stark',
          spouse: 'catelyn-stark',
          children: [
            { characterId: 'robb-stark' },
            { characterId: 'sansa-stark' },
            { characterId: 'arya-stark' },
            { characterId: 'bran-stark' },
            { characterId: 'rickon-stark' },
            { characterId: 'jon-snow' },
          ],
        },
        { characterId: 'lyanna-stark' },
        { characterId: 'benjen-stark' },
      ],
    },
    memberIds: ['rickard-stark', 'brandon-stark-elder', 'eddard-stark', 'catelyn-stark', 'lyanna-stark', 'benjen-stark', 'robb-stark', 'sansa-stark', 'arya-stark', 'bran-stark', 'rickon-stark', 'jon-snow'],
  },
  {
    id: 'targaryen',
    name: 'House Targaryen',
    motto: 'Fire and Blood',
    region: 'Crownlands',
    seat: 'Dragonstone',
    status: 'Royal House',
    color: 'targaryen',
    icon: 'local_fire_department',
    description: 'Dragonlords of Old Valyria who conquered and united the Seven Kingdoms. Though their dynasty fell with the Mad King, the blood of the dragon endures.',
    tree: {
      characterId: 'aerys-targaryen',
      spouse: 'rhaella-targaryen',
      children: [
        { characterId: 'rhaegar-targaryen' },
        { characterId: 'viserys-targaryen' },
        { characterId: 'daenerys-targaryen' },
      ],
    },
    memberIds: ['aerys-targaryen', 'rhaella-targaryen', 'rhaegar-targaryen', 'viserys-targaryen', 'daenerys-targaryen', 'jon-snow'],
  },
  {
    id: 'lannister',
    name: 'House Lannister',
    motto: 'Hear Me Roar',
    region: 'Westerlands',
    seat: 'Casterly Rock',
    status: 'Great House',
    color: 'lannister',
    icon: 'savings',
    description: 'The richest house in Westeros, the golden lions of Casterly Rock. Their unofficial motto — "A Lannister always pays his debts" — is known and feared across the realm.',
    tree: {
      characterId: 'tywin-lannister',
      spouse: 'joanna-lannister',
      children: [
        {
          characterId: 'cersei-lannister',
          children: [
            { characterId: 'joffrey-baratheon' },
            { characterId: 'myrcella-baratheon' },
            { characterId: 'tommen-baratheon' },
          ],
        },
        { characterId: 'jaime-lannister' },
        { characterId: 'tyrion-lannister' },
      ],
    },
    memberIds: ['tywin-lannister', 'joanna-lannister', 'cersei-lannister', 'jaime-lannister', 'tyrion-lannister', 'joffrey-baratheon', 'myrcella-baratheon', 'tommen-baratheon'],
  },
  {
    id: 'baratheon',
    name: 'House Baratheon',
    motto: 'Ours is the Fury',
    region: 'Stormlands',
    seat: 'Storm\'s End',
    status: 'Royal House',
    color: 'baratheon',
    icon: 'bolt',
    description: 'Founded by Orys Baratheon, rumored bastard brother of Aegon the Conqueror, the stag lords ruled the Stormlands for centuries before seizing the Iron Throne through rebellion.',
    tree: {
      characterId: 'robert-baratheon',
      children: [
        { characterId: 'gendry-baratheon' },
      ],
    },
    memberIds: ['robert-baratheon', 'stannis-baratheon', 'renly-baratheon', 'gendry-baratheon'],
  },
  {
    id: 'greyjoy',
    name: 'House Greyjoy',
    motto: 'We Do Not Sow',
    region: 'Iron Islands',
    seat: 'Pyke',
    status: 'Great House',
    color: 'greyjoy',
    icon: 'anchor',
    description: 'The ironborn lords of the sea, ruling from the harsh rocks of Pyke. They live by the Old Way — taking what they want through strength and paying the iron price.',
    tree: {
      characterId: 'balon-greyjoy',
      children: [
        { characterId: 'theon-greyjoy' },
        { characterId: 'yara-greyjoy' },
      ],
    },
    memberIds: ['balon-greyjoy', 'theon-greyjoy', 'yara-greyjoy', 'euron-greyjoy'],
  },
  {
    id: 'tyrell',
    name: 'House Tyrell',
    motto: 'Growing Strong',
    region: 'The Reach',
    seat: 'Highgarden',
    status: 'Great House',
    color: 'tyrell',
    icon: 'local_florist',
    description: 'The roses of Highgarden, stewards who rose to lords. The wealthiest and most fertile region of Westeros made the Tyrells powerful through food, gold, and strategic marriages.',
    tree: {
      characterId: 'mace-tyrell',
      children: [
        { characterId: 'margaery-tyrell' },
        { characterId: 'loras-tyrell' },
      ],
    },
    memberIds: ['mace-tyrell', 'olenna-tyrell', 'margaery-tyrell', 'loras-tyrell'],
  },
  {
    id: 'martell',
    name: 'House Martell',
    motto: 'Unbowed, Unbent, Unbroken',
    region: 'Dorne',
    seat: 'Sunspear',
    status: 'Great House',
    color: 'martell',
    icon: 'wb_sunny',
    description: 'The only kingdom to resist Aegon\'s Conquest, Dorne joined through marriage, not war. The Martells are proud, passionate, and follow their own customs of equal inheritance.',
    tree: {
      characterId: 'doran-martell',
      children: [
        { characterId: 'trystane-martell' },
      ],
    },
    memberIds: ['doran-martell', 'oberyn-martell', 'trystane-martell'],
  },
  {
    id: 'arryn',
    name: 'House Arryn',
    motto: 'As High as Honor',
    region: 'The Vale',
    seat: 'The Eyrie',
    status: 'Great House',
    color: 'arryn',
    icon: 'flight',
    description: 'Lords of the Eyrie, an impregnable castle high in the Mountains of the Moon. The Arryns claim descent from the Kings of Mountain and Vale, one of the oldest noble lines in Westeros.',
    tree: {
      characterId: 'jon-arryn',
      spouse: 'lysa-arryn',
      children: [
        { characterId: 'robin-arryn' },
      ],
    },
    memberIds: ['jon-arryn', 'lysa-arryn', 'robin-arryn'],
  },
  {
    id: 'tully',
    name: 'House Tully',
    motto: 'Family, Duty, Honor',
    region: 'Riverlands',
    seat: 'Riverrun',
    status: 'Great House',
    color: 'tully',
    icon: 'water',
    description: 'Lords of Riverrun and Lords Paramount of the Trident. The Tullys rule the war-torn Riverlands, a land of rivers and crossroads that has seen more conflict than any other region.',
    tree: {
      characterId: 'hoster-tully',
      children: [
        { characterId: 'catelyn-stark' },
        { characterId: 'lysa-arryn' },
        { characterId: 'edmure-tully' },
      ],
    },
    memberIds: ['hoster-tully', 'catelyn-stark', 'lysa-arryn', 'edmure-tully'],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getCharacter(id: string): Character | undefined {
  return characters[id];
}

export function getHouse(id: string): House | undefined {
  return houses.find(h => h.id === id);
}

export function getHouseMembers(houseId: string): Character[] {
  const house = getHouse(houseId);
  if (!house) return [];
  return house.memberIds.map(id => characters[id]).filter(Boolean);
}

export function searchCharacters(query: string): Character[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return Object.values(characters).filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.alias?.toLowerCase().includes(q) ||
    c.title.toLowerCase().includes(q) ||
    c.house.toLowerCase().includes(q) ||
    c.tags.some(t => t.includes(q))
  );
}

export function searchAll(query: string): { characters: Character[]; houses: House[] } {
  const q = query.toLowerCase().trim();
  if (!q) return { characters: [], houses: [] };
  return {
    characters: searchCharacters(query),
    houses: houses.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.motto.toLowerCase().includes(q) ||
      h.region.toLowerCase().includes(q) ||
      h.seat.toLowerCase().includes(q)
    ),
  };
}
