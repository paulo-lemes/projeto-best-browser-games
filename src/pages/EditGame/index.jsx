import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import RestrictedRoute from "../../contexts/RestrictedRoute";
import { useGames } from "../../contexts/GamesContext";
import Loading from "../../components/Loading";
import ErrorFetch from "../../components/ErrorFetch";
import fetchApi from "../../hooks/api";

const EditGame = () => {
  const { gameId } = useParams();
  const { loadingUser } = useAuth();
  const { games, categories, showDialog, fetchGames } = useGames();
  const [error, setError] = useState([]);
  const navigate = useNavigate();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameDetails({ ...gameDetails, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setGameDetails({ ...gameDetails, category: { _id: value } });
  };

  const handleSave = async () => {
    try {
      const { data } = await fetchApi(`/games/${gameId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(gameDetails),
      });
      console.log(data);
      showDialog(`Game editado com sucesso!`);
      fetchGames();
      window.scroll(0, 0);
      navigate("/admin");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  useEffect(() => {
    const game = games.filter((game) => game._id === gameId);
    console.log(game);
    if (game.length) setGameDetails(game[0]);
  }, [gameId, games]);

  return (
    <>
      {loadingUser ? (
        <Loading />
      ) : (
        <RestrictedRoute page="admin">
          <div className={`divFlexCenter ${style.divEditGame}`}>
            <h2 className="title3">Altere as informações do game</h2>
            <form>
              <Input
                label="Título do game:"
                type="text"
                name="name"
                value={gameDetails.name}
                handleEvent={handleInputChange}
                classCSS={style.inputEditGame}
              />
              <label htmlFor="categories">Categoria:</label>
              <select
                name="categories"
                className={`inputBorderGradient ${style.inputEditGame}`}
                onChange={handleSelectChange}
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
                value={gameDetails.description}
                handleEvent={handleInputChange}
                classCSS={`${style.inputEditGame} ${style.inputDescription}`}
              />
              <Input
                label="Endereço URL do site do jogo:"
                type="text"
                name="url"
                value={gameDetails.url}
                handleEvent={handleInputChange}
                classCSS={style.inputEditGame}
              />
              <Input
                label="Endereço URL da imagem oficial do jogo:"
                type="text"
                name="imageURL"
                value={gameDetails.imageURL}
                handleEvent={handleInputChange}
                classCSS={style.inputEditGame}
              />
              <Input
                label="Endereço URL de um video do jogo (opcional):"
                type="text"
                name="videoURL"
                value={gameDetails.videoURL}
                handleEvent={handleInputChange}
                classCSS={style.inputEditGame}
              />
              <ErrorFetch error={error} />
              <div className={style.divBtnsEditGame}>
                <Button
                  text="Alterar"
                  handleEvent={handleSave}
                  classCSS={`btnGradient ${style.btnEditGame}`}
                />
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
