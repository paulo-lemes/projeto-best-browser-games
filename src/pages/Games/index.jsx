import SearchGames from "../../components/SearchGames";
import { useGames } from "../../contexts/GamesContext";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import GamesCards from "../../components/GamesCards";

const Games = () => {
  const { loading, handleSearchCategory } = useGames();

  useEffect(() => {
    handleSearchCategory("");
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SearchGames />
          <GamesCards />
        </>
      )}
    </>
  );
};

export default Games;
