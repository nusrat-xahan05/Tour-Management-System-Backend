import z from "zod";

export const createDivisionZodSchema = z.object({
    name: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Name is Required"
                : "Not a string"
        })
        .min(2, { message: "Name Too Short" }),
    thumbnail: z
        .string({ error: "Thumbnail Must Be String" })
        .optional(),
    description: z
        .string({ error: "Description Must Be String" })
        .optional()
})

export const updateDivisionZodSchema = z.object({
    name: z
        .string({ error: "Name Must Be String" })
        .min(2, { message: "Name Too Short" })
        .optional(),
    thumbnail: z
        .string({ error: "Thumbnail Must Be String" })
        .optional(),
    description: z
        .string({ error: "Description Must Be String" })
        .optional()
})