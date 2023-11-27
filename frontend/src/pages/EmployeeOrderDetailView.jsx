import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import convertToHumanTime from "../helpers/convertToHumanTime";


function EmployeeOrderDetailView() {

    let {customerOrderID} = useParams()
    let {employeeID} = useParams()

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/customerOrder/${customerOrderID}/orderDetail`)
        .then(res => {
            setOrderDetail(res.data)
        })
        .catch(err => {
            console.error('Error:', err)
        })
    }, [])

      // Calculate the total sum of subTotals
      const totalSum = orderDetail.reduce((sum, item) => sum + item.subTotal + (item.discount * item.subTotal), 0);

    return (
        <MainLayout>
            <div>
                This has the items in the cart for the customer Order {customerOrderID} that is also under employee {employeeID}
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
            <hr />
            <p>Total: ${totalSum}</p>
        </MainLayout>
    );
}

export default EmployeeOrderDetailView;