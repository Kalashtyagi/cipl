import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const AddSalary = () => {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState("");
  const [radioSelection, setRadioSelection] = useState("onsite");
  const [listForm, setListForm] = useState();
  const [jobrecruitmentData, setJobRecruitmentData] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [complianceTeamEmail, setComplianceTeamEmail] = useState([
    { email: "" },
  ]);
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [fixedTotalamount, setFixedTotalamount] = useState(0);


  const { state } = useLocation();

  const employeeData = {
    employeeCode: "",
    location: "",
    salaryType: "",
    name: "",
    state: "",
    designation: "",
    effectiveDate: "",
    dateOfJoining: "",
    ctc: "",
  };

  const fixedEarningData = {
    basicMonthly: 0,
    basicAnnual: 0,
    hrmMonthly: 0,
    hrmAnnual: 0,
    specialMonthly: 0,
    spciealAnnual: 0,
  };

  const deductionData = {
    pfMonthly: 0,
    pfAnnually: 0,
    pTaxMonthly: 0,
    pTaxAnnually: 0,
    totalDeductionMonthly: 0,
    totalDeductionAnnually: 0,
  };

  const employerContribution = {
    pfEMonthly: 0,
    pfEAnnually: 0,
    pfAMonthly: 0,
    pfAAnnually: 0,
    eStateInsuranceMonthly: 0,
    eStateInsuranceAnnually: 0,
  };

  const otherBenefit = {
    gratuityMonthly: 0,
    retension:0,
    retensionBonus:0,
    gratuityAnnually: 0,
    ltaMonthly: 0,
    ltaAnnually: 0,
    insuranceMonthly: 0,
    insuranceAnnually: 0,
    fixedCtcMonthly: 0,
    fixedCtcAnnually: 0,
  };

  const [userData, setUserData] = useState(employeeData);
  const [fixedEarning, setFixedEarning] = useState(fixedEarningData);
  const [deduction, setDeduction] = useState(deductionData);
  const [employeeContribution, setEmployeeContribution] =
    useState(employerContribution);
  const [otherBenefits, setOtherBenefits] = useState(otherBenefit);
  
  const [id, setId] = useState("");
  const [totalCTC, setTotalCtc] = useState(0);
  const [totalCtcAnnually, setTotalCtcAnnually] = useState(0);
  const [netTakeHome, setNetTakeHome] = useState(0);
  const [netTakeHomeAnnually, setNetTakeHomeAnnually] = useState(0);
  const [grossAmount, setGrossAmount] = useState(0);
  const [grossAmountAnnually, setGrossAmountAnnually] = useState(0);
  const[netmonth,setNetmonth]= useState(0);
  const[netannual,setNetAnnual]=useState(0)

  // console.log("userdata",userData)

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const textChange = (e) => {
    const newValues = e.target.value.replace(/[^a-z\s]/gi, "");
    setUserData({ ...userData, [e.target.name]: newValues });
  };

  const handleFixedEarning = (e) => {
    setFixedEarning({
      ...fixedEarning,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fixedEarning.basicAnnual = fixedEarning.basicMonthly * 12;
    fixedEarning.hrmAnnual = fixedEarning.hrmMonthly * 12;
    fixedEarning.spciealAnnual = fixedEarning.specialMonthly * 12;
  }, [fixedEarning]);

  useEffect(() => {
    deduction.pTaxAnnually = deduction.pTaxMonthly * 12;
    deduction.pfAnnually = deduction.pfMonthly *12;
    deduction.totalDeductionAnnually=deduction.totalDeductionMonthly*12

  }, [deduction])

  useEffect(()=>{
    const TotalnettakehomeMonth= parseInt(grossAmountAnnually)-parseInt(netTakeHomeAnnually)
    const TotanetakehomeAnnual=parseInt(grossAmount)-parseInt(netTakeHome)
    setNetmonth(TotalnettakehomeMonth)
    setNetAnnual(TotanetakehomeAnnual)
     
     })

  useEffect(() => {
    employeeContribution.pfEAnnually = employeeContribution.pfEMonthly * 12;
    employeeContribution.pfAAnnually = employeeContribution.pfAMonthly *12;
    employeeContribution.eStateInsuranceAnnually=employeeContribution.eStateInsuranceMonthly*12

  }, [employeeContribution])

  useEffect(() => {
    otherBenefits.gratuityAnnually=otherBenefits.gratuityMonthly*12;
    otherBenefits.insuranceAnnually  =  otherBenefits.insuranceMonthly * 12;
    otherBenefits.ltaAnnually=otherBenefits.ltaMonthly *12;
    otherBenefits.fixedCtcAnnually=otherBenefits.fixedCtcMonthly*12;
    otherBenefits.retensionBonus=otherBenefits. retension*12;

  }, [otherBenefits])


  useEffect(() => {
    const total = (
      fixedEarning.basicAnnual + 
      fixedEarning.hrmAnnual + 
      fixedEarning.spciealAnnual
    ) + (
      employeeContribution.pfEAnnually + 
      employeeContribution.pfAAnnually +
      employeeContribution.eStateInsuranceAnnually
    ) + (
      otherBenefits.gratuityAnnually +
      otherBenefits.insuranceAnnually +
      otherBenefits.ltaAnnually +
      otherBenefits.fixedCtcAnnually +
      otherBenefits.retensionBonus
    );

    setFixedTotalamount(total);
  }, [
    fixedEarning, 
    employeeContribution, 
    otherBenefits
  ]);

  const handleInputChangetotal = (event) => {
    setFixedTotalamount(Number(event.target.value));
    
  };

  // const fixedTotalamount=(fixedEarning.basicAnnual + fixedEarning.hrmAnnual + fixedEarning.spciealAnnual) +
  // (employeeContribution.pfEAnnually + employeeContribution.pfAAnnually+employeeContribution.eStateInsuranceAnnually)+
  // (otherBenefits.gratuityAnnually+otherBenefits.insuranceAnnually+otherBenefits.ltaAnnually+otherBenefits.fixedCtcAnnually+otherBenefits.retensionBonus)

  const handleDeduction = (e) => {
    // console.log("input value",e.target.name)
    setDeduction({ ...deduction, [e.target.name]: parseInt(e.target.value) });
  };

  const handleEmployeeContribution = (e) => {
    setEmployeeContribution({
      ...employeeContribution,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const netTakeHomeSalary = (fixedEarning.basicAnnual + fixedEarning.hrmAnnual + fixedEarning.spciealAnnual) - deduction.totalDeductionAnnually;
console.log(netTakeHomeSalary)


  const handleOtherBenefit = (e) => {
    // console.log('input values',e.target.name)
    setOtherBenefits({
      ...otherBenefits,
      [e.target.name]: parseInt(e.target.value),
    });
  };

 

  const jsonData = JSON.parse(localStorage.getItem("data"));
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;
  const getData = async () => {
    const getApiData = await axios.get(`${process.env.REACT_APP_API_URL}erf`, {
      headers: {
        Authorization: `${authorize}`,
      },
    });
    const apiResonse = await getApiData.data;
    console.log("response",apiResonse)
    if (apiResonse) {
     
      setListForm(apiResonse?.data);
      
     
    }
  };

  useEffect(() => {
    getData();
  }, []);
  

  const getAssigneeData = async () => {
    if (jobId !== "" || null || undefined) {
      const formData = new FormData();
      formData.append("location", userData?.location);
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
      if (response) {
        setFilteredData(response?.data);
      }
    }
   
    if (jobId === "" || null || undefined) {
      toast.error("Please Select PID");
    }
  };

 

  const customAxios = axios.create({
    headers: { Authorization: authorize }
  });

  // Function to fetch job applications
  const getJobApplications = async (radioSelection) => { 
    
    try {

      const response = await customAxios.get(`${process.env.REACT_APP_API_URL}job-application-list?type=${radioSelection}`);

      setFilteredData(response.data.data);
      
  

      console.log('jobapllication data list', response.data.data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      setFilteredData([]);
    } finally {
      // setLoading(false);
    }
    
  };
 
  useEffect(()=>{ 
    if(radioSelection==='inhouse'){   
      getJobApplications(radioSelection);
    } 
  },[radioSelection]);
 
  

  console.log("filterdata",filteredData);
 

  useEffect(() => {
    if (jobId) {
      getAssigneeData();
    }
  }, [jobId]);


  const handleInputEmail = (e, index) => {
    let data = [...complianceTeamEmail];
    data[index][e.target.name] = e.target.value;
    setComplianceTeamEmail(data);
  };

  const handleNewField = (e) => {
    let newData = {
      email: "",
    };
    setComplianceTeamEmail([...complianceTeamEmail, newData]);
  };

  const handleDelete = (e, index) => {
    let data = [...complianceTeamEmail];
    data.splice(index, 1);
    setComplianceTeamEmail(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();

      formdata.append("employeeCode", `${userData?.employeeCode}`);
      formdata.append("location", `${userData?.location}`);
      formdata.append("salaryType", `${userData?.salaryType}`);
      formdata.append("name", `${userData?.name}`);
      formdata.append("state", `${userData?.state}`);
      formdata.append("designation", `${userData?.designation}`);
      formdata.append("effectiveDate", `${userData?.effectiveDate}`);
      formdata.append("dateOfJoining", `${userData?.dateOfJoining}`);
      formdata.append("ctc", `${userData?.ctc}`);
      formdata.append("basicMonthly", `${fixedEarning?.basicMonthly}`);
      formdata.append("basicAnnual", `${fixedEarning?.basicAnnual}`);
      formdata.append("hrmMonthly", `${fixedEarning?.hrmMonthly}`);
      formdata.append("hrmAnnual", `${fixedEarning?.hrmAnnual}`);
      formdata.append(`specialMonthly`, `${fixedEarning?.specialMonthly}`);
      formdata.append("spciealAnnual", fixedEarning?.spciealAnnual);
      formdata.append("pfMonthly", deduction?.pfMonthly);
      formdata.append("pfAnnually", deduction?.pfAnnually);
      formdata.append("pTaxMonthly", deduction?.pTaxMonthly);
      formdata.append("pTaxAnnually", deduction?.pTaxAnnually);
      formdata.append(
        "totalDeductionMonthly",
        deduction?.totalDeductionMonthly
      );
      formdata.append(
        "totalDeductionAnnually",
        deduction?.totalDeductionAnnually
      );
      formdata.append("pfEMonthly", employeeContribution?.pfEMonthly);
      formdata.append("pfEAnnually", employeeContribution?.pfEAnnually);
      formdata.append("pfAMonthly", employeeContribution?.pfAMonthly);
      formdata.append("pfAAnnually", employeeContribution?.pfAAnnually);
      formdata.append(
        "eStateInsuranceMonthly",
        employeeContribution?.eStateInsuranceMonthly
      );
      formdata.append(
        "eStateInsuranceAnnually",
        employeeContribution?.eStateInsuranceAnnually
      );
      formdata.append("gratuityMonthly", otherBenefits?.gratuityMonthly);
      formdata.append("retension", otherBenefits?.retension);
      formdata.append("retensionBonus", otherBenefits?.retensionBonus);
      formdata.append("gratuityAnnually", otherBenefits?.gratuityAnnually);
      formdata.append("ltaMonthly", otherBenefits?.ltaMonthly);
      formdata.append("ltaAnnually", otherBenefits?.ltaAnnually);
      formdata.append("insuranceMonthly", otherBenefits?.insuranceMonthly);
      formdata.append("insuranceAnnually", otherBenefits?.insuranceAnnually);
      formdata.append("fixedCtcMonthly", otherBenefits?.fixedCtcMonthly);
      formdata.append("fixedCtcAnnually", otherBenefits?.fixedCtcAnnually);
      formdata.append("totalCTC", totalCTC);
      formdata.append("netTakeHome", netTakeHome);
      formdata.append("grossAmount", grossAmount);
      for (let i = 0; i < complianceTeamEmail?.length; i++) {
        formdata.append(
          `complayers[${i}][email]`,
          complianceTeamEmail[i].email
        );
      }
      //   formdata.append('pTaxMonthly', deduction?.pTaxMonthly)
      //   formdata.append('pfEMonthly', deduction?.t)
      const request = await axios.postForm(
        `${process.env.REACT_APP_API_URL}salarycreate/${id}`,
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
        setTimeout(() => navigate("/admin/salary"), 4000);
        clearTimeout();
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

  //   console.log("other benefits",otherBenefits)
  //   const total = fixedEarning.reduce((x,y)=>x+y?.basicMonthly+y?.hrmMonthly+y?.specialMonthly,0)

  useEffect(() => {
    const { basicMonthly, specialMonthly, hrmMonthly } = fixedEarning;
    const { hrmAnnual, basicAnnual, spciealAnnual } = fixedEarning;
    const total =
      parseInt(basicMonthly) + parseInt(specialMonthly) + parseInt(hrmMonthly);
    const totalAnnual =
      parseInt(hrmAnnual) + parseInt(basicAnnual) + parseInt(spciealAnnual);
    // console.log("total",total)
    setGrossAmount(total);
    setGrossAmountAnnually(totalAnnual);
  }, [fixedEarning]);

  useEffect(() => {
    const { pfMonthly, pTaxMonthly, totalDeductionMonthly } = deduction;
    const { pTaxAnnually, totalDeductionAnnually, pfAnnually } = deduction;
    const total =
      parseInt(pTaxMonthly) +
      parseInt(totalDeductionMonthly) +
      parseInt(pfMonthly);
    const totalAnnual =
      parseInt(pTaxAnnually) +
      // parseInt(totalDeductionAnnually) +
      parseInt(pfAnnually);
    console.log("lin 385 total",totalAnnual)
    setNetTakeHome(total);
    setNetTakeHomeAnnually(totalAnnual);
  }, [deduction]);

  useEffect(() => {
    const { gratuityMonthly,retension, fixedCtcMonthly, ltaMonthly, insuranceMonthly } =
      otherBenefits;
    const {
      gratuityAnnually,
      fixedCtcAnnually,
      retensionBonus,
      ltaAnnually,
      insuranceAnnually,
    } = otherBenefits;
    const total =
      parseInt(fixedCtcMonthly) +
      parseInt(gratuityMonthly) +
      parseInt(retension) +

      parseInt(ltaMonthly) +
      parseInt(insuranceMonthly);
    const totalAnnual =
      parseInt(gratuityAnnually) +
      parseInt(retensionBonus) +
      parseInt(fixedCtcAnnually) +
      parseInt(ltaAnnually) +
      parseInt(insuranceAnnually);
    console.log("total",total)
    setTotalCtc(total);
    setTotalCtcAnnually(totalAnnual );
  }, [otherBenefits]);
 
  return (
    // <div>Esic</div>

    <div className="py-3" style={{ background: "#f3f8f7" }}>
      <ToastContainer position="top-center" />
      <div className=" mx-4 ">
        <label >
          <input
            type="radio"
            value="inhouse"
            name="btn"
            checked={radioSelection === "inhouse"}
            onChange={() => {
              setRadioSelection("inhouse");
           
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
            }}
          />
          <span className='px-1 font-medium text-lg '>Project</span>
        </label>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-4 shadow-lg rounded-lg my-5 mx-auto gap-4 w-9/12`}
      >
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-2 ">
          {radioSelection==='onsite' && (
            <div className="col-span-1 px-2 my-1">
            <h2 className={`font-medium`}>PID</h2>
            <Select
              isClearable
              options={
                listForm && listForm.length > 0
                  ? listForm?.map((options) => ({
                      value: options?.id,
                      label: options?.pid,
                      jobrecruitmentData: options?.jobrecruitment,
                    }))
                  : [{ value: "", label: "Please refresh page" }]
              }
              onChange={(e) => {
                setJobId(e?.value ? e?.value : "");
                setJobRecruitmentData(
                  e?.jobrecruitmentData ? e?.jobrecruitmentData : ""
                );
              }}
              isDisabled={radioSelection === "inhouse"} 

              className="shadow appearance-none border rounded mt-1 w-full text-black"
            />
          </div>
          )}
          
          <div className="col-span-1 px-2 my-1">
            <h2 className="font-medium">Location</h2>
          
   <Select
    isClearable
    options={
      radioSelection === 'onsite'
        ? jobrecruitmentData?.length > 0
          ? jobrecruitmentData?.map((options) => ({  
            
              value: options?.id,
              label: options?.location,
            }))
          : [{ value: "", label: "please select PID" }]
        : filteredData?.length > 0
          ? filteredData?.map((options) => ({
              value: options?.id,
              label: options?.recruitment?.location,
            }))
          : [{ value: "", label: "" }]
    }
    onChange={(e) => {
      const selectedLabel = e ? e.label : "";
      setUserData({ ...userData, location: selectedLabel  });
      // setId(e.value);

      setId(e ? e.value : "");

    }}
   

    className="shadow appearance-none border rounded mt-1 w-full text-black"
  />
          
          
          </div>
          <div className="w-full px-2 my-1">
            <label className="font-medium w-3/6">Salary Type:</label>
            <select
              onChange={handleChange}
              name="salaryType"
              id="salaryType"
              value={userData?.salaryType}
              className="shadow  border rounded mt-1 w-full p-2 text-black"
            >
              <option>Choose Salary Type</option>
              <option value={"esic"}>ESIC</option>
              <option value={"lta"}>LTA</option>
            </select>
            {/* <input type="text" name="" className="shadow appearance-none border rounded mt-1 w-full p-2 text-black" placeholder="Name" /> */}
          </div>
          <div className="w-full  my-1 px-2">
            <h2 className="font-medium">Name:</h2>
            <Select
              isClearable
              options={
                filteredData?.length > 0
                  ? filteredData?.map((options) => ({
                      value: options?.id,
                      label: options?.full_name,
                    }))
                  : [{ value: "", label: "" }]
              }
              onChange={(e) => {
                const selectedLabel = e ? e.label : "";

                setUserData({ ...userData, name: selectedLabel });
                // setId(e.value);
                setId(e ? e.value : "");

              }}
              className="shadow appearance-none border rounded mt-1 w-full text-black"
            />
          </div>
          <div className="w-full my-1 px-2">
            <label className="font-medium w-3/6">Employee Code: </label>
            <input
              type="text"
              onChange={handleChange}
              name="employeeCode"
              id="employeeCode"
              value={userData?.employeeCode}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="Employee Code"
            />
          </div>
          <div className="w-full my-1 px-2">
            <label className="font-medium w-3/6">State: </label>
            <input
              type="text"
              onChange={textChange}
              name="state"
              id="state"
              value={userData?.state}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="State"
            />
          </div>
          <div className="w-full my-1 px-2">
            <label className="font-medium w-3/6">Designation: </label>
            <input
              type="text"
              onChange={textChange}
              name="designation"
              id="designation"
              value={userData?.designation}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="Designation"
            />
          </div>
          <div className="w-full my-1 px-2">
            <label className="font-medium w-3/6">Effective Date: </label>
            <input
              type="date"
              onChange={handleChange}
              name="effectiveDate"
              id="effectiveDate"
              value={userData?.effectiveDate}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="Effective Date"
            />
          </div>
          <div className="w-full my-1 px-2">
            <label className="font-medium w-3/6">Date of Joining: </label>
            <input
              type="date"
              onChange={handleChange}
              name="dateOfJoining"
              id="dateOfJoining"
              value={userData?.dateOfJoining}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="Date of Joining"
            />
          </div>
          <div className="w-full my-1 px-2">
            <label className="font-medium w-3/6">
              CTC (₹) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              required
              //  max={userData?.salaryType === "esic" ? '251999' : false}
              value={userData?.ctc}
              name="ctc"
              id="ctc"
              onChange={handleChange}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="Cost to the Company"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 w-full my-5  ">
          <div className="text-center py-3">
            <span className="text-xl font-medium mb-3 text-center py-4">
              FIXED EARNINGS
            </span>
          </div>
          <div className="w-full">
            <div className="">
              <div className="w-full">
                <div className="border-b border-gray-200 shadow">
                  <table className="w-full divide-gray-300 overflow-y-auto">
                    <thead className="bg-gray-50 w-full divide-y">
                      <tr>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          SALARY COMPONENTS
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Monthly
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Annual
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      <tr className="whitespace-nowrap ">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Basic
                          </label>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="basicMonthly"
                              id="basicMonthly"
                              value={fixedEarning?.basicMonthly}
                              onChange={handleFixedEarning}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="basicAnnual"
                              id="basicAnnual"
                              value={fixedEarning?.basicAnnual}
                              onChange={handleFixedEarning}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            HRA
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="hrmMonthly"
                              id="hrmMonthly"
                              onChange={handleFixedEarning}
                              value={fixedEarning?.hrmMonthly}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="hrmAnnual"
                              id="hrmAnnual"
                              onChange={handleFixedEarning}
                              value={fixedEarning?.hrmAnnual}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Special Allowance
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="specialMonthly"
                              id="specialMonthly"
                              onChange={handleFixedEarning}
                              value={fixedEarning?.specialMonthly}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="spciealAnnual"
                              id="spciealAnnual"
                              onChange={handleFixedEarning}
                              value={fixedEarning?.spciealAnnual}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-gray-50 w-full">
                      <tr>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Gross Amount
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          {grossAmount}
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          {grossAmountAnnually}
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 w-full my-5  ">
          <div className="text-center py-3">
            <span className="text-xl font-medium mb-3 text-center py-4">
              DEDUCTIONS
            </span>
          </div>
          <div className="w-full">
            <div className="">
              <div className="w-full">
                <div className="border-b border-gray-200 shadow">
                  <table className="w-full divide-gray-300 overflow-y-auto">
                    <thead className="bg-gray-50 w-full">
                      <tr>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          SALARY COMPONENTS
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Monthly
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Annual
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Provident Fund (Employee Contribution)
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="pfMonthly"
                              id="pfMonthly"
                              onChange={handleDeduction}
                              value={deduction?.pfMonthly}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="pfAnnually"
                              id="pfAnnually"
                              onChange={handleDeduction}
                              value={deduction?.pfAnnually}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Employees State Insurance(Employees Contribution)/LWF
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="pTaxMonthly"
                              id="pTaxMonthly"
                              onChange={handleDeduction}
                              value={deduction?.pTaxMonthly}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="pTaxAnnually"
                              id="pTaxAnnually"
                              onChange={handleDeduction}
                              value={deduction?.pTaxAnnually}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                      {/* <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Total Deduction
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="totalDeductionMonthly"
                              id="totalDeductionMonthly"
                              onChange={handleDeduction}
                              value={deduction?.totalDeductionMonthly}
                              className="shadow font-medium appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="totalDeductionAnnually"
                              id="totalDeductionAnnually"
                              onChange={handleDeduction}
                              value={deduction?.totalDeductionAnnually}
                              className="shadow font-medium appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr> */}
                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Total Deduction
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="totalDeductionMonthly"
                              id="totalDeductionMonthly"
                             // onChange={handleDeduction}
                              value={netTakeHome}
                              className="shadow font-medium appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="totalDeductionAnnually"
                              id="totalDeductionAnnually"
                             // onChange={handleDeduction}
                              value={netTakeHomeAnnually}
                              className="shadow font-medium appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-gray-50 w-full">
                      {/* <tr>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Net Take Home (Gross -Total Deduction)*
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          {netTakeHome}
                          {netTakeHomeSalary}
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          {netTakeHomeAnnually}
                        </th>
                      </tr> */}
                      <tr>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Net Take Home (Gross -Total Deduction)*
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                        {netannual}
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                        {netmonth}
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 w-full my-5  ">
          <div className="text-center py-3">
            <span className="text-xl font-medium mb-3 text-center py-4">
              EMPLOYERS CONTRIBUTION{" "}
            </span>
          </div>
          <div className="w-full">
            <div className="">
              <div className="w-full">
                <div className="border-b border-gray-200 shadow">
                  <table className="w-full divide-gray-300 overflow-y-auto">
                    <thead className="bg-gray-50 w-full">
                      <tr>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          SALARY COMPONENTS
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Monthly
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Annual
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Provident Fund (Employer Contribution)
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="pfEMonthly"
                              id="pfEMonthly"
                              onChange={handleEmployeeContribution}
                              value={employeeContribution?.pfEMonthly}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="pfEAnnually"
                              id="pfEAnnually"
                              onChange={handleEmployeeContribution}
                              value={employeeContribution?.pfEAnnually}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Provident Fund (Administration)/LWF
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="pfAMonthly"
                              id="pfAMonthly"
                              onChange={handleEmployeeContribution}
                              value={employeeContribution?.pfAMonthly}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="pfAAnnually"
                              id="pfAAnnually"
                              onChange={handleEmployeeContribution}
                              value={employeeContribution?.pfAAnnually}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Employees State Insurance (Employer Contribution)
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="eStateInsuranceMonthly"
                              id="eStateInsuranceMonthly"
                              onChange={handleEmployeeContribution}
                              value={
                                employeeContribution?.eStateInsuranceMonthly
                              }
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="eStateInsuranceAnnually"
                              id="eStateInsuranceAnnually"
                              onChange={handleEmployeeContribution}
                              value={
                                employeeContribution?.eStateInsuranceAnnually
                              }
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    {/* <tfoot className="bg-gray-50 w-full">
                                          <tr>
                                              <th className="px-6 py-2 text-xs text-gray-600">
                                                  TOTAL CTC (Cost to the Company)
                                              </th>
                                              <th className="px-6 py-2 text-xs text-gray-600">
                                                 
                                              </th>
                                              <th className="px-6 py-2 text-xs text-gray-600">
                                                  0.00
                                              </th>

                                          </tr>
                                      </tfoot> */}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 w-full my-5  ">
          <div className="text-center py-3">
            <span className="text-xl font-medium mb-3 text-center py-4">
              OTHER BENEFITS{" "}
            </span>
          </div>
          <div className="w-full">
            <div className="">
              <div className="w-full">
                <div className="border-b border-gray-200 shadow">
                  <table className="w-full divide-gray-300 overflow-y-auto">
                    <thead className="bg-gray-50 w-full">
                      <tr>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          SALARY COMPONENTS
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Monthly
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          Annual
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Gratuity**
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="gratuityMonthly"
                              id="gratuityMonthly"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.gratuityMonthly}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="gratuityAnnually"
                              id="gratuityAnnually"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.gratuityAnnually}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Retention Bonus 
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="retension"
                              id="retension"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.retension}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="retensionBonus"
                              id="retensionBonus"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.retensionBonus}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Leave Travel Assistance (LTA)****
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="ltaMonthly"
                              id="ltaMonthly"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.ltaMonthly}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="ltaAnnually"
                              id="ltaAnnually"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.ltaAnnually}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="whitespace-nowrap">
                        {/* <td className="px-6 py-4 text-sm text-gray-600">
                                                  <input type="text" name="" className="shadow appearance-none border rounded mt-1 w-full p-2 text-black" placeholder="Insurance/ Medi-claim" />
                                              </td> */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            Insurance/ Medi-claim
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="insuranceMonthly"
                              id="insuranceMonthly"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.insuranceMonthly}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="insuranceAnnually"
                              id="insuranceAnnually"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.insuranceAnnually}
                              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <label className="mt-1  w-full p-2 text-black">
                            FIXED CTC
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <input
                              type="number"
                              name="fixedCtcMonthly"
                              id="fixedCtcMonthly"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.fixedCtcMonthly}
                              className="shadow font-medium appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <input
                              type="number"
                              name="fixedCtcAnnually"
                              id="fixedCtcAnnually"
                              onChange={handleOtherBenefit}
                              value={otherBenefits?.fixedCtcAnnually}
                              className="shadow font-medium appearance-none border rounded mt-1 w-full p-2 text-black"
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                      {/* <tr className="whitespace-nowrap">
                                                <td className="px-6 py-4 text-sm text-gray-600" colSpan={2}>
                                                    <span className="  mt-1 w-full p-2 text-black  text-center" >Yearly Performance Incentive</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                  <div className="text-sm text-gray-900">
                                                      <span className="  mt-1 w-full p-2 text-black font-medium text-center" ></span>
                                                  </div>
                                              </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-600 text-center">
                                                        <span className="  mt-1 w-full p-2 text-black font-medium text-center" >0.00</span>
                                                    </div>
                                                </td>
                                            </tr> */}
                    </tbody>
                    <tfoot className="bg-gray-50 w-full">
                      <tr>
                        <th className="px-6 py-2 text-xs text-gray-600">
                          TOTAL CTC (Cost to the Company)
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-600"></th>
                        <th className="px-6 py-2 text-xs text-gray-600">
                         
                          {/* {netTakeHomeSalary} */}
                          {/* {otherBenefits?.fixedCtcAnnually} */}
                        {/* {fixedTotalamount} */}

                        <div className="text-sm text-gray-600">
              <input
                type="number"
                name="fixedCtcAnnually"
                id="fixedCtcAnnually"
                onChange={handleInputChangetotal}
                value={fixedTotalamount}
                className="shadow font-medium appearance-none border rounded mt-1 w-full p-2 text-black"
                placeholder="0"
              />
            </div>
                     
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 w-full my-5  ">
          <div className="text-center py-3">
            <span className="text-xl font-medium mb-3 text-center py-4">
              Compliance Team Emails
            </span>
          </div>
          <div className="col-span-1">
            <div className="grid grid-cols-2">
              {complianceTeamEmail &&
                complianceTeamEmail?.map((email, index) => (
                  <div key={index} className="w-full flex ">
                    <div className="w-full">
                      {/* <label className='mt-1  w-full p-2 py-1 text-black'>Email</label> */}
                      <div className="block w-full p-2 py-1">
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          className="shadow font-medium appearance-none border rounded mt-1 w-full p-2 text-black"
                          value={complianceTeamEmail[index]?.email}
                          onChange={(e) => handleInputEmail(e, index)}
                        />
                      </div>
                    </div>
                    {index === complianceTeamEmail.length - 1 ? (
                      <div className="flex items-end py-2">
                        <button
                          onClick={() => handleNewField()}
                          className=" text-green-500 delay-100 duration-100 hover:text-green-600 "
                        >
                          <FiPlusCircle size={26} />
                        </button>
                      </div>
                    ) : null}
                    {index < complianceTeamEmail.length - 1 ? (
                      <div className="flex items-end py-2">
                        <button
                          onClick={() => handleDelete()}
                          className=" text-red-500 delay-100 duration-100 hover:text-red-600 "
                        >
                          <RiDeleteBin4Fill size={26} />
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="space-y-2 col-span-2 py-3 px-2">
          <button
            type="submit"
            className="inline-block rounded-full border-2 border-emerald-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalary;
