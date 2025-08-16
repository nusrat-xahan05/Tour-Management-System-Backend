/* eslint-disable no-console */
import { envVars } from "../config/env"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model"
import bcryptjs from "bcryptjs"

export const seedSuperAdmin = async() => {
    try{
        const isSuperAdminExist = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL});
        if(isSuperAdminExist){
            console.log("Super Admin Already Exist");
            return;
        }

        const hashedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND));

        const authProvider: IAuthProvider = {
            provider: "Credential",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const payload: IUser = {
            name: "Super Admin",
            role: Role.SUPERADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
            auths: [authProvider]
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const superAdmin = await User.create(payload);
    }catch(err){
        console.log(err);
    }
}