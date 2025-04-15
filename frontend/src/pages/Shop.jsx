import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Shop = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  useEffect(() => {
    const data = location.state?.value || "";
    console.log(data);
    axios.get(`http://localhost:5000/products`)
      .then((response) => 
        data ? 
        setProducts(response.data.filter((item) => item.gender.includes(data) || item.category.includes(data))) : 
        setProducts(response.data)
      )
      .catch((error) => console.error(error));
      setCurrentPage(1)
  }, [location]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mt-20">
        SHOP<span className="text-blue-500"> NOW</span>
      </h2>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-1/2"
        />
      </div>

      {currentProducts.length === 0 ? (
        <p className="text-xl text-gray-500 mt-4">No items found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-2.5">
          {currentProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="bg-white shadow-lg rounded-lg p-4 text-center transition-transform transform hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                <h2 className="text-lg font-semibold mt-2 text-purple-800">{product.name}</h2>
                <p className="text-gray-600">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2 mb-10">
          {(() => {
            let buttons = [];
            for (let i = 1; i <= totalPages; i++) {
              buttons.push(
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`px-4 py-2 rounded ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                >
                  {i}
                </button>
              );
            }
            return buttons;
          })()}
        </div>
      )}
    </div>
  );
};

export default Shop;
