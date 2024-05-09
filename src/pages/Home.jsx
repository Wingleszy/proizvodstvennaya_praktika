    import React, { useEffect, useState } from "react";
    import { Header } from "../components/Header";
    import { Sidebar } from "../components/Sidebar";
    import { Footer } from "../components/Footer";
    import { Label } from "../components/Label";
    import { DriversList } from "../components/DriversList";

    export const Home = () => {
    const [isExpanded, setExpanded] = useState(false);
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "dictionary/drivers?page=1", {
            
            headers: new Headers({
                'Authorization': "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/ld+json'
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setDrivers(data["hydra:member"]);
        });
        // .then(data => setDrivers(data))
    }, []);

    useEffect(() => {
        console.log(drivers);
    }, [drivers])

    return (
        <div className="container">
        <Sidebar isExpanded={isExpanded} active="drivers" />
        <main className="main">
            <Header setExpanded={setExpanded} />
            <Label label={"Список водителей"} />
            <DriversList drivers={drivers}/>
            <Footer />
        </main>
        </div>
    );
    };
