import React from 'react';
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
            <div className='d-flex p-3 bg-primary'>
                <button className="btn btn-secondary"onClick={handleYesClick}>YES</button>

                <button className='btn btn-secondary' onClick={() => navigate('/')}>NO</button>
            </div>
        </div>
    );
}

export default EmployeeLogOut;


