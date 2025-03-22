import { type NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { recipeDescription } = await req.json();

    if (!recipeDescription) {
      return NextResponse.json(
        { error: "Recipe description is required" },
        { status: 400 }
      );
    }

    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 }
      );
    }

    // Initialize the Google Generative AI with the AI SDK
    const google = createGoogleGenerativeAI({ apiKey });

    // Create a structured prompt to get nutritional information
    const prompt = `
    Analyze the following recipe or ingredients list and provide detailed nutritional information:
    
    "${recipeDescription}"
    
    Please provide a JSON response with the following structure:
    {
      "recipe": {
        "title": "A descriptive title based on the ingredients and cooking method",
        "ingredients": [
          {
            "name": "ingredient name",
            "amount": "amount with unit",
            "calories": number,
            "protein": number,
            "carbs": number,
            "fat": number
          }
        ],
        "totalNutrition": {
          "calories": number,
          "protein": number,
          "carbs": number,
          "fat": number,
          "fiber": number,
          "sugar": number,
          "sodium": number
        },
        "servings": number,
        "vitamins": {
          "a": number,
          "c": number,
          "d": number,
          "e": number,
          "k": number
        },
        "minerals": {
          "calcium": number,
          "iron": number,
          "potassium": number,
          "magnesium": number
        },
        "cookingMethod": "description of cooking method",
        "healthTags": ["tag1", "tag2"]
      }
    }
    
    Use standard nutritional databases to estimate values. If quantities are not specified, make reasonable assumptions for a standard recipe. Provide all numerical values as numbers, not strings.
    `;

    // Generate content using the AI SDK
    const result = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: prompt,
    });

    // Extract the JSON from the response
    // The model might wrap the JSON in markdown code blocks or add extra text
    const jsonMatch =
      result.text.match(/```json\n([\s\S]*?)\n```/) ||
      result.text.match(/```\n([\s\S]*?)\n```/) ||
      result.text.match(/{[\s\S]*}/);

    let jsonString = jsonMatch ? jsonMatch[0] : result.text;

    // Clean up the string to ensure it's valid JSON
    jsonString = jsonString.replace(/```json\n|```\n|```/g, "").trim();

    try {
      // Parse the JSON
      const nutritionData = JSON.parse(jsonString);
      return NextResponse.json(nutritionData);
    } catch (jsonError) {
      console.error("Error parsing JSON from AI response:", jsonError);
      console.log("Raw AI response:", result.text);
      return NextResponse.json(
        { error: "Failed to parse nutritional data from AI response" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error analyzing recipe:", error);
    return NextResponse.json(
      { error: "Failed to analyze recipe. Please try again." },
      { status: 500 }
    );
  }
}
