import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaFileImport } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";

const AddAssignee = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  // form data
  const [name, setName] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [subQualification, setSubQualification] = useState("");
  const [relevantExp, setRelevantExp] = useState("");
  const [totalExp, setTotalExp] = useState("");
  const [skills, setSkills] = useState("");
  const [file, setFile] = useState("");
  const [fileDocument, setFileDocument] = useState("");
  const [bulkFile, setBulkFile] = useState("");
  const [fatherlast, setFatherlast] = useState("");
  const [fatherfirst, setFatherfirst] = useState("");
  const [lastname, setLastname] = useState("");

  // data calling
  const [qualificationList, setQualificationList] = useState("");
  const [subQualificationList, setSubQualificationList] = useState("");
  const data = localStorage.getItem("data");
  const jsonData = JSON.parse(data);
  const location = useLocation();
  // console.log('locaiton', location)
  const navigate = useNavigate();
  // console.log("sub qualification", subQualification)
  const accessToken = jsonData && jsonData?.access_token;
  // console.log("Graduation",graduation)
  const authorize = "Bearer" + " " + accessToken;
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

  const getSubQualificationApi = async () => {
    if (qualification) {
      console.log(
        JSON.stringify({
          qualification_id: `${qualification}`,
        })
      );
      const request = await fetch(
        `${process.env.REACT_APP_API_URL}subqualification/search`,
        {
          method: "post",
          headers: {
            Authorization: `${authorize}`,
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            qualification_id: `${qualification}`,
          }),
        }
      );
      const jsonResponse = await request?.json();
      console.log("qualification 91", jsonResponse);

      if (jsonResponse) {
        setSubQualificationList(jsonResponse?.data);
        console.log("95", jsonResponse);
      }
    }
  };

  let subqualificationListOption = [];

  useEffect(() => {
    console.log(subQualificationList);
  }, [subQualificationList]);

  if (Array.isArray(subQualificationList)) {
    subQualificationList?.map((ele) => {
      subqualificationListOption.push({
        value: ele?.id,
        label: ele?.name,
      });
    });
  }

  useEffect(() => {
    getSubQualificationApi();
  }, [qualification]);

  useEffect(() => {
    getQualificationApi();
  }, [subQualificationList]);

  // console.log("Sub qualification", subQualification);
  const saveData = async (e) => {
    setShowLoading(true);
    e.preventDefault();
    try {
      var formData = new FormData();
      formData.append("full_name", `${name}`);
      formData.append("lastname", `${lastname}`);
      formData.append("fatherfirst", `${fatherfirst}`);
      formData.append("fatherlast", `${fatherlast}`);

      formData.append(`skills`, `${skills}`);
      formData.append("phone", `${phone}`);
      formData.append("qualification_id", `${qualification}`);
      for (let i = 0; i < subQualification.length; i++) {
        formData.append(`subqualification_id[${i}]`, `${subQualification[i]}`);
        localStorage.setItem("subqualification_id", `${subQualification[i]}`);
      }
      // formData.append('subqualification_id',`${subQualification}`)

      formData.append("email", `${email}`);
      formData.append("address", `${address}`);
      formData.append("relevent_exp", `${relevantExp}`);
      formData.append("total_exp", `${totalExp}`);
      formData.append("resume", file);
      formData.append("document", fileDocument);
      formData.append("job_id", location?.state?.job_id);
      formData.append("jobrecruitment_id", location?.state?.id);
      const sendForm = await axios.postForm(
        `${process.env.REACT_APP_API_URL}job-applications/create`,
        formData,
        {
          headers: {
            Authorization: `${authorize}`,
            "Content-Type": "multipart/form-data",
            Accept: "js",
          },
        }
      );
      const responseForm = await sendForm.data;
      console.log("Response form", responseForm);
      if (responseForm?.code === 200) {
        toast.success(`${responseForm?.message}`);
        setShowLoading(false);
        setTimeout(() => navigate("/admin/jobapplication"), 5000);
        clearTimeout();
      }
    } catch (error) {
      console.log("164 error", error);

      // if (error?.response?.data?.error?.details?.hasOwnProperty(full_name))

      console.log(
        "168",
        error?.response?.data?.error?.details?.hasOwnProperty("email")
      );

      if (error?.response?.data?.error?.details?.hasOwnProperty("email")) {
        toast?.error(error?.response?.data?.error?.details?.email[0]);
      } else {
        toast.error(error?.response?.data?.error?.details?.full_name[0]);
      }
      setShowLoading(false);
      if (error?.response?.data?.error) {
        const errors = Object.values(error?.response?.data?.error);
        console.log("Errors", errors);
        // errors.map((x) => toast.error(`${x}`));
      }
      if (error?.response?.data?.message) {
        if (error?.response?.data?.error) {
          const errors = Object.values(error?.response?.data?.error);
          console.log("Errors", errors);
          // errors.map((x) => toast.error(`${x}`));
        }
        if (error?.response?.data?.message) {
          // toast.error(`${error?.response?.data?.message}`);
        }
      }
    }
  };

  const handleChangeFile = async (e) => {
    setFile(e.target.files[0]);
    if (name === "" || null || undefined) {
      try {
        const formData = new FormData();
        formData.append("resume", e.target.files[0]);
        const request = await axios.postForm(
          `${process.env.REACT_APP_API_URL}read-docx`,
          formData,
          {
            headers: {
              Authorization: `${authorize}`,
              "Content-Type": "multipart/form-data",
              Accept: "js",
            },
          }
        );
        const responseForm = await request.data;
        if (responseForm) {
          // toast.success(`Data Fetched`)
          // console.log('reponseo email',responseForm?.email)
          // if(responseForm?.email !=='' || " "){
          //   setEmail(responseForm?.email)
          // }if(responseForm?.mobile !=='' || " "){
          //   setPhone(responseForm?.mobile)
          // }else{
          //   return null
          // }
          if (responseForm?.email) {
            setEmail(responseForm?.email);
          }
          if (responseForm?.mobile) {
            setPhone(responseForm?.mobile);
          } else {
            return null;
          }
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
    }
  };

  const handleChangeDocumenFile = async (e) => {
    setFileDocument(e.target.files[0]);
    if (name === "" || null || undefined) {
      try {
        const formData = new FormData();
        formData.append("document", e.target.files[0]);
        const request = await axios.postForm(
          `${process.env.REACT_APP_API_URL}read-docx`,
          formData,
          {
            headers: {
              Authorization: `${authorize}`,
              "Content-Type": "multipart/form-data",
              Accept: "js",
            },
          }
        );
        const responseForm = await request.data;
        if (responseForm) {
          // toast.success(`Data Fetched`)
          // console.log('reponseo email',responseForm?.email)
          // if(responseForm?.email !=='' || " "){
          //   setEmail(responseForm?.email)
          // }if(responseForm?.mobile !=='' || " "){
          //   setPhone(responseForm?.mobile)
          // }else{
          //   return null
          // }
          if (responseForm?.email) {
            setEmail(responseForm?.email);
          }
          if (responseForm?.mobile) {
            setPhone(responseForm?.mobile);
          } else {
            return null;
          }
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
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" />
      <div className="p-4 border rounded shadow-md bg-white">
        <h2 className="text-2xl">Add Candidate</h2>
        <AccordionLayout
          index={1}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          title="Bulk Import"
        >
          <div className="text-center p-3">
            <div className="flex justify-center">
              <FaFileImport className="text-neutral-900" size={30} />
            </div>
            <h2 className="text-xl font-bold py-4 ">Import File</h2>
            <div
              htmlFor="dropzone-file"
              className="border-2 p-4 cursor-pointer border-dashed border-neutral-900"
            >
              <div className="flex justify-center p-1">
                <input
                  id="dropzone-file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  type="file"
                  className="text-last-center"
                  onChange={(e) => setBulkFile(e.target.files[0])}
                />
              </div>
              <p className="text-sm text-neutral-800 px-8 ">
                Upload CSV or XLSX file only.{" "}
              </p>
            </div>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={async () => {
                if (bulkFile) {
                  const formData = new FormData();
                  formData.append("import_file", bulkFile);
                  formData.append("job_id", location?.state?.job_id);
                  formData.append("jobrecruitment_id", location?.state?.id);
                  try {
                    const sendFile = await axios.post(
                      `${process.env.REACT_APP_API_URL}jobapplication/import`,
                      formData,
                      {
                        headers: {
                          Authorization: `${authorize}`,
                          "Content-Type": "multipart/form-data",
                          Accept: "application/json",
                        },
                      }
                    );
                    const responseData = await sendFile?.data;
                    // console.log('response',responseData)
                    if (responseData?.code === 200) {
                      toast.success("Data Inserted Succesfully");
                      setTimeout(() => navigate(`/admin/newerf`), 4000);
                      clearTimeout();
                    }
                    // getData()
                  } catch (error) {
                    console.log("error", error);
                    if (error?.response?.data?.error) {
                      const errors = Object.values(
                        error?.response?.data?.error
                      );
                      console.log("Errors 1", errors);
                      errors.map((x) =>
                        // console.log("Error",x)
                        toast.error(`${x}`)
                      );
                    }
                    if (error?.response?.data?.message) {
                      if (error?.response?.data?.error) {
                        const errors = Object.values(
                          error?.response?.data?.error
                        );
                        console.log("Errors 2", errors);
                        errors.map((x) =>
                          // console.log("Error",x)
                          toast.error(`${x}`)
                        );
                      }
                      if (error?.response?.data?.message) {
                        toast.error(`${error?.response?.data?.message}`);
                      }
                    }
                  }
                } else {
                  toast.error("Please select file.!");
                }
                // setShowImportModal(false)
              }}
              className="mb-2 md:mb-0 bg-neutral-900 border border-neutral-900 px-5 py-2 text-sm  shadow-sm font-medium tracking-wider text-white  rounded-sm hover:shadow-lg hover:bg-neutral-800"
            >
              Submit
            </button>
            <a
              href={require("../../../assets/jobapplicationsampledata.xlsx")}
              download={"sample-sheet" + JSON.stringify(Date.now())}
            >
              <button className="mb-2 md:mb-0 bg-neutral-900 border border-neutral-900 px-5 py-2 text-sm  shadow-sm font-medium tracking-wider text-white  rounded-sm hover:shadow-lg hover:bg-neutral-800">
                Download Sample
              </button>
            </a>
          </div>
        </AccordionLayout>
        <AccordionLayout
          index={2}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          title="Single Entry"
        >
          <form onSubmit={(e) => saveData(e)} method="multipart/form-data">
            <div className=" py-4 ">
              <div className="col-span-1 text-lg">
                <span>Personal Information</span>
                <label className="text-red-500 pl-1">*</label>
              </div>
              <div className="col-span-2 my-2 ">
                {/* <div className='w-full px-6'>
                <label className='text-lg'>Jobs</label>
                <select className='block border p-2 rounded w-full '>
                  <option>Choose Job</option>
                  <option>Python</option>
                  <option>NodeJs</option>
                </select>
                </div> */}
                <div className="flex flex-cols ">
                  <div className="w-full px-6 pt-2">
                    <label className="text-lg">First Name</label>
                    <label className="px-1 text-red-500 ">*</label>
                    <input
                      type={"text"}
                      onChange={(e) => setName(e.target.value)}
                      className="block border p-2 rounded w-full "
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="w-full px-6 pt-2">
                    <label className="text-lg">Last Name</label>
                    <label className="px-1 text-red-500 ">*</label>
                    <input
                      type={"text"}
                      onChange={(e) => setLastname(e.target.value)}
                      className="block border p-2 rounded w-full "
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-cols ">
                  <div className="w-full px-6 pt-2">
                    <label className="text-lg">Father First Name</label>
                    <label className="px-1 text-red-500 ">*</label>
                    <input
                      type={"text"}
                      onChange={(e) => setFatherfirst(e.target.value)}
                      className="block border p-2 rounded w-full "
                      placeholder="Father First Name"
                      required
                    />
                  </div>
                  <div className="w-full px-6 pt-2">
                    <label className="text-lg">Father Last Name</label>
                    <label className="px-1 text-red-500 ">*</label>
                    <input
                      type={"text"}
                      onChange={(e) => setFatherlast(e.target.value)}
                      className="block border p-2 rounded w-full "
                      placeholder="Father Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-cols ">
                  <div className="w-full px-6 pt-2">
                    <label className="text-lg">Phone</label>
                    <label className="px-1 text-red-500 ">*</label>
                    <input
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      className="block border p-2 rounded w-full "
                      placeholder="Phone"
                      required
                    />
                  </div>
                  <div className="w-full px-6 pt-2">
                    <label className="text-lg">Email</label>
                    <label className="px-1 text-red-500 ">*</label>
                    <input
                      type={"text"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block border p-2 rounded w-full "
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div className="w-full px-6 pt-2">
                  <label className="text-lg">Address</label>
                  {/* <label className="px-1 text-red-500 ">*</label> */}

                  <textarea
                    className="block border p-2 rounded w-full "
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className=" col-span-3 mt-4">
                <hr />
              </div>

              <div className="flex flex-col">
                <div className="col-span-1 text-lg my-2">
                  <span>Experience</span>
                  {/* <label className="text-red-500 pl-1">*</label> */}
                </div>
                <div className="col-span-2 my-2 ">
                  <div className="flex flex-cols ">
                    <div className="w-full px-6 pt-2">
                      <label className="text-lg">Qualification</label>
                      <Select
                        options={
                          qualificationList?.length > 0
                            ? qualificationList &&
                              qualificationList?.map((x) => ({
                                value: x?.id,
                                label: x?.name,
                              }))
                            : [{ value: "", label: "Please Wait...!" }]
                        }
                        onChange={(e) => setQualification(e?.value)}
                        isClearable
                      />
                    </div>
                    <div className="w-full px-6 pt-2">
                      <label className="text-lg">Specialization</label>
                      {console.log(" 542", subqualificationListOption)}
                      <Select
                        options={subqualificationListOption}
                        onChange={
                          (e) => setSubQualification(e?.map((x) => x?.value))
                          // console.log('567',e?.map((x) =>
                          //  x?.value))
                        }
                        isMulti={true}
                        isClearable
                      />
                      {/* <select required onChange={(e)=>setSubQualification(e.target.value)} className='block border p-2 rounded w-full '>
                      <option>Choose Job</option>
                      {
                        subQualificationList && subQualificationList?.map((subQualification)=>(
                          <option key={subQualification?.id} value={subQualification?.id}>{subQualification?.name}</option>
                        ))
                      }
                    </select> */}
                    </div>
                  </div>
                  <div className="flex flex-cols ">
                    <div className="w-full px-6 pt-2">
                      <label className="text-lg">Relevant Experience</label>

                      <input
                        type={"text"}
                        className="block border p-2 rounded w-full "
                        onChange={(e) => setRelevantExp(e.target.value)}
                        placeholder="Relevant Experience"
                      />
                    </div>
                    <div className="w-full px-6 pt-2">
                      <label className="text-lg">Total Experience</label>

                      <input
                        type={"text"}
                        className="block border p-2 rounded w-full "
                        placeholder="Total Experience"
                        onChange={(e) => setTotalExp(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="w-1/2 px-6">
                    <label className="text-lg">Skills</label>
                    <input
                      type={"text"}
                      className="block border p-2 rounded w-full "
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="Skills"
                    />
                  </div>
                </div>
              </div>
              <div className=" col-span-3 mt-4">
                <hr />
              </div>
              <div className="col-span-1 text-lg my-2">
                <span>CV or Resume</span>
                <label className="text-red-500 pl-1">*</label>
              </div>
              <div className="col-span-2 my-2">
                <div className="w-full px-6 pt-2">
                  <input
                    required
                    type={"file"}
                    className="block border p-2 rounded w-full "
                    placeholder="Name"
                    n
                    onChange={(e) => handleChangeFile(e)}
                  />
                  <label className="text-lg">
                    We accept JPEG, JPG, PNG, PDF, DOC, DOCX, RTF, XLS, and XLSX
                    Files
                  </label>
                  <label className="px-1 text-red-500 ">*</label>
                </div>
              </div>

              <div className="col-span-1 text-lg my-2 mt-8">
                <span>Upload Document</span>
                <label className="text-red-500 pl-1">*</label>
              </div>

              <div className="col-span-2 my-2">
                <div className="w-full px-6 pt-2">
                  <input
                    required
                    type={"file"}
                    className="block border p-2 rounded w-full mt-4"
                    placeholder="Name"
                    onChange={(e) => handleChangeDocumenFile(e)}
                  />
                  <label className="text-lg">
                    Upload Aadhar Card or Pan Card
                  </label>
                  <label className="px-1 text-red-500 ">*</label>
                </div>
              </div>
              <div className=" col-span-3 mt-4">
                <hr />
              </div>
              <div className="my-2">
                {!showLoading ? (
                  <button
                    type="submit"
                    className="px-6 text-white font-semibold rounded py-2 bg-green-500"
                  >
                    Save
                  </button>
                ) : (
                  <button className="px-6 flex items-center text-white font-semibold rounded py-2 bg-green-500">
                    <div
                      class="w-4 h-4 rounded-full animate-spin
                    border-2 border-solid border-white mr-2 border-t-transparent"
                    ></div>
                    Please Wait..
                  </button>
                )}
              </div>
            </div>
          </form>
        </AccordionLayout>
      </div>
    </div>
  );
};

export const AccordionLayout = ({
  title,
  children,
  index,
  activeIndex,
  setActiveIndex,
}) => {
  const handleSetIndex = (index) =>
    activeIndex !== index && setActiveIndex(index);
  return (
    <>
      <div
        onClick={() => handleSetIndex(index)}
        className="flex w-full items-center justify-between p-2 mt-2 rounded bg-primary"
      >
        <div className="flex">
          <div className="text-white font-bold">{title}</div>
        </div>
        <div className="flex items-center justify-center ">
          {activeIndex === index ? (
            <BsFillArrowDownCircleFill
              fill="white"
              className="w-4 h-4 text-white "
            />
          ) : (
            <BsFillArrowUpCircleFill
              className="w-4 h-4 text-white"
              fill="white"
            />
          )}
        </div>
      </div>

      {activeIndex === index && (
        <div className="shadow-3xl rounded-2xl shadow-cyan-500/50 p-4 mb-6">
          {children}
        </div>
      )}
    </>
  );
};

export default AddAssignee;
