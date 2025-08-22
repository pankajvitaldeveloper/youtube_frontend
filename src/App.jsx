import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/Library";
import Home from "./pages/Home";
import Subscriptions from "./pages/Subscriptions";
import FrontendLayout from "./components/layout/FrontendLayout";
import WatchPage from "./pages/WatchPage";
import Login from "./admin/Login";
import Register from "./admin/Register";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./redux/slices/authSlice";



const App = () => {
  const dispatch = useDispatch();
const token = useSelector((state) => state.auth.token);

useEffect(() => {
  if (token) {
    dispatch(getMe());
  }
}, [token, dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontendLayout />}>
          <Route index element={<Home />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Route>

        <Route path="/login" element={  <Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>



    </BrowserRouter>
  );
};

export default App;
