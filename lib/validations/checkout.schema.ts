import { z } from "zod";

export const checkoutSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  name: z.string().min(2, "Name must be at least 2 characters"),

  phone: z.string().min(7, "Enter a valid phone number"),

  address: z.string().min(5, "Shipping address is required"),

  apartment: z.string().optional(),

  country: z.string().min(2, "Country is required"),

  state: z.string().min(2, "State is required"),

  city: z.string().min(2, "City is required"),

  zipCode: z.string().min(3, "Zip code is required"),

  saveAddress: z.boolean().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
