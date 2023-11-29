import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  const { loginWithGoogle } = useContext(AuthContext);

  return (
    <main className='container max-w-2xl px-6 py-6 mx-auto'>
      <h1 className='mb-6 text-6xl font-bold text-center'>Welcome 👋</h1>
      <div className='flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl'>
        <div className='h-52'>
          <img
            className='object-cover w-full h-full'
            src='https://sessionize.com/image/56e4-1140o400o3-f9f1znUurvpJgSFn4xKXgW.jpg'
            alt='cover'
          />
        </div>

        <div className='px-4 py-4'>
          <h3 className='text-2xl text-center text-white'>
            Please sign in to continue
          </h3>
          <button
            onClick={loginWithGoogle}
            className='flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg'
          >
            <FcGoogle className='text-2xl' /> Sign in with Google
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
