import { useEffect, useState } from "react";
import DivGradient from "../DivGradient";
import Star from "../../assets/CardGameDetails/Star.svg";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";

const GameRatings = ({ game }) => {
  const {user} = useAuth()
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    game.ratings.map((rating) => {
      if (rating.user !== user._id) {
        setRatings([...ratings, rating]);
      }
    });
  }, []);

  return (
    <>
      {ratings.length > 0 && (
        <div className={style.ratingsList}>
          <h3 className="title3 ">
            Confira aqui a avaliação de outros players!
          </h3>
          <DivGradient classCSS={style.divGradientGameRatings} />
          <table className={style.ratingsBody}>
            <tbody>
              {game.ratings
                .filter((element) => element.user !== user._id)
                .map((filtered) => (
                  <tr key={filtered._id} className={style.ratingRow}>
                    <td>
                      <div
                        className={`divGameScore ${style.divRatingGameScore}`}
                      >
                        <h4 className="title3">Avaliação</h4>
                        <div className={style.divGameScore}>
                          <img
                            src={Star}
                            className={style.gameScoreImg}
                            alt={`Estrela de avaliação`}
                          ></img>
                          <p className={`description ${style.gameScore}`}>
                            {filtered.score}/5
                          </p>
                        </div>
                      </div>
                      <p className={`description ${style.ratingQuote}`}>
                        "{filtered.description}"
                      </p>
                      <div className={style.borderRating}></div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default GameRatings;