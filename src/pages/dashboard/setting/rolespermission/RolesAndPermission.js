import React, { useEffect, useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs';
import { useSelector,useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTag } from 'react-icons/fa';
import Table from '../../../../components/Table';

const RolesAndPermission = () => {
  const navigate = useNavigate()
  const [search,setSearch] = useState('')
  const [newRoleName,setNewRoleName] = useState('')
  const [roleId,setRoleId]  = useState('')
  const [roles,setRoles] = useState('')
  const selectRole = useSelector((state)=>state.roles)
  const getData = localStorage.getItem("data");
  const jsonData = JSON.parse(getData);
  
const data = JSON.parse(localStorage.getItem('data'))
const token = 'Bearer'+" "+ data?.access_token

useEffect(()=>{
  if(jsonData.data?.userPermissions.find(a=>a === "manage_settings")){
    return
  }else{
    navigate('/admin')
  }
},[])

  const getRoles = async()=>{
    const rolesRequest = await fetch(`${process.env.REACT_APP_API_URL}role`,{
      headers:{
          'Authorization':`${token}`,
          "Content-type": "application/json; charset=UTF-8",
      }
     })
     const rolesResponse = await rolesRequest.json()
     if(rolesResponse){
      setRoles(rolesResponse?.data)
     }
  }

  useEffect(()=>{
    getRoles()
  },[])

  const handleSubmit = async()=>{
    if(roleId){
      await fetch(`${process.env.REACT_APP_API_URL}role/update/${roleId}`,{
        method:"POST",
        headers:{
            'Authorization':`${token}`,
            "Content-type": "application/json; charset=UTF-8",
        },
        body:JSON.stringify({
          name:`${newRoleName}`
        })
       })
      }else{
      await fetch(`${process.env.REACT_APP_API_URL}role/store`,{
        method:"POST",
        headers:{
            'Authorization':`${token}`,
            "Content-type": "application/json; charset=UTF-8",
        },
        body:JSON.stringify({
          name:`${newRoleName}`
        })
       })

    }
    getRoles()
  }


  // const tableHeading = ["Role","Action"]

  const tableHeading = [
    {
      name: 'Role',
      selector: row => row.display_name,
      sortable: false,
      
    },
    {
      name: 'Action',
      selector: row => (
        <div className='flex justify-center'>
        <div className='group flex items-center'>
        <button
        onClick={()=>{
          navigate('/admin/assignpermission',{
            state:row
          })
        }}
        >
        <div
          className='relative text-center  rounded-sm'>
          <div class="group no-underline cursor-pointer relative inline-block text-center">
        <FaTag className='hover:bg-white p-1 mr-1 text-xl'/>
            <div class="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
              Assign Permission
            </div>
          </div>
        </div>
        </button>
        </div>
        <div className='group flex items-center'>
        <button onClick={(e)=>{
          e.preventDefault()
          setNewRoleName(row?.name)
          setRoleId(row?.id)
          }}>
        <div
          className='relative text-center  rounded-sm'>
          <div class="group no-underline cursor-pointer relative inline-block text-center">
        <FaPencilAlt className='hover:bg-white ml-1 p-1 text-xl'/>
            
            <div class="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
              Edit Name
            </div>
          </div>
        </div>
        </button>
        </div>
        </div>
      ),
      sortable: false,
    },
  ];

  // filter data
  
  const filteredData = roles && roles?.filter((data)=>data?.name?.toLowerCase().includes(search))

  return (
    <div className='w-full p-4'>
      <div className="lg:p-1.5  pb-6 pt-2 w-full inline-block align-middle">
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
          <div className='col-span-1 lg:col-span-1 border border-primary p-3 bg-white h-52 rounded-sm border-t-4 shadow'>
            <h2 className='text-xl border-gray-300'>Role</h2>
            <form>
            <div className='py-4 border-t border-b'>
              <div>
                <h3>Name <span className='px text-red-500'>*</span></h3>
                  <input
                  required
                  type="text"
                  value={newRoleName?newRoleName:""}
                  onChange={(e)=>setNewRoleName(e.target.value)}
                  className="p-2 border rounded border-gray-300 w-full"
                  />
              </div>
            </div>
            <div className='flex py-2 justify-end'>
            <input
            type="submit"
            value={"Save"}
            className="px-4 py-2 cursor-pointer hover:bg-gray-800 bg-primary text-white rounded-sm"
            onClick={async(e)=>{
              e.preventDefault()
              handleSubmit(e)
              }}
            />
            </div>
            </form>
          </div>
          <div className='col-span-1 lg:col-span-2 border border-primary p-3 bg-white rounded-sm border-t-4 shadow'>
          <h2 className='text-xl border-gray-300'>Role List</h2>
            <form>
            <div className='py-4 border-t'>
              <div>
                {/* <h3>Name <span className='px text-red-500'>*</span></h3> */}
                  <input
                  type="text"
                  className="p-1 border-b border-gray-300"
                  placeholder='Search...'
                  onChange={(e)=>setSearch(e.target.value)}
                  />
                  <div>

                  </div>
              </div>
            </div>
            <div className=' lg:p-1.5  pb-6 w-full'>
              <div  className="overflow-hidden text-[14px]">
                <Table data={filteredData} columns={tableHeading}/>
              </div>
            </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default RolesAndPermission