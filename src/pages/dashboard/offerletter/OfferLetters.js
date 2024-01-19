import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaRegEdit } from "react-icons/fa";
import Select from "react-select";
import ApiErrorPopUp from "../../../components/ApiErrorPopUp";
import { json, useNavigate } from "react-router-dom";
import UserProfile from "../../../components/UserProfile";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";
import QuestionEditor from "../../../components/QuestionEditor";
import { SlEnvolopeLetter } from "react-icons/sl";

import { offerletterActions } from "../../../Redux/dashboard/offerletter/offerletterSlice.js";
import { useDispatch } from "react-redux";

const OfferLetters = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [jobRecruitmentData, setJobRecruitmentData] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [listForm, setListForm] = useState("");
  const [showEditPopUp, setShowEditPopup] = useState("");
  const [qualification, setQualification] = useState("");
  const [subQualificaiton, setSubQualification] = useState("");
  const [teamList, setTeamList] = useState("");
  const [qualificaitonId, setQualificationId] = useState("");
  const [showApiErrorPopUp, setShowApiErrorPopUp] = useState(false);
  const [apiError, setApiError] = useState("");
  const [hodSearch, setHodSearch] = useState("");
  const [jobId, setJobId] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [profileData, setProfileData] = useState("");
  const [data, setData] = useState("");
  const [showModalId, setShowModalId] = useState("");
  const [template_id, setTemplate_id] = useState(null);
  const [idoffer_letter, setIdoffer_letter] = useState("");

  const dispatch = useDispatch();

  console.log(template_id);

  const [joiningDate, setJoiningDate] = useState("");
  const [dataOfferletter, setDataOfferletter] = useState([]);

  useEffect(() => {
    localStorage.setItem("joining_date", joiningDate);
    dispatch(offerletterActions.AddofferletterDate(joiningDate));
  }, [joiningDate]);

  useEffect(() => {
    document.title = "CIPLCRM | Offer letter";

    axios
      .get(
        `${process.env.REACT_APP_API_URL}offerletter`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authorize}`,
          },
        }
      )
      .then((res) => {
        setDataOfferletter(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const options = [];

  console.log(OfferLetters);

  dataOfferletter?.map((ele) => {
    options.push({
      value: ele?.id,
      label: ele?.templatename,
    });
  });

  console.log(data, "Data");

  const navigate = useNavigate();
  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const getTeamApi = async () => {
    const request = await fetch(`${process.env.REACT_APP_API_URL}team`, {
      method: "GET",
      headers: {
        Authorization: `${authorize}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonResponse = await request?.json();
    console.log(
      "team",
      jsonResponse?.data?.filter((x) =>
        x?.roles[0]?.name?.includes("Recruiter")
      )
    );

    if (jsonResponse) {
      setTeamList(
        jsonResponse?.data?.filter((x) =>
          x?.roles[0]?.name?.includes("Recruiter")
        )
      );
    }
  };

  const getData = async () => {
    const getApiData = await axios.get(`${process.env.REACT_APP_API_URL}erf`, {
      headers: {
        Authorization: `${authorize}`,
      },
    });
    const apiResonse = await getApiData?.data;
    // console.log('api response',apiResonse)
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
      // const customFilter = apiResonse?.data?.filter((x)=>x?.erfstatus!==2)
      setListForm(apiResonse?.data);
    }
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
  };

  useEffect(() => {
    getData();
    getTeamApi();
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

  useEffect(() => {
    dispatch(offerletterActions.Addofferletter(filteredData));
    console.log("200", filteredData);
  }, [filteredData]);
  const getAssigneeData = async () => {
    // console.log("Jobd ID",jobId)
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
      // console.log("Request",request)
      const response = request.data;
      console.log("response", response);
      if (response) {
        setFilteredData(
          response?.data?.filter(
            (x) =>
              x?.status?.id === 17 || x?.status?.id == 5 || x?.status?.id == 6
          )
        );
      }
    }
    if (jobId === "" || null || undefined) {
      toast.error("Please Select PID");
    }
  };

  //show
  const handleShow = () => {
    navigate(`SendOfferLetter/${template_id}`);
  };
  const handleSubmit = async (e) => {
    // e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("template_id", `${template_id}`);
      formData.append("joining_date", joiningDate);
      formData.append("send_email", "yes");
      const request = await axios.postForm(
        `${process.env.REACT_APP_API_URL}create-offer/${showModalId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      const response = await request?.data;
      if (response?.code === 200) {
        console.log(response.message);
        toast.success(`${response?.message}`);
        setShowEditPopup(false);
        getAssigneeData();
        //   setShowAddModal(false)
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);

      // if (error?.response?.data?.error) {
      //   const errors = Object.values(error?.response?.data?.error);
      //   console.log("Errors", errors);
      //   errors.map((x) => toast.error(`${x}`));
      // }
      // if (error?.response?.data?.message) {
      //   if (error?.response?.data?.error) {
      //     const errors = Object.values(error?.response?.data?.error);
      //     console.log("Errors", errors);
      //     errors.map((x) => toast.error(`${x}`));
      //   }
      //   if (error?.response?.message) {
      //   }
      // }
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
      name: "Offer_letter",
      selector: (row, index) => (
        <div className="">
          {jsonData &&
          jsonData?.data?.userPermissions?.find((a) =>
            a.includes("add_offerletter")
          ) ? (
            <button
              onClick={() => {
                setShowEditPopup(true);
                setShowModalId(row?.id);
                localStorage.setItem("get_id", index)
              }}
            >
              <SlEnvolopeLetter
                className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer"
                fill="white"
                size={30}
              />
            </button>
          ) : null}
        </div>
      ),
      sortable: false,
      allowOverflow: true,
    },
  ];

  // console.log("Filered Data",listForm)
  return (
    <div>
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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 h-44 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none offer_letter_t">
                <>
                  {/* <div className="grid px-1 shaodw bg-white rounded m-2 grid-cols-1">
                    <div className="p-2">
                      <button
                        className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
                        onClick={() => setShowEditPopup(false)}
                      >
                        <span className=" text-red-500 h-6 w-6 text-xl block ">
                          X
                        </span>
                      </button>
                      <h1 className=" text-2xl text-solid">Offer Letter</h1>
                      <QuestionEditor setConvertedContent={setData} />
                    </div>
                  </div> */}

                  <div className="m-4">
                    <button
                      className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold"
                      onClick={handleClosePopup}
                    >
                      <span className="text-red-500 h-6 w-6 text-xl block">
                        X
                      </span>
                    </button>
                    <p className="text-lg">Select Template</p>
                    <Select
                      options={options}
                      placeholder="Select Candidate..."
                      className="mt-3"
                      onChange={(val) => setTemplate_id(val.value)}
                    />
                  </div>
                </>

                <div className="flex px-5 py-2 items-center justify-between">
                  {/* <Select
                                                options={teamList && teamList?.map((x) => ({ label: x?.name, value: x?.id }))}
                                                onChange={(e) => setSelectedTeamMember(e.value)}
                                            /> */}
                  <div>
                    <label
                      className={
                        "after:content-[" * "] after:ml-0.5 after:text-red-500"
                      }
                    >
                      Joining Date
                    </label>
                    <input
                      required
                      type="date"
                      className="border border-gray-200 px-2 block"
                      onChange={(e) => setJoiningDate(e.target.value)}
                    />
                  </div>
                  <div className="pl-3 h-fit mt-5">
                    {/* <button
                      type="button"
                      onClick={handleSubmit}
                      className=" bg-gray-700 text-white  h-10 w-14  hover:bg-black hover:text-white rounded"
                    >
                      Send
                    </button> */}
                    <button
                      type="button"
                      onClick={handleShow}
                      className=" ml-2 bg-gray-700 text-white  h-10 w-14  hover:bg-black hover:text-white rounded"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="w-full">
        <div className="p-4">
          <div className="grid bg-white w-full border-t-2 my-2 border-gray-900  shadow grid-cols-12">
            <div className="p-4 col-span-4">
              <h2
                className={`my-1 text-lg after:content-['*'] after:text-red-500 after:pl-1`}
              >
                PID
              </h2>
              <Select
                isClearable
                options={
                  listForm &&
                  listForm?.map((options) => ({
                    value: options?.id,
                    label: options?.pid,
                    jobrecruitmentData: options?.jobrecruitment,
                  }))
                }
                onChange={(e) => {
                  setJobId(e?.value ? e?.value : "");
                  setJobRecruitmentData(
                    e?.jobrecruitmentData ? e?.jobrecruitmentData : ""
                  );
                }}
                className="w-full "
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
          <div className="grid grid-cols-1 bg-white border-t-2 my-2 border-gray-900 shadow ">
            <DataTable columns={tableHeading} data={filteredData} pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetters;
