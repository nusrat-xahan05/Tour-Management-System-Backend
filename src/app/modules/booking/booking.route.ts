import { Router } from "express";
import { Role } from "../user/user.interface";
import { BookingControllers } from "./booking.controller";
import { createBookingZodSchema, updateBookingZodSchema } from "./booking.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router()

router.post('/', 
    checkAuth(...Object.values(Role)),
    validateRequest(createBookingZodSchema), 
    BookingControllers.createBooking);

router.get('/', 
    checkAuth(Role.ADMIN, Role.SUPERADMIN), 
    BookingControllers.getAllBookings);

router.get('/my-bookings', 
    checkAuth(...Object.values(Role)),
    BookingControllers.getUserBookings);

router.get('/:bookingId', 
    checkAuth(...Object.values(Role)),
    BookingControllers.getSingleBooking);

router.patch('/:bookingId/status', 
    validateRequest(updateBookingZodSchema), 
    checkAuth(...Object.values(Role)), 
    BookingControllers.updateBookingStatus)


export const BookingRoutes = router;