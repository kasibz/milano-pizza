import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';
import '../css/HomePage.css';
import alyssa from "../assets/alyssa.png"

const HomePage = () => {
    const [telephoneID, setTelephoneID] = useState('');
    const [address, setAddress] = useState('');
    const [lookUpByZip, setLookUpByZip] = useState('');
    const [zip_code, setZip_Code] = useState('');
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([])
    const [customerLookupSuccess, setCustomerLookupSuccess] = useState(false)

    
    const navigate = useNavigate();
    const zipcodes = [55501, 55502, 55503, 55504]

    const handleZipCodeLookUp = (event) => {
        const selectedZipCode = event.target.value;
        setLookUpByZip(selectedZipCode);
        navigate(`/orderbyzipcode/${selectedZipCode}`);
    }

    useEffect(() => {
        try {
            axios.get(`http://localhost:8080/product`)
            .then(res => {
                setProducts(res.data)
            })
        } catch {
            alert("issue")
        }

    }, [])

    const handleNewCustomer = async (event) => {
        event.preventDefault();

        // check to see if the given customer telephone exists in state. If it exists go to POS and set in localStorage, alert employee
        if (customers.includes(Number(telephoneID))) {
            setCustomerLookupSuccess(true)
            const url = `http://localhost:8080/customer/${telephoneID}`
            const response = await axios.get(url)
            const existingCustomer = response.data;
            localStorage.setItem("loggedInCustomer", JSON.stringify(existingCustomer))
            setTimeout(() => {
                navigate('/pos')
            }, 1500)
            return
        }
        try {
            const url = "http://localhost:8080/customer"
            const response = await axios.post(url, {
                telephoneID: telephoneID,
                streetAddress: address,
                zipcode_id: zip_code
            });
            const customerData = response.data;
            localStorage.setItem('loggedInCustomer', JSON.stringify(customerData));
            console.log(response.data);
            if (customerData) {
                navigate('/pos');
            }
        } catch (error) {
            console.error('Error message: watchh: ', error)
        }
    };


    useEffect(() => {
        if (localStorage.getItem('loggedInEmployee') === null) {
        navigate('/login');
        }
    },[navigate]);

    // get all customers and map them to just their telephone numbers
    useEffect(() => {
        axios.get("http://localhost:8080/customer")
        .then((res) => {
            setCustomers(res.data.map(customer => {
                return(
                    customer.telephoneID
                )
            }))
        })
    },[])



    return (
        <MainLayout>
            {
                customerLookupSuccess &&
                <div className="alert alert-success" role="alert">
                    Customer found! Starting order...
                </div>
            }
            <div className='bg-light p-5 mt-4 rounded-3'>
                <h1>Welcome to Alyssa Milano&apos;s Pizzaria POS system</h1>
                    <hr />
                    <div className='bg-light-sub'>

                        <div>
                            <h2>Enter Customer Information</h2>
                            <form onSubmit={handleNewCustomer}>
                                <div className="form-floating mb-3">
                                    <input
                                    id="telephoneID"
                                    name="telephoneID"
                                    placeholder="Enter Phone Number"
                                    value={telephoneID}
                                    onChange={(e) => setTelephoneID(e.target.value)}
                                    type="text"
                                    />
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                    id="address"
                                    name="address"
                                    placeholder="Enter address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    />
                                </div>
                                <label className='dropdown'>Select Zip Code</label>
                               
                                    <select 
                                    id='zip_code' 
                                    value={zip_code} 
                                    onChange={(e) => setZip_Code(e.target.value)}
                                    type="text"
                                    >
                                    <option value="">Select...</option>
                                    {zipcodes.map((zipcode) => (
                                        <option key={zipcode} value={zipcode}>
                                            {zipcode}
                                        </option>
                                    ))}
                                    </select>
                                    <br></br>
                                <input className="btn btn-primary" type="submit" />
                            </form>
                        </div>
                        <div>
                            <p></p>
                            {/* <Link to='/pos' className='btn btn-primary'>Click to start the POS system</Link><br /><br /> */}
                            <Link to='/employeeorderdetail' className='btn btn-primary'>Orders By Employee</Link>
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Price History
                                </button>
                                <div className="dropdown-menu">
                                    {
                                        products.map((product, idx) => {
                                            return (
                                                <Link key={idx} className="dropdown-item" to={`/pricehistory/${product.id}`}>{product.name}</Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <br /><br />

                            <label className='dropdown'>View Orders by ZipCode</label>
                            <select 
                                id='lookUpByZip' 
                                value={lookUpByZip} 
                                onChange={handleZipCodeLookUp}
                                type="text"
                                >
                            <option value="">Select...</option>
                            {zipcodes.map((zipcodeID, idx) => (
                                <option key={idx} value={zipcodeID}>
                                Orders By {zipcodeID}
                                </option>
                            ))}
                            </select>
                        </div>
                    </div>
            </div>
            <div className='bg-light p-5 mt-d rounded-3'>
                <img src={alyssa}></img>
            </div>

        </MainLayout>
    
    );
}

export default HomePage;
