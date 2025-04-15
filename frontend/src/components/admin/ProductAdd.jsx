import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductAdd = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    gender: "",
  });
  useEffect(() => {
    if (userId !== "1683") {
      navigate("/error");
    }
  }, [userId, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/products", product)
      .then(() => {
        toast.success("Product added successfully!");
        navigate("/admin");
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Product</h2>
      <form onSubmit={submit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          >
            <option value="">Select Category</option>
            <option value="Clothes">Clothes</option>
            <option value="Caps">Caps</option>
            <option value="Toys">Toys</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Gender:</label>
          <select
            name="gender"
            value={product.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          >
            <option value="">Select Gender</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
