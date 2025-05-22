import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Images from '../../../constant/images'
import { useAppContext } from '../../../context/AppContext'

const SignIn = () => {
    const navigate = useNavigate()
    const { login } = useAppContext()
    const [error, setError] = useState('')

    const validateEmail = (email) => {
        if (!email || email.length < 10 || email.includes(' ') || !email.includes('@') || email.split('@').length !== 2) {
            setError('Please enter a valid email address')
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        
        const email = e.target.email.value.trim().toLowerCase()
        const password = e.target.password.value

        if (!validateEmail(email)) {
            return
        }

        const result = login(email, password)
        
        if (result.success) {
            if (result.user.role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/')
            }
        } else {
            setError(result.error)
        }
    }

    return (
        <>
            <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img className='mx-auto h-10 w-auto' src={Images.miniLogo} alt='Your Company' />
                    <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Sign in to your account</h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    {error && (
                        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                            {error}
                        </div>
                    )}
                    
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email' className='block text-sm/6 font-medium text-gray-900'>Email address</label>
                            <div className='mt-2'>
                                <input 
                                    type='email' 
                                    name='email' 
                                    id='email' 
                                    autoComplete='email' 
                                    required 
                                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' 
                                />
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <label htmlFor='password' className='block text-sm/6 font-medium text-gray-900'>Password</label>
                                <div className='text-sm'>
                                    <Link to='/auth/forgot-password' className='font-semibold text-indigo-600 hover:text-indigo-500'>Forgot password?</Link>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <input 
                                    type='password' 
                                    name='password' 
                                    id='password' 
                                    autoComplete='current-password' 
                                    required 
                                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' 
                                />
                            </div>
                        </div>

                        <div>
                            <button type='submit' className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Sign in</button>
                        </div>
                    </form>

                    <p className='mt-10 text-center text-sm/6 text-gray-500'>
                        Don't have an account?
                        <Link to='/auth/sign-up' className='font-semibold text-indigo-600 hover:text-indigo-500 ml-1'>Create one now!</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignIn