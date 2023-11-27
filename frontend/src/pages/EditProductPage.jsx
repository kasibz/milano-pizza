import { useParams } from "react-router-dom";
import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import MainLayout from '../layouts/MainLayout';


function EditProductPage() {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

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
            await axios.put(`http://localhost:8080/product/${selectedProduct.id}`, {
              name: selectedProduct.name,
              price: selectedProduct.price,
              discount: selectedProduct.discount,
              // Add more fields as needed
            });
    
            // Refetch products after the update
            fetchProducts();
            setSelectedProduct(null); // Clear the selected product after updating
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

    return (
        <MainLayout>
            <h1>Product List</h1>
            <ul className="list-group">
            {products.map((product) => (
                <li className="list-group-item active" 
                aria-current='true' 
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
        
        </MainLayout>
    );
}

export default EditProductPage;