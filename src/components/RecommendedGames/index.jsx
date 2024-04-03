import { useEffect, useState } from "react";
import DivGradient from "../DivGradient";
import { Link } from "react-router-dom";
import CardGame from "../CardGame";
import { useAuth } from "../../contexts/AuthContext";
import style from "./style.module.css";
import Loading from "../Loading";
import fetchApi from "../../hooks/api";

const RecommendedGames = () => {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecommendedGames = async (userId) => {
    try {
      const { data } = await fetchApi(`/users/${userId}/recommendations`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      setGames(data);
    } catch (err) {
      console.log(err.response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRecommendedGames(user._id);
  }, [user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className={`title2 ${style.titleRatedGames}`}>
            GAMES <span className="titleGradient">RECOMENDADOS</span>
          </h2>
          <DivGradient />
          <div className={style.divGamesCard}>
            {games.length > 0 ? (
              games.map((game) => (
                <Link to={`/games/gameDetails/${game._id}`} key={game._id}>
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
