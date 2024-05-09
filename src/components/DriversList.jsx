import React, { useState } from 'react';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DriversRow } from './DriversRow';

export const DriversList = (props) => {
    const { drivers = [], pagesCount, currentPage, setCurrentPage, setSearchParams, searchParams, setDrivers } = props;
    const [firstName, setFirstName] = useState(searchParams.get('firstname') || '');
    const [lastName, setLastName] = useState(searchParams.get('lastname') || '');
    const [patronymic, setPatronymic] = useState(searchParams.get('patronymic') || '');
    const [showAll, setShowAll] = useState(searchParams.get('show_all') || false);
    const [filteredDrivers, setFilteredDrivers] = useState(drivers);

    const resetSearchHandler = () => {
        setFirstName('');
        setLastName('');
        setPatronymic('');
        setShowAll(false);
        setSearchParams({
            page: 1,
            firstname: '',
            lastname: '',
            patronymic: '',
            ...(showAll && { 'show_all': showAll })
        });
        setFilteredDrivers(drivers)
    };

    const paginationHandler = (type) => {
        let newPage = currentPage;
        if (type === 'increment' && currentPage < pagesCount) {
            newPage = currentPage + 1;
            setCurrentPage(newPage);
            searchHandler() 
        } else if (type === 'decrement' && currentPage > 1) {
            newPage = currentPage - 1;
            setCurrentPage(newPage);
            searchHandler()
        }
        setSearchParams(prevSearchParams => ({
            ...prevSearchParams,
            page: newPage,
            firstname: firstName,
            lastname: lastName,
            patronymic: patronymic,
            ...(showAll && { 'show_all': showAll })
        }));
    };

    const pageHandler = (value) => {
        const pageNumber = parseInt(value, 10);
        setCurrentPage(pageNumber);
        searchHandler()
        setSearchParams(prevSearchParams => ({
            ...prevSearchParams,
            page: pageNumber,
            firstname: firstName,
            lastname: lastName,
            patronymic: patronymic,
            ...(showAll && { 'show_all': showAll })
        }));
    };

    const searchHandler = () => {
        const filteredData = drivers.filter((driver) => {
            if (firstName && !driver.firstname.toLowerCase().includes(firstName.toLowerCase())) {
                return false;
            }
            if (lastName && !driver.lastname.toLowerCase().includes(lastName.toLowerCase())) {
                return false;
            }
            if (patronymic && !driver.patronymic.toLowerCase().includes(patronymic.toLowerCase())) {
                return false;
            }
            if (!showAll && !driver.active) {
                return false;
            }
            return true;
        });

        setSearchParams(prevSearchParams => ({
            ...prevSearchParams,
            page: currentPage,
            firstname: firstName,
            lastname: lastName,
            patronymic: patronymic,
            ...(showAll && { 'show_all': showAll })
        }));
        setFilteredDrivers(filteredData); 
    };

    return (
        <div className='drivers_table home_content'>
            <div className="drivers_filter">
                <input type="text" placeholder='Поиск по имени' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                <input type="text" placeholder='Поиск по фамилии' onChange={(e) => setLastName(e.target.value)} value={lastName} />
                <input type="text" placeholder='Поиск по отчеству' onChange={(e) => setPatronymic(e.target.value)} value={patronymic} />
                <select name="" id="" onChange={(e) => setShowAll(e.target.value === 'show_all')} value={showAll ? 'show_all' : 'show_active'}>
                    <option value="show_all">Все</option>
                    <option value="show_active">Активные</option>
                </select>
            </div>
            <div className="drivers_search">
                <button className='search_reset' onClick={resetSearchHandler}>Сбросить</button>
                <button className='search_find' onClick={searchHandler}>Поиск</button>
            </div>
            <div className='drivers_row drivers_header'>
                <div>
                    Фамилия
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>

                <div>
                    Имя
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
                <div>
                    Отчество
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
                <div>
                    Пол
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
                <div>
                    Дата рождения
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
                <div>
                    Активность
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
                <div>
                    Действия
                </div>
            </div>
            {filteredDrivers.map((driver, index) => <DriversRow key={index} driver={driver} />)}

            <div className="drivers_pagination">
                <div onClick={() => paginationHandler('decrement')}><ArrowBackIcon /></div>
                {currentPage > 1 ? <div onClick={() => pageHandler(currentPage - 1)}>{currentPage - 1}</div> : null}
                <div className='active_page'>{currentPage}</div>
                {currentPage < pagesCount ? <div onClick={() => pageHandler(currentPage + 1)}>{currentPage + 1}</div> : null}
                <div onClick={() => paginationHandler('increment')}><ArrowForwardIcon /></div>
            </div>

        </div>
    )
};