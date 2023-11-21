import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import convertToHumanTime from "../helpers/convertToHumanTime";


function OrderDetailZipcode() {

    const {customerOrderID} = useParams()
    const {zipcodeID} = useParams()

    const [orderDetail, setOrderDetail] = useState([])

      // Calculate the total sum of subTotals
    const totalSum = orderDetail.reduce((sum, item) => sum + item.subTotal + (item.discount * item.subTotal), 0);

    useEffect(() => {
        axios.get(`http://localhost:8080/customerOrder/${customerOrderID}/orderDetail`)
        .then(res => {
            setOrderDetail(res.data)
        })
        .catch(err => {
            console.error('Error:', err)
        })
    }, [])

    // need to make the get for the orderDetails

    return (
        <MainLayout>
            <div>
                This has the items in the cart for the customer Order {customerOrderID} that is also under {zipcodeID}
            </div>
            {
                orderDetail.map((item, idx) => {
                    return (
                        <div key={idx}>
                            <p>{item.productName} | {item.quantity} * {item.subTotal / item.quantity} | Discount: {item.discount} | {convertToHumanTime(item.orderDate)}</p>
                        </div>
                    )
                })
            }
        <p>Total: ${totalSum}</p>
        </MainLayout>

    );
}

export default OrderDetailZipcode;