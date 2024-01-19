import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import {
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaPeopleArrows,
  FaUsers,
} from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { TbCertificate } from "react-icons/tb";
import { AiOutlineFile, AiOutlineFileText } from "react-icons/ai";
import { RiLayoutGridFill } from "react-icons/ri";
import { BsListCheck, BsPencilSquare, BsPersonBadgeFill } from "react-icons/bs";
import { HiOutlineDocument, HiUsers } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";
import { MdFeedback } from "react-icons/md";

const permissionData = JSON.parse(localStorage.getItem("data"));
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    id: 1,
    name: "Dashboard",
    link: "/admin",
    icon: <SlSpeedometer />,
    iconClass: "nav-icon icon-speedometer",
    areaHidden: "",
  },
  {
    id: 2,
    name: "Job Category",
    link: "jobcategory",
    icon: <MdSpaceDashboard />,
    iconClass: "nav-icon icon-grid",
    areaHidden: "",
    key: "view_category",
  },
  {
    id: 3,
    name: "Skills",
    link: "jobskill",
    icon: <RiLayoutGridFill />,
    iconClass: "nav-icon icon-grid",
    areaHidden: "",
    key: "view_skills",
  },
  {
    id: 4,
    name: "Qualification",
    link: "qualification",
    icon: <BsPencilSquare />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "view_qualification",
  },
  {
    id: 5,
    name: "Specialization",
    link: "subqualification",
    icon: <AiOutlineFileText />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "view_qualification",
  },
  {
    id: 6,
    name: "Certification",
    link: "certification",
    icon: <TbCertificate />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "add_category",
  },
  {
    id: 7,
    name: "Department",
    link: "department",
    icon: <FaPeopleArrows />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "view_department",
  },
  {
    id: 191,
    name: "Job Description",
    link: "jd",
    icon: <AiOutlineFileText />,
    iconClass: "fa fa-question",
    areaHidden: "true",
    key: "view_job_applications",
  },
  {
    id: 14,
    name: "ERF",
    link: "newerf",
    icon: <AiOutlineFile />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "view_jobs",
  },
  // {
  //   id: 8,
  //   name: "ERF",
  //   icon:<AiOutlineFile/>,
  //   link: "erfgenform",
  //   iconClass: "fa fa-file-o",
  //   key:'view_department'
  // },
  // {
  //   id: 9,
  //   name: "ERF List",
  //   link: "erflist",
  //   icon: <FaIdBadge/>,
  //   iconClass: "fa fa-question",
  //   areaHidden: "true",
  //   key:'view_job_applications'
  // },
  {
    id: 10,
    name: "Job Application",
    link: "jobapplication",
    icon: <FaUsers />,
    iconClass: "fa fa-question",
    areaHidden: "true",
    key: "view_job_applications",
  },
  {
    id: 104,
    name: "Candidate Store",
    link: "candidatestore",
    icon: <FiUserPlus />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "add_job_applications",
  },
  {
    id: 13,
    name: "Interview Schedule",
    link: "interviewschedule",
    icon: <FaCalendarAlt />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "view_schedule",
  },

  {
    id: 131,
    name: "Interview Feedback",
    link: "feedback",
    icon: <MdFeedback />,
    iconClass: "fa fa-question",
    areaHidden: "true",
    key: "view_job_applications",
  },
  {
    id: 15,
    name: "Salary",
    link: "salary",
    icon: <FaMoneyBillAlt />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "view_salarycreation",
  },
  {
    id: 17,
    name: "Onboard",
    link: "onboard",
    icon: <BsPersonBadgeFill />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "view_onboard",
  },

  {
    id: 12,
    name: "Team",
    link: "team",
    icon: <HiUsers />,
    iconClass: "nav-icon icon-people",
    areaHidden: "",
    key: "view_team",
  },




  // {
  //   id: 16,
  //   name: "Offer Letter",
  //   link: "offerletters",
  //   icon: <HiOutlineDocument />,
  //   iconClass: "nav-icon icon-people",
  //   areaHidden: "",
  //   key: "view_offerletter",
  // },

  // {
  //   id: 18,
  //   name: "Datacenter",
  //   link: "datacenter",
  //   icon: <FaDatabase/>,
  //   iconClass: "nav-icon icon-people",
  //   areaHidden: "",
  //   key:'add_job_applications'
  // },
];

export const DASHBOARD_SIDEBAR_DATACENTER = [
  {
    id: 1,
    name: "PID",
    state: "pid",
    icon: <BsListCheck />,
  },
  {
    id: 2,
    name: "Recruitment Type",
    state: "type",
    icon: <BsListCheck />,
  },
  {
    id: 3,
    name: "Project Name",
    state: "projectName",
    icon: <BsListCheck />,
  },
  {
    id: 4,
    name: "Project Manager",
    state: "projectManager",
    icon: <BsListCheck />,
  },
  {
    id: 5,
    name: "Location",
    state: "location",
    icon: <BsListCheck />,
  },
  {
    id: 6,
    name: "Department",
    state: "department",
    icon: <BsListCheck />,
  },
  {
    id: 7,
    name: "Category",
    state: "category",
    icon: <BsListCheck />,
  },
  {
    id: 8,
    name: "Qualification",
    state: "qualification",
    icon: <BsListCheck />,
  },
  // {
  //   id: 9,
  //   name: "Minimum Budget",
  //   state: "minimumBudget",
  //   icon: <BsListCheck />,
  // },
  {
    id: 10,
    name: "Maximum Budget",
    state: "maximumBudget",
    icon: <BsListCheck />,
  },
  {
    id: 11,
    name: "Req. Date",
    state: "startDate",
    icon: <BsListCheck />,
  },
  {
    id: 12,
    name: "Target Date",
    state: "endDate",
    icon: <BsListCheck />,
  },
  // {
  //   id: 13,
  //   name: "Recruiter",
  //   state: "recruiter",
  //   icon: <BsListCheck />,
  // },
  {
    id: 14,
    name: "Lead Status",
    state: "leadStatus",
    icon: <BsListCheck />,
  },
  {
    id: 16,
    name: "Erf List",
    state: "erfList",
    icon: <BsListCheck />,
  },
];

export const DASHBOARD_SIDEBAR_EXAM_LINKS = [
  {
    id: 1,
    name: "Exam",
    link: "exam",
    icon: <BsListCheck />,
    iconClass: "fa fa-pencil-square-o",
    areaHidden: "true",
    key: "view_exam",
  },
  {
    id: 2,
    name: "Questions",
    link: "questions",
    icon: <BsListCheck />,
    iconClass: "fa fa-pencil-square-o",
    areaHidden: "true",
    key: "view_question",
  },
  {
    id: 2,
    name: "Result",
    link: "result",
    icon: <BsListCheck />,
    iconClass: "fa fa-pencil-square-o",
    areaHidden: "true",
    key: "view_question",
  },
];

export const DASHBOARD_SIDEBAR_SETTING_LINKS = [
  {
    id: 1,
    name: "My Profile",
    link: "myprofile",
    areaHidden: "",
    permission: "all",
  },
  {
    id: 2,
    name: "Roles & Permission",
    link: "rolesandpermission",
    areaHidden: "",
    permission: "1",
  },
];
