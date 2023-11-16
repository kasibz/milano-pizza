import  { React, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout';
import Axios from 'axios';

const EmployeeLogin = () => {
    const [employeeID, setEmployeeID] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate();

    const url = 'http://localhost:8080/employee'

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.get(url);
            const employeeData = response.data;
            
            console.log("employeeID:", employeeID);
            console.log("password:", password);
            console.log(response);
            console.log(employeeData);
            // Check if employeeID matches id and password matches lastName
            // Need to use toString buddy, this data is an object form
            // const employeeIDconverted = employeeData.id.toString()

            const matchingEmployee = employeeData.find(employee => employee.id.toString() === employeeID)

            console.log("employeeData.id:", matchingEmployee);
            console.log("employeedata.lastname", matchingEmployee.lastName);

            if (matchingEmployee && matchingEmployee.lastName === password) {
                navigate('/signup');
            } else {
                console.error('Wrong ID or pwd you idiottt');
            }
        } catch (error) {
            console.error('Error fetching employee data', error);
        }
    };
    
    return (
        <>
        <MainLayout>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
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
                    <input type="submit" />
                </form>
                <div>
                    Need an Account?<br />
                    <div className="line">
                        <Link to="/signup" className=''>Sign up</Link>
                    </div>
                </div>
                </div>
            </div>
        </MainLayout>
        </>
    );
}

export default EmployeeLogin;
