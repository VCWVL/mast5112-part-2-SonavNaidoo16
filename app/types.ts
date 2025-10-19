export type Course = "Starter" | "Main" | "Dessert";

export interface Dish {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}
