import axios from 'axios'
import React from 'react'
import { BsFiles } from 'react-icons/bs'
import {FaUserPlus,FaChartPie, FaUsers, FaDatabase} from 'react-icons/fa'
import {IoMdCloseCircle, IoMdSearch, IoMdCheckmarkCircleOutline, IoMdVideocam} from 'react-icons/io'


const localData = JSON.parse(localStorage.getItem('data'))

let newData=""

const dashboardApi = async () => {
  try {
    const request = await axios.get(`${process.env.REACT_APP_API_URL}dashboard`, {
      headers: {
        'Authorization': `Bearer ${localData?.access_token}`,
      }
    })
    const response = request?.data
    // console.log('response',response)
    return response?.data
  } catch (error) {
    console.error(error)
    return null
  }
}

// Usage
dashboardApi()
  .then((data) => {
    newData=data
    console.log("new Data",newData)
    // console.log('newData:', data)
    // Do something with newData here
  })
  .catch((error) => {
    console.error(error)
  })


export const DASHBOARD_LINKS=[
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
      number:0,
      title:"Candidate Database",
      icon:<FaDatabase className="lg:text-6xl opacity-30"/>,
      cardBackgroundColor:'bg-sky-300 hover:bg-cyan-800 duration-100 delay-100',
      buttonColor:'bg-sky-600 delay-100 duration-100',
      buttonHoverColor:'hover:bg-cyan-500',
      link:'/'
    },
      {
        number:newData,
        title:"Total Openings",
        icon:<FaUsers className="md:text-5xl opacity-30"/>,
        cardBackgroundColor:'bg-sky-300',
        buttonColor:'bg-sky-600',
        buttonHoverColor:'hover:bg-green-800',
        link:'/'
      },
      {
        number:44,
        title:"Total Applications",
        icon:<BsFiles className="lg:text-6xl opacity-30"/>,
        cardBackgroundColor:'bg-sky-300',
        buttonColor:'bg-sky-600',
        buttonHoverColor:'hover:bg-[#a67f0a]',
        link:'/'
      },
      {
        number:65,
        title:"Total Hired",
        icon:<FaUserPlus className="lg:text-7xl opacity-30"/>,
        cardBackgroundColor:'bg-sky-300',
        buttonColor:'bg-sky-600',
        buttonHoverColor:'hover:bg-[#147d5e]',
        link:'/'
      },
      {
        number:10,
        title:"Total Rejected",
        icon:<IoMdCloseCircle className="lg:text-7xl opacity-30"/>,
        cardBackgroundColor:'bg-sky-300',
        buttonColor:'bg-sky-600',
        buttonHoverColor:'hover:bg-[#8f252f]',
        link:'/'
      },
      {
        number:40,
        title:"New Applications",
        icon:<IoMdSearch className="lg:text-7xl opacity-30"/>,
        cardBackgroundColor:'bg-sky-300',
        buttonColor:'bg-sky-600',
        buttonHoverColor:'hover:bg-[#43484d]',
        link:'/'
      },
      {
        number:4,
        title:"Shortlisted Candidates",
        icon:<IoMdCheckmarkCircleOutline className="lg:text-7xl opacity-30"/>,
        cardBackgroundColor:'bg-sky-300',
        buttonColor:'bg-sky-600',
        buttonHoverColor:'hover:bg-[#500fba]',
        link:'/'
      },
      {
        number:5,
        title:"Today Interviews",
        icon:<IoMdVideocam className="lg:text-7xl opacity-30"/>,
        cardBackgroundColor:'bg-sky-300',
        buttonColor:'bg-sky-600',
        buttonHoverColor:'hover:bg-[#b05910]',
        link:'/'
      }
]