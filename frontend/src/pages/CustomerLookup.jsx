import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MainLayout from '../layouts/MainLayout';
//import {Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios';


const CustomerLookup = () => {
<<<<<<< HEAD
    const [orderDetails, setOrderDetails] = useState([]);
    const [telephoneID, setTelephoneID] = useState([]);
    const [selectedTelephoneID, setSelectedTelephoneID] = useState("");
    
    const fetchTelephoneID = async() => {
        try {
            const response = await axios.get("http://localhost:8080/customer");
            console.log("telephone id", response.data);
            setTelephoneID(response.data);
=======
    const [telephoneID, setTelephoneID] = useState('');
    const [customer, setCustomer] = useState([]);
    const [customerOrderID, setCustomerOrderID] = useState('');
    const [customerOrders, setCustomerOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    var OrderID;

    const url = `http://localhost:8080/customer/${telephoneID}/customerOrder`

    const fetchCustomerOrders = async (event) => {
        event.preventDefault();

        try{
            //console.log(telephoneID);
            const response = await Axios.get(url);

            //console.log("customer order(s) found:", response.data);
            //console.log("customer order id = ", response.data[0].id.toString());
            //setCustomerOrderID(response.data[0].id);
            setCustomerOrders(response.data);
>>>>>>> ee16b166682e211e47322bc5452941e595e8dc69
        }
        catch (error){
            console.error('Error fetching telephone IDs', error);
        }

    };

<<<<<<< HEAD
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
=======
    const fetchCustomer = async (event) => {
        if(telephoneID)
        {
            const response = await Axios.get(`http://localhost:8080/customer/${telephoneID}`)
            setCustomer(response.data);
        }

    }
    useEffect(() => {
        fetchCustomer();
    }
        ,[]);

    const fetchOrderDetails = async (event) => {
        try{
            if(customerOrders)
            {
                const orderDetailsData = [];
                for(var x=0; x < customerOrders.length; x++)
                {
                    const response = await Axios.get(`http://localhost:8080/customerOrder/${customerOrders[x].id}/orderDetail`);
                    orderDetailsData.push(response.data);
                    console.log("Customer order: ", customerOrders[x].id," ", response.data)
                }
                setOrderDetails(orderDetailsData);
                console.log("Order details by customer order: ", orderDetails);
            }
        }
        catch (error){
            console.error('Error message: ', error)
        }
    };
    
    useEffect(() => {
        fetchOrderDetails();
        }
        ,[customerOrders]);

    return (
        <MainLayout>
        <>
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h2>Customer Lookup</h2>
            <form onSubmit={fetchCustomerOrders}>
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
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h2>Orders</h2>
            {customerOrders.map((order) => (
            <ul key= {order.id}>
                <h3>Customer Order {order.id}</h3>
                {orderDetails.map(orderList => {return(
                    orderList.filter(item=>item.customerOrderID === order.id).map((order, index) => {
                        return (
                            <li key={index}>
                                    Product: {order.productName} | Quantity: {order.quantity} | Price: ${order.subTotal.toFixed(2)}
                            </li>
                        )
                    })
                
                )})}
            </ul>
            ))}
        </div>
        </div>
        </>
        </MainLayout>
>>>>>>> ee16b166682e211e47322bc5452941e595e8dc69
    );
}

export default CustomerLookup; 