import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardGameDetails from "../../components/CardGameDetails";
import { useGames } from "../../contexts/GamesContext";
import GameRatings from "../../components/GameRatings";

const GameDetails = () => {
  const { gameId } = useParams();
  const { games, loading } = useGames();
  const [gameDetails, setGameDetails] = useState([]);

  useEffect(() => {
    const game = games.filter((game) => game._id === gameId);
    setGameDetails(game);
  }, [gameId, loading]);

  return (
    <>
      {loading ? (
        <h3 className="title3 loading">Loading...</h3>
      ) : gameDetails.length ? (
        <>
          <CardGameDetails game={gameDetails[0]} />
          <GameRatings game={gameDetails[0]} />
        </>
      ) : (
        <h3 className="loading">Jogo não encontrado</h3>
      )}
    </>
  );
};

export default GameDetails;
