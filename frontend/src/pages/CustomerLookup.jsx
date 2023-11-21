import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import {Navigate, useNavigate} from 'react-router-dom'

const CustomerLookup = () => {
    //const [customer, setCustomer] = useState([]);
    const [telephoneID, setTelephoneID] = useState('');
    //const [streetAddress, setStreetAddress] = useState('');
    //const [zipcodeID, setZipCodeID] = useState('');
    
    const url = `http://localhost:8080/customer/${telephoneID}/customerOrder`

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            console.log(telephoneID);
            const response = await Axios.get(url);
            const responseData = response.data;

            console.log("customer order(s) found:", response.data);
            console.log("customer order id = ", responseData[0].id.toString());
            console.log(responseData);

        }
        catch (error) {
            console.error('Error message: ', error)
        }
    };
    
    //useEffect(() => {
      //  handleSubmit();
    //},);

    return (
        <>
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h2>Customer Lookup</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-floating mb-3'>
                    <input
                    id="telephoneID"
                    name="telephoneID"
                    placeholder='Enter phone number'
                    value={telephoneID}
                    onChange={(event) => setTelephoneID(event.target.value)}
                    type='text'                     
                    /> 
                </div>
            <button type="submit">Enter</button>
            </form>
        </div>
        </div>
        </>
    );
}

export default CustomerLookup;