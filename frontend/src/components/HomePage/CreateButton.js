import React from 'react';
import './CreateStartButton.css';
import {useNavigate} from 'react-router-dom';

export default function CreateButton() {

    const storedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const handleCreate = () => {
        if (storedUser) {
            navigate('/create-fund');
        } else {
            navigate('/login');
        }
    }

    return (
        <div className="createStartSection" style={{margin: "60px 0 0 0"}}>
            <button className="createStartButton" onClick={handleCreate}>
                Стати фандрайзером
            </button>
        </div>
    );
}
