import { env } from "../config";

// Translate Text API
export const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        sourceLang,
        targetLang,
      }),
    });

    const data = await response.json();

    return data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "";
  }
};

/**
 * Synthesize speech from text
 * @param {string} text - The text to synthesize
 * @param {Object} voice - The voice configuration
 * @param {string} voice.languageCode - The language code (e.g. "en-US")
 * @param {string} voice.name - The voice name (e.g. "en-US-Standard-A")
 * @param {string} voice.ssmlGender - The voice gender (e.g. "FEMALE")
 * @param {Object} audioConfig - Optional audio configuration
 * @returns {Promise<Audio|null>} Audio object or null if synthesis failed
 */
export const synthesizeSpeech = async (
  text,
  voice,
  audioConfig = { audioEncoding: "MP3" }
) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}/tts/synthesize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        voice,
        audioConfig,
      }),
    });
    const data = await response.json();

    // Convert base64 to audio
    const base64Audio = data.audioContent;
    // Create a binary string from base64
    const binaryString = window.atob(base64Audio);
    // Convert binary string to Uint8Array
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create blob from bytes
    const blob = new Blob([bytes], { type: "audio/mp3" });
    // Create URL for blob
    const audioUrl = URL.createObjectURL(blob);

    // Create and return audio element
    const audio = new Audio(audioUrl);

    // Clean up the blob URL when audio is loaded
    audio.onload = () => {
      URL.revokeObjectURL(audioUrl);
    };

    return audio;
  } catch (error) {
    console.error("Speech synthesis error:", error);
    return null;
  }
};

// Speech-to-Text Component
const transcribeAudio = async (audioBlob) => {
  const response = await fetch(`${env.API_BASE_URL}/stt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "X-Auth-Secret": "auth-secret",
    },
    body: audioBlob,
  });

  const { transcript } = await response.json();
  return transcript;
};
