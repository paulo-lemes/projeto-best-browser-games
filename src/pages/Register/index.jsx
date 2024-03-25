import { useRef, useState } from "react";
import style from "./style.module.css";
import Input from "../../components/Input";
import ErrorFetch from "../../components/ErrorFetch";
import BorderTopGradient from "../../components/BorderTopGradient";
import { useAuth } from "../../contexts/AuthContext";
import fetchApi from "../../hooks/api";

const Register = () => {
  const formData = useRef(null);
  const [error, setError] = useState([]);
  const { handleLogin } = useAuth();

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
      // showDialog("Login realizado com sucesso!")
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  const postRegister = async (infos) => {
    try {
      const { data } = await fetchApi("/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(infos),
      });
      console.log(data);
      const userLogin = {
        email: infos.email,
        password: infos.password,
      };
      postLogin(userLogin);
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  const handleForm = (event) => {
    event.preventDefault();

    const formInfos = new FormData(formData.current);
    const name = formInfos.get("name");
    const email = formInfos.get("email");
    const password = formInfos.get("password");
    const confirmPassword = formInfos.get("confirmPassword");
    const birthDate = formInfos.get("birthDate");
    const country = formInfos.get("country");
    const state = formInfos.get("state");

    const infos = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      birthDate: birthDate,
      country: country,
      state: state,
    };

    postRegister(infos);
  };

  return (
    <>
      <BorderTopGradient />
      <div className="divFlexCenter">
        <h2 className={`title3 ${style.titleRegister}`}>Cadastro</h2>
        <form ref={formData} onSubmit={handleForm}>
          <Input label="Nome:" type="text" name="name" />
          <Input label="E-mail:" type="email" name="email" />
          <Input label="Senha:" type="password" name="password" />
          <Input
            label="Confirme a senha:"
            type="password"
            name="confirmPassword"
          />
          <Input label="Data de nascimento:" type="date" name="birthDate" />
          <Input label="País:" type="text" name="country" />
          <Input label="Estado:" type="text" name="state" />
          <ErrorFetch error={error} />
          <button type="submit" className={`btnGradient ${style.registerSend}`}>
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
