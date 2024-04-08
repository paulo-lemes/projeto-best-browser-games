import style from "./style.module.css";
import Logo from "../../assets/Header/Logo.svg";
import UserLogin from "../../assets/Header/User-login.svg";
import Button from "../Button";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowLineUp } from "@phosphor-icons/react";

const Header = () => {
  const { user, handleLogout } = useAuth();

  const activeClass = (navData) =>
    navData.isActive ? style.activeStyle : "none";

  return (
    <>
      <header className={style.navbar}>
        <NavLink to="/">
          <img
            src={Logo}
            className={style.logo}
            alt="Logo Best Browser Games"
          />
        </NavLink>
        <ul>
          <NavLink to="/" className={activeClass}>
            <li className={style.home}>Home</li>
          </NavLink>
          <NavLink to="/games" className={activeClass}>
            <li>Games</li>
          </NavLink>
          <NavLink to="/categories" className={activeClass}>
            <li>Categorias</li>
          </NavLink>
          {user ? (
            <NavLink to="/profile" className={activeClass}>
              <li className={style.profile}>Perfil</li>
            </NavLink>
          ) : (
            <NavLink to="/login" className={activeClass}>
              <li className={style.login}> Entrar</li>
            </NavLink>
          )}
        </ul>
        <div className={style.dropdown}>
          <Link to={user ? "/profile" : "/login"}>
            <img
              src={UserLogin}
              className={style.userLogin}
              alt="Ícone Usuário"
            />
          </Link>
          <div className={style.dropdownContent}>
            {user && user.roles === "admin" && (
              <div>
                <Link to="/admin">
                  <Button text="Acesso Admin" />
                </Link>
              </div>
            )}
            {user && <Button text="Sair" handleEvent={handleLogout} classCSS={style.logout}/>}
          </div>
        </div>
      </header>
      <ArrowLineUp
        size={32}
        color="#fcfcfc"
        weight="fill"
        className={style.top}
        onClick={() => window.scroll(0, 0)}
      />
    </>
  );
};

export default Header;
