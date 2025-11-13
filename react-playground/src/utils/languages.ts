/**
 * Language Support Utilities
 * Provides multilingual support for immigrant users
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  prompt: string; // "What language do you speak?" in the language
  whisperCode: string; // OpenAI Whisper language code
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    prompt: "What language do you speak?",
    whisperCode: "en"
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    prompt: "¿Qué idioma habla usted?",
    whisperCode: "es"
  },
  {
    code: "zh",
    name: "Chinese (Mandarin)",
    nativeName: "中文 (普通话)",
    prompt: "您说什么语言？",
    whisperCode: "zh"
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    prompt: "Bạn nói ngôn ngữ gì?",
    whisperCode: "vi"
  },
  {
    code: "tl",
    name: "Tagalog",
    nativeName: "Tagalog",
    prompt: "Anong wika ang iyong sinasalita?",
    whisperCode: "tl"
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    prompt: "어떤 언어를 사용하시나요?",
    whisperCode: "ko"
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    prompt: "На каком языке вы говорите?",
    whisperCode: "ru"
  },
  {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    prompt: "ምን ቋንቋ ትናገራለህ?",
    whisperCode: "am"
  },
  {
    code: "so",
    name: "Somali",
    nativeName: "Soomaali",
    prompt: "Luuqad maxaad ku hadashtaa?",
    whisperCode: "so"
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    prompt: "ما اللغة التي تتحدثها؟",
    whisperCode: "ar"
  }
];

export function getLanguageByCode(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
}

export function getLanguageName(code: string): string {
  const lang = getLanguageByCode(code);
  return lang ? lang.nativeName : "English";
}


