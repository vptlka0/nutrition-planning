"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import { useRouter } from "next/navigation"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.coerce
    .number()
    .min(13, {
      message: "You must be at least 13 years old.",
    })
    .max(120, {
      message: "Age must be less than 120.",
    }),
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  height: z.coerce
    .number()
    .min(50, {
      message: "Height must be at least 50cm.",
    })
    .max(250, {
      message: "Height must be less than 250cm.",
    }),
  weight: z.coerce
    .number()
    .min(30, {
      message: "Weight must be at least 30kg.",
    })
    .max(300, {
      message: "Weight must be less than 300kg.",
    }),
  activityLevel: z.string({
    required_error: "Please select an activity level.",
  }),
  goal: z.string({
    required_error: "Please select a goal.",
  }),
})

const dietaryPreferencesSchema = z.object({
  vegetarian: z.boolean().default(false),
  vegan: z.boolean().default(false),
  pescatarian: z.boolean().default(false),
  glutenFree: z.boolean().default(false),
  dairyFree: z.boolean().default(false),
  nutFree: z.boolean().default(false),
  lowCarb: z.boolean().default(false),
  keto: z.boolean().default(false),
  paleo: z.boolean().default(false),
})

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      age: 30,
      gender: "male",
      height: 170,
      weight: 70,
      activityLevel: "moderate",
      goal: "maintain",
    },
  })

  const dietaryForm = useForm<z.infer<typeof dietaryPreferencesSchema>>({
    resolver: zodResolver(dietaryPreferencesSchema),
    defaultValues: {
      vegetarian: false,
      vegan: false,
      pescatarian: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      lowCarb: false,
      keto: false,
      paleo: false,
    },
  })

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values)
    setActiveTab("dietary")
  }

  function onDietarySubmit(values: z.infer<typeof dietaryPreferencesSchema>) {
    console.log(values)
    // Combine both forms' data
    const profileData = {
      ...profileForm.getValues(),
      dietaryPreferences: values,
    }
    console.log("Complete profile data:", profileData)

    // In a real app, we would save this to a database
    // For now, we'll just redirect to the recipes page
    router.push("/recipes")
  }

  // Calculate BMI and daily calorie needs
  const weight = profileForm.watch("weight")
  const height = profileForm.watch("height")
  const age = profileForm.watch("age")
  const gender = profileForm.watch("gender")
  const activityLevel = profileForm.watch("activityLevel")

  const bmi = weight / Math.pow(height / 100, 2)

  // Basic BMR calculation using Mifflin-St Jeor Equation
  let bmr = 0
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }

  // Activity multiplier
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  }

  const dailyCalories = Math.round(bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create Your Profile</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="dietary">Dietary Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter your details to calculate your nutritional needs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="activityLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Activity Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select activity level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                                  <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                                  <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                                  <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                                  <SelectItem value="veryActive">Very Active (hard exercise daily)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="goal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Goal</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your goal" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="lose">Lose Weight</SelectItem>
                                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                                  <SelectItem value="gain">Gain Weight</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Your Estimated Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">BMI</p>
                            <p className="font-medium">{bmi.toFixed(1)} kg/m²</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Daily Calories</p>
                            <p className="font-medium">{dailyCalories} kcal</p>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Continue to Dietary Preferences
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dietary">
              <Card>
                <CardHeader>
                  <CardTitle>Dietary Preferences</CardTitle>
                  <CardDescription>Select your dietary preferences and restrictions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...dietaryForm}>
                    <form onSubmit={dietaryForm.handleSubmit(onDietarySubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={dietaryForm.control}
                          name="vegetarian"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Vegetarian</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={dietaryForm.control}
                          name="vegan"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Vegan</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={dietaryForm.control}
                          name="pescatarian"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Pescatarian</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={dietaryForm.control}
                          name="glutenFree"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Gluten Free</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={dietaryForm.control}
                          name="dairyFree"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Dairy Free</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={dietaryForm.control}
                          name="nutFree"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Nut Free</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={dietaryForm.control}
                          name="lowCarb"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Low Carb</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={dietaryForm.control}
                          name="keto"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Keto</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={dietaryForm.control}
                          name="paleo"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Paleo</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setActiveTab("personal")}>
                          Back
                        </Button>
                        <Button type="submit">Complete Profile</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

