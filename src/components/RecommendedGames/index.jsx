import { useEffect } from "react";
import DivGradient from "../DivGradient";
import { Link } from "react-router-dom";
import CardGame from "../CardGame";
import { useAuth } from "../../contexts/AuthContext";
import { useGames } from "../../contexts/GamesContext";
import style from "./style.module.css";

const RecommendedGames = () => {
  const { user } = useAuth();
  const { recommendedGames, loadingRecommendedGames, getRecommendedGames } =
    useGames();

  useEffect(() => {
    getRecommendedGames(user._id);
  }, [user]);

  return (
    <>
      {loadingRecommendedGames ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <>
          <h2 className={`title2 ${style.titleRatedGames}`}>
            GAMES <span className="titleGradient">RECOMENDADOS</span>
          </h2>
          <DivGradient />
          <div className={style.divGamesCard}>
            {recommendedGames.length > 0 ? (
              recommendedGames.map((game) => (
                <Link to={`/gameDetails/${game._id}`} key={game._id}>
                  <CardGame game={game} />
                </Link>
              ))
            ) : (
              <p className="loading">Nenhum jogo encontrado</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default RecommendedGames;
