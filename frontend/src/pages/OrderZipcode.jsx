import MainLayout from "../layouts/MainLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import groupByWeek from "../helpers/groupByWeek";
import convertToHumanTime from "../helpers/convertToHumanTime";




function OrderZipcode() {

    let {zipcodeID} = useParams()

    const [orders, setOrders] = useState([])

    // this should change to get customerOrders
    useEffect(() => {
        axios.get(`http://localhost:8080/zipcode/${zipcodeID}/customerOrder`)
        .then(res => {
            console.log(res.data)
            // got week from here
            setOrders(groupByWeek(res.data))
        })
        .catch(err => {
            console.error('Error:', err)
        })
    }, [zipcodeID])

    if (!orders) {return (
        <MainLayout>
            <h2>No Entries Found</h2>
        </MainLayout>
    )}

    return (
        
        <MainLayout>
            <div>
                <h2>Orders by {zipcodeID}</h2>
                {
                Array.from(orders.entries()).map(([weekNum, weekList]) => (
                    <div key={weekNum}>
                        <h2>Week {weekNum}</h2>
                        {
                            weekList.map(item => (
                                <div key={item.id}>
                                    <Link to={`/orderbyzipcode/${zipcodeID}/orderDetail/${item.id}`}>
                                        <p>${item.totalPrice} - {convertToHumanTime(item.customerOrderDate)}</p>
                                    </Link>
                                    
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