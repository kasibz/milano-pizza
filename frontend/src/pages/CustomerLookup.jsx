import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import {useNavigate} from 'react-router-dom'

const CustomerLookup = () => {
    const [customers, setCustomers] = useState([]);
    const [telephoneID, setTelephoneID] = useState('');
    //const [streetAddress, setStreetAddress] = useState('');
    //const [zipcodeID, setZipCodeID] = useState('');
    
    const navigate = useNavigate()
    // const url = `http://localhost:8080/customer/${telephoneID}/customerOrder`

    const fetchCustomers = async() => {
        const response = await Axios.get("http://localhost:8080/customer")
        setCustomers(response.data);
    }

    useEffect(() => {
        fetchCustomers();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (customers.includes(Number(telephoneID))) {
            const url = `http://localhost:8080/customer/${telephoneID}`
            const response = await Axios.get(url)
            // const existingCustomer = response.data;
            // localStorage.setItem("loggedInCustomer", JSON.stringify(existingCustomer))
            navigate(`http://localhost:8080/customer/${telephoneID}/customerOrder`)
            return
        }
        // try{
        //     console.log(telephoneID);
        //     const response = await Axios.get(url);
        //     const responseData = response.data;

        //     console.log("customer order(s) found:", response.data);
        //     console.log("customer order id = ", responseData[0].id.toString());
        //     const customerOrderID = responseData[0].id;
        //     console.log(responseData);

        //     const newResponse = await Axios.get(`http://localhost:8080/customerOrder/${customerOrderID}/orderDetail`)
        //     console.log("order details found: ", newResponse.data);
            


        // }
        // catch (error) {
        //     console.error('Error message: ', error)
        // }
    };
    
    //useEffect(() => {
      //  handleSubmit();
    //},);

    return (
        <>
        <MainLayout>
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
        </MainLayout>
        </>
    );
}

export default CustomerLookup;