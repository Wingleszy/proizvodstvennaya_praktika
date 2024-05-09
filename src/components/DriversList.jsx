import React from 'react'
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { DriversRow } from './DriversRow';

export const DriversList = (props) => {
    const {drivers = []} = props
  return (
    <div className='drivers_table home_content'>
        <div className='drivers_row drivers_header'>
            <div>
                Фамилия 
                <SwitchLeftIcon sx={{
                    rotate: '90deg',
                }}/>
            </div>
            
            <div>
                Имя 
                <SwitchLeftIcon sx={{
                    rotate: '90deg',
                }}/>
            </div>
            <div>
                Отчество 
                <SwitchLeftIcon sx={{
                    rotate: '90deg',
                }}/>
            </div>
            <div>
                Пол 
                <SwitchLeftIcon sx={{
                    rotate: '90deg',
                }}/>
            </div>
            <div>
                Дата рождения 
                <SwitchLeftIcon sx={{
                    rotate: '90deg',
                }}/>
            </div>
            <div>
                Активность 
                <SwitchLeftIcon sx={{
                    rotate: '90deg',
                }}/>
            </div>
            <div>
                Действия 
            </div>
        </div>
        {drivers.map((driver) => <DriversRow driver={driver} />)}

        

    </div>
  )
}
