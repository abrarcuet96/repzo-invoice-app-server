/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Request, Response } from 'express';
import { generateNewId } from '../../../utils/generateId';
import PaymentInfo from './sslPayment.model';
import { SSLPaymentServices } from './sslPayment.service';

const createSSLPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;
    const userId = paymentData.userId;
    const tranId = await generateNewId(PaymentInfo, userId, 'tranId', 'TRX');
    paymentData.tranId = tranId;
    const initiateData = {
      store_id: 'repzo6763b4496cc0d',
      store_passwd: 'repzo6763b4496cc0d@ssl',
      total_amount: paymentData.total,
      currency: paymentData.currency,
      tran_id: tranId,
      success_url: 'http://localhost:5000/api/sslPayment/success-payment',
      fail_url: 'http://localhost:5000/api/sslPayment/fail',
      cancel_url: 'http://localhost:5000/api/sslPayment/cancel',
      cus_name: 'Customer Name',
      cus_email: 'cust@yahoo.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      shipping_method: 'NO',
      product_name: 'Laptop',
      product_category: 'Laptop',
      product_profile: 'general',
      multi_card_name: 'mastercard,visacard,amexcard',
      value_a: 'ref001_A',
      value_b: 'ref002_B',
      value_c: 'ref003_C',
      value_d: 'ref004_D',
    };
    const response = await axios({
      method: 'POST',
      url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      data: initiateData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // console.log(response);
    const saveData = {
      currency: paymentData.currency,
      userId: userId,
      cus_name: 'Abrar',
      tranId: tranId,
      status: 'pending',
      amount: paymentData.total,
    };
    const result = await SSLPaymentServices.createSSLPaymentIntoDB(saveData);
    console.log(result);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Payment is successfully done.',
        paymentUrl: response.data.GatewayPageURL,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};
const successSSLPayment = async (req: Request, res: Response) => {
  try {
    const successData = req.body;
    console.log('success data: ', successData);
    if (successData.status !== 'VALID') {
      throw new Error('Unauthorized payment, Invalid Payment');
    }
    const updateInfo = {
      status: 'success',
    };
    const tranId = successData.tran_id;
    // update the database:
    const updateData = await SSLPaymentServices.updateSSLPaymentIntoDB(
      tranId,
      updateInfo,
    );
    console.log('updated data: ', updateData);
    res.redirect('http://localhost:5173/success');
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const cancelSSLPayment = async (req: Request, res: Response) => {
  try {
    res.redirect('http://localhost:5173/cancel');
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const failSSLPayment = async (req: Request, res: Response) => {
  try {
    res.redirect('http://localhost:5173/fail');
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
export const SSLPaymentController = {
  createSSLPayment,
  successSSLPayment,
  cancelSSLPayment,
  failSSLPayment,
};
