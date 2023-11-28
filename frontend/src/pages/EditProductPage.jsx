import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import MainLayout from '../layouts/MainLayout';
import {useNavigate} from 'react-router-dom';


function EditProductPage() {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async() => {
        const response = await axios.get("http://localhost:8080/product")
        setProducts(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        fetchProducts();
    },[]);
    
    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
      };
    
      const handleUpdateProduct = async () => {
        if (selectedProduct) {
          try {
            await axios.post(`http://localhost:8080/product/${selectedProduct.id}`, {
              name: selectedProduct.name,
              price: selectedProduct.price,
              discount: selectedProduct.discount,
              // Add more fields as needed
            });
    
            // Refetch products after the update
            fetchProducts();
            setSelectedProduct(null); // Clear the selected product after updating
            alert("Product Modified Successfully")
          } catch (error) {
            console.error('Error updating product:', error);
          }
        }
      };
    
      const handleNameChange = (event) => {
        setSelectedProduct({
          ...selectedProduct,
          name: event.target.value,
        });
      };
    
      const handlePriceChange = (event) => {
        setSelectedProduct({
          ...selectedProduct,
          price: event.target.value,
        });
      };
    
      const handleDiscountChange = (event) => {
        setSelectedProduct({
          ...selectedProduct,
          discount: event.target.value,
        });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const postUrl = 'http://localhost:8080/product'
            const response = await axios.post(postUrl, {
                name: name,
                price: price,
                image: image
            });
            console.log(name, price, image);
            console.log("product added", response.data);
            alert("Product added Successfully");

            setName('');
            setPrice('');
            setImage('');
        } catch (error) {
            console.error('Error message: Try again Suckaaaaaa', error)
        }
    };

    return (
        <MainLayout>
            <h1>Product List</h1>
            <ul className="list-group">
            {products.map((product) => (
                <li className="list-group-item " 
                key={product.id} 
                onClick={() => handleSelectProduct(product)}>
                    {product.name}
                </li>
                ))}
            </ul>
        <br />
        <br />
        <h1>Selected Product</h1>
        {selectedProduct ? (
          <div>
            <p>ID: {selectedProduct.id}</p>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              placeholder='Edit Name'
              value={selectedProduct.name}
              onChange={handleNameChange}
            />
            <br />
            <label htmlFor='price'>Price:</label>
            <input
              type='text'
              id='price'
              placeholder='Edit Price'
              value={selectedProduct.price}
              onChange={handlePriceChange}
            />
            <br />
            <label htmlFor='discount'>Discount:</label>
            <input
              type='text'
              id='discount'
              placeholder='Edit Discount'
              value={selectedProduct.discount}
              onChange={handleDiscountChange}
            />
            <br />
            <button onClick={handleUpdateProduct}>Update Product</button>
          </div>
        ) : (
          <p>No product selected</p>
        )}
        <br />
        <br />
        <div className="">
                <div className="shadow p-4 mt-4">
                <h2>Add a New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                            id="name"
                            name="name"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            />
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                            id="price"
                            name="price"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="float"
                            />
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            id="image"
                            name="image"
                            placeholder="Image URL of the product"
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
    );
}

export default EditProductPage;