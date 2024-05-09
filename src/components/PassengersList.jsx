import React, { useEffect, useState } from 'react';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PassengerRow } from './PassengerRow';

export const PassengersList = (props) => {
    const { passengers = [], pagesCount, currentPage, setCurrentPage, setSearchParams, searchParams, setPassengers } = props;
    const [lastName, setLastName] = useState(searchParams.get('FIO') || '');
    const [passport, setPassport] = useState(searchParams.get('document') || '');
    const [phone, setPhone] = useState(searchParams.get('phone') || '');
    const [filteredPassengers, setFilteredPassengers] = useState(passengers);

    const resetSearchHandler = () => {
        setPassport('');
        setLastName('');
        setPhone('');
        setSearchParams({
            page: currentPage,
        });
        setFilteredPassengers(passengers)
    };

    const paginationHandler = (type) => {
        let newPage = currentPage;
        if (type === 'increment' && currentPage < pagesCount) {
            newPage = currentPage + 1;
            setCurrentPage(newPage);
            smartSearch() 
        } else if (type === 'decrement' && currentPage > 1) {
            newPage = currentPage - 1;
            setCurrentPage(newPage);
            smartSearch()
        }
        setSearchParams(prevSearchParams => ({
            ...prevSearchParams,
            page: newPage,
            ...(passport ? {document: passport} : null),
            ...(lastName ? {FIO: lastName} : null),
            ...(phone ? {phone: phone} : null),
        }));
    };


    const pageHandler = (value) => {
        const pageNumber = parseInt(value, 10);
        setCurrentPage(pageNumber);
        smartSearch()
        setSearchParams(prevSearchParams => ({
            ...prevSearchParams,
            page: pageNumber,
            ...(passport ? {document: passport} : null),
            ...(lastName ? {FIO: lastName} : null),
            ...(phone ? {phone: phone} : null),
        }));
    };

    useEffect(() => {
        setFilteredPassengers(passengers)
    }, [passengers])

    const smartSearch = () => {
            setSearchParams({
                page: currentPage,
                ...(passport ? {document: passport} : null),
                ...(lastName ? {FIO: lastName} : null),
                ...(phone ? {phone: phone} : null),
            });
            let queryStr = searchParams.toString()
            console.log(process.env.REACT_APP_API_LINK + "people/people/smart-search?" + queryStr);
            setSearchParams({
                page: currentPage,
                ...(passport ? {document: passport} : null),
                ...(lastName ? {FIO: lastName} : null),
                ...(phone ? {phone: phone} : null),
            });
            fetch(process.env.REACT_APP_API_LINK + "people/people/smart-search?" + queryStr, {
                
                headers: new Headers({
                    'Authorization': "Bearer " + localStorage.getItem("token"),
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept':'application/ld+json'
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                setFilteredPassengers(data["hydra:member"]);
            });
            console.log(filteredPassengers);
        };

    const searchHandler = () => {
        setSearchParams({
            page: currentPage,
            ...(passport ? {document: passport} : null),
            ...(lastName ? {FIO: lastName} : null),
            ...(phone ? {phone: phone} : null),
        });
        let queryStr = searchParams.toString()
        console.log(process.env.REACT_APP_API_LINK + "people/people/smart-search?" + queryStr);
        setSearchParams({
            page: currentPage,
            ...(passport ? {document: passport} : null),
            ...(lastName ? {FIO: lastName} : null),
            ...(phone ? {phone: phone} : null),
        });
       
        const filteredData = passengers.filter((passenger) => {
            if(passenger.documents[0]?.serial && passenger.documents[0]?.number) {
                if (passport && !(passenger.documents[0]?.serial.toLowerCase() + passenger.documents[0]?.number.toLowerCase()).includes(passport.toLowerCase())) {
                    return false;
                }
            } else {
                if(passport) {
                    return false
                }
            }
            if (lastName && !passenger.lastname.toLowerCase().includes(lastName.toLowerCase())) {
                return false;
            }
            if (phone && !passenger.phone.toLowerCase().includes(phone.toLowerCase())) {
                return false;
            }
            return true;
        });

        setFilteredPassengers(filteredData); 
        console.log(filteredPassengers);
    };

    return (
        <div className='drivers_table home_content'>
            <div className="drivers_filter">
                <input type="text" placeholder='Поиск по фамилии' onChange={(e) => {
                    setSearchParams({
                        page: currentPage,
                        ...(passport ? {document: passport} : null),
                        ...(lastName ? {FIO: e.target.value} : null),
                        ...(phone ? {phone: phone} : null),
                    })
                    setLastName(e.target.value)
                    }} value={lastName} />
                    
                <input type="text" placeholder='Поиск по паспорту' onChange={(e) => {
                    setSearchParams({
                        page: currentPage,
                        ...(passport ? {document: e.target.value} : null),
                        ...(lastName ? {FIO: e.target.value} : null),
                        ...(phone ? {phone: phone} : null),
                    })
                    setPassport(e.target.value)
                    }} value={passport} />
                <input type="text" placeholder='Поиск по телефону   ' onChange={(e) => {
                    
                    setSearchParams({
                        page: currentPage,
                        ...(passport ? {document: passport} : null),
                        ...(lastName ? {FIO: e.target.value} : null),
                        ...(phone ? {phone: e.target.value} : null),
                    })
                    setPhone(e.target.value)
                    }} value={phone} />
                
            </div>
            <div className="drivers_search">
                <button className='search_reset' onClick={resetSearchHandler}>Сбросить</button>
                <button className='search_find' onClick={smartSearch}>Поиск</button>
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
                    Телефон
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
                <div>
                    E-mail
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
                <div>
                    Пол
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
                <div>
                    Серия и номер паспорта
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
                <div>
                    Дата рождения
                    <SwitchLeftIcon sx={{ rotate: '90deg' }} />
                </div>
            </div>
            {filteredPassengers.map((passenger, index) => <PassengerRow key={index} passenger={passenger} />)}

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