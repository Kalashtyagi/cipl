import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Logo from '../../assets/logo.png'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const [showResponse,setShowResponse] = useState(false)
    const [error,setError] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const {pathname} =useLocation()
    const newPathName = pathname.replace('/resetPassword/','')
    const navigate = useNavigate()
    
    const hanldeSubmit=async(e)=>{
        e.preventDefault()
        if(password===confirmPassword){
            try {
                setShowResponse(false)
                const formData= new FormData()
                formData.append('email',email)
                formData.append('token',newPathName)
                formData.append('password',password)
                formData.append('password_confirmation',confirmPassword)
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
                    setTimeout(()=>{
                        navigate('/')
                    },4000)
                }
                if(response?.code ===404){
                    setShowResponse(false)
                    setError(true)
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
        }else{
            toast.error('Password not matched.!')
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
                <div className='font-semibold text-2xl text-center'>Reset Password </div>
                {
                    showResponse=== true?
                    <span>Password successfully updated.</span>
                    :
                    <>
                <div className='justify-center px-8 py-2'>
                    <label className={`block py-1 after:content-['*'] after:ml-0.5 after:text-red-500`}>Enter Email</label>
                    <input required onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='block rounded p-2 w-full border border-gray-200'/>
                    {
                        error?
                        <p className='text-red-500 font-semibold py-2'>Email Not Found...!</p>
                        :null
                    }
                </div>
                <div className='justify-center px-8 py-2'>
                    <label className={`block py-1 after:content-['*'] after:ml-0.5 after:text-red-500`}>Enter Password</label>
                    <input required onChange={(e)=>setPassword(e.target.value)} placeholder='Password' type='password' className='block rounded p-2 w-full border border-gray-200'/>
                </div>
                <div className='justify-center px-8 py-2'>
                    <label className={`block py-1 after:content-['*'] after:ml-0.5 after:text-red-500`}>Confirm Password</label>
                    <input required onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' type='password' className='block rounded p-2 w-full border border-gray-200'/>
                </div>
                <div className='flex justify-center'>
                    <button type='submit' className='rounded w-20 h-8 bg-emerald-500 text-white delay-75 duration-75 hover:bg-emerald-700'>Submit</button>
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

export default ResetPassword