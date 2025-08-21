/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking } from "../booking/booking.model";
import { Payment } from "./payment.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { BOOKING_STATUS } from "../booking/booking.interface";
import httpStatusCode from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { SSLServices } from "../sslCommerz/sslCommerz.service";


const initPayment = async (bookingId: string) => {
    const payment = await Payment.findOne({ booking: bookingId })
    if (!payment) {
        throw new AppError(httpStatusCode.NOT_FOUND, "Payment Not Found")
    }

    const booking = await Booking.findById(payment.booking);

    const userName = (booking?.user as any).name;
    const userEmail = (booking?.user as any).email;
    const userPhone = (booking?.user as any).phone;
    const userAddress = (booking?.user as any).address;

    const sslPayment = await SSLServices.sslPaymentInit({
        amount: payment.amount,
        transactionId: payment.transactionId,
        name: userName,
        email: userEmail,
        phone: userPhone,
        address: userAddress
    })

    return {
        paymentUrl: sslPayment.GatewayPageURL
    };
}

const successPayment = async (query: Record<string, string>) => {
    const session = await Booking.startSession();
    session.startTransaction();
    try {
        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, [{
            status: PAYMENT_STATUS.PAID
        }], { session })

        await Booking.findByIdAndUpdate(
            updatedPayment?.booking,
            { status: BOOKING_STATUS.COMPLETE },
            { new: true, runValidators: true, session }
        );

        await session.commitTransaction();  // Transaction
        session.endSession();
        return {
            success: true, message: "Payment Completed Successfully"
        };
    } catch (error) {
        await session.abortTransaction();   // Rollback
        session.endSession();
        throw error;
    }
}

const failPayment = async (query: Record<string, string>) => {
    const session = await Booking.startSession();
    session.startTransaction();
    try {
        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, [{
            status: PAYMENT_STATUS.FAILED
        }], { session })

        await Booking.findByIdAndUpdate(
            updatedPayment?.booking,
            { status: BOOKING_STATUS.FAILED },
            { new: true, runValidators: true, session }
        );

        await session.commitTransaction();  // Transaction
        session.endSession();
        return {
            success: false, message: "Payment Failed"
        };
    } catch (error) {
        await session.abortTransaction();   // Rollback
        session.endSession();
        throw error;
    }
}

const cancelPayment = async (query: Record<string, string>) => {
    const session = await Booking.startSession();
    session.startTransaction();
    try {
        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, [{
            status: PAYMENT_STATUS.CANCELED
        }], { session })

        await Booking.findByIdAndUpdate(
            updatedPayment?.booking,
            { status: BOOKING_STATUS.CANCEL },
            { new: true, runValidators: true, session }
        );

        await session.commitTransaction();  // Transaction
        session.endSession();
        return {
            success: false, message: "Payment Canceled"
        };
    } catch (error) {
        await session.abortTransaction();   // Rollback
        session.endSession();
        throw error;
    }
}


export const PaymentServices = {
    initPayment, successPayment, failPayment, cancelPayment
}