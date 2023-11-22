import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerLogOut = () => {
    
    const navigate = useNavigate();

    const handleYesclick = () => {
        localStorage.removeItem('loggedInCustomer')
        navigate('/')
    }

    return (
        <div>
            <h1>Would you like create a new order</h1>
            <h1>with a different customer?</h1>
                <button onClick={handleYesclick}>YES</button>
                <button onClick={() => navigate('/')}>NO</button>
        </div>
    );
}

export default CustomerLogOut;
