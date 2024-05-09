import React, { useState } from "react";
import wave from "../img/wave-logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MopedIcon from '@mui/icons-material/Moped';
import DirectionsIcon from '@mui/icons-material/Directions';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { Link } from "react-router-dom";

export const Sidebar = ({ isExpanded, active }) => {
    const [isOpen, setOpen] = useState(false)

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <div className="sidebar_logo">
        <img src={wave} alt="" className="sidebar_logo__img" />

        {isExpanded ? <span className="logo__name">БРОНЕВ</span> : ""}
      </div>
      <div className={`sidebar_avatar ${isExpanded ? "expanded_avatar" : ""}`}>
        <img
          src={wave}
          alt=""
          className={`sidebar_avatar__img ${
            isExpanded ? "expanded_avatar__img" : ""
          }`}
        />

        {isExpanded ? (
          <div className="sidebar_user">
            <h4>Админ..</h4>
            <ArrowDropDownIcon fontSize="small" />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="sidebar_links">
        {isExpanded ? (<>
            <div className="sidebar_link" onClick={() => setOpen(prev => !prev)}>
                <div className="link_name">
                    <AutoStoriesIcon fontSize="medium"/>
                    <h3>Справочники</h3>
                </div>
                <KeyboardArrowDownIcon fontSize="medium" sx={{
                    color:'gray',
                }}/>
            </div>
            {isOpen ? <div className="link_items">
                <div className={`link_item ${active === 'drivers' ? 'active' : null}`}>
                    <MopedIcon fontSize="inherit" sx={{
                        fontSize: '26px',
                        marginRight: '5px'
                    }}/>
                    <Link className="sidebar_hypertext" to={'/drivers'}>Водители</Link>
                </div>
                <div className={`link_item ${active === 'directions' ? 'active' : null}`}>
                    <DirectionsIcon fontSize="inherit" sx={{
                        fontSize: '26px',
                        marginRight: '5px'
                    }}/>
                    <Link className="sidebar_hypertext" to={'/directions'}>Направления</Link>
                </div>
                <div className={`link_item ${active === 'passengers' ? 'active' : null}`}>
                    <AirlineSeatReclineNormalIcon fontSize="inherit" sx={{
                        fontSize: '26px',
                        marginRight: '5px'
                    }}/>
                    <Link className="sidebar_hypertext" to={'/passengers'}>Пассажиры</Link>
                </div>
                
                <div className={`link_item ${active === 'cities' ? 'active' : null}`}>
                    <DirectionsIcon fontSize="inherit" sx={{
                        fontSize: '26px',
                        marginRight: '5px'
                    }}/>
                    <Link className="sidebar_hypertext" to={'/cities'}>Города</Link>
                </div>
            </div> : null}
        </>
          
        ) : (
            <AutoStoriesIcon fontSize="medium" sx={{color: 'gray', margin: '20px 0'}}/>
        )}
      </div>
    </div>
  );
};
