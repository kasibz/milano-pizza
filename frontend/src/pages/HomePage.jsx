import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';

const HomePage = () => {
    
    const navigate = useNavigate();
    // if get is not none localStorage.setItem('loggedInEmployee', JSON.stringify(employeeData));
    const zipcodes = [55501, 55502, 55503, 55504]

    useEffect(() => {
        if (localStorage.getItem('loggedInEmployee') === null) {
        navigate('/login');
        }
    },[navigate]);

    useEffect(() => {
        axios.get()
    })

    

    // console.log(localStorage.getItem('loggedInEmployee'))
    
    return (
        <MainLayout>
            <div className='bg-light p-5 mt-4 rounded-3'>
                <h1>Welcome to Alyssa Milano's Pizzaria POS system</h1>
                <p></p>
                <Link to='/pos' className='btn btn-primary'>Click to start the POS system</Link>
                <Link to='/pos' className='btn btn-primary'>Orders By Employee</Link>
                <br /><br />
                {
                    zipcodes.map((zipcodeID, idx) => {
                        return (
                        < Link key={idx} to={`/orderbyzipcode/${zipcodeID}`} className='btn btn-primary'>Orders By {zipcodeID}</Link>
                    )
                    })
                }
            </div>
        </MainLayout>
    
    );
}

export default HomePage;
