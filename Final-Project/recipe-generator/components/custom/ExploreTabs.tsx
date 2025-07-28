'use client'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarRatingDisplay } from "./StarRatingDisplay"
import { Clock, BarChart3, ChefHat } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { formatDistanceToNow } from 'date-fns'

type Ingredient = { item: string; quantity: string };
type ErrorResponse = { error: string };

type BaseRecipe = {
  id?: string;
  recipe_name: string;
  description: string;
  cook_time?: number | null;
  prep_time?: number | null;
  difficulty?: string | null;
  rating?: number | null;
  ingredients_json?: Ingredient[];
  instructions?: string[];
};

type MostSavedRecipe = BaseRecipe & { save_count: number };
type RecentGenerationLog = { 
  _id: string; 
  response: BaseRecipe | ErrorResponse; 
  createdAt: string 
};
type ExploreRecipe = MostSavedRecipe | BaseRecipe | RecentGenerationLog;

function ExploreRecipeCard({ recipe }: { recipe: ExploreRecipe }) {
  const isRecentGen = '_id' in recipe;
  const recipeData = isRecentGen ? (recipe as RecentGenerationLog).response : (recipe as BaseRecipe);
  
  // This is the main fix: A type guard to ensure recipeData is a valid recipe
  if (!recipeData || !('recipe_name' in recipeData)) {
    return null; // Don't render a card if the data is invalid or an error
  }

  const timeAgo = isRecentGen ? formatDistanceToNow(new Date((recipe as RecentGenerationLog).createdAt), { addSuffix: true }) : null;

  const CardContentComponent = (
    <Card className="h-full hover:border-primary transition-colors flex flex-col cursor-pointer">
      <CardHeader>
        <CardTitle>{recipeData.recipe_name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{recipeData.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        {isRecentGen ? (
          <span>{timeAgo}</span>
        ) : 'save_count' in recipe ? (
          <span>{(recipe as MostSavedRecipe).save_count} saves</span>
        ) : (
          <div />
        )}
        {recipeData.rating != null && <StarRatingDisplay rating={recipeData.rating} />}
      </CardFooter>
    </Card>
  );

  if (recipeData.id) {
    return (
      <Link href={`/explore/${recipeData.id}`}>
        {CardContentComponent}
      </Link>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{CardContentComponent}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold font-lora">{recipeData.recipe_name}</DialogTitle>
          <DialogDescription className="pt-2 text-lg">{recipeData.description}</DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm text-center my-6">
          <div className="flex flex-col items-center gap-2"><Clock className="h-5 w-5 text-primary" /><span className="text-muted-foreground">Prep: {recipeData.prep_time} min</span></div>
          <div className="flex flex-col items-center gap-2"><ChefHat className="h-5 w-5 text-primary" /><span className="text-muted-foreground">Cook: {recipeData.cook_time} min</span></div>
          <div className="flex flex-col items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /><span className="text-muted-foreground capitalize">{recipeData.difficulty}</span></div>
        </div>
        <Separator className="my-4" />
        <div className="grid md:grid-cols-2 gap-8 py-4">
          <div>
            <h3 className="text-xl font-bold font-lora mb-4">Ingredients</h3>
            <ul className="space-y-2 text-muted-foreground">
              {recipeData.ingredients_json?.map((ing: Ingredient, idx: number) => <li key={idx} className="flex gap-2"><span>-</span><div><strong>{ing.quantity}</strong> {ing.item}</div></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold font-lora mb-4">Instructions</h3>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
              {recipeData.instructions?.map((step: string, idx: number) => <li key={idx} className="pl-2">{step}</li>)}
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ExploreTabsProps {
  mostSaved: MostSavedRecipe[];
  highestRated: BaseRecipe[];
  recentGenerations: RecentGenerationLog[];
}

export function ExploreTabs({ mostSaved, highestRated, recentGenerations }: ExploreTabsProps) {
  const successfulGenerations = recentGenerations.filter(
    (log): log is RecentGenerationLog & { response: BaseRecipe } => 
      log.response && 'recipe_name' in log.response
  );

  return (
    <Tabs defaultValue="most-saved" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-muted p-1 h-10">
        <TabsTrigger 
          value="most-saved" 
          className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-secondary"
        >
          Most Saved
        </TabsTrigger>
        <TabsTrigger 
          value="highest-rated"
          className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-secondary"
        >
          Highest Rated
        </TabsTrigger>
        <TabsTrigger 
          value="recent-generations"
          className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-secondary"
        >
          Recent
        </TabsTrigger>
      </TabsList>

      <TabsContent value="most-saved" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostSaved.map((recipe, i) => <ExploreRecipeCard key={`ms-${i}`} recipe={recipe} />)}
        </div>
      </TabsContent>

      <TabsContent value="highest-rated" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highestRated.map((recipe) => <ExploreRecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      </TabsContent>

      <TabsContent value="recent-generations" className="mt-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successfulGenerations.map((log) => <ExploreRecipeCard key={log._id} recipe={log} />)}
        </div>
      </TabsContent>
    </Tabs>
  );
}