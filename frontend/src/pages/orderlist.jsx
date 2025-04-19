import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`https://package-0ar8.onrender.com/user/${userId}`)
      .then((response) => {
        setOrders(response.data.orders || []);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userId]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Your Order History
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Total Price</th>
                <th className="px-4 py-2 border-b">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                // If order.item is an array, calculate total price
                const totalPrice = Array.isArray(order.item)
                  ? order.item.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0)
                  : order.item.price * (order.item.quantity || 1);

                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-center font-semibold">
                      890{index}
                    </td>
                    <td className="px-4 py-2 text-center font-semibold text-green-600">
                      ₹{totalPrice}
                    </td>
                    <td className="px-4 py-2">
                      {Array.isArray(order.item) ? (
                        order.item.map((product) => (
                          <div key={product.id} className="flex items-center space-x-4 py-2">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg shadow"
                            />
                            <div>
                              <p className="font-semibold text-gray-800">{product.name}</p>
                              
                              <p className="text-sm text-gray-600">₹{product.price} 
                                <br />
                              Quantity:  {product.quantity || 1}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center space-x-4 py-2">
                          <img
                            src={order.item.image}
                            alt={order.item.name}
                            className="w-16 h-16 object-cover rounded-lg shadow"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">{order.item.name}</p>
                            <p className="text-sm text-gray-600">₹{order.item.price} 
                              <br />Quantity: {order.item.quantity || 1}</p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
