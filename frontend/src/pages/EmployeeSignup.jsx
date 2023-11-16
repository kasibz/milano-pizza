import { React, useState } from 'react';
import Axios from 'axios';


const EmployeeSignup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const url = 'http://localhost:8080/employee'

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await Axios.post(url, {
                firstName: firstName,
                lastName: lastName,
                status: true
            });

            console.log("employee created:", response.data);

            //to reset the form fields
            setFirstName('');
            setLastName('');
        } catch (error) {
            console.error('Error message: ', error)
        }
    };

    return (
        <>
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Employee Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                />
            </div>
            <div className="form-floating mb-3">
                <input 
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                />
            </div>
            <input type="submit" />
          </form>
        </div>
        </div>
        </>
    );
}

export default EmployeeSignup;
