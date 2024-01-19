import React, { useState, useEffect } from "react";
import Editor from "./ckeditor";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const AddJobDescription = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [designation, setDesignation] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [dataJd, setDataJd] = useState("");
  const [dataResponsibilities, setDataResponsibilities] = useState("");
  const [dataRequirements, setDataRequirements] = useState("");

  const navigate = useNavigate();
  const location = useNavigate();

  const data = localStorage.getItem("data");
  const jsonData = JSON.parse(data);
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  useEffect(() => {
    document.title = "CIPLCRM | Add Job Description";

    setEditorLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}jdstore`,
        {
          designation,
          job_type: jobtype,
          job_description: dataJd,
          responsibilities: dataResponsibilities,
          requirements: dataRequirements,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authorize}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        navigate("/admin/jd");
        setDesignation("");
        setDataJd("");
        setDataRequirements("");
        setDataResponsibilities("");
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.error?.job_type)
          toast.error(err?.response?.data?.error?.job_type[0]);
        if (err?.response?.data?.error?.job_description)
          toast.error(err?.response?.data?.error?.job_description[0]);
        if (err?.response?.data?.error?.responsibilities)
          toast.error(err?.response?.data?.error?.responsibilities[0]);
        if (err?.response?.data?.error?.requirements)
          toast.error(err?.response?.data?.error?.requirements[0]);
      });
  };

  return (
    <>
      <div className="border rounded border-t-2 border-r-gray-400 border-l-gray-400 border-b-gray-400 border-gray-800 p-4 mx-4 my-2 bg-white">
    
        <h1 className="text-2xl text-left ">Add Job Description:</h1>
     
        <form onSubmit={handleSubmit}>
          <div className=" w-full flex py-4 items-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  className="border  w-full px-2 py-2"
                  placeholder={"Enter Designation"}
                  onChange={(e) => setDesignation(e.target.value)}
                  value={designation}
                />
              </div>
              <div className="w-full">
                <label className="flex pr-1 mb-2">
                  Job Type <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  className="border  w-full px-2 py-2 mb-2"
                  onChange={(e) => setJobtype(e.target.value)}
                >
                  <option>Choose Job Type</option>
                  <option value={"Part Time"}>Part Time</option>
                  <option value={"Full Time"}>Full Time</option>
                </select>
              </div>

              <div className="w-full col-span-2">
                <div className="w-full">
                  <label className="flex pr-1 mb-2">
                    Job Description <span className="text-red-400">*</span>
                  </label>
                  <Editor
                    name="description"
                    required
                    value={dataJd}
                    onChange={(data) => {
                      setDataJd(data);
                    }}
                    editorLoaded={editorLoaded}
                  />
                </div>
              </div>

              <div className="w-full col-span-2">
                <div className="w-full">
                  <label className="flex pr-1 mb-2">
                    Responsibilities <span className="text-red-400">*</span>
                  </label>
                  <Editor
                    name="description"
                    onChange={(data) => {
                      setDataResponsibilities(data);
                    }}
                    editorLoaded={editorLoaded}
                    value={dataResponsibilities}
                  />
                </div>
              </div>

              <div className="w-full col-span-2">
                <div className="w-full">
                  <label className="flex pr-1 mb-2">
                    Requirements <span className="text-red-400">*</span>
                  </label>
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
          <button
            type="submit"
            className="flex my-4 transition-all delay-150 duration-150 px-8 py-2 rounded text-white bg-green-700 hover:bg-green-500"
          >
            <span className="text-xl font-medium">Save</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddJobDescription;
