export type Ingredient = {
  item: string;
  quantity: string;
};

export type Recipe = {
  recipe_name: string;
  description: string;
  ingredients_json: Ingredient[];
  instructions: string[];
  prep_time: number;
  cook_time: number;
  difficulty: string;
  cuisine_type?: string;
  rating?: number | null;
};