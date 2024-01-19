import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Timer from "../../components/Timer";
// import QuestionEditor from "../../components/QuestionEditor";
// import Exam from "./Exam";
import Editor from "./ckEditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const OnlineInterview = () => {
  const { state } = useLocation();
  // console.log("data", state);
  const navigate = useNavigate();
  const location = useLocation();

  const [descriptiveAnswerByStudent, setDescriptiveAnswerByStudent] =
    useState("");
  const [questionId, setQuestionId] = useState(0);
  const [answerByStudent, setAnswerByStudent] = useState([]);
  const questionData = state?.data?.onlinequestion;
  const [timeLeft, setTimeLeft] = useState(0);
  // const onlineExamId = state?.data?.id;
  // console.log('descriptive answer',descriptiveAnswerByStudent)

  // console.log("answer by student", answerByStudent)
  // console.log("response of question data",questionData)

  const [editorList, setEditorList] = useState([]);

  const handleEditorChange = (id, data) => {
    const newList = [...editorList];
    if (editorList.find((ele) => ele.id == id)) {
      editorList[
        editorList.indexOf(editorList.find((ele) => ele.id == id))
      ].data = data;
    } else {
      newList.push({ id, data });
    }
    setEditorList(newList);
  };

  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const options = [
    {
      id: 1,
      option: questionData && questionData[questionId]?.option_a,
      sendAnswer: "option_a",
    },
    {
      id: 2,
      option: questionData && questionData[questionId]?.option_b,
      sendAnswer: "option_b",
    },
    {
      id: 3,
      option: questionData && questionData[questionId]?.option_c,
      sendAnswer: "option_c",
    },
    {
      id: 4,
      option: questionData && questionData[questionId]?.option_d,
      sendAnswer: "option_d",
    },
  ];

  useEffect(() => {
    window.history.pushState(null, null, location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, [window.history, window]);

  // console.log('answer by student', answerByStudent)

  useEffect(() => {
    console.log(answerByStudent);
    if (
      answerByStudent.some(
        (x) => x?.questionId == questionData && questionData[questionId].id
      )
    ) {
      setAnswerByStudent([
        ...answerByStudent.filter(
          (x) => x.questionId != questionData[questionId]?.id
        ),
        {
          questionId: questionData[questionId].id,
          questionAnswer: questionData[questionId].answer,
          sendAnswer: descriptiveAnswerByStudent,
          questionMarks: questionData[questionId].marks,
        },
      ]);
    } else {
      setAnswerByStudent([
        ...answerByStudent.map((x) => ({ ...x })),
        {
          questionAnswer: questionData && questionData[questionId].answer,
          questionId: questionData && questionData[questionId].id,
          questionMarks: questionData && questionData[questionId].marks,
          sendAnswer: editorList?.find((ele) => ele.id == questionId)?.data,
        },
      ]);
    }
  }, [editorList]);

  useEffect(() => {
    if (state) {
      const newTime = state?.data?.time_duration;
      const [hours, minutes, seconds] = newTime.split(":");
      const totalSeconds =
        parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
      setTimeLeft(totalSeconds);
      // setDuration(state?.data?.time_duration)
    }
  }, [state]);

  useEffect(() => {
    let intervalId;

    if (timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    if (state?.data?.onlinequestion.length === answerByStudent.length) {
      const formdata = new FormData();
      formdata.append("onlinexamjobsapp_id", state?.jobApplicationId);
      for (let i = 0; i < answerByStudent.length; i++) {
        formdata.append(
          `examssubmit[${i}][answer_by_jobapplication]`,
          `${answerByStudent[i]?.sendAnswer}`
        );
        formdata.append(
          `examssubmit[${i}][onlinequestion_id]`,
          `${answerByStudent[i]?.questionId}`
        );
        formdata.append(
          `examssubmit[${i}][true_answer]`,
          `${answerByStudent[i]?.questionAnswer}`
        );
        formdata.append(
          `examssubmit[${i}][marks]`,
          `${answerByStudent[i]?.questionMarks}`
        );
      }
      // for(let i=0;i<questionsData.length;i++){
      // formdata.append(`examssubmit[${i}][onlinequestion_id]`, `${answerByStudent[i]?.questionId}`)
      // }
      // for(let i=0;i<questionsData.length;i++){
      //   formdata.append(`examssubmit[${i}][true_answer]`, `${answerByStudent[i]?.questionAnswer}`)
      // }
      // for(let i=0;i<questionsData.length;i++){
      //   formdata.append(`examssubmit[${i}][marks]`, `${answerByStudent[i]?.questionMarks}`)
      // }
      const submitExam = await axios.postForm(
        `${process.env.REACT_APP_API_URL}exam/job-applications/submit`,
        formdata,
        {
          headers: {
            Authorization: `${authorize}`,
          },
        }
      );
      const response = await submitExam.data;
      // console.log("Response",response)
      if (response?.code === 200) {
        navigate("/examsubmitted");
      } else {
        alert(response?.message);
      }
    } else {
      alert("Please Fill out all Answer!");
    }
  };

  return (
    // <div>OnlineExam</div>
    <>
      <div style={{ background: "#cc727e", padding: "10px", color: "white" }}>
        Warning: Leaving this page or Refreshing this page will discard your
        unsaved changes. and you can't able to retake exam.
      </div>
      <div className="w-screen">
        <div className="max-w-[100%] px-4 text-left md:py-[80] py-5  bg-gray-800">
          <img src={logo} className="w-24" />
        </div>
        {/* Online examination Module */}
        <div className="flex justify-between items-center p-2 bg-gray-200">
          <span className=" capitalize">{state?.data?.name}</span>
          <div className="flex items-center">
            {/* <Timer /> */}
            <span className="text-red-500">{formatTime(timeLeft)}</span>
            <button
              onClick={handleSubmit}
              className="bg-gray-600 hover:bg-green-600 m-1 text-white py-2 px-6"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 p-4">
          <div className=" lg:col-span-2 min-h-[50%] lg:full">
            <h2>Question {questionId + 1}</h2>
            <div className="w-full p-2">
              <span
                className="text-lg normal-case w-full text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    questionData && questionData[questionId]?.question
                  ),
                }}
              ></span>
            </div>
            {questionData &&
            questionData[questionId]?.question_type === "optional" ? (
              <ul className="p-2">
                {options &&
                  options?.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        if (
                          answerByStudent?.some(
                            (x) => x.questionId == questionData[questionId].id
                          )
                        ) {
                          setAnswerByStudent([
                            ...answerByStudent.filter(
                              (x) =>
                                x.questionId != questionData[questionId]?.id
                            ),
                            {
                              ...option,
                              questionId: questionData[questionId].id,
                              questionAnswer: questionData[questionId].answer,
                              questionMarks: questionData[questionId].marks,
                            },
                          ]);
                        } else {
                          setAnswerByStudent([
                            ...answerByStudent.map((x) => ({ ...x })),
                            {
                              ...option,
                              questionAnswer: questionData[questionId].answer,
                              questionId: questionData[questionId].id,
                              questionMarks: questionData[questionId].marks,
                            },
                          ]);
                        }
                      }}
                      className={`flex w-1/2  border my-1 cursor-pointer items-center ${
                        index + 1 === answerByStudent[questionId]?.id
                          ? "bg-gray-400"
                          : "bg-gray-200"
                      } `}
                    >
                      <label className="px-2 text-lg cursor-pointer">
                        <span
                          className=" capitalize"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(option?.option),
                          }}
                        ></span>
                      </label>
                    </li>
                  ))}
              </ul>
            ) : (
              <CKEditor
                key={questionId}
                editor={ClassicEditor}
                data={
                  editorList?.find((ele) => ele?.id == questionId)?.data !=
                    undefined &&
                  editorList?.find((ele) => ele?.id == questionId)?.data
                }
                onChange={(event, editor) => {
                  const data = editor.getData();
                  let i = 0;
                  handleEditorChange(questionId, data);
                }}
              />
            )}
          </div>
          <div className="lg:col-span-1">
            <h2>Question List</h2>
            <div>
              {state &&
                state?.data?.onlinequestion?.map((data, index) => (
                  <button
                    key={data?.id}
                    onClick={() => setQuestionId(index)}
                    className={`w-8 h-8 border m-1 ${
                      index === questionId
                        ? "bg-green-300 border-green-400 hover:bg-green-400"
                        : "bg-gray-200 hover:bg-gray-300 border-gray-400"
                    } rounded-sm `}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full px-4 text-left md:py-[80] py-5 left-0 fixed flex bottom-0 bg-gray-200">
          {questionId === 0 ? null : (
            <button
              className="px-6 py-2 bg-gray-400 text-white rounded-l-full m-1 font-semibold"
              onClick={() => setQuestionId(questionId - 1)}
            >
              Previous
            </button>
          )}
          {questionId === state?.data?.onlinequestion?.length - 1 ? null : (
            <button
              className="px-6 py-2 bg-green-400 text-white m-1 rounded-r-full font-semibold"
              onClick={() => setQuestionId(questionId + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default OnlineInterview;
