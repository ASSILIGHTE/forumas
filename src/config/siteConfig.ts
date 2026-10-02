export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  caption: string;
  speechBubble: string;
}

export interface StoryChapter {
  id: string;
  chapterNum: string;
  icon: string;
  title: string;
  subtitle: string;
  quote: string;
  color: 'red' | 'blue' | 'accent';
  image?: string;
}

export interface SuperpowerCard {
  id: string;
  icon: string;
  title: string;
  powerName: string;
  description: string;
  secretDetail: string;
  color: string;
}

export interface WebHeartMessage {
  id: number;
  x: number; // percentage
  y: number; // percentage
  message: string;
}

export interface SiteConfig {
  yourName: string;
  partnerName: string;
  birthdayDate: string; // ISO format or string
  anniversaryDate: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  letterTitle: string;
  letterContent: string[];
  finalRooftopQuote1: string;
  finalRooftopQuote2: string;
  memories: MemoryPhoto[];
  chapters: StoryChapter[];
  superpowers: SuperpowerCard[];
  webMessages: WebHeartMessage[];
}

export const defaultConfig: SiteConfig = {
  yourName: "Aku 🤍",
  partnerName: "Mas 🤍",
  birthdayDate: "2026-10-03T00:00:00",
  anniversaryDate: "2023-05-15",
  heroHeadline: "HAPPY BOYFRIEND DAY, MASSS 🤍",
  heroSubheadline: "Selamat hari boyfriend untuk manusia yang entah gimana ceritanya sekarang bisa jadi salah satu orang yang paling aku tunggu kabarnya setiap hari.",
  heroImage: "",
  letterTitle: "CONFIDENTIAL LETTER UNTUK MAS… 🤍",
  letterContent: [
    "Happy Boyfriend Day ya, Mas. 🤍",
    "Selamat hari boyfriend untuk manusia yang entah gimana ceritanya sekarang bisa jadi salah satu orang yang paling aku tunggu kabarnya setiap hari.",
    "Padahal awalnya aku cuek banget ya, Mas? 😭 Mas yang berkali-kali ngajak kenalan, aku yang sok jual mahal dan pura-pura nggak peduli. Tapi ternyata sekarang… kok aku yang jadi kangen terus ya? 😭",
    "Terima kasih ya, Mas, sudah sabar menghadapi aku yang kadang manja, kadang diem, kadang tiba-tiba overthinking, kadang mikirin sesuatu yang bahkan belum tentu terjadi 😭",
    "Terima kasih juga karena Mas selalu berusaha membuat aku merasa aman.",
    "Aku nggak cuma mau punya Mas untuk hari ini. Aku mau punya banyak 'hari' bersama Mas.",
    "Terima kasih sudah datang ke hidup aku. Terima kasih sudah membuat aku merasa disayangi. Terima kasih sudah memilih untuk tetap mengenal aku meskipun aku nggak selalu mudah.",
    "Dan terima kasih karena sampai hari ini… Mas masih jadi orang yang bikin aku senyum sendiri cuma gara-gara satu chat. 😭",
    "Aku sayang Mas. Banyak. Walaupun kadang aku gengsi bilangnya. Hehehe. 🤍",
    "Semoga nanti ada waktunya hal kecil ini bukan cuma jadi kenangan tentang masa LDR kita, tapi jadi bukti kalau kita pernah sejauh ini… dan akhirnya berhasil sampai di satu tempat yang sama. 🤍",
    "Dan semoga… di antara banyak hal baik yang Tuhan kasih ke Mas nanti, aku masih menjadi salah satu hal yang Mas pilih untuk tetap dipertahankan. 🤍",
    "Semoga pekerjaan Mas dilancarkan, rezeki Mas dimudahkan, dan semua usaha yang Mas lakukan perlahan membawa Mas menuju hal-hal yang Mas impikan.",
    "Aku juga berdoa semoga Mas selalu dikelilingi orang-orang yang tulus, yang menghargai Mas, dan yang nggak membuat Mas merasa sendirian.",
    "Dan semoga Tuhan menjaga kita juga… menjaga hati kita, menjaga hubungan kita, dan menjaga langkah kita supaya kalau memang kita ditakdirkan untuk terus bersama, kita bisa sampai ke tujuan itu dengan cara yang baik. 🤍"
  ],
  finalRooftopQuote1: "Dan semoga di antara banyak hal baik yang Tuhan kasih ke Mas nanti...",
  finalRooftopQuote2: "...aku masih menjadi salah satu hal yang Mas pilih untuk tetap dipertahankan. 🤍",
  memories: [],
  chapters: [
    {
      id: "ch1",
      chapterNum: "CHAPTER 01",
      icon: "🙈",
      title: "Dulu Cuek, Sekarang Kangen terus",
      subtitle: "The Origin Story",
      quote: "Padahal awalnya aku cuek banget ya, Mas? Mas yang berkali-kali ngajak kenalan, aku sok jual mahal. Tapi kok sekarang aku yang kangen terus? 😭",
      color: "red"
    },
    {
      id: "ch2",
      chapterNum: "CHAPTER 02",
      icon: "💬",
      title: "Senyum Sendiri Cuma 1 Chat",
      subtitle: "Momen Paling Manis",
      quote: "Sampai hari ini… Mas masih jadi orang yang bikin aku senyum sendiri cuma gara-gara satu chat. 😭",
      color: "blue"
    },
    {
      id: "ch3",
      chapterNum: "CHAPTER 03",
      icon: "🛡️",
      title: "Sabar & Selalu Membuat Aman",
      subtitle: "Pelindung Favoritku",
      quote: "Terima kasih ya, Mas, sudah sabar menghadapi aku yang kadang manja, diem, overthinking, & selalu berusaha membuat aku merasa aman. 🤍",
      color: "accent"
    },
    {
      id: "ch4",
      chapterNum: "CHAPTER 04",
      icon: "✈️",
      title: "LDR Sampai Tempat Yang Sama",
      subtitle: "Doa & Impian Kita",
      quote: "Semoga hal ini bukan cuma kenangan LDR, tapi bukti kita berhasil sampai di satu tempat yang sama. 🤍",
      color: "red"
    }
  ],
  superpowers: [
    {
      id: "sp1",
      icon: "💬",
      title: "SUPER CHAT SMILE",
      powerName: "Sinar Penenang Mood",
      description: "Cuma gara-gara 1 chat dari Mas, aku langsung senyum-senyum sendiri seharian 😭",
      secretDetail: "Efek: Bikin mood yang tadinya capek langsung aman dan gembira.",
      color: "red"
    },
    {
      id: "sp2",
      icon: "🛡️",
      title: "SUPER SAFETY HEART",
      powerName: "Pelindung & Rasa Aman",
      description: "Mas selalu berusaha membuat aku merasa aman dan tenang walaupun aku suka overthinking.",
      secretDetail: "Efek: Bikin berasa paling dihargai dan hangat banget.",
      color: "blue"
    },
    {
      id: "sp3",
      icon: "🧘‍♂️",
      title: "SUPER PATIENCE",
      powerName: "Tingkat Kesabaran 1000%",
      description: "Sabar banget ngehadapin aku yang kadang manja, kadang diem, kadang mikirin sesuatu yang belum tentu terjadi.",
      secretDetail: "Efek: Tempat cerita paling nyaman di dunia.",
      color: "accent"
    },
    {
      id: "sp4",
      icon: "🤍",
      title: "SUPER MAS",
      powerName: "Paket Lengkap Favoritku",
      description: "Aku mau punya banyak 'hari' bersama Mas. Tetap dipertahankan selamanya.",
      secretDetail: "Efek: Dicintai 100% tanpa syarat sampai ke tujuan yang sama.",
      color: "red"
    }
  ],
  webMessages: [
    { id: 1, x: 22, y: 30, message: "Aku sayang Mas. Banyak! 🤍" },
    { id: 2, x: 78, y: 25, message: "Bikin senyum sendiri gara-gara 1 chat 😭" },
    { id: 3, x: 28, y: 72, message: "Aku mau punya banyak 'hari' bersama Mas ✨" },
    { id: 4, x: 72, y: 75, message: "Terima kasih selalu buat aku merasa aman ❤️" },
    { id: 5, x: 50, y: 50, message: "Semoga kita berhasil sampai di tempat yang sama 🏠" }
  ]
};

const STORAGE_KEY = "spiderman_birthday_config_v2";

export function loadConfig(): SiteConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.heroImage && parsed.heroImage.includes('/photos/')) {
        parsed.heroImage = '';
      }
      return { ...defaultConfig, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load custom config", e);
  }
  return defaultConfig;
}

export function saveConfig(config: SiteConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to save custom config", e);
  }
}
