import { Router } from "express";
import {
  getAllSnacks,
  getSnackById,
  getSnacksByCategory,
  getActiveSnacks,
  createSnack,
  updateSnack,
  deleteSnack,
  updateSnackQuantity,
  updateSnackStatus,
} from "../services/snack.service";

const router = Router();

// Get all snacks
router.get("/", async (_req, res) => {
  try {
    const snacks = await getAllSnacks();
    res.status(200).json(snacks);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get active snacks
router.get("/active", async (_req, res) => {
  try {
    const snacks = await getActiveSnacks();
    res.status(200).json(snacks);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get snacks by category
router.get("/category/:category", async (req, res) => {
  try {
    const snacks = await getSnacksByCategory(req.params.category);
    res.status(200).json(snacks);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get snack by ID
router.get("/:id", async (req, res) => {
  try {
    const snack = await getSnackById(req.params.id);
    res.status(200).json(snack);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(404).json({ message });
  }
});

// Create snack
router.post("/", async (req, res) => {
  try {
    const snack = await createSnack(req.body);
    res.status(201).json(snack);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Update snack
router.put("/:id", async (req, res) => {
  try {
    const snack = await updateSnack(req.params.id, req.body);
    res.status(200).json(snack);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Update snack quantity
router.patch("/:id/quantity", async (req, res) => {
  const { quantity } = req.body;
  try {
    const snack = await updateSnackQuantity(req.params.id, quantity);
    res.status(200).json(snack);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Update snack status
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    const snack = await updateSnackStatus(req.params.id, status);
    res.status(200).json(snack);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Delete snack
router.delete("/:id", async (req, res) => {
  try {
    await deleteSnack(req.params.id);
    res.status(200).json({ message: "Snack deleted successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(404).json({ message });
  }
});

export default router;
