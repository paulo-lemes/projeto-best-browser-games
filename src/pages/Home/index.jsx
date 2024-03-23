import style from "./style.module.css";
import { Link } from "react-router-dom";
import Card1 from "../../assets/Home/Card-1.png";
import Card2 from "../../assets/Home/Card-2.png";
import Stars from "../../assets/Home/Stars.png";
import Union from "../../assets/Home/Union.svg";
import Games from "../Games";
import Button from "../../components/Button";
import DivGradient from "../../components/DivGradient";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const {user} = useAuth()
  return (
    <>
      <div className={style.geral}>
        <div className={style.home1}>
          <div className={style.chamada1}>
            <div>
              <h2 className="title1">ENCONTRE OS MELHORES</h2>
              <h2 className="title1">
                <span className={style.titleGradientHome}>BROWSER GAMES</span>
              </h2>
            </div>
            <p className={style.description}>
              Junte-se à comunidade do BestBrowserGames e mergulhe no universo
              dos jogos de navegador como nunca antes! Aqui, você não apenas
              joga, mas também compartilha suas experiências!
            </p>
          </div>
          <img
            src={Card1}
            className=""
            alt="Imagem cartunesca de homem jogando com logotipo"
          />
        </div>
        <DivGradient />
        <div>
          <img src={Union} className={style.borda} alt="Borda gradiente"/>
          <div className={style.home2}>
            <img
              src={Card2}
              className=""
              alt="Imagem cartunesca de mulher jogando com logo"
            />
            <div className={style.chamada2}>
              {!user ? (
                <p className={style.description}>
                  Cadastre-se e compartilhe suas impressões, descubra novos
                  favoritos e conecte-se com uma comunidade de jogadores
                  apaixonados. <br></br>
                  <br></br>
                  No BestBrowserGames, a diversão nunca acaba e as recomendações
                  nunca falham. Venha explorar conosco e leve sua experiência de
                  game para o próximo nível!
                </p>
              ) : (
                <p className={style.description}>
                  Compartilhe suas impressões, descubra novos favoritos e
                  conecte-se com uma comunidade de jogadores apaixonados.{" "}
                  <br></br>
                  <br></br>
                  No BestBrowserGames, a diversão nunca acaba e as recomendações
                  nunca falham. Venha explorar conosco e leve sua experiência de
                  game para o próximo nível!
                </p>
              )}
              <div className={style.estrela}>
                <img src={Stars} className="" alt="Cinco estrelas" />
                {!user && (
                  <Link to="/register" onClick={() => window.scroll(0, 0)}>
                    <Button text="Cadastrar" classCSS="btnGradient" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Games />
    </>
  );
}

export default Home