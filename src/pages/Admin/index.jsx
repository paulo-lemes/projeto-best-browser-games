import AddGame from "../../components/AddGame";
import DeleteGame from "../../components/DeleteGame";
import CategoriesAdmin from "../../components/CategoriesAdmin";
import RestrictedRouteAdmin from "../../contexts/RestrictedRouteAdmin";
import { useAuth } from "../../contexts/AuthContext";

const Admin = () => {
  const { loading } = useAuth();

  return (
    <>
      {loading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <RestrictedRouteAdmin>
          <div className="divFlexCenter divAccessAdmin">
            <h2 className="title2">
              GERENCIAMENTO DE{" "}
              <span className="titleGradient">BROWSER GAMES</span>
            </h2>
            <p className="description descAccessAdmin">
              É fácil gerenciar games ou categorias na BestBrowserGames,
              primeiro escolha o campo e complete as informações!
            </p>
          </div>
          <CategoriesAdmin />
          <AddGame />
          <DeleteGame />
        </RestrictedRouteAdmin>
      )}
    </>
  );
};

export default Admin;
