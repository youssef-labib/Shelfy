import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Images from '../../../constant/images'
import { useAppContext } from '../../../context/AppContext'

const CreatePassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { createUser } = useAppContext()
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    if (!location.state?.userData) {
        navigate('/auth/sign-up')
        return null
    }

    const { userData } = location.state

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (password.length < 6) {
            setError('Password must be at least 6 characters long')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        const result = createUser({
            ...userData,
            password
        })

        if (result.success) {
            navigate('/auth/sign-in')
        } else {
            setError(result.error)
        }
    }

    return (
        <>
            <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img className='mx-auto h-10 w-auto' src={Images.miniLogo} alt='Your Company' />
                    <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Create your password</h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Choose a secure password for your account
                    </p>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    {error && (
                        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                            {error}
                        </div>
                    )}
                    
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='password' className='block text-sm/6 font-medium text-gray-900'>Password</label>
                            <div className='mt-2'>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Enter your password'
                                    required
                                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='confirmPassword' className='block text-sm/6 font-medium text-gray-900'>Confirm Password</label>
                            <div className='mt-2'>
                                <input
                                    type='password'
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder='Confirm your password'
                                    required
                                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreatePassword 