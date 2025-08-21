import { Router } from "express";
import { validateRequest } from "../../middlewears/validateRequest";
import { checkAuth } from "../../middlewears/checkAuth";
import { Role } from "../user/user.interface";
import { PaymentControllers } from "./payment.controller";


const router = Router()

router.post('/init-payment/:bookingId', 
    PaymentControllers.initPayment);

router.post('/success', 
    PaymentControllers.successPayment);

router.post('/fail', 
    PaymentControllers.failPayment);

router.post('/cancel', 
    PaymentControllers.cancelPayment);



export const PaymentRoutes = router;