import { createContext, useContext, useEffect, useState, useMemo } from "react";
import fetchApi from "../hooks/api";

const GamesContext = createContext();

export const useGames = () => useContext(GamesContext);

export const GamesProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingRecommendedGames, setLoadingRecommendedGames] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [gamesUnfiltered, setGamesUnfiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recommendedGames, setRecommendedGames] = useState([]);

  useEffect(() => {
    fetchGames();
    fetchGamesCategories();
  }, []);

  const handleSearchGames = async () => {
    await fetchGames();
  };

  const handleInputText = (event) => {
    setSearchText(event.target.value);
  };

  const handleInputSelect = (event) => {
    console.log(event.target.value);
    setSearchCategory(event.target.value);
  };

  const handleSearchCategory = (categoryId) => {
    setSearchText("");
    setSearchCategory(categoryId);
  };

  const games = useMemo(() => {
    const searchTextLowerCase = searchText.toLowerCase();
    const gamesFilter = gamesUnfiltered.filter(
      (game) =>
        game.name.toLowerCase().includes(searchTextLowerCase) &&
        game.category._id.includes(searchCategory)
    );
    return gamesFilter;
  }, [gamesUnfiltered, searchText, searchCategory]);

  const fetchGames = async () => {
    try {
      const { data } = await fetchApi.get(`games`);
      console.log(data);
      setGamesUnfiltered(data);
      setLoading(false);
    } catch (err) {
      console.log(err.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const fetchGamesCategories = async () => {
    try {
      const { data } = await fetchApi.get(`categories`);
      console.log(data);
      setCategories(data);
    } catch (err) {
      console.log(err.data.message);
    }
    setLoadingCategories(false);
  };

  const getRecommendedGames = async (userId) => {
    try {
      const { data } = await fetchApi(`/users/${userId}/recommendations`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      setRecommendedGames(data);
    } catch (err) {
      console.log(err.response.data);
    }
    setLoadingRecommendedGames(false);
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        categories,
        recommendedGames,
        loading,
        loadingCategories,
        loadingRecommendedGames,
        handleInputText,
        handleInputSelect,
        handleSearchGames,
        handleSearchCategory,
        getRecommendedGames,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
