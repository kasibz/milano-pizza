import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderDetailDisplay from "../components/OrderDetailDisplay";


function OrderDetailZipcode() {

    const {customerOrderID} = useParams()

    const [orderDetail, setOrderDetail] = useState([])

      // Calculate the total sum of subTotals
      const totalSum = orderDetail.reduce((sum, item) => sum + item.subTotal - (item.discount / 100 * item.subTotal), 0);

    useEffect(() => {
        axios.get(`http://localhost:8080/customerOrder/${customerOrderID}/orderDetail`)
        .then(res => {
            setOrderDetail(res.data)
        })
        .catch(err => {
            console.error('Error:', err)
        })
    }, [])

    if(!orderDetail) {
        return (
            <MainLayout>
                <h2>Nothin in the cart!</h2>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div>
                Customer Order ID: {customerOrderID}
            </div>
            <OrderDetailDisplay orderDetails={orderDetail}/>
            <h4><strong>Total: ${totalSum.toFixed(2)}</strong></h4>
        </MainLayout>
    );
}

export default OrderDetailZipcode;