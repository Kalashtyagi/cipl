import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye, FaInfoCircle, FaMoneyBill, FaRegEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Select from "react-select";
import ApiErrorPopUp from "../../../components/ApiErrorPopUp";
import { FiArrowRight } from "react-icons/fi";
import { json, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserProfile from "../../../components/UserProfile";
import Swal from "sweetalert2";

const FilterJobApplication = () => {
  const { state } = useLocation();
  console.log("state", state);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showModalId, setShowModalId] = useState("");
  const [jobRecruitmentData, setJobRecruitmentData] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [hodSearch, setHodSearch] = useState("");
  const [listForm, setListForm] = useState("");
  const [showEditPopUp, setShowEditPopup] = useState("");
  const [qualification, setQualification] = useState("");
  const [subQualificaiton, setSubQualification] = useState("");
  const [subQualificationId, setSubQualificationId] = useState("");
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

  // console.log("location search",locationSearch)
  // console.log("hod search",hodSearch)
  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;
  const getData = async () => {
    // alert("Data called")
    const getApiData = await axios.get(`${process.env.REACT_APP_API_URL}erf`, {
      headers: {
        Authorization: `${authorize}`,
      },
    });
    const apiResonse = await getApiData.data;

    console.log('api response',apiResonse)
    if (apiResonse) {
      // if(jsonData?.data?.roles[0]?.name==="admin")
      // {
      //   setListForm(apiResonse?.data)
      // }else{
      //   const filterData=apiResonse?.data?.filter(x =>
      //     parseInt(x?.user_id) === parseInt(jsonData?.data?.id) ||
      //     x?.jobassigned?.some(y => parseInt(y?.user_id) === jsonData?.data?.id)
      //   )
      //   setListForm(filterData)
      // }
      setListForm(apiResonse.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (qualificaitonId) {
      getQualificationApi();
    }
  }, [showEditPopUp]);

  // const getErfLeads = async () => {
  //   const request = await axios.get(`${process.env.REACT_APP_API_URL}leadstest/${state?.id}`, {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`
  //     }
  //   })
  //   const response = request?.data
  //   if (response?.code === 200) {
  //     setListForm(response?.data)
  //   }
  // }

  // useEffect(()=>{
  //   getErfLeads()
  // },[])

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
    // console.log("Jobd ID",jobId)
    const request = await axios.get(
      `${process.env.REACT_APP_API_URL}job-applications`,
      {
        headers: {
          Authorization: `${authorize}`,
        },
      }
    );
    // console.log("Request",request)
    const response = request.data;
    console.log("line no.159 response job applicaiton", response);
    if (response) {
      setFilteredData(response?.data);
      console.log('62',filteredData)
    }
  };

  useEffect(() => {
    getAssigneeData();
   
  }, []);
  // useEffect(()=>{
  //     if(jobId){
  //         getAssigneeData()
  //     }
  // },[jobId])

  const handleStatus = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log("id", id);
    try {
      const request = await axios.postForm(
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
      name: "PID",
      selector: (row, index) => row.job ? row.job.pid : 'N/A',
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
          {
            <button
              onClick={() => {
                setShowEditPopup(true);
                setName(row?.full_name);
                setEmail(row?.email);
                setPhone(row?.phone);
                setStatus(row?.status?.id);
                setJobId(row?.job_id);
                setQualificationId(row?.qualification_id);
                setAddress(row?.address);
                setSubQualificationId(row?.subqualifications[0]?.id);
                setRelvantExp(row?.relevent_exp);
                setTotalExp(row?.total_exp);
                setCandidateId(row?.id);
              }}
            >
              <FaRegEdit
                className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer"
                fill="white"
                size={30}
              />
            </button>
          }
          {
            <button
              className=""
              onClick={async () => {
                Swal.fire({
                  title: "Are you really want to delete?",
                  text: "After deleting the same all related data would be deleted and can not retrive. So before deleting make sure you have back up all related data.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  reverseButtons: true,
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    await fetch(
                      `${process.env.REACT_APP_API_URL}job-applications/delete/${row?.id}`,
                      {
                        method: "get",
                        headers: {
                          Authorization: `${authorize}`,
                          "Content-type": "application/json; charset=UTF-8",
                        },
                      }
                    );
                    getAssigneeData();
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
              <AiOutlineDelete
                size={30}
                className="bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"
              />
            </button>
          }
          {/* {
              <button onClick={()=>navigate('/admin/esic',{state:row})}>
                <FaMoneyBill 
                  size={30}
                  className="bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"/>
              </button>
            } */}
          {
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
                <div className="absolute justify-start z-50 p-1 bg-gray-50 md:w-fit border border-gray-200 h-fit  left-0">
                  <div className="fixed">
                    <button
                      id="15"
                      onClick={(e) => handleStatus(e)}
                      className="w-full block p-1 bg-white hover:bg-gray-50"
                    >
                      Approve
                    </button>
                    <button
                      id="14"
                      onClick={(e) => handleStatus(e)}
                      className="w-full block p-1 bg-white hover:bg-gray-50"
                    >
                      Hold
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
          }
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
    {
      id: 5,
      status: "Hired",
      role: ["admin", "Recruiter"],
    },
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

  const totalData = filteredData && filteredData;
  console.log('567',totalData)
 
  const hired =
    filteredData && filteredData?.filter((x) => x?.status?.status === "hired");

    console.log('573',hired)

   
  

  const rejected =
    filteredData &&
    filteredData?.filter((x) => x?.status?.status === "rejected");
    // console.log('560',rejected)
  const applied =
    filteredData &&
    filteredData?.filter((x) => x?.status?.status === "applied");
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
                      <div className="w-full ">
                        <div className="w-full">
                          <label className="flex pr-1">
                            Specialization{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <select
                            required
                            onChange={(e) =>
                              setSubQualificationId(e.target.value)
                            }
                            value={subQualificationId}
                            className="w-full border p-2 "
                          >
                            {subQualificaiton &&
                              subQualificaiton?.map((options) => {
                                return (
                                  <option key={options?.id} value={options?.id}>
                                    {options?.name}
                                    {console.log("sub qualificaiton", options)}
                                  </option>
                                );
                              })}
                            {/* {console.log("Sub Qualificaiton",subQualificaiton)} */}
                          </select>
                        </div>
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
                            type="number"
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
                            type="number"
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
                              statusList?.map((options) => {
                                return (
                                  <option key={options?.id} value={options?.id}>
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
                    onClick={async () => {
                      try {
                        const formData = new FormData();
                        formData.append("full_name", name);
                        formData.append("email", email);
                        formData.append("phone", phone);
                        formData.append("job_id", jobId);
                        formData.append("qualification_id", qualificaitonId);
                        formData.append(
                          "subqualification_id[0]",
                          subQualificationId
                        );
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
                        console.log("APi update response", response);
                        if (response?.code === 200) {
                          setShowEditPopup(false);
                          toast.success("Jobapplication Updated Successfully");
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
      <div className="w-full">
        <div className="p-4">
          <div className="grid grid-cols-1 bg-white border-t-2 my-2 border-gray-900 shadow ">
            <DataTable
              columns={tableHeading}
              data={
                state && state === "applied"
                  ? applied
                  : state && state === "rejected"
                  ? rejected
                  : state && state === "hired"
                  ? hired
                  : state && state === "total"
                  ? totalData
                  : totalData
              }
              pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterJobApplication;
