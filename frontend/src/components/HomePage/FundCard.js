import React from 'react';
import {useNavigate} from "react-router-dom";

export default function FundCard(props) {

    const navigate = useNavigate();

    function handleDetailsFund(index) {
        navigate(`/details-fund/${index}`);
    }

    const navigateToAuthor = (email) => {
        navigate(`/account-info/${email}`);
    };

    return (<div
        style={{
            display: "flex",
            flexDirection: "column",
            background: "#3399ff",
            maxWidth: "400px",
            borderRadius: "25px",
            paddingBottom: "10px",
            fontWeight: "bold",
            justifyContent: "space-between"
        }}>
        <img alt="card" src={props.picture} style={{
            width: "100%",
            aspectRatio: "1.4",
            borderTopLeftRadius: "25px",
            borderTopRightRadius: "25px"
        }}/>
        <div style={{display: "flex", flexDirection: "column", gap: "5px", marginLeft: "10px", marginTop: "10px"}}>
            <p style={{paddingRight: "30px", height: "45px"}}>{props.name}</p>
            <p>Зібрано: {props.amountFunds / 100} / {props.goalFunds / 100} грн</p>
            <progress value={props.amountFunds / props.goalFunds}/>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "30px"}}>
                <p onClick={() => navigateToAuthor(props.email)}
                   style={{cursor: "pointer"}}>{props.author}</p>
                <button onClick={() => handleDetailsFund(props.id)} className="detailsButton"> Деталі</button>
            </div>
        </div>
    </div>)
}