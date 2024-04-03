import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import Star from "../../assets/CardGameDetails/Star.svg";
import ErrorFetch from "../ErrorFetch";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useGames } from "../../contexts/GamesContext";
import fetchApi from "../../hooks/api";
import RatingStars from "../RatingStars";

const CardGameDetails = ({ game }) => {
  const { user } = useAuth();
  const { fetchGames, showDialog } = useGames();

  const [error, setError] = useState([]);
  const [posted, setPosted] = useState(false);
  const [ratingId, setRatingId] = useState(null);
  const [rateGame, setRateGame] = useState({
    score: 1,
    description: "",
    game: game._id,
    user: user && user._id,
  });

  useEffect(() => {
    game.ratings.map((rating) => {
      if (user && rating.user === user._id) {
        setRateGame({
          ...rateGame,
          score: rating.score,
          description: rating.description,
        });
        setRatingId(rating._id);
        setPosted(true);
      }
    });
  }, [posted]);

  const handleInputChange = (value) => {
    setRateGame({ ...rateGame, score: value });
  };

  const handleAction = async (method, action, ratingId = "") => {
    try {
      const { data } = await fetchApi(`/ratings${"/" + ratingId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(rateGame),
      });
      console.log(data);
      setPosted(true);
      showDialog(`Avaliação ${action} com sucesso!`);
      fetchGames();
      window.scroll(0, 0);
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className={style.halfBorderTop}></div>
      <div className={style.divCardGameDetails}>
        <div className={style.gameInfos}>
          <div className={style.gameDetailsTitle}>
            <h3 className="title2">{game.name && game.name}</h3>
            <div className={style.divGameScore}>
              <img
                src={Star}
                className={style.gameScoreImg}
                alt={`Estrela de avaliação`}
              ></img>
              <p className={`description ${style.gameScore}`}>
                {game.score && game.score}/5
              </p>
            </div>
          </div>
          <p className={`title3 ${style.gameCategoryName}`}>
            {game.category.name && game.category.name}
          </p>
          <p className={`description ${style.gameDescription}`}>
            {game.description && game.description}
          </p>
          <p className={style.linkGame}>
            <a href={game.url} target="_blank" rel="noreferrer">
              Link do game
            </a>
          </p>
          {game.videoURL && (
            <p className={style.linkGame}>
              <a href={game.videoURL} target="_blank" rel="noreferrer">
                Link de um vídeo do game
              </a>
            </p>
          )}
          {user ? (
            <>
              <div className={style.rateGame}>
                {posted ? (
                  <label>Avaliação feita:</label>
                ) : (
                  <label>Avalie o game:</label>
                )}
                <RatingStars
                  rating={rateGame.score}
                  handleInputChange={handleInputChange}
                />
              </div>
              <Input
                classCSS={style.ratingDescription}
                textarea="true"
                name="description"
                value={rateGame.description}
                handleEvent={handleInputChange}
              />
              <div className="divFlexCenter">
                <ErrorFetch error={error} />
                {posted ? (
                  <Button
                    text="Alterar avaliação"
                    classCSS={`btnGradient ${style.btnSendRating}`}
                    handleEvent={() =>
                      handleAction("put", "alterada", ratingId)
                    }
                  />
                ) : (
                  <Button
                    text="Enviar"
                    classCSS={`btnGradient ${style.btnSendRating}`}
                    handleEvent={() => handleAction("post", "postada")}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div className={`divFlexCenter ${style.divAskLogin}`}>
                <h4 className="title3">
                  Faça login ou cadastre-se para avaliar o jogo!
                </h4>
                <div className="">
                  <Link to="/login" onClick={() => window.scroll(0, 0)}>
                    <Button
                      text="Login"
                      classCSS={`btnGradient ${style.btnsAskLogin}`}
                    />
                  </Link>
                  <Link to="/register" onClick={() => window.scroll(0, 0)}>
                    <Button
                      text="Cadastro"
                      classCSS={`btnBorderGradient ${style.btnsAskLogin}`}
                    />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={style.gameImg}>
          <img
            src={game.imageURL}
            width={600}
            height={600}
            alt={`Jogo ${game.name}`}
          ></img>
        </div>
      </div>
      <div className={`divFlexCenter ${style.divBtnPrevious}`}>
        <Link to="/games">
          <Button text="Voltar" classCSS="btnBorderGradient" />
        </Link>
      </div>
    </>
  );
};

export default CardGameDetails;
