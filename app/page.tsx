import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calculator, Calendar, Utensils, User } from "lucide-react"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="py-12 md:py-16 lg:py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Track Your <span className="text-green-600 dark:text-green-400">Nutrition</span> with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Calculate nutritional intake from online recipes or manual input, and plan a healthy diet that aligns with
            your daily needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/profile">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/recipes">Explore Recipes</Link>
            </Button>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <User className="h-12 w-12 text-green-600 dark:text-green-400 mb-2" />
                <CardTitle>Personal Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Customize your profile with age, weight, height, activity level, and dietary preferences.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-green-600 dark:text-green-400 mb-2" />
                <CardTitle>Nutrition Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Import recipes from URLs or manually input ingredients to calculate nutritional values.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Calendar className="h-12 w-12 text-green-600 dark:text-green-400 mb-2" />
                <CardTitle>Meal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get daily menu recommendations based on your nutritional goals and preferences.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Utensils className="h-12 w-12 text-green-600 dark:text-green-400 mb-2" />
                <CardTitle>Ingredient Swaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Easily swap ingredients to match your dietary restrictions or preferences.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">How It Works</h2>
          <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Create Profile</TabsTrigger>
              <TabsTrigger value="analyze">Analyze Recipes</TabsTrigger>
              <TabsTrigger value="plan">Plan Meals</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Create Your Profile</CardTitle>
                  <CardDescription>Set up your personal nutrition profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Enter your personal details like age, weight, height, and activity level.</p>
                  <p>Set your dietary preferences and restrictions.</p>
                  <p>Define your nutritional goals (weight loss, maintenance, muscle gain).</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/profile">Create Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="analyze" className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Analyze Recipes</CardTitle>
                  <CardDescription>Calculate nutrition from any recipe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Paste a URL to import recipes from your favorite websites.</p>
                  <p>Or manually input ingredients and portions.</p>
                  <p>Get detailed nutritional breakdown including calories, macros, vitamins, and minerals.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/recipes">Analyze Recipes</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="plan" className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Plan Your Meals</CardTitle>
                  <CardDescription>Get personalized meal recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Receive daily menu suggestions based on your nutritional needs.</p>
                  <p>Swap ingredients to customize meals to your taste.</p>
                  <p>Track your daily nutritional intake against your goals.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/meal-planner">Plan Meals</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}

