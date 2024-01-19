import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Table from "../../../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ApiErrorPopUp from "../../../components/ApiErrorPopUp";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const Certification = () => {
  const [certificationList, setCertificationList] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [apiError, setApiError] = useState("");
  const [showApiErrorPopUp, setShowApiErrorPopUp] = useState("");
  const [showEditButton, setShowEditButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [search, setSearch] = useState("");
  const [editCertification, setEditCertification] = useState("");
  const [showEditCertificationModal, setShowEditCertificationModal] =
    useState(false);
  const baseUrl = process.env.REACT_APP_API_URL;

  //   console.log("baseurl", baseUrl);
  const data = localStorage.getItem("data");
  const jsonData = JSON.parse(data);
  const accessToken = jsonData?.access_token;
  //   console.log("bearerToken", accessToken);
  const authorize = "Bearer" + " " + accessToken;
  // console.log("authorize", authorize);
  const navigate = useNavigate();
  const location = useLocation();

  const getData = async () => {
    const getApiData = await axios.get(`${baseUrl}certification`, {
      headers: {
        Authorization: `${authorize}`,
      },
    });
    const apiResonse = await getApiData?.data;
    // console.log("API Response",apiResonse)
    if (apiResonse?.code === 200) {
      setCertificationList(apiResonse?.data);
    } else {
      console.log("Api Response", apiResonse);
      setShowApiErrorPopUp(true);
      setApiError(apiResonse?.message);
    }
    // console.log("API Response",apiResonse.data);
  };

  useEffect(() => {
    getData();
    document.title = "CIPLCRM | Certification";
  }, [showEditCertificationModal]);

  useEffect(() => {
    if (jsonData?.data?.userPermissions.find((a) => a === "edit_category")) {
      setShowEditButton(true);
    } else {
      setShowEditButton(false);
    }
    jsonData?.data?.userPermissions.find((a) => a === "delete_category")
      ? setShowDeleteButton(true)
      : setShowDeleteButton(false);
  }, [showEditButton, showDeleteButton]);

  useEffect(() => {
    if (jsonData?.data?.userPermissions.find((a) => a === "view_category")) {
      return;
    } else {
      navigate("/admin");
    }
  }, [location]);

  const tableHeading = [
    {
      name: "S. No.",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="">

          {showEditButton ? (
            <button
              onClick={() => {
                setShowEditCertificationModal(true);
                setContentEdit(row);
                setEditCertification(row?.name);
              }}
              className=""
            >
              <FaRegEdit
                className="bg-gray-800 m-1 w-6 p-1 h-6 hover:cursor-pointer"
                fill="white"
                size={30}
                title="Edit"
              />

           

            </button>
          ) : null}

 




          {showDeleteButton ? (
            <button
              className=""
              to="#"
              onClick={async () => {
                Swal.fire({
                  title: "Are you sure you want to delete this ?",
                  text: "After deleting all related data would be deleted and can not be retrived. So before deleting make sure you have back up of all related data !.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  reverseButtons: true,
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    const request = await fetch(
                      `${process.env.REACT_APP_API_URL}certification/delete/${row?.id}`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `${authorize}`,
                          "Content-type": "application/json; charset=UTF-8",
                        },
                      }
                    );
                    const response = await request?.json();
                    if (response?.code === 200) {
                      getData();
                      Swal.fire("Deleted!", "", "success");
                    }
                  } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    Swal.fire("Cancelled", "", "error");
                  }
                });
              }}
            >
              <AiOutlineDelete
                size={30}
                className="bg-gray-800 text-white m-1 w-6 p-1 h-6 hover:cursor-pointer"
                title="Delete"
              />
      


            </button>
          ) : null}
        </div>
      ),
      sortable: false,
      justifyContent: "center",
    },
  ];

  const filteredData =
    certificationList &&
    certificationList?.filter((x) => x?.name?.toLowerCase().includes(search));

  return (
    <div>
      <ToastContainer position="top-center" />
      {showEditCertificationModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Edit Certification</h3>
                  <button
                    className="p-1 ml-auto border-0 text-red-500  float-right text-3xl leading-none font-semibold "
                    onClick={() => setShowEditCertificationModal(false)}
                  >
                    <span className=" text-red-500 h-6 w-6 text-xl block ">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="py-3 px-1">
                  <section className="px-1 mx-4 ">
                    <div className="w-60">
                      <label className="block">
                        <span className="px-1">Certification</span>
                        <span className="px text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="rounded border p-2 px-2 w-full"
                        placeholder=""
                        value={editCertification}
                        onChange={(e) => setEditCertification(e.target.value)}
                      />
                    </div>
                  </section>
                </div>
                {/*footer*/}
                <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                    type="button"
                    onClick={async () => {
                      try {
                        const request = await fetch(
                          `${baseUrl}certification/update/${contentEdit?.id}`,
                          {
                            method: "post",
                            headers: {
                              Authorization: `${authorize}`,
                              "Content-type": "application/json; charset=UTF-8",
                            },
                            body: JSON.stringify({
                              name: `${editCertification}`,
                            }),
                          }
                        );
                        const response = await request.json();
                        if (response?.code === 200) {
                          // const response =  request.json();
                          toast.success(`${response?.message}`);
                          setShowEditCertificationModal(false);
                          getData();
                          // navigate(0);
                        }
                      } catch (error) {
                        console.log("error", error);
                        if (error?.response?.data?.error) {
                          const errors = Object.values(
                            error?.response?.data?.error
                          );
                          console.log("Errors", errors);
                          errors.map((x) => toast.error(`${x}`));
                        }
                        if (error?.response?.data?.message) {
                          if (error?.response?.data?.error) {
                            const errors = Object.values(
                              error?.response?.data?.error
                            );
                            console.log("Errors", errors);
                            errors.map((x) => toast.error(`${x}`));
                          }
                          if (error?.response?.data?.message) {
                            toast.error(`${error?.response?.data?.message}`);
                          }
                        }
                      }
                    }}
                  >
                    Update
                    <FiArrowRight className="text-xl px" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="mt-4 px-4 border border-gray-800 border-t-4 bg-white mx-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-3 flex justify-end pr-2">         
              <div className="relative max-w-xs flex items-center justify-end">
                <label htmlFor="hs-table-search" className="px-2">
                  Search:
                </label>
                <input
                  type="text"
                  className="block w-full p-3 border text-sm border-gray-300 rounded-md "
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            <div className="lg:p-1.5  mb-4 pt-2 w-full inline-block align-middle">
              <div className="overflow-hidden border  rounded-lg">
                <Table columns={tableHeading} data={filteredData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certification;
