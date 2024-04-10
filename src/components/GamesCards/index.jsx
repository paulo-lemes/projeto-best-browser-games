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
              <Link
                to={`/games/gameDetails/${game._id}`}
                key={game._id}
                onClick={() => window.scroll(0, 0)}
              >
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
