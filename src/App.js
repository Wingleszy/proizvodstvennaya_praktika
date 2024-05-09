import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { useState } from "react";
import { Directions } from "./pages/Directions";
import { Passengers } from "./pages/Passengers";
import { Cities } from "./pages/Cities";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <Routes>
      {/* создаю приватные роуты и переадрессация на другой роут в случае авторизации */}
      <Route element={!token ? <Login setToken={setToken} /> : <Navigate to={'/drivers'} replace />} path="/login"/>
      <Route element={token ? <Home /> : <Navigate to={'/login'} replace/>} path="/drivers"/>
      <Route element={token ? <Directions /> : <Navigate to={'/login'} replace/>} path="/directions"/>
      <Route element={token ? <Passengers /> : <Navigate to={'/login'} replace/>} path="/passengers"/>
      <Route element={token ? <Cities /> : <Navigate to={'/login'} replace/>} path="/cities"/>
      <Route element={<Navigate to={'/login'} replace/>} path="/"/>
    </Routes>
  );
}

export default App;
