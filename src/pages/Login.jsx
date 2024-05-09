import React, { useEffect } from "react";
import busImg from "../img/photo_2023-05-12_15-07-08_large (1).jpg";
import Button from "@mui/material/Button";

export const Login = (props) => {
  const {setToken} = props
  const authLink = process.env.REACT_APP_AUTH_LINK

  const openModal = (link) => {
    let newWindow = window.open(link, '_blank', 'width=600,height=400,left=100,top=100')
    if (newWindow) {
      newWindow.addEventListener('load', function() {
        let queryParams = new URLSearchParams(newWindow.location.search);
        let token = queryParams.get('token'); 
        localStorage.setItem('token', token)
        setToken(token)
        newWindow.close()
      })
    } else {
      alert('Не удалось открыть модальное окно')
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token) {
      localStorage.setItem('token', token)
      setToken(token)
    }
  }, []);

  return (
    <div className="login_container">
      <img src={busImg} alt="" className="bus-logo" />
      <div className="login_content">
        <h3>
          Добро пожаловать в систему управления продажами <span className="bold">БРОНЕВ</span>
        </h3>
        <h4>Для продолжения работы необходимо пройти авторизацию</h4>
        <hr />
        <Button
          variant="outlined"
          onClick={() => openModal(authLink)}
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
