import React from 'react'
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { DriversRow } from './DriversRow';
import { DirectionRow } from './DirectionRow';

export const DirectionsList = (props) => {
    const {directions = []} = props
    return (
      <div className='drivers_table home_content'>
          <div className='drivers_row drivers_header'>
              <div>
                  Наименование 
                  <SwitchLeftIcon sx={{
                      rotate: '90deg',
                  }}/>
              </div>
              
              <div>
                  Сокращение 
                  <SwitchLeftIcon sx={{
                      rotate: '90deg',
                  }}/>
              </div>
              <div>
                  Действия 
              </div>
          </div>
          {directions.map((direction) => <DirectionRow direction={direction} />)}
          
      </div>
    )
}
