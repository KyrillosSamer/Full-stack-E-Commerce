import { useFormik } from 'formik';
import React, { useState, useContext, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FaSpinner } from "react-icons/fa";
import { UserContext } from '../Context/UserContext';

export default function Login() {
  const { setToken } = useContext(UserContext);  
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  async function handleLogin(values) {
    setIsLoading(true);
    setErrorApi(null);

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      setToken(response.data.token);  
      localStorage.setItem('userToken', response.data.token);  
      navigate("/"); 
    } catch (error) {
      setErrorApi(error?.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters, contain uppercase, lowercase, number and special character"
      )
      .required("Password is required"),
  });

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return ( 
    <div className="min-h-screen flex items-start justify-center px-4 mt-20">
      <form 
        onSubmit={formikLogin.handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        <h2 className='text-center mb-8 text-2xl font-bold text-gray-800'>Login Now</h2>

        {errorApi && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-3 rounded">
            {errorApi}
          </div>
        )}

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onBlur={formikLogin.handleBlur} 
            onChange={formikLogin.handleChange}
            value={formikLogin.values.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
          />
          {formikLogin.errors.email && formikLogin.touched.email && (
            <div className="text-red-600 text-sm mt-1">{formikLogin.errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onBlur={formikLogin.handleBlur} 
            onChange={formikLogin.handleChange}
            value={formikLogin.values.password}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
          />
          {formikLogin.errors.password && formikLogin.touched.password && (
            <div className="text-red-600 text-sm mt-1">{formikLogin.errors.password}</div>
          )}
        </div>

        {/* Forgot Password Link */}
        <p className="mb-6 text-right">
          <Link to="/forgot-password" className="text-green-600 hover:underline">
            Forgot your password?
          </Link>
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formikLogin.isValid || !formikLogin.dirty || isLoading}
          className={`w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-150 ${
            ( !formikLogin.isValid || !formikLogin.dirty || isLoading ) ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Login"}
        </button>
      </form>
    </div> 
  );
}
