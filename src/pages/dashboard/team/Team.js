import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaRegEdit  } from "react-icons/fa";
import { AiOutlineDelete  } from "react-icons/ai";
import { FiArrowRight } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../../../components/Table';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

const Team = () => {
    const [teamList, setTeamList] = useState();
    const [name,setName] = useState()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showEditButton,setShowEditButton] = useState(false)
    const [showDeleteButton,setShowDeleteButton] = useState(false)
    const [phone,setPhone] = useState('')
    const [file,setFile] = useState()
    const [role,setRole] = useState('')
    const [image,setImage] = useState('')
    const [userId,setUserID] = useState('')
    const [roleList, setRoleList] = useState();
    const [showEditTeamModal, setShowEditTeamModal] = useState(false);
    const [editTeam,setEditTeam] = useState('')
    const [contentEdit,setContentEdit] = useState('')
    const [search,setSearch] = useState('')
    const data = localStorage.getItem("data");
    const jsonData = JSON.parse(data);
    const accessToken = jsonData && jsonData?.access_token;
    const authorize = "Bearer" + " " + accessToken;
    const getTeamApi = async () => {
      const request = await fetch(`${process.env.REACT_APP_API_URL}team`, {
        method: "GET",
        headers: {
          'Authorization': `${authorize}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const jsonResponse = await request?.json();
      //  console.log("team",jsonResponse )
      
      if (jsonResponse) {
        setTeamList(jsonResponse?.data);
      }
    };
    //====Get ROLE API call=====//
    const getRoleAPI= async ()=>{
      const request = await axios.get(`${process.env.REACT_APP_API_URL}role`,{
        headers:{
          'Authorization': `${authorize}`,
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      if(request.status===200){
     
        setRoleList(request?.data?.data)
      }else{
        console.log("somting went worngs")
      }
     
    }

    const navigate = useNavigate()
    const location= useLocation()
    useEffect(()=>{
      if(jsonData?.data?.userPermissions.find(a=>a === "edit_team"))
      {
        setShowEditButton(true)
      }else{
        setShowEditButton(false)
      }
      (jsonData?.data?.userPermissions.find(a=>a === "delete_team"))?setShowDeleteButton(true):setShowDeleteButton(false)
    },[showEditButton,showDeleteButton])

    useEffect(()=>{
      if(jsonData?.data?.userPermissions.find(a=>a === "view_team")){
        return
      }else{
        navigate('/admin')
      }
      
    },[location])

    //==End  role APi====//

    //Update Role===

    const Hendler= async (e,team)=>{
      
       const request = await fetch(`${process.env.REACT_APP_API_URL}team/change-role`,{
        method:'Post',
        headers:{
          'Authorization': `${authorize}`,
          "Content-type": "application/json;",
        },
        body:JSON.stringify({
          'teamId':team?.id,
          'roleId':e.target.value
        })
      })
           
    }

    useEffect(() => {
      getTeamApi();
      getRoleAPI();
      document.title="CIPLCRM | Team List"
    }, [showEditTeamModal]);
  
    // const tableHeading = ["S. No.", "Name","Role Name","Action"];
    const tableHeading = [
      {
        name: 'S. No.',
        selector: (row, index) => index + 1,
        sortable: false,
        maxWidth:"fit-content"
      },
      {
        name: 'Name',
        selector: row => 
        <div className='flex items-center'>
          <img
          src={row?.profile_image_url}
          className="w-10 rounded-full mr-2 h-10"
          />
          {row?.name}
        </div>
        ,
        sortable: false,
        minWidth:"fit-content"
        
      },
      {
        name: 'Role Name',
        selector: row => (
          
            row?.roles[0]?.id===1 ?
            <span>Administrator</span>:
            
              jsonData?.data?.userPermissions?.find(x=>x?.includes('edit_team'))?
          <select class = "roles" className="border border-gray-700 rounded h-8 w-content" onChange={(e)=>Hendler(e,row)}>
            {
              roleList&&roleList?.map((role)=>
              (
                
                  role?.id!==1 ? 
                  <option key={role?.id} value={role?.id} selected={row?.roles[0]?.id===role.id ? true:false}>{role?.display_name}</option>
                :null
              ))
            }   
        </select>
          :
          <select disabled class = "roles" className="border border-gray-700 rounded h-8 w-content" onChange={(e)=>Hendler(e,row)}>
            {
              roleList&&roleList?.map((role)=>
              (
                
                  role?.id!==1 ? 
                  <option key={role?.id} value={role?.id} selected={row?.roles[0]?.id===role.id ? true:false}>{role?.display_name}</option>
                :null
              ))
            }   
        </select>
        ),
        sortable: false,
        minWidth:"fit-content"
        
      },
      {
        name: 'Action',
        selector: row => (
          <>   
          {
            jsonData?.data?.userPermissions?.find(x=>x?.includes('edit_team'))?
          <button
          onClick={() =>{
            setShowEditTeamModal(true)
            setName(row?.name)
            setEmail(row?.email)
            setPhone(row?.mobile)
            setImage(row?.profile_image_url)
            setRole(row?.roles[0]?.id)
            setUserID(row?.id)
          }}
          className=""
        >
          <FaEdit
            className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer"
            fill="white"
            size={30}
            title='Edit'
          />
        </button>
        :null
          }                         
        {
        row?.roles[0]?.id!==1?
          jsonData?.data?.userPermissions?.find(x=>x?.includes('delete_team'))?
         <button
         className=""
         to="#"
         onClick={async () => {
          Swal.fire({
            title: 'Are you sure you want to delete this ?',
            text: "After deleting all related data would be deleted and can not be retrived. So before deleting make sure you have back up of all related data.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
              await fetch(`${process.env.REACT_APP_API_URL}team/delete/${row?.id}`,
            {
              method:'GET',
              headers: {
                'Authorization': `${authorize}`,
                "Content-type":"application/json; charset=UTF-8",
              }
            })
            getTeamApi()
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
         <AiOutlineDelete
           size={30}
           className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white"
           title='Delete'
         />
       </button>
       :null:null
        }
          </>
        ),
        sortable: false,
      },
    ];

    
  const filteredData = teamList && teamList?.filter((data)=>data?.name?.toLowerCase().includes(search))

  // console.log("Team List",teamList)
  
    return (
      <div>
        <ToastContainer position='top-center'/>
        {showEditTeamModal ? 
          <>
            <div className="justify-center items-center h-screen flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 m-4  outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto pt-4 h-full max-w-3xl">
                {/* {/content/} */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/* {/header/} */}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">Edit Team List</h3>
                    <button
                      className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
                      onClick={() => setShowEditTeamModal(false)}
                    >
                      <span className=" text-red-500 h-6 w-6 text-xl block ">
                        X
                      </span>
                    </button>
                  </div>
                  {/* {/body/} */}
                  <form >
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
                            <div className="md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1">
                                <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input required value={name?name:""} onChange={(e)=>setName(e.target.value)} type="text" className="shadow appearance-none border rounded w-auto py-1 px-1 text-black" />
                            </div>
                            <div className="md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1">
                                <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input disabled value={email?email:""} onChange={(e)=>setEmail(e.target.value)} type="email" class="shadow appearance-none border rounded max-w-3xl py-1 px-1 text-black" />
                            </div>
                            <div className="md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1">
                                <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input required placeholder={`Don't Edit Field if you don't wanna change`} onChange={(e)=>setPassword(e.target.value)} type="password" className="shadow appearance-none border rounded w-auto py-1 px-1 text-black" />
                                {/* <span className="help-block"> (length: min-6 Character)</span> */}
                            </div>
                            <div className="md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1">
                                <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <input required value={phone?phone:""} maxLength={10} onChange={(e)=>setPhone(e.target.value)} type="text" className="shadow appearance-none border rounded w-auto py-1 px-1 text-black" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {
                                      image?
                                      <img src={image} alt='Profile Image'/>
                                      :
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" >
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    }
                                    <div className="flex text-sm justify-center text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            {/* <span>Upload a file</span> */}
                                            <input onChange={(e)=>setFile(e.target.files[0])} type="file" accept='jpg,jpeg,png' className="" />
                                        </label>
                                        {/* <p className="pl-1">or drag and drop</p> */}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                  </div>
                  </form>
                  {/* {/footer/} */}
                  <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                      type="button"
                      onClick={async(e) => {
                        e.preventDefault()
                        try {
                          const formData = new FormData()
                          formData.append('name',name)
                          formData.append('email',email)
                          formData.append('password',password?password:"")
                          formData.append('mobile',phone)
                          formData.append('role_id',role)
                          formData.append('image',file)
                          const request = await axios.postForm(`${process.env.REACT_APP_API_URL}team/update/${userId}`,formData,{
                              headers:{
                                  'Authorization':`${authorize}`,
                                  'Content-Type': 'multipart/form-data',
                                  'Accept': 'js'
                              }
                          })
                          const response = await request.data
                          // console.log("UPdate",response)
                          getTeamApi()
                          if(response.code ===200){
                            toast.success(`${response?.message}`)
                            showEditTeamModal(false)
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
                    >
                      Update
                      <FiArrowRight className="text-xl px" />
                    </button>
                    <button className='bg-red-500 hover:bg-red-600 uppercasae font-bold text-sm px-6 py-3 rounded shadow tranistion-all duration-150 mr-1 mb-1 text-white'
                    onClick={()=>setShowEditTeamModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
         : null}
        <div className="mt-4 px-4 border border-gray-300 rounded-lg bg-white mx-4">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="py-3 flex justify-end pr-2">
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
                    onChange={(e)=>setSearch(e.target.value.toLowerCase())}
                  />
                </div>
              </div>
              <div className="lg:p-1.5  pb-6 pt-2 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <Table data={filteredData} columns={tableHeading}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Team