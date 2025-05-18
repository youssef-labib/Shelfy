import React from 'react';
import Images from '../../../constant/images';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        const userData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phonenumber.value
        };
        
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            new Notification("Verification Code", {
                body: `Your code is: ${code}`
            });
        }

        navigate('/auth/code-verification', { 
            state: { 
                code,
                userData 
            } 
        });
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src={Images.miniLogo} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Full Name</label>
                            <div className="mt-2">
                                <input type="text" name="name" id="name" autoComplete="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phonenumber" className="block text-sm/6 font-medium text-gray-900">Phone Number</label>
                            <div className="mt-2">
                                <input type="tel" name="phonenumber" id="phonenumber" autoComplete="tel" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get Verification Code</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?
                        <a href="/auth/sign-in" className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1">Sign in here</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;