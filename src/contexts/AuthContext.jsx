import { createContext, useContext, useEffect, useState } from "react";
import fetchApi from "../hooks/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertError, setAlert] = useState([]);

  const getUserApi = async (id) => {
    const { data } = await fetchApi(`/users/${id}`);
    console.log(data);
    let userInfo = {...data, dataNasc: new Date(data.birthDate).toLocaleDateString("pt-BR", {timeZone: "UTC"})};
    console.log(userInfo);
    setUser(userInfo);
    setLoading(false);
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    getUserApi(decoded.id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

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
    } catch (err) {
      console.log(err.response.data);
      setAlert(["Usuário e/ou senha inválido(s)."]);
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
      setAlert(err.response.data);
    }
  };

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
      getUserApi(user._id)
    } catch (err) {
      console.log(err.response.data);
      setAlert(err.response.data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      getUserApi(decoded.id);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        alertError,
        handleLogin,
        handleLogout,
        postLogin,
        postRegister,
        putProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
