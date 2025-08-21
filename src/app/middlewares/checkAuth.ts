import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization || req.cookies.accessToken;
        if (!accessToken) {
            throw new AppError(403, "No Token Received");
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        const isUserExist = await User.findOne({ email: verifiedToken.email })
        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User Email Does Not Exist");
        }

        if (isUserExist.isActive === IsActive.INACTIVE || isUserExist.isActive === IsActive.BLOCKED) {
            throw new AppError(httpStatus.BAD_REQUEST, `User Is ${isUserExist.isActive}`);
        }

        if (!isUserExist.isVerified) {
            throw new AppError(httpStatus.BAD_REQUEST, "User Is Not Verified");
        }

        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "User Is Deleted");
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "Users Are Not Permitted To View This Route");
        }

        req.user = verifiedToken;

        next()
    } catch (err) {
        next(err)
    }
}