import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';

const CustomerLookup = () => {
    const [customer, setCustomer] = useState([]);
    const [telephoneID, setTelephoneID] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [zipcodeID, setZipCodeID] = useState('');
    
    const url = 'http://localhost:8080/employee'

    const handleSubmit = () => {
        e.preventDefault();
        console.log(customerOrderID)
    }
    
    const fetchCustomers = async() => {
        setIsLoading(true);
        try {
            const result = await axios.get("http://localhost:8080/customer");
            setCustomers(await result.data);
        }
        catch (error){
            console.error('Error fetching data', error);
        }
        
        // const result = await axios.get("http://localhost:8080/customer");
        // setCustomers(await result.data);
        // setIsLoading(false);
    }

    useEffect(() => {
        fetchCustomers();
    },[]);



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
                    onChange={(e) => setTelephoneID(e.target.value)}
                    type='text'                     
                    /> 
                </div>
                <div className='form-floating mb-3'>
                    <input
                    id="streetAddress"
                    name="streetAddress"
                    placeholder='Enter Street Address'
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    type='text'                     
                    /> 
                </div>
                <div className="form-floating mb-3">
                    <input
                    id='zipcodeID'
                    name='zipcodeID'
                    placeholder='Enter zipcode'
                    value={zipcodeID}
                    onChange={(e) => setZipCodeID.apply(e.target.value)}
                    type='text'
                    />                    
                </div>
            <button type="enter">Enter</button>
            </form>
        </div>
        </div>
        
        </>
    );
}

export default CustomerLookup;