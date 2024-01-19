import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { ImSearch } from 'react-icons/im'
import { useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify'


const AddExamAssignee = () => {
  const { state } = useLocation()
  console.log("State", state)
  const [chooseApplication, setChooseApplication] = useState('')
  const [timeDuration, setTimeDuration] = useState('')
  const [dateDuration, setDateDuration] = useState('')
  const [listForm, setListForm] = useState('')
  const [jobId, setJobId] = useState('')
  //const [hodSearch,setHodSearch] = useState('')
  //const [locationSearch,setLocationSearch] = useState('')
  const [filteredData, setFilteredData] = useState('')
  const [jobRecruitmentData, setJobRecruitmentData] = useState('')
  const jsonData = JSON.parse(localStorage.getItem('data'));
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;
  const getData = async () => {
    // alert("Data called")
    const getApiData = await axios.get(`${process.env.REACT_APP_API_URL}erf`, {
      headers: {
        'Authorization': `${authorize}`,
      },
    });
    const apiResonse = await getApiData.data;

    if (apiResonse) {
      // if(jsonData?.data?.roles[0]?.name==="admin")
      // {
      //   setListForm(apiResonse?.data)
      // }else{
      //   const filterData=apiResonse?.data?.filter(x =>
      //     parseInt(x?.user_id) === parseInt(jsonData?.data?.id) ||
      //     x?.jobassigned?.some(y => parseInt(y?.user_id) === jsonData?.data?.id)
      //   )
      //   setListForm(filterData)
      // }
      // const customFilter = apiResonse?.data?.filter((x)=>x?.erfstatus!==2)
      setListForm(apiResonse?.data)
    }
  };

  useEffect(() => {
    getData()
  }, [])

  const getAssigneeData = async () => {
    console.log("Jobd ID", jobId)
    const request = await axios.get(`${process.env.REACT_APP_API_URL}job-applications/${jobId}`, {
      headers: {
        'Authorization': `${authorize}`
      }
    })
    console.log("Request", request)
    const response = request.data
    if (response) {
      setFilteredData(response?.data)
    }
  }


  // useEffect(() => {
  //   if (jobId) {
  //     getAssigneeData()
  //   }
  // }, [jobId])

  const tableHeading = [
    {
      name: 'S. No.',
      selector: (row, index) => index + 1,
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
      name: 'Phone',
      selector: row => row?.phone,
      sortable: true,

    },
    {
      name: 'Qualification',
      selector: row => row?.qualification?.name,
      sortable: true,

    },
    {
      name: 'Status',
      selector: row => row?.status?.status,
      sortable: true,

    },
  ]


  const navigate = useNavigate()

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      console.log('console', chooseApplication)
      const checkJobApplication = chooseApplication && chooseApplication?.map((question) => question?.id)
      console.log('JOb Application', checkJobApplication)
      formData.append('onlinexam_id', state?.id)
      formData.append('scheduled_time', timeDuration)
      formData.append('scheduled_date', dateDuration)
      for (let i = 0; i < checkJobApplication.length; i++) {
        formData.append(`jobapplication_id[${i}]`, `${checkJobApplication[i]}`)
      }
      const updateRequest = await axios.postForm(`${process.env.REACT_APP_API_URL}exam/assign/job-applications`, formData,
        {
          headers: {
            'Authorization': `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          }
        }
      )
      const response = await updateRequest?.data
      console.log("response", response)
      if (response?.code === 200) {
        toast.success(`${response?.message}`)
        setTimeout(()=>{
          navigate('/admin/exam')
        },3000)
      }if(response?.code ===409){
        toast.warning(`${response?.message}`)
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
    <ToastContainer position='top-center'/>
      <div className="my-3 mx-4 p-2 shadow-lg rounded-lg grid bg-white overflow-y-auto lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1  gap-1">
        <div className='  text-2xl pb-3'>Assign Exam</div>
        <form onSubmit={(e) => handleSave(e)}>
          <div className="grid md:grid-cols-3 my-2 gap-6 w-100">
            <div className='md:grid md:grid-cols-1 '>
              <h2 className={`my-1 block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:pl-1`}>PID</h2>
              <Select
                isClearable
                options={listForm && listForm?.map((options) => ({
                  "value": options?.id,
                  "label": options?.pid,
                  'jobrecruitmentData': options?.jobrecruitment
                }))}
                onChange={(e) => {
                  setJobId(e?.value ? e?.value : "")
                  setJobRecruitmentData(e?.jobrecruitmentData ? e?.jobrecruitmentData : "")
                }}

              />
            </div>
            <div className='md:grid md:grid-cols-1 '>
              <h2 className='my-1 block text-sm font-medium text-gray-700'>Location</h2>
              <Select
                isClearable
                options={jobRecruitmentData && jobRecruitmentData?.map((options) => ({
                  "value": options?.id,
                  "label": options?.location === "" || null || undefined ? "NA" : options?.location
                }))}
              //onChange={(e) => setLocationSearch(e?.value ? e?.value : "")}

              />
            </div>
            <div className='md:grid md:grid-cols-1 '>
              <h2 className='my-1 block text-sm font-medium text-gray-700'>HOD</h2>
              <Select
                isClearable
                options={jobRecruitmentData && jobRecruitmentData?.map((options) => ({
                  "value": options?.id,
                  "label": options?.project_manager === "" || null || undefined ? "NA" : options?.project_manager
                }))}
              //onChange={(e) => setHodSearch(e?.value ? e?.value : "")}


              />

            </div>
            <div className=' col-span-1 flex items-end pb-5'>
              <button onClick={() => getAssigneeData()} className='px-8 py-2 hover:bg-gray-900 cursor-pointer bg-primary rounded-sm text-white'>Search</button>
            </div>
          </div>

          {/* <div className='grid grid-cols-1 bg-white border-t-2 my-2 border-gray-900 shadow '>
                  <DataTable
                    columns={tableHeading}
                    data={filteredData}
                    pagination
                  />
                </div> */}

          <div className="grid justify-self-end md:justify-between">
            <span className="py-2 text-2xl">{state?.name}</span>
          </div>
          <div className="grid grid-rows-3 grid-flow-col gap-4 py-2">
            <div className="row-span-3 ">
              <div>
                <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-gray-700 pt-2 pb-1">
                  Date
                </label>
                <input required onChange={(e) => setDateDuration(e.target.value)} type="date" className="shadow timepicker appearance-none border rounded w-full py-1 px-1 text-black" />
              </div>
              <div>
                <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-gray-700 pt-2 pb-1">
                  Time Duration
                </label>
                <input required onChange={(e) => setTimeDuration(e.target.value)} type="time" className="shadow timepicker appearance-none border rounded w-full py-1 px-1 text-black" />
              </div>
            </div>

            <div className="row-span-2 col-span-2 lg:mt-[17px]">
              <div className='grid grid-cols-1 bg-white border-t-2 my-2 border-gray-900 shadow '>
                <DataTable
                  selectableRows
                  onSelectedRowsChange={(e) => setChooseApplication(e.selectedRows)}
                  columns={tableHeading}
                  data={filteredData}
                  pagination
                />
              </div>

            </div>
          </div>
          <div className="flex items-center justify-end mt-5 border-solid border-blueGray-200 rounded-b">

            <button type="submit"
              className="text-white bg-gray-600 active:bg-gray-700 font-medium text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"

            >
              Submit
            </button>
          </div>
        </form >
      </div >


    </>
  )
}

export default AddExamAssignee;