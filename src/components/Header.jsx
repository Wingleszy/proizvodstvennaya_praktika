import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import avatar from '../img/avatar.png'
import { Link } from 'react-router-dom';

export const Header = ({setExpanded}) => {
    return (
    <header className='header'>
        <div className="header_links">
            <MenuIcon
            onClick={() => setExpanded((prev) => !prev)}
            fontSize='large'

            sx={{
                cursor: 'pointer',
                fill: "white",
            }}
            />
            <Link className='header_link'>Продажи</Link>
            <Link className='header_link'>Маршруты</Link>
        </div>
        <img src={avatar} alt="" className='header_avatar'/>
    </header>
  )
}
