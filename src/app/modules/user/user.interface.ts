import { Types } from "mongoose";

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IAuthProvider {
    provider: "Google" | "Credential"; // "Google", "Credential(email password)"
    providerId: string;
}

export enum Role {
    SUPERADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    auths: IAuthProvider[];
    role: Role;
    bookings?: Types.ObjectId[];
    guides?: Types.ObjectId[];
}