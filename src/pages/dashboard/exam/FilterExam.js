import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Table from '../../../components/Table'
import { GrDocumentText } from 'react-icons/gr'
import { HiOutlineDocumentText } from 'react-icons/hi'

const FilterExam = () => {
    const {state} = useLocation()

    const jsonData = JSON.parse(localStorage.getItem('data'));
    const navigate = useNavigate()
    const [data,setData] = useState('')
    const [search,setSearch] = useState('')
    const accessToken = jsonData && jsonData?.access_token;
    const authorize = "Bearer" + " " + accessToken;

    const filterData = data && data?.filter(x=>x?.full_name?.includes(search))

    const callAPI = async () => {
        const fetchAPI = await fetch(`${process.env.REACT_APP_API_URL}exam/examresultlist`, {
          method: "get",
          headers: {
            'Authorization': `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          }
        })
        const response = await fetchAPI.json()
        if(response?.data){
            setData(response?.data)
        }
      }

    //   console.log('data',data)


    useEffect(()=>{
        callAPI()
    },[])
    
    
  const tableHeading = [
    {
      name: 'S. No.',
      selector: (row, index) => index + 1,
      maxWidth: "fit-content",
      sortable: false,
    },
    {
      name: 'Name',
      selector: row => row?.full_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row?.email,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row?.status,
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => 
      <>
      <div
        className='relative text-center  rounded-sm'>
      <button onClick={()=>navigate('/admin/result')}>
        <div className="group no-underline cursor-pointer relative inline-block text-center">
        <HiOutlineDocumentText className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white' />
        <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
            Send Email
        </div>
        </div>
        </button>
    </div>
      </>
      ,
      sortable: true,
    },
]

  return (
    <div>
      <ToastContainer position='top-center' />
      <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-3 flex justify-end pr-2">
              {/* <div className='flex px-2 items-center'>
                <button onClick={()=>setShowImportExcelModal(true)} className='flex items-center rounded-sm bg-primary py-[6px] px-5 hover:bg-gray-900'><FaUpload fill='white' size={20}/><span className='pl-2 text-lg text-white'>Import</span></button>
              </div> */}
              <div className="relative max-w-xs flex items-center justify-end">
                <label htmlFor="hs-table-search" className="px-2">
                  Search:
                </label>
                <input
                  type="text"
                  className="block w-full p-3 border text-sm border-gray-300 rounded-md "
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            <div className="lg:p-1.5  mb-4 pt-2 w-full inline-block align-middle">
              <div className="overflow-hidden border  rounded-lg">
                <Table columns={tableHeading} data={filterData} searchItem={search} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterExam