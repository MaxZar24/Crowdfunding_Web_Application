import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateStartButton.css';

export default function StartButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/collections');
    };

    return (
        <div className="createStartSection">
            <button className="createStartButton" onClick={handleClick}>
                Допоможи здійснити мрії!
            </button>
        </div>
    );
}