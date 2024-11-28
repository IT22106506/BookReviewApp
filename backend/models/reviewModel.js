import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model("Review", reviewSchema);
