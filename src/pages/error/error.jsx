import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <>
            <section>
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#4F46E5]">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900">Something's missing.</p>
                        <p className="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
                        <Link 
                            to="/" 
                            className="inline-flex text-white bg-[#4F46E5] hover:bg-[#4338CA] focus:ring-4 focus:outline-none focus:ring-[#4F46E5]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200 my-4"
                        >
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ErrorPage;
