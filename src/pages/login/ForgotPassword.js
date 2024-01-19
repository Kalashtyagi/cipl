import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Logo from '../../assets/logo.png'
import axios from 'axios'

const ForgotPassword = () => {
    const [showResponse,setShowResponse] = useState(false)
    const [showbutton,setShowbutton] = useState(true)
    const [error,setError] = useState(false)
    const [email,setEmail] = useState('')
    
    const hanldeSubmit=async(e)=>{
        e.preventDefault()
        try {
            setShowbutton(false)
            setShowResponse(false)
            const formData= new FormData()
            formData.append('email',email)
            const request = await axios.postForm(`${process.env.REACT_APP_API_URL}sendPasswordResetLink`,formData,{
                headers:{
                    'Content-Type':"application/json"
                }
            })
            const response = await request?.data
            console.log('response',response)
            if(response){
                setShowResponse(true)
                setError(false)
                setShowbutton(true)
            }
            if(response?.code ===404){
                setShowResponse(false)
                setError(true)
                setShowbutton(true)
            }
        } catch (error) {
            console.log('error', error)
            if (error?.response?.data?.error) {
                const errors = Object.values(error?.response?.data?.error)
                console.log('Errors', errors)
                errors.map((x) => (
                toast.error(`${x}`)
                ))
            }
            if (error?.response?.data?.message) {
                if (error?.response?.data?.error) {
                const errors = Object.values(error?.response?.data?.error)
                console.log('Errors', errors)
                errors.map((x) => (
                    toast.error(`${x}`)
                ))
                }
                if (error?.response?.data?.message) {
                toast.error(`${error?.response?.data?.message}`)
                }
            }
        }
    }
        return (
            <>
                <ToastContainer position='top-center' />
                <form onSubmit={hanldeSubmit} className='w-screen h-screen ' >
                    <div className='flex justify-start bg-primary p-2 px-4'>
                        <img src={Logo} className='w-40 h-10' />
                    </div>
    
                    <div className='px-40 py-4 flex rounded-t-lg '>
                        <div className=' p-4 justify-center border rounded border-gray-200 w-full items-center'>
                            <div className='font-semibold text-2xl text-center'>Forgot Password </div>
                            {
                                showResponse=== true?
                                <span className='text-center'>Password reset link send successfully to your email. Kindly check and reset your password.</span>
                                :
                                <>
                            <div className='justify-center px-8 py-2'>
                                <label className='block py-1'>Enter Email</label>
                                <input onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='block rounded p-2 w-full border border-gray-200'/>
                                {
                                    error?
                                    <p className='text-red-500 font-semibold py-2'>Email Not Found...!</p>
                                    :null
                                }
                            </div>
                            <div className='flex justify-center'>
                                <button type='submit' className='rounded w-20 h-8 bg-emerald-500 text-white delay-75 duration-75 hover:bg-emerald-700'>{showbutton?"Submit":"Wait..."}</button>
                            </div>
                            {/* <div><img src={logo} className=' h-12 w-12 flex-1'/></div> */}
                                </>
                            }
                        </div>
                    </div>
                </form>
            </>
        )
    }

export default ForgotPassword