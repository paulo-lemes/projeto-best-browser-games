import style from "./style.module.css"
import Input from "../Input";
import Button from "../Button";
import { useGames } from "../../contexts/GamesContext";

const SearchGames = () => {
  const {categories, handleInputText, handleSearchGames, handleInputSelect} = useGames()

  return (
    <>
      <div className="divFlexCenter">
        <h3 className={`title2 ${style.titleSearchGames}`}>
          ENCONTRE AQUI SEUS{" "}
          <span className={style.titleGradientSearch}>GAMES FAVORITOS</span>
        </h3>
        <div className={style.divSearchGame}>
          <Input
            placeholder="Nome do jogo"
            type="text"
            name="name"
            handleEvent={handleInputText}
            classCSS={style.inputSearchName}
          />
          <select
            name="categoryId"
            onChange={handleInputSelect}
            className={`inputBorderGradient ${style.inputSearchCategory}`}
            required
          >
            <option value="">Categoria</option>
            {categories.map((category) => (
              <option value={category["_id"]} key={category["_id"]}>
                {category.name}
              </option>
            ))}
          </select>
          <Button
            text="Pesquisar"
            classCSS="btnGradient"
            handleEvent={handleSearchGames}
          />
        </div>
      </div>
    </>
  );
}

export default SearchGames