import { Schema, model } from "mongoose";

const bookingComboSchema = new Schema(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", default: null },
    showtimeId: { type: Schema.Types.ObjectId, ref: "Showtime", default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    comboId: { type: Schema.Types.ObjectId, ref: "Combo", required: true },
    quantity: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true }
);

// Create unique indexes
bookingComboSchema.index(
  { showtimeId: 1, userId: 1, comboId: 1 },
  { unique: true, sparse: true }
);
bookingComboSchema.index(
  { bookingId: 1, comboId: 1 },
  { unique: true, sparse: true }
);

export const BookingCombo = model("BookingCombo", bookingComboSchema);
