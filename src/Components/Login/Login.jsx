import { useFormik } from 'formik';
import React, { useState, useContext, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FaSpinner } from "react-icons/fa";
import { UserContext } from '../Context/UserContext';

export default function Login() {
  let { setToken } = useContext(UserContext);  
  let navigate = useNavigate();
  const [errorApi , seterrorApi] = useState(null);
  const [isloading , setisloading] = useState(null);

  // when loading check is token or no
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  async function handleLogin(values) {
    setisloading(true);
    seterrorApi(null);

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      console.log(response.data);  

      setToken(response.data.token);  
      localStorage.setItem('userToken', response.data.token);  
      navigate("/"); 
    } catch (error) {
      console.error("Error during login: ", error);
      seterrorApi(error?.response?.data?.message || "An error occurred during login");
    } finally {
      setisloading(false);
    }
  }

  // such as Register
  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters, contain uppercase, lowercase, number and special character"
      )
      .required("Password is required")
  });

  let formikLogin = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return ( 
    <div>
      {errorApi && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
          {errorApi}
        </div>
      )}
      
      <form className="max-w-xl mx-auto" onSubmit={formikLogin.handleSubmit}>
        <h2 className='text-center m-10 text-3xl font-bold'>Login Now</h2>

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikLogin.handleBlur} 
            onChange={formikLogin.handleChange}
            value={formikLogin.values.email}
            autoComplete="new-email"
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
            placeholder=" " 
          />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500">Email address</label>
        </div>
        
        {formikLogin.errors.email && formikLogin.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            {formikLogin.errors.email}
          </div>
        )}

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikLogin.handleBlur} 
            onChange={formikLogin.handleChange}
            value={formikLogin.values.password}
            autoComplete="new-password"
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
            placeholder=" " 
          />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500">Password</label>
        </div>

        {formikLogin.errors.password && formikLogin.touched.password && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            {formikLogin.errors.password}
          </div>
        )}

        <button
          disabled={!formikLogin.isValid || !formikLogin.dirty}
          type="submit"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 relative left-60 mt-10"
        >
          {isloading ? <FaSpinner className="animate-spin" /> : "Login"}
        </button>

      </form>
    </div> 
  );
}
