import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import DataTable from "react-data-table-component";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye, FaInfoCircle, FaMoneyBill, FaRegEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserProfile from "../../../components/UserProfile";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import { MdRestore } from "react-icons/md";

const Datacenter = () => {
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setFilteredData("");
    }
  }, [state]);
  // console.log("state",state)

  const [projectName, setProjectName] = useState("");
  const [erfList, setErfList] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [categoryList, setCategoryList] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [departmentList, setDepartmentList] = useState("");
  const [department, setDepartment] = useState("");
  const [recruitmentType, setRecruitmentType] = useState("");
  const [jobRecruitmentData, setJobRecruitmentData] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [status, setStatus] = useState("");
  const [listForm, setListForm] = useState("");
  const [qualificationList, setQualificationList] = useState("");
  const [qualification, setQualification] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [jobId, setJobId] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const data = JSON.parse(localStorage.getItem("data"));

  const handleRestore = async (row) => {
    // Show a confirmation dialog using SweetAlert2
    Swal.fire({
      title: "Are you sure want to Restore this?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Restore!",
      cancelButtonText: "No, Cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // User confirmed the delete action
        try {
          // Make a DELETE request to the API endpoint to delete the data.
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}job/unarchive-job/${row.id}`,
            {
              headers: {
                Authorization: `Bearer ${data?.access_token}`,
                Accept: "application/json",
              },
            }
          );
  
          if (response.data?.code === 200) {
            // Data deletion was successful, you can show a success message or take any other actions.
            toast.success("Restored!", "", "success");
            // Refresh the ERF list after deleting the data.
            if (state === "erfList") {
              getErfListData(); // Refresh the ERF list data if the current state is 'erfList'
            } else {
              getAssigneeData(); // Otherwise, refresh data using getAssigneeData or the relevant function for your current view
            }
          }
        } catch (error) {
          console.error("Error deleting data:", error);
          if (error?.response?.data?.error) {
            const errors = Object.values(error?.response?.data?.error);
            errors.map((x) => toast.error(`${x}`));
          }
          if (error?.response?.data?.message) {
            toast.error(`${error?.response?.data?.message}`);
          }
        }
      }
    });
  };

  useEffect(() => {
    document.title = "CIPL || Datacenter";
  }, []);
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
    // console.log('JOb response',apiResonse)
    if (apiResonse?.code === 200) {
      // if(jsonData?.data?.roles[0]?.name==="admin")
      // {
      //   setListForm(apiResonse?.data)
      // }else{
      //   // const filterData =response?.data?.filter(x=>parseInt(x?.user_id)===parseInt(localData?.data?.id) || x?.jobassigned?.filter((y)=>parseInt(y?.user_id)===localData?.data?.id))
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

  const getErfListData = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}erf-database-archive`, 
      {
        headers: {
          Authorization: authorize,
        }
      }
    );

    if (response.data?.code === 200) {
      setLoading(false);
      setFilteredData(response.data.data);
    } else {
      toast.error("Failed to fetch data. Please try again.");
    }
  };

  useEffect(() => {
    getData();
    getDepartment();
    categoryListApi();
    getQualificationApi();

  if (state === "erfList") {
      getErfListData();
    }
  }, [state]);

  const categoryListApi = async () => {
    const getApiData = await axios.get(
      `${process.env.REACT_APP_API_URL}jobcategories`,
      {
        headers: {
          Authorization: `${authorize}`,
        },
      }
    );
    
    const apiResonse = await getApiData?.data;
    // console.log("API Response", apiResonse)
    if (apiResonse?.code === 200) {
      setCategoryList(
        apiResonse?.data.map((x) => ({ label: x?.name, value: x?.id }))
      );
    } else {
      console.log("Api Response", apiResonse);
    }
    // console.log("API Response", apiResonse.data);
  };

  console.log('134',filteredData)

  const getDepartment = async () => {
    const request = await fetch(`${process.env.REACT_APP_API_URL}department`, {
      method: "GET",
      headers: {
        Authorization: `${authorize}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonResponse = await request?.json();
    // console.log("department",jsonResponse )

    if (jsonResponse) {
      setDepartmentList(
        jsonResponse?.data?.map((x) => ({ value: x?.id, label: x?.name }))
      );
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
      setQualificationList(
        jsonResponse?.data?.map((x) => ({ label: x?.name, value: x?.id }))
      );
    }
  };
  const getAssigneeData = async () => {
    // console.log("Jobd ID",jobId)
    setLoading(true);
    const formdata = new FormData();
    formdata.append("pid", state && state === "pid" ? jobId : "");
    formdata.append(
      "recruitment_type",
      state && state === "type" ? recruitmentType : ""
    );
    formdata.append(
      "location",
      state && state === "location" ? locationSearch : ""
    );
    formdata.append(
      "project_name",
      state && state === "projectName" ? projectName : ""
    );
    formdata.append(
      "project_manager",
      state && state === "projectManager" ? projectManager : ""
    );
    formdata.append(
      "department_id",
      state && state === "department" ? department : ""
    );
    formdata.append(
      "category_id",
      state && state === "category" ? category : ""
    );
    formdata.append(
      "qualification_id",
      state && state === "qualification" ? qualification : ""
    );
    formdata.append(
      "min_budgeted",
      state && state === "minimumBudget" ? minBudget : ""
    );
    formdata.append(
      "max_budgeted",
      state && state === "maximumBudget" ? maxBudget : ""
    );
    formdata.append(
      "start_date",
      state && state === "startDate" ? startDate : ""
    );
    formdata.append("end_date", state && state === "endDate" ? targetDate : "");
    formdata.append("status", state && state === "leadStatus" ? status : "");
    formdata.append("status", state && state === "erfList" ? status : "");
    const request = await axios.postForm(
      `${process.env.REACT_APP_API_URL}leaddatasearch`,
      formdata,
      {
        headers: {
          Authorization: `${authorize}`,
        },
      }
    );
    // console.log("Request",request)
    const response = request.data;
    // console.log("response",response)
    if (response?.code === 200) {
      setLoading(false);
      setFilteredData(response?.data);
    }
  };

  const getTableHeading = () => {
    if (state === "erfList") {
      // Return only the required columns for 'erfList' state
      return [
        // Add only the columns you want to display when 'erfList' is active
    {
      name: "S. No.",
      selector: (row, index) => index + 1,
      sortable: false,
    },  
    {
      name: <div className="text-sm font-medium">PID</div>,
      selector: (row) => <p title={row?.pid}>{row?.pid}</p>,
      sortable: false,     
    },
    {
      name: <div className="text-sm font-medium">Project Name</div>,
      selector: (row) => row.project_name,
      sortable: false,      
    },
    {
      name: <div className="text-sm font-medium">Type</div>,
      selector: (row) => (
        <div className=" capitalize">
          {row.recruitment_type === "inhouse" ? "Inhouse" : "Project"}
        </div>
      ),
      sortable: false,
    },
    {
      name: <div className="text-sm font-medium">Billable</div>,
      selector: (row) => <div className=" capitalize">{row.billable_type}</div>,
      sortable: false,
    },
    {
      name: <div className="text-sm font-medium">Department</div>,
      selector: (row) => (
        <p title={row?.department?.name} className=" capitalize">
          {row.department?.name}
        </p>
      ),
      sortable: false,
    },
    {
      name: <div className="text-sm font-medium">Recruiter Name</div>,
      selector: (row) => (
        <p title={row?.jobassigned[0]?.belongsassigned?.name} className=" capitalize">
          {row?.jobassigned[0]?.belongsassigned?.name}
        </p>
      ),
      sortable: false,
    },
    {
      name:<div className="text-sm font-medium">Action</div>,
      cell: (row) => (           
        <button
        onClick={() =>handleRestore (row)                                
      } >                          
     
        <div className="relative text-center  rounded-sm">
          <div className="group no-underline cursor-pointer relative inline-block text-center">
            <MdRestore
              size={32}
              className="hover:bg-white p-1 mr-1 text-xl"
            />
            <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
              Restore
            </div>
          </div>
        </div>
      </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
} else {
  // Return the full column configuration for other states
  return [
    // original tableHeading array
    {
      name: "PID",
      selector: (row) => row?.job?.pid,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row?.job?.recruitment_type,
      sortable: true,
    },
    {
      name: "Project Name",
      selector: (row) => row?.job?.project_name,
      sortable: true,
    },
    {
      name: "Project Manager",
      selector: (row) => row?.project_manager,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => <div className=" capitalize">{row?.location}</div>,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row?.job?.department?.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row?.category?.name,
      sortable: true,
    },
    {
      name: "Skills",
      selector: (row) => `${row?.skills?.map((x) => x?.skill?.name)}`,
      sortable: true,
    },
    {
      name: "Qualification",
      selector: (row) => (
        <>
          {row?.qualification?.length > 0
            ? row?.qualification
                ?.map((x) => x?.qualificationdetails?.name)
                ?.join(", ")
            : row?.qualification?.name}
        </>
      ),
      sortable: true,
    },
    {
      name: "Specialization",
      selector: (row) =>
        `${row?.subqualifications?.map((x) => x?.subqualification?.name)}`,
      sortable: true,
    },
    {
      name: "No. of Positions",
      selector: (row) => row?.total_positions,
      sortable: true,
    },
    {
      name: "Budget",
      selector: (row) => row?.position_budgeted,
      sortable: true,
    },
    {
      name: "Requisition Date",
      // selector: (row) => row?.start_date,
      selector: (row) => moment(row?.start_date).utc().format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "Target Date",
      // selector: (row) => row?.end_date,
      selector: (row) => moment(row?.end_date).utc().format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "Lead Status",
      selector: (row) => (row?.job?.erfstatus === 2 ? "Close" : "Open"),
      sortable: true,
    },
  ];
}
};
      const tableHeading = getTableHeading();

  const header = [
    { label: "Id", key: "id" },
    { label: "PID", key: "job.pid" },
    { label: "Type", key: "job.recruitment_type" },
    { label: "Project Name", key: "job.project_name" },
    { label: "Project Manager", key: "project_manager" },
    { label: "Location", key: "location" },
    { label: "Department", key: "job.department.name" },
    { label: "Category", key: "category.name" },
    { label: "Skills", key: `skills.name` },
    { label: "Qualification", key: "qualification.name" },
    { label: "Specialization", key: "subqualifications.name" },
    { label: "No. Of Position", key: "total_positions" },
    { label: "Budget", key: "position_budgeted" },
    { label: "Requisition date", key: "job.start_date" },
    { label: "Target Date", key: "job.end_date" },
    { label: "Lead Status", key: "job.status" },
  ];

  const csvDownload =
    filteredData &&
    filteredData?.map((x) => ({
      job: {
        pid: x?.job?.pid,
        recruitment_type: x?.job?.recruitment_type,
        project_name: x?.job?.project_name,
        start_date: x?.start_date,
        end_date: x?.end_date,
        department: {
          name: x?.job?.department?.name,
        },
        status: x?.erfstatus === 0 ? "Close" : "Open",
      },
      project_manager: x?.project_manager,
      location: x?.location,
      category: {
        name: x?.category?.name,
      },
      skills: {
        name: x?.skills?.map((y) => y?.skill?.name),
      },
      qualification: {
        name: x?.qualification?.name,
      },
      subqualifications: {
        name: x?.subqualifications?.map((t) => t?.subqualification?.name),
      },
      total_positions: x?.total_positions,
      position_budgeted: x?.position_budgeted,
    }));

  return (
    <div>
      <ToastContainer />
      
      {/* {state === "erfList" ? (
        <ErfListArchive /> // Render ErfListArchive component when state is "erfList"
      ) : (
          <div>            
          </div>
          )} */}

      <div className="w-full">
        <div className="p-4">
          <div className="grid bg-white w-full border-t-2 my-2 border-gray-900  shadow grid-cols-12">
            {state && state === "pid" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">PID</h2>
                <Select
                  isClearable
                  options={
                    listForm &&
                    listForm?.map((options) => ({
                      value: options?.pid,
                      label: options?.pid,
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
            ) : null}
            {state && state === "type" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Recruitment Type</h2>
                <select
                  onChange={(e) => setRecruitmentType(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                >
                  <option>Choose Option</option>
                  <option>Inhouse</option>
                  <option value={"onsite"}>Project</option>
                </select>
              </div>
            ) : null}
            
            {state && state === "projectName" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Project Name</h2>
                <input
                  type="text"
                  onChange={(e) => setProjectName(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
            ) : null}
            {state && state === "projectManager" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Project Manager</h2>
                <input
                  type="text"
                  onChange={(e) => setProjectManager(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
            ) : null}
            {state && state === "location" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Location</h2>
                <input
                  type="text"
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
            ) : null}
            {state && state === "department" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Department</h2>
                <Select
                  isClearable
                  options={departmentList && departmentList}
                  onChange={(e) => setDepartment(e?.value ? e?.value : "")}
                  className="w-full"
                />
              </div>
            ) : null}
            {state && state === "category" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Category</h2>
                <Select
                  isClearable
                  options={categoryList && categoryList}
                  onChange={(e) => setCategory(e?.value ? e?.value : "")}
                  className="w-full"
                />
              </div>
            ) : null}
            {state && state === "qualification" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Qualification</h2>
                <Select
                  isClearable
                  options={qualificationList && qualificationList}
                  onChange={(e) => setQualification(e?.value ? e?.value : "")}
                  className="w-full"
                />
              </div>
            ) : null}
            {state && state === "minimumBudget" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Minimum Budget</h2>
                <input
                  type="number"
                  onChange={(e) => setMinBudget(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
            ) : null}
            {state && state === "maximumBudget" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Maximum Budget</h2>
                <input
                  type="number"
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
            ) : null}
            {state && state === "startDate" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Req. Date</h2>
                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
            ) : null}
            {state && state === "endDate" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Target Date</h2>
                <input
                  type="date"
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
            ) : null}
            {state && state === "recruiter" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Recruiter</h2>
                <input
                  type="text"
                  onChange={(e) => setRecruiterName(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
            ) : null}
            {state && state === "leadStatus" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Lead Status</h2>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                >
                  <option value="">Choose Option</option>
                  <option value="1">Open</option>
                  <option value="2">Close</option>
                </select>
              </div>
            ) : null}
            {state && state == "erfList" ? (
              <div className="p-4 col-span-3">
                <h2 className="my-1 text-lg">Erf List</h2>           

              </div>

            ) : null}
            {state && state !== "erfList" && (
            <div className="p-4 col-span-1 flex items-end pb-5">
              <button
                onClick={() => getAssigneeData()}
                className="px-8 py-2 hover:bg-gray-900 cursor-pointer bg-primary rounded-sm text-white"
              >
                Search
              </button>
            </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 bg-white border-t-2 my-2 border-gray-900 shadow ">
            <div className="p-4 flex justify-end items-center">
              {filteredData.length > 0 ? (
                <CSVLink
                  headers={header}
                  data={csvDownload && csvDownload}
                  filename="data"
                  className="px-8 py-2 hover:bg-gray-900 cursor-pointer bg-primary rounded-sm text-white"
                >
                  Export
                </CSVLink>
              ) : (
                <button className="px-8 py-2 hover:bg-gray-900 cursor-pointer bg-primary rounded-sm text-white">
                  No Data Available
                </button>
              )}
            </div>
            
            <DataTable columns={tableHeading} data={filteredData} pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datacenter;
