import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductHistoryTable from "../components/ProductHistoryTable";


function ProductPriceHistory() {

    let {productID} = useParams()

    const [orderDetails, setOrderDetails] = useState()

    useEffect(() => {
        try {
            axios.get(`http://localhost:8080/product/${productID}/orderDetail`)
            .then(res => {
                setOrderDetails(res.data)
            })
        } catch {
            console.error('issue getting the product')
        }

    }, [productID])

    if(orderDetails){
        return (
            <MainLayout>
                <ProductHistoryTable orderDetails={orderDetails}/>
            </MainLayout>
        );
    } else {
        return (
            <MainLayout>
                No Orders Made with this product
            </MainLayout>
        )
    }

}

export default ProductPriceHistory;