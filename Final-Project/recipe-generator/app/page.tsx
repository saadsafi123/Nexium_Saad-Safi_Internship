import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center text-center py-20 md:py-32">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-lora">
            Never Wonder What to Cook Again with{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
              DishGen
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Turn the ingredients you have into delicious, AI-crafted meals. Stop wasting food and start creating amazing dishes with the help of your personal AI chef.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/recipe">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-secondary p-4 rounded-full">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-lora">AI-Powered Recipes</h3>
            <p className="text-muted-foreground">
              Our advanced AI generates unique recipes tailored to your ingredients and preferences in seconds.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-secondary p-4 rounded-full">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-lora">Save Your Favorites</h3>
            <p className="text-muted-foreground">
              Build your personal digital cookbook by saving the recipes you love for easy access anytime.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-secondary p-4 rounded-full">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-lora">Explore Community Creations</h3>
            <p className="text-muted-foreground">
              Discover what others are making, see trending recipes, and get inspired by the community.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}