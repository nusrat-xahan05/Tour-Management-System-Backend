/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { BookingServices } from "./booking.service";


const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const booking = await BookingServices.createBooking(req.body, decodedToken.userId);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Created Successfully",
        data: booking,
    })
})

// const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     sendResponse(res, {
//         statusCode: httpStatus.CREATED,
//         success: true,
//         message: "User Updated Successfully",
//         data: user,
//     })
// })

// const getUserBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     sendResponse(res, {
//         statusCode: httpStatus.CREATED,
//         success: true,
//         message: "User Updated Successfully",
//         data: user,
//     })
// })

// const getSingleBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "User Retrieved Successfully",
//         data: result.data,
//         meta: result.meta
//     })
// })

// const updateBookingStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "User Retrieved Successfully",
//         data: result.data,
//         meta: result.meta
//     })
// })


export const BookingControllers = {
    createBooking, 
    // getAllBookings, getUserBookings, getSingleBooking, updateBookingStatus
}