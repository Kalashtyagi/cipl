import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye, FaInfoCircle, FaMoneyBill, FaRegEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Select from "react-select";
import ApiErrorPopUp from "../../../components/ApiErrorPopUp";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserProfile from "../../../components/UserProfile";
import Swal from "sweetalert2";
import { Circles } from 'react-loader-spinner'

const JobApplication = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showModalId, setShowModalId] = useState("");
  const [jobRecruitmentData, setJobRecruitmentData] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [hodSearch, setHodSearch] = useState("");
  const [listForm, setListForm] = useState("");
  const [showEditPopUp, setShowEditPopup] = useState("");
  const [qualification, setQualification] = useState("");
  const [subQualificaiton, setSubQualification] = useState(""); //
  const [subQualificationId, setSubQualificationId] = useState([]); //''
  const [qualificaitonId, setQualificationId] = useState("");
  const [relvantExp, setRelvantExp] = useState("");
  const [totalExp, setTotalExp] = useState("");
  const [address, setAddress] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [showApiErrorPopUp, setShowApiErrorPopUp] = useState(false);
  const [name, setName] = useState("");
  const [apiError, setApiError] = useState("");
  const [jobId, setJobId] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [profileData, setProfileData] = useState("");
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [togglere, setToggleRe] = useState(false);
   const [loading, setLoading] = useState(false);
   const [radioSelection, setRadioSelection] = useState("inhouse");
   const [refreshData, setRefreshData] = useState(false);
   const data = JSON.parse(localStorage.getItem("data"));
  
  
  console.log("subqual", subQualificationId);
  console.log("subquaalicctaoin", subQualificaiton);
  console.log("qualification", qualificaitonId);
  // console.log(localStorage.getItem('subqualification_id',subqualification_id))

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
      console.log('jobapllication data list',response.data.data);
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
  }, [radioSelection,refreshData]);

  // Fetch initial data
  useEffect(() => {
    getData();
  }, [toggle]);
  const getData = async () => {
    // alert("Data called")
    const getApiData = await axios.get(`${process.env.REACT_APP_API_URL}erf`, {
      headers: {
        Authorization: `${authorize}`,
      },
    });
    const apiResonse = await getApiData.data;
    console.log("api response", apiResonse);
    if (apiResonse) {
     
      setListForm(apiResonse?.data);
    }
  };

  useEffect(() => {
    getData();
    console.log("getdataapi", getData);
  }, [toggle]);

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
      console.log("133 Sub Qualification", jsonResponse);

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
    console.log("152 qualification", jsonResponse);

    if (jsonResponse) {
      setQualification(jsonResponse?.data);
    }
  };
  const getAssigneeData = async () => {
    console.log("Jobd ID", jobId);
    if (jobId !== "" || null || undefined) {
      const formData = new FormData();
      formData.append("location", locationSearch);
      formData.append("project_manager", hodSearch);
      const response = await customAxios.post(
        `${process.env.REACT_APP_API_URL}job-applications/${jobId}`,      
        formData,
      );      
      console.log("response line 170", response);
      if (response) {
        setFilteredData(response.data.data);
        console.log("kya aa raha hai",response);
      }
    }
    // if (jobId === "" || null || undefined) {
    //   toast.error("Please Select PID");
    // }
  };

  useEffect(()=>{
      if(jobId){
          getAssigneeData()
      }
  },[jobId])

  const handleStatus = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log("id", id);
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}jobapplication/statusupdate/${showModalId}`,
        { status: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      const response = await request?.data;
      if (response?.code === 200) {
        toast.success(`${response?.message}`);
        setRefreshData(prev => !prev);
        setShowStatusModal(false);
        getAssigneeData();

        //   setShowAddModal(false)
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

  useEffect(() => {
    getAssigneeData();
  }, [toggle]);

  const handleDocumentVerification = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}documents/uploadlink/${showModalId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      const response = await request?.data;
      if (response?.code === 200) {
        toast.success(`${response?.message}`);
        setRefreshData(prev => !prev);
        setShowStatusModal(false);
        getAssigneeData();
        //   setShowAddModal(false)
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

  const handlePostHired = (id) => {
    console.log(authorize);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}hired/${id}`,
        {
          status: "5",
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
        setRefreshData(prev => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePCCVerification = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}pccdocumentslink/${showModalId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      const response = await request?.data;
      if (response?.code === 200) {
        toast.success(`${response?.message}`);
        setRefreshData(prev => !prev);
        setShowStatusModal(false);
        getAssigneeData();
        //   setShowAddModal(false)
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
      name: "Recruiter Name",
      selector: (row) => row?.job?.jobassigned[0]?.belongsassigned?.name,
      sortable: true,
    },

    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row?.phone,
      sortable: true,
    },
    {
      name: "Qualification",
      selector: (row) => row?.qualification?.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div className=" capitalize">{row?.status?.status}</div>
      ),
      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => (
        <div className="">
          {jsonData?.data?.userPermissions?.find((x) =>
            x?.includes("edit_job_applications")
          ) ? (
            <button
              onClick={() => {
                console.log("407 ", row?.subqualifications[0]?.id);
                setShowEditPopup(true);
                setName(row?.full_name);
                setEmail(row?.email);
                setPhone(row?.phone);
                setStatus(row?.status?.id);
                setJobId(row?.job_id);
                setQualificationId(row?.qualification_id);
                setAddress(row?.address);
                if (
                  Array.isArray(row?.subqualifications) &&
                  row?.subqualifications.length > 0
                ) {
                  setSubQualificationId(
                    row.subqualifications.map(
                      (item) => item.subqualifications_id
                    )
                  );
                } else if (row?.subqualifications?.subqualifications_id) {
                  setSubQualificationId(
                    row.subqualifications.subqualifications_id
                  );
                } else if (row?.subqualification?._id) {
                  setSubQualificationId(row.subqualification._id);
                } else {
                  setSubQualificationId("");
                }

            
                setRelvantExp(row?.relevent_exp);
                setTotalExp(row?.total_exp);
                setCandidateId(row?.id);
              }}
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
          ) : null}
          {jsonData?.data?.userPermissions?.find((x) =>
            x?.includes("delete_job_applications")
          ) ? (
            <button
              className=""
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
                      `${process.env.REACT_APP_API_URL}job-applications/archiveJobApplication/${row?.id}`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `${authorize}`,
                          "Content-type": "application/json; charset=UTF-8",
                        },
                      }
                    );
                    getAssigneeData();
                    Swal.fire("Deleted!", "", "success");
                    setRefreshData(prev => !prev);
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
          {/* {
              <button onClick={()=>navigate('/admin/esic',{state:row})}>
                <FaMoneyBill 
                  size={30}
                  className="bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"/>
              </button>
            } */}
          {jsonData?.data?.userPermissions?.find((x) =>
            x?.includes("add_job_applications")
          ) ? (
            <button>
              <BsThreeDots
                onClick={() => {
                  setShowModalId(row?.id);
                  setShowStatusModal(!showStatusModal);
                }}
                size={30}
                className="bg-primary text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"
              />
              {showStatusModal === false ? null : row?.id === showModalId ? (
                <div className="absolute justify-start z-50 p-1 bg-gray-100 md:w-fit border border-gray-200 h-fit  left-0">
                  <div className="fixed">
                    {/* <button id='15' onClick={(e)=>handleStatus(e)} className='w-full block p-1 bg-white hover:bg-gray-50'>Approve</button> */}
                    {jsonData?.data?.roles[0]?.name === "Recruiter" ||
                    "admin" ? (
                      <button
                        id="14"
                        onClick={(e) => handleStatus(e)}
                        className="w-full block p-1 bg-white hover:bg-gray-50"
                      >
                        Hold
                      </button>
                    ) : null}
                    

                    <button
                      className="w-full block p-1 bg-white hover:bg-gray-50"
                      onClick={() => handlePostHired(row.id)}
                    >
                      Selected
                    </button>

                    <button
                      className="w-full block p-1 bg-white hover:bg-gray-50"
                      // onClick={() => handleRejected(row?.id)}
                      onClick={async () => {
                        try {
                          const request = await fetch(
                            `${process.env.REACT_APP_API_URL}job-applications/archiveJobApplication/${row?.id}`,
                            {
                              method: "post",
                              headers: {
                                Authorization: `${authorize}`,
                                "Content-type":
                                  "application/json; charset=UTF-8",
                              },
                            }
                          );
                          const response = await request?.json();
                          if (response?.code === 200) {
                            toast.success(`${response?.message}`);
                            setRefreshData(prev => !prev);
                            setToggle(!toggle);
                            getData();
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
                      Rejected
                    </button>

                    <button
                      id="10"
                      onClick={(e) => handleStatus(e)}
                      className="w-full block p-1 bg-white hover:bg-gray-50"
                    >
                      Salary
                    </button>

                    <button
                      id="13"
                      onClick={(e) => handleStatus(e)}
                      className="w-full block p-1 bg-white hover:bg-gray-50"
                    >
                      Re Nego.
                    </button>
                    <button
                      onClick={(e) => handleDocumentVerification(e)}
                      className="w-full block p-1 bg-white hover:bg-gray-50"
                    >
                      Document Verification
                    </button>

                    

                   
                    {/* <button onClick={(e)=>handlePCCVerification(e)} className='w-full block p-1 bg-white hover:bg-gray-50'>PCC Verification</button> */}
                    {row?.status?.id === 18 ? (
                      <button
                        onClick={(e) => handleDocumentVerification(e)}
                        className="w-full block p-1 bg-white hover:bg-gray-50"
                      >
                        Resend Document Verfi.
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </button>
          ) : null}
          {/* <button onClick={()=>navigate('/admin/result',{state:row})}>
              <FiLayers size={30} className='bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer' color='white'/>
            </button> */}
        </div>
      ),
      sortable: false,
      allowOverflow: true,
    },
  ];

  const statusList = [
    // {
    //     "id": 1,
    //     "status": "Applied"
    // },
    {
      id: 2,
      status: "Online Exam",
      role: ["admin", "Recruiter"],
    },
    {
      id: 3,
      status: "Interview Round 1",
      role: ["admin", "Recruiter"],
    },
    {
      id: 4,
      status: "Interview Round 2",
      role: ["admin", "Recruiter"],
    },
    // {
    //   id: 5,
    //   status: "Hired",
    //   role: ["admin", "Recruiter"],
    // },
    {
      id: 6,
      status: "Rejected",
      role: ["admin", "Recruiter"],
    },
    {
      id: 16,
      status: "Document Upload",
      role: ["admin", "Recruiter"],
    },
 
    {
      id: 10,
      status: "Salary Negotiation",
      role: ["admin", "Recruiter"],
    },
  
    {
      id: 13,
      status: "Re Negotiation",
      role: ["admin", "Recruiter"],
    },
    {
      id: 14,
      status: "Hold",
      role: ["admin", "Recruiter"],
    },
   
  ];
  // console.log("Filered Data",listForm)
  return (
    <div>
      <ToastContainer position="top-center" />
      <UserProfile
        profileData={profileData}
        setShowProfilePopup={setShowProfilePopup}
        showProfilePopup={showProfilePopup}
      />
      {showApiErrorPopUp ? (
        <ApiErrorPopUp setModal={setShowApiErrorPopUp} error={apiError} />
      ) : null}
      {showEditPopUp ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative lg:w-1/3 w-full mx-2 my-6 max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Edit Job Application
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
                          Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          maxLength={50}
                          className="border  w-full px-2 py-2"
                          placeholder={"Enter Name"}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="w-full ">
                        <div className="w-full">
                          <label className="flex pr-1">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            maxLength={50}
                            className="border  w-full px-2 py-2"
                            placeholder={"Enter Email"}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="w-full">
                          <label className="flex pr-1">
                            Phone <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="number"
                            required
                            value={phone}
                            maxLength={50}
                            className="border  w-full px-2 py-2"
                            placeholder={"Enter Phone"}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="w-full">
                          <label className="flex pr-1">
                            Qualification{" "}
                            <span className="text-red-400">*</span>
                          </label>

                          <select
                            required
                            onChange={(e) => {
                              setQualificationId(e.target.value);
                              setSubQualificationId("");
                            }}
                            value={qualificaitonId}
                            className="w-full border p-2 "
                          >
                            {qualification &&
                              qualification?.map((options) => {
                                return (
                                  <option key={options?.id} value={options?.id}>
                                    {options?.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      <div className="w-full">
                        <label className="flex pr-1">
                          Specialization <span className="text-red-400">*</span>
                        </label>

                        <Select
                          required
                          options={
                            Array.isArray(subQualificaiton)
                              ? subQualificaiton.map((options) => ({
                                  value: options?.id,
                                  label: options?.name,
                                }))
                              : []
                          }
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions?.map(
                              (option) => option?.value
                            );
                            setSubQualificationId(selectedValues);
                          }}
                          value={
                            Array.isArray(subQualificationId)
                              ? subQualificationId.map((value) => ({
                                  value: value,
                                  label:
                                    subQualificaiton &&
                                    Array.isArray(subQualificaiton)
                                      ? subQualificaiton.find(
                                          (option) => option?.id === value
                                        )?.name
                                      : "",
                                }))
                              : []
                          }
                          isMulti={true}
                          isClearable
                          className="w-full border p-2"
                        />

                    
                      </div>

                      <div className="w-full ">
                        <div className="w-full">
                          <label className="flex pr-1">
                            Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={address}
                            className="border  w-full px-2 py-2"
                            placeholder={"Enter Adress"}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="w-full">
                          <label className="flex pr-1">
                            Relevant Experience{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={relvantExp}
                            className="border  w-full px-2 py-2"
                            placeholder={"Enter Relevant Experience"}
                            onChange={(e) => setRelvantExp(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="w-full">
                          <label className="flex pr-1">
                            Total Experience{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={totalExp}
                            className="border  w-full px-2 py-2"
                            placeholder={"Enter Total Exprience"}
                            onChange={(e) => setTotalExp(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="w-full">
                          <label className="flex pr-1">
                            Status<span className="text-red-400">*</span>
                          </label>
                          <select
                            required
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                            className="w-full border p-2 "
                          >
                            {statusList &&
                              statusList
                                ?.filter((x) =>
                                  x?.role?.includes(
                                    jsonData?.data?.roles[0]?.name
                                  )
                                )
                                ?.map((options) => {
                                  return (
                                    <option
                                      key={options?.id}
                                      value={options?.id}
                                    >
                                      {options?.status}
                                      {console.log("Row", options)}
                                    </option>
                                  );
                                })}
                            {/* {console.log("Sub Qualificaiton",subQualificaiton)} */}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                    type="button"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const formData = new FormData();
                        formData.append("full_name", name);
                        formData.append("email", email);
                        formData.append("phone", phone);
                        formData.append("job_id", jobId);
                        formData.append("qualification_id", qualificaitonId);
                        // formData.append(
                        //   "subqualification_id[0]",
                        //   subQualificationId
                        // );
                        subQualificationId.forEach((id, index) => {
                          formData.append(`subqualification_id[${index}]`, id);
                        });
                        formData.append("status_id", status);
                        formData.append("address", address);
                        formData.append("relevent_exp", relvantExp);
                        formData.append("total_exp", totalExp);
                        const updateRequest = await axios.postForm(
                          `${process.env.REACT_APP_API_URL}job-applications/update/${candidateId}`,
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
                        console.log("line 962 APi update response", response);
                        if (response?.code === 200) {
                          setShowEditPopup(false);
                          toast.success("Jobapplication Updated Successfully");
                          setRefreshData(prev => !prev);
                          getAssigneeData();
                        }
                        if (response?.code === 403) {
                          setShowApiErrorPopUp(true);
                          setApiError(response?.message);
                        }
                      } catch (error) {
                        console.log("error", error);
                        toast.error("Something else wrong");

                        
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? ( // Conditional rendering based on loading state
                      <>
                    
                        <div
                          class="w-4 h-4 rounded-full animate-spin
                    border-2 border-solid border-white mr-2 border-t-transparent"
                        ></div>
                        <span>Loading..</span>
                      </>
                    ) : (
                      <>
                        Update
                        <FiArrowRight className="text-xl px" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      
      <div className=" mx-11 my-4 ">              
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
            <div class="border-t-2 border-indigo-500 ... border-slate-50"></div>
          
      <div className="w-full">
        <div className="p-4">
        {radioSelection !== "inhouse" && (
          <div className="grid bg-white w-full border-t-2 my-2 border-gray-900  shadow grid-cols-12">
     {Array.isArray(listForm) && listForm.length > 0 && (
  <div className="p-4 col-span-4">
    <h2 className={`my-1 text-lg`}>PID</h2>
    <Select
      isClearable
      options={Array.from(new Set(listForm.map(option => option.pid))) // Use Set to get unique PIDs
        .filter(pid => !!pid) // Filter out any empty or falsy PIDs
        .map(pid => {
          const matchingOption = listForm.find(option => option.pid === pid);
          return {
            label: matchingOption.pid,
            value: matchingOption.id || '', // Find the corresponding ID
            jobrecruitmentData: matchingOption.jobrecruitment || '',
          };
        })}
      onChange={(e) => {
        setJobId(e?.value ? e?.value : '');
        setJobRecruitmentData(e?.jobrecruitmentData ? e?.jobrecruitmentData : '');
      }}
      className="w-full"
      required
    />
  </div>
)}


<div className="p-4 col-span-3">
  <h2 className="my-1 text-lg">Location</h2>
  <Select
    isClearable
    options={
      Array.isArray(jobRecruitmentData) ?
      jobRecruitmentData.map((options) => ({
        value: options.id,
        label: options.location || "NA", // Use "NA" or similar if location is not available
      })) : [] // Provide an empty array as default
    }
    onChange={(e) => setLocationSearch(e?.value ? e?.value : "")}
    className="w-full"
  />
</div>
<div className="p-4 col-span-3">
  <h2 className="my-1 text-lg">HOD</h2>
  <Select
    isClearable
    options={
      Array.isArray(jobRecruitmentData) ?
      jobRecruitmentData.map((options) => ({
        value: options.id,
        label: options.project_manager || "NA", // Use "NA" or similar if project_manager is not available
      })) : [] // Provide an empty array as default
    }
    onChange={(e) => setHodSearch(e?.value ? e?.value : "")}
    className="w-full"
  />
</div>

            <div className="p-4 col-span-1 flex items-end pb-5">
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

export default JobApplication;
