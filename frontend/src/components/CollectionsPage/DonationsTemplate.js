import React from 'react';
import {useNavigate} from "react-router-dom";

export default function DonationsTemplate(props) {

    const navigate = useNavigate();

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    }

    function handleDetailsFund(index) {
        navigate(`/details-fund/${index}`);
    }

    const navigateToAuthor = (email) => {
        navigate(`/account-info/${email}`);
    };

    return (<div style={{
        background: "yellow",
        display: "flex",
        height: "170px",
        width: "700px",
        marginLeft: "180px",
        borderRadius: "10px",
        backgroundColor: "#3399ff",
        color: "#F8F8FF",
        fontWeight: "bold",
    }}>
        <div style={{
            height: "100%",
            width: "300px",
        }}>
            <img src={props.picture} alt="donation-pic" style={{
                width: "100%", height: "100%", borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
            }}></img>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px 15px 10px 10px",
            justifyContent: "space-between",
            width: "100%"
        }}>
            <p>{props.donation.donationTitle}</p>
            <p>Зібрано: {props.amountFunds / 100} / {props.goalFunds / 100} грн</p>
            <progress value={props.amountFunds / props.goalFunds}/>
            <p>Створено: {formatDate(props.donation.createdAt)}</p>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <p onClick={() => navigateToAuthor(props.donation.owner)} style={{ cursor: "pointer" }}>{props.donation.authorName}</p>
                <button onClick={() => handleDetailsFund(props.donation._id)} className="detailsButton">Деталі</button>
            </div>
        </div>
    </div>)
}