import { useEffect, useState } from "react";
import style from "./style.module.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useGames } from "../../contexts/GamesContext";
import Loading from "../../components/Loading";

const Categories = () => {
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
              Explore a variedade de jogos por categoria! Encontre aventuras
              emocionantes, desafios de estratégia, experiências relaxantes e
              muito mais. De ação a quebra-cabeças, tem game para todos os
              gostos. Encontre seu próximo favorito aqui!
            </p>
            {categories.map((category) => (
              <Link to={`/categories/${category._id}/${category.name}`} key={category._id}>
                <Button
                  text={category.name}
                  classCSS={`btnBorderGradient ${style.category}`}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;