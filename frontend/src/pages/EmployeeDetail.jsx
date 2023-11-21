import {useEffect, useState} from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {

    const [employees, setEmployees] = useState([]);
    const [selectEmployee, setSelectEmployee] = useState("");
    
    const navigate = useNavigate();

    const fetchEmployee = async() => {
        const result = await axios.get("http://localhost:8080/employee")
        setEmployees(await result.data);
    }
    
    useEffect(() => {
        fetchEmployee();
    },[]);

    const handleSelectEmployee = () => {
        console.log("okay")
        // search through order_detail route
        // pull up all the order with the employee id 
        // then group the orders by customers and date
        // 
    }

    return (
        <MainLayout>
        <div>
            <h1>Employee List</h1>
            <label className='dropdown'>Select Employee</label>
            <div className='row'>
            <select id='employee' value={selectEmployee} onChange={handleSelectEmployee}>
                <option value="">Select...</option>
                {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                    ID: {employee.id} Name: {employee.firstName} 
                </option>
                ))}
            </select>
            </div>
        </div>
        </MainLayout>
    );
}

export default EmployeeDetail;
