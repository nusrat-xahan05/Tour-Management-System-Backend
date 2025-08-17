import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";


export const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    // {
    //     path: '/division',
    //     route: DivisionRoutes
    // },
    // {
    //     path: '/tour',
    //     route: TourRoutes
    // },
    // {
    //     path: '/booking',
    //     route: BookingRoutes
    // },
    // {
    //     path: '/payment',
    //     route: PaymentRoutes
    // }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})