import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Salad } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Salad className="h-8 w-8 text-green-600 dark:text-green-400" />
          <span className="font-bold text-xl text-gray-900 dark:text-white">NutriTrack</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/profile" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Profile
          </Link>
          <Link href="/recipes" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Recipes
          </Link>
          <Link
            href="/meal-planner"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Meal Planner
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/login">Log In</Link>
          </Button>
          <Button size="sm" asChild className="hidden md:inline-flex">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

