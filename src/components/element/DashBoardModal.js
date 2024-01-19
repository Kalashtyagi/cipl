import React from "react";
import {FiArrowRight} from 'react-icons/fi'

const DashBoardModal = ({ setShowModal, showModal }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative lg:w-1/3 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">Create ToDo Items</h3>
              <button
                className="p-1 ml-auto border-0 text-red-500  float-right text-xl leading-none font-semibold "
                onClick={() => setShowModal(false)}
              >
                <span className=" text-red-500 h-4 w-4 ">X</span>
              </button>
            </div>
            {/*body*/}
            <div className="py-10 px-1">
              <div className="px-1 mx-4 ">
                <div className=" ">
                  <label className="block">
                    <span className="px-1">Title</span>
                    <span className="px text-red-600">*</span>
                  </label>
                  <input
                    type="search"
                    className="rounded border p-2 px-2 w-full"
                    placeholder=""
                    aria-controls="myTable"
                  />
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center py-4 px-6 border-t border-solid border-slate-200 rounded-b">
              {/* <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button> */}
              <button
                className="bg-emerald-500 text-white hover:bg-emerald-700 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Create
                <FiArrowRight className="text-xl px"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default DashBoardModal;
