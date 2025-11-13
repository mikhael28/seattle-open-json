/**
 * OpenAI Service for My Tickets
 * Handles transcription, ticket extraction, and text-to-speech with multilingual support
 */

interface TicketData {
  serviceRequestType: string;
  location: string;
  description?: string;
  estimatedResolutionDays?: number;
}

/**
 * Transcribe audio blob to text using OpenAI Whisper API
 * Supports multilingual transcription
 */
export async function transcribeAudio(
  audioBlob: Blob,
  apiKey: string,
  languageCode?: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.webm");
  formData.append("model", "whisper-1");

  // Add language hint if provided (helps with accuracy)
  if (languageCode) {
    formData.append("language", languageCode);
  }

  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Transcription failed: ${error.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  return data.text;
}

/**
 * Detect language from audio transcription
 */
export async function detectLanguage(
  transcription: string,
  apiKey: string
): Promise<string> {
  const systemPrompt = `You are a language detection assistant. Given a text, identify the language code.
Return ONLY a two-letter ISO 639-1 language code (e.g., "en", "es", "zh", "vi", "tl", "ko", "ru", "am", "so", "ar").
If uncertain, return "en" as default.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: transcription },
      ],
      temperature: 0,
    }),
  });

  if (!response.ok) {
    return "en"; // Fallback to English
  }

  const data = await response.json();
  return data.choices[0].message.content.trim().toLowerCase();
}

/**
 * Translate text to English for city staff
 */
export async function translateToEnglish(
  text: string,
  sourceLanguage: string,
  apiKey: string
): Promise<string> {
  if (sourceLanguage === "en") {
    return text; // No translation needed
  }

  const systemPrompt = `You are a professional translator. Translate the following text to English. 
Maintain the meaning and context accurately. Return ONLY the translated text.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Translation failed: ${error.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

/**
 * Extract ticket information from transcribed text using OpenAI GPT
 */
export async function extractTicketInfo(
  transcription: string,
  apiKey: string
): Promise<TicketData> {
  const systemPrompt = `You are an assistant that helps extract service request information from user audio transcriptions for Seattle's Find It Fix It system.

Given a transcription, extract:
1. serviceRequestType - MUST be one of these exact Seattle service request types:
   - "Pothole"
   - "Graffiti"
   - "Illegal Dumping / Needles"
   - "Abandoned Vehicle/72hr Parking Ordinance"
   - "Streetlight Maintenance"
   - "Street Sign Maintenance"
   - "Unauthorized Encampment"
   - "Parks and Recreation Maintenance"
   - "Overgrown Vegetation"
   - "Bicycle Facility Maintenance"
   - "Scooter or Bike Share Issue"
   - "Dead Animal"
   - "Animal Noise"
   - "Nuisance dogs in a park"
   - "General Inquiry - Customer Service Bureau"
   - "General Inquiry - Transportation"
   - "General Inquiry - Public Utilities"
   - "General Inquiry - Police Department"
   - "General Inquiry - Animal Shelter"

2. location - the street address or location description (e.g., "123 Main St, Seattle, WA" or "Near Green Lake Park")
3. description - brief description of the issue
4. estimatedResolutionDays - estimated days to resolve based on request type:
   - Pothole: 7-14 days
   - Graffiti: 3-5 days
   - Illegal Dumping / Needles: 5-7 days
   - Abandoned Vehicle: 72 hours (3 days)
   - Streetlight Maintenance: 14-21 days
   - Street Sign Maintenance: 10-14 days
   - Unauthorized Encampment: 7-14 days
   - Parks and Recreation Maintenance: 14-30 days
   - Overgrown Vegetation: 14-21 days
   - Bicycle Facility Maintenance: 7-14 days
   - Other requests: 7-10 days

IMPORTANT: Match the user's description to the most appropriate service request type from the list above. If unclear, default to "General Inquiry - Customer Service Bureau".

Return ONLY a JSON object with these fields.
Example: {"serviceRequestType": "Pothole", "location": "123 Main St, Seattle, WA", "description": "Large pothole causing vehicle damage", "estimatedResolutionDays": 10}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Transcription: ${transcription}` },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Ticket extraction failed: ${error.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  const ticketData = JSON.parse(data.choices[0].message.content);
  return ticketData;
}

/**
 * Generate speech from text using OpenAI TTS
 * Note: OpenAI TTS automatically detects language from input text
 */
export async function textToSpeech(
  text: string,
  apiKey: string,
  languageCode?: string
): Promise<Blob> {
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1",
      voice: "alloy",
      input: text,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `TTS failed: ${error.error?.message || response.statusText}`
    );
  }

  return await response.blob();
}

/**
 * Generate resolution date message in English
 */
export function generateResolutionMessage(
  ticketType: string,
  estimatedDays: number
): string {
  const resolutionDate = new Date();
  resolutionDate.setDate(resolutionDate.getDate() + estimatedDays);

  const dateString = resolutionDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `Your ${ticketType} service request has been received. Based on typical response times, we estimate this will be resolved by ${dateString}, approximately ${estimatedDays} days from now. Thank you for helping keep Seattle great!`;
}

/**
 * Translate message to target language
 */
export async function translateMessage(
  message: string,
  targetLanguage: string,
  apiKey: string
): Promise<string> {
  if (targetLanguage === "en") {
    return message; // No translation needed
  }

  const systemPrompt = `You are a professional translator for Seattle city services. 
Translate the following message to ${targetLanguage}. 
Maintain a friendly, professional tone appropriate for government communication with residents.
Return ONLY the translated text.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Translation failed: ${error.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

/**
 * Generate a status update message in the user's language
 */
export async function generateStatusUpdate(
  ticketType: string,
  currentStatus: string,
  estimatedCompletionDate: string,
  daysRemaining: number,
  targetLanguage: string,
  apiKey: string
): Promise<string> {
  const dateObj = new Date(estimatedCompletionDate);
  const dateString = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate English message first
  let message = "";

  if (currentStatus === "completed") {
    message = `Great news! Your ${ticketType} service request has been completed. Thank you for helping keep Seattle beautiful!`;
  } else if (currentStatus === "in_progress") {
    message = `Your ${ticketType} request is currently being worked on by our crew. We expect to complete this work by ${dateString}, approximately ${daysRemaining} days from now.`;
  } else if (currentStatus === "assigned") {
    message = `Your ${ticketType} request has been assigned to a crew member. Work will begin soon. Expected completion date is ${dateString}.`;
  } else {
    message = `Your ${ticketType} service request has been received. We are reviewing it and will begin work soon. Estimated completion is ${dateString}.`;
  }

  // Translate to target language
  return await translateMessage(message, targetLanguage, apiKey);
}
