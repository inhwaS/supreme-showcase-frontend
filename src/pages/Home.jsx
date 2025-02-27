import React from 'react';
import { useState, useEffect } from "react";
import { fetchProducts, uploadImage } from "../services/api";
import ProductCard from "../components/ProductCard";

console.log('Home : ', process.env.REACT_APP_API_BASE_URL);


const Home = () => {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch products from the API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        console.log("Fetched products:", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  // Handle file input change
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    try {
      const response = await uploadImage(file);

      if (response.success) {
        console.log("Uploaded image URL:", response.imageUrl);
        setFile(null);
        // Refetch the products after upload
        const productsData = await fetchProducts();
        setProducts(productsData);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Upload & View Products</h1>

      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard id={product.id} imageUrl={product.url} likes={product.likes} />
        ))}
      </div>
    </div>
  );
};

export default Home;
