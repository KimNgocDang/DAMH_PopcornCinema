import { Router } from "express";
import {
  getAllPromotions,
  getPromotionById,
  getPromotionByCode,
  getActivePromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  validatePromotionCode,
  calculateDiscount,
  incrementUsageCount,
} from "../services/promotion.service";

const router = Router();

// Get all promotions
router.get("/", async (_req, res) => {
  try {
    const promotions = await getAllPromotions();
    res.status(200).json(promotions);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get active promotions only
router.get("/active", async (_req, res) => {
  try {
    const promotions = await getActivePromotions();
    res.status(200).json(promotions);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get promotion by code
router.get("/code/:code", async (req, res) => {
  try {
    const promotion = await getPromotionByCode(req.params.code);
    res.status(200).json(promotion);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(404).json({ message });
  }
});

// Validate promotion code
router.post("/validate/:code", async (req, res) => {
  const { orderValue } = req.body;
  try {
    const promotion = await validatePromotionCode(req.params.code, orderValue);
    res.status(200).json(promotion);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Calculate discount
router.post("/:id/calculate-discount", async (req, res) => {
  const { orderValue } = req.body;
  try {
    const discount = await calculateDiscount(req.params.id, orderValue);
    res.status(200).json({ discount });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Get promotion by ID
router.get("/:id", async (req, res) => {
  try {
    const promotion = await getPromotionById(req.params.id);
    res.status(200).json(promotion);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(404).json({ message });
  }
});

// Create promotion
router.post("/", async (req, res) => {
  try {
    const promotion = await createPromotion(req.body);
    res.status(201).json(promotion);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Update promotion
router.put("/:id", async (req, res) => {
  try {
    const promotion = await updatePromotion(req.params.id, req.body);
    res.status(200).json(promotion);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Increment usage count
router.patch("/:id/increment-usage", async (req, res) => {
  try {
    const promotion = await incrementUsageCount(req.params.id);
    res.status(200).json(promotion);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Delete promotion
router.delete("/:id", async (req, res) => {
  try {
    await deletePromotion(req.params.id);
    res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(404).json({ message });
  }
});

export default router;
