import React from 'react'

const SelectionFields = ({setCheckForm,checkForm,onSiteConfirmation,setOnSiteConfirmation, billableConfimation, setBillableConfirmation}) => {
  return (
    <>
          <div className='w-full flex mt-2 col-span-1'>
            <div className='px-2'>
            <h2 className={`after:content-['*'] after:ml-0.5 after:text-red-500`}>Recruitment Type</h2>
            <div className='flex'>
            <div className='flex items-center pr-2'>
                <input type="radio" checked={checkForm==="inhouse"?true:false} onChange={(e)=>setCheckForm('inhouse')}/>
                <span className='px-1'>Inhouse</span>
            </div>
            <div className='flex items-center px-2'>
                <input type="radio" checked={checkForm==="onsite"?true:false} onChange={(e)=>setCheckForm('onsite')}/>
                <span className='px-1'>Project</span>
            </div>
            </div>
            </div>
            {
              checkForm ==='onsite'?
              <div className='px-2'>
            <h2>Approval:</h2>
            <div className="flex ">
              <div className="flex pr-2 items-center">
                <input
                  type="radio"
                  checked={onSiteConfirmation === "yes" ? true : false}
                  onChange={() => setOnSiteConfirmation("yes")}
                />
                <span className="px-1">Yes</span>
              </div>
              <div className="flex px-2 items-center">
                <input
                  type="radio"
                  checked={onSiteConfirmation === "no" ? true : false}
                  onChange={() => setOnSiteConfirmation("no")}
                />
                <span className="px-1">No</span>
              </div>
            </div>
          </div>
          :null
            }
          </div>
          {
            checkForm === "onsite"?
          <>

        <div className='w-full col-span-1 flex mt-2'>
          <div className='px-2'>
          <h2>Resource:</h2>
          <div className="flex">
            <div className="flex pr-2 items-center">
              <input
                type="radio"
                checked={billableConfimation === "yes" ? true : false}
                onChange={() => setBillableConfirmation("yes")}
              />
              <span className="px-1">Billable</span>
            </div>
            <div className="flex px-2 items-center">
              <input
                type="radio"
                checked={billableConfimation === "no" ? true : false}
                onChange={() => setBillableConfirmation("no")}
              />
              <span className="px-1">Non-Billable</span>
            </div>
          </div>
          </div>
        </div>
          </>
        : null
          }
    </>
  )
}

export default SelectionFields