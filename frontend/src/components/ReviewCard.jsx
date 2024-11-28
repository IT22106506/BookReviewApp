// import React from 'react'
import axios from "axios";
import { useState } from "react";
// import { useParams } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from "prop-types";
import UpdateReview from "../pages/UpdateReview.jsx";

const ReviewCard = ({ reviews, id }) => {
  const [review, setReview] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const deleteReview = (id) => {
    axios
      .delete(`http://localhost:5555/reviews/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload(true);
  };

  return (
    <div className="flex flex-col items-center">
      {reviews.map((review, index) => (
        <div key={index} className="p-1 m-6 bg-secondary w-2/3 rounded-xl">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <p className="text-[25px] font-bold text-primary mx-3">
                {review.bookTitle}
              </p>
              <p className="text-[20px] text-primary mx-3">{review.author}</p>
            </div>
            <div className="flex flex-row justify-evenly alignItems-top m-2 text-primary">
              <button
                onClick={() => {
                  setReview(review);
                  setShowEdit(true);
                }}
              >
                <FiEdit className="ml-3 text-[25px]" />
              </button>
              <button onClick={() => deleteReview(review._id)}>
                <MdDeleteOutline className="ml-3 text-[28px]" />
              </button>
            </div>
          </div>
          <div className="flex flex-row mx-3 my-2">
            {Array(review.rating)
              .fill()
              .map((_, i) => (
                <FaStar key={i} className="text-[20px] text-yellow-500" />
              ))}
            {Array(5 - review.rating)
              .fill()
              .map((_, i) => (
                <FaRegStar key={i} className="text-[20px] text-yellow-500" />
              ))}
          </div>

          <div className="h-fit border-2 mx-3 rounded-xl mb-2 bg-white">
            <p className="text-[20px] text-primary m-1">{review.reviewText}</p>
          </div>
        </div>
      ))}

      {showEdit && (
        <UpdateReview
          id={id}
          review={review}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
};

ReviewCard.propTypes = {
  reviews: PropTypes.array,
  id: PropTypes.string,
};

export default ReviewCard;
