import { Router } from "express";
import {
  getSavedPromotionsByUser,
  isSaved,
  savePromotion,
  unsavePromotion,
  removeSavedPromotion,
  getSavedPromotionCount,
} from "../services/saved-promotion.service";

const router = Router();

// Get saved promotions by user
router.get("/user/:userId", async (req, res) => {
  try {
    const savedPromotions = await getSavedPromotionsByUser(req.params.userId);
    res.status(200).json(savedPromotions);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get saved promotions count
router.get("/user/:userId/count", async (req, res) => {
  try {
    const count = await getSavedPromotionCount(req.params.userId);
    res.status(200).json({ count });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Check if promotion is saved
router.get("/:userId/:promotionId/check", async (req, res) => {
  try {
    const saved = await isSaved(req.params.userId, req.params.promotionId);
    res.status(200).json({ saved });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Save promotion
router.post("/", async (req, res) => {
  const { userId, promotionId } = req.body;
  try {
    const savedPromotion = await savePromotion(userId, promotionId);
    res.status(201).json(savedPromotion);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Unsave promotion
router.delete("/:userId/:promotionId", async (req, res) => {
  try {
    await unsavePromotion(req.params.userId, req.params.promotionId);
    res.status(200).json({ message: "Promotion removed from saved" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(404).json({ message });
  }
});

// Remove saved promotion by ID
router.delete("/:id", async (req, res) => {
  try {
    await removeSavedPromotion(req.params.id);
    res.status(200).json({ message: "Saved promotion deleted successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(404).json({ message });
  }
});

export default router;
