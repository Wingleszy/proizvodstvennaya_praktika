import React, { useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


export const PassengerRow = (props) => {
    const {passenger} = props
  return (
    <div className='drivers_row_container'>
      <div className='drivers_row'>
          <div>{passenger.lastname}</div>
          <div>{passenger.firstname}</div>
          <div>{passenger.patronymic}</div>
          <div>{passenger.phone}</div>
          <div>{passenger.email}</div>
          <div>{passenger.sex === 1 ? 'муж' : 'жен'}</div>
          <div>{passenger?.documents[0]?.serial && passenger?.documents[0]?.serial ? passenger?.documents[0]?.serial + ' ' + passenger?.documents[0]?.number : ""}</div>
          <div>{passenger.birthdate.slice(0, 10).replaceAll('-', '.')}</div>
      </div>
    </div>
  )
}
