import { createContext, useContext, useEffect, useState } from "react";
import fetchApi from "../hooks/api";
import { jwtDecode } from "jwt-decode";
import Dialog from "../components/Dialog";
import useDialog from "../hooks/useDialog";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const { dialogIsOpen, textDialog, closeDialog, showDialog } = useDialog();

  const getUserApi = async (id) => {
    try {
      const { data } = await fetchApi(`/users/${id}`);
      console.log(data);
      let userInfo = {
        ...data,
        dataNasc: new Date(data.birthDate).toLocaleDateString("pt-BR", {
          timeZone: "UTC",
        }),
      };
      console.log(userInfo);
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (err) {
      console.log(err.response.message);
      showDialog("Houve um erro ao realizar o login. Tente novamente.")
    }
    setLoadingUser(false);
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    getUserApi(decoded.id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    showDialog("Logout realizado com sucesso");
  };

  useEffect(() => {
    const savedLogin = localStorage.getItem("user");

    if (savedLogin) {
      setUser(JSON.parse(savedLogin));
    }
    setLoadingUser(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        handleLogin,
        handleLogout,
        getUserApi,
        showDialog
      }}
    >
      {children}
      {dialogIsOpen && (
        <Dialog closeDialog={closeDialog} textDialog={textDialog} />
      )}
    </AuthContext.Provider>
  );
};
