import style from "./style.module.css";
import Button from "../../components/Button";
import BorderTopGradient from "../../components/BorderTopGradient";
import RecommendedGames from "../../components/RecommendedGames";
import RestrictedRoute from "../../contexts/RestrictedRoute";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Profile = () => {
  const { user, loadingUser, handleLogout } = useAuth();

  return (
    <>
      <BorderTopGradient />
      {loadingUser ? (
        <Loading />
      ) : (
        <RestrictedRoute page="profile">
          {user && (
            <div className="divFlexCenter">
              <h2 className={`title2 ${style.titleUserInfo}`}>
                Informações da conta
              </h2>
              <div className={style.divUserInfo}>
                <p className={`description ${style.pUserInfo}`}>
                  Nome: {user.name}
                </p>
                <p className={`description ${style.pUserInfo}`}>
                  E-mail: {user.email}
                </p>
                <p className={`description ${style.pUserInfo}`}>
                  Data de nascimento: {user.dataNasc}
                </p>
                <p className={`description ${style.pUserInfo}`}>
                  País: {user.country}
                </p>
                <p className="description">Estado: {user.state}</p>
              </div>
              <div className={style.divBtnsProfile}>
              <Link to="/profileEdit" onClick={() => window.scroll(0, 0)}>
                <Button
                  text="Alterar cadastro"
                  classCSS={`btnGradient ${style.btnCallEditPage}`}
                />
              </Link>
              <Button text="Sair do perfil" classCSS="btnBorderGradient" handleEvent={handleLogout}/>
              </div>
              <RecommendedGames />
            </div>
          )}
        </RestrictedRoute>
      )}
    </>
  );
};

export default Profile;
