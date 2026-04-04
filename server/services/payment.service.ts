import { Payment } from "../schemas/payment.schema";
import { PaymentTransaction } from "../schemas/payment-transaction.schema";

export const getAllPayments = async () => {
  return await Payment.find()
    .populate("userId")
    .populate("bookingId")
    .populate("paymentTransactionId")
    .sort({ createdAt: -1 });
};

export const getPaymentById = async (id: string) => {
  const payment = await Payment.findById(id)
    .populate("userId")
    .populate("bookingId")
    .populate("paymentTransactionId");

  if (!payment) throw new Error("Payment not found");
  return payment;
};

export const getPaymentsByUserId = async (userId: string) => {
  return await Payment.find({ userId })
    .populate("bookingId")
    .populate("paymentTransactionId")
    .sort({ createdAt: -1 });
};

export const createPayment = async (data: {
  paymentTransactionId: string;
  userId: string;
  bookingId?: string;
  method: string;
  amount: number;
  status?: string;
  transactionId?: string;
}) => {
  const payment = await Payment.create(data);
  return payment;
};

export const updatePayment = async (id: string, data: any) => {
  const payment = await Payment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!payment) throw new Error("Payment not found");
  return payment;
};

export const processRefund = async (id: string, reason: string) => {
  const payment = await Payment.findById(id);
  if (!payment) throw new Error("Payment not found");

  if (payment.status !== "SUCCESSFUL") {
    throw new Error("Can only refund successful payments");
  }

  const refundedPayment = await Payment.findByIdAndUpdate(
    id,
    {
      status: "REFUNDED",
      failureReason: reason,
    },
    { new: true }
  );

  return refundedPayment;
};

export const getPaymentStats = async () => {
  const stats = await Payment.aggregate([
    {
      $group: {
        _id: "$status",
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  return stats;
};
