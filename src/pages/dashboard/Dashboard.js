

import React, { useEffect, useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import DashBoardModal from "../../components/element/DashBoardModal";
// import { DASHBOARD_LINKS } from "../../lib/consts/Dashboard";
import axios from "axios";
import { BsFiles } from 'react-icons/bs'
import {FaUserPlus,FaChartPie, FaUsers, FaDatabase} from 'react-icons/fa'
import {IoMdCloseCircle, IoMdSearch, IoMdCheckmarkCircleOutline, IoMdVideocam} from 'react-icons/io'
import { Form, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [showModal,setShowModal] = useState(false)
    const [data,setData] = useState('')
    useEffect(()=>{
      dashboardApi()
      document.title="CIPLCRM | Dashboard"
},[])

const navigate = useNavigate()

const localData = JSON.parse(localStorage.getItem('data'))

const dashboardApi = async () => {
  try {
    const formData = new FormData()
    formData.append('rolename',localData?.data?.roles[0]?.name)
    const request = await axios.postForm(`${process.env.REACT_APP_API_URL}dashboard`,formData, {
      headers: {
        'Accept':'application/ecmascript',
        'Authorization': `Bearer ${localData?.access_token}`,
      }
    })
    const response = await request?.data
    // console.log('response',response)
    if(response?.code ===200){
      setData(response?.data)
    }
  } catch (error) {
    console.error(error)
    return null
  }
}


console.log("data",data)

const DASHBOARD_LINKS = [
  // {
  //     number:170,
  //     title:"Total Companies",
  //     icon:<AiFillHome className="lg:text-8xl opacity-30"/>,
  //     cardBackgroundColor:'bg-[#128799]',
  //     buttonColor:'bg-[#0e6a78]',
  //     buttonHoverColor:'hover:bg-[#0a515c]',
  //     link:'/'
  //   },
  
  {
    number:data?.totalOpenings?data?.totalOpenings:0,
    title:"ERF List",
    key:'view_jobs',
    icon:<FaDatabase className="lg:text-6xl opacity-30"/>,
    cardBackgroundColor:'bg-sky-300 hover:bg-cyan-800 duration-100 delay-100',
    buttonColor:'bg-sky-600 delay-100 duration-100',
    buttonHoverColor:'hover:bg-cyan-500',
    link:'/admin/newerf'
  },
  {
    number:data?.condidatestore?data?.condidatestore:0,
    title:"Candidate Database",
    key:'add_job_applications',
    icon:<FaDatabase className="lg:text-6xl opacity-30"/>,
    cardBackgroundColor:'bg-sky-300 hover:bg-cyan-800 duration-100 delay-100',
    buttonColor:'bg-sky-600 delay-100 duration-100',
    buttonHoverColor:'hover:bg-cyan-500',
    link:'/admin/candidatestore'
  },
    // {
    //   number:data?.onlineexam?data?.onlineexam:0,
    //   title:"Online Exam",
    //   icon:<FaUsers className="md:text-5xl opacity-30"/>,
    //   key:'view_exam',
    //   cardBackgroundColor:'bg-sky-300',
    //   buttonColor:'bg-sky-600',
    //   buttonHoverColor:'hover:bg-green-800',
    //   link:'/admin/examassigneelists'
    // },
    {
      number:data?.totalApplications?data?.totalApplications:0,
      title:"Total Applications",
      key:'view_job_applications',
      icon:<BsFiles className="lg:text-6xl opacity-30"/>,
      cardBackgroundColor:'bg-sky-300',
      buttonColor:'bg-sky-600',
      buttonHoverColor:'hover:bg-[#a67f0a]',
      link:'/admin/filterjobapplication',
      data:'total'
    },
    {
      number:data?.totalHired?data?.totalHired:0,
      title:"Total Hired",
      key:'add_job_applications',
      icon:<FaUserPlus className="lg:text-7xl opacity-30"/>,
      cardBackgroundColor:'bg-sky-300',
      buttonColor:'bg-sky-600',
      buttonHoverColor:'hover:bg-[#147d5e]',
      link:'/admin/filterjobapplication',
      data:'hired'
    },
    {
      number:data?.totalRejected?data?.totalRejected:0,
      title:"Total Rejected",
      key:'add_job_applications',
      icon:<IoMdCloseCircle className="lg:text-7xl opacity-30"/>,
      cardBackgroundColor:'bg-sky-300',
      buttonColor:'bg-sky-600',
      buttonHoverColor:'hover:bg-[#8f252f]',
      link:'/admin/filterjobapplication',
      data:'rejected'
    },
    // {
    //   number:data?.newApplications?data?.newApplications:0,
    //   title:"New Applications",
    //   key:'add_job_applications',
    //   icon:<IoMdSearch className="lg:text-7xl opacity-30"/>,
    //   cardBackgroundColor:'bg-sky-300',
    //   buttonColor:'bg-sky-600',
    //   buttonHoverColor:'hover:bg-[#43484d]',
    //   link:'/admin/filterjobapplication',
    //   data:'applied'
    // },
    {
      number:data?.interviewround1?data?.interviewround1:0,
      title:"Interview Round 1",
      key:'view_schedule',
      icon:<IoMdCheckmarkCircleOutline className="lg:text-7xl opacity-30"/>,
      cardBackgroundColor:'bg-sky-300',
      buttonColor:'bg-sky-600',
      buttonHoverColor:'hover:bg-[#500fba]',
      link:'/admin/interviewschedule',
      data:'interview round 1'
    },
    {
      number:data?.interviewround2?data?.interviewround2:0,
      title:"Interview Round 2",
      key:'view_schedule',
      icon:<IoMdVideocam className="lg:text-7xl opacity-30"/>,
      cardBackgroundColor:'bg-sky-300',
      buttonColor:'bg-sky-600',
      buttonHoverColor:'hover:bg-[#b05910]',
      link:'/admin/interviewschedule',
      data:'interview round 2'
    }
]

// const filteringData = DASHBOARD_LINKS&&DASHBOARD_LINKS.filter((x)=>localData?.data?.userPermissions?.find(y=>y?.includes(x?.key)))
// console.log('filtering data',filteringData)

  return (
    <>
    {
        showModal? <DashBoardModal showModal={showModal} setShowModal={setShowModal}/>: null
    }
      <div className="lg:px-4 mt-4 lg:py-0 py-2 px-2 w-full ">
        <div className="grid  grid-cols-2 lg:gap-4 gap-2 lg:grid-cols-4 ">
          {DASHBOARD_LINKS &&
            DASHBOARD_LINKS.filter((x)=>localData?.data?.userPermissions?.find(y=>y?.includes(x?.key))).map((dashboard, index) => (
              <div
                key={index}
                className={`w-full flex shadow flex-col h-36 bg-sky-400 group  rounded-lg`}
              >
                <div className="lg:p-4 p-2 flex-1 items-center group-hover:bg-sky-200 group-hover:opacity-300 justify-between rounded-lg">
                  <div className="lg:flex items-center justify-between">
                    <div className="text-white group-hover:text-sky-900 lg:text-left text-center h-24">
                      <span className="block lg:text-4xl lg:text-left text-center text-4xl font-bold py-1">
                        {dashboard.number}
                      </span>
                      <span className="text-sm text-white group-hover:text-sky-800 lg:py-1 py-0 lg:text-left text-center">{dashboard.title}</span>
                    </div>
                    <div className="lg:block hidden cursor-pointer ">{dashboard.icon}</div>
                  </div>
                </div>
                <button
                onClick={()=>navigate(dashboard?.link,{state:dashboard?.data})}
                  className={`flex rounded-b-lg text-white justify-center bg-sky-600 hover:bg-sky-700  w-full items-center`}
                >
                  <span className="px-2">More info </span>
                  <span>
                    <BsArrowRightCircleFill />
                  </span>
                </button>
              </div>
            ))}
        </div>
        {/* <div className="grid lg:grid-cols-2 grid-cols-1 my-10 gap-4">
          <div className="rounded w-full px">
            <div className="bg-sky-600 flex items-center justify-between rounded-t-md text-white">
              <span className="px-4 text-xl font-semibold">Pending Tasks</span>
              <button className="bg-sky-500 rounded-tr-md p-[18px] hover:bg-sky-700" onClick={()=>setShowModal(true)}>
                <FaPlus />
              </button>
            </div>
            <div className="bg-sky-200 p-2">
              <div className="bg-sky-300 text-center p-2">
                <span className="text-2xl text-white ">
                  No pending tasks are available!
                </span>
              </div>
            </div>
          </div>
          <div className="rounded w-full px">
            <div className="bg-sky-600 flex items-center rounded-t-md py-3  text-white">
              <span className="px-4 font-semibold text-xl">
                Completed Tasks
              </span>
            </div>
            <div className="bg-sky-200 p-2">
              <div className="bg-sky-300 text-center p-2">
                <span className="text-2xl text-white">
                  No tasks are marked as completed.
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Dashboard;

