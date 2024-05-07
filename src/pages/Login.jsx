import React from "react";
import busImg from "../img/photo_2023-05-12_15-07-08_large (1).jpg";
import Button from "@mui/material/Button";

export const Login = () => {
  return (
    <div className="container">
      <img src={busImg} alt="" className="bus-logo" />
      <div className="content">
        <h3>
          Добро пожаловать в систему управления продажами <span className="bold">БРОНЕВ</span>
        </h3>
        <h4>Для продолжения работы необходимо пройти авторизацию</h4>
        <hr />
        <Button
          variant="outlined"
          sx={{
            color: "rgb(51, 207, 255)",
            border: "1px solid rgb(51, 207, 255)",
            width: "50%",
          }}
        >
          Войти
        </Button>
        <hr />
      </div>
    </div>
  );
};
