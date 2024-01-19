import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const ListAssignee = () => {
    const {state} = useLocation()
    const [data,setData] = useState('')
    // console.log("State Data",state)
    const jsonData = JSON.parse(localStorage.getItem('data'));
    const accessToken = jsonData?.access_token;
    const authorize = "Bearer" + " " + accessToken;
    const getData = async()=>{
        const request = await axios.get(`${process.env.REACT_APP_API_URL}job-applications/${state}`,{
            headers:{
                'Authorization':`${authorize}`
            }
        })
        const response = request.data
        if(response){
            setData(response?.data)
        }
    }
    useEffect(()=>{
        getData()
    },[])
    
    console.log("List of Assign Data",data)

    const tableHeading=[
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
          
        }
      ]


  return (
    <div className='w-full p-2'>
        <DataTable
        data={data}
        columns={tableHeading}
        pagination
        style={{padding:'2px'}}
        />
    </div>
  )
}

export default ListAssignee