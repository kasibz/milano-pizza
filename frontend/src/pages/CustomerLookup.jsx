import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import {Navigate, useNavigate} from 'react-router-dom'

const CustomerLookup = () => {
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
        }
        catch (error) {
            console.error('Error message: ', error)
        }
    };

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
        ,[]);

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
                                    Product: {order.productName} | Quantity: {order.quantity} | Price: {order.subTotal}
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
    );
}

export default CustomerLookup;