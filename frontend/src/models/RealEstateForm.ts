import { z } from "zod";

export const SortingEnum = [
  "PRICE_ASC",
  "PRICE_DESC",
  "NEWEST",
  "OLDEST",
] as const;

export const RoomsEnum = [
  "one room",
  "two rooms",
  "three rooms",
  "four rooms",
  "many rooms",
] as const;

export const formSchema = z.object({
  location: z.string({ required_error: "Please select a location" }),
  rooms: z.enum(RoomsEnum),
  priceFrom: z.string().optional(),
  priceTo: z.string().optional(),
  minSize: z.string().optional(),
  maxSize: z.string().optional(),
  minFloor: z.string().optional(),
  maxFloor: z.string().optional(),
  propertyTypes: z
    .array(z.string())
    .refine((v) => v.some((i) => i))
    .optional(),
  showRealEstatesWithoutImages: z.boolean(),
  sorting: z.enum(SortingEnum).default("NEWEST"),
});

export type FormType = z.infer<typeof formSchema>;
