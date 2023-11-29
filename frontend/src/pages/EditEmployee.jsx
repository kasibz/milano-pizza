import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import MainLayout from '../layouts/MainLayout';

const EditEmployee = () => {
    
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeDetail, setSelectedEmployeeDetail] = useState(null);


    const fetchEmployees = async() => {
        const response = await axios.get("http://localhost:8080/employee")
        setEmployees(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        fetchEmployees();
    },[]);

    const handleSelectChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    const fetchEmployeeDetail = async () => {
        if (selectedEmployee) {
            const response = await axios.get(`http://localhost:8080/employee/${selectedEmployee}`);
            setSelectedEmployeeDetail(response.data);
            console.log("selectedEmployeeDetail", response.data);
        } else {
            setSelectedEmployeeDetail(null);
        }
    }

    useEffect(() => {
        fetchEmployeeDetail();
    }, [selectedEmployee])

    const handleUpdateEmployee = async () => {
        await axios.post(`http://localhost:8080/employee/${selectedEmployee}`, {
            firstName: selectedEmployeeDetail.firstName,
            lastName: selectedEmployeeDetail.lastName,
            status: selectedEmployeeDetail.status
        });
        fetchEmployeeDetail();
        alert("Employee edited Successfully");

        fetchEmployees();
        setSelectedEmployeeDetail(null);
        setSelectedEmployee('');

    }

    const handleFirstNameChange = (event) => {
        setSelectedEmployeeDetail({
            ...selectedEmployeeDetail,
            firstName: event.target.value,
        });
    };

    const handleLastNameChange = (event) => {
        setSelectedEmployeeDetail({
            ...selectedEmployeeDetail,
            lastName: event.target.value,
        });
    };

    const handleStatusChange = (event) => {
        setSelectedEmployeeDetail({
            ...selectedEmployeeDetail,
            status: !selectedEmployeeDetail.status,
        });
    };    


    return (
        <MainLayout>
        <div>
        <h1>Employee List</h1>
            <label className='dropdown'>Select Employee to edit</label>
            <div className='row'>
            <select id='employee' value={selectedEmployee} onChange={handleSelectChange}>
                <option value="">Select...</option>
                {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                    ID: {employee.id} Name: {employee.firstName} Status: {employee.status ? "Active" : "Inactive"}
                </option>
                ))}
            </select>
            </div>
        <br></br>
        <h1>Selected Employee</h1>
            {selectedEmployeeDetail ? (
            <div>
                <p>ID: {selectedEmployeeDetail.id}</p>
                <p>First Name: {selectedEmployeeDetail.firstName}</p>
                <label htmlFor='firstName'></label>
                <input
                    type='text' id='firstName' 
                    placeholder="Edit First Name"
                    value={selectedEmployee.firstName}
                    onChange={handleFirstNameChange} />
                <br />
                <br />
                <p>Last Name: {selectedEmployeeDetail.lastName}</p>
                <input
                    type='text' id='lastName'
                    placeholder="Edit Last Name"
                    value={selectedEmployee.lastName}
                    onChange={handleLastNameChange} />
                <br />
                <br />
                <p>Status: {selectedEmployeeDetail.status}</p>
                <input
                    type='checkbox' id='status'
                    checked={selectedEmployeeDetail.status}
                    onChange={handleStatusChange} /> Active
                <br />
                <button onClick={handleUpdateEmployee}>Update Employee</button>
            </div>
            ) : (
            <p>No employee selected</p>
            )}
        </div>
        </MainLayout>
    );
}

export default EditEmployee;
