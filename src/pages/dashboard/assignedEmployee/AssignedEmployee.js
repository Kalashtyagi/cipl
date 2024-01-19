import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Table from "../../../components/Table";
import { BiTransferAlt } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';

const AssignedEmployee = () => {
    const { state } = useLocation()
    // console.log("state",state?.rowid)
    const [assignData, setAssignData] = useState('')
    const [searchAssignee,setSearchAssignee] = useState('')
    const [teamList, setTeamList] = useState()
    const [search, setSearch] = useState('')
    const [rowId,setRowId] = useState('')
    const [numberOfPosition,setNumberOfPosition] = useState('')
    const [showModal,setShowModal] = useState(false)
    const [userId,setUserId] = useState('')
    const [assignedPosition,setAssignedPosition] = useState('')
    const [remainingPositions,setRemainingPositions] = useState()

    const localData = JSON.parse(localStorage.getItem('data'))

    const teamApiCall = async () => {
        const request = await fetch(`${process.env.REACT_APP_API_URL}team`, {
          method: "get",
          headers: {
            'Authorization': `Bearer ${localData?.access_token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const response = await request.json();
        // console.log('response',response)
        if (response?.data) {
          setTeamList(response?.data?.filter(x=>x?.roles[0]?.name?.includes('Recruiter')));
        }
        // console.log(response);
      };

      const handleChange = (e)=>{
        const inputValue = parseInt(e.target.value)
  
        if (isNaN(inputValue)) {
          // input value is not a number, do not update state
          return
        }
      
        if (inputValue > parseInt(numberOfPosition)) {
          setAssignedPosition(parseInt(remainingPositions))
        } else {
          setAssignedPosition(inputValue)
        }
      }

    // const handleChange= (e)=>{
    //   const inputValue = e.target.value
    //   console.log('input value',inputValue)
    //   if (inputValue > parseInt(numberOfPosition)) {
    //     inputValue = parseInt(remainingPositions)
    //   }
    //   setAssignedPosition(parseInt(inputValue))
    //   }

    const getList = async () => {
        try {
            const request = await axios.get(`${process.env.REACT_APP_API_URL}lead/details/${state?.rowid}`, {
                headers: {
                    'Authorization': `Bearer ${localData?.access_token}`
                }
            }
            )
            const response = await request.data
            if (response?.code === 200) {
                setAssignData(response?.data)
                // console.log('response',response)
            } else {
                const issue = { issue: response?.message }
                console.log('Issue', issue)
            }
        } catch (error) {
            console.error('Error', error)
        }
    }
    useEffect(() => {
        getList()
    }, [])

    const tableHeading = [
        {
            name: 'S. No.',
            selector: (row, index) => index + 1,
            sortable: false,
        },
        {
            name: 'Name',
            selector: row => row?.leadassigned?.name,
            sortable: false,
        },
        {
            name: 'Email',
            selector: row => row?.leadassigned?.email,
            sortable: false,
        },
        {
            name: 'Positions',
            selector: row => row?.position,
            sortable: false,
        },
        {
            name: 'Status',
            selector: row => row?.status,
            sortable: false,
        },
        {
            name: 'Transfer To',
            selector: row => row?.transfer === null || undefined ||''?"":row?.transfer?.name,
            sortable: false,
        },
        {
            name: 'Action',
            selector: row => (
              <div className="">
                    <button
                    onClick={() => {
                        setRowId(row?.id)
                        setNumberOfPosition(row?.position)
                        setRemainingPositions(row?.position)
                        teamApiCall()
                        setShowModal(true)
                    }}
                      className=""
                    >
                      <BiTransferAlt
                        className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer"
                        fill="white"
                        size={30}
                      />
                    </button>
              </div>
            ),
            sortable: false,
            justifyContent: 'center',
          },
    ]

    useEffect(()=>{
      if(parseInt(remainingPositions)<=parseInt(numberOfPosition) && parseInt(remainingPositions) >=0){
        const numberMap = assignedPosition && parseInt(assignedPosition)
        // console.log('fileterd number',filteredNumbers)
        const subsValue = parseInt(numberOfPosition)- parseInt(numberMap)
        console.log("sub values",subsValue)
        if(subsValue<0){
          setRemainingPositions(0)
        }else{
          setRemainingPositions(parseInt(subsValue))
        }
      }
    },[assignedPosition])


    const filterData = assignData && assignData?.filter((x) => x?.leadassigned?.name?.toLowerCase().includes(search))
    return (
        <div className='p-4'>
                  <ToastContainer position='top-center' />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/3">
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
                <div className="relative flex-auto">
                  <form className="p-3 w-full rounded ">
                    <div className="p-2 border rounded">
                      <div className="table-responsive m-t-20">
                        <div
                        >
                          <div className="flex justify-end">
                            <div className="">
                              <div></div>
                            </div>
                            <div className=" col-span-12 md:col-span-6 ">
                              <div
                              >
                                <label>
                                  Search:
                                </label>
                                <input
                                  type="search"
                                  className="form-control form-control-sm rounded border p-2 ml-2"
                                  placeholder=""
                                  onChange={(e) => setSearchAssignee(e.target.value.toLowerCase())}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="h-52 my-2 overflow-y-auto no-scrollbar rounded-md justify-between w-26 px-4 py-2 ">
                          <div className='border p-2 border-collapse min-w-full text-left no-scrollbar  overflow-y-scroll'>
                              <div>
                                <div className='p-2 grid grid-cols-3'>
                                      <div className='p-1 pl-5' >Name</div>
                                      <div className='p-1' >Positions</div>
                                </div>
                              </div>
                                  {
                                    teamList && teamList?.filter(teamName => teamName?.name.toLowerCase().includes(searchAssignee)).map((team,index) => {
                                      return (
                              <div className='' key={index}>
                                        <div className='bg-gray-200 grid grid-cols-3 p-2 border-b border-white'>
                                          <div className='flex'>
                                          <input type='radio' checked={team?.id===userId} onChange={(e)=>setUserId(team?.id)} />
                                          <div className='p-1 pl-2'>{team.name}</div>
                                          </div>
                                          {
                                            team?.id===userId?
                                          <div className='p-1'>
                                            {/* {console.log("check filter of userid",leadInput.find(h=>h?.userId===team?.id))} */}
                                            <input name='position' type='number'
                                            // value={leadInput[index]?.position}
                                            onChange={(e)=>handleChange(e)}/>
                                          </div>
                                          :
                                          null
                                          }
                                        </div>
                              </div>
                                      )})
                                  }
                            </div>
                          </div>
                          <div className='p-2 mx-4 border'>
                          <div className='p-1 flex mb-1 px-3 bg-gray-200 justify-between'>
                            <span>Number of Position Left</span>
                            <span>{remainingPositions}</span>
                          </div>
                          <div className='p-1 flex bg-gray-200 px-3  justify-between'>
                            <span>Total Positions</span>
                            <span>{numberOfPosition}</span>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 px-6 border-t border-solid border-slate-200 rounded-b">
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
                      onClick={async(e) => {
                        e.preventDefault()
                        try {
                          const formdata = new FormData()
                          formdata.append('user_id',userId)
                          formdata.append('no_of_possition',assignedPosition)
                          const request = await axios.postForm(`${process.env.REACT_APP_API_URL}lead/transfer/${rowId}`,formdata,{
                            headers:{
                                'Authorization':`Bearer ${localData?.access_token}`,
                                'Accept':'application/json'
                            }
                          })
                          const response = await request?.data
                          if(response?.code === 200){
                            toast.success(`${response?.message}`)
                            setShowModal(false)
                            setRowId('')
                            getList()
                          }
                        } catch (error) {
                          console.log('error',error)
                          if(error?.response?.data?.error){
                              const errors = Object.values(error?.response?.data?.error)
                              console.log('Errors',errors)
                              errors.map((x)=>(
                                  toast.error(`${x}`)
                              ))
                          }
                          if(error?.response?.data?.message){
                              if(error?.response?.data?.error){
                                  const errors = Object.values(error?.response?.data?.error)
                                  console.log('Errors',errors)
                                  errors.map((x)=>(
                                      toast.error(`${x}`)
                                  ))
                              }
                              if(error?.response?.data?.message){
                                  toast.error(`${error?.response?.data?.message}`)
                              }
                          }
                      }
                      }}
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
            <h2 className='text-xl px-4'>Assigned Lead</h2>
            <div>
                <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
                    <div className="flex flex-col">
                        <div className="overflow-x-auto">
                            <div className="py-3 flex justify-end pr-2">
                                <div className="relative max-w-xs flex items-center justify-end">
                                    <label htmlFor="hs-table-search" className="px-2">
                                        Search:
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full p-3 border text-sm border-gray-300 rounded-md "
                                        placeholder="Search..."
                                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                    />
                                </div>
                            </div>
                            <div className="lg:p-1.5  mb-4 pt-2 w-full inline-block align-middle">
                                <div className="overflow-hidden border  rounded-lg">
                                    <Table columns={tableHeading} data={filterData} searchItem={search} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Alert /> */}
            </div>
        </div>
    )
}

export default AssignedEmployee