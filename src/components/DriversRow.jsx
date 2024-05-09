import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const DriversRow = (props) => {
    const {driver} = props
  return (
    <div className='drivers_row'>
        <div>{driver.firstname}</div>
        <div>{driver.lastname}</div>
        <div>{driver.patronymic}</div>
        <div>{driver.sex == 1 ? 'муж' : 'жен'}</div>
        <div>{driver.birthDate.slice(0, 10).replaceAll('-', '.')}</div>
        <div>{driver.active ? <span className='green'>Да</span> : <span className='red'>Нет</span>}</div>
        <div><RemoveRedEyeIcon fontSize='small'/></div>
    </div>
  )
}
