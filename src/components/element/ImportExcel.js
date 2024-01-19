import axios from 'axios'
import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import {RiDeleteBin4Fill} from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify'
import * as xlsx from 'xlsx/xlsx.mjs'

const ImportExcel = ({importModalData}) => {
    const [file,setFile] = useState()
    const {heading,setShowImportModal,uploadButtonTitle, uploadLabel,axiosurl} = importModalData

    const localData = JSON.parse(localStorage.getItem('data'))
    const accessToken = localData?.access_token

    const importExcelFile = async(e) => {   
      e.preventDefault()
      if(file){
        try {
          const formData= new FormData()
          formData.append('import_file',file)
          const request = await axios.postForm(`${process.env.REACT_APP_API_URL}${axiosurl}`,formData,{
            headers:{
                'Authorization':`Bearer ${accessToken}`,
                'Accept':'application/json'
            }
          })
          const response = await request?.data
          if(response?.code === 200){
            toast.success(`${response?.message}`)
            setShowImportModal(false)
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
    }
  return (
    <>
    <ToastContainer position='top-center' />
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[80] outline-none focus:outline-none">
      <div className="relative w-3/5 my-6 mx-auto">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold">
              {`${heading!==""||undefined||null ||"undefined" || "null"?heading:"Bulk Upload"}`}
            </h3>
            <button
              className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
              onClick={()=>setShowImportModal(false)}
            >
              <span className=" text-red-500 h-6 w-6 text-xl block ">
                X
              </span>
            </button>
          </div>
          {/*body*/}
          <div className=" p-4 py-6 bg-grey-lighter flex w-full justify-center">
                <label className="w-4/5 flex flex-col items-center justify-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-red-400">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">{`${uploadLabel!==""||undefined||null ||"undefined" || "null"?uploadLabel:"Upload Excel"}`}</span>
                    <input type='file' onChange={(e)=>setFile(e.target.files[0])} className="hidden" />
                </label>
            </div>
            {
                file?
            <div className='px-4  items-center justify-center w-full mb-2 py-2 flex'>
                <div className='flex border shadow-lg rounded p-2 justify-between w-4/5'>
                <div className='text-base'>{file?.name}</div>
                <div><RiDeleteBin4Fill onClick={()=>setFile()} size={24} className='text-red-500 hover:text-red-700 cursor-pointer'/></div>
                </div>
            </div>
            :null
            }
          {/*footer*/}
          <div className="flex items-center p-3 border-t border-solid border-slate-200 rounded-b">
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
              type="button"
              onClick={(e)=>importExcelFile(e)}
            >
              {`${uploadButtonTitle!==""||undefined||null ||"undefined" || "null"?uploadButtonTitle:""}`}
              <FiArrowRight className="text-xl px" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div onClick={()=>setShowImportModal(false)} className="opacity-80 fixed inset-0 cursor-pointer z-[60] bg-black"></div>
  </>
  )
}

export default ImportExcel