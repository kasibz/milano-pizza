import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MainLayout from '../layouts/MainLayout';
//import {Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios';

const CustomerLookup = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [telephoneID, setTelephoneID] = useState([]);
    const [selectedTelephoneID, setSelectedTelephoneID] = useState("");
    //const [searchTerm, setSearchTerm] = useState('');
    
    

    const fetchTelephoneID = async() => {
        try {
            const response = await axios.get("http://localhost:8080/customerOrder")
            setTelephoneID(response.data);
        }
        catch (error){
            console.error('Error fetching telephone IDs', error);
        }
    };

    useEffect(() => {
        fetchTelephoneID();
    }, []);

    // const handleSubmit = (event) => {
    //     setSelectedTelephoneID(event.target.value);
    // };

    // const handleSearch = () => {
    //     try{
    //         if(selectedTelephoneID) {
    //             const response = await axios.get(`http://localhost:8080/customer/${selectedTelephoneID}/customerOrder`);
    //             setOrderDetails(response.data);
    //         }
    //     }
    //     catch (error) {
    //             console.error('Error fetching order details', error);
    //        }
    // };
    const handleSearch = async () => {
        console.log('handle search called')
        try {
          // Perform search based on the searchTerm
          const filteredIDs = telephoneID.filter((id) =>
            id.toLowerCase().includes(selectedTelephoneID.toLowerCase())
          );
      
          // Update the UI with the filtered IDs
          setOrderDetails([]); // Clear the previous order details
          setSelectedTelephoneID('');
      
          if (filteredIDs.length > 0) {
            // If there are matches, fetch and display order details for each matching telephoneID
            const detailsPromises = filteredIDs.map((id) => fetchOrderDetails(id));
            const orderDetailsList = await Promise.all(detailsPromises);
      
            //Flatten the array of arrays
            const flattenedOrderDetails = orderDetailsList.flat();
      
            setOrderDetails(flattenedOrderDetails);
          } else {
            // Handle the case where there are no matches
            console.log('No matches found');
          }
        } catch (error) {
          console.error('Error handling search', error);
        }
      };

    const fetchOrderDetails = async (selectedTelephoneID) => {
    try {
        const response = await axios.get(
        `http://localhost:8080/customer/${customerID}/orderDetails`
        );
        setOrderDetails(response.data);
    } catch (error) {
        console.error('Error fetching order details', error);
    }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [selectedTelephoneID])

        // try{
        //     console.log(telephoneID);
        //     const response = await Axios.get(url);
        //     console.log("customer order(s) found:", response.data);
        //     if (response.data == telephoneID){


        //     }
        // }
        // catch (error) {
        //     console.error('Error message: ', error)
        // }
    
    
    //useEffect(() => {
      //  handleSubmit();
    //},);

    return (
        <MainLayout>
        <div>
            <h1>Customer Lookup</h1>
            <label>Select Telephone ID:</label>
            <input
                type="text"
                value={selectedTelephoneID}
                onChange={(e) => setSelectedTelephoneID(e.target.value)}
                placeholder="Enter Telephone ID..."
                />
            <button onClick={handleSearch}>Search</button>
            <h2>Order Details for {selectedTelephoneID}</h2>
            <ul>
                {orderDetails.map((order) => (
                <li key={order.id}>
                    Order ID: {order.id} | Telephone: {order.telephoneID} | Order Date: {order.customerOrderDate} | Product: {order.productName}
                </li>
                ))}
            </ul>
    </div>
    </MainLayout>
    );
}

export default CustomerLookup;