import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

const ReplacementForm = ({
  formToggler,
  checkForm,
  onSiteConfirmation,
  setOnSiteConfirmation,
}) => {
  // form data
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [pid, setPid] = useState("");
  const [reqDate, setReqDate] = useState("");
  const [certification, setCertification] = useState("");
  const [certificationList, setCertificationList] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [otherSkills, setOtherSkills] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [designation, setDesignation] = useState("");
  const [level, setLevel] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [reportingTeam, setReportingTeam] = useState("");
  const [positions, setPositions] = useState("");
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState(0);
  const [positionRequired, setPositionRequired] = useState(1);
  const [graduation, setGraduation] = useState("");
  const [additionalQualification, setAdditionalQualification] = useState("");
  const [file, setFile] = useState();
  const [additionalQualificationDetails, setAdditionalQualificationDetails] =
    useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [relevantExperience, setRelevantExperience] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [billabelType, setBillableType] = useState("");
  const [keyResponsibility, setKeyResponsibility] = useState("");
  const [essentialSkills, setEssentialSkills] = useState("");
  const [prerequisites, setPrerequisites] = useState("");

  // custom
  const [categoryList, setCategoryList] = useState("");
  const [departmentList, setDepartmentList] = useState("");
  const [qualificationList, setQualificationList] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeResgDate, setEmployeeResgDate] = useState("");
  const [employeeLastDate, setEmployeeLastDate] = useState("");
  const [subQualificationList, setSubQualificationList] = useState("");
  const navigate = useNavigate();
  const [skillsList, setSkillsList] = useState("");
  const data = localStorage.getItem("data");
  const jsonData = JSON.parse(data);
  const location = useLocation();
  const accessToken = jsonData && jsonData?.access_token;
  // console.log("Graduation",graduation)
  const authorize = "Bearer" + " " + accessToken;
  const categoriesListApi = async () => {
    const requestCategory = await axios.get(
      `${process.env.REACT_APP_API_URL}jobcategories`,
      {
        headers: {
          Authorization: `${authorize}`,
        },
      }
    );
    const categoryResponse = await requestCategory?.data;
    // console.log('Categories', categoryResponse)
    if (categoryResponse?.data.length > 0) {
      setCategoryList(categoryResponse);
    }
  };

  const certificaitonListApi = async () => {
    const requestCertification = await axios.get(
      `${process.env.REACT_APP_API_URL}certification`,
      {
        headers: {
          Authorization: `${authorize}`,
        },
      }
    );
    const certificationResponse = await requestCertification?.data;
    // console.log('Categories', categoryResponse)
    if (certificationResponse?.data.length > 0) {
      setCertificationList(certificationResponse);
    }
  };

  const getSubQualificationList = async () => {
    if (graduation.length > 0) {
      const getSubQualification = await fetch(
        `${process.env.REACT_APP_API_URL}subqualification/search`,
        {
          method: "POST",
          headers: {
            Authorization: `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            qualification_id: `${graduation}`,
          }),
        }
      );
      const jsonResponse = await getSubQualification?.json();
      // console.log("Sub Qualification",jsonResponse )

      if (jsonResponse) {
        setSubQualificationList(jsonResponse?.data);
      }
    }
  };

  useEffect(() => {
    getSubQualificationList();
  }, [graduation]);

  useEffect(() => {
    categoriesListApi();
    departmentListApi();
    getQualificationApi();
    certificaitonListApi();
  }, [location]);

  const departmentListApi = async () => {
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
      setDepartmentList(jsonResponse?.data);
    }
  };

  const skillsListApi = async () => {
    const requestSkills = await axios.get(
      `${process.env.REACT_APP_API_URL}skill/search/${
        category ? category : "0"
      }`,
      {
        headers: {
          Authorization: `${authorize}`,
        },
      }
    );
    const skillsResponse = await requestSkills.data;

    if (skillsResponse?.data.length > 0) {
      setSkillsList(skillsResponse);
    }
  };

  useEffect(() => {
    skillsListApi();
  }, [category]);

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
      setQualificationList(jsonResponse?.data);
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const formdata = new FormData();

  formdata.append("job_description", `${jobDescription}`);
  formdata.append("job_requirement", `${positionRequired}`);
  formdata.append("total_positions", `${positions}`);
  formdata.append("pid", `${pid}`);
  formdata.append("location", `${address}`);
  formdata.append("category_id", `${category}`);
  formdata.append("start_date", `${reqDate}`);
  formdata.append("end_date", `${targetDate}`);
  formdata.append("department_id", `${department}`);
  formdata.append("degination", `${designation}`);
  formdata.append("level", `${level}`);
  formdata.append("project_manager", `${projectManager}`);
  formdata.append("project_manager", `${projectManager}`);
  formdata.append("reporting_team", `${reportingTeam}`);
  formdata.append("project_name", `${projectName}`);
  formdata.append("position_budgeted", `${budget}`);
  formdata.append("work_experience", `${workExperience}`);
  formdata.append("relevent_exp", `${relevantExperience}`);
  formdata.append("responsibility", `${keyResponsibility}`);
  formdata.append("prerequisite", `${prerequisites}`);
  formdata.append("qualification_id", `${graduation}`);
  formdata.append("billable_type", `${billabelType}`);
  for (let i = 0; i < additionalQualification.length; i++) {
    formdata.append(
      `additionalqualification[${i}]`,
      `${additionalQualification[i]}`
    );
  }
  formdata.append(`anycertification_id`, `${certification}`);
  formdata.append("recruitment_type", `${checkForm}`);
  formdata.append("recruitment", `${formToggler === "Replacement" ? 1 : 0}`);
  formdata.append("approved", `${onSiteConfirmation}`);
  formdata.append("scopeofwork", file);
  for (let i = 0; i < skill.length; i++) {
    formdata.append(`skill_id[${i}]`, `${skill[i]}`);
  }
  formdata.append("billable_type", `${billabelType}`);
  formdata.append("employee[0][emp_name]", `${employeeName}`);
  formdata.append("employee[0][emp_code]", `${employeeCode}`);
  formdata.append("employee[0][last_working_date]", `${employeeLastDate}`);
  formdata.append("employee[0][resign_date]", `${employeeResgDate}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData", formdata);

    const sendForm = await axios.postForm(
      `${process.env.REACT_APP_API_URL}jobs/store`,
      formdata,
      {
        headers: {
          Authorization: `${authorize}`,
          "Content-Type": "multipart/form-data",
          Accept: "js",
        },
      }
    );
    const responseForm = await sendForm.data;
    console.log("Form Submission", responseForm);
    navigate("/admin/erflist");
  };

  const listInput = [
    {
      type: "text",
      id: 1,
      value: "",
      label: "Employee Name",
    },
    {
      type: "text",
      id: 1,
      value: "",
      label: "Employee Code",
    },
    {
      type: "date",
      id: 1,
      value: "",
      label: "Resignation Date",
    },
    {
      type: "date",
      id: 1,
      value: "",
      label: "Last Working Date",
    },
  ];

  const [inputDetails, setInputDetails] = useState(listInput);

  // console.log(inputDetails)

  const levelList = ["L0", "L1", "L2", "L3", "L4", "L5"];

  const handleChange = (e, index) => {
    let data = [...inputDetails];
    data[index][e.target.name] = e.targe.value;
    setInputDetails(data);
  };

  const addField = (e) => {
    e.preventDefault();
    let newField = listInput;
    setInputDetails([...inputDetails, newField]);
  };

  const removeField = (index) => {
    let data = [...inputDetails];
    data.splice(index, 1);
    setInputDetails(data);
  };

  return (
    <div>
      <div className="md:p-4 p-2">
        <form onSubmit={(e) => handleSubmit(e)} method="multipart/form-data">
          <div className="grid md:grid-cols-12 items-center">
            {/* {
            inputDetails && inputDetails?.map((form,index)=>(
            <div key={index} className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left py-2">
                <label className="text-md text-left font-semibold">
                  {form?.label}
                  {console.log("Form",form)}
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                type={form?.type}
                className="border py-1 px-2 w-full rounded-md"
                required
              />
            </div>
            ))
        } */}
            <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left py-2">
                <label className="text-md text-left font-semibold">
                  Employee Name
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                type="text"
                className="border py-[9px] px-2 w-full rounded-md"
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />
            </div>
            <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left py-2">
                <label className="text-md text-left font-semibold">
                  Employee Code
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                type="text"
                className="border py-[9px] w-full px-2 rounded-md"
                required
                onChange={(e) => setEmployeeCode(e.target.value)}
              />
            </div>
            <div className=" md:col-span-3 md:px-2 md:py-0 py-1">
              <div className=" text-left md:py-2">
                <label className="text-md text-left font-semibold ">
                  Resig. Date
                </label>
              </div>
              <input
                type="date"
                className="border px-2 w-full py-[9px] rounded-md"
                required
                onChange={(e) => setEmployeeResgDate(e.target.value)}
              />
            </div>
            <div className=" md:col-span-3 text-left md:px-2 md:py-0 py-1">
              <div className="md:py-2">
                <label className="text-md text-left font-semibold">
                  Last Working Date
                </label>
              </div>
              <input
                type="date"
                className="w-full py-[9px] px-2 border rounded-md"
                required
                onChange={(e) => setEmployeeLastDate(e.target.value)}
              />
            </div>
            {/* <div className=" md:col-span-1 text-left md:px-2 md:py-0 py-1">
              <button onClick={addField} className="p-2 bg-green-600 hover:bg-green-400 ">
                <span className="text-white text-lg" >Add</span>
              </button>
            </div> */}
          </div>
          <div className="grid md:grid-cols-12">
            <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left py-2">
                <label className="text-md text-left font-semibold">
                  Department
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <select
                type="text"
                onChange={(e) => setDepartment(e.target.value)}
                className="border px-2 py-[9px] w-full rounded-md"
                required
              >
                <option>Choose Department</option>
                {departmentList &&
                  departmentList?.map((department) => (
                    <option key={department?.id} value={department?.id}>
                      {department?.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left py-2">
                <label className="text-md text-left font-semibold">PID</label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                type="text"
                onChange={(e) => setPid(e.target.value)}
                className="border px-2 py-[9px] w-full rounded-md"
                required
              />
            </div>
            <div className=" md:col-span-3 md:px-2 md:py-0 py-1">
              <div className=" text-left md:py-2">
                <label className="text-md text-left font-semibold ">
                  Requisition Date
                </label>
                {/* <span className='text-red-500 text-md font-semibold px-1'>*</span> */}
              </div>
              <input
                type="date"
                onChange={(e) => setReqDate(e.target.value)}
                className="border px-2 w-full py-[9px] rounded-md"
              />
            </div>
            <div className=" md:col-span-3 text-left md:px-2 md:py-0 py-1">
              <div className="md:py-2">
                <label className="text-md text-left font-semibold">
                  Target Date
                </label>
                {/* <span className='text-red-500 text-md font-semibold px-1'>*</span> */}
              </div>
              <input
                type="date"
                className="w-full py-[9px] px-2 border rounded-md"
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12">
            <div className=" md:col-span-3 text-left lg:pr-2 md:py-0 md:pr-2  py-1">
              <div className="md:py-2">
                <label className="text-md text-left font-semibold">
                  Project Name
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                required
                type="text"
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full py-[9px] px-2 border rounded-md"
              />
            </div>
            {/* <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">
                  Skills
                </label>
              <span className='text-red-500 text-md font-semibold px-1'>*</span> 
              </div>
              <select
                type="text"
                className="border px-2 py-1 w-full rounded-md"
                onChange={(e) => setSkill(e.target.value)}
              >
                <option>Choose Category</option>
                {skillsList?.data &&
                  skillsList?.data.map((skills) => {
                    return (
                      <option key={skills?.id} value={skills?.id}>
                        {skills?.name}
                      </option>
                    );
                  })}
                <option value="Other">Other</option>
              </select>
            </div>
            {skill === "Other" ? (
              <div className=" md:col-span-3 md:px-2 md:py-0 py-1 ">
                <div className=" text-left md:py-2">
                  <label className="text-md text-left font-semibold ">
                    Other Skiils
                  </label>
                  <span className='text-red-500 text-md font-semibold px-1'>*</span>
                </div>
                <input
                  type="text"
                  onChange={(e) => setOtherSkills(e.target.value)}
                  className="border px-2 w-full py-1 rounded-md"
                  required={skill === "Other" ? true : false}
                />
              </div>
            ) : null} */}

            <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">
                  Location
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                required
                type="text"
                className="border py-[9px] w-full rounded-md px-2"
                onChange={(e) => setAddress(e.target.value)}
              />

              {/* <option>Choose State</option>
                {addressList &&
                  addressList?.map((stateName) => {
                    return (
                      <option key={stateName?.id} value={stateName?.id}>
                        {stateName?.location}
                      </option>
                    );
                  })}
              </select> */}
            </div>
            <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">
                  Project Address
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                required
                type="text"
                className="border py-[9px] w-full rounded-md px-2"
                // onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className=" md:col-span-3 text-left md:py-0 py-1 md:px-2">
              <div className="md:py-2">
                <label className="text-md text-left font-semibold">
                  Designation
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                required
                type="text"
                className="w-full py-[9px] px-2 border rounded-md"
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
            <div className=" md:col-span-3 text-left md:px-2 md:py-0 py-1">
              <div className="md:py-2">
                <label className="text-md text-left font-semibold">Level</label>
                <span className="text-red-500 text-md font-semibold px-2">
                  *
                </span>
              </div>
              <select
                required
                type="text"
                onChange={(e) => setLevel(e.target.value)}
                className="w-full py-[9px] px-2 border rounded-md"
              >
                {levelList.map((list, index) => (
                  <option value={list} key={index}>
                    {list}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-12">
            {/* <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">Fresh</label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                required
                type="text"
                onChange={(e) => setFresh(e.target.value)}
                className="border py-1 w-full px-2 rounded-md"
              />
            </div> */}

            <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">
                  Job Category
                </label>
                {/* <span className='text-red-500 text-md font-semibold px-1'>*</span> */}
              </div>
              <select
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                className="border px-2 py-[9px] w-full rounded-md"
              >
                <option>Choose Category</option>
                {categoryList?.data &&
                  categoryList?.data?.map((options) => {
                    return (
                      <option key={options?.id} value={options?.id}>
                        {options?.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">
                  Skills
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <Select
                options={skillsList?.data?.map((skills) => ({
                  value: skills?.id,
                  label: skills?.name,
                }))}
                onChange={(e) => setSkill(e.map((x) => x.value))}
                isMulti={true}
                isClearable
              />
              {/* <Select components={makeAnimated} isMulti options={skillsList&&skillsList?.map((skills)=>(skills?.name,skills?.id))} /> */}
            </div>
            {skill === "Other" ? (
              <div className=" md:col-span-3 md:px-2 md:py-0 py-1 ">
                <div className=" text-left md:py-2">
                  <label className="text-md text-left font-semibold ">
                    Other Skiils
                  </label>
                  <span className="text-red-500 text-md font-semibold px-1">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  onChange={(e) => setOtherSkills(e.target.value)}
                  className="border px-2 w-full py-[9px] rounded-md"
                  required={skill === "Other" ? true : false}
                />
              </div>
            ) : null}
            <div className=" md:col-span-3 md:px-2 md:py-0 py-1">
              <div className=" text-left md:py-2">
                <label className="text-md text-left font-semibold ">
                  Hiring Budget
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                type="number"
                min="0"
                onPaste={preventPasteNegative}
                onKeyDown={preventMinus}
                onChange={(e) => setBudget(e.target.value)}
                className="border px-2 w-full py-[9px] rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-12">
            <div className=" md:col-span-3 text-left md:py-0 py-1 md:pr-2">
              <div className="md:py-2">
                <label className="text-md text-left font-semibold">
                  No. of Positions
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                required
                type="number"
                min="0"
                onPaste={preventPasteNegative}
                onKeyDown={preventMinus}
                className="w-full py-[9px] px-2 border rounded-md"
                onChange={(e) => setPositions(e.target.value)}
              />
            </div>
            <div className=" md:col-span-3 md:px-2 md:py-0 py-1">
              <div className=" text-left md:py-2 ">
                <label className="text-md text-left font-semibold ">
                  Reporting to (Team Lead)
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                required
                type="text"
                onChange={(e) => setReportingTeam(e.target.value)}
                className="border px-2 w-full py-[9px] rounded-md"
              />
            </div>
            <div className=" md:col-span-3 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">HOD</label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                required
                type="text"
                className="border py-[9px] px-2 w-full rounded-md"
                onChange={(e) => setProjectManager(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-12 items-center">
            <div className=" md:col-span-12 text-left pr-2 md:py-0 py-1">
              <div className=" text-left md:py-2">
                <label className="text-md text-left font-semibold pb-2">
                  Job Description
                </label>
                <textarea
                  required
                  minLength={100}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="border text-sm h-20 font-medium mt-2 px-2 mr-2 py-[9px] w-full rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="my-2 mt-4">
            <div className="flex rounded bg-gray-200 p-2">
              <h2 className="font-semibold text-2xl text-left">
                Education Details:
              </h2>
            </div>
            <div className="grid md:grid-cols-12">
              <div className=" md:col-span-6 md:px-2 md:py-0 py-1">
                <div className=" text-left md:py-2">
                  <label className="text-md text-left font-semibold ">
                    Highest Qualification
                  </label>
                  <span className="text-red-500 text-md font-semibold px-1">
                    *
                  </span>
                </div>
                <select
                  type="text"
                  onChange={(e) => setGraduation(e.target.value)}
                  className="border px-2 w-full py-[9px] rounded-md"
                  required
                >
                  <option>Choose Qualification</option>
                  {qualificationList &&
                    qualificationList?.map((qualification) => (
                      <option key={qualification?.id} value={qualification?.id}>
                        {qualification?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className=" md:col-span-6 md:pr-2 md:py-0 py-1">
                <div className="text-left md:py-2">
                  <label className="text-md text-left font-semibold">
                    Specialization
                  </label>
                  <span className="text-red-500 text-md font-semibold px-1">
                    *
                  </span>
                </div>
                <Select
                  options={
                    subQualificationList &&
                    subQualificationList?.map((subQualification) => ({
                      value: subQualification?.id,
                      label: subQualification?.name,
                    }))
                  }
                  onChange={(e) =>
                    setAdditionalQualification(e.map((x) => x.value))
                  }
                  isMulti={true}
                  isClearable
                />
                {/* <select
                  required
                  onChange={(e) => setAdditionalQualification(e.target.value)}
                  className="border text-sm font-medium px-2 py-1 w-full rounded-md"
                >
                  <option>Choose Qualification</option>
                  {
                    subQualificationList && subQualificationList?.map((subqualification)=>(
                      <option key={subqualification?.id} value={subqualification?.id}>{subqualification?.name}</option>
                    ))
                  }
                </select> */}
                {/* <input
                  type="text"
                  onChange={(e) => setAdditionalQualification(e.target.value)}
                  className="border px-2 w-full py-1 rounded-md"
                  required
                /> */}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-12">
            <div className=" md:col-span-6 md:px-2 md:py-0 py-1">
              <div className=" text-left md:py-2">
                <label className="text-md text-left font-semibold ">
                  Add Scope of Work
                </label>
                {/* <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span> */}
              </div>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="border px-2 w-full py-[5px] rounded-md"
              />
              <div className=" text-left md:py-2">
                <label className="text-sm text-left ">
                  We accept JPEG, JPG, PNG, DOC, DOCX, RTF, XLS, XLSX and PDF
                  files
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
            </div>
            <div className=" md:col-span-6 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">
                  Certification
                </label>
                {/* <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span> */}
              </div>
              <Select
                options={certificationList?.data?.map((certification) => ({
                  value: certification?.id,
                  label: certification?.name,
                }))}
                onChange={(e) => setCertification(e.value)}
                isMulti={false}
                isClearable
              />
            </div>
          </div>
          <div className="p-2 rounded mt-2 bg-gray-200">
            <h2 className="font-semibold text-2xl text-left">
              Experience Details:
            </h2>
          </div>
          <div className="grid md:grid-cols-12">
            <div className=" md:col-span-6 md:px-2 md:py-0 py-1">
              <div className=" text-left md:py-2">
                <label className="text-md text-left font-semibold ">
                  Total Experience (Years)
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <select
                required
                onChange={(e) => setTotalExperience(e.target.value)}
                className="border text-sm font-medium px-2 py-[9px] w-full rounded-md"
              >
                <option>Choose Experience</option>
                <option value="fresher">Fresher</option>
                <option value="1">1 Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
                <option value="3+ Year">3+ Year</option>
                <option value="5+ Year">5+ Year</option>
                <option value="8+ Year">8+ Year</option>
                <option value="12+ Year">12+ Year</option>
              </select>
            </div>
            <div className=" md:col-span-6 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">
                  Relevant Experience(Years)
                </label>
                {/* <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span> */}
              </div>
              <input
                type="number"
                min="0"
                onPaste={preventPasteNegative}
                onKeyDown={preventMinus}
                onChange={(e) => setRelevantExperience(e.target.value)}
                className="border px-2 w-full py-[9px] rounded-md"
              />
            </div>
          </div>
          {/* <div className="grid md:grid-cols-12">
            <div className=" md:col-span-6 md:px-2 md:py-0 py-1">
              <div className=" text-left md:py-2">
                <label className="text-md text-left font-semibold ">
                  Work Experience (Years)
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                type="number"
                onChange={(e) => setWorkExperience(e.target.value)}
                required
                className="border text-sm font-medium px-2 py-1 w-full rounded-md"
              />
            </div>
            <div className=" md:col-span-6 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">
                  Job Profile
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                type="text"
                onChange={(e) => setJobProfile(e.target.value)}
                className="border px-2 w-full py-1 rounded-md"
                required
              />
            </div>
          </div> */}
          <div className="grid md:grid-cols-12">
            <div className=" md:col-span-6 md:px-2 md:py-0 py-1">
              <div className=" text-left md:py-2">
                <label className="text-md text-left font-semibold ">
                  Key Responsibility Areas
                </label>
                <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span>
              </div>
              <input
                type="text"
                required
                onChange={(e) => setKeyResponsibility(e.target.value)}
                className="border text-sm font-medium px-2 py-[9px] w-full rounded-md"
              />
            </div>
            <div className=" md:col-span-6 md:pr-2 md:py-0 py-1">
              <div className="text-left md:py-2">
                <label className="text-md text-left font-semibold">
                  Essential Skills (Technical)
                </label>
                {/* <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span> */}
              </div>
              <input
                type="text"
                className="border px-2 w-full py-[9px] rounded-md"
                onChange={(e) => setEssentialSkills(e.target.value)}
                // required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12">
            <div className=" md:col-span-6 md:px-2 md:py-0 py-1">
              <div className=" text-left md:py-2">
                <label className="text-md text-left font-semibold ">
                  Prerequisites for the employee (This section will involve the
                  instruments/ tools required by the employee/s at the time of
                  joining):{" "}
                </label>
                {/* <span className="text-red-500 text-md font-semibold px-1">
                  *
                </span> */}
              </div>
              <input
                onChange={(e) => setPrerequisites(e.target.value)}
                className="border text-sm font-medium px-2 py-[9px] w-full rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 my-2 p-2">
            <input
              type="submit"
              className="col-span-1 w-24 h-10 cursor-pointer text-white font-semibold items-center justify-center bg-green-500 rounded"
              placeholder="Save"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplacementForm;
