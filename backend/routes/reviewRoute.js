import express from "express";
import { Review } from "../models/reviewModel.js";

const router = express.Router();

// Route to add a new review
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.bookTitle ||
      !req.body.author ||
      !req.body.rating ||
      !req.body.reviewText
    ) {
      return res.status(400).send("Please fill all the fields");
    }
    const newReview = {
      bookTitle: req.body.bookTitle,
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText,
    };
    const review = await Review.create(newReview);
    return res.status(201).send(review);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({});
    return res.status(200).send(reviews);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to get a review by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).send("Review not found");
    }
    return res.status(200).send(review);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to update a review
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.bookTitle ||
      !req.body.author ||
      !req.body.rating ||
      !req.body.reviewText
    ) {
      return res.status(400).send("Please fill all the fields");
    }
    const { id } = req.params;
    const result = await Review.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send("Review not found");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to delete a review
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Review.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send("Review not found");
    }
    return res.status(200).send("Review deleted successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;