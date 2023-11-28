import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function MainLayout({children}) {
    // const loggedInEmployee = JSON.parse(localStorage.getItem('loggedInEmployee'));

    // const renderLoggedInEmployee = () => {
    //     if (loggedInEmployee) {
    //         return <nav className='navbar-brand'>Hello, {loggedInEmployee.firstName}</nav>;
    //     } return null;
    // };

    const [employee, setEmployee] = useState(false)

    useEffect(() => {
        let currentEmployee = JSON.parse(localStorage.getItem("loggedInEmployee"))
        setEmployee(currentEmployee)
    }, [])

    return (
    <div>
    <header>
        <div className="container"><br />
            {employee ?  "Logged in as: " + employee.firstName + " " + employee.lastName : "Employee login needed to create orders"}
        <nav className="navbar navbar-expand-lg bg-light " >
            <nav className="navbar-brand ">
                <Link className="navbar-brand">
                    <img className='icon-image'></img>
                </Link>
            </nav>
            <nav className="navbar-brand">
                <Link to="/">Main Menu</Link>
            </nav>
            <nav className="navbar-brand">
                <Link to="/editemployee">Edit Employee</Link>
            </nav>
            <nav className="navbar-brand">
                <Link to="/login">Login</Link>
            </nav>
            <nav className="navbar-brand">
                <Link to="/logout">Employee LogOut</Link>
            </nav>
            {/* <nav className="navbar-brand">
                <Link to="/customerlogout">Place order with a new customer</Link>
            </nav> */}
            <nav className="navbar-brand">
                <Link to="/customerlookup">Customers</Link>
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
