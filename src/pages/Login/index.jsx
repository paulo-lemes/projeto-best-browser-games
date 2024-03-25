import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import style from "./style.module.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorFetch from "../../components/ErrorFetch";
import BorderTopGradient from "../../components/BorderTopGradient";
import RestrictedRoute from "../../contexts/RestrictedRoute";
import Loading from "../../components/Loading";
import fetchApi from "../../hooks/api";

const Login = () => {
  const formData = useRef(null);
  const [error, setError] = useState([]);
  const { user, loadingUser, handleLogin } = useAuth();

  const postLogin = async (infos) => {
    try {
      const { data } = await fetchApi("/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(infos),
      });
      console.log(data);
      handleLogin(data.token);
      // showDialog("Login realizado com sucesso!");
    } catch (err) {
      console.log(err.response.data);
      setError([{message: "Usuário e/ou senha inválido(s)."}]);
    }
  };

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
      {loadingUser ? (
        <Loading />
      ) : (
        <RestrictedRoute page="login">
          {!user && (
            <div className="divFlexCenter">
              <h2 className={`title3 ${style.titleLogin}`}>Login</h2>
              <form
                ref={formData}
                onSubmit={handleForm}
                className={style.login}
              >
                <Input type="email" name="email" label="E-mail" />
                <Input type="password" name="password" label="Senha:" />
                <button type="submit" className={`btnGradient ${style.login}`}>
                  Entrar
                </button>
              </form>

              <ErrorFetch error={error} />

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
          )}
        </RestrictedRoute>
      )}
    </>
  );
};

export default Login;
