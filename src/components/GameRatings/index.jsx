import { useEffect, useState } from "react";
import DivGradient from "../DivGradient";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loading";
import Stars from "../Stars";

const GameRatings = ({ game }) => {
  const { user, loading } = useAuth();
  const [ratings, setRatings] = useState([]);

  let userId;

  useEffect(() => {
    if (user) userId = user._id;
    const ratingsFiltered = game.ratings.filter(
      (rating) => rating.user !== userId
    );
    setRatings(ratingsFiltered);
  }, [user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.ratingsList}>
          <h3 className="title3">
            {ratings.length > 0
              ? "Confira aqui a avaliação de outros players!"
              : "Esse game ainda não possui avaliações de outros players."}
          </h3>
          <DivGradient classCSS={style.divGradientGameRatings} />
          <table className={style.ratingsBody}>
            <tbody>
              {ratings.length > 0 &&
                ratings.map((filtered) => (
                  <tr key={filtered._id} className={style.ratingRow}>
                    <td>
                      <div
                        className={`divGameScore ${style.divRatingGameScore}`}
                      >
                        <h4 className="title3">Avaliação</h4>
                        <div className={style.divGameScore}>
                          <Stars rating={filtered.score} />
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
