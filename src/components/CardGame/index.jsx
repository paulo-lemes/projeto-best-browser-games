import style from "./style.module.css";
import Star from "../../assets/CardGame/Star.svg";

const CardGame = ({game}) => {
  const urlImage = game.imageURL;
  const title = game.name;
  let category;
  if(game.category){
    category = game.category.name;
  }
  const rating = game.score;
  const description = game.description;

  return (
    <>
      <div className={style.card}>
        <div className={style.cardGameImage}>
          <img src={urlImage} alt={`Imagem do jogo ${title}`} />
        </div>
        <div className={style.cardInfos}>
          <div className={style.cardGameTitle}>
            <h2 className="title3">{title}</h2>
            <div className={style.divGameScore}>
              <img
                src={Star}
                className={style.gameScoreImg}
                alt={`Estrela de avaliação`}
              ></img>
              <p className={`description ${style.gameScore}`}>{rating}/5</p>
            </div>
          </div>
          <p className={style.categoryGameCard}>{category}</p>
          <p className={style.cardGameDescription}>{description}</p>
          <p className={style.clickForDetails}>Clique no card para mais detalhes!</p>
        </div>
      </div>
    </>
  );
}

export default CardGame