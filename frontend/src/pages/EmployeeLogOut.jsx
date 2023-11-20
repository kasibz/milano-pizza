import React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeLogOut = () => {

    const navigate = useNavigate()

    const handleYesClick = () => {
        localStorage.clear('loggedInEmployee')
        navigate('/login')
    } 
    
    return (
        <div>
            <h1>Are you sure you want to log out?</h1>
                <button onClick={handleYesClick}>YES</button>
                <button onClick={() => navigate('/')}>NO</button>
        </div>
    );
}

export default EmployeeLogOut;


