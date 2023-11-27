import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import OrderDetailDisplay from "../components/OrderDetailDisplay";


function EmployeeOrderDetailView() {

    let {customerOrderID} = useParams()

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
      const totalSum = orderDetail.reduce((sum, item) => sum + item.subTotal - (item.discount / 100 * item.subTotal), 0);

    return (
        <MainLayout>
            <div>
                Customer Order ID: {customerOrderID}
            </div><hr />
            <OrderDetailDisplay orderDetails={orderDetail}/>
            <h4><strong>Total: ${totalSum.toFixed(2)}</strong></h4>
        </MainLayout>
    );
}

export default EmployeeOrderDetailView;