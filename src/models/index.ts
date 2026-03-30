import z from "zod/v3";

export const metadataFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    subject: z.string().min(1, "Subject is required"),
    creator: z.string().min(1, "Creator is required"),
    producer: z.string().min(1, "Producer is required"),
    creationDate: z.date().min(new Date(1900, 0, 1), "Minimum 1900"),
    modificationDate: z.date().min(new Date(1900, 0, 1), "Minimum 1900"),
  })
  .partial();

export type MetadataForm = z.infer<typeof metadataFormSchema>;

export const watermarkFormSchema = z.object({
  text: z.string().min(1, "Watermark text is required"),
  fontSize: z.coerce.number().min(12, "Minimum 12px").max(120, "Maximum 120px"),
  opacity: z.coerce.number().min(0.05, "Minimum 5%").max(1, "Maximum 100%"),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color (e.g. #888888)"),
  position: z.enum(["center", "diagonal", "bottom"]),
});

export type WatermarkForm = z.infer<typeof watermarkFormSchema>;
