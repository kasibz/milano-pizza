import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MainLayout from '../layouts/MainLayout';
//import {Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios';


const CustomerLookup = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [telephoneID, setTelephoneID] = useState([]);
    const [selectedTelephoneID, setSelectedTelephoneID] = useState("");
    
    const fetchTelephoneID = async() => {
        try {
            const response = await axios.get("http://localhost:8080/customer");
            console.log("telephone id", response.data);
            setTelephoneID(response.data);
        }
        catch (error){
            console.error('Error fetching telephone IDs', error);
        }

    };

    useEffect(() => {
        fetchTelephoneID();
    }, []);

    const handleSearch = async () => {
        console.log('handle search called')
        try {
          // Perform search based on the searchTerm
          const filteredIDs = telephoneID.filter((id) =>
            id.includes(selectedTelephoneID)
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
        `http://localhost:8080/customer/${telephoneID}/customerOrder`
        );
        const responseData = response.data;
        const customerOrderID = responseData[0].id;
        console.log(responseData);
        const newResponse = await Axios.get(`http://localhost:8080/customerOrder/${customerOrderID}/orderDetail`);
        console.log("order details", newResponse.data);
        setOrderDetails(newResponse.data);
    } catch (error) {
        console.error('Error fetching order details', error);
    }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [selectedTelephoneID])

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