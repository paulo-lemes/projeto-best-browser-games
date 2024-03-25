import AddGame from "../../components/AddGame";
import DeleteGame from "../../components/DeleteGame";
import CategoriesAdmin from "../../components/CategoriesAdmin";
import RestrictedRoute from "../../contexts/RestrictedRoute";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";

const Admin = () => {
  const { loadingUser } = useAuth();

  return (
    <>
      {loadingUser ? (
        <Loading/>
      ) : (
        <RestrictedRoute page="admin">
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
        </RestrictedRoute>
      )}
    </>
  );
};

export default Admin;
