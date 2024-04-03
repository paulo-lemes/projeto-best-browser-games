import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DefaultLayout from "./pages/layouts/Default";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import GamesCategory from "./pages/GamesCategory";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import Admin from "./pages/Admin";
import HandleCategory from "./pages/HandleCategory";
import EditGame from "./pages/EditGame";
import Test from "./pages/Test";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileEdit" element={<ProfileEdit />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/gameDetails/:gameId" element={<GameDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/categories/:categoryId/:categoryName"
            element={<GamesCategory />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/handleCategory/:categoryId/:categoryName"
            element={<HandleCategory />}
          />
          <Route path="/editGame/:gameId" element={<EditGame />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
