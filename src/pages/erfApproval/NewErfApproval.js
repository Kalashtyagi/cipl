import React, { useEffect, useState } from 'react'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const NewErfApproval = () => {
  const [data, setData] = useState('')
  const [note, setNote] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [alreadyApprove,setAlreadyApprove] = useState(false)

  const { pathname } = useLocation()
  console.log('data', data)


  const id = pathname.replace("/erfapproval/", "")

  const erfData = async () => {
    setAlreadyApprove(false)
    const requestErf = await fetch(`${process.env.REACT_APP_API_URL}lead/assignlink/${id}`,
      {
        method: 'get'
      }
    )
    const response = await requestErf.json()
    //   console.log("repsonse",response)
    if (response?.code ===200) {
      setData(response?.data)
      setAlreadyApprove(false)
    }if(response?.code ===404){
      setAlreadyApprove(true)
    }
  }

  console.log(alreadyApprove)

  useEffect(() => {
    erfData()
  }, [pathname])

  const showCommonData = [
    {
      label: 'ERD ID',
      value: data?.erfgroup?.erf_id
    },
    {
      label: 'PID',
      value: data?.erfgroup?.pid
    },
    {
      label: 'Project Name',
      value: data?.erfgroup?.project_name
    },
    {
      label: 'Type',
      value: data?.erfgroup?.recruitment_type
    },
    {
      label: 'Billable',
      value: data?.erfgroup?.billable_type
    },
    {
      label: 'Department',
      value: data?.erfgroup?.department?.name
    },
    // {
    //   label: 'Requisition Date',
    //   value: data?.erfgroup?.start_date
    // },
    // {
    //   label: 'Target Date',
    //   value: data?.erfgroup?.end_date
    // },
  ]



  const handleClick = async (e) => {
    // e.preventDefault()
    console.log(e)
    try {
      const request= await fetch(`${process.env.REACT_APP_API_URL}lead/approved/${id}`, {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          note: `${note}`,
          status: `${e}`
        })
      })
      const response = await request?.json()
      if(response?.code ===200){
        console.log(response)
        toast.success(`${response?.message}`)
        setTimeout(()=>{
          window.open("about:blank", "_self");
          window.close()
        },4000)
        clearTimeout()
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

  if(alreadyApprove ===false){
    return (
      <div className=' h-full'>
        <div className='p-4'>
          <h2 className='flex p-2 justify-center bg-gradient-to-r rounded-t from-primary to-gray-900 font-semibold text-white text-2xl'>ERF Approval</h2>
          <div>
            <div className='grid lg:grid-cols-3 grid-cols-2'>
              {
                showCommonData && showCommonData?.map((x, index) =>
                  <div className='p-2 w-full' key={index}>
                    <label>{x?.label}</label>
                    <input type="text" value={x?.value} className="block w-full p-2 border rounded capitalize" disabled />
                  </div>
                )
              }
            </div>
          </div>
          <div className='mx-2'>
            {
              data && data?.jobrecruitment?.map((x, index) =>
                <AccordionLayout key={x?.id} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} title={x?.location} >
                  <div className='grid lg:grid-cols-3 grid-cols-2'>
                    <div className='w-full p-2'>
                      <label>Designation</label>
                      <input type="text" value={x?.degination} className="block w-full p-2 border rounded capitalize" disabled />
                    </div>
                    <div className='w-full p-2'>
                      <label>Requisition Date</label>
                      <input type="text" value={x?.start_date} className="block w-full p-2 border rounded capitalize" disabled />
                    </div>
                    <div className='w-full p-2'>
                      <label>Target Date</label>
                      <input type="text" value={x?.end_date} className="block w-full p-2 border rounded capitalize" disabled />
                    </div>
                    <div className='w-full p-2'>
                      <label>Level</label>
                      <input type="text" value={x?.level} className="block w-full p-2 border rounded capitalize" disabled />
                    </div>
                    <div className='w-full p-2'>
                      <label>Category</label>
                      <input type="text" value={x?.category?.name} className="block w-full p-2 border rounded capitalize" disabled />
                    </div>
                    <div className='w-full p-2'>
                      <label>Skills</label>
                      <div type="text" className="block w-full bg-gray-50 after:pl-1 p-2 border rounded capitalize " >
                        {x?.skills?.map((y,index)=>
                          <span key={index} className=''>{`${y?.skill?.name}${x?.skills?.length>index?", ":""}`}</span>
                          )}
                      </div>
                    </div>
                    <div className='w-full p-2'>
                      <label>Budget</label>
                      <input type="text" value={x?.position_budgeted} className="block w-full p-2 border rounded capitalize" disabled />
                    </div>
                    <div className='w-full p-2'>
                      <label>Highest Qualification</label>
                      <span key={index} className='block w-full bg-gray-50 after:pl-1 p-2 border rounded capitalize'>
                        {
                        x?.qualification?.map((y)=>
                          y?.qualificationdetails?.name
                          )?.join(", ")
                        }
                      </span>
                      {/* <input type="text" value={x?.qualification?.name} className="block w-full p-2 border rounded capitalize" disabled /> */}
                    </div>
                    <div className='w-full p-2'>
                      <label>Skills</label>
                      <div type="text" className="block w-full bg-gray-50 after:pl-1 p-2 border rounded capitalize " >
                        {x?.subqualifications?.map((y,index)=>
                          <span key={index} className=''>{`${y?.subqualification?.name}${x?.subqualifications?.length>index?", ":""}`}</span>
                          )}
                      </div>
                    </div>
                    <div className='w-full p-2'>
                      <label>Certifcations</label>
                      <span key={index} className='block w-full bg-gray-50 after:pl-1 p-2 border rounded capitalize'>
                        {
                        x?.anycertification?.map((y)=>
                          y?.certification?.name
                          )?.join(", ")
                        }
                      </span>
                      {/* <input type="text" value={x?.anycertification?.name} className="block w-full p-2 border rounded capitalize" disabled /> */}
                    </div>
                    <div className='w-full p-2'>
                      <label>Relevant Experience</label>
                      <input type="text" value={x?.relevent_exp} className="block w-full p-2 border rounded capitalize" disabled />
                    </div>
                    <div className='w-full p-2'>
                      <label>Key Responsiblity</label>
                      <input type="text" value={x?.responsibility=== null || undefined ||""?"":x?.responsibility} className="block w-full p-2 border rounded capitalize" disabled />
                    </div>
                    <div className='w-full p-2'>
                      <label>Prerequisites</label>
                      <input type="text" value={x?.prerequisite === null || undefined|| ""?"":x?.prerequisite} className="block w-full p-2 border rounded capitalize" disabled />
                    </div>
                  </div>
                </AccordionLayout>
              )
            }
          </div>
          <div className=" col-span-3 py-2 px-2 w-full bg-gray-200 text-lg">
            Job Description
          </div>

          <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
            <div className="flex flex-col">
            { data && data?.jobrecruitment?.map((x, index) =>

              <div className="overflow-x-auto"> 

                <div className="grid grid-cols-2 mt-3">
                  <strong>Designation</strong>
                  <div>{x?.jd?.designation}</div>
                </div>

                <div className="grid grid-cols-2 mt-3">
                  <strong>Job Type</strong>
                  <div>{x?.jd?.job_type}</div>
                </div>

                <div className="grid grid-cols-2 mt-3">
                  <strong>Job Description</strong>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: x?.jd?.job_description,
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 mt-3">
                  <strong>Responsibilities</strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: x?.jd?.responsibilities,
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 mt-3 mb-4">
                  <strong>Requirements</strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: x?.jd?.requirements,
                    }}
                  />
                </div>
              </div>
            )}
            </div>
          </div>

          <div className='flex bg-gray-100 m-2 rounded justify-center px-[20%]'>
            <div className='p-2 w-full justify-center'>
              <label>Remarks</label>
              <textarea type="text" required onChange={(e) => setNote(e.target.value)} className="block w-full p-2 border rounded " />
            </div>
          </div>
          <div className='flex bg-gray-100 m-2 rounded justify-center px-[20%]'>
            <div className='p-2 w-full justify-center text-center'>
              <label className='text-center text-lg font-semibold'>Approval</label>
              <div className=" w-full p-2 justify-between rounded ">
                <button className='w-20 py-2 bg-green-600 delay-100 rounded-sm hover:bg-green-500  text-white mr-4' onClick={() => {
  
                  handleClick(3)
                }}
                >Yes</button>
                <button className='w-20 py-2 bg-red-600 delay-100 rounded-sm hover:bg-red-500 text-white ml-4' onClick={() => {
  
                  handleClick(4)
                }}>No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }else{
    return(
    <div className=' h-full'>
    <div className=''>
      <h2 className='flex p-2 justify-center bg-gradient-to-r rounded-t from-primary to-gray-900 font-semibold text-white text-2xl'>ERF Already Approved</h2>
      <div>
        <div className=''>
          <h2 className='text-lg flex justify-center p-2'>ERF Already Approved</h2>
          <p2 className="flex justify-center"> Kindly Close the tab.</p2>
        </div>
      </div>
      </div>
      </div>
    )
  }
}

export const AccordionLayout = ({ title, children, index, activeIndex, setActiveIndex }) => {
  const handleSetIndex = (index) => (activeIndex !== index) && setActiveIndex(index)
  return (
    <>
      <div onClick={() => handleSetIndex(index)} className='flex w-full items-center justify-between p-2 mt-2 rounded bg-primary'>
        <div className='flex'>
          <div className='text-white font-bold'>{title}</div>
        </div>
        <div className="flex items-center justify-center ">
          {
            (activeIndex === index)
              ? <BsFillArrowDownCircleFill fill='white' className='w-4 h-4 text-white ' />
              : <BsFillArrowUpCircleFill className='w-4 h-4 text-white' fill='white' />
          }
        </div>
      </div>

      {(activeIndex === index) && (
        <div className="shadow-3xl rounded-2xl shadow-cyan-500/50 mb-6">
          {children}
        </div>
      )}
    </>
  )
}

export default NewErfApproval