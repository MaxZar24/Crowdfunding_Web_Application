import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StartButton from "../../components/HomePage/CreateButton";
import InfoSection from "../../components/HomePage/InfoSection";
import FundsButtonHome from "../../components/HomePage/StartButton";


function HomePage() {


    return (<div>
            <Header/>
            <StartButton/>
            <InfoSection/>
            <FundsButtonHome/>
            <Footer/>
        </div>
    );
}

export default HomePage;