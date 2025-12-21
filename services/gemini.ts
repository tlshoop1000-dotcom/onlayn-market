
import { GoogleGenAI } from "@google/genai";
import { products } from "../data/products";

const API_KEY = process.env.API_KEY || "";

export async function getShoppingAdvice(userPrompt: string, history: { role: string; parts: { text: string }[] }[]) {
  if (!API_KEY) {
    return "AI Assistant is currently unavailable (Missing API Key).";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const productContext = products.map(p => 
    `${p.name} ($${p.price}) in ${p.category}: ${p.description}`
  ).join('\n');

  const systemInstruction = `
    You are the "NovaMarket Virtual Concierge", an expert shopping assistant.
    The store sells high-end electronics, gadgets, fashion, and home goods.
    Your goal is to help users find the perfect product from our catalog.
    
    Our Current Inventory:
    ${productContext}

    Guidelines:
    1. Be polite, professional, and slightly enthusiastic.
    2. If the user asks for a recommendation, suggest products from the inventory listed above.
    3. Always mention the price and key benefit of a suggested product.
    4. If someone asks for something we don't have, politely explain we don't carry it yet but suggest the closest alternative from our inventory.
    5. Keep responses concise (under 100 words).
    6. If the user asks for "Onlayn market", note that we are a premium digital marketplace.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
}
