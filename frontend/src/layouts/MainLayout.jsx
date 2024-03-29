import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PizzaImage from "../images/pizzaicon.png";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  const [employee, setEmployee] = useState(false);

  useEffect(() => {
    let currentEmployee = JSON.parse(localStorage.getItem("loggedInEmployee"));
    setEmployee(currentEmployee);
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <br />
          {employee ? (
            <span>{`Logged in as: ${employee.firstName} ${employee.lastName}`}</span>
          ) : (
            <span>Employee login needed to create orders</span>
          )}
          <nav className="navbar navbar-expand-lg bg-light ">
            <nav className="navbar-brand ">
              <Link className="navbar-brand">
                <img className="icon-image" src={PizzaImage} alt="pizza" />
              </Link>
            </nav>
            <nav className="navbar-brand">
              <Link to="/">Main Menu</Link>
            </nav>
            <nav className="navbar-brand">
              <Link to="/editemployee">Edit Employee</Link>
            </nav>
            {/* {!employee && (
            <nav className="navbar-brand">
                <Link to="/login">Login</Link>
            </nav>
            )} */}
            <nav className="navbar-brand">
              <Link to="/logout">Employee LogOut</Link>
            </nav>
            <nav className="navbar-brand">
              <Link to="/customerlookup">Customers</Link>
            </nav>
            <nav className="navbar-brand">
              <Link to="/editcustomer">Edit Customers</Link>
            </nav>
            <nav className="navbar-brand">
              <Link to="/editproduct">Products</Link>
            </nav>
          </nav>
        </div>
      </header>
      <main>
        <div className="container mt-3">{children}</div>
        <ToastContainer />
      </main>
    </div>
  );
}

export default MainLayout;
