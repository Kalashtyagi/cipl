import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useNavigate,useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const MyProfile = () => {
    const [name,setName] = useState('')
    const [showPassword,setShowPassword]= useState(false)
    const [email,setEmail] = useState('')
    const [image,setImage] = useState('')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [file,setFile] = useState()
    const navigate = useNavigate()
    const location = useLocation()

    const jsonData = JSON.parse(localStorage.getItem('data'));
    const accessToken = jsonData && jsonData?.access_token;
    const authorize = "Bearer" + " " + accessToken;
    const {data} = jsonData
    useEffect(()=>{
        if(data){
            setName(data?.name)
            setEmail(data?.email)
            setPhone(data?.mobile)
            setImage(data?.profile_image_url)
        }
    },[location])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const userId = jsonData?.data?.id
            const formData = new FormData()
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password?password:"")
            formData.append('mobile',phone)
            formData.append('image',file)
            const request = await axios.postForm(`${process.env.REACT_APP_API_URL}team/changepassword/${userId}`,formData,{
                headers:{
                    'Authorization':`${authorize}`,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'js'
                }
            })
            const response = await request.data
            console.log("UPdate",response)
            if(response.code ===200){
              toast.success(`${response?.message}`)
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
    <div>    
        <ToastContainer position='top-center' />
        <div className="md:grid md:grid-cols-3 md:gap-6 py-4">
    <div className="mt-5 md:mt-0 md:col-span-6">
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
                        <div className="md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1">
                            <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                                Name <span className='text-red-400'>*</span>
                            </label>
                            <input value={name} required onChange={(e)=>setName(e.target.value)} type="text" className="shadow appearance-none border rounded w-auto py-1 px-1 text-black" />
                        </div>
                        <div className="md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1">
                            <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                                Email <span className='text-red-400'>*</span>
                            </label>
                            <input disabled value={email} required onChange={(e)=>setEmail(e.target.value)} type="email" className="shadow appearance-none border rounded max-w-3xl py-1 px-1 text-black" />
                        </div>
                        <div className="md:grid w-full md:grid-cols-1 sm:grid-cols-1 md:gap-1">
                            <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                                Password <span className='text-red-400'>*</span>
                            </label>
                            <div className='flex w-full items-center shadow'>
                            <input placeholder='Please Leave it if you dont wanna change password' minLength={6} onChange={(e)=>setPassword(e.target.value)} type={showPassword?"text":"password"} className=" appearance-none border w-full border-r-0 rounded-r-none rounded py-1 px-1 text-black" />
                            <span className='rounded rounded-l-none border cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
                                {
                                    showPassword?
                                    <AiFillEyeInvisible className='text-[29px] p-[3px]'/>
                                    :
                                    <AiFillEye className='text-[29px] p-[3px]'/>
                                }
                                </span>
                            </div>
                            {/* <span className="help-block"> (length: min-6 Character)</span> */}
                        </div>
                        <div className="md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1">
                            <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                                Phone <span className='text-red-400'>*</span>
                            </label>
                            <input value={phone} required minLength={10} maxLength={10} onChange={(e)=>setPhone(e.target.value)} type="text" className="shadow appearance-none border rounded w-auto py-1 px-1 text-black" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Image <span className='text-red-400'>*</span>
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        {
                                            image?
                                            <img src={image} className="h-44 w-44 rounded-full"/>
                                            :null
                                        }
                                        {/* <span>Upload a file</span> */}
                                        <input onChange={(e)=>setFile(e.target.files[0])} type="file" accept='jpg,jpeg,png' className="" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-white text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</div></div>
  )
}

export default MyProfile