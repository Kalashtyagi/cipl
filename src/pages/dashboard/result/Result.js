import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import Select from 'react-select'
import ApiErrorPopUp from '../../../components/ApiErrorPopUp';
import { FiArrowRight, FiLayers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ShowResult from './ShowResult';

const Result = () => {
    const [showProfilePopup,setShowProfilePopup] = useState(false)
    const [resultData,setResultData] = useState('')
    const [showResult,setShowResult] = useState(false)
    const [listForm,setListForm] = useState('')
    const [showEditPopUp,setShowEditPopup] = useState('')
    const [qualification,setQualification] = useState('')
    const [subQualificaiton,setSubQualification] = useState('')
    const [subQualificationId,setSubQualificationId] = useState('')
    const [qualificaitonId,setQualificationId] = useState('')
    const [relvantExp,setRelvantExp] = useState('')
    const [totalExp,setTotalExp] = useState('')
    const [address,setAddress] = useState('')
    const [candidateId,setCandidateId] = useState('')
    const [phone,setPhone] = useState('')
    const [status,setStatus] = useState('')
    const [email,setEmail] = useState('')
    const [showApiErrorPopUp,setShowApiErrorPopUp] = useState(false)
    const [name,setName] = useState('')
    const [apiError,setApiError] = useState('')
    const [jobId,setJobId] = useState('')
    const [filteredData,setFilteredData] = useState('')
    const navigate = useNavigate()

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
    
    useEffect(()=>{
        getData()
      },[])
      
    useEffect(()=>{
      if(qualificaitonId){
        getQualificationApi()
      }
    },[showEditPopUp])
    
    useEffect(()=>{
      if(qualificaitonId){
        getSubQualificationApi(qualificaitonId)
      }
    },[showEditPopUp,qualificaitonId])

    const getSubQualificationApi = async(qualificaitonId)=>{
      if(qualificaitonId){
        const getSubQualification = await fetch(`${process.env.REACT_APP_API_URL}subqualification/search`, {
          method: "POST",
          headers: {
            'Authorization': `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          },
          body:JSON.stringify({
            qualification_id:`${qualificaitonId}`
          })
        });
        const jsonResponse = await getSubQualification?.json();
        // console.log("Sub Qualification",jsonResponse )
        
        if (jsonResponse) {
          setSubQualification(jsonResponse?.data);
        }
      }
    }
    const getQualificationApi = async()=>{
      const request = await fetch(`${process.env.REACT_APP_API_URL}qualification`, {
        method: "GET",
        headers: {
          'Authorization': `${authorize}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const jsonResponse = await request?.json();
      // console.log("qualification",jsonResponse )
      
      if (jsonResponse) {
        setQualification(jsonResponse?.data);
      }
  }
    const getAssigneeData = async()=>{
        // console.log("Jobd ID",jobId)
        const request = await axios.get(`${process.env.REACT_APP_API_URL}job-applications/${jobId}`,{
            headers:{
                'Authorization':`${authorize}`
            }
        })
        // console.log("Request",request)
        const response = request.data
        if(response){
            setFilteredData(response?.data)
        }
    }

    useEffect(()=>{
        if(jobId){
            getAssigneeData()
        }
    },[jobId])


    const tableHeading=[
        {
          name: 'S. No.',
          selector: (row, index) => index + 1,
          sortable: false,
        },
        {
          name: 'Name',
          selector: row => <button className='text-blue-700 hover:text-blue-900' onClick={()=>setShowProfilePopup(true)}>{row?.full_name}</button>,
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
        {
          name: 'Action',
          selector: row => (
            <div className="">
            <button onClick={()=>{
              setShowResult(true)
              setResultData(row)
              }}>
              <FiLayers size={30} className='bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer' color='white'/>
            </button>
            </div>
          ),
          sortable: false,
          allowOverflow: true
        },
      ]

      const statusList = [
        {
            "id": 1,
            "status": "Applied"
        },
        {
            "id": 2,
            "status": "Online Exam"
        },
        {
            "id": 3,
            "status": "Interview Round 1"
        },
        {
            "id": 4,
            "status": "Interview Round 2"
        },
        {
            "id": 5,
            "status": "Hired"
        },
        {
            "id": 6,
            "status": "Rejected"
        },
        {
            "id": 7,
            "status": "Expired"
        }
    ]
    // console.log("Filered Data",listForm)
  return (
    <div>
  {
  showApiErrorPopUp?
  <ApiErrorPopUp setModal={setShowApiErrorPopUp} error={apiError}/>:null
}
{
showResult?
<ShowResult  setResultModal={setShowResult} resultData={resultData} />:null
}
    <div className='w-full'>
        <div className='p-4'>
            <div className='grid bg-white w-full border-t-2 my-2 border-gray-900  shadow grid-cols-1'>
                <div className='p-4 lg:w-1/3 md:w-1/3'>
                    <h2 className='m-2 text-lg'>PID</h2>
                    <Select
                      options={listForm&&listForm?.map((options)=>({
                        "value":options?.id,
                        "label":options?.pid
                      }))}
                      onChange={(e) => setJobId(e.value)}
                      className='p-2 w-full border rounded border-gray-400'
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 bg-white border-t-2 my-2 border-gray-900 shadow '>
                <DataTable
                columns={tableHeading}
                data={filteredData}
                pagination
                />
            </div>
        </div>
    </div>
    </div>
  )
}

export default Result