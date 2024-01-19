import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin4Fill } from "react-icons/ri";
import logo from "../../assets/logo.png";
import Swal from 'sweetalert2'


const SalaryVerification = () => {
  const [jobId, setJobId] = useState("");
  const [listForm, setListForm] = useState();
  const [filteredData, setFilteredData] = useState("");
  const { pathname } = useLocation();
  const [data, setData] = useState();
  const newPath = pathname.replace("/salaryverification/", "");
  const[netmonth,setNetmonth]= useState(0);
  const[netannual,setNetAnnual]=useState(0);
  const [fixedTotalamount, setFixedTotalamount] = useState(0);
  const [showModalId,setShowModalId] = useState('')

  // console.log('pathname',newPath)
  const navigate=useNavigate()

  const getSalaryData = async () => {
    const request = await axios.get(
      `${process.env.REACT_APP_API_URL}salaryverification/${newPath}`
    );
    const response = await request?.data;
    console.log("get slaary line 26", response);
    if (response?.code === 200) {
      setData(response?.data);
      console.log('29',response?.data)
    }
  };

  useEffect(() => {
    getSalaryData();
  }, [pathname]);

  useEffect(() => {
    if (data) {
      setUserData({
        ...userData,
        salaryType: data && data[0]?.salarycreation?.salaryType,
        name: data && data[0]?.salarycreation?.name,
        employeeCode: data && data[0]?.salarycreation?.employeeCode,
        state: data && data[0]?.salarycreation?.state,
        designation: data && data[0]?.salarycreation?.designation,
        effectiveDate: data && data[0]?.salarycreation?.effectiveDate,
        dateOfJoining: data && data[0]?.salarycreation?.dateOfJoining,
        ctc: data && data[0]?.salarycreation?.ctc,
      });
      setFixedEarning({
        ...fixedEarning,
        basicAnnual: data && data[0]?.salarycreation?.basicAnnual,
        basicMonthly: data && data[0]?.salarycreation?.basicMonthly,
        hrmAnnual: data && data[0]?.salarycreation?.hrmAnnual,
        hrmMonthly: data && data[0]?.salarycreation?.hrmMonthly,
        specialMonthly: data && data[0]?.salarycreation?.specialMonthly,
        spciealAnnual: data && data[0]?.salarycreation?.spciealAnnual,
      });

    

     

      setDeduction({
        ...deduction,
        pfAnnually: data && data[0]?.salarycreation?.pfAnnually,
        pfMonthly: data && data[0]?.salarycreation?.pfMonthly,
        pTaxAnnually: data && data[0]?.salarycreation?.pTaxAnnually,
        pTaxMonthly: data && data[0]?.salarycreation?.pTaxMonthly,
        totalDeductionAnnually:
          data && data[0]?.salarycreation?.totalDeductionAnnually,
        totalDeductionMonthly:
          data && data[0]?.salarycreation?.totalDeductionMonthly,
      });

      console.log("line no.83", {
        ...deduction,
        pfAnnually: data && data[0]?.salarycreation?.pfAnnually,
        pfMonthly: data && data[0]?.salarycreation?.pfMonthly,
        pTaxAnnually: data && data[0]?.salarycreation?.pTaxAnnually,
        pTaxMonthly: data && data[0]?.salarycreation?.pTaxMonthly,
        totalDeductionAnnually:
          data && data[0]?.salarycreation?.totalDeductionAnnually,
        totalDeductionMonthly:
          data && data[0]?.salarycreation?.totalDeductionMonthly,
      });

     

      setEmployeeContribution({
        ...employeeContribution,
        pfAAnnually: data && data[0]?.salarycreation?.pfAAnnually,
        pfAMonthly: data && data[0]?.salarycreation?.pfAMonthly,
        pfEAnnually: data && data[0]?.salarycreation?.pfEAnnually,
        pfEMonthly: data && data[0]?.salarycreation?.pfEMonthly,
        eStateInsuranceAnnually:
          data && data[0]?.salarycreation?.eStateInsuranceAnnually,
        eStateInsuranceMonthly:
          data && data[0]?.salarycreation?.eStateInsuranceMonthly,
      });
      setOtherBenefits({
        ...otherBenefits,
        gratuityAnnually: data && data[0]?.salarycreation?.gratuityAnnually,
        gratuityMonthly: data && data[0]?.salarycreation?.gratuityMonthly,
        ltaAnnually: data && data[0]?.salarycreation?.ltaAnnually,
        ltaMonthly: data && data[0]?.salarycreation?.ltaMonthly,
        insuranceAnnually: data && data[0]?.salarycreation?.insuranceAnnually,
        insuranceMonthly: data && data[0]?.salarycreation?.insuranceMonthly,
        fixedCtcAnnually: data && data[0]?.salarycreation?.fixedCtcAnnually,
        fixedCtcMonthly: data && data[0]?.salarycreation?.fixedCtcMonthly,
        retensionBonus:data && data[0]?.salarycreation?.retensionBonus,
        retension:data && data[0]?.salarycreation?.retension
      });
      setId(data[0]?.salarycreation?.id);
      // setJobId(data[0]?.salarycreation?.id)
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

  const otherBenefit= {
    gratuityMonthly: 0,
    gratuityAnnually: 0,
    retension:0,
    retensionBonus:0,
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
  const [employeeContribution, setEmployeeContribution] =useState(employerContribution);
  const [otherBenefits, setOtherBenefits] = useState(otherBenefit);
  const [id, setId] = useState("");
  const [totalCTC, setTotalCtc] = useState(0);
  const [totalCtcAnnually, setTotalCtcAnnually] = useState(0);
  const [netTakeHome, setNetTakeHome] = useState(0);
  const [netTakeHomeAnnually, setNetTakeHomeAnnually] = useState(0);
  const [grossAmount, setGrossAmount] = useState(0);
  const [grossAmountAnnually, setGrossAmountAnnually] = useState(0);

  // console.log("userdata",userData)

  const handleFixedEarning = (e) => {
    setFixedEarning({
      ...fixedEarning,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleDeduction = (e) => {
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

  useEffect(() => {
    const total = (
      Number(fixedEarning.basicAnnual) + 
      Number(fixedEarning.hrmAnnual) + 
      Number(fixedEarning.spciealAnnual)
    ) + (
      Number(employeeContribution.pfEAnnually) + 
      Number(employeeContribution.pfAAnnually) +
      Number(employeeContribution.eStateInsuranceAnnually)
    ) + (
      Number(otherBenefits.gratuityAnnually) +
      Number(otherBenefits.insuranceAnnually) +
      Number(otherBenefits.ltaAnnually) +
      Number(otherBenefits.fixedCtcAnnually) +
      Number(otherBenefits.retensionBonus)
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
      formdata.append("pTaxMonthly", deduction?.pTaxMonthly);
      formdata.append("pfAnnualy", deduction?.pfAnnually);
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
      formdata.append('retensionBonus',otherBenefits?.retensionBonus)
      formdata.append('retension',otherBenefits?.retension)
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
      formdata.append('status_id',15)
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
      const response = await request?.data;
      if (response?.code === 200) {
        toast.success(`${response?.message}`);
        // setTimeout(() => {
        //   window.open("about:blank", "_self");
        //   window.close();
        // }, 3000);
        // clearTimeout();
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


  const handleDeclined=(e)=>{
    // navigate('/admin/salary')
    e.preventDefault()
    Swal.fire({
      title:'Decline Salary',
      text:'Do you really want to reject employee?',
      icon:'info',
      confirmButtonText: 'Yes',
      denyButtonText:'Cancel',
      showDenyButton:true
  }).then(async(result)=>{
      if(result.isConfirmed){
          const { value: text } = await Swal.fire({
              input: 'textarea',
              inputLabel: 'Reason',
              inputPlaceholder: 'Type your reason here...',
              inputAttributes: {
                'aria-label': 'Type your Reason here'
              },
            })
            
            if (text) {
              console.log(text)
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
      formdata.append("pTaxMonthly", deduction?.pTaxMonthly);
      formdata.append("pfAnnualy", deduction?.pfAnnually);
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
      formdata.append('retensionBonus',otherBenefits?.retensionBonus)
      formdata.append('retension',otherBenefits?.retension)
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
      formdata.append('status_id',25)
      formdata.append('cancel_reason', text);
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
      const response = await request?.data;
      if (response?.code === 200) {
        console.log(`${response?.message}`)
        toast.success(`${response?.message}`);
        navigate('/admin/salary')
        // setTimeout(() => {
        //   window.open("about:blank", "_self");
        //   window.close();
        // }, 3000);
        // clearTimeout();
        //   setShowAddModal(false)
      }
              } catch (error) {
                console.log('error',error)
                if(error?.response?.data?.error){
                    const errors = Object.values(error?.response?.data?.error)
                    console.log('Errors',errors)
                    errors.map((x)=>(
                        toast.error(`${x}`)
                    ))
                }
                if(error?.response?.data?.message){
                    if(error?.response?.data?.error){
                        const errors = Object.values(error?.response?.data?.error)
                        console.log('Errors',errors)
                        errors.map((x)=>(
                            toast.error(`${x}`)
                        ))
                    }
                    if(error?.response?.data?.message){
                        toast.error(`${error?.response?.data?.message}`)
                    }
                }
            }
            }
      }if(result.isDenied){
          Swal.fire('Cancelled!', '', 'error')
      }
  })
  }

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
    const { pTaxAnnually, pfAnnually,totalDeductionAnnually  } = deduction;
    console.log(pfMonthly, pfAnnually)
    const total =
      parseInt(pTaxMonthly) +

      parseInt(pfMonthly);
    const totalAnnual =
      pTaxAnnually +
    
      pfAnnually;
    console.log("total", total);
    console.log("annual total", totalAnnual);
    setNetTakeHome(total);
    setNetTakeHomeAnnually(totalAnnual);
  }, [deduction]);

  useEffect(()=>{
    const TotalnettakehomeMonth= parseInt(grossAmountAnnually)-parseInt(netTakeHomeAnnually)
    console.log(TotalnettakehomeMonth)
    const TotanetakehomeAnnual=parseInt(grossAmount)-parseInt(netTakeHome)
    setNetmonth(TotalnettakehomeMonth)
    setNetAnnual(TotanetakehomeAnnual)
     
     })

  useEffect(() => {
    const { gratuityMonthly, fixedCtcMonthly, ltaMonthly, retension, insuranceMonthly } =
      otherBenefits;
    const {
      gratuityAnnually,
      fixedCtcAnnually,
      ltaAnnually,
      insuranceAnnually,
      retensionBonus
    } = otherBenefits;
    const total =
      parseInt(fixedCtcMonthly) +
      parseInt(gratuityMonthly) +
      parseInt(ltaMonthly) +
      parseInt(retension)+
      parseInt(insuranceMonthly);
    const totalAnnual =
      parseInt(gratuityAnnually) +
      parseInt(fixedCtcAnnually) +
      parseInt(ltaAnnually) +
      parseInt(retensionBonus)+
      parseInt(insuranceAnnually);
    // console.log("total",total)
    setTotalCtc(total);
    setTotalCtcAnnually(totalAnnual);
  }, [otherBenefits]);


  // const fixedTotalamount=(fixedEarning.basicAnnual + fixedEarning.hrmAnnual + fixedEarning.spciealAnnual) +
  // (employeeContribution.pfEAnnually + employeeContribution.pfAAnnually+employeeContribution.eStateInsuranceAnnually)+
  // (otherBenefits.gratuityAnnually+otherBenefits.insuranceAnnually+otherBenefits.ltaAnnually+otherBenefits.fixedCtcAnnually+otherBenefits.retensionBonus)

  // const fixedTotalamount = 
  // (Number(fixedEarning.basicAnnual || 0) + Number(fixedEarning.hrmAnnual || 0) + Number(fixedEarning.spciealAnnual || 0)) +
  // (Number(employeeContribution.pfEAnnually || 0) + Number(employeeContribution.pfAAnnually || 0) + Number(employeeContribution.eStateInsuranceAnnually || 0)) +
  // (Number(otherBenefits.gratuityAnnually || 0) + Number(otherBenefits.insuranceAnnually || 0) + Number(otherBenefits.ltaAnnually || 0) + Number(otherBenefits.fixedCtcAnnually || 0) + Number(otherBenefits.retensionBonus || 0));


  useEffect(() => {
    deduction.pTaxAnnually = deduction.pTaxMonthly * 12;
    deduction.pfAnnually = deduction.pfMonthly *12;
    // deduction.totalDeductionAnnually=deduction.totalDeductionMonthly*12

  }, [deduction])

 

  console.log("data", data && data[0]?.jobapplication?.job?.erf_id);

  return (
    // <div>Esic</div>

    <div style={{ background: "#f3f8f7" }}>
      <ToastContainer />
      <div className=" bg-primary w-full py-3 flex">
        <img src={logo} className="w-44 h-12 mx-4" />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-4 shadow-lg rounded-lg my-5 mx-auto gap-4 w-9/12`}
      >
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-2 ">
          <div className="col-span-1 px-2 my-1">
            <h2 className={`font-medium`}>PID</h2>
            <Select
              isDisabled
              value={[{ label: data && data[0]?.jobapplication?.job?.erf_id }]}
              className="shadow appearance-none border rounded mt-1 w-full text-black"
            />
          </div>
          <div className="col-span-1 px-2 my-1">
            <h2 className="font-medium">Location</h2>
            <Select
              isDisabled
              value={[{ label: data && data[0]?.jobapplication?.address }]}
              className="shadow appearance-none border rounded mt-1 w-full text-black"
            />
          </div>
          <div className="w-full px-2 my-1">
            <label className="font-medium w-3/6">Salary Type:</label>
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
          <div className="w-full  my-1 px-2">
            <h2 className="font-medium">Name:</h2>
            <Select
              isDisabled
              value={[{ label: userData?.name }]}
              className="shadow appearance-none border rounded mt-1 w-full text-black"
            />
          </div>
          <div className="w-full my-1 px-2">
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
          <div className="w-full my-1 px-2">
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
          <div className="w-full my-1 px-2">
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
          <div className="w-full my-1 px-2">
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
          <div className="w-full my-1 px-2">
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
          <div className="w-full my-1 px-2">
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
                            Special/Flexi
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
                            Professional Tax
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
                              id="totalDeductionAnnua"
                            //  onChange={handleDeduction}
                              value={Number(netTakeHome) * 12}
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
                        {Number(netannual) * 12}
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
                          {/* {totalCtcAnnually}  */}
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
        <div className="space-y-2 col-span-2 py-3 px-2">

          <button
            type="submit"
            className="inline-block rounded-full border-2 border-emerald-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            Approve
          </button>

          {/* <button
            type="submit"
            className="inline-block rounded-full mx-2 border-2 border-emerald-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            Approve
          </button> */}
          
          <button
          onClick={handleDeclined}
            type="submit"
            className="ml-2 inline-block rounded-full border-2 border-red-500 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-danger-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          >
            Decline
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalaryVerification;
