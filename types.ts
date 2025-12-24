export enum DietType {
  Omnivore = 'Omnivore',
  Vegetarian = 'Vegetarian',
  Vegan = 'Vegan',
  Keto = 'Keto',
  Paleo = 'Paleo',
  LowCarb = 'Low Carb',
  GlutenFree = 'Gluten Free',
}

export interface UserPreferences {
  dietType: DietType;
  allergies: string;
  ingredients: string;
  servings: number;
  caloriesPerDay?: number;
  goal: string; // e.g., "Lose weight", "Build muscle", "Save money"
}

export interface Meal {
  name: string;
  description: string;
  prepTime: string;
  calories: number;
}

export interface DayPlan {
  dayName: string; // e.g., "Monday"
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
}

export interface GroceryCategory {
  categoryName: string;
  items: string[];
}

export interface MealPlanResponse {
  weeklyPlan: DayPlan[];
  groceryList: GroceryCategory[];
  summary: string;
}

export interface GeneratePlanResult {
  data?: MealPlanResponse;
  error?: string;
}