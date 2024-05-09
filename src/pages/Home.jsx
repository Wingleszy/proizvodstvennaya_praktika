    import React, { useEffect, useState } from "react";
    import { Header } from "../components/Header";
    import { Sidebar } from "../components/Sidebar";
    import { Footer } from "../components/Footer";
    import { Label } from "../components/Label";
    import { DriversList } from "../components/DriversList";
    import { useSearchParams } from "react-router-dom";

    export const Home = () => {
    const [isExpanded, setExpanded] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [pagesCount, setPagesCount] = useState();
    const [searchParams, setSearchParams] = useSearchParams()
    
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)



    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "dictionary/drivers?page=" + currentPage, {
            
            headers: new Headers({
                'Authorization': "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/ld+json'
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setPagesCount(Math.ceil(data["hydra:totalItems"]/30))
            setDrivers(data["hydra:member"]);
        });
    }, [currentPage]);


    return (
        <div className="container">
        <Sidebar isExpanded={isExpanded} active="drivers" />
        <main className="main">
            <Header setExpanded={setExpanded} />
            <Label label={"Список водителей"} />
            <DriversList setDrivers={setDrivers} drivers={drivers} pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} setSearchParams={setSearchParams} searchParams={searchParams}/>
            <Footer />
        </main>
        </div>
    );
    };
