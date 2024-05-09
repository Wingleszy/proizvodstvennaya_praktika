import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { Label } from "../components/Label";
import { DriversList } from "../components/DriversList";
import { DirectionsList } from "../components/DirectionsList";

export const Directions = () => {
    const [isExpanded, setExpanded] = useState(false);
    const [directions, setDirections] = useState([]);
    
    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "dictionary/directions?page=1", {
            
            headers: new Headers({
                'Authorization': "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/ld+json'
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setDirections(data["hydra:member"]);
        });
        // .then(data => setDrivers(data))
    }, []);

    useEffect(() => {
        console.log(directions);
    }, [directions])

    return (
        <div className="container">
        <Sidebar isExpanded={isExpanded} active="directions" />
        <main className="main">
            <Header setExpanded={setExpanded} />
            <Label label={"Список направлений"} />
            <DirectionsList directions={directions}/>
            <Footer />
        </main>
        </div>
    );
}
