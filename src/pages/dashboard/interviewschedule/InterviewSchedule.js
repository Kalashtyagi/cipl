import axios from "axios";
import moment from "moment/moment";
import { MdEmail } from "react-icons/md";
import React, { useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineDelete,
  AiOutlineHome,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { FaRegEdit, FaDatabase } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiErrorPopUp from "../../../components/ApiErrorPopUp";
import Table from "../../../components/Table";
import { TbNewSection } from "react-icons/tb";
import { MdPreview } from "react-icons/md";
import InterviewReview from "./InterviewReview";
import InterviewScheduleStatus from "./InterviewScheduleStatus";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Select from "react-select";
import DataTable from "react-data-table-component";
import index from "../../../index.css";
import { BsDownload } from "react-icons/bs";
import { Document, Page } from "react-pdf";
import { BsFillEyeFill } from "react-icons/bs";
import toasthot from "react-hot-toast";

const InterviewSchedule = () => {
  const [data, setData] = useState("");
  const [showTab, setShowTab] = useState("round 1");
  const [interviewReviewData, setInterviewReviewData] = useState("");
  const [showInterviewData, setShowInterviewData] = useState("");
  const [interviewId, setInterviewId] = useState("");
  const [candidateList, setCandidateList] = useState("");
  const [employeeList, setEmployeeList] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [interviewReview, setInterviewReview] = useState(false);
  const [showInterviewStatus, setShowInterviewStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [filteredDataPID, setFilteredDataPID] = useState("");
  const [showEditPopUp, setShowEditPopup] = useState(false);
  const [showApiErrorPopUp, setShowApiErrorPopUp] = useState(false);
  const [apiError, setApiError] = useState("");
  const [interviewPopup, setinterviewPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValuepass, setSelectedValuePass] = useState(null);
  const [listForm, setListForm] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobRecruitmentData, setJobRecruitmentData] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [hodSearch, setHodSearch] = useState("");
  const [uploadid, setUploadId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isuploaded, setIsuploaded] = useState(true);
  const [selectedType, setSelectedType] = useState("inhouse");
  
  const [inhouseData, setInhouseData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData?.access_token;
  //   console.log("bearerToken", accessToken);
  const authorize = "Bearer" + " " + accessToken;

  useEffect(() => {
    const fetchData = async (type) => {
      // Define the base URL
      const baseURL = 'https://arbbacakend.ciplcrm.org.in/api/admin/interview-list/';
  
      // Determine the correct endpoint based on the selected type
      const urlEndpoint = selectedType === 'inhouse' ? 'inhouse' : 'onsite';
  
      // Construct the full URL
      const fullURL = `${baseURL}${urlEndpoint}`;
  
      try {
        const response = await axios.get(fullURL, {
          headers: {
            Authorization: authorize,
          },
        });
        if (response.data.code === 200) {
          if (type === 'inhouse') {
            setInhouseData(response.data.data);
          } else {
            setProjectData(response.data.data);
          }
        } else {
          if (type === 'inhouse') {
            setInhouseData([]);
          } else {
            setProjectData([]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (type === 'inhouse') {
          setInhouseData([]);
        } else {
          setProjectData([]);
        }
      }
    };
  
    fetchData(selectedType);
  }, [selectedType, authorize]);

  

  const handleRadioChange = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    setPdfUrl(filteredDataPID[0]?.result_url);
  }, [pdfUrl, filteredDataPID]);


  useEffect(() => {
    setFilteredDataPID([...filteredDataPID])

  }, [isuploaded])

  useEffect(() => {
    
    console.log("72", uploadid)

    console.log("63", filteredDataPID);
  }, [uploadid, filteredDataPID]);

  useEffect(() => {
    console.log(uploadid);
  }, [uploadid]);

  //   console.log("baseurl", baseUrl);
 
  // console.log("authorize", authorize);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handlePopupSubmit = () => {
    console.log("Selected Value:", selectedValue);

    setinterviewPopup(false);
  };

  const handleUploadResult = (id) => {
    setinterviewPopup(true)

    setUploadId(id)

    console.log("106", id)
  }

  const getDataa = async () => {

    const getApiData = await axios.get(`${process.env.REACT_APP_API_URL}erf`, {
      headers: {
        Authorization: `${authorize}`,
      },
    });
    const apiResonse = await getApiData?.data;
    // console.log('api response',apiResonse)
    if (apiResonse) {

      setListForm(apiResonse?.data);
    }
  };

  useEffect(() => {
    getDataa();
  }, []);
  const getAssigneeData = async () => {
    // console.log("Jobd ID",jobId)

    if (jobId !== "" || null || undefined) {
      const formData = new FormData();
      formData.append("location", locationSearch);
      formData.append("project_manager", hodSearch);
      const request = await axios.postForm(
        `${process.env.REACT_APP_API_URL}job-application-list?type=onsite`,
        formData,
        {
          headers: {
            Authorization: `${authorize}`,
          },
        }
      );
      // console.log("Request",request)
      const response = request.data;
      console.log("response", response);
      if (response) {
        setFilteredDataPID(response.data);
      }
    }
    if (jobId === "" || null || undefined) {
      toast.error("Please Select PID");
    }
  };

  useEffect(() => {
    // getAssigneeData();
  }, [interviewPopup]);

  const getEditData = async () => {
    const getApiData = await axios.get(
      `${process.env.REACT_APP_API_URL}interview/getdata`,
      {
        headers: {
          Authorization: `${authorize}`,
        },
      }
    );
    const apiResonse = await getApiData?.data;
    // console.log("API Response",apiResonse)
    if (apiResonse?.code === 200) {
      setCandidateList(apiResonse?.data?.candidates);
      setEmployeeList(apiResonse?.data?.users);
    } else {
      // console.log("Api Response",apiResonse)
      setShowApiErrorPopUp(true);
      setApiError(apiResonse?.message);
    }
    // console.log("API Response",apiResonse.data);
  };

  const getShowDataApi = async () => {
    const getApiData = await axios.get(
      `${process.env.REACT_APP_API_URL}interview-schedule/showdata/${interviewId}`,
      {
        headers: {
          Authorization: `${authorize}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const apiResonse = await getApiData?.data;
    console.log("Show Data Api Response", apiResonse);
    if (apiResonse?.code === 200) {
      setShowInterviewData(apiResonse?.data);
    } else {
      setShowApiErrorPopUp(true);
      setApiError(apiResonse?.message);
    }
  };

  const handleDownloadResume = (id) => {

    const link = document.createElement("a");
    const currTime = new Date().toLocaleTimeString;
    link.target = "_blank";
    link.href = id
    link.download = `'result${currTime}.pdf`;

    link.click();
  };

  useEffect(() => {
    if (interviewId) {
      getShowDataApi();
    }
  }, [interviewId]);

  const getData = async () => {
    const getApiData = await axios.get(
      `${process.env.REACT_APP_API_URL}interview-list`,
      {
        headers: {
          Authorization: `${authorize}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const apiResonse = await getApiData?.data;
    console.log("API Response", apiResonse);
    if (apiResonse?.code === 200) {
      setData(apiResonse?.data);
      console.log("221", apiResonse.data);
    } else {
      console.log("Api Response", apiResonse);
      setShowApiErrorPopUp(true);
      setApiError(apiResonse?.message);
    }
    console.log("API Response", apiResonse.data);
  };

  useEffect(() => {
    getData();
    getEditData();
    document.title = "CIPLCRM | Interview Schedule";
  },[location]);

  const handleSendInterviewFeedback = (obj) => {
    let { type, round, url_name, eid, id } = obj;

    console.log(obj);

    if (type == "interview round 1") {
      url_name = "ratingfeedback";
      round = "Interview Round 1"
    } else if (type == "interview round 2") {
      url_name = "ratingfeedbacktwo";
      round = "Interview Round 2"
    }

    console.log(url_name);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}sendratinglink/${id}/${eid}`,
        {
          url_name: url_name,
          round: round
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authorize}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const currentDateTime = new Date();

  const tableHeadingg = [
    {
      name: "S. No.",
      selector: (row, index) => index + 1,
      sortable: false,
      maxWidth: "fit-content",
    },
    {
      name: "Name",
      selector: (row) => row?.full_name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row?.schedule_date).utc().format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row?.status === "hired"
          ? "Hired"
          : row?.status === "pending"
            ? "Pending"
            : row?.status === "canceled"
              ? "Cancelled"
              : row?.status === "rejected"
                ? "Rejectecd"
                : row?.status === "Interview Round 1"
                  ? "Interview Round 1"
                  : row?.status === "assign round 1"
                    ? "Assign Round 1"
                    : row?.status === "assign round 2"
                      ? "Assign Round 2"
                      : row?.status === "Interview Round 2"
                        ? "Interview Round 2"
                        : row?.status === "assign round 1"
                          ? "Assign Round 1"
                          : row?.status?.status,
      sortable: true,
    },
    {
      name: "Action",

      selector: (row) => (
        <div className="tablealign">
          {jsonData?.data?.userPermissions?.find((x) =>
            x?.includes("edit_schedule")
          ) ? (
            <>
              <button
                onClick={() =>
                  handleSendInterviewFeedback({
                    id: row.id,
                    eid: row.employee_id,
                    type: row.status,
                  })
                }
              >

              </button>

              <button
                onClick={() => {
                  setInterviewId(row?.id);
                  setMeetingUrl(row?.meetingurl);
                  setInterviewType(row?.interview_type);
                  setEmployeeId(row?.employee_id);
                  setCandidateId(row?.candidate_id);
                  setShowEditPopup(true);
                  setScheduleDate(
                    moment(row?.schedule_date).utc().format("YYYY-MM-DD")
                  );
                  setScheduleTime(
                    moment(row?.schedule_date).utc().format("HH:mm")

                  );
                }}
                className=""
              >

              </button>
              <button
                onClick={() => {
                  setInterviewId(row?.id);
                  setShowInterviewStatus(true);
                }}
                className=""
              >

              </button>
            </>
          ) : null}
          {jsonData?.data?.userPermissions?.find((x) =>
            x?.includes("delete_schedule")
          ) ? (
            <button
              className=""
              to="#"
              onClick={async () => {
                Swal.fire({
                  title: "Are you sure you want to delete this ?",
                  text: "After deleting all related data would be deleted and can not be retrived. So before deleting make sure you have back up of all related data.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  reverseButtons: true,
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    await fetch(
                      `${process.env.REACT_APP_API_URL}interview/delete/${row?.id}`,
                      {
                        method: "get",
                        headers: {
                          Authorization: `${authorize}`,
                          "Content-type": "application/json; charset=UTF-8",
                        },
                      }
                    );
                    getData();
                    Swal.fire("Deleted!", "", "success");
                  } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    Swal.fire("Cancelled", "", "error");
                  }
                });
              }}
            >

            </button>
          ) : null}

          {jsonData?.data?.userPermissions?.find((x) =>
            x?.includes("edit_schedule")
          ) ? (
            <button
              onClick={async () => {
                try {
                  const request = await fetch(
                    `${process.env.REACT_APP_API_URL}job-applications/archiveJobApplication/${row?.candidate_id}`,
                    {
                      method: "post",
                      headers: {
                        Authorization: `${authorize}`,
                        "Content-type": "application/json; charset=UTF-8",
                      },
                    }
                  );
                  const response = await request?.json();
                  if (response?.code === 200) {
                    toast.success(`${response?.message}`);
                    getData();
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

            </button>
          ) : null}

          <div style={{ display: "flex" }}>
            {filteredDataPID[0]?.result_url && (

              <BsFillEyeFill
                size={30}
                className="bg-gray-800 text-white my-4 m-1 w-6 p-1 h-6 hover:cursor-pointer"
                onClick={() => handleDownloadResume(row?.result_url)}
              />
            )}

            <AiOutlineCloudUpload
              size={30}
              className="bg-gray-800 text-white my-4 m-1 w-6 p-1 h-6 hover:cursor-pointer ms-1"
              onClick={() => handleUploadResult(row.id)}
            />
          </div>
        </div>
      ),
      sortable: false,
      justifyContent: "center",
      allowOverflow: true,
      padding: "2px",
    },
  ];

  const tableHeading = [
    {
      name: "S. No.",
      selector: (row, index) => index + 1,
      sortable: false,
      maxWidth: "fit-content",
    },
    {
      name: "Name",
      selector: (row) => row?.full_name,
      sortable: true,
    },
    {
      name: 'Recruiter Name',
      selector: (row) => row?.interviewer_name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row?.schedule_date).utc().format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row?.status === "hired"
          ? "Hired"
          : row?.status === "pending"
            ? "Pending"
            : row?.status === "canceled"
              ? "Cancelled"
              : row?.status === "rejected"
                ? "Rejectecd"
                : row?.status === "interview round 1"
                  ? "Interview Round 1"
                  : row?.status === "assign round 1"
                    ? "Assign Round 1"
                    : row?.status === "assign round 2"
                      ? "Assign Round 2"
                      : row?.status === "interview round 2"
                        ? "Interview Round 2"
                        : row?.status === "assign round 1"
                          ? "Assign Round 1"
                          : "NA",
      sortable: true,
    },
    {
      name: "Action",

      selector: (row) => (
        <div className="">
          {jsonData?.data?.userPermissions?.find((x) =>
            x?.includes("edit_schedule")
          ) ? (
            <>
              <button
                onClick={() =>
                  handleSendInterviewFeedback({
                    id: row.id,
                    eid: row.employee_id,
                    type: row.status,
                  })
                }
              >

                <div className="relative text-center  rounded-sm">
                  <div className="group no-underline cursor-pointer relative inline-block text-center">
                    <MdEmail
                      className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer"
                      fill="white"
                      size={30}
                    />
                    <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
                      Mail
                    </div>
                  </div>
                </div>

              </button>

              <button
                onClick={() => {
                  setInterviewId(row?.id);
                  setMeetingUrl(row?.meetingurl);
                  setInterviewType(row?.interview_type);
                  setEmployeeId(row?.employee_id);
                  setCandidateId(row?.candidate_id);
                  setShowEditPopup(true);
                  setScheduleDate(
                    moment(row?.schedule_date).utc().format("YYYY-MM-DD")
                  );
                  setScheduleTime(
                    moment(row?.schedule_date).utc(+530).format("HH:mm")
                  );
                }}
                className=""
              >
                <div className="relative text-center  rounded-sm">
                  <div className="group no-underline cursor-pointer relative inline-block text-center">
                    <FaRegEdit
                      className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer"
                      fill="white"
                      size={30}
                    />
                    <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
                      Edit
                    </div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => {
                  setInterviewId(row?.id);
                  setShowInterviewStatus(true);
                }}
                className=""
              >
                <div className="relative text-center  rounded-sm">
                  <div className="group no-underline cursor-pointer relative inline-block text-center">
                    <TbNewSection
                      className="bg-gray-800 m-1 w-6 p-1 h-6 text-white hover:cursor-pointer"
                      fill="white"
                      size={30}
                    />
                    <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
                      Overlay
                    </div>
                  </div>
                </div>
              </button>
            </>
          ) : null}
          {jsonData?.data?.userPermissions?.find((x) =>
            x?.includes("delete_schedule")
          ) ? (
            <button
              className=""
              to="#"
              onClick={async () => {
                Swal.fire({
                  title: "Are you sure you want to delete this ?",
                  text: " After deleting all related data would be deleted and can not be retrived. So before deleting make sure you have back up of all related data. ",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  reverseButtons: true,
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    await fetch(
                      `${process.env.REACT_APP_API_URL}interview/delete/${row?.id}`,
                      {
                        method: "get",
                        headers: {
                          Authorization: `${authorize}`,
                          "Content-type": "application/json; charset=UTF-8",
                        },
                      }
                    );
                    getData();
                    Swal.fire("Deleted!", "", "success");
                  } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    Swal.fire("Cancelled", "", "error");
                  }
                });
              }}
            >
              <div className="relative text-center  rounded-sm">
                <div className="group no-underline cursor-pointer relative inline-block text-center">
                  <AiOutlineDelete
                    size={30}
                    className="bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"

                  />
                  <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
                    Delete
                  </div>
                </div>
              </div>

            </button>
          ) : null}

          {jsonData?.data?.userPermissions?.find((x) =>
            x?.includes("edit_schedule")
          ) ? (
            <button
              onClick={async () => {
                try {
                  const request = await fetch(
                    `${process.env.REACT_APP_API_URL}job-applications/archiveJobApplication/${row?.candidate_id}`,
                    {
                      method: "post",
                      headers: {
                        Authorization: `${authorize}`,
                        "Content-type": "application/json; charset=UTF-8",
                      },
                    }
                  );
                  const response = await request?.json();
                  if (response?.code === 200) {
                    toast.success(`${response?.message}`);
                    getData();
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


              <div className="relative text-center  rounded-sm">
                <div className="group no-underline cursor-pointer relative inline-block text-center">
                  <FaDatabase
                    size={30}
                    className="bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"
                  />
                  <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
                    DB Store
                  </div>
                </div>
              </div>

            </button>
          ) : null}

        </div>
      ),
      sortable: false,
      justifyContent: "center",
      allowOverflow: true,
      padding: "2px",
    },
  ];

  const handleUpload = (event) => {
    event.preventDefault();

    if (selectedFile == null) {
      toasthot.error("Please Choose File");
    } else if (selectedValuepass == null) {
      toasthot.error("Please Select Pass or Fail");
    }

    if (selectedFile != null && selectedValuepass != null) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}upload-result/${uploadid}`,
          {
            status_id: selectedValuepass,
            file: selectedFile,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${authorize}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          setinterviewPopup(false);
          setSelectedValuePass(null);
          setSelectedFile(null);
          setIsuploaded(false)
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data?.message?.hasOwnProperty("file"))
            toasthot.error(err?.response?.data?.message?.file[0]);
          if (err?.response?.data?.message?.hasOwnProperty("status_id"))
            toasthot.error(err?.response?.data?.message?.status_id[0]);
        });
    }
  };

  useEffect(() => {
    console.log("758", filteredData);
    console.log("759", data);
  }, [filteredData, data]);

  const filterName =
    data &&
    data?.filter((data) => data?.full_name?.toLowerCase().includes(search));
  console.log('kya hai ye ', filterName)
  const filterDataByTab = (data, tab) => {
    switch (tab) {
      case "round 1":
        return data.filter(item => item.status === "interview round 1");
      case "round 2":
        return data.filter(item => item.status === "interview round 2");
      // Add more cases for other tabs if needed
      default:
        return data;
    }
  };

  
  // Further down, ensure that you check if filteredData is an array before filtering
  const filteredDataByNameAndStatus = Array.isArray(filteredData) ? filteredData.filter((data) =>
    data?.full_name?.toLowerCase().includes(search) ||
    data?.status?.toLowerCase().includes(search)
  ) : [];
 
  
  // Inside your component's return statement
  console.log('Data to be passed to Table:', filteredDataByNameAndStatus);

  return (
    <>
      <div>
        {interviewPopup && (
          <div className="popupcontainer">
            <div className="bg-white p-4 rounded shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Upload Result</h2>

              <form>
                <select
                  value={selectedValuepass}
                  onChange={(e) => setSelectedValuePass(e.target.value)}
                  className="input"
                  required
                >
                  <option selected disabled value="">
                    Select Pass/Fail
                  </option>
                  <option value={8}>Pass</option>
                  <option value={9}>Fail</option>
                </select>
                <div className=" pt-4 bg-grey-lighter">

                  <input
                    onChange={handleFileInputChange}
                    type="file"
                    required
                    className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-500 file:text-white hover:file:text-primary
                                hover:file:bg-gray-100
                                "
                  />
                </div>
                {/* <input type="file" /> */}
                <button
                  onClick={handleUpload}
                  type="submit"
                  className="px-6 text-white font-semibold rounded py-2 bg-green-500 mt-4"
                >
                  Submit
                </button>
                <button
                  onClick={() => setinterviewPopup(false)}
                  className="px-6 text-white font-semibold rounded py-2 bg-green-500 ml-4 mt-4"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        <ToastContainer position="top-center" />
        {jsonData?.data?.userPermissions?.find((x) =>
          x?.includes("add_schedule")
        ) && showTab != "online" ? (
          <div className="lg:px-4 px-3">
            <div className="flex items-center justify-between">
              <span className="lg:text-xl text-lg">Interview Schedule</span>

              <div className="flex items-center">

                <span>
                  <Link to="/admin">
                    <AiOutlineHome size={30} className="text-primary px-1" />
                  </Link>
                </span>
                <span className="lg:text-xl text-lg">
                  {"/" + "Interview Schedule"}
                </span>

                {showTab === "hired" ? null : (
                  <button className="px-2 flex bg-gray-800 hover:bg-slate-700 text-white m-2 py-2 items-center rounded">
                    <span className="px-1">
                      <AiFillPlusCircle />
                    </span>
                    <Link
                      to={`/admin/addinterviewschedule`}
                      state={
                        showTab === "round 1"
                          ? "interview round 1"
                          : "interview round 2"
                      }
                    >
                      Add Interview Schedule
                    </Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className=" mx-4 ">
          <label >
          <input
            type="radio"
            value="inhouse"
            name="btn"
            checked={selectedType === "inhouse"}
            onChange={handleRadioChange}
          />
            <span className=' px-1 font-medium text-lg '>Inhouse</span>
          </label>

          <label className="mx-2">
          <input
            type="radio"
            value="onsite"
            name="btn"
            checked={selectedType === "onsite"}
            onChange={handleRadioChange}
          />
            <span className='px-1 font-medium text-lg '>Project</span>
          </label>
        </div>

        {interviewReview ? (
          <InterviewReview
            getData={getData}
            interviewReviewData={interviewReviewData}
            setInterviewReview={setInterviewReview}
          />
        ) : null}
        {showApiErrorPopUp ? (
          <ApiErrorPopUp setModal={setShowApiErrorPopUp} error={apiError} />
        ) : null}
        {showInterviewStatus ? (
          <InterviewScheduleStatus
            getData={getData}
            interviewId={interviewId}
            setShowInterviewStatus={setShowInterviewStatus}
            data={showInterviewData}
          />
        ) : null}
        {showEditPopUp ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                      Edit Interview Schedule
                    </h3>
                    <button
                      className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
                      onClick={() => setShowEditPopup(false)}
                    >
                      <span className=" text-red-500 h-6 w-6 text-xl block ">
                        X
                      </span>
                    </button>
                  </div>
                  <form className="w-full px-4">
                    <div className=" w-full flex py-4 items-center">
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="w-full mr-1">
                          <label className="flex pr-1">
                            Meeting URL <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            disabled
                            value={meetingUrl}
                            maxLength={50}
                            className="border  w-full px-2 py-2"
                            placeholder={"Enter Meeting URL"}
                            onChange={(e) => setMeetingUrl(e.target.value)}
                          />
                        </div>
                        <div className="w-full ">
                          <div className="w-full">
                            <label className="flex pr-1">
                              Candidate <span className="text-red-400">*</span>
                            </label>
                            <select
                              required
                              value={candidateId}
                              disabled
                              onChange={(e) => setCandidateId(e.target.value)}
                              className="w-full border p-2 "
                            >
                              <option>Choose Candidate</option>
                              {candidateList &&
                                candidateList?.map((candidate) => (
                                  <option
                                    key={candidate?.id}
                                    value={candidate?.id}
                                  >
                                    {candidate?.full_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="w-full ">
                          <div className="w-full">
                            <label className="flex pr-1">
                              Employee <span className="text-red-400">*</span>
                            </label>
                            <select
                              required
                              value={employeeId}
                              className="w-full border p-2 "
                              onChange={(e) => setEmployeeId(e.target.value)}
                            >
                              <option>Choose Employee</option>
                              {employeeList &&
                                employeeList?.map((candidate) => (
                                  <option
                                    key={candidate?.id}
                                    value={candidate?.id}
                                  >
                                    {candidate?.name}
                                  </option>

                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="w-full">
                          <label className="flex pr-1">
                            Interview Type{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <select
                            required
                            value={interviewType}
                            className="border  w-full px-2 py-2"
                            onChange={(e) => setInterviewType(e.target.value)}
                          >
                            <option>Choose Interview Type</option>
                            <option value={"online"}>Online</option>
                            <option value={"offline"}>Offline</option>
                          </select>
                        </div>
                        {/* grid 2 */}
                        <div className="w-full flex">
                          <div className="w-full mr-1">
                            <label className="flex pr-1">
                              Schedule Date{" "}
                              <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="date"
                              required
                              value={scheduleDate}
                              className="border  w-full px-2 py-2"
                              onChange={(e) => setScheduleDate(e.target.value)}
                            />
                          </div>
                          <div className="w-full ml-1">
                            <label className="flex pr-1">
                              Schedule Time{" "}
                              <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="time"
                              required
                              value={scheduleTime}
                              className="border  w-full px-2 py-2"
                              onChange={(e) => setScheduleTime(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                      type="button"
                      onClick={async () => {
                        try {
                          const formData = new FormData();
                          formData.append("scheduleTime", scheduleTime);
                          formData.append("scheduleDate", scheduleDate);
                          formData.append("candidate_id", candidateId);
                          formData.append("interview_type", interviewType);
                          formData.append("meetingurl", meetingUrl);
                          formData.append("employee[0]", employeeId);
                          const updateRequest = await axios.postForm(
                            `${process.env.REACT_APP_API_URL}interview/update/${interviewId}`,
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
                          console.log("APi update response", response);
                          if (response?.code === 200) {
                            toast.success(`${response?.message}`);
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
        ) : null}

        <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
          <div className="flex flex-col">
            <div className="flex cursor-pointer mt-2">
           
              <div
                onClick={() => setShowTab("online")}
                className={`px-4 ${showTab === "online" ? "bg-green-600" : "bg-gray-700"
                  } mr-1 py-2 text-white`}
              >
                Result
              </div>
             
              <div
                className={`px-4 ${showTab === "round 1" ? "bg-green-600" : "bg-gray-700"
                  } mr-1 py-2 text-white`}
                onClick={() => setShowTab("round 1")}
              >
                Interview Round 1
              </div>
              <div
                onClick={() => setShowTab("round 2")}
                className={`px-4 ${showTab === "round 2" ? "bg-green-600" : "bg-gray-700"
                  } mr-1 py-2 text-white`}
              >
                Interview Round 2
              </div>
            </div>

            {showTab !== "online" ? (
              <div
                className={`overflow-x-auto rounded ${showTab === "round 1" ? "bg-gray-100" : "bg-gray-200"
                  } border mb-2`}
              >
                <div className="py-3 flex justify-end pr-2">
                  <div className="relative max-w-xs flex items-center justify-end">
                    <label htmlFor="hs-table-search" className="px-2">
                      Search:
                    </label>
                    <input
                      type="text"
                      className="block w-full p-3 border text-sm border-gray-300 rounded-md "
                      placeholder="Search..."
                      onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                  </div>
                  
                </div>
                <div className="lg:p-1.5  mb-4 pt-2 w-full inline-block align-middle">
                  <div className="overflow-hidden border  rounded-lg">

                    {/* <Table columns={tableHeading} data={filteredDataByNameAndStatus} /> */}
                    {selectedType === 'inhouse' ? (
          <DataTable
            columns={tableHeading}
            data={filterDataByTab(inhouseData, showTab)}
            pagination
          />
        ) : (
          
          <DataTable
            columns={tableHeading}
            data={filterDataByTab(projectData, showTab)}
            pagination
          />
        )}

                  </div>
                </div>
              </div>
              
            ) : (
              
              <div className="mt-4">
                {
  selectedType === 'onsite' && (
          <div className="btnsearch">
                  <Select
                    isClearable
                    options={
                      listForm &&
                      listForm?.map((options) => ({
                        value: options?.id,
                        label: options?.pid,
                        // jobrecruitmentData: options?.jobrecruitment,
                      }))
                    }
                    onChange={(e) => {
                      setJobId(e?.value);
                      // setJobRecruitmentData(
                      //   e?.jobrecruitmentData ? e?.jobrecruitmentData : ""
                      // );
                    }}
                    className="searchbox"
                  />
                  <div className="col-span-1 flex items-end pb-5">
                    <div className="button">
                      <button
                        onClick={getAssigneeData}
                        className="ms-4 px-8 py-2 hover:bg-gray-900 cursor-pointer bg-primary rounded-sm text-white"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
  )}
                <div className="grid grid-cols-1 bg-white border-t-2 my-2 border-gray-900 shadow ">
                  <DataTable
                    columns={tableHeadingg}
                    data={filteredDataPID}
                    pagination
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default InterviewSchedule;