import { useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorFetch from "../../components/ErrorFetch";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import BorderTopGradient from "../../components/BorderTopGradient";
import Loading from "../../components/Loading";
import fetchApi from "../../hooks/api";
import RestrictedRoute from "../../contexts/RestrictedRoute";

const ProfileEdit = () => {
  const formData = useRef(null);
  const [error, setError] = useState([]);
  const { user, loadingUser, getUserApi } = useAuth();

  const putProfile = async (infos) => {
    try {
      const { data } = await fetchApi(`/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(infos),
      });
      console.log(data);
      getUserApi(user._id);
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  const handleForm = (event) => {
    event.preventDefault();

    const formInfos = new FormData(formData.current);
    const name = formInfos.get("name") || user.name;
    const email = formInfos.get("email") || user.email;
    const password = formInfos.get("password");
    const confirmPassword = formInfos.get("confirmPassword");
    const birthDate = formInfos.get("birthDate") || user.birthDate;
    const country = formInfos.get("country") || user.country;
    const state = formInfos.get("state") || user.state;

    const infos = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      birthDate: birthDate,
      country: country,
      state: state,
    };

    console.log(infos);
    putProfile(infos);
  };

  const handleFocus = (event) => {
    event.target.type = "date";
  };

  const handleBlur = (event) => {
    if (!event.target.value) {
      event.target.type = "text";
    }
  };

  return (
    <>
      <BorderTopGradient />
      {loadingUser ? (
        <Loading />
      ) : (
        <>
          <RestrictedRoute page="profile">
            {user && (
              <div className={`divFlexCenter ${style.divEditUser}`}>
                <h2 className="">Altere as informações de cadastro</h2>
                <form ref={formData} onSubmit={handleForm}>
                  <Input
                    label="Nome:"
                    type="text"
                    name="name"
                    placeholder={user.name}
                  />
                  <Input
                    label="E-mail:"
                    type="email"
                    name="email"
                    placeholder={user.email}
                  />
                  <Input label="Senha:" type="password" name="password" />
                  <Input
                    label="Confirme a senha:"
                    type="password"
                    name="confirmPassword"
                  />
                  <label htmlFor="birthDate" className="label">
                    Data de nascimento:
                  </label>
                  <input
                    type="text"
                    name="birthDate"
                    placeholder={user.dataNasc}
                    className="inputBorderGradient"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  ></input>
                  <Input
                    label="País:"
                    type="text"
                    name="country"
                    placeholder={user.country}
                  />
                  <Input
                    label="Estado:"
                    type="text"
                    name="state"
                    placeholder={user.state}
                  />
                  <ErrorFetch error={error} />
                  <div className={style.divBtnsEditUser}>
                    <button
                      type="submit"
                      className={`btnGradient ${style.btnEditUser}`}
                    >
                      Alterar
                    </button>
                    <Link to="/profile" onClick={() => window.scroll(0, 0)}>
                      <Button text="Voltar" classCSS="btnBorderGradient" />
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </RestrictedRoute>
        </>
      )}
    </>
  );
};

export default ProfileEdit;
