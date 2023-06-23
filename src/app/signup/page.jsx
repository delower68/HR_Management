"use client"
import Link from 'next/link'
import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from 'axios';

const SignUp = () => {

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Last name is required"),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Pasword must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      )
      .required("Password is required"),
    
    // acceptTerms: Yup.string()
    //   .oneOf([true], "You must accept the terms and conditions")
    //   .required("You must accept the terms and conditions"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handelSignUp = (data) => {
    validationSchema
      .validate(data, { abortEarly: false })
        .then(async(formData) => {
        const data = await axios.post(
          "agent_eighth_step/",
          formData
        );
        if (data.status >= 200 && data.status < 300) {
          navigate("/signin");
        }
      })
      .catch((validationErrors) => {
        const errorMessages = validationErrors.inner.reduce(
          (messages, error) => {
            return {
              ...messages,
              [error.path]: error.message,
            };
          },
          {}
        );
        console.log(errorMessages);
      });
  };
  return (
    <section className="py-24 lg:py-28 bg-black overflow-hidden">
    <div className="container px-4 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading mb-4 text-6xl text-white tracking-tighter">Create a free account</h2>
        <p className="mb-16 text-xl text-white tracking-tight">Use and re-use tons of responsive sections too a main create the perfect layout. Sections are ready.</p>
        <form onSubmit={handleSubmit(handelSignUp)}  className="flex flex-wrap -m-3" action="#">
          <div className="w-full  p-3">
          <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your First name</label>
                  <input 
                   {...register("firstName")}
                  type="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="first name" required=""/>
                  {errors.firstName && (
                <p className="text-red-700 text-xs  mt-2">
                  {errors.firstName?.message}
                </p>
              )}
          </div>
          <div className="w-full p-3">
          <label for="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Last name</label>
                  <input 
                  {...register("lastName")}
                  type="lastname"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="last name" required=""/>
                    {errors.lastName && (
                <p className="text-red-700 text-xs  mt-2">
                  {errors.lastName?.message}
                </p>
              )}
          </div>
         
          <div className="w-full p-3">
          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                  {...register("email")}
                  type="email"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required=""/>
                   {errors.email && (
                <p className="text-red-700 text-xs  mt-2">
                  {errors.email?.message}
                </p>
              )}
          </div>
          <div className="w-full  p-3">
          <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                   {...register("password")}
                  type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required=""/>
                   {errors.password && (
                <p className="text-red-700 text-xs  mt-2">
                  {errors.password?.message}
                </p>
              )}
          </div>
          {/* <div className="w-full p-3">
            <div className="relative flex p-px bg-transparent overflow-hidden rounded-lg">
              <div className="inline-block">
                <input className="form-input opacity-0 absolute top-px z-10 h-5 w-5" id="signUpCheckbox1-1" type="checkbox" name="confirm" value="yes"/>
                <div className="mr-2.5 text-transparent border border-gray-500 w-5 h-5 relative top-px flex justify-center items-center rounded">
                  <svg className="w-2.5 h-2.5" width="9" height="7" viewbox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.604248 3.77081L2.68758 5.85415L7.89591 0.645813" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
              </div>
              <label className="select-none text-gray-400 tracking-tight" for="signUpCheckbox1-1">
                <span>I agree to the</span>
                <a className="text-white hover:text-gray-200" href="#">Terms &amp; Conditions &amp; Privacy Policy</a>
              </label>
            </div>
          </div> */}
          <div className="w-full p-3">
            <button
              value="Create Account"
              type="submit"
              onClick={() => handleSubmit(handelSignUp)}
            className="w-full text-white bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-3 " >Create Account</button>
            <span className="font-medium text-white tracking-tight">
              <span>Already have an account?</span>
              <Link className="text-red-500 hover:text-red-700 transition duration-200 ml-2" href='/signin'> Sign In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default SignUp