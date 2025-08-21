import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Name is Required"
                : "Not a string"
        })
        .min(3, { message: "Name Too Short" })
        .max(50, { message: "Name Too Long" }),
    email: z
        .email({ message: "Invalid Email Address Format" })
        .regex(
            // eslint-disable-next-line no-useless-escape
            /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
            { message: "Invalid Email Address Format" }
        )
        .transform((val) => val.toLowerCase()),
    password: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Password is Required"
                : "Not a string"
        })
        .min(8, { message: "Password Must Be At Least 8 Characters Long" })
        .regex(/^(?=.*[A-Z])/, { message: "Password Must Contain At Least 1 Uppercase Letter" })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password Must Contain At Least 1 Special Character" })
        .regex(/^(?=.*\d)/, { message: "Password Must Contain At Least 1 Number" }),
    phone: z
        .string({ error: "Phone Number Must Be String" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone Number Must Be Valid For Bangladesh. Formal: +8801XXXXXXXXX OR 01XXXXXXXXX" })
        .optional(),
    address: z
        .string({ error: "Address Must Be String" })
        .max(200, { message: "Address Cannot Exceed 200 Characters" })
        .optional()
})

export const updateUserZodSchema = z.object({
    name: z
        .string({ error: "Name Must Be String" })
        .min(2, { message: "Name Too Short" })
        .max(50, { message: "Name Too Long" })
        .optional(),
    phone: z
        .string({ error: "Phone Number Must Be String" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone Number Must Be Valid For Bangladesh. Formal: +8801XXXXXXXXX OR 01XXXXXXXXX" })
        .optional(),
    address: z
        .string({ error: "Address Must Be String" })
        .max(200, { message: "Address Cannot Exceed 200 Characters" })
        .optional(),
    role: z
        .enum(Object.values(Role) as [string])
        .optional(),
    isActive: z
        .enum(Object.values(IsActive) as [string])
        .optional(),
    isDeleted: z
        .boolean({ error: "Deletion Must Be True or False" })
        .optional(),
    isVerified: z
        .boolean({ error: "Verified Must Be True or False" })
        .optional()
})