import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, {useEffect, useState} from "react";
import "./FundDetailsPage.css"
import animals from '../../images/category_images/animals.png'
import children from '../../images/category_images/children.jpg'
import science from '../../images/category_images/science.jpg'
import security from '../../images/category_images/security.jpg'
import education from '../../images/category_images/education.jpg'
import environment from '../../images/category_images/environment.jpg'
import medicine from '../../images/category_images/medicine.jpg'
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";


function FundDetails() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [fundDetails, setFundDetails] = useState(null);
    const [fundExternalDetails, setFundExternalDetails] = useState({jarGoal: 0, jarAmount: 0});
    const [author, setAuthor] = useState({name: "", lastName: ""})


    const getFund = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/fund/${id}`);
            setFundDetails(response.data);
        } catch (error) {
            console.error('Error fetching fund info:', error);
        }
    };
    const getAuthorData = async (email) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/author?email=${email}`);
            setAuthor({
                name: response.data.firstName,
                lastName: response.data.lastName
            });
        } catch (error) {
            console.error('Error author user data:', error);
        }
    };

    const getExternalFundDetails = async (clientId) => {
        try {
            const response = await axios.post('http://localhost:3001/api/get-cost-details', {
                clientId: clientId,
                Pc: "BBXHINsKar3hFQFbphcyCkpq+qDMPJ5NNgOISwwGKOX2gM+Usx2Pjo5dNKgHdar8L/mjMPE9bvSBqePlHEeVdBc="
            });
            setFundExternalDetails(response.data);
        } catch (error) {
            console.error('Error fetching external fund details:', error);
        }
    };

    useEffect(() => {
        getFund();
    }, [id]);

    useEffect(() => {
        if (fundDetails && fundDetails.donationUrl) {
            const clientId = fundDetails.donationUrl.split('/').pop();
            getExternalFundDetails(clientId);
            getAuthorData(fundDetails.owner)
        }
    }, [fundDetails]);

    if (!fundDetails) {
        return <div>Loading...</div>;
    }

    const getCategoryImage = (category) => {
        switch (category) {
            case 'animals':
                return animals;
            case 'children':
                return children;
            case 'science':
                return science;
            case 'security':
                return security;
            case 'education':
                return education;
            case 'environmental_protection':
                return environment;
            case 'medicine':
                return medicine;
            default:
                return null
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    }

    const navigateToAuthor = (email) => {
        navigate(`/account-info/${email}`);
    };

    return (
        <div>
            <Header/>
            <div className="background">
                <div className="fund-details-field">
                    <img className="fund-img" alt="fund-img" src={getCategoryImage(fundDetails.category)}/>
                    <div className="details-info">
                        <h3>{fundDetails.donationTitle}</h3>
                        <p>Зібрано: {fundExternalDetails.jarAmount / 100} / {fundExternalDetails.jarGoal / 100} грн</p>
                        <progress value={fundExternalDetails.jarAmount / fundExternalDetails.jarGoal}/>
                        <p className="description">{fundDetails.description}</p>
                        <p>Створено: {formatDate(fundDetails.createdAt)}</p>
                        <p onClick={() => navigateToAuthor(fundDetails.owner)}
                           style={{cursor: "pointer"}}>{author.name} {author.lastName}</p>
                        <Link to={fundDetails.donationUrl} target="_blank" rel="noopener noreferrer"
                              className="help-button">Підтримати збір!</Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


export default FundDetails;