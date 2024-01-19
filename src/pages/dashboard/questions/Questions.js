import axios from 'axios';
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiOutlineFileText } from 'react-icons/ai';
import { FaPencilAlt, FaUpload } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import { IoMdEye } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ImportExcel from '../../../components/element/ImportExcel';

const Questions = () => {
  const [search, setSearch] = useState('')
  const [showImportExcelModal,setShowImportExcelModal] = useState(false)
  const [questions, setQuestions] = useState('')
  const jsonData = JSON.parse(localStorage.getItem('data'));
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;
  const getData = async () => {
    // alert("Data called")
    const getApiData = await axios.get(`${process.env.REACT_APP_API_URL}questions`, {
      headers: {
        'Authorization': `${authorize}`,
      },
    });
    const apiResonse = await getApiData.data;

    if (apiResonse) {
      setQuestions(apiResonse.data);
    }
  };
  useEffect(() => {
    getData()
  }, [])

  const tableHeading = [
    {
      name: 'S. No.',
      selector: (row, index) => index + 1,
      sortable: false,
      maxWidth: "fit-content",
    },
    {
      name: 'Status',
      selector: row => row?.status,
      sortable: true,
      maxWidth: "fit-content",

    },
    {
      name: 'Question Type',
      selector: row => row?.question_type,
      sortable: true,
      minWidth: "fit-content",
    },
    {
      name: 'Question',
      selector: row =>
      (<div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row?.question) }}>
      </div>)
      ,
      sortable: true,
    },
    {
      name: 'Answer',
      selector:
        row => row?.answer === "option_a" ? "A"
          :
          row?.answer === "option_b" ? "B"
            :
            row?.answer === "option_c" ? "C"
              :
              row?.answer === "option_d" ? "D"
                : "",
      sortable: true,
      maxWidth: "fit-content",
    },
    {
      name: 'Action',
      selector: row => (
        <div className="lg:px-4 flex px-1 py-4 justify-start w-32 overflow-hidden text-sm text-gray-800 whitespace-nowrap">
          {/* <IoMdEye className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white'/> */}
          {/* <button>
            <FaPencilAlt className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white'/>
            </button> */}
            {
            jsonData?.data?.userPermissions?.find(x=>x?.includes('delete_question'))?
          <button onClick={async () => {
            Swal.fire({
              title: 'Are you really want to delete?',
              text: "After deleting the same all related data would be deleted and can not retrive. So before deleting make sure you have back up all related data.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'No, cancel!',
              reverseButtons: true
            }).then(async (result) => {
              if (result.isConfirmed) {
                await axios.get(`${process.env.REACT_APP_API_URL}questions/delete/${row?.id}`, {
                  headers: {
                    'Authorization': `${authorize}`,
                  },
                });
                getData()
                Swal.fire(
                  'Deleted!',
                  '',
                  'success'
                )
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                Swal.fire(
                  'Cancelled',
                  '',
                  'error'

                )
              }
            })
          }}
          >
            <AiFillDelete className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white' />
          </button>
          :null
            }
        </div>
      ),
      sortable: false,
      allowOverflow: true
    },
  ]

  const importModal = {
    heading:'Bulk Category Import',
    setShowImportModal:setShowImportExcelModal,
    uploadButtonTitle:'Upload',
    uploadLabel:'Upload Category Excel',
    axiosurl:'questions/import'
  }

  return (
    <>
     {
        showImportExcelModal?
        <ImportExcel
         importModalData={importModal}
         />
        :null
      }
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
                name="hs-table-search"
                id="hs-table-search"
                className="block w-full p-3 border text-sm border-gray-300 rounded-md "
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          <div className='p-2'>
            <DataTable
              data={questions}
              columns={tableHeading}
              pagination
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Questions