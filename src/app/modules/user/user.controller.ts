/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Created Successfully",
        data: user,
    })
})


const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Updated Successfully",
        data: user,
    })
})


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})


export const UserControllers = {
    createUser, updateUser, getAllUsers
}