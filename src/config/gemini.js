/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
import dotenv from "dotenv";
dotenv.config();

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "process.env.GOOGLE_GEN_AI_KEY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  
  // Await response.text() to get the actual text
  const response = await result.response.text();
  console.log(response);

  // Return the response text
  return response;
}

export default run;
