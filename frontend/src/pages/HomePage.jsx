import React from 'react';
import {Link} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const HomePage = () => {
    return (
        <MainLayout>
            <div className='bg-light p-5 mt-4 rounded-3'>
                <h1>Welcome to Alyssa Milano's Pizzaria POS system</h1>
                <p></p>
                <Link to='/pos' className='btn btn-primary'>Click to start the POS system</Link>
            </div>
        </MainLayout>
    );
}

export default HomePage;
