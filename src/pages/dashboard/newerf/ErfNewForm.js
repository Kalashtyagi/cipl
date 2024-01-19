import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import SelectionFields from './SelectionFields'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import moment from 'moment/moment';

const ErfNewForm = ({editErfData,getERFList}) => {
  const [onSiteConfirmation, setOnSiteConfirmation] = useState('yes')
  const [billableConfimation, setBillableConfirmation] = useState("yes")
  const [checkForm, setCheckForm] = useState("inhouse");
  const [departmentList,setDepartmentList] = useState('')
  const [erfForm,setErfForm] = useState({
    onSiteConfirmation:'yes',
    department:'',
    recruitment:"",
    pid:"",
    projectName:''
  })

  // console.log('edit erf data',editErfData)
  // console.log("erf data",erfForm)

  useEffect(()=>{
    if(editErfData){
      setErfForm({...erfForm,["recruitment"]:editErfData?.recruitment === 0?"new":"replacement"})
      setErfForm({...erfForm,["department"]:editErfData?.department?.name === "" || null || undefined?"":editErfData?.department?.name})
      setErfForm({...erfForm,["pid"]:editErfData?.pid})
      setErfForm({...erfForm,["requisitionDate"]:moment(editErfData?.start_date).format('yyyy-MM-dd')})
      setErfForm({...erfForm,["targetDate"]:moment(editErfData?.end_date).format('yyyy-MM-dd')})
      setErfForm({...erfForm,["projectName"]:editErfData?.end_date === ""|| null || undefined?"":editErfData?.project_name})
      setCheckForm(editErfData?.recruitment_type)
      setBillableConfirmation(editErfData?.billable_type)
    }
  },[editErfData])

  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData && jsonData?.access_token;

  const departmentListApi = async()=>{
    const request = await fetch(`${process.env.REACT_APP_API_URL}department`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonResponse = await request?.json();
    
    if (jsonResponse) {
      setDepartmentList(jsonResponse?.data.map((x)=>({label:x?.name,value:x?.id})));
    }
  }

  useEffect(()=>{
    departmentListApi()
  },[])

  const data = JSON.parse(localStorage.getItem('data'))

  const handleSubmit = async(e)=>{
    e.preventDefault()
      // Validate form fields based on the 'checkForm' value
      if (checkForm === 'onsite') {
        if (!erfForm.department) {
          toast.error('Please select Department.');
          return; // Stop submission if Deparment is not filled
        }
        if (!erfForm.pid) {
          toast.error('Please enter PID.');
          return; // Stop submission if PID is not filled
        }
        if (!erfForm.projectName) {
          toast.error('Please enter Project Name.');
          return; // Stop submission if Project Name is not filled
        }
    };
      if (checkForm === 'inhouse') {
        if (!erfForm.department) {
          toast.error('Please select Department.');
          return; // Stop submission if Deparment is not filled
        }
      }
    const result = await Swal.fire({
      title: "Are you sure want to save this form?",
      text: "Please confirm that you want to proceed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Save it!",
      cancelButtonText: "No, Cancel",
    });
    if (result.isConfirmed) {
      // If confirmed, proceed with the submission
      submitForm();
    }
  };

  const submitForm = async () => {
      try {
        const formData = new FormData()
        formData.append('recruitment',erfForm?.recruitment==="replacement"?1:0)
        formData.append('recruitment_type',checkForm?checkForm:"inhouse,prject")
        formData.append('billable_type',billableConfimation?billableConfimation:"")
        formData.append('pid',erfForm.pid?erfForm?.pid:'')
        formData.append('approved', onSiteConfirmation ||"")
        formData.append('department_id',erfForm?.department?erfForm?.department:"")
        formData.append('project_name',erfForm?.projectName?erfForm?.projectName:"")
        const request = await axios.postForm(`${process.env.REACT_APP_API_URL}jobs/store`,formData,{
          headers:{
              'Authorization':`Bearer ${data?.access_token}`,
              'Accept':'application/json'
          }
        })
        const response = await request?.data
        if(response?.code === 200){
          toast.success("Saved!", "", "success");
          getERFList()
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
  }

  return (
    <>
      <ToastContainer
      position='top-center'
      />
    <form onSubmit={handleSubmit} className='grid grid-cols-3'>
      <div className='p-2 col-span-1'>
        <label className={`after:content-['*'] after:ml-0.5 after:text-red-500`}>Type</label>
        <div className='py-1'>
          <select name='recruitment' required onChange={(e)=>setErfForm({...erfForm,[e.target.name]:e.target.value})} className='w-full p-2 border border-primary rounded'>
            <option value="new">New</option>
            <option value="replacement">Replacement</option>
          </select>
        </div>
      </div>
      <div className={`grid ${checkForm==="inhouse"?'grid-cols-1 col-span-1':"col-span-2 grid-cols-2"}`}>
      <SelectionFields 
        checkForm={checkForm}
        onSiteConfirmation={onSiteConfirmation}
        setOnSiteConfirmation={setOnSiteConfirmation}
        setCheckForm={setCheckForm}
        billableConfimation={billableConfimation}
        setBillableConfirmation={setBillableConfirmation} />
      </div>

<div className='p-2 col-span-1'>
          <label className={`after:content-['*'] after:ml-0.5 after:text-red-500`}>
            Department
          </label>
          <div className='py-1'>
            <Select
             required={checkForm === ''} 
              onChange={(e) => setErfForm({ ...erfForm, ["department"]: e.value })}
              options={departmentList.length > 0 ? departmentList : [{ label: 'Something Went Wrong', value: '' }]}
              className='border border-gray-900 rounded'
            />
          </div>
        </div>

        {/* Conditionally rendering PID and Project Name fields */}
        {checkForm !== 'inhouse' && (
          <>
            <div className='p-2 col-span-1'>
              <label className={`after:content-['*'] after:ml-0.5 after:text-red-500`}>
                PID
              </label>
              <div className='py-1'>            
                <input
                  name='pid'
                  required={checkForm === 'project'} 
                  value={erfForm?.pid}
                  onChange={(e) => setErfForm({ ...erfForm, [e.target.name]: e.target.value })}
                  placeholder='PID'
                  className='w-full p-[6px] px-2 border rounded-sm border-gray-900'
                />
              </div>
            </div>

            <div className='p-2 col-span-1'>
              <label className={`after:content-['*'] after:ml-0.5 after:text-red-500`}>
                Project Name
              </label>
              <div className='py-1'>
                <input
                 required={checkForm === 'project'} 
                  placeholder='Project Name'
                  name='projectName'
                  onChange={(e) => setErfForm({ ...erfForm, [e.target.name]: e.target.value })}
                  value={erfForm?.projectName}
                  className='w-full p-[6px] px-2 border rounded-sm border-gray-900'
                />
              </div>
            </div>
          </>
        )}

      <div className='flex col-span-1 px-2 items-center '>
        <button 
        type='submit' onClick={handleSubmit} 
        className='px-6 mt-5 py-2 bg-gray-900 text-white hover:text-gray-50 hover:bg-gray-800 delay-75 duration-75 rounded'>
          Save</button>
      </div>
    </form>
    </>
  )
}

export default ErfNewForm