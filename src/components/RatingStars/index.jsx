import style from "./style.module.css";
import { useState } from "react";

const RatingStars = ({ rating, handleInputChange }) => {
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  return (
    <div className={style.divRatingStars}>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => handleInputChange(currentRating)}
            />
            <span
              className={`${style.star} ${
                currentRating <= (hover || rating)
                  ? style.starActive
                  : style.starNull
              }`}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default RatingStars;
