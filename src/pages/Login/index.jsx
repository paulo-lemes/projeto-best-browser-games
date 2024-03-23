import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import style from "./style.module.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import BorderTopGradient from "../../components/BorderTopGradient";

const Login = () => {
  const formData = useRef(null);
  const { postLogin, alertError } = useAuth();

  const handleForm = (event) => {
    event.preventDefault();

    const formInfos = new FormData(formData.current);
    const email = formInfos.get("email");
    const password = formInfos.get("password");

    const infos = {
      email: email,
      password: password,
    };

    postLogin(infos);
  };

  return (
    <>
      <BorderTopGradient />
      <div className="divFlexCenter">
        <h2 className={`title3 ${style.titleLogin}`}>Login</h2>
        <form ref={formData} onSubmit={handleForm} className={style.login}>
          <Input type="email" name="email" label="E-mail" />
          <Input type="password" name="password" label="Senha:" />
          <button type="submit" className={`btnGradient ${style.login}`}>
            Entrar
          </button>
        </form>

        <span className="errorDescription">{alertError}</span>

        <p className={`description ${style.descLogin}`}>
          Ainda não possui uma conta? Clique aqui!
        </p>
        <Link to="/register" onClick={() => window.scroll(0, 0)}>
          <Button
            text="Cadastre-se"
            classCSS={`btnBorderGradient ${style.register}`}
          />
        </Link>
      </div>
    </>
  );
}

export default Login