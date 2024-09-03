import { z } from "zod";

export const Sorting = ["priceAsc", "priceDesc", "newest", "oldest"] as const;

export const Rooms = [
  "oneRoom",
  "twoRooms",
  "threeRooms",
  "fourRooms",
  "manyRooms",
] as const;

export const Construction = [
  "panel",
  "brick",
  "temporaryConstruction",
] as const;

export const Status = ["inConstruction", "finished", "furnished"] as const;

export const Heating = ["gas", "electricity", "tps", "local"];

export const formSchema = z.object({
  location: z.string({ required_error: "Please select a location" }),
  districts: z.string().array().optional(),
  rooms: z.enum(Rooms).optional(),
  priceFrom: z.string().optional(),
  priceTo: z.string().optional(),
  priceFromSqM: z.string().optional(),
  priceToSqM: z.string().optional(),
  minSize: z.string().optional(),
  maxSize: z.string().optional(),
  minFloor: z.string().optional(),
  maxFloor: z.string().optional(),
  minYear: z.string().optional(),
  maxYear: z.string().optional(),
  construction: z.string().optional(),
  propertyTypes: z
    .array(z.string())
    .refine((v) => v.some((i) => i))
    .optional(),
  showRealEstatesWithoutImages: z.boolean(),
  sorting: z.enum(Sorting).default("newest"),
  seller: z.string().optional(),
  status: z.string().optional(),
  heating: z.string().optional(),
});

export type FormType = z.infer<typeof formSchema>;
