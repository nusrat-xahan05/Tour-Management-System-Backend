/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { IsActive, Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";


passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email: string, password: string, done) => {
        try {
            const isUserExist = await User.findOne({ email })
            if (!isUserExist) {
                return done(null, false, { message: "User Email Does Not Exist" });
            }

            if (!isUserExist.isVerified) {
                return done(null, false, { message: 'User Is Not Verified' });
            }

            if (isUserExist.isActive === IsActive.INACTIVE || isUserExist.isActive === IsActive.BLOCKED) {
                return done(null, false, { message: `User Is ${isUserExist.isActive}` });
            }

            if (isUserExist.isDeleted) {
                return done(null, false, { message: 'User Is Deleted' });
            }

            const isGoogleAuthenticated = isUserExist.auths.some(providerObjects => providerObjects.provider == 'Google')
            if (isGoogleAuthenticated && !isUserExist.password) {
                return done(null, false, { message: "You've authenticated through Google. So, if you want to login with email & password - at first login with google and set a password." });
            }

            const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);
            if (!isPasswordMatched) {
                return done(null, false, { message: "Incorrect Password" });
            }

            return done(null, isUserExist);
        } catch (err) {
            return done(err);
        }
    })
)

passport.use(
    new GoogleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL
        }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                const email = profile.emails?.[0].value;
                if (!email) {
                    return done(null, false, { message: "No Email Found" });
                }

                let user = await User.findOne({ email })
                if (!user) {
                    user = await User.create({
                        email,
                        name: profile.displayName,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        isVerified: true,
                        auths: [
                            {
                                provider: "Google",
                                providerId: profile.id
                            }
                        ]
                    })
                }

                if (user && !user.isVerified) {
                    return done(null, false, { message: 'User Is Not Verified' });
                }
                if (user && (user.isActive === IsActive.INACTIVE || user.isActive === IsActive.BLOCKED)) {
                    return done(null, false, { message: `User Is ${user.isActive}` });
                }
                if (user && user.isDeleted) {
                    return done(null, false, { message: 'User Is Deleted' });
                }

                return done(null, user)
            } catch (err) {
                console.log("Google Strategy Error", err);
                return done(err);
            }
        }
    )
)

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        console.log(err);
        done(err);
    }
})