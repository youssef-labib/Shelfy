import React from 'react';

const HeroSection = () => {
    
    return (
        <>
            <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-1 before:transform before:-translate-x-1/2">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
                    <div className="flex justify-center">
                        <a className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 focus:outline-hidden focus:border-gray-300" href="#">
                            Learn more about Shelfly
                            <span className="flex items-center gap-x-1">
                                <span className="border-s border-gray-200 text-blue-600 ps-2">Learn More</span>
                                <svg className="shrink-0 size-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </span>
                        </a>
                    </div>

                    <div className="mt-5 max-w-xl text-center mx-auto">
                        <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                            Discover, Borrow, and Read Smarter
                        </h1>
                    </div>

                    <div className="mt-5 max-w-3xl text-center mx-auto">
                        <p className="text-lg text-gray-600">Shelfly is your digital library companion — explore books, track reads, and borrow your next favorite story.</p>
                    </div>

                    <div className="mt-8 gap-3 flex justify-center">
                        <button className="inline-flex justify-center items-center gap-x-3 text-center bg-[#4F46E5] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 border border-transparent text-white text-sm font-medium rounded-full py-3 px-6 transition duration-200">Browse Library</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;