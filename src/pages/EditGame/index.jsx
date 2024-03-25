import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useParams } from "react-router-dom";
import RestrictedRoute from "../../contexts/RestrictedRoute";
import { useGames } from "../../contexts/GamesContext";
import Loading from "../../components/Loading";
import ErrorFetch from "../ErrorFetch";

const EditGame = () => {
  const formData = useRef(null);
  const { gameId } = useParams();
  const { loadingUser } = useAuth();
  const { games, categories } = useGames();  
  const [error, setError] = useState([]);
  const [gameDetails, setGameDetails] = useState({
    name: "",
    category: {
      _id: "",
    },
    description: "",
    url: "",
    imageURL: "",
    videoURL: "",
  });

  useEffect(() => {
    const game = games.filter((game) => game._id === gameId);
    console.log(game);
    if (game.length) setGameDetails(game[0]);
  }, [gameId, games]);

  const handleForm = (event) => {
    event.preventDefault();

    const formInfos = new FormData(formData.current);
    const name = formInfos.get("name") || gameDetails.name;
    const category = formInfos.get("category") || gameDetails.category._id;
    const description = formInfos.get("description") || gameDetails.description;
    const url = formInfos.get("url") || gameDetails.url;
    const imageURL = formInfos.get("imageURL") || gameDetails.imageURL;
    const videoURL = formInfos.get("videoURL") || gameDetails.videoURL;

    const infos = {
      name: name,
      category: {
        _id: category,
      },
      description: description,
      url: url,
      imageURL: imageURL,
      videoURL: videoURL,
    };

    console.log(infos);
    //putGame
  };

  return (
    <>
      {loadingUser ? (
        <Loading/>
      ) : (
        <RestrictedRoute page="admin">
          <div className={`divFlexCenter ${style.divEditUser}`}>
            <h2 className="title3">Altere as informações do game</h2>
            <form ref={formData} onSubmit={handleForm}>
              <Input
                label="Título do game:"
                type="text"
                name="name"
                placeholder={gameDetails.name}
                
                classCSS={style.inputEditGame}
              />
              <label htmlFor="categories">Categoria:</label>
              <select
                name="categories"
                className={`inputBorderGradient ${style.inputEditGame}`}
              >
                <option value="">{gameDetails.category.name}</option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Input
                label="Descrição:"
                textarea="true"
                name="description"
                placeholder={gameDetails.description}
                classCSS={`${style.inputEditGame} ${style.inputDescription}`}
              />
              <Input
                label="Endereço URL do site do jogo:"
                type="text"
                name="url"
                placeholder={gameDetails.url}
                classCSS={style.inputEditGame}
              />
              <Input
                label="Endereço URL da imagem oficial do jogo:"
                type="text"
                name="imageURL"
                placeholder={gameDetails.imageURL}
                classCSS={style.inputEditGame}
              />
              <Input
                label="Endereço URL de um video do jogo (opcional):"
                type="text"
                name="videoURL"
                placeholder={gameDetails.videoURL}
                classCSS={style.inputEditGame}
              />
              <ErrorFetch error={error} />
              <div className={style.divBtnsEditGame}>
                <button
                  type="submit"
                  className={`btnGradient ${style.btnEditGame}`}
                >
                  Alterar
                </button>
                <Link to="/admin" onClick={() => window.scroll(0, 0)}>
                  <Button text="Voltar" classCSS="btnBorderGradient" />
                </Link>
              </div>
            </form>
          </div>
        </RestrictedRoute>
      )}
    </>
  );
};

export default EditGame;
