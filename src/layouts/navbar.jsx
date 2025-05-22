import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Images from '../constant/images';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const { activeUser, logout } = useAppContext();
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
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-0 sm:px-2 lg:px-4">
                <div className="flex justify-between h-16">
                    <div className="flex -ml-2">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 pl-2">
                            <img className="h-8 w-auto" src={Images.miniLogo} alt="Shelfy" />
                            <h2 className="text-2xl font-bold text-[#4F46E5]">Shelfy</h2>
                        </Link>
                    </div>

                    {activeUser ? (
                        <div className="hidden lg:flex lg:items-center lg:gap-4">
                            {activeUser.role === 'admin' && (
                                <Link to="/admin/dashboard" className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
                                    Admin Dashboard
                                </Link>
                            )}
                            <button onClick={handleSignOut} className="py-2 px-6 bg-[#4F46E5] hover:bg-[#4338CA] text-sm text-white font-bold rounded-xl transition duration-200">
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
                </div>
            </div>

            {/* Mobile menu */}
            <div className="navbar-menu relative z-50 hidden">
                <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-4 bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-8">
                        <Link to="/" className="mr-auto text-3xl font-bold leading-none flex items-center gap-3">
                            <img src={Images.miniLogo} alt="Shelfy Logo" className="h-12" />
                            <h2 className="text-3xl font-bold text-[#4F46E5]">Shelfy</h2>
                        </Link>
                        <button className="navbar-close">
                            <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul>
                            <li className="mb-1">
                                <Link to="/" className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Home</Link>
                            </li>
                            {activeUser?.role === 'admin' && (
                                <li className="mb-1">
                                    <Link to="/admin/dashboard" className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Admin Dashboard</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <div className="pt-6">
                            {activeUser ? (
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
                    </div>
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;
