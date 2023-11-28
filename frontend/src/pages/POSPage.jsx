import {useEffect, useState} from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from "axios";
import {toast} from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
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
        axios.post(url, postData)
        // in the response is when you call the second post request but it needs to loop through everything in the cart
        
        .then((response) => {cart.forEach((cartItem) => {
            let currDate = convertTimeBackend(getCurrentDate())
            axios.post(`http://localhost:8080/customerOrder/${response.data.id}/orderDetail`, {
                "customerOrder_id": response.data.id,
                "product_id": cartItem.id,
                "orderDate": currDate,
                "quantity": cartItem.quantity,
                "discount": cartItem.discount,
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
            // I'll calculate total here
            newTotalAmount = newTotalAmount + parseFloat((icart.price - (icart.price * icart.discount / 100)) * icart.quantity);
        })
        setTotalAmount(newTotalAmount);
    },[cart])

    const loggedInCustomer = JSON.parse(localStorage.getItem('loggedInCustomer'));

    const renderLoggedInCustomer = () => {
        if (loggedInCustomer) {
            return <span className='bg-light-head'>Customer #: {loggedInCustomer.telephoneID}</span>;
        } return null;
    };

    return (
        <MainLayout> 
            {
                success && 
                <div className="alert alert-success" role="alert">
                    Order Created!
                </div>
                    
            }
            <h2>
                {renderLoggedInCustomer()}
            </h2>
            <div>
            <button className='btn btn-primary' onClick={handleAddProduct}>Add Product</button>
            <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Edit Product
                </button>
                <div className="dropdown-menu">
                    {
                        products.map((product, idx) => {
                            return (
                                <Link key={idx} className="dropdown-item" to={`/editproduct/${product.id}`}>{product.name}</Link>
                            )
                        })
                    }
                </div>
            </div>
            
            </div>
            <div className='row'>
                <div className='col-lg-8'>
                    <div className='row'>
                    {products.map((product, key) => (

                        <div key={key} className='col-lg-4 mb-4'>
                            <div className='pos-item px-3 text-center' 
                            onClick={() => addProductToCart(product)}>
                                <p>{product.name} 

                                </p>
                                <img className='img-fluid' 
                                src={product.image} alt={product.productID} 
                                style={{ height:'200px', width:'200px'}}/>
                                <p><strong>${product.price.toFixed(2)}</strong></p>
                                {
                                    product.discount > 0 
                                    ? <span className="badge bg-success">{product.discount}% Discount!</span> 
                                    : <span></span>
                                }
                            </div>
                        </div>  
                
                    ))}
                    </div>
                </div>
                <div className='col-lg-4-cart'>
                    <div className='table-responsive bg-dark'>
                        <table className='table table-responsive table-dark table-hover'>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Qty</td>
                                    <td>Discount</td>
                                    <td>Total</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                            { cart ? cart.map((cartProduct, key) => 
                                <tr key={key}>
                                    <td>{cartProduct.id}</td>
                                    <td>{cartProduct.name}</td>
                                    <td>${cartProduct.price.toFixed(2)}</td>
                                    <td>{cartProduct.quantity}</td>
                                    <td>{cartProduct.discount}%</td>
                                    <td>${((cartProduct.totalAmount) - (cartProduct.totalAmount * (cartProduct.discount / 100))).toFixed(2)}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                                    </td>
                                    </tr>)
                                    : 'No Item in Cart'}
                            </tbody>
                        </table>
                        <h2 className='px-2 text-white'>Total Amount: ${totalAmount.toFixed(2)}</h2>
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


