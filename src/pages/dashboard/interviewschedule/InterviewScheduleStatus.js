import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

const InterviewScheduleStatus = ({
  getData,
  setShowInterviewStatus,
  data,
  interviewId,
}) => {
  const [showApiErrorPopUp, setShowApiErrorPopUp] = useState(false);
  const [apiError, setApiError] = useState("");
  const [status, setStatus] = useState("");

  console.log("Data", data);
  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData?.access_token;
  //   console.log("bearerToken", accessToken);
  const authorize = "Bearer" + " " + accessToken;

  console.log("status", status);

  const statusList = [
    {
      id: 3,
      status: "interview round 1",
    },
    {
      id: 4,
      status: "interview round 2",
    },
    // {
    //   "id": 10,
    //   "status": "salary Negotiation"
    // },
    // {
    //   "id": 5,
    //   "status": "hired"
    // },
    // {
    //   "id": 6,
    //   "status": "rejected"
    // },
  ];

  useEffect(() => {
    if (data) {
      setStatus(data?.job_application?.status_id);
    }
  }, [data]);

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative lg:w-2/3 md:w-2/3 sm:w-full my-6 mx-4 max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <div className="flex items-center">
                <h3 className="text-2xl font-semibold">
                  Interview Schedule Status
                </h3>
                <span
                  className={`px-1 mx-1 ${
                    data?.interview_type === "offline"
                      ? "bg-gray-600"
                      : "bg-cyan-600"
                  } text-white`}
                >
                  {data?.interview_type === "offline" ? "Offline" : "Online"}
                </span>
              </div>
              <button
                className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
                onClick={() => setShowInterviewStatus(false)}
              >
                <span className=" text-red-500 h-6 w-6 text-xl block ">X</span>
              </button>
            </div>
            <div className="w-full px-4">
              <div className=" w-full flex py-4 items-center">
                <div className="grid grid-cols-3 gap-4 w-full h-fit overflow-y-auto">
                  <h1 className="w-full col-span-3 text-xl font-medium">
                    Candidate
                  </h1>
                  <div className="w-full">
                    <label className="pr-1 text-md font-semibold">
                      Candidate Name
                    </label>
                    <span className="min-h-[4px] text-md rounded my-1 w-full flex">
                      {data?.job_application?.full_name}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="pr-1 text-md font-semibold">
                      Address
                    </label>
                    <span className="min-h-[4px] text-md rounded my-1 w-full flex">
                      {data?.job_application?.address}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="pr-1 text-md font-semibold">Email</label>
                    <span className="min-h-[4px] text-md rounded my-1 w-full flex">
                      {data?.job_application?.email}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="pr-1 text-md font-semibold">Phone</label>
                    <span className="min-h-[4px] text-md rounded my-1 w-full flex">
                      {data?.job_application?.phone}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="pr-1 text-md font-semibold">
                      Relevant Experience
                    </label>
                    <span className="min-h-[4px] text-md rounded my-1 w-full flex">
                      {data?.job_application?.relevent_exp}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="pr-1 text-md font-semibold">
                      Total Experience
                    </label>
                    <span className="min-h-[4px] text-md rounded my-1 w-full flex">
                      {data?.job_application?.total_exp}
                    </span>
                  </div>
                  <h1 className="w-full col-span-3 text-xl font-medium">
                    Interview
                  </h1>
                  <div className="w-full ">
                    <div className="w-full">
                      <label className="pr-1 text-md font-semibold">
                        Status
                      </label>
                      <span className="min-h-[4px] text-md rounded capitalize my-1 w-full flex">
                        {data?.status}
                      </span>
                    </div>
                  </div>
                  {/* grid 2 */}
                  <div className="w-full">
                    <label className="pr-1 text-md font-semibold">
                      Schedule Date
                    </label>
                    <span className="min-h-[4px] text-md rounded my-1 w-full flex">
                      {moment(data?.schedule_date).utc().format("DD-MM-YYYY")}
                    </span>
                  </div>
                  <div className="w-full ">
                    <label className="pr-1 text-md font-semibold">
                      Interview Type
                    </label>
                    <span className="min-h-[4px] text-md rounded my-1 w-full flex">
                      {data?.interview_type === "online" ? "Online" : "Offline"}
                    </span>
                  </div>
                  <h1 className="w-full col-span-3 text-xl font-medium">
                    Status
                  </h1>
                  <div className="w-full col-span-2">
                    <label className="pr-1 text-md font-semibold">
                      Select Status
                    </label>
                    <select
                      className="min-h-[4px] capitalize text-md rounded my-1 p-2 border w-full flex"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>Choose Option</option>
                      {statusList &&
                        statusList.map((status, index) => (
                          <option
                            className=" capitalize"
                            value={status?.status}
                            key={index}
                          >
                            {status?.status}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-gray-700 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                type="button"
                onClick={async () => {
                  try {
                    const formData = new FormData();
                    formData.append("status", status);
                    formData.append("mailToCandidate", "no");
                    const updateRequest = await axios.postForm(
                      `${process.env.REACT_APP_API_URL}interview-schedule/change-status/${interviewId}`,
                      formData,
                      {
                        headers: {
                          Authorization: `${authorize}`,
                          "Content-Type": "multipart/form-data",
                          Accept: "js",
                        },
                      }
                    );
                    const response = await updateRequest?.data;
                    console.log("API update response", response);
                    if (response?.code === 200) {
                      toast.success(`${response?.message}`);
                      setShowInterviewStatus(false);
                      getData();
                    }
                    if (response?.code === 403) {
                      setShowApiErrorPopUp(true);
                      setApiError(response?.message);
                    }
                  } catch (error) {
                    console.log("error", error);
                    if (error?.response?.data?.error) {
                      const errors = Object.values(
                        error?.response?.data?.error
                      );
                      console.log("Errors", errors);
                      errors.map((x) => toast.error(`${x}`));
                    }
                    if (error?.response?.data?.message) {
                      if (error?.response?.data?.error) {
                        const errors = Object.values(
                          error?.response?.data?.error
                        );
                        console.log("Errors", errors);
                        errors.map((x) => toast.error(`${x}`));
                      }
                      if (error?.response?.data?.message) {
                        toast.error(`${error?.response?.data?.message}`);
                      }
                    }
                  }
                }}
              >
                Update
                <FiArrowRight className="text-xl px" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default InterviewScheduleStatus;
