import z from "zod";
import { BOOKING_STATUS } from "./booking.interface";

export const createBookingZodSchema = z.object({
    tour: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Tour is Required"
                : "Not a string"
        })
        .min(2, { message: "Name Too Short" })
        .max(50, { message: "Name Too Long" }),
    guestCount: z
        .number({
            error: (issue) => issue.input === undefined
                ? "Guest Number is Required"
                : "Not a Number"
        })
        .int({ message: "Number Must Be Integer" })
        .positive({ message: "Number Must Be Positive Value" }),
})

export const updateBookingZodSchema = z.object({
    status: z
        .enum(Object.values(BOOKING_STATUS) as [string])
})