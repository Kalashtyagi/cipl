import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiCircle } from "react-icons/bi";
import { SlSpeedometer } from "react-icons/sl";
import { AiTwotoneSetting, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {
  DASHBOARD_SIDEBAR_DATACENTER,
  DASHBOARD_SIDEBAR_EXAM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_SETTING_LINKS,
} from "../lib/consts/Navigation";
import logo from "../assets/logo.png";
import { BsListCheck } from "react-icons/bs";
import { FaDatabase } from "react-icons/fa";
import { HiOutlineDocument, HiUsers } from "react-icons/hi";

const SideBar = ({ showSideBar, setShowSideBar }) => {
  const [showSetting, setShowSetting] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [showDataCenter, setShowDataCenter] = useState(false);
  const { pathname } = useLocation();
  const localData = JSON?.parse(localStorage.getItem("data"));
  const [showOfferletter, setShowOfferletter] = useState(false);

  console.log();
  return (
    <div
      className={`flex flex-col transition-all overflow-y-scroll no-scrollbar delay-150 duration-150 z-50 bg-primary ${
        showSideBar
          ? " translate-x-0 w-60 p-3 transition-all duration-100 delay-100  "
          : " -translate-x-60 transition-all p-0 duration-100 w-0 delay-100"
      } inset-y-0 left-0 absolute lg:relative text-white`}
    >
      <div className="flex items-center justify-center gap-2 px-1 lg:py-3 py-2">
        <Link to="/admin" className="cursor-pointer">
          <img src={logo} alt="CIPL Logo" className="h-8" />
        </Link>
      </div>
      <hr className={`${showSideBar ? "py-1" : "hidden"}py-1`} />
      <div className={`flex-1 ${showSideBar ? "py-1" : "hidden"} py-1`}>
        <Link
          to={"/admin"}
          className={`flex items-center cursor-pointer my-1 px-2 py-1 rounded-lg ${
            pathname.replace("/admin/", "") === "/admin"
              ? "bg-[#232b2b]"
              : "bg-transparent hover:bg-[#1A1110]"
          } `}
        >
          <span className="text-xl px-2">
            <SlSpeedometer />
          </span>
          <span className="text-md px-2 font-light">Dashboard</span>
        </Link>
        {DASHBOARD_SIDEBAR_LINKS?.filter(
          (navigate) =>
            localData &&
            localData?.data?.userPermissions?.some(
              (item) => item === navigate.key
            )
        ).map((item) => (
          <Link
            key={item.id}
            to={item?.link}
            className={`flex items-center cursor-pointer my-1 px-2 py-1 rounded-lg ${
              pathname.replace("/admin/", "") === item.link
                ? "bg-[#232b2b]"
                : "bg-transparent hover:bg-[#1A1110]"
            } `}
          >
            <span className="text-xl px-2">{item.icon}</span>
            <span className="text-md px-2 font-light">{item.name}</span>
          </Link>
        ))}

        <div className="w-full">
          <button
            onClick={() => setShowOfferletter(!showOfferletter)}
            className="px-2 py-1 w-full items-center flex justify-between rounded-lg duration-75 delay-75 hover:bg-[#1A1110]"
          >
            <div className="flex items-center">
              <span>
                <HiOutlineDocument className="text-xl mx-2" />
              </span>
              <span className="text-md mx-2">Offer Letter</span>
            </div>
            <span>{showOfferletter ? <AiOutlineUp /> : <AiOutlineDown />}</span>
          </button>
          {showOfferletter ? (
            <div>
              <Link to={"offerletter"}>
                <div className="px-2 m-1 ml-6 flex bg-[#232b2b] hover:bg-[#1A1110] py-[2px] rounded-lg delay-100 duration-100 items-center">
                  <span className="px-2">
                    <BiCircle />
                  </span>
                  <span className="px-1">Offer Letter</span>
                </div>
              </Link>
              <div>
                {localData?.data?.roles[0]?.id === 1 ? (
                  <Link to={"offerletters"} className="">
                    <div className="px-2 m-1 ml-6 flex  hover:bg-[#1A1110] py-[2px] rounded-lg delay-100 duration-100 items-center">
                      <span className="px-2">
                        <BiCircle />
                      </span>
                      <span className="px-1">Create Offer letter</span>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {/* datacenter */}
        {localData &&
        localData?.data?.userPermissions.find((x) =>
          x?.includes("view_datacenter")
        ) ? (
          <div className="w-full">
            <button
              onClick={() => setShowDataCenter(!showDataCenter)}
              className="px-2 py-1 w-full items-center flex justify-between rounded-lg duration-75 delay-75 hover:bg-[#1A1110]"
            >
              <div className="flex items-center">
                <span>
                  <FaDatabase className=" text-xl mx-2" />
                </span>
                <span className="text-md mx-2">Datacenter</span>
              </div>
              <span>
                {showDataCenter ? <AiOutlineUp /> : <AiOutlineDown />}
              </span>
            </button>
            {showDataCenter ? (
              <div>
                {DASHBOARD_SIDEBAR_DATACENTER.map((setting, index) => (
                  <Link
                    to={"/admin/datacenter"}
                    state={setting?.state}
                    key={index}
                    className=""
                  >
                    <div className="px-2 m-1 ml-6 flex hover:bg-[#1A1110] py-[2px] rounded-lg delay-100 duration-100 items-center">
                      <span className="px-2">
                        <BiCircle />
                      </span>
                      <span className="px-1">{setting?.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* onboard
        {localData &&
        localData?.data?.userPermissions.find((x) =>
          x?.includes("view_exam")
        ) ? (
          <div className="w-full">
            <button
              onClick={() => setShowExam(!showExam)}
              className="px-2 py-1 w-full items-center flex justify-between rounded duration-75 delay-75 hover:bg-[#2b70b5]"
            >
              <div className="flex items-center">
                <span>
                  <BsListCheck className=" text-xl mx-2" />
                </span>
                <span className="text-md mx-2">Online Examination</span>
              </div>
              <span>{showExam ? <AiOutlineUp /> : <AiOutlineDown />}</span>
            </button>
            {showExam ? (
              <div>
                {DASHBOARD_SIDEBAR_EXAM_LINKS?.filter(
                  (x) =>
                    localData &&
                    localData?.data?.userPermissions?.some(
                      (item) => item === x.key
                    )
                ).map((setting, index) => (
                  <Link to={setting.link} key={index} className="">
                    <div className="px-2 m-1 ml-6 flex hover:bg-[#2b70b5] py-[2px] rounded delay-100 duration-100 items-center">
                      <span className="px-2">
                        <BiCircle />
                      </span>
                      <span className="px-1">{setting?.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null} */}

        <div className="w-full">
          <button
            onClick={() => setShowSetting(!showSetting)}
            className="px-2 py-1 w-full items-center flex justify-between rounded-lg duration-75 delay-75  hover:bg-[	#1A1110]"
          >
            <div className="flex items-center">
              <span>
                <AiTwotoneSetting className=" text-xl mx-2" />
              </span>
              <span className="text-md mx-2">Setting</span>
            </div>
            <span>{showSetting ? <AiOutlineUp /> : <AiOutlineDown />}</span>
          </button>
          {showSetting ? (
            <div>
              <Link to={"myprofile"} className="">
                <div className="px-2 m-1 ml-6 flex bg-[#232b2b] hover:bg-[#1A1110] py-[2px] rounded-lg delay-100 duration-100 items-center">
                  <span className="px-2">
                    <BiCircle />
                  </span>
                  <span className="px-1">My Profile</span>
                </div>
              </Link>
              <div>
                {localData?.data?.roles[0]?.id === 1 ? (
                  <Link to={"rolesandpermission"} className="">
                    <div className="px-2 m-1 ml-6 flex bg-[#232b2b] hover:bg-[#1A1110] py-[2px] rounded-lg delay-100 duration-100 items-center">
                      <span className="px-2">
                        <BiCircle />
                      </span>
                      <span className="px-1">Roles & Permission</span>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;