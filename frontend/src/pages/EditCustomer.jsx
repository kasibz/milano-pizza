import {useEffect, useState} from 'react';
import axios from "axios";
import MainLayout from '../layouts/MainLayout';


const EditCustomer = () => {
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerDetail, setSelectedCustomerDetail] = useState(null);

    const fetchCustomers = async() => {
        const response = await axios.get("http://localhost:8080/customer")
        setCustomers(response.data);
    }

    useEffect(() => {
        fetchCustomers();
    },[]);

    const handleSelectChange = (event) => {
        setSelectedCustomer(event.target.value);
    };

    const fetchCustomerDetail = async () => {
        if (selectedCustomer) {
            const response = await axios.get(`http://localhost:8080/customer/${selectedCustomer}`);
            setSelectedCustomerDetail(response.data);
            console.log("selectedCustomerDetail", response.data);
        } else {
            setSelectedCustomerDetail(null);
        }
    }

    useEffect(() => {
        fetchCustomerDetail();
    }, [selectedCustomer])

    const handleUpdateCustomer = async () => {
        console.log(selectedCustomerDetail)
        await axios.post(`http://localhost:8080/customer/${selectedCustomer}`, {
            telephoneID: selectedCustomerDetail.telephoneID,
            streetAddress: selectedCustomerDetail.streetAddress,
            zipcode_id: Number(selectedCustomerDetail.zipcodeId),
            
        });
        // fetchCustomerDetail();
        alert("Customer edited Successfully");

        fetchCustomers();
        setSelectedCustomerDetail(null);
        setSelectedCustomer('');

    }

    const handleAddressChange = (event) => {
        setSelectedCustomerDetail({
            ...selectedCustomerDetail,
            streetAddress: event.target.value,
        });
    };

    const handleZipCodeChange = (event) => {
        setSelectedCustomerDetail({
            ...selectedCustomerDetail,
            zipcodeId: event.target.value,
        });
    };

 
    
    return (
        <MainLayout>
        <div>
        <h1>Customer List</h1>
            <label className='dropdown'>Select Customer to edit</label>
            <div className='row'>
            <select id='customer' value={selectedCustomer} onChange={handleSelectChange}>
                <option value="">Select...</option>
                {customers.map((customer) => (
                <option key={customer.telephoneID} value={customer.telephoneID}>
                    Telephone ID: {customer.telephoneID} 
                </option>
                ))}
            </select>
            </div>
        <br></br>
        <h1>Selected Customer</h1>
            {selectedCustomerDetail ? (
            <div>
                <p>Telephone Number: {selectedCustomerDetail.telephoneID}</p>
                <p>Address: {selectedCustomerDetail.streetAddress}</p>
                <label htmlFor='streetAddress'></label>
                <input
                    type='text' id='streetAddress' 
                    placeholder="Edit Address"
                    value={selectedCustomer.streetAddress}
                    onChange={handleAddressChange} />
                <br />
                <br />
                <p>Zip Code: {selectedCustomerDetail.zipcodeId}</p>
                <select
                    id='zipcodeId'
                    placeholder="Pick a Zipcode"
                    value={selectedCustomerDetail.zipcodeId}
                    onChange={handleZipCodeChange}> 
                        <option value="">Select...</option>
                        <option value="55501">55501</option>
                        <option value="55502">55502</option>
                        <option value="55503">55503</option>
                        <option value="55504">55504</option>
                </select>
                <br />
                <br />
                <br />
                <button onClick={handleUpdateCustomer}>Update Customer</button>
            </div>
            ) : (
            <p>No customer selected</p>
            )}
        </div>
        </MainLayout>
    );
}

export default EditCustomer;