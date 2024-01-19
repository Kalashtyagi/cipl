import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const datatoken = localStorage.getItem("data");
const jsonData = JSON.parse(datatoken);
const accessToken = jsonData?.access_token;
const authorize = "Bearer" + " " + accessToken;

const SingalJd = () => {
  const [singleData, setSingleData] = useState({});
  const navigate = useNavigate();

  console.log(singleData);

  let { id } = useParams();

  const handleDeleteJd = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}jd/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authorize}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        navigate("/admin/jd");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
        setSingleData(res.data.data.find((ele) => ele.id === Number(id)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  
  
  return (
    <>
      <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
        <div className="flex flex-col">
          <div className="flex my-5 justify-end">
            <Link to={`/admin/updatejd/${singleData.id}`}>
              <FiEdit
                style={{ cursor: "pointer", marginRight: "20px" }}
                className="text-lg "
              />
            </Link>
            <RiDeleteBin6Line
              style={{ cursor: "pointer" }}
              className="text-lg "
              onClick={handleDeleteJd}
            />
          </div>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 mt-3">
              <strong>Designation</strong>
              <div
                dangerouslySetInnerHTML={{ __html: singleData.designation }}
              />
            </div>

            <div className="grid grid-cols-2 mt-3">
              <strong>Job Type</strong>
              <div dangerouslySetInnerHTML={{ __html: singleData.job_type }} />
            </div>

            <div className="grid grid-cols-2 mt-3">
              <strong>Job Description</strong>

              <div
                dangerouslySetInnerHTML={{ __html: singleData.job_description }}
              />
            </div>

            <div className="grid grid-cols-2 mt-3">
              <strong>Responsibilities</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleData.responsibilities,
                }}
              />
            </div>

            <div className="grid grid-cols-2 mt-3 mb-4">
              <strong>Requirements</strong>
              <div
                dangerouslySetInnerHTML={{ __html: singleData.requirements }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingalJd;
