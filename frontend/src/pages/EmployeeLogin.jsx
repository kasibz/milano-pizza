import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Axios from "axios";

const EmployeeLogin = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [validEmployee, setValidEmployee] = useState(true);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const url = `http://localhost:8080/employee/${employeeID}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.get(url);
      const employeeData = response.data;
      if (!employeeData.status) {
        setValidEmployee(false);
        return;
      }
      if (
        employeeData.id.toString() === employeeID &&
        employeeData.lastName === password
      ) {
        // local storage
        // the loggedInEMployee is a key
        // it's not just a comment!!!!
        localStorage.setItem("loggedInEmployee", JSON.stringify(employeeData));
        navigate("/");
      } else {
        // you can put an alert here
        console.error("Wrong ID or pwd you idiottt");
      }
    } catch (error) {
      setValidEmployee(true);
      setError(error);
      console.error("Error fetching employee data", error);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="offset-3 col-6">
          <div className="bg-light p-4 mt-4">
            {!validEmployee ? (
              <div className="alert alert-danger" role="alert">
                This Employee exists but is Inactive!
              </div>
            ) : (
              <span></span>
            )}
            {error ? (
              <div className="alert alert-danger" role="alert">
                Error logging in: {error.message}
              </div>
            ) : (
              <span></span>
            )}

            <h2>Employee Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  id="employeeID"
                  name="employeeID"
                  placeholder="Enter Employee ID"
                  value={employeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  id="password"
                  name="password"
                  placeholder="Enter last name"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <input className="btn btn-primary" type="submit" />
            </form>
            <div>
              Need an Account?
              <br />
              <div className="line">
                <Link to="/signup" className="">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default EmployeeLogin;
