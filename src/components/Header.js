import React, { useLayoutEffect } from "react";
import {BiBell,BiPowerOff} from 'react-icons/bi'
import {HiBars3} from 'react-icons/hi2'
import { useNavigate } from "react-router-dom";
import userLogo from '../assets/60111.jpg'

const Header = ({setShowSideBar,showSideBar}) => {
  const navigate = useNavigate()
  const localData = JSON?.parse(localStorage.getItem('data'))
  return (
    <div>
      <div className={` bg-primary z-50 border-white  sticky inset-x-0 top-0  overflow-visible lg:border-white ${showSideBar? "lg:border-l-[0.5px] delay-200 duration-200":""}   w-full`}>
        <div className="bg-primary h-16 px-4 flex items-center border-b border-gray-200 justify-between">
          <div className="">
            <HiBars3
              size={40}
              className="px-2 cursor-pointer text-white hover:text-sky-500"
              onClick={()=>setShowSideBar(!showSideBar)}
            />
          </div>
          <div className="flex items-center text-white">
            <img src={localData?.data?.profile_image_url} className="rounded-full w-10 h-10" />
            <span className="px-2 hover:text-sky-500 cursor-pointer">{localData?.data?.name}</span>
            {/* <BiBell size={40} className="px-2 cursor-pointer hover:text-sky-500" /> */}
            <BiPowerOff size={40} className="px-2 cursor-pointer hover:text-sky-500" onClick={()=>{
              localStorage.removeItem('data')
              navigate('/')
              }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
