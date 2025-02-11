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
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      }),
    });

    // Add this to debug the response
    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "";
  }
};

// Text-to-Speech API
export const synthesizeSpeech = async (text, ttsCode, ttsName) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}/tts/synthesize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        ttsCode,
        ttsName,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail || errorText;
      } catch {
        errorMessage = errorText;
      }
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }

    // Check if we received the correct content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("audio/mp3")) {
      throw new Error(`Expected audio/mp3 but got ${contentType}`);
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);

    // Return a promise that resolves when the audio is ready
    return new Promise((resolve, reject) => {
      audio.onloadedmetadata = () => resolve(audio);
      audio.onerror = () => reject(new Error("Failed to load audio"));

      // Clean up on error or when done playing
      const cleanup = () => URL.revokeObjectURL(audioUrl);
      audio.onended = cleanup;
      audio.onerror = () => {
        cleanup();
        reject(new Error("Audio playback failed"));
      };
    });
  } catch (error) {
    console.error("Speech synthesis error:", error);
    throw error; // Re-throw to handle in the calling code
  }
};

// Speech-to-Text API
export const transcribeAudio = async (base64audio, languageCode) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}/stt/synthesize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audioContent: base64audio,
        languageCode,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("STT error:", error);
    return { text: "", confidence: 0, langCode: "" };
  }
};
