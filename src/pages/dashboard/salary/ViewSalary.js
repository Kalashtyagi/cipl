import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin4Fill } from "react-icons/ri";
import logo from "../../../assets/logo.png";

const ViewSalary = ({ setShowSalary, getDataId }) => {
  const [jobId, setjobId] = useState("");
  const [listForm, setListForm] = useState();
  const [filteredData, setFilteredData] = useState("");
  const { pathname } = useLocation();
  const [data, setData] = useState();
  const[netmonth,setNetmonth]= useState(0);
  const[netannual,setNetAnnual]=useState(0)
  const newPath = pathname.replace("/viewsalary/", "");
  // console.log('pathname',newPath)

  const getSalaryData = async () => {
    const request = await axios.get(
      `${process.env.REACT_APP_API_URL}salaryget/${getDataId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const response = await request?.data;
    console.log("response", response?.data[0]);
    if (response?.code === 200) {
      setData(response?.data[0]);
    }
  };

  useEffect(() => {
    getSalaryData();
  }, [pathname]);

  console.log("data DETAILSD", data);
  useEffect(() => {
    if (data) {
      setUserData({
        ...userData,
        salaryType: data && data?.salaryType,
        name: data && data?.name,
        employeeCode: data && data?.employeeCode,
        state: data && data?.state,
        designation: data && data?.designation,
        effectiveDate: data && data?.effectiveDate,
        dateOfJoining: data && data?.dateOfJoining,
        ctc: data && data?.ctc,
      });
      setFixedEarning({
        ...fixedEarning,
        basicAnnual: data && data?.basicAnnual,
        basicMonthly: data && data?.basicMonthly,
        hrmAnnual: data && data?.hrmAnnual,
        hrmMonthly: data && data?.hrmMonthly,
        specialMonthly: data && data?.specialMonthly,
        spciealAnnual: data && data?.spciealAnnual,
      });
      setDeduction({
        ...deduction,
        pfAnnually: data && data?.pfAnnually,
        pfMonthly: data && data?.pfMonthly,
        pTaxAnnually: data && data?.pTaxAnnually,
        pTaxMonthly: data && data?.pTaxMonthly,
        totalDeductionAnnually: data && data?.totalDeductionAnnually,
        totalDeductionMonthly: data && data?.totalDeductionMonthly,
      });
      setEmployeeContribution({
        ...employeeContribution,
        pfAAnnually: data && data?.pfAAnnually,
        pfAMonthly: data && data?.pfAMonthly,
        pfEAnnually: data && data?.pfEAnnually,
        pfEMonthly: data && data?.pfEMonthly,
        eStateInsuranceAnnually: data && data?.eStateInsuranceAnnually,
        eStateInsuranceMonthly: data && data?.eStateInsuranceMonthly,
      });
      setOtherBenefits({
        ...otherBenefits,
        gratuityAnnually: data && data?.gratuityAnnually,
        gratuityMonthly: data && data?.gratuityMonthly,
        ltaAnnually: data && data?.ltaAnnually,
        ltaMonthly: data && data?.ltaMonthly,
        insuranceAnnually: data && data?.insuranceAnnually,
        insuranceMonthly: data && data?.insuranceMonthly,
        fixedCtcAnnually: data && data?.fixedCtcAnnually,
        fixedCtcMonthly: data && data?.fixedCtcMonthly,
      });
      setId(data?.id);
    }
  }, [data]);

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
    retension:0,
    retensionBonus:0,
    gratuityMonthly: 0,
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

  // console.log("userdata",userData)

  const closePopup = () => {
    setShowSalary(false);
  };

  const handleFixedEarning = (e) => {
    setFixedEarning({
      ...fixedEarning,
      [e.target.name]: parseInt(e.target.value),
    });
  };

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

  const handleOtherBenefit = (e) => {
    console.log("input values", e.target.name);
    setOtherBenefits({
      ...otherBenefits,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  // useEffect(() => {
  //     setUserData({ ...userData, designation: state?.job?.degination, name: state?.full_name })
  // }, [state])

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
    // console.log('List api response',apiResonse)
    if (apiResonse) {
      setListForm(apiResonse.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getAssigneeData = async () => {
    // console.log("Jobd ID",jobId)
    if (jobId !== "" || null || undefined) {
      const formData = new FormData();
      formData.append("location", userData?.location);
      //   formData.append('project_manager',hodSearch)
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
      //   console.log("Assignee Data",response)
      if (response) {
        setFilteredData(response?.data);
      }
    }
    if (jobId === "" || null || undefined) {
      toast.error("Please Select PID");
    }
  };

  useEffect(() => {
    if (jobId) {
      getAssigneeData();
    }
  }, [jobId]);

  useEffect(() => {
    fixedEarning.basicAnnual = fixedEarning.basicMonthly * 12;
    fixedEarning.hrmAnnual = fixedEarning.hrmMonthly * 12;
    fixedEarning.spciealAnnual = fixedEarning.specialMonthly * 12;

    console.log("line 254", fixedEarning);
  }, [fixedEarning]);

  useEffect(() => {
    deduction.pTaxAnnually = deduction.pTaxMonthly * 12;
    deduction.pfAnnually = deduction.pfMonthly * 12;
    deduction.totalDeductionAnnually = deduction.totalDeductionMonthly * 12;
  }, [deduction]);

  useEffect(()=>{
    const TotalnettakehomeMonth= parseInt(grossAmountAnnually)-parseInt(netTakeHomeAnnually)
    console.log('line 270',TotalnettakehomeMonth)
    const TotanetakehomeAnnual=parseInt(grossAmount)-parseInt(netTakeHome)
    setNetmonth(TotalnettakehomeMonth)
    setNetAnnual(TotanetakehomeAnnual)
     
     })

  useEffect(() => {
    employeeContribution.pfEAnnually =( employeeContribution.pfEMonthly) * 12;
    employeeContribution.pfAAnnually = (employeeContribution.pfAMonthly )* 12;
    employeeContribution.eStateInsuranceAnnually =
      (employeeContribution.eStateInsuranceMonthly) * 12;
  }, [employeeContribution]);

  useEffect(() => {
    otherBenefits.gratuityAnnually = (otherBenefits.gratuityMonthly) * 12;
    otherBenefits.insuranceAnnually = (otherBenefits.insuranceMonthly) * 12;
    otherBenefits.ltaAnnually = (otherBenefits.ltaMonthly) * 12;
    otherBenefits.fixedCtcAnnually = (otherBenefits.fixedCtcMonthly)* 12;
    otherBenefits.retensionBonus= (otherBenefits.retension)*12;
  }, [otherBenefits]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const formdata = new FormData();
      console.log("formdata");

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
      formdata.append("pTaxMonthly", deduction?.pTaxMonthly);
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
      formdata.append("retension", otherBenefits?.retension);
      formdata.append("retensionBonus", otherBenefits?.retensionBonus);
      console.log("datasubmit");
      console.log(process.env.REACT_APP_API_URL);
      //   formdata.append('pTaxMonthly', deduction?.pTaxMonthly)
      //   formdata.append('pfEMonthly', deduction?.t)
      const request = await axios.postForm(
        `${process.env.REACT_APP_API_URL}salaryupdate/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      console.log(request.data);
      const response = await request?.data;
      console.log(response);
      if (response?.code === 200) {
        console.log(response);
        toast.success(`${response?.message}`);
        // window.open("about:blank", "_self");
        // window.close();

        // setShowAddModal(false)
        setShowSalary(false);
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
      // parseInt(totalDeductionMonthly) +
      parseInt(pfMonthly);
    const totalAnnual =
      parseInt(pTaxAnnually) +
      parseInt(totalDeductionAnnually) +
      parseInt(pfAnnually);
    console.log("412 total",totalAnnual)
    setNetTakeHome(total);
    setNetTakeHomeAnnually(totalAnnual);
  }, [deduction]);


  useEffect(() => {
    const { gratuityMonthly, retension, fixedCtcMonthly, ltaMonthly, insuranceMonthly } =
      otherBenefits;
    const {
      retensionBonus,
      gratuityAnnually,
      fixedCtcAnnually,
      ltaAnnually,
      insuranceAnnually,
    } = otherBenefits;
    const total =
      parseInt(fixedCtcMonthly) +
      parseInt(retension) +
      parseInt(retensionBonus) +
      parseInt(gratuityMonthly) +
      parseInt(ltaMonthly) +
      parseInt(insuranceMonthly);
    const totalAnnual =
      parseInt(gratuityAnnually) +
      parseInt(fixedCtcAnnually) +
      parseInt(ltaAnnually) +
      parseInt(insuranceAnnually);
    // console.log("total",total)
    setTotalCtc(total);
    setTotalCtcAnnually(totalAnnual);
  }, [otherBenefits]);


  
  const fixedTotalamount = 
  (Number(fixedEarning.basicAnnual || 0) + Number(fixedEarning.hrmAnnual || 0) + Number(fixedEarning.spciealAnnual || 0)) +
  (Number(employeeContribution.pfEAnnually || 0) + Number(employeeContribution.pfAAnnually || 0) + Number(employeeContribution.eStateInsuranceAnnually || 0)) +
  (Number(otherBenefits.gratuityAnnually || 0) + Number(otherBenefits.insuranceAnnually || 0) + Number(otherBenefits.ltaAnnually || 0) + Number(otherBenefits.fixedCtcAnnually || 0) + Number(otherBenefits.retensionBonus || 0));

  console.log("data 428", data && data?.jobapplication?.job?.erf_id);

  return (
    // <div>Esic</div>

    <div className="w-full p-4 pt-2">
      <ToastContainer position="top-center" />
      {/* <div className=' bg-primary w-full py-3 flex'>
                <img src={logo} className='w-44 h-12 mx-4' />
            </div> */}
      <form
        onSubmit={handleSubmit}
        className={`bg-white border-gray-200 border w-full p-4 shadow-lg rounded-lg my-5 mx-auto gap-4 `}
      >
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-2 ">
          {/* <div className='col-span-1 px-2 my-1'>
                        <h2 className={`font-medium`}>PID</h2>
                        <Select
                            isDisabled
                            value={[{ label: data && data[0]?.jobapplication?.job?.erf_id }]}
                            className='shadow appearance-none border rounded mt-1 w-full text-black'
                        />
                    </div>
                    <div className='col-span-1 px-2 my-1'>
                        <h2 className='font-medium'>Location</h2>
                        <Select
                            isDisabled
                            value={[{ label: data && data[0]?.jobapplication?.address }]}
                            className='shadow appearance-none border rounded mt-1 w-full text-black'
                        />
                    </div> */}
          <div className="col-span-1 px-2 my-1">
            <label className="font-medium">Salary Type:</label>
            <select
              disabled
              name="salaryType"
              id="salaryType"
              value={userData?.salaryType}
              className="shadow bg-gray-100 border rounded mt-1 w-full p-2 text-black"
            >
              <option>Choose Salary Type</option>
              <option value={"esic"}>ESIC</option>
              <option value={"lta"}>LTA</option>
            </select>
            {/* <input type="text" name="" className="shadow appearance-none border rounded mt-1 w-full p-2 text-black" placeholder="Name" /> */}
          </div>
          <div className="my-1 px-2">
            <h2 className="font-medium">Name:</h2>
            <Select
              isDisabled
              value={[{ label: userData?.name }]}
              className="shadow appearance-none border rounded mt-1 w-full text-black"
            />
          </div>
          <div className="my-1 px-2">
            <label className="font-medium w-3/6">Employee Code: </label>
            <input
              type="text"
              disabled
              name="employeeCode"
              id="employeeCode"
              value={userData?.employeeCode}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="Employee Code"
            />
          </div>
          <div className="my-1 px-2">
            <label className="font-medium w-3/6">State: </label>
            <input
              type="text"
              disabled
              name="state"
              id="state"
              value={userData?.state}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="State"
            />
          </div>
          <div className="my-1 px-2">
            <label className="font-medium w-3/6">Designation: </label>
            <input
              type="text"
              disabled
              name="designation"
              id="designation"
              value={userData?.designation}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="Designation"
            />
          </div>
          <div className="my-1 px-2">
            <label className="font-medium w-3/6">Effective Date: </label>
            <input
              type="date"
              disabled
              name="effectiveDate"
              id="effectiveDate"
              value={userData?.effectiveDate}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="Effective Date"
            />
          </div>
          <div className="my-1 px-2">
            <label className="font-medium w-3/6">Date of Joining: </label>
            <input
              type="date"
              disabled
              name="dateOfJoining"
              id="dateOfJoining"
              value={userData?.dateOfJoining}
              className="shadow appearance-none border rounded mt-1 w-full p-2 text-black"
              placeholder="Date of Joining"
            />
          </div>
          <div className="my-1 px-2">
            <label className="font-medium w-3/6">CTC (₹) </label>
            <input
              type="number"
              //  max={userData?.salaryType === "esic" ? '251999' : false}
              value={userData?.ctc}
              disabled
              name="ctc"
              id="ctc"
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
                            Employees State Insurance (Employee Contribution)/LWF
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
                            Provident Fund (Administration)
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
                            Employees State Insurance (Employer Contribution/LWF)
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
                          {/* {otherBenefits?.fixedCtcAnnually} */}
                          {fixedTotalamount}
                          
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="space-y-2 col-span-2 py-3 px-2">
                    <button
                        type="submit"
                        className="inline-block mr-1 rounded-full border-2 border-emerald-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init>
                        Approve
                    </button>
                    <button
                        type="submit"
                        className="inline-block mx-1 rounded-full border-2 border-amber-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-amber-700 transition duration-150 ease-in-out hover:border-amber-600 hover:bg-amber-500 hover:bg-opacity-10 hover:text-amber-600 focus:border-primary-600 focus:text-amber-600 focus:outline-none focus:ring-0 active:border-amber-700 active:text-amber-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init>
                        Hold
                    </button>
                    <button
                        type="submit"
                        className="inline-block mx-1 rounded-full border-2 border-red-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-red-700 transition duration-150 ease-in-out hover:border-red-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-red-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-red-700 active:text-red-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init>
                        Reject
                    </button>
                    <button
                        type="submit"
                        className="inline-block ml-1 rounded-full border-2 border-indigo-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-indigo-700 transition duration-150 ease-in-out hover:border-indigo-600 hover:bg-indigo-500 hover:bg-opacity-10 hover:text-indigo-600 focus:border-indigo-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init>
                        Re Nego.
                    </button>
                </div> */}

        <div className="space-y-2 col-span-2 py-3 px-2">
          <button
            type="submit"
            className="inline-block rounded-full border-2 border-emerald-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            Save
          </button>
          <button
            type="submit"
            className="ml-12 inline-block rounded-full border-2 border-emerald-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
            onClick={closePopup}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewSalary;
