import {useEffect, useState} from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import convertToHumanTime from '../helpers/convertToHumanTime';
import groupByWeek from '../helpers/groupByWeek';

const EmployeeOrderDetail = () => {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [orders, setOrders] = useState([]);

    const fetchEmployees = async() => {
        const response = await axios.get("http://localhost:8080/employee")
        setEmployees(response.data);
        
    }
    
    useEffect(() => {
        fetchEmployees();
    },[]);

    const handleSelectChange = (event) => {
        setSelectedEmployee(event.target.value);
    };
    
    const fetchOrders = async() => {
        if (selectedEmployee) {
            const response = await axios.get(`http://localhost:8080/employee/${selectedEmployee}/customerOrder`);
            setOrders(groupByWeek(response.data));
        }
    }

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
                {
                Array.from(orders.entries()).map(([weekNum, weekList]) => (
                    <div key={weekNum}>
                        <h2>Week {weekNum}</h2>
                        {
                            weekList.map(order => (
                                <li key={order.id}>
                                <Link to={`/employeeorderdetail/orderDetail/${selectedEmployee}/${order.id}`}>
                                    Order ID: {order.id}| tele: {order.telephoneID}| Order Date: {convertToHumanTime(order.customerOrderDate)} | Employee Name: {order.employeeFirstName}
                                </Link>
                            </li>
                            ))
                        }
                    </div>
                ))
                }
                {/* {orders.map((order) => (
                    <li key={order.id}>
                        <Link to={`/employeeorderdetail/orderDetail/${selectedEmployee}/${order.id}`}>
                            Order ID: {order.id}| tele: {order.telephoneID}| Order Date: {convertToHumanTime(order.customerOrderDate)} | Employee Name: {order.employeeFirstName}
                        </Link>
                    </li>
                ))} */}
            </ul>
        </div>
        </MainLayout>
    );
}

export default EmployeeOrderDetail;
