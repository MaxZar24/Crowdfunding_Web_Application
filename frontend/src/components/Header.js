import React, {useEffect, useState} from 'react';
import './HeaderFooter.css';
import {useNavigate} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import {useDispatch} from 'react-redux';
import {logout} from "../redux/authSlice";
import {setCategory} from "../redux/categorySlice";
import {setSearchTerm} from '../redux/categorySlice';

export default function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleRefresh = () => {
        navigate("/")
        window.location.reload();
    };

    const handleClick = () => {
        navigate('/login');
    };

    function handleLogout() {
        dispatch(logout());
        navigate('/');
    }

    function handleAccount() {
        navigate('/account-info');
        window.location.reload();
    }

    const handleCategoryClick = (category) => {
        dispatch(setCategory(category));
        navigate('/collections');
    };

    const handleSearch = () => {
        dispatch(setSearchTerm(searchInput));
        navigate('/collections');
        setSearchInput('');
    }

    return (<div className="body color-style">
            <ul>
                <li style={{
                    gap: "10px",
                }}
                    onClick={handleRefresh}>
                    <svg fill="#3399ff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"><title>hands-holding-globe</title>
                            <path
                                d="M30.822 14.245l-0.023-0.974c-0.016-1.579-0.082-2.873-0.207-4.074-0.059-0.623-0.147-1.18-0.267-1.725l0.017 0.093c-0.071-0.439-0.238-0.83-0.478-1.164l0.006 0.008c-0.091-0.112-0.211-0.197-0.35-0.242l-0.005-0.001c-0.304-0.126-0.657-0.199-1.026-0.199-0.531 0-1.026 0.151-1.446 0.412l0.012-0.007c-0.698 0.541-1.166 1.35-1.251 2.269l-0.001 0.013-0.509 5.008c-0.292-0.155-0.639-0.246-1.007-0.246-0.861 0-1.605 0.498-1.961 1.222l-0.006 0.013-1.555 2.693-2.953 2.819c-0.051 0.048-0.095 0.104-0.13 0.165l-0.002 0.003-0.832 1.44-0.43-0.248c-0.016-0.009-0.035-0.009-0.052-0.017-0.092-0.045-0.201-0.072-0.316-0.072s-0.223 0.026-0.32 0.074l0.004-0.002c-0.017 0.008-0.036 0.008-0.053 0.017l-0.43 0.248-0.831-1.44c-0.037-0.064-0.081-0.12-0.131-0.168l-0-0-2.953-2.819-1.555-2.693c-0.304-0.565-0.813-0.986-1.425-1.168l-0.017-0.004c-0.16-0.044-0.344-0.069-0.534-0.069-0.366 0-0.71 0.094-1.009 0.259l0.011-0.005-0.508-4.997c-0.083-0.937-0.552-1.75-1.246-2.288l-0.007-0.005c-0.408-0.254-0.904-0.405-1.435-0.405-0.37 0-0.722 0.073-1.044 0.206l0.018-0.007c-0.144 0.046-0.265 0.131-0.354 0.242l-0.001 0.001c-0.24 0.337-0.41 0.74-0.479 1.176l-0.002 0.016c-0.101 0.445-0.186 0.99-0.237 1.545l-0.004 0.053c-0.124 1.197-0.189 2.491-0.207 4.072-0.004 0.328-0.014 0.656-0.023 0.984-0.019 0.314-0.030 0.682-0.030 1.052 0 0.701 0.039 1.392 0.116 2.072l-0.008-0.083c0.358 2.481 1.583 4.625 3.354 6.156l0.013 0.011c1.048 0.83 1.971 1.736 2.791 2.73l0.025 0.031-0.597 0.345c-0.226 0.132-0.375 0.374-0.375 0.65 0 0.138 0.037 0.268 0.102 0.379l-0.002-0.004 1.605 2.781c0.099 0.17 0.259 0.296 0.45 0.348l0.005 0.001c0.057 0.016 0.123 0.025 0.191 0.025 0.001 0 0.002 0 0.004 0h-0c0.001 0 0.001 0 0.002 0 0.137 0 0.266-0.037 0.377-0.102l-0.004 0.002 6.753-3.9 6.757 3.9c0.108 0.062 0.237 0.099 0.375 0.1h0c0.276-0.001 0.518-0.15 0.648-0.371l0.002-0.004 1.605-2.781c0.062-0.108 0.099-0.237 0.099-0.375 0-0.069-0.009-0.135-0.026-0.198l0.001 0.005c-0.053-0.196-0.179-0.357-0.346-0.455l-0.004-0.002-0.598-0.345c0.853-1.032 1.784-1.944 2.802-2.751l0.038-0.029c1.77-1.54 2.987-3.677 3.337-6.094l0.006-0.054c0.068-0.595 0.107-1.285 0.107-1.983 0-0.376-0.011-0.748-0.033-1.118l0.002 0.051zM5.674 22.307c-1.493-1.312-2.521-3.121-2.827-5.166l-0.006-0.047c-0.061-0.537-0.095-1.159-0.095-1.789 0-0.353 0.011-0.704 0.032-1.051l-0.002 0.048c0.011-0.338 0.021-0.676 0.024-1.014 0.017-1.534 0.080-2.784 0.199-3.936 0.050-0.554 0.128-1.052 0.236-1.539l-0.015 0.080c0.026-0.116 0.058-0.258 0.097-0.373 0.1-0.031 0.214-0.049 0.333-0.049 0.206 0 0.4 0.054 0.567 0.149l-0.006-0.003c0.334 0.297 0.555 0.714 0.594 1.183l0 0.007 0.714 7.020c0.012 0.111 0.046 0.213 0.099 0.302l-0.002-0.004 3.218 5.573c0.131 0.231 0.375 0.385 0.655 0.385 0.414 0 0.75-0.336 0.75-0.75 0-0.142-0.040-0.275-0.108-0.388l0.002 0.003-2.815-4.876c-0.316-0.549-0.129-0.918 0.152-1.080 0.276-0.165 0.693-0.143 1.012 0.408l1.608 2.786c0.037 0.064 0.081 0.119 0.132 0.168l0 0 2.953 2.82 0.778 1.346-5.112 2.951c-0.938-1.187-1.979-2.227-3.128-3.134l-0.040-0.030zM22.904 28.975l-6.477-3.738c-0.011-0.006-0.024-0.006-0.035-0.011-0.066-0.035-0.143-0.061-0.225-0.074l-0.004-0.001-0.054-0.004c-0.018-0.002-0.039-0.002-0.061-0.002-0.058 0-0.115 0.007-0.17 0.020l0.005-0.001c-0.024 0.006-0.046 0.015-0.069 0.022-0.051 0.012-0.096 0.027-0.139 0.045l0.005-0.002-6.487 3.746-0.855-1.48 7.71-4.451 7.71 4.451zM29.258 17.095c-0.309 2.082-1.328 3.882-2.8 5.185l-0.009 0.008c-1.198 0.943-2.246 1.989-3.162 3.144l-0.030 0.039-5.111-2.95 0.778-1.346 2.953-2.82c0.051-0.048 0.095-0.104 0.131-0.165l0.002-0.003 1.609-2.786c0.11-0.221 0.298-0.39 0.527-0.473l0.007-0.002c0.047-0.012 0.1-0.019 0.156-0.019 0.118 0 0.229 0.032 0.324 0.087l-0.003-0.002c0.144 0.082 0.251 0.216 0.296 0.375l0.001 0.004c0.010 0.052 0.016 0.113 0.016 0.174 0 0.196-0.060 0.378-0.163 0.529l0.002-0.003-2.816 4.876c-0.063 0.108-0.1 0.237-0.1 0.375 0 0.277 0.149 0.518 0.372 0.649l0.004 0.002c0.107 0.060 0.234 0.096 0.37 0.096 0.277 0 0.519-0.147 0.653-0.368l0.002-0.003 3.219-5.573c0.051-0.086 0.085-0.187 0.095-0.296l0-0.003 0.713-7.027c0.042-0.473 0.263-0.887 0.594-1.18l0.002-0.002c0.163-0.091 0.357-0.144 0.563-0.144 0.117 0 0.231 0.017 0.338 0.049l-0.008-0.002c0.035 0.106 0.072 0.244 0.101 0.384l0.005 0.026c0.089 0.396 0.164 0.882 0.209 1.377l0.003 0.047c0.121 1.152 0.184 2.402 0.199 3.935 0.004 0.334 0.014 0.669 0.025 1.003 0.019 0.299 0.029 0.648 0.029 1 0 0.635-0.035 1.263-0.102 1.88l0.007-0.076zM16.071 14.891c0.001 0 0.002 0 0.003 0 3.787 0 6.857-3.070 6.857-6.857s-3.069-6.856-6.854-6.857h-0.011c-3.786 0.002-6.854 3.071-6.854 6.857s3.070 6.857 6.857 6.857c0.001 0 0.002 0 0.003 0h-0zM11.312 10.443h1.692c0.226 0.964 0.587 1.813 1.067 2.581l-0.021-0.036c-1.198-0.506-2.151-1.397-2.724-2.515l-0.014-0.030zM10.713 8.033c0.002-0.361 0.039-0.713 0.109-1.052l-0.006 0.034 1.962 0.010c-0.031 0.33-0.075 0.646-0.075 1.008 0 0.327 0.042 0.61 0.068 0.91h-1.966c-0.054-0.271-0.087-0.585-0.092-0.906l-0-0.004zM17.583 5.548l-3.021-0.015c0.299-1.026 0.82-1.908 1.511-2.625l-0.002 0.002c0.691 0.72 1.213 1.606 1.5 2.594l0.011 0.044zM17.886 7.050c0.033 0.295 0.051 0.637 0.051 0.983v0c0 0.321-0.020 0.621-0.047 0.91h-3.639c-0.028-0.29-0.047-0.589-0.047-0.91 0-0.001 0-0.003 0-0.004 0-0.351 0.019-0.698 0.056-1.039l-0.004 0.042zM21.428 8.033c-0.005 0.325-0.038 0.639-0.097 0.944l0.005-0.034h-1.966c0.025-0.301 0.068-0.583 0.068-0.91 0-0.351-0.043-0.656-0.073-0.976l1.965 0.010c0.059 0.289 0.094 0.623 0.098 0.964l0 0.003zM14.538 10.443h3.066c-0.294 1.061-0.825 1.974-1.534 2.715l0.002-0.002c-0.708-0.738-1.239-1.652-1.523-2.668l-0.011-0.044zM18.091 12.989c0.459-0.732 0.819-1.582 1.034-2.488l0.012-0.057h1.692c-0.586 1.148-1.539 2.039-2.702 2.532l-0.035 0.013zM20.796 5.564l-1.675-0.008c-0.228-0.939-0.582-1.765-1.050-2.513l0.021 0.035c1.177 0.498 2.116 1.366 2.691 2.456l0.014 0.029zM14.050 3.078c-0.443 0.704-0.795 1.52-1.011 2.39l-0.012 0.058-1.657-0.008c0.591-1.098 1.52-1.949 2.646-2.427l0.035-0.013z"></path>
                        </g>
                    </svg>
                    <h2>ДоброТвір</h2>
                </li>
                <li style={{marginRight: "180px"}}>
                    <section data-tooltip-id="themesTooltip" data-tooltip-offset="15"
                             style={{alignItems: "center", marginRight: "50px"}}>
                        <svg style={{width: "30px"}} viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M7 8H21M7 12H21M7 16H21M3 8H3.01M3 12H3.01M3 16H3.01" stroke="#F8F8FF"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                        <p>Тематика</p>
                    </section>
                    <input className="input-field"
                           value={searchInput}
                           onChange={(e) => setSearchInput(e.target.value)}
                           type="text"
                           placeholder="Мене цікавить.."/>
                    <svg className="searchIcon" onClick={handleSearch} style={{
                        marginLeft: "-45px",
                        paddingLeft: "2px"
                    }} viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                    </svg>
                </li>
                {user ? <li>
                    <button data-tooltip-id="logoutTooltip" className="loginButton" data-tooltip-offset="15"
                            onClick={handleAccount}>Особистий
                        акаунт
                        <svg style={{height: "20px"}} viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="#F8F8FF">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <defs>
                                    <style>fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;</style>
                                </defs>
                                <circle className="cls-1" cx="12" cy="7.25" r="5.73"></circle>
                                <path className="cls-1"
                                      d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"></path>
                            </g>
                        </svg>
                    </button>
                </li> : <li>
                    <button className="loginButton" onClick={handleClick}>Увійти в акаунт
                        <svg style={{height: "20px"}} viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="#F8F8FF">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <defs>
                                    <style>fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;</style>
                                </defs>
                                <circle className="cls-1" cx="12" cy="7.25" r="5.73"></circle>
                                <path className="cls-1"
                                      d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"></path>
                            </g>
                        </svg>
                    </button>
                </li>}
            </ul>
            <Tooltip id="themesTooltip" clickable={true} place="bottom" noArrow={true}
                     style={{backgroundColor: "#404040", width: "160px", height: "260px"}}>
                <div className="themesItems">
                    <p onClick={() => handleCategoryClick('medicine')}>Медицина</p>
                    <p onClick={() => handleCategoryClick('education')}>Освіта</p>
                    <p onClick={() => handleCategoryClick('science')}>Наука</p>
                    <p onClick={() => handleCategoryClick('children')}>Діти</p>
                    <p onClick={() => handleCategoryClick('security')}>Безпека</p>
                    <p onClick={() => handleCategoryClick('environmental_protection')}>Захист довкілля</p>
                    <p onClick={() => handleCategoryClick('animals')}>Тварини</p>
                </div>
            </Tooltip>
            <Tooltip id="logoutTooltip" clickable={true} place="bottom" noArrow={true}
                     style={{backgroundColor: "#404040"}}
                     className="tooltip-custom">
                <div onClick={handleLogout} style={{cursor: 'pointer'}}>
                    Вийти з акаунту
                </div>
            </Tooltip>
        </div>
    );
}