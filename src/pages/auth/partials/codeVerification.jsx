import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Images from '../../../constant/images'

const CodeVerification = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('')
    const [code, setCode] = useState('')

    if (!location.state?.code || !location.state?.userData) {
        navigate('/auth/sign-up')
        return null
    }

    const { code: verificationCode, userData } = location.state

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (code !== verificationCode) {
            setError('Invalid verification code')
            return
        }

        navigate('/auth/create-password', { state: { userData } })
    }

    const handleResendCode = async () => {
        try {
            const newCode = Math.floor(100000 + Math.random() * 900000).toString()

            if (!('Notification' in window)) {
                alert('This browser does not support desktop notifications')
                return
            }

            const permission = await Notification.requestPermission()

            if (permission === 'denied') {
                alert('Please enable notifications to receive your verification code')
                return
            }

            if (permission === 'granted') {
                new Notification('Verification Code', {
                    body: `Your new code is: ${newCode}`,
                    icon: Images.miniLogo
                })

                navigate('', {
                    state: {
                        code: newCode,
                        userData
                    },
                    replace: true
                })
            }
        } catch (err) {
            alert('An error occurred while sending the verification code. Please try again.')
            console.error('Notification error:', err)
        }
    }

    return (
        <>
            <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img className='mx-auto h-10 w-auto' src={Images.miniLogo} alt='Your Company' />
                    <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Verify your email</h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Please enter the 6-digit code sent to your email
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
                            <label htmlFor='code' className='block text-sm/6 font-medium text-gray-900'>Verification Code</label>
                            <div className='mt-2'>
                                <input type='text' name='code' id='code' value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} placeholder='Enter 6-digit code' required className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'/>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Verify Code
                            </button>
                        </div>
                    </form>

                    <p className='mt-6 text-center text-sm text-gray-500'>
                        Didn't receive the code?{' '}
                        <button onClick={handleResendCode} className='font-semibold text-indigo-600 hover:text-indigo-500'>Resend Code</button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default CodeVerification 