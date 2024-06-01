import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, {useState} from "react";
import "./CreatingFundPage.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";


function CreatingFund() {

    const storedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('medicine');
    const [description, setDescription] = useState('');
    const [fundLink, setFundLink] = useState('');
    const owner = storedUser.email

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleFundLinkChange = (event) => {
        setFundLink(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/post-donation', {
                donationTitle: title,
                category,
                description,
                donationUrl: fundLink,
                owner,
            });

            if (response.status === 201) {
                console.log(response.data.donation._id)
                navigate(`/details-fund/${response.data.donation._id}`);

            }
        } catch (error) {
            console.error('Помилка при створенні збору:', error);
            alert('Виникла помилка при створенні збору');
        }
    };

    return (
        <div>
            <Header/>
            <div className="background">
                <form className="formCreateFund" onSubmit={handleSubmit}>
                    <div className="name-category-funds">
                        <label>Назва:</label>
                        <input
                            className="select-name"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                        <label>Категорія збору:</label>
                        <select
                            className="select-category"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="medicine">Медицина</option>
                            <option value="education">Освіта</option>
                            <option value="science">Наука</option>
                            <option value="children">Діти</option>
                            <option value="security">Безпека</option>
                            <option value="environmental_protection">Захист довкілля</option>
                            <option value="animals">Тварини</option>
                        </select>
                    </div>
                    <label>Опис:</label>
                    <textarea
                        className="description-area"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                    <label>Посилання на банку:</label>
                    <input
                        className="fund-link"
                        type="text"
                        value={fundLink}
                        onChange={handleFundLinkChange}
                    />
                    <button className="create-button" type="submit">Створити збір!</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default CreatingFund;