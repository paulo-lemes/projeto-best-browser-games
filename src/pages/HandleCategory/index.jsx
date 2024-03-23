import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import RestrictedRouteAdmin from "../../contexts/RestrictedRouteAdmin";

const HandleCategory = () => {
  const navigate = useNavigate();

  const { loading } = useAuth();
  const { categoryId, categoryName } = useParams();
  const [alertError, setAlert] = useState("");

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
        setAlert(response.message);
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
      {loading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <RestrictedRouteAdmin>
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
            <p className="errorDescription">{alertError}</p>
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
        </RestrictedRouteAdmin>
      )}
    </>
  );
};

export default HandleCategory;
