import SearchGames from "../../components/SearchGames";
import { useGames } from "../../contexts/GamesContext";
import { Link } from "react-router-dom";
import CardGame from "../../components/CardGame";
import { useEffect } from "react";

const Games = () => {
  const { games, loading, handleSearchCategory } = useGames();

  useEffect(() => {
    handleSearchCategory("");
  }, []);

  return (
    <>
      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <>
          <SearchGames />
          <div className="divGamesCard">
            {games.length > 0 ? (
              games.map((game) => (
                <Link to={`/gameDetails/${game["_id"]}`} key={game._id}>
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

export default Games;
