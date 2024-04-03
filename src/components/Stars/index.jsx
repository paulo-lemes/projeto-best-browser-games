import style from "./style.module.css";

const Stars = ({ rating = 1 }) => {
  const totalStars = 5;

  return (
    <div className={style.divRatingStars}>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input key={star} type="radio" name="rating" />
            <span
              className={`${style.star} ${
                currentRating <= rating ? style.starActive : style.starNull
              }`}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default Stars;
