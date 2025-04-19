import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextCart } from '../App';

const Cart = () => {
  const userId = localStorage.getItem('id');
  const [cart, setCart] = useState([]);
  const {setConCart}=useContext(ContextCart)
  useEffect(() => {
    if (!userId) return;
    axios.get(`https://package-0ar8.onrender.com/user/${userId}`)
      .then((res) => {
        setCart(res.data.cart)
      })
      .catch(err => console.error("Error fetching cart:", err));
  }, [userId])
  const remove = (idForDel) => {
    const filteredCart = cart.filter((elem) => elem.id !== idForDel);
    axios.patch(`https://package-0ar8.onrender.com/user/${userId}`, { cart: filteredCart })
      .then(() =>{
        setCart(filteredCart)
        setConCart(cart.length-1)
      })
      .catch(err => console.log("error:", err));
  };

  const prodQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );

    axios.patch(`https://package-0ar8.onrender.com/user/${userId}`, { cart: updatedCart })
      .then(() => setCart(updatedCart))
      .catch(err => console.log("error:", err));
  };
  const price = cart.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4 mb-4">
              <img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-md" />

              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>

    
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-bold text-red-500">₹{item.price * (item.quantity || 1)}</p>

                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-3 py-1 text-gray-700"
                      onClick={() => prodQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <p className="px-4 py-1 text-gray-800">{item.quantity || 1}</p>
                    <button
                      className="px-3 py-1 text-gray-700"
                      onClick={() => prodQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="mt-3 text-blue-500 text-sm hover:underline" onClick={() => remove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center border-b pb-4">
          <p className="text-xl font-semibold text-gray-800">Subtotal</p>
          <p className="text-xl font-bold text-red-500">₹{price}</p>
        </div>
      </div>


      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
            onClick={() => navigate(`/payment/null`, { state: { price } })}
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
