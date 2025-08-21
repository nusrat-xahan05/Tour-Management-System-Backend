/* eslint-disable @typescript-eslint/no-explicit-any */
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"
import { Booking } from "./booking.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";
import { Payment } from "../payment/payment.model";
import { SSLServices } from "../sslCommerz/sslCommerz.service";
import { getTransactionId } from "../../utils/getTransactionId";


const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transactionId = getTransactionId();
    const session = await Booking.startSession();
    session.startTransaction();
    try {
        const user = await User.findById(userId);
        if (!user?.phone || !user?.address) {
            throw new AppError(httpStatus.BAD_REQUEST, "Please Update Your Profile To Book A Tour");
        }

        const tour = await Tour.findById(payload.tour).select("costFrom");
        if (!tour?.costFrom) {
            throw new AppError(httpStatus.BAD_REQUEST, "No Tour Cost Found!");
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const amount = Number(tour.costFrom) * Number(payload.guestCount!)

        const booking = await Booking.create([{
            user: userId,
            status: BOOKING_STATUS.PENDING,
            ...payload
        }], { session })

        const payment = await Payment.create([{
            booking: booking[0]._id,
            transactionId: transactionId,
            amount: amount,
            status: PAYMENT_STATUS.UNPAID
        }], { session })

        const updatedBooking = await Booking.findByIdAndUpdate(booking[0]._id, { payment: payment[0]._id }, { new: true, runValidators: true, session }).populate("user", "name, email, phone, address").populate("tour", "title, costFrom").populate("payment");

        const userName = (updatedBooking?.user as any).name;
        const userEmail = (updatedBooking?.user as any).email;
        const userPhone = (updatedBooking?.user as any).phone;
        const userAddress = (updatedBooking?.user as any).address;

        const sslPayment = await SSLServices.sslPaymentInit({
            amount: amount,
            transactionId: transactionId,
            name: userName,
            email: userEmail,
            phone: userPhone,
            address: userAddress
        })

        await session.commitTransaction();  // Transaction
        session.endSession();
        return {
            paymentUrl: sslPayment.GatewayPageURL,
            booking: updatedBooking
        };
    } catch (error) {
        await session.abortTransaction();   // Rollback
        session.endSession();
        throw error;
    }
}

// const getAllBookings = async (userId: string, payload: Partial<IBooking>, decodedToken: JwtPayload) => {

// }

// const getUserBookings = async () => {

// }

// const getSingleBooking = async () => {

// }

// const updateBookingStatus = async () => {

// }

export const BookingServices = {
    createBooking, 
    // getAllBookings, getUserBookings, getSingleBooking, updateBookingStatus
}