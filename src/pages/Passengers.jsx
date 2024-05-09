import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { Label } from "../components/Label";
import { DirectionsList } from "../components/DirectionsList";
import { useSearchParams } from "react-router-dom";
import { PassengersList } from "../components/PassengersList";

export const Passengers = () => {
    const [isExpanded, setExpanded] = useState(false);
    const [passengers, setPassengers] = useState([]);
    const [pagesCount, setPagesCount] = useState();
    const [searchParams, setSearchParams] = useSearchParams()
    
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)



    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "people/people?page=" + currentPage, {
            
            headers: new Headers({
                'Authorization': "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/ld+json'
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setPagesCount(Math.ceil(data["hydra:totalItems"]/30))
            setPassengers(data["hydra:member"]);
        });
    }, [currentPage]);


    return (
        <div className="container">
        <Sidebar isExpanded={isExpanded} active="passengers" />
        <main className="main">
            <Header setExpanded={setExpanded} />
            <Label label={"Список пассажиров"} />
            <PassengersList setPassengers={setPassengers} passengers={passengers} pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} setSearchParams={setSearchParams} searchParams={searchParams}/>
            <Footer />
        </main>
        </div>
    );
}
