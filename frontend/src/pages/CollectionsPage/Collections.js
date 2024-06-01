import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Donations from "../../components/CollectionsPage/DonationsTemplate";
import SortDropdown from "../../components/CollectionsPage/SortDropdown";
import './Collections.css';

import animals from '../../images/category_images/animals.png'
import children from '../../images/category_images/children.jpg'
import science from '../../images/category_images/science.jpg'
import security from '../../images/category_images/security.jpg'
import education from '../../images/category_images/education.jpg'
import environment from '../../images/category_images/environment.jpg'
import medicine from '../../images/category_images/medicine.jpg'

import {useDispatch, useSelector} from 'react-redux';
import {setCategory, clearFilters} from '../../redux/categorySlice';

function Collections() {
    const dispatch = useDispatch();
    const [donations, setDonations] = useState([]);
    const [sortOption, setSortOption] = useState('');

    const selectedCategory = useSelector((state) => state.category.selectedCategory);
    const searchTerm = useSelector((state) => state.category.searchTerm);


    useEffect(() => {
        fetch('http://localhost:3001/api/donations-with-cost-details')
            .then(response => response.json())
            .then(data => setDonations(data))
            .catch(error => console.error('Error fetching donations:', error));
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

    const handleCategoryClick = (category) => {
        dispatch(setCategory(category));
    };

    const handleFilterClear = () => {
        dispatch(clearFilters());
        setSortOption('')
    }

    const handleSortChange = (selectedOption) => {
        setSortOption(selectedOption);
    };

    const sortDonations = (donations) => {
        switch (sortOption) {
            case 'date-old':
                return [...donations].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'date-new':
                return [...donations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'amount_needed_low':
                return [...donations].sort((a, b) => (a.jarGoal - a.jarAmount) - (b.jarGoal - b.jarAmount));
            case 'amount_needed_huge':
                return [...donations].sort((a, b) => (b.jarGoal - b.jarAmount) - (a.jarGoal - a.jarAmount));
            default:
                return donations;
        }
    };

    const filteredAndSortedDonations = sortDonations(
        donations.filter(donation =>
            (!selectedCategory || donation.category === selectedCategory) &&
            (!searchTerm || donation.donationTitle.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    );

    return (
        <div>
            <Header/>
            <div className="page-body">
                <ul className="menu-bar">
                    <li onClick={() => handleCategoryClick('medicine')}>Медицина</li>
                    <li onClick={() => handleCategoryClick('education')}>Освіта</li>
                    <li onClick={() => handleCategoryClick('science')}>Наука</li>
                    <li onClick={() => handleCategoryClick('children')}>Діти</li>
                    <li onClick={() => handleCategoryClick('security')}>Безпека</li>
                    <li onClick={() => handleCategoryClick('environmental_protection')}>Захист довкілля</li>
                    <li onClick={() => handleCategoryClick('animals')}>Тварини</li>
                    <li className="clear-filters" onClick={handleFilterClear}>Скинути фільтри</li>
                </ul>
                <div className="donations">
                    {filteredAndSortedDonations.length > 0 ? (
                        filteredAndSortedDonations.map(donation => (
                            <Donations
                                donation = {donation}
                                picture={getCategoryImage(donation.category)}
                                amountFunds={donation.jarAmount}
                                goalFunds={donation.jarGoal}
                            />
                        ))
                    ) : (
                        <div className="no-donations-message">
                            Немає зборів, що відповідають критеріям фільтрації.
                        </div>
                    )}
                </div>
                <SortDropdown onSortChange={handleSortChange}></SortDropdown>
            </div>
            <Footer/>
        </div>
    );
}

export default Collections;