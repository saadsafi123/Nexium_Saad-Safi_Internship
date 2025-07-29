'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Info } from 'lucide-react'
import { type Recipe } from '@/types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
  ingredients: z.string().min(10, { message: 'Please enter at least 10 characters.' }),
  ingredientStrictness: z.enum(["strict", "flexible"], { message: "You need to select an ingredient mode." }),
  generationMode: z.enum(["n8n", "gemini"], { message: "You need to select a generation mode." }),
  cuisine: z.string().optional(),
  mealType: z.string().optional(),
  difficulty: z.string().optional(),
  dietary: z.array(z.string()).optional(),
})

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'keto', label: 'Keto' },
]

interface RecipeFormProps {
  onRecipeGenerated: (recipe: Recipe | null) => void;
  onIsLoadingChange: (isLoading: boolean) => void;
  isLoading: boolean;
}

export function RecipeForm({ onRecipeGenerated, onIsLoadingChange, isLoading }: RecipeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: '',
      dietary: [],
      ingredientStrictness: "flexible",
      generationMode: "gemini",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onIsLoadingChange(true)
    onRecipeGenerated(null)

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to generate recipe.')
      }
      
      onRecipeGenerated(result)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage)
    } finally {
      onIsLoadingChange(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., chicken breast, cherry tomatoes, olive oil, garlic..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the ingredients you have, separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="ingredientStrictness"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className="flex items-center gap-2">
                <FormLabel>Ingredient Mode</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent side="top" className="w-auto p-2">
                    <p className="text-sm">&apos;Be Flexible&apos; allows the AI to add staples like oil, salt, etc.</p>
                  </PopoverContent>
                </Popover>
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="flexible" className="border-muted-foreground" /></FormControl>
                    <FormLabel className="font-normal">Be Flexible</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="strict" className="border-muted-foreground" /></FormControl>
                    <FormLabel className="font-normal">Use Only These Ingredients</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FormField
            control={form.control}
            name="cuisine"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Cuisine</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></PopoverTrigger>
                    <PopoverContent side="top" className="w-auto p-2"><p className="text-sm">Select a cuisine to guide the recipe style.</p></PopoverContent>
                  </Popover>
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Any Cuisine" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mealType"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Meal Type</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></PopoverTrigger>
                    <PopoverContent side="top" className="w-auto p-2"><p className="text-sm">Choose the type of meal you want to make.</p></PopoverContent>
                  </Popover>
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Any Meal" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Difficulty</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></PopoverTrigger>
                    <PopoverContent side="top" className="w-auto p-2"><p className="text-sm">Set the desired cooking difficulty.</p></PopoverContent>
                  </Popover>
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Any Difficulty" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="dietary"
          render={() => (
            <FormItem>
              <div className="mb-4 flex items-center gap-2">
                <FormLabel>Dietary Needs</FormLabel>
                <Popover>
                    <PopoverTrigger asChild><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></PopoverTrigger>
                    <PopoverContent side="top" className="w-auto p-2"><p className="text-sm">Select any dietary restrictions.</p></PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-wrap gap-4">
                {dietaryOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="dietary"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <Separator />
        
        <FormField
          control={form.control}
          name="generationMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className="flex items-center gap-2">
                <FormLabel>Generation Engine</FormLabel>
                 <Popover>
                    <PopoverTrigger asChild><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></PopoverTrigger>
                    <PopoverContent side="top" className="w-auto p-2"><p className="text-sm">&apos;Public AI&apos; works on the deployed site. &apos;Local n8n&apos; requires your local server to be running.</p></PopoverContent>
                  </Popover>
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="gemini" className="border-muted-foreground" /></FormControl>
                    <FormLabel className="font-normal">Public AI Model</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="n8n" className="border-muted-foreground" /></FormControl>
                    <FormLabel className="font-normal">Local n8n Workflow</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Recipe'}
        </Button>
      </form>
    </Form>
  )
}