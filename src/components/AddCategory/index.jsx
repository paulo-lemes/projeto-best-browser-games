import { useRef, useState } from "react";
import style from "./style.module.css";
import DivGradient from "../DivGradient";
import Button from "../Button";
import Input from "../Input";
import ErrorFetch from "../ErrorFetch";
import fetchApi from "../../hooks/api";
import { useGames } from "../../contexts/GamesContext";

const AddCategory = () => {
  const formData = useRef(null);
  const [error, setError] = useState([]);
  const { showDialog, fetchGamesCategories } = useGames()

  const postCategory = async (info) => {
    try {
      const { data } = await fetchApi("/categories", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(info),
      });
      console.log(data);
      showDialog("Categoria cadastrada com sucesso!")
      fetchGamesCategories()
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  const handleForm = (event) => {
    event.preventDefault();

    const formInfos = new FormData(formData.current);
    const category = formInfos.get("category");

    const info = {
      name: category,
    };

    postCategory(info);
  };

  return (
    <>
      <div className={style.addCategory}>
        <form ref={formData} onSubmit={handleForm}>
          <Input
            label="Digite aqui uma nova categoria:"
            type="text"
            name="category"
            classCSS={style.inputNewCategory}
          />

          <Button
            text="Inserir"
            type="submit"
            classCSS={`btnGradient ${style.insert}`}
          />
        </form>
        <ErrorFetch error={error} />
        <DivGradient classCSS={style.divGradientAddCategory} />
      </div>
    </>
  );
};

export default AddCategory;
