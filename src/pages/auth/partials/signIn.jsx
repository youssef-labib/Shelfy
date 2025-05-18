import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Images from '../../../constant/images';

const SignIn = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        // Create admin account if it doesn't exist
        const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        const adminExists = accounts.some(acc => acc.isAdmin);
        
        if (!adminExists) {
            const adminAccount = {
                name: "Admin",
                email: "admin@shelfy.com",
                password: "admin123",
                isAdmin: true
            };
            accounts.push(adminAccount);
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Get accounts from localStorage
        const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        
        // Find matching account
        const account = accounts.find(acc => acc.email === email && acc.password === password);

        if (account) {
            // Store logged in user info
            localStorage.setItem('currentUser', JSON.stringify(account));
            // Redirect based on user type
            if (account.isAdmin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src={Images.miniLogo} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                <div className="text-sm">
                                    <Link to="/auth/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Don't have an account?
                        <Link to="/auth/sign-up" className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1">Create one now!</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignIn;