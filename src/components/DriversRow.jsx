import React, { useRef, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const DriversRow = (props) => {
    const {driver} = props
    const [isCard, setCard] = useState(false)

  return (
    <div className='drivers_row_container'>
      <div className='drivers_row'>
          <div>{driver.lastname}</div>
          <div>{driver.firstname}</div>
          <div>{driver.patronymic}</div>
          <div>{driver.sex === 1 ? 'муж' : 'жен'}</div>
          <div>{driver.birthDate.slice(0, 10).replaceAll('-', '.')}</div>
          <div>{driver.active ? <span className='green'>Да</span> : <span className='red'>Нет</span>}</div>
          <div><RemoveRedEyeIcon fontSize='small' sx={{cursor:'pointer'}} onClick={() => setCard(prev => !prev)}/></div>
      </div>
      <div className={`card ${isCard ? 'visible' : ''}`} >
        <div className="card_header">
          <span>{driver.firstname + ' ' + driver.lastname}</span>
        </div>
        <div className="card_line">
          <span className='card_name'>Фамилия</span>
          <span className='card_value'>{driver.lastname}</span>
        </div>
        <div className="card_line">
          <span className='card_name'>Имя</span>
          <span className='card_value'>{driver.firstname}</span>
        </div>
        <div className="card_line">
          <span className='card_name'>Отчество</span>
          <span className='card_value'>{driver.patronymic}</span>
        </div>
        <div className="card_line">
          <span className='card_name'>Пол</span>
          <span className='card_value'>{driver.sex === 1 ? 'муж' : 'жен'}</span>
        </div>
        <div className="card_line">
          <span className='card_name'>Дата рождения</span>
          <span className='card_value'>{driver.birthDate.slice(0, 10).replaceAll('-', '.')}</span>
        </div>
      </div>
    </div>
  )
}
