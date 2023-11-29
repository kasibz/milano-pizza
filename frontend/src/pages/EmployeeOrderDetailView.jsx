import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import OrderDetailDisplay from "../components/OrderDetailDisplay";


function EmployeeOrderDetailView() {

    let {customerOrderID} = useParams()

    const [orderDetail, setOrderDetail] = useState([])
    const [telephoneID, setTelephoneID] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8080/customerOrder/${customerOrderID}/orderDetail`)
        .then(res => {
            setOrderDetail(res.data)
        })
        .catch(err => {
            console.error('Error:', err)
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/customerOrder/${customerOrderID}`)
        .then(res => {
            setTelephoneID(res.data[0].telephoneID)
        })
        .catch(err => {
            console.error('Error:', err)
        }) 
    }, [])

      // Calculate the total sum of subTotals
      const totalSum = orderDetail.reduce((sum, item) => sum + item.subTotal - (item.discount / 100 * item.subTotal), 0);

    return (
        <MainLayout>
            <OrderDetailDisplay orderDetails={orderDetail} telephoneID={telephoneID}/>
            <h4><strong>Total: ${totalSum.toFixed(2)}</strong></h4>
        </MainLayout>
    );
}

export default EmployeeOrderDetailView;