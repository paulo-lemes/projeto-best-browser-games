import style from "./style.module.css";
import Logo from "../../assets/Header/Logo.svg";
import UserLogin from "../../assets/Header/User-login.svg";
import Button from "../Button";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const {user, handleLogout} = useAuth()

  const activeClass = (navData) => (navData.isActive ? style.activeStyle : "none");

  return (
      <div className={style.navbar}>
        <img src={Logo} className={style.logo} alt="Logo Best Browser Games" />
        <ul>
          <NavLink to="/" className={activeClass}>
            <li>Home</li>
          </NavLink>
          <NavLink to="/games" className={activeClass}>
            <li>Games</li>
          </NavLink>
          <NavLink to="/categories" className={activeClass}>
            <li>Categorias</li>
          </NavLink>
          {user ? (
            <NavLink to="/profile" className={activeClass}>
              <li>Perfil</li>
            </NavLink>
          ) : (
            <NavLink to="/login" className={activeClass}>
              <li> Entrar</li>
            </NavLink>
          )}
        </ul>
        <div className={style.dropdown}>
          <img src={UserLogin} className={style.userLogin} alt="Ícone Usuário" />
          <div className={style.dropdownContent}>
            {user && user.roles === "admin" && (
              <div>
                <Link to="/admin">
                  <Button text="Acesso Admin" />
                </Link>
              </div>
            )}
            {user && (
                <Button text="Sair" handleEvent={handleLogout} />
            )}
          </div>
        </div>
      </div>
  );
}

export default Header