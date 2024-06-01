import React, {useEffect, useState} from 'react';
import FundCard from "./FundCard";
import "./InfoSection.css"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import animals from '../../images/category_images/animals.png'
import children from '../../images/category_images/children.jpg'
import science from '../../images/category_images/science.jpg'
import security from '../../images/category_images/security.jpg'
import education from '../../images/category_images/education.jpg'
import environment from '../../images/category_images/environment.jpg'
import medicine from '../../images/category_images/medicine.jpg'


export default function InfoSection() {

    const [funds, setFunds] = useState([]);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/donations-with-cost-details');
                const sortedFunds = response.data
                    .filter(fund => fund.jarGoal !== 'N/A' && fund.jarAmount !== 'N/A')
                    .sort((a, b) => (a.jarGoal - a.jarAmount) - (b.jarGoal - b.jarAmount))
                    .slice(0, 4);
                setFunds(sortedFunds);
                console.log(funds)
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        };

        fetchFunds();
    }, []);

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

    return (
        <div className="InfoBackground">
            <p style={{fontSize: "40px", textAlign: "center", marginBottom: "20px"}}> Ось-ось завершаться.. </p>
            <Slider {...settings}>
                {funds.map((fund, index) => (
                    <div className="slide-item" key={index}>
                        <FundCard
                            picture={getCategoryImage(fund.category)}
                            name={fund.donationTitle}
                            goalFunds={fund.jarGoal}
                            amountFunds={fund.jarAmount}
                            author={fund.authorName}
                            id={fund._id}
                            email={fund.owner}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    )
}
