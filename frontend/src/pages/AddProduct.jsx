import { useState } from 'react';
import Axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import {useNavigate} from 'react-router-dom'

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const url = 'http://localhost:8080/product'

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await Axios.post(url, {
                name: name,
                price: price,
                image: image
            });
            console.log(name, price, image);
            console.log("product added", response.data);
            navigate('/pos')
        } catch (error) {
            console.error('Error message: Try again Suckaaaaaa', error)
        }
    };


    return (
        <>
        <MainLayout>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h2>Add a New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                            id="name"
                            name="name"
                            placeholder="Enter the name of the product"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            />
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                            id="price"
                            name="price"
                            placeholder="Enter the price of the product"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="float"
                            />
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            id="image"
                            name="image"
                            placeholder="Enter the image URL of the product"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            type="text"
                            />
                        </div>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </MainLayout>
        </>
    );
}

export default AddProduct;
