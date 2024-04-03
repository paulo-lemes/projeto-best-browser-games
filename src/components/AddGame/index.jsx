import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import Input from "../Input";
import Button from "../Button";
import ErrorFetch from "../ErrorFetch";
import { useGames } from "../../contexts/GamesContext";
import fetchApi from "../../hooks/api";

const AddGame = () => {
  const formData = useRef(null);
  const [error, setError] = useState([]);
  const { categories, showDialog, fetchGames } = useGames()
  const navigate = useNavigate();

  const postGame = async (infos) => {
    try {
      const { data } = await fetchApi("/games", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(infos),
      });
      console.log(data);
      showDialog("Game cadastrado com sucesso!")
      fetchGames()
      window.scroll(0, 0);
      navigate("/games");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  const handleForm = (event) => {
    event.preventDefault();

    const formInfos = new FormData(formData.current);
    const name = formInfos.get("name");
    const category = formInfos.get("category");
    const description = formInfos.get("description");
    const url = formInfos.get("url");
    const imageURL = formInfos.get("imageURL");
    const videoURL = formInfos.get("videoURL");

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

    postGame(infos);
  };

  return (
    <>
      <div className="divFlexCenter">
        <h2 className="title2">
          CADASTRO DE <span className="titleGradient">GAME</span>
        </h2>
        <form ref={formData} onSubmit={handleForm}>
          <Input
            label="Título do game:"
            type="text"
            name="name"
            classCSS={style.inputNewGame}
          />
          <label htmlFor="category">Categoria:</label>
          <select
            name="category"
            className={`inputBorderGradient ${style.inputNewGame}`}
            required
          >
            <option value="">Escolha uma opção</option>
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
            classCSS={`${style.inputNewGame} ${style.inputDescription}`}
            placeholder="A descrição do jogo deve conter entre 3 e 255 caracteres."
          />
          <Input
            label="Endereço URL do site do jogo:"
            type="text"
            name="url"
            classCSS={style.inputNewGame}
          />
          <Input
            label="Endereço URL da imagem oficial do jogo:"
            type="text"
            name="imageURL"
            classCSS={style.inputNewGame}
          />
          <Input
            label="Endereço URL de um video do jogo (opcional):"
            type="text"
            name="videoURL"
            classCSS={style.inputNewGame}
          />
          <ErrorFetch error={error} />
          <Button
            text="Cadastrar"
            type="submit"
            classCSS={`btnGradient ${style.insertNewGame}`}
          />
        </form>
      </div>
    </>
  );
};

export default AddGame;
