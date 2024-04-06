import { useGames } from "../../contexts/GamesContext";
import { Link } from "react-router-dom";
import CardGame from "../CardGame";
import Loading from "../Loading";

const GamesCards = () => {
  const { games, loading } = useGames();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="divGamesCard">
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
      )}
    </>
  );
};

export default GamesCards;
