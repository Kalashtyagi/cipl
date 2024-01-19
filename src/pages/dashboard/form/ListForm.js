import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdEye } from 'react-icons/io';
import {HiPlus} from 'react-icons/hi'
import { AiOutlineFileText } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ViewErf from './ViewERF';

const ListForm = () => {
  const [showForm,setShowForm] = useState(false)
  const [showFormId,setShowFormId] = useState('')
  const [searchAssignee,setSearchAssignee] = useState('')
    const [listForm, setListForm] = useState("");
    const [teamList,setTeamList] = useState('')
    const [showModal,setShowModal] = useState(false)
    // const [search,setSearch] = useState('')
    const [jobId,setJobId] = useState('')
    const baseUrl = process.env.REACT_APP_API_URL;
  
    //   console.log("baseurl", baseUrl);
    const data = localStorage.getItem("data");
    const jsonData = JSON.parse(data);
    const accessToken = jsonData?.access_token;
    const authorize = "Bearer" + " " + accessToken;
    const navigate = useNavigate();
    // console.log("authorize", authorize);

    const teamApiCall = async () => {
      const request = await fetch(`${baseUrl}team`, {
        method: "get",
        headers: {
          'Authorization': `${authorize}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await request.json();
      if (response?.data) {
        setTeamList(response?.data);
      }
      // console.log(response);
    };
  
    const getData = async () => {
      // alert("Data called")
      const getApiData = await axios.get(`${baseUrl}erf`, {
        headers: {
          'Authorization': `${authorize}`,
        },
      });
      const apiResonse = await getApiData.data;
      
      if (apiResonse) {
        setListForm(apiResonse.data);
      }
    };
    
    const location = useLocation()

    useEffect(()=>{
      if(jsonData?.data?.userPermissions.find(a=>a === "view_department")){
        return
      }else{
        navigate('/admin')
      }
    },[location])


    useEffect(()=>{
        getData()
        teamApiCall()
    },[setShowModal])

    const tableHeading=[
      {
        name: 'S. No.',
        selector: (row,index) => index+1,
        sortable: false,
        maxWidth:'fit-content'
      },
      {
        name: 'PID',
        selector: row => row?.pid,
        sortable: true,
        
      },
      {
        name: 'Recruitment',
        selector: row => (row?.recruitment === 0 ?"New":"Replacement"),
        sortable: true,
        
      },
      {
        name: 'Department',
        selector: row => (
          <>
          {row?.department?.name == null? "": row?.department?.name}
          {/* {console.log("department name",row?.department?.name)} */}
          </>
        ),
        sortable: true,
        
      },
      {
        name: 'Manager',
        selector: row => row?.project_manager,
        sortable: true,
        
      },
      {
        name: 'Start Date',
        selector: row => row?.start_date,
        sortable: true,
        
      },
      {
        name: 'ERF Status',
        selector: row =>(
            row?.status === "0"
              ? 
              <div>
                <span className='break-all'>Waiting for MD Approval</span>
              </div>
              : row?.status === "1"
              ? <button onClick={() =>{
                setJobId(row?.id) 
                setShowModal(!false)}} className="bg-gray-200 px-2 py-1 hover:bg-gray-100">Assign</button>
              : row?.status === "3"? <span className='break-all'>Already Assigned</span>: "NA"
          ),
        sortable: false,
        
      },
      {
        name: 'Assigned To',
        selector: row => row?.jobassign?.name,
        sortable: false,
        
      },
      {
        name: 'Action',
        selector: row => (
          <div className=" flex py-4 justify-start w-32 overflow-hidden text-sm text-gray-800 whitespace-nowrap">
            {
            jsonData?.data?.roles?.id === 1 || row?.assign_id === jsonData?.data?.id ?
            <Link to="/admin/addassignee" state={row}>
          <HiPlus className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white hover:bg-gray-900' />
            </Link>
          : null
          }
          {
            row?.status === "0"?
            null:
            <button onClick={()=>{
              setShowForm(true)
              setShowFormId(row?.id)
            }
            } >
            <IoMdEye className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white hover:bg-gray-900'/>
            </button>
          }
          {
            jsonData?.data?.roles?.id === 1 || row?.assign_id === jsonData?.data?.id ?
            <Link to="/admin/listassignee" state={row?.id}>
            <AiOutlineFileText className='bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer text-white hover:bg-gray-900'/>
            </Link>:null
          }
          </div>
        ),
        sortable: false,
        allowOverflow: true
      },
    ]

    // const filteredData = listForm && listForm?.filter((data)=>data?.name?.toLowerCase().includes(search))
    // console.log("Filtered Data", filteredData)

  return (
    <div className='w-full'>
      {showModal ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-6 mx-2 w-1/3">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between lg:p-5 p-4 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Select Assignee</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-red-500  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative lg:p-6 p-2 flex-auto">
                    <section className="lg:p-4 p-2 w-full rounded border m-4 ">
                      <div className="lg:p-4 p-2">
                        <div className="table-responsive m-t-40">
                          <div
                            id="myTable_wrapper"
                            className="dataTables_wrapper dt-bootstrap4 no-footer"
                          >
                            <div className="flex justify-end">
                              <div className="">
                                <div
                                  className="dataTables_length"
                                  id="myTable_length"
                                ></div>
                              </div>
                              <div className=" col-span-12 md:col-span-6 ">
                                <div
                                  id="myTable_filter"
                                  className="dataTables_filter"
                                >
                                  <label>
                                    Search:
                                    <input
                                      type="search"
                                      className="form-control form-control-sm rounded border p-2 mx-2"
                                      placeholder=""
                                      onChange={(e)=>setSearchAssignee(e.target.value.toLowerCase())}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                                <div className="h-40 my-2 overflow-y-auto no-scrollbar rounded-md justify-between w-26 px-4 py-2 bg-slate-200">
                                  {teamList &&
                                    teamList?.filter(teamName=>teamName?.name.toLowerCase().includes(searchAssignee)).map((team) => {
                                      return (
                                        <div
                                          key={team?.id}
                                          className=" bg-gray-100 mt-1 overflow-y-auto p-2 shadow-lg w-full rounded-bl rounded-br max-h-36 "
                                        >
                                          <div className="p-2 flex">
                                            <button onClick={async()=>{
                                              await fetch(`${baseUrl}lead/assignlead`, {
                                                method: "post",
                                                headers: {
                                                  'Authorization': `${authorize}`,
                                                  "Content-type": "application/json; charset=UTF-8",
                                                },
                                                body:JSON.stringify({
                                                  job_id:`${jobId}`,
                                                  user_id:`${team?.id}`
                                                })
                                              });
                                              setShowModal(!showModal)
                                              getData()
                                            }}>{team?.name}</button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Assign Here
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
      ) : null}
      {
        showForm?
        <ViewErf showFormId={showFormId&&showFormId} setShowForm={setShowForm} showForm={showForm}/>:
        null
      }
      <div className="lg:p-4 p-1 w-auto rounded border lg:m-4 ml-1 mx-4 m-2 bg-white w-content">
        <div className="w-full">
          
          <DataTable
            columns={tableHeading}
            data={listForm}
            pagination
            style={{overflowX:'scroll', padding:"1px"}}
          />
        </div>
      </div>
    </div>
  );
}

export default ListForm