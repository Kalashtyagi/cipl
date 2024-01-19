import React, { useState } from "react";
import QuestionEditor from "../../../components/QuestionEditor";


const Modal = ({showEditModal, setShowEditModal}) => {
    
    return (
        <>
        <div className="absolute inset-1 left-1 right-1 my-6 mx-auto z-50 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:w-4/6 md:w-screen sm:w-screen drop-shadow-sm">
                <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white border-blue-100 focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-[18px] font-medium">Exam</h3>
                        <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setShowEditModal(!showEditModal)}
                        >
                            <span className="text-black opacity-7 h-8 w-8 text-xl block bg-gray-100 py-0 pb-3 rounded-full">
                                x
                            </span>
                        </button>
                    </div>
                    {/* <div className="absolute inset-px p-6"> */}
                    <form className="bg-gray-0 m-1 rounded px-1  pt-6 pb-8" >
                        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2">
                            <div className="grid md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1">

                                <label className="block text-black text-sm font-medium ">
                                    Exam Title
                                </label>
                                <input className="shadow appearance-none border rounded m-full py-1 px-1 text-black" />
                            </div>
                        </div>
                    <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 py-1 gap-2">
                        <div className="grid md:grid md:grid-cols- sm:grid-cols-1 md:gap-1 mt-2 ">
                            <label className="block text-black text-sm font-medium ">
                                Time Duration *
                            </label>
                            <input type="time" className="shadow timepicker appearance-none border rounded m-full py-1 px-1 text-black" />

                        </div>
                        <div className="grid md:grid md:grid-cols-1 sm:grid-cols-1 md:gap-1 mt-2">
                            <label className="block text-black text-sm font-medium ">
                                Attempt *
                            </label>
                            <input type="number" className="shadow timepicker appearance-none border rounded m-full py-1 px-1 text-black" />

                        </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 sm:grid-cols-1 py-2 md:gap-1">
                            <label className="block text-black text-sm font-medium" >
                                <span className="text-gray-700">Description *</span>
                            </label>
                            <QuestionEditor />
                        </div>

                    </form>
                    {/* </div> */}
                    <div className="flex items-center justify-end p-6 pt-0 border-solid border-blueGray-200 rounded-b">

                        <button type="submit"
                            className="text-white bg-gray-600 active:bg-gray-700 font-medium text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            
                            onClick={() => setShowEditModal(!showEditModal)}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;