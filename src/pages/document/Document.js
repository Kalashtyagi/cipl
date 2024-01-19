import React, { useState } from 'react'
//import { Apartment } from '@mui/icons-material'
import Logo from '../../assets/logo.png'
import { HiDownload } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import {AiFillDelete, AiFillPlusCircle} from 'react-icons/ai'
import Select from 'react-select'


function Document() {
    const [pccFile,setPCCFile] = useState();
    const [documentUploaded, setDocumentUploaded] = useState(false)

    const initialState = {
        value: '',
        file:null,
    }
    const [selectedOption, setSelectedOption] = useState([initialState])
    const {pathname} = useLocation()
    const newPathName = pathname.replace('/documentsupload/','')
    console.log("pathname",pathname.replace('/documentsupload/',''))

    
    const handleMore = ()=>{
        let newData = {
            value:'',
            file:null
        }
        setSelectedOption([...selectedOption,newData])   
        //console.log(setDocument)    
    }
    console.log(selectedOption,"data")

    const handleChange = (e,index)=>{
        // if(index===option)
        let data =[...selectedOption]
        data[index].value = e?.value
        setSelectedOption(data)
    }
    const handleFileInputChange = (e,index)=>{
        // if(index===option)
        let data =[...selectedOption]
        data[index].file = e?.target.files[0]
        setSelectedOption(data)
    }

    const handleDelete = (e,index)=>{
        let data = [...selectedOption]
        data.splice(index,1)
        setSelectedOption(data)
    }

    const options = [{ label: 'Aadhar Front', value: 'aadharfront' },{ label: 'Aadhar Back', value: 'aadharback' }, { label: 'Voter Id', value: 'voterid' }, { label: 'Passport', value: 'passport' }, { label: 'Pan Card', value: 'pancard' }, { label: 'Offer Letter', value: 'offerletter' }, { label: 'Appointment Letter', value: 'appointmentletter' }, { label: 'Salary Slip', value: 'salaryslip' }, { label: 'Latest Bank Statement', value: 'bankstatement' },{label:'Cancel Cheque' , value: 'cancelcheque'}, { label: 'Other', value: 'other' },]
    
    const filteredOptions = options && options?.filter((y)=>!selectedOption.some(u=>u?.value===y?.value))
    console.log("filtered data",filteredOptions)

    const handleSubmit = async(e,index)=>{
        e.preventDefault()
        if (documentUploaded) {  //you have already uploaded
            toast.info('You have already uploaded your document');
            return;
          }
        try {
            const formData = new FormData()
            for(let i=0; i<selectedOption.length;i++){
                formData.append(`${selectedOption[i].value}`,selectedOption[i].file)
            }
          const request = await axios.postForm(`${process.env.REACT_APP_API_URL}documentsupload/${newPathName}`,formData,{
            headers:{
                // 'Authorization':`Bearer ${localData?.access_token}`,
                'Accept':'application/json'
            }
          })
          const response = await request?.data
        
          if(response?.code === 200){
            setDocumentUploaded(true);
            toast.success(`${response?.message}`)
            // setTimeout(()=>{
            //     window.open("about:blank", "_self");
            //     window.close()
            // },4000)
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
        <ToastContainer/>
        {/* {documentUploaded ? (
      <div className="flex justify-center items-center h-screen">
        <p>Document has already been uploaded.</p>
      </div>
    ) : ( */}
        <form onSubmit={handleSubmit} >
        <div className='flex justify-start bg-primary p-2 px-4'>
            <img src={Logo} className='w-40 h-10' />
        </div>
            
            <div className='flex p-4'>
                <div className='font-semibold text-2xl flex-1'>Upload Document </div>
                {/* <div><img src={logo} className=' h-12 w-12 flex-1'/></div> */}
            </div>
            <div className='grid grid-cols-3 h-full rounded-sm px-4'>
                {
                    selectedOption.length>0 && selectedOption?.map((x,index)=>
                    <>
                <div className="p-1 h-full">
                    <div className=' font-semibold text-sm'>Document</div>
                    <div className='flex justify-center w-full items-center'>
                    <div className='w-[90%]'>
                    <Select
                            // isMulti
                           
                            name='document' 
                            id="document"
                            options={filteredOptions}
                            onChange={(e) => handleChange(e,index)} 
                            required
                            />
                    </div>
                    {
                        index===selectedOption.length-1?
                        <button onClick={(index)=>handleMore(index)} className='w-[10%] px-2'><AiFillPlusCircle size={26}/></button>
                        :null
                    }
                    {
                        index<selectedOption.length-1?
                        <button onClick={(index)=>handleDelete(index)} className='w-[10%] px-2'><AiFillDelete color='red' size={26}/></button>
                        :null
                    }
                    </div>
                    <div className=" pt-4 bg-grey-lighter">
                            {/* <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-red-400">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg> */}
                                {/* <span className="mt-2 text-base leading-normal">UPLOAD OTHER</span> */}
                            {/* </label> */}
                            <input
                            onChange={(e)=>handleFileInputChange(e,index)}
                             type="file" required className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-500 file:text-white hover:file:text-primary
                                hover:file:bg-gray-100
                                "/>
                        </div>
                </div>
                    </>
                )
                }
            </div>
            <div className='flex pt-5 pl-4'>
             <button type='Submit' className=' bg-primary flex justify-center items-center text-white h-10 w-32 rounded-lg hover:bg-gray-600 hover:text-white  delay-75 duration-75'>Submit</button>
             {/* <a href='' download target='_blank'>
             <button  className=' bg-primary flex text-white h-10 w-32 rounded-lg items-center justify-center mx-2 hover:bg-gray-600 hover:text-white delay-75 duration-75'> <HiDownload size={20} className='mx-1'/> Sample</button>
             </a> */}
            </div>
        </form>
        {/* )} */}
        </>
    )
}
export default Document;