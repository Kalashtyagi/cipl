import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Select from "react-select";
import { toast } from "react-toastify";

const datatoken = localStorage.getItem("data");
const jsonData = JSON.parse(datatoken);
const accessToken = jsonData?.access_token;
const authorize = "Bearer" + " " + accessToken;

const AddErfData = ({ setShowAddModal, data, erfId, recruitmentType }) => {
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState([]);
  const [address, setAddress] = useState("");
  const [otherSkills, setOtherSkills] = useState("");
  const [certification, setCertification] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [designation, setDesignation] = useState("");
  const [level, setLevel] = useState("L0");
  const [projectManager, setProjectManager] = useState("");
  const [reportingTeam, setReportingTeam] = useState("");
  const [positions, setPositions] = useState("");
  const [budget, setBudget] = useState(0);
  const [graduation, setGraduation] = useState("");
  const [additionalQualification, setAdditionalQualification] = useState("");
  const [file, setFile] = useState();
  const [totalExperience, setTotalExperience] = useState("");
  const [relevantExperience, setRelevantExperience] = useState("");
  const [keyResponsibility, setKeyResponsibility] = useState("");
  const [essentialSkills, setEssentialSkills] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const replacementPredata = {
    employeeName: "",
    employeeCode: "",
    employeeResgDate: "",
    employeeLastDate: "",
  };
  const [replacementData, setReplacementData] = useState([replacementPredata]);

  const multipleQualifcationData = {
    qualificationId: "",
    subQualificationId: "",
    subQualificationList: [{ label: "Please select qualification", value: "" }],
  };
  const [multipleQualification, setMultipleQualification] = useState([
    multipleQualifcationData,
  ]);
  const [datajd, setDataJd] = useState([]);

  // api data state handling
  const [categoryList, setCategoryList] = useState("");
  const [certificationList, setCertificationList] = useState("");
  // const [departmentList, setDepartmentList] = useState('')
  const [qualificationList, setQualificationList] = useState("");
  const [subQualificationList, setSubQualificationList] = useState([
    { label: "Please select qualification", value: "" },
  ]);
  const [skillsList, setSkillsList] = useState("");

  // local data
  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData && jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  console.log(jobDescription);

  useEffect(() => {
    document.title = "CIPLCRM | Job Description";

    axios
      .get(
        `${process.env.REACT_APP_API_URL}jd`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authorize}`,
          },
        }
      )
      .then((res) => {
        setDataJd(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // rowdata
  // console.log("data", data)
  // console.log('skills',skill)
  useEffect(() => {
    if (data) {
      setAddress(
        data?.address === null || undefined || "" ? "" : data?.address
      );
      setDesignation(
        data?.degination === null || undefined || "" ? "" : data?.degination
      );
      setLevel(data?.level === null || undefined || "" ? "" : data?.level);
      setCategory(
        data?.category?.id === null || undefined || "" ? "" : data?.category?.id
      );
      setSkill(
        data?.skills.length > 0
          ? data?.skills.map((x) => ({
              label: x?.skill?.name,
              value: x?.skill?.value,
            }))
          : ""
      );
      setBudget(
        data?.position_budgeted === null || undefined || ""
          ? ""
          : data?.position_budgeted
      );
      setPositions(
        data?.total_positions === null || undefined || ""
          ? ""
          : data?.total_positions
      );
      setReportingTeam(
        data?.reporting_team === null || undefined || ""
          ? ""
          : data?.reporting_team
      );
      setProjectManager(
        data?.project_manager === null || undefined || ""
          ? ""
          : data?.project_manager
      );
      setJobDescription(
        data?.job_description === null || undefined || ""
          ? ""
          : data?.job_descriptions
      );
      setGraduation(
        data?.qualification === null || undefined || ""
          ? ""
          : data?.qualification
      );
      setAdditionalQualification(
        data?.subqualifications.length > 0
          ? data?.subqualifications.map((x) => ({
              label: x?.subqualification?.name,
              value: x?.subqualification?.value,
            }))
          : ""
      );
      setCertification(
        data?.anycertification !== null || undefined || ""
          ? [
              {
                label: data?.anycertification?.name,
                value: data?.anycertification?.value,
              },
            ]
          : ""
      );
      setRelevantExperience(
        data?.relevent_exp === null || undefined || "" ? "" : data?.relevent_exp
      );
      setKeyResponsibility(
        data?.responsibility === null || undefined || ""
          ? ""
          : data?.responsibility
      );
      setPrerequisites(
        data?.prerequisite === null || undefined || "" ? "" : data?.prerequisite
      );
      // setTotalExperience(data?.)
    }
  }, [data]);

  // custom functions
  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.Clipboard;
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

  // call api
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

  // console.log('recruitment type',recruitmentType)

  // console.log("Graduation",graduation)
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
    // console.log('certification', certificationResponse)
    if (certificationResponse?.data.length > 0) {
      setCertificationList(
        certificationResponse?.data?.map((x) => ({
          value: x?.id,
          label: x?.name,
        }))
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
      setQualificationList(jsonResponse?.data);
    }
  };

  const getSubQualifications = async ({ graduationId, index }) => {
    // console.log("graduationid", graduationId);
    const getSubQualification = await fetch(
      `${process.env.REACT_APP_API_URL}subqualification/search`,
      {
        method: "POST",
        headers: {
          Authorization: `${authorize}`,
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          qualification_id: `${graduationId}`,
        }),
      }
    );
    const jsonResponse = await getSubQualification?.json();
    // console.log("Sub Qualification",jsonResponse )

    if (jsonResponse?.data) {
      // console.log('response',jsonResponse?.data)
      const subqualificationsList = jsonResponse?.data?.map((x) => ({
        label: x?.name,
        value: x?.id,
      }));
      let data = [...multipleQualification];
      data[index].subQualificationList = subqualificationsList;
      setMultipleQualification(data);
    } else {
      let newData = [...multipleQualification];
      newData[index].subQualificationList = [
        { value: "", label: "Please Select qualification..!" },
      ];
      setMultipleQualification(newData);
    }
  };

  const handleMore = (e) => {
    e.preventDefault();
    let newData = {
      employeeName: "",
      employeeCode: "",
      employeeResgDate: "",
      employeeLastDate: "",
    };
    setReplacementData([...replacementData, newData]);
  };

  const handleChange = (e, index) => {
    let handleChangeData = [...replacementData];
    handleChangeData[index][e.target.name] = e.target.value;
    setReplacementData(handleChangeData);
  };

  // console.log('reaplcememtn data', replacementData)

  const handleDelete = (e, index) => {
    // console.log('index',index)
    e.preventDefault();
    let handleDeleteData = [...replacementData];
    handleDeleteData.splice(index, 1);
    setReplacementData(handleDeleteData);
  };

  useEffect(() => {
    categoriesListApi();
    getQualificationApi();
    certificaitonListApi();
  }, []);

  useEffect(() => {
    skillsListApi();
  }, [category]);

  const handleQualificationChange = (e, index) => {
    const { value } = e.target;
    // console.log('value',value)
    let newData = [...multipleQualification];
    newData[index].qualificationId = value;
    setMultipleQualification(newData);
    if (value) {
      getSubQualifications({ graduationId: value, index });
    } else {
      newData[index].subQualificationList = [
        { value: "", label: "Please Select qualification..!" },
      ];
      setMultipleQualification(newData);
    }
  };

  const handleDeleteQualification = (index) => {
    let newData = [...multipleQualification];
    newData.splice(index, 1);
    setMultipleQualification(newData);
  };

  const handleAddQualification = (e) => {
    let newData = {
      qualificationId: "",
      subQualificationId: "",
    };
    setMultipleQualification([...multipleQualification, newData]);
  };

  // console.log('multiple qualification',multipleQualification)
  const qualificationLists =
    multipleQualification &&
    multipleQualification?.map((x) => x?.qualificationId);
  const subqualificationLists =
    multipleQualification &&
    multipleQualification?.map((x) => x?.subQualificationId);
  // console.log("sub qualification", subqualificationLists)
  // console.log(" qualification", qualificationLists)

  // custom level options
  const levelList = ["L0", "L1", "L2", "L3", "L4", "L5"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      let flattenedArray = subqualificationLists.flat();
      formdata.append("jd_id", `${jobDescription}`);
      //   formdata.append('job_requirement', `${positionRequired}`)
      formdata.append("total_positions", `${positions}`);
      formdata.append("location", `${address}`);
      formdata.append("category_id", `${category}`);
      formdata.append("degination", `${designation}`);
      formdata.append("level", `${level}`);
      formdata.append("project_manager", `${projectManager}`);
      formdata.append("reporting_team", `${reportingTeam}`);
      formdata.append("position_budgeted", `${budget}`);
      formdata.append("total_experience", `${totalExperience}`);
      formdata.append("relevent_exp", `${relevantExperience}`);
      formdata.append("responsibility", `${keyResponsibility}`);
      formdata.append("end_date", `${startDate}`);
      formdata.append("start_date", `${endDate}`);
      formdata.append("prerequisite", `${prerequisites}`);
      formdata.append(
        "employee[0][emp_name]",
        `${
          replacementData[0]?.employeeName
            ? replacementData[0]?.employeeName
            : "null"
        }`
      );
      formdata.append(
        "employee[0][emp_code]",
        `${
          replacementData[0]?.employeeCode
            ? replacementData[0]?.employeeCode
            : "null"
        }`
      );
      formdata.append(
        "employee[0][last_working_date]",
        `${
          replacementData[0]?.employeeLastDate
            ? replacementData[0]?.employeeLastDate
            : "null"
        }`
      );
      formdata.append(
        "employee[0][resign_date]",
        `${
          replacementData[0]?.employeeResgDate
            ? replacementData[0]?.employeeResgDate
            : "null"
        }`
      );
      for (let i = 0; i < qualificationLists.length; i++) {
        formdata.append(`qualification[${i}]`, qualificationLists[i]);
      }
      for (let i = 0; i < flattenedArray.length; i++) {
        formdata.append(
          `additionalqualification[${i}]`,
          `${flattenedArray[i]}`
        );
      }
      for (let i = 0; i < certification?.length; i++) {
        formdata.append(`anycertification[${i}]`, `${certification[i]}`);
      }
      formdata.append("scopeofwork", file);
      for (let i = 0; i < skill.length; i++) {
        formdata.append(`skill_id[${i}]`, `${skill[i]}`);
      }
      const request = await axios.postForm(
        `${process.env.REACT_APP_API_URL}jobs/erf/${erfId}`,
        formdata,
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
        setShowAddModal(false);
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none">
        <div className="relative my-6 mx-2 w-2/3">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[95vh]">
            {/*header*/}
            <div className="flex items-start justify-between lg:p-5 p-4 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Lead</h3>
              <button
                className="p-1 ml-auto bg-transparent rounded-full h-8 flex items-center justify-center w-8 border-0 text-red-600 text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowAddModal(false)}
              >
                X
              </button>
            </div>
            {/*body*/}
            <div className="flex p-4 h-full no-scrollbar overflow-y-scroll">
              <div className="grid lg:grid-cols-12">
                {recruitmentType === "1" ? (
                  <>
                    {replacementData?.length > 0
                      ? replacementData?.map((x, index) => (
                          <div
                            className="grid grid-cols-12 col-span-12"
                            key={index}
                          >
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
                                id="employeeName"
                                name="employeeName"
                                className="border py-[9px] px-2 w-full rounded-md"
                                onChange={(e) => handleChange(e, index)}
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
                                id="employeeCode"
                                name="employeeCode"
                                className="border py-[9px] w-full px-2 rounded-md"
                                required
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>
                            <div className=" md:col-span-3 md:px-2 md:py-0 py-1">
                              <div className=" text-left md:py-2">
                                <label className="text-md text-left after:content-['*'] after:ml-0.5 after:text-red-500 font-semibold ">
                                  Resig. Date
                                </label>
                              </div>
                              <input
                                type="date"
                                className="border px-2 w-full py-[9px] rounded-md"
                                required
                                name="employeeResgDate"
                                id="employeeResgDate"
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>
                            <div className=" md:col-span-3 text-left md:px-2 md:py-0 py-1">
                              <div className="md:py-2">
                                <label className="text-md text-left after:content-['*'] after:ml-0.5 after:text-red-500 font-semibold">
                                  Last Working Date
                                </label>
                              </div>
                              <input
                                type="date"
                                className="w-full py-[9px] px-2 border rounded-md"
                                required
                                id="employeeLastDate"
                                name="employeeLastDate"
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>
                            {/* <div className='flex justify-center pt-4 col-span-1'>
                                                {
                                                    index===replacementData.length-1?
                                                    <button onClick={(e)=>handleMore(e)} className=''><AiOutlinePlusCircle size={26}/></button>
                                                    :null
                                                }
                                                {
                                                    index<replacementData.length-1?
                                                    <button onClick={handleDelete} className=''><RiDeleteBin7Fill fill='red' size={26}/></button>
                                                    :null
                                                }
                                            </div> */}
                          </div>
                        ))
                      : null}
                  </>
                ) : null}
                <div className=" col-span-4 md:pr-2 md:py-0 py-1">
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
                    value={address}
                    className="border py-[9px] w-full rounded-md px-2"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                {/* target date and req date */}
                <div className="col-span-4 md:pr-2 md:py-0 py-1">
                  <div className="text-left md:py-1.5">
                    <label
                      className={`after:content-['*'] after:ml-0.5 after:text-red-500 text-md text-left font-semibold`}
                    >
                      Requisition Date
                    </label>
                  </div>
                  <div className="py-1">
                    <input
                      required
                      name="startDate"
                      placeholder="Requisition Date"
                      onChange={(e) => setStartDate(e.target.value)}
                      type="date"
                      className="w-full py-2 p-[6px] px-2 border rounded-md border-gray-300"
                    />
                  </div>
                </div>
                <div className="col-span-4 md:pr-2 md:py-0 py-1">
                  <div className="text-left md:py-1.5">
                    <label
                      className={`after:content-['*'] after:ml-0.5 after:text-red-500 text-md text-left font-semibold`}
                    >
                      Target Date
                    </label>
                  </div>
                  <div className="py-1">
                    <input
                      required
                      placeholder="Target Date"
                      name="endDate"
                      onChange={(e) => setEndDate(e.target.value)}
                      type="date"
                      className="w-full py-2 p-[6px] px-2 border  border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                {/* <div className=" col-span-4 md:pr-2 md:py-0 py-1">
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
                                    onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div> */}
                <div className=" col-span-4 md:pr-2 text-left md:py-0 py-1">
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
                    value={designation}
                    className="w-full py-[9px] px-2 border rounded-md"
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
                <div className=" col-span-4 md:pr-2 text-left md:py-0 py-1">
                  <div className="md:py-2">
                    <label className="text-md text-left font-semibold">
                      Level
                    </label>
                    <span className="text-red-500 text-md font-semibold px-2">
                      *
                    </span>
                  </div>
                  <select
                    required
                    type="text"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full py-[9.5px] px-2 border rounded-md"
                  >
                    {levelList.map((list, index) => (
                      <option value={list} key={index}>
                        {list}
                      </option>
                    ))}
                  </select>
                </div>
                <div className=" col-span-4 md:pr-2 md:py-0 py-1">
                  <div className="text-left md:py-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    <label className="text-md text-left font-semibold">
                      Job Category 
                    </label>
                  </div>
                  <select
                    type="text"
                    value={category}
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
                <div className=" col-span-4 md:pr-2 md:py-0 py-1">
                  <div className="text-left md:py-2">
                    <label className="text-md text-left font-semibold">
                      Skills
                    </label>
                    <span className="text-red-500 text-md font-semibold px-1">
                      *
                    </span>
                  </div>
                  <Select
                    // value={skill}
                    options={skillsList?.data?.map((skills) => ({
                      value: skills?.id,
                      label: skills?.name,
                    }))}
                    // getOptionValue={(option)=>option?.value}
                    onChange={(e) => setSkill(e.map((x) => x.value))}
                    isMulti={true}
                    isClearable
                  />
                </div>
                {skill === "Other" ? (
                  <div className=" col-span-4 md:px-2 md:pr-2 md:py-0 py-1 ">
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
                      value={otherSkills}
                      onChange={(e) => setOtherSkills(e.target.value)}
                      className="border px-2 w-full py-[9px] rounded-md"
                      required={skill === "Other" ? true : false}
                    />
                  </div>
                ) : null}
                <div className=" col-span-4 md:pr-2 md:py-0 py-1">
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
                    value={budget}
                    onPaste={preventPasteNegative}
                    onKeyDown={preventMinus}
                    onChange={(e) => setBudget(e.target.value)}
                    className="border px-2 w-full py-[9px] rounded-md"
                    required
                  />
                </div>
                <div className=" col-span-4 text-left md:py-0 md:pr-2">
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
                    value={positions}
                    min="0"
                    onPaste={preventPasteNegative}
                    onKeyDown={preventMinus}
                    type="number"
                    className="w-full py-[9px] px-2 border rounded-md"
                    onChange={(e) => setPositions(e.target.value)}
                  />
                </div>
                <div className=" col-span-4  md:pr-2 md:py-0 py-1">
                  <div className=" text-left md:py-2 ">
                    <label className="text-md text-left font-semibold ">
                      Reporting to (Team Lead)
                    </label>
                    <span className="text-red-500 text-md font-semibold px-1">
                      *
                    </span>
                  </div>
                  <input
                    value={reportingTeam}
                    required
                    type="text"
                    onChange={(e) => setReportingTeam(e.target.value)}
                    className="border px-2 w-full py-[9px] rounded-md"
                  />
                </div>
                <div className=" col-span-4 md:pr-2 md:py-0 py-1">
                  <div className="text-left md:py-2">
                    <label className="text-md text-left font-semibold">
                      HOD
                    </label>
                    <span className="text-red-500 text-md font-semibold px-1">
                      *
                    </span>
                  </div>
                  <input
                    required
                    value={projectManager}
                    type="text"
                    className="border py-[9px] px-2 w-full rounded-md"
                    onChange={(e) => setProjectManager(e.target.value)}
                  />
                </div>
                <div className=" md:col-span-12 pr-2 text-left  md:py-0 py-1">
                  <div className=" text-left md:py-2">
                    <label className="text-md text-left font-semibold pb-2 ">
                      Job Description
                    </label>
                    {/* <textarea
                      required
                      value={jobDescription}
                      minLength={100}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="border text-sm h-20 font-medium mt-2 px-2 py-1 w-full rounded-md"
                    /> */}
                      <span className="text-red-500 text-md font-semibold px-1">
                        *
                      </span>

                    <Select
                      className="mt-2"
                      // value={skill}
                      options={datajd?.map((ele) => ({
                        value: ele?.id,
                        label: ele?.designation,
                      }))}
                      // getOptionValue={(option)=>option?.value}
                      onChange={(selectedOption) =>
                        setJobDescription(selectedOption?.value)
                      }
                      isMulti={false}
                      isClearable
                    />
                  </div>
                </div>
                <div className="my-2 col-span-12 mt-2 md:pr-2">
                  <div className="flex rounded bg-gray-200 p-2">
                    <h2 className="font-semibold text-2xl text-left">
                      Education Details:
                    </h2>
                  </div>
                  {multipleQualification?.length > 0
                    ? multipleQualification?.map((x, index) => (
                        <div key={index} className="grid md:grid-cols-12">
                          <div className=" col-span-6 pr-2 md:py-0 py-1">
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
                              name="qualificationId"
                              // value={graduation}
                              onChange={(e) =>
                                handleQualificationChange(e, index)
                              }
                              className="border px-2 w-full py-[9px] rounded-md"
                              required
                            >
                              <option>Choose Qualification</option>
                              {qualificationList &&
                                qualificationList?.map((qualification) => (
                                  <option
                                    key={qualification?.id}
                                    value={qualification?.id}
                                  >
                                    {qualification?.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className=" col-span-5 pr-2 md:py-0 py-1">
                            <div className="text-left md:py-2">
                              <label className="text-md text-left font-semibold">
                                Specialization
                              </label>
                              <span className="text-red-500 text-md font-semibold px-1">
                                *
                              </span>
                            </div>
                            <Select
                              // value={additionalQualification}
                              required
                              options={
                                multipleQualification[index]
                                  ?.subQualificationList?.length > 0
                                  ? multipleQualification[index]
                                      ?.subQualificationList
                                  : [
                                      {
                                        value: "",
                                        label: "Please select qualification.!",
                                      },
                                    ]
                              }
                              onChange={(e) => {
                                let newData = [...multipleQualification];
                                newData[index].subQualificationId = e.map(
                                  (x) => x.value
                                );
                                setMultipleQualification(newData);
                                // setSubQualificationList([{value:'',label:'Please select qualification.!'}])
                              }}
                              isMulti={true}
                              isClearable
                            />
                          </div>
                          <div className=" col-span-1 pr-2 md:py-0 py-1 flex justify-center ">
                            {index === multipleQualification.length - 1 ? (
                              <button
                                onClick={(e) => handleAddQualification(e)}
                                className="mt-5"
                              >
                                <AiOutlinePlusCircle size={26} />
                              </button>
                            ) : null}
                            {index !== multipleQualification.length - 1 ? (
                              <button
                                onClick={() => {
                                  if (index >= 0) {
                                    handleDeleteQualification(index);
                                  }
                                }}
                                className="mt-5"
                              >
                                <RiDeleteBin7Fill fill="red" size={26} />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
                <div className="grid md:grid-cols-12 col-span-12">
                  <div className=" col-span-6 pr-2 md:py-0 py-1">
                    <div className=" text-left md:py-2">
                      <label className="text-md text-left font-semibold ">
                        Add Scope of Work
                      </label>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="border px-2 w-full py-[5px] rounded-md"
                    />
                    <div className=" text-left md:py-2">
                      <label className="text-sm text-left ">
                        We accept JPEG, JPG, PNG, DOC, DOCX, RTF, XLS, XLSX and
                        PDF files
                      </label>
                      {/* <span className="text-red-500 text-md font-semibold px-1">
                        *
                      </span> */}
                    </div>
                  </div>
                  <div className=" col-span-6 pr-2 md:py-0 py-1">
                    <div className="text-left md:py-2">
                      <label className="text-md text-left font-semibold">
                        Certification
                      </label>
                    </div>
                    <Select
                      // value={certification}
                      options={
                        certificationList?.length > 0
                          ? certificationList
                          : [{ value: "", label: "Please Wait..!" }]
                      }
                      onChange={(e) =>
                        setCertification(e?.map((x) => x?.value))
                      }
                      isMulti
                      isClearable
                    />
                  </div>
                </div>
                <div className="p-2 rounded mt-4 pr-2 bg-gray-200 col-span-12">
                  <h2 className="font-semibold text-2xl text-left">
                    Experience Details:
                  </h2>
                </div>
                <div className="grid md:grid-cols-12 col-span-12 pb-4">
                  <div className=" col-span-6 pr-2 md:py-0 py-1">
                    <div className=" text-left md:py-2">
                      <label className="text-md text-left font-semibold ">
                        Total Experience (Years)
                      </label>
                      <span className="text-red-500 text-md font-semibold px-1">
                        *
                      </span>
                    </div>
                    {/* <select
                      required
                      value={totalExperience}
                      onChange={(e) => setTotalExperience(e.target.value)}
                      className="border text-sm font-medium px-2 py-[9px] w-full rounded-md"
                    >
                      <option>Choose Experience</option>
                      <option value="fresher">Fresher</option>
                      <option value="1">1 Year</option>
                      <option value="2">2 Year</option>
                      <option value="3">3 Year</option>
                      <option value="3+ Year">4 Year</option>
                      <option value="5+ Year">5 Year</option>
                      <option value="12+ Year">6 Year</option>
                      <option value="12+ Year">7 Year</option>
                      <option value="12+ Year">8 Year</option>
                      <option value="12+ Year">9 Year</option>
                      <option value="12+ Year">10 Year</option>
                      <option value="12+ Year">11 Year</option>
                      <option value="8+ Year">12 Year</option>
                      <option value="12+ Year">13 Year</option>
                      <option value="12+ Year">14 Year</option>
                      <option value="12+ Year">15 Year</option>
                    </select> */}

                    <input
                      type="text"
                      min="0"
                      value={totalExperience}
                      onPaste={preventPasteNegative}
                      onKeyDown={preventMinus}
                      onChange={(e) => setTotalExperience(e.target.value)}
                      className="border px-2 w-full py-[9px] rounded-md"
                      required
                    />
                  </div>
                  <div className=" col-span-6 md:pr-2 md:py-0 py-1">
                    <div className="text-left md:py-2">
                      <label className="text-md text-left font-semibold">
                        Relevant Experience(Years)
                      </label>
                      <span className="text-red-500 text-md font-semibold px-1">
                        *
                      </span>
                    </div>
                    <input
                      type="text"
                      min="0"
                      value={relevantExperience}
                      onPaste={preventPasteNegative}
                      onKeyDown={preventMinus}
                      onChange={(e) => setRelevantExperience(e.target.value)}
                      className="border px-2 w-full py-[9px] rounded-md"
                      required
                    />
                  </div>
                  <div className="col-span-6 md:px-2 md:py-0 py-1">
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
                      value={keyResponsibility}
                      required
                      onChange={(e) => setKeyResponsibility(e.target.value)}
                      className="border text-sm font-medium px-2 py-[9px] w-full rounded-md"
                    />
                  </div>
                  <div className="col-span-6 md:pr-2 md:py-0 py-1">
                    <div className="text-left md:py-2">
                      <label className="text-md text-left font-semibold">
                        Essential Skills (Technical)
                      </label>
                    </div>
                    <input
                      type="text"
                      className="border px-2 w-full py-[9px] rounded-md"
                      onChange={(e) => setEssentialSkills(e.target.value)}
                      // required
                    />
                  </div>
                  <div className="col-span-6 md:px-2 md:py-0 py-1">
                    <div className=" text-left md:py-2">
                      <label className="text-md text-left font-semibold ">
                        Prerequisites for the employee (This section will
                        involve the instruments/ tools required by the
                        employee/s at the time of joining):{" "}
                      </label>
                    </div>
                    <input
                      value={prerequisites}
                      onChange={(e) => setPrerequisites(e.target.value)}
                      className="border text-sm font-medium px-2 py-[9px] w-full rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end py-3 px-2 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowAddModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                //   onClick={() => setShowModal(false)}
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setShowAddModal(false)}
        className="opacity-50 cursor-pointer fixed inset-0 z-40 bg-black"
      ></div>
    </form>
  );
};

export default AddErfData;