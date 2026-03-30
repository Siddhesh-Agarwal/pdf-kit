import z from "zod/v3";

export const metadataFormSchema = z
  .object({
    title: z.string(),
    author: z.string(),
    subject: z.string(),
    creator: z.string(),
    producer: z.string(),
    creationDate: z.date(),
    modificationDate: z.date(),
  })
  .partial();

export type MetadataForm = z.infer<typeof metadataFormSchema>;
