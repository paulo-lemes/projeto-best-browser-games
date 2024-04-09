import style from "./style.module.css";
import Star from "../../assets/CardGame/Star.svg";

const CardGame = ({ game }) => {
  return (
    <>
      <div className={style.card}>
        <div className={style.cardGameImage}>
          <img src={game.imageURL} alt={`Imagem do jogo ${game.name}`} />
        </div>
        <div className={style.cardInfos}>
          <div className={style.cardGameTitle}>
            <h2 className="title3">{game.name}</h2>
            <div className={style.divGameScore}>
              <img
                src={Star}
                className={style.gameScoreImg}
                alt={`Estrela de avaliação`}
              ></img>
              <p className={`description ${style.gameScore}`}>{game.score}/5</p>
            </div>
          </div>
          <p className={style.categoryGameCard}>
            {game.category && game.category.name}
          </p>
          <p className={style.cardGameDescription}>{game.description}</p>
          <p className={style.clickForDetails}>
            Clique no card para mais detalhes!
          </p>
        </div>
      </div>
    </>
  );
};

export default CardGame;
