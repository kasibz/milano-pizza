import convertToHumanTime from '../helpers/convertToHumanTime';

function OrderDetailDisplay({orderDetails}) {

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
                        <td>${item.subTotal / item.quantity} </td>
                        <td>{item.discount} </td>
                        <td>{convertToHumanTime(item.orderDate)}</td>
                        {/* <p>{item.productName} | {item.quantity} * ${item.subTotal / item.quantity} | Discount: {item.discount} | {convertToHumanTime(item.orderDate)}</p> */}
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