import {useEffect, useState} from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from "axios";
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import getCurrentDate from '../helpers/getCurrentDate';
import convertTimeBackend from '../helpers/convertTimeBackend';

const POSPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setEmployeeID(JSON.parse(localStorage.getItem("loggedInEmployee")).id)
        setCustomerID(JSON.parse(localStorage.getItem("loggedInCustomer")).telephoneID);
        if (localStorage.getItem('loggedInEmployee') === null) {
        navigate('/login');

        }
    },[navigate]);
    
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [employeeID, setEmployeeID] = useState()
    const [customerID, setCustomerID] = useState()
    const [success, setSuccess] = useState(false)

    const fetchProducts = async() => {
        setIsLoading(true);
        
        const result = await axios.get("http://localhost:8080/product");
        setProducts(await result.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    },[]);

    const toastOptions = {
        autoClose: 400,
        pauseOnHover: true,
    }

    const addProductToCart = async(product) =>{
        // this console prints after the btn click
        // console.log(product); works fine but isn't adding to cart
        let findProductInCart = await cart.find(i=>{
            return i.id === product.id
        });

        if(findProductInCart){
            let newCart = [];
            let newItem;

            cart.forEach(cartItem => {
                if(cartItem.id === product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    newCart.push(newItem);
                }else {
                    newCart.push(cartItem);
                }
            })
            setCart(newCart);
            toast(`Added ${newItem.name} to cart`, toastOptions)

        }else{
            let addingProduct = {
                ...product,
                'quantity': 1,
                'totalAmount': product.price,
            }
            setCart([...cart, addingProduct])
            toast(`Added ${product.name} to cart`, toastOptions)

        }
    }

    const removeProduct = async(product) =>{
        const newCart = cart.filter(cartItem => cartItem.id !== product.id);
        setCart(newCart);
    }

    // this will handle submitting order 
    // post request to order
    // This is a nested api call to make the second call wait on the first
    const handleSubmit = () => {
        
        const url = "http://localhost:8080/customerOrder";
        const postData = {
          telephone_id: customerID,
          employee_id: employeeID,
        };
        let cartTotal = 0
        axios.post(url, postData)
        // in the response is when you call the second post request but it needs to loop through everything in the cart
        
        .then((response) => {cart.forEach((cartItem) => {
            let currDate = convertTimeBackend(getCurrentDate())
            cartTotal += cartItem.totalAmount * cartItem.discount // <- this goes into the next call for total 
            axios.post(`http://localhost:8080/customerOrder/${response.data.id}/orderDetail`, {
                "customerOrder_id": response.data.id,
                "product_id": cartItem.id,
                "orderDate": currDate,
                "quantity": cartItem.quantity,
                "discount": 0,
                "subTotal": cartItem.totalAmount
            })
            // call the 3rd api to edit the first customer order and add the total and current date
            .then((secondResponse) => {axios.post(`http://localhost:8080/customerOrder/${response.data.id}`, {
                    "customerOrderDate": currDate
                    // handle third response
                }).then((thirdResponse) => {
                    console.log(thirdResponse.data)
                    setSuccess(true)
                    setTimeout(() => {
                        navigate('/')
                    }, 1500)
                })
                // alert a good secondResponse?
                console.log(secondResponse.data)

            })
        })
            // Handle the success response from the first call
            // so this response is for the customerOrderID
            console.log('Response:', response.data);

          })
          .catch((error) => {
            // Handle the error from effectively both calls at this point
            console.error('Error:', error);
          });

    }

    const handleAddProduct = () => {
        navigate('/addProduct')
    }
    

    useEffect(() => {
        let newTotalAmount = 0;
        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseFloat(icart.price * icart.quantity);
        })
        setTotalAmount(newTotalAmount);
    },[cart])



    return (
        <MainLayout> 
            {
                    success && 
                    <div className="alert alert-success" role="alert">
                        Order Created!
                    </div>
                    
            }

            <div>
            <button onClick={handleAddProduct}>Add Product</button>
            </div>
            <div className='row'>
                <div className='col-lg-8'>
                    <div className='row'>
                    {products.map((product, key) => (
                        <div key={key} className='col-lg-4 mb-4'>
                            <div className='pos-item px-3 text-center border' 
                            onClick={() => addProductToCart(product)}>
                                <p>{product.name}</p>
                                <img className='img-fluid' 
                                src={product.image} alt={product.productID} 
                                style={{ height:'200px', width:'200px'}}/>
                                <p>${product.price}</p>
                            </div>
                        </div>  
                
                    ))}
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='table-responsive bg-dark'>
                        <table className='table table-responsive table-dark table-hover'>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Qty</td>
                                    <td>Total</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                            { cart ? cart.map((cartProduct, key) => 
                                <tr key={key}>
                                    <td>{cartProduct.id}</td>
                                    <td>{cartProduct.name}</td>
                                    <td>{cartProduct.price}</td>
                                    <td>{cartProduct.quantity}</td>
                                    <td>{cartProduct.totalAmount}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                                    </td>
                                    </tr>)
                                    : 'No Item in Cart'}
                            </tbody>
                        </table>
                        <h2 className='px-2 text-white'>Total Amount: ${totalAmount}</h2>
                    </div>

                    <div className='mt-3'>
                        <button className='btn btn-primary' onClick={handleSubmit}>
                            Submit Order
                        </button>
                    </div>

                </div>
                
            </div>
        </MainLayout>
    );
}

export default POSPage;


