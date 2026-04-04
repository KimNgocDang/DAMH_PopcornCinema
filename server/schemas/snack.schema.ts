import { Schema, model } from "mongoose";

const snackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["POPCORN", "DRINK", "CANDY", "HOT_FOOD", "OTHER"],
      default: "OTHER",
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "OUT_OF_STOCK"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export const Snack = model("Snack", snackSchema);
