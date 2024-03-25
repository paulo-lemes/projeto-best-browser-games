import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import RestrictedRoute from "../../contexts/RestrictedRoute";
import Loading from "../../components/Loading";
import ErrorFetch from "../../components/ErrorFetch";
import fetchApi from "../../hooks/api";
import { useGames } from "../../contexts/GamesContext";

const HandleCategory = () => {
  const { loadingUser } = useAuth();
  const { categoryId, categoryName } = useParams();
  const { showDialog, fetchGamesCategories } = useGames();
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const [nameCategory, setNameCategory] = useState({
    name: categoryName,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNameCategory({ ...nameCategory, [name]: value });
  };

  const handleAction = async (method, action) => {
    try {
      const { data } = await fetchApi(`/categories/${categoryId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(nameCategory),
      });
      console.log(data);
      showDialog(`Categoria ${action} com sucesso!`);
      fetchGamesCategories();
      window.scroll(0, 0);
      navigate("/admin");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
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
              <ErrorFetch error={error} />
              <div className={style.divBtnsHandleCategory}>
                <Button
                  text="Alterar"
                  classCSS={`btnGradient ${style.btnHandleCategory}`}
                  handleEvent={() => handleAction("put", "alterada")}
                />
                <Button
                  text="Excluir"
                  classCSS="btnBorderGradient"
                  handleEvent={() => handleAction("delete", "excluída")}
                />
              </div>
            </form>
          </div>
        </RestrictedRoute>
      )}
    </>
  );
};

export default HandleCategory;
