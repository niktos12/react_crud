import z from "zod";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}
export const productSchema = z.object({
  name: z.string().min(3, { message: "Title should be at least 3 characters" }),
  price: z
    .number()
    .min(1, { message: "Price should be at least 1" })
    .positive(),
  image: z.string().url({ message: "Image should be a valid URL" }),
  quantity: z
    .number()
    .min(1, { message: "Quantity should be at least 1" })
    .positive(),
  description: z
    .string()
    .min(5, { message: "Description should be at least 5 characters" }),
});
export type ProductInput = z.infer<typeof productSchema>;
