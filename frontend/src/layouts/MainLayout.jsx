import React from 'react';
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function MainLayout({children}) {

    return (
        // <div>
        //     <header>
        //         <nav className="navbar navbar-light bg-primary">
        //             <div className="container">
        //                 <Link to="/" className="navbar-brand">Main Menu</Link>
        //             </div>
        //             <div className="container">
        //                 <Link to="/login" className='navbar-brand'>Login</Link>
        //             </div>
        //             <div className="container">
        //                 <Link to="/logout" className='navbar-brand'>Employee LogOut</Link>
        //             </div>
        //             <div className="container">
        //                 <Link to="/customerlogout"
        //                 className='navbar-brand'>Place order with a new customer</Link>
        //             </div>
        //         </nav>
        //     </header>
        //     <main>
        //         <div className='container mt-3'>
        //             {children}
        //         </div>
        //         <ToastContainer/>
        //     </main>
            
        // </div>
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