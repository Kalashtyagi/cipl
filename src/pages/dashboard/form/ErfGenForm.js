import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewForm from "./NewForm";
import NewRecruitmentSelectionForm from "./NewRecruitmentSelectionForm";
import ReplacementForm from "./ReplacementForm";

const ErfGenForm = () => {
  const [formToggler, setFormToggler] = useState("New Recruitment");
  const [onSiteConfirmation,setOnSiteConfirmation] = useState('yes')
  const [billableConfimation,setBillableConfirmation] = useState("yes")
  const [checkForm, setCheckForm] = useState("inhouse");
  const location = useLocation()
  const navigate = useNavigate()
  const jsonData = JSON.parse(localStorage.getItem('data'));
  useEffect(()=>{
    document.title="CIPLCRM | ERF Form"
    if(jsonData?.data?.userPermissions.find(a=>a === "view_department")){
      return
    }else{
      navigate('/admin')
    }
  },[location])
  return (
    <div className="bg-gray-200 w-content lg:p-2 p-4 my-2">
      <div className="lg:p-4 p-2 bg-white rounded shadow">
        {/* <h1 className="w-full flex justify-center text-center bg-emerald-400 py-3 text-xl text-gray-50 font-semibold rounded-xl ">
          Employee Requisition Form
        </h1> */}
        <div>
          <div className="flex justify-center">
            <button className="md:w-96 w-[350px]  md:p-6 p-4 md:py-8 py-6 justify-between md:h-14 h-12  bg-white flex items-center transition duration-300 focus:outline-none  ">
              <div
                id="switch-toggle"
                className={`flex md:w-60 w-64 m-1 border justify-center md:h-12 h-10 items-center relative  transition duration-500 transform ${
                  formToggler === "Replacement" ? "bg-white" : "bg-primary"
                } md:p-1 md:px-2 ${
                  formToggler === "Replacement" ? "text-black" : "text-white"
                } font-semibold`}
                onClick={() => setFormToggler("New Recruitment")}
              >
                <span>New Recruitment</span>
              </div>
              <div
                id="switch-toggle"
                className={`flex md:w-60 border m-1 w-64 md:h-12 h-10 relative justify-center items-center md:px-2 transition duration-500 transform ${
                  formToggler === "Replacement" ? "text-white" : "text-black"
                } md:p-1 ${
                  formToggler === "Replacement" ? "bg-primary" : "bg-white"
                } font-semibold`}
                onClick={() => setFormToggler("Replacement")}
              >
                <span>Replacement</span>
              </div>
            </button>
          </div>
          {formToggler === "New Recruitment" ? (
            <>
              <NewRecruitmentSelectionForm
                checkForm={checkForm}
                onSiteConfirmation = {onSiteConfirmation}
                setOnSiteConfirmation = {setOnSiteConfirmation}
                setCheckForm={setCheckForm}
                billableConfimation = {billableConfimation}
                setBillableConfirmation = {setBillableConfirmation}
              />
              <NewForm billableConfimation={billableConfimation} checkForm={checkForm} formToggler={formToggler} setOnSiteConfirmation={setOnSiteConfirmation} onSiteConfirmation={onSiteConfirmation} />
            </>
          ) : (
            <>
            <NewRecruitmentSelectionForm
              checkForm={checkForm}
              onSiteConfirmation = {onSiteConfirmation}
              setOnSiteConfirmation = {setOnSiteConfirmation}
              setCheckForm={setCheckForm}
              billableConfimation = {billableConfimation}
              setBillableConfirmation = {setBillableConfirmation}
            />
            <ReplacementForm billableConfimation={billableConfimation} checkForm={checkForm} formToggler={formToggler} setOnSiteConfirmation={setOnSiteConfirmation} onSiteConfirmation={onSiteConfirmation}  />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErfGenForm;
