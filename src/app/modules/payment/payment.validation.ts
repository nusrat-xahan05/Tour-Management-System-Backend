// import z from "zod";
// import { BOOKING_STATUS } from "./booking.interface";

// export const createBookingZodSchema = z.object({
//     // user: z
//     //     .string({ invalid_type_error: "Name Must Be String" })
//     //     .min(2, { message: "Name Too Short" })
//     //     .max(50, { message: "Name Too Long" }),
//     tour: z
//         .string({ invalid_type_error: "Name Must Be String" })
//         .min(2, { message: "Name Too Short" })
//         .max(50, { message: "Name Too Long" }),
//     guestCount: z
//         .number({ invalid_type_error: "Guest Must Be a Number" })
//         .int({ message: "Number Must Be Integer" })
//         .positive({ message: "Number Must Be Positive Value" }),
// })

// export const updateBookingZodSchema = z.object({
//     status: z
//         .enum(Object.values(BOOKING_STATUS) as [string])
// })