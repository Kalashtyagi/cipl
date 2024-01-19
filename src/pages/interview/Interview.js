import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";

const Interview = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [data, setData] = useState("");
  // console.log("Pathname", pathname);
  const id = pathname.replace("/interview/", "");
  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData?.access_token;
  //   console.log("bearerToken", accessToken);
  const authorize = "Bearer" + " " + accessToken;
  const getExamData = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_API_URL}exam/job-applications/${id}`,
      {
        method: "get",
        headers: {
          Authorization: `${authorize}`,
        },
      }
    );

    const response = await request?.json();
    // console.log("Response", response);
    if (response?.code === 403) {
      Swal.fire(
        'Authentication.!',
        "Not authenticated to perform this request attempt",
        'info'
        );
    }
    if (response?.code === 200) {
      setData(response);
      // console.log("Direct Response",response)
      // console.log('data', data?.data[0]?.id)
    }
  };

  useEffect(() => {
    getExamData();
  }, [pathname]);

  // console.log('Data',data&&data?.data[0]?.onlineexam)
  return (
    <div className="w-screen">
      <div className="max-w-[100%] px-4 text-left md:py-[80] py-5  bg-gray-800">
        <img src={logo} className="w-24" />
        {/* <span className="text-2[14px] font-medium mx-5">CIPL Logo</span> */}
      </div>
      <div className="flex justify-center w-full">
        <div className="shadow-lg mx-2 lg:w-2/3 w-full border border-gray-200 my-5 rounded-lg">
          <h1 className=" text-center text-xl pt-2">Online Exam</h1>
          <div className="w-full mx-2 gap-6 py-[10px] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
            <div className=" p-4 ">
              {/* <span className="text-[14px] font-medium py-2">test1</span> */}
              <div className="text-[14px] font-medium py-2 grid grid-cols-2">
                <span>Name</span>{" "}
                <span className="capitalize">
                  {data && data?.data[0]?.onlineexam?.name}
                </span>
              </div>
              <div className="text-[14px] font-medium py-2 grid grid-cols-2">
                <span>Total Attempt</span>{" "}
                <span className="capitalize">
                  {data && data?.data[0]?.onlineexam?.attempt}
                </span>{" "}
              </div>
              <div className="text-[14px] font-medium py-2 grid grid-cols-2">
                <span>Exam Date</span>{" "}
                <span className="capitalize">
                  {data && data?.data[0]?.onlineexam?.scheduled_date}
                </span>
              </div>
              <div className="text-[14px] font-medium py-2 grid grid-cols-2">
                <span>Time Duration</span>
                <span className="capitalize">
                  {data && data?.data[0]?.onlineexam?.time_duration}
                </span>
              </div>
              <div className="text-[14px] font-medium py-2 grid grid-cols-2">
                <span>Description</span>{" "}
                <span
                  className="text-sm py-2 capitalize"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      data && data?.data[0]?.onlineexam?.description
                    ),
                  }}
                ></span>
              </div>
            </div>

            <div className=" p-4 ">
              {/* <p className="text-[14px] font-medium py-2">Correct Answer</p> */}
              <p className="flex text-[14px] font-medium py-2 items-center">
                <BsCheck2Circle className="text-green-700 text-xl" />
                <span className="ml-1">Correct Answer but not Attempted</span>
              </p>
              <p className="flex text-[14px] font-medium py-2 items-center">
                <RxCrossCircled className="text-red-700 text-xl" />
                <span className="ml-1">Wrong Answer</span>
              </p>
              {/* <p className="text-[14px] font-medium py-2"></p> */}
            </div>
            {/* <div className=" p-4 ">
            <p className="text-sm py-2"></p>
            <p className="text-sm py-2"></p>
            <p className="text-sm py-2" ></p>
            <p className="text-sm py-2"></p>
          </div> */}
          </div>
          <div className="justify-center flex pt-2 pb-5 mx-4 ">
            {
              data && data?.data[0]?.onlineexam?.onlinequestion.length>0?
            <button
              onClick={() => {
                navigate("/onlineinterview", {
                  state:{
                    data: data && data?.data[0]?.onlineexam,
                    jobApplicationId: data && data?.data[0]?.id
                  },
                });
              }}
              className="px-6 items-center py-3 mr-3 flex font-bold text-center text-white transition-all rounded-lg cursor-pointer bg-gradient-to-tl hover:bg-gradient-to-tr hover:from-gray-800 hover:to-gray-600 delay-150 duration-150 from-gray-700 to-gray-500 text-xs ease-soft-in tracking-tight-soft shadow-soft-md active:opacity-85 hover:shadow-soft-xs"
            >
              <HiOutlineSpeakerphone className="pr-1" size={20} /> Start Exam
            </button>
            :
            <button
            className="px-6 items-center py-3 mr-3 flex font-bold text-center text-white transition-all rounded-lg cursor-pointer bg-gradient-to-tl hover:bg-gradient-to-tr hover:from-gray-800 hover:to-gray-600 delay-150 duration-150 from-gray-700 to-gray-500 text-xs ease-soft-in tracking-tight-soft shadow-soft-md active:opacity-85 hover:shadow-soft-xs"
            >
              <RxCross2/>
              No Question Available
            </button>

            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
