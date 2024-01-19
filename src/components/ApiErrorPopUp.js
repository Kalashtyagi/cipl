import React from 'react'

const ApiErrorPopUp = ({setModal,error}) => {
  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden min-w-[90%] overflow-y-auto fixed inset-0 z-[60] outline-none focus:outline-none">
      <div className="relative w-full my-6 flex justify-center">
        {/*content*/}
        <div className="lg:w-[50%] w-[80%] p-2 shadow-lg relative border flex flex-col bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex  items-start justify-between p-2 border-slate-200">
            <button
              className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold "
              onClick={()=>setModal(false)}
            >
              <span className=" text-gray-800 h-6 w-6 text-xl block ">
                X
              </span>
            </button>
          </div>
          {/*body*/}
          <div className='text-center'>
            <h3 className="text-lg font-medium my-2">
            Something Went Wrong
            </h3>
            <div className='border border-gray-400 bg-gray-100 py-2 mx-4'>
            <p className='p-2 text-md text-red-400 w-full h-fit font-medium'>{error}</p>
            </div>
          </div>

          {/*footer*/}
          <div className="flex items-center justify-center p-6 border-slate-200 ">
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
              onClick={()=>setModal(false)}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default ApiErrorPopUp