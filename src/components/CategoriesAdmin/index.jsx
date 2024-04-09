import { Link } from "react-router-dom";
import style from "./style.module.css";
import AddCategory from "../AddCategory";
import Button from "../Button";
import { useGames } from "../../contexts/GamesContext";
import Loading from "../Loading";

const CategoriesAdmin = () => {
  const { categories, loadingCategories } = useGames();

  return (
    <>
      {loadingCategories ? (
        <Loading/>
      ) : (
        <div className="divFlexCenter">
          <h2 className="title2 titleGradient">CATEGORIAS</h2>
          <div className={style.categoryButtons}>
            <p className="description">
              Para editar ou excluir as categorias de jogos basta clicar na
              categoria, e para novas categorias basta preencher o campo e
              clicar no botão de inserir!
            </p>
            {categories.map((category) => (
              <Link
                to={`/handleCategory/${category._id}/${category.name}`}
                key={category._id}
              >
                <Button
                  text={category.name}
                  classCSS={`btnBorderGradient ${style.category}`}
                />
              </Link>
            ))}
            <div className={style.divAddCategory}>
              <AddCategory />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesAdmin;
