import React from 'react';
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function MainLayout({children}) {
    const loggedInEmployee = JSON.parse(localStorage.getItem('loggedInEmployee'));

    const renderLoggedInEmployee = () => {
        if (loggedInEmployee) {
            return <nav className='navbar-brand'>Hello, {loggedInEmployee.firstName}</nav>;
        } return null;
    };

    return (
    <div>
    <header>
        <div className="container" style={{ backgroundColor: 'white'}}>
        <nav className="navbar navbar-expand-lg bg-light navbar-light" >
            <nav className="navbar-brand ">
                <Link className="navbar-brand">
                    <img className='icon-image'></img>
                </Link>
            </nav>
            <nav className="navbar-brand">
                <Link to="/">Main Menu</Link>
            </nav>
            <nav className="navbar-brand">
                <Link to="/login">Login</Link>
            </nav>
            <nav className="navbar-brand">
                <Link to="/logout">Employee LogOut</Link>
            </nav>
            <nav className="navbar-brand">
                <Link to="/customerlogout">Place order with a new customer</Link>
            </nav>
            {renderLoggedInEmployee()}
        </nav>
        </div>
    </header>
    <main>
        <div className='container mt-3'>
        {children}
        </div>
        <ToastContainer />
    </main>
    </div>
  );
}

export default MainLayout;
