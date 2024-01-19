import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewErf = ({showForm,setShowForm, showFormId}) => {
//    console.log('id',showFormId)
   const [data,setData] = useState('')

    //   console.log("baseurl", baseUrl);
    const jsonData = JSON.parse(localStorage.getItem("data"));
    const accessToken = jsonData?.access_token;
    const authorize = "Bearer" + " " + accessToken;

   const getData = async (showFormId) => {
        const getApiData = await fetch(`${process.env.REACT_APP_API_URL}erf/view/${showFormId}`, {
          headers: {
            'Authorization': `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const apiResonse = await getApiData?.json();
        console.log("API response", apiResonse.data)
        if(apiResonse){
            setData(apiResonse?.data)
        }
  };
  useEffect(()=>{
    if(showFormId){
        getData(showFormId)
    }
},[showForm,setShowForm, showFormId])
console.log('data',data)
    return (
        <>
        <div className="flex justify-center overflow-x-hidden h-screen w-full  overflow-y-hidden fixed bg-black bg-opacity-25 inset-0 z-auto outline-none focus:outline-none" style={{position:"absolute",top:"0", zIndex:"999"}}>
            <div className="relative w-full my-6 mx-auto max-w-5xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font=semibold">ERF Form Details</h3>
                        <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setShowForm(false)}
                        >
                            <span className="text-black opacity-7 h-8 w-8 text-xl block bg-red-500 py-0 pb-3 rounded-full">
                                x
                            </span>
                        </button>
                    </div>

                    <div className="w-full h-[80vh] no-scrollbar overflow-y-scroll">
                        <form>
                            <div className="grid md:grid-cols-12 mx-auto px-10">
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1 ">
                                        <label className="text-md text-left font-semibold">Department</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.department?.name))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">PID</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.pid))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Requisition Date</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.start_date))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Target Date</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.end_date))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Job Category </label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.category?.name))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Skills</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.skills?.map((skills,index)=>{
                                            return <span>{skills?.skill?.name}{skills?.length-1? "":", "}</span>})))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Location</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.location))}</p>
                                    </div>
                                </div>
                                {/* <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Fresh</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.department?.name))}</p>
                                    </div>
                                </div> */}
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Budget</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.position_budgeted
))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Designation</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.degination))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Level</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.level))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Project Manager</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.project_manager))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Reporting to (Team Lead)</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.reporting_team))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">No. of Positions</label>
                                        <p className="text-md text-left opacity-50 font-normal">{data&&data?.map((datas)=>(datas?.total_positions))}</p>
                                    </div>
                                </div>
                                <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Project Name</label>
                                        <p className="text-md text-left opacity-50  font-normal">{data&&data?.map((datas)=>(datas?.project_name))}</p>
                                    </div>
                                </div>
                                

                            </div>
                            <div className="my-3">
                                <div className="px-5 mt-2">
                                    <h1 className="font-semibold text-2xl text-left">Education Details:</h1>
                                </div>
                                <div className="grid md:grid-cols-12 mx-auto px-8">
                                    <div className=" md:col-span-4 md:px-2 md:py-0 py-1">
                                        <div className=" text-left md:py-1">
                                            <label className="text-md text-left font-semibold ">Highest Qualification</label>
                                            <p className="text-md text-left opacity-50 font-normal ">{data&&data?.map((datas)=>(datas?.qualification?.name))}</p>
                                        </div>
                                    </div>
                                    <div className=" md:col-span-4 md:px-2 md:py-0 py-1">
                                        <div className=" text-left md:py-1">
                                            <label className="text-md text-left font-semibold "> Additional Qualification</label>
                                            <p className="text-md text-left opacity-50 font-normal ">{data&&data?.map((datas)=>(datas?.subqualifications?.map((subqualification)=>subqualification?.name)))}</p>
                                        </div>
                                    </div>
                                    <div className=" md:col-span-4 md:px-2 md:py-0 py-1">
                                        <div className=" text-left md:py-1">
                                            <label className="text-md text-center font-semibold ">Add Scope of Work</label>
                                            <p className="h-12 w-12 rounded-full p-2 text-center border-2 border-gray-300">{data&&data?.map((datas)=>(datas?.scopeofwork))}</p>
                                        </div>
                                    </div>
                                    <div className=" md:col-span-4 md:px-2 md:py-0 py-1">
                                        <div className=" text-left md:py-1">
                                            <label className="text-md text-left font-semibold "> Certification/ Diploma</label>
                                            <p className="text-md text-left opacity-50 font-normal ">{data&&data?.map((datas)=>(datas?.anycertification))}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-3">
                                <div className="px-5 mt-2">
                                    <h1 className="font-semibold text-2xl text-left">Experience Details:</h1>
                                </div>
                                <div className="grid md:grid-cols-12 mx-auto  px-8">
                                    <div className=" md:col-span-4 md:px-2 md:py-0 py-1">
                                        <div className=" text-left md:py-1">
                                            <label className="text-md text-left font-semibold ">Total Experience (in years)</label>
                                            <p className="text-md text-left opacity-50 font-normal ">{data&&data?.map((datas)=>(datas?.work_experience))}</p>
                                        </div>
                                    </div>
                                    <div className=" md:col-span-4 md:px-2 md:py-0 py-1">
                                        <div className=" text-left md:py-1">
                                            <label className="text-md text-left font-semibold "> Relevant Experience(in years)</label>
                                            <p className="text-md text-left opacity-50 font-normal ">{data&&data?.map((datas)=>(datas?.relevent_exp))}</p>
                                        </div>
                                    </div>
                                    <div className=" md:col-span-4 md:px-2 md:py-0 py-1">
                                        <div className=" text-left md:py-1">
                                            <label className="text-md text-left font-semibold ">Key Responsibility Areas</label>
                                            <p className="text-md text-left opacity-50 font-normal ">{data&&data?.map((datas)=>(datas?.responsibility))}</p>
                                        </div>
                                    </div>
                                    {/* <div className=" md:col-span-4 md:px-2 md:py-0 py-1">
                                        <div className=" text-left md:py-1">
                                            <label className="text-md text-left font-semibold ">Essential Skills (technical)</label>
                                            <p className="text-md text-left opacity-50 font-normal ">check</p>
                                        </div>
                                    </div> */}
                                    <div className=" md:col-span-4 md:px-2 md:py-0 py-1">
                                        <div className=" text-left md:py-1">
                                            <label className="text-md text-left font-semibold ">Prerequisites</label>
                                            <p className="text-md text-left opacity-50 font-normal ">{data&&data?.map((datas)=>(datas?.prerequisite))}</p>
                                        </div>
                                    </div>
                                    <div className=" md:col-span-12 md:pr-2 md:py-0 py-1">
                                    <div className="text-left py-1">
                                        <label className="text-md text-left font-semibold">Job Description</label>
                                        <p className="text-md text-left  font-normal">{data&&data?.map((datas)=>(datas?.job_description))}</p>
                                    </div>
                                </div>

                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
                </>
    );
};


export default ViewErf;