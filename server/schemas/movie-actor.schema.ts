import { Schema, model } from "mongoose";

const movieActorSchema = new Schema(
  {
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    actorId: { type: Schema.Types.ObjectId, ref: "Actor", required: true },
  },
  { timestamps: true }
);

// Create compound unique index
movieActorSchema.index({ movieId: 1, actorId: 1 }, { unique: true });

export const MovieActor = model("MovieActor", movieActorSchema);
