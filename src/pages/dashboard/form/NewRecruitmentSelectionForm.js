import React from 'react'

const NewRecruitmentSelectionForm = ({setCheckForm,checkForm, setOnSiteConfirmation, onSiteConfirmation, billableConfimation, setBillableConfirmation}) => {


  return (
    <div>
        <div className={`${checkForm === "onsite" ?"flex":"grid lg:grid-cols-3"} items-center md:px-4 w-full px-2 pt-3 bg-gray-300 rounded my-2 `}>
          <div className='p-2'>
            <h2 className='font-semibold text-left lg:text-2xl text-lg'>Recruitment Type</h2>
            <div className='flex'>
            <div className=''>
                <input type="radio" checked={checkForm==="inhouse"?true:false} onChange={(e)=>setCheckForm('inhouse')}/>
                <span className='px-2 font-medium text-lg'>Inhouse</span>
            </div>
            <div className=''>
                <input type="radio" checked={checkForm==="onsite"?true:false} onChange={(e)=>setCheckForm('onsite')}/>
                <span className='px-2 font-medium text-lg'>Project</span>
            </div>
            </div>
          </div>
          {
            checkForm === "onsite"?
          <>
          <div className="md:px-4 px-2">
          <h2 className="font-semibold text-left text-2xl">Management Approval:</h2>
          <div className="flex ">
            <div className="">
              <input
                type="radio"
                checked={onSiteConfirmation === "yes" ? true : false}
                onChange={() => setOnSiteConfirmation("yes")}
              />
              <span className="px-2 font-medium text-lg">Yes</span>
            </div>
            <div className="">
              <input
                type="radio"
                checked={onSiteConfirmation === "no" ? true : false}
                onChange={() => setOnSiteConfirmation("no")}
              />
              <span className="px-2 font-medium text-lg">No</span>
            </div>
          </div>
        </div>
        <div className='md-px-4 px-2'>
          <h2 className="font-semibold text-left text-2xl">Resource:</h2>
          <div className="flex ">
            <div className="">
              <input
                type="radio"
                checked={billableConfimation === "yes" ? true : false}
                onChange={() => setBillableConfirmation("yes")}
              />
              <span className="px-2 font-medium text-lg">Billable</span>
            </div>
            <div className="">
              <input
                type="radio"
                checked={billableConfimation === "no" ? true : false}
                onChange={() => setBillableConfirmation("no")}
              />
              <span className="px-2 font-medium text-lg">Non-Billable</span>
            </div>
          </div>
        </div>
          </>
        : null
          }
        </div>
    </div>
  )
}

export default NewRecruitmentSelectionForm