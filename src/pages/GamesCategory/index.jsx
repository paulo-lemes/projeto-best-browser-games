import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardGame from "../../components/CardGame";
import Button from "../../components/Button";
import { useGames } from "../../contexts/GamesContext";
import Loading from "../../components/Loading";

const GamesCategory = () => {
  const { categoryId, categoryName } = useParams();
  const { games, loading, handleSearchCategory } = useGames();

  useEffect(()=>{
    handleSearchCategory(categoryId)
  }, [categoryId])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="divFlexCenter">
          <h2 className="title2">
            <span className="titleGradient">{categoryName.toUpperCase()}</span>{" "}
            GAMES
          </h2>
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
          <div className="divBtnPrevious">
            <Link to="/categories" onClick={() => window.scroll(0, 0)}>
              <Button text="Voltar" classCSS="btnBorderGradient" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default GamesCategory;