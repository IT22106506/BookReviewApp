import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const ProgressBar = ({ ratings }) => {
  const [progress, setProgress] = useState({
    group1: 0,
    group2: 0,
    group3: 0,
    group4: 0,
    group5: 0,
  });

  useEffect(() => {
    const totalRatings = ratings.length;
    const group1 = ratings.filter((rating) => rating == 1).length;
    const group2 = ratings.filter((rating) => rating == 2).length;
    const group3 = ratings.filter((rating) => rating == 3).length;
    const group4 = ratings.filter((rating) => rating == 4).length;
    const group5 = ratings.filter((rating) => rating == 5).length;

    setProgress({
      group1: (group1 / totalRatings) * 100,
      group2: (group2 / totalRatings) * 100,
      group3: (group3 / totalRatings) * 100,
      group4: (group4 / totalRatings) * 100,
      group5: (group5 / totalRatings) * 100,
    });
  }, [ratings]);

  return (
    <div>
      <div className="flex flex-row">
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <div className="w-72 h-3 bg-gray-200 rounded-full overflow-hidden my-3 mx-2">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress.group5}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row">
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <div className="w-72 h-3 bg-gray-200 rounded-full overflow-hidden my-3 mx-2">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress.group4}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row">
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <div className="w-72 h-3 bg-gray-200 rounded-full overflow-hidden my-3 mx-2">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress.group3}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row">
        <FaStar className="mt-2 text-yellow-500" />
        <FaStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <div className="w-72 h-3 bg-gray-200 rounded-full overflow-hidden my-3 mx-2">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress.group2}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row">
        <FaStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <FaRegStar className="mt-2 text-yellow-500" />
        <div className="w-72 h-3 bg-gray-200 rounded-full overflow-hidden my-3 mx-2">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress.group1}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.number),
};

export default ProgressBar;
