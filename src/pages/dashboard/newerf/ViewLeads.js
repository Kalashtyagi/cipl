import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { offerletterActions } from "../../../Redux/dashboard/offerletter/offerletterSlice.js";
import { useDispatch } from "react-redux";

const ViewLeads = () => {
  const { state } = useLocation();
  console.log("state", state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(offerletterActions.Addleads(state));
  }, [state]);

  if (localStorage.getItem("viewleadswstate")) {
    localStorage.removeItem("viewleadswstate");
  }

  localStorage.setItem("viewleadswstate", JSON.stringify(state));

  const newCertification =
    state &&
    state?.anycertification?.map((x) => x?.certification?.name)?.join(", ");

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

  const showData = [
    {
      title: "Project Manager",
      data: state?.project_manager,
    },
    {
      title: "Designation",
      data: state?.degination,
    },
    {
      title: "Category",
      data: state?.category?.name,
    },
    {
      title: "Skills",
      data: state?.skills,
    },
    {
      title: "Requisition Date",
      data: state?.start_date,
    },
    {
      title: "Target Date",
      data: state?.end_date,
    },
    {
      title: "Budget",
      data: state?.position_budgeted,
    },
    {
      title: "Reporting Team",
      data: state?.reporting_team,
    },
    {
      title: "Level",
      data: state?.level === null || undefined || "" ? "" : state?.level,
    },
    {
      title: "Positions",
      data:
        state?.total_positions === null || undefined || ""
          ? ""
          : state?.total_positions,
    },
  ];

  const education = [
    {
      title: "Qualification",
      data: state?.qualification,
    },
    {
      title: "Specialization",
      data: state?.subqualifications,
    },
    {
      title: "Certification",
      data: newCertification,
    },
  ];

  const experience = [
    {
      title: "Prerequisite",
      data:
        state?.prerequisite === null || undefined || ""
          ? ""
          : state?.prerequisite,
    },
    {
      title: "Responsibility",
      data:
        state?.responsibility === null || undefined || ""
          ? ""
          : state?.responsibility,
    },
    {
      title: "Total Experience",
      data:
        state?.total_experience === null || undefined || ""
          ? ""
          : state?.total_experience,
    },
    {
      title: "Relevant Experience",
      data:
        state?.relevent_exp === null || undefined || ""
          ? ""
          : state?.relevent_exp,
    },
  ];
  return (
    <div className="">
      <div className="p-2 bg-white border-t-2 border-primary">
        <Link
          to={`/admin/editviewleads`}
          style={{ float: "right" }}
          className="mt-4"
        >
          <FiEdit
            style={{ cursor: "pointer", marginRight: "20px" }}
            className="text-lg"
          />
        </Link>
        <h2 className="text-xl px-2 border-gray-300">ERF</h2>
        <div className="grid grid-cols-3 ">
          {state?.replacements?.length > 0
            ? replacementdata &&
              replacementdata?.map((x, index) => (
                <div className="col-span-1 w-full p-2" key={index}>
                  <label className="text-sm text-primary font-medium">
                    {x.title}
                  </label>
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
                <div className={`${x?.title === "Skills" ? "flex" : "block"}`}>
                  {x?.title === "Skills" ? (
                    x?.data?.map((y, index) => (
                      <span
                        className="flex text-gray-700 capitalize pr-1"
                        key={index}
                      >
                        {y?.skill?.name + (index === 0 ? "," : "")}
                      </span>
                    ))
                  ) : (
                    <span className="block text-gray-700 capitalize">
                      {x.data}
                    </span>
                  )}
                </div>
              </div>
            ))}
          <div className=" col-span-3 py-2 px-2 w-full bg-gray-200 text-lg">
            Education Details
          </div>
          <div className="grid grid-cols-2 col-span-3">
            {education &&
              education?.map((x, index) => (
                <div className="col-span-1 w-full p-2" key={index}>
                  <label className="text-sm text-primary font-medium">
                    {x.title}
                  </label>
                  <div
                    className={`${
                      x?.title === "Specialization" ? "flex" : "block"
                    }`}
                  >
                    {x?.title === "Specialization" ? (
                      x?.data?.map((y) => y?.subqualification?.name)?.join(", ")
                    ) : x?.title === "Qualification" ? (
                      x?.data
                        ?.map((y) => y?.qualificationdetails?.name)
                        ?.join(", ")
                    ) : (
                      <span className="block text-gray-700 capitalize">
                        {x.data}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className=" col-span-3 py-2 px-2 w-full bg-gray-200 text-lg">
            Experience Details
          </div>
          {experience &&
            experience?.map((x, index) => (
              <div className="col-span-1 w-full p-2" key={index}>
                <label className="text-sm text-primary font-medium">
                  {x.title}
                </label>
                <div
                  className={`${
                    x?.title === "Specialization" ? "flex" : "block"
                  }`}
                >
                  {x?.title === "Specialization" ? (
                    x?.data?.map((y, index) => (
                      <span
                        className="flex text-gray-700 capitalize pr-1"
                        key={index}
                      >
                        {y?.subqualification?.name + (index === 0 ? "," : "")}
                      </span>
                    ))
                  ) : (
                    <span className="block text-gray-700 capitalize">
                      {x.data}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className=" col-span-3 py-2 px-2 w-full bg-gray-200 text-lg">
          Job Description
        </div>

        <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-2 mt-3">
                <strong>Designation</strong>
                <div>{state?.jd?.designation}</div>
              </div>

              <div className="grid grid-cols-2 mt-3">
                <strong>Job Type</strong>
                <div>{state?.jd?.job_type}</div>
              </div>

              <div className="grid grid-cols-2 mt-3">
                <strong>Job Description</strong>

                <div
                  dangerouslySetInnerHTML={{
                    __html: state?.jd?.job_description,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 mt-3">
                <strong>Responsibilities</strong>
                <div
                  dangerouslySetInnerHTML={{
                    __html: state?.jd?.responsibilities,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 mt-3 mb-4">
                <strong>Requirements</strong>
                <div
                  dangerouslySetInnerHTML={{ __html: state?.jd?.requirements }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLeads;
