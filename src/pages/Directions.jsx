import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { Label } from "../components/Label";
import { DirectionsList } from "../components/DirectionsList";
import { useSearchParams } from "react-router-dom";

export const Directions = () => {
    const [isExpanded, setExpanded] = useState(false);
    const [directions, setDirections] = useState([]);
    const [pagesCount, setPagesCount] = useState();
    const [searchParams, setSearchParams] = useSearchParams()
    
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1)
    
    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "dictionary/directions?page=" + currentPage, {
            
            headers: new Headers({
                'Authorization': "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/ld+json'
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setPagesCount(Math.ceil(data["hydra:totalItems"]/30))
            setDirections(data["hydra:member"]);
        });
        // .then(data => setDrivers(data))
    }, [currentPage]);


    return (
        <div className="container">
        <Sidebar isExpanded={isExpanded} active="directions" />
        <main className="main">
            <Header setExpanded={setExpanded} />
            <Label label={"Список направлений"} />
            <DirectionsList searchParams={searchParams} directions={directions} pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} setSearchParams={setSearchParams}/>
            <Footer />
        </main>
        </div>
    );
}
