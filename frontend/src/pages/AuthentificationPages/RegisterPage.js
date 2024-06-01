import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const avatar = '';
    const socialMedia = [];

    const navigate = useNavigate();

    const handleChangeAuthPage = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            firstName,
            lastName,
            email,
            password,
            avatar,
            socialMedia
        };

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Помилка при реєстрації:', error);
        }
    };


    return (
        <div className="background">
            <form className="authField" onSubmit={handleSubmit}>
                <h2 style={{width: "250px", textAlign: "center", marginBottom: "10px"}}>Увійти до акаунту</h2>
                <div className="authInputs">
                    <label>Ім'я:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                    <label>Прізвище:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                    <label>E-mail:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <p className="changeAuthPage" onClick={handleChangeAuthPage}>Ще не зареєстровані?</p>
                    <button type="submit">Зареєструватись</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;