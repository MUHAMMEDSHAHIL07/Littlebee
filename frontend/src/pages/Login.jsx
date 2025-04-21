import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();
  const [data, setStoreData] = useState([]);

  useEffect(() => {
    axios
      .get("https://package-0ar8.onrender.com/user")
      .then((response) => setStoreData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      const store = data.find(
        (item) => item.email === values.email && item.password === values.password
      );

      if (!store) {
        toast.error('Invalid email or password!');
        console.log("Invalid user");
        return;
      }

      if (store.isActive === false) {
        toast.info("This user is restricted by admin");
        return;
      }

      localStorage.setItem("id", store.id);

      if (store.isAdmin === true) {
        navigate('/admin');
      } else {
        toast.success('Login successful!');
        navigate('/');
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Login Here</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              autoComplete="new-password"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              autoComplete="new-password"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{' '}
          <Link to="/signup">
            <span className="text-blue-500 font-semibold hover:underline">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
