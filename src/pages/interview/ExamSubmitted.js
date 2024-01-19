import React from 'react'
import logo from "../../assets/logo.png";

const ExamSubmitted = () => {
  return (
    <div className="w-screen">
      <div className="max-w-[100%] px-4 text-left md:py-[80] py-5  bg-gray-800">
        <img src={logo} className="w-24" />
        {/* <span className="text-2[14px] font-medium mx-5">CIPL Logo</span> */}
      </div>
        <div className='flex justify-center p-4'>
            <span className='text-xl font-medium'>Your Exam Submitted Successfully.!</span>
        </div>
        <div className='flex justify-center'>
            <button onClick={()=>{
                    window.open("about:blank", "_self");
                    window.close();
                }
            } className='px-6 py-3 text-white rounded bg-gray-700 hover:bg-gray-800'>Close Tab</button>
        </div>
    </div>
  )
}

export default ExamSubmitted