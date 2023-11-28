import {useEffect, useState} from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from "axios";
import { Link } from 'react-router-dom';
import convertToHumanTime from '../helpers/convertToHumanTime';
import groupByWeek from '../helpers/groupByWeek';

const EmployeeOrderDetail = () => {

    //const [customer, setCustomer] = useState([]);
    const [telephoneID, setTelephoneID] = useState('');
    //const [streetAddress, setStreetAddress] = useState('');
    //const [zipcodeID, setZipCodeID] = useState('');
    
    const url = `http://localhost:8080/customer/${telephoneID}/customerOrder`

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            console.log(telephoneID);
            const response = await Axios.get(url);
            const responseData = response.data;

            console.log("customer order(s) found:", response.data);
            console.log("customer order id = ", responseData[0].id.toString());
            const customerOrderID = responseData[0].id;
            console.log(responseData);

            const newResponse = await Axios.get(`http://localhost:8080/customerOrder/${customerOrderID}/orderDetail`)
            console.log("order details found: ", newResponse.data);

        }
        catch (error) {
            console.error('Error message: ', error)
        }
    };
    
     //useEffect(() => {
       //  handleSubmit();
     //},);
















    //=======================alyssas code==============================
    // const [employees, setEmployees] = useState([]);
    // const [selectedEmployee, setSelectedEmployee] = useState("");
    // const [orders, setOrders] = useState([]);

    // const fetchEmployees = async() => {
    //     const response = await axios.get("http://localhost:8080/employee")
    //     setEmployees(response.data);
        
    // }
    
    // useEffect(() => {
    //     fetchEmployees();
    // },[]);

    // const handleSelectChange = (event) => {
    //     setSelectedEmployee(event.target.value);
    // };
    
    // const fetchOrders = async() => {
    //     if (selectedEmployee) {
    //         const response = await axios.get(`http://localhost:8080/employee/${selectedEmployee}/customerOrder`);
    //         console.log("the get request", response.data)
    //         setOrders(groupByWeek(response.data));
    //     }
    // }

    // useEffect(() => {
    //     fetchOrders();
    // }, [selectedEmployee]);

    return (
        <MainLayout>
        <div>
            <h1>Employee List</h1>
            <label className='dropdown'>Select Employee</label>
            <div className='row'>
            <select id='employee' value={selectedEmployee} onChange={handleSelectChange}>
                <option value="">Select...</option>
                {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                    ID: {employee.id} Name: {employee.firstName} 
                </option>
                ))}
            </select>
            </div>
        </div>
        <div>
            <h2>Orders Made By Selected Employee</h2>
            <ul>
            {
                Array.from(orders.entries()).map(([year, yearData]) => (
                    <div key={year} >
                        <p>
                            <a className="btn btn-primary" data-bs-toggle="collapse" href="#yearCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                                <h4>{year}</h4>
                            </a>
                        </p>
                    {Object.entries(yearData).map(([weekNum, weekList]) => (
                        <div key={weekNum} id='yearCollapse'>
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                {weekNum}
                            </button>
                        {weekList.map(order => (
                            <div key={order.id}>

                            <div className="collapse" id="collapseExample">
                            <div className="card card-body">
                            <Link to={`/employeeorderdetail/orderDetail/${selectedEmployee}/${order.id}`}>
                                Order ID: {order.id} | Tele: {order.telephoneID} | Order Date: {convertToHumanTime(order.customerOrderDate)} | Employee Name: {order.employeeFirstName}
                            </Link>
                            </div>
                        </div>
                            </div>
                        ))}
                        </div>
                    ))}
                    </div>
                ))
            }
            </ul>
        </div>
        </MainLayout>
    );
}

export default EmployeeOrderDetail;
