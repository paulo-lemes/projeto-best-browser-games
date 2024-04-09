import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import Button from "../Button";
import { useGames } from "../../contexts/GamesContext";
import ErrorFetch from "../ErrorFetch";
import fetchApi from "../../hooks/api";

const DeleteGame = () => {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [gameId, setGameId] = useState("");

  const { games, showDialog, fetchGames, setConfirm, setHandleClick } =
    useGames();

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setGameId(value);
  };

  const deleteGame = async () => {
    try {
      const { data } = await fetchApi(`/games/${gameId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      setConfirm(false);
      showDialog("Game excluído com sucesso!");
      fetchGames();
      window.scroll(0, 0);
      navigate("/games");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  const handleSave = () => {
    setConfirm(true);
    setHandleClick(() => deleteGame);
    showDialog(
      "Tem certeza que deseja excluir o game? Não será possível desfazer a ação."
    );
  };

  return (
    <>
      <div className="divFlexCenter">
        <h2 className={`title2 ${style.titleDeleteGame}`}>
          EDITAR OU EXCLUIR <span className="titleGradient">GAME</span>
        </h2>
        <div className={style.deleteGame}>
          <form>
            <select
              name="games"
              onChange={handleSelectChange}
              className={`inputBorderGradient ${style.inputDeleteGame}`}
              required
            >
              <option value="">Escolha uma opção</option>
              {games.map((game) => (
                <option value={game._id} key={game._id}>
                  {game.name}
                </option>
              ))}
            </select>
            <ErrorFetch error={error} />
            <Link
              to={`/editGame/${gameId}`}
              onClick={() => window.scroll(0, 0)}
            >
              <Button
                text="Editar"
                classCSS={`btnGradient ${style.btnDeleteGame}`}
              />
            </Link>
            <Button
              text="Excluir"
              classCSS={`btnBorderGradient ${style.btnDeleteGame}`}
              handleEvent={handleSave}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteGame;
