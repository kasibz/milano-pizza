import { useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const HomePage = () => {
    
    const navigate = useNavigate();
    // if get is not none localStorage.setItem('loggedInEmployee', JSON.stringify(employeeData));

    useEffect(() => {
        if (localStorage.getItem('loggedInEmployee') === null) {
        navigate('/login');
        }
    },[navigate]);

    // console.log(localStorage.getItem('loggedInEmployee'))
    
    return (
        <MainLayout>
            <div className='bg-light p-5 mt-4 rounded-3'>
                <h1>Welcome to Alyssa Milano's Pizzaria POS system</h1>
                <p></p>
                <Link to='/pos' className='btn btn-primary'>Click to start the POS system</Link>
                <Link to='/pos' className='btn btn-primary'>Click to start the POS system</Link>
                <Link to='/pos' className='btn btn-primary'>Click to start the POS system</Link>
            </div>
        </MainLayout>
    );
}

export default HomePage;
