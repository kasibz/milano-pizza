import React, { useState } from 'react';



const EmployeeLogin = () => {
    const [employeeID, setEmployeeID] = useState('');
    const [password, setPassword] = useState('')    
    
    const handleSubmit = () => {
        e.preventDefault();
        console.log(employeeID)
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label for="employeeID">Employee ID</label>
            <input value={employeeID} onChange={(e) => setEmployeeID(e.target.value)}
            type="employeeID" placeholder="Employee ID" id="employeeID" name="employeeID" />
            
            <label for="password">password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="your first name and last name no space" id="password" name="password" />

            <button type="submit">Log In</button>
        </form>
        </>
    );
}

export default EmployeeLogin;
