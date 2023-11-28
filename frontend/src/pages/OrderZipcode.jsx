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
            // got week from here
            setOrders(groupByWeek(res.data))
        })
        .catch(err => {
            console.error('Error:', err)
        })
    }, [zipcodeID])

    if (orders.length < 1) {return (
        <MainLayout>
            <h2>No Entries Found for {zipcodeID}</h2>
        </MainLayout>
    )}

    return (
        
        <MainLayout>
            <div>
                <h2>Orders by {zipcodeID}</h2>
                {
                    Array.from(orders.entries()).map(([year, yearData]) => (
                            <div key={year} >
                                <p>
                                    <a className="btn btn-primary" data-bs-toggle="collapse" href="#yearCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                                        <h4>{year}</h4>
                                    </a>
                                </p>
                            {Object.entries(yearData).map(([weekNum, weekList]) => (
                                <div key={weekNum} id='yearCollapse'>
                                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                        {weekNum}
                                    </button>
                                {weekList.map(item => (
                                    <div key={item.id}>

                                    <div className="collapse" id="collapseExample">
                                    <div className="card card-body">
                                    <Link to={`/orderbyzipcode/${zipcodeID}/orderDetail/${item.id}`}>
                                    {convertToHumanTime(item.customerOrderDate)} Employee: {item.employeeFirstName} | Customer Telephone {item.telephoneID}
                                    </Link>
                                    </div>
                                </div>
                                    </div>
                                ))}
                                </div>
                            ))}
                            </div>
                        ))
                }
            </div>
        </MainLayout>
    );
}

export default OrderZipcode;