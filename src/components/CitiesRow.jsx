import React, { useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const CitiesRow = (props) => {
    const {passenger} = props
  return (
    <div className='drivers_row_container'>
      <div className='drivers_row'>
          <div>{passenger.shortName}</div>
          <div>{passenger.name}</div>
          <div>{passenger.officialName}</div>
          <div>{passenger.okato}</div>
          <div>{passenger.oktmo}</div>
          <div>{passenger.longtitude}</div>
          <div>{passenger.latitude}</div>
      </div>
    </div>
  )
}
