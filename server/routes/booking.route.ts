import { Router } from "express";
import { Booking } from "../schemas/booking.schema";
import { createBooking } from "../services/booking.service";

const router = Router();

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullName email phone")
      .populate({
        path: "showtime",
        populate: [
          { path: "movieId", select: "title" },
          { path: "auditoriumId", select: "name cinema" },
        ],
      })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Get booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("showtime");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Đặt vé
router.post("/", async (req, res) => {
  const { userId, showtimeId, seatIds } = req.body;

  try {
    const booking = await createBooking(userId, showtimeId, seatIds);
    res.status(201).json(booking);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message });
  }
});

// Delete booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

// Update booking
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
});

export default router;