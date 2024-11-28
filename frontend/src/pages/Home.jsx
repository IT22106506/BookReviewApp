// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import { MdError } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";
import ReviewCard from "../components/ReviewCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

const Home = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [bookTitleError, setBookTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [reviewTextError, setReviewTexttError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [filterRating, setFilterRating] = useState(0);
  const [sortOption, setSortOption] = useState("dateAdded");

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

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/reviews")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
        const totalRating = res.data.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const averageRating = totalRating / res.data.length;
        setOverallRating(averageRating || 0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const AddReview = () => {
    const isValidBookTitle = validateBookTitle(bookTitle);
    const isValidAuthor = validateAuthor(author);
    const isValidRating = validateRating(rating);
    const isValidReviewText = validateReviewText(reviewText);

    if (
      isValidBookTitle &&
      isValidAuthor &&
      isValidRating &&
      isValidReviewText
    ) {
      const review = {
        bookTitle: bookTitle,
        author: author,
        rating: rating,
        reviewText: reviewText,
      };
      setLoading(true);
      axios
        .post("http://localhost:5555/reviews", review)
        .then((res) => {
          console.log(res);
          setLoading(false);
          setRating(0);
          setReviewText("");
          window.location.reload(true);
          enqueueSnackbar("Review Added", { variant: "success" });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          enqueueSnackbar("Error adding review", { variant: "error" });
        });
    }
  };
  const filteredReviews = reviews
    .filter((review) =>
      filterRating === 0 ? true : review.rating === filterRating
    )
    .sort((a, b) => {
      if (sortOption === "dateAdded") {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      if (sortOption === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="flex flex-col items-center mb-[6%] w-full ">
        <h1 className="text-4xl mb-4 mt-4 font-bold text-primary">Reviews</h1>
        <div className="flex flex-row justify-evenly w-fit bg-secondary p-4 rounded-xl border-primary border-2">
          <div className="text-[20px] text-primary mx-10">
            Overall Rating
            <br />
            <div className="text-6xl">{overallRating.toFixed(1)}</div>
            <div className="flex flex-col">
              <div className="flex flex-row text-[20px]">
                <ProgressBar ratings={reviews.map((review) => review.rating)} />
              </div>
            </div>
          </div>
          <div className="text-[20px] text-primary mx-10">
            <div className="text-[30px]">Add Your Review</div>
            <form onSubmit={AddReview} noValidate>
              <div className="flex flex-row font justify-between w-fit my-4">
                Book <br /> Title
                <div className="flex flex-col ml-4">
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
              <div className="flex flex-row font justify-between w-fit my-4">
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
              <div className="flex flex-row font justify-between w-fit my-4">
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
              <MdOutlineAddBox className="text-[40px]" onClick={AddReview} />
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center my-4">
        <select
          className="border-2 border-primary rounded-lg p-2 mx-2"
          value={filterRating}
          onChange={(e) => setFilterRating(Number(e.target.value))}
        >
          <option value={0}>All Ratings</option>
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>
        <select
          className="border-2 border-primary rounded-lg p-2 mx-2"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="dateAdded">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      <div className="mx-16">
        <ReviewCard reviews={filteredReviews} id={id} />
      </div>
    </div>
  );
};

export default Home;
