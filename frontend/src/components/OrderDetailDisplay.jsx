import { useEffect, useState } from 'react';
import convertToHumanTime from '../helpers/convertToHumanTime';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';

function OrderDetailDisplay({orderDetails}) {

    const [telephoneID, setTelephoneID] = useState()
    // show the phone number

    useEffect(() => {
        axios.get(`http://localhost:8080/customer/1000/customerOrder`)
    }, [])
    
    if(!orderDetails) {
        return (
            <MainLayout>
                <h2>Nothin in the cart!</h2>
            </MainLayout>
        )
    }

    return (
        <> 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Discount</th>
                        <th scope="col">SubTotal</th>
                        <th scope="col">Date/Time</th>
                    </tr>
                </thead>
                <tbody>

                
        {
            orderDetails.map((item, idx) => {
                return (
                    
                    <tr key={idx}>
                        <th scope="row">{item.id}</th>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.subTotal / item.quantity).toFixed(2)} </td>
                        <td>{item.discount}% </td>
                        <td>${(item.subTotal - (item.subTotal * item.discount / 100)).toFixed(2)} </td>
                        <td>{convertToHumanTime(item.orderDate)}</td>
                    </tr>
                )
            })

        }
            </tbody>
            </table>
        </>


        
    );
}

export default OrderDetailDisplay;