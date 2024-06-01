import React, {useState} from 'react';
import "./AuthentificationStyles.css"
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/authSlice';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(login(data.user));
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Помилка при логіні:', error);
        }
    };


    const handleChangeAuthPage = () => {
        navigate('/register');
    };

    return (
        <div className="background">
            <form className="authField" onSubmit={handleSubmit}>
                <h2 style={{width: "250px", textAlign: "center", marginBottom: "10px"}}>Увійти до акаунту</h2>
                <div className="authInputs">
                    <label>E-mail:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <div className="saveButton" style={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <input style={{width: "18px"}} checked={rememberMe}
                               onChange={(e) => setRememberMe(e.target.checked)} type="checkbox"></input>
                        <label>Запам'ятати мене</label>
                    </div>
                    <p className="changeAuthPage" onClick={handleChangeAuthPage}>Ще не зареєстровані?</p>
                    <button type="submit">Увійти</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;