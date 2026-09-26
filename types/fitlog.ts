export type Workout = {
  id: string | number;
  name: string;
  title?: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  category?: string | string[];
  categories?: string[];
  equipment?: string | string[];
  difficulty?: string;
  sets?: number | string;
  reps?: string;
  duration?: number | string;
  calories?: number | string;
  rating?: number | string;
  instructions?: string[];
  [key: string]: unknown;
};

export type PlanItem = Workout & { done?: boolean };
