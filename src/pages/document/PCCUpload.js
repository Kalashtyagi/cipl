import React, { useState } from 'react'
//import { Apartment } from '@mui/icons-material'
import Logo from '../../assets/logo.png'
import { HiDownload } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'


function PCCUpload() {
    const [pccFile,setPCCFile] = useState()

    const initialState = {
        document: '',
    }
    const [option, setOption] = useState(initialState)
    const {pathname} = useLocation()
    const newPathName = pathname.replace('/pccupload/','')
    console.log("pathname",pathname.replace('/pccupload/',''))
    
    const localData = JSON.parse(localStorage.getItem('data'))

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('pcc',pccFile)
          const request = await axios.postForm(`${process.env.REACT_APP_API_URL}pccupload/${newPathName}`,formData,{
            headers:{
                // 'Authorization':`Bearer ${localData?.access_token}`,
                'Accept':'application/json'
            }
          })
          const response = await request?.data
          if(response?.code === 200){
            toast.success(`${response?.message}`)
            setTimeout(()=>{
                window.open("about:blank", "_self");
                window.close()
            },4000)
            clearTimeout()
          }
        } catch (error) {
          console.log('error',error)
          if(error?.response?.data?.error){
              const errors = Object.values(error?.response?.data?.error)
              console.log('Errors',errors)
              errors.map((x)=>(
                  toast.error(`${x}`)
              ))
          }
          if(error?.response?.data?.message){
              if(error?.response?.data?.error){
                  const errors = Object.values(error?.response?.data?.error)
                  console.log('Errors',errors)
                  errors.map((x)=>(
                      toast.error(`${x}`)
                  ))
              }
              if(error?.response?.data?.message){
                  toast.error(`${error?.response?.data?.message}`)
              }
          }
      }
    }

    return (
        <>
        <ToastContainer position='top-center'/>
        <form onSubmit={handleSubmit}>
        <div className='flex justify-start bg-primary p-2 px-4'>
            <img src={Logo} className='w-40 h-10' />
        </div>
            
            <div className='flex p-4'>
                <div className='font-semibold text-2xl flex-1'>POLICE CLEARANCE CERTIFICATE (PCC) </div>
                {/* <div><img src={logo} className=' h-12 w-12 flex-1'/></div> */}
            </div>
            <div className='grid grid-cols-3 rounded-sm p-4'>
                <div className="">
                    <div className=' font-semibold text-sm pl-1'>Document</div>
                    <div>
                        {/* <label for="states" className="sr-only">Choose a state</label> */}
                        <select onChange={(e) => setOption({ ...option, [e.target.name]: e.target.value })} name='document' id="states" className="bg-gray-50 border border-gray-200 w-full p-2 rounded ">
                            <option selected className=''>Choose Document</option>
                            <option value="PCC">PCC Document</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className=' grid grid-cols-3 rounded-sm'>
                <div className=' grid grid-cols pl-3'>
                    {
                        option?.document === "PCC" ?
                        <div>
                        <div class=" pt-4 bg-grey-lighter pl-2">
                        <input
                            onChange={(e)=>setPCCFile(e?.target?.files[0])}
                             type="file" required class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-500 file:text-white hover:file:text-primary
                                hover:file:bg-gray-100
                                "/>
                            {/* <label class="w-full flex my-2 flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-red-400">
                                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span class="mt-2 text-base leading-normal">Upload PCC Document</span>
                                <input type="file" onChange={(e)=>setPCCFile(e?.target?.files[0])} class="hidden" />
                            </label> */}
                        </div>
                        {
                            pccFile&&pccFile?
                            <div className='flex px-4 text-lg bg-gray-50 m-2 justify-between'>
                                {pccFile?.name?pccFile?.name:''}
                                <MdDelete size={26} className=' cursor-pointer' onClick={()=>setPCCFile(null)} fill='red'/>
                            </div>
                            :
                            null
                        }
                    </div>
                            : null
                    }
                </div>
                </div>
            <div className='flex pt-5 pl-4'>
             <button type='Submit' className=' bg-primary flex justify-center items-center text-white h-10 w-32 rounded-lg hover:bg-gray-600 hover:text-white  delay-75 duration-75'>Submit</button>
             {/* <a href='' download target='_blank'>
             <button  className=' bg-primary flex text-white h-10 w-32 rounded-lg items-center justify-center mx-2 hover:bg-gray-600 hover:text-white delay-75 duration-75'> <HiDownload size={20} className='mx-1'/> Sample</button>
             </a> */}
            </div>
        </form>
        </>
    )
}
export default PCCUpload;





