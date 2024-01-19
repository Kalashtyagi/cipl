import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye, FaMoneyBill, FaRegEdit } from "react-icons/fa";
import Select from "react-select";
import ApiErrorPopUp from "../../../components/ApiErrorPopUp";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserProfile from "../../../components/UserProfile";
import ViewSalary from "./ViewSalary";

const SalaryList = () => {
  const [showSalary, setShowSalary] = useState(false);
  const [iD, setID] = useState("");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [jobRecruitmentData, setJobRecruitmentData] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [hodSearch, setHodSearch] = useState("");
  const [listForm, setListForm] = useState("");
  const [showEditPopUp, setShowEditPopup] = useState("");
  const [qualification, setQualification] = useState("");
  const [subQualificaiton, setSubQualification] = useState("");
  const [qualificaitonId, setQualificationId] = useState("");
  const [jobId, setJobId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [profileData, setProfileData] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false);

  const [radioSelection, setRadioSelection] = useState("inhouse");
  const data = JSON.parse(localStorage.getItem("data"));



  // console.log("location search",locationSearch)
  // console.log("hod search",hodSearch)
  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const customAxios = axios.create({
    headers: { Authorization: authorize }
  });

  // Function to fetch job applications
  const getJobApplications = async (selection) => {
    setLoading(true);
    try {
      const response = await customAxios.get(`${process.env.REACT_APP_API_URL}job-application-list?type=${selection}`);

      setFilteredData(response.data.data);

      console.log('jobapllication data list', response.data.data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };
  // Fetch job applications based on radio selection
  useEffect(() => {
    getJobApplications(radioSelection);
  }, [radioSelection]);

  const getData = async () => {
    // alert("Data called")
    const getApiData = await axios.get(`${process.env.REACT_APP_API_URL}erf`, {
      headers: {
        Authorization: `${authorize}`,
      },
    });
    const apiResonse = await getApiData.data;
    // console.log('api response',apiResonse)
    if (apiResonse) {
      
      setListForm(apiResonse?.data);
    }
  };
  // console.log(listForm,"listform");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (qualificaitonId) {
      getQualificationApi();
    }
  }, [showEditPopUp]);


  useEffect(() => {
    if (qualificaitonId) {
      getSubQualificationApi(qualificaitonId);
    }
  }, [showEditPopUp, qualificaitonId]);

  const getSubQualificationApi = async (qualificaitonId) => {
    if (qualificaitonId) {
      const getSubQualification = await fetch(
        `${process.env.REACT_APP_API_URL}subqualification/search`,
        {
          method: "POST",
          headers: {
            Authorization: `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            qualification_id: `${qualificaitonId}`,
          }),
        }
      );
      const jsonResponse = await getSubQualification?.json();
      // console.log("Sub Qualification",jsonResponse )

      if (jsonResponse) {
        setSubQualification(jsonResponse?.data);
      }
    }
  };
  const getQualificationApi = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_API_URL}qualification`,
      {
        method: "GET",
        headers: {
          Authorization: `${authorize}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const jsonResponse = await request?.json();
    // console.log("qualification",jsonResponse )

    if (jsonResponse) {
      setQualification(jsonResponse?.data);
    }
  };
  const getAssigneeData = async () => {
    // Check for jobId only when necessary, not when toggling radio buttons
    if (!jobId && (locationSearch || hodSearch)) {
      toast.error("Please Select PID");
      return; // Exit the function if jobId is not set but other filters are applied
    }

    if (jobId !== "" || null || undefined) {
      const formData = new FormData();
      formData.append("location", locationSearch);
      formData.append("project_manager", hodSearch);
      const request = await axios.postForm(
        `${process.env.REACT_APP_API_URL}job-applications/${jobId}`,
        formData,
        {
          headers: {
            Authorization: `${authorize}`,
          },
        }
      );

      const response = request.data;
      if (response && Array.isArray(response.data)) {
        setFilteredData(response?.data.filter((x) => x?.salarydetails != null));
      }
    }
  };

  console.log("filtered data", filteredData);


  const tableHeading = [
    {
      name: "S. No.",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => (
        <button
          className="text-blue-700 hover:text-blue-900"
          onClick={() => {
            setShowProfilePopup(!showProfilePopup);
            setProfileData(row);
          }}
        >
          {row?.full_name}
        </button>
      ),
      sortable: true,
    },
    {
      name: "ERF ID",
      selector: (row) => row?.job?.erf_id,
      sortable: true,
    },
    {
      name: "Employee Code",
      selector: (row) => row?.salarydetails?.employeeCode,
      sortable: true,
    },
    {
      name: "Project Name",
      selector: (row) => row?.job?.project_name,
      sortable: true,
    },
    {
      name: "Salary (CTC)",
      selector: (row) => row?.salarydetails?.ctc,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="capitalize">{row?.status?.status}</div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button>
            <FaEye
              onClick={() => {
                setShowSalary(true);
                console.log("row", row?.id);
                setID(row?.id);
              }}
              size={30}
              className="bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"
              title="View"
            />
          </button>
        </div>
      ),
    },
  

  ];


  let rejectColumn = {
    name: "Reject",
    selector: (row) => (
      <>
        <div className="relative">
          <button
            type="button"
            className="flex my-4 transition-all delay-150 duration-150 px-2 py-2 rounded text-white bg-red-700 hover:bg-green-500"
            onClick={() => setShowPopup(!showPopup)}
          >
            <span className="text">View Reason</span>
          </button>

          {showPopup && (
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '30px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                zIndex: 1000
              }}
            >
              {row?.cancel_reason}.
              <button className="view-reason-button mt-3" onClick={() => setShowPopup(false)}>Close</button>
            </div>
          )}
        </div>
      </>
    ),
  };


  if (filteredData?.some(row => row?.status?.id === 25)) {
    tableHeading.push(rejectColumn);
  }


  const statusList = [
    {
      id: 1,
      status: "Applied",
    },
    {
      id: 2,
      status: "Online Exam",
    },
    {
      id: 3,
      status: "Interview Round 1",
    },
    {
      id: 4,
      status: "Interview Round 2",
    },
    {
      id: 5,
      status: "Hired",
    },
    {
      id: 6,
      status: "Rejected",
    },
    {
      id: 7,
      status: "Expired",
    },
    {
      id: 8,
      status: "Pass",
    },
    {
      id: 9,
      status: "Fail",
    },
    {
      id: 10,
      status: "Salary Negotiation",
    },
    {
      id: 11,
      status: "Assign Round 1",
    },
    {
      id: 12,
      status: "Assign Round 2",
    },
  ];
  return (

    <div>

      <div className=" mx-4 ">
        <label >
          <input
            type="radio"
            value="inhouse"
            name="btn"
            checked={radioSelection === "inhouse"}
            onChange={() => {
              setRadioSelection("inhouse");
              getAssigneeData();
            }}
          />
          <span className=' px-1 font-medium text-lg '>Inhouse</span>
        </label>

        <label className="mx-2">
          <input
            type="radio"
            value="onsite"
            name="btn"
            checked={radioSelection === "onsite"}
            onChange={() => {
              setRadioSelection("onsite");
              getAssigneeData();
            }}
          />
          <span className='px-1 font-medium text-lg '>Project</span>
        </label>
      </div>

      <ToastContainer position="top-center" />
      {showSalary ? (
        <>
          <div className="justify-center h-full items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full h-fit top-[100%] mx-2 mt-4 my-6 max-w-[75%]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t  salary-scrolly">
                  <h3 className="text-2xl font-semibold">Salary</h3>
                  <button
                    className="p-1 ml-auto border-0 text-red-500 float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowSalary(false)}
                  >
                    <span className="text-red-500 h-6 w-6 text-xl block">
                      X
                    </span>
                  </button>
                </div>
                <div className="w-full px-4 max-h-[600px] overflow-y-auto">
                  <div className="w-full flex py-4 items-center">
                    <ViewSalary getDataId={iD} setShowSalary={setShowSalary} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setShowSalary(false)}
            className="opacity-75 cursor-pointer fixed inset-0 z-40 bg-black"
          ></div>
        </>
      ) : null}
      <div className="w-full">
        <div className="p-4">
          {radioSelection !== "inhouse" && (
            <div className="grid bg-white w-full border-t-2 my-2 border-gray-900  shadow grid-cols-12">
              
      <div className="p-4 col-span-3">
        <h2 className={`my-1 text-lg after:content-['*'] after:text-red-500 after:pl-1`}>
          PID
        </h2>
        <Select
          isClearable
          options={
            listForm
              ?.filter(option => option?.pid && option.pid.trim() !== '') // Filter out options with empty or invalid pid
              .map(option => ({
                value: option.id,
                label: option.pid,
                jobrecruitmentData: option.jobrecruitment,
              }))
          }
          onChange={(e) => {
            setJobId(e?.value ? e?.value : "");
            setJobRecruitmentData(
              e?.jobrecruitmentData ? e?.jobrecruitmentData : []
            );
          }}
          className="w-full"
        />
      </div>
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Location</h2>

                <Select
                  isClearable
                  options={
                    Array.isArray(jobRecruitmentData)
                      ? jobRecruitmentData.map((options) => ({
                        value: options?.id,
                        label:
                          !options?.location || options?.location.trim() === ""
                            ? "NA"
                            : options?.location,
                      }))
                      : []
                  }
                  onChange={(e) => setLocationSearch(e?.value ? e?.value : "")}
                  className="w-full"
                />

              </div>
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">HOD</h2>
                {Array.isArray(jobRecruitmentData) && jobRecruitmentData.length > 0 ? (
          <Select
            isClearable
            options={jobRecruitmentData.map(options => ({
              value: options?.id,
              label: options?.project_manager || "NA",
            }))}
            onChange={(e) => setHodSearch(e?.value ? e?.value : "")}
            className="w-full"
          />
        ) : (
          <Select
         
          />
        )}
              </div>
              <div className="p-4 col-span-2 flex items-end pb-5">
                <button
                  onClick={() => getAssigneeData()}
                  className="px-8 py-2 hover:bg-gray-900 cursor-pointer bg-primary rounded-sm text-white"
                >
                  Search
                </button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 bg-white border-t-2 my-2 border-gray-900 shadow ">
            <DataTable columns={tableHeading} data={filteredData} pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryList;
