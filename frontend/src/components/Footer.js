import React from 'react';
import {useNavigate} from 'react-router-dom';
import flag from '../images/flag.svg'


export default function Footer() {

    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    const handleRefresh = () => {
        navigate("/")
        window.location.reload();
    };

    return (
        <div className="color-style"
             style={{height: "100px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div>
                <ul className="footer-ul">
                    <li onClick={handleRefresh}>
                        <img src={flag} alt="ukr" style={{height: "20px", width:"40px"}}/> Добротвір
                    </li>
                    <li style={{cursor: 'pointer'}} onClick={() => handleClick('/terms')}>Політика користування</li>
                    <li style={{cursor: 'pointer'}} onClick={() => handleClick('/about-us')}>Про нас</li>
                </ul>
            </div>
        </div>
    )
}