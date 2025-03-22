"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/header";
import { Link, Plus, Save } from "lucide-react";
import AiRecipeAnalyzer from "./ai-recipe-analyzer";

export default function RecipesPage() {
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [servings, setServings] = useState(4);
  const [analyzedRecipe, setAnalyzedRecipe] = useState<null | {
    title: string;
    ingredients: string[];
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
      sugar: number;
      sodium: number;
      vitamins: {
        a: number;
        c: number;
        d: number;
        e: number;
        k: number;
      };
      minerals: {
        calcium: number;
        iron: number;
        potassium: number;
        magnesium: number;
      };
    };
  }>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/analyze-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeDescription: `Recipe from URL: ${recipeUrl}. Please analyze this URL and extract the recipe information.`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze recipe from URL");
      }

      const data = await response.json();

      // Transform the data to match our expected format
      setAnalyzedRecipe({
        title: data.recipe.title,
        ingredients: data.recipe.ingredients.map(
          (ing: any) => `${ing.amount} ${ing.name}`
        ),
        nutrition: {
          calories: data.recipe.totalNutrition.calories,
          protein: data.recipe.totalNutrition.protein,
          carbs: data.recipe.totalNutrition.carbs,
          fat: data.recipe.totalNutrition.fat,
          fiber: data.recipe.totalNutrition.fiber,
          sugar: data.recipe.totalNutrition.sugar,
          sodium: data.recipe.totalNutrition.sodium,
          vitamins: data.recipe.vitamins,
          minerals: data.recipe.minerals,
        },
      });
    } catch (error) {
      console.error("Error analyzing recipe from URL:", error);
      alert("Failed to analyze recipe from URL. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      // Prepare the recipe description from the manual inputs
      const recipeDescription = `
        Recipe title: ${recipeTitle}
        Servings: ${servings}
        
        Ingredients:
        ${recipeIngredients}
        
        Instructions:
        ${recipeInstructions}
      `;

      const response = await fetch("/api/analyze-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze recipe");
      }

      const data = await response.json();

      // Transform the data to match our expected format
      setAnalyzedRecipe({
        title: data.recipe.title,
        ingredients: data.recipe.ingredients.map(
          (ing: any) => `${ing.amount} ${ing.name}`
        ),
        nutrition: {
          calories: data.recipe.totalNutrition.calories,
          protein: data.recipe.totalNutrition.protein,
          carbs: data.recipe.totalNutrition.carbs,
          fat: data.recipe.totalNutrition.fat,
          fiber: data.recipe.totalNutrition.fiber,
          sugar: data.recipe.totalNutrition.sugar,
          sodium: data.recipe.totalNutrition.sodium,
          vitamins: data.recipe.vitamins,
          minerals: data.recipe.minerals,
        },
      });
    } catch (error) {
      console.error("Error analyzing recipe:", error);
      alert("Failed to analyze recipe. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveRecipe = () => {
    // In a real app, this would save the recipe to the user's profile
    alert("Recipe saved to your profile!");
  };

  const handleAddToMealPlan = () => {
    // In a real app, this would add the recipe to the user's meal plan
    alert("Recipe added to your meal plan!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Recipe Analyzer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Tabs defaultValue="url" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="url">Import from URL</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>

              <TabsContent value="url">
                <Card>
                  <CardHeader>
                    <CardTitle>Import Recipe from URL</CardTitle>
                    <CardDescription>
                      Paste a link to your favorite recipe and we'll analyze it
                      for you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUrlSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipe-url">Recipe URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="recipe-url"
                            placeholder="https://example.com/recipe"
                            value={recipeUrl}
                            onChange={(e) => setRecipeUrl(e.target.value)}
                            required
                          />
                          <Button type="submit" disabled={isAnalyzing}>
                            {isAnalyzing ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            ) : (
                              "Analyze"
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-500 dark:text-gray-400">
                    We support most popular recipe websites.
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="manual">
                <Card>
                  <CardHeader>
                    <CardTitle>Manual Recipe Entry</CardTitle>
                    <CardDescription>
                      Enter your recipe details manually for nutritional
                      analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleManualSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipe-title">Recipe Title</Label>
                        <Input
                          id="recipe-title"
                          placeholder="e.g., Vegetarian Pasta Salad"
                          value={recipeTitle}
                          onChange={(e) => setRecipeTitle(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipe-ingredients">
                          Ingredients (one per line)
                        </Label>
                        <Textarea
                          id="recipe-ingredients"
                          placeholder="1 cup pasta
2 tbsp olive oil
1/2 cup cherry tomatoes
..."
                          rows={6}
                          value={recipeIngredients}
                          onChange={(e) => setRecipeIngredients(e.target.value)}
                          required
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Include quantities and units (e.g., 1 cup, 2 tbsp, 3
                          oz)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipe-instructions">
                          Instructions (optional)
                        </Label>
                        <Textarea
                          id="recipe-instructions"
                          placeholder="1. Cook pasta according to package instructions.
2. Drain and rinse with cold water.
..."
                          rows={4}
                          value={recipeInstructions}
                          onChange={(e) =>
                            setRecipeInstructions(e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="servings">Servings: {servings}</Label>
                        <Slider
                          id="servings"
                          min={1}
                          max={12}
                          step={1}
                          value={[servings]}
                          onValueChange={(value) => setServings(value[0])}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <span className="mr-2">Analyzing...</span>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          </>
                        ) : (
                          "Analyze Recipe"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai">
                <AiRecipeAnalyzer />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            {analyzedRecipe ? (
              <Card>
                <CardHeader>
                  <CardTitle>{analyzedRecipe.title}</CardTitle>
                  <CardDescription>
                    Nutritional analysis per serving
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {analyzedRecipe.nutrition.calories}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Calories
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {analyzedRecipe.nutrition.protein}g
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Protein
                      </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {analyzedRecipe.nutrition.carbs}g
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Carbs
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {analyzedRecipe.nutrition.fat}g
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Fat
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Ingredients</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {analyzedRecipe.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Detailed Nutrition</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">
                          Macronutrients
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Fiber
                            </span>
                            <span>{analyzedRecipe.nutrition.fiber}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Sugar
                            </span>
                            <span>{analyzedRecipe.nutrition.sugar}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Sodium
                            </span>
                            <span>{analyzedRecipe.nutrition.sodium}mg</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">
                          Vitamins (% Daily Value)
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(
                            analyzedRecipe.nutrition.vitamins
                          ).map(([vitamin, value]) => (
                            <div key={vitamin} className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Vitamin {vitamin.toUpperCase()}
                              </span>
                              <span>{value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">
                          Minerals (% Daily Value)
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(
                            analyzedRecipe.nutrition.minerals
                          ).map(([mineral, value]) => (
                            <div key={mineral} className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                {mineral.charAt(0).toUpperCase() +
                                  mineral.slice(1)}
                              </span>
                              <span>{value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleSaveRecipe}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Recipe
                  </Button>
                  <Button onClick={handleAddToMealPlan}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Meal Plan
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full inline-block mb-4">
                    <Link className="h-12 w-12 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    No Recipe Analyzed Yet
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Import a recipe from a URL, enter one manually, or use AI
                    analysis to see its nutritional breakdown.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
