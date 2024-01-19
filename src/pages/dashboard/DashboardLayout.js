import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import BreadCrumb from "../../components/element/BreadCrumb";

const DashboardLayout = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const localData = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (!localData && localData?.status !== 1 && localData?.code !== 200) {
      navigate("/");
    }
  }, [location]);

  // const data = JSON.parse(localStorage.getItem('data'))

  return (
    <div className="flex flex-row bg-neutral-50 h-screen w-screen">
      <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="flex flex-col flex-1 w-[85%]">
        <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="flex-1 min-h-0 overflow-auto no-scrollbar">
          <BreadCrumb />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
