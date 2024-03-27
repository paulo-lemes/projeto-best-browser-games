import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorFetch from "../../components/ErrorFetch";
import style from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BorderTopGradient from "../../components/BorderTopGradient";
import Loading from "../../components/Loading";
import fetchApi from "../../hooks/api";
import RestrictedRoute from "../../contexts/RestrictedRoute";

const ProfileEdit = () => {
  const { user, loadingUser, getUserApi, showDialog } = useAuth();
  const [error, setError] = useState([]);
  const [infosProfile, setInfosProfile] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    country: "",
    state: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfosProfile({ ...infosProfile, [name]: value });
  };

  const putProfile = async () => {
    try {
      const { data } = await fetchApi(`/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(infosProfile),
      });
      console.log(data);
      getUserApi(user._id);
      showDialog("Cadastro alterado com sucesso!");
      window.scroll(0, 0);
      navigate("/profile");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  const handleFocus = (event) => {
    event.target.type = "date";
  };

  const handleBlur = (event) => {
    if (!event.target.value) {
      event.target.type = "text";
    }
  };

  useEffect(() => {
    if (user)
      setInfosProfile({
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
        birthDate: user.dataNasc,
        country: user.country,
        state: user.state,
      });
  }, [user, loadingUser]);

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
                <form>
                  <Input
                    label="Nome:"
                    type="text"
                    name="name"
                    value={infosProfile.name}
                    handleEvent={handleInputChange}
                  />
                  <Input
                    label="E-mail:"
                    type="email"
                    name="email"
                    value={infosProfile.email}
                    handleEvent={handleInputChange}
                  />
                  <Input
                    label="Senha:"
                    type="password"
                    name="password"
                    handleEvent={handleInputChange}
                  />
                  <Input
                    label="Confirme a senha:"
                    type="password"
                    name="confirmPassword"
                    handleEvent={handleInputChange}
                  />
                  <label htmlFor="birthDate" className="label">
                    Data de nascimento:
                  </label>
                  <input
                    type="text"
                    name="birthDate"
                    value={infosProfile.birthDate}
                    className="inputBorderGradient"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  ></input>
                  <Input
                    label="País:"
                    type="text"
                    name="country"
                    value={infosProfile.country}
                    handleEvent={handleInputChange}
                  />
                  <Input
                    label="Estado:"
                    type="text"
                    name="state"
                    value={infosProfile.state}
                    handleEvent={handleInputChange}
                  />
                  <ErrorFetch error={error} />
                  <div className={style.divBtnsEditUser}>
                    <Button
                      text="Alterar"
                      classCSS={`btnGradient ${style.btnEditUser}`}
                      handleEvent={putProfile}
                    />
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
