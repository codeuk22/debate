import React from "react";
import Header from "../components/Header";
import Home from "./Home";

const Layout=()=>{
    return(
        <>
        <Header/>
        <main>
            <Home/> 
        </main>
        </>
    )
};

export default Layout;

