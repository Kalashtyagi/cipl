import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiErrorPopUp from "../../../components/ApiErrorPopUp";
import { ToastContainer, toast } from "react-toastify";
// import {data} from './data'

const ShowResult = ({ setResultModal, resultData, getErfData }) => {
  const [showApiErrorPopUp, setShowApiErrorPopUp] = useState(true);
  const location = useLocation();
  const [data, setData] = useState("");
  const [questionId, setQuestionId] = useState(0);
  const [value, setValue] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [rightAnswer, setRightAnswer] = useState(0);
  const [newMarks, setNewMarks] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const getData = async () => {
    // alert("Data called")
    const getApiData = await axios.get(
      `${process.env.REACT_APP_API_URL}exam/examresult/${resultData?.id}`,
      {
        headers: {
          Authorization: `${authorize}`,
        },
      }
    );
    const apiResonse = await getApiData?.data;

    console.log("Response", apiResonse);
    if (apiResonse?.code === 200) {
      setData(apiResonse);
      setShowApiErrorPopUp(false);
    }
    if (apiResonse?.code === 404) {
      setShowApiErrorPopUp(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!data) {
      if (showApiErrorPopUp === false) {
        setResultModal(false);
      }
    }
  }, [showApiErrorPopUp]);

  useEffect(() => {
    for (let i = 0; i < data?.data?.studentresult.length; i++) {
      if (
        JSON.stringify(
          data && data?.data?.studentresult[i].answer_by_jobapplication
        ) === JSON.stringify(data && data?.data?.studentresult[i].true_answer)
      ) {
        setRightAnswer(rightAnswer + 1);
        setNewMarks(newMarks + parseInt(data?.data?.studentresult[i]?.marks));
      } else setWrongAnswer(wrongAnswer + 1);
    }
  }, [data]);

  const handleUpdate = async () => {
    try {
      const getApiData = await fetch(
        `${process.env.REACT_APP_API_URL}jobapplication/statusupdate/${resultData?.id}`,
        {
          method: "post",
          headers: {
            Authorization: `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            status: `${value}`,
          }),
        }
      );
      const apiResonse = await getApiData?.json();
      // console.log("API response", apiResonse.data)
      if (apiResonse?.code === 200) {
        // console.log(apiResonse?.data)
        toast.success(`${apiResonse?.message}`);
        setTimeout(() => {
          setResultModal(false);
          window.location.reload();
        }, 4000);
        clearTimeout();
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data?.error) {
        const errors = Object.values(error?.response?.data?.error);
        console.log("Errors", errors);
        errors.map((x) => toast.error(`${x}`));
      }
      if (error?.response?.data?.message) {
        if (error?.response?.data?.error) {
          const errors = Object.values(error?.response?.data?.error);
          console.log("Errors", errors);
          errors.map((x) => toast.error(`${x}`));
        }
        if (error?.response?.data?.message) {
          toast.error(`${error?.response?.data?.message}`);
        }
      }
    }
  };

  // console.log('data', data)

  const options = [
    {
      id: 1,
      option: data?.data?.studentresult[questionId]?.option_a,
      sendAnswer: "option_a",
      showOption: "A",
    },
    {
      id: 2,
      option: data?.data?.studentresult[questionId]?.option_b,
      sendAnswer: "option_b",
      showOption: "B",
    },
    {
      id: 3,
      option: data?.data?.studentresult[questionId]?.option_c,
      sendAnswer: "option_c",
      showOption: "C",
    },
    {
      id: 4,
      option: data?.data?.studentresult[questionId]?.option_d,
      sendAnswer: "option_d",
      showOption: "D",
    },
  ];

  const showingData = [
    {
      heading: "Exam Name",
      data: data?.data?.JobApplication?.onlineexamdeatils?.name,
    },
    {
      heading: "Exam Attempt",
      data: data?.data?.JobApplication?.onlineexamdeatils?.attempt,
    },
    {
      heading: "Total Question",
      data: data?.data?.JobApplication?.onlineexamdeatils?.total_question,
    },
    {
      heading: "Total Attempted Question",
      data: data?.data?.JobApplication?.onlineexamdeatils?.total_question,
    },
    // {
    //   heading: `User's Attempt`,
    //   data: data?.data?.JobApplication?.in_attempt,
    // },
    // {
    //   heading: "Wrong Answer",
    //   data: wrongAnswer,
    // },
    // {
    //   heading: "Un-Attempted Question",
    //   data: 0,
    // },
    // {
    //   heading: "Final Marks",
    //   data: newMarks,
    // },
  ];

  // console.log("New Marks", newMarks)

  // useEffect(()=>{
  //     for(let i =0; i<data?.data?.studentresult.length;i++){
  //       if(data&&data?.data?.studentresult[i]?.true_answer === data&&data?.data?.studentresult[i]?.answer_by_jobapplication){
  //           setMarks(data?.data?.studentresult[i]?.marks)
  //           console.log("Running for loop for makrs")
  //         }
  //       }
  //       console.log("marks",marks)
  //         console.log("True Answer",data&&data?.data?.studentresult[0]?.true_answer)
  //         console.log("Answer By employee",data&&data?.data?.studentresult[0]?.answer_by_jobapplication)
  // },[data])
  return (
    <>
      <ToastContainer position="top-center" />

      <div className="justify-center self-center no-scrollbar items-center flex overflow-x-hidden h-[95vh] my-2 fixed inset-0 z-[50] outline-none focus:outline-none">
        <div className="relative w-full my-2 flex justify-center">
          {/*content*/}
          <div className="lg:w-[50%] w-[80%] p-2 shadow-lg relative border flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex  items-start justify-between p-2 border-slate-200">
              <button
                className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold "
                onClick={() => setResultModal(false)}
              >
                <span className=" text-gray-800 h-6 w-6 text-xl block ">X</span>
              </button>
            </div>
            {/*body*/}
            <div className="">
              <h3 className="text-lg text-center font-medium mb-2">Result</h3>
              <div className="border">
                <div className="grid grid-cols-2 my-2">
                  {showingData &&
                    showingData?.map((resultData, index) => (
                      <div
                        className=" px-2 justify-between  py-1 flex"
                        key={index}
                      >
                        <label className="text-md font-medium flex px-1">
                          {resultData?.heading}
                        </label>
                        <p className="text-md px-1">{resultData?.data}</p>
                      </div>
                    ))}
                </div>
                <div className="my-2">
                  <h4 className="text-lg text-center font-medium my-2">
                    Questions
                  </h4>
                  <div className="border m-2 p-1">
                    <div className="flex px-2 overscroll-x-auto w-full">
                      {data?.data?.studentresult &&
                        data?.data?.studentresult.map((data, index) => (
                          <button
                            className={`px-3 border rounded ${
                              index === questionId
                                ? "bg-green-300 border-green-400 hover:bg-green-400"
                                : "bg-gray-200 hover:bg-gray-300 border-gray-400"
                            } py-1 hover:bg-gray-300 bg-gray-100 mx-0.5`}
                            key={data?.id}
                            onClick={() => setQuestionId(index)}
                          >
                            {index + 1}
                          </button>
                        ))}
                    </div>
                    <div>
                      <div className="h-fit overflow-y- my-2 no-scrollbar">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              data?.data?.studentresult[questionId]
                                ?.question_name
                            ),
                          }}
                          className="mx-2 px-1 my-1 py-2 text-[15px] font-normal bg-gray-50"
                        ></p>
                        <div>
                          {data &&
                          data?.data?.studentresult[questionId]
                            ?.question_type === "optional" ? (
                            <ul className="p-2  mx-2 px-1">
                              {options &&
                                options?.map((option, index) => (
                                  <li
                                    key={index}
                                    className={`flex lg:w-1/2 w-full border my-1 cursor-pointer border-gray-400 items-center ${
                                      option?.sendAnswer ===
                                      data?.data?.studentresult[questionId]
                                        ?.true_answer
                                        ? "bg-green-300 "
                                        : "bg-gray-50"
                                    } ${
                                      option?.sendAnswer ===
                                      data?.data?.studentresult[questionId]
                                        ?.answer_by_jobapplication
                                        ? "border-2 border-pink-400"
                                        : ""
                                    } `}
                                  >
                                    <label className="px-2 text-lg cursor-pointer">
                                      <span
                                        className=" capitalize text-[14px]"
                                        dangerouslySetInnerHTML={{
                                          __html: DOMPurify.sanitize(
                                            option?.option
                                          ),
                                        }}
                                      ></span>
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          ) : (
                            <p
                              className="mx-2 px-1 my-1 py-2 text-[15px] font-normal text-gray-700"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  data?.data?.studentresult[questionId]
                                    ?.answer_by_jobapplication
                                ),
                              }}
                            ></p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex px-4 border m-2 items-center justify-between bg-gray-50">
                  <label className="text-xl">Status</label>
                  <select
                    onChange={(e) => setValue(e.target.value)}
                    className="border mx-1 w-1/2 my-1 p-1 text-lg"
                  >
                    <option>Choose Result</option>
                    <option value={8}>Pass</option>
                    <option value={9}>Fail</option>
                  </select>
                </div>
              </div>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-slate-200 ">
              <button
                className="bg-gray-800 hover:bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ShowResult;
