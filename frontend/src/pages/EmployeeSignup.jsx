import { React, useState } from 'react';
import Axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import {useNavigate} from 'react-router-dom'


const EmployeeSignup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const url = 'http://localhost:8080/employee'

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await Axios.post(url, {
                firstName: firstName,
                lastName: lastName,
                status: true
            });
            let result = response.data
            console.log("employee created:", response.data);
            alert(`your log in id is ${result.id}`)
            //to reset the form fields
            navigate('/login')
        } catch (error) {
            console.error('Error message: ', error)
        }
    };

    return (
        <>
        <MainLayout>
            <div className="offset-3 col-6">
            <div className="bg-light p-4 mt-4">
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
                <input className='btn btn-primary' type="submit" />
            </form>
            </div>
            </div>
        </MainLayout>
        </>
    );
}

export default EmployeeSignup;
