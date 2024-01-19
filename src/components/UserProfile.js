import React from "react";
import { RiContactsBookFill } from "react-icons/ri";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { HiDocumentDownload } from "react-icons/hi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GrDocumentStore } from "react-icons/gr";

const UserProfile = ({
  setShowProfilePopup,
  showProfilePopup,
  profileData,
}) => {
  console.log("profile data", profileData);
  return (
    <>
      <div style={{width:'950px',paddingTop:'10px'}}
        className={`items-center h-[92vh] mb-4 right-0 flex ${
          showProfilePopup
            ? "translate-x-0 delay-200 duration-200"
            : "translate-x-[100%] delay-200 duration-200"
        } overflow-x-hidden w-[55%] overflow-y-auto fixed z-[60] outline-none focus:outline-none`}
      >
        <div className="relative w-full my-2 h-full flex justify-end" >
          {/*content*/}
          <div className="lg:w-[50%] h-full w-[80%] shadow-lg relative border flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex  items-center justify-between p-1 border-slate-200">
              <h2 className="text-xl font-medium px-2">Profile</h2>
              <button
                className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold "
                onClick={() => setShowProfilePopup(false)}
              >
                <span className=" text-red-500 h-6 w-6 text-xl block ">X</span>
              </button>
            </div>
            {/*body*/}
            <div className="text-center" >
              <div className=" py-2 mx-4">
                <div className="flex justify-center">
                  <img
                    src={profileData?.profile ? profileData?.profile : null}
                    className="w-32 border border-gray-200 h-32 rounded-full"
                  />
                </div>
                <div className="p-1 w-full flex justify-center h-fit font-medium">
                  <span className="text-lg font-medium">
                    {profileData?.full_name}
                  </span>
                </div>
                <div className="p-1 w-full flex justify-center h-fit font-medium">
                  <span className=" text-sm font-normal">
                    {profileData?.recruitment?.degination}
                  </span>
                </div>
                <h3 className="flex px-4 items-center text-base font-semibold">
                  <RiContactsBookFill size={20} className="mr-1" />
                  Contact
                </h3>
                <div className="p-1 w-full grid grid-cols-2 h-fit px-4 font-medium">
                  <span className=" text-sm font-normal flex items-center justify-content-center truncate ...">
                    <MdEmail size={20} className="mr-1" />
                    {profileData?.email}
                  </span>
                  <span className=" text-sm ml-3 font-normal flex items-center truncate ...">
                    <MdLocalPhone size={20} className="mr-1" />
                    {profileData?.phone}
                  </span>
                </div>
                <h3 className="flex px-4 mt-2 items-center text-base font-semibold">
                  <AiFillHome size={20} className="mr-1" />
                  Address
                </h3>
                <div className="p-1 w-full grid grid-cols-1 h-fit px-4 font-medium">
                  <span className=" text-sm font-normal flex items-center truncate ...">
                    {profileData?.address}
                  </span>
                </div>
                <h3 className="flex px-4 mt-2 items-center text-base font-semibold">
                  <RiContactsBookFill size={20} className="mr-1" />
                  Experience
                </h3>
                <div className="p-1 w-full grid grid-cols-2 h-fit px-4 font-medium">
                  <span className=" text-sm font-normal flex items-center truncate ...">
                    <span className=" font-medium pr-1">Total:</span>{" "}
                    {profileData?.total_exp}
                  </span>
                  <span className=" text-sm font-normal flex items-center truncate ...">
                    <span className=" font-medium pr-1">Relevant:</span>
                    {profileData?.relevent_exp}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-full">
                    <h3 className="flex px-4 mt-2 items-center text-base font-semibold">
                      <HiDocumentDownload size={20} className="mr-1" />
                      Resume
                    </h3>
                    <div className="p-1 w-full grid grid-cols-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.resume_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        {profileData?.full_name}'s resume
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="flex px-4 mt-2 items-center text-base font-semibold">
                      <FaMoneyBillAlt size={20} className="mr-1" />
                      Salary
                    </h3>
                    <div className="p-1 w-full grid grid-cols-1 h-fit px-4 font-medium">
                      <span className=" text-sm font-normal flex items-center truncate ...">
                        ₹{profileData?.salarydetails?.ctc}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 grid grid-cols-2 pt-0">
                  <h3 className="flex col-span-2 px-4 mt-2 items-center text-base font-semibold">
                    <GrDocumentStore size={20} className="mr-1" />
                    Document
                  </h3>
                  {/* <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                    <a
                      href={profileData?.pcc_url}
                      download
                      target="_blank"
                      className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                    >
                      PCC Verification
                    </a>
                  </div> */}
                  {profileData?.aadharfront_url ? (
                    <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.aadharfront_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        Aadhaar Front
                      </a>
                    </div>
                  ) : null}
                  {profileData?.aadharback_url ? (
                    <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.aadharback_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        Aadhaar Back
                      </a>
                    </div>
                  ) : null}
                  {profileData?.pancard_url ? (
                    <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.pancard_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        PAN Card
                      </a>
                    </div>
                  ) : null}
                  {profileData?.voterid_url ? (
                    <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.voterid_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        VoterID Card
                      </a>
                    </div>
                  ) : null}
                  {profileData?.salaryslip_url ? (
                    <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.salaryslip_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        Salary Slip
                      </a>
                    </div>
                  ) : null}
                  {profileData?.appointmentletter_url ? (
                    <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.appointmentletter_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        Appointment Letter
                      </a>
                    </div>
                  ) : null}
                  {profileData?.bankstatement_url ? (
                    <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.bankstatement_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        Bank Statement
                      </a>
                    </div>
                  ) : null}
                  {profileData?.passport_url ? (
                    <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.passport_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        Passpost
                      </a>
                    </div>
                  ) : null}
                  {profileData?.offerletter_url ? (
                    <div className="p-1 w-full col-span-1 h-fit px-4 font-medium">
                      <a
                        href={profileData?.offerletter_url}
                        download
                        target="_blank"
                        className="px-1 w-full text-sm font-normal flex items-center truncate ..."
                      >
                        Offer Letter
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-center p-2 border-slate-200 ">
              <button
                className="bg-gray-800 hover:bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                onClick={() => setShowProfilePopup(false)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
