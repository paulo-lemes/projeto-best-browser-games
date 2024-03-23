import { useRef, useState } from "react";
import style from "./style.module.css";
import Input from "../../components/Input";
import BorderTopGradient from "../../components/BorderTopGradient";
import { useAuth } from "../../contexts/AuthContext";
// import AlertError from "../../components/AlertError";

const Register = () => {
  const formData = useRef(null);
  const { postRegister, alertError } = useAuth();

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
          <button type="submit" className={`btnGradient ${style.registerSend}`}>
            Cadastrar
          </button>
        </form>
        {/* <AlertError alertError={alertError} classCSS="errorRegister" /> */}
      </div>
    </>
  );
};

export default Register;
