"use client"
import Link from 'next/link'
import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const SignIn = () => {

  const validationSchema = Yup.object().shape({
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

  const handelSignIn = (data) => {
    validationSchema
      .validate(data, { abortEarly: false })
      .then(async(formData) => {
        const data = await axios.post(
          "agent_eighth_step/",
          formData
        );
        if (data.status >= 200 && data.status < 300) {
          navigate("/dashboard");
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
    <section class="py-24 lg:py-28 bg-black overflow-hidden">
    <div class="container px-4 mx-auto">
      <div class="max-w-3xl mx-auto">
        <h2 class="font-heading mb-4 text-6xl text-white tracking-tighter">Welcome to your account</h2>
        <form onSubmit={handleSubmit(handelSignIn)} class="flex flex-wrap -m-3" action="#">
          
          <div class="w-full  p-3">
          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input 
                  {...register("email")}
                   type="email" name="email" id="email" placeholder="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                   {errors.email && (
                <p className="text-red-700 text-xs  mt-2">
                  {errors.email?.message}
                </p>
              )}
          </div>
          <div class="w-full  p-3">
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
          <div class="w-full p-3">
            <button value="Sign Up"
              type="submit"
              onClick={() => handleSubmit(handelSignIn)} className="w-full text-white bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-3" href="#">Log In</button>
            <span class="font-medium text-white tracking-tight">
              <span>Don't have any account?  </span>
              <Link class="text-red-500 hover:text-red-700 transition duration-200 ml-1" href='/signup'> Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default SignIn