import style from "./style.module.css";
import Button from "../../components/Button";
import BorderTopGradient from "../../components/BorderTopGradient";
import RecommendedGames from "../../components/RecommendedGames";
import RestrictedRouteProfile from "../../contexts/RestrictedRouteProfile";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <BorderTopGradient />
      {loading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <RestrictedRouteProfile>
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
              <Link to="/profileEdit" onClick={() => window.scroll(0, 0)}>
                <Button
                  text="Alterar cadastro"
                  classCSS={`btnGradient ${style.btnCallEditPage}`}
                />
              </Link>
              <RecommendedGames />
            </div>
          )}
        </RestrictedRouteProfile>
      )}
    </>
  );
};

export default Profile;
