import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Cpu, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24 animate-fade-in-up">
      <div className="flex flex-col items-center text-center">
        <ChefHat className="h-16 w-16 mb-4 text-primary" />
        <h1 className="text-5xl font-extrabold tracking-tight font-lora bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
          Welcome to DishGen
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Solving the age-old question of &quot;what&apos;s for dinner?&quot; by transforming the ingredients you have into delicious, AI-crafted recipes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <Card className="bg-secondary/30 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-lora">
              <Rocket className="h-5 w-5 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
              <li>
                <strong>Enter Ingredients:</strong> Provide a list of ingredients you have on hand.
              </li>
              <li>
                <strong>Fine-Tune Your Request:</strong> Set preferences for cuisine and meal type, and choose whether the AI should be strict with your ingredients or flexible.
              </li>
              <li>
                <strong>Generate with AI:</strong> Select your preferred generation engine and let our AI chef craft a unique recipe just for you.
              </li>
              <li>
                <strong>Save, Rate & Explore:</strong> Save your favorite creations, rate them to keep track of what you loved, and explore what the community is cooking up!
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-lora">
              <Cpu className="h-5 w-5 text-primary" />
              The Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
              <li>
                <strong>Next.js & React:</strong> For a high-performance, server-rendered application with a dynamic user interface.
              </li>
              <li>
                <strong>Supabase (PostgreSQL):</strong> Powers our primary database for user accounts and saved recipes.
              </li>
              <li>
                <strong>MongoDB:</strong> Stores all AI recipe generation logs for analytics and community features like the &apos;Recent&apos; tab.
              </li>
              <li>
                <strong>Dual AI Engine:</strong> Features a public mode that calls Google&apos;s Gemini API directly from the server, and a local mode demonstrating automation via an n8n workflow.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mt-16">
        <h2 className="text-3xl font-semibold font-lora">About the Creator</h2>
        <p className="mt-2 text-muted-foreground">
          This project was built by Saad Safi as the final project for the Nexium AI-First Web Development Internship.
        </p>
      </div>
    </div>
  );
}