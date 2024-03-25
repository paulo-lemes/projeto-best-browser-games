import { useState } from "react";
import style from "./style.module.css";
import DivGradient from "../DivGradient";
import Button from "../Button";
import Input from "../Input";
import ErrorFetch from "../ErrorFetch";

const AddCategory = () => {
  const [error, setError] = useState([]);
  const [nameCategory, setNameCategory] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNameCategory({ ...nameCategory, [name]: value });
  };

  const handleSave = () => {
    fetch(`https://api-best-browser-games.vercel.app/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(nameCategory),
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 201) {
        window.location.reload();
      } else {
        setError(resposta);
      }
    });
  };

  return (
    <>
      <div className={style.addCategory}>
        <form>
          <Input
            label="Digite aqui uma nova categoria:"
            type="text"
            name="name"
            value={nameCategory.name}
            handleEvent={handleInputChange}
            classCSS={style.inputNewCategory}
          />

          <Button
            text="Inserir"
            handleEvent={handleSave}
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
