import { Schema, model } from "mongoose";

const movieGenreSchema = new Schema(
  {
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    genreId: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  },
  { timestamps: true }
);

// Create compound unique index
movieGenreSchema.index({ movieId: 1, genreId: 1 }, { unique: true });

export const MovieGenre = model("MovieGenre", movieGenreSchema);
