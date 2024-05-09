import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { useState } from "react";
import { Directions } from "./pages/Directions";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <Routes>
      <Route element={!token ? <Login setToken={setToken} /> : <Navigate to={'/'} replace />} path="/login"/>
      <Route element={token ? <Home /> : <Navigate to={'/login'} replace/>} path="/"/>
      <Route element={token ? <Directions /> : <Navigate to={'/login'} replace/>} path="/directions"/>
    </Routes>
  );
}

export default App;
