// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import SubmitButton from "../components/SubmitButton.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { enqueueSnackbar } from "notistack";

const UpdateReview = ({ review, onClose }) => {
  const [bookTitle, setBookTitle] = useState(review.bookTitle);
  const [author, setAuthor] = useState(review.author);
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.reviewText);
  const [bookTitleError, setBookTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [reviewTextError, setReviewTexttError] = useState("");

  function validateBookTitle(bookTitle) {
    let isValid = true;
    if (bookTitle === "") {
      setBookTitleError("Book Title is required");
      isValid = false;
    } else {
      setBookTitleError("");
    }
    return isValid;
  }

  function validateAuthor(author) {
    let isValid = true;
    if (author === "") {
      setAuthorError("Author is required");
      isValid = false;
    } else {
      setAuthorError("");
    }
    return isValid;
  }

  function validateRating(rate) {
    let isValid = true;
    if (rate < 1 || rate > 5) {
      setRatingError("Rating should be between 1 and 5");
      isValid = false;
    }
    if (rate === "") {
      setRatingError("Rate is required");
      isValid = false;
    }
    return isValid;
  }

  function validateReviewText(reviewComment) {
    let isValid = true;
    if (reviewComment === "") {
      setReviewTexttError("Please enter a review");
      isValid = false;
    } else {
      setReviewTexttError("");
    }
    return isValid;
  }

  const handleEditReview = (id) => {
    event.preventDefault();

    const isValidBookTitle = validateBookTitle(bookTitle);
    const isValidAuthor = validateAuthor(author);
    const isValidRate = validateRating(rating);
    const isValidReviewText = validateReviewText(reviewText);

    if (isValidBookTitle && isValidAuthor && isValidRate && isValidReviewText) {
      const updatedReview = {
        bookTitle: bookTitle,
        author: author,
        rating: rating,
        reviewText: reviewText,
      };
      axios
        .put(`http://localhost:5555/reviews/${id}`, updatedReview)
        .then((res) => {
          enqueueSnackbar("Review updated successfully", {
            variant: "success",
          });
          console.log(res);
        })
        .catch((err) => {
          enqueueSnackbar("Error updating data", { variant: "error" });
          console.log(err);
        });
      window.location.reload(true);
    }
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[700px] max-w-full h-auto bg-white rounded-xl p-4 flex flex-col relative"
      >
        <div className="text-[20px] text-primary mx-10">
          <div className="text-[30px]">Edit Review</div>
          <form onSubmit={handleEditReview} noValidate>
            <div className="flex flex-row justify-between w-fit my-4">
              Book Title
              <div className="flex flex-col">
                <textarea
                  className="border-2 border-primary rounded-lg p-2 ml-3"
                  placeholder="Enter your review here"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                />
                <AnimatePresence mode="wait" initial={false}>
                  {bookTitleError && (
                    <motion.p className="flex items-center my-1 gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md">
                      <MdError />
                      {bookTitleError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex flex-row justify-between w-fit my-4">
              Author
              <div className="flex flex-col">
                <textarea
                  className="border-2 border-primary rounded-lg p-2 ml-3"
                  placeholder="Enter your review here"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <AnimatePresence mode="wait" initial={false}>
                  {authorError && (
                    <motion.p className="flex items-center my-1 gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md">
                      <MdError />
                      {authorError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex flex-row justify-between w-fit my-4">
              Rating
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <input
                    className="border-2 border-primary rounded-lg p-2 mx-4"
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  / 5
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  {ratingError && (
                    <motion.p className="flex items-center my-1 gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md">
                      <MdError />
                      {ratingError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex flex-row justify-between w-fit my-4">
              Review
              <div className="flex flex-col">
                <textarea
                  className="border-2 border-primary rounded-lg p-2 ml-3"
                  placeholder="Enter your review here"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <AnimatePresence mode="wait" initial={false}>
                  {reviewTextError && (
                    <motion.p className="flex items-center my-1 gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md">
                      <MdError />
                      {reviewTextError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <SubmitButton onClick={() => handleEditReview(review._id)} />
          </form>
        </div>
      </div>
    </div>
  );
};

UpdateReview.propTypes = {
  //   id: PropTypes.string.isRequired,
  review: PropTypes.shape({
    bookTitle: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewText: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateReview;
