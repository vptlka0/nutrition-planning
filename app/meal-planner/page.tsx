"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import { ChevronLeft, ChevronRight, Edit, Info, RefreshCw, Save } from "lucide-react"

// Sample meal plan data for demonstration
const sampleMealPlan = {
  monday: {
    breakfast: {
      name: "Greek Yogurt Parfait",
      calories: 320,
      protein: 18,
      carbs: 42,
      fat: 10,
      ingredients: ["1 cup Greek yogurt", "1/2 cup mixed berries", "1/4 cup granola", "1 tbsp honey"],
    },
    lunch: {
      name: "Quinoa Salad Bowl",
      calories: 450,
      protein: 15,
      carbs: 65,
      fat: 14,
      ingredients: ["1 cup cooked quinoa", "1/2 cup chickpeas", "1 cup mixed vegetables", "2 tbsp olive oil dressing"],
    },
    dinner: {
      name: "Baked Salmon with Roasted Vegetables",
      calories: 520,
      protein: 35,
      carbs: 30,
      fat: 28,
      ingredients: [
        "6 oz salmon fillet",
        "1 cup broccoli",
        "1 cup sweet potatoes",
        "1 tbsp olive oil",
        "Herbs and spices",
      ],
    },
    snacks: {
      name: "Apple with Almond Butter",
      calories: 200,
      protein: 5,
      carbs: 25,
      fat: 10,
      ingredients: ["1 medium apple", "1 tbsp almond butter"],
    },
  },
}

// Sample alternative ingredients for swapping
const alternativeIngredients = {
  "Greek yogurt": ["Coconut yogurt", "Almond yogurt", "Skyr"],
  Quinoa: ["Brown rice", "Farro", "Couscous"],
  Salmon: ["Trout", "Tofu", "Chicken breast"],
  "Almond butter": ["Peanut butter", "Sunflower seed butter", "Cashew butter"],
}

export default function MealPlannerPage() {
  const [currentDay, setCurrentDay] = useState("monday")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [swapDialogOpen, setSwapDialogOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState("")
  const [selectedMeal, setSelectedMeal] = useState("")

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const nextDay = () => {
    const currentIndex = days.indexOf(currentDay)
    const nextIndex = (currentIndex + 1) % days.length
    setCurrentDay(days[nextIndex])

    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const prevDay = () => {
    const currentIndex = days.indexOf(currentDay)
    const prevIndex = (currentIndex - 1 + days.length) % days.length
    setCurrentDay(days[prevIndex])

    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const openSwapDialog = (meal: string, ingredient: string) => {
    setSelectedMeal(meal)
    setSelectedIngredient(ingredient)
    setSwapDialogOpen(true)
  }

  const handleSwapIngredient = (alternative: string) => {
    // In a real app, this would update the meal plan with the new ingredient
    alert(`Swapped ${selectedIngredient} with ${alternative} in ${selectedMeal}`)
    setSwapDialogOpen(false)
  }

  const generateNewMealPlan = () => {
    // In a real app, this would call an API to generate a new meal plan
    alert("Generating new meal plan based on your profile...")
  }

  const saveMealPlan = () => {
    // In a real app, this would save the current meal plan
    alert("Meal plan saved!")
  }

  // Calculate daily totals
  const dailyTotals = {
    calories:
      sampleMealPlan.monday.breakfast.calories +
      sampleMealPlan.monday.lunch.calories +
      sampleMealPlan.monday.dinner.calories +
      sampleMealPlan.monday.snacks.calories,
    protein:
      sampleMealPlan.monday.breakfast.protein +
      sampleMealPlan.monday.lunch.protein +
      sampleMealPlan.monday.dinner.protein +
      sampleMealPlan.monday.snacks.protein,
    carbs:
      sampleMealPlan.monday.breakfast.carbs +
      sampleMealPlan.monday.lunch.carbs +
      sampleMealPlan.monday.dinner.carbs +
      sampleMealPlan.monday.snacks.carbs,
    fat:
      sampleMealPlan.monday.breakfast.fat +
      sampleMealPlan.monday.lunch.fat +
      sampleMealPlan.monday.dinner.fat +
      sampleMealPlan.monday.snacks.fat,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meal Planner</h1>
            <p className="text-gray-600 dark:text-gray-400">Plan your meals based on your nutritional needs</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={generateNewMealPlan}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Plan
            </Button>
            <Button onClick={saveMealPlan}>
              <Save className="mr-2 h-4 w-4" />
              Save Plan
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="icon" onClick={prevDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-center">
            <h2 className="text-xl font-semibold capitalize text-gray-900 dark:text-white">{currentDay}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(currentDate)}</p>
          </div>

          <Button variant="outline" size="icon" onClick={nextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <MealCard
            title="Breakfast"
            meal={sampleMealPlan.monday.breakfast}
            onSwapIngredient={openSwapDialog}
            mealType="breakfast"
          />

          <MealCard
            title="Lunch"
            meal={sampleMealPlan.monday.lunch}
            onSwapIngredient={openSwapDialog}
            mealType="lunch"
          />

          <MealCard
            title="Dinner"
            meal={sampleMealPlan.monday.dinner}
            onSwapIngredient={openSwapDialog}
            mealType="dinner"
          />

          <MealCard
            title="Snacks"
            meal={sampleMealPlan.monday.snacks}
            onSwapIngredient={openSwapDialog}
            mealType="snacks"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daily Nutrition Summary</CardTitle>
            <CardDescription>Your daily nutritional intake based on this meal plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{dailyTotals.calories}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">kcal</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{dailyTotals.protein}g</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">25% of calories</p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{dailyTotals.carbs}g</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">45% of calories</p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{dailyTotals.fat}g</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">30% of calories</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <Info className="h-4 w-4" />
                <span>This meal plan is optimized based on your profile and nutritional goals.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={swapDialogOpen} onOpenChange={setSwapDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Swap Ingredient</DialogTitle>
              <DialogDescription>
                Choose an alternative for {selectedIngredient} in your {selectedMeal}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Label htmlFor="ingredient-alternative" className="mb-2 block">
                Select Alternative
              </Label>
              <Select onValueChange={(value) => handleSwapIngredient(value)}>
                <SelectTrigger id="ingredient-alternative">
                  <SelectValue placeholder="Select alternative ingredient" />
                </SelectTrigger>
                <SelectContent>
                  {selectedIngredient &&
                    alternativeIngredients[selectedIngredient as keyof typeof alternativeIngredients]?.map(
                      (alt, index) => (
                        <SelectItem key={index} value={alt}>
                          {alt}
                        </SelectItem>
                      ),
                    )}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSwapDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

interface MealCardProps {
  title: string
  meal: {
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
    ingredients: string[]
  }
  mealType: string
  onSwapIngredient: (meal: string, ingredient: string) => void
}

function MealCard({ title, meal, mealType, onSwapIngredient }: MealCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{meal.name}</CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            {meal.calories} kcal
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4 text-sm">
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">{meal.protein}g</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">protein</span>
          </div>
          <div>
            <span className="text-amber-600 dark:text-amber-400 font-medium">{meal.carbs}g</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">carbs</span>
          </div>
          <div>
            <span className="text-red-600 dark:text-red-400 font-medium">{meal.fat}g</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">fat</span>
          </div>
        </div>

        <h4 className="text-sm font-medium mb-2">Ingredients:</h4>
        <ul className="text-sm space-y-1">
          {meal.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onSwapIngredient(mealType, ingredient)}
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full">
          <Edit className="mr-2 h-4 w-4" />
          Edit Meal
        </Button>
      </CardFooter>
    </Card>
  )
}

