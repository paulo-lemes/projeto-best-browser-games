import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import Star from "../../assets/CardGameDetails/Star.svg";
import StarTransparent from "../../assets/CardGameDetails/StarTransparent.svg";
import ErrorFetch from "../ErrorFetch";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";

const CardGameDetails = ({game}) => {
  const {user} = useAuth();

  const [error, setError] = useState([]);
  const [ratingId, setRatingId] = useState();
  const [rateGame, setRateGame] = useState({
    score: 1,
    description: "",
    game: game._id,
    user: user && (user._id),
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
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRateGame({ ...rateGame, [name]: value });
    console.log(rateGame);
  };

  const handleSendRating = () => {
    fetch("https://api-best-browser-games.vercel.app/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(rateGame),
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 201) {
        window.location.reload();
      } else {
        setError(resposta);
      }
    });
  };

  const handleEditRating = () => {
    fetch(`https://api-best-browser-games.vercel.app/ratings/${ratingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(rateGame),
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 200) {
        window.location.reload();
      } else {
        setAlert(resposta);
      }
    });
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
            {game.category && game.category.name}
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
                {ratingId ? (
                  <label>Avaliação feita:</label>
                ) : (
                  <label>Avalie o game:</label>
                )}
                <div className={style.starsRating}>
                  <select
                    className={`inputBorderGradient ${style.rateScore}`}
                    name="score"
                    onChange={handleInputChange}
                    value={rateGame.score}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  <p className={`description ${style.maxRating}`}>/5</p>
                  <img
                    src={StarTransparent}
                    className={style.ratingStar}
                    alt={`Estrela de avaliação`}
                  ></img>
                </div>
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
                {ratingId ? (
                  <Button
                    text="Alterar avaliação"
                    classCSS={`btnGradient ${style.btnSendRating}`}
                    handleEvent={handleEditRating}
                  />
                ) : (
                  <Button
                    text="Enviar"
                    classCSS={`btnGradient ${style.btnSendRating}`}
                    handleEvent={handleSendRating}
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
                  <Link to="/login">
                    <Button text="Login" classCSS={`btnGradient ${style.btnsAskLogin}`} />
                  </Link>
                  <Link to="/register">
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
}

export default CardGameDetails