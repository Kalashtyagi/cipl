import React, { useEffect, useState } from 'react'
// import { AiOutlineUserAdd } from 'react-icons/ai'
import { FaPencilAlt, FaQuestion, FaRegEdit } from 'react-icons/fa'
import Modal from './modal'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { HiPlus } from 'react-icons/hi'
import { IoMdEye } from 'react-icons/io'
import QuestionEditor from '../../../components/QuestionEditor'
import { AiFillDelete } from 'react-icons/ai'
import DOMPurify from 'dompurify'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Exam = () => {
  const [showModal, setShowModal] = useState(false)
  const [examTitle, setExamTitle] = useState('')
  const [editExamId, setEditExamId] = useState('')
  const [newAttempt, setNewAttempt] = useState('')
  const [newTimeDuration, setNewTimeDuration] = useState('')
  const [editData, setEditData] = useState('')
  const [examId, setExamId] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [questionChoose, setQuestionChoose] = useState('')
  // console.log("Question Choose",questionChoose)
  const [questions, setQuestions] = useState('')
  const [showAssignQuestionModal, setShowAssignQuestionModal] = useState(false)
  const [editContent, setContentEdit] = useState('')
  const [data, setData] = useState('')
  const jsonData = JSON.parse(localStorage.getItem('data'));
  const [showEditButton, setShowEditButton] = useState(false)
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const navigate = useNavigate()
  const accessToken = jsonData && jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const getQuesitonsApi = async () => {
    const fetchAPI = await fetch(`${process.env.REACT_APP_API_URL}questions`, {
      method: "get",
      headers: {
        'Authorization': `${authorize}`,
        "Content-type": "application/json; charset=UTF-8",
      }
    })
    const response = await fetchAPI.json()
    setQuestions(response?.data)
  }

  const callAPI = async () => {
    const fetchAPI = await fetch(`${process.env.REACT_APP_API_URL}exam`, {
      method: "get",
      headers: {
        'Authorization': `${authorize}`,
        "Content-type": "application/json; charset=UTF-8",
      }
    })
    const response = await fetchAPI.json()
    setData(response?.data)
  }

  const location = useLocation()
  useEffect(() => {
    callAPI()
  }, [location])

  useEffect(() => {
    if (showAssignQuestionModal) {
      getQuesitonsApi()
    }
  }, [showAssignQuestionModal])

  console.log("Data", data)

  const tableHeading = [
    {
      name: 'S. No.',
      selector: (row, index) => index + 1,
      maxWidth: "fit-content",
      sortable: false,
    },
    {
      name: 'Exam',
      selector: row => row?.name,
      sortable: true,
    },
    {
      name: 'No. Questions',
      selector: row => row?.total_question,
      sortable: true,
    },
    {
      name: 'Attempt',
      selector: row => row?.attempt,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: row => row?.time_duration,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row?.status,
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => (
        <div className="flex flex-nowrap  py-4 justify-start w-28 overflow-hidden text-sm text-gray-800 whitespace-nowrap">
          {
            jsonData?.data?.userPermissions?.find(x=>x?.includes('add_exam'))?
            <>
          {
            row?.total_question>0?
          <Link to="/admin/addexamassignee" state={row}>
            <HiPlus className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white' />
          </Link>
          :null
          }
          <button onClick={() => {
            setExamId(row?.id)
            setShowAssignQuestionModal(!showAssignQuestionModal)
          }}>
            <FaQuestion className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white' />
          </button>
            </>
            :null
          }
          {/* <button>
          <IoMdEye className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white'/>
          </button> */}
          {
            jsonData?.data?.userPermissions?.find(x=>x?.includes('edit_exam'))?
          <button
            onClick={() => {
              setShowEditModal(true)
              setExamTitle(row?.name)
              setNewAttempt(row?.attempt)
              setNewTimeDuration(row?.time_duration)
              setEditExamId(row?.id)
            }}
          >
            <FaPencilAlt className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white' />
          </button>
          :null
          }
          {/* <button>
            <AiFillDelete  className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white'/>
          </button> */}
        </div>
      ),
      sortable: false,
      allowOverflow: true
    },
  ]

  const questionHeading = [
    {
      name: 'Question',
      selector: (row) => (
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row?.question) }}>
        </div>
      ),
      sortable: false,
    },
    {
      name: 'Question Type',
      selector: (row) => row?.question_type === "description" ? "Descritive" : "Option",
      sortable: false,
      maxWidth: "fit-content",
    },
  ]

  const handleAssignQuestion = async () => {
    try {
      const formData = new FormData()
      const newQuestionsID = questionChoose && questionChoose?.map((question) => question?.id)
      formData.append('exam_id', examId)
      for (let i = 0; i < newQuestionsID.length; i++) {
        formData.append(`questions[${i}]`, `${newQuestionsID[i]}`)
      }
      const updateRequest = await axios.postForm(`${process.env.REACT_APP_API_URL}exam/assign`, formData,
        {
          headers: {
            'Authorization': `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          }
        }
      )
      const response = await updateRequest?.data
      // console.log("response", response)
      if (response?.code === 200) {
        toast.success(`${response?.message}`)
        setShowAssignQuestionModal(false)
        getQuesitonsApi()
        callAPI()
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
    <div className='w-full'>
      <ToastContainer position='top-center'/>
      {showEditModal ? (
        <div className="absolute inset-1 left-1 right-1 my-6 mx-auto z-50 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:w-4/6 md:w-screen sm:w-screen drop-shadow-sm">
          <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white border-blue-100 focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-[18px] font-medium">Exam</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowEditModal(!showEditModal)}
              >
                <span className="text-black opacity-7 h-8 w-8 text-xl block bg-gray-100 py-0 pb-3 rounded-full">
                  x
                </span>
              </button>
            </div>
            {/* <div className="absolute inset-px p-6"> */}
            <form className="bg-gray-0 m-1 rounded px-1  pt-6 pb-8" >
              <div className="max-w-[1200px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2">
                <div className="grid md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1">

                  <label className="block text-black text-sm font-medium ">
                    Exam Title
                  </label>
                  <input value={examTitle} onChange={(e) => setExamTitle(e.target.value)} className="shadow appearance-none border rounded m-full py-1 px-1 text-black" />
                </div>
              </div>
              <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 py-1 gap-2">
                <div className="grid md:grid md:grid-cols- sm:grid-cols-1 md:gap-1 mt-2 ">
                  <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-black text-sm font-medium ">
                    Time Duration
                  </label>
                  <input type="time" onChange={(e) => setNewTimeDuration(e.target.value)} value={newTimeDuration} className="shadow timepicker appearance-none border rounded m-full py-1 px-1 text-black" />

                </div>
                <div className="grid md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1 mt-2">
                  <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-black text-sm font-medium ">
                    Attempt
                  </label>
                  <input type="number" value={newAttempt} onChange={(e) => setNewAttempt(e.target.value)} className="shadow timepicker appearance-none border rounded m-full py-1 px-1 text-black" />

                </div>
              </div>

            </form>
            {/* </div> */}
            <div className="flex items-center justify-end p-6 pt-0 border-solid border-blueGray-200 rounded-b">

              <button type="submit"
                className="text-white bg-gray-600 active:bg-gray-700 font-medium text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"

                onClick={async () => {
                  try {
                    const formData = new FormData()
                    formData.append('name', examTitle)
                    formData.append('time_duration', newTimeDuration)
                    formData.append('attempt', newAttempt)
                    const request = await axios.postForm(`${process.env.REACT_APP_API_URL}exam/update/${editExamId}`, formData, {
                      headers: {
                        'Authorization': `${authorize}`
                      }
                    })
                    const response = await request?.data
                    // console.log("Response", response)
                    if (response?.code === 200) {
                      toast(`${response?.message}`)
                      setShowEditModal(false)
                      getQuesitonsApi()
                      callAPI()
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
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {
        showAssignQuestionModal ?
          <div className='absolute w-full inset-1 left-1 right-1 my-6 mx-auto z-50 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:w-4/6 md:w-screen sm:w-screen drop-shadow-sm'>
            <div className="border-2 shadow-lg p-2 lg:w-full md:w-[96%] bg-white border-blue-100 focus:outline-none">
              <div className='p-2 flex justify-between w-full items-center'>
                <h3 className='text-lg'>Assign Question</h3>
                <span className='bg-gray-800 text-white hover:cursor-pointer w-4 text-center items-center' onClick={() => setShowAssignQuestionModal(false)}>X</span>
              </div>
              <hr />
              <div className='p-2 w-full'>
                <div className='border w-full border-gray-800'>
                  <DataTable columns={questionHeading} data={questions} pagination selectableRows onSelectedRowsChange={(e) => setQuestionChoose(e.selectedRows)} />
                </div>
              </div>
              <div className='flex justify-end mx-2'>
                <button onClick={handleAssignQuestion} className='px-6 py-2 bg-gray-800 text-white hover:bg-gray-900 transition-all'>Update</button>
              </div>
            </div>
          </div>
          : null
      }
      {/* {
        showForm?
        <ViewErf showFormId={showFormId&&showFormId} setShowForm={setShowForm} showForm={showForm}/>:
        null
      } */}
      <div className="lg:p-4 p-1 w-auto rounded border lg:m-4 ml-1 mx-4 m-2 bg-white w-content">
        <div className="w-full">

          <DataTable
            columns={tableHeading}
            data={data}
            pagination
            responsive
            style={{ overflowX: 'scroll', padding: "1px", 'whiteSpace': 'unset' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Exam;