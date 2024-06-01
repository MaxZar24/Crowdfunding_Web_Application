import {Route, BrowserRouter as Router} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import AboutUs from './pages/AdditionalPages/AboutUs';
import Terms from './pages/AdditionalPages/Terms';
import Collections from './pages/CollectionsPage/Collections';
import Account from './pages/AccountPage/AccountPage';
import LoginPage from './pages/AuthentificationPages/LoginPage';
import RegisterPage from './pages/AuthentificationPages/RegisterPage';
import CreatingFundPage from './pages/CreatingFundPage/CreatingFundPage';
import FundDetailsPage from './pages/FundDetailsPage/FundDetailsPage';
import ScrollToTop from './components/ScrollToTop';
import {Provider} from 'react-redux';
import store from './redux/store';

import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/account-info/:email?" element={<Account/>}/>
                    <Route path="/collections" element={<Collections/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/create-fund" element={<CreatingFundPage/>}/>
                    <Route path="/details-fund/:id" element={<FundDetailsPage/>}/>
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;