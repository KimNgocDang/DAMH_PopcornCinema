import { Router } from "express";
import {
  getAllPayments,
  getPaymentById,
  getPaymentsByUserId,
  createPayment,
  updatePayment,
  processRefund,
  getPaymentStats,
} from "../services/payment.service";

const router = Router();

// Get all payments
router.get("/", async (_req, res) => {
  try {
    const payments = await getAllPayments();
    res.status(200).json(payments);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get payment stats
router.get("/stats", async (_req, res) => {
  try {
    const stats = await getPaymentStats();
    res.status(200).json(stats);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get payments by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const payments = await getPaymentsByUserId(req.params.userId);
    res.status(200).json(payments);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await getPaymentById(req.params.id);
    res.status(200).json(payment);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(404).json({ message });
  }
});

// Create payment
router.post("/", async (req, res) => {
  try {
    const payment = await createPayment(req.body);
    res.status(201).json(payment);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Update payment
router.put("/:id", async (req, res) => {
  try {
    const payment = await updatePayment(req.params.id, req.body);
    res.status(200).json(payment);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Process refund
router.post("/:id/refund", async (req, res) => {
  const { reason } = req.body;
  try {
    const payment = await processRefund(req.params.id, reason);
    res.status(200).json(payment);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

export default router;
