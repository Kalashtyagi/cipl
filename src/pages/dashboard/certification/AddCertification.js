import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import ApiErrorPopUp from "../../../components/ApiErrorPopUp";
import { ToastContainer, toast } from "react-toastify";

const AddCertification = () => {
    const [newCertification, setNewCertification] = useState("Enter Certification Name");
    const [showApiErrorPopUp,setShowApiErrorPopUp] = useState(false)
    const [apiError,setApiError] = useState('')
    const baseUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const location = useLocation()
    // console.log("location data",location)
    const data = localStorage.getItem("data");
    const jsonData = JSON.parse(data);
    const accessToken = jsonData.access_token;
    const authorize = "Bearer" + " " + accessToken;

    const handleClick = async () => {
      try {
        const saveCertification =await fetch(`${baseUrl}certification/store`, {
          method: "post",
          headers: {
            'Authorization': `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            name: `${newCertification}`,
          }),
        });
        const response = await saveCertification.json()
        if(response?.code ===200){
          toast.success(`${response?.message}`)
          setTimeout(()=>{
            navigate('/admin/certification')
          },3000)
          clearTimeout()
        }      
        if(response?.error){
          const errors = Object.values(response?.error)
          console.error('Errors', errors)
          errors.map((x) => (
            toast.error(`${x}`)
          ))
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
    };

    useEffect(()=>{
      document.title = "CIPLCRM | Add Certification"
      if(jsonData?.data?.userPermissions.find(a=>a === "add_category")){
        return
      }else{
        navigate('/admin')
      }
    },[location])
    return (
      <>
      <ToastContainer/>
      <div className="border rounded p-4 mx-4 my-2 bg-white">        
        <h1 className="text-2xl text-left ">Create New Certification:</h1>           

        <div className="lg:w-2/3 w-full flex py-4 items-center">
          <input
            type="text"
            className="border rounded-md w-full px-2 py-3 rounded-r-none"
            placeholder={newCertification}
          onChange={(e) => setNewCertification(e.target.value.trim())}
          />
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
        >
          <span className="text-xl font-medium">Save</span>
        </button>
      </div>
      </>
    );
}

export default AddCertification