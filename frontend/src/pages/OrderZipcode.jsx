import MainLayout from "../layouts/MainLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import groupByWeek from "../helpers/groupByWeek";
import convertToHumanTime from "../helpers/convertToHumanTime";




function OrderZipcode() {

    let {zipcodeID} = useParams()

    const [orders, setOrders] = useState([])

    // this should change to get customerOrders
    useEffect(() => {
        axios.get(`http://localhost:8080/zipcode/${zipcodeID}/orderDetail`)
        .then(res => {
            setOrders(res.data)
            console.log(res.data)
            // got week from here
            setOrders(groupByWeek(res.data))
        })
        .catch(err => {
            console.error('Error:', err)
        })
    }, [zipcodeID])

    return (
        
        <MainLayout>
            {console.log(orders)}
            <div>
                {
                Array.from(orders.entries()).map(([weekNum, weekList]) => (
                    <div key={weekNum}>
                        <h2>Week {weekNum}</h2>
                        {
                            weekList.map(item => (
                                <div key={item.id}>
                                    <p>${item.subTotal * item.discount} - {convertToHumanTime(item.orderDate)}</p>
                                </div>
                            ))
                        }
                    </div>
                ))
                }
                Hi its the zipcode page
                
            </div>
        </MainLayout>
    );
}

export default OrderZipcode;