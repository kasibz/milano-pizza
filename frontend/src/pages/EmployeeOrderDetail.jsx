import {useEffect, useState} from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EmployeeOrderDetail = () => {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [orders, setOrders] = useState([]);
    
    const navigate = useNavigate();

    const fetchEmployee = async() => {
        const response = await axios.get("http://localhost:8080/employee")
        setEmployees(response.data);
        console.log("response.data", response.data);
        
    }
    
    useEffect(() => {
        fetchEmployee();
    },[]);

    const handleSelectChange = (event) => {
        setSelectedEmployee(event.target.value);
    };
    
    const fetchOrders = async() => {
        if (selectedEmployee) {
            const response = await axios.get(`http://localhost:8080/employee/${selectedEmployee}/customerOrder`);
            setOrders(response.data);
        };
        
    }
// const response = await axios.get()
//         setOrders(response.data);
//         console.log("2nd response data", response.data);
//         console.log("selectedemployee", selectedEmployee);
    useEffect(() => {
        fetchOrders();
    }, [selectedEmployee]);

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
                {orders.map((order) => (
                    <li key={order.id}>
                        Order ID: {order.id}| tele: {order.telephoneID}| Total Price: {order.totalPrice} | Order Date: {order.customerOrderDate} | Employee Name: {order.employeeFirstName}
                    </li>
                ))}
            </ul>
        </div>
        </MainLayout>
    );
}

export default EmployeeOrderDetail;
