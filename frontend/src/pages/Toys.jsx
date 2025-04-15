import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Toys = () => {
const [products,setProducts] = useState([])
useEffect(()=>{
    axios.get("http://localhost:5000/products")
    .then((response)=>setProducts(response.data))
    .catch(error=>console.error("something worng",error))
})

const toys = products.filter((items)=>items.category=="Toys")
  return (
    <div className="text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mt-3">
                   Toys<span className="text-blue-500">  Collection</span>
               </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-2.5">
      {toys.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 text-center transition-transform transform hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2 text-purple-800">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
        </div>
      </div>
  )
}
export default Toys