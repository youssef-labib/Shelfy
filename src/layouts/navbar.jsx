import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Images from '../constant/images';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const toggleMenu = () => {
            const menu = document.querySelectorAll('.navbar-menu');
            menu.forEach(element => {
                element.classList.toggle('hidden');
            });
        };

        const burger = document.querySelector('.navbar-burger');
        const closeBtn = document.querySelector('.navbar-close');
        const backdrop = document.querySelector('.navbar-backdrop');

        if (burger) burger.addEventListener('click', toggleMenu);
        if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
        if (backdrop) backdrop.addEventListener('click', toggleMenu);

        return () => {
            if (burger) burger.removeEventListener('click', toggleMenu);
            if (closeBtn) closeBtn.removeEventListener('click', toggleMenu);
            if (backdrop) backdrop.removeEventListener('click', toggleMenu);
        };
    }, []);

    return (
        <>
            <nav className="relative px-6 py-4 flex justify-between items-center bg-white">
                <Link to="/" className="text-3xl font-bold leading-none flex flex-row items-center gap-2">
                    <img src={Images.logo} alt="Shelfy Logo" className="h-8" />
                    <h2 className="text-3xl font-bold text-[#4F46E5]">Shelfy</h2>
                </Link>
                <div className="lg:hidden">
                    <button className="navbar-burger flex items-center text-blue-600 p-3">
                        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
                {currentUser ? (
                    <div className="hidden lg:flex lg:items-center lg:gap-4">
                        {currentUser.isAdmin && (
                            <Link to="/admin/dashboard" className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
                                Admin Dashboard
                            </Link>
                        )}
                        <button
                            onClick={handleSignOut}
                            className="py-2 px-6 bg-[#4F46E5] hover:bg-[#4338CA] text-sm text-white font-bold rounded-xl transition duration-200"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="hidden lg:flex lg:items-center lg:gap-4">
                        <Link to="/auth/sign-in" className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
                            Sign In
                        </Link>
                        <Link to="/auth/sign-up" className="py-2 px-6 bg-[#4F46E5] hover:bg-[#4338CA] text-sm text-white font-bold rounded-xl transition duration-200">
                            Sign up
                        </Link>
                    </div>
                )}
            </nav>
            <div className="navbar-menu relative z-50 hidden">
                <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-8">
                        <Link to="/" className="mr-auto text-3xl font-bold leading-none">
                            <img src={Images.logo} alt="Shelfy Logo" className="h-12" />
                        </Link>
                        <button className="navbar-close">
                            <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke="round" strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul>
                            <li className="mb-1">
                                <Link to="/" className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Home</Link>
                            </li>
                            {currentUser?.isAdmin && (
                                <li className="mb-1">
                                    <Link to="/admin/dashboard" className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Admin Dashboard</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <div className="pt-6">
                            {currentUser ? (
                                <button
                                    onClick={handleSignOut}
                                    className="block w-full px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <>
                                    <Link to="/auth/sign-in" className="block px-4 py-3 mb-3 text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl">Sign in</Link>
                                    <Link to="/auth/sign-up" className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl">Sign Up</Link>
                                </>
                            )}
                        </div>
                        <p className="my-4 text-xs text-center text-gray-400">
                            <span>Copyright © 2025</span>
                        </p>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
