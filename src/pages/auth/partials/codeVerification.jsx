import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Images from '../../../constant/images'

const CodeVerification = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [verificationCode, setVerificationCode] = useState("")
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (location.state.code && location.state.userData) {
            setVerificationCode(location.state.code)
            setUserData(location.state.userData)
        } else {
            navigate('/auth/sign-up')
        }
    }, [location.state, navigate])

    const handleResend = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        if (window.Notification && Notification.permission === "granted") {
            new Notification("Your Verification Code", {
                body: code,
                icon: Images.miniLogo
            })
            setVerificationCode(code)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const inputCode = e.target.code.value
        if (inputCode === verificationCode && userData) {
            navigate('/auth/create-password', { state: { userData } })
        } else if (!userData) {
            alert("Something went wrong. Please try signing up again")
            navigate('/auth/sign-up')
        } else {
            alert("Incorrect code")
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src={Images.miniLogo} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Verify your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Please enter the verification code from the notification</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="code" className="block text-sm/6 font-medium text-gray-900">Verification Code</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="code"
                                    id="code"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    maxLength="6"
                                    placeholder="Enter 6-digit code"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Verify Code
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Didn't receive the code?
                        <button 
                            onClick={handleResend}
                            className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
                        >
                            Resend Code
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default CodeVerification