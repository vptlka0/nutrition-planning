"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, Plus, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Ingredient {
  name: string
  amount: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface NutritionData {
  recipe: {
    title: string
    ingredients: Ingredient[]
    totalNutrition: {
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber: number
      sugar: number
      sodium: number
    }
    servings: number
    vitamins: {
      a: number
      c: number
      d: number
      e: number
      k: number
    }
    minerals: {
      calcium: number
      iron: number
      potassium: number
      magnesium: number
    }
    cookingMethod: string
    healthTags: string[]
  }
}

export default function AiRecipeAnalyzer() {
  const [recipeDescription, setRecipeDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAiAnalysis = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeDescription }),
      })

      console.log(response, "test")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze recipe")
      }

      const data = await response.json()
      setNutritionData(data)
    } catch (err) {
      console.error("Error analyzing recipe:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze recipe. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSaveRecipe = () => {
    // In a real app, this would save the recipe to the user's profile
    alert("Recipe saved to your profile!")
  }

  const handleAddToMealPlan = () => {
    // In a real app, this would add the recipe to the user's meal plan
    alert("Recipe added to your meal plan!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Nutrition Analysis</CardTitle>
          <CardDescription>
            Describe your recipe with ingredients and cooking methods, and our AI will analyze its nutritional content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAiAnalysis} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipe-description">Recipe Description</Label>
              <Textarea
                id="recipe-description"
                placeholder="Describe your recipe with ingredients and cooking methods. For example: 'I made a salad with 2 cups of spinach, 1 diced tomato, half an avocado, grilled chicken breast (about 4 oz), and 2 tbsp of olive oil dressing.'"
                rows={6}
                value={recipeDescription}
                onChange={(e) => setRecipeDescription(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                The more details you provide about ingredients and quantities, the more accurate the analysis will be.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze with AI"
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>

      {nutritionData && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{nutritionData.recipe.title}</CardTitle>
                <CardDescription>
                  {nutritionData.recipe.servings} servings • {nutritionData.recipe.cookingMethod}
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-1">
                {nutritionData.recipe.healthTags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {nutritionData.recipe.totalNutrition.calories}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {nutritionData.recipe.totalNutrition.protein}g
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {nutritionData.recipe.totalNutrition.carbs}g
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {nutritionData.recipe.totalNutrition.fat}g
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Ingredients</h3>
              <div className="space-y-2">
                {nutritionData.recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b">
                    <div>
                      <span className="font-medium">{ingredient.amount}</span> {ingredient.name}
                    </div>
                    <div className="text-sm text-gray-500">{ingredient.calories} cal</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Detailed Nutrition</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Macronutrients</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Fiber</span>
                      <span>{nutritionData.recipe.totalNutrition.fiber}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Sugar</span>
                      <span>{nutritionData.recipe.totalNutrition.sugar}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Sodium</span>
                      <span>{nutritionData.recipe.totalNutrition.sodium}mg</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Vitamins (% Daily Value)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(nutritionData.recipe.vitamins).map(([vitamin, value]) => (
                      <div key={vitamin} className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Vitamin {vitamin.toUpperCase()}</span>
                        <span>{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Minerals (% Daily Value)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(nutritionData.recipe.minerals).map(([mineral, value]) => (
                      <div key={mineral} className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          {mineral.charAt(0).toUpperCase() + mineral.slice(1)}
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
      )}
    </div>
  )
}

