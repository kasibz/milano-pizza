import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';

const HomePage = () => {
    const [telephoneID, setTelephoneID] = useState('');
    const [address, setAddress] = useState('');
    const [lookUpByZip, setLookUpByZip] = useState('');
    const [zip_code, setZip_Code] = useState('');
    
    const navigate = useNavigate();
    // if get is not none localStorage.setItem('loggedInEmployee', JSON.stringify(employeeData));
    const zipcodes = [55501, 55502, 55503, 55504]

    const handleZipCodeLookUp = (event) => {
        const selectedZipCode = event.target.value;
        setLookUpByZip(selectedZipCode);
        navigate(`/orderbyzipcode/${selectedZipCode}`);
    }

    const handleNewCustomer = async (event) => {
        event.preventDefault();

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

    // useEffect(() => {
    //     axios.get()
    // })

    
    // console.log(localStorage.getItem('loggedInEmployee'))
    
    return (
        <MainLayout>
            <div className='bg-light p-5 mt-4 rounded-3'>
                <h1>Welcome to Alyssa Milano's Pizzaria POS system</h1>
                <p></p>
                <Link to='/pos' className='btn btn-primary'>Click to start the POS system</Link><br /><br />
                <Link to='/employeeorderdetail' className='btn btn-primary'>Orders By Employee</Link><br /><br />
                <Link to='/customerlookup' className='btn btn-primary'>Lookup Customer</Link>
                <br /><br />
                {/* {
                    zipcodes.map((zipcodeID, idx) => {
                        return (
                        < Link key={idx} to={`/orderbyzipcode/${zipcodeID}`} className='btn btn-primary'>Orders By {zipcodeID}</Link>
                    )
                    })
                } */}
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
            <div className="offset-2 col-4">
                <div className="shadow p-4 mt-4">
                    <h2>New Customer</h2>
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
                        <input type="submit" />
                    </form>
                </div>
            </div>

        </MainLayout>
    
    );
}

export default HomePage;
