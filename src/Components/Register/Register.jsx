import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';
import { UserContext } from '../Context/UserContext';

export default function Register() {
  let { setToken } = useContext(UserContext);  
  let navigate = useNavigate();
  const [errorApi, seterrorApi] = useState(null);
  const [isloading, setisloading] = useState(null);

  async function handleRegister(values) {
    setisloading(true);
    seterrorApi(null); 

    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      console.log(res.data);
      setToken(res.data.token);
      localStorage.setItem('userToken', res.data.token);
      navigate("/login");
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
      seterrorApi(error?.response?.data?.message || "An error occurred");
    } finally {
      setisloading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is Required'),

    email: Yup.string().email('Invalid email').required('Email is Required'),

    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone is invalid")
      .required('Required'),

    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters, contain uppercase, lowercase, number and special character"
      )
      .required("Password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Re-password is required")
  });

  let formikRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return (
    <div>
      {errorApi ? 
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
          {errorApi}
        </div> : null}
      <form className="max-w-xl mx-auto" onSubmit={formikRegister.handleSubmit}>
        <h2 className='text-center m-10 text-3xl font-bold'>Register Now</h2>

        {/* Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            value={formikRegister.values.name}
            autoComplete="new-name"
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500">Enter Your Name</label>
        </div>
        {formikRegister.errors.name && formikRegister.touched.name && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            {formikRegister.errors.name}
          </div>
        )}

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            value={formikRegister.values.email}
            autoComplete="new-email"
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500">Email address</label>
        </div>
        {formikRegister.errors.email && formikRegister.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            {formikRegister.errors.email}
          </div>
        )}

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            value={formikRegister.values.password}
            autoComplete="new-password"
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500">Enter your Password</label>
        </div>
        {formikRegister.errors.password && formikRegister.touched.password && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            {formikRegister.errors.password}
          </div>
        )}

        {/* RePassword */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            value={formikRegister.values.rePassword}
            autoComplete="new-repassword"
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500">Confirm Password</label>
        </div>
        {formikRegister.errors.rePassword && formikRegister.touched.rePassword && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            {formikRegister.errors.rePassword}
          </div>
        )}

        {/* Phone */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            value={formikRegister.values.phone}
            autoComplete="new-phone"
            type="text"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500">Enter your Phone Number</label>
        </div>
        {formikRegister.errors.phone && formikRegister.touched.phone && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            {formikRegister.errors.phone}
          </div>
        )}

        {/* Submit */}
        <button
          disabled={!formikRegister.isValid || !formikRegister.dirty}
          type="submit"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 relative left-60 mt-10"
        >
          {isloading ? <FaSpinner className="animate-spin" /> : "Register"}
        </button>

      </form>
    </div>
  );
}
