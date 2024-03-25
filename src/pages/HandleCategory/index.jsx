import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import RestrictedRoute from "../../contexts/RestrictedRoute";
import Loading from "../../components/Loading";
import ErrorFetch from "../../components/ErrorFetch";

const HandleCategory = () => {
  const navigate = useNavigate();

  const { loadingUser } = useAuth();
  const { categoryId, categoryName } = useParams();
  const [error, setError] = useState([]);

  const [nameCategory, setNameCategory] = useState({
    name: categoryName,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNameCategory({ ...nameCategory, [name]: value });
  };

  const handleEdit = () => {
    fetch(
      `https://api-best-browser-games.vercel.app/categories/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(nameCategory),
      }
    ).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 200) {
        navigate("/accessAdmin");
      } else {
        setError(response.message);
      }
    });
  };

  const handleDelete = () => {
    fetch(
      `https://api-best-browser-games.vercel.app/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 200) {
        navigate("/accessAdmin");
      } else {
        setAlert(response.message);
      }
    });
  };

  return (
    <>
      {loadingUser ? (
        <Loading />
      ) : (
        <RestrictedRoute page="admin">
          <div className={`divFlexCenter ${style.divHandleCategory}`}>
            <h1 className="title3">Modifique o nome ou exclua a categoria</h1>
            <form className="">
              <Input
                label="Nome:"
                type="text"
                name="name"
                value={nameCategory.name}
                handleEvent={handleInputChange}
              />
            </form>
            <ErrorFetch error={error} />
            <div className={style.divBtnsHandleCategory}>
              <Button
                text="Alterar"
                classCSS={`btnGradient ${style.btnHandleCategory}`}
                handleEvent={handleEdit}
              />
              <Button
                text="Excluir"
                classCSS="btnBorderGradient"
                handleEvent={handleDelete}
              />
            </div>
          </div>
        </RestrictedRoute>
      )}
    </>
  );
};

export default HandleCategory;
