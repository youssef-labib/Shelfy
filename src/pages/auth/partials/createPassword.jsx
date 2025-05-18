import React from 'react'
import Images from '../../../constant/images'
import { useNavigate, useLocation } from 'react-router-dom'

const CreatePassword = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = (e) => {
        e.preventDefault()
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value

        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        const userData = location.state?.userData
        if (!userData) {
            alert("Something went wrong. Please try signing up again.")
            navigate('/auth/sign-up')
            return
        }

        const account = {
            ...userData,
            password
        }

        const existingAccounts = JSON.parse(localStorage.getItem('accounts') || '[]')
        
        existingAccounts.push(account)
        
        localStorage.setItem('accounts', JSON.stringify(existingAccounts))

        navigate('/auth/sign-in')
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src={Images.miniLogo} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your password</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Choose a strong password for your account</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    placeholder="Enter your password"
                                    minLength="8"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    placeholder="Confirm your password"
                                    minLength="8"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreatePassword