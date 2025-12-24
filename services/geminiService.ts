import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, MealPlanResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMealPlan = async (prefs: UserPreferences): Promise<MealPlanResponse> => {
  const modelId = "gemini-3-flash-preview";

  const systemInstruction = `
    You are a world-class nutritionist and chef. 
    Your goal is to create a highly practical, delicious, and healthy weekly meal plan.
    Consider the user's dietary restrictions, ingredients they already have, and their health goals.
    Ensure the grocery list is consolidated and organized by category (e.g., Produce, Dairy, Pantry).
    Keep meal descriptions appetizing but concise.
  `;

  const prompt = `
    Generate a 7-day meal plan for a user with the following profile:
    - Diet Type: ${prefs.dietType}
    - Allergies/Restrictions: ${prefs.allergies || "None"}
    - Available Ingredients: ${prefs.ingredients || "None specified"}
    - Number of People: ${prefs.servings}
    - Primary Goal: ${prefs.goal}
    ${prefs.caloriesPerDay ? `- Target Calories: ~${prefs.caloriesPerDay} per day` : ''}

    Return the response in a structured JSON format.
  `;

  // Define the schema for structured output
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      weeklyPlan: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            dayName: { type: Type.STRING },
            breakfast: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                prepTime: { type: Type.STRING },
                calories: { type: Type.INTEGER },
              },
              required: ["name", "description", "prepTime", "calories"],
            },
            lunch: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                prepTime: { type: Type.STRING },
                calories: { type: Type.INTEGER },
              },
              required: ["name", "description", "prepTime", "calories"],
            },
            dinner: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                prepTime: { type: Type.STRING },
                calories: { type: Type.INTEGER },
              },
              required: ["name", "description", "prepTime", "calories"],
            },
            snack: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                prepTime: { type: Type.STRING },
                calories: { type: Type.INTEGER },
              },
              required: ["name", "description", "prepTime", "calories"],
            },
          },
          required: ["dayName", "breakfast", "lunch", "dinner", "snack"],
        },
      },
      groceryList: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            categoryName: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["categoryName", "items"],
        },
      },
      summary: { type: Type.STRING },
    },
    required: ["weeklyPlan", "groceryList", "summary"],
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    if (!response.text) {
      throw new Error("No content generated.");
    }

    const data = JSON.parse(response.text) as MealPlanResponse;
    return data;

  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
};