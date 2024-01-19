import React, { useState, useEffect } from "react";
import Editor from "./ckeditor";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const UpdateJobDescription = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [designation, setDesignation] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [dataJd, setDataJd] = useState("");
  const [dataResponsibilities, setDataResponsibilities] = useState("");
  const [dataRequirements, setDataRequirements] = useState("");
  const [singleData, setSingleData] = useState({});

  console.log(singleData);

  useEffect(() => {
    setDesignation(singleData.designation);
    setJobtype(singleData.job_type);
    setDataJd(singleData.job_description);
    setDataRequirements(singleData.requirements);
    setDataResponsibilities(singleData.responsibilities);
  }, [singleData]);

  const data = localStorage.getItem("data");
  const jsonData = JSON.parse(data);
  const accessToken = jsonData?.access_token;
  const authorize = "Bearer" + " " + accessToken;

  const navigate = useNavigate();

  let { id } = useParams();
  console.log(id)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}jd/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authorize}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
          setSingleData(res.data.data.find((ele) => ele.id === Number(id)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}jd/update/${id}`,
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
        navigate(`/admin/jd/${id}`);
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
        <h1 className="text-2xl text-left ">Update Job Description</h1>
        <form onSubmit={handleSubmit}>
          <div className=" w-full flex py-4 items-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="w-full mr-1">
                <label className="flex pr-1 mb-2">
                  Designation <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
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
                  className="border  w-full px-2 py-2 mb-2"
                  onChange={(e) => setJobtype(e.target.value)}
                  value={jobtype}
                  placeholder="jdjj"
                >
                  <option>{jobtype}</option>
                  <option value={"part_time"}>Part Time</option>
                  <option value={"full_time"}>Full Time</option>
                </select>
                {/* <p>Selected Job Type: {jobtype}</p> */}
              </div>

              <div className="w-full col-span-2">
                <div className="w-full">
                  <label className="flex pr-1 mb-2">
                    Job Description <span className="text-red-400">*</span>
                  </label>
                  <Editor
                    name="description"
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

export default UpdateJobDescription;
