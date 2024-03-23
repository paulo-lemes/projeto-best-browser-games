import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import Button from "../Button";
import { useGames } from "../../contexts/GamesContext";
// import AlertError from "../AlertError";

const DeleteGame = () => {
  const navigate = useNavigate();
  const [alertError, setAlert] = useState([]);
  const [gameId, setGameId] = useState("");

  const { games } = useGames();

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setGameId(value);
  };

  const handleSave = () => {
    fetch(`https://api-best-browser-games.vercel.app/games/${gameId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 200) {
        navigate("/games");
      } else {
        setAlert(resposta);
      }
    });
  };

  return (
    <>
      <div className="divFlexCenter">
        <h2 className="title2">
          EDITAR OU EXCLUIR <span className="titleGradient">GAME</span>
        </h2>
        <div className={style.deleteGame}>
          <form className="">
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
          </form>
          {/* <AlertError alertError={alertError} classCSS="errorNewGame" /> */}
          <Link to={`/editGame/${gameId}`}>
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
        </div>
      </div>
    </>
  );
}

export default DeleteGame