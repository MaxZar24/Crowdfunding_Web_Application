import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import {Tooltip} from "react-tooltip";
import avatarDefault from '../../images/avt.png'
import linkedinIcon from '../../images/logos/linkedin.svg'
import facebookIcon from '../../images/logos/facebook.svg'
import instagramIcon from '../../images/logos/instagram.svg'
import telegramIcon from '../../images/logos/telegram.svg'
import mailIcon from '../../images/logos/mail.svg'
import "./AccountPage.css"
import {useNavigate, useParams} from "react-router-dom";

function AccountInfo() {

    const {email} = useParams();


    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        socialLinks: []
    });
    const [avatarUrl, setAvatarUrl] = useState('');
    const [userDonations, setUserDonations] = useState([]);

    const navigate = useNavigate();


    const socialMediaIcons = {
        'telegram': telegramIcon,
        'instagram': instagramIcon,
        'facebook': facebookIcon,
        'linkedin': linkedinIcon
    };

    const socialMediaPatterns = {
        'telegram': /t\.me/,
        'instagram': /instagram\.com/,
        'facebook': /facebook\.com/,
        'linkedin': /linkedin\.com/
    };

    const getUserData = async () => {
        try {
            let currentUserEmail
            if (email) {
                currentUserEmail = email
            } else {
                currentUserEmail = (JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'))).email;
            }
            if (currentUserEmail) {
                const response = await axios.get(`http://localhost:3001/api/user?email=${currentUserEmail}`);
                const userData = response.data;
                setFormData({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    socialLinks: userData.socialMedia,
                });
                setAvatarUrl(userData.avatar || avatarDefault);
                getUserDonations(currentUserEmail)
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const getUserDonations = async (email) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/user-donations?email=${email}`);
            setUserDonations(response.data);
        } catch (error) {
            console.error('Error fetching user donations:', error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
    }, [userDonations]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleAddSocialLink = () => {
        setFormData({
            ...formData,
            socialLinks: [...formData.socialLinks, '']
        });
    };

    const handleSocialLinkChange = (e, index) => {
        const newSocialLinks = [...formData.socialLinks];
        newSocialLinks[index] = e.target.value;
        setFormData({
            ...formData,
            socialLinks: newSocialLinks
        });
    };

    const handleDeleteSocialLink = (index) => {
        const newSocialLinks = formData.socialLinks.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            socialLinks: newSocialLinks
        });
    };

    const getSocialIcon = (link) => {
        for (let [key, pattern] of Object.entries(socialMediaPatterns)) {
            if (pattern.test(link)) {
                return {icon: socialMediaIcons[key], name: key.charAt(0).toUpperCase() + key.slice(1)};
            }
        }
        return {icon: null, name: null};
    };

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];

        try {
            const base64 = await convertToBase64(file);
            setAvatarUrl(base64);

            const storedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
            if (storedUser) {
                await axios.put(`http://localhost:3001/api/upload-photo`, {
                    email: formData.email,
                    avatar: base64
                });
                getUserData();
            }
        } catch (error) {
            console.error('Error updating photo:', error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
            if (storedUser) {
                const response = await axios.put(`http://localhost:3001/api/user`, {
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    socialLinks: formData.socialLinks,
                });
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    function handleCreateFund() {
        navigate('/create-fund');
    }

    function handleDetailsFund(index) {
        navigate(`/details-fund/${index}`);
    }

    const handleDeleteDonation = async (donationId) => {
        try {
            await axios.delete(`http://localhost:3001/api/donation/${donationId}`);
            setUserDonations(userDonations.filter(donation => donation._id !== donationId));
        } catch (error) {
            console.error('Error deleting donation:', error);
        }
    };

    return (
        <div>
            <Header/>
            {email ? <div className="background">
                    <div className="account-background">
                        <div className="image-field">
                            <div className="avatar-container">
                                <img className="avatar-image" alt="avatar" src={avatarUrl}/>
                            </div>
                        </div>
                        <div className="personal-info">
                            <div className="container">
                                <div>
                                    <h2>{formData.firstName}</h2>
                                    <h2>{formData.lastName}</h2>
                                </div>
                            </div>
                            <div className="social-link">
                                <img style={{width: "20px"}} src={mailIcon} alt="social icon"/>
                                <p>{formData.email}</p>
                            </div>
                            <div className="social-links">
                                {formData.socialLinks.map((link, index) => {
                                    const social = getSocialIcon(link);
                                    return (
                                        <div key={index} className="social-link">
                                            {social.icon &&
                                                <img style={{width: "20px"}} src={social.icon} alt="social icon"/>}
                                            <a className="links-styling" href={link} target="_blank"
                                               rel="noopener noreferrer">
                                                {social.name}
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="donation-section">
                            {userDonations.length === 0 ? (
                                <p style={{textAlign: "center"}}>Ви не створювали зборів</p>
                            ) : (
                                userDonations.map((donation, index) => (
                                    <div style={{width:"100%"}} className="fund-area" key={index}>
                                        <p className="funds-number">{index + 1}.</p>
                                        <p className="funds-name">{donation.donationTitle}</p>
                                        <button onClick={() => handleDetailsFund(donation._id)}
                                                className="funds-button">Деталі
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div> :
                <div className="background">
                    <div className="account-background">
                        <div className="image-field">
                            <div className="avatar-container">
                                <img className="avatar-image" alt="avatar" src={avatarUrl}/>
                            </div>
                            <label htmlFor="avatar" className="custom-file-upload"
                                   data-tooltip-id="sizewarning" data-tooltip-offset="15">
                                Змінити аватар
                            </label>
                            <Tooltip id="sizewarning" place="bottom" noArrow={true}
                                     style={{backgroundColor: "#404040"}}
                                     className="tooltip-custom">
                                <div>
                                    Максимальний розмір файлу: 1Мб
                                </div>
                            </Tooltip>
                            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"
                                   onChange={handleAvatarChange} title="Максимальний розмір файлу: 1MB"
                            />
                        </div>
                        {isEditing ? <div className="personal-info">
                            <div className="container">
                                <div>
                                    <input
                                        className="info-input name-input"
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        className="info-input name-input"
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <svg
                                    onClick={handleUpdateProfile}
                                    className="icon"
                                    width="35"
                                    height="35"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"
                                       strokeWidth="0.144"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M4 12.6111L8.92308 17.5L20 6.5"
                                            stroke="#F8F8FF"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <input
                                className="info-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {formData.socialLinks.map((link, index) => (
                                <div className="social-link-container" key={index}>
                                    <input
                                        className="links-input"
                                        type="text"
                                        value={link}
                                        onChange={(e) => handleSocialLinkChange(e, index)}
                                        placeholder="Введіть посилання на соцмережу"
                                    />
                                    <svg
                                        onClick={() => handleDeleteSocialLink(index)}
                                        className="icon"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17"
                                                stroke="#F8F8FF"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                    </svg>
                                </div>
                            ))}
                            <button className="add-links-button"
                                    onClick={handleAddSocialLink}>Додати
                                посилання
                            </button>
                        </div> : <div className="personal-info">
                            <div className="container">
                                <div>
                                    <h2>{formData.firstName}</h2>
                                    <h2>{formData.lastName}</h2>
                                </div>
                                <svg
                                    onClick={handleEditToggle}
                                    className="icon"
                                    width="35"
                                    height="35"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"
                                       strokeWidth="0.144"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M12 20H20.5M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
                                            stroke="#F8F8FF"
                                            strokeWidth="1.008"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <div className="social-link">
                                <img style={{width: "20px"}} src={mailIcon} alt="social icon"/>
                                <p>{formData.email}</p>
                            </div>
                            <div className="social-links">
                                {formData.socialLinks.map((link, index) => {
                                    const social = getSocialIcon(link);
                                    return (
                                        <div key={index} className="social-link">
                                            {social.icon &&
                                                <img style={{width: "20px"}} src={social.icon} alt="social icon"/>}
                                            <a className="links-styling" href={link} target="_blank"
                                               rel="noopener noreferrer">
                                                {social.name}
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                            <button onClick={handleCreateFund} className="start-funding-button">Почати збір</button>
                        </div>}
                        <div className="donation-section">
                            {userDonations.length === 0 ? (
                                <p style={{textAlign: "center"}}>Ви не створювали зборів</p>
                            ) : (
                                userDonations.map((donation, index) => (
                                    <div style={{width:"100%"}} className="fund-item" key={index}>
                                        <div className="fund-area">
                                            <p className="funds-number">{index + 1}.</p>
                                            <p className="funds-name">{donation.donationTitle}</p>
                                            <button onClick={() => handleDetailsFund(donation._id)}
                                                    className="funds-button">Деталі
                                            </button>
                                        </div>
                                        <button onClick={() => handleDeleteDonation(donation._id)}
                                                className="delete-donation-button">
                                            Видалити збір
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>}
            <Footer/>
        </div>
    );
}

export default AccountInfo;