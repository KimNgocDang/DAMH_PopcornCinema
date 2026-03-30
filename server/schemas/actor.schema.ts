import { Schema, model } from "mongoose";

const actorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Actor = model("Actor", actorSchema);
