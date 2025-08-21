import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { ISSLCOMMERZ } from "./sslCommerz.interface";
import axios from "axios";
import httpStatus from "http-status-codes";

const sslPaymentInit = async (payload: ISSLCOMMERZ) => {
    try {
        const data = {
            store_id: envVars.SSL.SSL_STORE_ID,
            store_passwd: envVars.SSL.SSL_STORE_PASS,
            total_amount: payload.amount,
            currency: "BDT",
            tran_id: payload.transactionId,
            success_url: `${envVars.SSL.SSL_SUCCESS_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=success`,
            fail_url: `${envVars.SSL.SSL_FAIL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=fail`,
            cancel_url: `${envVars.SSL.SSL_CANCEL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=cancel`,
            // ipn_url: 
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_city: payload.address,
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: payload.phone,
            product_name: "Tour",
            product_category: "Service",
            product_profile: "General",
            shipping_method: "N/A",
            ship_name: "N/A",
            ship_add1: "N/A",
            ship_add2: "N/A",
            ship_city: "N/A",
            ship_state: "N/A",
            ship_postcode: "N/A",
            ship_country: "N/A"
        }

        const response = await axios({
            method: "POST",
            url: envVars.SSL.SSL_PAYMENT_API,
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })

        return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log("Payment Error Occured", error);
        throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }
}

export const SSLServices = {
    sslPaymentInit
}