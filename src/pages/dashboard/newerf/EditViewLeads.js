import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Editor from "../jobdescription/ckeditor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


// const state = JSON.parse(localStorage.getItem("viewleadswstate"));

const EditViewLeads = () => {

  let leads = useSelector((state) => state?.offerletter?.leads);  
  const viewlead = JSON.parse(localStorage.getItem('viewleadswstate'));
    leads=viewlead;
  let state = viewlead;
  // const leads = useSelector((state) => state?.offerletter?.leads);

  // console.log("19", leads);
  // let state = leads;

  const allSkill = state?.skills?.map((ele) => {
    return ele.skill.name;
  });

  const allSkillId = state?.skills?.map((ele) => {
    return ele.skill.id;
  });

  const allSub = state?.subqualifications?.map((ele) => {
    return {
      label: ele?.subqualification?.name,
      value: ele?.subqualification?.id,
    };
  });

  const allSubp = state?.subqualifications?.map((ele) => {
    return ele?.subqualification?.name;
  });

  console.log("22", allSub);

  const allCer = state?.anycertification.map((ele) => {
    return ele.certification.name;
  });

  console.log("8", state);
  const newCertification =
    state &&
    state?.anycertification?.map((x) => x?.certification?.name)?.join(", ");

  const [projectManager, setProjectManager] = useState(state?.project_manager);

  const [categoryList, setCategoryList] = useState("");
  const [category, setCategory] = useState(state?.category?.id);
  const [skillsList, setSkillsList] = useState("");
  const [skill, setSkill] = useState(allSkillId);
  const [level, setLevel] = useState(state?.level);
  const [totalExperience, setTotalExperience] = useState("");
  const [relevantExperience, setRelevantExperience] = useState(
    state?.relevent_exp 
  );
  const [designation, setDesignation] = useState(state?.degination);
  const [designationjd, setDesignationJd] = useState(state?.jd?.designation);
  const [dataJd, setDataJd] = useState(state?.jd?.job_description);
  const [dataResponsibilities, setDataResponsibilities] = useState(
    state?.jd?.responsibilities

  );
  const [dataRequirements, setDataRequirements] = useState(
    state?.jd?.requirements
  );
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [jobtype, setJobtype] = useState("");

  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData && jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const levelList = ["L0", "L1", "L2", "L3", "L4", "L5"];

  const [qualificationList, setQualificationList] = useState("");
  const [qualification, setQualification] = useState(
    state?.qualification?.map((ele) => {
      return ele?.qualificationdetails?.id;
    })
  );

  const [subQualificationList, setSubQualificationList] = useState(allSub);
  const [certificationList, setCertificationList] = useState("");
  const [certification, setCertification] = useState([]);
  const [startDate, setStartDate] = useState(state?.start_date);
  const [endDate, setEndDate] = useState(state?.end_date);
  const [budget, setBudget] = useState(state?.position_budgeted);
  const [reportingTeam, setReportingTeam] = useState(state?.reporting_team);
  const [positions, setPositions] = useState(state?.total_positions);
  const [keyResponsibility, setKeyResponsibility] = useState(
    state?.responsibility
  );

  const multipleQualifcationData = {
    qualificationId: "",
    subQualificationId: "",
    subQualificationList: [{ label: "Please select qualification", value: "" }],
  };
  const [multipleQualification, setMultipleQualification] = useState([
    multipleQualifcationData,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("97", categoryList);
  }, [category]);

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

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

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
    console.log("Sub Qualification",jsonResponse )

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

  useEffect(() => {
    getQualificationApi();
    certificaitonListApi();
  }, []);

  const replacementPredata = {
    employeeName: "",
    employeeCode: "",
    employeeResgDate: "",
    employeeLastDate: "",
  };

  const [replacementData, setReplacementData] = useState([replacementPredata]);

  const handleChange = (e, index) => {
    let handleChangeData = [...replacementData];
    handleChangeData[index][e.target.name] = e.target.value;
    setReplacementData(handleChangeData);
  };

  const replacementdata = [
    {
      title: "Employee Name",
      data: state?.replacements[0]?.emp_name,
    },
    {
      title: "Employee Code",
      data: state?.replacements[0]?.emp_code,
    },
    {
      title: "Last Working Date",
      data: state?.replacements[0]?.last_working_date,
    },
    {
      title: "Resign Date",
      data: state?.replacements[0]?.resign_date,
    },
  ];

  const [subqualificationLists, setSubqualificationLists] = useState(allSub);

  // const subqualificationLists =
  //   multipleQualification &&
  //   multipleQualification?.map((x) => x?.subQualificationId);

  const handleChangeSp = (val) => {
    setSubqualificationLists(val);
  };

  useEffect(() => {
    console.log("237", subqualificationLists);
  }, [subqualificationLists]);

  const handleSubmit = async () => {
    try {
      const formdata = new FormData();
      let flattenedArray = subqualificationLists.flat();
      formdata.append("jd_id", `${state?.jd?.id}`);
      formdata.append("total_positions", `${positions}`);
      formdata.append("category_id", `${category}`);
      formdata.append("degination", `${designation}`);
      formdata.append("level", `${level}`);
      formdata.append("project_manager", `${projectManager}`);
      formdata.append("reporting_team", `${reportingTeam}`);
      formdata.append("position_budgeted", `${budget}`);
      formdata.append("relevent_exp", `${relevantExperience}`);
      formdata.append("responsibility", `${keyResponsibility}`);
      formdata.append("end_date", `${startDate}`);
      formdata.append("start_date", `${endDate}`);
      formdata.append("location", `${state?.location}`);
      formdata.append("total_experience", `${state?.total_experience}`);

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

      for (let i = 0; i < qualification.length; i++) {
        formdata.append(`qualification[${i}]`, qualification[i]);
      }
      for (let i = 0; i < flattenedArray.length; i++) {
        formdata.append(
          `additionalqualification[${i}]`,
          `${flattenedArray[i].value}`
        );
      }
      for (let i = 0; i < certification?.length; i++) {
        formdata.append(`anycertification[${i}]`, `${certification[i]}`);
      }
      // formdata.append("scopeofwork", file);
      console.log("252", skill);
      for (let i = 0; i < skill.length; i++) {
        formdata.append(`skill_id[${i}]`, `${skill[i]}`);
      }
      const request = await axios.postForm(
        `${process.env.REACT_APP_API_URL}jobs/lead/${state?.job_id}/${state?.id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      const response = await request?.data;

      console.log("333", response);
      if (response?.code == 200) {
        console.log("335", response.message);
        toast.success("Successfully Erf Updated");
        navigate("/admin/newerf");
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
    categoriesListApi();
  }, []);

  useEffect(() => {
    skillsListApi();
  }, [category]);

  const handleQualificationChange = (e, index) => {
    setQualification([...qualification, e.target.value]);
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

  const showData = [
    {
      title: "Project Manager",
      data: (
        <input
          type="text"
          maxLength={50}
          className="border  w-full px-2 py-2"
          onChange={(e) => setProjectManager(e.target.value)}
          value={projectManager}
        />
      ),
    },
    {
      title: "Designation",
      data: (
        <input
          type="text"
          maxLength={50}
          className="border  w-full px-2 py-2"
          onChange={(e) => setDesignation(e.target.value)}
          value={designation}
        />
      ),
    },
    {
      title: "Category",
      data: (
        <select
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2 py-[9px] w-full rounded-md"
        >
          <option>{state?.category?.name}</option>
          {categoryList?.data &&
            categoryList?.data?.map((options) => {
              return (
                <option key={options?.id} value={options?.id}>
                  {options?.name}
                </option>
              );
            })}
        </select>
      ),
    },
    {
      title: "Skills",
      data: (
        <Select
          options={skillsList?.data?.map((skills) => ({
            value: skills?.id,
            label: skills?.name,
          }))}
          onChange={(e) => setSkill(e?.map((x) => x.value))}
          isMulti={true}
          isClearable
          placeholder={<strong>{allSkill.toString()}</strong>}
        />
      ),
    },
    {
      title: "Requisition Date",
      data: (
        <input
          required
          name="startDate"
          placeholder="Requisition Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          type="date"
          className="w-full py-2 p-[6px] px-2 border rounded-md border-gray-300"
        />
      ),
    },
    {
      title: "Target Date",
      data: (
        <input
          required
          placeholder="Target Date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          type="date"
          className="w-full py-2 p-[6px] px-2 border  border-gray-300 rounded-md"
        />
      ),
    },
    {
      title: "Budget",
      data: (
        <input
          type="text"
          maxLength={50}
          className="border  w-full px-2 py-2"
          onChange={(e) => setBudget(e.target.value)}
          value={budget}
        />
      ),
    },
    {
      title: "Reporting Team",
      data: (
        <input
          type="text"
          maxLength={50}
          className="border  w-full px-2 py-2"
          onChange={(e) => setReportingTeam(e.target.value)}
          value={reportingTeam}
        />
      ),
    },
    {
      title: "Level",
      data: (
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
      ),
    },
    {
      title: "Positions",
      data: (
        <input
          type="text"
          maxLength={50}
          className="border  w-full px-2 py-2"
          onChange={(e) => setPositions(e.target.value)}
          value={positions}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="p-2 bg-white border-t-2 border-primary">
        <h2 className="text-xl px-2 border-gray-300">ERF</h2>
        <div className="grid grid-cols-3 ">
          {state?.replacements?.length > 0
            ? replacementdata &&
              replacementdata?.map((x, index) => (
                <div className="col-span-1 w-full p-2" key={index}>
                  <label className="text-sm text-primary font-medium">
                    {x.title}
                  </label>z
                  <span className="flex text-gray-700 capitalize pr-1">
                    {x?.data}
                  </span>
                </div>
              ))
            : null}
          {showData &&
            showData?.map((x, index) => (
              <div className="col-span-1 w-full p-2" key={index}>
                <label className="text-sm text-primary font-medium">
                  {x.title}
                </label>
                <div className={""}>
                  <span className="block text-gray-700 capitalize">
                    {x.data}
                  </span>
                </div>
              </div>
            ))}
          <div className=" col-span-3 py-2 px-2 w-full bg-gray-200 text-lg">
            Education Details
          </div>
          {multipleQualification?.length > 0
            ? multipleQualification?.map((x, index) => (
                <div key={index} className="">
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
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="border px-2 w-full py-[9px] rounded-md"
                      required
                    >
                      <option>
                        {state?.qualification[0].qualificationdetails.name}
                      </option>
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
                  <div className="col-span-5 pr-2 md:py-0 py-1">
                    <div className="text-left md:py-2">
                      <label className="text-md text-left font-semibold">
                        Specialization
                      </label>
                      <span className="text-red-500 text-md font-semibold px-1">
                        *
                      </span>
                    </div>
                    <Select
                      required
                      options={
                        multipleQualification[index]?.subQualificationList
                          ?.length > 0
                          ? multipleQualification[index]?.subQualificationList
                          : [
                              {
                                value: "",
                                label: "Please select qualification.!",
                              },
                            ]
                      }
                      onChange={handleChangeSp}
                      isMulti={true}
                      isClearable
                      placeholder={<strong>{allSubp.toString("")}</strong>}
                    />
                  </div>
                  {/* <div className="col-span-1 pr-2 md:py-0 py-1 flex justify-center">
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
                          if (index > 0) {
                            handleDeleteQualification(index);
                          }
                        }}
                        className="mt-5"
                      >
                        <RiDeleteBin7Fill fill="red" size={26} />
                      </button>
                    ) : null}
                  </div> */}
                </div>
              ))
            : null}
        </div>
        <div className="mb-4 col-span-6 pr-2 md:py-0 py-1">
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
            onChange={(e) => setCertification(e?.map((x) => x?.value))}
            isMulti
            isClearable
            placeholder={<strong>{allCer.toString("")}</strong>}
          />
          <div className="mt-5 col-span-3 py-2 px-2 w-full bg-gray-200 text-lg">
            Experience Details
          </div>
          {/* <div className=" col-span-6 pr-2 md:py-0 py-1">
            <div className=" text-left md:py-2">
              <label className="text-md text-left font-semibold ">
                Total Experience (Years)
              </label>
              <span className="text-red-500 text-md font-semibold px-1">*</span>
            </div>
            <select
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
              <option value="3+ Year">3+ Year</option>
              <option value="5+ Year">5+ Year</option>
              <option value="8+ Year">8+ Year</option>
              <option value="12+ Year">12+ Year</option>
            </select>
          </div> */}

          <div className=" col-span-6 md:pr-2 md:py-0 py-1">
            <div className="text-left md:py-2">
              <label className="text-md text-left font-semibold">
                Responsibility
              </label>
              <span className="text-red-500 text-md font-semibold px-1">*</span>
            </div>
            <input
              type="text"
              min='0'
              value={keyResponsibility}
              onPaste={preventPasteNegative}
              onKeyDown={preventMinus}
              onChange={(e) => setKeyResponsibility(e.target.value)}
              className="border px-2 w-full py-[9px] rounded-md"
              required
            />
          </div>
          <div className=" col-span-6 md:pr-2 md:py-0 py-1">
            <div className="text-left md:py-2">
              <label className="text-md text-left font-semibold">
                Relevant Experience(Years)
              </label>
              <span className="text-red-500 text-md font-semibold px-1">*</span>
            </div>
            <input
              type="number"
              min="0"
              value={relevantExperience}
              onPaste={preventPasteNegative}
              onKeyDown={preventMinus}
              onChange={(e) => setRelevantExperience(e.target.value)}
              className="border px-2 w-full py-[9px] rounded-md"
              required
            />
          </div>
        </div>

        <div className=" col-span-3 py-2 px-2 w-full bg-gray-200 text-lg">
          Job Description
        </div>

        <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-2 mt-3">
                <strong>Designation</strong>
                <div>
                  {" "}
                  <input
                    type="text"
                    maxLength={50}
                    className="border  w-full px-2 py-2"
                    placeholder={"Enter Designation"}
                    onChange={(e) => setDesignation(e.target.value)}
                    value={designationjd}
                  />
                  {}
                </div>
              </div>

              {/* <div className="grid grid-cols-2 mt-3">
                <strong>Job Type</strong>
                <select
                  className="border  w-full px-2 py-2 mb-2"
                  onChange={(e) => setJobtype(e.target.value)}
                  value={jobtype}
                >
                  <option>Choose Job Type</option>
                  <option value={"part_time"}>Part Time</option>
                  <option value={"full_time"}>Full Time</option>
                </select>
              </div> */}

              <div className="grid grid-cols-2 mt-3">
                <strong>Job Description</strong>

                <Editor
                  name="description"
                  value={dataJd}
                  onChange={(data) => {
                    setDataJd(data);
                  }}
                  editorLoaded={editorLoaded}
                />
              </div>

              <div className="grid grid-cols-2 mt-3">
                <strong>Responsibilities</strong>
                <Editor
                  name="description"
                  onChange={(data) => {
                    setDataResponsibilities(data);
                  }}
                  editorLoaded={editorLoaded}
                  value={dataResponsibilities}
                />
              </div>

              <div className="grid grid-cols-2 mt-3 mb-4">
                <strong>Requirements</strong>
                <Editor
                  value={dataRequirements}
                  name="description"
                  onChange={(data) => {
                    setDataRequirements(data);
                  }}
                  editorLoaded={editorLoaded}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ml-6 mt-4"
        type="button"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};

export default EditViewLeads;
