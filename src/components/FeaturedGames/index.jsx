import style from "./style.module.css";
import { useGames } from "../../contexts/GamesContext";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import CardGame from "../CardGame";
import Button from "../Button";
import { useRef, useState } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { useEffect } from "react";

const FeaturedGames = () => {
  const { games, loading } = useGames();
  const [featuredGames, setFeaturedGames] = useState([]);
  const carousel = useRef(null);

  const handleScrollLeft = () => {
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleScrollRight = () => {
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  const randomizeGames = (array, date) => {
    const randomizedArray = array.slice();
    let currentIndex = randomizedArray.length;
    let temporaryGame;
    let randomIndex;

    const random = () => {
      const x = Math.sin(date++) * 10000;
      return x - Math.floor(x);
    };

    while (currentIndex !== 0) {
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex--;
      temporaryGame = randomizedArray[currentIndex];
      randomizedArray[currentIndex] = randomizedArray[randomIndex];
      randomizedArray[randomIndex] = temporaryGame;
    }

    return randomizedArray;
  };

  const getGames = () => {
    const currentDate = new Date().getDate();
    const currentDateGames = randomizeGames(games, currentDate);
    setFeaturedGames(currentDateGames.slice(0, 6));
  };

  useEffect(() => {
    getGames();
  }, [games, loading]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.divTitle}>
            <h3 className="title2">
              GAMES EM <span className={style.titleGradient}>DESTAQUE</span>
            </h3>
          </div>
          {featuredGames.length > 0 ? (
            <>
              <div className={style.divCarousel}>
                <button type="button" onClick={handleScrollLeft}>
                  <CaretLeft size={32} color="#fcfcfc" weight="fill" />
                </button>
                <div className={style.carousel}>
                  <div className={style.inner} ref={carousel}>
                    {featuredGames.map((game) => (
                      <div className={style.item} key={game._id}>
                        <Link
                          to={`/games/gameDetails/${game._id}`}
                          onClick={() => window.scroll(0, 0)}
                        >
                          <CardGame game={game} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="button" onClick={handleScrollRight}>
                  <CaretRight size={32} color="#fcfcfc" weight="fill" />
                </button>
              </div>
              <div className={style.btnCarousel}>
                <Link to="/games" onClick={() => window.scroll(0, 0)}>
                  <Button classCSS="btnBorderGradient" text="Ver todos" />
                </Link>
              </div>
            </>
          ) : (
            <p className="loading">Nenhum jogo encontrado</p>
          )}
        </>
      )}
    </>
  );
};

export default FeaturedGames;
